/**
 * Universal Weight & Mass Conversion Engine
 * High-precision mathematical conversion constants and formatting utilities.
 */

export type WeightUnit =
  | 'kg'
  | 'g'
  | 'mg'
  | 'mcg'
  | 'tonne'
  | 'quintal'
  | 'lb'
  | 'oz'
  | 'stone'
  | 'us_ton'
  | 'long_ton'
  | 'troy_oz';

export interface UnitDefinition {
  id: WeightUnit;
  name: string;
  plural: string;
  symbol: string;
  category: 'metric' | 'imperial' | 'precious';
  toKg: number; // exact conversion factor to 1 kg
  typicalDecimals: number;
}

export const WEIGHT_UNITS: Record<WeightUnit, UnitDefinition> = {
  kg: {
    id: 'kg',
    name: 'Kilogram',
    plural: 'Kilograms',
    symbol: 'kg',
    category: 'metric',
    toKg: 1,
    typicalDecimals: 3,
  },
  lb: {
    id: 'lb',
    name: 'Pound',
    plural: 'Pounds',
    symbol: 'lbs',
    category: 'imperial',
    toKg: 0.45359237,
    typicalDecimals: 3,
  },
  g: {
    id: 'g',
    name: 'Gram',
    plural: 'Grams',
    symbol: 'g',
    category: 'metric',
    toKg: 0.001,
    typicalDecimals: 2,
  },
  oz: {
    id: 'oz',
    name: 'Ounce (Avoirdupois)',
    plural: 'Ounces',
    symbol: 'oz',
    category: 'imperial',
    toKg: 0.028349523125,
    typicalDecimals: 2,
  },
  stone: {
    id: 'stone',
    name: 'Stone',
    plural: 'Stones',
    symbol: 'st',
    category: 'imperial',
    toKg: 6.35029318,
    typicalDecimals: 2,
  },
  tonne: {
    id: 'tonne',
    name: 'Metric Tonne',
    plural: 'Metric Tonnes',
    symbol: 't',
    category: 'metric',
    toKg: 1000,
    typicalDecimals: 4,
  },
  mg: {
    id: 'mg',
    name: 'Milligram',
    plural: 'Milligrams',
    symbol: 'mg',
    category: 'metric',
    toKg: 0.000001,
    typicalDecimals: 0,
  },
  mcg: {
    id: 'mcg',
    name: 'Microgram',
    plural: 'Micrograms',
    symbol: 'mcg',
    category: 'metric',
    toKg: 0.000000001,
    typicalDecimals: 0,
  },
  us_ton: {
    id: 'us_ton',
    name: 'US Short Ton (2,000 lbs)',
    plural: 'US Short Tons',
    symbol: 'tn',
    category: 'imperial',
    toKg: 907.18474,
    typicalDecimals: 4,
  },
  long_ton: {
    id: 'long_ton',
    name: 'Imperial Long Ton (2,240 lbs)',
    plural: 'Imperial Long Tons',
    symbol: 'long tn',
    category: 'imperial',
    toKg: 1016.0469088,
    typicalDecimals: 4,
  },
  quintal: {
    id: 'quintal',
    name: 'Quintal (100 kg)',
    plural: 'Quintals',
    symbol: 'q',
    category: 'metric',
    toKg: 100,
    typicalDecimals: 3,
  },
  troy_oz: {
    id: 'troy_oz',
    name: 'Troy Ounce (Gold / Precious)',
    plural: 'Troy Ounces',
    symbol: 'oz t',
    category: 'precious',
    toKg: 0.0311034768,
    typicalDecimals: 3,
  },
};

export interface ConversionItem {
  id: WeightUnit;
  name: string;
  symbol: string;
  category: 'metric' | 'imperial' | 'precious';
  raw: number;
  formatted: string;
  formulaStep: string;
  isPopularPair?: boolean;
}

export interface WeightConversionResult {
  inputValue: number;
  fromUnit: WeightUnit;
  fromUnitName: string;
  fromUnitSymbol: string;
  baseKg: number;
  conversions: Record<WeightUnit, ConversionItem>;
  stoneAndPounds?: {
    stones: number;
    pounds: number;
    formatted: string;
  };
  primaryTargetUnit: WeightUnit;
  primaryConversion: ConversionItem;
}

/**
 * Format a number cleanly without unnecessary trailing zeroes or scientific notation breakdown
 */
export function formatWeightNumber(num: number, decimals: number = 3): string {
  if (num === 0) return '0';
  if (isNaN(num) || !isFinite(num)) return '0';

  const abs = Math.abs(num);

  if (abs >= 1e12 || (abs > 0 && abs < 1e-6)) {
    return num.toExponential(4);
  }

  // Determine decimals based on magnitude
  let effectiveDecimals = decimals;
  if (abs >= 1000000) effectiveDecimals = 0;
  else if (abs >= 1000) effectiveDecimals = Math.min(2, decimals);
  else if (abs < 0.001) effectiveDecimals = Math.max(4, decimals);

  const rounded = Number(num.toFixed(effectiveDecimals));
  const parts = rounded.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

/**
 * Convert a given weight value from one unit to all other supported units
 */
export function convertWeight(
  value: number,
  fromUnit: WeightUnit,
  targetUnit?: WeightUnit
): WeightConversionResult {
  const fromDef = WEIGHT_UNITS[fromUnit] || WEIGHT_UNITS.kg;
  const baseKg = value * fromDef.toKg;

  // Determine default highlighted primary target
  let effectiveTarget: WeightUnit = targetUnit || (fromUnit === 'kg' ? 'lb' : fromUnit === 'lb' ? 'kg' : 'kg');

  const conversions: Partial<Record<WeightUnit, ConversionItem>> = {};

  (Object.keys(WEIGHT_UNITS) as WeightUnit[]).forEach((unitKey) => {
    const unitDef = WEIGHT_UNITS[unitKey];
    const rawVal = baseKg / unitDef.toKg;
    const formatted = formatWeightNumber(rawVal, unitDef.typicalDecimals);

    let formulaStep = '';
    if (unitKey === fromUnit) {
      formulaStep = `${value} ${fromDef.symbol} = ${value} ${fromDef.symbol}`;
    } else {
      const ratio = fromDef.toKg / unitDef.toKg;
      formulaStep = `${value} × ${ratio >= 1 ? ratio.toFixed(4) : (1 / ratio).toFixed(4)} = ${formatted} ${unitDef.symbol}`;
    }

    conversions[unitKey] = {
      id: unitKey,
      name: unitDef.plural,
      symbol: unitDef.symbol,
      category: unitDef.category,
      raw: rawVal,
      formatted,
      formulaStep,
      isPopularPair:
        (fromUnit === 'kg' && unitKey === 'lb') ||
        (fromUnit === 'lb' && unitKey === 'kg') ||
        (fromUnit === 'g' && unitKey === 'oz') ||
        (fromUnit === 'oz' && unitKey === 'g') ||
        (fromUnit === 'stone' && unitKey === 'kg'),
    };
  });

  // Calculate Stone + Pounds Compound Format
  const totalLbs = baseKg / WEIGHT_UNITS.lb.toKg;
  const stonesPart = Math.floor(totalLbs / 14);
  const lbsRemainder = Number((totalLbs % 14).toFixed(2));

  return {
    inputValue: value,
    fromUnit,
    fromUnitName: fromDef.name,
    fromUnitSymbol: fromDef.symbol,
    baseKg,
    conversions: conversions as Record<WeightUnit, ConversionItem>,
    stoneAndPounds: {
      stones: stonesPart,
      pounds: lbsRemainder,
      formatted: `${stonesPart} st ${lbsRemainder} lbs`,
    },
    primaryTargetUnit: effectiveTarget,
    primaryConversion: conversions[effectiveTarget]!,
  };
}

/**
 * Dedicated Gold Weight Converter calculation
 */
export interface GoldConversionResult {
  grams: number;
  troyOunces: number;
  standardOunces: number;
  kilograms: number;
  milligrams: number;
  tolas: number;
}

export function convertGoldWeight(value: number, fromUnit: 'g' | 'kg' | 'mg' | 'troy_oz' | 'tola'): GoldConversionResult {
  let grams = 0;
  if (fromUnit === 'g') grams = value;
  else if (fromUnit === 'kg') grams = value * 1000;
  else if (fromUnit === 'mg') grams = value / 1000;
  else if (fromUnit === 'troy_oz') grams = value * 31.1034768;
  else if (fromUnit === 'tola') grams = value * 11.6638038;

  return {
    grams: Number(grams.toFixed(4)),
    troyOunces: Number((grams / 31.1034768).toFixed(4)),
    standardOunces: Number((grams / 28.349523125).toFixed(4)),
    kilograms: Number((grams / 1000).toFixed(6)),
    milligrams: Number((grams * 1000).toFixed(2)),
    tolas: Number((grams / 11.6638038).toFixed(4)),
  };
}

/**
 * Related Height & Weight / BMI helper calculation
 */
export interface BmiSummaryResult {
  bmi: number;
  category: 'Underweight' | 'Normal Weight' | 'Overweight' | 'Obesity';
  categoryColor: string;
  healthyWeightMinKg: number;
  healthyWeightMaxKg: number;
  healthyWeightMinLbs: number;
  healthyWeightMaxLbs: number;
}

export function calculateHeightWeightBmi(heightCm: number, weightKg: number): BmiSummaryResult {
  const heightM = heightCm / 100;
  const bmi = Number((weightKg / (heightM * heightM)).toFixed(1));

  let category: 'Underweight' | 'Normal Weight' | 'Overweight' | 'Obesity' = 'Normal Weight';
  let categoryColor = 'text-emerald-600 dark:text-emerald-400';

  if (bmi < 18.5) {
    category = 'Underweight';
    categoryColor = 'text-blue-600 dark:text-blue-400';
  } else if (bmi >= 25.0 && bmi < 30.0) {
    category = 'Overweight';
    categoryColor = 'text-amber-600 dark:text-amber-400';
  } else if (bmi >= 30.0) {
    category = 'Obesity';
    categoryColor = 'text-red-600 dark:text-red-400';
  }

  const healthyMinKg = Number((18.5 * heightM * heightM).toFixed(1));
  const healthyMaxKg = Number((24.9 * heightM * heightM).toFixed(1));
  const healthyMinLbs = Number((healthyMinKg * 2.20462).toFixed(1));
  const healthyMaxLbs = Number((healthyMaxKg * 2.20462).toFixed(1));

  return {
    bmi,
    category,
    categoryColor,
    healthyWeightMinKg: healthyMinKg,
    healthyWeightMaxKg: healthyMaxKg,
    healthyWeightMinLbs: healthyMinLbs,
    healthyWeightMaxLbs: healthyMaxLbs,
  };
}
