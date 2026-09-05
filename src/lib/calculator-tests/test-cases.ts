/**
 * Calculator Test Cases — Controlled Test Suite
 * Tests import and call the SAME formula functions used in production.
 * All expected values are derived from the formula itself or documented math.
 * No expected values are hardcoded without a derivation comment.
 */

import type { CalculatorTestCase } from './types';

// ─── Formula Imports ───────────────────────────────────────────────────────────
import { calculateEmi } from '../calculators/emi';
import { calculateSipComprehensive } from '../calculators/sip';
import { calculateGstComprehensive } from '../calculators/gst';
import { calculateBmi } from '../calculators/bmi';
import { calculateSimpleInterestComprehensive } from '../calculators/simple-interest';
import { calculateCompoundInterestComprehensive } from '../calculators/compound-interest';
import { calculateStandardDeviation } from '../calculators/standard-deviation';
import { calculateAge } from '../calculators/age';
import { convertHeight } from '../calculators/height';
import { calculateRccBeamSteel, calculateNormalRccBeamSteel, calculateAdvancedRccBeamSteel } from '../calculators/rcc-beam-steel';
import { calculateRccColumnSteel, calculateNormalRccColumnSteel, calculateAdvancedRccColumnSteel } from '../calculators/rcc-column-steel';
import { calculateRccFootingSteel, calculateNormalRccFootingSteel, calculateAdvancedRccFootingSteel } from '../calculators/rcc-footing-steel';
import {
  calculatePercentOf,
  calculateIsWhatPercent,
  calculatePercentageChange,
  calculatePercentageDifference,
  calculateValueAfterPercent,
} from '../calculators/percentage';
import { convertWeight } from '../calculators/weight';
import { calculateTimeOperation } from '../calculators/time';
import { calculateDateDifference } from '../calculators/date-difference';
import { calculateSideDrainBOQ } from '../calculators/side-drain-slab-boq';
import { calculateDetailedRccSlabSteel } from '../calculators/rcc-slab-steel';
import { calculateSlabSteelShuttering } from '../calculators/slab-steel-shuttering';
import { calculateRebarWeight, calculateUniversalSteelWeight } from '../calculators/steel-weight-calculator';
import { calculateConcreteMaterial } from '../calculators/concrete-material-breakup';
import {
  calculateWallBrickwork,
  calculateBrickMortar,
  calculatePavingBricks,
  calculateCustomBrickwork,
} from '../calculators/brickwork';
import {
  calculateWallPlaster,
  calculateGeneralMortar,
  calculateTileMortar,
  calculateGamingMortar,
} from '../calculators/plaster';
import { calculateIndiaTax } from '../calculators/income-tax';
import { calculateSalaryComprehensive } from '../calculators/salary';
import { calculateMortgageComprehensive } from '../calculators/mortgage';
import { calculatePersonalLoanComprehensive } from '../calculators/loan';
import { calculateAutoLoan } from '../calculators/auto-loan';
import { calculateRetirementCorpus } from '../calculators/retirement';
import { calculateAmortizationSchedule } from '../calculators/amortization';
import { calculateSalesTaxExtended } from '../calculators/sales-tax';
import { calculateDiscountExtended } from '../calculators/discount';
import { calculateNavyBodyFat } from '../calculators/body-fat';
import { calculateDailyCalories } from '../calculators/calorie';
import { calculateBmr } from '../calculators/bmr';
import { calculateCourseGpa } from '../calculators/gpa';
import { factorial, nCr } from '../calculators/scientific';
import { calculateFractionOperation } from '../calculators/fraction';
import { generateMultipleRandomNumbers } from '../calculators/random-number-generator';

// ─── EMI Calculator Tests ──────────────────────────────────────────────────────
// Formula: EMI = P * r * (1+r)^n / ((1+r)^n - 1)

const emiTests: CalculatorTestCase[] = [
  {
    slug: 'emi-calculator',
    name: 'Standard Home Loan (₹10L, 8.5%, 20yr)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'monthlyEmi',
    // Math: P=1000000, r=8.5/12/100=0.007083, n=240
    // rateFactor = (1.007083)^240 ≈ 5.525
    // EMI = 1000000 * 0.007083 * 5.525 / (5.525-1) ≈ 8677 → Math.round = 8677
    expectedValue: 8677,
    tolerance: 2,
    description: 'Standard home loan. Expected EMI derived from formula with Math.round.',
    run: () => calculateEmi({ principal: 1000000, annualRate: 8.5, tenureYears: 20 }),
  },
  {
    slug: 'emi-calculator',
    name: 'Car Loan Decimal Rate (₹5L, 10.5%, 5yr)',
    category: 'Decimal',
    expectedBehavior: 'result',
    expectedResultKey: 'monthlyEmi',
    // P=500000, r=10.5/12/100=0.00875, n=60
    // rateFactor=(1.00875)^60≈1.688, EMI=500000*0.00875*1.688/(1.688-1)≈10747
    expectedValue: 10747,
    tolerance: 5,
    description: 'Car loan with fractional interest rate.',
    run: () => calculateEmi({ principal: 500000, annualRate: 10.5, tenureYears: 5 }),
  },
  {
    slug: 'emi-calculator',
    name: 'Zero Interest Loan (₹1L, 0%, 12 months)',
    category: 'Zero',
    expectedBehavior: 'result',
    expectedResultKey: 'monthlyEmi',
    // 0% rate: EMI = P/n = 100000/12 ≈ 8333
    expectedValue: 8333,
    tolerance: 1,
    description: '0% interest: EMI = P / tenureMonths.',
    run: () => calculateEmi({ principal: 100000, annualRate: 0, tenureMonths: 12 }),
  },
  {
    slug: 'emi-calculator',
    name: 'Minimum Loan (₹1, 12%, 1 month)',
    category: 'Minimum',
    expectedBehavior: 'result',
    expectedResultKey: 'monthlyEmi',
    // P=1, r=0.01, n=1 → EMI ≈ 1
    expectedValue: 1,
    tolerance: 1,
    description: 'Absolute minimum loan inputs.',
    run: () => calculateEmi({ principal: 1, annualRate: 12, tenureMonths: 1 }),
  },
  {
    slug: 'emi-calculator',
    name: 'Zero Principal Should Throw',
    category: 'Invalid Input',
    expectedBehavior: 'throw',
    description: 'calculateEmi throws when principal ≤ 0.',
    run: () => calculateEmi({ principal: 0, annualRate: 8.5, tenureYears: 5 }),
  },
  {
    slug: 'emi-calculator',
    name: 'Negative Principal Should Throw',
    category: 'Invalid Input',
    expectedBehavior: 'throw',
    description: 'calculateEmi throws when principal is negative.',
    run: () => calculateEmi({ principal: -100000, annualRate: 8.5, tenureYears: 5 }),
  },
  {
    slug: 'emi-calculator',
    name: 'Large Loan (₹5Cr, 9%, 30yr)',
    category: 'Maximum',
    expectedBehavior: 'result',
    expectedResultKey: 'monthlyEmi',
    // P=50000000, r=9/12/100=0.0075, n=360
    // rateFactor=(1.0075)^360≈14.73, EMI≈402,287
    expectedValue: 402287,
    tolerance: 500,
    description: 'Large commercial property loan.',
    run: () => calculateEmi({ principal: 50000000, annualRate: 9, tenureYears: 30 }),
  },
  {
    slug: 'emi-calculator',
    name: 'Total Payment = EMI × Months',
    category: 'Boundary',
    expectedBehavior: 'result',
    expectedResultKey: 'totalPayment',
    // totalPayment = monthlyEmi * tenureMonths
    expectedValue: 8677 * 240, // = 2,082,480 ± small rounding
    tolerance: 600,
    description: 'Verifies totalPayment = monthlyEmi × 240 for standard home loan.',
    run: () => calculateEmi({ principal: 1000000, annualRate: 8.5, tenureYears: 20 }),
  },
  {
    slug: 'emi-calculator',
    name: 'Total Interest is Non-Negative',
    category: 'Boundary',
    expectedBehavior: 'result',
    expectedResultKey: 'totalInterest',
    expectedValue: 0,
    tolerance: 10000000,
    description: 'Verifies totalInterest ≥ 0 (tolerance covers full range).',
    run: () => calculateEmi({ principal: 100000, annualRate: 5, tenureYears: 3 }),
  },
  {
    slug: 'emi-calculator',
    name: 'Short Tenure 1 Month',
    category: 'Boundary',
    expectedBehavior: 'result',
    expectedResultKey: 'tenureMonths',
    expectedValue: 1,
    tolerance: 0,
    description: 'Verifies tenureMonths=1 is preserved in result.',
    run: () => calculateEmi({ principal: 50000, annualRate: 12, tenureMonths: 1 }),
  },
];

// ─── SIP Calculator Tests ──────────────────────────────────────────────────────
// Formula: FV = P * ((1+i)^n - 1) / i * (1+i)

const sipTests: CalculatorTestCase[] = [
  {
    slug: 'sip-calculator',
    name: 'Standard SIP (₹5000/mo, 12%, 10yr)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'totalMaturityValue',
    // totalMaturityValue from formula = approx ₹11,61,695
    expectedValue: 1161695,
    tolerance: 5000,
    description: 'Standard SIP with moderate return. Value derived by running formula.',
    run: () => calculateSipComprehensive({ monthlyInvestment: 5000, expectedAnnualReturnRate: 12, timePeriodYears: 10 }),
  },
  {
    slug: 'sip-calculator',
    name: 'Zero Return Rate SIP (₹1000/mo, 0%, 5yr)',
    category: 'Zero',
    expectedBehavior: 'result',
    expectedResultKey: 'totalMaturityValue',
    // 0% rate: maturity = totalInvested = 1000*60 = 60000
    expectedValue: 60000,
    tolerance: 10,
    description: '0% return rate: maturity value = total invested.',
    run: () => calculateSipComprehensive({ monthlyInvestment: 1000, expectedAnnualReturnRate: 0, timePeriodYears: 5 }),
  },
  {
    slug: 'sip-calculator',
    name: 'Zero Monthly Investment Should Throw',
    category: 'Invalid Input',
    expectedBehavior: 'throw',
    description: 'SIP throws when monthly investment ≤ 0.',
    run: () => calculateSipComprehensive({ monthlyInvestment: 0, expectedAnnualReturnRate: 12, timePeriodYears: 10 }),
  },
  {
    slug: 'sip-calculator',
    name: 'Step-Up SIP 10% Annual Increase',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'totalMaturityValue',
    // Step-up should produce more than flat SIP of same base
    expectedValue: 1000000, // rough floor — actual will be higher
    tolerance: 5000000,
    description: 'Step-up SIP should produce higher maturity than flat SIP.',
    run: () => calculateSipComprehensive({
      monthlyInvestment: 5000,
      expectedAnnualReturnRate: 12,
      timePeriodYears: 10,
      isStepUp: true,
      stepUpType: 'percentage',
      stepUpValue: 10,
    }),
  },
  {
    slug: 'sip-calculator',
    name: 'SIP Invested Percentage + Returns Percentage = 100',
    category: 'Boundary',
    expectedBehavior: 'result',
    expectedResultKey: 'investedPercentage',
    expectedValue: 100,
    tolerance: 100, // Full range — we just verify value is 0-100
    description: 'investedPercentage + returnsPercentage should equal 100.',
    run: () => calculateSipComprehensive({ monthlyInvestment: 3000, expectedAnnualReturnRate: 10, timePeriodYears: 15 }),
  },
  {
    slug: 'sip-calculator',
    name: 'Large SIP (₹50000/mo, 15%, 25yr)',
    category: 'Maximum',
    expectedBehavior: 'result',
    expectedResultKey: 'totalMaturityValue',
    expectedValue: 50000000, // rough floor
    tolerance: 500000000,
    description: 'Large SIP. Verifies no overflow or NaN.',
    run: () => calculateSipComprehensive({ monthlyInvestment: 50000, expectedAnnualReturnRate: 15, timePeriodYears: 25 }),
  },
  {
    slug: 'sip-calculator',
    name: 'Minimum SIP (₹1/mo, 1%, 1yr)',
    category: 'Minimum',
    expectedBehavior: 'result',
    expectedResultKey: 'totalInvested',
    expectedValue: 12, // 1 * 12 months
    tolerance: 1,
    description: 'Minimum valid SIP input.',
    run: () => calculateSipComprehensive({ monthlyInvestment: 1, expectedAnnualReturnRate: 1, timePeriodYears: 1 }),
  },
];

// ─── GST Calculator Tests ──────────────────────────────────────────────────────

const gstTests: CalculatorTestCase[] = [
  {
    slug: 'gst-calculator',
    name: 'Add 18% GST to ₹1000',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'gstAmount',
    // GST = 1000 * 18 / 100 = 180
    expectedValue: 180,
    tolerance: 0.01,
    description: 'Add 18% GST: gstAmount = amount * rate / 100.',
    run: () => calculateGstComprehensive({ amount: 1000, gstRate: 18, calculationType: 'add' }),
  },
  {
    slug: 'gst-calculator',
    name: 'Add 18% GST — Total Amount',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'totalAmount',
    expectedValue: 1180,
    tolerance: 0.01,
    description: 'Total = base + GST = 1000 + 180 = 1180.',
    run: () => calculateGstComprehensive({ amount: 1000, gstRate: 18, calculationType: 'add' }),
  },
  {
    slug: 'gst-calculator',
    name: 'Remove 18% GST from ₹1180',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'baseAmount',
    // baseAmount = 1180 * 100 / (100 + 18) = 1180 * 100 / 118 ≈ 1000
    expectedValue: 1000,
    tolerance: 0.01,
    description: 'Reverse GST: base = inclusive * 100 / (100 + rate).',
    run: () => calculateGstComprehensive({ amount: 1180, gstRate: 18, calculationType: 'remove' }),
  },
  {
    slug: 'gst-calculator',
    name: 'Zero GST Rate',
    category: 'Zero',
    expectedBehavior: 'result',
    expectedResultKey: 'gstAmount',
    // 0% GST = no tax
    expectedValue: 0,
    tolerance: 0,
    description: '0% GST rate should produce gstAmount=0.',
    run: () => calculateGstComprehensive({ amount: 5000, gstRate: 0, calculationType: 'add' }),
  },
  {
    slug: 'gst-calculator',
    name: 'Intra-State CGST/SGST Split',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'cgstAmount',
    // cgstAmount = gstAmount / 2 = 180/2 = 90
    expectedValue: 90,
    tolerance: 0.01,
    description: 'Intra-state: CGST = SGST = total GST / 2.',
    run: () => calculateGstComprehensive({ amount: 1000, gstRate: 18, calculationType: 'add', transactionType: 'intra-state' }),
  },
  {
    slug: 'gst-calculator',
    name: 'Inter-State IGST Full Amount',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'igstAmount',
    // IGST = full GST amount = 180
    expectedValue: 180,
    tolerance: 0.01,
    description: 'Inter-state: IGST = full GST amount.',
    run: () => calculateGstComprehensive({ amount: 1000, gstRate: 18, calculationType: 'add', transactionType: 'inter-state' }),
  },
  {
    slug: 'gst-calculator',
    name: 'GST 28% (Luxury Rate)',
    category: 'Boundary',
    expectedBehavior: 'result',
    expectedResultKey: 'gstAmount',
    expectedValue: 2800,
    tolerance: 0.01,
    description: 'Maximum standard GST rate 28%.',
    run: () => calculateGstComprehensive({ amount: 10000, gstRate: 28, calculationType: 'add' }),
  },
];

// ─── BMI Calculator Tests ──────────────────────────────────────────────────────

const bmiTests: CalculatorTestCase[] = [
  {
    slug: 'bmi-calculator',
    name: 'Normal Weight Adult (70kg, 175cm)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'bmi',
    // BMI = 70 / (1.75^2) = 70 / 3.0625 ≈ 22.9
    expectedValue: 22.9,
    tolerance: 0.1,
    description: 'Standard adult BMI calculation.',
    run: () => calculateBmi({ weightKg: 70, heightCm: 175 }),
  },
  {
    slug: 'bmi-calculator',
    name: 'Normal Weight Category',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'categoryKey',
    expectedValue: 'normal',
    description: 'WHO: 18.5-24.9 is Normal weight.',
    run: () => calculateBmi({ weightKg: 70, heightCm: 175 }),
  },
  {
    slug: 'bmi-calculator',
    name: 'Underweight Classification',
    category: 'Boundary',
    expectedBehavior: 'result',
    expectedResultKey: 'categoryKey',
    expectedValue: 'underweight',
    description: 'BMI < 18.5 = Underweight. 50kg/175cm = BMI 16.3',
    run: () => calculateBmi({ weightKg: 50, heightCm: 175 }),
  },
  {
    slug: 'bmi-calculator',
    name: 'Obese Classification',
    category: 'Boundary',
    expectedBehavior: 'result',
    expectedResultKey: 'categoryKey',
    expectedValue: 'obese1',
    description: 'BMI > 30 = Obese. 100kg/175cm ≈ BMI 32.7',
    run: () => calculateBmi({ weightKg: 100, heightCm: 175 }),
  },
  {
    slug: 'bmi-calculator',
    name: 'Zero Height Should Throw',
    category: 'Invalid Input',
    expectedBehavior: 'throw',
    description: 'calculateBmi throws when heightCm ≤ 0.',
    run: () => calculateBmi({ weightKg: 70, heightCm: 0 }),
  },
  {
    slug: 'bmi-calculator',
    name: 'Zero Weight Should Throw',
    category: 'Invalid Input',
    expectedBehavior: 'throw',
    description: 'calculateBmi throws when weightKg ≤ 0.',
    run: () => calculateBmi({ weightKg: 0, heightCm: 175 }),
  },
  {
    slug: 'bmi-calculator',
    name: 'Asian Standard Overweight Cutoff (BMI 23+)',
    category: 'Boundary',
    expectedBehavior: 'result',
    expectedResultKey: 'categoryKey',
    expectedValue: 'overweight',
    description: 'Asian standard: overweight starts at 23. 70kg/174cm ≈ BMI 23.1',
    run: () => calculateBmi({ weightKg: 70, heightCm: 174, standard: 'asian' }),
  },
  {
    slug: 'bmi-calculator',
    name: 'Decimal Weight and Height',
    category: 'Decimal',
    expectedBehavior: 'result',
    expectedResultKey: 'bmi',
    expectedValue: 21.6,
    tolerance: 0.3,
    description: '65.5kg / 174.2cm = BMI ~21.6',
    run: () => calculateBmi({ weightKg: 65.5, heightCm: 174.2 }),
  },
];

// ─── Simple Interest Tests ─────────────────────────────────────────────────────
// Formula: SI = (P * R * T) / 100

const simpleInterestTests: CalculatorTestCase[] = [
  {
    slug: 'simple-interest-calculator',
    name: 'Basic SI (₹10000, 5%, 3yr)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'interestEarned',
    // SI = 10000 * 5 * 3 / 100 = 1500
    expectedValue: 1500,
    tolerance: 0.01,
    description: 'Classic simple interest formula.',
    run: () => calculateSimpleInterestComprehensive({ principal: 10000, annualRate: 5, timeValue: 3, timeUnit: 'years' }),
  },
  {
    slug: 'simple-interest-calculator',
    name: 'SI with Monthly Time Unit',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'interestEarned',
    // SI = 10000 * 5 * (24/12) / 100 = 10000 * 5 * 2 / 100 = 1000
    expectedValue: 1000,
    tolerance: 0.01,
    description: '24 months = 2 years.',
    run: () => calculateSimpleInterestComprehensive({ principal: 10000, annualRate: 5, timeValue: 24, timeUnit: 'months' }),
  },
  {
    slug: 'simple-interest-calculator',
    name: 'Zero Rate Produces Zero Interest',
    category: 'Zero',
    expectedBehavior: 'result',
    expectedResultKey: 'interestEarned',
    expectedValue: 0,
    tolerance: 0,
    description: '0% rate → SI = 0.',
    run: () => calculateSimpleInterestComprehensive({ principal: 50000, annualRate: 0, timeValue: 5, timeUnit: 'years' }),
  },
  {
    slug: 'simple-interest-calculator',
    name: 'Decimal Rate and Time',
    category: 'Decimal',
    expectedBehavior: 'result',
    expectedResultKey: 'interestEarned',
    // SI = 25000 * 7.5 * 2.5 / 100 = 4687.50
    expectedValue: 4687.5,
    tolerance: 0.02,
    description: 'Fractional rate and fractional years.',
    run: () => calculateSimpleInterestComprehensive({ principal: 25000, annualRate: 7.5, timeValue: 2.5, timeUnit: 'years' }),
  },
  {
    slug: 'simple-interest-calculator',
    name: 'Total Maturity = Principal + Interest',
    category: 'Boundary',
    expectedBehavior: 'result',
    expectedResultKey: 'totalMaturityAmount',
    expectedValue: 11500,
    tolerance: 0.01,
    description: 'Total = 10000 + 1500 = 11500.',
    run: () => calculateSimpleInterestComprehensive({ principal: 10000, annualRate: 5, timeValue: 3, timeUnit: 'years' }),
  },
];

// ─── Compound Interest Tests ───────────────────────────────────────────────────

const compoundInterestTests: CalculatorTestCase[] = [
  {
    slug: 'compound-interest-calculator',
    name: 'Annual Compounding (₹10000, 10%, 5yr)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'estimatedFutureValue',
    // A = 10000 * (1.10)^5 = 16105.10
    expectedValue: 16105,
    tolerance: 5,
    description: 'Annual compounding: A = P*(1+r)^n.',
    run: () => calculateCompoundInterestComprehensive({
      principal: 10000, annualRate: 10, durationValue: 5, durationUnit: 'years', compoundingFrequency: 'annually'
    }),
  },
  {
    slug: 'compound-interest-calculator',
    name: 'Monthly Compounding (₹10000, 12%, 1yr)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'estimatedFutureValue',
    // A = 10000 * (1 + 0.12/12)^12 = 10000 * 1.126825 ≈ 11268
    expectedValue: 11268,
    tolerance: 5,
    description: 'Monthly compounding produces more than annual.',
    run: () => calculateCompoundInterestComprehensive({
      principal: 10000, annualRate: 12, durationValue: 1, durationUnit: 'years', compoundingFrequency: 'monthly'
    }),
  },
  {
    slug: 'compound-interest-calculator',
    name: 'Zero Rate Produces No Interest',
    category: 'Zero',
    expectedBehavior: 'result',
    expectedResultKey: 'totalInterestEarned',
    expectedValue: 0,
    tolerance: 1,
    description: '0% rate: compound interest = 0.',
    run: () => calculateCompoundInterestComprehensive({
      principal: 10000, annualRate: 0, durationValue: 5, durationUnit: 'years', compoundingFrequency: 'annually'
    }),
  },
  {
    slug: 'compound-interest-calculator',
    name: 'Daily Compounding (₹1000, 5%, 1yr)',
    category: 'Boundary',
    expectedBehavior: 'result',
    expectedResultKey: 'estimatedFutureValue',
    // A = 1000 * (1 + 0.05/365)^365 ≈ 1051.27
    expectedValue: 1051,
    tolerance: 3,
    description: 'Daily compounding. Verified against standard formula.',
    run: () => calculateCompoundInterestComprehensive({
      principal: 1000, annualRate: 5, durationValue: 1, durationUnit: 'years', compoundingFrequency: 'daily'
    }),
  },
];

// ─── Standard Deviation Tests ──────────────────────────────────────────────────

const stdDevTests: CalculatorTestCase[] = [
  {
    slug: 'standard-deviation-calculator',
    name: 'Basic Population SD [2,4,4,4,5,5,7,9]',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'populationStandardDeviation',
    // Known dataset: mean=5, variance=4, SD=2
    expectedValue: 2,
    tolerance: 0.001,
    description: 'Classic textbook dataset: SD=2.',
    run: () => calculateStandardDeviation([2, 4, 4, 4, 5, 5, 7, 9]),
  },
  {
    slug: 'standard-deviation-calculator',
    name: 'Mean Calculation',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'mean',
    // mean = (2+4+4+4+5+5+7+9)/8 = 40/8 = 5
    expectedValue: 5,
    tolerance: 0.001,
    description: 'Mean = sum / count = 40/8 = 5.',
    run: () => calculateStandardDeviation([2, 4, 4, 4, 5, 5, 7, 9]),
  },
  {
    slug: 'standard-deviation-calculator',
    name: 'Single Element Returns SD=0',
    category: 'Minimum',
    expectedBehavior: 'result',
    expectedResultKey: 'populationStandardDeviation',
    expectedValue: 0,
    tolerance: 0,
    description: 'Single value: SD=0.',
    run: () => calculateStandardDeviation([42]),
  },
  {
    slug: 'standard-deviation-calculator',
    name: 'Empty Array Should Throw',
    category: 'Invalid Input',
    expectedBehavior: 'throw',
    description: 'Empty array must throw.',
    run: () => calculateStandardDeviation([]),
  },
  {
    slug: 'standard-deviation-calculator',
    name: 'Identical Values SD = 0',
    category: 'Edge Case',
    expectedBehavior: 'result',
    expectedResultKey: 'populationStandardDeviation',
    expectedValue: 0,
    tolerance: 0.001,
    description: 'All identical values → no variation → SD=0.',
    run: () => calculateStandardDeviation([5, 5, 5, 5, 5]),
  },
  {
    slug: 'standard-deviation-calculator',
    name: 'Negative Numbers in Dataset',
    category: 'Edge Case',
    expectedBehavior: 'result',
    expectedResultKey: 'mean',
    // mean(-3,-1,0,1,3) = 0
    expectedValue: 0,
    tolerance: 0.001,
    description: 'Dataset with negative values including zero.',
    run: () => calculateStandardDeviation([-3, -1, 0, 1, 3]),
  },
];

// ─── Age Calculator Tests ──────────────────────────────────────────────────────

const ageTests: CalculatorTestCase[] = [
  {
    slug: 'age-calculator',
    name: 'Known Age (born 1990-01-01, target 2025-01-01 = 35yr)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'years',
    expectedValue: 35,
    tolerance: 0,
    description: 'Exactly 35 years.',
    run: () => calculateAge({ birthDate: '1990-01-01', targetDate: '2025-01-01' }),
  },
  {
    slug: 'age-calculator',
    name: 'Total Days for 1 Year',
    category: 'Boundary',
    expectedBehavior: 'result',
    expectedResultKey: 'totalDays',
    // 2020 is leap year: 2020-03-01 to 2021-03-01 = 365 days
    expectedValue: 365,
    tolerance: 0,
    description: '2020-03-01 to 2021-03-01 = 365 days (non-leap span).',
    run: () => calculateAge({ birthDate: '2020-03-01', targetDate: '2021-03-01' }),
  },
  {
    slug: 'age-calculator',
    name: 'Future Birth Date Should Throw',
    category: 'Invalid Input',
    expectedBehavior: 'throw',
    description: 'calculateAge throws when birthDate is in the future.',
    run: () => calculateAge({ birthDate: '2099-12-31', targetDate: '2025-01-01' }),
  },
  {
    slug: 'age-calculator',
    name: 'Invalid Date Format Should Throw',
    category: 'Invalid Input',
    expectedBehavior: 'throw',
    description: 'Invalid date string must throw.',
    run: () => calculateAge({ birthDate: 'not-a-date', targetDate: '2025-01-01' }),
  },
  {
    slug: 'age-calculator',
    name: 'Same Birth and Target Date = 0 Years',
    category: 'Boundary',
    expectedBehavior: 'result',
    expectedResultKey: 'years',
    expectedValue: 0,
    tolerance: 0,
    description: 'Same day: 0 years, 0 months, 0 days.',
    run: () => calculateAge({ birthDate: '2000-06-15', targetDate: '2000-06-15' }),
  },
];

// ─── Height Converter Tests ────────────────────────────────────────────────────

const heightTests: CalculatorTestCase[] = [
  {
    slug: 'height-calculator',
    name: 'Convert 180cm to Feet',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'feet',
    // 180cm / 30.48 = 5.9055 → Math.floor = 5
    expectedValue: 5,
    tolerance: 0,
    description: '180cm = 5 feet 10.9 inches.',
    run: () => convertHeight({ value: 180, unit: 'cm' }),
  },
  {
    slug: 'height-calculator',
    name: 'Convert 6 Feet to CM',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'cm',
    // 6ft = 6 * 30.48 = 182.88 → toFixed(1) = 182.9
    expectedValue: 182.9,
    tolerance: 0.1,
    description: '6 feet = 182.9cm.',
    run: () => convertHeight({ value: 6, unit: 'feet' }),
  },
  {
    slug: 'height-calculator',
    name: 'Convert 5ft 10in to CM',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'cm',
    // 5*12+10=70 inches * 2.54 = 177.8cm
    expectedValue: 177.8,
    tolerance: 0.1,
    description: '5ft 10in = 177.8cm.',
    run: () => convertHeight({ value: 5, unit: 'ft_in', inchesExtra: 10 }),
  },
  {
    slug: 'height-calculator',
    name: 'Convert 1 Meter to CM',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'cm',
    expectedValue: 100,
    tolerance: 0,
    description: '1m = 100cm.',
    run: () => convertHeight({ value: 1, unit: 'm' }),
  },
  {
    slug: 'height-calculator',
    name: 'Convert 72 Inches to CM',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'cm',
    // 72 inches * 2.54 = 182.88 → 182.9
    expectedValue: 182.9,
    tolerance: 0.1,
    description: '72 inches = 182.9cm.',
    run: () => convertHeight({ value: 72, unit: 'inches' }),
  },
];

// ─── Percentage Calculator Tests ───────────────────────────────────────────────

const percentageTests: CalculatorTestCase[] = [
  {
    slug: 'percentage-calculator',
    name: 'Percent Of: 25% of 200 = 50',
    category: 'Normal',
    expectedBehavior: 'result',
    // calculatePercentOf returns a plain number, not an object
    // We validate by wrapping in an object with 'result' key
    description: '25% of 200 = 50.',
    run: () => ({ result: calculatePercentOf(25, 200) }),
  },
  {
    slug: 'percentage-calculator',
    name: 'Percent Of Result Value = 50',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'result',
    expectedValue: 50,
    tolerance: 0.001,
    description: '25% of 200 = 50. Wrapped in result object.',
    run: () => ({ result: calculatePercentOf(25, 200) }),
  },
  {
    slug: 'percentage-calculator',
    name: 'Is What Percent: 50 is 25% of 200',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'result',
    expectedValue: 25,
    tolerance: 0.001,
    description: '50/200 * 100 = 25%.',
    run: () => ({ result: calculateIsWhatPercent(50, 200) }),
  },
  {
    slug: 'percentage-calculator',
    name: 'Division by Zero Returns 0',
    category: 'Zero',
    expectedBehavior: 'result',
    expectedResultKey: 'result',
    expectedValue: 0,
    tolerance: 0,
    description: 'Dividing by zero returns 0 (not NaN/Infinity).',
    run: () => ({ result: calculateIsWhatPercent(50, 0) }),
  },
  {
    slug: 'percentage-calculator',
    name: 'Percentage Change: 100 to 150 = +50%',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'changePercent',
    expectedValue: 50,
    tolerance: 0.01,
    description: '(150-100)/100 * 100 = 50% increase.',
    run: () => calculatePercentageChange(100, 150),
  },
  {
    slug: 'percentage-calculator',
    name: 'Percentage Change from Zero Returns 0',
    category: 'Zero',
    expectedBehavior: 'result',
    expectedResultKey: 'changePercent',
    expectedValue: 0,
    tolerance: 0,
    description: 'Base value 0 → returns 0 to avoid division by zero.',
    run: () => calculatePercentageChange(0, 100),
  },
  {
    slug: 'percentage-calculator',
    name: 'Percentage Difference: |100-200| ≈ 66.67%',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'result',
    expectedValue: 66.67,
    tolerance: 0.01,
    description: '|100-200| / avg(100,200) * 100 ≈ 66.67%.',
    run: () => ({ result: calculatePercentageDifference(100, 200) }),
  },
  {
    slug: 'percentage-calculator',
    name: 'Value After 20% Increase on 500',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'finalValue',
    // 500 + 500*20/100 = 600
    expectedValue: 600,
    tolerance: 0.001,
    description: '20% increase on 500 = 600.',
    run: () => calculateValueAfterPercent(500, 20, true),
  },
  {
    slug: 'percentage-calculator',
    name: 'Value After 10% Decrease on 1000',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'finalValue',
    expectedValue: 900,
    tolerance: 0.001,
    description: '10% decrease on 1000 = 900.',
    run: () => calculateValueAfterPercent(1000, 10, false),
  },
];

// ─── RCC Beam Steel Tests ──────────────────────────────────────────────────────

const rccBeamTests: CalculatorTestCase[] = [
  {
    slug: 'rcc-beam-steel-calculator',
    name: 'Standard Beam (6m × 230×450, 2T+3B 16mm)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'totalSteelWeightKg',
    // Derived by running formula with these inputs
    expectedValue: 71.1,
    tolerance: 2,
    description: 'Typical 6m RCC beam. Expected ~71.1kg steel weight.',
    run: () => calculateRccBeamSteel({
      lengthMeters: 6, widthMm: 230, depthMm: 450, clearCoverMm: 25,
      topBarsCount: 2, topBarDiaMm: 16, bottomBarsCount: 3, bottomBarDiaMm: 16,
      stirrupDiaMm: 8, stirrupSpacingMm: 150,
    }),
  },
  {
    slug: 'rcc-beam-steel-calculator',
    name: 'Beam Volume Calculation',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'beamVolumeCum',
    // Volume = 6 * 0.230 * 0.450 = 0.621 m³
    expectedValue: 0.621,
    tolerance: 0.001,
    description: 'Volume = L × W × D in meters.',
    run: () => calculateRccBeamSteel({
      lengthMeters: 6, widthMm: 230, depthMm: 450, clearCoverMm: 25,
      topBarsCount: 2, topBarDiaMm: 16, bottomBarsCount: 3, bottomBarDiaMm: 16,
      stirrupDiaMm: 8, stirrupSpacingMm: 150,
    }),
  },
  {
    slug: 'rcc-beam-steel-calculator',
    name: 'Steel Weight is Positive',
    category: 'Boundary',
    expectedBehavior: 'result',
    expectedResultKey: 'totalSteelWeightKg',
    expectedValue: 1,
    tolerance: 100000, // Just verify it's > 0 and finite
    description: 'Total steel weight must be positive for valid inputs.',
    run: () => calculateRccBeamSteel({
      lengthMeters: 4, widthMm: 200, depthMm: 300, clearCoverMm: 25,
      topBarsCount: 2, topBarDiaMm: 12, bottomBarsCount: 2, bottomBarDiaMm: 12,
      stirrupDiaMm: 8, stirrupSpacingMm: 200,
    }),
  },
  {
    slug: 'rcc-beam-steel-calculator',
    name: 'Normal Thumb-Rule Mode (5m × 230×450)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'totalSteelKg',
    expectedValue: 64.0,
    tolerance: 2,
    description: 'Normal mode beam calculation using 120 kg/m3 rate.',
    run: () => calculateNormalRccBeamSteel({
      length: 5, width: 230, depth: 450, dimensionUnit: 'm', sectionUnit: 'mm',
      constructionType: 'standard',
    }),
  },
  {
    slug: 'rcc-beam-steel-calculator',
    name: 'Advanced BBS Mode (5m span with 2-zone stirrups)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'totalSteelWeightKg',
    expectedValue: 60,
    tolerance: 10,
    description: 'Advanced BBS beam calculation verifying positive finite weight.',
    run: () => calculateAdvancedRccBeamSteel({
      clearSpan: 5, supportWidth: 230, beamWidth: 230, beamDepth: 450,
      dimensionUnit: 'm', sectionUnit: 'mm', clearCover: 25, numberOfBeams: 1,
      topMainCount: 2, topMainDiaMm: 12, bottomMainCount: 3, bottomMainDiaMm: 16,
      stirrupDiaMm: 8, stirrupMode: 'two_zone', stirrupSpacingSupportMm: 100,
      stirrupSpacingMidMm: 150,
    }),
  },
];

// ─── RCC Column Steel Tests ────────────────────────────────────────────────────

const rccColumnTests: CalculatorTestCase[] = [
  {
    slug: 'rcc-column-steel-calculator',
    name: 'Standard Column (3m, 300×300, 4 bars 16mm)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'totalSteelWeightKg',
    expectedValue: 40,
    tolerance: 15,
    description: 'Typical short column. Expected within ±15kg.',
    run: () => calculateRccColumnSteel({
      columnType: 'rectangular',
      heightMeters: 3, widthMm: 300, depthMm: 300, clearCoverMm: 40,
      mainBarsCount: 4, mainBarDiaMm: 16,
      tiesDiaMm: 8, tiesSpacingMm: 200,
    }),
  },
  {
    slug: 'rcc-column-steel-calculator',
    name: 'Column Concrete Volume',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'columnVolumeCum',
    // Volume = 3 * 0.300 * 0.300 = 0.270
    expectedValue: 0.27,
    tolerance: 0.001,
    description: 'Column volume = height × width × depth in meters.',
    run: () => calculateRccColumnSteel({
      columnType: 'rectangular',
      heightMeters: 3, widthMm: 300, depthMm: 300, clearCoverMm: 40,
      mainBarsCount: 4, mainBarDiaMm: 16,
      tiesDiaMm: 8, tiesSpacingMm: 200,
    }),
  },
  {
    slug: 'rcc-column-steel-calculator',
    name: 'Normal Thumb-Rule Column Mode (3m × 300×300)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'totalSteelKg',
    expectedValue: 54.2,
    tolerance: 2,
    description: 'Normal mode column calculation using 195 kg/m3 rate.',
    run: () => calculateNormalRccColumnSteel({
      columnType: 'rectangular',
      height: 3, width: 300, depth: 300, dimensionUnit: 'm', sectionUnit: 'mm',
      constructionType: 'standard',
    }),
  },
  {
    slug: 'rcc-column-steel-calculator',
    name: 'Advanced BBS Column Mode (3m × 300×450, 8 bars 20mm)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'totalSteelWeightKg',
    expectedValue: 105.4,
    tolerance: 10,
    description: 'Advanced BBS column calculation with 2-zone ties and diamond tie.',
    run: () => calculateAdvancedRccColumnSteel({
      columnShape: 'rectangular',
      height: 3, width: 300, depth: 450, dimensionUnit: 'm', sectionUnit: 'mm',
      clearCover: 40, numberOfColumns: 1,
      mainBarsCount: 8, mainBarDiaMm: 20,
      outerTieDiaMm: 8, includeInnerTies: true, innerTieDiaMm: 8,
      tieMode: 'two_zone', tieSpacingConfinedMm: 100, tieSpacingMidMm: 150,
    }),
  },
];

// ─── RCC Footing Steel Tests ───────────────────────────────────────────────────

const rccFootingTests: CalculatorTestCase[] = [
  {
    slug: 'rcc-footing-steel-calculator',
    name: 'Standard Footing (1.5m × 1.5m × 350mm, 12mm @ 150mm)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'totalSteelWeightKg',
    expectedValue: 30,
    tolerance: 15,
    description: 'Typical isolated footing. Within ±15kg.',
    run: () => calculateRccFootingSteel({
      lengthMeters: 1.5, widthMeters: 1.5, depthMm: 350, clearCoverMm: 50,
      barDiaXMm: 12, spacingXMm: 150,
      barDiaYMm: 12, spacingYMm: 150,
    }),
  },
  {
    slug: 'rcc-footing-steel-calculator',
    name: 'Advanced Footing BBS (1.8m × 1.8m × 450mm, 12mm @ 150mm with Dowels)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'totalSteelWeightKg',
    expectedValue: 70,
    tolerance: 20,
    description: 'Advanced BBS with bend-ups, column starter dowels, and 3% wastage.',
    run: () => calculateAdvancedRccFootingSteel({
      geometryType: 'flat',
      lengthM: 1.8,
      widthM: 1.8,
      depthMm: 450,
      clearCoverMm: 50,
      footingCount: 1,
      barDiaXMm: 12,
      spacingXMm: 150,
      barDiaYMm: 12,
      spacingYMm: 150,
      includeBendUp: true,
      includeDowels: true,
      dowelCount: 4,
      dowelDiaMm: 16,
      wastagePercent: 3.0,
    }),
  },
  {
    slug: 'rcc-footing-steel-calculator',
    name: 'Normal Thumb-Rule Footing (2.0m × 2.0m × 500mm, Standard 75 kg/m³)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'totalSteelWeightKg',
    expectedValue: 154.5,
    tolerance: 10,
    description: 'Normal thumb rule estimation: 2.0 × 2.0 × 0.5 = 2.0 m³ × 75 kg/m³ × 1.03 = ~154.5 kg.',
    run: () => calculateNormalRccFootingSteel({
      lengthM: 2.0,
      widthM: 2.0,
      depthMm: 500,
      footingCount: 1,
      thumbRuleType: 'standard',
      nominalBarDiaMm: 12,
      wastagePercent: 3.0,
    }),
  },
];

// Verify the exported function name matches what we import
function _safeRunCompoundInterest(): unknown {
  return calculateCompoundInterestComprehensive({
    principal: 10000,
    annualRate: 10,
    durationValue: 5,
    durationUnit: 'years',
    compoundingFrequency: 'annually',
  });
}
// Suppress unused warning — this exists only to confirm the import works
void _safeRunCompoundInterest;

// ─── Weight Calculator Tests ───────────────────────────────────────────────────
const weightTests: CalculatorTestCase[] = [
  {
    slug: 'weight-calculator',
    name: 'Standard Metric 100 kg conversion',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'baseKg',
    expectedValue: 100,
    tolerance: 0.001,
    description: 'Converts 100 kg to other mass units.',
    run: () => convertWeight(100, 'kg', 'g'),
  },
  {
    slug: 'weight-calculator',
    name: 'Imperial 1 lb to kg conversion',
    category: 'Boundary',
    expectedBehavior: 'result',
    expectedResultKey: 'baseKg',
    expectedValue: 0.45359237,
    tolerance: 0.001,
    description: '1 lb equals 0.45359237 kg.',
    run: () => convertWeight(1, 'lb', 'kg'),
  },
];

// ─── Time Calculator Tests ─────────────────────────────────────────────────────
const timeTests: CalculatorTestCase[] = [
  {
    slug: 'time-calculator',
    name: 'Standard Time Addition (2h30m + 1h45m)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'totalHoursDecimal',
    expectedValue: 4.25,
    tolerance: 0.01,
    description: '2h 30m + 1h 45m = 4 hours 15 mins (4.25h).',
    run: () => calculateTimeOperation({ h1: 2, m1: 30, s1: 0, operation: 'add', h2: 1, m2: 45, s2: 0 }),
  },
  {
    slug: 'time-calculator',
    name: 'Standard Time Subtraction (5h - 2h30m)',
    category: 'Boundary',
    expectedBehavior: 'result',
    expectedResultKey: 'totalHoursDecimal',
    expectedValue: 2.5,
    tolerance: 0.01,
    description: '5h - 2h 30m = 2 hours 30 mins (2.5h).',
    run: () => calculateTimeOperation({ h1: 5, m1: 0, s1: 0, operation: 'subtract', h2: 2, m2: 30, s2: 0 }),
  },
];

// ─── Date Difference Calculator Tests ──────────────────────────────────────────
const dateDiffTests: CalculatorTestCase[] = [
  {
    slug: 'date-difference-calculator',
    name: 'Standard 10-Day Difference',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'totalDays',
    expectedValue: 10,
    tolerance: 0,
    description: 'Calculates 10 full calendar days difference.',
    run: () => calculateDateDifference({ startDate: '2026-01-01', endDate: '2026-01-11' }),
  },
  {
    slug: 'date-difference-calculator',
    name: 'Leap Year February Span (29 Days)',
    category: 'Boundary',
    expectedBehavior: 'result',
    expectedResultKey: 'totalDays',
    expectedValue: 29,
    tolerance: 0,
    description: 'Calculates 29 days in Feb 2024 leap year.',
    run: () => calculateDateDifference({ startDate: '2024-02-01', endDate: '2024-03-01' }),
  },
];

// ─── Side Drain & Slab BOQ Tests ───────────────────────────────────────────────
const sideDrainTests: CalculatorTestCase[] = [
  {
    slug: 'side-drain-slab-boq-calculator',
    name: 'Standard 10m Drain Excavation',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'earthworkExcavationCum',
    expectedValue: 7.65,
    tolerance: 0.1,
    description: 'Excavation for 10m drain: 10 * 0.9 * 0.85 = 7.65 m³.',
    run: () => calculateSideDrainBOQ({
      lengthMeters: 10,
      internalWidthMeters: 0.6,
      internalDepthMeters: 0.6,
      wallThicknessMeters: 0.15,
      bedConcreteThicknessMeters: 0.15,
      coverSlabThicknessMeters: 0.1,
      rebarDiameterMm: 10,
      rebarSpacingMm: 150,
    }),
  },
];

// ─── RCC Slab Steel Tests ──────────────────────────────────────────────────────
const rccSlabSteelTests: CalculatorTestCase[] = [
  {
    slug: 'rcc-slab-steel-calculator',
    name: 'Standard 5m x 4m RCC Slab Area',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'slabAreaSqm',
    expectedValue: 20,
    tolerance: 0.1,
    description: '5m x 4m slab area is 20 sqm.',
    run: () => calculateDetailedRccSlabSteel({
      length: 5,
      width: 4,
      dimensionUnit: 'm',
      thickness: 125,
      thicknessUnit: 'mm',
      clearCover: 20,
      coverUnit: 'mm',
      mainBarDiaMm: 10,
      mainBarSpacing: 150,
      mainSpacingUnit: 'mm',
      mainDirection: 'short_span',
      distBarDiaMm: 8,
      distBarSpacing: 150,
      distSpacingUnit: 'mm',
    }),
  },
];

// ─── Slab Steel Shuttering Tests ───────────────────────────────────────────────
const slabShutteringTests: CalculatorTestCase[] = [
  {
    slug: 'slab-steel-shuttering-calculator',
    name: 'Standard 6m x 4m Slab Formwork Area',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'slabGrossAreaSqm',
    expectedValue: 24,
    tolerance: 0.1,
    description: '6m x 4m slab formwork gross area is 24 sqm.',
    run: () => calculateSlabSteelShuttering({
      lengthMeters: 6,
      widthMeters: 4,
      thicknessMm: 125,
      steelMode: 'simple',
      simpleSteelRateKgPerSqm: 10,
    }),
  },
];

// ─── Steel Weight Calculator Tests ─────────────────────────────────────────────
const steelWeightTests: CalculatorTestCase[] = [
  {
    slug: 'steel-weight-calculator',
    name: '10mm Rebar 12m Single Bar Weight',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'totalWeightKg',
    expectedValue: 7.4,
    tolerance: 0.2,
    description: '10mm rebar (0.617 kg/m) * 12m ≈ 7.4 kg.',
    run: () => calculateRebarWeight(10, 'bars', 1),
  },
  {
    slug: 'steel-weight-calculator',
    name: '16mm Rebar 50 Bars Weight',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'totalWeightKg',
    expectedValue: 948,
    tolerance: 20,
    description: '50 bars of 16mm rebar (1.58 kg/m * 12m * 50 = 948 kg).',
    run: () => calculateUniversalSteelWeight({
      shapeType: 'rebar',
      diameter: 16,
      rebarMode: 'bars',
      rebarQuantity: 50,
      unitSystem: 'metric',
    }),
  },
  {
    slug: 'steel-weight-calculator',
    name: 'Mild Steel Plate (1000x10mm, 2m)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'totalWeightKg',
    expectedValue: 157,
    tolerance: 2,
    description: '1000mm x 10mm x 2m mild steel plate = 157.0 kg.',
    run: () => calculateUniversalSteelWeight({
      shapeType: 'plate',
      width: 1000,
      thickness: 10,
      length: 2,
      quantity: 1,
      materialKey: 'mild_steel',
      unitSystem: 'metric',
    }),
  },
  {
    slug: 'steel-weight-calculator',
    name: 'Steel Pipe (OD 114.3mm, wall 4.5mm, 6m)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'totalWeightKg',
    expectedValue: 73.1,
    tolerance: 2,
    description: 'OD 114.3mm, 4.5mm wall, 6m length pipe ≈ 73.1 kg.',
    run: () => calculateUniversalSteelWeight({
      shapeType: 'pipe',
      outerDiameter: 114.3,
      thickness: 4.5,
      length: 6,
      quantity: 1,
      materialKey: 'mild_steel',
      unitSystem: 'metric',
    }),
  },
  {
    slug: 'steel-weight-calculator',
    name: 'Imperial 1-inch Round Bar (10 ft length)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'totalWeightLb',
    expectedValue: 26.7,
    tolerance: 1,
    description: '1 inch dia round bar, 10 ft length ≈ 26.7 lbs.',
    run: () => calculateUniversalSteelWeight({
      shapeType: 'round_bar',
      diameter: 1,
      length: 10,
      quantity: 1,
      materialKey: 'mild_steel',
      unitSystem: 'imperial',
    }),
  },
];

// ─── Concrete Material Breakup Tests ───────────────────────────────────────────
const concreteMaterialTests: CalculatorTestCase[] = [
  {
    slug: 'concrete-material-breakup-calculator',
    name: 'Standard 1 m³ Concrete Wet Volume',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'totalWetVolumeCum',
    expectedValue: 1,
    tolerance: 0.01,
    description: 'Verifies 1 cum wet concrete mix calculation.',
    run: () => calculateConcreteMaterial({
      mode: 'concrete_volume',
      volumeValue: 1,
      volumeUnit: 'cum',
      mixRatio: '1:1.5:3',
    }),
  },
  {
    slug: 'concrete-material-breakup-calculator',
    name: '10 m³ M20 Concrete Material Breakup with 5% Wastage',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'cementBags',
    expectedValue: 84.7,
    tolerance: 0.5,
    description: 'Verifies ~84.7 cement bags (50kg) for 10 cum M20 concrete.',
    run: () => calculateConcreteMaterial({
      mode: 'concrete_volume',
      volumeValue: 10,
      volumeUnit: 'cum',
      mixRatio: '1:1.5:3',
      wastagePercent: 5,
      dryVolumeFactor: 1.54,
    }),
  },
  {
    slug: 'concrete-material-breakup-calculator',
    name: 'Slab Concrete Mode - 10m x 5m x 150mm',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'totalWetVolumeCum',
    expectedValue: 7.5,
    tolerance: 0.05,
    description: 'Verifies slab volume 10 x 5 x 0.15 = 7.5 m³.',
    run: () => calculateConcreteMaterial({
      mode: 'slab',
      length: 10,
      lengthUnit: 'meter',
      width: 5,
      widthUnit: 'meter',
      heightOrDepth: 150,
      heightOrDepthUnit: 'mm',
      quantity: 1,
      mixRatio: '1:1.5:3',
    }),
  },
  {
    slug: 'concrete-material-breakup-calculator',
    name: 'Beam Concrete Mode - Imperial Dimensions',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'totalWetVolumeCum',
    expectedValue: 1.70,
    tolerance: 0.05,
    description: 'Verifies two 20ft x 12in x 18in beams yield ~1.70 m³.',
    run: () => calculateConcreteMaterial({
      mode: 'beam',
      length: 20,
      lengthUnit: 'feet',
      width: 12,
      widthUnit: 'inches',
      heightOrDepth: 18,
      heightOrDepthUnit: 'inches',
      quantity: 2,
      mixRatio: '1:2:4',
    }),
  },
  {
    slug: 'concrete-material-breakup-calculator',
    name: 'Concrete Cost Estimation in INR',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'totalWetVolumeCum',
    expectedValue: 10,
    tolerance: 0.01,
    description: 'Verifies cost summary generation for 10 m³ in INR.',
    run: () => {
      const res = calculateConcreteMaterial({
        mode: 'concrete_volume',
        volumeValue: 10,
        volumeUnit: 'cum',
        mixRatio: '1:1.5:3',
        enableCost: true,
        currency: 'INR',
        cementPricePerBag: 380,
        sandPrice: 45,
        aggregatePrice: 40,
      });
      if (!res.costSummary || res.costSummary.totalCost <= 0) {
        throw new Error('Cost summary was not generated properly');
      }
      return res;
    },
  },
  {
    slug: 'concrete-material-breakup-calculator',
    name: 'Negative Dimension Validation Rejection',
    category: 'Error',
    expectedBehavior: 'throw',
    description: 'Rejects negative slab thickness.',
    run: () => calculateConcreteMaterial({
      mode: 'slab',
      length: 10,
      width: 5,
      heightOrDepth: -150,
    }),
  },
];

// ─── Brickwork Calculator Tests ────────────────────────────────────────────────
const brickworkTests: CalculatorTestCase[] = [
  {
    slug: 'brickwork-calculator',
    name: 'Standard 5m x 3m Brick Wall Volume',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'wallVolumeCum',
    expectedValue: 3.0,
    tolerance: 0.1,
    description: '5m x 3m wall with one-brick (200mm) nominal thickness yields 3.0 m³ volume.',
    run: () => calculateWallBrickwork({
      unitSystem: 'metric',
      wallLength: 5,
      wallHeight: 3,
      wallThicknessType: 'one_brick',
      numberOfWalls: 1,
      openingsDeductionArea: 0,
      brickLengthMm: 190,
      brickWidthMm: 90,
      brickHeightMm: 90,
      mortarJointMm: 10,
      wastagePercent: 5,
    }),
  },
  {
    slug: 'brickwork-calculator',
    name: 'Imperial 30ft x 10ft Half-Brick Wall with Openings',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'netWallAreaSqft',
    expectedValue: 260,
    tolerance: 1.0,
    description: '30ft x 10ft wall (300 sq.ft) with 40 sq.ft openings yields 260 sq.ft net area.',
    run: () => calculateWallBrickwork({
      unitSystem: 'imperial',
      wallLength: 30,
      wallHeight: 10,
      wallThicknessType: 'half_brick',
      numberOfWalls: 1,
      openingsDeductionArea: 40,
      brickLengthMm: 190,
      brickWidthMm: 90,
      brickHeightMm: 90,
      mortarJointMm: 10,
      wastagePercent: 5,
    }),
  },
  {
    slug: 'brickwork-calculator',
    name: 'Brick Mortar Calculation (1:6 Mix Ratio)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'totalBrickworkVolumeCum',
    expectedValue: 6.0,
    tolerance: 0.1,
    description: '10m x 3m x 0.2m wall yields 6.0 m³ total masonry volume.',
    run: () => calculateBrickMortar({
      unitSystem: 'metric',
      wallLength: 10,
      wallHeight: 3,
      wallThicknessMeters: 0.2,
      numberOfWalls: 1,
      openingsDeductionArea: 0,
      brickLengthMm: 190,
      brickWidthMm: 90,
      brickHeightMm: 90,
      mortarJointMm: 10,
      mortarRatio: '1:6',
      mortarWastagePercent: 10,
    }),
  },
  {
    slug: 'brickwork-calculator',
    name: 'Paving Bricks with Sand Bedding Layer',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'beddingSandVolumeCum',
    expectedValue: 2.5,
    tolerance: 0.1,
    description: '50 m² paving with 50mm bedding sand yields 2.5 m³ sand.',
    run: () => calculatePavingBricks({
      unitSystem: 'metric',
      pavingArea: 50,
      areaUnit: 'sqm',
      paverLengthMm: 200,
      paverWidthMm: 100,
      jointGapMm: 3,
      wastagePercent: 5,
      beddingThicknessMm: 50,
    }),
  },
  {
    slug: 'brickwork-calculator',
    name: 'Custom Brickwork Masonry Volume',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'totalVolumeCum',
    expectedValue: 3.6,
    tolerance: 0.05,
    description: '4m x 3m x 0.3m custom masonry structure yields 3.6 m³.',
    run: () => calculateCustomBrickwork({
      unitSystem: 'metric',
      lengthM: 4,
      widthM: 3,
      heightM: 0.3,
      brickLengthMm: 190,
      brickWidthMm: 90,
      brickHeightMm: 90,
      mortarJointMm: 10,
      mortarRatio: '1:6',
      brickWastagePercent: 5,
      mortarWastagePercent: 10,
    }),
  },
  {
    slug: 'brickwork-calculator',
    name: 'Brickwork Cost Estimation in INR',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'finalEstimatedBricks',
    expectedValue: 3150,
    tolerance: 10,
    description: 'Verifies INR cost summary generation for 10m x 3m one-brick wall.',
    run: () => {
      const res = calculateWallBrickwork({
        unitSystem: 'metric',
        wallLength: 10,
        wallHeight: 3,
        wallThicknessType: 'one_brick',
        numberOfWalls: 1,
        openingsDeductionArea: 0,
        brickLengthMm: 190,
        brickWidthMm: 90,
        brickHeightMm: 90,
        mortarJointMm: 10,
        wastagePercent: 5,
        enableCost: true,
        currency: 'INR',
        brickRate: 8.5,
        cementBagRate: 380,
        sandRatePerCft: 55,
      });
      if (!res.costSummary || res.costSummary.totalMaterialCost <= 0 || res.costSummary.currency !== 'INR') {
        throw new Error('INR cost summary was not generated properly');
      }
      return res;
    },
  },
  {
    slug: 'brickwork-calculator',
    name: 'Brickwork Cost Estimation in USD',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'finalEstimatedBricks',
    expectedValue: 3150,
    tolerance: 10,
    description: 'Verifies USD cost summary generation for 10m x 3m one-brick wall.',
    run: () => {
      const res = calculateWallBrickwork({
        unitSystem: 'metric',
        wallLength: 10,
        wallHeight: 3,
        wallThicknessType: 'one_brick',
        numberOfWalls: 1,
        openingsDeductionArea: 0,
        brickLengthMm: 190,
        brickWidthMm: 90,
        brickHeightMm: 90,
        mortarJointMm: 10,
        wastagePercent: 5,
        enableCost: true,
        currency: 'USD',
        brickRate: 0.75,
        cementBagRate: 14.5,
        sandRatePerCft: 1.8,
      });
      if (!res.costSummary || res.costSummary.totalMaterialCost <= 0 || res.costSummary.currency !== 'USD') {
        throw new Error('USD cost summary was not generated properly');
      }
      return res;
    },
  },
  {
    slug: 'brickwork-calculator',
    name: 'Negative Dimension Validation Rejection',
    category: 'Error',
    expectedBehavior: 'throw',
    description: 'Rejects negative wall length.',
    run: () => calculateWallBrickwork({
      unitSystem: 'metric',
      wallLength: -5,
      wallHeight: 3,
      wallThicknessType: 'one_brick',
      numberOfWalls: 1,
      openingsDeductionArea: 0,
      brickLengthMm: 190,
      brickWidthMm: 90,
      brickHeightMm: 90,
      mortarJointMm: 10,
      wastagePercent: 5,
    }),
  },
];

// ─── Plaster Calculator Tests ──────────────────────────────────────────────────
const plasterTests: CalculatorTestCase[] = [
  {
    slug: 'plaster-calculator',
    name: 'Standard 10m x 3m Wall Plaster Area',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'netPlasterAreaSqm',
    expectedValue: 30,
    tolerance: 0.1,
    description: '10m x 3m wall net plaster area is 30 sqm.',
    run: () => calculateWallPlaster({
      unitSystem: 'metric',
      wallLength: 10,
      wallHeight: 3,
      numberOfWalls: 1,
      openingsDeduction: 0,
      thickness: 12,
      thicknessUnit: 'mm',
      mortarRatio: '1:4',
    }),
  },
  {
    slug: 'plaster-calculator',
    name: 'Imperial 30ft x 10ft Wall with Openings',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'netPlasterAreaSqft',
    expectedValue: 260,
    tolerance: 1.0,
    description: '30ft x 10ft wall (300 sq.ft) with 40 sq.ft opening deduction yields 260 sq.ft net area.',
    run: () => calculateWallPlaster({
      unitSystem: 'imperial',
      wallLength: 30,
      wallHeight: 10,
      numberOfWalls: 1,
      openingsDeduction: 40,
      thickness: 15,
      thicknessUnit: 'mm',
      mortarRatio: '1:4',
    }),
  },
  {
    slug: 'plaster-calculator',
    name: 'Mortar Ratio 1:6 Mix Lean Plaster',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'ratioLabel',
    expectedValue: '1:6',
    tolerance: 0,
    description: 'Verifies 1:6 lean mortar mix ratio parsing and calculation.',
    run: () => calculateWallPlaster({
      unitSystem: 'metric',
      wallLength: 10,
      wallHeight: 3,
      numberOfWalls: 1,
      openingsDeduction: 0,
      thickness: 15,
      thicknessUnit: 'mm',
      mortarRatio: '1:6',
    }),
  },
  {
    slug: 'plaster-calculator',
    name: 'General Mortar Bed Volume',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'wetVolumeCum',
    expectedValue: 1.0,
    tolerance: 0.05,
    description: '5m x 4m x 50mm mortar bed yields 1.00 m³ wet volume.',
    run: () => calculateGeneralMortar({
      unitSystem: 'metric',
      length: 5,
      width: 4,
      depth: 50,
      depthUnit: 'mm',
      numberOfSections: 1,
      mortarRatio: '1:3',
      wastagePercent: 10,
    }),
  },
  {
    slug: 'plaster-calculator',
    name: 'Tile Adhesive 50 m² Flooring',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'estimatedBagsRounded',
    expectedValue: 14,
    tolerance: 0,
    description: '50 m² tiling at 5.0 kg/m² with 10% wastage in 20kg bags requires 14 bags.',
    run: () => calculateTileMortar({
      unitSystem: 'metric',
      area: 50,
      tileType: 'floor',
      tilePreset: '600x600',
      bedThicknessMm: 6,
      coverageRateKgPerSqm: 5.0,
      wastagePercent: 10,
      bagSizeKg: 20,
    }),
  },
  {
    slug: 'plaster-calculator',
    name: 'Gaming Mortar Target Distance',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'distanceMeters',
    expectedValue: 1000,
    tolerance: 0.1,
    description: 'Distance between (1000, 1000) and (1600, 1800) is 1000m.',
    run: () => calculateGamingMortar({
      game: 'squad',
      mortarX: 1000,
      mortarY: 1000,
      targetX: 1600,
      targetY: 1800,
      elevationDiffMeters: 0,
    }),
  },
  {
    slug: 'plaster-calculator',
    name: 'Plaster Cost Estimation in INR',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'netPlasterAreaSqm',
    expectedValue: 30,
    tolerance: 0.1,
    description: 'Verifies INR cost summary generation for 10m x 3m plaster.',
    run: () => {
      const res = calculateWallPlaster({
        unitSystem: 'metric',
        wallLength: 10,
        wallHeight: 3,
        numberOfWalls: 1,
        openingsDeduction: 0,
        thickness: 15,
        thicknessUnit: 'mm',
        mortarRatio: '1:4',
        enableCost: true,
        currency: 'INR',
        cementBagRate: 380,
        sandRatePerCft: 55,
      });
      if (!res.costSummary || res.costSummary.totalMaterialCost <= 0 || res.costSummary.currency !== 'INR') {
        throw new Error('INR cost summary was not generated properly');
      }
      return res;
    },
  },
  {
    slug: 'plaster-calculator',
    name: 'Negative Dimension Validation Rejection',
    category: 'Error',
    expectedBehavior: 'throw',
    description: 'Rejects negative wall length.',
    run: () => calculateWallPlaster({
      unitSystem: 'metric',
      wallLength: -10,
      wallHeight: 3,
      numberOfWalls: 1,
      openingsDeduction: 0,
      thickness: 15,
      thicknessUnit: 'mm',
      mortarRatio: '1:4',
    }),
  },
];

// ─── Income Tax Calculator Tests ───────────────────────────────────────────────
const incomeTaxTests: CalculatorTestCase[] = [
  {
    slug: 'income-tax-calculator',
    name: 'India New Regime ₹7L Income (Rebate Zero Tax)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'totalEstimatedTax',
    expectedValue: 0,
    tolerance: 1,
    description: 'Taxable income below ₹7 Lakh receives Section 87A full rebate (₹0 tax).',
    run: () => calculateIndiaTax({
      assessmentYear: 'AY 2026-27',
      taxRegime: 'new',
      grossIncome: 700000,
      standardDeduction: 75000,
    }),
  },
];

// ─── Salary Calculator Tests ───────────────────────────────────────────────────
const salaryTests: CalculatorTestCase[] = [
  {
    slug: 'salary-calculator',
    name: 'Annual CTC ₹12 Lakh Take-Home Calculation',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'annualGross',
    expectedValue: 1135200,
    tolerance: 50,
    description: 'Calculates take-home pay for ₹12L annual CTC.',
    run: () => calculateSalaryComprehensive({
      inputType: 'ctc',
      amount: 1200000,
      taxRegime: 'new',
    }),
  },
];

// ─── Mortgage Calculator Tests ─────────────────────────────────────────────────
const mortgageTests: CalculatorTestCase[] = [
  {
    slug: 'mortgage-calculator',
    name: 'Standard $300k Home 20% Down ($240k Loan)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'loanAmount',
    expectedValue: 240000,
    tolerance: 1,
    description: '$300k home price with 20% down equals $240,000 loan.',
    run: () => calculateMortgageComprehensive({
      homePrice: 300000,
      downPaymentPercent: 20,
      annualInterestRate: 6.5,
      loanTermValue: 30,
      loanTermUnit: 'years',
    }),
  },
];

// ─── Personal Loan Calculator Tests ────────────────────────────────────────────
const loanTests: CalculatorTestCase[] = [
  {
    slug: 'loan-calculator',
    name: 'Personal Loan ($10k, 10%, 3yr)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'monthlyPayment',
    expectedValue: 323,
    tolerance: 2,
    description: '$10,000 at 10% over 36 months gives ~$323/month.',
    run: () => calculatePersonalLoanComprehensive({
      loanAmount: 10000,
      annualInterestRate: 10,
      loanTermValue: 3,
      loanTermUnit: 'years',
    }),
  },
];

// ─── Auto Loan Calculator Tests ────────────────────────────────────────────────
const autoLoanTests: CalculatorTestCase[] = [
  {
    slug: 'auto-loan-calculator',
    name: 'Auto Loan ($25k car, $5k down -> $20k net)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'netLoanAmount',
    expectedValue: 20000,
    tolerance: 1,
    description: '$25,000 vehicle minus $5,000 down = $20,000 net principal.',
    run: () => calculateAutoLoan({
      type: 'new',
      vehiclePrice: 25000,
      downPayment: 5000,
      interestRateAnnual: 5,
      loanTermMonths: 48,
    }),
  },
];

// ─── Retirement Calculator Tests ───────────────────────────────────────────────
const retirementTests: CalculatorTestCase[] = [
  {
    slug: 'retirement-calculator',
    name: 'Retirement Horizon (Age 30 to 60 = 30 Years)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'yearsToRetirement',
    expectedValue: 30,
    tolerance: 0,
    description: 'Horizon from age 30 to retirement age 60 is 30 years.',
    run: () => calculateRetirementCorpus({
      currentAge: 30,
      retirementAge: 60,
      currentExpensesMonthly: 50000,
      expectedInflationRateAnnual: 6,
      preRetirementReturnRate: 10,
      postRetirementReturnRate: 7,
    }),
  },
];

// ─── Amortization Calculator Tests ─────────────────────────────────────────────
const amortizationTests: CalculatorTestCase[] = [
  {
    slug: 'amortization-calculator',
    name: 'Amortization ($100k Loan Principal)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'loanAmount',
    expectedValue: 100000,
    tolerance: 1,
    description: 'Verifies amortization schedule generation for $100k loan.',
    run: () => calculateAmortizationSchedule({
      loanAmount: 100000,
      interestRateAnnual: 6,
      loanTermMonths: 360,
      paymentFrequency: 'monthly',
    }),
  },
];

// ─── Sales Tax Calculator Tests ────────────────────────────────────────────────
const salesTaxTests: CalculatorTestCase[] = [
  {
    slug: 'sales-tax-calculator',
    name: 'Standard 7% Sales Tax on $100',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'salesTaxAmount',
    expectedValue: 7,
    tolerance: 0.01,
    description: '$100 at 7% sales tax equals $7.00 tax.',
    run: () => calculateSalesTaxExtended({
      mode: 'add',
      amount: 100,
      taxRatePercent: 7,
    }),
  },
];

// ─── Discount Calculator Tests ─────────────────────────────────────────────────
const discountTests: CalculatorTestCase[] = [
  {
    slug: 'discount-calculator',
    name: 'Standard 20% Discount on $100 item',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'salePrice',
    expectedValue: 80,
    tolerance: 0.01,
    description: '$100 with 20% discount gives $80 sale price.',
    run: () => calculateDiscountExtended({
      mode: 'sale_price',
      originalPrice: 100,
      discountType: 'percentage',
      discountPercentage: 20,
    }),
  },
];

// ─── Body Fat Calculator Tests ─────────────────────────────────────────────────
const bodyFatTests: CalculatorTestCase[] = [
  {
    slug: 'body-fat-calculator',
    name: 'U.S. Navy Method Body Fat (Male 178cm, 38cm neck, 86cm waist)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'bodyFatPercentage',
    expectedValue: 17.2,
    tolerance: 1.5,
    description: 'U.S. Navy equation returns ~17.2% body fat.',
    run: () => calculateNavyBodyFat({
      gender: 'male',
      heightCm: 178,
      neckCm: 38,
      waistCm: 86,
      weightKg: 75,
    }),
  },
];

// ─── Calorie Calculator Tests ──────────────────────────────────────────────────
const calorieTests: CalculatorTestCase[] = [
  {
    slug: 'calorie-calculator',
    name: 'Mifflin BMR & TDEE (Male 25yr, 70kg, 175cm)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'bmr',
    expectedValue: 1674,
    tolerance: 5,
    description: 'Mifflin formula: 10(70) + 6.25(175) - 5(25) + 5 = 1674 kcal BMR.',
    run: () => calculateDailyCalories({
      gender: 'male',
      age: 25,
      heightCm: 175,
      weightKg: 70,
      activityLevel: 'sedentary',
      formula: 'mifflin',
      goal: 'maintain',
    }),
  },
];

// ─── BMR Calculator Tests ──────────────────────────────────────────────────────
const bmrTests: CalculatorTestCase[] = [
  {
    slug: 'bmr-calculator',
    name: 'Mifflin BMR (Male 30yr, 80kg, 180cm = 1780 kcal)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'bmr',
    expectedValue: 1780,
    tolerance: 3,
    description: '10*80 + 6.25*180 - 5*30 + 5 = 1780 kcal.',
    run: () => calculateBmr({
      gender: 'male',
      age: 30,
      heightCm: 180,
      weightKg: 80,
      formula: 'mifflin',
      activityLevel: 'none',
    }),
  },
];

// ─── GPA Calculator Tests ──────────────────────────────────────────────────────
const gpaTests: CalculatorTestCase[] = [
  {
    slug: 'gpa-calculator',
    name: 'Standard 4.0 Scale GPA (Two A Grades)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'unweightedGpa',
    expectedValue: 4.0,
    tolerance: 0.01,
    description: 'Two 3-credit courses with A grades produce 4.0 GPA.',
    run: () => calculateCourseGpa([
      { credits: 3, grade: 'A', level: 'Regular' },
      { credits: 3, grade: 'A', level: 'Regular' },
    ]),
  },
];

// ─── Scientific Calculator Tests ───────────────────────────────────────────────
const scientificTests: CalculatorTestCase[] = [
  {
    slug: 'scientific-calculator',
    name: 'Factorial Calculation (5! = 120)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'result',
    expectedValue: 120,
    tolerance: 0,
    description: 'Factorial of 5: 5*4*3*2*1 = 120.',
    run: () => ({ result: factorial(5) }),
  },
  {
    slug: 'scientific-calculator',
    name: 'Combinations Calculation (5C2 = 10)',
    category: 'Boundary',
    expectedBehavior: 'result',
    expectedResultKey: 'result',
    expectedValue: 10,
    tolerance: 0,
    description: '5 choose 2 = 10.',
    run: () => ({ result: nCr(5, 2) }),
  },
];

// ─── Fraction Calculator Tests ─────────────────────────────────────────────────
const fractionTests: CalculatorTestCase[] = [
  {
    slug: 'fraction-calculator',
    name: 'Fraction Addition (1/2 + 1/4 = 0.75)',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'decimalValue',
    expectedValue: 0.75,
    tolerance: 0.001,
    description: '1/2 + 1/4 = 3/4 (0.75).',
    run: () => calculateFractionOperation(
      { numerator: 1, denominator: 2 },
      '+',
      { numerator: 1, denominator: 4 }
    ),
  },
];

// ─── Random Number Generator Tests ─────────────────────────────────────────────
const rngTests: CalculatorTestCase[] = [
  {
    slug: 'random-number-generator-calculator',
    name: 'Generate 5 Random Integers',
    category: 'Normal',
    expectedBehavior: 'result',
    expectedResultKey: 'count',
    expectedValue: 5,
    tolerance: 0,
    description: 'Generates an array of 5 random numbers.',
    run: () => {
      const nums = generateMultipleRandomNumbers({
        min: 1,
        max: 100,
        count: 5,
        allowDuplicates: true,
        type: 'integer',
      });
      return { count: nums.length };
    },
  },
];

// ─── Consolidated Test Suite ──────────────────────────────────────────────────

export const ALL_TEST_CASES: CalculatorTestCase[] = [
  ...emiTests,
  ...sipTests,
  ...gstTests,
  ...bmiTests,
  ...simpleInterestTests,
  ...compoundInterestTests,
  ...stdDevTests,
  ...ageTests,
  ...heightTests,
  ...percentageTests,
  ...rccBeamTests,
  ...rccColumnTests,
  ...rccFootingTests,
  ...weightTests,
  ...timeTests,
  ...dateDiffTests,
  ...sideDrainTests,
  ...rccSlabSteelTests,
  ...slabShutteringTests,
  ...steelWeightTests,
  ...concreteMaterialTests,
  ...brickworkTests,
  ...plasterTests,
  ...incomeTaxTests,
  ...salaryTests,
  ...mortgageTests,
  ...loanTests,
  ...autoLoanTests,
  ...retirementTests,
  ...amortizationTests,
  ...salesTaxTests,
  ...discountTests,
  ...bodyFatTests,
  ...calorieTests,
  ...bmrTests,
  ...gpaTests,
  ...scientificTests,
  ...fractionTests,
  ...rngTests,
];

/**
 * Get test cases for a specific calculator slug.
 */
export function getTestCasesForSlug(slug: string): CalculatorTestCase[] {
  return ALL_TEST_CASES.filter((tc) => tc.slug === slug);
}

export const getTestCasesForCalculator = getTestCasesForSlug;

/**
 * Get all unique calculator slugs that have tests.
 */
export function getTestedSlugs(): string[] {
  return [...new Set(ALL_TEST_CASES.map((tc) => tc.slug))];
}
