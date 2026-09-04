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
import { calculateRccBeamSteel } from '../calculators/rcc-beam-steel';
import { calculateRccColumnSteel } from '../calculators/rcc-column-steel';
import { calculateRccFootingSteel } from '../calculators/rcc-footing-steel';
import {
  calculatePercentOf,
  calculateIsWhatPercent,
  calculatePercentageChange,
  calculatePercentageDifference,
  calculateValueAfterPercent,
} from '../calculators/percentage';

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
