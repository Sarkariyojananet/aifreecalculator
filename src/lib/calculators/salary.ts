/**
 * Comprehensive Salary & Take-Home Pay (CTC to In-Hand) Calculation Engine
 * Supports:
 * - Input types: CTC, Gross Salary, Monthly Salary
 * - Salary components: Basic, HRA, Special Allowance, Performance Bonus / Variable
 * - Employee deductions: EPF (12% of Basic), Professional Tax (PT), Estimated TDS / Income Tax, Other Deductions
 * - Tax Regimes: New Tax Regime (Budget 2024/2025/2026 revisions with ₹75k standard deduction) vs Old Tax Regime
 */

export type SalaryInputType = 'ctc' | 'gross' | 'monthly';
export type SalaryTaxRegime = 'new' | 'old' | 'compare';

export interface SalaryInput {
  inputType: SalaryInputType;
  amount: number; // Annual CTC, Annual Gross, or Monthly Gross
  bonusAnnual?: number;
  basicPercentage?: number; // default 40% - 50%
  hraPercentage?: number; // default 20%
  professionalTaxMonthly?: number; // default 200
  employeePfPercentage?: number; // default 12%
  monthlyOtherDeductions?: number;
  taxRegime?: SalaryTaxRegime;
  // Old regime deductions
  section80C?: number;
  section80D?: number;
}

export interface SalaryComponentRow {
  componentName: string;
  type: 'earning' | 'deduction';
  monthlyAmount: number;
  annualAmount: number;
}

export interface SingleSalaryCalculationResult {
  inputType: SalaryInputType;
  taxRegime: 'New Tax Regime' | 'Old Tax Regime';
  annualCtc: number;
  annualGross: number;
  monthlyGross: number;
  annualBasic: number;
  monthlyBasic: number;
  annualHra: number;
  monthlyHra: number;
  annualSpecial: number;
  monthlySpecial: number;
  annualBonus: number;
  annualEmployerPf: number;
  monthlyEmployerPf: number;
  annualEmployeePf: number;
  monthlyEmployeePf: number;
  annualPt: number;
  monthlyPt: number;
  annualTds: number;
  monthlyTds: number;
  annualOtherDeductions: number;
  monthlyOtherDeductions: number;
  totalAnnualDeductions: number;
  totalMonthlyDeductions: number;
  inHandAnnualSalary: number;
  inHandMonthlySalary: number;
  breakdownRows: SalaryComponentRow[];
}

export interface SalaryComparisonResult {
  newRegime: SingleSalaryCalculationResult;
  oldRegime: SingleSalaryCalculationResult;
  recommendedRegime: 'New Tax Regime' | 'Old Tax Regime' | 'Equal';
  monthlySavings: number;
  annualSavings: number;
}

export function computeTaxForSalary(
  grossIncome: number,
  regime: 'new' | 'old',
  c80: number = 0,
  d80: number = 0
): number {
  if (grossIncome <= 0) return 0;

  if (regime === 'new') {
    // Standard deduction ₹75,000 for salaried
    const taxable = Math.max(0, grossIncome - 75000);
    if (taxable <= 700000) return 0; // Section 87A full rebate

    let tax = 0;
    if (taxable > 1500000) tax = 140000 + (taxable - 1500000) * 0.30;
    else if (taxable > 1200000) tax = 80000 + (taxable - 1200000) * 0.20;
    else if (taxable > 1000000) tax = 50000 + (taxable - 1000000) * 0.15;
    else if (taxable > 700000) tax = 20000 + (taxable - 700000) * 0.10;
    else if (taxable > 300000) tax = (taxable - 300000) * 0.05;

    return Math.round(tax * 1.04); // 4% cess
  } else {
    // Old Regime: ₹50,000 std ded + 80C + 80D
    const totalDeduct = 50000 + Math.min(150000, c80) + Math.min(50000, d80);
    const taxable = Math.max(0, grossIncome - totalDeduct);
    if (taxable <= 500000) return 0; // 87A rebate up to 5L

    let tax = 0;
    if (taxable > 1000000) tax = 112500 + (taxable - 1000000) * 0.30;
    else if (taxable > 500000) tax = 12500 + (taxable - 500000) * 0.20;
    else if (taxable > 250000) tax = (taxable - 250000) * 0.05;

    return Math.round(tax * 1.04); // 4% cess
  }
}

export function calculateSalaryComprehensive(
  input: SalaryInput,
  regimeOverride?: 'new' | 'old'
): SingleSalaryCalculationResult {
  const inputType = input.inputType || 'ctc';
  const rawAmount = Math.max(0, input.amount || 0);
  const bonusAnnual = Math.max(0, input.bonusAnnual || 0);
  const basicPct = Math.max(10, Math.min(80, input.basicPercentage || 45));
  const hraPct = Math.max(0, Math.min(50, input.hraPercentage || 20));
  const ptMonthly = Math.max(0, input.professionalTaxMonthly ?? 200);
  const epfPct = Math.max(0, Math.min(20, input.employeePfPercentage ?? 12));
  const otherMonthly = Math.max(0, input.monthlyOtherDeductions || 0);

  const selectedRegime = regimeOverride || (input.taxRegime === 'old' ? 'old' : 'new');

  let annualCtc = 0;
  let annualGross = 0;
  let monthlyGross = 0;

  if (inputType === 'ctc') {
    annualCtc = rawAmount;
    // In CTC mode: Fixed CTC = CTC - Bonus.
    // Employer EPF (12% of basic) is part of CTC.
    const fixedCtc = Math.max(0, annualCtc - bonusAnnual);
    const estBasic = (fixedCtc * basicPct) / 100;
    const estEmployerPf = (estBasic * epfPct) / 100;
    annualGross = Math.max(0, fixedCtc - estEmployerPf);
    monthlyGross = Math.round(annualGross / 12);
  } else if (inputType === 'gross') {
    annualGross = rawAmount;
    monthlyGross = Math.round(annualGross / 12);
    const estBasic = (annualGross * basicPct) / 100;
    const estEmployerPf = (estBasic * epfPct) / 100;
    annualCtc = annualGross + estEmployerPf + bonusAnnual;
  } else {
    // monthly salary
    monthlyGross = rawAmount;
    annualGross = monthlyGross * 12;
    const estBasic = (annualGross * basicPct) / 100;
    const estEmployerPf = (estBasic * epfPct) / 100;
    annualCtc = annualGross + estEmployerPf + bonusAnnual;
  }

  // Component breakdowns
  const monthlyBasic = Math.round((monthlyGross * basicPct) / 100);
  const annualBasic = monthlyBasic * 12;

  const monthlyHra = Math.round((monthlyGross * hraPct) / 100);
  const annualHra = monthlyHra * 12;

  const monthlySpecial = Math.max(0, monthlyGross - monthlyBasic - monthlyHra);
  const annualSpecial = monthlySpecial * 12;

  // Deductions
  const monthlyEmployeePf = Math.round((monthlyBasic * epfPct) / 100);
  const annualEmployeePf = monthlyEmployeePf * 12;

  const monthlyEmployerPf = monthlyEmployeePf;
  const annualEmployerPf = monthlyEmployerPf * 12;

  const annualPt = ptMonthly * 12;

  const annualOtherDeductions = otherMonthly * 12;

  // Compute TDS
  const annualTds = computeTaxForSalary(
    annualGross + bonusAnnual,
    selectedRegime,
    annualEmployeePf + (input.section80C || 0),
    input.section80D || 0
  );
  const monthlyTds = Math.round(annualTds / 12);

  const totalMonthlyDeductions = monthlyEmployeePf + ptMonthly + monthlyTds + otherMonthly;
  const totalAnnualDeductions = totalMonthlyDeductions * 12;

  const inHandMonthlySalary = Math.max(0, monthlyGross - totalMonthlyDeductions);
  const inHandAnnualSalary = inHandMonthlySalary * 12 + bonusAnnual;

  const breakdownRows: SalaryComponentRow[] = [
    { componentName: 'Basic Salary', type: 'earning', monthlyAmount: monthlyBasic, annualAmount: annualBasic },
    { componentName: 'House Rent Allowance (HRA)', type: 'earning', monthlyAmount: monthlyHra, annualAmount: annualHra },
    { componentName: 'Special / Other Allowances', type: 'earning', monthlyAmount: monthlySpecial, annualAmount: annualSpecial },
  ];

  if (bonusAnnual > 0) {
    breakdownRows.push({
      componentName: 'Annual Performance Bonus / Variable',
      type: 'earning',
      monthlyAmount: Math.round(bonusAnnual / 12),
      annualAmount: bonusAnnual,
    });
  }

  breakdownRows.push(
    { componentName: 'Employee Provident Fund (EPF 12%)', type: 'deduction', monthlyAmount: monthlyEmployeePf, annualAmount: annualEmployeePf },
    { componentName: 'Professional Tax (PT)', type: 'deduction', monthlyAmount: ptMonthly, annualAmount: annualPt },
    { componentName: 'Estimated Income Tax / TDS', type: 'deduction', monthlyAmount: monthlyTds, annualAmount: annualTds }
  );

  if (otherMonthly > 0) {
    breakdownRows.push({
      componentName: 'Insurance & Other Deductions',
      type: 'deduction',
      monthlyAmount: otherMonthly,
      annualAmount: annualOtherDeductions,
    });
  }

  return {
    inputType,
    taxRegime: selectedRegime === 'new' ? 'New Tax Regime' : 'Old Tax Regime',
    annualCtc: Math.round(annualCtc),
    annualGross: Math.round(annualGross),
    monthlyGross: Math.round(monthlyGross),
    annualBasic,
    monthlyBasic,
    annualHra,
    monthlyHra,
    annualSpecial,
    monthlySpecial,
    annualBonus: bonusAnnual,
    annualEmployerPf,
    monthlyEmployerPf,
    annualEmployeePf,
    monthlyEmployeePf,
    annualPt,
    monthlyPt: ptMonthly,
    annualTds,
    monthlyTds,
    annualOtherDeductions,
    monthlyOtherDeductions: otherMonthly,
    totalAnnualDeductions,
    totalMonthlyDeductions,
    inHandAnnualSalary,
    inHandMonthlySalary,
    breakdownRows,
  };
}

export function compareSalaryRegimes(input: SalaryInput): SalaryComparisonResult {
  const newRegime = calculateSalaryComprehensive(input, 'new');
  const oldRegime = calculateSalaryComprehensive(input, 'old');

  let recommendedRegime: 'New Tax Regime' | 'Old Tax Regime' | 'Equal' = 'New Tax Regime';
  if (newRegime.inHandMonthlySalary > oldRegime.inHandMonthlySalary) {
    recommendedRegime = 'New Tax Regime';
  } else if (oldRegime.inHandMonthlySalary > newRegime.inHandMonthlySalary) {
    recommendedRegime = 'Old Tax Regime';
  } else {
    recommendedRegime = 'Equal';
  }

  const monthlySavings = Math.abs(newRegime.inHandMonthlySalary - oldRegime.inHandMonthlySalary);
  const annualSavings = Math.abs(newRegime.inHandAnnualSalary - oldRegime.inHandAnnualSalary);

  return {
    newRegime,
    oldRegime,
    recommendedRegime,
    monthlySavings,
    annualSavings,
  };
}
