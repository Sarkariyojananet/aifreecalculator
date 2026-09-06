/**
 * POST /api/admin/calculator-health/run
 * Runs all calculator tests, computes 0-100 health scores, and saves results to D1.
 */
import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import { runAllTests } from '../../../../lib/calculator-tests/test-runner';

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
    const { runResult, healthScores } = await runAllTests(user.username || 'admin', locals);

    return new Response(
      JSON.stringify({
        success: true,
        runId: runResult.runId,
        startedAt: runResult.startedAt,
        completedAt: runResult.completedAt,
        totalTests: runResult.totalTests,
        passed: runResult.passed,
        failed: runResult.failed,
        errored: runResult.errored,
        skipped: runResult.skipped,
        healthScores,
        byCalculator: runResult.byCalculator.map((s) => ({
          slug: s.slug,
          totalTests: s.totalTests,
          passed: s.passed,
          failed: s.failed,
          errored: s.errored,
          state: s.state,
          healthScore: healthScores[s.slug]?.healthScore ?? null,
          healthGrade: healthScores[s.slug]?.grade ?? null,
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
