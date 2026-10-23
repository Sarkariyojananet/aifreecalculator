import { defineMiddleware } from 'astro:middleware';
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

// Pre-compiled regex for static asset identification (CSS, JS, fonts, images, media, maps, txt)
const STATIC_ASSET_REGEX = /\.(?:css|js|mjs|woff2?|ttf|eot|otf|svg|png|jpe?g|gif|webp|avif|ico|map|webmanifest|txt)$/i;

function isStaticAsset(pathname: string): boolean {
  return (
    pathname.startsWith('/_astro/') ||
    pathname.startsWith('/assets/') ||
    pathname === '/ads.txt' ||
    pathname === '/app-ads.txt' ||
    pathname === '/robots.txt' ||
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

  // 0. SECURITY FIREWALL: Block any unauthorized direct access to dotfiles, sensitive configs, databases, source code, and backups
  const rawPath = context.url.pathname;
  let lowerPath = rawPath.toLowerCase();
  try {
    lowerPath = decodeURIComponent(rawPath).toLowerCase();
  } catch {}

  // Block path traversal and null-byte injection attempts
  if (lowerPath.includes('..') || lowerPath.includes('\0') || lowerPath.includes('%00')) {
    return new Response('403 Forbidden', {
      status: 403,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Content-Type-Options': 'nosniff' },
    });
  }

  const isBlockedSensitivePath =
    (lowerPath.startsWith('/.') && !lowerPath.startsWith('/.well-known/')) ||
    lowerPath.includes('/.') ||
    lowerPath === '/package.json' ||
    lowerPath === '/package-lock.json' ||
    lowerPath === '/tsconfig.json' ||
    lowerPath === '/wrangler.toml' ||
    lowerPath === '/astro.config.mjs' ||
    lowerPath.endsWith('.env') ||
    lowerPath.includes('.env.') ||
    lowerPath.endsWith('.sql') ||
    lowerPath.endsWith('.sqlite') ||
    lowerPath.endsWith('.db') ||
    lowerPath.endsWith('.bak') ||
    lowerPath.endsWith('.backup') ||
    lowerPath.endsWith('.key') ||
    lowerPath.endsWith('.pem') ||
    lowerPath.endsWith('.log') ||
    lowerPath.startsWith('/scratch/') ||
    lowerPath.startsWith('/src/lib/') ||
    lowerPath.startsWith('/src/data/') ||
    (!import.meta.env.DEV && lowerPath.startsWith('/src/'));

  if (isBlockedSensitivePath) {
    return new Response('403 Forbidden: Access to this resource is prohibited.', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-store, private',
      },
    });
  }

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
  const isApiRoute = pathname.startsWith('/api/');

  const cache = typeof caches !== 'undefined' && (caches as any).default ? ((caches as any).default as Cache) : null;

  // Standard HTML page identification (strictly exclude API, static assets, and paths with file extensions)
  const isHtmlPagePath = !isApiRoute && !pathname.includes('.');
  const isPrerenderOrBuild =
    Boolean((context as any).isPrerendered) ||
    (typeof process !== 'undefined' && Array.isArray(process.argv) && process.argv.includes('build'));
  const isLocalHost = context.url.hostname === 'localhost' || context.url.hostname === '127.0.0.1';

  // =========================================================================
  // CANONICAL REDIRECTS (Executed before cache lookup so Googlebot & clients
  // always receive proper 301 redirects to canonical URLs instead of 200 OK alternates)
  // =========================================================================

  // A. CANONICAL HOST & PROTOCOL: Redirect www -> non-www and http -> https
  const host = context.url.hostname.toLowerCase();
  const isWww = host.startsWith('www.');
  const forwardedProto = context.request.headers.get('x-forwarded-proto');
  const isHttp = forwardedProto === 'http' || context.url.protocol === 'http:';

  if (!isLocalHost && (isWww || isHttp)) {
    const canonicalHost = isWww ? host.replace(/^www\./, '') : host;
    const cleanUrl = `https://${canonicalHost}${pathname}${context.url.search}`;
    const redirectResponse = context.redirect(cleanUrl, 301);
    redirectResponse.headers.set('Cache-Control', 'public, max-age=86400, s-maxage=604800');
    redirectResponse.headers.set('Cloudflare-CDN-Cache-Control', 'max-age=604800');
    return redirectResponse;
  }

  // B. CONTACT PAGE QUERY CANONICALIZATION:
  // Convert contact query parameters (?calc=...&name=...&type=bug) to hash fragments (#calc=...).
  // Googlebot strips #hash and indexes only the canonical contact URL, clearing "Alternate page with proper canonical tag",
  // while client browsers preserve the hash to auto-fill the contact form.
  const isContactPage =
    pathname === '/contact' ||
    pathname === '/contact/' ||
    /^\/[a-z]{2}\/contact\/?$/i.test(pathname);

  if (isContactPage && context.url.search && context.url.search.length > 1) {
    const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
    const searchStr = context.url.search.replace(/^\?/, '');
    const targetUrl = `${normalizedPath}#${searchStr}`;
    const redirectResponse = context.redirect(targetUrl, 301);
    redirectResponse.headers.set('Cache-Control', 'public, max-age=86400, s-maxage=604800');
    redirectResponse.headers.set('Cloudflare-CDN-Cache-Control', 'max-age=604800');
    return redirectResponse;
  }

  // C. UNIVERSAL CALC/BUG QUERY PARAMETERS CANONICALIZATION:
  // Any page requested with ?calc= or ?type=bug is 301 redirected to use # hash fragment.
  if (
    context.url.search &&
    (context.url.search.includes('type=bug') ||
     context.url.search.includes('calc=') ||
     context.url.searchParams.has('calc') ||
     context.url.searchParams.get('type') === 'bug')
  ) {
    const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
    const searchStr = context.url.search.replace(/^\?/, '');
    const targetUrl = `${normalizedPath}#${searchStr}`;
    const redirectResponse = context.redirect(targetUrl, 301);
    redirectResponse.headers.set('Cache-Control', 'public, max-age=86400, s-maxage=604800');
    redirectResponse.headers.set('Cloudflare-CDN-Cache-Control', 'max-age=604800');
    return redirectResponse;
  }

  // D. CALCULATOR FORM/MODE PARAMETERS CANONICALIZATION:
  // Redirect legacy ?type=personal on /finance/emi-calculator/ to #type=personal
  if (pathname.includes('/emi-calculator') && context.url.search && context.url.search.includes('type=')) {
    const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
    const searchStr = context.url.search.replace(/^\?/, '');
    const targetUrl = `${normalizedPath}#${searchStr}`;
    const redirectResponse = context.redirect(targetUrl, 301);
    redirectResponse.headers.set('Cache-Control', 'public, max-age=86400, s-maxage=604800');
    redirectResponse.headers.set('Cloudflare-CDN-Cache-Control', 'max-age=604800');
    return redirectResponse;
  }

  // E. OBSOLETE SEARCH TEMPLATES & QUERIES:
  // Canonicalize /?q={search_term_string}, /?q=..., /?s=... to clean pathname
  if (
    isHtmlPagePath &&
    context.url.search &&
    (context.url.searchParams.has('q') ||
     context.url.searchParams.has('s') ||
     context.url.search.includes('search_term_string') ||
     context.url.search.includes('%7Bsearch_term_string%7D'))
  ) {
    const cleanSearch = new URLSearchParams(context.url.searchParams);
    cleanSearch.delete('q');
    cleanSearch.delete('s');
    const remaining = cleanSearch.toString();
    const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
    const targetUrl = remaining ? `${normalizedPath}?${remaining}` : normalizedPath;
    const redirectResponse = context.redirect(targetUrl, 301);
    redirectResponse.headers.set('Cache-Control', 'public, max-age=86400, s-maxage=604800');
    redirectResponse.headers.set('Cloudflare-CDN-Cache-Control', 'max-age=604800');
    return redirectResponse;
  }

  // F. LEGACY TOOL PATHS:
  // Redirect legacy PDF tools paths across ALL languages to /pdf-tools/...
  if (isHtmlPagePath && pathname.includes('free-online-tools/')) {
    const pdfSlugs = ['pdf-merge', 'pdf-split', 'pdf-compress', 'pdf-to-image', 'image-to-pdf'];
    for (const slug of pdfSlugs) {
      if (pathname.includes(`/free-online-tools/${slug}`)) {
        const targetPath = pathname.replace(`/free-online-tools/${slug}`, `/pdf-tools/${slug}`);
        const normalizedTarget = targetPath.endsWith('/') ? targetPath : `${targetPath}/`;
        const redirectResponse = context.redirect(normalizedTarget, 301);
        redirectResponse.headers.set('Cache-Control', 'public, max-age=86400, s-maxage=604800');
        redirectResponse.headers.set('Cloudflare-CDN-Cache-Control', 'max-age=604800');
        return redirectResponse;
      }
    }

    if (pathname.includes('/free-online-tools/monthly-time-table-maker')) {
      const targetPath = pathname.replace('/free-online-tools/monthly-time-table-maker', '/time-table-tools/monthly-time-table-maker');
      const normalizedTarget = targetPath.endsWith('/') ? targetPath : `${targetPath}/`;
      const redirectResponse = context.redirect(normalizedTarget, 301);
      redirectResponse.headers.set('Cache-Control', 'public, max-age=86400, s-maxage=604800');
      redirectResponse.headers.set('Cloudflare-CDN-Cache-Control', 'max-age=604800');
      return redirectResponse;
    }
  }

  // G. LEGACY QUERY PARAMETER ?lang=xx CANONICALIZATION:
  // Canonicalize legacy query parameter `?lang=xx` to clean path `/{lang}/...`
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

  // =========================================================================
  // WORKER CACHE LOOKUP (For valid, canonical HTML GET requests)
  // =========================================================================
  const isWorkerCacheEligible = !isPrerenderOrBuild && isGetOrHead && isHtmlPagePath && !import.meta.env.DEV && !isLocalHost;
  const isCacheablePage = isGetOrHead && isHtmlPagePath;
  const deployVer = import.meta.env.PUBLIC_GIT_COMMIT_HASH || 'v1';
  const cacheKey = isWorkerCacheEligible ? `${getNormalizedCacheKey(context.url)}?__cf_ver=${deployVer}` : null;

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

  let response: Response;
  try {
    response = await next();
  } catch (err: any) {
    throw err;
  }

  // 3. Ensure response has mutable headers (e.g. if returned from Cache API) and attach security headers
  try {
    for (let i = 0; i < SECURITY_HEADERS.length; i++) {
      response.headers.set(SECURITY_HEADERS[i][0], SECURITY_HEADERS[i][1]);
    }
  } catch {
    // If response headers are immutable (e.g. from Cache API match), reconstruct Response with mutable headers
    const mutableHeaders = new Headers(response.headers);
    for (let i = 0; i < SECURITY_HEADERS.length; i++) {
      mutableHeaders.set(SECURITY_HEADERS[i][0], SECURITY_HEADERS[i][1]);
    }
    response = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: mutableHeaders,
    });
  }

  // 4. Cache-Control Header Policy:
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

  // 5. Genuine 404 Detection & Response Headers
  if (response.status === 404 && isGetOrHead && !isApiRoute) {
    response.headers.set('Cache-Control', 'public, max-age=60, s-maxage=300');
    response.headers.set('Cloudflare-CDN-Cache-Control', 'max-age=300');
  }

  return response;
});
