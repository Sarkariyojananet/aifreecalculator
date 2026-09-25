import type { APIRoute } from 'astro';
import { recordError } from '../../../lib/monitoring/store';
import { safeWaitUntil } from '../../../lib/cloudflare-env';

export const prerender = false;

// Ignored third-party or browser extension noise patterns
const NOISE_PATTERNS = [
  /ResizeObserver loop/i,
  /chrome-extension:\/\//i,
  /moz-extension:\/\//i,
  /safari-extension:\/\//i,
  /Script error\./i,
  /NetworkError when attempting to fetch resource/i,
];

function create204Response(): Response {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}

export const OPTIONS: APIRoute = async () =>
  new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });

/**
 * Public client-side JavaScript error reporting endpoint (Step 7)
 * Strictly sanitizes data, discards user input/PII, and aggregates errors.
 * Returns 204 immediately and persists to D1 asynchronously via safeWaitUntil.
 */
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const len = parseInt(request.headers.get('content-length') ?? '0', 10);
    if (len > 8192) return create204Response();

    const body = (await request.json().catch(() => null)) as any;
    if (!body || typeof body !== 'object') {
      return create204Response();
    }

    const rawMessage = typeof body.message === 'string' ? body.message : 'Unknown JavaScript Error';
    const rawRoute = typeof body.route === 'string' ? body.route : '/';

    // 1. Check for noisy extension or network disconnect errors
    for (const pattern of NOISE_PATTERNS) {
      if (pattern.test(rawMessage)) {
        return create204Response();
      }
    }

    // 2. Strict sanitization: strip URLs, query strings, hashes, numbers, email patterns
    const cleanRoute = rawRoute.split('?')[0].split('#')[0].slice(0, 100);
    const cleanMessage = rawMessage
      .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[email]')
      .replace(/https?:\/\/[^\s]+/g, '[url]')
      .slice(0, 200)
      .trim();

    // 3. Schedule recordError asynchronously in D1 (do NOT await before responding)
    const recordPromise = recordError(locals, {
      route: cleanRoute,
      category: 'client_js',
      severity: 'warning',
      message: cleanMessage,
    }).catch(() => {});

    safeWaitUntil(locals, recordPromise);

    return create204Response();
  } catch {
    return create204Response();
  }
};
