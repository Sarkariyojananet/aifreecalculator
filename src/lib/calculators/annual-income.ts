/**
 * Comprehensive Annual Income & Yearly Salary Calculation Engine
 * Supports bidirectional salary conversions, hourly-to-annual projections,
 * working weeks/unpaid leave modeling, tax estimations, and frequency breakdowns.
 */

export type AnnualIncomeMode =
  | 'hourly_to_annual' // Scenario A: Hourly Wage + Hours/Week + Working Weeks -> Gross & Net Annual
  | 'annual_to_hourly' // Scenario B: Gross Annual Income -> Required Hourly Wage
  | 'solve_hours'      // Scenario C: Desired Annual Income + Hourly Wage -> Hours/Week
  | 'solve_weeks'      // Scenario D: Desired Annual Income + Hourly Wage + Hours/Week -> Working Weeks
  | 'net_to_gross';    // Scenario E: Net Annual Income + Tax Rate -> Gross Annual Income

export interface AnnualIncomeInput {
  mode: AnnualIncomeMode;
  hourlyWage?: number;
  hoursPerWeek?: number;
  weeksPerYear?: number;
  unpaidWeeks?: number;
  grossAnnualIncome?: number;
  netAnnualIncome?: number;
  taxRatePercent?: number;
  currencySymbol?: string;
}

export interface FrequencyBreakdownRow {
  frequency: string;
  gross: number;
  tax: number;
  net: number;
}

export interface AnnualIncomeResult {
  mode: AnnualIncomeMode;
  hourlyWage: number;
  hoursPerWeek: number;
  workingWeeks: number;
  unpaidWeeks: number;
  grossAnnualIncome: number;
  taxRatePercent: number;
  taxAmount: number;
  netAnnualIncome: number;

  weeklyGross: number;
  biweeklyGross: number;
  monthlyGross: number;
  quarterlyGross: number;
  dailyGross: number;

  weeklyNet: number;
  biweeklyNet: number;
  monthlyNet: number;

  primaryResult: {
    label: string;
    value: number;
    formatted: string;
    isHourly?: boolean;
    isHours?: boolean;
    isWeeks?: boolean;
  };

  breakdown: {
    formulaTitle: string;
    formulaEquation: string;
    steps: Array<{
      stepNumber: number;
      title: string;
      formula: string;
      calculation: string;
    }>;
  };

  frequencyTable: FrequencyBreakdownRow[];
}

export interface AnnualIncomeValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate user input before performing calculations
 */
export function validateAnnualIncomeInput(input: AnnualIncomeInput): AnnualIncomeValidationResult {
  const mode = input.mode;
  const hourlyWage = input.hourlyWage;
  const hoursPerWeek = input.hoursPerWeek;
  const weeksPerYear = input.weeksPerYear;
  const unpaidWeeks = input.unpaidWeeks || 0;
  const grossAnnual = input.grossAnnualIncome;
  const netAnnual = input.netAnnualIncome;
  const taxRate = input.taxRatePercent ?? 0;

  if (taxRate < 0 || taxRate >= 100) {
    return { isValid: false, error: 'Tax rate must be between 0% and 99.99%.' };
  }

  if (unpaidWeeks < 0 || unpaidWeeks >= 52) {
    return { isValid: false, error: 'Unpaid leave weeks must be between 0 and 51.' };
  }

  if (mode === 'hourly_to_annual') {
    if (hourlyWage === undefined || isNaN(hourlyWage) || hourlyWage < 0) {
      return { isValid: false, error: 'Please enter a valid non-negative hourly wage.' };
    }
    if (hoursPerWeek === undefined || isNaN(hoursPerWeek) || hoursPerWeek <= 0 || hoursPerWeek > 168) {
      return { isValid: false, error: 'Working hours per week must be between 1 and 168.' };
    }
    const workingWeeks = (weeksPerYear ?? 52) - unpaidWeeks;
    if (workingWeeks <= 0 || workingWeeks > 52) {
      return { isValid: false, error: 'Total working weeks per year must be between 1 and 52.' };
    }
  } else if (mode === 'annual_to_hourly') {
    if (grossAnnual === undefined || isNaN(grossAnnual) || grossAnnual <= 0) {
      return { isValid: false, error: 'Gross annual income must be greater than zero.' };
    }
    if (hoursPerWeek === undefined || isNaN(hoursPerWeek) || hoursPerWeek <= 0 || hoursPerWeek > 168) {
      return { isValid: false, error: 'Working hours per week must be between 1 and 168.' };
    }
    const workingWeeks = (weeksPerYear ?? 52) - unpaidWeeks;
    if (workingWeeks <= 0 || workingWeeks > 52) {
      return { isValid: false, error: 'Total working weeks per year must be between 1 and 52.' };
    }
  } else if (mode === 'solve_hours') {
    if (grossAnnual === undefined || isNaN(grossAnnual) || grossAnnual <= 0) {
      return { isValid: false, error: 'Desired annual income must be greater than zero.' };
    }
    if (hourlyWage === undefined || isNaN(hourlyWage) || hourlyWage <= 0) {
      return { isValid: false, error: 'Hourly wage must be greater than zero.' };
    }
    const workingWeeks = (weeksPerYear ?? 52) - unpaidWeeks;
    if (workingWeeks <= 0 || workingWeeks > 52) {
      return { isValid: false, error: 'Working weeks per year must be between 1 and 52.' };
    }
  } else if (mode === 'solve_weeks') {
    if (grossAnnual === undefined || isNaN(grossAnnual) || grossAnnual <= 0) {
      return { isValid: false, error: 'Desired annual income must be greater than zero.' };
    }
    if (hourlyWage === undefined || isNaN(hourlyWage) || hourlyWage <= 0) {
      return { isValid: false, error: 'Hourly wage must be greater than zero.' };
    }
    if (hoursPerWeek === undefined || isNaN(hoursPerWeek) || hoursPerWeek <= 0 || hoursPerWeek > 168) {
      return { isValid: false, error: 'Working hours per week must be between 1 and 168.' };
    }
  } else if (mode === 'net_to_gross') {
    if (netAnnual === undefined || isNaN(netAnnual) || netAnnual <= 0) {
      return { isValid: false, error: 'Net annual income must be greater than zero.' };
    }
  }

  return { isValid: true };
}

/**
 * Round number to specified decimal places
 */
export function roundTo(num: number, decimals: number = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round((num + Number.EPSILON) * factor) / factor;
}

/**
 * Format currency with locale support
 */
export function formatCurrency(val: number, symbol: string = '₹'): string {
  const num = Number(val);
  if (isNaN(num)) return `${symbol}0.00`;
  const locale = symbol === '₹' ? 'en-IN' : 'en-US';
  const formatted = Math.abs(num).toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return num < 0 ? `-${symbol}${formatted}` : `${symbol}${formatted}`;
}

/**
 * Master Annual Income Calculation Engine
 */
export function calculateAnnualIncomeExtended(input: AnnualIncomeInput): AnnualIncomeResult {
  const validation = validateAnnualIncomeInput(input);
  if (!validation.isValid) {
    throw new Error(validation.error || 'Invalid calculation inputs');
  }

  const mode = input.mode;
  const cur = input.currencySymbol || '₹';
  const taxRate = Math.max(0, input.taxRatePercent ?? 0);
  const unpaidWeeks = Math.max(0, input.unpaidWeeks ?? 0);

  let hourlyWage = 0;
  let hoursPerWeek = input.hoursPerWeek ?? 40;
  let workingWeeks = (input.weeksPerYear ?? 52) - unpaidWeeks;
  let grossAnnual = 0;
  let netAnnual = 0;
  let taxAmount = 0;

  let primaryLabel = 'Gross Annual Income';
  let primaryValue = 0;
  let isHourly = false;
  let isHours = false;
  let isWeeks = false;

  const steps: AnnualIncomeResult['breakdown']['steps'] = [];
  let formulaTitle = '';
  let formulaEquation = '';

  switch (mode) {
    case 'hourly_to_annual': {
      // Primary: Hourly Wage × Hours/Week × Working Weeks
      hourlyWage = Number(input.hourlyWage) || 0;
      grossAnnual = hourlyWage * hoursPerWeek * workingWeeks;
      taxAmount = grossAnnual * (taxRate / 100);
      netAnnual = grossAnnual - taxAmount;

      primaryLabel = 'Gross Annual Income';
      primaryValue = grossAnnual;

      formulaTitle = 'Hourly Wage to Annual Salary Formula';
      formulaEquation = 'Annual Income = Hourly Wage × Hours per Week × Working Weeks per Year';

      steps.push({
        stepNumber: 1,
        title: 'Calculate Weekly Earnings',
        formula: 'Weekly Income = Hourly Wage × Hours per Week',
        calculation: `${formatCurrency(hourlyWage, cur)} × ${hoursPerWeek} hrs = ${formatCurrency(hourlyWage * hoursPerWeek, cur)}/week`,
      });
      steps.push({
        stepNumber: 2,
        title: 'Calculate Gross Annual Income',
        formula: 'Annual Income = Weekly Income × Working Weeks',
        calculation: `${formatCurrency(hourlyWage * hoursPerWeek, cur)} × ${workingWeeks} wks = ${formatCurrency(grossAnnual, cur)}/year`,
      });
      if (taxRate > 0) {
        steps.push({
          stepNumber: 3,
          title: 'Calculate Estimated Tax & Net Income',
          formula: 'Tax = Gross × (Rate ÷ 100);  Net = Gross - Tax',
          calculation: `${formatCurrency(grossAnnual, cur)} × (${taxRate}% ÷ 100) = ${formatCurrency(taxAmount, cur)} tax; Net Take-Home = ${formatCurrency(netAnnual, cur)}`,
        });
      }
      break;
    }

    case 'annual_to_hourly': {
      // Reverse: Annual Salary -> Hourly Wage
      grossAnnual = Number(input.grossAnnualIncome) || 0;
      hourlyWage = grossAnnual / (hoursPerWeek * workingWeeks);
      taxAmount = grossAnnual * (taxRate / 100);
      netAnnual = grossAnnual - taxAmount;

      primaryLabel = 'Equivalent Hourly Wage';
      primaryValue = hourlyWage;
      isHourly = true;

      formulaTitle = 'Annual Salary to Hourly Wage Formula';
      formulaEquation = 'Hourly Wage = Gross Annual Income ÷ (Hours per Week × Working Weeks)';

      steps.push({
        stepNumber: 1,
        title: 'Calculate Total Annual Working Hours',
        formula: 'Total Hours = Hours per Week × Working Weeks',
        calculation: `${hoursPerWeek} hrs × ${workingWeeks} wks = ${(hoursPerWeek * workingWeeks).toLocaleString()} total working hours/year`,
      });
      steps.push({
        stepNumber: 2,
        title: 'Calculate Hourly Pay Rate',
        formula: 'Hourly Wage = Annual Salary ÷ Total Working Hours',
        calculation: `${formatCurrency(grossAnnual, cur)} ÷ ${(hoursPerWeek * workingWeeks).toLocaleString()} hrs = ${formatCurrency(hourlyWage, cur)}/hr`,
      });
      if (taxRate > 0) {
        steps.push({
          stepNumber: 3,
          title: 'Calculate Net Annual Take-Home',
          formula: 'Net Annual = Gross Annual × (1 - Tax Rate ÷ 100)',
          calculation: `${formatCurrency(grossAnnual, cur)} × (1 - ${taxRate} ÷ 100) = ${formatCurrency(netAnnual, cur)}`,
        });
      }
      break;
    }

    case 'solve_hours': {
      // Reverse: Given Target Annual & Hourly Wage -> Hours/Week
      grossAnnual = Number(input.grossAnnualIncome) || 0;
      hourlyWage = Number(input.hourlyWage) || 0;
      hoursPerWeek = grossAnnual / (hourlyWage * workingWeeks);
      taxAmount = grossAnnual * (taxRate / 100);
      netAnnual = grossAnnual - taxAmount;

      primaryLabel = 'Required Hours per Week';
      primaryValue = hoursPerWeek;
      isHours = true;

      formulaTitle = 'Required Weekly Hours Formula';
      formulaEquation = 'Hours per Week = Desired Annual Income ÷ (Hourly Wage × Working Weeks)';

      steps.push({
        stepNumber: 1,
        title: 'Calculate Required Total Annual Hours',
        formula: 'Annual Hours = Desired Income ÷ Hourly Wage',
        calculation: `${formatCurrency(grossAnnual, cur)} ÷ ${formatCurrency(hourlyWage, cur)} = ${(grossAnnual / hourlyWage).toFixed(1)} hrs/year`,
      });
      steps.push({
        stepNumber: 2,
        title: 'Calculate Weekly Working Hours',
        formula: 'Hours/Week = Annual Hours ÷ Working Weeks',
        calculation: `${(grossAnnual / hourlyWage).toFixed(1)} hrs ÷ ${workingWeeks} wks = ${hoursPerWeek.toFixed(2)} hrs/week`,
      });
      break;
    }

    case 'solve_weeks': {
      // Reverse: Given Target Annual, Hourly Wage & Hours/Week -> Working Weeks
      grossAnnual = Number(input.grossAnnualIncome) || 0;
      hourlyWage = Number(input.hourlyWage) || 0;
      hoursPerWeek = Number(input.hoursPerWeek) || 40;
      workingWeeks = grossAnnual / (hourlyWage * hoursPerWeek);
      taxAmount = grossAnnual * (taxRate / 100);
      netAnnual = grossAnnual - taxAmount;

      primaryLabel = 'Required Working Weeks per Year';
      primaryValue = workingWeeks;
      isWeeks = true;

      formulaTitle = 'Required Working Weeks Formula';
      formulaEquation = 'Working Weeks = Desired Annual Income ÷ (Hourly Wage × Hours per Week)';

      steps.push({
        stepNumber: 1,
        title: 'Calculate Weekly Income',
        formula: 'Weekly Pay = Hourly Wage × Hours per Week',
        calculation: `${formatCurrency(hourlyWage, cur)} × ${hoursPerWeek} hrs = ${formatCurrency(hourlyWage * hoursPerWeek, cur)}/week`,
      });
      steps.push({
        stepNumber: 2,
        title: 'Calculate Required Weeks',
        formula: 'Working Weeks = Desired Income ÷ Weekly Pay',
        calculation: `${formatCurrency(grossAnnual, cur)} ÷ ${formatCurrency(hourlyWage * hoursPerWeek, cur)} = ${workingWeeks.toFixed(1)} weeks`,
      });
      break;
    }

    case 'net_to_gross': {
      // Reverse: Given Net Annual & Tax Rate -> Gross Annual
      netAnnual = Number(input.netAnnualIncome) || 0;
      grossAnnual = netAnnual / (1 - taxRate / 100);
      taxAmount = grossAnnual - netAnnual;
      hourlyWage = grossAnnual / (hoursPerWeek * workingWeeks);

      primaryLabel = 'Required Gross Annual Income';
      primaryValue = grossAnnual;

      formulaTitle = 'Gross Income from Net Take-Home Formula';
      formulaEquation = 'Gross Annual Income = Net Annual Income ÷ (1 - Tax Rate ÷ 100)';

      steps.push({
        stepNumber: 1,
        title: 'Calculate Required Gross Annual Salary',
        formula: 'Gross = Net ÷ (1 - Tax Rate ÷ 100)',
        calculation: `${formatCurrency(netAnnual, cur)} ÷ (1 - ${taxRate} ÷ 100) = ${formatCurrency(grossAnnual, cur)}`,
      });
      steps.push({
        stepNumber: 2,
        title: 'Calculate Tax Deductions',
        formula: 'Tax = Gross - Net',
        calculation: `${formatCurrency(grossAnnual, cur)} - ${formatCurrency(netAnnual, cur)} = ${formatCurrency(taxAmount, cur)}`,
      });
      steps.push({
        stepNumber: 3,
        title: 'Equivalent Hourly Wage',
        formula: 'Hourly Wage = Gross ÷ (Hours/Week × Weeks)',
        calculation: `${formatCurrency(grossAnnual, cur)} ÷ (${hoursPerWeek} × ${workingWeeks}) = ${formatCurrency(hourlyWage, cur)}/hr`,
      });
      break;
    }
  }

  // Periodic Salary Breakdown Conversions
  const weeklyGross = hourlyWage * hoursPerWeek;
  const biweeklyGross = weeklyGross * 2;
  const monthlyGross = grossAnnual / 12;
  const quarterlyGross = grossAnnual / 4;
  const dailyGross = hoursPerWeek > 0 ? weeklyGross / (hoursPerWeek / 8) : hourlyWage * 8;

  const weeklyNet = workingWeeks > 0 ? netAnnual / workingWeeks : 0;
  const biweeklyNet = weeklyNet * 2;
  const monthlyNet = netAnnual / 12;

  // Multi-Frequency Comparison Table Rows
  const frequencyTable: FrequencyBreakdownRow[] = [
    {
      frequency: 'Hourly',
      gross: roundTo(hourlyWage, 2),
      tax: roundTo(hourlyWage * (taxRate / 100), 2),
      net: roundTo(hourlyWage * (1 - taxRate / 100), 2),
    },
    {
      frequency: 'Daily (8 hrs)',
      gross: roundTo(hourlyWage * 8, 2),
      tax: roundTo(hourlyWage * 8 * (taxRate / 100), 2),
      net: roundTo(hourlyWage * 8 * (1 - taxRate / 100), 2),
    },
    {
      frequency: 'Weekly',
      gross: roundTo(weeklyGross, 2),
      tax: roundTo(weeklyGross * (taxRate / 100), 2),
      net: roundTo(weeklyGross * (1 - taxRate / 100), 2),
    },
    {
      frequency: 'Bi-Weekly (Every 2 weeks)',
      gross: roundTo(biweeklyGross, 2),
      tax: roundTo(biweeklyGross * (taxRate / 100), 2),
      net: roundTo(biweeklyGross * (1 - taxRate / 100), 2),
    },
    {
      frequency: 'Monthly (Average)',
      gross: roundTo(monthlyGross, 2),
      tax: roundTo(monthlyGross * (taxRate / 100), 2),
      net: roundTo(monthlyNet, 2),
    },
    {
      frequency: 'Quarterly',
      gross: roundTo(quarterlyGross, 2),
      tax: roundTo(quarterlyGross * (taxRate / 100), 2),
      net: roundTo(quarterlyGross * (1 - taxRate / 100), 2),
    },
    {
      frequency: 'Annual',
      gross: roundTo(grossAnnual, 2),
      tax: roundTo(taxAmount, 2),
      net: roundTo(netAnnual, 2),
    },
  ];

  return {
    mode,
    hourlyWage: roundTo(hourlyWage, 2),
    hoursPerWeek: roundTo(hoursPerWeek, 2),
    workingWeeks: roundTo(workingWeeks, 2),
    unpaidWeeks: roundTo(unpaidWeeks, 2),
    grossAnnualIncome: roundTo(grossAnnual, 2),
    taxRatePercent: roundTo(taxRate, 2),
    taxAmount: roundTo(taxAmount, 2),
    netAnnualIncome: roundTo(netAnnual, 2),

    weeklyGross: roundTo(weeklyGross, 2),
    biweeklyGross: roundTo(biweeklyGross, 2),
    monthlyGross: roundTo(monthlyGross, 2),
    quarterlyGross: roundTo(quarterlyGross, 2),
    dailyGross: roundTo(dailyGross, 2),

    weeklyNet: roundTo(weeklyNet, 2),
    biweeklyNet: roundTo(biweeklyNet, 2),
    monthlyNet: roundTo(monthlyNet, 2),

    primaryResult: {
      label: primaryLabel,
      value: roundTo(primaryValue, 2),
      formatted: isHourly
        ? `${formatCurrency(primaryValue, cur)}/hr`
        : isHours
        ? `${roundTo(primaryValue, 1)} hrs/week`
        : isWeeks
        ? `${roundTo(primaryValue, 1)} weeks/year`
        : formatCurrency(primaryValue, cur),
      isHourly,
      isHours,
      isWeeks,
    },
    breakdown: {
      formulaTitle,
      formulaEquation,
      steps,
    },
    frequencyTable,
  };
}
