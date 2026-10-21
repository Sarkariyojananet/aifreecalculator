/**
 * Instant Indexing Service (IndexNow Protocol)
 * Lightweight crawl request verification and key provider for search engines.
 */

import { getDb } from '../db';

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
const DEFAULT_HOST = 'aifreecalculator.com';

/**
 * Gets or creates the persistent IndexNow API key.
 * Used by [key].txt.ts to verify ownership to search engine crawlers.
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
): Promise<{ success: boolean; message: string; statusCode?: number }> {
  try {
    const key = await getOrCreateIndexNowKey(locals);
    const keyLocation = `https://${host}/${key}.txt`;

    const payload = {
      host,
      key,
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
      return { success: true, message: `Submitted ${urls.length} URLs to IndexNow`, statusCode: res.status };
    }

    return {
      success: false,
      message: `IndexNow responded with HTTP ${res.status}`,
      statusCode: res.status,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, message: `IndexNow submission error: ${msg}` };
  }
}
