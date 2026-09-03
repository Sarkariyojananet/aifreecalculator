/**
 * BMI (Body Mass Index) Calculation Logic
 * Supports WHO International and Asian/Indian standards,
 * Age & Gender specific metrics, Deurenberg Body Fat %, and Ideal Weight formulas.
 */

export interface BmiInput {
  weightKg: number;
  heightCm: number;
  gender?: 'male' | 'female';
  age?: number;
  standard?: 'who' | 'asian';
}

export interface BmiResult {
  bmi: number;
  category: 'Underweight' | 'Normal weight' | 'Overweight' | 'Obese Class I' | 'Obese Class II' | 'Obese Class III' | 'Obese';
  categoryKey: 'underweight' | 'normal' | 'overweight' | 'obese1' | 'obese2' | 'obese3';
  categoryColor: string;
  healthyWeightMinKg: number;
  healthyWeightMaxKg: number;
  differenceKg: number;
  differenceText: string;
  ponderalIndex: number;
  primeIndex: number;
  bodyFatPercent: number | null;
  idealWeightKg: number;
  ageGroup: 'child' | 'adult' | 'senior';
  ageInsight: string;
}

/**
 * Calculates Ideal Body Weight using Devine formula:
 * Male: 50.0 kg + 2.3 kg per inch over 5 feet
 * Female: 45.5 kg + 2.3 kg per inch over 5 feet
 */
export function calculateIdealBodyWeight(heightCm: number, gender: 'male' | 'female' = 'male'): number {
  const heightInches = heightCm / 2.54;
  const inchesOver5Feet = Math.max(0, heightInches - 60);
  const baseWeight = gender === 'female' ? 45.5 : 50.0;
  return Number((baseWeight + 2.3 * inchesOver5Feet).toFixed(1));
}

/**
 * Calculates Body Fat Percentage using Deurenberg formula
 */
export function calculateBodyFat(bmi: number, age: number = 28, gender: 'male' | 'female' = 'male'): number {
  const isMale = gender === 'male' ? 1 : 0;
  let bf: number;

  if (age < 18) {
    // Child / adolescent formula
    bf = 1.51 * bmi - 0.70 * age - 3.6 * isMale + 1.4;
  } else {
    // Adult formula
    bf = 1.20 * bmi + 0.23 * age - 10.8 * isMale - 5.4;
  }

  return Number(Math.max(2, Math.min(65, bf)).toFixed(1));
}

export function calculateBmi(input: BmiInput): BmiResult {
  const { weightKg, heightCm, gender = 'male', age = 28, standard = 'who' } = input;
  if (heightCm <= 0 || weightKg <= 0) {
    throw new Error('Height and weight must be positive numbers.');
  }

  const heightMeters = heightCm / 100;
  const bmi = Number((weightKg / (heightMeters * heightMeters)).toFixed(1));
  const ponderalIndex = Number((weightKg / Math.pow(heightMeters, 3)).toFixed(2));

  // Determine healthy cutoffs based on WHO or Asian/Indian standards
  const normalMinBmi = 18.5;
  const normalMaxBmi = standard === 'asian' ? 22.9 : 24.9;
  const overweightMaxBmi = standard === 'asian' ? 24.9 : 29.9;

  const healthyWeightMinKg = Number((normalMinBmi * heightMeters * heightMeters).toFixed(1));
  const healthyWeightMaxKg = Number((normalMaxBmi * heightMeters * heightMeters).toFixed(1));

  let primeIndex = Number((bmi / (standard === 'asian' ? 23 : 25)).toFixed(2));
  let differenceKg = 0;
  let differenceText = 'Ideal Range 👍';
  let category: BmiResult['category'] = 'Normal weight';
  let categoryKey: BmiResult['categoryKey'] = 'normal';
  let categoryColor = '#10b981'; // emerald

  if (bmi < normalMinBmi) {
    category = 'Underweight';
    categoryKey = 'underweight';
    categoryColor = '#3b82f6'; // blue
    differenceKg = Number((healthyWeightMinKg - weightKg).toFixed(1));
    differenceText = `Gain +${differenceKg} kg to reach healthy range`;
  } else if (bmi <= normalMaxBmi) {
    category = 'Normal weight';
    categoryKey = 'normal';
    categoryColor = '#10b981'; // emerald
    differenceKg = 0;
    differenceText = 'Healthy weight for your height 👍';
  } else if (bmi <= overweightMaxBmi) {
    category = 'Overweight';
    categoryKey = 'overweight';
    categoryColor = '#f59e0b'; // amber
    differenceKg = Number((weightKg - healthyWeightMaxKg).toFixed(1));
    differenceText = `Lose -${differenceKg} kg to reach normal range`;
  } else if (standard === 'asian' || bmi <= 34.9) {
    category = standard === 'asian' ? 'Obese' : 'Obese Class I';
    categoryKey = 'obese1';
    categoryColor = '#f97316'; // orange
    differenceKg = Number((weightKg - healthyWeightMaxKg).toFixed(1));
    differenceText = `Lose -${differenceKg} kg to reach normal range`;
  } else if (bmi <= 39.9) {
    category = 'Obese Class II';
    categoryKey = 'obese2';
    categoryColor = '#ef4444'; // red
    differenceKg = Number((weightKg - healthyWeightMaxKg).toFixed(1));
    differenceText = `Lose -${differenceKg} kg to reach normal range`;
  } else {
    category = 'Obese Class III';
    categoryKey = 'obese3';
    categoryColor = '#991b1b'; // dark red
    differenceKg = Number((weightKg - healthyWeightMaxKg).toFixed(1));
    differenceText = `Lose -${differenceKg} kg to reach normal range`;
  }

  // Age group & insight
  let ageGroup: BmiResult['ageGroup'] = 'adult';
  let ageInsight = 'Standard adult WHO reference ranges apply.';
  if (age < 20) {
    ageGroup = 'child';
    ageInsight = 'For ages 2-19, BMI percentiles based on age and sex charts (CDC/WHO growth charts) are recommended.';
  } else if (age >= 60) {
    ageGroup = 'senior';
    ageInsight = 'For adults 60+, a slightly higher BMI (22 - 27 kg/m²) is often considered protective and healthy.';
  }

  const bodyFatPercent = calculateBodyFat(bmi, age, gender);
  const idealWeightKg = calculateIdealBodyWeight(heightCm, gender);

  return {
    bmi,
    category,
    categoryKey,
    categoryColor,
    healthyWeightMinKg,
    healthyWeightMaxKg,
    differenceKg,
    differenceText,
    ponderalIndex,
    primeIndex,
    bodyFatPercent,
    idealWeightKg,
    ageGroup,
    ageInsight,
  };
}
