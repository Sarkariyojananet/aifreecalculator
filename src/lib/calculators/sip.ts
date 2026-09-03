/**
 * Comprehensive Systematic Investment Plan (SIP) Calculation Engine
 * Formula: FV = P * ((1 + i)^n - 1) / i * (1 + i)
 * Supports Regular SIP, Step Up SIP (Percentage & Fixed Amount),
 * 0% return safeguard, and Yearly & Monthly Investment Schedules.
 */

export interface SipInput {
  monthlyInvestment: number;
  expectedAnnualReturnRate: number; // in %
  timePeriodYears: number; // in years
  isStepUp?: boolean;
  stepUpType?: 'percentage' | 'fixed';
  stepUpValue?: number; // e.g., 10 for 10% or 500 for Rs.500
}

export interface SipScheduleMonthItem {
  month: number;
  monthlySip: number;
  totalInvested: number;
  estimatedReturns: number;
  portfolioValue: number;
}

export interface SipScheduleYearItem {
  year: number;
  annualInvestment: number;
  totalInvested: number;
  estimatedReturns: number;
  portfolioValue: number;
  currentMonthlySip: number;
}

export interface SipCalculationResult {
  totalInvested: number;
  estimatedReturns: number;
  totalMaturityValue: number;
  wealthGainMultiplier: number;
  investedPercentage: number;
  returnsPercentage: number;
  finalMonthlySip: number;
  averageMonthlySip: number;
  monthlySchedule: SipScheduleMonthItem[];
  yearlySchedule: SipScheduleYearItem[];
}

export function calculateSipComprehensive(input: SipInput): SipCalculationResult {
  const initialMonthly = Math.max(0, input.monthlyInvestment || 0);
  const annualRate = Math.max(0, input.expectedAnnualReturnRate || 0);
  const years = Math.max(1, input.timePeriodYears || 1);
  const isStepUp = !!input.isStepUp;
  const stepUpType = input.stepUpType || 'percentage';
  const stepUpValue = Math.max(0, input.stepUpValue || 0);

  if (initialMonthly <= 0) {
    throw new Error('Monthly investment amount must be greater than zero.');
  }

  const totalMonths = years * 12;
  const monthlyRate = annualRate / 12 / 100;

  let currentMonthly = initialMonthly;
  let runningInvested = 0;
  let runningValue = 0;

  const monthlySchedule: SipScheduleMonthItem[] = [];
  const yearlySchedule: SipScheduleYearItem[] = [];

  let yearAnnualInvested = 0;

  for (let m = 1; m <= totalMonths; m++) {
    // Check if new year starts for step-up (at month 13, 25, 37, ...)
    if (isStepUp && m > 1 && (m - 1) % 12 === 0) {
      if (stepUpType === 'percentage') {
        currentMonthly = Math.round(currentMonthly * (1 + stepUpValue / 100));
      } else {
        currentMonthly = currentMonthly + stepUpValue;
      }
    }

    runningInvested += currentMonthly;
    yearAnnualInvested += currentMonthly;

    if (monthlyRate === 0) {
      runningValue = runningInvested;
    } else {
      runningValue = (runningValue + currentMonthly) * (1 + monthlyRate);
    }

    const roundedVal = Math.round(runningValue);
    const roundedReturns = Math.max(0, roundedVal - runningInvested);

    monthlySchedule.push({
      month: m,
      monthlySip: currentMonthly,
      totalInvested: runningInvested,
      estimatedReturns: roundedReturns,
      portfolioValue: roundedVal,
    });

    if (m % 12 === 0 || m === totalMonths) {
      const yearNumber = Math.ceil(m / 12);
      yearlySchedule.push({
        year: yearNumber,
        annualInvestment: yearAnnualInvested,
        totalInvested: runningInvested,
        estimatedReturns: roundedReturns,
        portfolioValue: roundedVal,
        currentMonthlySip: currentMonthly,
      });

      yearAnnualInvested = 0;
    }
  }

  const totalInvested = runningInvested;
  const totalMaturityValue = Math.round(runningValue);
  const estimatedReturns = Math.max(0, totalMaturityValue - totalInvested);

  const wealthGainMultiplier = totalInvested > 0 ? Number((totalMaturityValue / totalInvested).toFixed(2)) : 0;
  const investedPercentage = totalMaturityValue > 0 ? Number(((totalInvested / totalMaturityValue) * 100).toFixed(1)) : 100;
  const returnsPercentage = Number((100 - investedPercentage).toFixed(1));

  const finalMonthlySip = currentMonthly;
  const averageMonthlySip = Math.round(totalInvested / totalMonths);

  return {
    totalInvested,
    estimatedReturns,
    totalMaturityValue,
    wealthGainMultiplier,
    investedPercentage,
    returnsPercentage,
    finalMonthlySip,
    averageMonthlySip,
    monthlySchedule,
    yearlySchedule,
  };
}
