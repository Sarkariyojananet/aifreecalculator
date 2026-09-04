/**
 * POST /api/admin/calculator-health/run/[slug]
 * Runs tests for a single calculator and saves results.
 */
import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../../lib/auth';
import { runTestsForCalculator } from '../../../../../lib/calculator-tests/test-runner';
import { getLatestTestResults, saveTestRun } from '../../../../../lib/calculator-tests/health-store';
import { getTestedSlugs } from '../../../../../lib/calculator-tests/test-cases';
import type { FullTestRunResult } from '../../../../../lib/calculator-tests/types';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, locals, params }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const slug = params.slug ?? '';

  // Validate slug is alphanumeric + hyphens only
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    return new Response(JSON.stringify({ error: 'Invalid calculator slug.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const testedSlugs = getTestedSlugs();
  if (!testedSlugs.includes(slug)) {
    return new Response(
      JSON.stringify({
        success: true,
        slug,
        message: 'No test cases are defined for this calculator slug.',
        totalTests: 0,
        state: 'NOT_TESTED',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const summary = await runTestsForCalculator(slug);

    // Merge this single-calculator result into the full results blob
    const existing = (await getLatestTestResults(locals)) ?? {};
    existing[slug] = {
      state: summary.state as string,
      passed: summary.passed,
      failed: summary.failed,
      errored: summary.errored,
      skipped: summary.skipped,
      total: summary.totalTests,
      lastTestedAt: summary.lastTestedAt ?? new Date().toISOString(),
      runId: `run_single_${Date.now()}`,
      results: summary.results.map((r) => ({
        testName: r.testName,
        state: r.state,
        category: r.category,
        errorMessage: r.errorMessage,
        actualValue: r.actualValue,
        expectedValue: r.expectedValue,
        durationMs: r.durationMs,
      })),
    };

    // Build a synthetic FullTestRunResult for saveTestRun compatibility
    const fullResult: FullTestRunResult = {
      runId: existing[slug].runId,
      startedAt: existing[slug].lastTestedAt,
      completedAt: existing[slug].lastTestedAt,
      totalTests: summary.totalTests,
      passed: summary.passed,
      failed: summary.failed,
      errored: summary.errored,
      skipped: summary.skipped,
      byCalculator: [summary],
      triggeredBy: user.username || 'admin',
    };

    await saveTestRun(fullResult, locals);

    return new Response(
      JSON.stringify({
        success: true,
        slug,
        totalTests: summary.totalTests,
        passed: summary.passed,
        failed: summary.failed,
        errored: summary.errored,
        state: summary.state,
        results: summary.results,
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
