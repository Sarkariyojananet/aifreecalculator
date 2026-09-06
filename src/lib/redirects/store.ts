/**
 * Cloudflare D1 Storage for 404 Monitor & Redirects
 */

import { getDb, type D1Database } from '../db';
import type { Log404Entry, Log404Status, RedirectHistoryEntry, RedirectPriority, RedirectSummaryKPIs } from './types';
import { getRedirectRules } from '../admin/content-store';
import { auditAllRedirectRules } from './validator';

let tablesInitialized = false;

export async function init404Store(locals?: any): Promise<void> {
  if (tablesInitialized) return;
  const db = getDb(locals);

  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS cms_404_logs (
        path TEXT PRIMARY KEY,
        first_seen TEXT NOT NULL,
        last_seen TEXT NOT NULL,
        hit_count INTEGER NOT NULL DEFAULT 1,
        recent_hit_count INTEGER NOT NULL DEFAULT 1,
        recent_window_start TEXT NOT NULL,
        referrer TEXT,
        device_category TEXT DEFAULT 'desktop',
        suggested_destination TEXT,
        suggestion_confidence INTEGER DEFAULT 0,
        suggestion_reason TEXT,
        priority TEXT NOT NULL DEFAULT 'low',
        status TEXT NOT NULL DEFAULT 'active',
        redirect_id TEXT,
        gsc_impressions INTEGER DEFAULT 0,
        gsc_clicks INTEGER DEFAULT 0
      );

      CREATE INDEX IF NOT EXISTS idx_404_status_priority ON cms_404_logs(status, priority);
      CREATE INDEX IF NOT EXISTS idx_404_last_seen ON cms_404_logs(last_seen);

      CREATE TABLE IF NOT EXISTS cms_redirect_history (
        id TEXT PRIMARY KEY,
        rule_id TEXT NOT NULL,
        action TEXT NOT NULL,
        source TEXT NOT NULL,
        destination TEXT NOT NULL,
        status_code INTEGER NOT NULL,
        admin_user TEXT DEFAULT 'admin',
        timestamp TEXT NOT NULL,
        note TEXT
      );

      CREATE INDEX IF NOT EXISTS idx_redir_history_timestamp ON cms_redirect_history(timestamp);
    `);
    tablesInitialized = true;
  } catch (err) {
    // Fail safely if database is read-only or in local memory mode
  }
}

/**
 * Inserts or increments a 404 hit entry in D1.
 */
export async function upsert404Hit(
  entry: {
    path: string;
    referrer?: string;
    deviceCategory: string;
    suggestedDestination?: string;
    suggestionConfidence?: number;
    suggestionReason?: string;
    priority: RedirectPriority;
    gscImpressions?: number;
    gscClicks?: number;
  },
  locals?: any
): Promise<void> {
  await init404Store(locals);
  const db = getDb(locals);
  const now = new Date().toISOString();
  const windowThresholdMs = 24 * 60 * 60 * 1000; // 24-hour rolling window

  try {
    const existing = await db
      .prepare('SELECT path, first_seen, hit_count, recent_hit_count, recent_window_start, status FROM cms_404_logs WHERE path = ?')
      .bind(entry.path)
      .first<{
        path: string;
        first_seen: string;
        hit_count: number;
        recent_hit_count: number;
        recent_window_start: string;
        status: string;
      }>();

    if (existing) {
      const windowStart = new Date(existing.recent_window_start).getTime();
      const isWindowExpired = Date.now() - windowStart > windowThresholdMs;
      const newRecentHits = isWindowExpired ? 1 : existing.recent_hit_count + 1;
      const newWindowStart = isWindowExpired ? now : existing.recent_window_start;
      const newTotalHits = existing.hit_count + 1;

      // Keep existing status if ignored or redirected, otherwise active
      const statusToKeep = existing.status || 'active';

      await db
        .prepare(`
          UPDATE cms_404_logs
          SET last_seen = ?,
              hit_count = ?,
              recent_hit_count = ?,
              recent_window_start = ?,
              referrer = COALESCE(?, referrer),
              device_category = ?,
              priority = ?,
              suggested_destination = COALESCE(?, suggested_destination),
              suggestion_confidence = MAX(?, suggestion_confidence),
              suggestion_reason = COALESCE(?, suggestion_reason)
          WHERE path = ?
        `)
        .bind(
          now,
          newTotalHits,
          newRecentHits,
          newWindowStart,
          entry.referrer || null,
          entry.deviceCategory,
          entry.priority,
          entry.suggestedDestination || null,
          entry.suggestionConfidence || 0,
          entry.suggestionReason || null,
          entry.path
        )
        .run();
    } else {
      await db
        .prepare(`
          INSERT INTO cms_404_logs (
            path, first_seen, last_seen, hit_count, recent_hit_count, recent_window_start,
            referrer, device_category, suggested_destination, suggestion_confidence,
            suggestion_reason, priority, status, gsc_impressions, gsc_clicks
          ) VALUES (?, ?, ?, 1, 1, ?, ?, ?, ?, ?, ?, ?, 'active', ?, ?)
        `)
        .bind(
          entry.path,
          now,
          now,
          now,
          entry.referrer || null,
          entry.deviceCategory,
          entry.suggestedDestination || null,
          entry.suggestionConfidence || 0,
          entry.suggestionReason || null,
          entry.priority,
          entry.gscImpressions || 0,
          entry.gscClicks || 0
        )
        .run();
    }
  } catch (err) {
    // Fail safely to never throw on 404 logging
  }
}

/**
 * Fetches 404 logs with filtering, sorting, and pagination.
 */
export async function get404Logs(
  options: {
    status?: Log404Status | 'all';
    priority?: RedirectPriority | 'all';
    search?: string;
    limit?: number;
    offset?: number;
    sortBy?: 'last_seen' | 'hit_count' | 'recent_hit_count' | 'priority';
  } = {},
  locals?: any
): Promise<{ logs: Log404Entry[]; total: number }> {
  await init404Store(locals);
  const db = getDb(locals);

  const {
    status = 'active',
    priority = 'all',
    search = '',
    limit = 50,
    offset = 0,
    sortBy = 'last_seen',
  } = options;

  try {
    const whereClauses: string[] = [];
    const bindings: any[] = [];

    if (status !== 'all') {
      whereClauses.push('status = ?');
      bindings.push(status);
    }

    if (priority !== 'all') {
      whereClauses.push('priority = ?');
      bindings.push(priority);
    }

    if (search.trim()) {
      whereClauses.push('(path LIKE ? OR suggested_destination LIKE ? OR suggestion_reason LIKE ?)');
      const pattern = `%${search.trim().toLowerCase()}%`;
      bindings.push(pattern, pattern, pattern);
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    // Priority ordering helper
    let orderSql = 'ORDER BY last_seen DESC';
    if (sortBy === 'hit_count') orderSql = 'ORDER BY hit_count DESC';
    if (sortBy === 'recent_hit_count') orderSql = 'ORDER BY recent_hit_count DESC';
    if (sortBy === 'priority') {
      orderSql = `ORDER BY CASE priority
        WHEN 'critical' THEN 1
        WHEN 'high' THEN 2
        WHEN 'medium' THEN 3
        ELSE 4 END ASC, recent_hit_count DESC`;
    }

    const countRow = await db
      .prepare(`SELECT COUNT(*) as total FROM cms_404_logs ${whereSql}`)
      .bind(...bindings)
      .first<{ total: number }>();

    const total = countRow?.total || 0;

    const rows = await db
      .prepare(`SELECT * FROM cms_404_logs ${whereSql} ${orderSql} LIMIT ? OFFSET ?`)
      .bind(...bindings, limit, offset)
      .all<any>();

    const logs: Log404Entry[] = (rows?.results || []).map((r) => ({
      path: r.path,
      firstSeen: r.first_seen,
      lastSeen: r.last_seen,
      hitCount: r.hit_count,
      recentHitCount: r.recent_hit_count,
      recentWindowStart: r.recent_window_start,
      referrer: r.referrer || undefined,
      deviceCategory: (r.device_category || 'desktop') as any,
      suggestedDestination: r.suggested_destination || undefined,
      suggestionConfidence: r.suggestion_confidence || 0,
      suggestionReason: r.suggestion_reason || undefined,
      priority: r.priority as RedirectPriority,
      status: r.status as Log404Status,
      redirectId: r.redirect_id || undefined,
      gscImpressions: r.gsc_impressions || 0,
      gscClicks: r.gsc_clicks || 0,
    }));

    return { logs, total };
  } catch {
    return { logs: [], total: 0 };
  }
}

/**
 * Updates status of a 404 path ('active', 'ignored', 'redirected').
 */
export async function update404Status(
  path: string,
  status: Log404Status,
  redirectId?: string,
  locals?: any
): Promise<boolean> {
  await init404Store(locals);
  const db = getDb(locals);

  try {
    await db
      .prepare('UPDATE cms_404_logs SET status = ?, redirect_id = ? WHERE path = ?')
      .bind(status, redirectId || null, path)
      .run();
    return true;
  } catch {
    return false;
  }
}

/**
 * Permanently deletes a 404 log entry.
 */
export async function delete404Log(path: string, locals?: any): Promise<boolean> {
  await init404Store(locals);
  const db = getDb(locals);

  try {
    await db.prepare('DELETE FROM cms_404_logs WHERE path = ?').bind(path).run();
    return true;
  } catch {
    return false;
  }
}

/**
 * Calculates aggregate summary KPIs across 404s and redirect rules.
 */
export async function getRedirectSummaryKPIs(locals?: any): Promise<RedirectSummaryKPIs> {
  await init404Store(locals);
  const db = getDb(locals);

  let totalActive404s = 0;
  let highPriority404s = 0;
  let critical404s = 0;
  let total404Hits = 0;
  let redirectedCount = 0;
  let ignoredCount = 0;

  try {
    const statsRow = await db
      .prepare(`
        SELECT
          COUNT(CASE WHEN status = 'active' THEN 1 END) as active_count,
          COUNT(CASE WHEN status = 'active' AND (priority = 'critical' OR priority = 'high') THEN 1 END) as high_prio_count,
          COUNT(CASE WHEN status = 'active' AND priority = 'critical' THEN 1 END) as critical_count,
          COALESCE(SUM(hit_count), 0) as total_hits,
          COUNT(CASE WHEN status = 'redirected' THEN 1 END) as redirected_count,
          COUNT(CASE WHEN status = 'ignored' THEN 1 END) as ignored_count
        FROM cms_404_logs
      `)
      .first<{
        active_count: number;
        high_prio_count: number;
        critical_count: number;
        total_hits: number;
        redirected_count: number;
        ignored_count: number;
      }>();

    if (statsRow) {
      totalActive404s = statsRow.active_count || 0;
      highPriority404s = statsRow.high_prio_count || 0;
      critical404s = statsRow.critical_count || 0;
      total404Hits = statsRow.total_hits || 0;
      redirectedCount = statsRow.redirected_count || 0;
      ignoredCount = statsRow.ignored_count || 0;
    }
  } catch {}

  const rules = await getRedirectRules(locals);
  const chainReport = auditAllRedirectRules(rules);

  return {
    totalActive404s,
    highPriority404s,
    critical404s,
    total404Hits,
    redirectedCount,
    ignoredCount,
    activeRulesCount: rules.filter((r) => r.active !== false).length,
    detectedChainsCount: chainReport.chains.length,
  };
}

/**
 * Logs a redirect modification to history.
 */
export async function logRedirectHistory(
  entry: Omit<RedirectHistoryEntry, 'id' | 'timestamp'>,
  locals?: any
): Promise<void> {
  await init404Store(locals);
  const db = getDb(locals);
  const id = `rh-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const now = new Date().toISOString();

  try {
    await db
      .prepare(`
        INSERT INTO cms_redirect_history (
          id, rule_id, action, source, destination, status_code, admin_user, timestamp, note
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .bind(
        id,
        entry.ruleId,
        entry.action,
        entry.source,
        entry.destination,
        entry.statusCode,
        entry.adminUser || 'admin',
        now,
        entry.note || null
      )
      .run();
  } catch {}
}

/**
 * Retrieves recent redirect change history.
 */
export async function getRedirectHistory(limit = 30, locals?: any): Promise<RedirectHistoryEntry[]> {
  await init404Store(locals);
  const db = getDb(locals);

  try {
    const rows = await db
      .prepare('SELECT * FROM cms_redirect_history ORDER BY timestamp DESC LIMIT ?')
      .bind(limit)
      .all<any>();

    return (rows?.results || []).map((r) => ({
      id: r.id,
      ruleId: r.rule_id,
      action: r.action,
      source: r.source,
      destination: r.destination,
      statusCode: r.status_code,
      adminUser: r.admin_user,
      timestamp: r.timestamp,
      note: r.note || undefined,
    }));
  } catch {
    return [];
  }
}
