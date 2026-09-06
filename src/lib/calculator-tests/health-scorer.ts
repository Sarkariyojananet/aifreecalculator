/**
 * Calculator Health Scorer (0 to 100)
 * Evaluates formula accuracy, runtime safety, functionality, SEO metadata, and route accessibility.
 * Prioritizes formula failures: Any formula test failure automatically caps the score in the Critical range (0-39).
 */

import type {
  CalculatorHealthScore,
  CalculatorTestSummary,
  HealthGrade,
  ScoreFactors,
} from './types';
import { inspectCalculatorPage, type PageInspectionResult } from './page-inspector';
import { calculators, type Calculator } from '../../data/calculators';

export interface ScoreOptions {
  testSummary?: CalculatorTestSummary | null;
  unreviewedErrors?: number;
  lastCheckedAt?: string;
}

/**
 * Computes a transparent 0-100 Health Score for a given calculator.
 */
export function computeCalculatorHealthScore(
  slugOrCalc: string | Calculator,
  options: ScoreOptions = {}
): CalculatorHealthScore {
  const calc =
    typeof slugOrCalc === 'string'
      ? calculators.find((c) => c.slug === slugOrCalc)
      : slugOrCalc;

  const slug = calc ? calc.slug : typeof slugOrCalc === 'string' ? slugOrCalc : 'unknown';
  const name = calc ? calc.name : slug;
  const category = calc ? calc.category : 'General';
  const icon = calc ? calc.icon : '🧮';

  const {
    testSummary = null,
    unreviewedErrors = 0,
    lastCheckedAt = new Date().toISOString(),
  } = options;

  const pageInfo: PageInspectionResult = inspectCalculatorPage(calc || slug);

  const strengths: string[] = [];
  const warnings: string[] = [];
  const criticalIssues: string[] = [];

  // ─── 1. Formula Accuracy (Max 40 points) ──────────────────────────────────
  const totalTests = testSummary?.totalTests ?? 0;
  const passedTests = testSummary?.passed ?? 0;
  const failedTests = testSummary?.failed ?? 0;
  const erroredTests = testSummary?.errored ?? 0;

  let formulaScore = 0;
  let isFormulaFailing = false;

  if (totalTests === 0) {
    // Untested: Baseline partial score (20/40) with warning
    formulaScore = 20;
    warnings.push('Formula test suite has not been executed yet');
  } else if (failedTests > 0 || erroredTests > 0) {
    isFormulaFailing = true;
    const failCount = failedTests + erroredTests;
    criticalIssues.push(`${failCount} formula test case(s) failed or threw exceptions`);
    // Fractional credit up to max 15 points
    formulaScore = Math.round((passedTests / totalTests) * 15);
  } else {
    formulaScore = 40;
    strengths.push(`All ${totalTests} predefined formula test cases passed`);
  }

  const formulaAccuracyFactor = {
    score: formulaScore,
    max: 40,
    passed: passedTests,
    total: totalTests,
    details: totalTests > 0
      ? `${passedTests}/${totalTests} formula test cases passed`
      : 'No test execution data',
  };

  // ─── 2. Runtime Safety (Max 20 points) ─────────────────────────────────────
  let safetyScore = 20;
  if (unreviewedErrors >= 5) {
    safetyScore = 0;
    criticalIssues.push(`${unreviewedErrors} unreviewed runtime errors logged in system`);
  } else if (unreviewedErrors > 0) {
    safetyScore = 10;
    warnings.push(`${unreviewedErrors} unreviewed runtime error(s) require review`);
  } else {
    strengths.push('Zero unreviewed runtime errors detected');
  }

  const runtimeSafetyFactor = {
    score: safetyScore,
    max: 20,
    unreviewedErrors,
    details: unreviewedErrors === 0 ? 'Clean runtime logs' : `${unreviewedErrors} error occurrences`,
  };

  // ─── 3. Functionality Verification (Max 15 points) ────────────────────────
  let funcScore = 15;
  if (!pageInfo.hasInputs || !pageInfo.hasCalculate) {
    funcScore = 0;
    criticalIssues.push('Core input or calculate functionality is unavailable');
  } else {
    strengths.push('Input fields, calculation execution, and reset working');
  }

  const functionalityFactor = {
    score: funcScore,
    max: 15,
    inputsWorking: pageInfo.hasInputs,
    resetWorking: pageInfo.hasReset,
    copyWorking: pageInfo.hasCopyResult,
    details: 'Inputs, calculate trigger, reset, and copy capabilities verified',
  };

  // ─── 4. Page & SEO Health (Max 15 points) ──────────────────────────────────
  let seoScore = 0;
  if (pageInfo.metaTitleOk) seoScore += 4;
  else if (pageInfo.metaTitle) seoScore += 2;

  if (pageInfo.metaDescOk) seoScore += 4;
  else if (pageInfo.metaDescription) seoScore += 2;

  if (pageInfo.canonicalOk) seoScore += 3;
  if (pageInfo.schemaValid) seoScore += 4;

  if (pageInfo.metaTitleOk && pageInfo.metaDescOk && pageInfo.schemaValid) {
    strengths.push('Complete SEO metadata & valid structured schema markup');
  } else {
    if (!pageInfo.metaTitleOk && pageInfo.metaTitleIssue) warnings.push(pageInfo.metaTitleIssue);
    if (!pageInfo.metaDescOk && pageInfo.metaDescIssue) warnings.push(pageInfo.metaDescIssue);
  }

  const pageAndSeoFactor = {
    score: seoScore,
    max: 15,
    metaTitleOk: pageInfo.metaTitleOk,
    metaDescOk: pageInfo.metaDescOk,
    canonicalOk: pageInfo.canonicalOk,
    schemaValid: pageInfo.schemaValid,
    details: `Meta title (${pageInfo.metaTitleOk ? '✓' : '⚠'}), Description (${pageInfo.metaDescOk ? '✓' : '⚠'}), Schema (${pageInfo.schemaValid ? '✓' : '⚠'})`,
  };

  // ─── 5. Route Accessibility (Max 10 points) ───────────────────────────────
  const routeScore = pageInfo.routeValid ? 10 : 0;
  if (pageInfo.routeValid) {
    strengths.push(`Accessible at ${pageInfo.routePath}`);
  } else {
    criticalIssues.push('Invalid route mapping in calculator catalog');
  }

  const accessibilityFactor = {
    score: routeScore,
    max: 10,
    routeValid: pageInfo.routeValid,
    details: pageInfo.routeValid ? `Online at ${pageInfo.routePath}` : 'Route broken',
  };

  // ─── Overall Score & Priority Enforcement ──────────────────────────────────
  let rawScore = formulaScore + safetyScore + funcScore + seoScore + routeScore;

  // CRITICAL RULE: If a formula test fails, the overall score MUST NOT exceed 35 (Critical)
  if (isFormulaFailing) {
    rawScore = Math.min(35, rawScore);
  } else if (unreviewedErrors >= 10) {
    rawScore = Math.min(39, rawScore);
  }

  const finalScore = Math.max(0, Math.min(100, Math.round(rawScore)));

  // Determine Health Grade
  let grade: HealthGrade = 'Healthy';
  if (finalScore >= 90) {
    grade = 'Healthy';
  } else if (finalScore >= 70) {
    grade = 'Warning';
  } else if (finalScore >= 40) {
    grade = 'Needs Attention';
  } else {
    grade = 'Critical';
  }

  // Determine SEO status
  const seoStatus: 'Good' | 'Warning' | 'Issue' =
    pageInfo.metaTitleOk && pageInfo.metaDescOk
      ? 'Good'
      : pageInfo.metaTitle || pageInfo.metaDescription
      ? 'Warning'
      : 'Issue';

  // Determine Page status
  const pageStatus: 'Online' | 'Degraded' | 'Offline' =
    !pageInfo.routeValid
      ? 'Offline'
      : isFormulaFailing || unreviewedErrors >= 5
      ? 'Degraded'
      : 'Online';

  const factors: ScoreFactors = {
    formulaAccuracy: formulaAccuracyFactor,
    runtimeSafety: runtimeSafetyFactor,
    functionality: functionalityFactor,
    pageAndSeo: pageAndSeoFactor,
    accessibility: accessibilityFactor,
  };

  return {
    slug,
    name,
    category,
    icon,
    healthScore: finalScore,
    grade,
    isFormulaFailing,
    factors,
    strengths,
    warnings,
    criticalIssues,
    lastCheckedAt,
    formulaTestSummary: {
      total: totalTests,
      passed: passedTests,
      failed: failedTests,
      errored: erroredTests,
    },
    seoStatus,
    pageStatus,
  };
}
