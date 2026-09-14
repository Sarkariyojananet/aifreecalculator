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

// Cache search indices per locale in memory (Server instance)
const cachedSearchIndices = new Map<Locale, string>();

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const langParam = url.searchParams.get('lang') || DEFAULT_LOCALE;
  const lang: Locale = isValidLocale(langParam) ? (langParam as Locale) : DEFAULT_LOCALE;

  let jsonStr = cachedSearchIndices.get(lang);
  if (!jsonStr) {
    const data = calculators.map((c) => {
      const calcTrans = getCalculatorTranslation(c.slug, lang);
      return {
        name: calcTrans.name,
        category: calcTrans.categoryLabel || c.category,
        desc: calcTrans.shortDescription,
        icon: c.icon,
        path: getLocalizedPath(c.path, lang),
        keywords: c.keywords || [],
      };
    });
    jsonStr = JSON.stringify(data);
    cachedSearchIndices.set(lang, jsonStr);
  }

  return new Response(jsonStr, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
      'Cloudflare-CDN-Cache-Control': 'max-age=604800, stale-while-revalidate=86400',
      'CDN-Cache-Control': 'max-age=604800, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
