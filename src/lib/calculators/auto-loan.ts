/**
 * Auto & Car Loan Calculation Engine
 * Supports New Car, Used Car, and Refinance calculations with extra payment simulations & amortization schedules.
 */

export type AutoLoanType = 'new' | 'used' | 'refinance';

export interface AutoLoanPurchaseInput {
  type: 'new' | 'used';
  vehiclePrice: number;
  downPayment: number;
  downPaymentPercent?: number;
  tradeInValue?: number;
  discounts?: number;
  taxesAndFees?: number;
  interestRateAnnual: number;
  loanTermMonths: number;
  startDate?: string; // YYYY-MM
  extraMonthly?: number;
  extraAnnual?: number;
  extraOneTime?: number;
  extraOneTimeMonth?: number;
}

export interface AutoLoanRefinanceInput {
  type: 'refinance';
  currentBalance: number;
  newInterestRateAnnual: number;
  remainingTermMonths: number;
  refinancingFees?: number;
  cashOutAmount?: number;
  startDate?: string;
  extraMonthly?: number;
  extraAnnual?: number;
  extraOneTime?: number;
  extraOneTimeMonth?: number;
  // Optional existing loan parameters for comparison
  existingMonthlyPayment?: number;
  existingInterestRate?: number;
  existingRemainingTermMonths?: number;
}

export interface AmortizationPeriod {
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

export interface AmortizationYearlySummary {
  year: number;
  openingBalance: number;
  principalPaid: number;
  interestPaid: number;
  extraPaid: number;
  totalPaid: number;
  closingBalance: number;
}

export interface AutoLoanResult {
  loanType: AutoLoanType;
  vehiclePriceOrBalance: number;
  downPayment: number;
  downPaymentPercent: number;
  tradeInValue: number;
  discounts: number;
  taxesAndFees: number;
  netLoanAmount: number;
  interestRateAnnual: number;
  loanTermMonths: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPrincipalPaid: number;
  totalAmountPayable: number;
  totalVehicleCost: number; // Down + TradeIn + Discounts + Total Paid
  payoffDateStr: string;
  actualPaymentsCount: number;
  hasExtraPayments: boolean;
  interestSaved: number;
  monthsSaved: number;
  timeSavedStr: string;
  yearlySchedule: AmortizationYearlySummary[];
  monthlySchedule: AmortizationPeriod[];
  // Refinance comparison (if applicable)
  refinanceComparison?: {
    currentBalance: number;
    existingMonthlyPayment: number;
    existingTotalInterest: number;
    existingRemainingTermMonths: number;
    newMonthlyPayment: number;
    newTotalInterest: number;
    monthlySavings: number;
    totalInterestSavings: number;
    netSavingsIncludingFees: number;
  };
}

/**
 * Calculates standard monthly EMI using reducing balance formula:
 * M = P * [r(1+r)^n] / [(1+r)^n - 1]
 * Handles 0% interest rate edge-case gracefully.
 */
export function calculateMonthlyPayment(principal: number, annualRatePct: number, months: number): number {
  if (months <= 0 || principal <= 0) return 0;
  const r = annualRatePct / 12 / 100;
  if (r === 0) {
    return principal / months;
  }
  const factor = Math.pow(1 + r, months);
  return (principal * r * factor) / (factor - 1);
}

/**
 * Calculates estimated net loan principal for purchase mode:
 * Principal = Vehicle Price - Down Payment - Trade-in - Discounts + Taxes & Fees
 */
export function calculateNetLoanPrincipal(
  vehiclePrice: number,
  downPayment: number,
  tradeInValue = 0,
  discounts = 0,
  taxesAndFees = 0
): number {
  const deductions = downPayment + tradeInValue + discounts;
  const net = vehiclePrice - deductions + taxesAndFees;
  return Math.max(0, net);
}

/**
 * Generates month-by-month and year-by-year amortization schedules,
 * applying extra payments directly to principal and terminating once balance is zero.
 */
export function generateAmortization(
  principal: number,
  annualRatePct: number,
  totalMonths: number,
  startDateStr?: string,
  extraMonthly = 0,
  extraAnnual = 0,
  extraOneTime = 0,
  extraOneTimeMonth = 1
): {
  monthlyPayment: number;
  originalTotalInterest: number;
  totalInterestPaid: number;
  totalPrincipalPaid: number;
  totalExtraPaid: number;
  actualPaymentsCount: number;
  payoffDateStr: string;
  interestSaved: number;
  monthsSaved: number;
  timeSavedStr: string;
  yearlySchedule: AmortizationYearlySummary[];
  monthlySchedule: AmortizationPeriod[];
} {
  const r = annualRatePct / 12 / 100;
  const monthlyPayment = calculateMonthlyPayment(principal, annualRatePct, totalMonths);
  const originalTotalInterest = r > 0 ? Math.max(0, monthlyPayment * totalMonths - principal) : 0;

  let startYear = new Date().getFullYear();
  let startMonth = new Date().getMonth();
  if (startDateStr) {
    const parts = startDateStr.split('-');
    if (parts.length === 2) {
      const y = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10) - 1;
      if (!isNaN(y)) startYear = y;
      if (!isNaN(m) && m >= 0 && m < 12) startMonth = m;
    }
  }

  const yearlySchedule: AmortizationYearlySummary[] = [];
  const monthlySchedule: AmortizationPeriod[] = [];

  let balance = principal;
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
  const maxSafety = Math.max(12, totalMonths * 3);

  while (balance > 0.001 && month <= maxSafety) {
    const monthOpening = balance;
    const monthInterest = r > 0 ? balance * r : 0;

    let regularPrincipal = Math.min(balance, monthlyPayment - monthInterest);
    if (regularPrincipal < 0) regularPrincipal = 0;

    const schedPayment = regularPrincipal + monthInterest;

    let extraThisMonth = extraMonthly;
    if (extraAnnual > 0 && month % 12 === 1) {
      extraThisMonth += extraAnnual;
    }
    if (extraOneTime > 0 && month === extraOneTimeMonth) {
      extraThisMonth += extraOneTime;
    }

    const remAfterRegular = Math.max(0, balance - regularPrincipal);
    extraThisMonth = Math.min(remAfterRegular, extraThisMonth);

    const totalPrincipalThisMonth = regularPrincipal + extraThisMonth;
    const totalPaymentThisMonth = schedPayment + extraThisMonth;

    balance = Math.max(0, balance - totalPrincipalThisMonth);

    totalInterestPaid += monthInterest;
    totalPrincipalPaid += regularPrincipal;
    totalExtraPaid += extraThisMonth;

    yearPrincipal += regularPrincipal;
    yearInterest += monthInterest;
    yearExtra += extraThisMonth;
    yearTotalPaid += totalPaymentThisMonth;

    const paymentDate = new Date(startYear, startMonth + month, 1);
    const dateStr = paymentDate.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });

    monthlySchedule.push({
      paymentNumber: month,
      paymentDateStr: dateStr,
      openingBalance: monthOpening,
      scheduledPayment: schedPayment,
      principalPaid: regularPrincipal,
      interestPaid: monthInterest,
      extraPayment: extraThisMonth,
      totalPayment: totalPaymentThisMonth,
      closingBalance: balance,
    });

    if (month % 12 === 0 || balance <= 0.001) {
      yearlySchedule.push({
        year: currentYear,
        openingBalance: yearOpeningBalance,
        principalPaid: yearPrincipal,
        interestPaid: yearInterest,
        extraPaid: yearExtra,
        totalPaid: yearTotalPaid,
        closingBalance: balance,
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
  const interestSaved = Math.max(0, originalTotalInterest - totalInterestPaid);
  const monthsSaved = Math.max(0, totalMonths - actualPaymentsCount);
  const yearsSaved = Math.floor(monthsSaved / 12);
  const remMonthsSaved = monthsSaved % 12;
  const timeSavedStr = yearsSaved > 0
    ? `${yearsSaved} Yr${yearsSaved > 1 ? 's' : ''} ${remMonthsSaved} Mo${remMonthsSaved !== 1 ? 's' : ''}`
    : `${remMonthsSaved} Month${remMonthsSaved !== 1 ? 's' : ''}`;

  const payoffDate = new Date(startYear, startMonth + actualPaymentsCount, 1);
  const payoffDateStr = payoffDate.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });

  return {
    monthlyPayment,
    originalTotalInterest,
    totalInterestPaid,
    totalPrincipalPaid,
    totalExtraPaid,
    actualPaymentsCount,
    payoffDateStr,
    interestSaved,
    monthsSaved,
    timeSavedStr,
    yearlySchedule,
    monthlySchedule,
  };
}

/**
 * Master calculation function for Auto & Car Loan (Purchase & Refinance)
 */
export function calculateAutoLoan(input: AutoLoanPurchaseInput | AutoLoanRefinanceInput): AutoLoanResult {
  if (input.type === 'refinance') {
    const refinanceFees = input.refinancingFees || 0;
    const cashOut = input.cashOutAmount || 0;
    const netLoanAmount = Math.max(0, input.currentBalance + refinanceFees + cashOut);

    const amort = generateAmortization(
      netLoanAmount,
      input.newInterestRateAnnual,
      input.remainingTermMonths,
      input.startDate,
      input.extraMonthly || 0,
      input.extraAnnual || 0,
      input.extraOneTime || 0,
      input.extraOneTimeMonth || 1
    );

    let refinanceComparison: AutoLoanResult['refinanceComparison'] = undefined;
    if (input.existingInterestRate !== undefined && input.existingInterestRate > 0) {
      const existingTerm = input.existingRemainingTermMonths || input.remainingTermMonths;
      const existingMonthly = input.existingMonthlyPayment || calculateMonthlyPayment(input.currentBalance, input.existingInterestRate, existingTerm);
      const existingTotalInterest = Math.max(0, existingMonthly * existingTerm - input.currentBalance);
      const monthlySavings = existingMonthly - amort.monthlyPayment;
      const totalInterestSavings = existingTotalInterest - amort.totalInterestPaid;
      const netSavingsIncludingFees = totalInterestSavings - refinanceFees;

      refinanceComparison = {
        currentBalance: input.currentBalance,
        existingMonthlyPayment: existingMonthly,
        existingTotalInterest,
        existingRemainingTermMonths: existingTerm,
        newMonthlyPayment: amort.monthlyPayment,
        newTotalInterest: amort.totalInterestPaid,
        monthlySavings,
        totalInterestSavings,
        netSavingsIncludingFees,
      };
    }

    return {
      loanType: 'refinance',
      vehiclePriceOrBalance: input.currentBalance,
      downPayment: 0,
      downPaymentPercent: 0,
      tradeInValue: 0,
      discounts: 0,
      taxesAndFees: refinanceFees,
      netLoanAmount,
      interestRateAnnual: input.newInterestRateAnnual,
      loanTermMonths: input.remainingTermMonths,
      monthlyPayment: amort.monthlyPayment,
      totalInterest: amort.totalInterestPaid,
      totalPrincipalPaid: amort.totalPrincipalPaid + amort.totalExtraPaid,
      totalAmountPayable: netLoanAmount + amort.totalInterestPaid,
      totalVehicleCost: netLoanAmount + amort.totalInterestPaid,
      payoffDateStr: amort.payoffDateStr,
      actualPaymentsCount: amort.actualPaymentsCount,
      hasExtraPayments: Boolean(input.extraMonthly || input.extraAnnual || input.extraOneTime),
      interestSaved: amort.interestSaved,
      monthsSaved: amort.monthsSaved,
      timeSavedStr: amort.timeSavedStr,
      yearlySchedule: amort.yearlySchedule,
      monthlySchedule: amort.monthlySchedule,
      refinanceComparison,
    };
  }

  // New or Used Car Loan Purchase
  const vehiclePrice = input.vehiclePrice;
  const downPayment = input.downPayment;
  const downPaymentPercent = input.downPaymentPercent || (vehiclePrice > 0 ? (downPayment / vehiclePrice) * 100 : 0);
  const tradeInValue = input.tradeInValue || 0;
  const discounts = input.discounts || 0;
  const taxesAndFees = input.taxesAndFees || 0;

  const netLoanAmount = calculateNetLoanPrincipal(vehiclePrice, downPayment, tradeInValue, discounts, taxesAndFees);

  const amort = generateAmortization(
    netLoanAmount,
    input.interestRateAnnual,
    input.loanTermMonths,
    input.startDate,
    input.extraMonthly || 0,
    input.extraAnnual || 0,
    input.extraOneTime || 0,
    input.extraOneTimeMonth || 1
  );

  const totalAmountPayable = netLoanAmount + amort.totalInterestPaid;
  const totalVehicleCost = downPayment + tradeInValue + discounts + totalAmountPayable;

  return {
    loanType: input.type,
    vehiclePriceOrBalance: vehiclePrice,
    downPayment,
    downPaymentPercent,
    tradeInValue,
    discounts,
    taxesAndFees,
    netLoanAmount,
    interestRateAnnual: input.interestRateAnnual,
    loanTermMonths: input.loanTermMonths,
    monthlyPayment: amort.monthlyPayment,
    totalInterest: amort.totalInterestPaid,
    totalPrincipalPaid: amort.totalPrincipalPaid + amort.totalExtraPaid,
    totalAmountPayable,
    totalVehicleCost,
    payoffDateStr: amort.payoffDateStr,
    actualPaymentsCount: amort.actualPaymentsCount,
    hasExtraPayments: Boolean(input.extraMonthly || input.extraAnnual || input.extraOneTime),
    interestSaved: amort.interestSaved,
    monthsSaved: amort.monthsSaved,
    timeSavedStr: amort.timeSavedStr,
    yearlySchedule: amort.yearlySchedule,
    monthlySchedule: amort.monthlySchedule,
  };
}
