/**
 * Cloudflare API Client & Edge Cache Purge Manager (Phase 6)
 * Handles authentic Cloudflare API token verification, cache purging,
 * and real GraphQL zone cache metrics.
 *
 * SECURITY:
 * - Tokens are stored securely in D1 or environment secrets
 * - Tokens are NEVER returned to the client/browser
 * - Uses least-privilege permissions (Zone.Cache Purge, Zone.Analytics:Read)
 */

import { getDb } from '../db';
import { getRuntimeEnvSync } from '../cloudflare-env';
import { calculators } from '../../data/calculators';
import type {
  CloudflareConfig,
  CachePurgeRequest,
  CachePurgeResult,
  RealCacheMetrics,
} from './types';

const SITE_ORIGIN = 'https://aifreecalculator.com';
const WWW_ORIGIN = 'https://www.aifreecalculator.com';

/**
 * Retrieves the stored Cloudflare configuration from environment or D1.
 * Never exposes raw token to untrusted callers.
 */
export async function getCloudflareConfig(locals?: any): Promise<CloudflareConfig> {
  const env = getRuntimeEnvSync(locals);

  // 1. Check direct Cloudflare Worker secrets
  const envToken = env.CLOUDFLARE_API_TOKEN as string | undefined;
  const envZoneId = env.CLOUDFLARE_ZONE_ID as string | undefined;
  const envAccountId = env.CLOUDFLARE_ACCOUNT_ID as string | undefined;

  if (envToken && envZoneId) {
    return {
      apiToken: envToken,
      zoneId: envZoneId,
      accountId: envAccountId,
      status: 'connected',
      zoneName: 'aifreecalculator.com',
    };
  }

  // 2. Check D1 site_settings table
  try {
    const db = getDb(locals);
    await db.exec('CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)');
    const row = await db
      .prepare('SELECT value FROM site_settings WHERE key = ?')
      .bind('cms_cloudflare_config')
      .first<{ value: string }>();

    if (row?.value) {
      const parsed = JSON.parse(row.value);
      if (parsed.apiToken && parsed.zoneId) {
        return {
          apiToken: parsed.apiToken,
          zoneId: parsed.zoneId,
          accountId: parsed.accountId,
          status: parsed.status || 'connected',
          lastVerified: parsed.lastVerified,
          zoneName: parsed.zoneName || 'aifreecalculator.com',
        };
      }
    }
  } catch {
    // Fail safely
  }

  return {
    status: 'not_connected',
  };
}

/**
 * Returns safe masked configuration for Admin UI rendering (token masked with asterisks).
 */
export function getMaskedCloudflareConfig(config: CloudflareConfig): Omit<CloudflareConfig, 'apiToken'> & { maskedToken?: string } {
  if (!config.apiToken) {
    return {
      status: config.status,
      zoneId: config.zoneId,
      zoneName: config.zoneName,
      lastVerified: config.lastVerified,
    };
  }

  const raw = config.apiToken.trim();
  const lastFour = raw.slice(-4);
  const masked = `••••••••••••••••••••${lastFour}`;

  return {
    status: config.status,
    zoneId: config.zoneId,
    zoneName: config.zoneName,
    lastVerified: config.lastVerified,
    maskedToken: masked,
  };
}

/**
 * Tests connection to Cloudflare API using the provided token and zone ID.
 */
export async function testCloudflareConnection(
  apiToken: string,
  zoneId: string
): Promise<{ success: boolean; zoneName?: string; error?: string }> {
  try {
    const cleanToken = apiToken.trim();
    const cleanZoneId = zoneId.trim();

    if (!cleanToken || !cleanZoneId) {
      return { success: false, error: 'Both Cloudflare API Token and Zone ID are required.' };
    }

    // 1. Verify token status
    const tokenRes = await fetch('https://api.cloudflare.com/client/v4/user/tokens/verify', {
      headers: {
        Authorization: `Bearer ${cleanToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!tokenRes.ok) {
      const errData = (await tokenRes.json().catch(() => ({}))) as any;
      const msg = errData?.errors?.[0]?.message || `Token verification failed (HTTP ${tokenRes.status})`;
      return { success: false, error: msg };
    }

    // 2. Verify Zone access
    const zoneRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${cleanZoneId}`, {
      headers: {
        Authorization: `Bearer ${cleanToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!zoneRes.ok) {
      const errData = (await zoneRes.json().catch(() => ({}))) as any;
      const msg = errData?.errors?.[0]?.message || `Zone verification failed (HTTP ${zoneRes.status}). Ensure token has Zone permissions.`;
      return { success: false, error: msg };
    }

    const zoneData = (await zoneRes.json()) as any;
    const zoneName = zoneData?.result?.name || 'aifreecalculator.com';

    return { success: true, zoneName };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network error connecting to Cloudflare API.' };
  }
}

/**
 * Saves and verifies Cloudflare credentials in D1 site_settings.
 */
export async function saveCloudflareConfig(
  params: { apiToken: string; zoneId: string; accountId?: string },
  locals?: any
): Promise<{ success: boolean; error?: string; config?: CloudflareConfig }> {
  const verification = await testCloudflareConnection(params.apiToken, params.zoneId);
  if (!verification.success) {
    return { success: false, error: verification.error };
  }

  const newConfig: CloudflareConfig = {
    apiToken: params.apiToken.trim(),
    zoneId: params.zoneId.trim(),
    accountId: params.accountId?.trim(),
    status: 'connected',
    zoneName: verification.zoneName,
    lastVerified: new Date().toISOString(),
  };

  try {
    const db = getDb(locals);
    await db.exec('CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)');
    await db
      .prepare('INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
      .bind('cms_cloudflare_config', JSON.stringify(newConfig))
      .run();

    return { success: true, config: newConfig };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to persist credentials to D1.' };
  }
}

/**
 * Disconnects Cloudflare API configuration.
 */
export async function deleteCloudflareConfig(locals?: any): Promise<void> {
  try {
    const db = getDb(locals);
    await db.prepare('DELETE FROM site_settings WHERE key = ?').bind('cms_cloudflare_config').run();
  } catch {}
}

/**
 * Resolves target into fully qualified URLs for Cloudflare and Worker Cache purge.
 */
function resolvePurgeUrls(req: CachePurgeRequest): string[] {
  const urls: string[] = [];

  if (req.target === 'homepage') {
    urls.push(`${SITE_ORIGIN}/`, `${WWW_ORIGIN}/`);
  } else if (req.target === 'url' && req.value) {
    let clean = req.value.trim();
    if (!clean.startsWith('http')) {
      if (!clean.startsWith('/')) clean = `/${clean}`;
      urls.push(`${SITE_ORIGIN}${clean}`);
      urls.push(`${WWW_ORIGIN}${clean}`);
    } else {
      urls.push(clean);
    }
  } else if (req.target === 'calculator' && req.value) {
    const calc = calculators.find((c) => c.slug === req.value || c.slug === `${req.value}-calculator`);
    if (calc) {
      urls.push(`${SITE_ORIGIN}${calc.path}`);
      urls.push(`${WWW_ORIGIN}${calc.path}`);
    }
  } else if (req.target === 'category' && req.value) {
    const cat = req.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    urls.push(`${SITE_ORIGIN}/${cat}/`);
    urls.push(`${WWW_ORIGIN}/${cat}/`);
  }

  return urls;
}

/**
 * Purges targeted files or entire cache from Cloudflare Edge and Worker Cache.
 */
export async function purgeCloudflareCache(
  req: CachePurgeRequest,
  locals?: any
): Promise<CachePurgeResult> {
  const config = await getCloudflareConfig(locals);
  const now = new Date().toISOString();

  let cloudflarePurged = false;
  let workerCachePurged = false;
  const isPurgeEverything = req.target === 'everything';
  const urls = isPurgeEverything ? [] : resolvePurgeUrls(req);

  // 1. Purge from in-worker Cache API (caches.default) if accessible
  try {
    const cache = typeof caches !== 'undefined' && (caches as any).default ? ((caches as any).default as Cache) : null;
    if (cache && urls.length > 0) {
      for (const u of urls) {
        await cache.delete(u);
      }
      workerCachePurged = true;
    }
  } catch {
    // Fail safely
  }

  // 2. Purge from Cloudflare Edge CDN using Cloudflare API
  if (config.apiToken && config.zoneId && config.status === 'connected') {
    try {
      let body: any;
      if (isPurgeEverything) {
        body = { purge_everything: true };
      } else {
        body = { files: urls };
      }

      const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${config.zoneId}/purge_cache`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        cloudflarePurged = true;
      }
    } catch {
      // Fail safely
    }
  }

  const msg = isPurgeEverything
    ? (cloudflarePurged
        ? 'Successfully sent global cache purge command to Cloudflare Edge CDN.'
        : 'Purge everything requires Cloudflare API connection. Please connect your API Token.')
    : (cloudflarePurged
        ? `Successfully purged ${urls.length} URLs from Cloudflare CDN Edge cache and Worker cache.`
        : workerCachePurged
        ? `Purged ${urls.length} URLs from local Worker Cache. Connect Cloudflare API for global edge purge.`
        : `Targeted ${urls.length} URLs. Connect Cloudflare API to execute instant edge purge.`);

  return {
    success: cloudflarePurged || workerCachePurged || !config.apiToken,
    purgedTarget: req.target,
    purgedUrls: urls,
    cloudflarePurged,
    workerCachePurged,
    message: msg,
    timestamp: now,
  };
}

/**
 * Queries Cloudflare GraphQL Analytics API for authentic Zone Cache Metrics.
 * Only called if Cloudflare API is connected; strictly never fabricates synthetic data.
 */
export async function fetchCloudflareCacheMetrics(
  range: 'today' | '7d' | '28d' | '3m' = '28d',
  locals?: any
): Promise<RealCacheMetrics> {
  const config = await getCloudflareConfig(locals);

  if (!config.apiToken || !config.zoneId || config.status !== 'connected') {
    return {
      connected: false,
      dateRange: range,
      totalRequests: null,
      cachedRequests: null,
      uncachedRequests: null,
      cacheHitRate: null,
      totalBytes: null,
      cachedBytes: null,
      bandwidthSavedPercent: null,
      lastUpdated: null,
      dataSource: 'not_connected',
    };
  }

  let days = 28;
  if (range === 'today') days = 1;
  else if (range === '7d') days = 7;
  else if (range === '3m') days = 90;

  const now = new Date();
  const until = now.toISOString().split('T')[0];
  const sinceDt = new Date(now.getTime() - (days - 1) * 24 * 60 * 60 * 1000);
  const since = sinceDt.toISOString().split('T')[0];

  const graphqlQuery = `
    query GetZoneCacheMetrics($zoneTag: string!, $since: string!, $until: string!) {
      viewer {
        zones(filter: { zoneTag: $zoneTag }) {
          httpRequests1dGroups(
            limit: 100
            filter: { date_geq: $since, date_leq: $until }
          ) {
            sum {
              requests
              cachedRequests
              bytes
              cachedBytes
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch('https://api.cloudflare.com/client/v4/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: {
          zoneTag: config.zoneId,
          since,
          until,
        },
      }),
    });

    if (!res.ok) {
      return {
        connected: true,
        dateRange: range,
        totalRequests: null,
        cachedRequests: null,
        uncachedRequests: null,
        cacheHitRate: null,
        totalBytes: null,
        cachedBytes: null,
        bandwidthSavedPercent: null,
        lastUpdated: new Date().toISOString(),
        dataSource: 'cloudflare_api',
      };
    }

    const data = (await res.json()) as any;
    const groups = data?.data?.viewer?.zones?.[0]?.httpRequests1dGroups || [];

    let totalRequests = 0;
    let cachedRequests = 0;
    let totalBytes = 0;
    let cachedBytes = 0;

    for (const g of groups) {
      if (g?.sum) {
        totalRequests += g.sum.requests || 0;
        cachedRequests += g.sum.cachedRequests || 0;
        totalBytes += g.sum.bytes || 0;
        cachedBytes += g.sum.cachedBytes || 0;
      }
    }

    const uncachedRequests = Math.max(0, totalRequests - cachedRequests);
    const cacheHitRate = totalRequests > 0 ? Number(((cachedRequests / totalRequests) * 100).toFixed(1)) : 0;
    const bandwidthSavedPercent = totalBytes > 0 ? Number(((cachedBytes / totalBytes) * 100).toFixed(1)) : 0;

    return {
      connected: true,
      dateRange: range,
      totalRequests,
      cachedRequests,
      uncachedRequests,
      cacheHitRate,
      totalBytes,
      cachedBytes,
      bandwidthSavedPercent,
      lastUpdated: new Date().toISOString(),
      dataSource: 'cloudflare_api',
    };
  } catch {
    return {
      connected: true,
      dateRange: range,
      totalRequests: null,
      cachedRequests: null,
      uncachedRequests: null,
      cacheHitRate: null,
      totalBytes: null,
      cachedBytes: null,
      bandwidthSavedPercent: null,
      lastUpdated: null,
      dataSource: 'cloudflare_api',
    };
  }
}
