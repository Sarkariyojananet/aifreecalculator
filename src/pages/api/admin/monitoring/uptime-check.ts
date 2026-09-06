import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import { runUptimeChecks } from '../../../../lib/monitoring/uptime-runner';

export const prerender = false;

/**
 * POST /api/admin/monitoring/uptime-check
 * Authenticated API to execute an on-demand health check probe across all monitored routes.
 */
export const POST: APIRoute = async ({ request, cookies, locals, url }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const origin = url.origin;
    const results = await runUptimeChecks(origin, locals);

    return new Response(JSON.stringify({ success: true, routes: results }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Uptime check run failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
