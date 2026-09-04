import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../lib/auth';
import { getInternalLinks, saveInternalLinks } from '../../../lib/admin/content-store';
import { calculators } from '../../../data/calculators';

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized: Admin authentication required' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const links = await getInternalLinks(locals);
  const calcList = calculators.map((c) => ({
    slug: c.slug,
    name: c.name,
    category: c.category,
    icon: c.icon,
    path: c.path,
  }));

  return new Response(JSON.stringify({ links, calculators: calcList }), {
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
    const { sourceSlug, relatedSlugs } = body;

    if (!sourceSlug || !Array.isArray(relatedSlugs)) {
      return new Response(
        JSON.stringify({ error: 'sourceSlug (string) and relatedSlugs (array) are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = await saveInternalLinks(sourceSlug, relatedSlugs, locals);
    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error || 'Failed to save internal links.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        sourceSlug,
        relatedSlugs: result.relatedSlugs,
        message: `Successfully updated internal links for ${sourceSlug}.`,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to save internal links';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
