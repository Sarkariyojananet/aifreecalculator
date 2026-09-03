/**
 * Comprehensive Scientific, Statistical, Matrix, and Algebraic Calculation Engine
 * Includes Safe Token Parser, Angle Conversions, Combinatorics, Matrix Math, and Polynomial Solvers.
 */

export function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) throw new Error('Factorial requires a non-negative integer.');
  if (n === 0 || n === 1) return 1;
  let res = 1;
  for (let i = 2; i <= Math.min(n, 170); i++) {
    res *= i;
  }
  return res;
}

export function nPr(n: number, r: number): number {
  if (n < 0 || r < 0 || r > n || !Number.isInteger(n) || !Number.isInteger(r)) {
    throw new Error('Permutations require non-negative integers where n >= r.');
  }
  let res = 1;
  for (let i = 0; i < r; i++) {
    res *= n - i;
  }
  return res;
}

export function nCr(n: number, r: number): number {
  if (n < 0 || r < 0 || r > n || !Number.isInteger(n) || !Number.isInteger(r)) {
    throw new Error('Combinations require non-negative integers where n >= r.');
  }
  return Math.round(nPr(n, r) / factorial(r));
}

export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function gradToRad(grad: number): number {
  return (grad * Math.PI) / 200;
}

export function radToDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

export function radToGrad(rad: number): number {
  return (rad * 200) / Math.PI;
}

/**
 * Descriptive Statistics Helper
 */
export interface StatsResult {
  count: number;
  sum: number;
  mean: number;
  median: number;
  min: number;
  max: number;
  range: number;
  variance: number;
  stdDev: number;
}

export function calculateStatistics(numbers: number[]): StatsResult {
  const valid = numbers.filter((n) => typeof n === 'number' && !isNaN(n));
  if (valid.length === 0) throw new Error('Please enter at least one valid number.');

  valid.sort((a, b) => a - b);
  const count = valid.length;
  const sum = valid.reduce((acc, v) => acc + v, 0);
  const mean = sum / count;

  let median = 0;
  const mid = Math.floor(count / 2);
  if (count % 2 === 0) {
    median = (valid[mid - 1] + valid[mid]) / 2;
  } else {
    median = valid[mid];
  }

  const min = valid[0];
  const max = valid[count - 1];
  const range = max - min;

  const variance = count > 1 ? valid.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / (count - 1) : 0;
  const stdDev = Math.sqrt(variance);

  return {
    count,
    sum: Number(sum.toFixed(6)),
    mean: Number(mean.toFixed(6)),
    median: Number(median.toFixed(6)),
    min,
    max,
    range: Number(range.toFixed(6)),
    variance: Number(variance.toFixed(6)),
    stdDev: Number(stdDev.toFixed(6)),
  };
}

/**
 * 2x2 and 3x3 Matrix Mathematics
 */
export function determinant2x2(m: number[][]): number {
  return m[0][0] * m[1][1] - m[0][1] * m[1][0];
}

export function determinant3x3(m: number[][]): number {
  return (
    m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
    m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
    m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
  );
}

export function inverse2x2(m: number[][]): number[][] {
  const det = determinant2x2(m);
  if (Math.abs(det) < 1e-12) throw new Error('Matrix is singular (determinant = 0); inverse does not exist.');
  return [
    [Number((m[1][1] / det).toFixed(4)), Number((-m[0][1] / det).toFixed(4))],
    [Number((-m[1][0] / det).toFixed(4)), Number((m[0][0] / det).toFixed(4))],
  ];
}

/**
 * Linear & Quadratic Equation Solver
 */
export function solveLinearEquation(a: number, b: number, c: number): { x: number; step: string } {
  // ax + b = c  ==> ax = c - b ==> x = (c - b) / a
  if (a === 0) throw new Error('Coefficient "a" cannot be zero in a linear equation.');
  const x = Number(((c - b) / a).toFixed(6));
  return {
    x,
    step: `${a}x + ${b} = ${c} ➔ ${a}x = ${c - b} ➔ x = ${x}`,
  };
}

export function solveQuadraticEquation(a: number, b: number, c: number): {
  x1: number | string;
  x2: number | string;
  discriminant: number;
  isComplex: boolean;
  step: string;
} {
  if (a === 0) throw new Error('Coefficient "a" cannot be zero in a quadratic equation.');
  const disc = b * b - 4 * a * c;

  if (disc >= 0) {
    const sqrtD = Math.sqrt(disc);
    const x1 = Number(((-b + sqrtD) / (2 * a)).toFixed(6));
    const x2 = Number(((-b - sqrtD) / (2 * a)).toFixed(6));
    return {
      x1,
      x2,
      discriminant: disc,
      isComplex: false,
      step: `Discriminant Δ = b² - 4ac = ${disc}. Roots: x₁ = ${x1}, x₂ = ${x2}`,
    };
  }

  const realPart = Number((-b / (2 * a)).toFixed(4));
  const imagPart = Number((Math.sqrt(-disc) / (2 * a)).toFixed(4));
  return {
    x1: `${realPart} + ${imagPart}i`,
    x2: `${realPart} - ${imagPart}i`,
    discriminant: disc,
    isComplex: true,
    step: `Discriminant Δ = ${disc} < 0 (Complex roots): x = ${realPart} ± ${imagPart}i`,
  };
}
