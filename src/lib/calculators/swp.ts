/**
 * SWP (Systematic Withdrawal Plan) Calculation Engine
 * Supports both Simple SWP (Fixed Monthly Withdrawal)
 * and Advanced SWP with Annual Inflation Step-up.
 *
 * Core Simulation Convention:
 * Investment growth is applied first for each month,
 * followed by the scheduled withdrawal.
 */

export type SwpTiming = 'beginning' | 'end';

export interface SwpInput {
  initialInvestment: number;
  monthlyWithdrawal: number;
  annualReturnRate: number;
  timePeriodYears: number;
  annualInflationRate?: number; // Default 0%
  withdrawalTiming?: SwpTiming; // Default 'beginning'
}

export interface SwpMonthRecord {
  month: number;
  year: number;
  openingBalance: number;
  growthEarned: number;
  requestedWithdrawal: number;
  actualWithdrawal: number;
  closingBalance: number;
  cumulativeWithdrawn: number;
}

export interface SwpYearRecord {
  year: number;
  openingBalance: number;
  monthlyWithdrawal: number;
  annualWithdrawal: number;
  investmentGrowth: number;
  closingBalance: number;
  cumulativeWithdrawn: number;
}

export interface SwpResult {
  initialInvestment: number;
  timePeriodYears: number;
  totalMonths: number;
  annualReturnRate: number;
  annualInflationRate: number;
  withdrawalTiming: SwpTiming;
  withdrawalTimingLabel: string;
  initialMonthlyWithdrawal: number;
  finalMonthlyWithdrawal: number;
  totalWithdrawn: number;
  finalBalance: number;
  totalReturns: number;
  isDepleted: boolean;
  depletedAtMonth: number | null;
  depletedAtYear: number | null;
  depletedText: string | null;
  yearlySchedule: SwpYearRecord[];
  monthlySchedule: SwpMonthRecord[];
}

export function calculateSwp(input: SwpInput): SwpResult {
  const initial = Math.max(0, Number(input.initialInvestment) || 0);
  const initialWithdrawal = Math.max(0, Number(input.monthlyWithdrawal) || 0);
  const annualReturn = Number(input.annualReturnRate) || 0;
  const years = Math.max(1, Math.floor(Number(input.timePeriodYears) || 1));
  const inflation = Math.max(0, Number(input.annualInflationRate) || 0);
  const timing: SwpTiming = input.withdrawalTiming === 'end' ? 'end' : 'beginning';

  const totalMonths = years * 12;
  const monthlyRate = annualReturn / 12 / 100;
  const inflationRate = inflation / 100;

  let balance = initial;
  let totalWithdrawn = 0;
  let isDepleted = false;
  let depletedAtMonth: number | null = null;
  let depletedAtYear: number | null = null;

  const monthlySchedule: SwpMonthRecord[] = [];
  let currentYearOpeningBalance = initial;
  let currentYearGrowth = 0;
  let currentYearWithdrawal = 0;
  let currentYearMonthlyRate = initialWithdrawal;

  const yearlySchedule: SwpYearRecord[] = [];

  for (let m = 1; m <= totalMonths; m++) {
    const yearNumber = Math.ceil(m / 12);
    const openingBal = balance;

    // Track initial monthly withdrawal for the year
    const scheduledMonthlyWithdrawal = initialWithdrawal * Math.pow(1 + inflationRate, yearNumber - 1);
    if ((m - 1) % 12 === 0) {
      currentYearOpeningBalance = openingBal;
      currentYearGrowth = 0;
      currentYearWithdrawal = 0;
      currentYearMonthlyRate = scheduledMonthlyWithdrawal;
    }

    if (balance <= 0) {
      // Already depleted in previous month
      monthlySchedule.push({
        month: m,
        year: yearNumber,
        openingBalance: 0,
        growthEarned: 0,
        requestedWithdrawal: scheduledMonthlyWithdrawal,
        actualWithdrawal: 0,
        closingBalance: 0,
        cumulativeWithdrawn: totalWithdrawn,
      });

      if (m % 12 === 0 || m === totalMonths) {
        yearlySchedule.push({
          year: yearNumber,
          openingBalance: currentYearOpeningBalance,
          monthlyWithdrawal: currentYearMonthlyRate,
          annualWithdrawal: currentYearWithdrawal,
          investmentGrowth: currentYearGrowth,
          closingBalance: 0,
          cumulativeWithdrawn: totalWithdrawn,
        });
      }
      continue;
    }

    let actualWithdrawal = 0;
    let growth = 0;

    if (timing === 'beginning') {
      // Beginning of Month:
      // 1. Withdrawal is deducted at the start of the month
      // 2. Investment growth is applied to the remaining balance
      if (balance >= scheduledMonthlyWithdrawal) {
        actualWithdrawal = scheduledMonthlyWithdrawal;
        balance = balance - scheduledMonthlyWithdrawal;
        totalWithdrawn += scheduledMonthlyWithdrawal;
        currentYearWithdrawal += scheduledMonthlyWithdrawal;

        growth = balance * monthlyRate;
        balance = balance + growth;
        currentYearGrowth += growth;
      } else {
        // Insufficient corpus: withdraw available balance only
        actualWithdrawal = balance;
        totalWithdrawn += balance;
        currentYearWithdrawal += balance;
        balance = 0;
        isDepleted = true;
        depletedAtMonth = m;
        depletedAtYear = yearNumber;
        growth = 0;
      }
    } else {
      // End of Month:
      // 1. Investment growth is applied to opening balance first
      // 2. Withdrawal is deducted at the end of the month
      growth = balance * monthlyRate;
      balance = balance + growth;
      currentYearGrowth += growth;

      if (balance >= scheduledMonthlyWithdrawal) {
        actualWithdrawal = scheduledMonthlyWithdrawal;
        balance = balance - scheduledMonthlyWithdrawal;
        totalWithdrawn += scheduledMonthlyWithdrawal;
        currentYearWithdrawal += scheduledMonthlyWithdrawal;
      } else {
        // Insufficient corpus: withdraw available balance after growth
        actualWithdrawal = balance;
        totalWithdrawn += balance;
        currentYearWithdrawal += balance;
        balance = 0;
        isDepleted = true;
        depletedAtMonth = m;
        depletedAtYear = yearNumber;
      }
    }

    monthlySchedule.push({
      month: m,
      year: yearNumber,
      openingBalance: openingBal,
      growthEarned: growth,
      requestedWithdrawal: scheduledMonthlyWithdrawal,
      actualWithdrawal,
      closingBalance: balance,
      cumulativeWithdrawn: totalWithdrawn,
    });

    // Record yearly schedule at the end of each 12-month period or final month
    if (m % 12 === 0 || m === totalMonths) {
      yearlySchedule.push({
        year: yearNumber,
        openingBalance: currentYearOpeningBalance,
        monthlyWithdrawal: currentYearMonthlyRate,
        annualWithdrawal: currentYearWithdrawal,
        investmentGrowth: currentYearGrowth,
        closingBalance: balance,
        cumulativeWithdrawn: totalWithdrawn,
      });
    }
  }

  // Two-decimal precision rounding for display
  const finalBalanceRounded = Math.round((balance + Number.EPSILON) * 100) / 100;
  const totalWithdrawnRounded = Math.round((totalWithdrawn + Number.EPSILON) * 100) / 100;
  // Total Growth = Final Remaining Corpus + Total Withdrawn Amount - Initial Investment
  const totalReturnsRounded = Math.round(((finalBalanceRounded + totalWithdrawnRounded - initial) + Number.EPSILON) * 100) / 100;

  const finalYearWithdrawal = initialWithdrawal * Math.pow(1 + inflationRate, years - 1);

  let depletedText: string | null = null;
  if (isDepleted && depletedAtMonth !== null) {
    const depYear = Math.ceil(depletedAtMonth / 12);
    const depMonthInYear = ((depletedAtMonth - 1) % 12) + 1;
    depletedText = `Corpus depleted in Year ${depYear}, Month ${depMonthInYear} (Month ${depletedAtMonth} overall).`;
  }

  return {
    initialInvestment: initial,
    timePeriodYears: years,
    totalMonths,
    annualReturnRate: annualReturn,
    annualInflationRate: inflation,
    withdrawalTiming: timing,
    withdrawalTimingLabel: timing === 'beginning' ? 'Beginning of Month' : 'End of Month',
    initialMonthlyWithdrawal: initialWithdrawal,
    finalMonthlyWithdrawal: Math.round((finalYearWithdrawal + Number.EPSILON) * 100) / 100,
    totalWithdrawn: totalWithdrawnRounded,
    finalBalance: finalBalanceRounded,
    totalReturns: totalReturnsRounded,
    isDepleted,
    depletedAtMonth,
    depletedAtYear,
    depletedText,
    yearlySchedule,
    monthlySchedule,
  };
}
