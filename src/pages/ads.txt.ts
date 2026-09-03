import type { APIRoute } from 'astro';
import { DEFAULT_ADS_CONFIG, type AdsConfig } from '../lib/ads-config';
import { getDb } from '../lib/db';

export const prerender = false;

const SETTINGS_KEY = 'adsense_config';

export const GET: APIRoute = async ({ locals }) => {
  let config: AdsConfig = DEFAULT_ADS_CONFIG;

  try {
    const db = getDb(locals);
    const row = await db.prepare('SELECT value FROM site_settings WHERE key = ?').bind(SETTINGS_KEY).first<{ value: string }>();
    if (row?.value) {
      config = JSON.parse(row.value);
    }
  } catch {
    // Fallback to default
  }

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

  const output = lines.join('\n').trim();

  return new Response(output ? output + '\n' : '', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=1800, s-maxage=3600',
    },
  });
};
