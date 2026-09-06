import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import { updateErrorGroupStatus } from '../../../../lib/monitoring/store';
import type { ErrorStatus } from '../../../../lib/monitoring/types';

export const prerender = false;

/**
 * PATCH /api/admin/monitoring/errors
 * Authenticated API to update error group status (open | investigating | resolved | ignored).
 */
export const PATCH: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = (await request.json().catch(() => null)) as any;
    if (!body || !body.id || !body.status) {
      return new Response(JSON.stringify({ error: 'Missing required parameters (id, status)' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const validStatuses: ErrorStatus[] = ['open', 'investigating', 'resolved', 'ignored'];
    if (!validStatuses.includes(body.status)) {
      return new Response(JSON.stringify({ error: 'Invalid error group status' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const success = await updateErrorGroupStatus(locals, body.id, body.status);
    return new Response(JSON.stringify({ success }), {
      status: success ? 200 : 404,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Failed to update error group' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
