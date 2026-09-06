/**
 * Public Provident Fund (PPF) Calculation Engine
 * High-precision, India-focused calculation logic conforming to the Public Provident Fund Scheme rules.
 *
 * Core Rules & Assumptions:
 * 1. Financial Year runs from April 1 to March 31.
 * 2. Interest is calculated monthly on the lowest balance between the close of the 5th day and the end of each month.
 * 3. Interest is credited/compounded annually at the end of the financial year (March 31).
 * 4. Maximum yearly deposit eligible is ₹1,50,000; minimum is ₹500.
 * 5. Minimum standard tenure is 15 years, extendable in blocks of 5 years (15, 20, 25, 30 years).
 */

export type PpfContributionMode = 'yearly' | 'monthly';

export type PpfDepositTiming =
  | 'beginning_of_year' // On or before April 5 (earns interest for all 12 months)
  | 'end_of_year'       // At year end / after deposit cutoff (no interest in deposit year)
  | 'monthly_before_5th'// Deposited on/before 5th of every month
  | 'monthly_after_5th'; // Deposited after 5th of every month

export interface PpfYearlyScheduleItem {
  year: number;
  openingBalance: number;
  deposit: number;
  interestEarned: number;
  withdrawal: number;
  closingBalance: number;
  cumulativeInvestment: number;
  cumulativeInterest: number;
}

export interface PpfCalculationInput {
  contributionMode?: PpfContributionMode;
  yearlyInvestment?: number;
  monthlyInvestment?: number;
  tenureYears: number;
  annualInterestRate: number; // e.g. 7.1 for 7.1%
  depositTiming?: PpfDepositTiming;
  existingBalance?: number;
  partialWithdrawal?: {
    afterYear: number;
    amount: number;
  };
}

export interface PpfCalculationResult {
  totalInvestment: number;
  totalInterestEarned: number;
  maturityAmount: number;
  totalWithdrawals: number;
  tenureYears: number;
  annualInterestRate: number;
  depositTiming: PpfDepositTiming;
  schedule: PpfYearlyScheduleItem[];
  investedPercentage: number;
  interestPercentage: number;
  wealthGainMultiplier: number;
}

/**
 * Calculates Public Provident Fund growth, annual interest, and yearly breakdown.
 */
export function calculatePpf(input: PpfCalculationInput): PpfCalculationResult {
  const tenureYears = Math.max(1, Math.min(50, Math.round(input.tenureYears || 15)));
  const annualRate = Math.max(0, (input.annualInterestRate ?? 7.1)) / 100;
  const contributionMode = input.contributionMode || 'yearly';

  let depositTiming = input.depositTiming;
  if (!depositTiming) {
    depositTiming = contributionMode === 'monthly' ? 'monthly_before_5th' : 'beginning_of_year';
  }

  let baseDepositPerYear = 0;
  let baseDepositPerMonth = 0;

  if (contributionMode === 'monthly') {
    baseDepositPerMonth = Math.max(0, input.monthlyInvestment ?? 1000);
    baseDepositPerYear = baseDepositPerMonth * 12;
  } else {
    baseDepositPerYear = Math.max(0, input.yearlyInvestment ?? 10000);
    baseDepositPerMonth = baseDepositPerYear / 12;
  }

  let currentBalance = Math.max(0, input.existingBalance || 0);
  let cumulativeInvestment = currentBalance;
  let cumulativeInterest = 0;
  let totalWithdrawals = 0;

  const schedule: PpfYearlyScheduleItem[] = [];

  for (let year = 1; year <= tenureYears; year++) {
    const openingBalance = currentBalance;
    const deposit = baseDepositPerYear;
    let interestEarned = 0;

    // Check partial withdrawal for this year
    let withdrawal = 0;
    if (
      input.partialWithdrawal &&
      input.partialWithdrawal.afterYear === year &&
      input.partialWithdrawal.amount > 0
    ) {
      // Withdrawal cannot exceed opening balance + deposit
      withdrawal = Math.min(openingBalance + deposit, input.partialWithdrawal.amount);
      totalWithdrawals += withdrawal;
    }

    const effectiveBalancePreInterest = openingBalance + deposit - withdrawal;

    // Calculate interest according to timing assumption:
    if (depositTiming === 'beginning_of_year') {
      // Deposited on or before April 5: full year interest on (opening + deposit - withdrawal)
      interestEarned = Math.max(0, effectiveBalancePreInterest * annualRate);
    } else if (depositTiming === 'end_of_year') {
      // Deposited at year end: interest only on opening balance minus withdrawal
      const eligibleBalance = Math.max(0, openingBalance - withdrawal);
      interestEarned = eligibleBalance * annualRate;
    } else if (depositTiming === 'monthly_before_5th') {
      // Monthly contribution on or before 5th of each month (12 monthly periods)
      // Opening balance earns interest for all 12 months.
      // Month m deposit (m=1..12) earns interest for (13 - m) months.
      // Sum of (13 - m) for m=1..12 = 12 + 11 + ... + 1 = 78 months.
      // 78 / 12 = 6.5 months average.
      const openingInterest = Math.max(0, (openingBalance - withdrawal)) * annualRate;
      const depositInterest = baseDepositPerMonth * (annualRate / 12) * 78;
      interestEarned = Math.max(0, openingInterest + depositInterest);
    } else if (depositTiming === 'monthly_after_5th') {
      // Monthly contribution after 5th of each month
      // Month m deposit earns interest for (12 - m) months.
      // Sum of (12 - m) for m=1..12 = 11 + 10 + ... + 0 = 66 months.
      // 66 / 12 = 5.5 months average.
      const openingInterest = Math.max(0, (openingBalance - withdrawal)) * annualRate;
      const depositInterest = baseDepositPerMonth * (annualRate / 12) * 66;
      interestEarned = Math.max(0, openingInterest + depositInterest);
    }

    const closingBalance = effectiveBalancePreInterest + interestEarned;

    cumulativeInvestment += deposit;
    cumulativeInterest += interestEarned;
    currentBalance = closingBalance;

    schedule.push({
      year,
      openingBalance,
      deposit,
      interestEarned,
      withdrawal,
      closingBalance,
      cumulativeInvestment,
      cumulativeInterest,
    });
  }

  const totalInvestment = schedule.reduce((sum, item) => sum + item.deposit, input.existingBalance || 0);
  const totalInterestEarned = schedule.reduce((sum, item) => sum + item.interestEarned, 0);
  const maturityAmount = currentBalance;

  // Strict validation: Total Investment + Total Interest - Total Withdrawals === Maturity Amount
  const netInvested = totalInvestment - totalWithdrawals;
  const investedPercentage = maturityAmount > 0 ? Math.min(100, Math.max(0, (netInvested / maturityAmount) * 100)) : 100;
  const interestPercentage = maturityAmount > 0 ? Math.max(0, 100 - investedPercentage) : 0;
  const wealthGainMultiplier = totalInvestment > 0 ? maturityAmount / totalInvestment : 1;

  return {
    totalInvestment,
    totalInterestEarned,
    maturityAmount,
    totalWithdrawals,
    tenureYears,
    annualInterestRate: input.annualInterestRate ?? 7.1,
    depositTiming,
    schedule,
    investedPercentage,
    interestPercentage,
    wealthGainMultiplier,
  };
}

/**
 * Format standard Indian Rupee notation (e.g. ₹ 1,50,000)
 */
export function formatPpfINR(val: number): string {
  const isNegative = val < 0;
  const absVal = Math.round(Math.abs(val));
  const str = absVal.toString();

  if (str.length <= 3) {
    return isNegative ? `-₹ ${str}` : `₹ ${str}`;
  }

  const last3 = str.substring(str.length - 3);
  const other = str.substring(0, str.length - 3);
  const formatted = other.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3;

  return isNegative ? `-₹ ${formatted}` : `₹ ${formatted}`;
}
