/**
 * Google Search Console Snapshot & Caching Storage
 * Uses Cloudflare D1 (site_settings / gsc_snapshots) with zero-breaking fallback.
 */

import { getDb, type D1Database } from '../db';
import { getRuntimeEnvSync } from '../cloudflare-env';
import type {
  GscCredentials,
  GscDateRange,
  GscSyncSnapshot,
} from './gsc-types';
import { fetchGscDatasetForRange, testGscConnection } from './gsc-client';
import { detectSeoOpportunities } from './opportunity-engine';
import { detectContentDecay } from './decay-detector';
import { computeCalculatorSeoScores } from './calculator-score';

const DEFAULT_PROPERTY_URL = 'https://aifreecalculator.com/';
const CACHE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours cache TTL

/**
 * Resolves Google Search Console credentials from environment or D1 site_settings
 */
export async function getGscCredentials(locals?: any): Promise<GscCredentials | null> {
  const env = getRuntimeEnvSync(locals);

  // 1. Check direct environment variables / secrets
  if (env.GSC_SERVICE_ACCOUNT_KEY) {
    try {
      const parsed = typeof env.GSC_SERVICE_ACCOUNT_KEY === 'string'
        ? JSON.parse(env.GSC_SERVICE_ACCOUNT_KEY)
        : env.GSC_SERVICE_ACCOUNT_KEY;

      if (parsed.client_email && parsed.private_key) {
        return {
          clientEmail: parsed.client_email,
          privateKey: parsed.private_key,
          propertyUrl: env.GSC_PROPERTY_URL || DEFAULT_PROPERTY_URL,
        };
      }
    } catch {}
  }

  if (env.GSC_CLIENT_EMAIL && env.GSC_PRIVATE_KEY) {
    return {
      clientEmail: env.GSC_CLIENT_EMAIL,
      privateKey: env.GSC_PRIVATE_KEY,
      propertyUrl: env.GSC_PROPERTY_URL || DEFAULT_PROPERTY_URL,
    };
  }

  // 2. Check site_settings in D1 / local store
  try {
    const db = getDb(locals);
    const row = await db.prepare('SELECT value FROM site_settings WHERE key = ?').bind('cms_gsc_credentials').first<{ value: string }>();
    if (row?.value) {
      const parsed = JSON.parse(row.value);
      if (parsed.clientEmail && parsed.privateKey) {
        return {
          clientEmail: parsed.clientEmail,
          privateKey: parsed.privateKey,
          propertyUrl: parsed.propertyUrl || env.GSC_PROPERTY_URL || DEFAULT_PROPERTY_URL,
        };
      }
    }
  } catch {}

  return null;
}

/**
 * Saves Google Search Console credentials securely to D1 site_settings
 */
export async function saveGscCredentials(
  locals: any,
  credentials: { clientEmail: string; privateKey: string; propertyUrl?: string }
): Promise<{ success: boolean; message: string }> {
  const propertyUrl = credentials.propertyUrl?.trim() || DEFAULT_PROPERTY_URL;
  const creds: GscCredentials = {
    clientEmail: credentials.clientEmail.trim(),
    privateKey: credentials.privateKey.trim(),
    propertyUrl,
  };

  // Test credentials against Google API before saving
  const testRes = await testGscConnection(creds);
  if (!testRes.success) {
    return {
      success: false,
      message: `Failed to authenticate with Google Search Console: ${testRes.message}`,
    };
  }

  try {
    const db = getDb(locals);
    await db.exec('CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)');
    await db
      .prepare('INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
      .bind('cms_gsc_credentials', JSON.stringify(creds))
      .run();

    return {
      success: true,
      message: 'Google Search Console credentials validated and saved successfully.',
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, message: `Failed to save credentials: ${msg}` };
  }
}

/**
 * Retrieves the cached GSC snapshot for a date range, or null if missing/expired
 */
export async function getCachedGscSnapshot(
  locals: any,
  range: GscDateRange = '28d'
): Promise<GscSyncSnapshot | null> {
  try {
    const db = getDb(locals);
    const row = await db.prepare('SELECT value FROM site_settings WHERE key = ?').bind(`cms_gsc_snapshot_${range}`).first<{ value: string }>();
    if (row?.value) {
      const parsed = JSON.parse(row.value) as GscSyncSnapshot;
      return parsed;
    }
  } catch {}
  return null;
}

/**
 * Saves a GSC performance snapshot to cache in D1
 */
export async function saveCachedGscSnapshot(
  locals: any,
  range: GscDateRange,
  snapshot: GscSyncSnapshot
): Promise<void> {
  try {
    const db = getDb(locals);
    await db.exec('CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)');
    await db
      .prepare('INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
      .bind(`cms_gsc_snapshot_${range}`, JSON.stringify(snapshot))
      .run();
  } catch {}
}

/**
 * High-level Sync Function:
 * Fetches fresh GSC data from Google API, computes opportunities, decay alerts, and scores, then saves to cache.
 */
export async function syncGscPerformanceData(
  locals: any,
  range: GscDateRange = '28d',
  forceRefresh = false
): Promise<GscSyncSnapshot> {
  const credentials = await getGscCredentials(locals);

  // If not configured, return clean unconfigured state (zero fake data)
  if (!credentials) {
    return {
      status: 'not_configured',
      lastSyncedAt: null,
      propertyUrl: DEFAULT_PROPERTY_URL,
      data: {},
    };
  }

  // Check cache if not forcing refresh
  if (!forceRefresh) {
    const cached = await getCachedGscSnapshot(locals, range);
    if (cached && cached.lastSyncedAt) {
      const lastSyncTime = new Date(cached.lastSyncedAt).getTime();
      if (Date.now() - lastSyncTime < CACHE_TTL_MS) {
        return cached;
      }
    }
  }

  try {
    // 1. Fetch raw datasets from Google Search Console API
    const dataset = await fetchGscDatasetForRange(credentials, range);

    // 2. Compute opportunities
    const opportunities = detectSeoOpportunities(
      dataset.topPages,
      dataset.topQueries,
      dataset.pageQueryData
    );

    // 3. Detect content decay
    const decayAlerts = detectContentDecay(dataset.topPages);

    // 4. Compute calculator SEO scores
    const calculatorScores = computeCalculatorSeoScores(dataset.topPages, decayAlerts);

    const snapshot: GscSyncSnapshot = {
      status: 'connected',
      lastSyncedAt: new Date().toISOString(),
      propertyUrl: credentials.propertyUrl,
      clientEmail: credentials.clientEmail,
      data: {
        [range]: {
          performance: dataset.performance,
          topPages: dataset.topPages,
          topQueries: dataset.topQueries,
          opportunities,
          decayAlerts,
          calculatorScores,
        },
      },
    };

    // Save snapshot to D1
    await saveCachedGscSnapshot(locals, range, snapshot);

    return snapshot;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('[GSC Sync Error]:', errorMessage);

    // Return error snapshot preserving last cached data if available
    const existing = await getCachedGscSnapshot(locals, range);
    return {
      status: 'error',
      lastSyncedAt: existing?.lastSyncedAt || null,
      propertyUrl: credentials.propertyUrl,
      clientEmail: credentials.clientEmail,
      errorMessage,
      data: existing?.data || {},
    };
  }
}
