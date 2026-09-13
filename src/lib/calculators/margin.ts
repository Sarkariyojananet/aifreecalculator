/**
 * Comprehensive Margin, Profit & Selling Price Calculation Engine
 * Supports 5 bidirectional calculation modes, margin vs markup analysis,
 * robust mathematical validation, step-by-step derivations, and comparison matrices.
 */

export type MarginCalculationMode =
  | 'cost_margin'      // Scenario A: Cost + Desired Margin -> Find Selling Price & Profit
  | 'cost_revenue'     // Scenario B: Cost + Revenue -> Find Profit & Margin %
  | 'revenue_margin'   // Scenario C: Revenue + Margin -> Find Cost & Profit
  | 'revenue_profit'   // Scenario D: Revenue + Profit -> Find Cost & Margin %
  | 'cost_profit'      // Scenario E: Cost + Profit -> Find Revenue & Margin %
  | 'profit_margin';   // Scenario F: Profit + Margin -> Find Revenue & Cost

export interface MarginCalculationInput {
  mode: MarginCalculationMode;
  cost?: number;
  revenue?: number;
  profit?: number;
  margin?: number; // In percent, e.g. 40 for 40%
  currencySymbol?: string;
}

export interface MarginComparisonRow {
  marginPercent: number;
  sellingPrice: number;
  profit: number;
  markupPercent: number;
  isCurrent: boolean;
}

export interface MarginResult {
  mode: MarginCalculationMode;
  cost: number;
  revenue: number;
  profit: number;
  marginPercent: number;
  markupPercent: number;

  primaryResult: {
    label: string;
    value: number;
    formatted: string;
    isPercentage?: boolean;
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

  comparisonTable: MarginComparisonRow[];
}

export interface MarginValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate inputs before performing calculations
 */
export function validateMarginInput(input: MarginCalculationInput): MarginValidationResult {
  const mode = input.mode;
  const cost = input.cost;
  const revenue = input.revenue;
  const profit = input.profit;
  const margin = input.margin;

  if (mode === 'cost_margin') {
    if (cost === undefined || isNaN(cost) || cost < 0) {
      return { isValid: false, error: 'Cost must be a non-negative number.' };
    }
    if (margin === undefined || isNaN(margin)) {
      return { isValid: false, error: 'Please enter a valid profit margin percentage.' };
    }
    if (margin < 0) {
      return { isValid: false, error: 'Profit margin cannot be negative for standard pricing.' };
    }
    if (margin >= 100) {
      return { isValid: false, error: 'Profit margin must be strictly less than 100%. A 100% margin requires infinite revenue (division by zero).' };
    }
  } else if (mode === 'cost_revenue') {
    if (cost === undefined || isNaN(cost) || cost < 0) {
      return { isValid: false, error: 'Cost must be a non-negative number.' };
    }
    if (revenue === undefined || isNaN(revenue) || revenue < 0) {
      return { isValid: false, error: 'Revenue / Selling Price must be a non-negative number.' };
    }
    if (revenue === 0) {
      return { isValid: false, error: 'Selling Price cannot be zero when calculating profit margin (division by zero).' };
    }
  } else if (mode === 'revenue_margin') {
    if (revenue === undefined || isNaN(revenue) || revenue <= 0) {
      return { isValid: false, error: 'Revenue / Selling Price must be greater than zero.' };
    }
    if (margin === undefined || isNaN(margin)) {
      return { isValid: false, error: 'Please enter a valid profit margin percentage.' };
    }
    if (margin < 0 || margin >= 100) {
      return { isValid: false, error: 'Profit margin must be between 0% and 99.99%.' };
    }
  } else if (mode === 'revenue_profit') {
    if (revenue === undefined || isNaN(revenue) || revenue <= 0) {
      return { isValid: false, error: 'Revenue / Selling Price must be greater than zero.' };
    }
    if (profit === undefined || isNaN(profit)) {
      return { isValid: false, error: 'Please enter a valid profit amount.' };
    }
    if (profit > revenue) {
      return { isValid: false, error: 'Profit cannot exceed total revenue (cost cannot be negative).' };
    }
  } else if (mode === 'cost_profit') {
    if (cost === undefined || isNaN(cost) || cost < 0) {
      return { isValid: false, error: 'Cost must be a non-negative number.' };
    }
    if (profit === undefined || isNaN(profit)) {
      return { isValid: false, error: 'Please enter a valid profit amount.' };
    }
    if (cost + profit <= 0) {
      return { isValid: false, error: 'Total revenue (Cost + Profit) must be greater than zero.' };
    }
  } else if (mode === 'profit_margin') {
    if (profit === undefined || isNaN(profit) || profit <= 0) {
      return { isValid: false, error: 'Profit must be greater than zero.' };
    }
    if (margin === undefined || isNaN(margin) || margin <= 0 || margin >= 100) {
      return { isValid: false, error: 'Margin must be greater than 0% and less than 100%.' };
    }
  }

  return { isValid: true };
}

/**
 * Helper to round to specified decimal places
 */
export function roundTo(num: number, decimals: number = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round((num + Number.EPSILON) * factor) / factor;
}

/**
 * Currency formatter with locale support
 */
export function formatCurrencyValue(val: number, symbol: string = '₹'): string {
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
 * Master Margin Calculation Engine
 */
export function calculateMarginExtended(input: MarginCalculationInput): MarginResult {
  const validation = validateMarginInput(input);
  if (!validation.isValid) {
    throw new Error(validation.error || 'Invalid calculation inputs');
  }

  const mode = input.mode;
  const cur = input.currencySymbol || '₹';

  let cost = 0;
  let revenue = 0;
  let profit = 0;
  let marginPercent = 0;
  let markupPercent = 0;

  let primaryLabel = 'Selling Price / Revenue';
  let primaryValue = 0;
  let isPrimaryPercent = false;

  const steps: MarginResult['breakdown']['steps'] = [];
  let formulaTitle = '';
  let formulaEquation = '';

  switch (mode) {
    case 'cost_margin': {
      // Scenario A: Cost + Desired Margin -> Selling Price & Profit
      cost = Number(input.cost) || 0;
      marginPercent = Number(input.margin) || 0;

      revenue = cost / (1 - marginPercent / 100);
      profit = revenue - cost;
      markupPercent = cost > 0 ? (profit / cost) * 100 : 0;

      primaryLabel = 'Selling Price / Revenue';
      primaryValue = revenue;
      isPrimaryPercent = false;

      formulaTitle = 'Selling Price from Cost & Desired Margin Formula';
      formulaEquation = 'Revenue = Cost ÷ (1 - Margin ÷ 100);  Profit = Revenue - Cost';

      steps.push({
        stepNumber: 1,
        title: 'Calculate Revenue / Selling Price',
        formula: 'Revenue = Cost ÷ (1 - Margin ÷ 100)',
        calculation: `${formatCurrencyValue(cost, cur)} ÷ (1 - ${marginPercent} ÷ 100) = ${formatCurrencyValue(cost, cur)} ÷ ${(1 - marginPercent / 100).toFixed(4)} = ${formatCurrencyValue(revenue, cur)}`,
      });
      steps.push({
        stepNumber: 2,
        title: 'Calculate Profit',
        formula: 'Profit = Revenue - Cost',
        calculation: `${formatCurrencyValue(revenue, cur)} - ${formatCurrencyValue(cost, cur)} = ${formatCurrencyValue(profit, cur)}`,
      });
      steps.push({
        stepNumber: 3,
        title: 'Equivalent Markup Comparison',
        formula: 'Markup (%) = (Profit ÷ Cost) × 100',
        calculation: `(${formatCurrencyValue(profit, cur)} ÷ ${formatCurrencyValue(cost, cur)}) × 100 = ${roundTo(markupPercent, 2)}%`,
      });
      break;
    }

    case 'cost_revenue': {
      // Scenario B: Cost + Revenue -> Profit & Margin %
      cost = Number(input.cost) || 0;
      revenue = Number(input.revenue) || 0;

      profit = revenue - cost;
      marginPercent = revenue > 0 ? (profit / revenue) * 100 : 0;
      markupPercent = cost > 0 ? (profit / cost) * 100 : 0;

      primaryLabel = 'Profit Margin';
      primaryValue = marginPercent;
      isPrimaryPercent = true;

      formulaTitle = 'Profit Margin from Cost & Revenue Formula';
      formulaEquation = 'Profit = Revenue - Cost;  Margin (%) = (Profit ÷ Revenue) × 100';

      steps.push({
        stepNumber: 1,
        title: 'Calculate Profit',
        formula: 'Profit = Revenue - Cost',
        calculation: `${formatCurrencyValue(revenue, cur)} - ${formatCurrencyValue(cost, cur)} = ${formatCurrencyValue(profit, cur)}`,
      });
      steps.push({
        stepNumber: 2,
        title: 'Calculate Profit Margin (%)',
        formula: 'Margin (%) = (Profit ÷ Revenue) × 100',
        calculation: `(${formatCurrencyValue(profit, cur)} ÷ ${formatCurrencyValue(revenue, cur)}) × 100 = ${roundTo(marginPercent, 2)}%`,
      });
      steps.push({
        stepNumber: 3,
        title: 'Calculate Markup (%)',
        formula: 'Markup (%) = (Profit ÷ Cost) × 100',
        calculation: cost > 0
          ? `(${formatCurrencyValue(profit, cur)} ÷ ${formatCurrencyValue(cost, cur)}) × 100 = ${roundTo(markupPercent, 2)}%`
          : 'N/A (Cost is 0)',
      });
      break;
    }

    case 'revenue_margin': {
      // Scenario C: Revenue + Margin -> Cost & Profit
      revenue = Number(input.revenue) || 0;
      marginPercent = Number(input.margin) || 0;

      profit = (revenue * marginPercent) / 100;
      cost = revenue - profit;
      markupPercent = cost > 0 ? (profit / cost) * 100 : 0;

      primaryLabel = 'Allowable Cost (COGS)';
      primaryValue = cost;
      isPrimaryPercent = false;

      formulaTitle = 'Cost & Profit from Revenue & Desired Margin';
      formulaEquation = 'Profit = Revenue × (Margin ÷ 100);  Cost = Revenue - Profit';

      steps.push({
        stepNumber: 1,
        title: 'Calculate Target Profit',
        formula: 'Profit = Revenue × (Margin ÷ 100)',
        calculation: `${formatCurrencyValue(revenue, cur)} × (${marginPercent} ÷ 100) = ${formatCurrencyValue(profit, cur)}`,
      });
      steps.push({
        stepNumber: 2,
        title: 'Determine Allowable Cost / COGS',
        formula: 'Cost = Revenue - Profit',
        calculation: `${formatCurrencyValue(revenue, cur)} - ${formatCurrencyValue(profit, cur)} = ${formatCurrencyValue(cost, cur)}`,
      });
      break;
    }

    case 'revenue_profit': {
      // Scenario D: Revenue + Profit -> Cost & Margin %
      revenue = Number(input.revenue) || 0;
      profit = Number(input.profit) || 0;

      cost = revenue - profit;
      marginPercent = revenue > 0 ? (profit / revenue) * 100 : 0;
      markupPercent = cost > 0 ? (profit / cost) * 100 : 0;

      primaryLabel = 'Cost & Margin %';
      primaryValue = cost;
      isPrimaryPercent = false;

      formulaTitle = 'Cost and Margin from Revenue and Profit';
      formulaEquation = 'Cost = Revenue - Profit;  Margin (%) = (Profit ÷ Revenue) × 100';

      steps.push({
        stepNumber: 1,
        title: 'Calculate Cost of Goods Sold (COGS)',
        formula: 'Cost = Revenue - Profit',
        calculation: `${formatCurrencyValue(revenue, cur)} - ${formatCurrencyValue(profit, cur)} = ${formatCurrencyValue(cost, cur)}`,
      });
      steps.push({
        stepNumber: 2,
        title: 'Calculate Profit Margin (%)',
        formula: 'Margin (%) = (Profit ÷ Revenue) × 100',
        calculation: `(${formatCurrencyValue(profit, cur)} ÷ ${formatCurrencyValue(revenue, cur)}) × 100 = ${roundTo(marginPercent, 2)}%`,
      });
      break;
    }

    case 'cost_profit': {
      // Scenario E: Cost + Profit -> Revenue & Margin %
      cost = Number(input.cost) || 0;
      profit = Number(input.profit) || 0;

      revenue = cost + profit;
      marginPercent = revenue > 0 ? (profit / revenue) * 100 : 0;
      markupPercent = cost > 0 ? (profit / cost) * 100 : 0;

      primaryLabel = 'Selling Price / Revenue';
      primaryValue = revenue;
      isPrimaryPercent = false;

      formulaTitle = 'Selling Price and Margin from Cost and Profit';
      formulaEquation = 'Revenue = Cost + Profit;  Margin (%) = (Profit ÷ Revenue) × 100';

      steps.push({
        stepNumber: 1,
        title: 'Calculate Total Revenue / Selling Price',
        formula: 'Revenue = Cost + Profit',
        calculation: `${formatCurrencyValue(cost, cur)} + ${formatCurrencyValue(profit, cur)} = ${formatCurrencyValue(revenue, cur)}`,
      });
      steps.push({
        stepNumber: 2,
        title: 'Calculate Resulting Profit Margin (%)',
        formula: 'Margin (%) = (Profit ÷ Revenue) × 100',
        calculation: `(${formatCurrencyValue(profit, cur)} ÷ ${formatCurrencyValue(revenue, cur)}) × 100 = ${roundTo(marginPercent, 2)}%`,
      });
      break;
    }

    case 'profit_margin': {
      // Scenario F: Profit + Margin -> Revenue & Cost
      profit = Number(input.profit) || 0;
      marginPercent = Number(input.margin) || 0;

      revenue = profit / (marginPercent / 100);
      cost = revenue - profit;
      markupPercent = cost > 0 ? (profit / cost) * 100 : 0;

      primaryLabel = 'Selling Price / Revenue';
      primaryValue = revenue;
      isPrimaryPercent = false;

      formulaTitle = 'Revenue and Cost from Target Profit and Margin';
      formulaEquation = 'Revenue = Profit ÷ (Margin ÷ 100);  Cost = Revenue - Profit';

      steps.push({
        stepNumber: 1,
        title: 'Calculate Required Revenue',
        formula: 'Revenue = Profit ÷ (Margin ÷ 100)',
        calculation: `${formatCurrencyValue(profit, cur)} ÷ (${marginPercent} ÷ 100) = ${formatCurrencyValue(revenue, cur)}`,
      });
      steps.push({
        stepNumber: 2,
        title: 'Calculate Allowed Cost',
        formula: 'Cost = Revenue - Profit',
        calculation: `${formatCurrencyValue(revenue, cur)} - ${formatCurrencyValue(profit, cur)} = ${formatCurrencyValue(cost, cur)}`,
      });
      break;
    }
  }

  // Generate Comparison Matrix based on standard margin tiers
  // Tiers: 10%, 15%, 20%, 25%, 30%, 40%, 50%, 60%
  const tiers = [10, 15, 20, 25, 30, 40, 50, 60];
  const activeCost = cost > 0 ? cost : 100; // Base on active cost or ₹100 nominal

  const comparisonTable: MarginComparisonRow[] = tiers.map((tier) => {
    const tierRev = activeCost / (1 - tier / 100);
    const tierProfit = tierRev - activeCost;
    const tierMarkup = activeCost > 0 ? (tierProfit / activeCost) * 100 : 0;
    const isCurrent = Math.abs(tier - marginPercent) < 0.5;

    return {
      marginPercent: tier,
      sellingPrice: roundTo(tierRev, 2),
      profit: roundTo(tierProfit, 2),
      markupPercent: roundTo(tierMarkup, 2),
      isCurrent,
    };
  });

  return {
    mode,
    cost: roundTo(cost, 2),
    revenue: roundTo(revenue, 2),
    profit: roundTo(profit, 2),
    marginPercent: roundTo(marginPercent, 4),
    markupPercent: roundTo(markupPercent, 4),
    primaryResult: {
      label: primaryLabel,
      value: roundTo(primaryValue, 2),
      formatted: isPrimaryPercent
        ? `${roundTo(primaryValue, 2)}%`
        : formatCurrencyValue(primaryValue, cur),
      isPercentage: isPrimaryPercent,
    },
    breakdown: {
      formulaTitle,
      formulaEquation,
      steps,
    },
    comparisonTable,
  };
}
