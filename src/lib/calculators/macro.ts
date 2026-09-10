/**
 * Macronutrient (Macro) Calculation Engine
 * High-precision sports nutrition & dietary logic based on the Mifflin-St Jeor BMR equation and macronutrient energy conversions.
 *
 * Energy Equivalents:
 * - Protein: 4 kcal per gram
 * - Carbohydrates: 4 kcal per gram
 * - Fats: 9 kcal per gram
 */

export type MacroGoal = 'fat_loss' | 'aggressive_loss' | 'maintain' | 'lean_bulk' | 'bulk';

export type DietType = 'balanced' | 'high_protein' | 'low_carb' | 'keto';

export interface MacroInput {
  age: number;
  gender: 'male' | 'female';
  heightCm: number;
  weightKg: number;
  activityLevel: number; // 1.2, 1.375, 1.55, 1.725, 1.9
  goal: MacroGoal;
  dietType: DietType;
  mealsPerDay?: number; // 3, 4, 5
}

export interface MacroGrams {
  grams: number;
  calories: number;
  percentage: number;
  perMealGrams: number;
}

export interface MacroResult {
  bmr: number;
  tdee: number;
  targetCalories: number;
  protein: MacroGrams;
  carbs: MacroGrams;
  fats: MacroGrams;
  goal: MacroGoal;
  dietType: DietType;
  mealsPerDay: number;
}

export function calculateMacros(input: MacroInput): MacroResult {
  const {
    age,
    gender,
    heightCm,
    weightKg,
    activityLevel,
    goal,
    dietType,
    mealsPerDay = 4,
  } = input;

  // 1. Calculate Basal Metabolic Rate (BMR) - Mifflin-St Jeor
  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  // 2. Total Daily Energy Expenditure (TDEE)
  const tdee = Math.round(bmr * activityLevel);

  // 3. Goal Adjustment
  let targetCalories = tdee;
  if (goal === 'fat_loss') {
    targetCalories = Math.round(tdee * 0.82); // 18% deficit
  } else if (goal === 'aggressive_loss') {
    targetCalories = Math.round(tdee * 0.75); // 25% deficit
  } else if (goal === 'lean_bulk') {
    targetCalories = Math.round(tdee * 1.10); // 10% surplus
  } else if (goal === 'bulk') {
    targetCalories = Math.round(tdee * 1.18); // 18% surplus
  }

  // Safety floor
  const floor = gender === 'female' ? 1200 : 1500;
  targetCalories = Math.max(floor, targetCalories);

  // 4. Macro Splits by Diet Type (percentages of total calories)
  let pRatio = 0.30;
  let cRatio = 0.40;
  let fRatio = 0.30;

  if (dietType === 'high_protein') {
    pRatio = 0.40;
    cRatio = 0.35;
    fRatio = 0.25;
  } else if (dietType === 'low_carb') {
    pRatio = 0.35;
    cRatio = 0.20;
    fRatio = 0.45;
  } else if (dietType === 'keto') {
    pRatio = 0.25;
    cRatio = 0.05;
    fRatio = 0.70;
  }

  const pCalories = targetCalories * pRatio;
  const cCalories = targetCalories * cRatio;
  const fCalories = targetCalories * fRatio;

  const pGrams = Math.round(pCalories / 4);
  const cGrams = Math.round(cCalories / 4);
  const fGrams = Math.round(fCalories / 9);

  return {
    bmr: Math.round(bmr),
    tdee,
    targetCalories,
    protein: {
      grams: pGrams,
      calories: Math.round(pCalories),
      percentage: Math.round(pRatio * 100),
      perMealGrams: +(pGrams / mealsPerDay).toFixed(1),
    },
    carbs: {
      grams: cGrams,
      calories: Math.round(cCalories),
      percentage: Math.round(cRatio * 100),
      perMealGrams: +(cGrams / mealsPerDay).toFixed(1),
    },
    fats: {
      grams: fGrams,
      calories: Math.round(fCalories),
      percentage: Math.round(fRatio * 100),
      perMealGrams: +(fGrams / mealsPerDay).toFixed(1),
    },
    goal,
    dietType,
    mealsPerDay,
  };
}
