/**
 * GET /api/search-data
 * On-demand cached search index endpoint for calculators.
 * Strips 33+ KB of inline JSON from every HTML page across the website.
 */

import type { APIRoute } from 'astro';
import { calculators } from '../../data/calculators';
import { getCalculatorTranslation } from '../../i18n/translations/calculators';
import { getLocalizedPath } from '../../i18n/utils';
import { isValidLocale, DEFAULT_LOCALE, type Locale } from '../../i18n/config';

import { safeWaitUntil } from '../../lib/cloudflare-env';

export const prerender = false;

// Static response headers for search data endpoint
const SEARCH_RESPONSE_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
  'Cloudflare-CDN-Cache-Control': 'max-age=604800, stale-while-revalidate=86400',
  'CDN-Cache-Control': 'max-age=604800, stale-while-revalidate=86400',
  'Access-Control-Allow-Origin': '*',
} as const;

// Cache search indices per locale in memory (Server instance)
const cachedSearchIndices = new Map<Locale, string>();

export const GET: APIRoute = async ({ request, locals }) => {
  try {
    const cache = typeof caches !== 'undefined' && (caches as any).default ? ((caches as any).default as Cache) : null;
    const cacheKey = request.url;

    if (cache) {
      try {
        const cached = await cache.match(cacheKey);
        if (cached) return new Response(cached.body, cached);
      } catch {}
    }

    const url = new URL(request.url);
    const langParam = url.searchParams.get('lang') || DEFAULT_LOCALE;
    const lang: Locale = isValidLocale(langParam) ? (langParam as Locale) : DEFAULT_LOCALE;

    let jsonStr = cachedSearchIndices.get(lang);
    if (!jsonStr) {
      const data = calculators.map((c) => {
        try {
          const calcTrans = getCalculatorTranslation(c.slug, lang);
          return {
            name: calcTrans?.name || c.name,
            category: calcTrans?.categoryLabel || c.category,
            desc: calcTrans?.shortDescription || c.description,
            icon: c.icon,
            path: getLocalizedPath(c.path, lang),
            keywords: c.keywords || [],
          };
        } catch {
          return {
            name: c.name,
            category: c.category,
            desc: c.description,
            icon: c.icon,
            path: c.path,
            keywords: c.keywords || [],
          };
        }
      });
      jsonStr = JSON.stringify(data);
      cachedSearchIndices.set(lang, jsonStr);
    }

    const response = new Response(jsonStr, {
      status: 200,
      headers: SEARCH_RESPONSE_HEADERS,
    });

    if (cache) {
      try {
        safeWaitUntil(locals, cache.put(cacheKey, response.clone()).catch(() => {}));
      } catch {}
    }

    return response;
  } catch {
    // Failsafe fallback: never 500, always return valid JSON search array
    const fallback = calculators.map((c) => ({
      name: c.name,
      category: c.category,
      desc: c.description,
      icon: c.icon,
      path: c.path,
      keywords: c.keywords || [],
    }));
    return new Response(JSON.stringify(fallback), {
      status: 200,
      headers: SEARCH_RESPONSE_HEADERS,
    });
  }
};
