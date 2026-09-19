import type { APIRoute } from 'astro';
import { getOrCreateIndexNowKey } from '../lib/seo/indexing-service';

import { safeWaitUntil } from '../lib/cloudflare-env';

export const prerender = false;

const KEY_TXT_HEADERS = {
  'Content-Type': 'text/plain; charset=utf-8',
  'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
  'Cloudflare-CDN-Cache-Control': 'max-age=604800, stale-while-revalidate=86400',
} as const;

export const GET: APIRoute = async ({ request, params, locals }) => {
  const cache = typeof caches !== 'undefined' && (caches as any).default ? ((caches as any).default as Cache) : null;
  const cacheKey = request.url;

  if (cache) {
    try {
      const cached = await cache.match(cacheKey);
      if (cached) return cached;
    } catch {}
  }

  const requestedKey = params.key;
  const currentKey = await getOrCreateIndexNowKey(locals);

  // If the requested filename matches the active IndexNow key
  if (requestedKey === currentKey) {
    const response = new Response(currentKey, {
      status: 200,
      headers: KEY_TXT_HEADERS,
    });

    if (cache) {
      try {
        safeWaitUntil(locals, cache.put(cacheKey, response.clone()).catch(() => {}));
      } catch {}
    }

    return response;
  }

  return new Response('Not Found', { status: 404 });
};
