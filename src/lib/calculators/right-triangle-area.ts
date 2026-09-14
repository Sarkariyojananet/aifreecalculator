/**
 * Pure Mathematical Engine for Right Triangle Area Calculations
 * 100% Client-Side, High-Precision, Cloudflare-Worker friendly.
 * Supports 4 geometry modes, multiple length & area units, step-by-step substitution,
 * and proportional coordinate generation for SVG rendering.
 */

export type RightTriangleMode =
  | 'two_legs'
  | 'leg_hypotenuse'
  | 'hypotenuse_angle'
  | 'leg_angle';

export type LengthUnit = 'mm' | 'cm' | 'm' | 'in' | 'ft' | 'yd';
export type AngleUnit = 'deg' | 'rad';

export interface RightTriangleInput {
  mode: RightTriangleMode;
  unit?: LengthUnit;

  // Mode: two_legs
  legA?: number | string;
  legB?: number | string;

  // Mode: leg_hypotenuse
  hypotenuseC?: number | string;
  knownLeg?: 'a' | 'b';
  legValue?: number | string;

  // Mode: hypotenuse_angle & leg_angle
  angle?: number | string;
  angleType?: 'alpha' | 'beta'; // alpha is opposite a, beta is opposite b
  angleUnit?: AngleUnit;
}

export interface RightTriangleResult {
  mode: RightTriangleMode;
  unit: LengthUnit;
  areaUnit: string;
  
  // Primary outputs
  area: number;
  perimeter: number;
  legA: number;
  legB: number;
  hypotenuseC: number;
  
  // Angles in degrees and radians
  angleAlphaDeg: number;
  angleBetaDeg: number;
  angleGammaDeg: number; // Always 90
  angleAlphaRad: number;
  angleBetaRad: number;

  // Altitude to hypotenuse (h_c = a*b/c)
  inradius: number; // r = (a + b - c) / 2
  circumradius: number; // R = c / 2
  altitudeHypotenuse: number; // h = a * b / c

  isIsosceles: boolean; // 45-45-90 special case
  
  // Converted areas in all standard squared units
  areaConversions: Record<LengthUnit, number>;

  // Step-by-step mathematical derivation
  steps: string[];

  // Dynamic SVG rendering coordinates [pRightAngle, pA, pB]
  svgCoordinates: {
    origin: { x: number; y: number }; // Right angle vertex C (0,0)
    topVertex: { x: number; y: number }; // Vertex A (0, b)
    baseVertex: { x: number; y: number }; // Vertex B (a, 0)
  };
}

// Length conversion to meters (SI base)
export const LENGTH_TO_METERS: Record<LengthUnit, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1.0,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
};

export const AREA_UNIT_SYMBOLS: Record<LengthUnit, string> = {
  mm: 'mm²',
  cm: 'cm²',
  m: 'm²',
  in: 'in²',
  ft: 'ft²',
  yd: 'yd²',
};

export const AREA_UNIT_NAMES: Record<LengthUnit, string> = {
  mm: 'Square Millimeters (mm²)',
  cm: 'Square Centimeters (cm²)',
  m: 'Square Meters (m²)',
  in: 'Square Inches (in²)',
  ft: 'Square Feet (ft²)',
  yd: 'Square Yards (yd²)',
};

export const LENGTH_UNIT_NAMES: Record<LengthUnit, string> = {
  mm: 'Millimeters (mm)',
  cm: 'Centimeters (cm)',
  m: 'Meters (m)',
  in: 'Inches (in)',
  ft: 'Feet (ft)',
  yd: 'Yards (yd)',
};

/**
 * Clean floating point arithmetic noise
 */
export function cleanFloat(num: number, decimals: number = 8): number {
  if (!Number.isFinite(num)) return 0;
  return Number(Math.round(Number(`${num}e${decimals}`)) + `e-${decimals}`);
}

/**
 * Format numbers cleanly for UI display
 */
export function formatNum(val: number, maxDecimals: number = 4): string {
  if (!Number.isFinite(val)) return '—';
  if (Math.abs(val) < 1e-6 && val !== 0) return val.toExponential(4);
  const rounded = cleanFloat(val, maxDecimals);
  return rounded.toLocaleString('en-US', {
    maximumFractionDigits: maxDecimals,
  });
}

/**
 * Convert angle to radians
 */
export function toRadians(angle: number, unit: AngleUnit): number {
  return unit === 'deg' ? (angle * Math.PI) / 180 : angle;
}

/**
 * Convert angle to degrees
 */
export function toDegrees(rad: number): number {
  return (rad * 180) / Math.PI;
}

/**
 * Core Right Triangle Area Calculation Engine
 */
export function calculateRightTriangleArea(input: RightTriangleInput): RightTriangleResult {
  const unit: LengthUnit = input.unit || 'cm';
  const mode = input.mode;
  const steps: string[] = [];

  let a = 0;
  let b = 0;
  let c = 0;
  let alphaDeg = 0;
  let betaDeg = 0;

  if (mode === 'two_legs') {
    const rawA = Number(input.legA);
    const rawB = Number(input.legB);

    if (isNaN(rawA) || rawA <= 0) {
      throw new Error('Leg a must be a positive number strictly greater than 0.');
    }
    if (isNaN(rawB) || rawB <= 0) {
      throw new Error('Leg b must be a positive number strictly greater than 0.');
    }

    a = rawA;
    b = rawB;
    c = Math.sqrt(a * a + b * b);

    alphaDeg = toDegrees(Math.atan(a / b));
    betaDeg = 90 - alphaDeg;

    steps.push(`Given two legs: a = ${formatNum(a)} ${unit}, b = ${formatNum(b)} ${unit}`);
    steps.push(`Use standard right triangle area formula: Area = (a × b) / 2`);
    steps.push(`Substitute values: Area = (${formatNum(a)} × ${formatNum(b)}) / 2 = ${formatNum((a * b) / 2)} ${AREA_UNIT_SYMBOLS[unit]}`);
    steps.push(`Calculate hypotenuse via Pythagorean theorem: c = √(a² + b²) = √(${formatNum(a)}² + ${formatNum(b)}²) = √${formatNum(a * a + b * b)} = ${formatNum(c)} ${unit}`);
    steps.push(`Calculate acute angles: α = arctan(a / b) = ${formatNum(alphaDeg, 2)}°, β = 90° − α = ${formatNum(betaDeg, 2)}°`);

  } else if (mode === 'leg_hypotenuse') {
    const knownLeg = input.knownLeg || 'a';
    const rawLeg = Number(input.legValue ?? (knownLeg === 'a' ? input.legA : input.legB));
    const rawHyp = Number(input.hypotenuseC);

    if (isNaN(rawLeg) || rawLeg <= 0) {
      throw new Error(`Leg ${knownLeg} must be a positive number strictly greater than 0.`);
    }
    if (isNaN(rawHyp) || rawHyp <= 0) {
      throw new Error('Hypotenuse c must be a positive number strictly greater than 0.');
    }
    if (rawHyp <= rawLeg) {
      throw new Error(`Hypotenuse c (${formatNum(rawHyp)}) must be strictly greater than leg ${knownLeg} (${formatNum(rawLeg)}). In any Euclidean right triangle, the hypotenuse is the longest side.`);
    }

    c = rawHyp;

    if (knownLeg === 'a') {
      a = rawLeg;
      b = Math.sqrt(c * c - a * a);
      alphaDeg = toDegrees(Math.asin(a / c));
      betaDeg = 90 - alphaDeg;

      steps.push(`Given leg a = ${formatNum(a)} ${unit} and hypotenuse c = ${formatNum(c)} ${unit}`);
      steps.push(`Check condition: c > a (${formatNum(c)} > ${formatNum(a)}), valid Pythagorean geometry.`);
      steps.push(`Solve for missing leg b: b = √(c² − a²) = √(${formatNum(c)}² − ${formatNum(a)}²) = √(${formatNum(c * c)} − ${formatNum(a * a)}) = √${formatNum(c * c - a * a)} = ${formatNum(b)} ${unit}`);
      steps.push(`Calculate area: Area = (a × b) / 2 = (${formatNum(a)} × ${formatNum(b)}) / 2 = ${formatNum((a * b) / 2)} ${AREA_UNIT_SYMBOLS[unit]}`);
      steps.push(`Calculate acute angles: α = arcsin(a / c) = ${formatNum(alphaDeg, 2)}°, β = 90° − α = ${formatNum(betaDeg, 2)}°`);
    } else {
      b = rawLeg;
      a = Math.sqrt(c * c - b * b);
      betaDeg = toDegrees(Math.asin(b / c));
      alphaDeg = 90 - betaDeg;

      steps.push(`Given leg b = ${formatNum(b)} ${unit} and hypotenuse c = ${formatNum(c)} ${unit}`);
      steps.push(`Check condition: c > b (${formatNum(c)} > ${formatNum(b)}), valid Pythagorean geometry.`);
      steps.push(`Solve for missing leg a: a = √(c² − b²) = √(${formatNum(c)}² − ${formatNum(b)}²) = √(${formatNum(c * c)} − ${formatNum(b * b)}) = √${formatNum(c * c - b * b)} = ${formatNum(a)} ${unit}`);
      steps.push(`Calculate area: Area = (a × b) / 2 = (${formatNum(a)} × ${formatNum(b)}) / 2 = ${formatNum((a * b) / 2)} ${AREA_UNIT_SYMBOLS[unit]}`);
      steps.push(`Calculate acute angles: β = arcsin(b / c) = ${formatNum(betaDeg, 2)}°, α = 90° − β = ${formatNum(alphaDeg, 2)}°`);
    }

  } else if (mode === 'hypotenuse_angle') {
    const rawHyp = Number(input.hypotenuseC);
    const rawAngle = Number(input.angle);
    const angleType = input.angleType || 'alpha';
    const angleUnit: AngleUnit = input.angleUnit || 'deg';

    if (isNaN(rawHyp) || rawHyp <= 0) {
      throw new Error('Hypotenuse c must be a positive number strictly greater than 0.');
    }
    if (isNaN(rawAngle)) {
      throw new Error('Please enter a valid acute angle measurement.');
    }

    const angleDeg = angleUnit === 'deg' ? rawAngle : toDegrees(rawAngle);

    if (angleDeg <= 0 || angleDeg >= 90) {
      throw new Error(`Acute angle must be strictly between 0° and 90° (0 and π/2 rad). Received ${formatNum(rawAngle)} ${angleUnit}.`);
    }

    c = rawHyp;

    if (angleType === 'alpha') {
      alphaDeg = angleDeg;
      betaDeg = 90 - alphaDeg;
      const alphaRad = toRadians(alphaDeg, 'deg');
      a = c * Math.sin(alphaRad);
      b = c * Math.cos(alphaRad);

      steps.push(`Given hypotenuse c = ${formatNum(c)} ${unit} and opposite angle α = ${formatNum(alphaDeg, 2)}°`);
      steps.push(`Calculate other acute angle: β = 90° − α = 90° − ${formatNum(alphaDeg, 2)}° = ${formatNum(betaDeg, 2)}°`);
      steps.push(`Calculate legs using trigonometric definitions:`);
      steps.push(`  a = c × sin(α) = ${formatNum(c)} × sin(${formatNum(alphaDeg, 2)}°) = ${formatNum(c)} × ${formatNum(Math.sin(alphaRad), 5)} = ${formatNum(a)} ${unit}`);
      steps.push(`  b = c × cos(α) = ${formatNum(c)} × cos(${formatNum(alphaDeg, 2)}°) = ${formatNum(c)} × ${formatNum(Math.cos(alphaRad), 5)} = ${formatNum(b)} ${unit}`);
      steps.push(`Calculate area: Area = (a × b) / 2 = [c² × sin(α) × cos(α)] / 2 = ${formatNum((a * b) / 2)} ${AREA_UNIT_SYMBOLS[unit]}`);
    } else {
      betaDeg = angleDeg;
      alphaDeg = 90 - betaDeg;
      const betaRad = toRadians(betaDeg, 'deg');
      b = c * Math.sin(betaRad);
      a = c * Math.cos(betaRad);

      steps.push(`Given hypotenuse c = ${formatNum(c)} ${unit} and opposite angle β = ${formatNum(betaDeg, 2)}°`);
      steps.push(`Calculate other acute angle: α = 90° − β = 90° − ${formatNum(betaDeg, 2)}° = ${formatNum(alphaDeg, 2)}°`);
      steps.push(`Calculate legs using trigonometric definitions:`);
      steps.push(`  b = c × sin(β) = ${formatNum(c)} × sin(${formatNum(betaDeg, 2)}°) = ${formatNum(c)} × ${formatNum(Math.sin(betaRad), 5)} = ${formatNum(b)} ${unit}`);
      steps.push(`  a = c × cos(β) = ${formatNum(c)} × cos(${formatNum(betaDeg, 2)}°) = ${formatNum(c)} × ${formatNum(Math.cos(betaRad), 5)} = ${formatNum(a)} ${unit}`);
      steps.push(`Calculate area: Area = (a × b) / 2 = [c² × sin(β) × cos(β)] / 2 = ${formatNum((a * b) / 2)} ${AREA_UNIT_SYMBOLS[unit]}`);
    }

  } else if (mode === 'leg_angle') {
    const knownLeg = input.knownLeg || 'a';
    const rawLeg = Number(input.legValue ?? (knownLeg === 'a' ? input.legA : input.legB));
    const rawAngle = Number(input.angle);
    const angleType = input.angleType || 'alpha';
    const angleUnit: AngleUnit = input.angleUnit || 'deg';

    if (isNaN(rawLeg) || rawLeg <= 0) {
      throw new Error(`Leg ${knownLeg} must be a positive number strictly greater than 0.`);
    }
    if (isNaN(rawAngle)) {
      throw new Error('Please enter a valid acute angle measurement.');
    }

    const angleDeg = angleUnit === 'deg' ? rawAngle : toDegrees(rawAngle);

    if (angleDeg <= 0 || angleDeg >= 90) {
      throw new Error(`Acute angle must be strictly between 0° and 90° (0 and π/2 rad). Received ${formatNum(rawAngle)} ${angleUnit}.`);
    }

    if (knownLeg === 'a' && angleType === 'alpha') {
      a = rawLeg;
      alphaDeg = angleDeg;
      betaDeg = 90 - alphaDeg;
      const alphaRad = toRadians(alphaDeg, 'deg');
      b = a / Math.tan(alphaRad);
      c = a / Math.sin(alphaRad);

      steps.push(`Given leg a = ${formatNum(a)} ${unit} and opposite angle α = ${formatNum(alphaDeg, 2)}°`);
      steps.push(`Calculate adjacent leg b using tangent: tan(α) = a / b ⟹ b = a / tan(α) = ${formatNum(a)} / tan(${formatNum(alphaDeg, 2)}°) = ${formatNum(b)} ${unit}`);
      steps.push(`Calculate hypotenuse c: c = a / sin(α) = ${formatNum(a)} / sin(${formatNum(alphaDeg, 2)}°) = ${formatNum(c)} ${unit}`);
      steps.push(`Calculate area: Area = (a × b) / 2 = a² / [2 × tan(α)] = ${formatNum((a * b) / 2)} ${AREA_UNIT_SYMBOLS[unit]}`);
      steps.push(`Other acute angle: β = 90° − α = ${formatNum(betaDeg, 2)}°`);

    } else if (knownLeg === 'a' && angleType === 'beta') {
      a = rawLeg;
      betaDeg = angleDeg;
      alphaDeg = 90 - betaDeg;
      const betaRad = toRadians(betaDeg, 'deg');
      b = a * Math.tan(betaRad);
      c = a / Math.cos(betaRad);

      steps.push(`Given leg a = ${formatNum(a)} ${unit} and adjacent angle β = ${formatNum(betaDeg, 2)}°`);
      steps.push(`Calculate opposite leg b using tangent: tan(β) = b / a ⟹ b = a × tan(β) = ${formatNum(a)} × tan(${formatNum(betaDeg, 2)}°) = ${formatNum(b)} ${unit}`);
      steps.push(`Calculate hypotenuse c: c = a / cos(β) = ${formatNum(a)} / cos(${formatNum(betaDeg, 2)}°) = ${formatNum(c)} ${unit}`);
      steps.push(`Calculate area: Area = (a × b) / 2 = [a² × tan(β)] / 2 = ${formatNum((a * b) / 2)} ${AREA_UNIT_SYMBOLS[unit]}`);
      steps.push(`Other acute angle: α = 90° − β = ${formatNum(alphaDeg, 2)}°`);

    } else if (knownLeg === 'b' && angleType === 'alpha') {
      b = rawLeg;
      alphaDeg = angleDeg;
      betaDeg = 90 - alphaDeg;
      const alphaRad = toRadians(alphaDeg, 'deg');
      a = b * Math.tan(alphaRad);
      c = b / Math.cos(alphaRad);

      steps.push(`Given leg b = ${formatNum(b)} ${unit} and adjacent angle α = ${formatNum(alphaDeg, 2)}°`);
      steps.push(`Calculate opposite leg a using tangent: tan(α) = a / b ⟹ a = b × tan(α) = ${formatNum(b)} × tan(${formatNum(alphaDeg, 2)}°) = ${formatNum(a)} ${unit}`);
      steps.push(`Calculate hypotenuse c: c = b / cos(α) = ${formatNum(b)} / cos(${formatNum(alphaDeg, 2)}°) = ${formatNum(c)} ${unit}`);
      steps.push(`Calculate area: Area = (a × b) / 2 = [b² × tan(α)] / 2 = ${formatNum((a * b) / 2)} ${AREA_UNIT_SYMBOLS[unit]}`);
      steps.push(`Other acute angle: β = 90° − α = ${formatNum(betaDeg, 2)}°`);

    } else {
      // knownLeg === 'b' && angleType === 'beta'
      b = rawLeg;
      betaDeg = angleDeg;
      alphaDeg = 90 - betaDeg;
      const betaRad = toRadians(betaDeg, 'deg');
      a = b / Math.tan(betaRad);
      c = b / Math.sin(betaRad);

      steps.push(`Given leg b = ${formatNum(b)} ${unit} and opposite angle β = ${formatNum(betaDeg, 2)}°`);
      steps.push(`Calculate adjacent leg a using tangent: tan(β) = b / a ⟹ a = b / tan(β) = ${formatNum(b)} / tan(${formatNum(betaDeg, 2)}°) = ${formatNum(a)} ${unit}`);
      steps.push(`Calculate hypotenuse c: c = b / sin(β) = ${formatNum(b)} / sin(${formatNum(betaDeg, 2)}°) = ${formatNum(c)} ${unit}`);
      steps.push(`Calculate area: Area = (a × b) / 2 = b² / [2 × tan(β)] = ${formatNum((a * b) / 2)} ${AREA_UNIT_SYMBOLS[unit]}`);
      steps.push(`Other acute angle: α = 90° − β = ${formatNum(alphaDeg, 2)}°`);
    }
  }

  // Sanity check
  if (a <= 0 || b <= 0 || c <= 0 || !Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(c)) {
    throw new Error('Geometric dimensions resulted in non-real or non-positive values.');
  }

  const area = cleanFloat((a * b) / 2, 8);
  const perimeter = cleanFloat(a + b + c, 8);
  const isIsosceles = Math.abs(alphaDeg - 45) < 1e-4;

  if (isIsosceles) {
    steps.push(`💡 Note: Since α = β = 45°, this is a special 45°-45°-90° isosceles right triangle with equal legs a = b = ${formatNum(a)} and hypotenuse c = a√2 = ${formatNum(c)}.`);
  }

  // Geometric metrics
  const altitudeHypotenuse = cleanFloat((a * b) / c, 8);
  const inradius = cleanFloat((a + b - c) / 2, 8);
  const circumradius = cleanFloat(c / 2, 8);

  // Convert area to all squared units
  // First convert to square meters:
  const factorToMeters = LENGTH_TO_METERS[unit];
  const areaInSquareMeters = area * (factorToMeters * factorToMeters);

  const areaConversions: Record<LengthUnit, number> = {
    mm: cleanFloat(areaInSquareMeters / (LENGTH_TO_METERS.mm * LENGTH_TO_METERS.mm), 4),
    cm: cleanFloat(areaInSquareMeters / (LENGTH_TO_METERS.cm * LENGTH_TO_METERS.cm), 4),
    m: cleanFloat(areaInSquareMeters, 6),
    in: cleanFloat(areaInSquareMeters / (LENGTH_TO_METERS.in * LENGTH_TO_METERS.in), 4),
    ft: cleanFloat(areaInSquareMeters / (LENGTH_TO_METERS.ft * LENGTH_TO_METERS.ft), 4),
    yd: cleanFloat(areaInSquareMeters / (LENGTH_TO_METERS.yd * LENGTH_TO_METERS.yd), 4),
  };

  return {
    mode,
    unit,
    areaUnit: AREA_UNIT_SYMBOLS[unit],
    area: cleanFloat(area, 6),
    perimeter: cleanFloat(perimeter, 6),
    legA: cleanFloat(a, 6),
    legB: cleanFloat(b, 6),
    hypotenuseC: cleanFloat(c, 6),
    angleAlphaDeg: cleanFloat(alphaDeg, 4),
    angleBetaDeg: cleanFloat(betaDeg, 4),
    angleGammaDeg: 90,
    angleAlphaRad: cleanFloat(toRadians(alphaDeg, 'deg'), 6),
    angleBetaRad: cleanFloat(toRadians(betaDeg, 'deg'), 6),
    altitudeHypotenuse,
    inradius,
    circumradius,
    isIsosceles,
    areaConversions,
    steps,
    svgCoordinates: {
      origin: { x: 0, y: 0 },
      topVertex: { x: 0, y: cleanFloat(b, 4) },
      baseVertex: { x: cleanFloat(a, 4), y: 0 },
    },
  };
}
