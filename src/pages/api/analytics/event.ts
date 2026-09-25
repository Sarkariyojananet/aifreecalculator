/**
 * POST /api/analytics/event
 * Lightweight, privacy-preserving event ingestion endpoint for Calculator Performance Analytics (Phase 4).
 *
 * PRIVACY & SCALABILITY:
 * - Aggregates events atomically in D1 per calculator per day (zero raw user row accumulation)
 * - NEVER records input values, numbers, financial amounts, or PII
 * - Excludes bots and automated crawlers from skewed metrics
 * - Non-blocking: returns 204 immediately, safe with sendBeacon / fetch keepalive
 */

import type { APIRoute } from 'astro';
import {
  recordCalculatorAnalyticsEvent,
  recordCalculatorAnalyticsBatch,
} from '../../../lib/analytics/store';
import type { AnalyticsEventType, DeviceCategory, TrafficSourceCategory } from '../../../lib/analytics/types';
import { calculators } from '../../../data/calculators';
import { safeWaitUntil } from '../../../lib/cloudflare-env';

export const prerender = false;

const VALID_EVENTS = new Set<AnalyticsEventType>([
  'page_view',
  'calculator_start',
  'input_change',
  'calculate_click',
  'calculation_success',
  'calculation_error',
  'result_copy',
  'result_share',
  'calculator_reset',
]);

const KNOWN_SLUGS = new Set(calculators.map((c) => c.slug));

/** Upper bound on events accepted in one batched request. */
const MAX_BATCH_EVENTS = 64;

function parseDevice(userAgent: string | null, clientHint?: string): DeviceCategory {
  if (clientHint === 'mobile' || clientHint === 'desktop' || clientHint === 'tablet') {
    return clientHint;
  }
  if (!userAgent) return 'desktop';
  const ua = userAgent.toLowerCase();
  if (ua.includes('bot') || ua.includes('crawler') || ua.includes('spider') || ua.includes('lighthouse') || ua.includes('bytespider')) {
    return 'bot';
  }
  if (ua.includes('ipad') || (ua.includes('tablet') && !ua.includes('mobile'))) {
    return 'tablet';
  }
  if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone') || ua.includes('ipod')) {
    return 'mobile';
  }
  return 'desktop';
}

const ORGANIC_DOMAINS = [
  'google.',
  'bing.',
  'duckduckgo.',
  'yahoo.',
  'ecosia.',
  'baidu.',
  'yandex.',
];

const SOCIAL_DOMAINS = [
  'facebook.',
  'instagram.',
  'twitter.',
  't.co',
  'x.com',
  'linkedin.',
  'reddit.',
  'pinterest.',
  'youtube.',
  'tiktok.',
  'whatsapp.',
];

function parseTrafficSource(referer: string | null, origin: string | null): TrafficSourceCategory {
  if (!referer) return 'direct';

  // Fast path: if referer matches origin (internal navigation), attribution is direct
  if (origin && referer.startsWith(origin)) {
    return 'direct';
  }

  // Fast host extraction without allocating heavy URL parser objects
  let refHost = '';
  try {
    const schemeIdx = referer.indexOf('://');
    if (schemeIdx !== -1) {
      const start = schemeIdx + 3;
      const end = referer.indexOf('/', start);
      const hostPort = end === -1 ? referer.slice(start) : referer.slice(start, end);
      const colonIdx = hostPort.indexOf(':');
      refHost = (colonIdx === -1 ? hostPort : hostPort.slice(0, colonIdx)).toLowerCase();
    } else {
      refHost = new URL(referer).hostname.toLowerCase();
    }
  } catch {
    return 'direct';
  }

  if (!refHost) return 'direct';

  // Check if referer host matches origin host
  if (origin) {
    try {
      const origSchemeIdx = origin.indexOf('://');
      const origStart = origSchemeIdx === -1 ? 0 : origSchemeIdx + 3;
      const origEnd = origin.indexOf('/', origStart);
      const origHostPort = origEnd === -1 ? origin.slice(origStart) : origin.slice(origStart, origEnd);
      const origHost = origHostPort.split(':')[0].toLowerCase();
      if (refHost === origHost) return 'direct';
    } catch {}
  }

  for (let i = 0; i < ORGANIC_DOMAINS.length; i++) {
    if (refHost.includes(ORGANIC_DOMAINS[i])) return 'organic';
  }

  for (let i = 0; i < SOCIAL_DOMAINS.length; i++) {
    if (refHost.includes(SOCIAL_DOMAINS[i])) return 'social';
  }

  return 'referral';
}

function createOptionsResponse(): Response {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS, GET, HEAD',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

function create204Response(): Response {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}

export const OPTIONS: APIRoute = async () => createOptionsResponse();
export const GET: APIRoute = async () => create204Response();
export const HEAD: APIRoute = async () => create204Response();

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // Payload size guard. Single events stay < 2KB; batched requests are
    // allowed more room but are still hard-capped so nothing huge is parsed.
    const len = parseInt(request.headers.get('content-length') ?? '0', 10);
    if (len > 16384) return create204Response();

    let body: any;
    const text = await request.text();
    if (!text) return create204Response();

    try {
      body = JSON.parse(text);
    } catch {
      return create204Response();
    }

    if (!body || typeof body !== 'object') return create204Response();

    const userAgent = request.headers.get('user-agent');
    const referer = typeof body.referrer === 'string' && body.referrer.length > 0
      ? body.referrer
      : request.headers.get('referer');
    const origin = request.headers.get('origin');
    const source = parseTrafficSource(referer, origin);

    // Compute request-level device classification ONCE
    const fallbackDevice = parseDevice(userAgent, typeof body.device === 'string' ? body.device : undefined);

    // Filter out bots from polluting real conversion analytics
    if (fallbackDevice === 'bot') return create204Response();

    // ── Batched payload: { events: [{ slug, event, count? }, ...] } ──────────
    // Aggregates N client-side events into a single Worker request and a single
    // D1 batch, instead of one Worker invocation + D1 write per event.
    if (Array.isArray(body.events)) {
      const valid: Array<{
        slug: string;
        eventType: AnalyticsEventType;
        device: DeviceCategory;
        source: TrafficSourceCategory;
        count: number;
      }> = [];

      for (const raw of body.events.slice(0, MAX_BATCH_EVENTS)) {
        if (!raw || typeof raw !== 'object') continue;

        const slug = typeof raw.slug === 'string' ? raw.slug.trim().toLowerCase() : '';
        const event = typeof raw.event === 'string' ? (raw.event.trim() as AnalyticsEventType) : undefined;
        if (!event || !VALID_EVENTS.has(event)) continue;
        if (!slug || !KNOWN_SLUGS.has(slug)) continue;

        // Re-use request-level device classification or valid client hint without re-parsing User-Agent
        const rawDev = typeof raw.device === 'string' ? raw.device : undefined;
        const eventDevice: DeviceCategory =
          rawDev === 'mobile' || rawDev === 'tablet' || rawDev === 'desktop'
            ? rawDev
            : fallbackDevice;

        valid.push({
          slug,
          eventType: event,
          device: eventDevice,
          source,
          count: Number.isFinite(raw.count) && raw.count > 0 ? Math.min(1000, Math.floor(raw.count)) : 1,
        });
      }

      if (valid.length === 0) return create204Response();

      const batchPromise = recordCalculatorAnalyticsBatch(valid, locals).catch(() => {});
      safeWaitUntil(locals, batchPromise);

      return create204Response();
    }

    // ── Legacy single-event payload (unchanged contract) ────────────────────
    const slug = typeof body.slug === 'string' ? body.slug.trim().toLowerCase() : '';
    const event = typeof body.event === 'string' ? (body.event.trim() as AnalyticsEventType) : undefined;

    // Validate event and slug against known calculators
    if (!event || !VALID_EVENTS.has(event)) return create204Response();
    if (!slug || !KNOWN_SLUGS.has(slug)) return create204Response();

    // Record event asynchronously in D1 via Cloudflare waitUntil to minimize CPU latency
    const eventPromise = recordCalculatorAnalyticsEvent(
      {
        slug,
        eventType: event,
        device: fallbackDevice,
        source,
      },
      locals
    ).catch(() => {});

    safeWaitUntil(locals, eventPromise);

    return create204Response();
  } catch {
    // Analytics failures must never break the client
    return create204Response();
  }
};
