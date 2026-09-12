import type { APIRoute } from 'astro';
import {
  DEFAULT_ADS_CONFIG,
  DEFAULT_SMART_THROTTLING,
  type AdsConfig,
  type AdSlotKey,
  type AdNetworkType,
  type SmartThrottlingConfig,
} from '../../lib/ads-config';
import { getDb } from '../../lib/db';
import { verifyAdminToken } from '../../lib/auth';
import { logAuditEvent, saveSettingsSnapshot } from '../../lib/admin/audit-store';

export const prerender = false;

const SETTINGS_KEY = 'adsense_config';

function normalizeSettings(stored: any): AdsConfig {
  const defaults = DEFAULT_ADS_CONFIG;
  if (!stored || typeof stored !== 'object') {
    return defaults;
  }

  let clientId = typeof stored.clientId === 'string' ? stored.clientId.trim() : defaults.clientId;
  if (clientId && clientId.startsWith('pub-')) {
    clientId = 'ca-' + clientId;
  }
  const isConfigured = Boolean(clientId && clientId.startsWith('ca-pub-') && clientId.length > 10);
  const enabled = typeof stored.enabled === 'boolean' ? stored.enabled : (isConfigured && stored.enabled !== false);
  const testMode = stored.testMode === true;
  const autoAds = stored.autoAds === true;

  const gaMeasurementId = typeof stored.gaMeasurementId === 'string' ? stored.gaMeasurementId.trim() : (defaults.gaMeasurementId || '');
  const includeGoogleAdsTxt = stored.includeGoogleAdsTxt !== undefined ? Boolean(stored.includeGoogleAdsTxt) : (defaults.includeGoogleAdsTxt !== false);
  const thirdPartyAdsTxt = typeof stored.thirdPartyAdsTxt === 'string' ? stored.thirdPartyAdsTxt : (defaults.thirdPartyAdsTxt || '');
  const customAdsTxt = typeof stored.customAdsTxt === 'string' ? stored.customAdsTxt : (defaults.customAdsTxt || '');
  const headerScript = typeof stored.headerScript === 'string' ? stored.headerScript : (defaults.headerScript || '');
  const customMetaTags = typeof stored.customMetaTags === 'string' ? stored.customMetaTags : (defaults.customMetaTags || '');

  // Smart Throttling config
  const rawThrottling = stored.smartThrottling || {};
  const smartThrottling: SmartThrottlingConfig = {
    enabled: typeof rawThrottling.enabled === 'boolean' ? rawThrottling.enabled : defaults.smartThrottling?.enabled ?? true,
    disableOnSlowConnection: typeof rawThrottling.disableOnSlowConnection === 'boolean' ? rawThrottling.disableOnSlowConnection : true,
    lazyLoadWithMargin: typeof rawThrottling.lazyLoadWithMargin === 'boolean' ? rawThrottling.lazyLoadWithMargin : true,
    lazyLoadMarginPx: typeof rawThrottling.lazyLoadMarginPx === 'number' ? Math.max(0, Math.min(1200, rawThrottling.lazyLoadMarginPx)) : 300,
    delayUntilInteraction: typeof rawThrottling.delayUntilInteraction === 'boolean' ? rawThrottling.delayUntilInteraction : false,
    maxMobileAds: typeof rawThrottling.maxMobileAds === 'number' ? Math.max(0, Math.min(10, rawThrottling.maxMobileAds)) : 2,
    preventClsPlaceholders: typeof rawThrottling.preventClsPlaceholders === 'boolean' ? rawThrottling.preventClsPlaceholders : true,
  };

  const slots: AdsConfig['slots'] = { ...defaults.slots };

  const slotKeys: AdSlotKey[] = ['top', 'inline', 'sidebar', 'footer'];
  for (const key of slotKeys) {
    const rawSlot = stored.slots?.[key];
    if (typeof rawSlot === 'string') {
      // Legacy format where slots was Record<string, string>
      slots[key] = {
        ...defaults.slots[key],
        slotId: rawSlot.trim(),
        enabled: Boolean(rawSlot.trim()),
        adNetwork: 'adsense',
        customCode: '',
      };
    } else if (rawSlot && typeof rawSlot === 'object') {
      let network: AdNetworkType = 'adsense';
      if (rawSlot.adNetwork === 'adx' || rawSlot.adNetwork === 'direct_sponsor' || rawSlot.adNetwork === 'affiliate') {
        network = rawSlot.adNetwork;
      }

      slots[key] = {
        ...defaults.slots[key],
        slotId: typeof rawSlot.slotId === 'string' ? rawSlot.slotId.trim() : defaults.slots[key].slotId,
        enabled: typeof rawSlot.enabled === 'boolean' ? rawSlot.enabled : true,
        adNetwork: network,
        customCode: typeof rawSlot.customCode === 'string' ? rawSlot.customCode : '',
        sponsorBannerUrl: typeof rawSlot.sponsorBannerUrl === 'string' ? rawSlot.sponsorBannerUrl.trim() : '',
        sponsorTargetUrl: typeof rawSlot.sponsorTargetUrl === 'string' ? rawSlot.sponsorTargetUrl.trim() : '',
        sponsorAltText: typeof rawSlot.sponsorAltText === 'string' ? rawSlot.sponsorAltText.trim() : '',
        sponsorBadgeText: typeof rawSlot.sponsorBadgeText === 'string' ? rawSlot.sponsorBadgeText.trim() : 'Sponsored',
        sponsorOpenInNewTab: rawSlot.sponsorOpenInNewTab !== false,
        sponsorRel: typeof rawSlot.sponsorRel === 'string' ? rawSlot.sponsorRel.trim() : 'sponsored nofollow noopener',
      };
    }
  }

  return {
    enabled,
    clientId,
    testMode,
    autoAds,
    isConfigured,
    gaMeasurementId,
    includeGoogleAdsTxt,
    thirdPartyAdsTxt,
    customAdsTxt,
    headerScript,
    customMetaTags,
    smartThrottling,
    slots,
  };
}

let inMemoryAdsConfig: { data: AdsConfig; expiry: number } | null = null;
const ADS_CONFIG_TTL = 300_000; // 5 minutes

export function invalidateAdsConfigCache(): void {
  inMemoryAdsConfig = null;
}

export async function readSettings(locals: App.Locals): Promise<AdsConfig> {
  const now = Date.now();
  if (inMemoryAdsConfig && inMemoryAdsConfig.expiry > now) {
    return inMemoryAdsConfig.data;
  }
  const db = getDb(locals);
  try {
    const row = await db.prepare('SELECT value FROM site_settings WHERE key = ?').bind(SETTINGS_KEY).first<{ value: string }>();
    if (row?.value) {
      const parsed = JSON.parse(row.value);
      const normalized = normalizeSettings(parsed);
      inMemoryAdsConfig = { data: normalized, expiry: now + ADS_CONFIG_TTL };
      return normalized;
    }
  } catch {
    // Database fallback
  }
  inMemoryAdsConfig = { data: DEFAULT_ADS_CONFIG, expiry: now + ADS_CONFIG_TTL };
  return DEFAULT_ADS_CONFIG;
}

export const GET: APIRoute = async ({ request, locals }) => {
  const cache = typeof caches !== 'undefined' && (caches as any).default ? ((caches as any).default as Cache) : null;
  const cacheKey = request.url;

  if (cache) {
    try {
      const cached = await cache.match(cacheKey);
      if (cached) return cached;
    } catch {}
  }

  const config = await readSettings(locals);
  const response = new Response(JSON.stringify(config), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      'Cloudflare-CDN-Cache-Control': 'max-age=86400, stale-while-revalidate=604800',
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


export const POST: APIRoute = async ({ request, cookies, locals }) => {
  let token = cookies.get('admin_session')?.value;

  if (!token) {
    const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');
    if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
      token = authHeader.substring(7).trim();
    }
  }

  if (!token) {
    const cookieHeader = request.headers.get('cookie') || request.headers.get('Cookie');
    token = cookieHeader?.match(/admin_session=([^;]+)/)?.[1]?.trim();
  }

  const admin = await verifyAdminToken(token);
  if (!admin) {
    return Response.json({
      error: 'Unauthorized. Please login again at /admin/barwalaoffice/',
      authenticated: false,
    }, { status: 401 });
  }

  try {
    const body = await request.json();
    const normalized = normalizeSettings(body);

    // Validate client ID if enabled and adsense is used
    if (normalized.enabled && normalized.clientId) {
      if (!/^ca-pub-\d{10,}$/.test(normalized.clientId)) {
        return Response.json({
          error: 'Publisher ID must be in format: ca-pub-XXXXXXXXXXXXXXXX (minimum 10 digits).',
        }, { status: 400 });
      }
    }

    // Save previous snapshot before writing changes
    const previousConfig = await readSettings(locals);
    await saveSettingsSnapshot(locals, previousConfig);

    const db = getDb(locals);
    await db.exec('CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)');
    await db
      .prepare('INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
      .bind(SETTINGS_KEY, JSON.stringify(normalized))
      .run();

    // Invalidate in-memory cache and Cloudflare edge cache
    invalidateAdsConfigCache();
    const edgeCache = typeof caches !== 'undefined' && (caches as any).default ? ((caches as any).default as Cache) : null;
    if (edgeCache) {
      try {
        await edgeCache.delete(request.url);
      } catch {}
    }

    // Log audit event
    const activeNetworks = Object.entries(normalized.slots).map(([slot, cfg]) => `${slot}:${cfg.adNetwork}`);
    await logAuditEvent(locals, {
      action: 'SETTINGS_UPDATE',
      category: 'monetization',
      user: admin.username,
      summary: `Updated ad monetization settings (Networks: ${activeNetworks.join(', ')})`,
      details: {
        siteWideAds: normalized.enabled,
        testMode: normalized.testMode,
        smartThrottling: normalized.smartThrottling?.enabled,
        networks: activeNetworks,
      },
    });

    return Response.json({
      success: true,
      message: 'Monetization & ad settings saved and published successfully.',
      settings: normalized,
    });
  } catch (err: any) {
    return Response.json({ error: err.message || 'Failed to save AdSense settings.' }, { status: 500 });
  }
};

