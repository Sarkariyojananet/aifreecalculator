import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../lib/auth';
import {
  getHomepageSections,
  saveHomepageSections,
  type HomepageSection,
} from '../../../lib/admin/content-store';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const sections = await getHomepageSections(locals);
  return new Response(JSON.stringify({ sections, total: sections.length }), {
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
    const { sections } = body;

    if (!Array.isArray(sections)) {
      return new Response(JSON.stringify({ error: 'Sections array is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sanitized: HomepageSection[] = sections.map((s: any, idx: number) => ({
      id: s.id || `sec-${idx + 1}`,
      title: (s.title || '').trim() || 'Calculation Tools',
      description: (s.description || '').trim() || '',
      enabled: s.enabled !== false,
      sortOrder: typeof s.sortOrder === 'number' ? s.sortOrder : idx + 1,
      featuredSlugs: Array.isArray(s.featuredSlugs) ? s.featuredSlugs : undefined,
    }));

    await saveHomepageSections(sanitized, locals);

    return new Response(JSON.stringify({ success: true, sections: sanitized }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to save homepage sections';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
