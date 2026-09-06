/**
 * Admin Audit Trail & Rollback Snapshot Store
 * Tracks configuration modifications, backups, restores, and ad setup changes.
 * Persists to site_settings in D1 / local fallback with automatic retention limit.
 */

import { getDb } from '../db';

export type AuditActionType =
  | 'SETTINGS_UPDATE'
  | 'SPONSOR_SWITCH'
  | 'THROTTLING_UPDATE'
  | 'BACKUP_EXPORT'
  | 'BACKUP_RESTORE'
  | 'ADS_TXT_UPDATE'
  | 'FEATURE_TOGGLE'
  | 'SECURITY_UPDATE';

export type AuditCategoryType = 'monetization' | 'seo' | 'security' | 'backup' | 'system';

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: AuditActionType;
  category: AuditCategoryType;
  user: string;
  summary: string;
  details?: Record<string, any>;
  ip?: string;
}

const AUDIT_LOGS_KEY = 'admin_audit_logs';
const SNAPSHOT_KEY = 'admin_settings_last_snapshot';
const MAX_AUDIT_LOGS = 100;

/**
 * Retrieve recent audit logs sorted newest to oldest
 */
export async function getAuditLogs(locals?: App.Locals, limit = 50): Promise<AuditLogEntry[]> {
  try {
    const db = getDb(locals);
    await db.exec('CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)');
    const row = await db.prepare('SELECT value FROM site_settings WHERE key = ?').bind(AUDIT_LOGS_KEY).first<{ value: string }>();

    if (row?.value) {
      const logs = JSON.parse(row.value) as AuditLogEntry[];
      return Array.isArray(logs) ? logs.slice(0, limit) : [];
    }
  } catch (err) {
    console.error('Failed to read audit logs:', err);
  }
  return [];
}

/**
 * Record a new audit log event with automatic pruning to MAX_AUDIT_LOGS
 */
export async function logAuditEvent(
  locals: App.Locals | undefined,
  data: Omit<AuditLogEntry, 'id' | 'timestamp'>
): Promise<AuditLogEntry> {
  const newEntry: AuditLogEntry = {
    id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
    action: data.action,
    category: data.category,
    user: data.user || 'admin',
    summary: data.summary,
    details: data.details,
    ip: data.ip || '127.0.0.1',
  };

  try {
    const db = getDb(locals);
    await db.exec('CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)');

    const row = await db.prepare('SELECT value FROM site_settings WHERE key = ?').bind(AUDIT_LOGS_KEY).first<{ value: string }>();
    let existingLogs: AuditLogEntry[] = [];
    if (row?.value) {
      try {
        existingLogs = JSON.parse(row.value);
        if (!Array.isArray(existingLogs)) existingLogs = [];
      } catch {
        existingLogs = [];
      }
    }

    // Prepend new entry and cap at MAX_AUDIT_LOGS
    const updated = [newEntry, ...existingLogs].slice(0, MAX_AUDIT_LOGS);

    await db
      .prepare('INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)')
      .bind(AUDIT_LOGS_KEY, JSON.stringify(updated))
      .run();
  } catch (err) {
    console.error('Failed to write audit log event:', err);
  }

  return newEntry;
}

/**
 * Save previous configuration snapshot for 1-click rollback
 */
export async function saveSettingsSnapshot(locals: App.Locals | undefined, snapshot: any): Promise<void> {
  try {
    const db = getDb(locals);
    await db.exec('CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)');
    const payload = {
      savedAt: new Date().toISOString(),
      config: snapshot,
    };
    await db
      .prepare('INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)')
      .bind(SNAPSHOT_KEY, JSON.stringify(payload))
      .run();
  } catch (err) {
    console.error('Failed to save settings snapshot:', err);
  }
}

/**
 * Retrieve previous configuration snapshot
 */
export async function getPreviousSettingsSnapshot(locals?: App.Locals): Promise<{ savedAt: string; config: any } | null> {
  try {
    const db = getDb(locals);
    await db.exec('CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)');
    const row = await db.prepare('SELECT value FROM site_settings WHERE key = ?').bind(SNAPSHOT_KEY).first<{ value: string }>();
    if (row?.value) {
      return JSON.parse(row.value);
    }
  } catch (err) {
    console.error('Failed to retrieve settings snapshot:', err);
  }
  return null;
}
