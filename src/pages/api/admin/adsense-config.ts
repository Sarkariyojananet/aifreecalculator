import type { APIRoute } from 'astro';
import {
  DEFAULT_ADS_CONFIG,
  DEFAULT_SMART_THROTTLING,
  type AdsConfig,
  type AdSlotKey,
  type AdNetworkType,
  type SmartThrottlingConfig,
} from '../../../lib/ads-config';
import { getDb } from '../../../lib/db';
import { verifyAdminToken } from '../../../lib/auth';
import { logAuditEvent, saveSettingsSnapshot } from '../../../lib/admin/audit-store';

export const prerender = false;

const SETTINGS_KEY = 'adsense_config';

export function normalizeSettings(stored: any): AdsConfig {
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
  const approvalMode = stored.approvalMode !== undefined ? Boolean(stored.approvalMode) : (defaults.approvalMode ?? true);

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
    approvalMode,
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

let inMemoryAdsConfig: { data: AdsConfig; fullJson: string; expiry: number } | null = null;
const ADS_CONFIG_TTL = 600_000; // 10 minutes

export function invalidateAdsConfigCache(): void {
  inMemoryAdsConfig = null;
}

export async function readSettingsWithJson(locals: App.Locals): Promise<{ data: AdsConfig; fullJson: string }> {
  const now = Date.now();
  if (inMemoryAdsConfig && inMemoryAdsConfig.expiry > now) {
    return inMemoryAdsConfig;
  }
  const db = getDb(locals);
  try {
    const row = await db.prepare('SELECT value FROM site_settings WHERE key = ?').bind(SETTINGS_KEY).first<{ value: string }>();
    if (row?.value) {
      const parsed = JSON.parse(row.value);
      const normalized = normalizeSettings(parsed);
      const fullJson = JSON.stringify(normalized);
      inMemoryAdsConfig = { data: normalized, fullJson, expiry: now + ADS_CONFIG_TTL };
      return inMemoryAdsConfig;
    }
  } catch {
    // Database fallback
  }
  const defaultFullJson = JSON.stringify(DEFAULT_ADS_CONFIG);
  inMemoryAdsConfig = { data: DEFAULT_ADS_CONFIG, fullJson: defaultFullJson, expiry: now + ADS_CONFIG_TTL };
  return inMemoryAdsConfig;
}

export async function readSettings(locals: App.Locals): Promise<AdsConfig> {
  const result = await readSettingsWithJson(locals);
  return result.data;
}

function extractToken(request: Request, cookies: any): string | undefined {
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
  return token;
}

export const GET: APIRoute = async ({ request, cookies, locals }) => {
  const token = extractToken(request, cookies);
  const isAdmin = token ? await verifyAdminToken(token) : null;

  if (!isAdmin) {
    return new Response(JSON.stringify({ error: 'Unauthorized. Admin credentials required.' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  }

  const { fullJson } = await readSettingsWithJson(locals);
  return new Response(fullJson, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'private, no-cache, no-store, must-revalidate',
    },
  });
};

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  const token = extractToken(request, cookies);
  const admin = token ? await verifyAdminToken(token) : null;

  if (!admin) {
    return Response.json({
      error: 'Unauthorized. Please login again at /admin/barwalaoffice/',
      authenticated: false,
    }, { status: 401 });
  }

  try {
    const body = await request.json();
    const normalized = normalizeSettings(body);

    if (normalized.enabled && normalized.clientId) {
      if (!/^ca-pub-\d{10,}$/.test(normalized.clientId)) {
        return Response.json({
          error: 'Publisher ID must be in format: ca-pub-XXXXXXXXXXXXXXXX (minimum 10 digits).',
        }, { status: 400 });
      }
    }

    const previousConfig = await readSettings(locals);
    await saveSettingsSnapshot(locals, previousConfig);

    const db = getDb(locals);
    await db.exec('CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)');
    await db
      .prepare('INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
      .bind(SETTINGS_KEY, JSON.stringify(normalized))
      .run();

    invalidateAdsConfigCache();

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
      message: 'Monetization & ad settings saved to D1 successfully. Note: Static public config (/adsense-config.json) requires a new build/deployment to update.',
      settings: normalized,
    });
  } catch (err: any) {
    return Response.json({ error: err.message || 'Failed to save AdSense settings.' }, { status: 500 });
  }
};
