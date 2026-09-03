/**
 * Comprehensive Income Tax Calculation Engine
 * Supports:
 * 1. India (AY 2025-26 & AY 2026-27):
 *    - New Tax Regime (with updated ₹75,000 standard deduction & Section 87A rebate up to ₹7 Lakh taxable income)
 *    - Old Tax Regime (with ₹50,000 standard deduction, 80C, 80D, 24b, HRA, 87A rebate up to ₹5 Lakh)
 *    - Surcharges (>50L, >1Cr, >2Cr) and 4% Health & Education Cess
 * 2. United States:
 *    - Federal Income Tax (Single, Married Filing Jointly, Married Filing Separately, Head of Household)
 *    - California State Income Tax
 *    - Texas (0% State Individual Income Tax + Federal estimate)
 */

export type TaxRegion = 'india' | 'us_federal' | 'us_california' | 'us_texas';
export type IndiaAssessmentYear = 'AY 2025-26' | 'AY 2026-27';
export type IndiaTaxRegime = 'new' | 'old' | 'compare';
export type UsFilingStatus = 'single' | 'married_joint' | 'married_separate' | 'head_household';

export interface SlabBreakdownItem {
  slabLabel: string;
  taxableAmountInSlab: number;
  ratePercent: number;
  taxAmount: number;
}

export interface SingleTaxCalculationResult {
  region: TaxRegion;
  assessmentOrTaxYear: string;
  regimeOrStatusLabel: string;
  grossIncome: number;
  totalDeductions: number;
  taxableIncome: number;
  taxBeforeRebate: number;
  rebateAmount: number;
  taxAfterRebate: number;
  surchargeAmount: number;
  cessOrStateTaxAmount: number; // Cess in India, State Tax in US
  totalEstimatedTax: number;
  effectiveTaxRatePercent: number;
  marginalTaxRatePercent: number;
  netIncomeAfterTax: number;
  slabBreakdown: SlabBreakdownItem[];
  currencySymbol: string;
}

export interface IndiaComparisonResult {
  grossIncome: number;
  assessmentYear: IndiaAssessmentYear;
  newRegime: SingleTaxCalculationResult;
  oldRegime: SingleTaxCalculationResult;
  recommendedRegime: 'New Tax Regime' | 'Old Tax Regime' | 'Equal';
  estimatedTaxSavings: number;
}

// ==========================================
// 1. INDIA INCOME TAX CALCULATOR ENGINE
// ==========================================

export interface IndiaTaxInput {
  assessmentYear: IndiaAssessmentYear;
  regime: IndiaTaxRegime;
  salaryIncome: number;
  housePropertyIncome?: number; // Can be negative for loss/interest
  businessIncome?: number;
  capitalGainsIncome?: number;
  otherIncome?: number;
  // Deductions for Old Regime
  section80C?: number; // Max 1.5 Lakh
  section80D?: number; // Health Insurance (Max 25k/50k)
  homeLoanInterest24b?: number; // Max 2.0 Lakh for SOP
  hraExemption?: number;
  otherDeductions?: number; // 80E, 80G, 80TTA, etc.
}

export function calculateIndiaTax(input: IndiaTaxInput): SingleTaxCalculationResult {
  const {
    assessmentYear = 'AY 2025-26',
    regime = 'new',
    salaryIncome = 0,
    housePropertyIncome = 0,
    businessIncome = 0,
    capitalGainsIncome = 0,
    otherIncome = 0,
    section80C = 0,
    section80D = 0,
    homeLoanInterest24b = 0,
    hraExemption = 0,
    otherDeductions = 0,
  } = input;

  const grossIncome = Math.max(
    0,
    salaryIncome + housePropertyIncome + businessIncome + capitalGainsIncome + otherIncome
  );

  let totalDeductions = 0;
  let standardDeduction = 0;

  if (regime === 'new') {
    // New Tax Regime: Standard deduction for salaried is ₹75,000
    if (salaryIncome > 0) {
      standardDeduction = Math.min(salaryIncome, 75000);
    }
    totalDeductions = standardDeduction;
  } else {
    // Old Tax Regime: Standard deduction ₹50,000 for salaried + Chapter VI-A deductions
    if (salaryIncome > 0) {
      standardDeduction = Math.min(salaryIncome, 50000);
    }
    const capped80C = Math.min(150000, Math.max(0, section80C));
    const capped80D = Math.min(100000, Math.max(0, section80D)); // Normal 25k/50k, up to 1L for senior parents
    const capped24b = Math.min(200000, Math.max(0, homeLoanInterest24b));
    const cappedHra = Math.max(0, hraExemption);
    const cappedOther = Math.max(0, otherDeductions);

    totalDeductions = standardDeduction + capped80C + capped80D + capped24b + cappedHra + cappedOther;
  }

  const taxableIncome = Math.max(0, grossIncome - totalDeductions);

  // Slab Breakdown Generation
  const slabBreakdown: SlabBreakdownItem[] = [];
  let taxBeforeRebate = 0;
  let marginalRate = 0;

  if (regime === 'new') {
    // Slabs under New Regime:
    // 0 to 3,00,000: 0%
    // 3,00,001 to 7,00,000: 5% (max 20,000)
    // 7,00,001 to 10,00,000: 10% (max 30,000)
    // 10,00,001 to 12,00,000: 15% (max 30,000)
    // 12,00,001 to 15,00,000: 20% (max 60,000)
    // Above 15,00,000: 30%
    const slabs = [
      { min: 0, max: 300000, rate: 0, label: '₹0 to ₹3,00,000' },
      { min: 300000, max: 700000, rate: 5, label: '₹3,00,001 to ₹7,00,000' },
      { min: 700000, max: 1000000, rate: 10, label: '₹7,00,001 to ₹10,00,000' },
      { min: 1000000, max: 1200000, rate: 15, label: '₹10,00,001 to ₹12,00,000' },
      { min: 1200000, max: 1500000, rate: 20, label: '₹12,00,001 to ₹15,00,000' },
      { min: 1500000, max: Infinity, rate: 30, label: 'Above ₹15,00,000' },
    ];

    for (const slab of slabs) {
      if (taxableIncome > slab.min) {
        const taxableInSlab = Math.min(taxableIncome - slab.min, slab.max - slab.min);
        const slabTax = (taxableInSlab * slab.rate) / 100;
        taxBeforeRebate += slabTax;
        if (slab.rate > 0 && taxableInSlab > 0) marginalRate = slab.rate;

        slabBreakdown.push({
          slabLabel: slab.label,
          taxableAmountInSlab: taxableInSlab,
          ratePercent: slab.rate,
          taxAmount: Math.round(slabTax),
        });
      } else {
        slabBreakdown.push({
          slabLabel: slab.label,
          taxableAmountInSlab: 0,
          ratePercent: slab.rate,
          taxAmount: 0,
        });
      }
    }
  } else {
    // Slabs under Old Regime:
    // 0 to 2,50,000: 0%
    // 2,50,001 to 5,00,000: 5% (max 12,500)
    // 5,00,001 to 10,00,000: 20% (max 1,00,000)
    // Above 10,00,000: 30%
    const slabs = [
      { min: 0, max: 250000, rate: 0, label: '₹0 to ₹2,50,000' },
      { min: 250000, max: 500000, rate: 5, label: '₹2,50,001 to ₹5,00,000' },
      { min: 500000, max: 1000000, rate: 20, label: '₹5,00,001 to ₹10,00,000' },
      { min: 1000000, max: Infinity, rate: 30, label: 'Above ₹10,00,000' },
    ];

    for (const slab of slabs) {
      if (taxableIncome > slab.min) {
        const taxableInSlab = Math.min(taxableIncome - slab.min, slab.max - slab.min);
        const slabTax = (taxableInSlab * slab.rate) / 100;
        taxBeforeRebate += slabTax;
        if (slab.rate > 0 && taxableInSlab > 0) marginalRate = slab.rate;

        slabBreakdown.push({
          slabLabel: slab.label,
          taxableAmountInSlab: taxableInSlab,
          ratePercent: slab.rate,
          taxAmount: Math.round(slabTax),
        });
      } else {
        slabBreakdown.push({
          slabLabel: slab.label,
          taxableAmountInSlab: 0,
          ratePercent: slab.rate,
          taxAmount: 0,
        });
      }
    }
  }

  // Section 87A Rebate
  let rebateAmount = 0;
  if (regime === 'new') {
    // New Regime: 100% tax rebate if taxable income <= ₹7,00,000
    if (taxableIncome <= 700000) {
      rebateAmount = taxBeforeRebate;
    }
  } else {
    // Old Regime: 100% tax rebate (up to ₹12,500) if taxable income <= ₹5,00,000
    if (taxableIncome <= 500000) {
      rebateAmount = Math.min(12500, taxBeforeRebate);
    }
  }

  const taxAfterRebate = Math.max(0, taxBeforeRebate - rebateAmount);

  // Surcharge calculation
  let surchargeRate = 0;
  if (taxableIncome > 50000000) surchargeRate = 25; // > 5 Cr
  else if (taxableIncome > 20000000) surchargeRate = 25; // > 2 Cr
  else if (taxableIncome > 10000000) surchargeRate = 15; // > 1 Cr
  else if (taxableIncome > 5000000) surchargeRate = 10; // > 50 Lakh

  const surchargeAmount = Math.round((taxAfterRebate * surchargeRate) / 100);

  // Health and Education Cess @ 4%
  const cessAmount = Math.round((taxAfterRebate + surchargeAmount) * 0.04);
  const totalEstimatedTax = Math.round(taxAfterRebate + surchargeAmount + cessAmount);

  const effectiveTaxRatePercent = grossIncome > 0 ? Number(((totalEstimatedTax / grossIncome) * 100).toFixed(2)) : 0;
  const netIncomeAfterTax = Math.max(0, grossIncome - totalEstimatedTax);

  return {
    region: 'india',
    assessmentOrTaxYear: assessmentYear,
    regimeOrStatusLabel: regime === 'new' ? 'New Tax Regime' : 'Old Tax Regime',
    grossIncome,
    totalDeductions,
    taxableIncome,
    taxBeforeRebate: Math.round(taxBeforeRebate),
    rebateAmount: Math.round(rebateAmount),
    taxAfterRebate: Math.round(taxAfterRebate),
    surchargeAmount,
    cessOrStateTaxAmount: cessAmount,
    totalEstimatedTax,
    effectiveTaxRatePercent,
    marginalTaxRatePercent: marginalRate,
    netIncomeAfterTax,
    slabBreakdown,
    currencySymbol: '₹',
  };
}

export function compareIndiaRegimes(input: IndiaTaxInput): IndiaComparisonResult {
  const newRegimeRes = calculateIndiaTax({ ...input, regime: 'new' });
  const oldRegimeRes = calculateIndiaTax({ ...input, regime: 'old' });

  let recommendedRegime: 'New Tax Regime' | 'Old Tax Regime' | 'Equal' = 'New Tax Regime';
  if (newRegimeRes.totalEstimatedTax < oldRegimeRes.totalEstimatedTax) {
    recommendedRegime = 'New Tax Regime';
  } else if (oldRegimeRes.totalEstimatedTax < newRegimeRes.totalEstimatedTax) {
    recommendedRegime = 'Old Tax Regime';
  } else {
    recommendedRegime = 'Equal';
  }

  const estimatedTaxSavings = Math.abs(newRegimeRes.totalEstimatedTax - oldRegimeRes.totalEstimatedTax);

  return {
    grossIncome: newRegimeRes.grossIncome,
    assessmentYear: input.assessmentYear || 'AY 2025-26',
    newRegime: newRegimeRes,
    oldRegime: oldRegimeRes,
    recommendedRegime,
    estimatedTaxSavings,
  };
}

// ==========================================
// 2. US TAX CALCULATOR ENGINE (FEDERAL, CA, TX)
// ==========================================

export interface UsTaxInput {
  region: 'us_federal' | 'us_california' | 'us_texas';
  taxYear?: string;
  filingStatus: UsFilingStatus;
  annualIncome: number;
  itemizedDeductions?: number;
}

export function calculateUsTax(input: UsTaxInput): SingleTaxCalculationResult {
  const {
    region = 'us_federal',
    taxYear = '2025 / 2026',
    filingStatus = 'single',
    annualIncome = 0,
    itemizedDeductions = 0,
  } = input;

  const grossIncome = Math.max(0, annualIncome);

  // US Federal Standard Deductions (Tax Year 2025)
  const federalStdDeductions: Record<UsFilingStatus, number> = {
    single: 15000,
    married_joint: 30000,
    married_separate: 15000,
    head_household: 22500,
  };

  const statusLabels: Record<UsFilingStatus, string> = {
    single: 'Single',
    married_joint: 'Married Filing Jointly',
    married_separate: 'Married Filing Separately',
    head_household: 'Head of Household',
  };

  const stdDeduction = federalStdDeductions[filingStatus] || 15000;
  const totalDeductions = Math.max(stdDeduction, itemizedDeductions || 0);
  const taxableIncome = Math.max(0, grossIncome - totalDeductions);

  // US Federal Tax Brackets (2025)
  interface Bracket {
    rate: number;
    single: [number, number];
    married_joint: [number, number];
    married_separate: [number, number];
    head_household: [number, number];
  }

  const fedBrackets: Bracket[] = [
    { rate: 10, single: [0, 11925], married_joint: [0, 23850], married_separate: [0, 11925], head_household: [0, 17000] },
    { rate: 12, single: [11925, 48475], married_joint: [23850, 96950], married_separate: [11925, 48475], head_household: [17000, 64850] },
    { rate: 22, single: [48475, 103350], married_joint: [96950, 206700], married_separate: [48475, 103350], head_household: [64850, 103350] },
    { rate: 24, single: [103350, 197300], married_joint: [206700, 394600], married_separate: [103350, 197300], head_household: [103350, 197300] },
    { rate: 32, single: [197300, 250525], married_joint: [394600, 501050], married_separate: [197300, 250525], head_household: [197300, 250525] },
    { rate: 35, single: [250525, 626350], married_joint: [501050, 751600], married_separate: [250525, 375800], head_household: [250525, 626350] },
    { rate: 37, single: [626350, Infinity], married_joint: [751600, Infinity], married_separate: [375800, Infinity], head_household: [626350, Infinity] },
  ];

  let federalTax = 0;
  let marginalRate = 0;
  const slabBreakdown: SlabBreakdownItem[] = [];

  for (const b of fedBrackets) {
    const [min, max] = b[filingStatus];
    if (taxableIncome > min) {
      const taxableInSlab = Math.min(taxableIncome - min, max - min);
      const slabTax = (taxableInSlab * b.rate) / 100;
      federalTax += slabTax;
      if (taxableInSlab > 0) marginalRate = b.rate;

      slabBreakdown.push({
        slabLabel: `$${min.toLocaleString()} to ${max === Infinity ? 'Above' : '$' + max.toLocaleString()}`,
        taxableAmountInSlab: taxableInSlab,
        ratePercent: b.rate,
        taxAmount: Math.round(slabTax),
      });
    } else {
      slabBreakdown.push({
        slabLabel: `$${min.toLocaleString()} to ${max === Infinity ? 'Above' : '$' + max.toLocaleString()}`,
        taxableAmountInSlab: 0,
        ratePercent: b.rate,
        taxAmount: 0,
      });
    }
  }

  let stateTax = 0;
  if (region === 'us_california') {
    // California State Income Tax (Approximate 1% to 12.3% brackets + 1% mental health above $1M)
    const caStdDeduction = filingStatus === 'married_joint' ? 11080 : 5540;
    const caTaxable = Math.max(0, grossIncome - caStdDeduction);
    // Simple tiered estimation for CA
    if (caTaxable > 1000000) stateTax = 100000 + (caTaxable - 1000000) * 0.133;
    else if (caTaxable > 350000) stateTax = 30000 + (caTaxable - 350000) * 0.113;
    else if (caTaxable > 100000) stateTax = 6000 + (caTaxable - 100000) * 0.093;
    else if (caTaxable > 50000) stateTax = 1500 + (caTaxable - 50000) * 0.06;
    else stateTax = caTaxable * 0.02;
    stateTax = Math.round(stateTax);
  } else if (region === 'us_texas') {
    // Texas has 0% state personal income tax
    stateTax = 0;
  }

  const totalEstimatedTax = Math.round(federalTax + stateTax);
  const effectiveTaxRatePercent = grossIncome > 0 ? Number(((totalEstimatedTax / grossIncome) * 100).toFixed(2)) : 0;
  const netIncomeAfterTax = Math.max(0, grossIncome - totalEstimatedTax);

  let regionTitle = 'US Federal';
  if (region === 'us_california') regionTitle = 'US (Federal + California State)';
  else if (region === 'us_texas') regionTitle = 'US (Federal + Texas 0% State)';

  return {
    region,
    assessmentOrTaxYear: taxYear,
    regimeOrStatusLabel: `${statusLabels[filingStatus]} (${regionTitle})`,
    grossIncome,
    totalDeductions,
    taxableIncome,
    taxBeforeRebate: Math.round(federalTax),
    rebateAmount: 0,
    taxAfterRebate: Math.round(federalTax),
    surchargeAmount: 0,
    cessOrStateTaxAmount: stateTax,
    totalEstimatedTax,
    effectiveTaxRatePercent,
    marginalTaxRatePercent: marginalRate,
    netIncomeAfterTax,
    slabBreakdown,
    currencySymbol: '$',
  };
}
