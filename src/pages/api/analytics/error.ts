import type { APIRoute } from 'astro';
import { recordError } from '../../../lib/monitoring/store';

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

/**
 * Public client-side JavaScript error reporting endpoint (Step 7)
 * Strictly sanitizes data, discards user input/PII, and aggregates errors.
 */
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = (await request.json().catch(() => null)) as any;
    if (!body || typeof body !== 'object') {
      return new Response(JSON.stringify({ error: 'Invalid payload' }), { status: 400 });
    }

    const rawMessage = typeof body.message === 'string' ? body.message : 'Unknown JavaScript Error';
    const rawRoute = typeof body.route === 'string' ? body.route : '/';

    // 1. Check for noisy extension or network disconnect errors
    for (const pattern of NOISE_PATTERNS) {
      if (pattern.test(rawMessage)) {
        return new Response(JSON.stringify({ received: true, ignored: true }), { status: 200 });
      }
    }

    // 2. Strict sanitization: strip URLs, query strings, hashes, numbers, email patterns
    const cleanRoute = rawRoute.split('?')[0].split('#')[0].slice(0, 100);
    const cleanMessage = rawMessage
      .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[email]')
      .replace(/https?:\/\/[^\s]+/g, '[url]')
      .slice(0, 200)
      .trim();

    // 3. Record asynchronously
    await recordError(locals, {
      route: cleanRoute,
      category: 'client_js',
      severity: 'warning',
      message: cleanMessage,
    });

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ received: false }), { status: 500 });
  }
};
