import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import { runUptimeChecks, recordClientProbes } from '../../../../lib/monitoring/uptime-runner';

export const prerender = false;

/**
 * POST /api/admin/monitoring/uptime-check
 * Authenticated API to execute or record health check probes across all monitored routes.
 * Supports both client-side authentic probes (from browser) and server-side fallback probes.
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
    let payload: any = null;
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      try {
        payload = await request.json();
      } catch {}
    }

    let results;
    if (payload?.probes && Array.isArray(payload.probes) && payload.probes.length > 0) {
      results = await recordClientProbes(locals, payload.probes);
    } else {
      const origin = url.origin || 'https://aifreecalculator.com';
      results = await runUptimeChecks(origin, locals);
    }

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
