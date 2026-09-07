/**
 * Instant Indexing Service (Google Indexing API & IndexNow Protocol)
 * Real-time crawl request dispatcher for Bing, Yandex, Naver, and Google.
 */

import { getDb } from '../db';
import { getValidGoogleAccessToken } from '../auth/google-oauth';
import { getGscCredentials } from './gsc-store';
import { calculators } from '../../data/calculators';

export interface IndexingLogItem {
  id: string;
  url: string;
  provider: 'indexnow' | 'google' | 'both';
  action: 'URL_UPDATED' | 'URL_DELETED';
  status: 'success' | 'failed' | 'partial';
  timestamp: string;
  responseMessage?: string;
}

const INDEXNOW_KEY_SETTING = 'indexnow_api_key';
const INDEXING_LOGS_SETTING = 'instant_indexing_logs';
const DEFAULT_HOST = 'aifreecalculator.com';

/**
 * Gets or creates the persistent IndexNow API key.
 */
export async function getOrCreateIndexNowKey(locals?: any): Promise<string> {
  try {
    const db = getDb(locals);
    await db.exec('CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)');
    const row = await db
      .prepare('SELECT value FROM site_settings WHERE key = ?')
      .bind(INDEXNOW_KEY_SETTING)
      .first<{ value: string }>();

    if (row?.value) {
      return row.value;
    }

    // Generate a clean 32-character hexadecimal key
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    const key = Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');

    await db
      .prepare('INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
      .bind(INDEXNOW_KEY_SETTING, key)
      .run();

    return key;
  } catch {
    return 'afc8942b0f49a718c39e0811e548d79b';
  }
}

/**
 * Submits URL(s) to IndexNow API (Bing, Yandex, Naver, Seznam)
 */
export async function submitToIndexNow(
  urls: string[],
  host = DEFAULT_HOST,
  locals?: any
): Promise<{ success: boolean; statusCode: number; message: string }> {
  if (!urls.length) {
    return { success: false, statusCode: 400, message: 'No URLs provided' };
  }

  const apiKey = await getOrCreateIndexNowKey(locals);
  const keyLocation = `https://${host}/${apiKey}.txt`;

  try {
    const payload = {
      host,
      key: apiKey,
      keyLocation,
      urlList: urls,
    };

    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (res.status === 200 || res.status === 202) {
      return {
        success: true,
        statusCode: res.status,
        message: `Submitted ${urls.length} URL(s) successfully to IndexNow (Bing/Yandex).`,
      };
    }

    const text = await res.text();
    return {
      success: false,
      statusCode: res.status,
      message: `IndexNow responded with status ${res.status}: ${text || 'Unknown response'}`,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, statusCode: 500, message: `IndexNow connection error: ${msg}` };
  }
}

/**
 * Submits a URL to Google Indexing API (using direct Gmail OAuth token or Service Account)
 */
export async function submitToGoogleIndexing(
  url: string,
  type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED',
  locals?: any
): Promise<{ success: boolean; message: string }> {
  // 1. Try OAuth token from direct Gmail login
  let token = await getValidGoogleAccessToken(locals);

  // 2. Fallback to service account token if available
  if (!token) {
    const creds = await getGscCredentials(locals);
    if (creds?.accessToken) {
      token = creds.accessToken;
    }
  }

  if (!token) {
    return {
      success: false,
      message: 'Google Account not connected. Please connect with Google (Gmail) in Settings.',
    };
  }

  try {
    const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        type,
      }),
    });

    if (res.ok) {
      const data = (await res.json()) as any;
      const notifyTime = data.urlNotificationMetadata?.latestUpdate?.notifyTime || new Date().toISOString();
      return {
        success: true,
        message: `Google Indexing notified for ${url} at ${notifyTime}`,
      };
    }

    const errorBody = await res.text();
    return {
      success: false,
      message: `Google Indexing API error (${res.status}): ${errorBody}`,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, message: `Google Indexing error: ${msg}` };
  }
}

/**
 * Dispatches Instant Indexing to all supported search engines
 */
export async function dispatchInstantIndexing(
  urls: string[],
  action: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED',
  locals?: any
): Promise<IndexingLogItem> {
  const host = DEFAULT_HOST;
  const targetUrls = urls.map((u) => (u.startsWith('http') ? u : `https://${host}${u}`));

  let indexNowSuccess = false;
  let googleSuccess = false;
  let summary = '';

  // 1. Submit to IndexNow (Bing/Yandex)
  const indexNowRes = await submitToIndexNow(targetUrls, host, locals);
  indexNowSuccess = indexNowRes.success;
  summary += `IndexNow: ${indexNowRes.message}. `;

  // 2. Submit to Google (if 1 URL, or first URL)
  if (targetUrls.length > 0) {
    const googleRes = await submitToGoogleIndexing(targetUrls[0], action, locals);
    googleSuccess = googleRes.success;
    summary += `Google: ${googleRes.message}`;
  }

  const overallStatus =
    indexNowSuccess && googleSuccess ? 'success' : indexNowSuccess || googleSuccess ? 'partial' : 'failed';

  const logItem: IndexingLogItem = {
    id: `idx_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    url: targetUrls.length === 1 ? targetUrls[0] : `${targetUrls.length} URLs (Batch)`,
    provider: 'both',
    action,
    status: overallStatus,
    timestamp: new Date().toISOString(),
    responseMessage: summary,
  };

  // Record log in D1
  try {
    const db = getDb(locals);
    const existing = await db
      .prepare('SELECT value FROM site_settings WHERE key = ?')
      .bind(INDEXING_LOGS_SETTING)
      .first<{ value: string }>();

    let logs: IndexingLogItem[] = [];
    if (existing?.value) {
      try {
        logs = JSON.parse(existing.value);
      } catch {}
    }

    logs.unshift(logItem);
    if (logs.length > 50) logs = logs.slice(0, 50);

    await db
      .prepare('INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
      .bind(INDEXING_LOGS_SETTING, JSON.stringify(logs))
      .run();
  } catch {}

  return logItem;
}

/**
 * Returns recent indexing history
 */
export async function getIndexingHistory(locals?: any): Promise<IndexingLogItem[]> {
  try {
    const db = getDb(locals);
    const row = await db
      .prepare('SELECT value FROM site_settings WHERE key = ?')
      .bind(INDEXING_LOGS_SETTING)
      .first<{ value: string }>();

    if (row?.value) {
      return JSON.parse(row.value) as IndexingLogItem[];
    }
  } catch {}

  return [];
}
