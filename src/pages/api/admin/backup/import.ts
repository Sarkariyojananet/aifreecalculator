import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import {
  saveAllCalculatorOverrides,
  saveAllInternalLinks,
  saveRedirectRules,
  saveFAQs,
  saveCMSCategories,
  saveHomepageSections,
  saveFeatureFlags,
} from '../../../../lib/admin/content-store';
import { getDb, saveContactMessage } from '../../../../lib/db';
import { saveCustomTestCase } from '../../../../lib/calculator-tests/health-store';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized. Admin authentication required.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const payload = await request.json().catch(() => null);
    if (!payload || typeof payload !== 'object') {
      return new Response(JSON.stringify({ error: 'Invalid payload. Must be a valid JSON backup object.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = payload.data || payload;
    const restoredSummary: Record<string, number> = {};

    // 1. Restore SEO Overrides
    if (data.seoOverrides && typeof data.seoOverrides === 'object') {
      await saveAllCalculatorOverrides(data.seoOverrides, locals);
      restoredSummary.seoOverrides = Object.keys(data.seoOverrides).length;
    }

    // 2. Restore Internal Links
    if (data.internalLinks && typeof data.internalLinks === 'object') {
      await saveAllInternalLinks(data.internalLinks, locals);
      restoredSummary.internalLinks = Object.keys(data.internalLinks).length;
    }

    // 3. Restore Redirect Rules
    if (Array.isArray(data.redirectRules)) {
      await saveRedirectRules(data.redirectRules, locals);
      restoredSummary.redirectRules = data.redirectRules.length;
    }

    // 4. Restore FAQs
    if (Array.isArray(data.faqs)) {
      await saveFAQs(data.faqs, locals);
      restoredSummary.faqs = data.faqs.length;
    }

    // 5. Restore Categories
    if (Array.isArray(data.categories)) {
      await saveCMSCategories(data.categories, locals);
      restoredSummary.categories = data.categories.length;
    }

    // 6. Restore Homepage Sections
    if (Array.isArray(data.homepageSections)) {
      await saveHomepageSections(data.homepageSections, locals);
      restoredSummary.homepageSections = data.homepageSections.length;
    }

    // 7. Restore Feature Flags
    if (data.featureFlags && typeof data.featureFlags === 'object') {
      await saveFeatureFlags(data.featureFlags, locals);
      restoredSummary.featureFlags = 1;
    }

    // 8. Restore Custom Formula Tests
    if (Array.isArray(data.customFormulaTests)) {
      for (const test of data.customFormulaTests) {
        if (test && test.id && test.slug) {
          await saveCustomTestCase(test, locals);
        }
      }
      restoredSummary.customFormulaTests = data.customFormulaTests.length;
    }

    // 9. Restore Contact Messages (optional backup)
    if (Array.isArray(data.contactMessages)) {
      const db = getDb(locals);
      let msgCount = 0;
      for (const msg of data.contactMessages) {
        if (msg && msg.id && msg.name && msg.email) {
          await saveContactMessage(db, msg);
          msgCount++;
        }
      }
      restoredSummary.contactMessages = msgCount;
    }

    // 10. Restore Monetization & Ad Configuration
    if (data.monetizationConfig && typeof data.monetizationConfig === 'object') {
      const db = getDb(locals);
      await db.exec('CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)');
      await db
        .prepare('INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)')
        .bind('adsense_config', JSON.stringify(data.monetizationConfig))
        .run();
      restoredSummary.monetization = 1;
    }

    // Log audit event
    const { logAuditEvent } = await import('../../../../lib/admin/audit-store');
    await logAuditEvent(locals, {
      action: 'BACKUP_RESTORE',
      category: 'backup',
      user: user.username,
      summary: `Restored full CMS backup (Items: ${Object.keys(restoredSummary).length})`,
      details: { restoredSummary },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'CMS Backup restored successfully into database and site settings.',
        restoredSummary,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    console.error('Backup restore error:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to restore backup: ' + (err?.message || 'Internal Server Error') }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
