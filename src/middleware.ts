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

// Pre-compiled regex for static asset identification (CSS, JS, fonts, images, media, maps)
const STATIC_ASSET_REGEX = /\.(?:css|js|mjs|woff2?|ttf|eot|otf|svg|png|jpe?g|gif|webp|avif|ico|map|webmanifest)$/i;

function isStaticAsset(pathname: string): boolean {
  return (
    pathname.startsWith('/_astro/') ||
    pathname.startsWith('/assets/') ||
    STATIC_ASSET_REGEX.test(pathname)
  );
}

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

  // 1. STATIC ASSET BYPASS: _astro/, /assets/, .css, .js, fonts, images
  // Completely bypass ALL Worker HTML caching logic, redirects, and header modifications.
  if (isStaticAsset(pathname)) {
    // If request is for a stylesheet, guarantee Content-Type: text/css and handle stale chunk fallback
    if (pathname.endsWith('.css')) {
      const assetResponse = await next();

      // If an old CSS chunk was requested (e.g. from a stale edge-cached HTML page) and returned 404,
      // dynamically redirect to the active CSS bundle so styles never break!
      if (assetResponse.status === 404 && pathname.startsWith('/_astro/global.')) {
        return context.redirect('/_astro/global.BO1HgYUr.css', 302);
      }

      const contentType = assetResponse.headers.get('content-type');
      if (!contentType || !contentType.includes('text/css')) {
        const headers = new Headers(assetResponse.headers);
        headers.set('Content-Type', 'text/css; charset=utf-8');
        return new Response(assetResponse.body, {
          status: assetResponse.status,
          statusText: assetResponse.statusText,
          headers,
        });
      }
      return assetResponse;
    }

    // For all other static assets, return next() immediately without modifying headers, running cache operations, or transforming
    return next();
  }

  const isGetOrHead = context.request.method === 'GET' || context.request.method === 'HEAD';
  const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/api/admin');
  const isApiRoute = pathname.startsWith('/api/');

  // Ultra-fast cookie presence check without parsing entire cookie jar
  const cookieHeader = context.request.headers.get('cookie') || '';
  const hasAdminCookie = cookieHeader.includes('admin_session=');

  const cache = typeof caches !== 'undefined' && (caches as any).default ? ((caches as any).default as Cache) : null;

  // Standard HTML page identification (strictly exclude admin, API, static assets, and paths with file extensions)
  const isHtmlPagePath = !isAdminRoute && !isApiRoute && !pathname.includes('.');
  const isWorkerCacheEligible = isGetOrHead && isHtmlPagePath && !hasAdminCookie && !import.meta.env.DEV;
  const isCacheablePage = isGetOrHead && isHtmlPagePath && !hasAdminCookie;
  const cacheKey = isWorkerCacheEligible ? getNormalizedCacheKey(context.url) : null;

  // 1. Check Cloudflare Worker Cache API for public HTML GET requests
  // Strips tracking query parameters so social/campaign traffic immediately hits cache
  if (cache && cacheKey && isWorkerCacheEligible) {
    try {
      const cachedResponse = await cache.match(cacheKey);
      if (cachedResponse) {
        return cachedResponse;
      }
    } catch {
      // Graceful fallback to fresh render on cache match error
    }
  }

  // 2. Check dynamic 301/302 redirects managed in Admin CMS (strictly on HTML page routes)
  if (isHtmlPagePath) {
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
  if (isHtmlPagePath && context.url.search?.includes('lang=')) {
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
  if (response.status >= 500 && !pathname.startsWith('/500')) {
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

  // Public HTML & Pages: Sensible Edge Cache with SWR
  // Use short edge cache (5 min) so deployments take effect promptly without locking stale HTML for 7 days
  if (isCacheablePage && response.status === 200) {
    const isHtml = response.headers.get('content-type')?.includes('text/html') ?? true;
    if (isHtml) {
      response.headers.set('Cache-Control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=600');
      response.headers.set('Cloudflare-CDN-Cache-Control', 'max-age=300, stale-while-revalidate=600');
      response.headers.set('CDN-Cache-Control', 'max-age=300, stale-while-revalidate=600');
      response.headers.set('Vary', 'Accept-Encoding');
      response.headers.set('X-Worker-Cache', 'MISS');

      // Store in Cloudflare Worker Cache with pre-stamped X-Worker-Cache: HIT
      if (cache && cacheKey && isWorkerCacheEligible) {
        const cacheClone = response.clone();
        cacheClone.headers.set('X-Worker-Cache', 'HIT');
        safeWaitUntil(context, cache.put(cacheKey, cacheClone));
      }
    }
  }

  // 5. Genuine 404 Detection & Monitoring
  if (response.status === 404 && isGetOrHead && !isAdminRoute && !isApiRoute) {
    safeWaitUntil(context, record404Hit(context.url, context.request, context.locals));
    response.headers.set('Cache-Control', 'public, max-age=60, s-maxage=300');
    response.headers.set('Cloudflare-CDN-Cache-Control', 'max-age=300');
  }

  return response;
});
