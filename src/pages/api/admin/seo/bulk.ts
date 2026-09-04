import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import { calculators } from '../../../../data/calculators';
import { getCalculatorOverrides, saveCalculatorOverride } from '../../../../lib/admin/content-store';
import { recordBulkSEOChanges } from '../../../../lib/seo/change-history';
import { CORE_PAGES } from '../../../../lib/seo/audit-engine';

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized: Admin authentication required' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const overrides = await getCalculatorOverrides(locals);

  const calcList = calculators.map((c) => {
    const o = overrides[c.slug] || {};
    return {
      slug: c.slug,
      path: c.path,
      name: o.name || c.name,
      category: c.category,
      type: 'calculator',
      metaTitle: o.metaTitle || `${c.name} - AI Free Calculator`,
      metaDescription: o.metaDescription || o.description || c.description || '',
      canonicalUrl: o.canonicalUrl || `https://aifreecalculator.com${c.path}`,
      robots: o.robots || 'index, follow',
      updatedAt: o.updatedAt,
    };
  });

  const coreList = CORE_PAGES.map((p) => {
    return {
      slug: p.path.replace(/\//g, '') || 'home',
      path: p.path,
      name: p.name,
      category: 'Core',
      type: 'core',
      metaTitle: p.title,
      metaDescription: p.description,
      canonicalUrl: `https://aifreecalculator.com${p.path === '/' ? '' : p.path}`,
      robots: 'index, follow',
    };
  });

  return new Response(JSON.stringify({ pages: [...calcList, ...coreList] }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized: Admin authentication required' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { updates } = body;

    if (!Array.isArray(updates) || updates.length === 0) {
      return new Response(JSON.stringify({ error: 'Array of updates is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const currentOverrides = await getCalculatorOverrides(locals);
    const historyChanges: Array<{
      pagePath: string;
      pageName: string;
      field: any;
      oldValue: string;
      newValue: string;
      adminUser: string;
    }> = [];

    let updatedCount = 0;

    for (const item of updates) {
      const { slug, metaTitle, metaDescription, canonicalUrl, robots } = item;
      if (!slug) continue;

      const calc = calculators.find((c) => c.slug === slug);
      const prevOverride = currentOverrides[slug] || {};
      const oldTitle = prevOverride.metaTitle || (calc ? `${calc.name} - AI Free Calculator` : '');
      const oldDesc = prevOverride.metaDescription || (calc ? calc.description : '');

      const newOverride: Record<string, any> = {
        ...prevOverride,
      };

      if (metaTitle !== undefined && metaTitle !== oldTitle) {
        newOverride.metaTitle = metaTitle.trim();
        historyChanges.push({
          pagePath: calc?.path || `/${slug}/`,
          pageName: calc?.name || slug,
          field: 'metaTitle',
          oldValue: oldTitle,
          newValue: metaTitle.trim(),
          adminUser: user.username,
        });
      }

      if (metaDescription !== undefined && metaDescription !== oldDesc) {
        newOverride.metaDescription = metaDescription.trim();
        historyChanges.push({
          pagePath: calc?.path || `/${slug}/`,
          pageName: calc?.name || slug,
          field: 'metaDescription',
          oldValue: oldDesc,
          newValue: metaDescription.trim(),
          adminUser: user.username,
        });
      }

      if (canonicalUrl !== undefined) {
        newOverride.canonicalUrl = canonicalUrl.trim();
      }

      if (robots !== undefined) {
        newOverride.robots = robots;
      }

      await saveCalculatorOverride(slug, newOverride, locals);
      updatedCount++;
    }

    // Record changes in change history
    if (historyChanges.length > 0) {
      await recordBulkSEOChanges(historyChanges, locals);
    }

    return new Response(
      JSON.stringify({
        success: true,
        updatedCount,
        changesLogged: historyChanges.length,
        message: `Successfully saved updates for ${updatedCount} pages.`,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Bulk update failed';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
