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
import { recordCalculatorAnalyticsEvent } from '../../../lib/analytics/store';
import type { AnalyticsEventType, DeviceCategory, TrafficSourceCategory } from '../../../lib/analytics/types';
import { calculators } from '../../../data/calculators';

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

function parseTrafficSource(referer: string | null, origin: string | null): TrafficSourceCategory {
  if (!referer) return 'direct';
  try {
    const refUrl = new URL(referer);
    const refHost = refUrl.hostname.toLowerCase();

    if (origin) {
      try {
        const origUrl = new URL(origin);
        if (refHost === origUrl.hostname.toLowerCase()) return 'direct';
      } catch {
        // Continue
      }
    }

    if (
      refHost.includes('google.') ||
      refHost.includes('bing.') ||
      refHost.includes('duckduckgo.') ||
      refHost.includes('yahoo.') ||
      refHost.includes('ecosia.') ||
      refHost.includes('baidu.') ||
      refHost.includes('yandex.')
    ) {
      return 'organic';
    }

    if (
      refHost.includes('facebook.') ||
      refHost.includes('instagram.') ||
      refHost.includes('twitter.') ||
      refHost.includes('t.co') ||
      refHost.includes('x.com') ||
      refHost.includes('linkedin.') ||
      refHost.includes('reddit.') ||
      refHost.includes('pinterest.') ||
      refHost.includes('youtube.') ||
      refHost.includes('tiktok.') ||
      refHost.includes('whatsapp.')
    ) {
      return 'social';
    }

    return 'referral';
  } catch {
    return 'direct';
  }
}

import { safeWaitUntil } from '../../../lib/cloudflare-env';

const OPTIONS_RESPONSE = new Response(null, {
  status: 204,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  },
});

const SILENT_204_RESPONSE = new Response(null, {
  status: 204,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-store, no-cache, must-revalidate',
  },
});

export const OPTIONS: APIRoute = async () => OPTIONS_RESPONSE;

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // Quick payload size guard (< 2KB)
    const len = parseInt(request.headers.get('content-length') ?? '0', 10);
    if (len > 2048) return SILENT_204_RESPONSE;

    let body: any;
    const text = await request.text();
    if (!text) return SILENT_204_RESPONSE;

    try {
      body = JSON.parse(text);
    } catch {
      return SILENT_204_RESPONSE;
    }

    if (!body || typeof body !== 'object') return SILENT_204_RESPONSE;

    const slug = typeof body.slug === 'string' ? body.slug.trim().toLowerCase() : '';
    const event = typeof body.event === 'string' ? (body.event.trim() as AnalyticsEventType) : undefined;

    // Validate event and slug against known calculators
    if (!event || !VALID_EVENTS.has(event)) return SILENT_204_RESPONSE;
    if (!slug || !KNOWN_SLUGS.has(slug)) return SILENT_204_RESPONSE;

    const userAgent = request.headers.get('user-agent');
    const device = parseDevice(userAgent, typeof body.device === 'string' ? body.device : undefined);

    // Filter out bots from polluting real conversion analytics
    if (device === 'bot') return SILENT_204_RESPONSE;

    const referer = typeof body.referrer === 'string' && body.referrer.length > 0 
      ? body.referrer 
      : request.headers.get('referer');
    const origin = request.headers.get('origin');
    const source = parseTrafficSource(referer, origin);

    // Record event asynchronously in D1 via Cloudflare waitUntil to minimize CPU latency
    const eventPromise = recordCalculatorAnalyticsEvent(
      {
        slug,
        eventType: event,
        device,
        source,
      },
      locals
    ).catch(() => {});

    safeWaitUntil(locals, eventPromise);

    return SILENT_204_RESPONSE;
  } catch {
    // Analytics failures must never break the client
    return SILENT_204_RESPONSE;
  }
};
