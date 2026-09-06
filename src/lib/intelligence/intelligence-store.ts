/**
 * Persistent storage and management for Phase 10: Complete AI Website Intelligence Hub
 * aifreecalculator.com
 */

import { getDb } from '../db';
import { getRuntimeEnvSync } from '../cloudflare-env';
import type {
  IntelligenceInsight,
  InsightPriority,
  InsightCategory,
  InsightStatus,
  ConfidenceLevel,
  CorrelationType,
} from './types';

export interface AiConfig {
  provider: 'gemini' | 'openai' | 'cloudflare_workers_ai';
  apiKey?: string;
  model?: string;
  enabled: boolean;
}

const AI_CONFIG_KEY = 'intelligence_ai_config';
let tablesInitialized = false;

/**
 * Initializes the D1 database tables for intelligence insights
 */
export async function initIntelligenceTables(locals?: any): Promise<void> {
  if (tablesInitialized) return;

  try {
    const db = getDb(locals);

    await db.prepare(`CREATE TABLE IF NOT EXISTS cms_intelligence_insights (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      priority TEXT NOT NULL,
      priority_reason TEXT,
      category TEXT NOT NULL,
      affected_entity TEXT NOT NULL,
      why_detected TEXT NOT NULL,
      supporting_metrics TEXT NOT NULL,
      recommended_action TEXT NOT NULL,
      data_sources TEXT NOT NULL,
      detected_at TEXT NOT NULL,
      confidence TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'active',
      correlation_type TEXT
    )`).run();

    await db.prepare(`CREATE INDEX IF NOT EXISTS idx_intel_insights_status ON cms_intelligence_insights (status)`).run();
    await db.prepare(`CREATE INDEX IF NOT EXISTS idx_intel_insights_priority ON cms_intelligence_insights (priority)`).run();
    await db.prepare(`CREATE INDEX IF NOT EXISTS idx_intel_insights_category ON cms_intelligence_insights (category)`).run();
    await db.prepare(`CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)`).run();

    tablesInitialized = true;
  } catch (err) {
    console.error('Failed to initialize intelligence tables:', err);
  }
}

/**
 * Retrieves the AI provider configuration from site_settings or runtime environment
 */
export async function getAiConfig(locals?: any): Promise<AiConfig | null> {
  const env = getRuntimeEnvSync(locals);
  const db = getDb(locals);

  // 1. Check D1 site_settings
  try {
    await initIntelligenceTables(locals);
    const row = await db
      .prepare('SELECT value FROM site_settings WHERE key = ?')
      .bind(AI_CONFIG_KEY)
      .first<{ value: string }>();

    if (row?.value) {
      const parsed = JSON.parse(row.value) as AiConfig;
      if (parsed && typeof parsed.enabled === 'boolean') {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading AI config from D1:', e);
  }

  // 2. Check environment variables
  if (env.GEMINI_API_KEY) {
    return {
      provider: 'gemini',
      apiKey: env.GEMINI_API_KEY,
      model: env.GEMINI_MODEL || 'gemini-1.5-flash',
      enabled: true,
    };
  }

  if (env.OPENAI_API_KEY) {
    return {
      provider: 'openai',
      apiKey: env.OPENAI_API_KEY,
      model: env.OPENAI_MODEL || 'gpt-4o-mini',
      enabled: true,
    };
  }

  return null;
}

/**
 * Saves AI provider configuration in site_settings
 */
export async function saveAiConfig(config: AiConfig, locals?: any): Promise<void> {
  const db = getDb(locals);
  await initIntelligenceTables(locals);

  await db
    .prepare(
      `INSERT INTO site_settings (key, value) VALUES (?, ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value`
    )
    .bind(AI_CONFIG_KEY, JSON.stringify(config))
    .run();
}

/**
 * Removes AI provider configuration
 */
export async function deleteAiConfig(locals?: any): Promise<void> {
  const db = getDb(locals);
  await initIntelligenceTables(locals);

  await db.prepare('DELETE FROM site_settings WHERE key = ?').bind(AI_CONFIG_KEY).run();
}

/**
 * Saves or updates detected insights in D1 while preserving user actions (acknowledged, resolved, ignored)
 */
export async function saveInsights(insights: IntelligenceInsight[], locals?: any): Promise<void> {
  if (!insights || insights.length === 0) return;

  const db = getDb(locals);
  await initIntelligenceTables(locals);

  for (const item of insights) {
    try {
      // Check if existing record has a user-set status (e.g. acknowledged or resolved)
      const existing = await db
        .prepare('SELECT status FROM cms_intelligence_insights WHERE id = ?')
        .bind(item.id)
        .first<{ status: string }>();

      const statusToSave = existing?.status ? existing.status : (item.status || 'active');

      await db
        .prepare(
          `INSERT INTO cms_intelligence_insights (
            id, title, priority, priority_reason, category, affected_entity,
            why_detected, supporting_metrics, recommended_action, data_sources,
            detected_at, confidence, status, correlation_type
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            title = excluded.title,
            priority = excluded.priority,
            priority_reason = excluded.priority_reason,
            category = excluded.category,
            affected_entity = excluded.affected_entity,
            why_detected = excluded.why_detected,
            supporting_metrics = excluded.supporting_metrics,
            recommended_action = excluded.recommended_action,
            data_sources = excluded.data_sources,
            detected_at = excluded.detected_at,
            confidence = excluded.confidence,
            correlation_type = excluded.correlation_type`
        )
        .bind(
          item.id,
          item.title,
          item.priority,
          item.priorityReason || '',
          item.category,
          JSON.stringify(item.affectedEntity),
          item.whyDetected,
          JSON.stringify(item.supportingMetrics || []),
          JSON.stringify(item.recommendedAction),
          JSON.stringify(item.dataSources || []),
          item.detectedAt,
          item.confidence,
          statusToSave,
          item.correlationType || null
        )
        .run();
    } catch (err) {
      console.error(`Error saving insight ${item.id}:`, err);
    }
  }
}

/**
 * Retrieves stored insights from D1 with optional filters
 */
export async function getStoredInsights(
  locals?: any,
  options?: { status?: string; category?: string; priority?: string }
): Promise<IntelligenceInsight[]> {
  try {
    const db = getDb(locals);
    await initIntelligenceTables(locals);

    let query = 'SELECT * FROM cms_intelligence_insights WHERE 1=1';
    const bindings: any[] = [];

    if (options?.status) {
      query += ' AND status = ?';
      bindings.push(options.status);
    }

    if (options?.category) {
      query += ' AND category = ?';
      bindings.push(options.category);
    }

    if (options?.priority) {
      query += ' AND priority = ?';
      bindings.push(options.priority);
    }

    query += ` ORDER BY
      CASE priority
        WHEN 'P0' THEN 1
        WHEN 'P1' THEN 2
        WHEN 'P2' THEN 3
        WHEN 'P3' THEN 4
        ELSE 5
      END ASC,
      detected_at DESC LIMIT 100`;

    const stmt = db.prepare(query);
    const rows = (await (bindings.length > 0 ? stmt.bind(...bindings) : stmt).all()).results as any[];

    return (rows || []).map((row) => ({
      id: row.id,
      title: row.title,
      priority: row.priority as InsightPriority,
      priorityReason: row.priority_reason || '',
      category: row.category as InsightCategory,
      affectedEntity: typeof row.affected_entity === 'string' ? JSON.parse(row.affected_entity) : row.affected_entity,
      whyDetected: row.why_detected,
      supportingMetrics: typeof row.supporting_metrics === 'string' ? JSON.parse(row.supporting_metrics) : (row.supporting_metrics || []),
      recommendedAction: typeof row.recommended_action === 'string' ? JSON.parse(row.recommended_action) : row.recommended_action,
      dataSources: typeof row.data_sources === 'string' ? JSON.parse(row.data_sources) : (row.data_sources || []),
      detectedAt: row.detected_at,
      confidence: row.confidence as ConfidenceLevel,
      status: row.status as InsightStatus,
      correlationType: row.correlation_type as CorrelationType | undefined,
    }));
  } catch (err) {
    console.warn('Error reading stored insights from D1:', err);
    return [];
  }
}

/**
 * Updates an insight's status (active, acknowledged, resolved, ignored)
 */
export async function updateInsightStatus(
  id: string,
  status: InsightStatus,
  locals?: any
): Promise<boolean> {
  try {
    const db = getDb(locals);
    await initIntelligenceTables(locals);

    const res = await db
      .prepare('UPDATE cms_intelligence_insights SET status = ? WHERE id = ?')
      .bind(status, id)
      .run();

    return (res?.meta?.changes ?? 0) > 0;
  } catch (err) {
    console.error(`Error updating status for insight ${id}:`, err);
    return false;
  }
}
