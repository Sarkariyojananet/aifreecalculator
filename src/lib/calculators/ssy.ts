/**
 * Sukanya Samriddhi Yojana (SSY) Calculation Engine
 * Conforms to Government of India (Ministry of Finance) Small Savings Scheme rules.
 *
 * Scheme Rules:
 * - Deposit Tenure: 15 Years from opening date.
 * - Maturity Period: 21 Years from opening date.
 * - Years 16 to 21: Zero deposits, continues earning interest.
 * - Current Benchmark Rate: 8.2% p.a. compounded annually.
 * - Tax Benefit: 100% Tax-Free under Section 80C (EEE status).
 */

export interface SsyCalculationInput {
  depositMode: 'yearly' | 'monthly';
  depositAmount: number; // ₹ per year or per month
  girlCurrentAge: number; // 0 to 10 years
  startYear?: number;
  annualInterestRate?: number; // default 8.2
}

export interface SsyYearRow {
  yearNumber: number; // 1 to 21
  calendarYear: number;
  girlAge: number;
  openingBalance: number;
  depositAmount: number;
  interestEarned: number;
  closingBalance: number;
  isDepositPeriod: boolean;
}

export interface SsyCalculationResult {
  totalInvestment: number;
  totalInterestEarned: number;
  maturityAmount: number;
  maturityYear: number;
  girlAgeAtMaturity: number;
  annualInterestRate: number;
  schedule: SsyYearRow[];
}

export function calculateSsy(input: SsyCalculationInput): SsyCalculationResult {
  const {
    depositMode,
    depositAmount,
    girlCurrentAge,
    startYear = new Date().getFullYear(),
    annualInterestRate = 8.2,
  } = input;

  const rate = annualInterestRate / 100;
  const yearlyDeposit = depositMode === 'monthly' ? depositAmount * 12 : depositAmount;

  let balance = 0;
  let totalInvested = 0;
  let totalInterest = 0;
  const schedule: SsyYearRow[] = [];

  for (let yr = 1; yr <= 21; yr++) {
    const calendarYear = startYear + (yr - 1);
    const girlAge = girlCurrentAge + (yr - 1);
    const openingBalance = balance;
    const isDepositPeriod = yr <= 15;
    const deposit = isDepositPeriod ? yearlyDeposit : 0;

    totalInvested += deposit;

    // In SSY, annual deposit earns interest for the year
    // Interest calculated on (opening balance + deposit)
    const interest = (openingBalance + deposit) * rate;
    balance = openingBalance + deposit + interest;
    totalInterest += interest;

    schedule.push({
      yearNumber: yr,
      calendarYear,
      girlAge,
      openingBalance: Math.round(openingBalance),
      depositAmount: Math.round(deposit),
      interestEarned: Math.round(interest),
      closingBalance: Math.round(balance),
      isDepositPeriod,
    });
  }

  return {
    totalInvestment: Math.round(totalInvested),
    totalInterestEarned: Math.round(totalInterest),
    maturityAmount: Math.round(balance),
    maturityYear: startYear + 21,
    girlAgeAtMaturity: girlCurrentAge + 21,
    annualInterestRate,
    schedule,
  };
}
