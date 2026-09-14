/**
 * Exponential Function Calculation Engine
 * Handles:
 * 1. Solving exponential functions f(x) = a * b^x from two points (x1, y1) and (x2, y2)
 * 2. Solving natural exponential functions f(x) = a * e^(cx) from two points
 * 3. Evaluating exponential functions at a specified x
 * 
 * 100% Client-side execution - zero network requests or external dependencies.
 */

export interface Point2D {
  x: number;
  y: number;
}

export type FunctionForm = 'standard' | 'natural'; // 'standard' = a * b^x, 'natural' = a * e^(cx)
export type FunctionBehavior = 'growth' | 'decay' | 'constant' | 'inverted_growth' | 'inverted_decay';

export interface SolveExponentialResult {
  form: FunctionForm;
  point1: Point2D;
  point2: Point2D;
  a: number;
  b: number; // base for standard form (or Math.E for natural)
  c?: number; // growth rate constant for natural form
  equationDisplay: string; // e.g. "f(x) = 2 × 2^x"
  equationUnicode: string; // e.g. "f(x) = 2 · 2ˣ"
  behavior: FunctionBehavior;
  behaviorLabel: string;
  isConstant: boolean;
  steps: string[];
  verification: {
    x1: number;
    expectedY1: number;
    calculatedY1: number;
    valid1: boolean;
    x2: number;
    expectedY2: number;
    calculatedY2: number;
    valid2: boolean;
  };
}

export interface EvaluateExponentialResult {
  form: FunctionForm;
  a: number;
  b?: number;
  c?: number;
  x: number;
  y: number;
  equationDisplay: string;
  equationUnicode: string;
  evaluatedEquation: string;
  behavior: FunctionBehavior;
  behaviorLabel: string;
  steps: string[];
}

/**
 * Superscript digit mapping for clean Unicode math rendering
 */
const SUPERSCRIPT_MAP: Record<string, string> = {
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
  '-': '⁻',
  '+': '⁺',
  '.': '·',
  '(': '⁽',
  ')': '⁾',
  'x': 'ˣ',
};

export function toSuperscript(str: number | string): string {
  return String(str)
    .split('')
    .map((char) => SUPERSCRIPT_MAP[char] || char)
    .join('');
}

/**
 * Clean floating point rounding without long trailing precision artifacts
 */
export function formatFloat(val: number, maxDecimals: number = 6): string {
  if (Number.isInteger(val)) return val.toString();
  const rounded = Number(val.toFixed(maxDecimals));
  return String(rounded);
}

/**
 * Parses user input that might be a number, fraction string (e.g. "1/2"), or Euler's 'e'
 */
export function parseMathValue(raw: number | string, fieldName: string = 'Value'): number {
  if (typeof raw === 'number') {
    if (isNaN(raw) || !isFinite(raw)) {
      throw new Error(`${fieldName} must be a valid finite number.`);
    }
    return raw;
  }

  const str = String(raw).trim().toLowerCase();
  if (!str) {
    throw new Error(`Please enter a value for ${fieldName}.`);
  }

  // Handle Euler's number 'e'
  if (str === 'e') return Math.E;
  if (str === '-e') return -Math.E;
  if (/^e\^([-\d.]+)$/.test(str)) {
    const pow = parseFloat(str.replace('e^', ''));
    if (!isNaN(pow)) return Math.exp(pow);
  }

  // Handle fractions like "3/4"
  if (str.includes('/')) {
    const parts = str.split('/');
    if (parts.length === 2) {
      const num = parseFloat(parts[0].trim());
      const den = parseFloat(parts[1].trim());
      if (!isNaN(num) && !isNaN(den) && den !== 0) {
        return num / den;
      }
    }
  }

  const num = parseFloat(str);
  if (isNaN(num) || !isFinite(num)) {
    throw new Error(`Invalid numeric input for ${fieldName}: "${raw}"`);
  }
  return num;
}

/**
 * Mode 1A: Solve f(x) = a * b^x given two points (x1, y1) and (x2, y2)
 */
export function solveStandardExponentialFromPoints(
  rawX1: number | string,
  rawY1: number | string,
  rawX2: number | string,
  rawY2: number | string
): SolveExponentialResult {
  const x1 = parseMathValue(rawX1, 'x₁');
  const y1 = parseMathValue(rawY1, 'y₁');
  const x2 = parseMathValue(rawX2, 'x₂');
  const y2 = parseMathValue(rawY2, 'y₂');

  // Restriction 1: x1 != x2
  if (Math.abs(x1 - x2) < 1e-12) {
    throw new Error('x₁ and x₂ cannot be equal (x₁ ≠ x₂). An exponential function cannot have multiple outputs for the same input.');
  }

  // Restriction 2: y1 != 0 and y2 != 0
  if (Math.abs(y1) < 1e-14 || Math.abs(y2) < 1e-14) {
    throw new Error('Exponential functions f(x) = a · bˣ never equal 0. Both y₁ and y₂ must be non-zero.');
  }

  // Restriction 3: y1 and y2 must have the same sign
  if (y1 * y2 < 0) {
    throw new Error(
      `Points (${x1}, ${y1}) and (${x2}, ${y2}) have opposite y-signs. For any real exponential function f(x) = a · bˣ, the base b must be positive (b > 0), meaning f(x) remains either entirely positive (when a > 0) or entirely negative (when a < 0). Therefore, y₁ and y₂ must share the same sign.`
    );
  }

  // Formula derivation:
  // y1 = a * b^x1
  // y2 = a * b^x2
  // y1 / y2 = b^(x1 - x2)
  // b = (y1 / y2)^(1 / (x1 - x2))
  const deltaX = x1 - x2;
  const ratioY = y1 / y2;
  const b = Math.pow(ratioY, 1 / deltaX);

  if (isNaN(b) || !isFinite(b) || b <= 0) {
    throw new Error('The input points do not yield a real positive base b > 0.');
  }

  // a = y1 / b^x1
  const a = y1 / Math.pow(b, x1);

  if (isNaN(a) || !isFinite(a)) {
    throw new Error('Failed to compute parameter a due to numerical overflow or underflow.');
  }

  // Constant function detection (b == 1)
  const isConstant = Math.abs(b - 1) < 1e-9;

  let behavior: FunctionBehavior = 'constant';
  let behaviorLabel = 'Constant Function';

  if (!isConstant) {
    if (a > 0) {
      if (b > 1) {
        behavior = 'growth';
        behaviorLabel = 'Exponential Growth';
      } else {
        behavior = 'decay';
        behaviorLabel = 'Exponential Decay';
      }
    } else {
      if (b > 1) {
        behavior = 'inverted_growth';
        behaviorLabel = 'Reflected Growth (Decay towards −∞)';
      } else {
        behavior = 'inverted_decay';
        behaviorLabel = 'Reflected Decay (Approaching 0 from below)';
      }
    }
  }

  // Build clean equation string
  const aStr = formatFloat(a, 6);
  const bStr = formatFloat(b, 6);

  let eqDisplay = '';
  let eqUnicode = '';

  if (isConstant) {
    eqDisplay = `f(x) = ${aStr}`;
    eqUnicode = `f(x) = ${aStr}`;
  } else if (a === 1) {
    eqDisplay = `f(x) = ${bStr}^x`;
    eqUnicode = `f(x) = ${bStr}ˣ`;
  } else if (a === -1) {
    eqDisplay = `f(x) = -(${bStr})^x`;
    eqUnicode = `f(x) = −(${bStr})ˣ`;
  } else {
    eqDisplay = `f(x) = ${aStr} × ${bStr}^x`;
    eqUnicode = `f(x) = ${aStr} · ${bStr}ˣ`;
  }

  // Step by step breakdown
  const steps: string[] = [
    `Set up the system of equations using the two points (${x1}, ${y1}) and (${x2}, ${y2}):\n  (1)  ${y1} = a · b^(${x1})\n  (2)  ${y2} = a · b^(${x2})`,
    `Divide equation (1) by equation (2) to eliminate parameter a:\n  ${y1} / ${y2} = b^(${x1} − ${x2})\n  ${formatFloat(ratioY, 6)} = b^(${formatFloat(deltaX, 6)})`,
    `Solve for the base b by taking the root:\n  b = (${formatFloat(ratioY, 6)})^(1 / ${formatFloat(deltaX, 6)}) = ${bStr}`,
    `Substitute b = ${bStr} back into equation (1) to solve for initial scale factor a:\n  ${y1} = a · (${bStr})^(${x1})\n  a = ${y1} / (${bStr})^(${x1}) = ${aStr}`,
    isConstant
      ? `Since y₁ = y₂ and b = 1, the function simplifies to the horizontal constant line f(x) = ${aStr}.`
      : `Classify behavior: Because a ${a > 0 ? '> 0' : '< 0'} and b ${b > 1 ? '> 1' : '< 1'}, this represents ${behaviorLabel}.`,
  ];

  // Verification
  const calcY1 = a * Math.pow(b, x1);
  const calcY2 = a * Math.pow(b, x2);

  return {
    form: 'standard',
    point1: { x: x1, y: y1 },
    point2: { x: x2, y: y2 },
    a,
    b,
    equationDisplay: eqDisplay,
    equationUnicode: eqUnicode,
    behavior,
    behaviorLabel,
    isConstant,
    steps,
    verification: {
      x1,
      expectedY1: y1,
      calculatedY1: calcY1,
      valid1: Math.abs(calcY1 - y1) < 1e-4,
      x2,
      expectedY2: y2,
      calculatedY2: calcY2,
      valid2: Math.abs(calcY2 - y2) < 1e-4,
    },
  };
}

/**
 * Mode 1B: Solve natural exponential function f(x) = a * e^(cx) given two points (x1, y1) and (x2, y2)
 */
export function solveNaturalExponentialFromPoints(
  rawX1: number | string,
  rawY1: number | string,
  rawX2: number | string,
  rawY2: number | string
): SolveExponentialResult {
  const x1 = parseMathValue(rawX1, 'x₁');
  const y1 = parseMathValue(rawY1, 'y₁');
  const x2 = parseMathValue(rawX2, 'x₂');
  const y2 = parseMathValue(rawY2, 'y₂');

  if (Math.abs(x1 - x2) < 1e-12) {
    throw new Error('x₁ and x₂ cannot be equal (x₁ ≠ x₂). An exponential function cannot have multiple outputs for the same input.');
  }

  if (Math.abs(y1) < 1e-14 || Math.abs(y2) < 1e-14) {
    throw new Error('Natural exponential functions f(x) = a · e^(cx) never equal 0. Both y₁ and y₂ must be non-zero.');
  }

  if (y1 * y2 < 0) {
    throw new Error(
      `Points (${x1}, ${y1}) and (${x2}, ${y2}) have opposite y-signs. For real function f(x) = a · e^(cx), e^(cx) is strictly positive, requiring y₁ and y₂ to share the same sign.`
    );
  }

  // Formula derivation:
  // y1 = a * e^(c * x1)
  // y2 = a * e^(c * x2)
  // y1 / y2 = e^(c * (x1 - x2))
  // ln(y1 / y2) = c * (x1 - x2)
  // c = ln(y1 / y2) / (x1 - x2)
  const deltaX = x1 - x2;
  const ratioY = y1 / y2;
  const c = Math.log(ratioY) / deltaX;

  if (isNaN(c) || !isFinite(c)) {
    throw new Error('Failed to compute continuous rate parameter c.');
  }

  // a = y1 / e^(c * x1)
  const a = y1 / Math.exp(c * x1);

  if (isNaN(a) || !isFinite(a)) {
    throw new Error('Failed to compute scale parameter a.');
  }

  const isConstant = Math.abs(c) < 1e-9;

  let behavior: FunctionBehavior = 'constant';
  let behaviorLabel = 'Constant Function';

  if (!isConstant) {
    if (a > 0) {
      if (c > 0) {
        behavior = 'growth';
        behaviorLabel = 'Continuous Exponential Growth';
      } else {
        behavior = 'decay';
        behaviorLabel = 'Continuous Exponential Decay';
      }
    } else {
      if (c > 0) {
        behavior = 'inverted_growth';
        behaviorLabel = 'Reflected Growth (toward −∞)';
      } else {
        behavior = 'inverted_decay';
        behaviorLabel = 'Reflected Decay (toward 0 from below)';
      }
    }
  }

  const aStr = formatFloat(a, 6);
  const cStr = formatFloat(c, 6);

  let eqDisplay = '';
  let eqUnicode = '';

  if (isConstant) {
    eqDisplay = `f(x) = ${aStr}`;
    eqUnicode = `f(x) = ${aStr}`;
  } else if (a === 1) {
    eqDisplay = `f(x) = e^(${cStr}x)`;
    eqUnicode = `f(x) = e${toSuperscript(`(${cStr}x)`)}`;
  } else if (a === -1) {
    eqDisplay = `f(x) = -e^(${cStr}x)`;
    eqUnicode = `f(x) = −e${toSuperscript(`(${cStr}x)`)}`;
  } else {
    eqDisplay = `f(x) = ${aStr} × e^(${cStr}x)`;
    eqUnicode = `f(x) = ${aStr} · e${toSuperscript(`(${cStr}x)`)}`;
  }

  const steps: string[] = [
    `Set up the system of equations using (${x1}, ${y1}) and (${x2}, ${y2}):\n  (1)  ${y1} = a · e^(c · ${x1})\n  (2)  ${y2} = a · e^(c · ${x2})`,
    `Divide equation (1) by equation (2) to eliminate parameter a:\n  ${y1} / ${y2} = e^(c · (${x1} − ${x2}))\n  ${formatFloat(ratioY, 6)} = e^(c · ${formatFloat(deltaX, 6)})`,
    `Take the natural logarithm (ln) of both sides:\n  ln(${formatFloat(ratioY, 6)}) = c · ${formatFloat(deltaX, 6)}\n  c = ln(${formatFloat(ratioY, 6)}) / ${formatFloat(deltaX, 6)} = ${cStr}`,
    `Substitute c = ${cStr} into equation (1) to solve for a:\n  ${y1} = a · e^(${cStr} · ${x1})\n  a = ${y1} / e^(${formatFloat(c * x1, 6)}) = ${aStr}`,
    isConstant
      ? `Because c = 0, e⁰ = 1, giving the constant function f(x) = ${aStr}.`
      : `Classify behavior: Continuous growth rate c = ${cStr} (${c > 0 ? 'c > 0: Growth' : 'c < 0: Decay'}).`,
  ];

  const calcY1 = a * Math.exp(c * x1);
  const calcY2 = a * Math.exp(c * x2);

  return {
    form: 'natural',
    point1: { x: x1, y: y1 },
    point2: { x: x2, y: y2 },
    a,
    b: Math.E,
    c,
    equationDisplay: eqDisplay,
    equationUnicode: eqUnicode,
    behavior,
    behaviorLabel,
    isConstant,
    steps,
    verification: {
      x1,
      expectedY1: y1,
      calculatedY1: calcY1,
      valid1: Math.abs(calcY1 - y1) < 1e-4,
      x2,
      expectedY2: y2,
      calculatedY2: calcY2,
      valid2: Math.abs(calcY2 - y2) < 1e-4,
    },
  };
}

/**
 * Mode 2A: Evaluate f(x) = a * b^x for a given x
 */
export function evaluateStandardExponential(
  rawA: number | string,
  rawB: number | string,
  rawX: number | string
): EvaluateExponentialResult {
  const a = parseMathValue(rawA, 'Coefficient a');
  const b = parseMathValue(rawB, 'Base b');
  const x = parseMathValue(rawX, 'Input x');

  if (b <= 0) {
    if (b === 0) {
      if (x <= 0) {
        throw new Error('0 raised to a non-positive power (0^0 or 0^negative) is mathematically undefined.');
      }
      return {
        form: 'standard',
        a,
        b,
        x,
        y: 0,
        equationDisplay: `f(x) = ${a} × 0^x`,
        equationUnicode: `f(x) = ${a} · 0ˣ`,
        evaluatedEquation: `f(${x}) = 0`,
        behavior: 'constant',
        behaviorLabel: 'Zero Constant',
        steps: ['0 raised to any positive exponent equals 0.', `y = ${a} × 0 = 0`],
      };
    }

    // b < 0: real-valued only if x is an integer
    if (!Number.isInteger(x)) {
      throw new Error(
        `Negative base b = ${b} raised to non-integer exponent x = ${x} produces a complex (imaginary) number. For a standard real-valued exponential function, base b must be strictly positive (b > 0).`
      );
    }
  }

  // y = a * b^x
  const bx = Math.pow(b, x);
  const y = a * bx;

  if (isNaN(y) || !isFinite(y)) {
    throw new Error('Evaluation resulted in overflow or undefined value.');
  }

  const isConstant = Math.abs(b - 1) < 1e-9;
  let behavior: FunctionBehavior = 'constant';
  let behaviorLabel = 'Constant';

  if (!isConstant) {
    if (a > 0) {
      behavior = b > 1 ? 'growth' : 'decay';
      behaviorLabel = b > 1 ? 'Exponential Growth' : 'Exponential Decay';
    } else {
      behavior = b > 1 ? 'inverted_growth' : 'inverted_decay';
      behaviorLabel = b > 1 ? 'Reflected Growth' : 'Reflected Decay';
    }
  }

  const aStr = formatFloat(a, 6);
  const bStr = formatFloat(b, 6);
  const xStr = formatFloat(x, 6);
  const yStr = formatFloat(y, 6);

  const steps = [
    `Identify parameters: Scale factor a = ${aStr}, Base b = ${bStr}, Input x = ${xStr}.`,
    `Calculate base raised to the exponent: (${bStr})^(${xStr}) = ${formatFloat(bx, 6)}.`,
    `Multiply by scale factor a: y = ${aStr} × ${formatFloat(bx, 6)} = ${yStr}.`,
  ];

  return {
    form: 'standard',
    a,
    b,
    x,
    y,
    equationDisplay: `f(${xStr}) = ${aStr} × (${bStr})^${xStr} = ${yStr}`,
    equationUnicode: `f(${xStr}) = ${aStr} · (${bStr})${toSuperscript(xStr)} = ${yStr}`,
    evaluatedEquation: `f(${xStr}) = ${yStr}`,
    behavior,
    behaviorLabel,
    steps,
  };
}

/**
 * Mode 2B: Evaluate natural exponential f(x) = a * e^(cx) for a given x
 */
export function evaluateNaturalExponential(
  rawA: number | string,
  rawC: number | string,
  rawX: number | string
): EvaluateExponentialResult {
  const a = parseMathValue(rawA, 'Coefficient a');
  const c = parseMathValue(rawC, 'Rate c');
  const x = parseMathValue(rawX, 'Input x');

  const expArg = c * x;
  const expVal = Math.exp(expArg);
  const y = a * expVal;

  if (isNaN(y) || !isFinite(y)) {
    throw new Error('Evaluation resulted in overflow or undefined value.');
  }

  const isConstant = Math.abs(c) < 1e-9;
  let behavior: FunctionBehavior = 'constant';
  let behaviorLabel = 'Constant';

  if (!isConstant) {
    if (a > 0) {
      behavior = c > 0 ? 'growth' : 'decay';
      behaviorLabel = c > 0 ? 'Continuous Exponential Growth' : 'Continuous Exponential Decay';
    } else {
      behavior = c > 0 ? 'inverted_growth' : 'inverted_decay';
      behaviorLabel = c > 0 ? 'Reflected Growth' : 'Reflected Decay';
    }
  }

  const aStr = formatFloat(a, 6);
  const cStr = formatFloat(c, 6);
  const xStr = formatFloat(x, 6);
  const yStr = formatFloat(y, 6);

  const steps = [
    `Identify parameters: Scale factor a = ${aStr}, Rate constant c = ${cStr}, Input x = ${xStr}.`,
    `Compute exponent product: c · x = (${cStr}) × (${xStr}) = ${formatFloat(expArg, 6)}.`,
    `Evaluate Euler's constant power: e^(${formatFloat(expArg, 6)}) ≈ ${formatFloat(expVal, 6)}.`,
    `Multiply by initial factor a: y = ${aStr} × ${formatFloat(expVal, 6)} = ${yStr}.`,
  ];

  return {
    form: 'natural',
    a,
    c,
    x,
    y,
    equationDisplay: `f(${xStr}) = ${aStr} × e^(${cStr} × ${xStr}) = ${yStr}`,
    equationUnicode: `f(${xStr}) = ${aStr} · e${toSuperscript(`(${cStr}·${xStr})`)} = ${yStr}`,
    evaluatedEquation: `f(${xStr}) = ${yStr}`,
    behavior,
    behaviorLabel,
    steps,
  };
}
