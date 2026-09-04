/**
 * Calculator Test Runner
 * Executes test cases and produces structured results.
 * Imports and calls the same real formula functions used in production.
 */

import type {
  CalculatorTestSummary,
  FullTestRunResult,
  TestCaseResult,
  TestState,
} from './types';
import { runTestCase } from './result-validator';
import { ALL_TEST_CASES, getTestCasesForSlug, getTestedSlugs } from './test-cases';

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
 * Run tests for a single calculator slug.
 * Returns the calculator-level summary.
 */
export async function runTestsForCalculator(slug: string): Promise<CalculatorTestSummary> {
  const testCases = getTestCasesForSlug(slug);

  if (testCases.length === 0) {
    return {
      slug,
      totalTests: 0,
      passed: 0,
      failed: 0,
      errored: 0,
      skipped: 0,
      state: 'NOT_TESTED',
      results: [],
    };
  }

  const results: TestCaseResult[] = testCases.map((tc) => runTestCase(tc));
  return summarizeForSlug(slug, results);
}

/**
 * Run all test cases across all calculators that have tests defined.
 * Returns a full test run result object.
 */
export async function runAllTests(triggeredBy = 'admin'): Promise<FullTestRunResult> {
  const startedAt = new Date().toISOString();
  const runId = `run_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

  // Execute all test cases
  const allResults: TestCaseResult[] = ALL_TEST_CASES.map((tc) => runTestCase(tc));

  // Summarize per calculator
  const testedSlugs = getTestedSlugs();
  const byCalculator = testedSlugs.map((slug) => summarizeForSlug(slug, allResults));

  const totalTests = allResults.length;
  const passed = allResults.filter((r) => r.state === 'PASS').length;
  const failed = allResults.filter((r) => r.state === 'FAIL').length;
  const errored = allResults.filter((r) => r.state === 'ERROR').length;
  const skipped = allResults.filter((r) => r.state === 'SKIPPED').length;

  const completedAt = new Date().toISOString();

  return {
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
}
