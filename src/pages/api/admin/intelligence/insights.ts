import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import { updateInsightStatus, getStoredInsights } from '../../../../lib/intelligence/intelligence-store';
import type { InsightStatus } from '../../../../lib/intelligence/types';

export const prerender = false;

/**
 * GET /api/admin/intelligence/insights
 * Returns stored insights with optional filters
 */
export const GET: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const url = new URL(request.url);
    const status = url.searchParams.get('status') || undefined;
    const category = url.searchParams.get('category') || undefined;
    const priority = url.searchParams.get('priority') || undefined;

    const insights = await getStoredInsights(locals, { status, category, priority });

    return new Response(JSON.stringify({ success: true, count: insights.length, insights }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

/**
 * PATCH /api/admin/intelligence/insights
 * Updates an insight's status (active, acknowledged, resolved, ignored)
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
      return new Response(JSON.stringify({ error: 'id and status are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const validStatuses: InsightStatus[] = ['active', 'acknowledged', 'resolved', 'ignored'];
    if (!validStatuses.includes(body.status)) {
      return new Response(
        JSON.stringify({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const updated = await updateInsightStatus(body.id, body.status, locals);

    return new Response(JSON.stringify({ success: true, updated }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
