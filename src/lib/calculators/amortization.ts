/**
 * Comprehensive Loan Amortization Schedule Calculation Engine
 * Supports multiple loan types, payment frequencies (monthly, biweekly, weekly),
 * extra periodic, annual, and one-time prepayments, interest & time savings, and yearly rollups.
 */

export type LoanType = 'general' | 'home' | 'car' | 'auto' | 'commercial';
export type PaymentFrequency = 'monthly' | 'biweekly' | 'weekly';

export interface AmortizationInput {
  loanType?: LoanType;
  loanAmount: number;
  interestRateAnnual: number;
  loanTermMonths: number;
  paymentFrequency?: PaymentFrequency;
  startDate?: string; // YYYY-MM
  extraPaymentPerPeriod?: number;
  oneTimeExtraPayment?: number;
  oneTimeExtraPeriod?: number;
  annualExtraPayment?: number;
}

export interface DetailedAmortizationRow {
  period: number;
  dateStr: string;
  openingBalance: number;
  regularPayment: number;
  principalPaid: number;
  interestPaid: number;
  extraPayment: number;
  totalPayment: number;
  closingBalance: number;
}

export interface YearlyAmortizationSummary {
  year: number;
  openingBalance: number;
  principalPaid: number;
  interestPaid: number;
  extraPayments: number;
  totalPayments: number;
  closingBalance: number;
}

export interface ExtraPaymentComparison {
  regularPayment: number;
  originalDurationMonths: number;
  newDurationMonths: number;
  originalTotalInterest: number;
  newTotalInterest: number;
  interestSaved: number;
  periodsSaved: number;
  originalPayoffDate: string;
  newPayoffDate: string;
}

export interface AmortizationResult {
  loanType: LoanType;
  loanAmount: number;
  interestRateAnnual: number;
  loanTermMonths: number;
  loanTermYears: number;
  paymentFrequency: PaymentFrequency;
  periodsPerYear: number;
  totalPeriodsScheduled: number;
  periodicPaymentAmount: number;
  totalPrincipalPaid: number;
  totalInterestPaid: number;
  totalAmountPaid: number;
  totalExtraPaid: number;
  actualPeriodsCount: number;
  payoffDate: string;
  originalPayoffDate: string;
  hasExtraPayments: boolean;
  interestSaved: number;
  timeSavedMonths: number;
  comparison?: ExtraPaymentComparison;
  yearlySchedule: YearlyAmortizationSummary[];
  detailedSchedule: DetailedAmortizationRow[];
}

/**
 * Helper to calculate periodic payment amount:
 * M = P * [r(1+r)^n] / [(1+r)^n - 1]
 */
export function calculatePeriodicPayment(
  principal: number,
  annualRatePct: number,
  totalPeriods: number,
  periodsPerYear: number
): number {
  if (principal <= 0 || totalPeriods <= 0) return 0;
  if (annualRatePct <= 0) return principal / totalPeriods;

  const periodicRate = annualRatePct / periodsPerYear / 100;
  const factor = Math.pow(1 + periodicRate, totalPeriods);
  return (principal * periodicRate * factor) / (factor - 1);
}

/**
 * Format date string from start date and period offset
 */
function getPeriodDate(startDateStr: string | undefined, period: number, frequency: PaymentFrequency): string {
  const baseDate = startDateStr ? new Date(`${startDateStr}-01`) : new Date();
  if (isNaN(baseDate.getTime())) {
    baseDate.setTime(Date.now());
  }

  if (frequency === 'monthly') {
    const d = new Date(baseDate.getFullYear(), baseDate.getMonth() + (period - 1), 1);
    return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
  } else if (frequency === 'biweekly') {
    const d = new Date(baseDate.getTime() + (period - 1) * 14 * 24 * 60 * 60 * 1000);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  } else {
    // weekly
    const d = new Date(baseDate.getTime() + (period - 1) * 7 * 24 * 60 * 60 * 1000);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }
}

/**
 * Master Loan Amortization Calculation Function
 */
export function calculateAmortizationSchedule(input: AmortizationInput): AmortizationResult {
  const loanType = input.loanType || 'general';
  const loanAmount = Math.max(0, input.loanAmount);
  const interestRateAnnual = Math.max(0, input.interestRateAnnual);
  const loanTermMonths = Math.max(1, input.loanTermMonths);
  const loanTermYears = loanTermMonths / 12;
  const paymentFrequency = input.paymentFrequency || 'monthly';
  const startDate = input.startDate || new Date().toISOString().slice(0, 7);

  const extraPerPeriod = Math.max(0, input.extraPaymentPerPeriod || 0);
  const oneTimeExtra = Math.max(0, input.oneTimeExtraPayment || 0);
  const oneTimePeriod = Math.max(1, input.oneTimeExtraPeriod || 1);
  const annualExtra = Math.max(0, input.annualExtraPayment || 0);

  const hasExtra = extraPerPeriod > 0 || oneTimeExtra > 0 || annualExtra > 0;

  // Determine periods per year based on frequency
  let periodsPerYear = 12;
  if (paymentFrequency === 'biweekly') periodsPerYear = 26;
  if (paymentFrequency === 'weekly') periodsPerYear = 52;

  const totalPeriodsScheduled = Math.round(loanTermYears * periodsPerYear);
  const periodicRate = interestRateAnnual / periodsPerYear / 100;

  // Base regular periodic payment without extra payments
  const regularPayment = calculatePeriodicPayment(loanAmount, interestRateAnnual, totalPeriodsScheduled, periodsPerYear);

  // 1. Calculate Baseline (without extra payments) for comparison
  let baselineTotalInterest = 0;
  let baseBal = loanAmount;
  for (let p = 1; p <= totalPeriodsScheduled; p++) {
    const interest = baseBal * periodicRate;
    baselineTotalInterest += interest;
    let principal = regularPayment - interest;
    if (baseBal <= principal) {
      baseBal = 0;
      break;
    } else {
      baseBal -= principal;
    }
  }

  const originalPayoffDate = getPeriodDate(startDate, totalPeriodsScheduled, paymentFrequency);

  // 2. Generate Actual Amortization Schedule with Extra Payments
  const detailedSchedule: DetailedAmortizationRow[] = [];
  let balance = loanAmount;
  let totalPrincipalPaid = 0;
  let totalInterestPaid = 0;
  let totalExtraPaid = 0;
  let period = 0;

  // Limit loop safety
  const maxPeriods = totalPeriodsScheduled * 2;

  while (balance > 0.001 && period < maxPeriods) {
    period++;
    const openingBalance = balance;
    const interest = balance * periodicRate;
    totalInterestPaid += interest;

    let scheduledPrincipal = regularPayment - interest;
    let extra = extraPerPeriod;

    // Apply one-time extra if this is the chosen period
    if (oneTimeExtra > 0 && period === oneTimePeriod) {
      extra += oneTimeExtra;
    }

    // Apply annual extra (every periodsPerYear period)
    if (annualExtra > 0 && period % periodsPerYear === 0) {
      extra += annualExtra;
    }

    let actualPrincipal = scheduledPrincipal;
    let periodTotalPayment = 0;

    if (balance <= scheduledPrincipal + extra) {
      // Final payoff
      actualPrincipal = balance;
      extra = Math.max(0, balance - scheduledPrincipal);
      if (extra > 0) {
        actualPrincipal = balance - extra;
      }
      periodTotalPayment = actualPrincipal + interest + extra;
      totalPrincipalPaid += actualPrincipal;
      totalExtraPaid += extra;
      balance = 0;
    } else {
      actualPrincipal = scheduledPrincipal;
      totalPrincipalPaid += actualPrincipal;
      totalExtraPaid += extra;
      balance = balance - (actualPrincipal + extra);
      periodTotalPayment = actualPrincipal + interest + extra;
    }

    detailedSchedule.push({
      period,
      dateStr: getPeriodDate(startDate, period, paymentFrequency),
      openingBalance,
      regularPayment: actualPrincipal + interest,
      principalPaid: actualPrincipal,
      interestPaid: interest,
      extraPayment: extra,
      totalPayment: periodTotalPayment,
      closingBalance: Math.max(0, balance),
    });

    if (balance <= 0) break;
  }

  const actualPeriodsCount = period;
  const payoffDate = detailedSchedule.length > 0
    ? detailedSchedule[detailedSchedule.length - 1].dateStr
    : originalPayoffDate;

  // 3. Aggregate Yearly Summary
  const yearlySchedule: YearlyAmortizationSummary[] = [];
  let currentYear = 1;
  let yearOpen = loanAmount;
  let yearPrincipal = 0;
  let yearInterest = 0;
  let yearExtra = 0;
  let yearTotal = 0;

  for (let i = 0; i < detailedSchedule.length; i++) {
    const row = detailedSchedule[i];
    if (i === 0) {
      yearOpen = row.openingBalance;
    }

    yearPrincipal += row.principalPaid;
    yearInterest += row.interestPaid;
    yearExtra += row.extraPayment;
    yearTotal += row.totalPayment;

    // End of year or end of schedule
    const isYearEnd = (row.period % periodsPerYear === 0) || (i === detailedSchedule.length - 1);

    if (isYearEnd) {
      yearlySchedule.push({
        year: currentYear,
        openingBalance: yearOpen,
        principalPaid: yearPrincipal,
        interestPaid: yearInterest,
        extraPayments: yearExtra,
        totalPayments: yearTotal,
        closingBalance: row.closingBalance,
      });

      currentYear++;
      yearOpen = row.closingBalance;
      yearPrincipal = 0;
      yearInterest = 0;
      yearExtra = 0;
      yearTotal = 0;
    }
  }

  // 4. Comparison Analysis
  const interestSaved = Math.max(0, baselineTotalInterest - totalInterestPaid);
  const periodsSaved = Math.max(0, totalPeriodsScheduled - actualPeriodsCount);
  const timeSavedMonths = Math.round((periodsSaved / periodsPerYear) * 12);

  let comparison: ExtraPaymentComparison | undefined = undefined;
  if (hasExtra) {
    comparison = {
      regularPayment,
      originalDurationMonths: loanTermMonths,
      newDurationMonths: Math.round((actualPeriodsCount / periodsPerYear) * 12),
      originalTotalInterest: baselineTotalInterest,
      newTotalInterest: totalInterestPaid,
      interestSaved,
      periodsSaved,
      originalPayoffDate,
      newPayoffDate: payoffDate,
    };
  }

  return {
    loanType,
    loanAmount,
    interestRateAnnual,
    loanTermMonths,
    loanTermYears,
    paymentFrequency,
    periodsPerYear,
    totalPeriodsScheduled,
    periodicPaymentAmount: regularPayment,
    totalPrincipalPaid,
    totalInterestPaid,
    totalAmountPaid: loanAmount + totalInterestPaid,
    totalExtraPaid,
    actualPeriodsCount,
    payoffDate,
    originalPayoffDate,
    hasExtraPayments: hasExtra,
    interestSaved,
    timeSavedMonths,
    comparison,
    yearlySchedule,
    detailedSchedule,
  };
}
