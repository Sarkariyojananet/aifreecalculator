/**
 * SEO Change History Tracker
 * Records every metadata modification made via Admin CMS for auditing & version safety.
 */

import { getDb } from '../db';

export interface SEOChangeRecord {
  id: string;
  pagePath: string;
  pageName: string;
  field: 'metaTitle' | 'metaDescription' | 'canonicalUrl' | 'robots' | 'keywords' | 'faqs' | 'featured';
  oldValue: string;
  newValue: string;
  changedAt: string;
  adminUser: string;
}

const HISTORY_KEY = 'cms_seo_change_history';

/**
 * SCALABILITY LIMITATION:
 * Change history is stored as a single JSON blob in the site_settings D1 table.
 * It is capped at 250 records (oldest are dropped when the cap is reached).
 * This is sufficient for typical admin workflows but is not suitable for
 * high-volume or compliance-grade audit trails.
 * If scalability is required, migrate to a dedicated D1 table with indexed rows.
 */

/**
 * Retrieve recent SEO modification history
 */
export async function getSEOChangeHistory(locals?: any): Promise<SEOChangeRecord[]> {
  const db = getDb(locals);
  try {
    await db.exec('CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)');
    const row = await db.prepare('SELECT value FROM site_settings WHERE key = ?').bind(HISTORY_KEY).first<{ value: string }>();
    if (row?.value) {
      return JSON.parse(row.value) as SEOChangeRecord[];
    }
  } catch {}

  // No history stored yet — return empty array.
  // History will populate as admins make changes via Bulk Editor or SEO tools.
  return [];
}

/**
 * Record a single or multiple SEO modifications
 */
export async function recordBulkSEOChanges(
  changes: Array<{
    pagePath: string;
    pageName: string;
    field: 'metaTitle' | 'metaDescription' | 'canonicalUrl' | 'robots' | 'keywords' | 'faqs' | 'featured';
    oldValue: string;
    newValue: string;
    adminUser: string;
  }>,
  locals?: any
): Promise<void> {
  if (!changes || changes.length === 0) return;

  const current = await getSEOChangeHistory(locals);

  const newRecords: SEOChangeRecord[] = changes.map((c) => ({
    id: `seo_chg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    ...c,
    changedAt: new Date().toISOString(),
  }));

  // Keep latest 250 records
  const updated = [...newRecords, ...current].slice(0, 250);

  const db = getDb(locals);
  try {
    await db.exec('CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)');
    await db
      .prepare('INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
      .bind(HISTORY_KEY, JSON.stringify(updated))
      .run();
  } catch {}
}
