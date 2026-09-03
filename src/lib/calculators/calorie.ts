/**
 * Daily Calorie & TDEE (Total Daily Energy Expenditure) Engine
 * 
 * Supports:
 * - Mifflin-St Jeor Equation
 * - Revised Harris-Benedict (1984) Equation
 * - 5 Physical Activity Multipliers
 * - Maintenance, Weight Loss, and Weight Gain Calorie Targets
 * - Macronutrient Estimations (Balanced, High Protein, Low Carb, Custom)
 * - Food Calorie Calculations with Nutritional Presets (Indian Food, Chipotle, Starbucks)
 */

export type Gender = 'male' | 'female';
export type BmrFormula = 'mifflin' | 'harris';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type CalorieGoal =
  | 'maintain'
  | 'lose_gradual'
  | 'lose_moderate'
  | 'lose_faster'
  | 'gain_gradual'
  | 'gain_moderate';

export type MacroSplitType = 'balanced' | 'high_protein' | 'low_carb' | 'custom';

export interface CalorieProfileInput {
  gender: Gender;
  age: number;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  formula?: BmrFormula;
  goal?: CalorieGoal;
}

export interface MacroGrams {
  proteinGrams: number;
  proteinCalories: number;
  proteinPercent: number;
  carbsGrams: number;
  carbsCalories: number;
  carbsPercent: number;
  fatGrams: number;
  fatCalories: number;
  fatPercent: number;
}

export interface GoalComparisonTier {
  goalKey: CalorieGoal;
  label: string;
  paceDescription: string;
  adjustmentKcal: number;
  dailyCalories: number;
  weeklyCalories: number;
  isSafe: boolean;
}

export interface CalorieCalculationResult {
  gender: Gender;
  age: number;
  heightCm: number;
  weightKg: number;
  formula: BmrFormula;
  formulaLabel: string;
  bmr: number;
  activityLevel: ActivityLevel;
  activityLabel: string;
  activityMultiplier: number;
  maintenanceCalories: number;
  weeklyMaintenanceCalories: number;
  selectedGoal: CalorieGoal;
  goalLabel: string;
  goalAdjustmentKcal: number;
  dailyCalorieTarget: number;
  weeklyCalorieTarget: number;
  isLowCalorieWarning: boolean;
  warningMessage?: string;
  goalComparison: GoalComparisonTier[];
  macros: MacroGrams;
  calculationSteps: string[];
}

export interface FoodItem {
  id: string;
  name: string;
  servingQty: number;
  servingUnit: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
}

export interface FoodTotals {
  totalCalories: number;
  totalProteinG: number;
  totalCarbsG: number;
  totalFatG: number;
}

// Activity Level Multipliers and Descriptions
export const ACTIVITY_LEVEL_MAP: Record<
  ActivityLevel,
  { label: string; multiplier: number; description: string }
> = {
  sedentary: {
    label: 'Sedentary',
    multiplier: 1.2,
    description: 'Little or no planned exercise; desk work and mostly seated daily routine.',
  },
  light: {
    label: 'Lightly Active',
    multiplier: 1.375,
    description: 'Light physical exercise or sports 1–3 days per week; some walking throughout the day.',
  },
  moderate: {
    label: 'Moderately Active',
    multiplier: 1.55,
    description: 'Moderate exercise or sports 3–5 days per week; active lifestyle or standing job.',
  },
  active: {
    label: 'Very Active',
    multiplier: 1.725,
    description: 'Hard physical exercise or sports 6–7 days per week; highly active work.',
  },
  very_active: {
    label: 'Extra Active',
    multiplier: 1.9,
    description: 'Very heavy physical training twice a day or rigorous manual labor construction work.',
  },
};

// Goal Definitions
export const GOAL_MAP: Record<
  CalorieGoal,
  { label: string; adjustment: number; paceDescription: string }
> = {
  maintain: {
    label: 'Maintain Current Weight',
    adjustment: 0,
    paceDescription: '0 kg / 0 lb change per week',
  },
  lose_gradual: {
    label: 'Gradual Weight Loss',
    adjustment: -250,
    paceDescription: 'Approx. 0.25 kg (0.55 lb) fat loss per week (-250 kcal/day)',
  },
  lose_moderate: {
    label: 'Moderate Weight Loss',
    adjustment: -500,
    paceDescription: 'Approx. 0.50 kg (1.10 lb) fat loss per week (-500 kcal/day)',
  },
  lose_faster: {
    label: 'Faster Weight Loss',
    adjustment: -750,
    paceDescription: 'Approx. 0.75 kg (1.65 lb) fat loss per week (-750 kcal/day)',
  },
  gain_gradual: {
    label: 'Gradual Weight Gain',
    adjustment: 250,
    paceDescription: 'Approx. 0.25 kg (0.55 lb) lean gain per week (+250 kcal/day)',
  },
  gain_moderate: {
    label: 'Moderate Weight Gain',
    adjustment: 500,
    paceDescription: 'Approx. 0.50 kg (1.10 lb) mass gain per week (+500 kcal/day)',
  },
};

// Macro Split Presets
export const MACRO_PRESETS: Record<
  Exclude<MacroSplitType, 'custom'>,
  { proteinPct: number; carbsPct: number; fatPct: number; label: string }
> = {
  balanced: {
    proteinPct: 30,
    carbsPct: 40,
    fatPct: 30,
    label: 'Balanced (30% Protein / 40% Carbs / 30% Fat)',
  },
  high_protein: {
    proteinPct: 40,
    carbsPct: 35,
    fatPct: 25,
    label: 'Higher Protein (40% Protein / 35% Carbs / 25% Fat)',
  },
  low_carb: {
    proteinPct: 35,
    carbsPct: 20,
    fatPct: 45,
    label: 'Lower Carb (35% Protein / 20% Carbs / 45% Fat)',
  },
};

// Unit conversion helpers
export function cmToFtInches(cm: number): { feet: number; inches: number } {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Number((totalInches % 12).toFixed(1));
  return { feet, inches };
}

export function ftInchesToCm(feet: number, inches: number): number {
  return (feet * 12 + inches) * 2.54;
}

export function kgToPounds(kg: number): number {
  return kg * 2.20462262;
}

export function poundsToKg(lbs: number): number {
  return lbs / 2.20462262;
}

/**
 * Calculates Basal Metabolic Rate (BMR) using Mifflin-St Jeor or Revised Harris-Benedict.
 */
export function calculateBmr(
  gender: Gender,
  age: number,
  heightCm: number,
  weightKg: number,
  formula: BmrFormula = 'mifflin'
): { bmr: number; steps: string[] } {
  const steps: string[] = [];
  let bmr = 0;

  if (formula === 'mifflin') {
    // Mifflin-St Jeor Equation
    // Men: (10 × W) + (6.25 × H) - (5 × A) + 5
    // Women: (10 × W) + (6.25 × H) - (5 × A) - 161
    const weightPart = 10 * weightKg;
    const heightPart = 6.25 * heightCm;
    const agePart = 5 * age;
    const genderOffset = gender === 'male' ? 5 : -161;

    bmr = weightPart + heightPart - agePart + genderOffset;
    bmr = Math.round(bmr);

    steps.push(
      `1. Formula: Mifflin-St Jeor Equation (${gender === 'male' ? 'Men' : 'Women'})`,
      `2. Weight Component: 10 × ${weightKg.toFixed(1)} kg = ${weightPart.toFixed(1)} kcal`,
      `3. Height Component: 6.25 × ${heightCm.toFixed(1)} cm = ${heightPart.toFixed(1)} kcal`,
      `4. Age Component: 5 × ${age} yrs = ${agePart.toFixed(1)} kcal`,
      `5. Gender Adjustment: ${gender === 'male' ? '+5 kcal' : '-161 kcal'}`,
      `6. Evaluated BMR: ${weightPart.toFixed(1)} + ${heightPart.toFixed(1)} − ${agePart.toFixed(1)} ${genderOffset >= 0 ? '+' : ''}${genderOffset} = ${bmr.toLocaleString()} kcal/day`
    );
  } else {
    // Revised Harris-Benedict Equation (1984 by Roza & Shizgal)
    // Men: 88.362 + (13.397 × W) + (4.799 × H) - (5.677 × A)
    // Women: 447.593 + (9.247 × W) + (3.098 × H) - (4.330 × A)
    if (gender === 'male') {
      const base = 88.362;
      const weightPart = 13.397 * weightKg;
      const heightPart = 4.799 * heightCm;
      const agePart = 5.677 * age;
      bmr = base + weightPart + heightPart - agePart;
      bmr = Math.round(bmr);

      steps.push(
        `1. Formula: Revised Harris-Benedict Equation (Men, 1984)`,
        `2. Base Constant: 88.362 kcal`,
        `3. Weight Component: 13.397 × ${weightKg.toFixed(1)} kg = ${weightPart.toFixed(2)} kcal`,
        `4. Height Component: 4.799 × ${heightCm.toFixed(1)} cm = ${heightPart.toFixed(2)} kcal`,
        `5. Age Component: 5.677 × ${age} yrs = ${agePart.toFixed(2)} kcal`,
        `6. Evaluated BMR: 88.362 + ${weightPart.toFixed(2)} + ${heightPart.toFixed(2)} − ${agePart.toFixed(2)} = ${bmr.toLocaleString()} kcal/day`
      );
    } else {
      const base = 447.593;
      const weightPart = 9.247 * weightKg;
      const heightPart = 3.098 * heightCm;
      const agePart = 4.330 * age;
      bmr = base + weightPart + heightPart - agePart;
      bmr = Math.round(bmr);

      steps.push(
        `1. Formula: Revised Harris-Benedict Equation (Women, 1984)`,
        `2. Base Constant: 447.593 kcal`,
        `3. Weight Component: 9.247 × ${weightKg.toFixed(1)} kg = ${weightPart.toFixed(2)} kcal`,
        `4. Height Component: 3.098 × ${heightCm.toFixed(1)} cm = ${heightPart.toFixed(2)} kcal`,
        `5. Age Component: 4.330 × ${age} yrs = ${agePart.toFixed(2)} kcal`,
        `6. Evaluated BMR: 447.593 + ${weightPart.toFixed(2)} + ${heightPart.toFixed(2)} − ${agePart.toFixed(2)} = ${bmr.toLocaleString()} kcal/day`
      );
    }
  }

  return { bmr, steps };
}

/**
 * Calculates macronutrient gram distributions for a given daily calorie target.
 */
export function calculateMacros(
  dailyCalories: number,
  proteinPercent: number = 30,
  carbsPercent: number = 40,
  fatPercent: number = 30
): MacroGrams {
  const proteinCalories = (dailyCalories * proteinPercent) / 100;
  const carbsCalories = (dailyCalories * carbsPercent) / 100;
  const fatCalories = (dailyCalories * fatPercent) / 100;

  const proteinGrams = Math.round(proteinCalories / 4);
  const carbsGrams = Math.round(carbsCalories / 4);
  const fatGrams = Math.round(fatCalories / 9);

  return {
    proteinGrams,
    proteinCalories: Math.round(proteinCalories),
    proteinPercent,
    carbsGrams,
    carbsCalories: Math.round(carbsCalories),
    carbsPercent,
    fatGrams,
    fatCalories: Math.round(fatCalories),
    fatPercent,
  };
}

/**
 * Main calculation routine for Calorie Needs and TDEE.
 */
export function calculateDailyCalories(input: CalorieProfileInput): CalorieCalculationResult {
  const { gender, age, heightCm, weightKg, activityLevel, formula = 'mifflin', goal = 'maintain' } = input;

  if (isNaN(age) || age < 12 || age > 120) {
    throw new Error('Please enter a valid age between 12 and 120 years.');
  }
  if (isNaN(heightCm) || heightCm < 60 || heightCm > 260) {
    throw new Error('Please enter a valid height (between 60 cm and 260 cm).');
  }
  if (isNaN(weightKg) || weightKg < 20 || weightKg > 400) {
    throw new Error('Please enter a valid body weight (between 20 kg and 400 kg).');
  }

  const { bmr, steps } = calculateBmr(gender, age, heightCm, weightKg, formula);

  const actInfo = ACTIVITY_LEVEL_MAP[activityLevel] || ACTIVITY_LEVEL_MAP.sedentary;
  const maintenanceCalories = Math.round(bmr * actInfo.multiplier);
  const weeklyMaintenanceCalories = maintenanceCalories * 7;

  steps.push(
    `7. Activity Multiplier: ${actInfo.label} (${actInfo.multiplier}×)`,
    `8. Total Daily Energy Expenditure (TDEE): ${bmr.toLocaleString()} kcal × ${actInfo.multiplier} = ${maintenanceCalories.toLocaleString()} kcal/day`
  );

  const goalInfo = GOAL_MAP[goal] || GOAL_MAP.maintain;
  const goalAdjustmentKcal = goalInfo.adjustment;
  let dailyCalorieTarget = maintenanceCalories + goalAdjustmentKcal;

  // Minimum threshold check
  const minThreshold = gender === 'female' ? 1200 : 1500;
  let isLowCalorieWarning = false;
  let warningMessage: string | undefined;

  if (dailyCalorieTarget < minThreshold) {
    isLowCalorieWarning = true;
    warningMessage = `Caution: Calorie target (${dailyCalorieTarget.toLocaleString()} kcal) is below the general recommended daily minimum (${minThreshold.toLocaleString()} kcal for ${gender === 'female' ? 'women' : 'men'}). Consider a more gradual pace or consult a registered dietitian.`;
  }

  steps.push(
    `9. Selected Goal: ${goalInfo.label} (${goalAdjustmentKcal >= 0 ? '+' : ''}${goalAdjustmentKcal} kcal/day)`,
    `10. Daily Calorie Target: ${maintenanceCalories.toLocaleString()} ${goalAdjustmentKcal >= 0 ? '+' : '−'} ${Math.abs(goalAdjustmentKcal)} = ${dailyCalorieTarget.toLocaleString()} kcal/day (${(dailyCalorieTarget * 7).toLocaleString()} kcal/week)`
  );

  // Generate Goal Comparison Tiers
  const allGoals: CalorieGoal[] = [
    'maintain',
    'lose_gradual',
    'lose_moderate',
    'lose_faster',
    'gain_gradual',
    'gain_moderate',
  ];

  const goalComparison: GoalComparisonTier[] = allGoals.map((gKey) => {
    const gDef = GOAL_MAP[gKey];
    const target = maintenanceCalories + gDef.adjustment;
    return {
      goalKey: gKey,
      label: gDef.label,
      paceDescription: gDef.paceDescription,
      adjustmentKcal: gDef.adjustment,
      dailyCalories: target,
      weeklyCalories: target * 7,
      isSafe: target >= minThreshold,
    };
  });

  const macros = calculateMacros(dailyCalorieTarget, 30, 40, 30);

  return {
    gender,
    age,
    heightCm,
    weightKg,
    formula,
    formulaLabel: formula === 'mifflin' ? 'Mifflin-St Jeor' : 'Revised Harris-Benedict (1984)',
    bmr,
    activityLevel,
    activityLabel: actInfo.label,
    activityMultiplier: actInfo.multiplier,
    maintenanceCalories,
    weeklyMaintenanceCalories,
    selectedGoal: goal,
    goalLabel: goalInfo.label,
    goalAdjustmentKcal,
    dailyCalorieTarget,
    weeklyCalorieTarget: dailyCalorieTarget * 7,
    isLowCalorieWarning,
    warningMessage,
    goalComparison,
    macros,
    calculationSteps: steps,
  };
}

/**
 * Calculates sum totals of logged food items.
 */
export function calculateFoodTotals(foods: FoodItem[]): FoodTotals {
  let totalCalories = 0;
  let totalProteinG = 0;
  let totalCarbsG = 0;
  let totalFatG = 0;

  for (const item of foods) {
    const qty = Math.max(0, item.servingQty || 1);
    totalCalories += item.calories * qty;
    totalProteinG += (item.proteinG || 0) * qty;
    totalCarbsG += (item.carbsG || 0) * qty;
    totalFatG += (item.fatG || 0) * qty;
  }

  return {
    totalCalories: Math.round(totalCalories),
    totalProteinG: Number(totalProteinG.toFixed(1)),
    totalCarbsG: Number(totalCarbsG.toFixed(1)),
    totalFatG: Number(totalFatG.toFixed(1)),
  };
}

// Preset Indian Food Database
export const INDIAN_FOOD_PRESETS: Array<{
  name: string;
  servingUnit: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
}> = [
  { name: 'Plain Whole Wheat Roti / Chapati (Without Ghee)', servingUnit: '1 roti (35g)', calories: 104, proteinG: 3.1, carbsG: 22.0, fatG: 0.5 },
  { name: 'Roti with Ghee (1 tsp)', servingUnit: '1 roti with ghee (40g)', calories: 145, proteinG: 3.2, carbsG: 22.0, fatG: 5.0 },
  { name: 'Cooked Basmati White Rice', servingUnit: '1 medium bowl (150g)', calories: 195, proteinG: 4.1, carbsG: 43.0, fatG: 0.4 },
  { name: 'Cooked Brown Rice', servingUnit: '1 medium bowl (150g)', calories: 168, proteinG: 3.8, carbsG: 35.0, fatG: 1.4 },
  { name: 'Yellow Dal Tadka (Moong / Toor)', servingUnit: '1 katori / bowl (150g)', calories: 148, proteinG: 7.2, carbsG: 19.5, fatG: 4.5 },
  { name: 'Dal Makhani (With Butter & Cream)', servingUnit: '1 katori / bowl (150g)', calories: 280, proteinG: 8.5, carbsG: 24.0, fatG: 16.5 },
  { name: 'Paneer Butter Masala', servingUnit: '1 katori / bowl (150g)', calories: 340, proteinG: 12.0, carbsG: 14.0, fatG: 26.0 },
  { name: 'Palak Paneer', servingUnit: '1 katori / bowl (150g)', calories: 230, proteinG: 11.5, carbsG: 9.0, fatG: 16.5 },
  { name: 'Chole / Chickpea Curry', servingUnit: '1 katori / bowl (150g)', calories: 210, proteinG: 8.0, carbsG: 28.0, fatG: 7.5 },
  { name: 'Steamed Rice Idli (2 pieces)', servingUnit: '2 medium idlis (80g)', calories: 130, proteinG: 4.0, carbsG: 26.0, fatG: 0.6 },
  { name: 'Plain Dosa (Without Ghee/Oil)', servingUnit: '1 medium dosa (90g)', calories: 165, proteinG: 3.8, carbsG: 29.0, fatG: 3.5 },
  { name: 'Masala Dosa (With Potato Bhaji)', servingUnit: '1 full dosa (160g)', calories: 320, proteinG: 5.5, carbsG: 48.0, fatG: 12.0 },
  { name: 'Kanda Poha (Flattened Rice with Peanuts)', servingUnit: '1 plate (150g)', calories: 250, proteinG: 5.0, carbsG: 42.0, fatG: 7.0 },
  { name: 'Semolina Upma (With Vegetables)', servingUnit: '1 bowl (150g)', calories: 215, proteinG: 4.5, carbsG: 34.0, fatG: 6.8 },
  { name: 'Mixed Vegetable Sukhi Sabzi', servingUnit: '1 katori / bowl (130g)', calories: 125, proteinG: 2.8, carbsG: 16.0, fatG: 5.5 },
  { name: 'Fresh Plain Curd / Dahi', servingUnit: '1 small bowl (100g)', calories: 98, proteinG: 3.5, carbsG: 4.8, fatG: 4.3 },
];

// Preset Chipotle Builder Database
export const CHIPOTLE_PRESETS: Array<{
  category: 'Base' | 'Protein' | 'Beans & Veg' | 'Salsas & Toppings';
  name: string;
  servingUnit: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
}> = [
  { category: 'Base', name: 'White Rice', servingUnit: '1 scoop (4 oz)', calories: 210, proteinG: 4, carbsG: 40, fatG: 4 },
  { category: 'Base', name: 'Brown Rice', servingUnit: '1 scoop (4 oz)', calories: 210, proteinG: 4, carbsG: 36, fatG: 6 },
  { category: 'Base', name: 'Supergreens Salad Mix', servingUnit: '1 serving (3 oz)', calories: 15, proteinG: 1, carbsG: 3, fatG: 0 },
  { category: 'Base', name: 'Flour Tortilla (Burrito)', servingUnit: '1 large tortilla', calories: 320, proteinG: 8, carbsG: 50, fatG: 9 },
  { category: 'Protein', name: 'Grilled Chicken', servingUnit: '1 serving (4 oz)', calories: 180, proteinG: 32, carbsG: 0, fatG: 7 },
  { category: 'Protein', name: 'Steak (Adobo Marinated)', servingUnit: '1 serving (4 oz)', calories: 150, proteinG: 21, carbsG: 1, fatG: 6 },
  { category: 'Protein', name: 'Barbacoa (Shredded Beef)', servingUnit: '1 serving (4 oz)', calories: 170, proteinG: 24, carbsG: 2, fatG: 7 },
  { category: 'Protein', name: 'Carnitas (Braised Pork)', servingUnit: '1 serving (4 oz)', calories: 210, proteinG: 23, carbsG: 0, fatG: 12 },
  { category: 'Protein', name: 'Sofritas (Organic Tofu)', servingUnit: '1 serving (4 oz)', calories: 150, proteinG: 8, carbsG: 9, fatG: 10 },
  { category: 'Beans & Veg', name: 'Black Beans', servingUnit: '1 scoop (4 oz)', calories: 130, proteinG: 8, carbsG: 22, fatG: 1.5 },
  { category: 'Beans & Veg', name: 'Pinto Beans', servingUnit: '1 scoop (4 oz)', calories: 130, proteinG: 8, carbsG: 21, fatG: 1.5 },
  { category: 'Beans & Veg', name: 'Fajita Veggies (Peppers & Onions)', servingUnit: '1 serving (2.5 oz)', calories: 20, proteinG: 1, carbsG: 5, fatG: 0 },
  { category: 'Salsas & Toppings', name: 'Fresh Tomato Salsa (Mild)', servingUnit: '1 scoop (3.5 oz)', calories: 25, proteinG: 1, carbsG: 4, fatG: 0 },
  { category: 'Salsas & Toppings', name: 'Roasted Chili-Corn Salsa (Medium)', servingUnit: '1 scoop (3.5 oz)', calories: 80, proteinG: 3, carbsG: 16, fatG: 1.5 },
  { category: 'Salsas & Toppings', name: 'Tomatillo Green-Chili Salsa', servingUnit: '1 scoop (2 oz)', calories: 15, proteinG: 0, carbsG: 4, fatG: 0 },
  { category: 'Salsas & Toppings', name: 'Tomatillo Red-Chili Salsa (Hot)', servingUnit: '1 scoop (2 oz)', calories: 30, proteinG: 1, carbsG: 4, fatG: 0 },
  { category: 'Salsas & Toppings', name: 'Sour Cream', servingUnit: '1 scoop (2 oz)', calories: 110, proteinG: 2, carbsG: 2, fatG: 9 },
  { category: 'Salsas & Toppings', name: 'Monterey Jack Shredded Cheese', servingUnit: '1 portion (1 oz)', calories: 110, proteinG: 6, carbsG: 1, fatG: 8 },
  { category: 'Salsas & Toppings', name: 'Guacamole (Fresh Avocado)', servingUnit: '1 portion (3.5 oz)', calories: 230, proteinG: 2, carbsG: 8, fatG: 22 },
  { category: 'Salsas & Toppings', name: 'Queso Blanco', servingUnit: '1 portion (2 oz)', calories: 120, proteinG: 5, carbsG: 4, fatG: 9 },
];

// Preset Starbucks Database
export const STARBUCKS_PRESETS: Array<{
  category: 'Coffee & Espresso' | 'Milk & Dairy Alternatives' | 'Syrups & Flavors';
  name: string;
  servingUnit: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
}> = [
  { category: 'Coffee & Espresso', name: 'Caffè Latte (Grande 16 fl oz, 2% Milk)', servingUnit: 'Grande (16 oz)', calories: 190, proteinG: 12, carbsG: 18, fatG: 7 },
  { category: 'Coffee & Espresso', name: 'Cappuccino (Grande 16 fl oz, 2% Milk)', servingUnit: 'Grande (16 oz)', calories: 140, proteinG: 9, carbsG: 14, fatG: 5 },
  { category: 'Coffee & Espresso', name: 'Caramel Macchiato (Grande 16 fl oz, 2% Milk)', servingUnit: 'Grande (16 oz)', calories: 250, proteinG: 10, carbsG: 35, fatG: 7 },
  { category: 'Coffee & Espresso', name: 'Iced Brown Sugar Oatmilk Shaken Espresso', servingUnit: 'Grande (16 oz)', calories: 120, proteinG: 2, carbsG: 20, fatG: 3 },
  { category: 'Coffee & Espresso', name: 'Caffè Americano (Black, Grande)', servingUnit: 'Grande (16 oz)', calories: 15, proteinG: 1, carbsG: 3, fatG: 0 },
  { category: 'Coffee & Espresso', name: 'Nitro Cold Brew (Grande, Unsweetened)', servingUnit: 'Grande (16 oz)', calories: 5, proteinG: 0, carbsG: 0, fatG: 0 },
  { category: 'Coffee & Espresso', name: 'Vanilla Sweet Cream Cold Brew', servingUnit: 'Grande (16 oz)', calories: 110, proteinG: 1, carbsG: 14, fatG: 5 },
  { category: 'Coffee & Espresso', name: 'White Chocolate Mocha (With Whipped Cream)', servingUnit: 'Grande (16 oz)', calories: 430, proteinG: 12, carbsG: 55, fatG: 18 },
  { category: 'Coffee & Espresso', name: 'Matcha Tea Latte (Grande, 2% Milk)', servingUnit: 'Grande (16 oz)', calories: 240, proteinG: 12, carbsG: 34, fatG: 7 },
  { category: 'Milk & Dairy Alternatives', name: 'Whole Milk Substitution (Per 8 oz)', servingUnit: '1 cup (8 oz)', calories: 150, proteinG: 8, carbsG: 12, fatG: 8 },
  { category: 'Milk & Dairy Alternatives', name: 'Oatmilk Substitution (Oatly Barista, 8 oz)', servingUnit: '1 cup (8 oz)', calories: 140, proteinG: 3, carbsG: 16, fatG: 7 },
  { category: 'Milk & Dairy Alternatives', name: 'Almondmilk Substitution (Starbucks Blend, 8 oz)', servingUnit: '1 cup (8 oz)', calories: 60, proteinG: 2, carbsG: 5, fatG: 4 },
  { category: 'Milk & Dairy Alternatives', name: 'Soymilk Substitution (Sweetened, 8 oz)', servingUnit: '1 cup (8 oz)', calories: 130, proteinG: 7, carbsG: 13, fatG: 4 },
  { category: 'Syrups & Flavors', name: 'Vanilla Syrup (1 Pump)', servingUnit: '1 pump', calories: 20, proteinG: 0, carbsG: 5, fatG: 0 },
  { category: 'Syrups & Flavors', name: 'Caramel Syrup (1 Pump)', servingUnit: '1 pump', calories: 20, proteinG: 0, carbsG: 5, fatG: 0 },
  { category: 'Syrups & Flavors', name: 'Mocha Sauce (1 Pump)', servingUnit: '1 pump', calories: 25, proteinG: 0.5, carbsG: 6, fatG: 0.5 },
  { category: 'Syrups & Flavors', name: 'Sugar-Free Vanilla Syrup (1 Pump)', servingUnit: '1 pump', calories: 0, proteinG: 0, carbsG: 0, fatG: 0 },
  { category: 'Syrups & Flavors', name: 'Whipped Cream Topping (Standard Portion)', servingUnit: '1 standard swirl', calories: 80, proteinG: 1, carbsG: 2, fatG: 8 },
];
