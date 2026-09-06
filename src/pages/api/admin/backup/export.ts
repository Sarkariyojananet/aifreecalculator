import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import {
  getCalculatorOverrides,
  getInternalLinks,
  getRedirectRules,
  getFAQs,
  getCMSCategories,
  getHomepageSections,
  getFeatureFlags,
} from '../../../../lib/admin/content-store';
import { getContactMessages, getDb } from '../../../../lib/db';
import { getCustomTestCases } from '../../../../lib/calculator-tests/health-store';

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized. Admin authentication required.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const db = getDb(locals);

    // Parallel fetch of all CMS components
    const [
      overrides,
      internalLinks,
      redirects,
      faqs,
      categories,
      homepageSections,
      featureFlags,
      messages,
      customTests,
      adsenseRow,
    ] = await Promise.all([
      getCalculatorOverrides(locals).catch(() => ({})),
      getInternalLinks(locals).catch(() => ({})),
      getRedirectRules(locals).catch(() => []),
      getFAQs(locals).catch(() => []),
      getCMSCategories(locals).catch(() => []),
      getHomepageSections(locals).catch(() => []),
      getFeatureFlags(locals).catch(() => ({})),
      getContactMessages(db).catch(() => []),
      getCustomTestCases(locals).catch(() => []),
      db.prepare('SELECT value FROM site_settings WHERE key = ?').bind('adsense_config').first<{ value: string }>().catch(() => null),
    ]);

    let monetizationConfig = null;
    if (adsenseRow?.value) {
      try {
        monetizationConfig = JSON.parse(adsenseRow.value);
      } catch {}
    }

    const backupData = {
      schemaVersion: '1.1',
      exportedAt: new Date().toISOString(),
      exportedBy: user.username || 'admin',
      platform: 'aifreecalculator.com CMS',
      stats: {
        seoOverridesCount: Object.keys(overrides).length,
        internalLinksCount: Object.keys(internalLinks).length,
        redirectRulesCount: redirects.length,
        faqsCount: faqs.length,
        categoriesCount: categories.length,
        messagesCount: messages.length,
        customTestsCount: customTests.length,
        monetizationConfigured: Boolean(monetizationConfig),
      },
      data: {
        seoOverrides: overrides,
        internalLinks,
        redirectRules: redirects,
        faqs,
        categories,
        homepageSections,
        featureFlags,
        contactMessages: messages,
        customFormulaTests: customTests,
        monetizationConfig,
      },
    };

    const dateStr = new Date().toISOString().split('T')[0];
    const filename = `aifreecalc-backup-${dateStr}.json`;

    return new Response(JSON.stringify(backupData, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (err: any) {
    console.error('Backup export error:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to generate backup: ' + (err?.message || 'Internal Server Error') }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
