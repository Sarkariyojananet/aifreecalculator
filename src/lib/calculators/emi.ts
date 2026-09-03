/**
 * Comprehensive Equated Monthly Installment (EMI) Calculation Engine
 * Formula: EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
 * Supports General, Home, Car, Personal, and Bike Loans, 0% interest loans,
 * Amortization schedules (Monthly & Yearly), Prepayment analysis, and Loan Comparisons.
 */

export interface EmiInput {
  principal: number; // Loan amount
  annualRate: number; // Interest rate in %
  tenureYears?: number; // Tenure in years
  tenureMonths?: number; // Tenure in months
  processingFee?: number; // Optional processing fee
}

export interface AmortizationMonthItem {
  month: number;
  openingBalance: number;
  emi: number;
  principalPaid: number;
  interestPaid: number;
  closingBalance: number;
}

export interface AmortizationYearItem {
  year: number;
  openingBalance: number;
  totalEmi: number;
  principalPaid: number;
  interestPaid: number;
  closingBalance: number;
}

export interface EmiResult {
  monthlyEmi: number;
  totalInterest: number;
  totalPayment: number;
  principal: number;
  tenureMonths: number;
  principalRatioPercentage: number;
  interestRatioPercentage: number;
  processingFee: number;
  totalCostWithFee: number;
  monthlySchedule: AmortizationMonthItem[];
  yearlySchedule: AmortizationYearItem[];
}

export function calculateEmi(input: EmiInput): EmiResult {
  const principal = Math.max(0, input.principal || 0);
  const annualRate = Math.max(0, input.annualRate || 0);
  const tenureMonths = Math.max(1, input.tenureMonths || (input.tenureYears || 1) * 12);
  const processingFee = Math.max(0, input.processingFee || 0);

  if (principal <= 0) {
    throw new Error('Principal loan amount must be greater than zero.');
  }

  const monthlyRate = annualRate / 12 / 100;
  let monthlyEmi = 0;

  if (monthlyRate === 0) {
    monthlyEmi = Math.round(principal / tenureMonths);
  } else {
    const rateFactor = Math.pow(1 + monthlyRate, tenureMonths);
    monthlyEmi = Math.round((principal * monthlyRate * rateFactor) / (rateFactor - 1));
  }

  const totalPayment = monthlyEmi * tenureMonths;
  const totalInterest = Math.max(0, totalPayment - principal);
  const totalCostWithFee = totalPayment + processingFee;

  const principalRatioPercentage = Number(((principal / totalPayment) * 100).toFixed(1));
  const interestRatioPercentage = Number(((totalInterest / totalPayment) * 100).toFixed(1));

  // Generate complete amortization schedules
  const monthlySchedule: AmortizationMonthItem[] = [];
  const yearlySchedule: AmortizationYearItem[] = [];

  let currentBalance = principal;
  let yearOpeningBalance = principal;
  let yearTotalEmi = 0;
  let yearPrincipalPaid = 0;
  let yearInterestPaid = 0;

  for (let m = 1; m <= tenureMonths; m++) {
    const openingBalance = currentBalance;
    const interestPaid = Math.round(currentBalance * monthlyRate);
    const principalPaid = m === tenureMonths ? openingBalance : Math.min(openingBalance, monthlyEmi - interestPaid);
    currentBalance = Math.max(0, openingBalance - principalPaid);

    monthlySchedule.push({
      month: m,
      openingBalance,
      emi: monthlyEmi,
      principalPaid,
      interestPaid,
      closingBalance: currentBalance,
    });

    yearTotalEmi += monthlyEmi;
    yearPrincipalPaid += principalPaid;
    yearInterestPaid += interestPaid;

    if (m % 12 === 0 || m === tenureMonths) {
      const yearNumber = Math.ceil(m / 12);
      yearlySchedule.push({
        year: yearNumber,
        openingBalance: yearOpeningBalance,
        totalEmi: yearTotalEmi,
        principalPaid: yearPrincipalPaid,
        interestPaid: yearInterestPaid,
        closingBalance: currentBalance,
      });

      yearOpeningBalance = currentBalance;
      yearTotalEmi = 0;
      yearPrincipalPaid = 0;
      yearInterestPaid = 0;
    }
  }

  return {
    monthlyEmi,
    totalInterest,
    totalPayment,
    principal,
    tenureMonths,
    principalRatioPercentage,
    interestRatioPercentage,
    processingFee,
    totalCostWithFee,
    monthlySchedule,
    yearlySchedule,
  };
}

/**
 * Prepayment Analysis
 */
export function calculatePrepaymentImpact(
  outstandingPrincipal: number,
  annualRate: number,
  remainingTenureMonths: number,
  prepaymentAmount: number,
  option: 'reduce_tenure' | 'reduce_emi' = 'reduce_tenure'
): {
  originalTotalInterest: number;
  newMonthlyEmi: number;
  newTenureMonths: number;
  newTotalInterest: number;
  interestSaved: number;
  tenureReducedMonths: number;
} {
  const baseResult = calculateEmi({
    principal: outstandingPrincipal,
    annualRate,
    tenureMonths: remainingTenureMonths,
  });

  const originalTotalInterest = baseResult.totalInterest;
  const newPrincipal = Math.max(0, outstandingPrincipal - prepaymentAmount);

  if (newPrincipal <= 0) {
    return {
      originalTotalInterest,
      newMonthlyEmi: 0,
      newTenureMonths: 0,
      newTotalInterest: 0,
      interestSaved: originalTotalInterest,
      tenureReducedMonths: remainingTenureMonths,
    };
  }

  if (option === 'reduce_emi') {
    const newResult = calculateEmi({
      principal: newPrincipal,
      annualRate,
      tenureMonths: remainingTenureMonths,
    });
    return {
      originalTotalInterest,
      newMonthlyEmi: newResult.monthlyEmi,
      newTenureMonths: remainingTenureMonths,
      newTotalInterest: newResult.totalInterest,
      interestSaved: Math.max(0, originalTotalInterest - newResult.totalInterest),
      tenureReducedMonths: 0,
    };
  }

  // Reduce tenure while keeping EMI constant
  const monthlyRate = annualRate / 12 / 100;
  const currentEmi = baseResult.monthlyEmi;

  let balance = newPrincipal;
  let monthsCount = 0;
  let totalNewInterest = 0;

  while (balance > 0 && monthsCount < remainingTenureMonths) {
    monthsCount++;
    const int = balance * monthlyRate;
    totalNewInterest += int;
    const princPaid = Math.min(balance, currentEmi - int);
    balance -= princPaid;
  }

  const roundedInterest = Math.round(totalNewInterest);

  return {
    originalTotalInterest,
    newMonthlyEmi: currentEmi,
    newTenureMonths: monthsCount,
    newTotalInterest: roundedInterest,
    interestSaved: Math.max(0, originalTotalInterest - roundedInterest),
    tenureReducedMonths: Math.max(0, remainingTenureMonths - monthsCount),
  };
}
