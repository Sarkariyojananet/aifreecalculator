import type { APIRoute } from 'astro';
import { recordSearchQuery, deleteSearchQuery, clearAllSearchQueries, getSearchAnalytics } from '../../lib/admin/content-store';
import { authenticateAdminRequest } from '../../lib/auth';
import { safeWaitUntil } from '../../lib/cloudflare-env';

export const prerender = false;

const JSON_HEADERS = { 'Content-Type': 'application/json' } as const;

// Factory functions — always return a fresh Response (singleton + .clone() causes "Body is unusable" 500 errors)
const successRes       = () => new Response(JSON.stringify({ success: true }),                         { status: 200, headers: JSON_HEADERS });
const failRes          = () => new Response(JSON.stringify({ success: false }),                        { status: 200, headers: JSON_HEADERS });
const unauthorizedRes  = () => new Response(JSON.stringify({ error: 'Unauthorized' }),                 { status: 401, headers: JSON_HEADERS });
const queryRequiredRes = () => new Response(JSON.stringify({ error: 'Query parameter is required' }), { status: 400, headers: JSON_HEADERS });
const queryReqPostRes  = () => new Response(JSON.stringify({ error: 'Query is required' }),            { status: 400, headers: JSON_HEADERS });
const emptyLogsRes     = () => new Response(JSON.stringify({ success: true, logs: [] }),               { status: 200, headers: JSON_HEADERS });

// Public logging of user search queries & Admin deletion fallback
export const POST: APIRoute = async ({ request, cookies, locals }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const { action, query, hasResults, clearAll } = body;

    // Support deletion via POST for environments where HTTP DELETE is restricted
    if (action === 'delete') {
      const user = await authenticateAdminRequest(request, cookies);
      if (!user) {
        return unauthorizedRes();
      }

      if (clearAll) {
        await clearAllSearchQueries(locals);
        return emptyLogsRes();
      }

      if (!query || typeof query !== 'string') {
        return queryRequiredRes();
      }

      const updated = await deleteSearchQuery(query, locals);
      return new Response(JSON.stringify({ success: true, logs: updated }), {
        status: 200,
        headers: JSON_HEADERS,
      });
    }

    if (typeof query !== 'string') {
      return queryReqPostRes();
    }

    const cleanQuery = query.trim();
    if (cleanQuery.length >= 2 && cleanQuery.length <= 100) {
      const recordPromise = recordSearchQuery(cleanQuery, Boolean(hasResults), locals).catch(() => {});
      safeWaitUntil(locals, recordPromise);
    }

    return successRes();
  } catch {
    // Fail silently without disrupting user search
    return failRes();
  }
};

// Admin endpoint to fetch search analytics logs
export const GET: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return unauthorizedRes();
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

// Admin endpoint to delete a specific search query or clear all
export const DELETE: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return unauthorizedRes();
  }

  try {
    const url = new URL(request.url);
    const query = url.searchParams.get('query');
    const clearAll = url.searchParams.get('clearAll') === 'true';

    if (clearAll) {
      await clearAllSearchQueries(locals);
      return emptyLogsRes();
    }

    if (!query) {
      return queryRequiredRes();
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
