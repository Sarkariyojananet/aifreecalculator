/**
 * /api/admin/monetization/sync
 * Authenticated API for triggering an on-demand sync from Google AdSense API.
 * Pulls authentic reporting metrics and stores aggregated snapshots in D1.
 */

import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import { syncAdSenseMetrics } from '../../../../lib/monetization/monetization-store';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    let days = 90;
    try {
      const body = await request.json();
      if (typeof body.days === 'number' && body.days > 0 && body.days <= 180) {
        days = body.days;
      }
    } catch {}

    const result = await syncAdSenseMetrics(days, locals);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err: any) {
    console.error('AdSense sync error:', err);
    return new Response(
      JSON.stringify({ error: err.message || 'Failed to sync reporting data from Google AdSense.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
