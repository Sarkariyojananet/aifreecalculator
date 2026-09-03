/**
 * Comprehensive Sales Tax Calculation Engine
 * Supports Add Sales Tax, Reverse Sales Tax, Car Sales Tax,
 * Location Presets, and Tax Rate Comparison Matrix.
 */

export type SalesTaxMode = 'add' | 'reverse' | 'car';

export interface LocationPreset {
  id: string;
  name: string;
  state: string;
  defaultRatePercent: number;
  description: string;
}

export const US_LOCATION_PRESETS: LocationPreset[] = [
  { id: 'custom', name: 'Custom Tax Rate', state: 'Custom', defaultRatePercent: 7.0, description: 'User-defined tax rate' },
  { id: 'ca', name: 'California Estimate', state: 'California', defaultRatePercent: 7.25, description: 'State base 7.25% (local district taxes up to 10.75%)' },
  { id: 'nj', name: 'New Jersey Estimate', state: 'New Jersey', defaultRatePercent: 6.625, description: 'Statewide 6.625% (reduced 3.3125% in UEZ zones)' },
  { id: 'ny', name: 'New York (State)', state: 'New York', defaultRatePercent: 4.0, description: 'State base 4.0% (combined with local county taxes)' },
  { id: 'nyc', name: 'New York City (NYC)', state: 'New York City', defaultRatePercent: 8.875, description: 'Combined 4.0% State + 4.5% City + 0.375% MCTD' },
  { id: 'mo', name: 'Missouri Estimate', state: 'Missouri', defaultRatePercent: 4.225, description: 'State base 4.225% (local city/county taxes up to 10%+)' },
  { id: 'oh', name: 'Ohio Estimate', state: 'Ohio', defaultRatePercent: 5.75, description: 'State base 5.75% (county taxes up to 8.0%)' },
  { id: 'mn', name: 'Minnesota Estimate', state: 'Minnesota', defaultRatePercent: 6.875, description: 'State base 6.875% (local city/county taxes up to 9%+)' },
];

export interface SalesTaxCalculationInput {
  mode: SalesTaxMode;
  amount: number; // Price Before Tax in Add/Car mode; Total Price in Reverse mode
  taxRatePercent: number;
  locationId?: string;
  // Car mode fields
  tradeInValue?: number;
  rebateDiscount?: number;
  taxableFees?: number;
}

export interface TaxRateComparisonRow {
  ratePercent: number;
  label: string;
  taxAmount: number;
  totalPrice: number;
  isCurrent: boolean;
}

export interface SalesTaxResult {
  mode: SalesTaxMode;
  locationName: string;
  taxRatePercent: number;
  priceBeforeTax: number;
  salesTaxAmount: number;
  totalPriceWithTax: number;
  
  // Car Mode specific fields
  vehiclePurchasePrice?: number;
  tradeInValue?: number;
  rebateDiscount?: number;
  taxableFees?: number;
  taxableAmount?: number;
  totalEstimatedCost?: number;
  
  // Breakdown steps
  breakdown: {
    formula: string;
    step1: string;
    step2: string;
  };

  // Comparison Matrix
  comparisonTable: TaxRateComparisonRow[];
}

/**
 * Master Sales Tax Calculation Function
 */
export function calculateSalesTaxExtended(input: SalesTaxCalculationInput): SalesTaxResult {
  const mode = input.mode || 'add';
  const taxRate = Math.max(0, input.taxRatePercent);
  const locationPreset = US_LOCATION_PRESETS.find((l) => l.id === input.locationId) || US_LOCATION_PRESETS[0];
  const locationName = locationPreset.name;

  let priceBeforeTax = 0;
  let salesTaxAmount = 0;
  let totalPriceWithTax = 0;

  let vehiclePurchasePrice = 0;
  let tradeInValue = 0;
  let rebateDiscount = 0;
  let taxableFees = 0;
  let taxableAmount = 0;
  let totalEstimatedCost = 0;

  let breakdownFormula = '';
  let step1 = '';
  let step2 = '';

  if (mode === 'add') {
    priceBeforeTax = Math.max(0, input.amount);
    salesTaxAmount = Number(((priceBeforeTax * taxRate) / 100).toFixed(2));
    totalPriceWithTax = Number((priceBeforeTax + salesTaxAmount).toFixed(2));

    breakdownFormula = 'Sales Tax = Price × (Rate ÷ 100) | Total = Price + Sales Tax';
    step1 = `$${priceBeforeTax.toLocaleString('en-US', { minimumFractionDigits: 2 })} × (${taxRate}% ÷ 100) = $${salesTaxAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    step2 = `$${priceBeforeTax.toLocaleString('en-US', { minimumFractionDigits: 2 })} + $${salesTaxAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} = $${totalPriceWithTax.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  } else if (mode === 'reverse') {
    totalPriceWithTax = Math.max(0, input.amount);
    if (taxRate === 0) {
      priceBeforeTax = totalPriceWithTax;
      salesTaxAmount = 0;
    } else {
      priceBeforeTax = Number((totalPriceWithTax / (1 + taxRate / 100)).toFixed(2));
      salesTaxAmount = Number((totalPriceWithTax - priceBeforeTax).toFixed(2));
    }

    breakdownFormula = 'Price Before Tax = Total Price ÷ (1 + Rate ÷ 100) | Sales Tax = Total Price − Price Before Tax';
    step1 = `$${totalPriceWithTax.toLocaleString('en-US', { minimumFractionDigits: 2 })} ÷ (1 + ${taxRate / 100}) = $${priceBeforeTax.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    step2 = `$${totalPriceWithTax.toLocaleString('en-US', { minimumFractionDigits: 2 })} − $${priceBeforeTax.toLocaleString('en-US', { minimumFractionDigits: 2 })} = $${salesTaxAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  } else {
    // Car Mode
    vehiclePurchasePrice = Math.max(0, input.amount);
    tradeInValue = Math.max(0, input.tradeInValue || 0);
    rebateDiscount = Math.max(0, input.rebateDiscount || 0);
    taxableFees = Math.max(0, input.taxableFees || 0);

    // Default taxable vehicle amount = Price - Trade-in - Rebates + Fees
    taxableAmount = Math.max(0, vehiclePurchasePrice - tradeInValue - rebateDiscount + taxableFees);
    salesTaxAmount = Number(((taxableAmount * taxRate) / 100).toFixed(2));
    totalEstimatedCost = Number((vehiclePurchasePrice - tradeInValue - rebateDiscount + taxableFees + salesTaxAmount).toFixed(2));

    priceBeforeTax = vehiclePurchasePrice;
    totalPriceWithTax = totalEstimatedCost;

    breakdownFormula = 'Taxable Amount = Price − Trade-in − Rebates + Fees | Sales Tax = Taxable Amount × Rate';
    step1 = `($${vehiclePurchasePrice.toLocaleString('en-US')} − $${tradeInValue.toLocaleString('en-US')} − $${rebateDiscount.toLocaleString('en-US')} + $${taxableFees.toLocaleString('en-US')}) = $${taxableAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} taxable`;
    step2 = `$${taxableAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} × ${taxRate}% = $${salesTaxAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} tax | Total Cost: $${totalEstimatedCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  }

  // Generate Comparison Matrix based on reference price
  const basePriceForComparison = mode === 'car' ? taxableAmount : priceBeforeTax;
  const ratesToCompare = [5.0, 6.0, 7.0, 8.0, 9.0];
  if (!ratesToCompare.includes(taxRate)) {
    ratesToCompare.push(taxRate);
    ratesToCompare.sort((a, b) => a - b);
  }

  const comparisonTable: TaxRateComparisonRow[] = ratesToCompare.map((r) => {
    const tax = Number(((basePriceForComparison * r) / 100).toFixed(2));
    const total = Number((basePriceForComparison + tax).toFixed(2));
    return {
      ratePercent: r,
      label: r === taxRate ? `${r}% (Current)` : `${r}%`,
      taxAmount: tax,
      totalPrice: total,
      isCurrent: r === taxRate,
    };
  });

  return {
    mode,
    locationName,
    taxRatePercent: taxRate,
    priceBeforeTax,
    salesTaxAmount,
    totalPriceWithTax,
    vehiclePurchasePrice: mode === 'car' ? vehiclePurchasePrice : undefined,
    tradeInValue: mode === 'car' ? tradeInValue : undefined,
    rebateDiscount: mode === 'car' ? rebateDiscount : undefined,
    taxableFees: mode === 'car' ? taxableFees : undefined,
    taxableAmount: mode === 'car' ? taxableAmount : undefined,
    totalEstimatedCost: mode === 'car' ? totalEstimatedCost : undefined,
    breakdown: {
      formula: breakdownFormula,
      step1,
      step2,
    },
    comparisonTable,
  };
}
