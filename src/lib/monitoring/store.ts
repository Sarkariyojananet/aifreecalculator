/**
 * Database storage & aggregation layer for Phase 9 Monitoring
 * Implements low D1 footprint, fingerprint-based deduplication,
 * uptime tracking, and explainable incident management.
 */

import { getDb } from '../db';
import type {
  ErrorGroup,
  ErrorCategory,
  ErrorSeverity,
  ErrorStatus,
  UptimeCheck,
  UptimeHealthStatus,
  SiteIncident,
  IncidentStatus,
  IncidentSeverity,
  MonitoredRouteStatus,
} from './types';

export const MONITORED_ROUTES: Array<{ route: string; label: string; category: 'core' | 'calculator' | 'api' }> = [
  { route: '/', label: 'Homepage', category: 'core' },
  { route: '/finance/emi-calculator/', label: 'Loan EMI Calculator', category: 'calculator' },
  { route: '/construction/steel-weight-calculator/', label: 'Steel Weight Calculator', category: 'calculator' },
  { route: '/general/bmi-calculator/', label: 'BMI Calculator', category: 'calculator' },
  { route: '/api/health', label: 'System Health Probe API', category: 'api' },
];

let tablesInitialized = false;

/**
 * Lazily initializes monitoring D1 tables
 */
export async function initMonitoringTables(locals?: any): Promise<void> {
  if (tablesInitialized) return;

  try {
    const db = getDb(locals);

    await db.prepare(`CREATE TABLE IF NOT EXISTS cms_error_groups (
      id TEXT PRIMARY KEY,
      fingerprint TEXT UNIQUE NOT NULL,
      route TEXT NOT NULL,
      category TEXT NOT NULL,
      severity TEXT NOT NULL,
      first_seen TEXT NOT NULL,
      last_seen TEXT NOT NULL,
      occurrence_count INTEGER NOT NULL DEFAULT 1,
      latest_message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'open'
    )`).run();

    await db.prepare(`CREATE TABLE IF NOT EXISTS cms_uptime_checks (
      id TEXT PRIMARY KEY,
      route TEXT NOT NULL,
      checked_at TEXT NOT NULL,
      status_code INTEGER NOT NULL,
      response_time_ms INTEGER NOT NULL,
      status TEXT NOT NULL,
      error_message TEXT
    )`).run();

    await db.prepare(`CREATE INDEX IF NOT EXISTS idx_uptime_route_checked ON cms_uptime_checks(route, checked_at)`).run();

    await db.prepare(`CREATE TABLE IF NOT EXISTS cms_incidents (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      severity TEXT NOT NULL,
      affected_route TEXT NOT NULL,
      detected_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      summary TEXT NOT NULL,
      occurrence_count INTEGER NOT NULL DEFAULT 1,
      status TEXT NOT NULL DEFAULT 'open'
    )`).run();

    tablesInitialized = true;
  } catch (err) {
    console.error('Failed to initialize monitoring tables:', err);
  }
}

/**
 * Creates a deterministic fingerprint for error grouping
 */
function createErrorFingerprint(category: ErrorCategory, route: string, message: string): string {
  // Normalize message: strip numeric IDs, hashes, timestamps, line numbers
  const normalizedMsg = message
    .slice(0, 100)
    .replace(/\b[0-9a-f]{8,}\b/gi, '{hash}')
    .replace(/\d+/g, '{n}')
    .trim()
    .toLowerCase();

  const raw = `${category}|${route}|${normalizedMsg}`;
  // Simple deterministic hash
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    const char = raw.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return `err_${Math.abs(hash).toString(36)}`;
}

/**
 * Records an error into the aggregated error groups table.
 * Uses atomic upsert to prevent runaway table size.
 */
export async function recordError(
  locals: any,
  params: {
    route: string;
    category: ErrorCategory;
    severity: ErrorSeverity;
    message: string;
  }
): Promise<void> {
  try {
    await initMonitoringTables(locals);
    const db = getDb(locals);

    const now = new Date().toISOString();
    const cleanRoute = params.route.split('?')[0].slice(0, 150) || '/';
    const cleanMessage = params.message.slice(0, 300).trim();
    const fingerprint = createErrorFingerprint(params.category, cleanRoute, cleanMessage);
    const id = `grp_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    // Try updating existing fingerprint group
    const updateResult = await db
      .prepare(`
        UPDATE cms_error_groups
        SET occurrence_count = occurrence_count + 1,
            last_seen = ?,
            latest_message = ?,
            status = CASE WHEN status = 'resolved' THEN 'open' ELSE status END
        WHERE fingerprint = ?
      `)
      .bind(now, cleanMessage, fingerprint)
      .run();

    if ((updateResult as any)?.meta?.changes === 0 || !(updateResult as any)?.changes) {
      // Not found, insert new group
      await db
        .prepare(`
          INSERT INTO cms_error_groups (
            id, fingerprint, route, category, severity,
            first_seen, last_seen, occurrence_count, latest_message, status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, 'open')
        `)
        .bind(id, fingerprint, cleanRoute, params.category, params.severity, now, now, cleanMessage)
        .run();
    }

    // Evaluate for incident trigger if critical severity
    if (params.severity === 'critical') {
      await checkAndTriggerIncident(locals, {
        title: `Critical Server Error on ${cleanRoute}`,
        severity: 'critical',
        affectedRoute: cleanRoute,
        summary: cleanMessage,
      });
    }
  } catch (err) {
    // Monitoring errors should never disrupt core operations
    console.error('Failed to record error:', err);
  }
}

/**
 * Gets aggregated error groups with optional status filter
 */
export async function getErrorGroups(
  locals: any,
  options?: { status?: ErrorStatus; limit?: number }
): Promise<ErrorGroup[]> {
  try {
    await initMonitoringTables(locals);
    const db = getDb(locals);

    let query = 'SELECT * FROM cms_error_groups';
    const bindings: any[] = [];

    if (options?.status) {
      query += ' WHERE status = ?';
      bindings.push(options.status);
    }

    query += ' ORDER BY last_seen DESC LIMIT ?';
    bindings.push(options?.limit || 50);

    const result = await db.prepare(query).bind(...bindings).all<any>();
    const rows = result.results || [];

    return rows.map((r) => ({
      id: r.id,
      fingerprint: r.fingerprint,
      route: r.route,
      category: r.category as ErrorCategory,
      severity: r.severity as ErrorSeverity,
      firstSeen: r.first_seen,
      lastSeen: r.last_seen,
      occurrenceCount: r.occurrence_count,
      latestMessage: r.latest_message,
      status: r.status as ErrorStatus,
    }));
  } catch (err) {
    console.error('Failed to get error groups:', err);
    return [];
  }
}

/**
 * Updates the status of an error group
 */
export async function updateErrorGroupStatus(
  locals: any,
  id: string,
  status: ErrorStatus
): Promise<boolean> {
  try {
    await initMonitoringTables(locals);
    const db = getDb(locals);

    const res = await db
      .prepare('UPDATE cms_error_groups SET status = ? WHERE id = ?')
      .bind(status, id)
      .run();

    return Boolean((res as any)?.meta?.changes || (res as any)?.changes);
  } catch (err) {
    console.error('Failed to update error group status:', err);
    return false;
  }
}

/**
 * Records an uptime check and purges historical checks older than 30 days
 */
export async function recordUptimeCheck(
  locals: any,
  check: {
    route: string;
    statusCode: number;
    responseTimeMs: number;
    status: UptimeHealthStatus;
    errorMessage?: string;
  }
): Promise<void> {
  try {
    await initMonitoringTables(locals);
    const db = getDb(locals);

    const id = `chk_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const now = new Date().toISOString();

    await db
      .prepare(`
        INSERT INTO cms_uptime_checks (
          id, route, checked_at, status_code, response_time_ms, status, error_message
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `)
      .bind(id, check.route, now, check.statusCode, check.responseTimeMs, check.status, check.errorMessage || null)
      .run();

    // Trigger incident if health check failed
    if (check.status === 'down') {
      await checkAndTriggerIncident(locals, {
        title: `Endpoint Down: ${check.route}`,
        severity: 'critical',
        affectedRoute: check.route,
        summary: check.errorMessage || `HTTP status ${check.statusCode} response`,
      });
    }

    // Clean up old checks older than 30 days (non-blocking cleanup)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString();
    await db
      .prepare('DELETE FROM cms_uptime_checks WHERE checked_at < ?')
      .bind(thirtyDaysAgo)
      .run();
  } catch (err) {
    console.error('Failed to record uptime check:', err);
  }
}

/**
 * Evaluates and manages explainable site incidents
 */
async function checkAndTriggerIncident(
  locals: any,
  params: {
    title: string;
    severity: IncidentSeverity;
    affectedRoute: string;
    summary: string;
  }
): Promise<void> {
  try {
    const db = getDb(locals);
    const now = new Date().toISOString();

    // Check if an open/investigating incident already exists for this route and severity
    const existing = await db
      .prepare(`
        SELECT id, occurrence_count
        FROM cms_incidents
        WHERE affected_route = ? AND status IN ('open', 'investigating')
        ORDER BY detected_at DESC LIMIT 1
      `)
      .bind(params.affectedRoute)
      .first<{ id: string; occurrence_count: number }>();

    if (existing) {
      await db
        .prepare(`
          UPDATE cms_incidents
          SET occurrence_count = occurrence_count + 1,
              updated_at = ?,
              summary = ?
          WHERE id = ?
        `)
        .bind(now, params.summary, existing.id)
        .run();
    } else {
      const id = `inc_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
      await db
        .prepare(`
          INSERT INTO cms_incidents (
            id, title, severity, affected_route, detected_at, updated_at, summary, occurrence_count, status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, 1, 'open')
        `)
        .bind(id, params.title, params.severity, params.affectedRoute, now, now, params.summary)
        .run();
    }
  } catch (err) {
    console.error('Failed to manage incident:', err);
  }
}

/**
 * Retrieves site incidents
 */
export async function getIncidents(
  locals: any,
  options?: { status?: IncidentStatus; limit?: number }
): Promise<SiteIncident[]> {
  try {
    await initMonitoringTables(locals);
    const db = getDb(locals);

    let query = 'SELECT * FROM cms_incidents';
    const bindings: any[] = [];

    if (options?.status) {
      query += ' WHERE status = ?';
      bindings.push(options.status);
    }

    query += ' ORDER BY detected_at DESC LIMIT ?';
    bindings.push(options?.limit || 20);

    const result = await db.prepare(query).bind(...bindings).all<any>();
    const rows = result.results || [];

    return rows.map((r) => ({
      id: r.id,
      title: r.title,
      severity: r.severity as IncidentSeverity,
      affectedRoute: r.affected_route,
      detectedAt: r.detected_at,
      updatedAt: r.updated_at,
      summary: r.summary,
      occurrenceCount: r.occurrence_count,
      status: r.status as IncidentStatus,
    }));
  } catch (err) {
    console.error('Failed to get incidents:', err);
    return [];
  }
}

/**
 * Updates an incident's status
 */
export async function updateIncidentStatus(
  locals: any,
  id: string,
  status: IncidentStatus
): Promise<boolean> {
  try {
    await initMonitoringTables(locals);
    const db = getDb(locals);
    const now = new Date().toISOString();

    const res = await db
      .prepare('UPDATE cms_incidents SET status = ?, updated_at = ? WHERE id = ?')
      .bind(status, now, id)
      .run();

    return Boolean((res as any)?.meta?.changes || (res as any)?.changes);
  } catch (err) {
    console.error('Failed to update incident status:', err);
    return false;
  }
}

/**
 * Deletes an incident record
 */
export async function deleteIncident(locals: any, id: string): Promise<boolean> {
  try {
    await initMonitoringTables(locals);
    const db = getDb(locals);

    const res = await db
      .prepare('DELETE FROM cms_incidents WHERE id = ?')
      .bind(id)
      .run();

    return Boolean((res as any)?.meta?.changes || (res as any)?.changes);
  } catch (err) {
    console.error('Failed to delete incident:', err);
    return false;
  }
}

/**
 * Clears all resolved and ignored incidents
 */
export async function clearResolvedIncidents(locals: any): Promise<boolean> {
  try {
    await initMonitoringTables(locals);
    const db = getDb(locals);

    const res = await db
      .prepare("DELETE FROM cms_incidents WHERE status IN ('resolved', 'ignored')")
      .run();

    return Boolean((res as any)?.meta?.changes || (res as any)?.changes);
  } catch (err) {
    console.error('Failed to clear resolved incidents:', err);
    return false;
  }
}

/**
 * Retrieves monitored routes with their latest uptime check status
 */
export async function getMonitoredRouteStatuses(locals: any): Promise<MonitoredRouteStatus[]> {
  try {
    await initMonitoringTables(locals);
    const db = getDb(locals);

    const statuses: MonitoredRouteStatus[] = [];

    for (const item of MONITORED_ROUTES) {
      const latest = await db
        .prepare(`
          SELECT status_code, response_time_ms, status, checked_at
          FROM cms_uptime_checks
          WHERE route = ?
          ORDER BY checked_at DESC LIMIT 1
        `)
        .bind(item.route)
        .first<any>();

      if (!latest) {
        statuses.push({
          route: item.route,
          label: item.label,
          category: item.category,
          status: 'unknown',
          responseClassification: 'unknown',
        });
      } else {
        let classification: 'good' | 'slow' | 'very_slow' | 'down' = 'good';
        if (latest.status === 'down' || latest.status_code >= 400) {
          classification = 'down';
        } else if (latest.response_time_ms > 1500) {
          classification = 'very_slow';
        } else if (latest.response_time_ms > 500) {
          classification = 'slow';
        }

        statuses.push({
          route: item.route,
          label: item.label,
          category: item.category,
          status: latest.status as UptimeHealthStatus,
          statusCode: latest.status_code,
          responseTimeMs: latest.response_time_ms,
          lastCheckedAt: latest.checked_at,
          responseClassification: classification,
        });
      }
    }

    return statuses;
  } catch (err) {
    console.error('Failed to get monitored route statuses:', err);
    return MONITORED_ROUTES.map((m) => ({
      ...m,
      status: 'unknown',
      responseClassification: 'unknown',
    }));
  }
}

/**
 * Computes authentic uptime percentage across all monitored checks.
 * Returns undefined if insufficient historical checks exist.
 */
export async function getAuthenticUptimePercentage(locals: any): Promise<{ percentage?: number; totalChecks: number }> {
  try {
    await initMonitoringTables(locals);
    const db = getDb(locals);

    const row = await db
      .prepare(`
        SELECT
          COUNT(*) as total,
          SUM(CASE WHEN status = 'healthy' THEN 1 ELSE 0 END) as healthy
        FROM cms_uptime_checks
      `)
      .first<{ total: number; healthy: number }>();

    if (!row || row.total < 5) {
      return { totalChecks: row?.total || 0 };
    }

    const pct = Math.round(((row.healthy || 0) / row.total) * 1000) / 10;
    return { percentage: pct, totalChecks: row.total };
  } catch {
    return { totalChecks: 0 };
  }
}
