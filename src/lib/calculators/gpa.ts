/**
 * Comprehensive GPA (Grade Point Average) Calculation Engine
 * Supports 4.0 Standard Scale, Weighted High School (Honors/AP), Cumulative GPA,
 * Goal Planning, and Percentage-to-GPA conversions.
 */

export interface CourseEntry {
  id?: string;
  name?: string;
  credits: number;
  grade: string;
  level?: 'Regular' | 'Honors' | 'AP' | 'College';
}

export interface CourseBreakdownItem {
  name: string;
  credits: number;
  grade: string;
  level: string;
  basePoints: number;
  bonusPoints: number;
  finalPoints: number;
  qualityPoints: number;
}

export interface GpaCalculationResult {
  unweightedGpa: number;
  weightedGpa: number;
  totalCredits: number;
  totalQualityPoints: number;
  totalWeightedQualityPoints: number;
  letterGradeEquivalent: string;
  courses: CourseBreakdownItem[];
}

export const STANDARD_GRADE_POINTS: Record<string, number> = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'F': 0.0,
};

export const LEVEL_BONUSES: Record<string, number> = {
  Regular: 0.0,
  Honors: 0.5,
  AP: 1.0,
  College: 1.0,
};

/**
 * Calculate College / High School GPA with optional weighting
 */
export function calculateCourseGpa(
  courses: CourseEntry[],
  customGradePoints: Record<string, number> = STANDARD_GRADE_POINTS,
  honorsBonus: number = 0.5,
  apBonus: number = 1.0
): GpaCalculationResult {
  let totalCredits = 0;
  let totalQualityPoints = 0;
  let totalWeightedQualityPoints = 0;

  const breakdowns: CourseBreakdownItem[] = [];

  courses.forEach((c, idx) => {
    const credits = Math.max(0, c.credits || 0);
    if (credits <= 0) return;

    const basePoints = customGradePoints[c.grade] ?? 0;
    const level = c.level || 'Regular';

    let bonus = 0;
    if (basePoints > 0) {
      if (level === 'Honors') bonus = honorsBonus;
      else if (level === 'AP' || level === 'College') bonus = apBonus;
    }

    const finalPoints = basePoints + bonus;
    const qualityPoints = Number((basePoints * credits).toFixed(3));
    const weightedQualityPoints = Number((finalPoints * credits).toFixed(3));

    totalCredits += credits;
    totalQualityPoints += qualityPoints;
    totalWeightedQualityPoints += weightedQualityPoints;

    breakdowns.push({
      name: c.name?.trim() || `Course ${idx + 1}`,
      credits,
      grade: c.grade,
      level,
      basePoints,
      bonusPoints: bonus,
      finalPoints,
      qualityPoints,
    });
  });

  if (totalCredits === 0) {
    throw new Error('Please enter at least one valid course with positive credit hours.');
  }

  const unweightedGpa = Number((totalQualityPoints / totalCredits).toFixed(3));
  const weightedGpa = Number((totalWeightedQualityPoints / totalCredits).toFixed(3));

  let letterGradeEquivalent = 'F';
  if (unweightedGpa >= 3.85) letterGradeEquivalent = 'A (Excellent)';
  else if (unweightedGpa >= 3.5) letterGradeEquivalent = 'A- (Superior)';
  else if (unweightedGpa >= 3.15) letterGradeEquivalent = 'B+ (Very Good)';
  else if (unweightedGpa >= 2.85) letterGradeEquivalent = 'B (Good)';
  else if (unweightedGpa >= 2.5) letterGradeEquivalent = 'B- (Above Average)';
  else if (unweightedGpa >= 2.15) letterGradeEquivalent = 'C+ (Average)';
  else if (unweightedGpa >= 1.85) letterGradeEquivalent = 'C (Satisfactory)';
  else if (unweightedGpa >= 1.0) letterGradeEquivalent = 'D (Passing)';
  else letterGradeEquivalent = 'F (Failing)';

  return {
    unweightedGpa,
    weightedGpa,
    totalCredits: Number(totalCredits.toFixed(2)),
    totalQualityPoints: Number(totalQualityPoints.toFixed(2)),
    totalWeightedQualityPoints: Number(totalWeightedQualityPoints.toFixed(2)),
    letterGradeEquivalent,
    courses: breakdowns,
  };
}

/**
 * Calculate Cumulative GPA (Prior GPA + Current Semester)
 */
export function calculateCumulativeGpa(
  currentGpa: number,
  completedCredits: number,
  newSemesterGpa: number,
  newSemesterCredits: number
): {
  updatedCumulativeGpa: number;
  totalCompletedCredits: number;
  totalQualityPoints: number;
} {
  if (completedCredits < 0 || newSemesterCredits <= 0) {
    throw new Error('Credits must be non-negative, and new semester credits must be greater than zero.');
  }

  const prevPoints = currentGpa * completedCredits;
  const newPoints = newSemesterGpa * newSemesterCredits;
  const totalCredits = completedCredits + newSemesterCredits;
  const totalQualityPoints = prevPoints + newPoints;

  const updatedGpa = Number((totalQualityPoints / totalCredits).toFixed(3));

  return {
    updatedCumulativeGpa: updatedGpa,
    totalCompletedCredits: totalCredits,
    totalQualityPoints: Number(totalQualityPoints.toFixed(2)),
  };
}

/**
 * GPA Goal Planning: Calculate required future GPA
 */
export function calculateRequiredGpaForGoal(
  currentGpa: number,
  completedCredits: number,
  targetGpa: number,
  upcomingCredits: number,
  maxScale: number = 4.0
): {
  requiredGpa: number;
  isPossible: boolean;
  message: string;
} {
  if (upcomingCredits <= 0) {
    throw new Error('Upcoming credit hours must be greater than zero.');
  }

  const currentPoints = currentGpa * completedCredits;
  const totalCredits = completedCredits + upcomingCredits;
  const targetTotalPoints = targetGpa * totalCredits;
  const requiredPoints = targetTotalPoints - currentPoints;

  const requiredGpa = Number((requiredPoints / upcomingCredits).toFixed(3));

  if (requiredGpa > maxScale) {
    return {
      requiredGpa,
      isPossible: false,
      message: `Required GPA (${requiredGpa.toFixed(2)}) exceeds the maximum available scale (${maxScale.toFixed(1)}). Consider taking more credit hours or adjusting your goal.`,
    };
  }

  if (requiredGpa <= 0) {
    return {
      requiredGpa: 0,
      isPossible: true,
      message: `Target achieved! Even with a 0.00 GPA in your upcoming classes, your cumulative GPA will meet the target.`,
    };
  }

  return {
    requiredGpa,
    isPossible: true,
    message: `You need to average a ${requiredGpa.toFixed(2)} GPA across your upcoming ${upcomingCredits} credits to achieve a ${targetGpa.toFixed(2)} cumulative GPA.`,
  };
}

/**
 * Convert Percentage to GPA
 */
export function convertPercentageToGpa(
  percentage: number,
  scale: 4.0 | 5.0 | 10.0 = 4.0,
  method: 'linear' | 'table' = 'linear'
): {
  gpa: number;
  letterEquivalent: string;
  methodDescription: string;
} {
  const pct = Math.max(0, Math.min(100, percentage));

  if (method === 'linear') {
    const gpa = Number(((pct / 100) * scale).toFixed(2));
    let letter = 'F';
    if (pct >= 90) letter = 'A';
    else if (pct >= 80) letter = 'B';
    else if (pct >= 70) letter = 'C';
    else if (pct >= 60) letter = 'D';

    return {
      gpa,
      letterEquivalent: letter,
      methodDescription: `Simple linear conversion: (${pct}% ÷ 100) × ${scale}.0 = ${gpa}`,
    };
  }

  // Standard US Letter scale bracket mapping
  let gpa = 0.0;
  let letter = 'F';
  if (pct >= 93) { gpa = 4.0; letter = 'A'; }
  else if (pct >= 90) { gpa = 3.7; letter = 'A-'; }
  else if (pct >= 87) { gpa = 3.3; letter = 'B+'; }
  else if (pct >= 83) { gpa = 3.0; letter = 'B'; }
  else if (pct >= 80) { gpa = 2.7; letter = 'B-'; }
  else if (pct >= 77) { gpa = 2.3; letter = 'C+'; }
  else if (pct >= 73) { gpa = 2.0; letter = 'C'; }
  else if (pct >= 70) { gpa = 1.7; letter = 'C-'; }
  else if (pct >= 67) { gpa = 1.3; letter = 'D+'; }
  else if (pct >= 60) { gpa = 1.0; letter = 'D'; }
  else { gpa = 0.0; letter = 'F'; }

  if (scale === 5.0) gpa = Number((gpa * 1.25).toFixed(2));
  if (scale === 10.0) gpa = Number((gpa * 2.5).toFixed(2));

  return {
    gpa,
    letterEquivalent: letter,
    methodDescription: `Standard collegiate grade bracket mapping for ${pct}%.`,
  };
}
