import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import { updateIncidentStatus, deleteIncident, clearResolvedIncidents } from '../../../../lib/monitoring/store';
import type { IncidentStatus } from '../../../../lib/monitoring/types';

export const prerender = false;

/**
 * PATCH /api/admin/monitoring/incidents
 * Authenticated API to update incident status (open | investigating | resolved | ignored).
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

    const validStatuses: IncidentStatus[] = ['open', 'investigating', 'resolved', 'ignored'];
    if (!validStatuses.includes(body.status)) {
      return new Response(JSON.stringify({ error: 'Invalid incident status' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const success = await updateIncidentStatus(locals, body.id, body.status);
    return new Response(JSON.stringify({ success }), {
      status: success ? 200 : 404,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Failed to update incident' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

/**
 * DELETE /api/admin/monitoring/incidents
 * Authenticated API to delete an incident by id or clear all resolved incidents.
 */
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
    const id = url.searchParams.get('id');
    const clearResolved = url.searchParams.get('clear_resolved');

    if (clearResolved === 'true') {
      const success = await clearResolvedIncidents(locals);
      return new Response(JSON.stringify({ success }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing incident id' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const success = await deleteIncident(locals, id);
    return new Response(JSON.stringify({ success }), {
      status: success ? 200 : 404,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Failed to delete incident' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
