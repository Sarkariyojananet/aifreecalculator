/**
 * Comprehensive Discount & Sale Price Calculation Engine
 * Supports Find Sale Price (Percentage/Fixed), Find Discount Percentage,
 * Find Original Price, Multiple Sequential Discounts, and Buy X Get Y (BOGO/Bundle).
 */

export type DiscountMode = 'sale_price' | 'discount_pct' | 'original_price' | 'multiple' | 'bogo';
export type DiscountType = 'percentage' | 'fixed';

export interface DiscountCalculationInput {
  mode: DiscountMode;

  // Find Sale Price inputs
  originalPrice?: number;
  discountType?: DiscountType;
  discountPercentage?: number;
  fixedDiscountAmount?: number;
  quantity?: number;

  // Find Discount Percentage inputs
  salePrice?: number;

  // Multiple discounts inputs
  discounts?: number[]; // Array of percentages e.g. [20, 10, 5]

  // Buy X Get Y (BOGO) inputs
  bogoBuy?: number;
  bogoGet?: number;
  bogoDiscountPct?: number; // 100 for Free, 50 for 50% off
  bogoTotalQuantity?: number;

  // Optional Sales Tax / VAT
  applyTax?: boolean;
  taxRatePercent?: number;

  // Currency symbol
  currencySymbol?: string;
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

export interface BogoBreakdown {
  buyCount: number;
  getCount: number;
  getDiscountPct: number;
  totalQuantity: number;
  fullPriceItems: number;
  discountedItems: number;
  originalTotal: number;
  saleTotal: number;
  totalSaved: number;
  effectiveUnitPrice: number;
  effectiveDiscountPct: number;
}

export interface DiscountResult {
  mode: DiscountMode;
  currencySymbol: string;
  originalPrice: number;
  quantity: number;
  originalTotal: number;
  salePrice: number;
  saleTotal: number;
  discountAmount: number;
  discountPercentage: number;
  amountSaved: number;
  unitPriceAfterDiscount: number;

  // Tax fields
  applyTax: boolean;
  taxRatePercent: number;
  salesTaxAmount: number;
  finalPriceWithTax: number;

  // Multiple Discounts breakdown
  multipleSteps?: MultipleDiscountStep[];
  effectiveDiscountPercent?: number;

  // BOGO breakdown
  bogoBreakdown?: BogoBreakdown;

  // Visual proportions
  paidPercentage: number;
  savedPercentage: number;

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
  const currencySymbol = input.currencySymbol || '$';
  const applyTax = Boolean(input.applyTax);
  const taxRate = applyTax ? Math.max(0, input.taxRatePercent || 0) : 0;
  const qty = Math.max(1, Math.round(input.quantity || 1));

  let originalPrice = 0;
  let originalTotal = 0;
  let salePrice = 0;
  let saleTotal = 0;
  let discountAmount = 0;
  let discountPercentage = 0;
  let amountSaved = 0;
  let unitPriceAfterDiscount = 0;
  let salesTaxAmount = 0;
  let finalPriceWithTax = 0;
  let effectiveDiscountPercent = 0;
  let multipleSteps: MultipleDiscountStep[] | undefined = undefined;
  let bogoBreakdown: BogoBreakdown | undefined = undefined;

  let breakdownFormula = '';
  let step1 = '';
  let step2 = '';
  let step3: string | undefined = undefined;

  const fmt = (val: number) => `${currencySymbol}${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  if (mode === 'sale_price') {
    originalPrice = Math.max(0, input.originalPrice || 0);
    originalTotal = Number((originalPrice * qty).toFixed(2));
    const discType = input.discountType || 'percentage';

    if (discType === 'percentage') {
      discountPercentage = Math.min(100, Math.max(0, input.discountPercentage || 0));
      const unitDiscount = Number(((originalPrice * discountPercentage) / 100).toFixed(2));
      salePrice = Number((originalPrice - unitDiscount).toFixed(2));
      unitPriceAfterDiscount = salePrice;
      saleTotal = Number((salePrice * qty).toFixed(2));
      discountAmount = Number((unitDiscount * qty).toFixed(2));
      amountSaved = discountAmount;

      breakdownFormula = 'Discount = Original Price × (Discount % ÷ 100) | Sale Price = Original Price − Discount';
      step1 = `${fmt(originalPrice)} × (${discountPercentage}% ÷ 100) = ${fmt(unitDiscount)} Saved per unit (${fmt(discountAmount)} for ${qty} item${qty > 1 ? 's' : ''})`;
      step2 = `${fmt(originalTotal)} − ${fmt(discountAmount)} = ${fmt(saleTotal)} Final Sale Price`;
    } else {
      // Fixed Amount
      const rawFixed = Math.max(0, input.fixedDiscountAmount || 0);
      const unitDiscount = Math.min(originalPrice, rawFixed);
      salePrice = Number((originalPrice - unitDiscount).toFixed(2));
      unitPriceAfterDiscount = salePrice;
      discountAmount = Number((unitDiscount * qty).toFixed(2));
      saleTotal = Number((salePrice * qty).toFixed(2));
      amountSaved = discountAmount;
      discountPercentage = originalPrice > 0 ? Number(((unitDiscount / originalPrice) * 100).toFixed(2)) : 0;

      breakdownFormula = 'Sale Price = Original Price − Fixed Discount Amount';
      step1 = `Fixed Discount: ${fmt(unitDiscount)} per unit (${discountPercentage.toFixed(1)}% equivalent)`;
      step2 = `${fmt(originalTotal)} − ${fmt(discountAmount)} = ${fmt(saleTotal)} Final Sale Price`;
    }

    if (applyTax && taxRate > 0) {
      salesTaxAmount = Number(((saleTotal * taxRate) / 100).toFixed(2));
      finalPriceWithTax = Number((saleTotal + salesTaxAmount).toFixed(2));
      step3 = `Sales Tax (${taxRate}%): ${fmt(saleTotal)} × ${taxRate}% = ${fmt(salesTaxAmount)} | Total with Tax = ${fmt(finalPriceWithTax)}`;
    } else {
      finalPriceWithTax = saleTotal;
    }
  } else if (mode === 'discount_pct') {
    originalPrice = Math.max(0, input.originalPrice || 0);
    originalTotal = Number((originalPrice * qty).toFixed(2));
    salePrice = Math.max(0, input.salePrice || 0);
    saleTotal = Number((salePrice * qty).toFixed(2));
    unitPriceAfterDiscount = salePrice;

    if (salePrice > originalPrice) {
      discountAmount = 0;
      discountPercentage = 0;
      amountSaved = 0;
    } else {
      const unitSaved = Number((originalPrice - salePrice).toFixed(2));
      discountAmount = Number((unitSaved * qty).toFixed(2));
      amountSaved = discountAmount;
      discountPercentage = originalPrice > 0 ? Number(((unitSaved / originalPrice) * 100).toFixed(2)) : 0;
    }

    if (applyTax && taxRate > 0) {
      salesTaxAmount = Number(((saleTotal * taxRate) / 100).toFixed(2));
      finalPriceWithTax = Number((saleTotal + salesTaxAmount).toFixed(2));
      step3 = `Sales Tax (${taxRate}%): ${fmt(saleTotal)} × ${taxRate}% = ${fmt(salesTaxAmount)} | Total with Tax = ${fmt(finalPriceWithTax)}`;
    } else {
      finalPriceWithTax = saleTotal;
    }

    breakdownFormula = 'Discount Amount = Original Price − Sale Price | Discount % = (Discount Amount ÷ Original Price) × 100';
    step1 = `${fmt(originalPrice)} − ${fmt(salePrice)} = ${fmt(originalPrice - salePrice)} Saved per unit (${fmt(amountSaved)} total)`;
    step2 = `(${fmt(amountSaved)} ÷ ${fmt(originalTotal)}) × 100 = ${discountPercentage}% Discount Rate`;
  } else if (mode === 'original_price') {
    salePrice = Math.max(0, input.salePrice || 0);
    saleTotal = Number((salePrice * qty).toFixed(2));
    unitPriceAfterDiscount = salePrice;
    discountPercentage = Math.min(99.99, Math.max(0, input.discountPercentage || 0));

    if (discountPercentage >= 100) {
      originalPrice = salePrice;
      discountAmount = 0;
    } else {
      originalPrice = Number((salePrice / (1 - discountPercentage / 100)).toFixed(2));
      discountAmount = Number(((originalPrice - salePrice) * qty).toFixed(2));
    }
    originalTotal = Number((originalPrice * qty).toFixed(2));
    amountSaved = discountAmount;

    if (applyTax && taxRate > 0) {
      salesTaxAmount = Number(((saleTotal * taxRate) / 100).toFixed(2));
      finalPriceWithTax = Number((saleTotal + salesTaxAmount).toFixed(2));
      step3 = `Sales Tax (${taxRate}%): ${fmt(saleTotal)} × ${taxRate}% = ${fmt(salesTaxAmount)} | Total with Tax = ${fmt(finalPriceWithTax)}`;
    } else {
      finalPriceWithTax = saleTotal;
    }

    breakdownFormula = 'Original Price = Sale Price ÷ (1 − Discount % ÷ 100) | Discount Amount = Original Price − Sale Price';
    step1 = `${fmt(salePrice)} ÷ (1 − ${discountPercentage / 100}) = ${fmt(originalPrice)} Original MSRP per unit`;
    step2 = `${fmt(originalTotal)} − ${fmt(saleTotal)} = ${fmt(discountAmount)} Total Discount Amount`;
  } else if (mode === 'multiple') {
    // Multiple Sequential Discounts
    originalPrice = Math.max(0, input.originalPrice || 0);
    originalTotal = Number((originalPrice * qty).toFixed(2));
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
    unitPriceAfterDiscount = salePrice;
    saleTotal = Number((salePrice * qty).toFixed(2));
    amountSaved = Number((originalTotal - saleTotal).toFixed(2));
    discountAmount = amountSaved;
    effectiveDiscountPercent = originalTotal > 0 ? Number(((amountSaved / originalTotal) * 100).toFixed(2)) : 0;
    discountPercentage = effectiveDiscountPercent;

    if (applyTax && taxRate > 0) {
      salesTaxAmount = Number(((saleTotal * taxRate) / 100).toFixed(2));
      finalPriceWithTax = Number((saleTotal + salesTaxAmount).toFixed(2));
      step3 = `Sales Tax (${taxRate}%): ${fmt(saleTotal)} × ${taxRate}% = ${fmt(salesTaxAmount)} | Total with Tax = ${fmt(finalPriceWithTax)}`;
    } else {
      finalPriceWithTax = saleTotal;
    }

    breakdownFormula = 'Sequential: Price_n = Price_{n-1} × (1 − Discount_n ÷ 100) | Effective % = (Total Saved ÷ Original) × 100';
    step1 = multipleSteps.map((s) => `D${s.step} (${s.discountPct}%): ${fmt(s.priceBefore)} → ${fmt(s.priceAfter)} (-${fmt(s.savedInStep)})`).join(' | ');
    step2 = `Total Saved: ${fmt(amountSaved)} | True Effective Compounding Discount: ${effectiveDiscountPercent}% (vs ${(rawDiscounts.reduce((a, b) => a + b, 0)).toFixed(1)}% naive sum)`;
  } else {
    // Mode: BOGO / Bundle
    const unitPrice = Math.max(0, input.originalPrice || 0);
    const buyX = Math.max(1, Math.round(input.bogoBuy || 1));
    const getY = Math.max(1, Math.round(input.bogoGet || 1));
    const bogoDiscPct = Math.min(100, Math.max(0, input.bogoDiscountPct !== undefined ? input.bogoDiscountPct : 100));
    const totalItems = Math.max(buyX + getY, Math.round(input.bogoTotalQuantity || (buyX + getY)));

    const bundleSize = buyX + getY;
    const fullBundles = Math.floor(totalItems / bundleSize);
    const remainder = totalItems % bundleSize;

    const fullPriceItems = (fullBundles * buyX) + remainder;
    const discountedItems = fullBundles * getY;

    const fullPriceTotal = fullPriceItems * unitPrice;
    const discountedUnit = unitPrice * (1 - bogoDiscPct / 100);
    const discountedTotal = discountedItems * discountedUnit;

    originalPrice = unitPrice;
    originalTotal = Number((totalItems * unitPrice).toFixed(2));
    saleTotal = Number((fullPriceTotal + discountedTotal).toFixed(2));
    salePrice = totalItems > 0 ? Number((saleTotal / totalItems).toFixed(2)) : 0;
    unitPriceAfterDiscount = salePrice;
    amountSaved = Number((originalTotal - saleTotal).toFixed(2));
    discountAmount = amountSaved;
    effectiveDiscountPercent = originalTotal > 0 ? Number(((amountSaved / originalTotal) * 100).toFixed(2)) : 0;
    discountPercentage = effectiveDiscountPercent;

    bogoBreakdown = {
      buyCount: buyX,
      getCount: getY,
      getDiscountPct: bogoDiscPct,
      totalQuantity: totalItems,
      fullPriceItems,
      discountedItems,
      originalTotal,
      saleTotal,
      totalSaved: amountSaved,
      effectiveUnitPrice: salePrice,
      effectiveDiscountPct: effectiveDiscountPercent,
    };

    if (applyTax && taxRate > 0) {
      salesTaxAmount = Number(((saleTotal * taxRate) / 100).toFixed(2));
      finalPriceWithTax = Number((saleTotal + salesTaxAmount).toFixed(2));
      step3 = `Sales Tax (${taxRate}%): ${fmt(saleTotal)} × ${taxRate}% = ${fmt(salesTaxAmount)} | Total with Tax = ${fmt(finalPriceWithTax)}`;
    } else {
      finalPriceWithTax = saleTotal;
    }

    breakdownFormula = `Buy ${buyX} Get ${getY} at ${bogoDiscPct}% Off | Total Items: ${totalItems}`;
    step1 = `${fullPriceItems} item${fullPriceItems > 1 ? 's' : ''} at full price (${fmt(fullPriceTotal)}) + ${discountedItems} item${discountedItems > 1 ? 's' : ''} with ${bogoDiscPct}% discount (${fmt(discountedTotal)})`;
    step2 = `Total Paid: ${fmt(saleTotal)} (${fmt(salePrice)}/item avg) | Total Saved: ${fmt(amountSaved)} (${effectiveDiscountPercent}% effective off)`;
  }

  // Visual Proportions
  const paidPct = originalTotal > 0 ? Math.min(100, Math.max(0, Number(((saleTotal / originalTotal) * 100).toFixed(1)))) : 100;
  const savedPct = Number((100 - paidPct).toFixed(1));

  // Generate Comparison Matrix based on Original Price
  const basePriceForComparison = originalTotal > 0 ? originalTotal : 1000;
  const standardPercentages = [5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90];
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
    currencySymbol,
    originalPrice,
    quantity: qty,
    originalTotal,
    salePrice,
    saleTotal,
    discountAmount,
    discountPercentage,
    amountSaved,
    unitPriceAfterDiscount,
    applyTax,
    taxRatePercent: taxRate,
    salesTaxAmount,
    finalPriceWithTax,
    effectiveDiscountPercent: (mode === 'multiple' || mode === 'bogo') ? effectiveDiscountPercent : undefined,
    multipleSteps,
    bogoBreakdown,
    paidPercentage: paidPct,
    savedPercentage: savedPct,
    breakdown: {
      formula: breakdownFormula,
      step1,
      step2,
      step3,
    },
    comparisonTable,
  };
}
