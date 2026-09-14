/**
 * Exponential Form Calculation Engine
 * Handles:
 * 1. Whole Number -> Exponential Form via Prime Factorization
 * 2. Logarithmic Form -> Exponential Form
 * 3. Exponential Form -> Logarithmic Form
 * Client-side calculation only - zero external APIs or server dependencies.
 */

export interface PrimeFactorItem {
  prime: number;
  power: number;
}

export interface WholeNumberExponentialResult {
  originalNumber: number;
  isPrime: boolean;
  factors: PrimeFactorItem[];
  expandedFactorization: string; // e.g. "2 × 2 × 2 × 3 × 3 × 5"
  exponentialFormUnicode: string; // e.g. "2³ × 3² × 5"
  exponentialFormHtml: string;    // e.g. "2<sup>3</sup> × 3<sup>2</sup> × 5"
  steps: string[];
}

export interface LogToExponentialResult {
  base: string; // string to accommodate 'e' or numbers
  baseNumeric: number;
  argument: number;
  exponent: number;
  isNaturalLog: boolean;
  logExpression: string;         // e.g. "log₂(8) = 3" or "ln(15) ≈ 2.70805"
  exponentialExpression: string; // e.g. "2³ = 8" or "e^2.70805 ≈ 15"
  exponentialExpressionHtml: string;
  steps: string[];
}

export interface ExponentialToLogResult {
  base: string;
  baseNumeric: number;
  exponent: number;
  resultNumber: number;
  isBaseE: boolean;
  exponentialExpression: string; // e.g. "2⁵ = 32"
  logExpression: string;         // e.g. "log₂(32) = 5"
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
  '.': '·',
};

export function toSuperscript(num: number | string): string {
  return String(num)
    .split('')
    .map((char) => SUPERSCRIPT_MAP[char] || char)
    .join('');
}

/**
 * Subscript digit mapping for logarithm base rendering (e.g. log₂ instead of log²)
 */
const SUBSCRIPT_MAP: Record<string, string> = {
  '0': '₀',
  '1': '₁',
  '2': '₂',
  '3': '₃',
  '4': '₄',
  '5': '₅',
  '6': '₆',
  '7': '₇',
  '8': '₈',
  '9': '₉',
  '+': '₊',
  '-': '₋',
  '.': '.',
  'e': 'ₑ',
  'x': 'ₓ',
};

export function toSubscript(num: number | string): string {
  return String(num)
    .split('')
    .map((char) => SUBSCRIPT_MAP[char] || char)
    .join('');
}

/**
 * Mode A: Factorize a positive whole number into prime factors and exponential form.
 */
export function calculateWholeNumberExponentialForm(rawInput: number | string): WholeNumberExponentialResult {
  const strVal = String(rawInput).trim();
  
  if (!strVal || isNaN(Number(strVal))) {
    throw new Error('Please enter a valid numeric positive whole number.');
  }

  // Check for decimals
  if (strVal.includes('.') || strVal.includes('e') || strVal.includes('E')) {
    const num = Number(strVal);
    if (!Number.isInteger(num)) {
      throw new Error(`"${strVal}" is a decimal number. Exponential form via prime factorization applies only to positive whole numbers (integers greater than 0). For decimals, scientific/exponential notation (e.g. ${num.toExponential()}) is used instead.`);
    }
  }

  const n = Number(strVal);

  if (n <= 0) {
    throw new Error('Please enter a positive whole number greater than 0. Zero and negative integers do not have a natural prime factorization.');
  }

  if (n > 9007199254740991) {
    throw new Error('Number exceeds standard integer precision limit (MAX_SAFE_INTEGER). Please enter a value up to 9,007,199,254,740,991.');
  }

  // Special case: 1
  if (n === 1) {
    return {
      originalNumber: 1,
      isPrime: false,
      factors: [{ prime: 1, power: 1 }],
      expandedFactorization: '1',
      exponentialFormUnicode: '1',
      exponentialFormHtml: '1',
      steps: [
        '1 is a unit (neither prime nor composite).',
        'By definition, its exponential form is simply 1.'
      ],
    };
  }

  const factors: PrimeFactorItem[] = [];
  const expandedList: number[] = [];
  const steps: string[] = [];

  let remainder = n;

  // Factor out 2s
  let count2 = 0;
  while (remainder % 2 === 0) {
    count2++;
    expandedList.push(2);
    remainder = Math.floor(remainder / 2);
  }
  if (count2 > 0) {
    factors.push({ prime: 2, power: count2 });
    steps.push(`Divided by 2, repeated ${count2} time${count2 > 1 ? 's' : ''}. Remaining: ${remainder}.`);
  }

  // Factor out odd numbers up to sqrt(remainder)
  let d = 3;
  while (d * d <= remainder) {
    let countD = 0;
    while (remainder % d === 0) {
      countD++;
      expandedList.push(d);
      remainder = Math.floor(remainder / d);
    }
    if (countD > 0) {
      factors.push({ prime: d, power: countD });
      steps.push(`Divided by prime factor ${d}, repeated ${countD} time${countD > 1 ? 's' : ''}. Remaining: ${remainder}.`);
    }
    d += 2;
  }

  if (remainder > 1) {
    factors.push({ prime: remainder, power: 1 });
    expandedList.push(remainder);
    steps.push(`Remaining factor ${remainder} is prime.`);
  }

  const isPrime = factors.length === 1 && factors[0].power === 1 && factors[0].prime === n;

  if (isPrime) {
    steps.push(`${n} has exactly two positive divisors: 1 and itself (${n}). It is a prime number.`);
  } else {
    steps.push(`Expanded prime factors: ${expandedList.join(' × ')}.`);
    steps.push('Group repeated factors as powers (base raised to count of occurrences).');
  }

  // Format Unicode & HTML
  const exponentialFormUnicode = factors
    .map((f) => (f.power > 1 ? `${f.prime}${toSuperscript(f.power)}` : `${f.prime}`))
    .join(' × ');

  const exponentialFormHtml = factors
    .map((f) => (f.power > 1 ? `${f.prime}<sup>${f.power}</sup>` : `${f.prime}`))
    .join(' × ');

  return {
    originalNumber: n,
    isPrime,
    factors,
    expandedFactorization: expandedList.join(' × '),
    exponentialFormUnicode,
    exponentialFormHtml,
    steps,
  };
}

/**
 * Mode B: Convert Logarithmic Form -> Exponential Form
 * Formula: log_b(c) = a  <==>  b^a = c
 * Natural Log: ln(c) = a  <==>  e^a = c
 */
export function calculateLogToExponential(
  baseInput: string | number,
  argumentInput?: number | string,
  logValueInput?: number | string
): LogToExponentialResult {
  const rawBase = String(baseInput).trim().toLowerCase();
  const isNaturalLog = rawBase === 'e';
  const baseNumeric = isNaturalLog ? Math.E : Number(rawBase);

  if (isNaN(baseNumeric)) {
    throw new Error('Invalid logarithm base. Please enter a positive number or "e" for natural logarithm.');
  }

  if (baseNumeric <= 0) {
    throw new Error(`Logarithm base must be strictly positive (b > 0). Entered base was ${baseInput}.`);
  }

  if (Math.abs(baseNumeric - 1) < 1e-12) {
    throw new Error('Logarithm base cannot be 1 (b ≠ 1), because 1 raised to any power is always 1, making log₁ undefined.');
  }

  const hasArg = argumentInput !== undefined && String(argumentInput).trim() !== '';
  const hasVal = logValueInput !== undefined && String(logValueInput).trim() !== '';

  if (!hasArg && !hasVal) {
    throw new Error('Please enter either the logarithm argument (c) or the logarithm value (a).');
  }

  let c: number;
  let a: number;

  if (hasArg) {
    c = Number(argumentInput);
    if (isNaN(c) || c <= 0) {
      throw new Error(`The logarithm argument (number) must be strictly positive (c > 0). Entered value was ${argumentInput}.`);
    }

    const expectedA = isNaturalLog ? Math.log(c) : Math.log(c) / Math.log(baseNumeric);

    if (hasVal) {
      const aInput = Number(logValueInput);
      if (!isNaN(aInput) && Math.abs(expectedA - aInput) < 1e-5) {
        a = aInput;
      } else {
        a = expectedA;
      }
    } else {
      a = expectedA;
    }
  } else {
    // Only logValue is provided, compute c = b^a
    a = Number(logValueInput);
    if (isNaN(a)) {
      throw new Error('Logarithm value / exponent must be a valid number.');
    }
    c = isNaturalLog ? Math.exp(a) : Math.pow(baseNumeric, a);
    if (isNaN(c) || c <= 0 || !isFinite(c)) {
      throw new Error('Calculation resulted in an overflow or invalid argument.');
    }
  }

  // Formatting precision
  const formatNum = (val: number): string => {
    if (Number.isInteger(val)) return String(val);
    const rounded = Number(val.toFixed(5));
    return String(rounded);
  };

  const aFormatted = formatNum(a);
  const cFormatted = formatNum(c);
  const baseStr = isNaturalLog ? 'e' : formatNum(baseNumeric);

  const logExpression = isNaturalLog
    ? `ln(${cFormatted}) = ${aFormatted}`
    : `log${toSubscript(baseStr)}(${cFormatted}) = ${aFormatted}`;

  const isExactPower = Math.abs((isNaturalLog ? Math.exp(a) : Math.pow(baseNumeric, a)) - c) < 1e-6;
  const eqSign = isExactPower ? '=' : '≈';

  const exponentialExpression = `${baseStr}${toSuperscript(aFormatted)} ${eqSign} ${cFormatted}`;
  const exponentialExpressionHtml = `${baseStr}<sup>${aFormatted}</sup> ${eqSign} ${cFormatted}`;

  const steps = [
    `Identified logarithmic form: ${logExpression}.`,
    `Base (b): ${baseStr}${isNaturalLog ? ' (Euler\'s number e ≈ 2.71828)' : ''}.`,
    `Argument (c): ${cFormatted}.`,
    `Logarithm value / Exponent (a): ${aFormatted}.`,
    'Apply the fundamental logarithm-to-exponent definition: log_b(c) = a  ⟺  bᵃ = c.',
    `Substitute values: ${baseStr} raised to the power ${aFormatted} equals ${cFormatted}.`,
    `Resulting exponential expression: ${exponentialExpression}.`,
  ];

  return {
    base: baseStr,
    baseNumeric,
    argument: c,
    exponent: a,
    isNaturalLog,
    logExpression,
    exponentialExpression,
    exponentialExpressionHtml,
    steps,
  };
}

/**
 * Mode C: Convert Exponential Form -> Logarithmic Form
 * Formula: b^a = c  <==>  log_b(c) = a
 * For base e: e^a = c  <==>  ln(c) = a
 */
export function calculateExponentialToLog(
  baseInput: string | number,
  exponentInput?: number | string,
  resultNumberInput?: number | string
): ExponentialToLogResult {
  const rawBase = String(baseInput).trim().toLowerCase();
  const isBaseE = rawBase === 'e';
  const baseNumeric = isBaseE ? Math.E : Number(rawBase);

  if (isNaN(baseNumeric)) {
    throw new Error('Invalid base. Please enter a positive number or "e" for natural exponential.');
  }

  if (baseNumeric <= 0) {
    throw new Error(`Exponential base must be strictly positive (b > 0) to convert to real logarithmic form. Entered base was ${baseInput}.`);
  }

  if (Math.abs(baseNumeric - 1) < 1e-12) {
    throw new Error('Base cannot be 1 (b ≠ 1) for conversion to logarithmic form, as log₁ is undefined.');
  }

  const hasExp = exponentInput !== undefined && String(exponentInput).trim() !== '';
  const hasRes = resultNumberInput !== undefined && String(resultNumberInput).trim() !== '';

  if (!hasExp && !hasRes) {
    throw new Error('Please enter either the exponent (a) or the evaluated result (c).');
  }

  let a: number;
  let c: number;

  if (hasExp) {
    a = Number(exponentInput);
    if (isNaN(a)) {
      throw new Error('Please enter a valid numeric exponent.');
    }
    const expectedC = isBaseE ? Math.exp(a) : Math.pow(baseNumeric, a);
    if (hasRes) {
      const cInput = Number(resultNumberInput);
      if (!isNaN(cInput) && Math.abs(expectedC - cInput) < 1e-5) {
        c = cInput;
      } else {
        c = expectedC;
      }
    } else {
      c = expectedC;
    }
  } else {
    // Only resultNumber is supplied
    c = Number(resultNumberInput);
    if (isNaN(c) || c <= 0) {
      throw new Error(`The evaluated power result must be greater than 0 for logarithm. Entered value was ${resultNumberInput}.`);
    }
    a = isBaseE ? Math.log(c) : Math.log(c) / Math.log(baseNumeric);
  }

  const formatNum = (val: number): string => {
    if (Number.isInteger(val)) return String(val);
    return String(Number(val.toFixed(5)));
  };

  const aFormatted = formatNum(a);
  const cFormatted = formatNum(c);
  const baseStr = isBaseE ? 'e' : formatNum(baseNumeric);

  const isExact = Math.abs((isBaseE ? Math.exp(a) : Math.pow(baseNumeric, a)) - c) < 1e-6;
  const eqSign = isExact ? '=' : '≈';

  const exponentialExpression = `${baseStr}${toSuperscript(aFormatted)} ${eqSign} ${cFormatted}`;

  const logExpression = isBaseE
    ? `ln(${cFormatted}) ${eqSign} ${aFormatted}`
    : `log${toSubscript(baseStr)}(${cFormatted}) ${eqSign} ${aFormatted}`;

  const steps = [
    `Given exponential expression: ${exponentialExpression}.`,
    `Base (b): ${baseStr}.`,
    `Exponent (a): ${aFormatted}.`,
    `Evaluated value (c): ${cFormatted}.`,
    'Apply the exponential-to-logarithm inverse rule: bᵃ = c  ⟺  log_b(c) = a.',
    isBaseE
      ? `Since base is Euler's constant e, log_e is written as natural logarithm ln: ln(${cFormatted}) ${eqSign} ${aFormatted}.`
      : `Write with base ${baseStr}: log${toSubscript(baseStr)}(${cFormatted}) ${eqSign} ${aFormatted}.`,
  ];

  return {
    base: baseStr,
    baseNumeric,
    exponent: a,
    resultNumber: c,
    isBaseE,
    exponentialExpression,
    logExpression,
    steps,
  };
}
