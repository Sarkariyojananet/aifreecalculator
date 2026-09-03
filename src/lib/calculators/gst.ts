/**
 * GST (Goods and Services Tax) Calculation Engine
 * Supports Add GST (Exclusive), Remove GST (Inclusive / Reverse GST),
 * Common Rates (0%, 3%, 5%, 12%, 18%, 28%) and Custom Rates,
 * and Transaction Routing (Intra-State CGST/SGST vs Inter-State IGST).
 */

export interface GstInput {
  amount: number;
  gstRate: number; // e.g. 0, 3, 5, 12, 18, 28, or custom
  calculationType: 'add' | 'remove'; // 'add' (exclusive) | 'remove' (inclusive / reverse)
  transactionType?: 'intra-state' | 'inter-state';
}

export interface GstStepCalculation {
  formulaText: string;
  arithmeticText: string;
  resultExplanation: string;
}

export interface GstCalculationResult {
  calculationType: 'add' | 'remove';
  transactionType: 'intra-state' | 'inter-state';
  inputAmount: number;
  gstRate: number;
  baseAmount: number; // Exclusive price
  gstAmount: number;
  totalAmount: number; // Inclusive price
  cgstRate: number;
  cgstAmount: number;
  sgstRate: number;
  sgstAmount: number;
  igstRate: number;
  igstAmount: number;
  stepBreakdown: GstStepCalculation[];
}

export function calculateGstComprehensive(input: GstInput): GstCalculationResult {
  const inputAmount = Math.max(0, input.amount || 0);
  const gstRate = Math.max(0, input.gstRate || 0);
  const calculationType = input.calculationType || 'add';
  const transactionType = input.transactionType || 'intra-state';

  let baseAmount = 0;
  let gstAmount = 0;
  let totalAmount = 0;
  const stepBreakdown: GstStepCalculation[] = [];

  if (calculationType === 'add') {
    // Add GST to Exclusive Base Price
    baseAmount = inputAmount;
    gstAmount = Number(((inputAmount * gstRate) / 100).toFixed(2));
    totalAmount = Number((baseAmount + gstAmount).toFixed(2));

    stepBreakdown.push({
      formulaText: 'GST Amount = Original Amount × (GST Rate ÷ 100)',
      arithmeticText: `₹${baseAmount.toLocaleString('en-IN')} × (${gstRate} ÷ 100) = ₹${gstAmount.toLocaleString('en-IN')}`,
      resultExplanation: `Calculated GST tax at ${gstRate}% rate.`,
    });

    stepBreakdown.push({
      formulaText: 'Total Final Amount = Original Amount + GST Amount',
      arithmeticText: `₹${baseAmount.toLocaleString('en-IN')} + ₹${gstAmount.toLocaleString('en-IN')} = ₹${totalAmount.toLocaleString('en-IN')}`,
      resultExplanation: 'Total inclusive amount payable by the consumer.',
    });
  } else {
    // Remove GST from Inclusive Gross Price (Reverse GST)
    totalAmount = inputAmount;
    if (gstRate === 0) {
      baseAmount = totalAmount;
      gstAmount = 0;
    } else {
      baseAmount = Number(((totalAmount * 100) / (100 + gstRate)).toFixed(2));
      gstAmount = Number((totalAmount - baseAmount).toFixed(2));
    }

    stepBreakdown.push({
      formulaText: 'Base Price Before GST = Inclusive Amount × 100 ÷ (100 + GST Rate)',
      arithmeticText: `₹${totalAmount.toLocaleString('en-IN')} × 100 ÷ (100 + ${gstRate}) = ₹${baseAmount.toLocaleString('en-IN')}`,
      resultExplanation: 'Extracted base taxable price excluding GST.',
    });

    stepBreakdown.push({
      formulaText: 'GST Amount Extracted = Inclusive Amount − Base Price',
      arithmeticText: `₹${totalAmount.toLocaleString('en-IN')} − ₹${baseAmount.toLocaleString('en-IN')} = ₹${gstAmount.toLocaleString('en-IN')}`,
      resultExplanation: `Actual GST component included in the gross invoice.`,
    });
  }

  let cgstRate = 0;
  let cgstAmount = 0;
  let sgstRate = 0;
  let sgstAmount = 0;
  let igstRate = 0;
  let igstAmount = 0;

  if (transactionType === 'intra-state') {
    cgstRate = Number((gstRate / 2).toFixed(2));
    sgstRate = Number((gstRate / 2).toFixed(2));
    cgstAmount = Number((gstAmount / 2).toFixed(2));
    sgstAmount = Number((gstAmount - cgstAmount).toFixed(2)); // Avoid 1 paisa rounding difference
  } else {
    igstRate = gstRate;
    igstAmount = gstAmount;
  }

  return {
    calculationType,
    transactionType,
    inputAmount,
    gstRate,
    baseAmount,
    gstAmount,
    totalAmount,
    cgstRate,
    cgstAmount,
    sgstRate,
    sgstAmount,
    igstRate,
    igstAmount,
    stepBreakdown,
  };
}
