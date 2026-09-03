/**
 * Comprehensive Percentage Calculation Engine
 * High precision pure calculation functions for all percentage types
 */

// 1. Basic Percentage Calculations
export function calculatePercentOf(percent: number, total: number): number {
  if (isNaN(percent) || isNaN(total)) return 0;
  return Number(((percent / 100) * total).toFixed(4));
}

export function calculateIsWhatPercent(part: number, whole: number): number {
  if (isNaN(part) || isNaN(whole) || whole === 0) return 0;
  return Number(((part / whole) * 100).toFixed(4));
}

export function calculatePercentageChange(fromVal: number, toVal: number): {
  diff: number;
  changePercent: number;
  isIncrease: boolean;
} {
  if (isNaN(fromVal) || isNaN(toVal) || fromVal === 0) {
    return { diff: 0, changePercent: 0, isIncrease: true };
  }
  const diff = toVal - fromVal;
  const changePercent = Number(((diff / Math.abs(fromVal)) * 100).toFixed(2));
  return {
    diff: Number(Math.abs(diff).toFixed(4)),
    changePercent: Number(Math.abs(changePercent).toFixed(2)),
    isIncrease: diff >= 0,
  };
}

export function calculatePercentageDifference(val1: number, val2: number): number {
  if (isNaN(val1) || isNaN(val2)) return 0;
  const average = (val1 + val2) / 2;
  if (average === 0) return 0;
  const diff = Math.abs(val1 - val2);
  return Number(((diff / Math.abs(average)) * 100).toFixed(2));
}

export function calculateValueAfterPercent(original: number, percent: number, isIncrease: boolean): {
  finalValue: number;
  changeAmount: number;
} {
  if (isNaN(original) || isNaN(percent)) return { finalValue: 0, changeAmount: 0 };
  const changeAmount = (percent / 100) * original;
  const finalValue = isIncrease ? original + changeAmount : original - changeAmount;
  return {
    finalValue: Number(finalValue.toFixed(4)),
    changeAmount: Number(changeAmount.toFixed(4)),
  };
}

// 2. Marks & Grade Percentage
export interface SubjectMark {
  name?: string;
  obtained: number;
  total: number;
}

export function getGradeFromPercentage(percentage: number): { grade: string; description: string } {
  if (percentage >= 90) return { grade: 'A+', description: 'Outstanding / Excellent' };
  if (percentage >= 80) return { grade: 'A', description: 'Very Good' };
  if (percentage >= 70) return { grade: 'B', description: 'Good' };
  if (percentage >= 60) return { grade: 'C', description: 'Average / Fair' };
  if (percentage >= 50) return { grade: 'D', description: 'Below Average / Pass' };
  return { grade: 'F', description: 'Fail / Needs Improvement' };
}

export function calculateMarksPercentage(obtained: number, total: number): {
  percentage: number;
  grade: string;
  gradeDescription: string;
} {
  if (isNaN(obtained) || isNaN(total) || total <= 0) {
    return { percentage: 0, grade: 'F', gradeDescription: 'Invalid Marks' };
  }
  const percentage = Number(((obtained / total) * 100).toFixed(2));
  const gradeInfo = getGradeFromPercentage(percentage);
  return {
    percentage,
    grade: gradeInfo.grade,
    gradeDescription: gradeInfo.description,
  };
}

// 3. CGPA to Percentage
export type CgpaMethod = 'cbse' | 'ten_point' | 'aicte' | 'custom';

export function calculateCgpaToPercentage(
  cgpa: number,
  method: CgpaMethod = 'cbse',
  customFactor: number = 9.5
): { percentage: number; formulaNote: string } {
  if (isNaN(cgpa) || cgpa < 0) return { percentage: 0, formulaNote: 'Invalid CGPA' };

  let percentage = 0;
  let formulaNote = '';

  switch (method) {
    case 'cbse':
      percentage = cgpa * 9.5;
      formulaNote = `${cgpa} × 9.5 = ${percentage.toFixed(2)}% (CBSE / Standard 9.5 Factor)`;
      break;
    case 'ten_point':
      percentage = cgpa * 10;
      formulaNote = `${cgpa} × 10 = ${percentage.toFixed(2)}% (10-Point Scale Multiplier)`;
      break;
    case 'aicte':
      percentage = (cgpa - 0.75) * 10;
      formulaNote = `(${cgpa} - 0.75) × 10 = ${percentage.toFixed(2)}% (AICTE Formula)`;
      break;
    case 'custom':
      const factor = isNaN(customFactor) || customFactor <= 0 ? 9.5 : customFactor;
      percentage = cgpa * factor;
      formulaNote = `${cgpa} × ${factor} = ${percentage.toFixed(2)}% (Custom Factor: ${factor})`;
      break;
  }

  return {
    percentage: Number(percentage.toFixed(2)),
    formulaNote,
  };
}

// 4. Salary Hike Percentage
export function calculateSalaryHike(currentSalary: number, newSalary: number): {
  hikeAmount: number;
  hikePercentage: number;
  monthlyIncrease: number;
} {
  if (isNaN(currentSalary) || isNaN(newSalary) || currentSalary <= 0) {
    return { hikeAmount: 0, hikePercentage: 0, monthlyIncrease: 0 };
  }
  const hikeAmount = newSalary - currentSalary;
  const hikePercentage = Number(((hikeAmount / currentSalary) * 100).toFixed(2));
  const monthlyIncrease = Number((hikeAmount / 12).toFixed(2));

  return {
    hikeAmount: Number(hikeAmount.toFixed(2)),
    hikePercentage,
    monthlyIncrease,
  };
}

// 5. Attendance Percentage & Target Tracker
export function calculateAttendance(
  attended: number,
  total: number,
  targetPercent: number = 75
): {
  attendancePercentage: number;
  classesToAttend: number;
  isTargetMet: boolean;
  maxPossiblePercentage?: number;
} {
  if (isNaN(attended) || isNaN(total) || total <= 0 || attended > total) {
    return { attendancePercentage: 0, classesToAttend: 0, isTargetMet: false };
  }

  const currentPercent = Number(((attended / total) * 100).toFixed(2));
  const isTargetMet = currentPercent >= targetPercent;

  let classesToAttend = 0;
  if (!isTargetMet && targetPercent < 100) {
    // Formula: (attended + x) / (total + x) >= target / 100
    // 100*attended + 100*x >= target*total + target*x
    // x*(100 - target) >= target*total - 100*attended
    // x = ceil((target*total - 100*attended) / (100 - target))
    const numerator = targetPercent * total - 100 * attended;
    const denominator = 100 - targetPercent;
    classesToAttend = Math.max(0, Math.ceil(numerator / denominator));
  }

  return {
    attendancePercentage: currentPercent,
    classesToAttend,
    isTargetMet,
  };
}

// 6. Win Percentage
export function calculateWinPercentage(
  wins: number,
  losses: number,
  draws: number = 0,
  drawWeight: number = 0.5
): {
  totalGames: number;
  winPercentage: number;
  lossPercentage: number;
  drawPercentage: number;
} {
  const w = isNaN(wins) ? 0 : Math.max(0, wins);
  const l = isNaN(losses) ? 0 : Math.max(0, losses);
  const d = isNaN(draws) ? 0 : Math.max(0, draws);
  const total = w + l + d;

  if (total === 0) {
    return { totalGames: 0, winPercentage: 0, lossPercentage: 0, drawPercentage: 0 };
  }

  const effectiveWins = w + d * drawWeight;
  const winPercent = Number(((effectiveWins / total) * 100).toFixed(2));
  const lossPercent = Number(((l / total) * 100).toFixed(2));
  const drawPercent = Number(((d / total) * 100).toFixed(2));

  return {
    totalGames: total,
    winPercentage: winPercent,
    lossPercentage: lossPercent,
    drawPercentage: drawPercent,
  };
}

// 7. Weight Loss / Gain Percentage
export function calculateWeightLossPercentage(
  startWeight: number,
  currentWeight: number
): {
  diffWeight: number;
  percentage: number;
  isLoss: boolean;
} {
  if (isNaN(startWeight) || isNaN(currentWeight) || startWeight <= 0) {
    return { diffWeight: 0, percentage: 0, isLoss: true };
  }

  const diff = currentWeight - startWeight;
  const pct = Number(((Math.abs(diff) / startWeight) * 100).toFixed(2));

  return {
    diffWeight: Number(Math.abs(diff).toFixed(2)),
    percentage: pct,
    isLoss: diff <= 0,
  };
}

// 8. Body Fat Percentage (U.S. Navy Method)
export function calculateNavyBodyFat(
  gender: 'male' | 'female',
  heightCm: number,
  weightKg: number,
  waistCm: number,
  neckCm: number,
  hipCm: number = 0
): {
  bodyFatPercentage: number;
  fatMassKg: number;
  leanMassKg: number;
  category: string;
} {
  let bf = 0;

  if (gender === 'male') {
    // US Navy Male Formula:
    // %Fat = 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
    const diff = waistCm - neckCm;
    if (diff <= 0 || heightCm <= 0) return { bodyFatPercentage: 0, fatMassKg: 0, leanMassKg: 0, category: 'N/A' };
    const logDiff = Math.log10(diff);
    const logHeight = Math.log10(heightCm);
    bf = 495 / (1.0324 - 0.19077 * logDiff + 0.15456 * logHeight) - 450;
  } else {
    // US Navy Female Formula:
    // %Fat = 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
    const sum = waistCm + hipCm - neckCm;
    if (sum <= 0 || heightCm <= 0) return { bodyFatPercentage: 0, fatMassKg: 0, leanMassKg: 0, category: 'N/A' };
    const logSum = Math.log10(sum);
    const logHeight = Math.log10(heightCm);
    bf = 495 / (1.29579 - 0.35004 * logSum + 0.22100 * logHeight) - 450;
  }

  bf = Math.max(3, Math.min(65, Number(bf.toFixed(1))));
  const fatMass = Number(((bf / 100) * weightKg).toFixed(1));
  const leanMass = Number((weightKg - fatMass).toFixed(1));

  let category = 'Normal';
  if (gender === 'male') {
    if (bf < 6) category = 'Essential Fat';
    else if (bf < 14) category = 'Athletes';
    else if (bf < 18) category = 'Fitness';
    else if (bf < 25) category = 'Average';
    else category = 'Obese';
  } else {
    if (bf < 14) category = 'Essential Fat';
    else if (bf < 21) category = 'Athletes';
    else if (bf < 25) category = 'Fitness';
    else if (bf < 32) category = 'Average';
    else category = 'Obese';
  }

  return {
    bodyFatPercentage: bf,
    fatMassKg: fatMass,
    leanMassKg: leanMass,
    category,
  };
}

// 9. Average Percentage Calculator
export function calculateAveragePercentage(values: number[]): number {
  const valid = values.filter((v) => !isNaN(v));
  if (valid.length === 0) return 0;
  const sum = valid.reduce((acc, curr) => acc + curr, 0);
  return Number((sum / valid.length).toFixed(2));
}

export function calculateWeightedAveragePercentage(items: { value: number; weight: number }[]): {
  weightedAverage: number;
  totalWeight: number;
} {
  let totalWeightedSum = 0;
  let totalWeight = 0;

  items.forEach(({ value, weight }) => {
    if (!isNaN(value) && !isNaN(weight) && weight > 0) {
      totalWeightedSum += value * weight;
      totalWeight += weight;
    }
  });

  if (totalWeight === 0) return { weightedAverage: 0, totalWeight: 0 };
  const weightedAverage = Number((totalWeightedSum / totalWeight).toFixed(2));
  return { weightedAverage, totalWeight };
}

// 10. Love Percentage Calculator (Deterministic Fun Algorithm)
export function calculateLovePercentage(name1: string, name2: string): {
  percentage: number;
  message: string;
} {
  const clean1 = name1.toLowerCase().trim();
  const clean2 = name2.toLowerCase().trim();

  if (!clean1 || !clean2) return { percentage: 0, message: 'Please enter both names.' };

  // Sort names alphabetically so "Alex + Sam" === "Sam + Alex"
  const sortedPair = [clean1, clean2].sort().join('&');

  // Compute deterministic hash
  let hash = 0;
  for (let i = 0; i < sortedPair.length; i++) {
    const char = sortedPair.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }

  // Map to 50% - 99% range for a fun positive entertainment experience
  const percentage = 50 + (Math.abs(hash) % 50);

  let message = 'Great Connection!';
  if (percentage >= 90) message = 'Soulmate Potential! 🌟 An incredible romantic bond.';
  else if (percentage >= 80) message = 'High Compatibility! ❤️ You share wonderful chemistry.';
  else if (percentage >= 70) message = 'Strong Spark! ✨ A sweet and balanced connection.';
  else if (percentage >= 60) message = 'Growing Bond! 🌱 Good understanding and mutual respect.';
  else message = 'Friendly Vibes! 🤝 With patience and love, anything is possible.';

  return { percentage, message };
}
