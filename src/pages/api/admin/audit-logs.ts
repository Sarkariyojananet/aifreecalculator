import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../lib/auth';
import {
  getAuditLogs,
  logAuditEvent,
  getPreviousSettingsSnapshot,
  saveSettingsSnapshot,
  type AuditActionType,
} from '../../../lib/admin/audit-store';
import { getDb } from '../../../lib/db';

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized. Admin session required.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const logs = await getAuditLogs(locals, 50);
    const snapshot = await getPreviousSettingsSnapshot(locals);

    return new Response(
      JSON.stringify({
        success: true,
        logs,
        hasSnapshot: Boolean(snapshot?.config),
        snapshotSavedAt: snapshot?.savedAt || null,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Failed to fetch audit logs' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized. Admin session required.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();

    // 1. Instant Rollback to Previous Settings Snapshot
    if (body.action === 'ROLLBACK') {
      const snapshot = await getPreviousSettingsSnapshot(locals);
      if (!snapshot || !snapshot.config) {
        return new Response(JSON.stringify({ error: 'No previous configuration snapshot found to restore.' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const db = getDb(locals);
      // Capture current settings before rollback so we don't lose them
      const currentRow = await db.prepare('SELECT value FROM site_settings WHERE key = ?').bind('adsense_config').first<{ value: string }>();
      if (currentRow?.value) {
        try {
          await saveSettingsSnapshot(locals, JSON.parse(currentRow.value));
        } catch {}
      }

      // Write snapshot config to adsense_config
      await db
        .prepare('INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)')
        .bind('adsense_config', JSON.stringify(snapshot.config))
        .run();

      await logAuditEvent(locals, {
        action: 'SETTINGS_UPDATE',
        category: 'monetization',
        user: user.username,
        summary: `Reverted settings to previous snapshot taken at ${snapshot.savedAt}`,
        details: { rolledBackFromDate: snapshot.savedAt },
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Successfully rolled back to previous snapshot.',
          restoredConfig: snapshot.config,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2. Custom Audit Log Entry
    const action: AuditActionType = body.action || 'SETTINGS_UPDATE';
    const entry = await logAuditEvent(locals, {
      action,
      category: body.category || 'monetization',
      user: user.username,
      summary: body.summary || 'Admin action recorded',
      details: body.details,
    });

    return new Response(JSON.stringify({ success: true, entry }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Failed to process audit event' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
