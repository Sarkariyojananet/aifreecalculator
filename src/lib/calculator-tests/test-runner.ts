/**
 * Calculator Test Runner
 * Executes predefined and custom test cases and produces structured results.
 * Imports and calls the same real formula functions used in production.
 */

import type {
  CalculatorTestCase,
  CalculatorTestSummary,
  FullTestRunResult,
  TestCaseResult,
  TestState,
  CalculatorHealthScore,
} from './types';
import { runTestCase } from './result-validator';
import { ALL_TEST_CASES, getTestCasesForSlug, getTestedSlugs } from './test-cases';
import { getCustomTestCases, saveAllCalculatorHealthScores, saveTestRun } from './health-store';
import { buildExecutableCustomTestCase } from './formula-dispatch';
import { computeCalculatorHealthScore } from './health-scorer';
import { calculators } from '../../data/calculators';

/**
 * Compute per-calculator summary from individual test results.
 */
function summarizeForSlug(slug: string, results: TestCaseResult[]): CalculatorTestSummary {
  const slugResults = results.filter((r) => r.slug === slug);
  const passed = slugResults.filter((r) => r.state === 'PASS').length;
  const failed = slugResults.filter((r) => r.state === 'FAIL').length;
  const errored = slugResults.filter((r) => r.state === 'ERROR').length;
  const skipped = slugResults.filter((r) => r.state === 'SKIPPED').length;
  const total = slugResults.length;

  let state: TestState | 'NOT_TESTED' = 'NOT_TESTED';
  if (total > 0) {
    if (errored > 0) state = 'ERROR';
    else if (failed > 0) state = 'FAIL';
    else if (passed === total) state = 'PASS';
    else state = 'FAIL';
  }

  return {
    slug,
    totalTests: total,
    passed,
    failed,
    errored,
    skipped,
    state,
    lastTestedAt: new Date().toISOString(),
    results: slugResults,
  };
}

/**
 * Run tests for a single calculator slug (both predefined and active custom tests).
 * Returns the calculator-level summary.
 */
export async function runTestsForCalculator(
  slug: string,
  locals?: unknown
): Promise<{ summary: CalculatorTestSummary; healthScore: CalculatorHealthScore }> {
  const staticCases = getTestCasesForSlug(slug);

  // Load custom tests from D1
  const customDefs = await getCustomTestCases(locals, slug);
  const activeCustomCases = customDefs
    .filter((d) => d.active)
    .map(buildExecutableCustomTestCase);

  const allCases: CalculatorTestCase[] = [...staticCases, ...activeCustomCases];

  if (allCases.length === 0) {
    const emptySummary: CalculatorTestSummary = {
      slug,
      totalTests: 0,
      passed: 0,
      failed: 0,
      errored: 0,
      skipped: 0,
      state: 'NOT_TESTED',
      results: [],
    };
    const healthScore = computeCalculatorHealthScore(slug, { testSummary: emptySummary });
    return { summary: emptySummary, healthScore };
  }

  const results: TestCaseResult[] = allCases.map((tc) => runTestCase(tc));
  const summary = summarizeForSlug(slug, results);
  const healthScore = computeCalculatorHealthScore(slug, { testSummary: summary });

  return { summary, healthScore };
}

/**
 * Run all test cases across all calculators that have tests defined.
 * Returns full test run result and caches health scores in D1.
 */
export async function runAllTests(
  triggeredBy = 'admin',
  locals?: unknown
): Promise<{ runResult: FullTestRunResult; healthScores: Record<string, CalculatorHealthScore> }> {
  const startedAt = new Date().toISOString();
  const runId = `run_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

  // Load active custom test cases
  const customDefs = await getCustomTestCases(locals);
  const customCases = customDefs.filter((d) => d.active).map(buildExecutableCustomTestCase);

  const combinedCases: CalculatorTestCase[] = [...ALL_TEST_CASES, ...customCases];

  // Execute all test cases
  const allResults: TestCaseResult[] = combinedCases.map((tc) => runTestCase(tc));

  // Collect all known slugs
  const allSlugs = Array.from(new Set([...calculators.map((c) => c.slug), ...getTestedSlugs()]));
  const byCalculator = allSlugs.map((slug) => summarizeForSlug(slug, allResults));

  const totalTests = allResults.length;
  const passed = allResults.filter((r) => r.state === 'PASS').length;
  const failed = allResults.filter((r) => r.state === 'FAIL').length;
  const errored = allResults.filter((r) => r.state === 'ERROR').length;
  const skipped = allResults.filter((r) => r.state === 'SKIPPED').length;

  const completedAt = new Date().toISOString();

  const runResult: FullTestRunResult = {
    runId,
    startedAt,
    completedAt,
    totalTests,
    passed,
    failed,
    errored,
    skipped,
    byCalculator,
    triggeredBy,
  };

  // Compute 0-100 Health Scores for all calculators
  const healthScores: Record<string, CalculatorHealthScore> = {};
  for (const calc of calculators) {
    const summary = byCalculator.find((b) => b.slug === calc.slug) || null;
    healthScores[calc.slug] = computeCalculatorHealthScore(calc, {
      testSummary: summary,
      lastCheckedAt: completedAt,
    });
  }

  // Persist to D1
  await saveTestRun(runResult, locals);
  await saveAllCalculatorHealthScores(healthScores, locals);

  return { runResult, healthScores };
}
