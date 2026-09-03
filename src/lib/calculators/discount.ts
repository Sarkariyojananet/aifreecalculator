/**
 * Comprehensive Discount & Sale Price Calculation Engine
 * Supports Find Sale Price (Percentage/Fixed), Find Discount Percentage,
 * Find Original Price, and Multiple Sequential Discounts.
 */

export type DiscountMode = 'sale_price' | 'discount_pct' | 'original_price' | 'multiple';
export type DiscountType = 'percentage' | 'fixed';

export interface DiscountCalculationInput {
  mode: DiscountMode;
  
  // Find Sale Price inputs
  originalPrice?: number;
  discountType?: DiscountType;
  discountPercentage?: number;
  fixedDiscountAmount?: number;
  
  // Find Discount Percentage inputs
  salePrice?: number;
  
  // Multiple discounts inputs
  discounts?: number[]; // Array of percentages e.g. [20, 10, 5]
  
  // Optional Sales Tax
  applyTax?: boolean;
  taxRatePercent?: number;
}

export interface DiscountComparisonRow {
  discountPercent: number;
  label: string;
  amountSaved: number;
  finalPrice: number;
  isCurrent: boolean;
}

export interface MultipleDiscountStep {
  step: number;
  discountPct: number;
  priceBefore: number;
  savedInStep: number;
  priceAfter: number;
}

export interface DiscountResult {
  mode: DiscountMode;
  originalPrice: number;
  salePrice: number;
  discountAmount: number;
  discountPercentage: number;
  amountSaved: number;
  
  // Tax fields
  applyTax: boolean;
  taxRatePercent: number;
  salesTaxAmount: number;
  finalPriceWithTax: number;
  
  // Multiple Discounts breakdown
  multipleSteps?: MultipleDiscountStep[];
  effectiveDiscountPercent?: number;
  
  // Breakdown text
  breakdown: {
    formula: string;
    step1: string;
    step2: string;
    step3?: string;
  };

  // Comparison Matrix
  comparisonTable: DiscountComparisonRow[];
}

/**
 * Master Discount Calculation Function
 */
export function calculateDiscountExtended(input: DiscountCalculationInput): DiscountResult {
  const mode = input.mode || 'sale_price';
  const applyTax = Boolean(input.applyTax);
  const taxRate = applyTax ? Math.max(0, input.taxRatePercent || 0) : 0;

  let originalPrice = 0;
  let salePrice = 0;
  let discountAmount = 0;
  let discountPercentage = 0;
  let amountSaved = 0;
  let salesTaxAmount = 0;
  let finalPriceWithTax = 0;
  let effectiveDiscountPercent = 0;
  let multipleSteps: MultipleDiscountStep[] | undefined = undefined;

  let breakdownFormula = '';
  let step1 = '';
  let step2 = '';
  let step3: string | undefined = undefined;

  if (mode === 'sale_price') {
    originalPrice = Math.max(0, input.originalPrice || 0);
    const discType = input.discountType || 'percentage';

    if (discType === 'percentage') {
      discountPercentage = Math.min(100, Math.max(0, input.discountPercentage || 0));
      discountAmount = Number(((originalPrice * discountPercentage) / 100).toFixed(2));
      salePrice = Number((originalPrice - discountAmount).toFixed(2));
      amountSaved = discountAmount;

      breakdownFormula = 'Discount Amount = Original Price × (Discount % ÷ 100) | Sale Price = Original Price − Discount Amount';
      step1 = `$${originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })} × (${discountPercentage}% ÷ 100) = $${discountAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} Saved`;
      step2 = `$${originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })} − $${discountAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} = $${salePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })} Sale Price`;
    } else {
      // Fixed Amount
      const rawFixed = Math.max(0, input.fixedDiscountAmount || 0);
      discountAmount = Math.min(originalPrice, rawFixed);
      salePrice = Number((originalPrice - discountAmount).toFixed(2));
      discountPercentage = originalPrice > 0 ? Number(((discountAmount / originalPrice) * 100).toFixed(2)) : 0;
      amountSaved = discountAmount;

      breakdownFormula = 'Sale Price = Original Price − Fixed Discount Amount';
      step1 = `Fixed Discount: $${discountAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} (${discountPercentage.toFixed(1)}% equivalent)`;
      step2 = `$${originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })} − $${discountAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} = $${salePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })} Sale Price`;
    }

    if (applyTax && taxRate > 0) {
      salesTaxAmount = Number(((salePrice * taxRate) / 100).toFixed(2));
      finalPriceWithTax = Number((salePrice + salesTaxAmount).toFixed(2));
      step3 = `Sales Tax (${taxRate}%): $${salePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })} × ${taxRate}% = $${salesTaxAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} | Total with Tax = $${finalPriceWithTax.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    } else {
      finalPriceWithTax = salePrice;
    }
  } else if (mode === 'discount_pct') {
    originalPrice = Math.max(0, input.originalPrice || 0);
    salePrice = Math.max(0, input.salePrice || 0);
    
    // Validate sale price not exceeding original price
    if (salePrice > originalPrice) {
      discountAmount = 0;
      discountPercentage = 0;
      amountSaved = 0;
    } else {
      discountAmount = Number((originalPrice - salePrice).toFixed(2));
      amountSaved = discountAmount;
      discountPercentage = originalPrice > 0 ? Number(((discountAmount / originalPrice) * 100).toFixed(2)) : 0;
    }
    finalPriceWithTax = salePrice;

    breakdownFormula = 'Discount Amount = Original Price − Sale Price | Discount % = (Discount Amount ÷ Original Price) × 100';
    step1 = `$${originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })} − $${salePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })} = $${discountAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} Saved`;
    step2 = `($${discountAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} ÷ $${originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}) × 100 = ${discountPercentage}% Discount`;
  } else if (mode === 'original_price') {
    salePrice = Math.max(0, input.salePrice || 0);
    discountPercentage = Math.min(99.99, Math.max(0, input.discountPercentage || 0));

    if (discountPercentage >= 100) {
      originalPrice = salePrice;
      discountAmount = 0;
    } else {
      originalPrice = Number((salePrice / (1 - discountPercentage / 100)).toFixed(2));
      discountAmount = Number((originalPrice - salePrice).toFixed(2));
    }
    amountSaved = discountAmount;
    finalPriceWithTax = salePrice;

    breakdownFormula = 'Original Price = Sale Price ÷ (1 − Discount % ÷ 100) | Discount Amount = Original Price − Sale Price';
    step1 = `$${salePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })} ÷ (1 − ${discountPercentage / 100}) = $${originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })} Original Price`;
    step2 = `$${originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })} − $${salePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })} = $${discountAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} Saved`;
  } else {
    // Multiple Sequential Discounts
    originalPrice = Math.max(0, input.originalPrice || 0);
    const rawDiscounts = (input.discounts && input.discounts.length > 0) ? input.discounts : [20, 10];
    
    multipleSteps = [];
    let currentPrice = originalPrice;

    for (let i = 0; i < rawDiscounts.length; i++) {
      const dPct = Math.min(100, Math.max(0, rawDiscounts[i]));
      const saved = Number(((currentPrice * dPct) / 100).toFixed(2));
      const nextPrice = Number((currentPrice - saved).toFixed(2));

      multipleSteps.push({
        step: i + 1,
        discountPct: dPct,
        priceBefore: currentPrice,
        savedInStep: saved,
        priceAfter: nextPrice,
      });

      currentPrice = nextPrice;
    }

    salePrice = currentPrice;
    amountSaved = Number((originalPrice - salePrice).toFixed(2));
    discountAmount = amountSaved;
    effectiveDiscountPercent = originalPrice > 0 ? Number(((amountSaved / originalPrice) * 100).toFixed(2)) : 0;
    discountPercentage = effectiveDiscountPercent;
    finalPriceWithTax = salePrice;

    breakdownFormula = 'Sequential: Price_n = Price_{n-1} × (1 − Discount_n ÷ 100) | Effective % = (Total Saved ÷ Original) × 100';
    step1 = multipleSteps.map((s) => `Discount #${s.step} (${s.discountPct}%): $${s.priceBefore.toFixed(2)} → $${s.priceAfter.toFixed(2)} (-$${s.savedInStep.toFixed(2)})`).join(' | ');
    step2 = `Total Saved: $${amountSaved.toLocaleString('en-US', { minimumFractionDigits: 2 })} | Effective Overall Discount: ${effectiveDiscountPercent}%`;
  }

  // Generate Comparison Matrix based on Original Price
  const basePriceForComparison = originalPrice > 0 ? originalPrice : 1000;
  const standardPercentages = [10, 20, 25, 30, 40, 50];
  const activePct = Math.round(discountPercentage);
  if (activePct > 0 && activePct < 100 && !standardPercentages.includes(activePct)) {
    standardPercentages.push(activePct);
    standardPercentages.sort((a, b) => a - b);
  }

  const comparisonTable: DiscountComparisonRow[] = standardPercentages.map((pct) => {
    const saved = Number(((basePriceForComparison * pct) / 100).toFixed(2));
    const finalP = Number((basePriceForComparison - saved).toFixed(2));
    return {
      discountPercent: pct,
      label: pct === activePct ? `${pct}% (Current)` : `${pct}%`,
      amountSaved: saved,
      finalPrice: finalP,
      isCurrent: pct === activePct,
    };
  });

  return {
    mode,
    originalPrice,
    salePrice,
    discountAmount,
    discountPercentage,
    amountSaved,
    applyTax,
    taxRatePercent: taxRate,
    salesTaxAmount,
    finalPriceWithTax,
    effectiveDiscountPercent: mode === 'multiple' ? effectiveDiscountPercent : undefined,
    multipleSteps,
    breakdown: {
      formula: breakdownFormula,
      step1,
      step2,
      step3,
    },
    comparisonTable,
  };
}
