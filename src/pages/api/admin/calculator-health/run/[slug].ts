/**
 * POST /api/admin/calculator-health/run/[slug]
 * Runs tests for a single calculator, computes its 0-100 health score, and saves results.
 */
import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../../lib/auth';
import { runTestsForCalculator } from '../../../../../lib/calculator-tests/test-runner';
import {
  getLatestTestResults,
  saveTestRun,
  getAllCalculatorHealthScores,
  saveAllCalculatorHealthScores,
} from '../../../../../lib/calculator-tests/health-store';
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

  try {
    const { summary, healthScore } = await runTestsForCalculator(slug, locals);

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

    // Update test runs record
    const singleRun: FullTestRunResult = {
      runId: `run_single_${slug}_${Date.now()}`,
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      totalTests: summary.totalTests,
      passed: summary.passed,
      failed: summary.failed,
      errored: summary.errored,
      skipped: summary.skipped,
      byCalculator: [summary],
      triggeredBy: `admin:${user.username || 'admin'}`,
    };

    await saveTestRun(singleRun, locals);

    // Update cached health score
    const allScores = await getAllCalculatorHealthScores(locals);
    allScores[slug] = healthScore;
    await saveAllCalculatorHealthScores(allScores, locals);

    return new Response(
      JSON.stringify({
        success: true,
        slug,
        summary: {
          totalTests: summary.totalTests,
          passed: summary.passed,
          failed: summary.failed,
          errored: summary.errored,
          state: summary.state,
          results: summary.results,
        },
        healthScore,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Test run failed';
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
