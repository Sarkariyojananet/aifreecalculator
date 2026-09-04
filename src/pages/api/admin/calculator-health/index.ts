/**
 * GET /api/admin/calculator-health
 * Returns health summary for all calculators.
 */
import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import { getCalculatorHealthSummaries } from '../../../../lib/calculator-tests/health-store';

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const summaries = await getCalculatorHealthSummaries(locals);
    const healthy = summaries.filter((s) => s.healthStatus === 'Healthy').length;
    const needsReview = summaries.filter((s) => s.healthStatus === 'Needs Review').length;
    const critical = summaries.filter((s) => s.healthStatus === 'Critical').length;
    const unknown = summaries.filter((s) => s.healthStatus === 'Unknown').length;

    return new Response(
      JSON.stringify({
        success: true,
        calculators: summaries,
        stats: { healthy, needsReview, critical, unknown, total: summaries.length },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to load health data';
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
