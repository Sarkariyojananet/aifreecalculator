/**
 * Comprehensive Compound Interest Calculation Engine
 * Formula for lump sum: A = P * (1 + r/n)^(n*t)
 * Supports:
 * - Compounding frequencies: Annually (n=1), Quarterly (n=4), Monthly (n=12), Daily (n=365)
 * - Time units: Years, Months
 * - Optional regular contributions (Monthly / Yearly, Beginning / End of period)
 * - Generates period-by-period progression, yearly/monthly schedules, and growth chart breakdown
 */

export type CompoundingFrequency = 'annually' | 'quarterly' | 'monthly' | 'daily';
export type ContributionFrequency = 'monthly' | 'yearly';
export type ContributionTiming = 'end' | 'beginning';

export interface CompoundInterestInput {
  principal: number;
  annualRate: number; // in %
  durationValue: number;
  durationUnit: 'years' | 'months';
  compoundingFrequency: CompoundingFrequency;
  regularContribution?: number;
  contributionFrequency?: ContributionFrequency;
  contributionTiming?: ContributionTiming;
}

export interface CiYearlyScheduleRow {
  year: number;
  openingBalance: number;
  contributionsDuringYear: number;
  interestEarned: number;
  closingBalance: number;
  totalInvestedSoFar: number;
  totalInterestSoFar: number;
}

export interface CiMonthlyScheduleRow {
  month: number;
  openingBalance: number;
  contribution: number;
  interestEarned: number;
  closingBalance: number;
}

export interface CompoundInterestComprehensiveResult {
  initialInvestment: number;
  annualRate: number;
  durationYears: number;
  durationMonths: number;
  compoundingFrequency: CompoundingFrequency;
  compoundingPeriodsPerYear: number;
  totalCompoundingPeriods: number;
  regularContribution: number;
  contributionFrequency: ContributionFrequency;
  contributionTiming: ContributionTiming;
  totalContributions: number;
  totalPrincipalInvested: number;
  totalInterestEarned: number;
  estimatedFutureValue: number;
  growthMultiplier: number;
  ruleOf72DoublingYears: number;
  yearlySchedule: CiYearlyScheduleRow[];
  monthlySchedule: CiMonthlyScheduleRow[];
}

export function calculateCompoundInterestComprehensive(
  input: CompoundInterestInput
): CompoundInterestComprehensiveResult {
  const principal = Math.max(0, input.principal || 0);
  const annualRate = Math.max(0, input.annualRate || 0);
  const durationValue = Math.max(0, input.durationValue || 0);
  const durationUnit = input.durationUnit || 'years';
  const compoundingFrequency = input.compoundingFrequency || 'annually';

  const regularContribution = Math.max(0, input.regularContribution || 0);
  const contributionFrequency = input.contributionFrequency || 'monthly';
  const contributionTiming = input.contributionTiming || 'end';

  let durationYears = durationValue;
  let durationMonths = durationValue * 12;

  if (durationUnit === 'months') {
    durationYears = durationValue / 12;
    durationMonths = durationValue;
  }

  const freqMap: Record<CompoundingFrequency, number> = {
    annually: 1,
    quarterly: 4,
    monthly: 12,
    daily: 365,
  };

  const n = freqMap[compoundingFrequency] || 1;
  const r = annualRate / 100;
  const totalCompoundingPeriods = Number((n * durationYears).toFixed(2));

  // Simulation on monthly basis (12 periods per year)
  const totalSimMonths = Math.max(1, Math.round(durationMonths));
  const yearlySchedule: CiYearlyScheduleRow[] = [];
  const monthlySchedule: CiMonthlyScheduleRow[] = [];

  let currentBalance = principal;
  let totalPrincipalInvested = principal;
  let totalContributions = 0;

  // Effective monthly growth factor based on nominal annual rate and compounding frequency
  // (1 + r/n)^(n/12) - 1
  const monthlyInterestRate = r > 0 ? Math.pow(1 + r / n, n / 12) - 1 : 0;

  let yearOpeningBalance = principal;
  let yearContributions = 0;
  let yearInterest = 0;

  for (let m = 1; m <= totalSimMonths; m++) {
    const monthOpening = currentBalance;
    let monthContribution = 0;

    if (regularContribution > 0) {
      if (contributionFrequency === 'monthly') {
        monthContribution = regularContribution;
      } else if (contributionFrequency === 'yearly' && m % 12 === 1) {
        monthContribution = regularContribution;
      }
    }

    let monthInterest = 0;

    if (contributionTiming === 'beginning') {
      currentBalance += monthContribution;
      monthInterest = currentBalance * monthlyInterestRate;
      currentBalance += monthInterest;
    } else {
      monthInterest = currentBalance * monthlyInterestRate;
      currentBalance += monthInterest;
      currentBalance += monthContribution;
    }

    totalContributions += monthContribution;
    totalPrincipalInvested += monthContribution;

    yearContributions += monthContribution;
    yearInterest += monthInterest;

    monthlySchedule.push({
      month: m,
      openingBalance: Number(monthOpening.toFixed(2)),
      contribution: Number(monthContribution.toFixed(2)),
      interestEarned: Number(monthInterest.toFixed(2)),
      closingBalance: Number(currentBalance.toFixed(2)),
    });

    // Check year boundary or final month
    if (m % 12 === 0 || m === totalSimMonths) {
      const yearIndex = Math.ceil(m / 12);
      const totalInterestSoFar = currentBalance - totalPrincipalInvested;

      yearlySchedule.push({
        year: yearIndex,
        openingBalance: Number(yearOpeningBalance.toFixed(2)),
        contributionsDuringYear: Number(yearContributions.toFixed(2)),
        interestEarned: Number(yearInterest.toFixed(2)),
        closingBalance: Number(currentBalance.toFixed(2)),
        totalInvestedSoFar: Number(totalPrincipalInvested.toFixed(2)),
        totalInterestSoFar: Number(Math.max(0, totalInterestSoFar).toFixed(2)),
      });

      yearOpeningBalance = currentBalance;
      yearContributions = 0;
      yearInterest = 0;
    }
  }

  const estimatedFutureValue = Number(currentBalance.toFixed(2));
  const totalInterestEarned = Number(Math.max(0, estimatedFutureValue - totalPrincipalInvested).toFixed(2));
  const growthMultiplier = totalPrincipalInvested > 0 ? Number((estimatedFutureValue / totalPrincipalInvested).toFixed(2)) : 0;
  const ruleOf72DoublingYears = annualRate > 0 ? Number((72 / annualRate).toFixed(1)) : 0;

  return {
    initialInvestment: principal,
    annualRate,
    durationYears: Number(durationYears.toFixed(2)),
    durationMonths: totalSimMonths,
    compoundingFrequency,
    compoundingPeriodsPerYear: n,
    totalCompoundingPeriods,
    regularContribution,
    contributionFrequency,
    contributionTiming,
    totalContributions: Number(totalContributions.toFixed(2)),
    totalPrincipalInvested: Number(totalPrincipalInvested.toFixed(2)),
    totalInterestEarned,
    estimatedFutureValue,
    growthMultiplier,
    ruleOf72DoublingYears,
    yearlySchedule,
    monthlySchedule,
  };
}
