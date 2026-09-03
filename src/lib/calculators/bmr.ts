/**
 * Basal Metabolic Rate (BMR) Calculation Engine
 * 
 * Implements:
 * 1. Mifflin-St Jeor Equation (1990) - Clinical Standard
 * 2. Revised Harris-Benedict Equation (1984 Roza & Shizgal)
 * 
 * Also provides optional TDEE maintenance calorie calculations and goal adjustments.
 */

export type Gender = 'male' | 'female';
export type BmrFormula = 'mifflin' | 'harris';
export type HeightUnit = 'cm' | 'ft_in';
export type WeightUnit = 'kg' | 'lbs';
export type ActivityLevel = 'none' | 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type WeightGoal = 'maintain' | 'lose_gradual' | 'lose_moderate' | 'gain_gradual';

export interface ActivityLevelInfo {
  key: ActivityLevel;
  label: string;
  multiplier: number;
  description: string;
}

export const ACTIVITY_LEVEL_MAP: Record<ActivityLevel, ActivityLevelInfo> = {
  none: {
    key: 'none',
    label: 'None (BMR Only)',
    multiplier: 1.0,
    description: 'Calculate basal resting calories only without daily activity multiplier.',
  },
  sedentary: {
    key: 'sedentary',
    label: 'Sedentary',
    multiplier: 1.2,
    description: 'Little or no planned exercise.',
  },
  light: {
    key: 'light',
    label: 'Lightly Active',
    multiplier: 1.375,
    description: 'Light exercise or physical activity on some days.',
  },
  moderate: {
    key: 'moderate',
    label: 'Moderately Active',
    multiplier: 1.55,
    description: 'Regular exercise or an active routine.',
  },
  active: {
    key: 'active',
    label: 'Very Active',
    multiplier: 1.725,
    description: 'Frequent or demanding physical activity.',
  },
  very_active: {
    key: 'very_active',
    label: 'Extra Active',
    multiplier: 1.9,
    description: 'Very high daily physical activity or demanding training.',
  },
};

export interface GoalInfo {
  key: WeightGoal;
  label: string;
  adjustmentKcal: number;
  paceDescription: string;
}

export const GOAL_MAP: Record<WeightGoal, GoalInfo> = {
  maintain: {
    key: 'maintain',
    label: 'Maintain Weight',
    adjustmentKcal: 0,
    paceDescription: 'Maintain current body weight balance',
  },
  lose_gradual: {
    key: 'lose_gradual',
    label: 'Gradual Weight Loss',
    adjustmentKcal: -250,
    paceDescription: 'Mild deficit (~0.25 kg or ~0.55 lb loss/week)',
  },
  lose_moderate: {
    key: 'lose_moderate',
    label: 'Moderate Weight Loss',
    adjustmentKcal: -500,
    paceDescription: 'Standard deficit (~0.50 kg or ~1.10 lbs loss/week)',
  },
  gain_gradual: {
    key: 'gain_gradual',
    label: 'Gradual Weight Gain',
    adjustmentKcal: 250,
    paceDescription: 'Mild surplus (~0.25 kg or ~0.55 lb gain/week)',
  },
};

export interface BmrCalculationInput {
  gender: Gender;
  age: number;
  heightCm: number;
  weightKg: number;
  formula: BmrFormula;
  activityLevel?: ActivityLevel;
  goal?: WeightGoal;
}

export interface BmrCalculationResult {
  bmr: number;
  formula: BmrFormula;
  formulaLabel: string;
  gender: Gender;
  age: number;
  heightCm: number;
  weightKg: number;
  activityLevel?: ActivityLevel;
  activityLabel?: string;
  activityMultiplier?: number;
  maintenanceCalories?: number;
  goal?: WeightGoal;
  goalLabel?: string;
  goalAdjustmentKcal?: number;
  dailyCalorieTarget?: number;
  isLowCalorieWarning: boolean;
  warningMessage?: string;
  calculationSteps: string[];
  otherFormulaBmr: {
    formula: BmrFormula;
    formulaLabel: string;
    bmr: number;
  };
}

// Unit conversion helpers
export function cmToInches(cm: number): number {
  return cm / 2.54;
}

export function inchesToCm(inches: number): number {
  return inches * 2.54;
}

export function ftInToCm(feet: number, inches: number): number {
  const normFeet = Math.max(0, feet || 0);
  const normInches = Math.max(0, inches || 0);
  return (normFeet * 12 + normInches) * 2.54;
}

export function cmToFtIn(cm: number): { feet: number; inches: number } {
  if (!cm || cm <= 0) return { feet: 0, inches: 0 };
  const totalInches = cmToInches(cm);
  const feet = Math.floor(totalInches / 12);
  const inches = Number((totalInches % 12).toFixed(1));
  return { feet, inches };
}

export function kgToLbs(kg: number): number {
  return kg * 2.20462262;
}

export function lbsToKg(lbs: number): number {
  return lbs / 2.20462262;
}

/**
 * Calculates raw BMR using the Mifflin-St Jeor equation.
 */
export function calculateMifflinBmr(gender: Gender, weightKg: number, heightCm: number, age: number): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  const bmr = gender === 'male' ? base + 5 : base - 161;
  return Math.round(bmr);
}

/**
 * Calculates raw BMR using the Revised Harris-Benedict equation (1984 Roza & Shizgal).
 */
export function calculateHarrisBmr(gender: Gender, weightKg: number, heightCm: number, age: number): number {
  let bmr = 0;
  if (gender === 'male') {
    bmr = 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age;
  } else {
    bmr = 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.330 * age;
  }
  return Math.round(bmr);
}

/**
 * Validates BMR input values.
 */
export function validateBmrInputs(gender: Gender, age: number, heightCm: number, weightKg: number): void {
  if (isNaN(age) || age < 10 || age > 125) {
    throw new Error('Please enter a valid age between 10 and 120 years.');
  }
  if (isNaN(heightCm) || heightCm < 50 || heightCm > 270) {
    throw new Error('Please enter a valid height between 50 cm (1.6 ft) and 270 cm (8.9 ft).');
  }
  if (isNaN(weightKg) || weightKg < 20 || weightKg > 450) {
    throw new Error('Please enter a valid body weight between 20 kg (44 lbs) and 450 kg (990 lbs).');
  }
}

/**
 * Main BMR Calculation Function
 */
export function calculateBmr(input: BmrCalculationInput): BmrCalculationResult {
  const { gender, age, heightCm, weightKg, formula, activityLevel = 'none', goal = 'maintain' } = input;

  validateBmrInputs(gender, age, heightCm, weightKg);

  const mifflinVal = calculateMifflinBmr(gender, weightKg, heightCm, age);
  const harrisVal = calculateHarrisBmr(gender, weightKg, heightCm, age);

  const selectedBmr = formula === 'mifflin' ? mifflinVal : harrisVal;
  const formulaLabel = formula === 'mifflin' ? 'Mifflin-St Jeor' : 'Revised Harris-Benedict';

  const otherFormula: { formula: BmrFormula; formulaLabel: string; bmr: number } =
    formula === 'mifflin'
      ? { formula: 'harris', formulaLabel: 'Revised Harris-Benedict', bmr: harrisVal }
      : { formula: 'mifflin', formulaLabel: 'Mifflin-St Jeor', bmr: mifflinVal };

  const steps: string[] = [];

  if (formula === 'mifflin') {
    const constTerm = gender === 'male' ? '+ 5' : '− 161';
    const constVal = gender === 'male' ? 5 : -161;
    const wTerm = 10 * weightKg;
    const hTerm = 6.25 * heightCm;
    const aTerm = 5 * age;
    steps.push(
      `1. Mifflin-St Jeor Formula (${gender === 'male' ? 'Male' : 'Female'}): (10 × Weight) + (6.25 × Height) − (5 × Age) ${constTerm}`,
      `2. Converted Metric Values: Weight = ${weightKg.toFixed(1)} kg, Height = ${heightCm.toFixed(1)} cm, Age = ${age} yrs`,
      `3. Term Calculation: (10 × ${weightKg.toFixed(1)}) + (6.25 × ${heightCm.toFixed(1)}) − (5 × ${age}) ${constTerm}`,
      `4. Evaluated Steps: ${wTerm.toFixed(1)} + ${hTerm.toFixed(2)} − ${aTerm.toFixed(1)} ${constVal >= 0 ? '+' : '−'} ${Math.abs(constVal)} = ${(wTerm + hTerm - aTerm + constVal).toFixed(1)} kcal`,
      `5. Estimated Basal Metabolic Rate (BMR): ${selectedBmr} kcal/day`
    );
  } else {
    const baseConst = gender === 'male' ? 88.362 : 447.593;
    const wCoeff = gender === 'male' ? 13.397 : 9.247;
    const hCoeff = gender === 'male' ? 4.799 : 3.098;
    const aCoeff = gender === 'male' ? 5.677 : 4.330;

    const wTerm = wCoeff * weightKg;
    const hTerm = hCoeff * heightCm;
    const aTerm = aCoeff * age;
    const totalRaw = baseConst + wTerm + hTerm - aTerm;

    steps.push(
      `1. Revised Harris-Benedict Formula (${gender === 'male' ? 'Male' : 'Female'}): ${baseConst} + (${wCoeff} × Weight) + (${hCoeff} × Height) − (${aCoeff} × Age)`,
      `2. Converted Metric Values: Weight = ${weightKg.toFixed(1)} kg, Height = ${heightCm.toFixed(1)} cm, Age = ${age} yrs`,
      `3. Term Calculation: ${baseConst} + (${wCoeff} × ${weightKg.toFixed(1)}) + (${hCoeff} × ${heightCm.toFixed(1)}) − (${aCoeff} × ${age})`,
      `4. Evaluated Steps: ${baseConst} + ${wTerm.toFixed(2)} + ${hTerm.toFixed(2)} − ${aTerm.toFixed(2)} = ${totalRaw.toFixed(1)} kcal`,
      `5. Estimated Basal Metabolic Rate (BMR): ${selectedBmr} kcal/day`
    );
  }

  // Optional Activity Level & Maintenance Calories
  let maintenanceCalories: number | undefined;
  let activityLabel: string | undefined;
  let activityMultiplier: number | undefined;
  let dailyCalorieTarget: number | undefined;
  let goalLabel: string | undefined;
  let goalAdjustmentKcal: number | undefined;
  let isLowCalorieWarning = false;
  let warningMessage: string | undefined;

  if (activityLevel && activityLevel !== 'none') {
    const actInfo = ACTIVITY_LEVEL_MAP[activityLevel];
    activityLabel = actInfo.label;
    activityMultiplier = actInfo.multiplier;
    maintenanceCalories = Math.round(selectedBmr * activityMultiplier);

    steps.push(
      `6. Activity Multiplier (${activityLabel}): ${selectedBmr} BMR × ${activityMultiplier} = ${maintenanceCalories} Estimated Maintenance Calories (TDEE)`
    );

    if (goal) {
      const gInfo = GOAL_MAP[goal];
      goalLabel = gInfo.label;
      goalAdjustmentKcal = gInfo.adjustmentKcal;
      dailyCalorieTarget = Math.max(800, maintenanceCalories + goalAdjustmentKcal);

      steps.push(
        `7. Goal Adjustment (${goalLabel}): ${maintenanceCalories} kcal ${goalAdjustmentKcal >= 0 ? '+' : '−'} ${Math.abs(goalAdjustmentKcal)} kcal = ${dailyCalorieTarget} kcal/day`
      );

      // Low calorie safety warning check
      const minThreshold = gender === 'male' ? 1500 : 1200;
      if (dailyCalorieTarget < minThreshold) {
        isLowCalorieWarning = true;
        warningMessage = `Caution: The estimated daily calorie target (${dailyCalorieTarget} kcal) is below recommended general safety thresholds (${minThreshold} kcal/day for ${gender}s). Extreme calorie deficits should not be sustained without medical supervision.`;
      }
    }
  }

  return {
    bmr: selectedBmr,
    formula,
    formulaLabel,
    gender,
    age,
    heightCm,
    weightKg,
    activityLevel: activityLevel !== 'none' ? activityLevel : undefined,
    activityLabel,
    activityMultiplier,
    maintenanceCalories,
    goal: activityLevel !== 'none' ? goal : undefined,
    goalLabel,
    goalAdjustmentKcal,
    dailyCalorieTarget,
    isLowCalorieWarning,
    warningMessage,
    calculationSteps: steps,
    otherFormulaBmr: otherFormula,
  };
}
