/**
 * /api/admin/performance/warm
 * Authenticated API for safe, rate-limited manual cache warming.
 * Pre-populates Cloudflare Edge cache for critical public pages without CPU waste.
 */

import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import type { CacheWarmResult } from '../../../../lib/performance/types';

export const prerender = false;

const MAX_WARM_URLS = 8;
const ALLOWED_HOSTS = new Set(['aifreecalculator.com', 'www.aifreecalculator.com', 'localhost']);

export const POST: APIRoute = async ({ request, cookies, url }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized: Admin session required.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const rawUrls = Array.isArray(body.urls) ? body.urls : [];

    if (rawUrls.length === 0) {
      return new Response(JSON.stringify({ error: 'No URLs provided for cache warming.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Safety limit: Max 8 URLs per warm request
    const candidateUrls = rawUrls.slice(0, MAX_WARM_URLS);
    const results: CacheWarmResult[] = [];
    const origin = url.origin;

    for (const raw of candidateUrls) {
      let fullUrl = typeof raw === 'string' ? raw.trim() : '';
      if (!fullUrl) continue;

      if (!fullUrl.startsWith('http')) {
        if (!fullUrl.startsWith('/')) fullUrl = `/${fullUrl}`;
        fullUrl = `${origin}${fullUrl}`;
      }

      try {
        const parsed = new URL(fullUrl);
        // Only allow warming own domain
        if (!ALLOWED_HOSTS.has(parsed.hostname) && parsed.hostname !== url.hostname) {
          continue;
        }

        const start = Date.now();
        const res = await fetch(parsed.toString(), {
          headers: {
            'User-Agent': 'AIFreeCalcCacheWarmer/1.0',
            'Accept-Encoding': 'gzip, br',
            'Accept': 'text/html,application/xhtml+xml',
          },
        });
        const elapsed = Date.now() - start;

        const cfCache = res.headers.get('cf-cache-status') || res.headers.get('x-worker-cache') || 'FETCHED';

        results.push({
          url: parsed.pathname,
          statusCode: res.status,
          timeMs: elapsed,
          cfCacheStatus: cfCache,
          success: res.ok,
        });
      } catch {
        results.push({
          url: fullUrl,
          statusCode: 0,
          timeMs: 0,
          cfCacheStatus: 'ERROR',
          success: false,
        });
      }
    }

    return new Response(JSON.stringify({ success: true, results }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || 'Cache warming execution failed.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
