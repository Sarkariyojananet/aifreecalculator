import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import { get404Logs, getRedirectSummaryKPIs, delete404Log } from '../../../../lib/redirects/store';
import type { Log404Status, RedirectPriority } from '../../../../lib/redirects/types';

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized: Admin authentication required' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const url = new URL(request.url);
  const status = (url.searchParams.get('status') as Log404Status | 'all') || 'active';
  const priority = (url.searchParams.get('priority') as RedirectPriority | 'all') || 'all';
  const search = url.searchParams.get('search') || '';
  const limit = Math.min(100, Math.max(10, parseInt(url.searchParams.get('limit') || '50', 10)));
  const offset = Math.max(0, parseInt(url.searchParams.get('offset') || '0', 10));
  const sortBy = (url.searchParams.get('sortBy') as any) || 'last_seen';

  const result = await get404Logs({ status, priority, search, limit, offset, sortBy }, locals);
  const kpis = await getRedirectSummaryKPIs(locals);

  return new Response(
    JSON.stringify({
      logs: result.logs,
      total: result.total,
      limit,
      offset,
      kpis,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    }
  );
};
