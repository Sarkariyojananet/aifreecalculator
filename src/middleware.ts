import { defineMiddleware } from 'astro:middleware';
import { getRedirectRules } from './lib/admin/content-store';

// Marketing, analytics, and social tracking query parameters that do not alter page HTML
const TRACKING_QUERY_PARAMS = new Set([
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'utm_id',
  'utm_source_platform',
  'fbclid',
  'gclid',
  'gad_source',
  'gbraid',
  'wbraid',
  'msclkid',
  'twclid',
  'ttclid',
  'yclid',
  'li_fat_id',
  'mc_cid',
  'mc_eid',
  '_ga',
  '_gl',
  'ref',
  'source',
]);

/**
 * Returns a canonical cache key URL with tracking parameters stripped
 * and remaining parameters sorted to prevent cache fragmentation.
 */
function getNormalizedCacheKey(url: URL): string {
  const cleanUrl = new URL(url.toString());
  let hasTrackingParams = false;

  for (const key of Array.from(cleanUrl.searchParams.keys())) {
    if (TRACKING_QUERY_PARAMS.has(key.toLowerCase()) || key.toLowerCase().startsWith('utm_')) {
      cleanUrl.searchParams.delete(key);
      hasTrackingParams = true;
    }
  }

  // Sort remaining functional query parameters to ensure deterministic cache hits
  if (cleanUrl.searchParams.toString()) {
    cleanUrl.searchParams.sort();
  }

  return cleanUrl.toString();
}

/**
 * Safely schedules an asynchronous task on Cloudflare ExecutionContext if available.
 */
function safeWaitUntil(context: any, promise: Promise<unknown>): void {
  if (typeof context.waitUntil === 'function') {
    context.waitUntil(promise);
  } else if (typeof context.locals?.cfContext?.waitUntil === 'function') {
    context.locals.cfContext.waitUntil(promise);
  } else if (typeof context.locals?.runtime?.ctx?.waitUntil === 'function') {
    context.locals.runtime.ctx.waitUntil(promise);
  } else {
    promise.catch(() => {});
  }
}

export const onRequest = defineMiddleware(async (context, next) => {
  const pathname = context.url.pathname;
  const isGetOrHead = context.request.method === 'GET' || context.request.method === 'HEAD';
  const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/api/admin');
  const isApiRoute = pathname.startsWith('/api/');
  const isAstroInternal = pathname.startsWith('/_astro/');
  const hasAdminCookie = Boolean(context.cookies.get('admin_session')?.value);

  // 1. Check Cloudflare Worker Cache API for public GET requests
  // Strips tracking query parameters so social/campaign traffic immediately hits cache
  const cache = typeof caches !== 'undefined' && (caches as any).default ? ((caches as any).default as Cache) : null;
  const isPrerendered = Boolean((context as any).isPrerendered);
  const isWorkerCacheEligible = isGetOrHead && !isAdminRoute && !isApiRoute && !isAstroInternal && !hasAdminCookie && !isPrerendered && !import.meta.env.DEV;
  const isCacheablePage = isGetOrHead && !isAdminRoute && !isApiRoute && !isAstroInternal && !hasAdminCookie;
  const cacheKey = isWorkerCacheEligible ? getNormalizedCacheKey(context.url) : null;

  if (cache && cacheKey && isWorkerCacheEligible) {
    try {
      const cachedResponse = await cache.match(cacheKey);
      if (cachedResponse) {
        const responseWithHeader = new Response(cachedResponse.body, cachedResponse);
        responseWithHeader.headers.set('X-Worker-Cache', 'HIT');
        return responseWithHeader;
      }
    } catch {
      // Graceful fallback to fresh render on cache match error
    }
  }

  // 2. Check dynamic 301/302 redirects managed in Admin CMS (Exclude admin, api, astro internal, static assets)
  if (!isAdminRoute && !isApiRoute && !isAstroInternal && !pathname.includes('.')) {
    try {
      const redirects = await getRedirectRules(context.locals);
      const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
      const rule = redirects.find(
        (r) => r.active !== false && (r.source === pathname || r.source === normalizedPath || `${r.source}/` === normalizedPath)
      );

      if (rule && rule.destination) {
        const redirectResponse = context.redirect(rule.destination, rule.statusCode || 301);
        // Cache permanent redirects on Cloudflare Edge to prevent repeated Worker invocations
        if (rule.statusCode !== 302) {
          redirectResponse.headers.set('Cache-Control', 'public, max-age=86400, s-maxage=604800');
          redirectResponse.headers.set('Cloudflare-CDN-Cache-Control', 'max-age=604800');
        } else {
          redirectResponse.headers.set('Cache-Control', 'public, max-age=300, s-maxage=600');
        }
        return redirectResponse;
      }
    } catch {
      // Fail safely to avoid blocking request
    }
  }

  const response = await next();

  // 3. Attach industry-standard HTTP security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  // 4. Cache-Control Header Policy:
  // Admin & Authenticated routes: NEVER cache on CDN or browser
  if (isAdminRoute || hasAdminCookie) {
    response.headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Cloudflare-CDN-Cache-Control', 'no-store');
    return response;
  }

  // API Endpoints: Handled individually by route handlers; ensure sensible defaults for mutations
  if (isApiRoute) {
    if (!response.headers.has('Cache-Control')) {
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
      response.headers.set('Cloudflare-CDN-Cache-Control', 'no-store');
    }
    return response;
  }

  // Public HTML & Pages: Maximize Cloudflare Edge Cache Hit Rate with SWR
  if (isCacheablePage && response.status === 200) {
    // Browser checks with Edge (max-age=0) while Cloudflare CDN Edge caches for 7 days with SWR
    response.headers.set('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800');
    response.headers.set('Cloudflare-CDN-Cache-Control', 'max-age=604800, stale-while-revalidate=86400');
    response.headers.set('CDN-Cache-Control', 'max-age=604800, stale-while-revalidate=86400');
    response.headers.set('Vary', 'Accept-Encoding');
    response.headers.set('X-Worker-Cache', 'MISS');

    // Store in Cloudflare Worker Cache under the normalized cache key
    if (cache && cacheKey && isWorkerCacheEligible) {
      safeWaitUntil(context, cache.put(cacheKey, response.clone()));
    }
  }

  return response;
});
