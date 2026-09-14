/**
 * Pure Mathematical Engine for Slope Calculator System
 * 100% Client-Side, High-Precision, Cloudflare-Worker Free friendly.
 * Supports:
 * - Standard Slope (Rise & Run, Rise & %, Run & %, Rise & Angle, Run & Angle)
 * - Slope Percentage & Angle conversions (including slopes > 100%)
 * - Roof Slope & Pitch (X:12 notation, rise/run, rafter length)
 * - Wheelchair Ramp Slope (ADA reference, target slope %, surface length, disclaimer)
 */

export type SlopeCalculationCategory = 'standard' | 'percentage' | 'roof' | 'ramp';

export type SlopeCalculationMode =
  // Standard modes
  | 'rise_run'
  | 'rise_percentage'
  | 'run_percentage'
  | 'rise_angle'
  | 'run_angle'
  // Percentage / Angle modes
  | 'percentage_to_angle'
  | 'angle_to_percentage'
  // Roof modes
  | 'roof_pitch'
  | 'roof_rise_run'
  | 'roof_rafter'
  // Wheelchair ramp modes
  | 'ramp_rise_run'
  | 'ramp_rise_target'
  | 'ramp_run_target';

export type LengthUnit = 'mm' | 'cm' | 'm' | 'in' | 'ft' | 'yd';

export interface SlopeInput {
  mode: SlopeCalculationMode;
  unit?: LengthUnit;

  // Primary geometric inputs
  rise?: number | string;
  run?: number | string;
  slopePercentage?: number | string;
  angleDeg?: number | string;

  // Roof specific inputs
  pitchX?: number | string; // X in X:12
  rafterLength?: number | string;

  // Wheelchair ramp target slope % (e.g., 8.333% for 1:12 ADA max, 5% for 1:20 gentle)
  targetSlopePercentage?: number | string;
}

export interface SlopeResult {
  mode: SlopeCalculationMode;
  category: SlopeCalculationCategory;
  unit: LengthUnit;

  // Primary calculated metrics
  rise: number;
  run: number;
  decimalSlope: number; // rise / run
  slopePercentage: number; // (rise / run) * 100
  angleDeg: number;
  angleRad: number;

  // Ratios & Representations
  slopeRatio: string; // e.g. "1 : 4" or "1 : 12"
  slopeRatioNormalized: string; // e.g. "1 : 4.000"
  hypotenuseLength: number; // Surface length / rafter length

  // Roof specific
  pitchX: number; // X in X:12
  pitchString: string; // e.g. "6:12"

  // Ramp specific
  isDownhill: boolean;
  isSteep: boolean; // > 100% or > 45°
  rampAdaAdvisory?: string;

  // Step-by-step mathematical substitution
  steps: string[];
}

export const LENGTH_TO_METERS: Record<LengthUnit, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1.0,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
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
 * Format a number nicely for steps and text representations.
 */
function fmt(num: number, maxDecimals: number = 4): string {
  if (num === 0) return '0';
  const rounded = Number(num.toFixed(maxDecimals));
  return Math.abs(rounded) < 0.0001 && num !== 0
    ? num.toExponential(4)
    : rounded.toString();
}

/**
 * Helper to compute greatest common divisor for integer ratio simplification.
 */
function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

/**
 * Format a ratio like "1 : 4" or simplified integer ratio.
 */
function formatSlopeRatio(rise: number, run: number): { ratio: string; normalized: string } {
  if (rise === 0) {
    return { ratio: '0 : 1', normalized: '0 : 1' };
  }
  if (run === 0) {
    return { ratio: 'Undefined (Vertical)', normalized: 'Undefined' };
  }

  const absRise = Math.abs(rise);
  const absRun = Math.abs(run);

  // Normalized to 1:N
  const n = absRun / absRise;
  const normalized = `1 : ${fmt(n, 3)}`;

  // Integer reduction if inputs are close to clean numbers
  const intRise = Math.round(absRise * 1000);
  const intRun = Math.round(absRun * 1000);
  const commonDiv = gcd(intRise, intRun);
  const simRise = intRise / commonDiv;
  const simRun = intRun / commonDiv;

  let ratioStr = `${simRise} : ${simRun}`;
  if (simRise === 1) {
    ratioStr = `1 : ${simRun}`;
  } else if (Math.abs(n - Math.round(n)) < 0.001) {
    ratioStr = `1 : ${Math.round(n)}`;
  }

  return { ratio: ratioStr, normalized };
}

/**
 * Main calculation dispatcher for all slope modes.
 */
export function calculateSlope(input: SlopeInput): SlopeResult {
  const mode = input.mode;
  const unit = input.unit || 'm';

  let rise = 0;
  let run = 0;
  let slopePct = 0;
  let angleDeg = 0;
  let decimalSlope = 0;
  let hypotenuse = 0;
  let pitchX = 0;
  let pitchStr = '';
  const steps: string[] = [];

  let category: SlopeCalculationCategory = 'standard';
  if (mode === 'percentage_to_angle' || mode === 'angle_to_percentage') {
    category = 'percentage';
  } else if (mode.startsWith('roof_')) {
    category = 'roof';
  } else if (mode.startsWith('ramp_')) {
    category = 'ramp';
  }

  switch (mode) {
    // -------------------------------------------------------------
    // 1. STANDARD: RISE + RUN
    // -------------------------------------------------------------
    case 'rise_run': {
      const rawRise = Number(input.rise);
      const rawRun = Number(input.run);

      if (isNaN(rawRise)) throw new Error('Please enter a valid number for rise.');
      if (isNaN(rawRun)) throw new Error('Please enter a valid number for horizontal run.');
      if (rawRun === 0) throw new Error('Horizontal run cannot be zero. A vertical line has an undefined mathematical slope.');

      rise = rawRise;
      run = rawRun;
      decimalSlope = rise / run;
      slopePct = decimalSlope * 100;
      const angleRadVal = Math.atan(decimalSlope);
      angleDeg = (angleRadVal * 180) / Math.PI;
      hypotenuse = Math.sqrt(rise * rise + run * run);
      pitchX = (Math.abs(rise) / Math.abs(run)) * 12;
      pitchStr = `${fmt(pitchX, 2)}:12`;

      steps.push(`Formula for Slope: m = Rise / Run = ${fmt(rise)} / ${fmt(run)} = ${fmt(decimalSlope, 5)}`);
      steps.push(`Formula for Slope Percentage: Slope % = (Rise / Run) × 100 = (${fmt(rise)} / ${fmt(run)}) × 100 = ${fmt(slopePct, 3)}%`);
      steps.push(`Formula for Slope Angle: θ = arctan(Rise / Run) = arctan(${fmt(decimalSlope, 5)}) = ${fmt(angleDeg, 3)}°`);
      steps.push(`Sloped Distance (Hypotenuse): L = √(Rise² + Run²) = √(${fmt(rise)}² + ${fmt(run)}²) = √(${fmt(rise * rise + run * run, 4)}) = ${fmt(hypotenuse, 4)} ${unit}`);
      if (rise < 0) {
        steps.push(`Direction: Downward slope (negative rise indicates vertical drop over horizontal advance).`);
      } else if (rise > 0) {
        steps.push(`Direction: Upward slope (positive rise indicates vertical elevation over horizontal advance).`);
      }
      break;
    }

    // -------------------------------------------------------------
    // 2. STANDARD: RISE + SLOPE PERCENTAGE
    // -------------------------------------------------------------
    case 'rise_percentage': {
      const rawRise = Number(input.rise);
      const rawSlopePct = Number(input.slopePercentage);

      if (isNaN(rawRise)) throw new Error('Please enter a valid number for rise.');
      if (isNaN(rawSlopePct)) throw new Error('Please enter a valid number for slope percentage.');
      if (rawSlopePct === 0) {
        if (rawRise !== 0) {
          throw new Error('A 0% slope requires a rise of 0. No finite horizontal run can satisfy a non-zero rise with 0% slope.');
        }
        throw new Error('Please enter a non-zero slope percentage.');
      }

      rise = rawRise;
      slopePct = rawSlopePct;
      decimalSlope = slopePct / 100;
      run = (rise * 100) / slopePct;

      if (run === 0) throw new Error('Calculated horizontal run cannot be zero.');

      const angleRadVal = Math.atan(decimalSlope);
      angleDeg = (angleRadVal * 180) / Math.PI;
      hypotenuse = Math.sqrt(rise * rise + run * run);
      pitchX = (Math.abs(rise) / Math.abs(run)) * 12;
      pitchStr = `${fmt(pitchX, 2)}:12`;

      steps.push(`Known: Rise = ${fmt(rise)} ${unit}, Slope Percentage = ${fmt(slopePct)}%`);
      steps.push(`Derived Formula for Run: Run = (Rise × 100) / Slope %`);
      steps.push(`Calculation: Run = (${fmt(rise)} × 100) / ${fmt(slopePct)} = ${fmt(run, 4)} ${unit}`);
      steps.push(`Angle: θ = arctan(Slope % / 100) = arctan(${fmt(decimalSlope, 5)}) = ${fmt(angleDeg, 3)}°`);
      steps.push(`Sloped Distance: L = √(${fmt(rise)}² + ${fmt(run, 4)}²) = ${fmt(hypotenuse, 4)} ${unit}`);
      break;
    }

    // -------------------------------------------------------------
    // 3. STANDARD: RUN + SLOPE PERCENTAGE
    // -------------------------------------------------------------
    case 'run_percentage': {
      const rawRun = Number(input.run);
      const rawSlopePct = Number(input.slopePercentage);

      if (isNaN(rawRun)) throw new Error('Please enter a valid number for run.');
      if (isNaN(rawSlopePct)) throw new Error('Please enter a valid number for slope percentage.');
      if (rawRun === 0) throw new Error('Horizontal run cannot be zero.');

      run = rawRun;
      slopePct = rawSlopePct;
      decimalSlope = slopePct / 100;
      rise = (run * slopePct) / 100;

      const angleRadVal = Math.atan(decimalSlope);
      angleDeg = (angleRadVal * 180) / Math.PI;
      hypotenuse = Math.sqrt(rise * rise + run * run);
      pitchX = (Math.abs(rise) / Math.abs(run)) * 12;
      pitchStr = `${fmt(pitchX, 2)}:12`;

      steps.push(`Known: Run = ${fmt(run)} ${unit}, Slope Percentage = ${fmt(slopePct)}%`);
      steps.push(`Derived Formula for Rise: Rise = Run × (Slope % / 100)`);
      steps.push(`Calculation: Rise = ${fmt(run)} × (${fmt(slopePct)} / 100) = ${fmt(rise, 4)} ${unit}`);
      steps.push(`Angle: θ = arctan(${fmt(decimalSlope, 5)}) = ${fmt(angleDeg, 3)}°`);
      steps.push(`Sloped Distance: L = √(${fmt(rise, 4)}² + ${fmt(run)}²) = ${fmt(hypotenuse, 4)} ${unit}`);
      break;
    }

    // -------------------------------------------------------------
    // 4. STANDARD: RISE + ANGLE
    // -------------------------------------------------------------
    case 'rise_angle': {
      const rawRise = Number(input.rise);
      const rawAngle = Number(input.angleDeg);

      if (isNaN(rawRise)) throw new Error('Please enter a valid number for rise.');
      if (isNaN(rawAngle)) throw new Error('Please enter a valid number for slope angle.');
      if (rawAngle <= -90 || rawAngle >= 90) {
        throw new Error('Angle must be strictly between -90° and +90°. Exactly ±90° represents a purely vertical slope where run is zero and tangent is undefined.');
      }
      if (rawAngle === 0) {
        if (rawRise !== 0) throw new Error('A 0° angle represents a purely horizontal line (rise must be 0).');
        throw new Error('Please enter a non-zero angle.');
      }

      rise = rawRise;
      angleDeg = rawAngle;
      const angleRadVal = (angleDeg * Math.PI) / 180;
      decimalSlope = Math.tan(angleRadVal);
      slopePct = decimalSlope * 100;
      run = rise / decimalSlope;

      hypotenuse = Math.sqrt(rise * rise + run * run);
      pitchX = (Math.abs(rise) / Math.abs(run)) * 12;
      pitchStr = `${fmt(pitchX, 2)}:12`;

      steps.push(`Known: Rise = ${fmt(rise)} ${unit}, Angle θ = ${fmt(angleDeg)}°`);
      steps.push(`Trigonometric relation: tan(θ) = Rise / Run  ==>  Run = Rise / tan(θ)`);
      steps.push(`Calculation: Run = ${fmt(rise)} / tan(${fmt(angleDeg)}°) = ${fmt(rise)} / ${fmt(decimalSlope, 5)} = ${fmt(run, 4)} ${unit}`);
      steps.push(`Slope Percentage: Slope % = tan(${fmt(angleDeg)}°) × 100 = ${fmt(slopePct, 3)}%`);
      steps.push(`Sloped Distance: L = √(${fmt(rise)}² + ${fmt(run, 4)}²) = ${fmt(hypotenuse, 4)} ${unit}`);
      break;
    }

    // -------------------------------------------------------------
    // 5. STANDARD: RUN + ANGLE
    // -------------------------------------------------------------
    case 'run_angle': {
      const rawRun = Number(input.run);
      const rawAngle = Number(input.angleDeg);

      if (isNaN(rawRun)) throw new Error('Please enter a valid number for run.');
      if (isNaN(rawAngle)) throw new Error('Please enter a valid number for slope angle.');
      if (rawRun === 0) throw new Error('Horizontal run cannot be zero.');
      if (rawAngle <= -90 || rawAngle >= 90) {
        throw new Error('Angle must be strictly between -90° and +90°. Exactly ±90° represents a purely vertical slope.');
      }

      run = rawRun;
      angleDeg = rawAngle;
      const angleRadVal = (angleDeg * Math.PI) / 180;
      decimalSlope = Math.tan(angleRadVal);
      slopePct = decimalSlope * 100;
      rise = run * decimalSlope;

      hypotenuse = Math.sqrt(rise * rise + run * run);
      pitchX = (Math.abs(rise) / Math.abs(run)) * 12;
      pitchStr = `${fmt(pitchX, 2)}:12`;

      steps.push(`Known: Run = ${fmt(run)} ${unit}, Angle θ = ${fmt(angleDeg)}°`);
      steps.push(`Trigonometric relation: Rise = Run × tan(θ)`);
      steps.push(`Calculation: Rise = ${fmt(run)} × tan(${fmt(angleDeg)}°) = ${fmt(run)} × ${fmt(decimalSlope, 5)} = ${fmt(rise, 4)} ${unit}`);
      steps.push(`Slope Percentage: Slope % = tan(${fmt(angleDeg)}°) × 100 = ${fmt(slopePct, 3)}%`);
      steps.push(`Sloped Distance: L = √(${fmt(rise, 4)}² + ${fmt(run)}²) = ${fmt(hypotenuse, 4)} ${unit}`);
      break;
    }

    // -------------------------------------------------------------
    // 6. PERCENTAGE TO ANGLE
    // -------------------------------------------------------------
    case 'percentage_to_angle': {
      const rawSlopePct = Number(input.slopePercentage);
      if (isNaN(rawSlopePct)) throw new Error('Please enter a valid number for slope percentage.');

      slopePct = rawSlopePct;
      decimalSlope = slopePct / 100;
      const angleRadVal = Math.atan(decimalSlope);
      angleDeg = (angleRadVal * 180) / Math.PI;

      // Normalized run of 100 units
      run = 100;
      rise = slopePct;
      hypotenuse = Math.sqrt(rise * rise + run * run);
      pitchX = Math.abs(decimalSlope) * 12;
      pitchStr = `${fmt(pitchX, 2)}:12`;

      steps.push(`Given Slope Percentage: ${fmt(slopePct)}%`);
      steps.push(`Decimal Slope: m = Slope % / 100 = ${fmt(slopePct)} / 100 = ${fmt(decimalSlope, 5)}`);
      steps.push(`Angle Formula: θ = arctan(m) = arctan(${fmt(decimalSlope, 5)})`);
      steps.push(`Angle Result in Degrees: θ = ${fmt(angleDeg, 4)}° (${fmt(angleRadVal, 4)} radians)`);
      if (Math.abs(slopePct) === 100) {
        steps.push(`Key Landmark: 100% slope means Rise = Run, which corresponds to exactly 45.000°.`);
      } else if (Math.abs(slopePct) > 100) {
        steps.push(`Note on Steep Slopes: Slope percentage exceeds 100%, indicating an inclination steeper than 45°.`);
      }
      break;
    }

    // -------------------------------------------------------------
    // 7. ANGLE TO PERCENTAGE
    // -------------------------------------------------------------
    case 'angle_to_percentage': {
      const rawAngle = Number(input.angleDeg);
      if (isNaN(rawAngle)) throw new Error('Please enter a valid number for angle.');
      if (rawAngle <= -90 || rawAngle >= 90) {
        throw new Error('Angle must be strictly between -90° and +90°. At ±90°, tangent approaches infinity (vertical line).');
      }

      angleDeg = rawAngle;
      const angleRadVal = (angleDeg * Math.PI) / 180;
      decimalSlope = Math.tan(angleRadVal);
      slopePct = decimalSlope * 100;

      run = 100;
      rise = decimalSlope * 100;
      hypotenuse = Math.sqrt(rise * rise + run * run);
      pitchX = Math.abs(decimalSlope) * 12;
      pitchStr = `${fmt(pitchX, 2)}:12`;

      steps.push(`Given Angle in Degrees: ${fmt(angleDeg)}°`);
      steps.push(`Convert to Radians: θ_rad = ${fmt(angleDeg)} × (π / 180) = ${fmt(angleRadVal, 5)} rad`);
      steps.push(`Slope Percentage Formula: Slope % = tan(θ) × 100 = tan(${fmt(angleDeg)}°) × 100`);
      steps.push(`Calculation: tan(${fmt(angleRadVal, 5)}) × 100 = ${fmt(decimalSlope, 5)} × 100 = ${fmt(slopePct, 3)}%`);
      if (Math.abs(angleDeg) === 45) {
        steps.push(`Key Landmark: Exactly 45° angle produces a 100.000% slope (Rise = Run).`);
      } else if (Math.abs(angleDeg) > 45) {
        steps.push(`Angle > 45° results in a slope percentage greater than 100%.`);
      }
      break;
    }

    // -------------------------------------------------------------
    // 8. ROOF: PITCH X:12
    // -------------------------------------------------------------
    case 'roof_pitch': {
      const rawX = Number(input.pitchX);
      if (isNaN(rawX)) throw new Error('Please enter a valid number for roof rise per 12 units of run (X in X:12).');
      if (rawX < 0) throw new Error('Roof pitch rise X cannot be negative.');

      pitchX = rawX;
      pitchStr = `${fmt(pitchX, 2)}:12`;
      decimalSlope = pitchX / 12;
      slopePct = decimalSlope * 100;
      const angleRadVal = Math.atan(decimalSlope);
      angleDeg = (angleRadVal * 180) / Math.PI;

      // If user supplied a specific horizontal run, compute actual rafter length and rise
      const customRun = Number(input.run);
      if (!isNaN(customRun) && customRun > 0) {
        run = customRun;
        rise = run * decimalSlope;
      } else {
        run = 12;
        rise = pitchX;
      }
      hypotenuse = Math.sqrt(rise * rise + run * run);

      steps.push(`Roof Pitch Notation: ${pitchStr} (Rise of ${fmt(pitchX)} units for every 12 units of horizontal run)`);
      steps.push(`Roof Slope Ratio: m = X / 12 = ${fmt(pitchX)} / 12 = ${fmt(decimalSlope, 5)}`);
      steps.push(`Roof Slope Percentage: (${fmt(pitchX)} / 12) × 100 = ${fmt(slopePct, 3)}%`);
      steps.push(`Roof Slope Angle: arctan(${fmt(pitchX)} / 12) = ${fmt(angleDeg, 3)}°`);
      steps.push(`Rafter Length (for Run = ${fmt(run)} ${unit}): L = √(${fmt(rise, 3)}² + ${fmt(run, 3)}²) = ${fmt(hypotenuse, 3)} ${unit}`);
      break;
    }

    // -------------------------------------------------------------
    // 9. ROOF: RISE + RUN
    // -------------------------------------------------------------
    case 'roof_rise_run': {
      const rawRise = Number(input.rise);
      const rawRun = Number(input.run);

      if (isNaN(rawRise) || rawRise < 0) throw new Error('Roof rise must be a non-negative number.');
      if (isNaN(rawRun) || rawRun <= 0) throw new Error('Roof horizontal run must be a positive number greater than zero.');

      rise = rawRise;
      run = rawRun;
      decimalSlope = rise / run;
      slopePct = decimalSlope * 100;
      pitchX = decimalSlope * 12;
      pitchStr = `${fmt(pitchX, 2)}:12`;
      const angleRadVal = Math.atan(decimalSlope);
      angleDeg = (angleRadVal * 180) / Math.PI;
      hypotenuse = Math.sqrt(rise * rise + run * run);

      steps.push(`Measured Roof Dimensions: Rise = ${fmt(rise)} ${unit}, Horizontal Run = ${fmt(run)} ${unit}`);
      steps.push(`Equivalent Pitch (Rise per 12 units of run): X = (Rise / Run) × 12 = (${fmt(rise)} / ${fmt(run)}) × 12 = ${fmt(pitchX, 3)}`);
      steps.push(`Standard Pitch Designation: ${pitchStr}`);
      steps.push(`Roof Slope Percentage: (${fmt(rise)} / ${fmt(run)}) × 100 = ${fmt(slopePct, 3)}%`);
      steps.push(`Roof Slope Angle: arctan(${fmt(decimalSlope, 5)}) = ${fmt(angleDeg, 3)}°`);
      steps.push(`Actual Rafter Length: L = √(${fmt(rise)}² + ${fmt(run)}²) = ${fmt(hypotenuse, 3)} ${unit}`);
      break;
    }

    // -------------------------------------------------------------
    // 10. ROOF: HORIZONTAL RUN + RAFTER LENGTH
    // -------------------------------------------------------------
    case 'roof_rafter': {
      const rawRun = Number(input.run);
      const rawRafter = Number(input.rafterLength);

      if (isNaN(rawRun) || rawRun <= 0) throw new Error('Horizontal roof run must be greater than zero.');
      if (isNaN(rawRafter) || rawRafter <= 0) throw new Error('Sloped rafter length must be greater than zero.');
      if (rawRafter <= rawRun) {
        throw new Error('Sloped rafter length (hypotenuse) must be strictly greater than horizontal run.');
      }

      run = rawRun;
      hypotenuse = rawRafter;
      rise = Math.sqrt(hypotenuse * hypotenuse - run * run);
      decimalSlope = rise / run;
      slopePct = decimalSlope * 100;
      pitchX = decimalSlope * 12;
      pitchStr = `${fmt(pitchX, 2)}:12`;
      const angleRadVal = Math.atan(decimalSlope);
      angleDeg = (angleRadVal * 180) / Math.PI;

      steps.push(`Known Dimensions: Horizontal Run = ${fmt(run)} ${unit}, Sloped Rafter Length L = ${fmt(hypotenuse)} ${unit}`);
      steps.push(`Pythagorean Derivation for Vertical Rise: Rise = √(L² − Run²) = √(${fmt(hypotenuse)}² − ${fmt(run)}²) = ${fmt(rise, 3)} ${unit}`);
      steps.push(`Derived Pitch: X = (Rise / Run) × 12 = (${fmt(rise, 3)} / ${fmt(run)}) × 12 = ${fmt(pitchX, 3)} ==> ${pitchStr}`);
      steps.push(`Roof Slope Angle: arctan(${fmt(decimalSlope, 5)}) = ${fmt(angleDeg, 3)}°`);
      steps.push(`Roof Slope Percentage: ${fmt(slopePct, 3)}%`);
      break;
    }

    // -------------------------------------------------------------
    // 11. WHEELCHAIR RAMP: RISE + RUN
    // -------------------------------------------------------------
    case 'ramp_rise_run': {
      const rawRise = Number(input.rise);
      const rawRun = Number(input.run);

      if (isNaN(rawRise) || rawRise <= 0) throw new Error('Ramp vertical rise must be greater than zero.');
      if (isNaN(rawRun) || rawRun <= 0) throw new Error('Ramp horizontal run must be greater than zero.');

      rise = rawRise;
      run = rawRun;
      decimalSlope = rise / run;
      slopePct = decimalSlope * 100;
      const angleRadVal = Math.atan(decimalSlope);
      angleDeg = (angleRadVal * 180) / Math.PI;
      hypotenuse = Math.sqrt(rise * rise + run * run);
      pitchX = decimalSlope * 12;
      pitchStr = `${fmt(pitchX, 2)}:12`;

      steps.push(`Ramp Vertical Rise = ${fmt(rise)} ${unit}, Horizontal Run = ${fmt(run)} ${unit}`);
      steps.push(`Ramp Slope Ratio: 1 : ${fmt(run / rise, 2)}`);
      steps.push(`Ramp Slope Percentage: (${fmt(rise)} / ${fmt(run)}) × 100 = ${fmt(slopePct, 3)}%`);
      steps.push(`Ramp Slope Angle: arctan(${fmt(decimalSlope, 5)}) = ${fmt(angleDeg, 3)}°`);
      steps.push(`Ramp Surface Length (Tread Distance): L = √(${fmt(rise)}² + ${fmt(run)}²) = ${fmt(hypotenuse, 3)} ${unit}`);
      break;
    }

    // -------------------------------------------------------------
    // 12. WHEELCHAIR RAMP: RISE + TARGET SLOPE %
    // -------------------------------------------------------------
    case 'ramp_rise_target': {
      const rawRise = Number(input.rise);
      const rawTarget = Number(input.targetSlopePercentage);

      if (isNaN(rawRise) || rawRise <= 0) throw new Error('Ramp vertical rise must be greater than zero.');
      if (isNaN(rawTarget) || rawTarget <= 0) throw new Error('Target ramp slope percentage must be greater than zero.');

      rise = rawRise;
      slopePct = rawTarget;
      decimalSlope = slopePct / 100;
      run = (rise * 100) / slopePct;
      hypotenuse = Math.sqrt(rise * rise + run * run);
      const angleRadVal = Math.atan(decimalSlope);
      angleDeg = (angleRadVal * 180) / Math.PI;
      pitchX = decimalSlope * 12;
      pitchStr = `${fmt(pitchX, 2)}:12`;

      steps.push(`Known: Desired Vertical Rise = ${fmt(rise)} ${unit}, Target Slope = ${fmt(slopePct)}%`);
      steps.push(`Formula for Required Horizontal Run: Run = (Rise × 100) / Target Slope %`);
      steps.push(`Calculation: Run = (${fmt(rise)} × 100) / ${fmt(slopePct)} = ${fmt(run, 3)} ${unit}`);
      steps.push(`Ramp Surface Length (L): √(${fmt(rise)}² + ${fmt(run, 3)}²) = ${fmt(hypotenuse, 3)} ${unit}`);
      steps.push(`Ramp Angle: θ = arctan(${fmt(decimalSlope, 5)}) = ${fmt(angleDeg, 3)}°`);
      break;
    }

    // -------------------------------------------------------------
    // 13. WHEELCHAIR RAMP: RUN + TARGET SLOPE %
    // -------------------------------------------------------------
    case 'ramp_run_target': {
      const rawRun = Number(input.run);
      const rawTarget = Number(input.targetSlopePercentage);

      if (isNaN(rawRun) || rawRun <= 0) throw new Error('Available horizontal run must be greater than zero.');
      if (isNaN(rawTarget) || rawTarget <= 0) throw new Error('Target ramp slope percentage must be greater than zero.');

      run = rawRun;
      slopePct = rawTarget;
      decimalSlope = slopePct / 100;
      rise = (run * slopePct) / 100;
      hypotenuse = Math.sqrt(rise * rise + run * run);
      const angleRadVal = Math.atan(decimalSlope);
      angleDeg = (angleRadVal * 180) / Math.PI;
      pitchX = decimalSlope * 12;
      pitchStr = `${fmt(pitchX, 2)}:12`;

      steps.push(`Known: Available Horizontal Run = ${fmt(run)} ${unit}, Target Slope = ${fmt(slopePct)}%`);
      steps.push(`Formula for Maximum Allowable Rise: Rise = Run × (Target Slope % / 100)`);
      steps.push(`Calculation: Rise = ${fmt(run)} × (${fmt(slopePct)} / 100) = ${fmt(rise, 3)} ${unit}`);
      steps.push(`Ramp Surface Length (L): √(${fmt(rise, 3)}² + ${fmt(run)}²) = ${fmt(hypotenuse, 3)} ${unit}`);
      steps.push(`Ramp Angle: θ = arctan(${fmt(decimalSlope, 5)}) = ${fmt(angleDeg, 3)}°`);
      break;
    }

    default:
      throw new Error(`Unsupported slope calculation mode: ${mode}`);
  }

  const { ratio, normalized } = formatSlopeRatio(rise, run);
  const angleRad = (angleDeg * Math.PI) / 180;

  // Ramp advisory notes
  let rampAdaAdvisory: string | undefined;
  if (category === 'ramp') {
    if (slopePct <= 8.333) {
      rampAdaAdvisory = 'Slope is within the common 1:12 (8.33%) standard geometry guideline for wheelchair accessible ramps.';
    } else {
      rampAdaAdvisory = 'Slope exceeds 8.33% (1:12 ratio). Conventional accessibility standards typically require ramps to be 1:12 or gentler.';
    }
  }

  return {
    mode,
    category,
    unit,
    rise,
    run,
    decimalSlope,
    slopePercentage: slopePct,
    angleDeg,
    angleRad,
    slopeRatio: ratio,
    slopeRatioNormalized: normalized,
    hypotenuseLength: hypotenuse,
    pitchX,
    pitchString: pitchStr || `${fmt(pitchX, 2)}:12`,
    isDownhill: rise < 0,
    isSteep: Math.abs(angleDeg) > 45 || Math.abs(slopePct) > 100,
    rampAdaAdvisory,
    steps,
  };
}
