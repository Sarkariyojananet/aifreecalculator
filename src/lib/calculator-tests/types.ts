/**
 * Calculator Reliability & Intelligence System — Type Definitions
 * All interfaces and types for the test framework.
 */

// ─── Test States ───────────────────────────────────────────────────────────────

export type TestState = 'PASS' | 'FAIL' | 'ERROR' | 'SKIPPED';

export type TestCategory =
  | 'Normal'
  | 'Decimal'
  | 'Minimum'
  | 'Maximum'
  | 'Zero'
  | 'Invalid Input'
  | 'Boundary'
  | 'Regression'
  | 'Edge Case';

// ─── Individual Test Case ──────────────────────────────────────────────────────

export interface CalculatorTestCase {
  /** Calculator slug matching src/data/calculators.json */
  slug: string;
  /** Human-readable test name */
  name: string;
  /** Test category */
  category: TestCategory;
  /** Expected outcome: 'throw' = function should throw, 'result' = function returns value */
  expectedBehavior: 'throw' | 'result';
  /**
   * Optional: Key path in the returned result object to compare.
   * e.g. 'monthlyEmi' or 'bmi' or 'totalAmount'
   * If undefined and expectedBehavior is 'result', we just verify no exception was thrown.
   */
  expectedResultKey?: string;
  /** Expected value to compare against (used when expectedBehavior is 'result') */
  expectedValue?: number | string | boolean;
  /** Tolerance for numeric comparisons (±). Default: 0. */
  tolerance?: number;
  /**
   * The actual test function: receives no args, must call the calculator and return
   * the result object OR throw. Must not be async.
   */
  run: () => unknown;
  /** Human-readable description of the test input and expected output derivation */
  description?: string;
}

// ─── Test Run Results ──────────────────────────────────────────────────────────

export interface TestCaseResult {
  slug: string;
  testName: string;
  category: TestCategory;
  state: TestState;
  expectedBehavior: 'throw' | 'result';
  expectedResultKey?: string;
  expectedValue?: number | string | boolean;
  actualValue?: number | string | boolean;
  tolerance?: number;
  errorMessage?: string;
  durationMs: number;
}

export interface CalculatorTestSummary {
  slug: string;
  totalTests: number;
  passed: number;
  failed: number;
  errored: number;
  skipped: number;
  state: TestState | 'NOT_TESTED';
  lastTestedAt?: string;
  results: TestCaseResult[];
}

export interface FullTestRunResult {
  runId: string;
  startedAt: string;
  completedAt: string;
  totalTests: number;
  passed: number;
  failed: number;
  errored: number;
  skipped: number;
  byCalculator: CalculatorTestSummary[];
  triggeredBy: string;
}

// ─── Runtime Error Log ────────────────────────────────────────────────────────

export type RuntimeErrorType = 'nan' | 'infinity' | 'exception' | 'invalid_result';

export interface RuntimeErrorEvent {
  calculatorSlug: string;
  errorType: RuntimeErrorType;
  errorMessage?: string;
  /** ISO timestamp */
  occurredAt: string;
}

export interface RuntimeErrorLogEntry {
  id: string;
  calculator_slug: string;
  error_type: RuntimeErrorType;
  error_message: string | null;
  occurrences: number;
  first_seen: string;
  last_seen: string;
  reviewed: number; // 0 = unreviewed, 1 = reviewed
}

// ─── Health Status ────────────────────────────────────────────────────────────

export type CalculatorHealthStatus = 'Healthy' | 'Needs Review' | 'Critical' | 'Unknown';

export interface CalculatorHealthSummary {
  slug: string;
  name: string;
  category: string;
  icon: string;
  /** Test state from last test run for this calculator. Undefined = never tested. */
  testState?: TestState;
  /** Counts from last test run */
  testPassed?: number;
  testFailed?: number;
  testErrored?: number;
  testTotal?: number;
  /** ISO timestamp of last test run */
  lastTestedAt?: string;
  /** Unreviewed runtime errors in D1 */
  unreviewedErrors: number;
  /** Computed overall health based on test state + errors */
  healthStatus: CalculatorHealthStatus;
  /** Explanation of why this status was assigned */
  healthReason: string;
}

// ─── Test Run History (stored in D1) ──────────────────────────────────────────

export interface TestRunRecord {
  id: string;
  started_at: string;
  completed_at: string | null;
  total_tests: number;
  passed: number;
  failed: number;
  errored: number;
  skipped: number;
  triggered_by: string;
}
