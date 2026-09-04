/**
 * Comprehensive Mortgage Loan Calculation Engine
 * Formula for Monthly Principal & Interest:
 * M = P * [r(1+r)^n] / [(1+r)^n - 1]
 * Supports:
 * - Down payment by amount or percentage
 * - Loan term in years or months
 * - Additional housing costs: Property Tax, Home Insurance, PMI, HOA & Maintenance
 * - Extra payments: Extra Monthly, Extra Annual, One-Time Extra Payment
 * - Accelerated payoff, interest savings, and time saved calculation
 * - Full Yearly Summary and Monthly Amortization Schedule generation
 */

export interface MortgageInput {
  homePrice: number;
  downPaymentAmount?: number;
  downPaymentPercent?: number;
  annualInterestRate: number; // in %
  loanTermValue: number;
  loanTermUnit?: 'years' | 'months';
  // Additional costs
  propertyTaxAnnual?: number;
  homeInsuranceAnnual?: number;
  monthlyPmi?: number;
  monthlyHoaFee?: number;
  otherMonthlyCosts?: number;
  // Extra Payments
  extraMonthlyPayment?: number;
  extraAnnualPayment?: number;
  oneTimeExtraPayment?: number;
  oneTimeExtraMonth?: number; // month index when one-time payment is made
}

export interface MortgageYearlyScheduleRow {
  year: number;
  openingBalance: number;
  principalPaid: number;
  interestPaid: number;
  extraPaid: number;
  totalPaid: number;
  closingBalance: number;
}

export interface MortgageMonthlyScheduleRow {
  paymentNumber: number;
  monthIndex: number;
  openingBalance: number;
  scheduledPayment: number;
  principalPaid: number;
  interestPaid: number;
  extraPayment: number;
  totalPayment: number;
  closingBalance: number;
}

export interface MortgageComprehensiveResult {
  homePrice: number;
  downPaymentAmount: number;
  downPaymentPercent: number;
  loanAmount: number;
  annualInterestRate: number;
  loanTermYears: number;
  loanTermMonths: number;
  totalScheduledPayments: number;
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyPmi: number;
  monthlyHoaFee: number;
  monthlyOtherCosts: number;
  totalMonthlyPayment: number;
  totalInterestPaid: number;
  totalPrincipalPaid: number;
  totalExtraPaid: number;
  totalOverallCost: number;
  // Extra payment impact
  hasExtraPayments: boolean;
  actualPaymentsCount: number;
  actualTermYears: number;
  actualTermMonths: number;
  originalTotalInterest: number;
  interestSaved: number;
  monthsSaved: number;
  yearsSaved: number;
  // Schedules
  yearlySchedule: MortgageYearlyScheduleRow[];
  monthlySchedule: MortgageMonthlyScheduleRow[];
}

export function calculateMortgageComprehensive(
  input: MortgageInput
): MortgageComprehensiveResult {
  const homePrice = Math.max(0, input.homePrice || 0);

  let downPaymentAmount = 0;
  let downPaymentPercent = 0;

  if (input.downPaymentAmount !== undefined && input.downPaymentAmount > 0) {
    downPaymentAmount = Math.min(homePrice, input.downPaymentAmount);
    downPaymentPercent = homePrice > 0 ? Number(((downPaymentAmount / homePrice) * 100).toFixed(2)) : 0;
  } else if (input.downPaymentPercent !== undefined) {
    downPaymentPercent = Math.max(0, Math.min(100, input.downPaymentPercent));
    downPaymentAmount = Number(((homePrice * downPaymentPercent) / 100).toFixed(2));
  } else {
    // Default 20%
    downPaymentPercent = 20;
    downPaymentAmount = Number(((homePrice * 20) / 100).toFixed(2));
  }

  const loanAmount = Math.max(0, Number((homePrice - downPaymentAmount).toFixed(2)));
  const annualInterestRate = Math.max(0, input.annualInterestRate || 0);
  const termValue = Math.max(1, input.loanTermValue || 20);
  const termUnit = input.loanTermUnit || 'years';

  const loanTermMonths = termUnit === 'years' ? termValue * 12 : termValue;
  const loanTermYears = Number((loanTermMonths / 12).toFixed(2));

  const propertyTaxAnnual = Math.max(0, input.propertyTaxAnnual || 0);
  const homeInsuranceAnnual = Math.max(0, input.homeInsuranceAnnual || 0);
  const monthlyPmi = Math.max(0, input.monthlyPmi || 0);
  const monthlyHoaFee = Math.max(0, input.monthlyHoaFee || 0);
  const otherMonthlyCosts = Math.max(0, input.otherMonthlyCosts || 0);

  const extraMonthlyPayment = Math.max(0, input.extraMonthlyPayment || 0);
  const extraAnnualPayment = Math.max(0, input.extraAnnualPayment || 0);
  const oneTimeExtraPayment = Math.max(0, input.oneTimeExtraPayment || 0);
  const oneTimeExtraMonth = Math.max(1, input.oneTimeExtraMonth || 1);

  const monthlyRate = annualInterestRate / 12 / 100;

  // 1. Calculate Standard Monthly P&I
  let monthlyPI = 0;
  if (loanAmount > 0 && loanTermMonths > 0) {
    if (monthlyRate === 0) {
      monthlyPI = loanAmount / loanTermMonths;
    } else {
      const factor = Math.pow(1 + monthlyRate, loanTermMonths);
      monthlyPI = (loanAmount * monthlyRate * factor) / (factor - 1);
    }
  }
  monthlyPI = Number(monthlyPI.toFixed(2));

  const monthlyPropertyTax = Number((propertyTaxAnnual / 12).toFixed(2));
  const monthlyHomeInsurance = Number((homeInsuranceAnnual / 12).toFixed(2));
  const totalMonthlyPayment = Number((
    monthlyPI +
    monthlyPropertyTax +
    monthlyHomeInsurance +
    monthlyPmi +
    monthlyHoaFee +
    otherMonthlyCosts
  ).toFixed(2));

  // Baseline total interest without extra payments
  let originalTotalInterest = 0;
  if (monthlyRate === 0) {
    originalTotalInterest = 0;
  } else {
    originalTotalInterest = Math.max(0, Number((monthlyPI * loanTermMonths - loanAmount).toFixed(2)));
  }

  // 2. Simulate Amortization with Extra Payments
  const hasExtraPayments = (extraMonthlyPayment > 0 || extraAnnualPayment > 0 || oneTimeExtraPayment > 0);
  const yearlySchedule: MortgageYearlyScheduleRow[] = [];
  const monthlySchedule: MortgageMonthlyScheduleRow[] = [];

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
  const maxSafetyMonths = loanTermMonths * 2; // safety break

  while (balance > 0.001 && month <= maxSafetyMonths) {
    const monthOpening = balance;
    const interestForMonth = monthlyRate > 0 ? balance * monthlyRate : 0;
    
    // Regular scheduled payment (capped to pay off balance if last month)
    let regularPrincipal = Math.min(balance, monthlyPI - interestForMonth);
    if (regularPrincipal < 0) regularPrincipal = 0;

    let scheduledMonthlyPayment = regularPrincipal + interestForMonth;

    // Extra payments for this month
    let extraForMonth = extraMonthlyPayment;
    if (extraAnnualPayment > 0 && month % 12 === 1) {
      extraForMonth += extraAnnualPayment;
    }
    if (oneTimeExtraPayment > 0 && month === oneTimeExtraMonth) {
      extraForMonth += oneTimeExtraPayment;
    }

    // Extra payment cannot exceed remaining balance after regular principal
    const remainingBalanceAfterRegular = Math.max(0, balance - regularPrincipal);
    extraForMonth = Math.min(remainingBalanceAfterRegular, extraForMonth);

    const totalPrincipalThisMonth = regularPrincipal + extraForMonth;
    const totalPaymentThisMonth = scheduledMonthlyPayment + extraForMonth;

    balance = Math.max(0, balance - totalPrincipalThisMonth);

    totalInterestPaid += interestForMonth;
    totalPrincipalPaid += regularPrincipal;
    totalExtraPaid += extraForMonth;

    yearPrincipal += regularPrincipal;
    yearInterest += interestForMonth;
    yearExtra += extraForMonth;
    yearTotalPaid += totalPaymentThisMonth;

    monthlySchedule.push({
      paymentNumber: month,
      monthIndex: month,
      openingBalance: Number(monthOpening.toFixed(2)),
      scheduledPayment: Number(scheduledMonthlyPayment.toFixed(2)),
      principalPaid: Number(regularPrincipal.toFixed(2)),
      interestPaid: Number(interestForMonth.toFixed(2)),
      extraPayment: Number(extraForMonth.toFixed(2)),
      totalPayment: Number(totalPaymentThisMonth.toFixed(2)),
      closingBalance: Number(balance.toFixed(2)),
    });

    // Year boundary or loan paid off
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
  const yearsSaved = Number((monthsSaved / 12).toFixed(2));

  const totalOverallCost = Number((downPaymentAmount + totalPrincipalPaid + totalExtraPaid + totalInterestPaid).toFixed(2));

  return {
    homePrice,
    downPaymentAmount,
    downPaymentPercent,
    loanAmount,
    annualInterestRate,
    loanTermYears,
    loanTermMonths,
    totalScheduledPayments: loanTermMonths,
    monthlyPrincipalAndInterest: monthlyPI,
    monthlyPropertyTax,
    monthlyHomeInsurance,
    monthlyPmi,
    monthlyHoaFee,
    monthlyOtherCosts: otherMonthlyCosts,
    totalMonthlyPayment,
    totalInterestPaid: Number(totalInterestPaid.toFixed(2)),
    totalPrincipalPaid: Number((totalPrincipalPaid + totalExtraPaid).toFixed(2)),
    totalExtraPaid: Number(totalExtraPaid.toFixed(2)),
    totalOverallCost,
    hasExtraPayments,
    actualPaymentsCount,
    actualTermYears,
    actualTermMonths,
    originalTotalInterest,
    interestSaved,
    monthsSaved,
    yearsSaved,
    yearlySchedule,
    monthlySchedule,
  };
}
