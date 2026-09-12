import { defineMiddleware } from 'astro:middleware';
import { getRedirectRules } from './lib/admin/content-store';
import { record404Hit } from './lib/redirects/monitor';
import { recordError } from './lib/monitoring/store';
import { isValidLocale, type Locale } from './i18n/config';
import { isCalculatorTranslated } from './i18n/translations/calculators';
import { calculators } from './data/calculators';

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

  // Fast-path: Content-hashed immutable static assets (_astro bundle chunks, CSS, JS)
  if (isAstroInternal && isGetOrHead) {
    const assetResponse = await next();
    assetResponse.headers.set('Cache-Control', 'public, max-age=31536000, s-maxage=31536000, immutable');
    assetResponse.headers.set('Cloudflare-CDN-Cache-Control', 'max-age=31536000');
    return assetResponse;
  }

  // Fast-path: Public static files (images, icons, fonts, robots.txt, sitemaps)
  const isStaticFile = !isAstroInternal && !isApiRoute && /\.(css|js|mjs|png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|ttf|eot|xml|txt|json)$/i.test(pathname);
  if (isStaticFile && isGetOrHead && !isAdminRoute) {
    const staticResponse = await next();
    if (staticResponse.status === 200) {
      staticResponse.headers.set('Cache-Control', 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400');
      staticResponse.headers.set('Cloudflare-CDN-Cache-Control', 'max-age=604800, stale-while-revalidate=86400');
    }
    return staticResponse;
  }

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

  // 2b. Universal i18n Calculator Routing
  // Seamlessly routes /{lang}/{category}/{slug}/ to the full rich calculator page with the selected locale
  if (!isAdminRoute && !isApiRoute && !isAstroInternal && !isStaticFile && !pathname.includes('.')) {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length >= 3 && isValidLocale(segments[0]) && segments[0] !== 'en') {
      const reqLocale = segments[0] as Locale;
      const category = segments[1].toLowerCase();
      const slug = segments[2].toLowerCase();

      const baseCalc = calculators.find(
        (c) =>
          c.slug.toLowerCase() === slug &&
          (c.category.toLowerCase() === category ||
            (c.additionalCategories &&
              c.additionalCategories.some((ac) => ac.toLowerCase() === category)))
      );
      if (baseCalc) {
        (context.locals as any).locale = reqLocale;
        (context.locals as any).originalPath = pathname;
        return context.rewrite(`${baseCalc.path}?lang=${reqLocale}`);
      }
    }
  }

  // 2c. Canonicalize legacy or query parameter `?lang=xx` to clean path `/{lang}/...`
  if (!isAdminRoute && !isApiRoute && !isAstroInternal && !isStaticFile && !pathname.includes('.')) {
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

  // Record 5xx responses (e.g. 500, 502, 503) during live runtime
  if (response.status >= 500 && !isAstroInternal && !isPrerendered && !pathname.startsWith('/500')) {
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
    // Both browser and Cloudflare CDN Edge cache aggressively with SWR
    response.headers.set('Cache-Control', 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400');
    response.headers.set('Cloudflare-CDN-Cache-Control', 'max-age=604800, stale-while-revalidate=86400');
    response.headers.set('CDN-Cache-Control', 'max-age=604800, stale-while-revalidate=86400');
    response.headers.set('Vary', 'Accept-Encoding');
    response.headers.set('X-Worker-Cache', 'MISS');

    // Store in Cloudflare Worker Cache under the normalized cache key
    if (cache && cacheKey && isWorkerCacheEligible) {
      safeWaitUntil(context, cache.put(cacheKey, response.clone()));
    }
  }

  // 5. Genuine 404 Detection & Monitoring
  // Asynchronously logs the 404 event to D1 without delaying public response time
  if (response.status === 404 && isGetOrHead && !isAdminRoute && !isApiRoute && !isAstroInternal) {
    safeWaitUntil(context, record404Hit(context.url, context.request, context.locals));
    // Set short edge cache (5 min) on 404s so newly created redirects take effect promptly
    response.headers.set('Cache-Control', 'public, max-age=60, s-maxage=300');
    response.headers.set('Cloudflare-CDN-Cache-Control', 'max-age=300');
  }

  return response;
});
