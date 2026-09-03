/**
 * Comprehensive Retirement Corpus & Financial Independence (FIRE) Planning Engine
 * Supports inflation-adjusted growing annuity, accumulation with annual step-up SIP,
 * decumulation drawdown simulation, and scenario comparisons.
 */

export interface RetirementInput {
  currentAge: number;
  retirementAge: number;
  lifeExpectancyAge?: number; // default 85
  currentExpensesMonthly: number;
  expenseBasis?: 'monthly' | 'annual';
  expenseChangePercentAtRetirement?: number; // e.g. -10 for 10% lower expenses, 0 for same
  expectedInflationRateAnnual: number; // e.g. 6%
  currentSavings?: number;
  monthlyInvestment?: number;
  annualStepUpPercent?: number; // e.g. 10%
  preRetirementReturnRate: number; // e.g. 10%
  postRetirementReturnRate: number; // e.g. 7%
  otherRetirementIncomeMonthly?: number; // e.g. pension, rental
  calculationMethod?: 'inflation-adjusted' | 'withdrawal-rate' | 'desired-income';
  withdrawalRatePercent?: number; // e.g. 4%
}

export interface AccumulationYearRow {
  year: number;
  age: number;
  openingBalance: number;
  annualContribution: number;
  investmentGrowth: number;
  closingBalance: number;
}

export interface DecumulationYearRow {
  year: number;
  age: number;
  openingCorpus: number;
  investmentGrowth: number;
  annualExpenses: number;
  otherIncomeAnnual: number;
  netWithdrawal: number;
  closingCorpus: number;
  isDepleted: boolean;
}

export interface ScenarioResult {
  name: string;
  preReturn: number;
  postReturn: number;
  inflation: number;
  requiredCorpus: number;
  projectedCorpus: number;
  shortfallOrSurplus: number; // positive = surplus, negative = shortfall
}

export interface RetirementResult {
  currentAge: number;
  retirementAge: number;
  lifeExpectancyAge: number;
  yearsToRetirement: number;
  retirementDurationYears: number;
  currentExpensesMonthly: number;
  currentExpensesAnnual: number;
  expenseChangePercentAtRetirement: number;
  expectedInflationRateAnnual: number;
  preRetirementReturnRate: number;
  postRetirementReturnRate: number;
  otherRetirementIncomeMonthly: number;
  
  // Future expenses at retirement
  monthlyExpenseAtRetirement: number;
  annualExpenseAtRetirement: number;
  netMonthlyExpenseAtRetirement: number; // after subtracting other income
  netAnnualExpenseAtRetirement: number;
  
  // Corpus requirements
  totalCorpusRequired: number;
  calculationMethodUsed: 'inflation-adjusted' | 'withdrawal-rate' | 'desired-income';
  
  // Savings projections at retirement
  currentSavings: number;
  currentSavingsFutureValue: number;
  futureContributionsFutureValue: number;
  totalProjectedCorpusAtRetirement: number;
  
  // Gap analysis
  isSurplus: boolean;
  shortfallOrSurplusAmount: number; // absolute value
  additionalMonthlyInvestmentNeeded: number;
  
  // Detailed projection tables
  accumulationSchedule: AccumulationYearRow[];
  decumulationSchedule: DecumulationYearRow[];
  depletionAge: number | null; // age at which corpus reaches 0 if before life expectancy
  
  // Scenarios
  scenarios: ScenarioResult[];
}

/**
 * Calculates future value of a single lump sum: FV = PV * (1 + r)^n
 */
export function calculateFutureValueLumpSum(principal: number, annualRatePct: number, years: number): number {
  if (years <= 0 || principal <= 0) return principal;
  return principal * Math.pow(1 + annualRatePct / 100, years);
}

/**
 * Calculates future value of monthly SIP investments with optional annual step-up percentage.
 */
export function calculateSipWithStepUp(
  monthlyInvestment: number,
  annualReturnPct: number,
  years: number,
  annualStepUpPct = 0
): { futureValue: number; totalInvested: number; schedule: AccumulationYearRow[] } {
  const schedule: AccumulationYearRow[] = [];
  let balance = 0;
  let totalInvested = 0;
  let currentMonthly = monthlyInvestment;
  const monthlyRate = annualReturnPct / 12 / 100;

  for (let y = 1; y <= years; y++) {
    const openingBalance = balance;
    let yearContributions = 0;

    for (let m = 1; m <= 12; m++) {
      if (currentMonthly > 0) {
        balance += currentMonthly;
        yearContributions += currentMonthly;
        totalInvested += currentMonthly;
      }
      if (monthlyRate > 0) {
        balance += balance * monthlyRate;
      }
    }

    const investmentGrowth = balance - openingBalance - yearContributions;

    schedule.push({
      year: y,
      age: 0, // set by caller
      openingBalance,
      annualContribution: yearContributions,
      investmentGrowth,
      closingBalance: balance,
    });

    if (annualStepUpPct > 0) {
      currentMonthly += currentMonthly * (annualStepUpPct / 100);
    }
  }

  return { futureValue: balance, totalInvested, schedule };
}

/**
 * Calculates Required Retirement Corpus using growing annuity:
 * Net Expense grows at Inflation Rate during retirement, while remaining corpus earns Post-Retirement Return.
 * Real Rate of Return: r_real = (r_post - i) / (1 + i)
 */
export function calculateRequiredCorpus(
  netAnnualExpenseAtRetirement: number,
  inflationPct: number,
  postReturnPct: number,
  durationYears: number
): number {
  if (durationYears <= 0 || netAnnualExpenseAtRetirement <= 0) return 0;

  const inf = inflationPct / 100;
  const post = postReturnPct / 100;

  // Real rate of return: (post - inf) / (1 + inf)
  const realRate = (post - inf) / (1 + inf);

  if (Math.abs(realRate) < 0.00001) {
    // If post-retirement return exactly matches inflation
    return netAnnualExpenseAtRetirement * durationYears;
  }

  // Present Value of a growing annuity at beginning of retirement
  const factor = (1 - Math.pow(1 + realRate, -durationYears)) / realRate;
  return Math.max(0, netAnnualExpenseAtRetirement * factor);
}

/**
 * Calculates additional monthly investment (SIP) required to accumulate a target corpus gap over n years.
 */
export function calculateAdditionalMonthlySIP(
  targetGap: number,
  annualReturnPct: number,
  years: number,
  annualStepUpPct = 0
): number {
  if (targetGap <= 0 || years <= 0) return 0;
  
  // If no step up, use standard SIP formula
  if (annualStepUpPct === 0) {
    const r = annualReturnPct / 12 / 100;
    const n = years * 12;
    if (r === 0) return targetGap / n;
    const factor = ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    return Math.max(0, targetGap / factor);
  }

  // Binary search for accurate starting monthly investment with step-up
  let low = 1;
  let high = targetGap;
  let result = targetGap / (years * 12);

  for (let iter = 0; iter < 40; iter++) {
    const mid = (low + high) / 2;
    const { futureValue } = calculateSipWithStepUp(mid, annualReturnPct, years, annualStepUpPct);
    if (Math.abs(futureValue - targetGap) < 10) {
      result = mid;
      break;
    }
    if (futureValue < targetGap) {
      low = mid;
    } else {
      high = mid;
    }
    result = mid;
  }

  return Math.max(0, result);
}

/**
 * Master Retirement Corpus Calculation Function
 */
export function calculateRetirementCorpus(input: RetirementInput): RetirementResult {
  const currentAge = Math.max(1, input.currentAge);
  const retirementAge = Math.max(currentAge + 1, input.retirementAge);
  const lifeExpectancyAge = Math.max(retirementAge + 1, input.lifeExpectancyAge || 85);

  const yearsToRetirement = Math.max(1, retirementAge - currentAge);
  const retirementDurationYears = Math.max(1, lifeExpectancyAge - retirementAge);

  const currentExpensesMonthly = Math.max(0, input.currentExpensesMonthly);
  const currentExpensesAnnual = currentExpensesMonthly * 12;
  const expenseChangePercent = input.expenseChangePercentAtRetirement || 0;
  const inflationRate = Math.max(0, input.expectedInflationRateAnnual);
  const preReturn = Math.max(0, input.preRetirementReturnRate);
  const postReturn = Math.max(0, input.postRetirementReturnRate);
  const otherIncomeMonthly = Math.max(0, input.otherRetirementIncomeMonthly || 0);

  // Adjusted base expense: accounts for lifestyle adjustment (e.g., -10% in retirement)
  const adjustedBaseMonthly = currentExpensesMonthly * (1 + expenseChangePercent / 100);

  // Future expense at retirement age inflated by yearsToRetirement: FV = PV * (1 + i)^n
  const inflationMultiplier = Math.pow(1 + inflationRate / 100, yearsToRetirement);
  const monthlyExpenseAtRetirement = adjustedBaseMonthly * inflationMultiplier;
  const annualExpenseAtRetirement = monthlyExpenseAtRetirement * 12;

  // Net monthly expenses after subtracting other retirement income (e.g. pension)
  const netMonthlyExpenseAtRetirement = Math.max(0, monthlyExpenseAtRetirement - otherIncomeMonthly);
  const netAnnualExpenseAtRetirement = netMonthlyExpenseAtRetirement * 12;

  // Calculation Method
  const method = input.calculationMethod || 'inflation-adjusted';
  let totalCorpusRequired = 0;

  if (method === 'withdrawal-rate') {
    const swr = (input.withdrawalRatePercent || 4) / 100;
    totalCorpusRequired = swr > 0 ? netAnnualExpenseAtRetirement / swr : 0;
  } else {
    // Standard growing annuity method
    totalCorpusRequired = calculateRequiredCorpus(
      netAnnualExpenseAtRetirement,
      inflationRate,
      postReturn,
      retirementDurationYears
    );
  }

  // Pre-retirement savings & investments projection
  const currentSavings = Math.max(0, input.currentSavings || 0);
  const monthlyInvestment = Math.max(0, input.monthlyInvestment || 0);
  const annualStepUp = Math.max(0, input.annualStepUpPercent || 0);

  // 1. Accumulation Schedule (Pre-retirement)
  const accumulationSchedule: AccumulationYearRow[] = [];
  let currentBalance = currentSavings;
  let currentMonthlyContribution = monthlyInvestment;
  const monthlyPreRate = preReturn / 12 / 100;

  for (let y = 1; y <= yearsToRetirement; y++) {
    const age = currentAge + y;
    const openingBalance = currentBalance;
    let yearContribution = 0;

    for (let m = 1; m <= 12; m++) {
      if (currentMonthlyContribution > 0) {
        currentBalance += currentMonthlyContribution;
        yearContribution += currentMonthlyContribution;
      }
      if (monthlyPreRate > 0) {
        currentBalance += currentBalance * monthlyPreRate;
      }
    }

    const investmentGrowth = currentBalance - openingBalance - yearContribution;

    accumulationSchedule.push({
      year: y,
      age,
      openingBalance,
      annualContribution: yearContribution,
      investmentGrowth,
      closingBalance: currentBalance,
    });

    if (annualStepUp > 0) {
      currentMonthlyContribution += currentMonthlyContribution * (annualStepUp / 100);
    }
  }

  const totalProjectedCorpusAtRetirement = currentBalance;
  const currentSavingsFutureValue = calculateFutureValueLumpSum(currentSavings, preReturn, yearsToRetirement);
  const futureContributionsFutureValue = Math.max(0, totalProjectedCorpusAtRetirement - currentSavingsFutureValue);

  // Gap analysis
  const netGap = totalCorpusRequired - totalProjectedCorpusAtRetirement;
  const isSurplus = netGap <= 0;
  const shortfallOrSurplusAmount = Math.abs(netGap);

  const additionalMonthlyInvestmentNeeded = !isSurplus
    ? calculateAdditionalMonthlySIP(netGap, preReturn, yearsToRetirement, annualStepUp)
    : 0;

  // 2. Decumulation Schedule (Post-retirement withdrawal projection)
  const decumulationSchedule: DecumulationYearRow[] = [];
  let corpus = totalProjectedCorpusAtRetirement > 0 ? totalProjectedCorpusAtRetirement : totalCorpusRequired;
  let currentRetirementAnnualExpense = annualExpenseAtRetirement;
  let otherAnnualIncome = otherIncomeMonthly * 12;
  let depletionAge: number | null = null;

  for (let y = 1; y <= retirementDurationYears; y++) {
    const age = retirementAge + y;
    const openingCorpus = corpus;

    // Annual investment return on opening corpus
    const growth = corpus > 0 ? (corpus * (postReturn / 100)) : 0;
    const grossExpense = currentRetirementAnnualExpense;
    const netWithdrawal = Math.max(0, grossExpense - otherAnnualIncome);

    // End balance after growth and net withdrawal
    let closingCorpus = openingCorpus + growth - netWithdrawal;
    let isDepleted = false;

    if (closingCorpus <= 0.001) {
      closingCorpus = 0;
      isDepleted = true;
      if (depletionAge === null) {
        depletionAge = age;
      }
    }

    decumulationSchedule.push({
      year: y,
      age,
      openingCorpus,
      investmentGrowth: growth,
      annualExpenses: grossExpense,
      otherIncomeAnnual: otherAnnualIncome,
      netWithdrawal,
      closingCorpus,
      isDepleted,
    });

    corpus = closingCorpus;

    // Inflate expense for next year
    currentRetirementAnnualExpense += currentRetirementAnnualExpense * (inflationRate / 100);
  }

  // 3. Scenario Comparison
  const scenarios: ScenarioResult[] = [
    {
      name: 'Conservative',
      preReturn: Math.max(0, preReturn - 2),
      postReturn: Math.max(0, postReturn - 1.5),
      inflation: inflationRate + 1,
      requiredCorpus: 0,
      projectedCorpus: 0,
      shortfallOrSurplus: 0,
    },
    {
      name: 'Balanced (Current)',
      preReturn,
      postReturn,
      inflation: inflationRate,
      requiredCorpus: totalCorpusRequired,
      projectedCorpus: totalProjectedCorpusAtRetirement,
      shortfallOrSurplus: totalProjectedCorpusAtRetirement - totalCorpusRequired,
    },
    {
      name: 'Growth',
      preReturn: preReturn + 2,
      postReturn: postReturn + 1,
      inflation: Math.max(0, inflationRate - 0.5),
      requiredCorpus: 0,
      projectedCorpus: 0,
      shortfallOrSurplus: 0,
    },
  ];

  // Calculate Conservative and Growth scenarios
  for (const sc of scenarios) {
    if (sc.name !== 'Balanced (Current)') {
      const scInflatedMonthly = adjustedBaseMonthly * Math.pow(1 + sc.inflation / 100, yearsToRetirement);
      const scNetAnnual = Math.max(0, scInflatedMonthly - otherIncomeMonthly) * 12;
      sc.requiredCorpus = calculateRequiredCorpus(scNetAnnual, sc.inflation, sc.postReturn, retirementDurationYears);

      // Projected corpus with scenario pre-return
      const { futureValue: scSipFv } = calculateSipWithStepUp(monthlyInvestment, sc.preReturn, yearsToRetirement, annualStepUp);
      const scSavingsFv = calculateFutureValueLumpSum(currentSavings, sc.preReturn, yearsToRetirement);
      sc.projectedCorpus = scSavingsFv + scSipFv;
      sc.shortfallOrSurplus = sc.projectedCorpus - sc.requiredCorpus;
    }
  }

  return {
    currentAge,
    retirementAge,
    lifeExpectancyAge,
    yearsToRetirement,
    retirementDurationYears,
    currentExpensesMonthly,
    currentExpensesAnnual,
    expenseChangePercentAtRetirement: expenseChangePercent,
    expectedInflationRateAnnual: inflationRate,
    preRetirementReturnRate: preReturn,
    postRetirementReturnRate: postReturn,
    otherRetirementIncomeMonthly: otherIncomeMonthly,
    monthlyExpenseAtRetirement,
    annualExpenseAtRetirement,
    netMonthlyExpenseAtRetirement,
    netAnnualExpenseAtRetirement,
    totalCorpusRequired,
    calculationMethodUsed: method,
    currentSavings,
    currentSavingsFutureValue,
    futureContributionsFutureValue,
    totalProjectedCorpusAtRetirement,
    isSurplus,
    shortfallOrSurplusAmount,
    additionalMonthlyInvestmentNeeded,
    accumulationSchedule,
    decumulationSchedule,
    depletionAge,
    scenarios,
  };
}
