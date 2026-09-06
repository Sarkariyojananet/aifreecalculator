/**
 * XIRR (Extended Internal Rate of Return) Calculation Engine
 *
 * Implements the standard financial XIRR equation based on actual calendar day differences:
 *   Σ [ CashFlow_i / (1 + r)^((Date_i - Date_0) / 365) ] = 0
 *
 * Solved via a hybrid numerical method:
 *   1. Newton-Raphson with multiple starting points
 *   2. Bracketed Bisection fallback over [-0.99, 100.0]
 */

export type XirrFrequency = '14days' | 'monthly' | 'quarterly' | 'halfyearly' | 'yearly';

export interface CashFlowItem {
  index?: number;
  date: string; // YYYY-MM-DD
  type: 'investment' | 'maturity' | 'inflow' | 'outflow';
  amount: number; // Negative for investments/outflows, positive for returns/inflows
  cumulativeInvested?: number;
}

export interface XirrRecurringInput {
  frequency: XirrFrequency;
  startDate: string; // YYYY-MM-DD
  maturityDate: string; // YYYY-MM-DD
  recurringAmount: number;
  maturityAmount: number;
}

export interface XirrResult {
  xirrRate: number | null; // e.g. 0.38919
  xirrPercent: number | null; // e.g. 38.92
  formattedXirr: string; // e.g. "38.92% p.a."
  totalInvested: number;
  maturityAmount: number;
  netProfit: number;
  absoluteReturnPercent: number;
  investmentCount: number;
  durationDays: number;
  durationYears: number;
  frequency?: XirrFrequency;
  frequencyLabel?: string;
  startDate: string;
  maturityDate: string;
  cashFlows: CashFlowItem[];
  converged: boolean;
  isPositive: boolean;
  errorMessage?: string;
}

export const FREQUENCY_LABELS: Record<XirrFrequency, string> = {
  '14days': 'Every 14 Days',
  'monthly': 'Monthly',
  'quarterly': 'Quarterly',
  'halfyearly': 'Half Yearly',
  'yearly': 'Yearly',
};

/**
 * Format a Date object to YYYY-MM-DD using local calendar components.
 */
export function formatDateLocal(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * Parse YYYY-MM-DD string into UTC timestamp in milliseconds.
 */
export function parseDateUtc(dateStr: string): number {
  if (!dateStr || typeof dateStr !== 'string') return NaN;
  const parts = dateStr.split('-').map((p) => parseInt(p, 10));
  if (parts.length < 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
    return NaN;
  }
  return Date.UTC(parts[0], parts[1] - 1, parts[2]);
}

/**
 * Return exact day difference (d2 - d1) between two YYYY-MM-DD dates.
 */
export function getDayDiff(d1Str: string, d2Str: string): number {
  const t1 = parseDateUtc(d1Str);
  const t2 = parseDateUtc(d2Str);
  if (isNaN(t1) || isNaN(t2)) return 0;
  return Math.round((t2 - t1) / (1000 * 60 * 60 * 24));
}

/**
 * Generates regular recurring investment cash flows up to (but not including) the maturity date,
 * and appends the final positive maturity inflow at the maturity date.
 */
export function generateRecurringCashFlows(input: XirrRecurringInput): CashFlowItem[] {
  const { frequency, startDate, maturityDate, recurringAmount, maturityAmount } = input;

  const tStart = parseDateUtc(startDate);
  const tMaturity = parseDateUtc(maturityDate);

  if (isNaN(tStart) || isNaN(tMaturity) || tMaturity <= tStart) {
    throw new Error('Maturity date must be strictly after Start date.');
  }

  const recAmt = Math.abs(Number(recurringAmount) || 0);
  const matAmt = Math.abs(Number(maturityAmount) || 0);

  if (recAmt <= 0) {
    throw new Error('Recurring investment amount must be greater than zero.');
  }
  if (matAmt <= 0) {
    throw new Error('Maturity amount must be greater than zero.');
  }

  const startParts = startDate.split('-').map((p) => parseInt(p, 10));
  const startYear = startParts[0];
  const startMonth = startParts[1] - 1; // 0-indexed
  const startDay = startParts[2];

  const cashFlows: CashFlowItem[] = [];
  let count = 0;
  let runningCumulative = 0;

  let currentDateStr = startDate;
  let currentUtc = tStart;

  const freqNorm = String(frequency || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  while (currentUtc < tMaturity) {
    if (count > 5000) break; // Safety cutoff against infinite loop

    runningCumulative += recAmt;
    cashFlows.push({
      index: count + 1,
      date: currentDateStr,
      type: 'investment',
      amount: -recAmt,
      cumulativeInvested: Math.round((runningCumulative + Number.EPSILON) * 100) / 100,
    });

    count++;

    if (freqNorm === '14days') {
      const nextMs = tStart + count * 14 * 24 * 60 * 60 * 1000;
      const d = new Date(nextMs);
      const y = d.getUTCFullYear();
      const m = String(d.getUTCMonth() + 1).padStart(2, '0');
      const day = String(d.getUTCDate()).padStart(2, '0');
      currentDateStr = `${y}-${m}-${day}`;
      currentUtc = nextMs;
    } else if (freqNorm === 'quarterly') {
      const targetMonthTotal = startMonth + count * 3;
      const targetYear = startYear + Math.floor(targetMonthTotal / 12);
      const targetMonth = targetMonthTotal % 12;
      const daysInTargetMonth = new Date(Date.UTC(targetYear, targetMonth + 1, 0)).getUTCDate();
      const actualDay = Math.min(startDay, daysInTargetMonth);
      currentDateStr = `${targetYear}-${String(targetMonth + 1).padStart(2, '0')}-${String(actualDay).padStart(2, '0')}`;
      currentUtc = parseDateUtc(currentDateStr);
    } else if (freqNorm === 'halfyearly') {
      const targetMonthTotal = startMonth + count * 6;
      const targetYear = startYear + Math.floor(targetMonthTotal / 12);
      const targetMonth = targetMonthTotal % 12;
      const daysInTargetMonth = new Date(Date.UTC(targetYear, targetMonth + 1, 0)).getUTCDate();
      const actualDay = Math.min(startDay, daysInTargetMonth);
      currentDateStr = `${targetYear}-${String(targetMonth + 1).padStart(2, '0')}-${String(actualDay).padStart(2, '0')}`;
      currentUtc = parseDateUtc(currentDateStr);
    } else if (freqNorm === 'yearly') {
      const targetYear = startYear + count;
      const daysInTargetMonth = new Date(Date.UTC(targetYear, startMonth + 1, 0)).getUTCDate();
      const actualDay = Math.min(startDay, daysInTargetMonth);
      currentDateStr = `${targetYear}-${String(startMonth + 1).padStart(2, '0')}-${String(actualDay).padStart(2, '0')}`;
      currentUtc = parseDateUtc(currentDateStr);
    } else {
      // Default: monthly
      const targetMonthTotal = startMonth + count;
      const targetYear = startYear + Math.floor(targetMonthTotal / 12);
      const targetMonth = targetMonthTotal % 12;
      const daysInTargetMonth = new Date(Date.UTC(targetYear, targetMonth + 1, 0)).getUTCDate();
      const actualDay = Math.min(startDay, daysInTargetMonth);
      currentDateStr = `${targetYear}-${String(targetMonth + 1).padStart(2, '0')}-${String(actualDay).padStart(2, '0')}`;
      currentUtc = parseDateUtc(currentDateStr);
    }
  }

  // Final maturity cash flow on maturityDate
  cashFlows.push({
    index: cashFlows.length + 1,
    date: maturityDate,
    type: 'maturity',
    amount: matAmt,
    cumulativeInvested: Math.round((runningCumulative + Number.EPSILON) * 100) / 100,
  });

  return cashFlows;
}

/**
 * Pure numerical XIRR solver for an arbitrary list of cash flows.
 */
export function solveXirrRate(cashFlows: CashFlowItem[]): number | null {
  if (!cashFlows || cashFlows.length < 2) return null;

  // 1. Sort cash flows chronologically
  const sorted = [...cashFlows].sort((a, b) => {
    return parseDateUtc(a.date) - parseDateUtc(b.date);
  });

  const hasPos = sorted.some((c) => c.amount > 0);
  const hasNeg = sorted.some((c) => c.amount < 0);
  if (!hasPos || !hasNeg) return null;

  const t0 = parseDateUtc(sorted[0].date);
  const times = sorted.map((c) => ({
    amount: c.amount,
    t: (parseDateUtc(c.date) - t0) / (86400000 * 365),
  }));

  const totalDuration = times[times.length - 1].t;
  if (totalDuration <= 0) return null;

  // NPV function at rate r
  function npv(r: number): number {
    if (r <= -1) return Infinity;
    let sum = 0;
    for (let i = 0; i < times.length; i++) {
      const { amount, t } = times[i];
      sum += amount / Math.pow(1 + r, t);
    }
    return sum;
  }

  // Derivative d(NPV)/dr
  function dnpv(r: number): number {
    if (r <= -1) return Infinity;
    let sum = 0;
    for (let i = 0; i < times.length; i++) {
      const { amount, t } = times[i];
      sum -= (t * amount) / Math.pow(1 + r, t + 1);
    }
    return sum;
  }

  // 1. Multi-guess Newton-Raphson
  const startingGuesses = [0.1, 0.05, 0.25, 0.0, -0.1, 0.5, 1.0, -0.5, 2.0, 5.0];
  for (const guess of startingGuesses) {
    let r = guess;
    for (let iter = 0; iter < 100; iter++) {
      const val = npv(r);
      if (Math.abs(val) < 1e-6) return r;

      const dval = dnpv(r);
      if (Math.abs(dval) < 1e-12) break;

      const nextR = r - val / dval;
      if (nextR <= -0.999) {
        r = (r - 0.999) / 2;
      } else {
        if (Math.abs(nextR - r) < 1e-7 && Math.abs(npv(nextR)) < 1e-4) {
          return nextR;
        }
        r = nextR;
      }
    }
  }

  // 2. Bracketed Bisection Fallback
  const brackets = [-0.99, -0.7, -0.4, -0.1, 0.0, 0.1, 0.25, 0.5, 1.0, 2.5, 5.0, 15.0, 50.0, 100.0];
  for (let i = 0; i < brackets.length - 1; i++) {
    let low = brackets[i];
    let high = brackets[i + 1];
    let fLow = npv(low);
    let fHigh = npv(high);

    if (fLow * fHigh <= 0) {
      for (let iter = 0; iter < 100; iter++) {
        const mid = (low + high) / 2;
        const fMid = npv(mid);
        if (Math.abs(fMid) < 1e-6 || (high - low) / 2 < 1e-7) {
          return mid;
        }
        if (fLow * fMid <= 0) {
          high = mid;
          fHigh = fMid;
        } else {
          low = mid;
          fLow = fMid;
        }
      }
    }
  }

  return null;
}

/**
 * Calculates comprehensive XIRR analysis for recurring investments.
 */
export function calculateRecurringXirr(input: XirrRecurringInput): XirrResult {
  const cashFlows = generateRecurringCashFlows(input);

  const totalInvested = cashFlows
    .filter((c) => c.amount < 0)
    .reduce((acc, c) => acc + Math.abs(c.amount), 0);

  const maturityAmount = cashFlows
    .filter((c) => c.amount > 0)
    .reduce((acc, c) => acc + c.amount, 0);

  const investmentCount = cashFlows.filter((c) => c.amount < 0).length;
  const netProfit = maturityAmount - totalInvested;
  const absoluteReturnPercent = totalInvested > 0 ? (netProfit / totalInvested) * 100 : 0;

  const durationDays = getDayDiff(input.startDate, input.maturityDate);
  const durationYears = Math.round((durationDays / 365 + Number.EPSILON) * 100) / 100;

  const rate = solveXirrRate(cashFlows);
  const converged = rate !== null && !isNaN(rate);
  const xirrPercent = converged ? Math.round((rate! * 100 + Number.EPSILON) * 100) / 100 : null;

  return {
    xirrRate: rate,
    xirrPercent,
    formattedXirr: converged ? `${xirrPercent!.toFixed(2)}% p.a.` : 'Unable to converge',
    totalInvested: Math.round((totalInvested + Number.EPSILON) * 100) / 100,
    maturityAmount: Math.round((maturityAmount + Number.EPSILON) * 100) / 100,
    netProfit: Math.round((netProfit + Number.EPSILON) * 100) / 100,
    absoluteReturnPercent: Math.round((absoluteReturnPercent + Number.EPSILON) * 100) / 100,
    investmentCount,
    durationDays,
    durationYears,
    frequency: input.frequency,
    frequencyLabel: FREQUENCY_LABELS[input.frequency],
    startDate: input.startDate,
    maturityDate: input.maturityDate,
    cashFlows,
    converged,
    isPositive: converged && xirrPercent !== null && xirrPercent > 0,
    errorMessage: converged ? undefined : 'Calculation could not converge to a valid annualized return.',
  };
}

/**
 * Calculates comprehensive XIRR analysis for custom irregular cash flows.
 */
export function calculateCustomXirr(cashFlows: CashFlowItem[]): XirrResult {
  if (!cashFlows || cashFlows.length < 2) {
    throw new Error('At least two cash flows (one outflow and one inflow) are required.');
  }

  const sorted = [...cashFlows].sort((a, b) => parseDateUtc(a.date) - parseDateUtc(b.date));

  const totalInvested = sorted
    .filter((c) => c.amount < 0)
    .reduce((acc, c) => acc + Math.abs(c.amount), 0);

  const maturityAmount = sorted
    .filter((c) => c.amount > 0)
    .reduce((acc, c) => acc + c.amount, 0);

  if (totalInvested <= 0) {
    throw new Error('Please include at least one negative cash flow (investment/outflow).');
  }
  if (maturityAmount <= 0) {
    throw new Error('Please include at least one positive cash flow (maturity/inflow).');
  }

  const investmentCount = sorted.filter((c) => c.amount < 0).length;
  const netProfit = maturityAmount - totalInvested;
  const absoluteReturnPercent = totalInvested > 0 ? (netProfit / totalInvested) * 100 : 0;

  const startDate = sorted[0].date;
  const maturityDate = sorted[sorted.length - 1].date;
  const durationDays = getDayDiff(startDate, maturityDate);
  const durationYears = Math.round((durationDays / 365 + Number.EPSILON) * 100) / 100;

  // Add running cumulative invested amounts
  let cum = 0;
  const enrichedFlows: CashFlowItem[] = sorted.map((cf, idx) => {
    if (cf.amount < 0) {
      cum += Math.abs(cf.amount);
    }
    return {
      ...cf,
      index: idx + 1,
      cumulativeInvested: Math.round((cum + Number.EPSILON) * 100) / 100,
    };
  });

  const rate = solveXirrRate(sorted);
  const converged = rate !== null && !isNaN(rate);
  const xirrPercent = converged ? Math.round((rate! * 100 + Number.EPSILON) * 100) / 100 : null;

  return {
    xirrRate: rate,
    xirrPercent,
    formattedXirr: converged ? `${xirrPercent!.toFixed(2)}% p.a.` : 'Unable to converge',
    totalInvested: Math.round((totalInvested + Number.EPSILON) * 100) / 100,
    maturityAmount: Math.round((maturityAmount + Number.EPSILON) * 100) / 100,
    netProfit: Math.round((netProfit + Number.EPSILON) * 100) / 100,
    absoluteReturnPercent: Math.round((absoluteReturnPercent + Number.EPSILON) * 100) / 100,
    investmentCount,
    durationDays,
    durationYears,
    startDate,
    maturityDate,
    cashFlows: enrichedFlows,
    converged,
    isPositive: converged && xirrPercent !== null && xirrPercent > 0,
    errorMessage: converged ? undefined : 'Calculation could not converge to a valid annualized return.',
  };
}
