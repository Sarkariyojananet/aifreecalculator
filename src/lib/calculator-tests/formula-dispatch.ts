/**
 * Universal Formula Dispatcher
 * Maps calculator slugs to their respective TypeScript mathematical functions.
 * Allows custom test cases and dynamic formula verification without duplicating logic.
 */

import { calculateEmi } from '../calculators/emi';
import { calculateSipComprehensive } from '../calculators/sip';
import { calculateSwp } from '../calculators/swp';
import { calculateRecurringXirr, calculateCustomXirr } from '../calculators/xirr';
import { calculatePpf } from '../calculators/ppf';
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
} from '../calculators/percentage';
import { convertWeight } from '../calculators/weight';
import { calculateTimeOperation } from '../calculators/time';
import { calculateDateDifference } from '../calculators/date-difference';
import { calculateSideDrainBOQ } from '../calculators/side-drain-slab-boq';
import { calculateDetailedRccSlabSteel } from '../calculators/rcc-slab-steel';
import { calculateSlabSteelShuttering } from '../calculators/slab-steel-shuttering';
import { calculateRebarWeight, calculateUniversalSteelWeight } from '../calculators/steel-weight-calculator';
import { calculateConcreteMaterial } from '../calculators/concrete-material-breakup';
import { calculateWallBrickwork } from '../calculators/brickwork';
import { calculateWallPlaster } from '../calculators/plaster';
import { calculateIndiaTax } from '../calculators/income-tax';
import { calculateSalaryComprehensive } from '../calculators/salary';
import { calculateGratuity } from '../calculators/gratuity';
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
import { factorial } from '../calculators/scientific';
import { calculateFractionOperation } from '../calculators/fraction';
import { generateMultipleRandomNumbers } from '../calculators/random-number-generator';
import { calculateVolumeComprehensive } from '../calculators/volume';
import type { CalculatorTestCase, CustomTestCaseDefinition } from './types';

/**
 * Execute a calculator formula dynamically based on slug and input parameters.
 */
export function executeCalculatorFormula(slug: string, inputs: Record<string, any>): any {
  switch (slug) {
    case 'emi-calculator':
      return calculateEmi(inputs as any);
    case 'sip-calculator':
      return calculateSipComprehensive(inputs as any);
    case 'swp-calculator':
      return calculateSwp({
        initialInvestment: inputs.initialInvestment || inputs.principal || inputs.investmentAmount,
        monthlyWithdrawal: inputs.monthlyWithdrawal || inputs.withdrawalAmount,
        annualReturnRate: inputs.annualReturnRate || inputs.returnRate || inputs.rate,
        timePeriodYears: inputs.timePeriodYears || inputs.years || inputs.tenure,
        annualInflationRate: inputs.annualInflationRate || inputs.inflationRate || 0,
        withdrawalTiming: inputs.withdrawalTiming || inputs.timing || 'beginning',
      });
    case 'xirr-calculator':
      if (inputs.cashFlows || inputs.customCashFlows) {
        return calculateCustomXirr(inputs.cashFlows || inputs.customCashFlows);
      }
      return calculateRecurringXirr({
        frequency: inputs.frequency || 'Monthly',
        startDate: inputs.startDate,
        maturityDate: inputs.maturityDate,
        recurringAmount: inputs.recurringAmount || inputs.investmentAmount || 0,
        maturityAmount: inputs.maturityAmount || 0,
      });
    case 'ppf-calculator':
      return calculatePpf({
        contributionMode: inputs.contributionMode || 'yearly',
        yearlyInvestment: inputs.yearlyInvestment || inputs.investmentAmount || inputs.annualDeposit || 10000,
        monthlyInvestment: inputs.monthlyInvestment,
        tenureYears: inputs.tenureYears || inputs.tenure || inputs.years || 15,
        annualInterestRate: inputs.annualInterestRate || inputs.rate || 7.1,
        depositTiming: inputs.depositTiming || 'beginning_of_year',
        existingBalance: inputs.existingBalance,
        partialWithdrawal: inputs.partialWithdrawal,
      });
    case 'gst-calculator':
      return calculateGstComprehensive(inputs as any);
    case 'bmi-calculator':
      return calculateBmi(inputs as any);
    case 'simple-interest-calculator':
      return calculateSimpleInterestComprehensive(inputs as any);
    case 'compound-interest-calculator':
      return calculateCompoundInterestComprehensive(inputs as any);
    case 'standard-deviation-calculator':
      return calculateStandardDeviation(inputs as any);
    case 'age-calculator':
      return calculateAge({ birthDate: inputs.birthDate, targetDate: inputs.targetDate });
    case 'height-calculator':
      return convertHeight({ value: inputs.value, unit: inputs.fromUnit || inputs.unit || 'cm', inchesExtra: inputs.inchesExtra });
    case 'rcc-beam-steel-calculator':
      return calculateRccBeamSteel(inputs as any);
    case 'rcc-column-steel-calculator':
      return calculateRccColumnSteel(inputs as any);
    case 'rcc-footing-steel-calculator':
      return calculateRccFootingSteel(inputs as any);
    case 'percentage-calculator':
      if (inputs.mode === 'isWhatPercent') return calculateIsWhatPercent(inputs.valA, inputs.valB);
      if (inputs.mode === 'percentageChange') return calculatePercentageChange(inputs.valA, inputs.valB);
      return calculatePercentOf(inputs.percentage ?? inputs.valA, inputs.total ?? inputs.valB);
    case 'weight-calculator':
      return convertWeight(inputs.value, inputs.fromUnit || inputs.unit || 'kg', inputs.targetUnit || inputs.toUnit);
    case 'time-calculator':
      return calculateTimeOperation(inputs as any);
    case 'date-difference-calculator':
      return calculateDateDifference({ startDate: inputs.startDate, endDate: inputs.endDate });
    case 'side-drain-slab-boq-calculator':
      return calculateSideDrainBOQ(inputs as any);
    case 'rcc-slab-steel-calculator':
      return calculateDetailedRccSlabSteel(inputs as any);
    case 'slab-steel-shuttering-calculator':
      return calculateSlabSteelShuttering(inputs as any);
    case 'steel-weight-calculator':
      if (inputs.diameterMm) return calculateRebarWeight(inputs.diameterMm, inputs.mode || 'bars', inputs.quantity || inputs.count || 1);
      return calculateUniversalSteelWeight(inputs as any);
    case 'concrete-material-breakup-calculator':
      return calculateConcreteMaterial(inputs as any);
    case 'brickwork-calculator':
      return calculateWallBrickwork(inputs as any);
    case 'plaster-calculator':
      return calculateWallPlaster(inputs as any);
    case 'income-tax-calculator':
      return calculateIndiaTax(inputs as any);
    case 'salary-calculator':
      return calculateSalaryComprehensive(inputs as any);
    case 'gratuity-calculator':
      return calculateGratuity(inputs as any);
    case 'mortgage-calculator':
      return calculateMortgageComprehensive(inputs as any);
    case 'loan-calculator':
      return calculatePersonalLoanComprehensive(inputs as any);
    case 'auto-loan-calculator':
      return calculateAutoLoan(inputs as any);
    case 'retirement-calculator':
      return calculateRetirementCorpus(inputs as any);
    case 'amortization-calculator':
      return calculateAmortizationSchedule(inputs as any);
    case 'sales-tax-calculator':
      return calculateSalesTaxExtended(inputs as any);
    case 'discount-calculator':
      return calculateDiscountExtended(inputs as any);
    case 'body-fat-calculator':
      return calculateNavyBodyFat(inputs as any);
    case 'calorie-calculator':
      return calculateDailyCalories(inputs as any);
    case 'bmr-calculator':
      return calculateBmr(inputs as any);
    case 'gpa-calculator':
      return calculateCourseGpa(inputs.courses || inputs as any);
    case 'scientific-calculator':
      if (inputs.operation === 'factorial') return { result: factorial(inputs.n) };
      return { result: factorial(inputs.n ?? 5) };
    case 'fraction-calculator':
      return calculateFractionOperation(
        inputs.fractionA || { numerator: inputs.num1 ?? 1, denominator: inputs.den1 ?? 2 },
        inputs.operator || '+',
        inputs.fractionB || { numerator: inputs.num2 ?? 1, denominator: inputs.den2 ?? 4 }
      );
    case 'random-number-generator-calculator':
      return generateMultipleRandomNumbers({
        min: inputs.min ?? 1,
        max: inputs.max ?? 100,
        count: inputs.count ?? 5,
        allowDuplicates: inputs.allowDuplicates ?? false,
        type: inputs.type || 'integer',
      });
    case 'volume-calculator':
      return calculateVolumeComprehensive(inputs as any);
    default:
      throw new Error(`No formula runner registered for calculator slug: ${slug}`);
  }
}

/**
 * Converts a stored custom test definition into an executable CalculatorTestCase.
 */
export function buildExecutableCustomTestCase(def: CustomTestCaseDefinition): CalculatorTestCase {
  return {
    id: def.id,
    slug: def.slug,
    name: def.name,
    category: def.category,
    expectedBehavior: def.expectedBehavior,
    expectedResultKey: def.expectedResultKey,
    expectedValue: def.expectedValue,
    tolerance: def.tolerance,
    inputValues: def.inputValues,
    isCustom: true,
    active: def.active,
    description: def.description,
    run: () => executeCalculatorFormula(def.slug, def.inputValues),
  };
}
