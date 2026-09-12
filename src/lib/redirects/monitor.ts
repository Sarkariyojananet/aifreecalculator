/**
 * 404 Event Monitor & Privacy-Safe Hit Recorder
 * Compatible with Cloudflare Workers (non-blocking, zero PII, async execution).
 */

import { upsert404Hit } from './store';
import type { DeviceCategory } from './types';

// In-memory throttling map: normalizedPath -> timestamp
const lastRecordedTimestamp = new Map<string, number>();
const THROTTLE_WINDOW_MS = 10_000; // 10 seconds per unique path to avoid burst write amplification

// Cheap path-based rejection for obvious vulnerability scanner probes
const SCANNER_PATH_REGEX = /(?:^\/(?:\.env|\.git|wp-admin|wp-login|xmlrpc|cgi-bin|autodiscover|actuator|swagger)|\.(?:php|asp|aspx|jsp|cgi|env)$)/i;

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

  // 1. Cheap rejection for vulnerability scanners and probe tools (0 ms CPU, 0 D1 queries)
  if (SCANNER_PATH_REGEX.test(normalizedPath)) {
    return;
  }

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

    // Save to Cloudflare D1 cleanly without expensive Levenshtein loops or GSC queries on live paths
    await upsert404Hit(
      {
        path: normalizedPath,
        referrer,
        deviceCategory,
        priority: 'low',
      },
      locals
    );
  } catch {
    // Fail safely; non-critical monitoring should never break worker lifecycle
  }
}
