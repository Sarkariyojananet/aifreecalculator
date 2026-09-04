/**
 * Calculator Test Result Validator
 * Handles NaN/Infinity detection and numeric tolerance comparison.
 */

import type { TestCaseResult, CalculatorTestCase, TestState } from './types';

/**
 * Checks whether a value is numerically safe (no NaN, no Infinity).
 */
export function isFiniteSafe(val: unknown): val is number {
  return typeof val === 'number' && Number.isFinite(val) && !Number.isNaN(val);
}

/**
 * Detects if a value is NaN.
 */
export function detectNaN(val: unknown): boolean {
  return typeof val === 'number' && Number.isNaN(val);
}

/**
 * Detects if a value is non-finite (Infinity or -Infinity).
 */
export function detectInfinity(val: unknown): boolean {
  return typeof val === 'number' && !Number.isFinite(val) && !Number.isNaN(val);
}

/**
 * Deep-walk a result object and detect any NaN or Infinity values in numeric fields.
 * Returns the first problematic path found, or null if all values are safe.
 */
export function detectUnsafeValues(
  obj: unknown,
  path = 'result',
  depth = 0
): { path: string; type: 'nan' | 'infinity' } | null {
  if (depth > 5) return null; // prevent deep recursion
  if (obj === null || obj === undefined) return null;

  if (typeof obj === 'number') {
    if (detectNaN(obj)) return { path, type: 'nan' };
    if (detectInfinity(obj)) return { path, type: 'infinity' };
    return null;
  }

  if (Array.isArray(obj)) {
    // Only check first element of large arrays (schedules) for performance
    if (obj.length > 0) {
      return detectUnsafeValues(obj[0], `${path}[0]`, depth + 1);
    }
    return null;
  }

  if (typeof obj === 'object') {
    for (const [key, val] of Object.entries(obj as Record<string, unknown>)) {
      // Skip schedule arrays for deep validation (they are large)
      if (key.endsWith('Schedule') || key.endsWith('schedule')) continue;
      const found = detectUnsafeValues(val, `${path}.${key}`, depth + 1);
      if (found) return found;
    }
  }

  return null;
}

/**
 * Extract a nested key value from a result object.
 * e.g. 'monthlyEmi' from { monthlyEmi: 8678, ... }
 */
function extractResultValue(result: unknown, key: string): unknown {
  if (!result || typeof result !== 'object') return undefined;
  return (result as Record<string, unknown>)[key];
}

/**
 * Compare actual vs expected value with optional numeric tolerance.
 */
function compareValues(
  actual: unknown,
  expected: number | string | boolean,
  tolerance = 0
): boolean {
  if (typeof expected === 'number' && typeof actual === 'number') {
    return Math.abs(actual - expected) <= tolerance;
  }
  if (typeof expected === 'string' && typeof actual === 'string') {
    return actual === expected;
  }
  if (typeof expected === 'boolean') {
    return actual === expected;
  }
  return false;
}

/**
 * Run a single test case and return a structured result.
 */
export function runTestCase(tc: CalculatorTestCase): TestCaseResult {
  const startMs = Date.now();

  const base: Omit<TestCaseResult, 'state' | 'actualValue' | 'errorMessage' | 'durationMs'> = {
    slug: tc.slug,
    testName: tc.name,
    category: tc.category,
    expectedBehavior: tc.expectedBehavior,
    expectedResultKey: tc.expectedResultKey,
    expectedValue: tc.expectedValue,
    tolerance: tc.tolerance,
  };

  try {
    const resultRaw = tc.run();
    const durationMs = Date.now() - startMs;

    // If we expected a throw but got a result — that's a FAIL
    if (tc.expectedBehavior === 'throw') {
      return {
        ...base,
        state: 'FAIL',
        actualValue: undefined,
        errorMessage: 'Expected function to throw but it returned a value.',
        durationMs,
      };
    }

    // Check for unsafe values in entire result (NaN/Infinity anywhere)
    const unsafeCheck = detectUnsafeValues(resultRaw);
    if (unsafeCheck) {
      const errorMsg = `Unsafe value detected at ${unsafeCheck.path}: ${unsafeCheck.type.toUpperCase()}`;
      return {
        ...base,
        state: 'ERROR',
        actualValue: undefined,
        errorMessage: errorMsg,
        durationMs,
      };
    }

    // If a specific result key is expected, extract and compare
    if (tc.expectedResultKey !== undefined && tc.expectedValue !== undefined) {
      const actualValue = extractResultValue(resultRaw, tc.expectedResultKey);

      if (actualValue === undefined || actualValue === null) {
        return {
          ...base,
          state: 'FAIL',
          actualValue: undefined,
          errorMessage: `Key '${tc.expectedResultKey}' not found in result or was null/undefined.`,
          durationMs,
        };
      }

      // Check the extracted value for NaN/Infinity
      if (detectNaN(actualValue)) {
        return { ...base, state: 'ERROR', actualValue: undefined, errorMessage: `Key '${tc.expectedResultKey}' is NaN.`, durationMs };
      }
      if (detectInfinity(actualValue)) {
        return { ...base, state: 'ERROR', actualValue: undefined, errorMessage: `Key '${tc.expectedResultKey}' is Infinity.`, durationMs };
      }

      const passes = compareValues(actualValue, tc.expectedValue, tc.tolerance ?? 0);
      const state: TestState = passes ? 'PASS' : 'FAIL';

      return {
        ...base,
        state,
        actualValue: typeof actualValue === 'number' || typeof actualValue === 'string' || typeof actualValue === 'boolean'
          ? actualValue
          : String(actualValue),
        errorMessage: passes
          ? undefined
          : `Expected ${tc.expectedResultKey}=${tc.expectedValue} (±${tc.tolerance ?? 0}), got ${actualValue}`,
        durationMs,
      };
    }

    // No specific key/value assertion — just verify execution succeeded
    return { ...base, state: 'PASS', durationMs };

  } catch (err: unknown) {
    const durationMs = Date.now() - startMs;
    const errorMessage = err instanceof Error ? err.message : String(err);

    // If we expected a throw and got one — that's a PASS
    if (tc.expectedBehavior === 'throw') {
      return { ...base, state: 'PASS', durationMs, errorMessage: `(Correctly threw: ${errorMessage})` };
    }

    // Unexpected exception = ERROR (not FAIL)
    return { ...base, state: 'ERROR', errorMessage, durationMs };
  }
}
