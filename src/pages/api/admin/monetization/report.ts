/**
 * /api/admin/monetization/report
 * Authenticated API returning monetization summary, KPIs, deltas, and daily trend points.
 */

import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import { getMonetizationSummary } from '../../../../lib/monetization/monetization-store';
import type { MonetizationDateRange } from '../../../../lib/monetization/types';

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, locals, url }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const range = (url.searchParams.get('range') || '28d') as MonetizationDateRange;
  const start = url.searchParams.get('start') || undefined;
  const end = url.searchParams.get('end') || undefined;

  try {
    const summary = await getMonetizationSummary(range, start, end, locals);

    return new Response(JSON.stringify({ success: true, summary }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || 'Failed to fetch monetization report.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
