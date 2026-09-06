/**
 * 404 Event Monitor & Privacy-Safe Hit Recorder
 * Compatible with Cloudflare Workers (non-blocking, zero PII, async execution).
 */

import { findSmartRedirectSuggestion } from './suggestion-engine';
import { calculate404Priority } from './priority-scorer';
import { upsert404Hit } from './store';
import { getCachedGscSnapshot } from '../seo/gsc-store';
import type { DeviceCategory } from './types';

// In-memory throttling map: normalizedPath -> timestamp
const lastRecordedTimestamp = new Map<string, number>();
const THROTTLE_WINDOW_MS = 10_000; // 10 seconds per unique path to avoid burst write amplification

/**
 * Normalizes a requested 404 URL into a clean canonical path.
 * Strips all query parameters, fragments, and user tokens to protect visitor privacy.
 */
export function normalize404Path(url: URL): string {
  let pathname = url.pathname.toLowerCase().trim();

  // Normalize duplicate slashes
  pathname = pathname.replace(/\/+/g, '/');

  // Maintain consistent trailing slash for page paths (no file extension)
  if (!pathname.endsWith('/') && !pathname.includes('.')) {
    pathname = `${pathname}/`;
  }

  return pathname;
}

/**
 * Extracts privacy-safe referrer (domain/origin only, no query parameters or PII).
 */
export function extractSafeReferrer(request: Request): string | undefined {
  const rawRef = request.headers.get('Referer') || request.headers.get('referrer');
  if (!rawRef) return undefined;

  try {
    const parsed = new URL(rawRef);
    // Return origin + clean pathname only (zero query params containing search terms, user IDs, or tracking)
    const cleanPath = parsed.pathname.replace(/\/+/g, '/');
    return `${parsed.protocol}//${parsed.host}${cleanPath.slice(0, 100)}`;
  } catch {
    return undefined;
  }
}

/**
 * Determines device classification from User-Agent safely.
 */
export function extractDeviceCategory(request: Request): DeviceCategory {
  const ua = (request.headers.get('User-Agent') || '').toLowerCase();

  if (!ua) return 'desktop';
  if (/googlebot|bingbot|yandex|duckduckbot|baiduspider|slurp|semrushbot|ahrefsbot|rogerbot/i.test(ua)) {
    return 'bot';
  }
  if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) {
    return 'tablet';
  }
  if (/mobile|iphone|ipod|android.*mobile|blackberry|iemobile|opera mini/i.test(ua)) {
    return 'mobile';
  }

  return 'desktop';
}

/**
 * Asynchronously records a genuine 404 event.
 * Designed to be executed via `safeWaitUntil` in middleware so public page rendering is unaffected.
 */
export async function record404Hit(url: URL, request: Request, locals?: any): Promise<void> {
  const normalizedPath = normalize404Path(url);

  // Filter out internal system or developer noise
  if (
    normalizedPath.startsWith('/admin') ||
    normalizedPath.startsWith('/api/') ||
    normalizedPath.startsWith('/_astro/') ||
    normalizedPath.endsWith('.map') ||
    normalizedPath.endsWith('.hot-update.json')
  ) {
    return;
  }

  // Check burst throttling
  const now = Date.now();
  const lastTime = lastRecordedTimestamp.get(normalizedPath);
  if (lastTime && now - lastTime < THROTTLE_WINDOW_MS) {
    // Throttled: Skip writing to D1 within the 10-second burst window
    return;
  }
  lastRecordedTimestamp.set(normalizedPath, now);

  // Prune memory map periodically if too large
  if (lastRecordedTimestamp.size > 2000) {
    lastRecordedTimestamp.clear();
  }

  try {
    const referrer = extractSafeReferrer(request);
    const deviceCategory = extractDeviceCategory(request);

    // 1. Calculate smart redirect suggestion
    const suggestion = findSmartRedirectSuggestion(normalizedPath);

    // 2. Check if this URL had historical Google Search Console impressions
    let gscImpressions = 0;
    let gscClicks = 0;

    try {
      const gscSnapshot = await getCachedGscSnapshot('28d', locals);
      const topPages = gscSnapshot?.data?.['28d']?.topPages || [];
      if (topPages.length > 0) {
        const matchingPage = topPages.find((p: any) => {
          const pagePath = (p.path || p.url || '').toLowerCase();
          return pagePath.endsWith(normalizedPath) || pagePath.endsWith(normalizedPath.replace(/\/$/, ''));
        });
        if (matchingPage) {
          gscImpressions = matchingPage.impressions || 0;
          gscClicks = matchingPage.clicks || 0;
        }
      }
    } catch {}

    // 3. Calculate priority score
    const priority = calculate404Priority({
      totalHits: 1,
      recentHits: 1,
      gscImpressions,
      hasSafeSuggestion: Boolean(suggestion && suggestion.confidence >= 70),
    });

    // 4. Save to Cloudflare D1
    await upsert404Hit(
      {
        path: normalizedPath,
        referrer,
        deviceCategory,
        suggestedDestination: suggestion?.destination,
        suggestionConfidence: suggestion?.confidence,
        suggestionReason: suggestion?.reason,
        priority,
        gscImpressions,
        gscClicks,
      },
      locals
    );
  } catch {
    // Fail safely; non-critical monitoring should never break worker lifecycle
  }
}
