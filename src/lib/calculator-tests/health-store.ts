/**
 * Calculator Health Data Store
 * Reads/writes test results and error logs via Cloudflare D1.
 * Follows the same pattern as src/lib/admin/content-store.ts.
 */

import { getDb } from '../db';
import type {
  FullTestRunResult,
  CalculatorTestSummary,
  RuntimeErrorLogEntry,
  TestRunRecord,
  CalculatorHealthSummary,
  CalculatorHealthStatus,
  CalculatorHealthScore,
  CustomTestCaseDefinition,
  HealthGrade,
} from './types';
import { calculators } from '../../data/calculators';
import { getTestedSlugs } from './test-cases';
import { computeCalculatorHealthScore } from './health-scorer';

// D1 keys for storing latest test run results, custom tests, and health scores in site_settings
const TEST_RESULTS_KEY = 'cms_calc_test_results';
const CUSTOM_TESTS_KEY = 'cms_custom_formula_tests';
const HEALTH_SCORES_KEY = 'cms_calc_health_scores';

// ─── Ensure Tables Exist ──────────────────────────────────────────────────────

/**
 * Create required tables if they don't exist.
 * Called before any read/write operations.
 */
async function ensureTables(locals?: unknown): Promise<void> {
  const db = getDb(locals);
  try {
    await db
      .prepare(`
        CREATE TABLE IF NOT EXISTS calc_test_runs (
          id TEXT PRIMARY KEY,
          started_at TEXT NOT NULL,
          completed_at TEXT,
          total_tests INTEGER DEFAULT 0,
          passed INTEGER DEFAULT 0,
          failed INTEGER DEFAULT 0,
          errored INTEGER DEFAULT 0,
          skipped INTEGER DEFAULT 0,
          triggered_by TEXT DEFAULT 'admin'
        )
      `)
      .run();

    await db
      .prepare(`
        CREATE TABLE IF NOT EXISTS calc_error_log (
          id TEXT PRIMARY KEY,
          calculator_slug TEXT NOT NULL,
          error_type TEXT NOT NULL,
          error_message TEXT,
          occurrences INTEGER DEFAULT 1,
          first_seen TEXT NOT NULL,
          last_seen TEXT NOT NULL,
          reviewed INTEGER DEFAULT 0
        )
      `)
      .run();

    await db
      .prepare(
        `CREATE INDEX IF NOT EXISTS idx_calc_error_slug ON calc_error_log(calculator_slug)`
      )
      .run();

    await db
      .prepare(
        `CREATE INDEX IF NOT EXISTS idx_calc_error_reviewed ON calc_error_log(reviewed)`
      )
      .run();

    await db
      .prepare(
        `CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)`
      )
      .run();
  } catch {
    // Tables may not be creatable in local fallback DB — silently continue
  }
}

// ─── Test Result Storage ──────────────────────────────────────────────────────

/**
 * Persist a full test run to D1.
 * - Stores run header in calc_test_runs table
 * - Stores per-calculator results as JSON blob in site_settings
 */
export async function saveTestRun(
  result: FullTestRunResult,
  locals?: unknown
): Promise<void> {
  await ensureTables(locals);
  const db = getDb(locals);

  try {
    // 1. Store test run header
    await db
      .prepare(
        `INSERT OR REPLACE INTO calc_test_runs
          (id, started_at, completed_at, total_tests, passed, failed, errored, skipped, triggered_by)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        result.runId,
        result.startedAt,
        result.completedAt,
        result.totalTests,
        result.passed,
        result.failed,
        result.errored,
        result.skipped,
        result.triggeredBy
      )
      .run();

    // 2. Store per-calculator results in site_settings (JSON blob)
    // Merge with existing results if only running a subset of calculators
    const existing = (await getLatestTestResults(locals)) ?? {};
    const compactResults: Record<string, {
      state: string;
      passed: number;
      failed: number;
      errored: number;
      skipped: number;
      total: number;
      lastTestedAt: string;
      runId: string;
      // Store individual test case results (limited)
      results: Array<{
        testName: string;
        state: string;
        category: string;
        errorMessage?: string;
        actualValue?: number | string | boolean;
        expectedValue?: number | string | boolean;
        durationMs: number;
      }>;
    }> = result.byCalculator.length < 30 ? { ...existing } : {};

    for (const summary of result.byCalculator) {
      compactResults[summary.slug] = {
        state: summary.state,
        passed: summary.passed,
        failed: summary.failed,
        errored: summary.errored,
        skipped: summary.skipped,
        total: summary.totalTests,
        lastTestedAt: summary.lastTestedAt ?? result.completedAt ?? result.startedAt,
        runId: result.runId,
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
    }

    await db
      .prepare(`INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)`)
      .bind(TEST_RESULTS_KEY, JSON.stringify(compactResults))
      .run();
  } catch {
    // Storage failure must not bubble up to break test run response
  }
}

/**
 * Read the latest test results from site_settings.
 * Returns null if no results have been stored.
 */
export async function getLatestTestResults(
  locals?: unknown
): Promise<Record<string, {
  state: string;
  passed: number;
  failed: number;
  errored: number;
  skipped: number;
  total: number;
  lastTestedAt: string;
  runId: string;
  results: Array<{
    testName: string;
    state: string;
    category: string;
    errorMessage?: string;
    actualValue?: number | string | boolean;
    expectedValue?: number | string | boolean;
    durationMs: number;
  }>;
}> | null> {
  await ensureTables(locals);
  const db = getDb(locals);
  try {
    const row = await db
      .prepare(`SELECT value FROM site_settings WHERE key = ?`)
      .bind(TEST_RESULTS_KEY)
      .first<{ value: string }>();
    if (!row) return null;
    return JSON.parse(row.value);
  } catch {
    return null;
  }
}

/**
 * Get recent test run history (headers only, ordered newest first).
 * Capped at last 50 runs.
 */
export async function getTestRunHistory(locals?: unknown): Promise<TestRunRecord[]> {
  await ensureTables(locals);
  const db = getDb(locals);
  try {
    const { results } = await db
      .prepare(
        `SELECT id, started_at, completed_at, total_tests, passed, failed, errored, skipped, triggered_by
           FROM calc_test_runs
           ORDER BY started_at DESC
           LIMIT 50`
      )
      .all<TestRunRecord>();
    return results ?? [];
  } catch {
    return [];
  }
}

// ─── Error Log ────────────────────────────────────────────────────────────────

/**
 * Record or aggregate a runtime error event.
 * If an identical (slug + error_type) error already exists and is unreviewed,
 * increment its occurrence count instead of inserting a new row.
 * This prevents unlimited D1 writes for repeated errors.
 */
export async function recordRuntimeError(
  slug: string,
  errorType: string,
  errorMessage: string | null,
  locals?: unknown
): Promise<void> {
  await ensureTables(locals);
  const db = getDb(locals);
  const now = new Date().toISOString();

  try {
    // Check for existing unreviewed error of the same type
    const existing = await db
      .prepare(
        `SELECT id, occurrences FROM calc_error_log
           WHERE calculator_slug = ? AND error_type = ? AND reviewed = 0
           LIMIT 1`
      )
      .bind(slug, errorType)
      .first<{ id: string; occurrences: number }>();

    if (existing) {
      // Aggregate: increment occurrence count and update last_seen
      await db
        .prepare(
          `UPDATE calc_error_log
             SET occurrences = ?, last_seen = ?
             WHERE id = ?`
        )
        .bind(existing.occurrences + 1, now, existing.id)
        .run();
    } else {
      // New error entry
      const id = `err_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
      await db
        .prepare(
          `INSERT INTO calc_error_log
             (id, calculator_slug, error_type, error_message, occurrences, first_seen, last_seen, reviewed)
             VALUES (?, ?, ?, ?, 1, ?, ?, 0)`
        )
        .bind(id, slug, errorType, errorMessage, now, now)
        .run();
    }
  } catch {
    // Logging failure must never surface to users
  }
}

/**
 * Get all error log entries, optionally filtered.
 */
export async function getErrorLog(
  locals?: unknown,
  opts: { slug?: string; reviewed?: boolean; limit?: number } = {}
): Promise<RuntimeErrorLogEntry[]> {
  await ensureTables(locals);
  const db = getDb(locals);

  try {
    let query = `SELECT id, calculator_slug, error_type, error_message, occurrences, first_seen, last_seen, reviewed
                   FROM calc_error_log WHERE 1=1`;
    const binds: unknown[] = [];

    if (opts.slug) {
      query += ` AND calculator_slug = ?`;
      binds.push(opts.slug);
    }
    if (opts.reviewed !== undefined) {
      query += ` AND reviewed = ?`;
      binds.push(opts.reviewed ? 1 : 0);
    }
    query += ` ORDER BY last_seen DESC LIMIT ?`;
    binds.push(opts.limit ?? 200);

    const { results } = await db
      .prepare(query)
      .bind(...binds)
      .all<RuntimeErrorLogEntry>();
    return results ?? [];
  } catch {
    return [];
  }
}

/**
 * Get unreviewed error count for a specific calculator.
 */
export async function getUnreviewedErrorCount(
  slug: string,
  locals?: unknown
): Promise<number> {
  await ensureTables(locals);
  const db = getDb(locals);
  try {
    const row = await db
      .prepare(
        `SELECT COUNT(*) as cnt FROM calc_error_log
           WHERE calculator_slug = ? AND reviewed = 0`
      )
      .bind(slug)
      .first<{ cnt: number }>();
    return row?.cnt ?? 0;
  } catch {
    return 0;
  }
}

/**
 * Mark an error log entry as reviewed.
 */
export async function markErrorReviewed(id: string, locals?: unknown): Promise<void> {
  await ensureTables(locals);
  const db = getDb(locals);
  try {
    await db
      .prepare(`UPDATE calc_error_log SET reviewed = 1 WHERE id = ?`)
      .bind(id)
      .run();
  } catch {}
}

// ─── Health Summary Builder ──────────────────────────────────────────────────

/**
 * Determine overall health status based on test state and error count.
 *
 * Rules:
 *   Critical:     Any test ERROR, OR unreviewedErrors >= 10
 *   Needs Review: Any test FAIL, OR unreviewedErrors >= 1
 *   Healthy:      All tests PASS AND unreviewedErrors = 0
 *   Unknown:      No tests run yet
 */
function computeHealthStatus(
  testState: string | undefined,
  unreviewedErrors: number
): { status: CalculatorHealthStatus; reason: string } {
  if (!testState || testState === 'NOT_TESTED') {
    return { status: 'Unknown', reason: 'No tests have been run for this calculator.' };
  }
  if (testState === 'ERROR' || unreviewedErrors >= 10) {
    return {
      status: 'Critical',
      reason:
        testState === 'ERROR'
          ? 'One or more test cases threw an unexpected exception.'
          : `${unreviewedErrors} unreviewed runtime errors detected.`,
    };
  }
  if (testState === 'FAIL' || unreviewedErrors >= 1) {
    return {
      status: 'Needs Review',
      reason:
        testState === 'FAIL'
          ? 'One or more test cases returned incorrect results.'
          : `${unreviewedErrors} unreviewed runtime error(s) need attention.`,
    };
  }
  if (testState === 'PASS') {
    return { status: 'Healthy', reason: 'All test cases passed and no unreviewed errors exist.' };
  }
  return { status: 'Unknown', reason: 'Test state is indeterminate.' };
}

/**
 * Build a health summary for all registered calculators.
 * Combines test results, error counts, and computes health status.
 */
export async function getCalculatorHealthSummaries(
  locals?: unknown
): Promise<CalculatorHealthSummary[]> {
  const testResults = await getLatestTestResults(locals);
  const testedSlugs = getTestedSlugs();

  const summaries: CalculatorHealthSummary[] = [];

  for (const calc of calculators) {
    const slug = calc.slug;
    const testData = testResults?.[slug] ?? null;
    const unreviewedErrors = await getUnreviewedErrorCount(slug, locals);

    const testState = testData?.state;
    const { status, reason } = computeHealthStatus(testState, unreviewedErrors);

    // Compute 0-100 Health Score
    const scoreObj = computeCalculatorHealthScore(calc, {
      testSummary: testData
        ? {
            slug,
            totalTests: testData.total,
            passed: testData.passed,
            failed: testData.failed,
            errored: testData.errored,
            skipped: testData.skipped,
            state: testData.state as any,
            lastTestedAt: testData.lastTestedAt,
            results: [],
          }
        : null,
      unreviewedErrors,
      lastCheckedAt: testData?.lastTestedAt,
    });

    summaries.push({
      slug,
      name: calc.name,
      category: calc.category,
      icon: calc.icon,
      testState: testData?.state as 'PASS' | 'FAIL' | 'ERROR' | 'SKIPPED' | undefined,
      testPassed: testData?.passed,
      testFailed: testData?.failed,
      testErrored: testData?.errored,
      testTotal: testData?.total,
      lastTestedAt: testData?.lastTestedAt,
      unreviewedErrors,
      healthStatus: status,
      healthScore: scoreObj.healthScore,
      healthGrade: scoreObj.grade,
      healthReason: reason,
    });
  }

  // Mark calculators that have no test cases defined
  for (const summary of summaries) {
    if (!testedSlugs.includes(summary.slug) && !summary.lastTestedAt) {
      summary.healthReason = 'No test cases are defined for this calculator.';
    }
  }

  return summaries;
}

// ─── Phase 2: Stored Calculator Health Scores ─────────────────────────────────

/**
 * Get all cached calculator health scores from site_settings.
 */
export async function getAllCalculatorHealthScores(
  locals?: unknown
): Promise<Record<string, CalculatorHealthScore>> {
  await ensureTables(locals);
  const db = getDb(locals);
  try {
    const row = await db
      .prepare(`SELECT value FROM site_settings WHERE key = ?`)
      .bind(HEALTH_SCORES_KEY)
      .first<{ value: string }>();
    if (!row?.value) return {};
    return JSON.parse(row.value);
  } catch {
    return {};
  }
}

/**
 * Persist computed health scores for all calculators.
 */
export async function saveAllCalculatorHealthScores(
  scores: Record<string, CalculatorHealthScore>,
  locals?: unknown
): Promise<void> {
  await ensureTables(locals);
  const db = getDb(locals);
  try {
    await db
      .prepare(`INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)`)
      .bind(HEALTH_SCORES_KEY, JSON.stringify(scores))
      .run();
  } catch {}
}

/**
 * Retrieve health score for a specific calculator.
 */
export async function getCalculatorHealthScore(
  slug: string,
  locals?: unknown
): Promise<CalculatorHealthScore | null> {
  const allScores = await getAllCalculatorHealthScores(locals);
  if (allScores[slug]) return allScores[slug];

  // If not cached, compute on the fly
  const testResults = await getLatestTestResults(locals);
  const testData = testResults?.[slug] ?? null;
  const unreviewedErrors = await getUnreviewedErrorCount(slug, locals);

  return computeCalculatorHealthScore(slug, {
    testSummary: testData
      ? {
          slug,
          totalTests: testData.total,
          passed: testData.passed,
          failed: testData.failed,
          errored: testData.errored,
          skipped: testData.skipped,
          state: testData.state as any,
          lastTestedAt: testData.lastTestedAt,
          results: [],
        }
      : null,
    unreviewedErrors,
    lastCheckedAt: testData?.lastTestedAt,
  });
}

// ─── Phase 2: Custom Formula Test Case Management ────────────────────────────

/**
 * Get all custom test cases, optionally filtered by calculator slug.
 */
export async function getCustomTestCases(
  locals?: unknown,
  slug?: string
): Promise<CustomTestCaseDefinition[]> {
  await ensureTables(locals);
  const db = getDb(locals);
  try {
    const row = await db
      .prepare(`SELECT value FROM site_settings WHERE key = ?`)
      .bind(CUSTOM_TESTS_KEY)
      .first<{ value: string }>();

    if (!row?.value) return [];
    const allTests: CustomTestCaseDefinition[] = JSON.parse(row.value);
    if (!slug) return allTests;
    return allTests.filter((t) => t.slug === slug);
  } catch {
    return [];
  }
}

/**
 * Save or update a custom test case in D1.
 */
export async function saveCustomTestCase(
  testCase: CustomTestCaseDefinition,
  locals?: unknown
): Promise<void> {
  await ensureTables(locals);
  const db = getDb(locals);
  try {
    const existing = await getCustomTestCases(locals);
    const index = existing.findIndex((t) => t.id === testCase.id);

    if (index >= 0) {
      existing[index] = { ...testCase, updatedAt: new Date().toISOString() };
    } else {
      existing.push({
        ...testCase,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    await db
      .prepare(`INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)`)
      .bind(CUSTOM_TESTS_KEY, JSON.stringify(existing))
      .run();
  } catch {}
}

/**
 * Delete a custom test case by ID.
 */
export async function deleteCustomTestCase(id: string, locals?: unknown): Promise<void> {
  await ensureTables(locals);
  const db = getDb(locals);
  try {
    const existing = await getCustomTestCases(locals);
    const filtered = existing.filter((t) => t.id !== id);

    await db
      .prepare(`INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)`)
      .bind(CUSTOM_TESTS_KEY, JSON.stringify(filtered))
      .run();
  } catch {}
}

/**
 * Toggle active state of a custom test case.
 */
export async function toggleCustomTestCase(
  id: string,
  active: boolean,
  locals?: unknown
): Promise<void> {
  await ensureTables(locals);
  const db = getDb(locals);
  try {
    const existing = await getCustomTestCases(locals);
    const target = existing.find((t) => t.id === id);
    if (target) {
      target.active = active;
      target.updatedAt = new Date().toISOString();

      await db
        .prepare(`INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)`)
        .bind(CUSTOM_TESTS_KEY, JSON.stringify(existing))
        .run();
    }
  } catch {}
}
