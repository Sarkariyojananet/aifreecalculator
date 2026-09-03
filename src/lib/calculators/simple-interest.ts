/**
 * Simple Interest Calculation Engine
 * Formula: SI = (P * R * T) / 100
 * Supports Years, Months, and Days time units.
 * Generates step-by-step arithmetic breakdown and yearly/monthly interest schedules.
 */

export interface SimpleInterestInput {
  principal: number;
  annualRate: number; // in %
  timeValue: number;
  timeUnit: 'years' | 'months' | 'days';
}

export interface SiYearlyScheduleRow {
  year: number;
  openingPrincipal: number;
  interestForYear: number;
  cumulativeInterest: number;
  totalAmount: number;
}

export interface SiMonthlyScheduleRow {
  month: number;
  principal: number;
  monthlyInterest: number;
  cumulativeInterest: number;
  totalAmount: number;
}

export interface SimpleInterestComprehensiveResult {
  principal: number;
  annualRate: number;
  timeValue: number;
  timeUnit: 'years' | 'months' | 'days';
  timeInYears: number;
  interestEarned: number;
  totalMaturityAmount: number;
  monthlyInterestYield: number;
  dailyInterestYield: number;
  formulaString: string;
  arithmeticString: string;
  yearlySchedule: SiYearlyScheduleRow[];
  monthlySchedule: SiMonthlyScheduleRow[];
}

export function calculateSimpleInterestComprehensive(
  input: SimpleInterestInput
): SimpleInterestComprehensiveResult {
  const principal = Math.max(0, input.principal || 0);
  const annualRate = Math.max(0, input.annualRate || 0);
  const timeValue = Math.max(0, input.timeValue || 0);
  const timeUnit = input.timeUnit || 'years';

  let timeInYears = timeValue;
  let formulaString = '';
  let arithmeticString = '';

  if (timeUnit === 'months') {
    timeInYears = timeValue / 12;
    formulaString = 'Simple Interest = (Principal × Rate × Months) ÷ (100 × 12)';
    arithmeticString = `₹${principal.toLocaleString('en-IN')} × ${annualRate} × ${timeValue} ÷ 1200`;
  } else if (timeUnit === 'days') {
    timeInYears = timeValue / 365;
    formulaString = 'Simple Interest = (Principal × Rate × Days) ÷ (100 × 365)';
    arithmeticString = `₹${principal.toLocaleString('en-IN')} × ${annualRate} × ${timeValue} ÷ 36500`;
  } else {
    timeInYears = timeValue;
    formulaString = 'Simple Interest = (Principal × Rate × Time in Years) ÷ 100';
    arithmeticString = `₹${principal.toLocaleString('en-IN')} × ${annualRate} × ${timeValue} ÷ 100`;
  }

  const interestEarned = Number(((principal * annualRate * timeInYears) / 100).toFixed(2));
  const totalMaturityAmount = Number((principal + interestEarned).toFixed(2));
  const monthlyInterestYield = Number(((principal * annualRate) / (12 * 100)).toFixed(2));
  const dailyInterestYield = Number(((principal * annualRate) / (365 * 100)).toFixed(2));

  // 1. Generate Yearly Summary
  const yearlySchedule: SiYearlyScheduleRow[] = [];
  const fullYears = Math.max(1, Math.ceil(timeInYears));
  const annualInterest = (principal * annualRate) / 100;
  let runningYearlyInterest = 0;

  for (let y = 1; y <= fullYears; y++) {
    let currentYearInterest = annualInterest;
    if (y === fullYears && timeInYears % 1 !== 0) {
      const remainingFraction = timeInYears - Math.floor(timeInYears);
      currentYearInterest = annualInterest * remainingFraction;
    }
    runningYearlyInterest += currentYearInterest;
    yearlySchedule.push({
      year: y,
      openingPrincipal: principal,
      interestForYear: Number(currentYearInterest.toFixed(2)),
      cumulativeInterest: Number(runningYearlyInterest.toFixed(2)),
      totalAmount: Number((principal + runningYearlyInterest).toFixed(2)),
    });
  }

  // 2. Generate Monthly Schedule
  const totalMonths = Math.max(1, Math.ceil(timeInYears * 12));
  const monthlySchedule: SiMonthlyScheduleRow[] = [];
  const standardMonthInterest = (principal * annualRate) / 1200;
  let runningMonthlyInterest = 0;

  for (let m = 1; m <= totalMonths; m++) {
    let currentMonthInterest = standardMonthInterest;
    if (m === totalMonths && (timeInYears * 12) % 1 !== 0) {
      const remainingFraction = (timeInYears * 12) - Math.floor(timeInYears * 12);
      currentMonthInterest = standardMonthInterest * remainingFraction;
    }
    runningMonthlyInterest += currentMonthInterest;
    monthlySchedule.push({
      month: m,
      principal: principal,
      monthlyInterest: Number(currentMonthInterest.toFixed(2)),
      cumulativeInterest: Number(runningMonthlyInterest.toFixed(2)),
      totalAmount: Number((principal + runningMonthlyInterest).toFixed(2)),
    });
  }

  return {
    principal,
    annualRate,
    timeValue,
    timeUnit,
    timeInYears: Number(timeInYears.toFixed(3)),
    interestEarned,
    totalMaturityAmount,
    monthlyInterestYield,
    dailyInterestYield,
    formulaString,
    arithmeticString,
    yearlySchedule,
    monthlySchedule,
  };
}
