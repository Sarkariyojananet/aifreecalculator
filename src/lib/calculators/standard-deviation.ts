/**
 * Standard Deviation & Variance Calculation Engine
 */

export interface StandardDeviationResult {
  count: number;
  mean: number;
  median: number;
  mode: number[];
  sum: number;
  sumOfSquares: number;
  sampleVariance: number;
  sampleStandardDeviation: number;
  populationVariance: number;
  populationStandardDeviation: number;
  standardErrorOfMean: number;
  min: number;
  max: number;
  range: number;
}

export function calculateStandardDeviation(numbers: number[]): StandardDeviationResult {
  const validNumbers = numbers.filter((n) => !isNaN(n) && typeof n === 'number');
  const count = validNumbers.length;

  if (count === 0) {
    throw new Error('At least one number is required.');
  }

  const sum = validNumbers.reduce((acc, val) => acc + val, 0);
  const mean = sum / count;

  // Median
  const sorted = [...validNumbers].sort((a, b) => a - b);
  const mid = Math.floor(count / 2);
  const median = count % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

  // Mode
  const freqMap = new Map<number, number>();
  let maxFreq = 0;
  for (const n of sorted) {
    const f = (freqMap.get(n) || 0) + 1;
    freqMap.set(n, f);
    if (f > maxFreq) maxFreq = f;
  }
  const mode: number[] = [];
  if (maxFreq > 1) {
    freqMap.forEach((freq, val) => {
      if (freq === maxFreq) mode.push(val);
    });
  }

  // Sum of squared deviations
  let sumOfSquares = 0;
  for (const n of validNumbers) {
    sumOfSquares += Math.pow(n - mean, 2);
  }

  const populationVariance = sumOfSquares / count;
  const populationStandardDeviation = Math.sqrt(populationVariance);

  const sampleVariance = count > 1 ? sumOfSquares / (count - 1) : 0;
  const sampleStandardDeviation = Math.sqrt(sampleVariance);
  const standardErrorOfMean = count > 0 ? sampleStandardDeviation / Math.sqrt(count) : 0;

  const min = sorted[0];
  const max = sorted[count - 1];
  const range = max - min;

  return {
    count,
    mean: Number(mean.toFixed(4)),
    median: Number(median.toFixed(4)),
    mode,
    sum: Number(sum.toFixed(4)),
    sumOfSquares: Number(sumOfSquares.toFixed(4)),
    sampleVariance: Number(sampleVariance.toFixed(4)),
    sampleStandardDeviation: Number(sampleStandardDeviation.toFixed(4)),
    populationVariance: Number(populationVariance.toFixed(4)),
    populationStandardDeviation: Number(populationStandardDeviation.toFixed(4)),
    standardErrorOfMean: Number(standardErrorOfMean.toFixed(4)),
    min,
    max,
    range,
  };
}
