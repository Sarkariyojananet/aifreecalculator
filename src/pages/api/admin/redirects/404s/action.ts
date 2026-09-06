import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../../lib/auth';
import { update404Status, delete404Log, getRedirectSummaryKPIs } from '../../../../../lib/redirects/store';

export const prerender = false;

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
    const { path, action } = body;

    if (!path || !action) {
      return new Response(JSON.stringify({ error: 'Both path and action ("ignore" | "restore" | "delete") are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === 'ignore') {
      await update404Status(path, 'ignored', undefined, locals);
    } else if (action === 'restore') {
      await update404Status(path, 'active', undefined, locals);
    } else if (action === 'delete') {
      await delete404Log(path, locals);
    } else {
      return new Response(JSON.stringify({ error: 'Invalid action. Supported: "ignore", "restore", "delete"' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const kpis = await getRedirectSummaryKPIs(locals);

    return new Response(JSON.stringify({ success: true, path, action, kpis }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to perform 404 action';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
