/**
 * Gratuity Calculator Logic
 * Based primarily on the Payment of Gratuity Act, 1972 (India)
 * and relevant provisions of the Indian Income Tax Act (Section 10(10)).
 *
 * Supports both Simple and Advanced calculation modes.
 */

export const STATUTORY_TAX_EXEMPT_LIMIT = 2000000; // ₹20,00,000 (20 Lakhs)

// ─────────────────────────────────────────────────────────────────────────────
// 1. SIMPLE GRATUITY INTERFACES & LOGIC
// ─────────────────────────────────────────────────────────────────────────────

export interface SimpleGratuityInput {
  monthlySalary: number; // Monthly Salary (Basic + DA)
  yearsOfService: number; // Completed years
  monthsOfService?: number; // Additional months (0-11)
}

export interface SimpleGratuityResult {
  monthlySalary: number;
  actualYears: number;
  actualMonths: number;
  actualServiceDurationText: string;
  eligibleYears: number;
  isRoundedUp: boolean;
  formulaUsed: string;
  gratuityAmount: number;
  isEligible: boolean;
  eligibilityWarning?: string;
}

export function calculateSimpleGratuity(input: SimpleGratuityInput): SimpleGratuityResult {
  const salary = Math.max(0, Number(input.monthlySalary) || 0);
  const years = Math.max(0, Math.floor(Number(input.yearsOfService) || 0));
  const months = Math.max(0, Math.min(11, Math.floor(Number(input.monthsOfService) || 0)));

  // Service rounding: > 6 months rounds up, <= 6 months does not round up
  const isRoundedUp = months > 6;
  const eligibleYears = isRoundedUp ? years + 1 : years;

  // Formula: (Monthly Salary × 15 × Eligible Years) ÷ 26
  const rawGratuity = (salary * 15 * eligibleYears) / 26;
  const gratuityAmount = Math.round((rawGratuity + Number.EPSILON) * 100) / 100;

  // Normal eligibility: 5 years continuous service
  const isEligible = years >= 5;
  let eligibilityWarning: string | undefined;

  if (!isEligible) {
    eligibilityWarning = `Continuous service is ${years} year${years === 1 ? '' : 's'}${months > 0 ? ` and ${months} month${months === 1 ? '' : 's'}` : ''}. Under the Payment of Gratuity Act, 1972, a minimum of 5 years continuous service is mandatory for normal resignation or retirement. Gratuity is not legally payable unless exempted by employer policy.`;
  }

  const durationParts = [];
  durationParts.push(`${years} Year${years === 1 ? '' : 's'}`);
  if (months > 0) {
    durationParts.push(`${months} Month${months === 1 ? '' : 's'}`);
  }
  const actualServiceDurationText = durationParts.join(' ');

  const formulaUsed = `(${salary.toLocaleString('en-IN')} × 15 × ${eligibleYears}) ÷ 26`;

  return {
    monthlySalary: salary,
    actualYears: years,
    actualMonths: months,
    actualServiceDurationText,
    eligibleYears,
    isRoundedUp,
    formulaUsed,
    gratuityAmount,
    isEligible,
    eligibilityWarning
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. ADVANCED GRATUITY INTERFACES & LOGIC
// ─────────────────────────────────────────────────────────────────────────────

export type EmploymentSituation = 'resignation' | 'retirement' | 'termination' | 'death' | 'disability';

export interface AdvancedGratuityInput {
  basicSalary: number;
  dearnessAllowance?: number;
  yearsOfService: number;
  monthsOfService?: number;
  employmentSituation: EmploymentSituation;
}

export interface AdvancedGratuityResult {
  isEligible: boolean;
  isWaiverApplied: boolean;
  eligibilityStatus: string;
  eligibilityDetail: string;
  basicSalary: number;
  dearnessAllowance: number;
  totalSalaryConsidered: number;
  actualYears: number;
  actualMonths: number;
  actualServiceDurationText: string;
  eligibleYears: number;
  isRoundedUp: boolean;
  dailySalary: number; // Total Salary ÷ 26
  fifteenDaysSalary: number; // Daily Salary × 15
  formulaCalculationText: string;
  gratuityAmount: number;
  statutoryLimit: number;
  exemptAmount: number;
  taxableAmount: number;
  statutoryTaxInfo: string;
  disclaimer: string;
}

export function calculateAdvancedGratuity(input: AdvancedGratuityInput): AdvancedGratuityResult {
  const basic = Math.max(0, Number(input.basicSalary) || 0);
  const da = Math.max(0, Number(input.dearnessAllowance) || 0);
  const totalSalary = basic + da;
  const years = Math.max(0, Math.floor(Number(input.yearsOfService) || 0));
  const months = Math.max(0, Math.min(11, Math.floor(Number(input.monthsOfService) || 0)));
  const situation = input.employmentSituation || 'resignation';

  // Rounding: > 6 months rounds up, <= 6 months does not round up
  const isRoundedUp = months > 6;
  const eligibleYears = isRoundedUp ? years + 1 : years;

  // Daily salary and 15 days salary
  const dailySalary = Math.round(((totalSalary / 26) + Number.EPSILON) * 100) / 100;
  const fifteenDaysSalary = Math.round(((dailySalary * 15) + Number.EPSILON) * 100) / 100;

  // Final Gratuity = (Basic + DA) * 15 * Eligible Years / 26
  const rawGratuity = (totalSalary * 15 * eligibleYears) / 26;
  const gratuityAmount = Math.round((rawGratuity + Number.EPSILON) * 100) / 100;

  // Eligibility rule:
  // Normal (resignation, retirement, termination): requires >= 5 years
  // Death or permanent disability: 5-year requirement waived!
  const isWaiverApplied = situation === 'death' || situation === 'disability';
  const isEligible = isWaiverApplied || years >= 5;

  let eligibilityStatus = '';
  let eligibilityDetail = '';

  if (!isEligible) {
    eligibilityStatus = 'Below 5 Years — Ineligible';
    eligibilityDetail = `Total continuous service is ${years} years and ${months} months. Under Section 4(1) of the Payment of Gratuity Act, 1972, at least 5 years continuous service is mandatory for ${situation}. Gratuity is not legally payable unless provided by employer contract or policy.`;
  } else if (isWaiverApplied) {
    eligibilityStatus = '5-Year Rule Waived (Eligible)';
    eligibilityDetail = `Under Section 4(1) proviso of the Payment of Gratuity Act, 1972, the 5-year continuous service rule is legally waived in the event of ${situation === 'death' ? 'death' : 'permanent disablement'}. Gratuity is payable immediately.`;
  } else {
    eligibilityStatus = 'Statutorily Eligible';
    eligibilityDetail = `Continuous service exceeds 5 completed years (${years} years, ${months} months). Employee meets all statutory conditions under the Payment of Gratuity Act, 1972.`;
  }

  const durationParts = [];
  durationParts.push(`${years} Year${years === 1 ? '' : 's'}`);
  if (months > 0) {
    durationParts.push(`${months} Month${months === 1 ? '' : 's'}`);
  }
  const actualServiceDurationText = durationParts.join(' ');

  const formulaCalculationText = `(${totalSalary.toLocaleString('en-IN')} × 15 × ${eligibleYears}) ÷ 26 = ₹${gratuityAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const statutoryLimit = STATUTORY_TAX_EXEMPT_LIMIT;
  const exemptAmount = Math.min(gratuityAmount, statutoryLimit);
  const taxableAmount = Math.max(0, Math.round((gratuityAmount - exemptAmount + Number.EPSILON) * 100) / 100);

  const statutoryTaxInfo = `Under Section 10(10) of the Indian Income Tax Act, gratuity received is tax-exempt up to ₹20,00,000 (₹20 Lakhs). For this calculation, ${taxableAmount > 0 ? `₹${exemptAmount.toLocaleString('en-IN')} is tax-free and ₹${taxableAmount.toLocaleString('en-IN')} is taxable.` : 'the entire calculated amount is 100% tax-free.'}`;

  const disclaimer = `This calculation is an estimate based on the Payment of Gratuity Act, 1972 and Section 10(10) of the Income Tax Act. Final gratuity payable may depend on applicable labor laws, employer gratuity trust rules, employment contracts, awards, or more beneficial service terms offered by the establishment.`;

  return {
    isEligible,
    isWaiverApplied,
    eligibilityStatus,
    eligibilityDetail,
    basicSalary: basic,
    dearnessAllowance: da,
    totalSalaryConsidered: totalSalary,
    actualYears: years,
    actualMonths: months,
    actualServiceDurationText,
    eligibleYears,
    isRoundedUp,
    dailySalary,
    fifteenDaysSalary,
    formulaCalculationText,
    gratuityAmount,
    statutoryLimit,
    exemptAmount,
    taxableAmount,
    statutoryTaxInfo,
    disclaimer
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. MASTER BACKWARD-COMPATIBLE FUNCTION (used by tests & registries)
// ─────────────────────────────────────────────────────────────────────────────

export interface GratuityInput {
  monthlySalary?: number;
  basicSalary?: number;
  dearnessAllowance?: number;
  yearsOfService: number;
  monthsOfService?: number;
  isCoveredUnderAct?: boolean;
  reasonForExit?: 'resignation' | 'retirement' | 'death' | 'disability' | 'normal' | 'termination';
}

export interface GratuityResult {
  isEligible: boolean;
  eligibilityMessage: string;
  isWaiverApplied: boolean;
  totalServiceYears: number;
  totalServiceMonths: number;
  roundedServiceYears: number;
  monthlySalaryBasis: number;
  gratuityAmount: number;
  exemptAmount: number;
  taxableAmount: number;
  statutoryLimit: number;
  formulaDescription: string;
  calculationSteps: {
    label: string;
    value: string;
    note?: string;
  }[];
}

export function calculateGratuity(input: GratuityInput): GratuityResult {
  const basic = Math.max(0, Number(input.basicSalary) || 0);
  const da = Math.max(0, Number(input.dearnessAllowance) || 0);
  const years = Math.max(0, Math.floor(Number(input.yearsOfService) || 0));
  const months = Math.max(0, Math.min(11, Math.floor(Number(input.monthsOfService) || 0)));
  const reason = input.reasonForExit || 'resignation';

  const isWaiverApplied = reason === 'death' || reason === 'disability';
  const isEligible = isWaiverApplied || years >= 5;

  const isRoundedUp = months > 6;
  const roundedServiceYears = isRoundedUp ? years + 1 : years;

  const monthlySalaryBasis = input.monthlySalary !== undefined
    ? Math.max(0, Number(input.monthlySalary) || 0)
    : (basic + da);

  const rawGratuity = (monthlySalaryBasis * 15 * roundedServiceYears) / 26;
  const gratuityAmount = Math.round((rawGratuity + Number.EPSILON) * 100) / 100;
  const statutoryLimit = STATUTORY_TAX_EXEMPT_LIMIT;
  const exemptAmount = Math.min(gratuityAmount, statutoryLimit);
  const taxableAmount = Math.max(0, Math.round((gratuityAmount - exemptAmount + Number.EPSILON) * 100) / 100);

  let eligibilityMessage = '';
  if (!isEligible) {
    eligibilityMessage = `Minimum 5 years continuous service is mandatory under the Payment of Gratuity Act, 1972 for normal resignation/retirement (current service: ${years} years, ${months} months). Gratuity is not legally payable unless exempted by employer policy.`;
  } else if (isWaiverApplied) {
    eligibilityMessage = `The 5-year continuous service rule is waived in case of ${reason === 'death' ? 'death' : 'permanent disablement'} under Section 4(1) of the Payment of Gratuity Act. Gratuity is payable immediately.`;
  } else {
    eligibilityMessage = `Eligible for statutory gratuity (Continuous service of 5 or more completed years).`;
  }

  const formulaDesc = `(${monthlySalaryBasis.toLocaleString('en-IN')} × 15 × ${roundedServiceYears}) ÷ 26`;

  return {
    isEligible,
    eligibilityMessage,
    isWaiverApplied,
    totalServiceYears: years,
    totalServiceMonths: months,
    roundedServiceYears,
    monthlySalaryBasis,
    gratuityAmount,
    exemptAmount,
    taxableAmount,
    statutoryLimit,
    formulaDescription: formulaDesc,
    calculationSteps: [
      {
        label: 'Monthly Salary Basis',
        value: `₹${monthlySalaryBasis.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        note: `Basic: ₹${basic.toLocaleString('en-IN')} + DA: ₹${da.toLocaleString('en-IN')}`
      },
      {
        label: 'Eligible Tenure',
        value: `${roundedServiceYears} Years`,
        note: isRoundedUp ? `${years}y ${months}m rounded UP to ${roundedServiceYears} years` : `${years}y ${months}m (≤ 6 mos, not rounded up)`
      },
      {
        label: 'Calculated Gratuity',
        value: `₹${gratuityAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        note: formulaDesc
      },
      {
        label: 'Tax-Free Exemption Cap',
        value: `₹${statutoryLimit.toLocaleString('en-IN')}`,
        note: 'Section 10(10) maximum exemption'
      }
    ]
  };
}
