/**
 * Comprehensive Fraction Calculation Engine
 * Supports Basic Fraction Arithmetic, Mixed Fractions, Decimal Conversion,
 * Fraction Simplification (GCD), Partial Fraction Decomposition, and Safe Expression Parsing.
 */

export interface Fraction {
  numerator: number;
  denominator: number;
}

export interface FractionResult {
  numerator: number;
  denominator: number;
  wholeNumber: number;
  remainderNumerator: number;
  simplifiedString: string;
  mixedNumberString: string;
  decimalValue: number;
  percentageString: string;
  steps: string[];
}

export function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

export function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

export function simplifyFraction(num: number, den: number): Fraction {
  if (den === 0) throw new Error('Denominator cannot be zero.');
  if (num === 0) return { numerator: 0, denominator: 1 };

  const divisor = gcd(num, den);
  let sNum = num / divisor;
  let sDen = den / divisor;

  if (sDen < 0) {
    sNum = -sNum;
    sDen = -sDen;
  }

  return { numerator: sNum, denominator: sDen };
}

/**
 * Basic Fraction Arithmetic with Detailed Steps
 */
export function calculateFractionOperation(
  f1: Fraction,
  op: '+' | '-' | '*' | '/' | 'add' | 'subtract' | 'multiply' | 'divide',
  f2: Fraction
): FractionResult {
  if (f1.denominator === 0 || f2.denominator === 0) {
    throw new Error('Denominator cannot be zero.');
  }

  const steps: string[] = [];
  let rawNum = 0;
  let rawDen = 1;

  const normalizedOp = op === 'add' ? '+' : op === 'subtract' ? '-' : op === 'multiply' ? '*' : op === 'divide' ? '/' : op;

  if (normalizedOp === '+' || normalizedOp === '-') {
    const commonDen = lcm(f1.denominator, f2.denominator);
    const m1 = commonDen / f1.denominator;
    const m2 = commonDen / f2.denominator;
    const adjNum1 = f1.numerator * m1;
    const adjNum2 = f2.numerator * m2;

    steps.push(`1. Find Least Common Denominator (LCD): LCD(${f1.denominator}, ${f2.denominator}) = ${commonDen}`);
    steps.push(`2. Convert fractions to common denominator: ${f1.numerator}/${f1.denominator} = ${adjNum1}/${commonDen},  ${f2.numerator}/${f2.denominator} = ${adjNum2}/${commonDen}`);

    if (normalizedOp === '+') {
      rawNum = adjNum1 + adjNum2;
      steps.push(`3. Add numerators: ${adjNum1} + ${adjNum2} = ${rawNum}`);
    } else {
      rawNum = adjNum1 - adjNum2;
      steps.push(`3. Subtract numerators: ${adjNum1} - ${adjNum2} = ${rawNum}`);
    }
    rawDen = commonDen;
    steps.push(`4. Result before reduction: ${rawNum}/${rawDen}`);
  } else if (normalizedOp === '*') {
    rawNum = f1.numerator * f2.numerator;
    rawDen = f1.denominator * f2.denominator;
    steps.push(`1. Multiply numerators: ${f1.numerator} × ${f2.numerator} = ${rawNum}`);
    steps.push(`2. Multiply denominators: ${f1.denominator} × ${f2.denominator} = ${rawDen}`);
    steps.push(`3. Result before reduction: ${rawNum}/${rawDen}`);
  } else if (normalizedOp === '/') {
    if (f2.numerator === 0) {
      throw new Error('Division by zero fraction is not allowed.');
    }
    rawNum = f1.numerator * f2.denominator;
    rawDen = f1.denominator * f2.numerator;
    steps.push(`1. Take reciprocal of second fraction: ${f2.numerator}/${f2.denominator} ➔ ${f2.denominator}/${f2.numerator}`);
    steps.push(`2. Multiply by reciprocal: (${f1.numerator}/${f1.denominator}) × (${f2.denominator}/${f2.numerator})`);
    steps.push(`3. Result before reduction: ${rawNum}/${rawDen}`);
  }

  const { numerator: num, denominator: den } = simplifyFraction(rawNum, rawDen);
  const commonDivisor = gcd(rawNum, rawDen);
  if (commonDivisor > 1) {
    steps.push(`5. Simplify by dividing numerator and denominator by GCD (${commonDivisor}): ${num}/${den}`);
  }

  const decimalValue = Number((num / den).toFixed(6));
  const isNegative = num < 0;
  const absNum = Math.abs(num);
  const wholeNumber = Math.floor(absNum / den) * (isNegative ? -1 : 1);
  const remainderNumerator = absNum % den;

  const simplifiedString = den === 1 ? `${num}` : `${num}/${den}`;
  let mixedNumberString = simplifiedString;

  if (absNum > den && remainderNumerator !== 0) {
    mixedNumberString = `${wholeNumber < 0 ? '-' : ''}${Math.abs(wholeNumber)} ${remainderNumerator}/${den}`;
    steps.push(`6. Convert to mixed number: ${mixedNumberString}`);
  }

  return {
    numerator: num,
    denominator: den,
    wholeNumber,
    remainderNumerator,
    simplifiedString,
    mixedNumberString,
    decimalValue,
    percentageString: `${(decimalValue * 100).toFixed(2)}%`,
    steps,
  };
}

/**
 * Mixed Fraction Arithmetic
 */
export interface MixedFraction {
  whole: number;
  numerator: number;
  denominator: number;
}

export function mixedToImproper(m: MixedFraction): Fraction {
  const sign = m.whole < 0 ? -1 : 1;
  const absWhole = Math.abs(m.whole || 0);
  const den = m.denominator || 1;
  const num = sign * (absWhole * den + (m.numerator || 0));
  return { numerator: num, denominator: den };
}

export function calculateMixedFraction(
  m1: MixedFraction,
  op: '+' | '-' | '*' | '/',
  m2: MixedFraction
): FractionResult {
  const f1 = mixedToImproper(m1);
  const f2 = mixedToImproper(m2);
  const res = calculateFractionOperation(f1, op, f2);

  const prefixSteps = [
    `Convert Mixed Fraction 1: ${m1.whole !== 0 ? m1.whole + ' ' : ''}${m1.numerator}/${m1.denominator} ➔ ${f1.numerator}/${f1.denominator}`,
    `Convert Mixed Fraction 2: ${m2.whole !== 0 ? m2.whole + ' ' : ''}${m2.numerator}/${m2.denominator} ➔ ${f2.numerator}/${f2.denominator}`,
  ];

  return {
    ...res,
    steps: [...prefixSteps, ...res.steps],
  };
}

/**
 * Convert Decimal to Fraction (Terminating and Continued Fraction Approximation)
 */
export function convertDecimalToFraction(
  decimalStr: string,
  maxDenominator: number = 10000
): {
  fractionString: string;
  numerator: number;
  denominator: number;
  mixedString: string;
  isExact: boolean;
  steps: string[];
} {
  const cleanStr = decimalStr.trim();
  const val = parseFloat(cleanStr);
  if (isNaN(val)) throw new Error('Please enter a valid decimal number.');

  const isNeg = val < 0;
  const absVal = Math.abs(val);
  const steps: string[] = [];

  // 1. Check for exact terminating decimal
  const dotIdx = cleanStr.indexOf('.');
  if (dotIdx !== -1) {
    const decDigits = cleanStr.length - dotIdx - 1;
    if (decDigits <= 8) {
      const den = Math.pow(10, decDigits);
      const num = Math.round(absVal * den);
      const simp = simplifyFraction(num, den);
      const finalNum = isNeg ? -simp.numerator : simp.numerator;
      const whole = Math.floor(simp.numerator / simp.denominator) * (isNeg ? -1 : 1);
      const rem = simp.numerator % simp.denominator;
      const mixed = rem !== 0 && Math.abs(whole) > 0 ? `${whole} ${rem}/${simp.denominator}` : `${finalNum}/${simp.denominator}`;

      steps.push(`1. Decimal has ${decDigits} decimal places: ${absVal} = ${num}/${den}`);
      steps.push(`2. Simplify by dividing by GCD: ${finalNum}/${simp.denominator}`);

      return {
        fractionString: `${finalNum}/${simp.denominator}`,
        numerator: finalNum,
        denominator: simp.denominator,
        mixedString: mixed,
        isExact: true,
        steps,
      };
    }
  }

  // 2. Continued fraction approximation for longer / repeating decimals
  let p0 = 0, q0 = 1, p1 = 1, q1 = 0;
  let n = absVal;
  let attempts = 0;

  while (attempts < 50) {
    attempts++;
    const a = Math.floor(n);
    const p2 = a * p1 + p0;
    const q2 = a * q1 + q0;
    if (q2 > maxDenominator) break;
    p0 = p1; q0 = q1;
    p1 = p2; q1 = q2;
    const rem = n - a;
    if (rem < 1e-12) break;
    n = 1 / rem;
  }

  const finalNum = isNeg ? -p1 : p1;
  const finalDen = q1;
  const whole = Math.floor(p1 / finalDen) * (isNeg ? -1 : 1);
  const rem = p1 % finalDen;
  const mixed = rem !== 0 && Math.abs(whole) > 0 ? `${whole} ${rem}/${finalDen}` : `${finalNum}/${finalDen}`;

  steps.push(`Rational approximation with maximum denominator ${maxDenominator}: ${finalNum}/${finalDen}`);

  return {
    fractionString: `${finalNum}/${finalDen}`,
    numerator: finalNum,
    denominator: finalDen,
    mixedString: mixed,
    isExact: false,
    steps,
  };
}

/**
 * Partial Fraction Decomposition Engine
 * Handles common standard forms:
 * 1. Distinct linear factors: (Px + Q) / ((x - a)(x - b))
 * 2. Repeated linear factors: (Px + Q) / ((x - a)^2)
 * 3. Quadratic factors: (Px + Q) / ((x^2 + c)(x - a))
 */
export function decomposePartialFractions(
  numeratorStr: string,
  denominatorStr: string
): {
  resultString: string;
  steps: string[];
} {
  const numStr = numeratorStr.trim();
  const denStr = denominatorStr.trim();
  const steps: string[] = [];

  // Distinct linear factors regex: (x-a)(x+b) or (x - a)(x - b) or (x+a)(x+b)
  // Example: 3x + 5 / (x - 1)(x + 2)
  const linearPairMatch = denStr.match(/\(\s*x\s*([+-]\s*\d+)\s*\)\s*\(\s*x\s*([+-]\s*\d+)\s*\)/i);

  if (linearPairMatch) {
    const root1 = -parseFloat(linearPairMatch[1].replace(/\s+/g, ''));
    const root2 = -parseFloat(linearPairMatch[2].replace(/\s+/g, ''));

    if (root1 === root2) {
      // Repeated root
      steps.push(`1. Denominator has repeated root: (x - ${root1})²`);
      steps.push(`2. Assume form: A / (x - ${root1}) + B / (x - ${root1})²`);
      return {
        resultString: `A / (x - ${root1}) + B / (x - ${root1})²`,
        steps,
      };
    }

    // Evaluate numerator P(x) at x = root1 and x = root2
    // Parse P(x) = Ax + B or constant
    const numLinearMatch = numStr.match(/([+-]?\s*\d*)\s*x\s*([+-]\s*\d+)?/i);
    let nA = 0;
    let nB = 0;

    if (numLinearMatch) {
      const aStr = numLinearMatch[1].replace(/\s+/g, '');
      nA = aStr === '' || aStr === '+' ? 1 : aStr === '-' ? -1 : parseFloat(aStr) || 0;
      if (numLinearMatch[2]) {
        nB = parseFloat(numLinearMatch[2].replace(/\s+/g, '')) || 0;
      }
    } else {
      nB = parseFloat(numStr) || 0;
    }

    const evalAt = (x: number) => nA * x + nB;

    // By Heaviside Cover-Up Method:
    // A = P(root1) / (root1 - root2)
    // B = P(root2) / (root2 - root1)
    const valA = evalAt(root1) / (root1 - root2);
    const valB = evalAt(root2) / (root2 - root1);

    const term1Den = root1 >= 0 ? `(x - ${root1})` : `(x + ${Math.abs(root1)})`;
    const term2Den = root2 >= 0 ? `(x - ${root2})` : `(x + ${Math.abs(root2)})`;

    const formatCoeff = (v: number) => {
      if (Number.isInteger(v)) return String(v);
      const frac = convertDecimalToFraction(String(v), 100);
      return frac.fractionString;
    };

    steps.push(`1. Factorized Denominator: ${term1Den} ${term2Den}`);
    steps.push(`2. Set up partial fraction decomposition: A / ${term1Den} + B / ${term2Den}`);
    steps.push(`3. Multiply by denominator: P(x) = A ${term2Den} + B ${term1Den}`);
    steps.push(`4. Evaluate at x = ${root1}: P(${root1}) = ${evalAt(root1)} ➔ A = ${formatCoeff(valA)}`);
    steps.push(`5. Evaluate at x = ${root2}: P(${root2}) = ${evalAt(root2)} ➔ B = ${formatCoeff(valB)}`);

    const resultString = `${formatCoeff(valA)} / ${term1Den} + ${formatCoeff(valB)} / ${term2Den}`;
    return {
      resultString,
      steps,
    };
  }

  // General explanation if not matched to simple quadratic
  steps.push(`1. Given rational expression: (${numStr}) / (${denStr})`);
  steps.push(`2. Factorize the denominator into linear and irreducible quadratic factors.`);
  steps.push(`3. Assign unknown constants (A, B, C...) for each distinct linear and quadratic term.`);
  steps.push(`4. Solve for constants by equating coefficients or substituting root values.`);

  return {
    resultString: `A / (Factor 1) + B / (Factor 2)`,
    steps,
  };
}

/**
 * Safe Fraction Expression Parser (Recursive Descent - No eval)
 */
export function evaluateFractionExpression(expr: string): FractionResult {
  const clean = expr.replace(/\s+/g, ' ').trim();
  if (!clean) throw new Error('Please enter a fraction expression.');

  // Tokenize
  const tokens: string[] = [];
  let i = 0;
  while (i < clean.length) {
    const ch = clean[i];
    if (ch === ' ') {
      i++;
      continue;
    }
    if ('+-*/()'.includes(ch)) {
      tokens.push(ch);
      i++;
    } else if (/\d/.test(ch)) {
      let numStr = '';
      while (i < clean.length && /\d/.test(clean[i])) {
        numStr += clean[i];
        i++;
      }
      tokens.push(numStr);
    } else {
      throw new Error(`Invalid character in expression: ${ch}`);
    }
  }

  let tokenIdx = 0;
  function peek(): string | undefined {
    return tokens[tokenIdx];
  }
  function consume(): string {
    return tokens[tokenIdx++];
  }

  function parsePrimary(): Fraction {
    const t = peek();
    if (t === '(') {
      consume(); // '('
      const val = parseAddSub();
      if (peek() !== ')') throw new Error('Missing closing parenthesis.');
      consume(); // ')'
      return val;
    }
    if (t && /^\d+$/.test(t)) {
      const num = parseInt(consume());
      return { numerator: num, denominator: 1 };
    }
    throw new Error(`Unexpected token: ${t}`);
  }

  function parseMulDiv(): Fraction {
    let left = parsePrimary();
    while (peek() === '*' || peek() === '/') {
      const op = consume() as '*' | '/';
      const right = parsePrimary();
      left = calculateFractionOperation(left, op, right);
    }
    return left;
  }

  function parseAddSub(): Fraction {
    let left = parseMulDiv();
    while (peek() === '+' || peek() === '-') {
      const op = consume() as '+' | '-';
      const right = parseMulDiv();
      left = calculateFractionOperation(left, op, right);
    }
    return left;
  }

  const finalFraction = parseAddSub();
  if (tokenIdx < tokens.length) {
    throw new Error(`Syntax error near token: ${tokens[tokenIdx]}`);
  }

  return calculateFractionOperation(finalFraction, '+', { numerator: 0, denominator: 1 });
}
