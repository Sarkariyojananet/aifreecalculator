/**
 * Exponential Growth & Decay Calculation Engine
 * 
 * Primary Discrete Model:
 *   x(t) = x₀ × (1 + r/100)ᵗ
 * 
 * Continuous Compounding Model:
 *   x(t) = x₀ × eᵏᵗ
 *   where k = ln(1 + r/100) and r = 100 × (eᵏ - 1)
 * 
 * Multiplier / Growth Factor:
 *   M = 1 + r/100
 * 
 * 100% Client-Side Pure Mathematics. Zero Server Dependencies.
 */

export type SolveForTarget = 'final' | 'initial' | 'rate' | 'time';

export interface ExponentialGrowthInput {
  solveFor: SolveForTarget;
  initialQuantity?: number | string;  // x₀
  growthRate?: number | string;        // r (in percent)
  timePeriods?: number | string;       // t
  finalQuantity?: number | string;     // x(t)
}

export interface GrowthTableRow {
  period: number;
  quantity: number;
  quantityFormatted: string;
  changeFromPrevious: number;
  percentFromPrevious: number;
}

export interface ExponentialGrowthResult {
  solveFor: SolveForTarget;
  initialQuantity: number;
  growthRatePercent: number;
  timePeriods: number;
  finalQuantity: number;
  growthFactor: number;             // M = 1 + r/100
  continuousRateK: number;          // k = ln(M)
  isGrowth: boolean;
  isDecay: boolean;
  isNeutral: boolean;
  isDepleted: boolean;              // r = -100%
  totalChange: number;              // x(t) - x₀
  totalPercentageChange: number;    // ((x(t) - x₀) / x₀) * 100
  doublingTimeOrHalfLife: {
    type: 'doubling' | 'half-life' | 'none';
    periods: number | null;
    label: string;
  };
  steps: string[];
  table: GrowthTableRow[];
  svgPoints: { x: number; y: number }[];
}

function cleanFloat(val: number): number {
  if (Math.abs(val - Math.round(val)) < 1e-9) {
    return Math.round(val);
  }
  return Number(val.toFixed(8));
}

/**
 * Format helper for numbers to avoid long floating point representations.
 */
export function formatNum(val: number, maxDecimals: number = 4): string {
  if (isNaN(val) || !isFinite(val)) return 'Invalid';
  const cleaned = cleanFloat(val);
  if (Number.isInteger(cleaned)) return cleaned.toLocaleString('en-US');
  const rounded = Number(cleaned.toFixed(maxDecimals));
  return rounded.toLocaleString('en-US', { maximumFractionDigits: maxDecimals });
}

/**
 * Main calculation function for Exponential Growth & Decay
 */
export function calculateExponentialGrowth(input: ExponentialGrowthInput): ExponentialGrowthResult {
  const { solveFor } = input;

  const parseOrUndefined = (val: number | string | undefined): number | undefined => {
    if (val === undefined || val === null) return undefined;
    const str = String(val).trim();
    if (str === '') return undefined;
    const num = Number(str);
    return isNaN(num) ? undefined : num;
  };

  const x0 = parseOrUndefined(input.initialQuantity);
  const r = parseOrUndefined(input.growthRate);
  const t = parseOrUndefined(input.timePeriods);
  const xt = parseOrUndefined(input.finalQuantity);

  let solvedX0 = 0;
  let solvedR = 0;
  let solvedT = 0;
  let solvedXt = 0;
  const steps: string[] = [];

  switch (solveFor) {
    case 'final': {
      if (x0 === undefined) throw new Error('Please enter the initial quantity (x₀).');
      if (r === undefined) throw new Error('Please enter the growth/decay rate (r %).');
      if (t === undefined) throw new Error('Please enter the time / number of periods (t).');

      const M = 1 + r / 100;
      if (M < 0) {
        throw new Error(
          `A growth rate below -100% (entered ${r}%) produces a negative multiplier (1 + r/100 = ${M}), which is invalid for real exponential decay.`
        );
      }

      if (M === 0 && t < 0) {
        throw new Error('For a 100% decay rate (r = -100%), negative time periods result in division by zero.');
      }

      solvedX0 = x0;
      solvedR = r;
      solvedT = t;
      solvedXt = x0 * Math.pow(M, t);

      steps.push('Formula: x(t) = x₀ × (1 + r/100)ᵗ');
      steps.push(`Calculate base multiplier: 1 + (${r} / 100) = 1 + ${r / 100} = ${M}`);
      steps.push(`Raise multiplier to power t (${t}): ${M}^${t} ≈ ${formatNum(Math.pow(M, t), 6)}`);
      steps.push(`Multiply by initial quantity (${formatNum(x0)}): ${formatNum(x0)} × ${formatNum(Math.pow(M, t), 6)} = ${formatNum(solvedXt, 4)}`);
      break;
    }

    case 'initial': {
      if (xt === undefined) throw new Error('Please enter the final quantity x(t).');
      if (r === undefined) throw new Error('Please enter the growth/decay rate (r %).');
      if (t === undefined) throw new Error('Please enter the time / number of periods (t).');

      const M = 1 + r / 100;
      if (M <= 0) {
        throw new Error(
          `Growth rate must be greater than -100% to calculate the initial quantity. Entered rate was ${r}%.`
        );
      }

      const denominator = Math.pow(M, t);
      if (denominator === 0 || !isFinite(denominator)) {
        throw new Error('Multiplier evaluation resulted in zero or numerical overflow.');
      }

      solvedXt = xt;
      solvedR = r;
      solvedT = t;
      solvedX0 = xt / denominator;

      steps.push('Formula: x₀ = x(t) / (1 + r/100)ᵗ');
      steps.push(`Calculate base multiplier: 1 + (${r} / 100) = ${M}`);
      steps.push(`Raise multiplier to power t (${t}): ${M}^${t} ≈ ${formatNum(denominator, 6)}`);
      steps.push(`Divide final quantity by denominator: ${formatNum(xt)} / ${formatNum(denominator, 6)} = ${formatNum(solvedX0, 4)}`);
      break;
    }

    case 'rate': {
      if (x0 === undefined) throw new Error('Please enter the initial quantity (x₀).');
      if (xt === undefined) throw new Error('Please enter the final quantity x(t).');
      if (t === undefined) throw new Error('Please enter the time / number of periods (t).');

      if (t === 0) {
        throw new Error('Time / number of periods (t) cannot be 0 when solving for growth rate.');
      }
      if (x0 === 0) {
        throw new Error('Initial quantity (x₀) cannot be 0 when calculating growth rate (division by zero).');
      }

      const ratio = xt / x0;
      if (ratio <= 0) {
        throw new Error(
          `The ratio of final quantity to initial quantity must be positive (x(t)/x₀ > 0). Here ${xt} / ${x0} = ${ratio}.`
        );
      }

      const baseM = Math.pow(ratio, 1 / t);
      solvedR = (baseM - 1) * 100;
      solvedX0 = x0;
      solvedXt = xt;
      solvedT = t;

      steps.push('Formula: r = 100 × [(x(t) / x₀)^(1/t) − 1]');
      steps.push(`Compute quantity ratio: ${formatNum(xt)} / ${formatNum(x0)} = ${formatNum(ratio, 6)}`);
      steps.push(`Take root 1/t (1 / ${t} ≈ ${formatNum(1 / t, 6)}): (${formatNum(ratio, 6)})^(1/${t}) = ${formatNum(baseM, 6)}`);
      steps.push(`Subtract 1 and convert to percentage: (${formatNum(baseM, 6)} − 1) × 100 = ${formatNum(solvedR, 4)}%`);
      break;
    }

    case 'time': {
      if (x0 === undefined) throw new Error('Please enter the initial quantity (x₀).');
      if (xt === undefined) throw new Error('Please enter the final quantity x(t).');
      if (r === undefined) throw new Error('Please enter the growth/decay rate (r %).');

      const M = 1 + r / 100;
      if (M <= 0) {
        throw new Error('Growth rate must be greater than -100% to calculate elapsed time.');
      }
      if (Math.abs(M - 1) < 1e-12) {
        throw new Error(
          'With a 0% growth rate (r = 0), the quantity remains constant forever. Time to change is undefined unless x(t) = x₀.'
        );
      }

      if (x0 === 0) {
        throw new Error('Initial quantity (x₀) cannot be zero when solving for time.');
      }

      const ratio = xt / x0;
      if (ratio <= 0) {
        throw new Error(
          `Ratio x(t)/x₀ must be positive for logarithmic time calculation. Got ${xt} / ${x0} = ${ratio}.`
        );
      }

      solvedT = Math.log(ratio) / Math.log(M);
      solvedX0 = x0;
      solvedXt = xt;
      solvedR = r;

      steps.push('Formula: t = ln(x(t) / x₀) / ln(1 + r/100)');
      steps.push(`Ratio: ${formatNum(xt)} / ${formatNum(x0)} = ${formatNum(ratio, 6)}`);
      steps.push(`Numerator: ln(${formatNum(ratio, 6)}) ≈ ${formatNum(Math.log(ratio), 6)}`);
      steps.push(`Denominator: ln(1 + ${r}/100) = ln(${formatNum(M, 4)}) ≈ ${formatNum(Math.log(M), 6)}`);
      steps.push(`Quotient: ${formatNum(Math.log(ratio), 6)} / ${formatNum(Math.log(M), 6)} = ${formatNum(solvedT, 4)} periods`);

      if (solvedT < 0) {
        steps.push(
          `Note: A negative time value (t = ${formatNum(solvedT, 2)}) indicates this quantity was reached in the past (before the initial reference point).`
        );
      }
      break;
    }

    default:
      throw new Error('Invalid solveFor mode.');
  }

  const growthFactor = 1 + solvedR / 100;
  const continuousRateK = growthFactor > 0 ? Math.log(growthFactor) : 0;
  const isGrowth = solvedR > 1e-7;
  const isDecay = solvedR < -1e-7 && solvedR > -100;
  const isNeutral = Math.abs(solvedR) <= 1e-7;
  const isDepleted = Math.abs(solvedR + 100) <= 1e-7;

  const totalChange = solvedXt - solvedX0;
  const totalPercentageChange = solvedX0 !== 0 ? (totalChange / Math.abs(solvedX0)) * 100 : 0;

  // Doubling time or Half-life
  let doublingTimeOrHalfLife: ExponentialGrowthResult['doublingTimeOrHalfLife'] = {
    type: 'none',
    periods: null,
    label: 'No growth or decay',
  };

  if (isGrowth && growthFactor > 1) {
    const dt = Math.log(2) / Math.log(growthFactor);
    doublingTimeOrHalfLife = {
      type: 'doubling',
      periods: Number(dt.toFixed(4)),
      label: `Doubling Time: ~${formatNum(dt, 2)} periods`,
    };
  } else if (isDecay && growthFactor > 0 && growthFactor < 1) {
    const hl = Math.log(0.5) / Math.log(growthFactor);
    doublingTimeOrHalfLife = {
      type: 'half-life',
      periods: Number(hl.toFixed(4)),
      label: `Half-Life: ~${formatNum(hl, 2)} periods`,
    };
  }

  // Generate Growth Table (capped at 50 periods for performance)
  const table: GrowthTableRow[] = [];
  const startT = Math.min(0, Math.floor(solvedT));
  const endT = Math.max(0, Math.ceil(solvedT));
  const totalRange = endT - startT;

  let stepSize = 1;
  if (totalRange > 50) {
    stepSize = Math.ceil(totalRange / 50);
  }

  let prevQuantity: number | null = null;
  const maxTableRows = 51;
  let count = 0;

  for (let currentP = startT; currentP <= endT && count < maxTableRows; currentP += stepSize) {
    const qty = solvedX0 * Math.pow(growthFactor, currentP);
    let changeFromPrev = 0;
    let pctFromPrev = 0;

    if (prevQuantity !== null && prevQuantity !== 0) {
      changeFromPrev = qty - prevQuantity;
      pctFromPrev = (changeFromPrev / Math.abs(prevQuantity)) * 100;
    }

    table.push({
      period: currentP,
      quantity: Number(qty.toFixed(4)),
      quantityFormatted: formatNum(qty, 4),
      changeFromPrevious: Number(changeFromPrev.toFixed(4)),
      percentFromPrevious: Number(pctFromPrev.toFixed(2)),
    });

    prevQuantity = qty;
    count++;
  }

  // If solvedT wasn't an exact integer and wasn't in table, push exact row
  if (!table.some((r) => Math.abs(r.period - solvedT) < 1e-5) && isFinite(solvedT)) {
    const lastRow = table[table.length - 1];
    const prevQ = lastRow ? lastRow.quantity : solvedX0;
    table.push({
      period: Number(solvedT.toFixed(4)),
      quantity: Number(solvedXt.toFixed(4)),
      quantityFormatted: formatNum(solvedXt, 4),
      changeFromPrevious: Number((solvedXt - prevQ).toFixed(4)),
      percentFromPrevious: prevQ !== 0 ? Number((((solvedXt - prevQ) / Math.abs(prevQ)) * 100).toFixed(2)) : 0,
    });
    table.sort((a, b) => a.period - b.period);
  }

  // Generate SVG curve points
  const svgPoints: { x: number; y: number }[] = [];
  const svgSteps = 60;
  const curveStart = startT - 1;
  const curveEnd = endT + 1;
  const curveRange = curveEnd - curveStart || 1;

  for (let i = 0; i <= svgSteps; i++) {
    const pTime = curveStart + (i / svgSteps) * curveRange;
    const pVal = solvedX0 * Math.pow(growthFactor, pTime);
    if (isFinite(pVal) && !isNaN(pVal)) {
      svgPoints.push({ x: pTime, y: pVal });
    }
  }

  const finalX0 = cleanFloat(solvedX0);
  const finalR = cleanFloat(solvedR);
  const finalT = cleanFloat(solvedT);
  const finalXt = cleanFloat(solvedXt);

  return {
    solveFor,
    initialQuantity: finalX0,
    growthRatePercent: finalR,
    timePeriods: finalT,
    finalQuantity: finalXt,
    growthFactor,
    continuousRateK,
    isGrowth,
    isDecay,
    isNeutral,
    isDepleted,
    totalChange,
    totalPercentageChange,
    doublingTimeOrHalfLife,
    steps,
    table,
    svgPoints,
  };
}
