/**
 * Comprehensive Personal Loan Calculation Engine
 * Formula for Monthly Payment (EMI):
 * M = P * [r(1+r)^n] / [(1+r)^n - 1]
 * Supports:
 * - Loan term in years or months
 * - Loan start date
 * - Extra payments: Extra Monthly, Extra Annual, One-Time Extra Payment
 * - Accelerated payoff, interest savings, and time saved calculation
 * - Full Yearly Summary and Monthly Amortization Schedule generation
 */

export interface PersonalLoanInput {
  loanAmount: number;
  annualInterestRate: number; // in %
  loanTermValue: number;
  loanTermUnit?: 'years' | 'months';
  startDate?: string; // YYYY-MM
  // Extra Payments
  extraMonthlyPayment?: number;
  extraAnnualPayment?: number;
  oneTimeExtraPayment?: number;
  oneTimeExtraMonth?: number;
}

export interface PersonalLoanYearlyRow {
  year: number;
  openingBalance: number;
  principalPaid: number;
  interestPaid: number;
  extraPaid: number;
  totalPaid: number;
  closingBalance: number;
}

export interface PersonalLoanMonthlyRow {
  paymentNumber: number;
  paymentDateStr: string;
  openingBalance: number;
  scheduledPayment: number;
  principalPaid: number;
  interestPaid: number;
  extraPayment: number;
  totalPayment: number;
  closingBalance: number;
}

export interface PersonalLoanComprehensiveResult {
  loanAmount: number;
  annualInterestRate: number;
  loanTermYears: number;
  loanTermMonths: number;
  monthlyPayment: number;
  totalInterestPaid: number;
  totalAmountPayable: number;
  estimatedPayoffDateStr: string;
  // Extra payment impact
  hasExtraPayments: boolean;
  actualPaymentsCount: number;
  actualTermYears: number;
  actualTermMonths: number;
  originalTotalInterest: number;
  interestSaved: number;
  monthsSaved: number;
  yearsSaved: number;
  timeSavedStr: string;
  // Schedules
  yearlySchedule: PersonalLoanYearlyRow[];
  monthlySchedule: PersonalLoanMonthlyRow[];
}

export function calculatePersonalLoanComprehensive(
  input: PersonalLoanInput
): PersonalLoanComprehensiveResult {
  const loanAmount = Math.max(0, input.loanAmount || 0);
  const annualInterestRate = Math.max(0, input.annualInterestRate || 0);
  const termValue = Math.max(1, input.loanTermValue || 5);
  const termUnit = input.loanTermUnit || 'years';

  const loanTermMonths = termUnit === 'years' ? termValue * 12 : termValue;
  const loanTermYears = Number((loanTermMonths / 12).toFixed(2));

  const extraMonthlyPayment = Math.max(0, input.extraMonthlyPayment || 0);
  const extraAnnualPayment = Math.max(0, input.extraAnnualPayment || 0);
  const oneTimeExtraPayment = Math.max(0, input.oneTimeExtraPayment || 0);
  const oneTimeExtraMonth = Math.max(1, input.oneTimeExtraMonth || 1);

  const monthlyRate = annualInterestRate / 12 / 100;

  // 1. Calculate Standard Monthly Payment
  let monthlyPayment = 0;
  if (loanAmount > 0 && loanTermMonths > 0) {
    if (monthlyRate === 0) {
      monthlyPayment = loanAmount / loanTermMonths;
    } else {
      const factor = Math.pow(1 + monthlyRate, loanTermMonths);
      monthlyPayment = (loanAmount * monthlyRate * factor) / (factor - 1);
    }
  }
  monthlyPayment = Number(monthlyPayment.toFixed(2));

  // Baseline total interest without extra payments
  let originalTotalInterest = 0;
  if (monthlyRate === 0) {
    originalTotalInterest = 0;
  } else {
    originalTotalInterest = Math.max(0, Number((monthlyPayment * loanTermMonths - loanAmount).toFixed(2)));
  }

  // Parse start date
  let startYear = new Date().getFullYear();
  let startMonth = new Date().getMonth(); // 0-indexed

  if (input.startDate) {
    const parts = input.startDate.split('-');
    if (parts.length === 2) {
      const y = parseInt(parts[0]);
      const m = parseInt(parts[1]) - 1;
      if (!isNaN(y) && !isNaN(m)) {
        startYear = y;
        startMonth = m;
      }
    }
  }

  // 2. Simulate Amortization Schedule
  const hasExtraPayments = (extraMonthlyPayment > 0 || extraAnnualPayment > 0 || oneTimeExtraPayment > 0);
  const yearlySchedule: PersonalLoanYearlyRow[] = [];
  const monthlySchedule: PersonalLoanMonthlyRow[] = [];

  let balance = loanAmount;
  let totalInterestPaid = 0;
  let totalPrincipalPaid = 0;
  let totalExtraPaid = 0;

  let currentYear = 1;
  let yearOpeningBalance = balance;
  let yearPrincipal = 0;
  let yearInterest = 0;
  let yearExtra = 0;
  let yearTotalPaid = 0;

  let month = 1;
  const maxSafetyMonths = loanTermMonths * 2;

  while (balance > 0.001 && month <= maxSafetyMonths) {
    const monthOpening = balance;
    const interestForMonth = monthlyRate > 0 ? balance * monthlyRate : 0;

    let regularPrincipal = Math.min(balance, monthlyPayment - interestForMonth);
    if (regularPrincipal < 0) regularPrincipal = 0;

    let scheduledPayment = regularPrincipal + interestForMonth;

    let extraForMonth = extraMonthlyPayment;
    if (extraAnnualPayment > 0 && month % 12 === 1) {
      extraForMonth += extraAnnualPayment;
    }
    if (oneTimeExtraPayment > 0 && month === oneTimeExtraMonth) {
      extraForMonth += oneTimeExtraPayment;
    }

    const remainingBalanceAfterRegular = Math.max(0, balance - regularPrincipal);
    extraForMonth = Math.min(remainingBalanceAfterRegular, extraForMonth);

    const totalPrincipalThisMonth = regularPrincipal + extraForMonth;
    const totalPaymentThisMonth = scheduledPayment + extraForMonth;

    balance = Math.max(0, balance - totalPrincipalThisMonth);

    totalInterestPaid += interestForMonth;
    totalPrincipalPaid += regularPrincipal;
    totalExtraPaid += extraForMonth;

    yearPrincipal += regularPrincipal;
    yearInterest += interestForMonth;
    yearExtra += extraForMonth;
    yearTotalPaid += totalPaymentThisMonth;

    const paymentDate = new Date(startYear, startMonth + month, 1);
    const dateStr = paymentDate.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });

    monthlySchedule.push({
      paymentNumber: month,
      paymentDateStr: dateStr,
      openingBalance: Number(monthOpening.toFixed(2)),
      scheduledPayment: Number(scheduledPayment.toFixed(2)),
      principalPaid: Number(regularPrincipal.toFixed(2)),
      interestPaid: Number(interestForMonth.toFixed(2)),
      extraPayment: Number(extraForMonth.toFixed(2)),
      totalPayment: Number(totalPaymentThisMonth.toFixed(2)),
      closingBalance: Number(balance.toFixed(2)),
    });

    if (month % 12 === 0 || balance <= 0.001) {
      yearlySchedule.push({
        year: currentYear,
        openingBalance: Number(yearOpeningBalance.toFixed(2)),
        principalPaid: Number(yearPrincipal.toFixed(2)),
        interestPaid: Number(yearInterest.toFixed(2)),
        extraPaid: Number(yearExtra.toFixed(2)),
        totalPaid: Number(yearTotalPaid.toFixed(2)),
        closingBalance: Number(balance.toFixed(2)),
      });

      currentYear++;
      yearOpeningBalance = balance;
      yearPrincipal = 0;
      yearInterest = 0;
      yearExtra = 0;
      yearTotalPaid = 0;
    }

    if (balance <= 0.001) break;
    month++;
  }

  const actualPaymentsCount = monthlySchedule.length;
  const actualTermYears = Number((actualPaymentsCount / 12).toFixed(2));
  const actualTermMonths = actualPaymentsCount;

  const interestSaved = Math.max(0, Number((originalTotalInterest - totalInterestPaid).toFixed(2)));
  const monthsSaved = Math.max(0, loanTermMonths - actualPaymentsCount);
  const yearsSaved = Math.floor(monthsSaved / 12);
  const remMonthsSaved = monthsSaved % 12;
  const timeSavedStr = `${yearsSaved} Yrs ${remMonthsSaved} Mos`;

  const totalAmountPayable = Number((loanAmount + totalInterestPaid).toFixed(2));

  const payoffDate = new Date(startYear, startMonth + actualPaymentsCount, 1);
  const estimatedPayoffDateStr = payoffDate.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });

  return {
    loanAmount,
    annualInterestRate,
    loanTermYears,
    loanTermMonths,
    monthlyPayment,
    totalInterestPaid: Number(totalInterestPaid.toFixed(2)),
    totalAmountPayable,
    estimatedPayoffDateStr,
    hasExtraPayments,
    actualPaymentsCount,
    actualTermYears,
    actualTermMonths,
    originalTotalInterest,
    interestSaved,
    monthsSaved,
    yearsSaved: Number((monthsSaved / 12).toFixed(2)),
    timeSavedStr,
    yearlySchedule,
    monthlySchedule,
  };
}
