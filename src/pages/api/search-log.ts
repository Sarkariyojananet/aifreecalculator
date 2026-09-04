import type { APIRoute } from 'astro';
import { recordSearchQuery, deleteSearchQuery, clearAllSearchQueries, getSearchAnalytics } from '../../lib/admin/content-store';
import { authenticateAdminRequest } from '../../lib/auth';

export const prerender = false;

// Public logging of user search queries from search modal & hero search bar
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const { query, hasResults } = body;

    if (typeof query !== 'string') {
      return new Response(JSON.stringify({ error: 'Query is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const cleanQuery = query.trim();
    if (cleanQuery.length >= 2 && cleanQuery.length <= 100) {
      await recordSearchQuery(cleanQuery, Boolean(hasResults), locals);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    // Fail silently without disrupting user search
    return new Response(JSON.stringify({ success: false }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// Admin endpoint to delete a search query or fetch logs
export const GET: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const logs = await getSearchAnalytics(locals);
  return new Response(JSON.stringify({ success: true, logs }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
};

export const DELETE: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const url = new URL(request.url);
    const query = url.searchParams.get('query');
    const clearAll = url.searchParams.get('clearAll') === 'true';

    if (clearAll) {
      await clearAllSearchQueries(locals);
      return new Response(JSON.stringify({ success: true, logs: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!query) {
      return new Response(JSON.stringify({ error: 'Query parameter is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const updated = await deleteSearchQuery(query, locals);
    return new Response(JSON.stringify({ success: true, logs: updated }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Delete failed';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
