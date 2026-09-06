import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../lib/auth';
import { getCMSCategories, saveCMSCategories, deleteCMSCategory, type CategoryItem } from '../../../lib/admin/content-store';
import { purgeCloudflareCache } from '../../../lib/performance/cloudflare-client';
import { calculators } from '../../../data/calculators';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const cats = await getCMSCategories(locals);
  const enriched = cats.map((cat) => {
    const count = calculators.filter((c) => c.category.toLowerCase() === cat.name.toLowerCase()).length;
    return { ...cat, count };
  });

  return new Response(JSON.stringify({ categories: enriched, total: enriched.length }), {
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
    const { name, icon, description, path, slug } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return new Response(JSON.stringify({ error: 'Category name is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const trimmedName = name.trim();
    const cleanSlug = (slug || trimmedName).toLowerCase().trim().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '');
    const cleanPath = path?.trim() || `/${cleanSlug}/`;

    const current = await getCMSCategories(locals);
    const existingIndex = current.findIndex(
      (c) => c.name.toLowerCase() === trimmedName.toLowerCase() || (c.slug && c.slug.toLowerCase() === cleanSlug)
    );

    const categoryItem: CategoryItem = {
      name: trimmedName,
      icon: icon?.trim() || '📁',
      description: description?.trim() || `Calculators and calculation tools for ${trimmedName}.`,
      path: cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`,
      slug: cleanSlug,
      custom: true,
    };

    if (existingIndex >= 0) {
      current[existingIndex] = { ...current[existingIndex], ...categoryItem };
    } else {
      current.push(categoryItem);
    }

    await saveCMSCategories(current, locals);

    // Asynchronously invalidate targeted edge cache for this category hub
    try {
      await purgeCloudflareCache({ target: 'category', value: cleanSlug }, locals);
    } catch {}

    return new Response(JSON.stringify({ success: true, category: categoryItem, categories: current }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to save category';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const DELETE: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized: Admin authentication required' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const url = new URL(request.url);
    const categoryName = url.searchParams.get('name');

    if (!categoryName) {
      return new Response(JSON.stringify({ error: 'Category name parameter is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await deleteCMSCategory(categoryName, locals);
    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, categories: result.categories }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete category';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
