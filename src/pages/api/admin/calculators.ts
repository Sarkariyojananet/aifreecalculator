import type { APIRoute } from 'astro';
import { calculators, type Calculator } from '../../../data/calculators';
import { authenticateAdminRequest } from '../../../lib/auth';
import { getCalculatorOverrides, saveCalculatorOverride, saveInternalLinks } from '../../../lib/admin/content-store';

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, locals }) => {
  const overrides = await getCalculatorOverrides(locals);
  const enriched = calculators.map((c) => {
    const override = overrides[c.slug] || {};
    return { ...c, ...override };
  });

  return new Response(JSON.stringify({ calculators: enriched, total: enriched.length }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
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
    const { slug, name, category, description, featured, icon, tags, keywords, metaTitle, metaDescription, faqs, isPopular, relatedCalculators, relatedSlugs } = body;

    if (!slug || typeof slug !== 'string') {
      return new Response(JSON.stringify({ error: 'Valid calculator slug is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const cleanSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-');
    if (!/^[a-z0-9-]+$/.test(cleanSlug)) {
      return new Response(JSON.stringify({ error: 'Slug contains invalid characters. Use lowercase alphanumeric and hyphens.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Save override to CMS store (D1 / site_settings)
    const updateData: Record<string, any> = {
      slug: cleanSlug,
      name: name?.trim() || cleanSlug,
      category: category || 'General',
      description: description?.trim() || '',
      icon: icon?.trim() || '🧮',
      featured: Boolean(featured),
      isPopular: isPopular !== undefined ? Boolean(isPopular) : true,
      tags: Array.isArray(tags) ? tags : [],
      keywords: Array.isArray(keywords) ? keywords : [],
      metaTitle: metaTitle?.trim() || '',
      metaDescription: metaDescription?.trim() || '',
      faqs: Array.isArray(faqs) ? faqs : [],
      updatedAt: new Date().toISOString(),
      updatedBy: user.username,
    };

    await saveCalculatorOverride(cleanSlug, updateData, locals);

    // Save internal link relationships if passed
    const related = Array.isArray(relatedCalculators) ? relatedCalculators : (Array.isArray(relatedSlugs) ? relatedSlugs : null);
    if (related !== null) {
      await saveInternalLinks(cleanSlug, related, locals);
    }

    // Update in-memory item if it exists
    const calc = calculators.find((c) => c.slug === cleanSlug);
    if (calc) {
      if (featured !== undefined) calc.featured = Boolean(featured);
      if (name) calc.name = name;
      if (category) calc.category = category;
      if (description) calc.description = description;
      if (icon) calc.icon = icon;
      if (tags) calc.tags = tags;
      if (keywords) calc.keywords = keywords;
    }

    return new Response(JSON.stringify({ success: true, calculator: updateData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Update failed';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
