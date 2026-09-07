import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import { analyzeFocusKeyword } from '../../../../lib/seo/focus-keyword';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const body = await request.json();
    const result = analyzeFocusKeyword({
      keyword: body.keyword || '',
      title: body.title || '',
      description: body.description || '',
      slug: body.slug || '',
      content: body.content || '',
      headings: body.headings || [],
      internalLinksCount: body.internalLinksCount || 1,
      hasSchema: body.hasSchema !== false,
    });

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Analysis failed';
    return new Response(JSON.stringify({ error: msg }), { status: 400 });
  }
};
