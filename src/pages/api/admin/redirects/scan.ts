import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import { calculators, categories } from '../../../../data/calculators';
import { LOCALES } from '../../../../i18n/config';
import { upsert404Hit } from '../../../../lib/redirects/store';
import { findSmartRedirectSuggestion } from '../../../../lib/redirects/suggestion-engine';

export const prerender = false;

function getCandidateUrls(type: string = 'calculators'): string[] {
  const coreUrls = [
    '/',
    '/about/',
    '/contact/',
    '/privacy-policy/',
    '/terms/',
    '/disclaimer/',
    '/all-calculators/',
    '/sitemap/',
    '/free-online-tools/',
  ];

  const categoryUrls = categories.map((c) =>
    c.path.endsWith('/') ? c.path : `${c.path}/`
  );

  const calculatorUrls = calculators.map((c) =>
    c.path.endsWith('/') ? c.path : `${c.path}/`
  );

  if (type === 'core') {
    return Array.from(new Set([...coreUrls, ...categoryUrls]));
  }

  if (type === 'calculators') {
    return Array.from(new Set(calculatorUrls));
  }

  const nonEnLocales = LOCALES.filter((l) => l !== 'en');

  if (type === 'multilingual') {
    const multiUrls: string[] = [];
    for (const lang of nonEnLocales) {
      multiUrls.push(`/${lang}/`);
      multiUrls.push(`/${lang}/about/`);
      multiUrls.push(`/${lang}/contact/`);
      multiUrls.push(`/${lang}/privacy-policy/`);
      multiUrls.push(`/${lang}/terms/`);
      multiUrls.push(`/${lang}/disclaimer/`);
      multiUrls.push(`/${lang}/all-calculators/`);
      for (const cat of categories) {
        const catSlug = cat.name.toLowerCase().replace(/\s+/g, '-');
        multiUrls.push(`/${lang}/${catSlug}/`);
      }
      for (const calc of calculators) {
        const catSlug = calc.category.toLowerCase().replace(/\s+/g, '-');
        multiUrls.push(`/${lang}/${catSlug}/${calc.slug}/`);
      }
    }
    return Array.from(new Set(multiUrls));
  }

  // 'all'
  const allUrls: string[] = [...coreUrls, ...categoryUrls, ...calculatorUrls];
  for (const lang of nonEnLocales) {
    allUrls.push(`/${lang}/`);
    allUrls.push(`/${lang}/about/`);
    allUrls.push(`/${lang}/contact/`);
    allUrls.push(`/${lang}/privacy-policy/`);
    allUrls.push(`/${lang}/terms/`);
    allUrls.push(`/${lang}/disclaimer/`);
    allUrls.push(`/${lang}/all-calculators/`);
    for (const cat of categories) {
      const catSlug = cat.name.toLowerCase().replace(/\s+/g, '-');
      allUrls.push(`/${lang}/${catSlug}/`);
    }
    for (const calc of calculators) {
      const catSlug = calc.category.toLowerCase().replace(/\s+/g, '-');
      allUrls.push(`/${lang}/${catSlug}/${calc.slug}/`);
    }
  }
  return Array.from(new Set(allUrls));
}

export const GET: APIRoute = async ({ request, cookies }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized: Admin authentication required' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const url = new URL(request.url);
  const type = url.searchParams.get('type') || 'calculators';
  const urls = getCandidateUrls(type);

  return new Response(
    JSON.stringify({
      type,
      total: urls.length,
      urls,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    }
  );
};

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized: Admin authentication required' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const urls: string[] = Array.isArray(body.urls) ? body.urls.slice(0, 50) : [];
    const autoLog404 = Boolean(body.autoLog404 ?? true);
    const origin = new URL(request.url).origin;

    const results = await Promise.all(
      urls.map(async (rawPath) => {
        let cleanPath = rawPath.trim();
        if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;

        const targetUrl = new URL(cleanPath, origin).toString();
        const t0 = Date.now();
        let status = 0;
        let errorMessage: string | null = null;

        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 6000);
          const res = await fetch(targetUrl, {
            method: 'HEAD',
            redirect: 'manual',
            signal: controller.signal,
            headers: {
              'X-404-Scanner': 'true',
              'User-Agent': 'AIFreeCalculator-404-Scanner/1.0',
            },
          });
          clearTimeout(timeoutId);
          status = res.status;
        } catch (fetchErr: any) {
          status = 504;
          errorMessage = fetchErr?.message || 'Connection timeout';
        }

        const durationMs = Date.now() - t0;
        const isOk = status >= 200 && status < 400;
        let suggestion: any = null;

        if (!isOk) {
          suggestion = findSmartRedirectSuggestion(cleanPath);
          if (autoLog404 && status === 404) {
            try {
              await upsert404Hit(
                {
                  path: cleanPath,
                  deviceCategory: 'scanner',
                  referrer: 'Admin 404 Auto-Scanner',
                  priority: 'medium',
                  suggestedDestination: suggestion?.destination,
                  suggestionConfidence: suggestion?.confidence,
                  suggestionReason: suggestion?.reason,
                },
                locals
              );
            } catch {
              // Non-blocking log
            }
          }
        }

        return {
          path: cleanPath,
          status,
          durationMs,
          ok: isOk,
          errorMessage,
          suggestion,
        };
      })
    );

    const stats = {
      scanned: results.length,
      healthy: results.filter((r) => r.ok).length,
      broken: results.filter((r) => !r.ok).length,
      notFound404: results.filter((r) => r.status === 404).length,
    };

    return new Response(JSON.stringify({ results, stats }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Scan batch failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
