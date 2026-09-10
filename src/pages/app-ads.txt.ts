import type { APIRoute } from 'astro';
import { type AdsConfig } from '../lib/ads-config';
import { readSettings } from './api/adsense-config';

export const prerender = false;

export const GET: APIRoute = async ({ request, locals }) => {
  const cache = typeof caches !== 'undefined' && (caches as any).default ? ((caches as any).default as Cache) : null;
  const cacheKey = request.url;

  if (cache) {
    try {
      const cached = await cache.match(cacheKey);
      if (cached) return cached;
    } catch {}
  }

  const config: AdsConfig = await readSettings(locals);
  const lines: string[] = [];

  const clientId = (config.clientId || '').trim();
  const includeGoogle = config.includeGoogleAdsTxt !== false;
  if (includeGoogle && clientId && clientId.startsWith('ca-pub-') && !clientId.includes('XXXX')) {
    const pubOnly = clientId.replace('ca-', '');
    lines.push(`google.com, ${pubOnly}, DIRECT, f08c47fec0942fa0`);
  }

  const thirdParty = (config.thirdPartyAdsTxt || '').trim();
  if (thirdParty) {
    lines.push(thirdParty);
  }

  const custom = (config.customAdsTxt || '').trim();
  if (custom && custom !== thirdParty) {
    lines.push(custom);
  }

  const output = lines.join('\n').trim();

  const response = new Response(output ? output + '\n' : '', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
      'Cloudflare-CDN-Cache-Control': 'max-age=604800, stale-while-revalidate=86400',
    },
  });

  if (cache) {
    try {
      if (typeof (locals as any)?.runtime?.ctx?.waitUntil === 'function') {
        (locals as any).runtime.ctx.waitUntil(cache.put(cacheKey, response.clone()));
      }
    } catch {}
  }

  return response;
};
