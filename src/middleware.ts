import { defineMiddleware } from 'astro:middleware';
import { getRedirectRules, getFastRedirect, isRedirectMapLoaded } from './lib/admin/content-store';
import { record404Hit } from './lib/redirects/monitor';
import { recordError } from './lib/monitoring/store';
import { isValidLocale } from './i18n/config';
import { safeWaitUntil } from './lib/cloudflare-env';

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

// Pre-compiled regex for static asset identification
const STATIC_FILE_REGEX = /\.(?:css|js|mjs|png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|ttf|eot|xml|txt|json)$/i;

// Reusable HTTP security headers tuple
const SECURITY_HEADERS: readonly [string, string][] = [
  ['X-Content-Type-Options', 'nosniff'],
  ['X-Frame-Options', 'SAMEORIGIN'],
  ['X-XSS-Protection', '1; mode=block'],
  ['Referrer-Policy', 'strict-origin-when-cross-origin'],
  ['Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()'],
  ['Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload'],
];

/**
 * Returns a canonical cache key URL with tracking parameters stripped.
 * Optimized fast path: if no query string, returns raw URL string directly without allocations.
 */
function getNormalizedCacheKey(url: URL): string {
  if (!url.search) {
    return url.href;
  }

  const search = url.search;
  let hasTracking = search.includes('utm_');
  if (!hasTracking) {
    for (const param of TRACKING_QUERY_PARAMS) {
      if (search.includes(param)) {
        hasTracking = true;
        break;
      }
    }
  }

  // If no tracking query params present, return canonical href with sorted params
  const cleanUrl = new URL(url.href);
  if (hasTracking) {
    for (const key of Array.from(cleanUrl.searchParams.keys())) {
      const lower = key.toLowerCase();
      if (TRACKING_QUERY_PARAMS.has(lower) || lower.startsWith('utm_')) {
        cleanUrl.searchParams.delete(key);
      }
    }
  }

  if (cleanUrl.searchParams.toString()) {
    cleanUrl.searchParams.sort();
  }

  return cleanUrl.toString();
}

export const onRequest = defineMiddleware(async (context, next) => {
  const pathname = context.url.pathname;
  const isGetOrHead = context.request.method === 'GET' || context.request.method === 'HEAD';
  const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/api/admin');
  const isApiRoute = pathname.startsWith('/api/');
  const isAstroInternal = pathname.startsWith('/_astro/');

  // Ultra-fast cookie presence check without parsing entire cookie jar
  const cookieHeader = context.request.headers.get('cookie') || '';
  const hasAdminCookie = cookieHeader.includes('admin_session=');

  // Fast-path: Content-hashed immutable static assets (_astro bundle chunks, CSS, JS)
  if (isAstroInternal && isGetOrHead) {
    const assetResponse = await next();
    assetResponse.headers.set('Cache-Control', 'public, max-age=31536000, s-maxage=31536000, immutable');
    assetResponse.headers.set('Cloudflare-CDN-Cache-Control', 'max-age=31536000');
    return assetResponse;
  }

  const cache = typeof caches !== 'undefined' && (caches as any).default ? ((caches as any).default as Cache) : null;

  // Fast-path: Public static files (images, icons, fonts, robots.txt, sitemaps)
  const isStaticFile = !isAstroInternal && !isApiRoute && STATIC_FILE_REGEX.test(pathname);
  if (isStaticFile && isGetOrHead && !isAdminRoute) {
    if (cache) {
      try {
        const cachedStatic = await cache.match(context.url.href);
        if (cachedStatic) return cachedStatic;
      } catch {}
    }

    const staticResponse = await next();
    if (staticResponse.status === 200) {
      staticResponse.headers.set('Cache-Control', 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400');
      staticResponse.headers.set('Cloudflare-CDN-Cache-Control', 'max-age=604800, stale-while-revalidate=86400');
      if (cache) {
        safeWaitUntil(context, cache.put(context.url.href, staticResponse.clone()));
      }
    }
    return staticResponse;
  }

  // 1. Check Cloudflare Worker Cache API for public GET requests
  // Strips tracking query parameters so social/campaign traffic immediately hits cache
  const isWorkerCacheEligible = isGetOrHead && !isAdminRoute && !isApiRoute && !isAstroInternal && !hasAdminCookie && !import.meta.env.DEV;
  const isCacheablePage = isGetOrHead && !isAdminRoute && !isApiRoute && !isAstroInternal && !hasAdminCookie;
  const cacheKey = isWorkerCacheEligible ? getNormalizedCacheKey(context.url) : null;

  if (cache && cacheKey && isWorkerCacheEligible) {
    try {
      const cachedResponse = await cache.match(cacheKey);
      if (cachedResponse) {
        // Zero-copy return: response was pre-stamped with X-Worker-Cache: HIT and security headers
        return cachedResponse;
      }
    } catch {
      // Graceful fallback to fresh render on cache match error
    }
  }

  // 2. Check dynamic 301/302 redirects managed in Admin CMS (Exclude admin, api, astro internal, static assets)
  if (!isAdminRoute && !isApiRoute && !isAstroInternal && !pathname.includes('.')) {
    try {
      let rule = isRedirectMapLoaded() ? getFastRedirect(pathname) : null;

      if (!rule && !isRedirectMapLoaded()) {
        const redirects = await getRedirectRules(context.locals);
        const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
        rule = redirects.find(
          (r) => r.active !== false && (r.source === pathname || r.source === normalizedPath || `${r.source}/` === normalizedPath)
        ) || null;
      }

      if (rule && rule.destination) {
        const redirectResponse = context.redirect(rule.destination, rule.statusCode || 301);
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

  // 2c. Canonicalize legacy query parameter `?lang=xx` to clean path `/{lang}/...`
  // Fast path: Only parse if query string actually contains 'lang='
  if (!isAdminRoute && !isApiRoute && !isAstroInternal && !isStaticFile && !pathname.includes('.') && context.url.search?.includes('lang=')) {
    const queryLang = context.url.searchParams.get('lang');
    if (queryLang && isValidLocale(queryLang) && queryLang !== 'en') {
      const segments = pathname.split('/').filter(Boolean);
      if (!isValidLocale(segments[0])) {
        const cleanUrl = new URL(context.url.toString());
        cleanUrl.searchParams.delete('lang');
        const remainingQuery = cleanUrl.searchParams.toString();
        const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
        const targetUrl = `/${queryLang}${cleanPath}${remainingQuery ? `?${remainingQuery}` : ''}`;
        const redirectResponse = context.redirect(targetUrl, 301);
        redirectResponse.headers.set('Cache-Control', 'public, max-age=86400, s-maxage=604800');
        return redirectResponse;
      }
    }
  }

  let response: Response;
  try {
    response = await next();
  } catch (err: any) {
    const errorMsg = err?.message || 'Uncaught Server Exception';
    safeWaitUntil(
      context,
      recordError(context.locals, {
        route: pathname,
        category: isApiRoute ? 'api' : 'worker_server',
        severity: 'critical',
        message: errorMsg,
      })
    );
    throw err;
  }

  // Record 5xx responses during live runtime
  if (response.status >= 500 && !isAstroInternal && !pathname.startsWith('/500')) {
    safeWaitUntil(
      context,
      recordError(context.locals, {
        route: pathname,
        category: isApiRoute ? 'api' : 'worker_server',
        severity: 'critical',
        message: `HTTP ${response.status} Server Error`,
      })
    );
  }

  // 3. Attach industry-standard HTTP security headers via static tuple loop
  for (let i = 0; i < SECURITY_HEADERS.length; i++) {
    response.headers.set(SECURITY_HEADERS[i][0], SECURITY_HEADERS[i][1]);
  }

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
    response.headers.set('Cache-Control', 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400');
    response.headers.set('Cloudflare-CDN-Cache-Control', 'max-age=604800, stale-while-revalidate=86400');
    response.headers.set('CDN-Cache-Control', 'max-age=604800, stale-while-revalidate=86400');
    response.headers.set('Vary', 'Accept-Encoding');
    response.headers.set('X-Worker-Cache', 'MISS');

    // Store in Cloudflare Worker Cache with pre-stamped X-Worker-Cache: HIT
    if (cache && cacheKey && isWorkerCacheEligible) {
      const cacheClone = response.clone();
      cacheClone.headers.set('X-Worker-Cache', 'HIT');
      safeWaitUntil(context, cache.put(cacheKey, cacheClone));
    }
  }

  // 5. Genuine 404 Detection & Monitoring
  if (response.status === 404 && isGetOrHead && !isAdminRoute && !isApiRoute && !isAstroInternal) {
    safeWaitUntil(context, record404Hit(context.url, context.request, context.locals));
    response.headers.set('Cache-Control', 'public, max-age=60, s-maxage=300');
    response.headers.set('Cloudflare-CDN-Cache-Control', 'max-age=300');
  }

  return response;
});
