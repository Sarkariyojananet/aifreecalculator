/**
 * POST /api/admin/calculator-health/run
 * Runs all calculator tests and saves results to D1.
 */
import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import { runAllTests } from '../../../../lib/calculator-tests/test-runner';
import { saveTestRun } from '../../../../lib/calculator-tests/health-store';

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
    const result = await runAllTests(user.username || 'admin');
    await saveTestRun(result, locals);

    return new Response(
      JSON.stringify({
        success: true,
        runId: result.runId,
        startedAt: result.startedAt,
        completedAt: result.completedAt,
        totalTests: result.totalTests,
        passed: result.passed,
        failed: result.failed,
        errored: result.errored,
        skipped: result.skipped,
        byCalculator: result.byCalculator.map((s) => ({
          slug: s.slug,
          totalTests: s.totalTests,
          passed: s.passed,
          failed: s.failed,
          errored: s.errored,
          state: s.state,
        })),
      }),
      { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Test run failed';
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
