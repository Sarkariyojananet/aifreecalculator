import type { APIRoute } from 'astro';
import { type AdsConfig } from '../lib/ads-config';
import { readSettings } from './api/adsense-config';
import { safeWaitUntil } from '../lib/cloudflare-env';

export const prerender = false;

const TEXT_PLAIN_HEADERS = {
  'Content-Type': 'text/plain; charset=utf-8',
  'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
  'Cloudflare-CDN-Cache-Control': 'max-age=604800, stale-while-revalidate=86400',
} as const;

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

  // 1. Google AdSense Primary Direct Line
  const clientId = (config.clientId || '').trim();
  const includeGoogle = config.includeGoogleAdsTxt !== false;
  if (includeGoogle && clientId && clientId.startsWith('ca-pub-') && !clientId.includes('XXXX')) {
    const pubOnly = clientId.replace('ca-', '');
    lines.push(`google.com, ${pubOnly}, DIRECT, f08c47fec0942fa0`);
  }

  // 2. 3rd-Party Ad Networks ads.txt entries (Media.net, Ezoic, Pubmatic, AdX Resellers, etc.)
  const thirdParty = (config.thirdPartyAdsTxt || '').trim();
  if (thirdParty) {
    lines.push(thirdParty);
  }

  // 3. Custom / Extra ads.txt entries
  const custom = (config.customAdsTxt || '').trim();
  if (custom && custom !== thirdParty) {
    lines.push(custom);
  }

  // 4. Default Fallback Guarantee: Never return empty ads.txt
  if (lines.length === 0) {
    const envClientId = (locals?.runtime?.env as any)?.PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-4283234479329006';
    const pubId = envClientId.replace(/^ca-/, '');
    lines.push(`google.com, ${pubId}, DIRECT, f08c47fec0942fa0`);
  }

  const output = lines.join('\n').trim();

  const response = new Response(output + '\n', {
    status: 200,
    headers: TEXT_PLAIN_HEADERS,
  });

  if (cache && output) {
    safeWaitUntil(locals, cache.put(cacheKey, response.clone()));
  }

  return response;
};
