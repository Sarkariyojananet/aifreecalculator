/**
 * Recurring Deposit (RD) Calculation Engine
 * Conforms to Indian Post Office and Scheduled Commercial Banks (SBI, HDFC, ICICI) quarterly compounding standards.
 *
 * Formula:
 * Standard Indian banking formula for quarterly compounded monthly deposits:
 * M = P * ((1 + r/400)^n - 1) / (1 - (1 + r/400)^(-1/3))
 * where:
 * P = Monthly installment amount
 * r = Annual interest rate in percentage
 * n = Number of quarters (totalMonths / 3)
 */

export interface RdCalculationInput {
  monthlyDeposit: number;
  tenureMonths: number;
  annualInterestRate: number; // e.g. 7.1
  isSeniorCitizen?: boolean;
}

export interface RdScheduleQuarter {
  quarter: number;
  month: number;
  openingBalance: number;
  depositInQuarter: number;
  interestInQuarter: number;
  closingBalance: number;
}

export interface RdCalculationResult {
  totalInvestment: number;
  totalInterestEarned: number;
  maturityAmount: number;
  tenureMonths: number;
  effectiveAnnualRate: number;
  schedule: RdScheduleQuarter[];
}

export function calculateRd(input: RdCalculationInput): RdCalculationResult {
  const {
    monthlyDeposit,
    tenureMonths,
    annualInterestRate,
    isSeniorCitizen = false,
  } = input;

  const effectiveRate = annualInterestRate + (isSeniorCitizen ? 0.5 : 0);
  const totalInvestment = monthlyDeposit * tenureMonths;

  if (monthlyDeposit <= 0 || tenureMonths <= 0 || effectiveRate <= 0) {
    return {
      totalInvestment,
      totalInterestEarned: 0,
      maturityAmount: totalInvestment,
      tenureMonths,
      effectiveAnnualRate: effectiveRate,
      schedule: [],
    };
  }

  // Quarterly compounding simulation month by month to provide accurate schedule
  const quarters = Math.ceil(tenureMonths / 3);
  const quarterlyRate = effectiveRate / 400; // r / 4 / 100

  let balance = 0;
  let totalInterest = 0;
  const schedule: RdScheduleQuarter[] = [];

  for (let q = 1; q <= quarters; q++) {
    const openingBal = balance;
    let quarterDeposit = 0;
    const monthsInThisQuarter = Math.min(3, tenureMonths - (q - 1) * 3);

    // Each month's deposit earns interest for remaining days in quarter
    let quarterInterest = 0;
    for (let m = 1; m <= monthsInThisQuarter; m++) {
      quarterDeposit += monthlyDeposit;
      balance += monthlyDeposit;
    }

    // Compound interest applied at end of quarter
    // Standard approximation: opening balance earns full quarter, monthly additions earn fractional
    // Exact bank formula for quarter:
    quarterInterest = openingBal * quarterlyRate;
    // Fractional interest for the 3 monthly installments in the quarter
    for (let m = 1; m <= monthsInThisQuarter; m++) {
      const monthsActive = monthsInThisQuarter - m + 1;
      quarterInterest += monthlyDeposit * (effectiveRate / 1200) * monthsActive;
    }

    balance += quarterInterest;
    totalInterest += quarterInterest;

    schedule.push({
      quarter: q,
      month: (q - 1) * 3 + monthsInThisQuarter,
      openingBalance: Math.round(openingBal),
      depositInQuarter: Math.round(quarterDeposit),
      interestInQuarter: Math.round(quarterInterest),
      closingBalance: Math.round(balance),
    });
  }

  return {
    totalInvestment: Math.round(totalInvestment),
    totalInterestEarned: Math.round(totalInterest),
    maturityAmount: Math.round(balance),
    tenureMonths,
    effectiveAnnualRate: effectiveRate,
    schedule,
  };
}
