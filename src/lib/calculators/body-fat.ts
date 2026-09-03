/**
 * Body Fat Percentage Calculation Engine
 * 
 * Implements:
 * 1. U.S. Navy Circumference Method (Hodgdon & Beckett / Siri equation)
 * 2. BMI-Based Body Fat Estimation (Deurenberg et al.)
 * 3. U.S. Army-Style Circumference Method (AR 600-9 Tape Test)
 */

export type CalculationMethod = 'navy' | 'bmi' | 'army';
export type Gender = 'male' | 'female';
export type HeightUnit = 'cm' | 'ft_in';
export type WeightUnit = 'kg' | 'lbs';
export type CircumferenceUnit = 'cm' | 'in';

export type BodyFatCategory =
  | 'Essential Fat'
  | 'Athletic'
  | 'Fitness'
  | 'Average'
  | 'Higher Body Fat';

export interface NavyCalculationInput {
  gender: Gender;
  heightCm: number;
  neckCm: number;
  waistCm: number;
  hipCm?: number; // Required for females
  weightKg?: number; // Optional: enables fat mass and lean mass calculations
}

export interface BmiCalculationInput {
  gender: Gender;
  age: number;
  heightCm: number;
  weightKg: number;
}

export interface ArmyCalculationInput {
  gender: Gender;
  heightCm: number;
  neckCm: number;
  waistCm: number;
  hipCm?: number; // Required for females
  weightKg?: number;
  age?: number;
}

export interface BodyFatResult {
  method: CalculationMethod;
  methodLabel: string;
  gender: Gender;
  bodyFatPercentage: number;
  bmi?: number;
  fatMassKg?: number;
  leanMassKg?: number;
  fatMassLbs?: number;
  leanMassLbs?: number;
  category: BodyFatCategory;
  categoryDescription: string;
  idealRange: string;
  calculationSteps: string[];
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
 * Categorizes body fat percentage based on American Council on Exercise (ACE) reference norms.
 */
export function getCategoryAndRange(
  gender: Gender,
  bodyFatPercentage: number
): { category: BodyFatCategory; categoryDescription: string; idealRange: string } {
  const bf = bodyFatPercentage;

  if (gender === 'male') {
    const idealRange = '10% – 20%';
    if (bf < 6) {
      return {
        category: 'Essential Fat',
        categoryDescription: 'Essential physiological fat (2% – 5%) required for basic metabolic and organ protection.',
        idealRange,
      };
    }
    if (bf <= 13.9) {
      return {
        category: 'Athletic',
        categoryDescription: 'Athletic reference range (6% – 13%) typical of competitive athletes and fitness professionals.',
        idealRange,
      };
    }
    if (bf <= 17.9) {
      return {
        category: 'Fitness',
        categoryDescription: 'Fitness reference range (14% – 17%) reflecting healthy lean muscular conditioning.',
        idealRange,
      };
    }
    if (bf <= 24.9) {
      return {
        category: 'Average',
        categoryDescription: 'General population average range (18% – 24%) for typical adult men.',
        idealRange,
      };
    }
    return {
      category: 'Higher Body Fat',
      categoryDescription: 'Higher body fat range (25% and above). Lifestyle changes or professional guidance recommended.',
      idealRange,
    };
  } else {
    const idealRange = '18% – 28%';
    if (bf < 14) {
      return {
        category: 'Essential Fat',
        categoryDescription: 'Essential physiological fat (10% – 13%) required for hormonal, reproductive, and bone health.',
        idealRange,
      };
    }
    if (bf <= 20.9) {
      return {
        category: 'Athletic',
        categoryDescription: 'Athletic reference range (14% – 20%) typical of competitive female athletes.',
        idealRange,
      };
    }
    if (bf <= 24.9) {
      return {
        category: 'Fitness',
        categoryDescription: 'Fitness reference range (21% – 24%) indicating a lean, well-conditioned physique.',
        idealRange,
      };
    }
    if (bf <= 31.9) {
      return {
        category: 'Average',
        categoryDescription: 'General population average range (25% – 31%) for typical adult women.',
        idealRange,
      };
    }
    return {
      category: 'Higher Body Fat',
      categoryDescription: 'Higher body fat range (32% and above). Lifestyle changes or professional guidance recommended.',
      idealRange,
    };
  }
}

/**
 * Calculates piecewise visual scale marker position (0% to 100%)
 * ensuring the marker lands accurately on the 5 visual category slices.
 */
export function calculateVisualMarkerPosition(gender: Gender, bodyFatPercentage: number): number {
  const bf = Math.max(1, Math.min(60, bodyFatPercentage));

  if (gender === 'male') {
    // 5 segments: Essential (2-6%), Athletic (6-14%), Fitness (14-18%), Average (18-25%), Higher (25-40%)
    if (bf < 6) {
      const p = (bf - 2) / (6 - 2);
      return Math.max(2, Math.min(19, 0 + p * 20));
    }
    if (bf < 14) {
      const p = (bf - 6) / (14 - 6);
      return 20 + p * 20;
    }
    if (bf < 18) {
      const p = (bf - 14) / (18 - 14);
      return 40 + p * 20;
    }
    if (bf < 25) {
      const p = (bf - 18) / (25 - 18);
      return 60 + p * 20;
    }
    const p = Math.min(1, (bf - 25) / (40 - 25));
    return Math.min(98, 80 + p * 20);
  } else {
    // 5 segments: Essential (10-14%), Athletic (14-21%), Fitness (21-25%), Average (25-32%), Higher (32-50%)
    if (bf < 14) {
      const p = (bf - 10) / (14 - 10);
      return Math.max(2, Math.min(19, 0 + p * 20));
    }
    if (bf < 21) {
      const p = (bf - 14) / (21 - 14);
      return 20 + p * 20;
    }
    if (bf < 25) {
      const p = (bf - 21) / (25 - 21);
      return 40 + p * 20;
    }
    if (bf < 32) {
      const p = (bf - 25) / (32 - 25);
      return 60 + p * 20;
    }
    const p = Math.min(1, (bf - 32) / (50 - 32));
    return Math.min(98, 80 + p * 20);
  }
}

/**
 * Validates circumference and biometric inputs with human anatomical ranges.
 */
export function validateMeasurements(
  gender: Gender,
  heightCm: number,
  neckCm: number,
  waistCm: number,
  hipCm?: number
): void {
  if (isNaN(heightCm) || heightCm < 60 || heightCm > 260) {
    throw new Error('Please enter a realistic height between 60 cm (2 ft) and 260 cm (8.5 ft).');
  }
  if (isNaN(neckCm) || neckCm < 20 || neckCm > 80) {
    throw new Error('Please enter a realistic neck circumference between 20 cm (8 in) and 80 cm (31.5 in).');
  }
  if (isNaN(waistCm) || waistCm < 40 || waistCm > 250) {
    throw new Error('Please enter a realistic waist circumference between 40 cm (16 in) and 250 cm (98 in).');
  }

  if (gender === 'male') {
    if (waistCm <= neckCm) {
      throw new Error('Waist circumference must be greater than neck circumference for the male formula calculation.');
    }
  } else {
    if (!hipCm || isNaN(hipCm) || hipCm < 40 || hipCm > 250) {
      throw new Error('Hip circumference is required for females and must be between 40 cm (16 in) and 250 cm (98 in).');
    }
    if (waistCm + hipCm <= neckCm) {
      throw new Error('Combined waist and hip circumference must be greater than neck circumference for females.');
    }
  }
}

/**
 * Calculates Body Fat Percentage using the U.S. Navy Circumference Method.
 */
export function calculateNavyBodyFat(input: NavyCalculationInput): BodyFatResult {
  const { gender, heightCm, neckCm, waistCm, hipCm, weightKg } = input;

  validateMeasurements(gender, heightCm, neckCm, waistCm, hipCm);

  let bodyFatPercentage = 0;
  const steps: string[] = [];

  if (gender === 'male') {
    const diff = waistCm - neckCm;
    const logDiff = Math.log10(diff);
    const logHeight = Math.log10(heightCm);
    const density = 1.0324 - 0.19077 * logDiff + 0.15456 * logHeight;

    if (density <= 0 || isNaN(density)) {
      throw new Error('Calculated body density produced an invalid mathematical value. Please verify your circumference inputs.');
    }

    bodyFatPercentage = 495 / density - 450;
    bodyFatPercentage = Number(Math.max(2, Math.min(65, bodyFatPercentage)).toFixed(1));

    steps.push(
      `1. Circumference Difference: Waist (${waistCm.toFixed(1)} cm) − Neck (${neckCm.toFixed(1)} cm) = ${diff.toFixed(1)} cm`,
      `2. Logarithmic Calculations: log₁₀(${diff.toFixed(1)}) = ${logDiff.toFixed(4)}, log₁₀(${heightCm.toFixed(1)} cm) = ${logHeight.toFixed(4)}`,
      `3. Male Body Density (Hodgdon & Beckett): 1.0324 − (0.19077 × ${logDiff.toFixed(4)}) + (0.15456 × ${logHeight.toFixed(4)}) = ${density.toFixed(4)} g/cm³`,
      `4. Siri Equation: (495 / ${density.toFixed(4)}) − 450 = ${bodyFatPercentage}% Estimated Body Fat`
    );
  } else {
    const safeHip = hipCm!;
    const sumDiff = waistCm + safeHip - neckCm;
    const logSumDiff = Math.log10(sumDiff);
    const logHeight = Math.log10(heightCm);
    const density = 1.29579 - 0.35004 * logSumDiff + 0.22100 * logHeight;

    if (density <= 0 || isNaN(density)) {
      throw new Error('Calculated body density produced an invalid mathematical value. Please verify your circumference inputs.');
    }

    bodyFatPercentage = 495 / density - 450;
    bodyFatPercentage = Number(Math.max(5, Math.min(65, bodyFatPercentage)).toFixed(1));

    steps.push(
      `1. Female Circumference Factor: Waist (${waistCm.toFixed(1)} cm) + Hip (${safeHip.toFixed(1)} cm) − Neck (${neckCm.toFixed(1)} cm) = ${sumDiff.toFixed(1)} cm`,
      `2. Logarithmic Calculations: log₁₀(${sumDiff.toFixed(1)}) = ${logSumDiff.toFixed(4)}, log₁₀(${heightCm.toFixed(1)} cm) = ${logHeight.toFixed(4)}`,
      `3. Female Body Density (Hodgdon & Beckett): 1.29579 − (0.35004 × ${logSumDiff.toFixed(4)}) + (0.22100 × ${logHeight.toFixed(4)}) = ${density.toFixed(4)} g/cm³`,
      `4. Siri Equation: (495 / ${density.toFixed(4)}) − 450 = ${bodyFatPercentage}% Estimated Body Fat`
    );
  }

  const { category, categoryDescription, idealRange } = getCategoryAndRange(gender, bodyFatPercentage);

  let fatMassKg: number | undefined;
  let leanMassKg: number | undefined;
  let fatMassLbs: number | undefined;
  let leanMassLbs: number | undefined;

  if (weightKg && weightKg > 0) {
    fatMassKg = Number(((weightKg * bodyFatPercentage) / 100).toFixed(1));
    leanMassKg = Number((weightKg - fatMassKg).toFixed(1));
    const weightLbs = kgToLbs(weightKg);
    fatMassLbs = Number(((weightLbs * bodyFatPercentage) / 100).toFixed(1));
    leanMassLbs = Number((weightLbs - fatMassLbs).toFixed(1));

    steps.push(
      `5. Fat Mass: ${weightKg.toFixed(1)} kg × (${bodyFatPercentage}% / 100) = ${fatMassKg} kg (${fatMassLbs} lbs)`,
      `6. Lean Body Mass: ${weightKg.toFixed(1)} kg − ${fatMassKg} kg = ${leanMassKg} kg (${leanMassLbs} lbs)`
    );
  }

  return {
    method: 'navy',
    methodLabel: 'U.S. Navy Method',
    gender,
    bodyFatPercentage,
    fatMassKg,
    leanMassKg,
    fatMassLbs,
    leanMassLbs,
    category,
    categoryDescription,
    idealRange,
    calculationSteps: steps,
  };
}

/**
 * Calculates Body Fat Percentage using the adult BMI-based formula (Deurenberg et al.).
 */
export function calculateBmiBodyFat(input: BmiCalculationInput): BodyFatResult {
  const { gender, age, heightCm, weightKg } = input;

  if (isNaN(heightCm) || heightCm < 60 || heightCm > 260) {
    throw new Error('Please enter a realistic height between 60 cm and 260 cm.');
  }
  if (isNaN(weightKg) || weightKg < 20 || weightKg > 400) {
    throw new Error('Please enter a realistic body weight between 20 kg and 400 kg.');
  }
  if (isNaN(age) || age < 18 || age > 120) {
    throw new Error('This adult BMI-based estimation is designed for individuals 18 years and older.');
  }

  const heightMeters = heightCm / 100;
  const bmi = Number((weightKg / (heightMeters * heightMeters)).toFixed(1));

  const sexFactor = gender === 'male' ? 1 : 0;
  // Formula: BF% = (1.20 * BMI) + (0.23 * Age) - (10.8 * Sex) - 5.4
  let bodyFatPercentage = 1.20 * bmi + 0.23 * age - 10.8 * sexFactor - 5.4;
  bodyFatPercentage = Number(Math.max(2, Math.min(65, bodyFatPercentage)).toFixed(1));

  const steps: string[] = [
    `1. Body Mass Index (BMI): ${weightKg.toFixed(1)} kg ÷ (${heightMeters.toFixed(2)} m)² = ${bmi.toFixed(1)} kg/m²`,
    `2. Adult Deurenberg Formula: (1.20 × ${bmi.toFixed(1)}) + (0.23 × ${age}) − (10.8 × ${sexFactor}) − 5.4`,
    `3. Calculation Breakdown: ${(1.20 * bmi).toFixed(2)} + ${(0.23 * age).toFixed(2)} − ${(10.8 * sexFactor).toFixed(2)} − 5.4 = ${bodyFatPercentage}% Estimated Body Fat`
  ];

  const { category, categoryDescription, idealRange } = getCategoryAndRange(gender, bodyFatPercentage);

  const fatMassKg = Number(((weightKg * bodyFatPercentage) / 100).toFixed(1));
  const leanMassKg = Number((weightKg - fatMassKg).toFixed(1));
  const weightLbs = kgToLbs(weightKg);
  const fatMassLbs = Number(((weightLbs * bodyFatPercentage) / 100).toFixed(1));
  const leanMassLbs = Number((weightLbs - fatMassLbs).toFixed(1));

  steps.push(
    `4. Estimated Fat Mass: ${weightKg.toFixed(1)} kg × (${bodyFatPercentage}% / 100) = ${fatMassKg} kg (${fatMassLbs} lbs)`,
    `5. Estimated Lean Body Mass: ${weightKg.toFixed(1)} kg − ${fatMassKg} kg = ${leanMassKg} kg (${leanMassLbs} lbs)`
  );

  return {
    method: 'bmi',
    methodLabel: 'BMI-Based Estimate',
    gender,
    bodyFatPercentage,
    bmi,
    fatMassKg,
    leanMassKg,
    fatMassLbs,
    leanMassLbs,
    category,
    categoryDescription,
    idealRange,
    calculationSteps: steps,
  };
}

/**
 * Calculates Body Fat Percentage using U.S. Army-Style Circumference Equations (AR 600-9 Tape Test).
 */
export function calculateArmyBodyFat(input: ArmyCalculationInput): BodyFatResult {
  const { gender, heightCm, neckCm, waistCm, hipCm, weightKg } = input;

  validateMeasurements(gender, heightCm, neckCm, waistCm, hipCm);

  const heightIn = cmToInches(heightCm);
  const neckIn = cmToInches(neckCm);
  const waistIn = cmToInches(waistCm);

  let bodyFatPercentage = 0;
  const steps: string[] = [];

  if (gender === 'male') {
    const diffIn = waistIn - neckIn;
    const logDiff = Math.log10(diffIn);
    const logHeight = Math.log10(heightIn);

    // Army Male Formula: %BF = 86.010 * log10(waist - neck) - 70.041 * log10(height) + 36.76
    bodyFatPercentage = 86.010 * logDiff - 70.041 * logHeight + 36.76;
    bodyFatPercentage = Number(Math.max(2, Math.min(65, bodyFatPercentage)).toFixed(1));

    steps.push(
      `1. Imperial Measurements: Height = ${heightIn.toFixed(1)}", Waist = ${waistIn.toFixed(1)}", Neck = ${neckIn.toFixed(1)}"`,
      `2. Circumference Difference: Waist (${waistIn.toFixed(1)}") − Neck (${neckIn.toFixed(1)}") = ${diffIn.toFixed(1)}"`,
      `3. Army AR 600-9 Male Equation: 86.010 × log₁₀(${diffIn.toFixed(1)}) − 70.041 × log₁₀(${heightIn.toFixed(1)}) + 36.76`,
      `4. Evaluated Result: (86.010 × ${logDiff.toFixed(4)}) − (70.041 × ${logHeight.toFixed(4)}) + 36.76 = ${bodyFatPercentage}% Estimated Body Fat`
    );
  } else {
    const safeHip = hipCm!;
    const hipIn = cmToInches(safeHip);
    const sumDiffIn = waistIn + hipIn - neckIn;
    const logSumDiff = Math.log10(sumDiffIn);
    const logHeight = Math.log10(heightIn);

    // Army Female Formula: %BF = 163.205 * log10(waist + hip - neck) - 97.684 * log10(height) - 78.387
    bodyFatPercentage = 163.205 * logSumDiff - 97.684 * logHeight - 78.387;
    bodyFatPercentage = Number(Math.max(5, Math.min(65, bodyFatPercentage)).toFixed(1));

    steps.push(
      `1. Imperial Measurements: Height = ${heightIn.toFixed(1)}", Waist = ${waistIn.toFixed(1)}", Hip = ${hipIn.toFixed(1)}", Neck = ${neckIn.toFixed(1)}"`,
      `2. Circumference Factor: Waist (${waistIn.toFixed(1)}") + Hip (${hipIn.toFixed(1)}") − Neck (${neckIn.toFixed(1)}") = ${sumDiffIn.toFixed(1)}"`,
      `3. Army AR 600-9 Female Equation: 163.205 × log₁₀(${sumDiffIn.toFixed(1)}) − 97.684 × log₁₀(${heightIn.toFixed(1)}) − 78.387`,
      `4. Evaluated Result: (163.205 × ${logSumDiff.toFixed(4)}) − (97.684 × ${logHeight.toFixed(4)}) − 78.387 = ${bodyFatPercentage}% Estimated Body Fat`
    );
  }

  const { category, categoryDescription, idealRange } = getCategoryAndRange(gender, bodyFatPercentage);

  let fatMassKg: number | undefined;
  let leanMassKg: number | undefined;
  let fatMassLbs: number | undefined;
  let leanMassLbs: number | undefined;

  if (weightKg && weightKg > 0) {
    fatMassKg = Number(((weightKg * bodyFatPercentage) / 100).toFixed(1));
    leanMassKg = Number((weightKg - fatMassKg).toFixed(1));
    const weightLbs = kgToLbs(weightKg);
    fatMassLbs = Number(((weightLbs * bodyFatPercentage) / 100).toFixed(1));
    leanMassLbs = Number((weightLbs - fatMassLbs).toFixed(1));

    steps.push(
      `5. Estimated Fat Mass: ${weightKg.toFixed(1)} kg × (${bodyFatPercentage}% / 100) = ${fatMassKg} kg (${fatMassLbs} lbs)`,
      `6. Estimated Lean Body Mass: ${weightKg.toFixed(1)} kg − ${fatMassKg} kg = ${leanMassKg} kg (${leanMassLbs} lbs)`
    );
  }

  return {
    method: 'army',
    methodLabel: 'Army-Style Circumference Estimate',
    gender,
    bodyFatPercentage,
    fatMassKg,
    leanMassKg,
    fatMassLbs,
    leanMassLbs,
    category,
    categoryDescription,
    idealRange,
    calculationSteps: steps,
  };
}
