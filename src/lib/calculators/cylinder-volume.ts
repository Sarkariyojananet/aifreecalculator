/**
 * Pure Mathematical Engine for Cylinder Volume Calculations
 * 100% Client-Side, High-Precision, Cloudflare-Worker friendly.
 * Supports 7 calculation modes, multiple length & volume units,
 * step-by-step substitution derivations, surface area, and fluid capacity metrics.
 */

export type CylinderMode =
  | 'radius_height'
  | 'diameter_height'
  | 'find_height'
  | 'find_radius'
  | 'hollow_radius'
  | 'hollow_diameter'
  | 'oblique';

export type LengthUnit = 'mm' | 'cm' | 'm' | 'in' | 'ft' | 'yd';

export type VolumeUnit =
  | 'mm3'
  | 'cm3'
  | 'm3'
  | 'in3'
  | 'ft3'
  | 'yd3'
  | 'L'
  | 'mL'
  | 'us_gal'
  | 'imp_gal';

// Conversion factors to SI base (Meter)
export const LENGTH_TO_METERS: Record<LengthUnit, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1.0,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
};

// Conversion factors from SI base (Cubic Meter: m³)
export const VOLUME_FROM_M3: Record<VolumeUnit, number> = {
  m3: 1.0,
  cm3: 1000000.0,
  mm3: 1000000000.0,
  L: 1000.0,
  mL: 1000000.0,
  in3: 1.0 / 0.000016387064, // 0.0254³ exact
  ft3: 1.0 / 0.028316846592, // 0.3048³ exact
  yd3: 1.0 / 0.764554857984, // 0.9144³ exact
  us_gal: 1.0 / 0.003785411784, // 231 cu in exact
  imp_gal: 1.0 / 0.00454609, // 4.54609 L exact
};

export const LENGTH_UNIT_NAMES: Record<LengthUnit, string> = {
  mm: 'Millimeters (mm)',
  cm: 'Centimeters (cm)',
  m: 'Meters (m)',
  in: 'Inches (in)',
  ft: 'Feet (ft)',
  yd: 'Yards (yd)',
};

export const VOLUME_UNIT_NAMES: Record<VolumeUnit, string> = {
  mm3: 'Cubic Millimeters (mm³)',
  cm3: 'Cubic Centimeters (cm³)',
  m3: 'Cubic Meters (m³)',
  in3: 'Cubic Inches (in³)',
  ft3: 'Cubic Feet (ft³)',
  yd3: 'Cubic Yards (yd³)',
  L: 'Liters (L)',
  mL: 'Milliliters (mL)',
  us_gal: 'US Liquid Gallons (gal)',
  imp_gal: 'Imperial Gallons (UK gal)',
};

export const VOLUME_UNIT_SYMBOLS: Record<VolumeUnit, string> = {
  mm3: 'mm³',
  cm3: 'cm³',
  m3: 'm³',
  in3: 'in³',
  ft3: 'ft³',
  yd3: 'yd³',
  L: 'L',
  mL: 'mL',
  us_gal: 'US gal',
  imp_gal: 'Imp gal',
};

/**
 * Maps length unit to its natural cubic volume unit
 */
export const NATURAL_VOLUME_UNIT: Record<LengthUnit, VolumeUnit> = {
  mm: 'mm3',
  cm: 'cm3',
  m: 'm3',
  in: 'in3',
  ft: 'ft3',
  yd: 'yd3',
};

/** Convert length to meters */
export function lengthToMeters(val: number, unit: LengthUnit): number {
  return val * (LENGTH_TO_METERS[unit] || 1);
}

/** Convert length from meters to target unit */
export function metersToLength(val: number, unit: LengthUnit): number {
  return val / (LENGTH_TO_METERS[unit] || 1);
}

/** Convert volume to cubic meters */
export function volumeToM3(val: number, unit: VolumeUnit): number {
  return val / (VOLUME_FROM_M3[unit] || 1);
}

/** Convert volume from cubic meters to target unit */
export function m3ToVolume(val: number, unit: VolumeUnit): number {
  return val * (VOLUME_FROM_M3[unit] || 1);
}

/** Convert length between any two length units */
export function convertLength(val: number, from: LengthUnit, to: LengthUnit): number {
  const m = lengthToMeters(val, from);
  return metersToLength(m, to);
}

/** Convert volume between any two volume units */
export function convertVolume(val: number, from: VolumeUnit, to: VolumeUnit): number {
  const m3 = volumeToM3(val, from);
  return m3ToVolume(m3, to);
}

export interface CylinderInput {
  mode: CylinderMode;
  lengthUnit: LengthUnit;
  volumeUnit?: VolumeUnit;

  // Radius + Height
  radius?: number | string;
  height?: number | string;

  // Diameter + Height
  diameter?: number | string;

  // Reverse Height / Radius
  volume?: number | string;
  inputVolumeUnit?: VolumeUnit;

  // Hollow Cylinder
  outerRadius?: number | string;
  innerRadius?: number | string;
  outerDiameter?: number | string;
  innerDiameter?: number | string;

  // Oblique Cylinder
  obliqueInputType?: 'perpendicular_height' | 'slant_angle';
  slantLength?: number | string;
  slantAngleDeg?: number | string; // angle relative to base plane (0 < θ < 90)
}

export interface VolumeConversions {
  mm3: number;
  cm3: number;
  m3: number;
  in3: number;
  ft3: number;
  yd3: number;
  L: number;
  mL: number;
  us_gal: number;
  imp_gal: number;
}

export interface CylinderResult {
  mode: CylinderMode;
  lengthUnit: LengthUnit;
  displayVolumeUnit: VolumeUnit;

  // Primary geometric dimensions (in lengthUnit)
  radius: number;
  diameter: number;
  height: number; // perpendicular height

  // For hollow cylinders
  isHollow: boolean;
  outerRadius?: number;
  innerRadius?: number;
  outerDiameter?: number;
  innerDiameter?: number;
  wallThickness?: number;

  // For oblique cylinders
  isOblique: boolean;
  slantLength?: number;
  slantAngleDeg?: number;

  // Calculated volumes
  volume: number; // in displayVolumeUnit
  volumeM3: number;
  naturalVolume: number; // in NATURAL_VOLUME_UNIT[lengthUnit]
  naturalVolumeUnit: VolumeUnit;

  // Surface areas (in square lengthUnit, e.g. cm²)
  baseArea: number; // area of one base (or ring for hollow)
  topAndBottomArea: number; // 2 * baseArea
  lateralSurfaceArea: number; // 2 * π * r * h (or outer + inner for hollow)
  totalSurfaceArea: number; // lateral + topAndBottom
  surfaceToVolumeRatio: number; // totalSurfaceArea / naturalVolume

  // Conversions across all standard units
  volumeConversions: VolumeConversions;

  // Water weight metrics (at 4°C: 1 m³ = 1000 kg)
  waterWeightKg: number;
  waterWeightTons: number;
  waterWeightLbs: number;

  // Dynamic step-by-step mathematical breakdown
  steps: string[];
}

/**
 * Format a number cleanly for display
 */
export function formatNum(val: number, maxDecimals: number = 4): string {
  if (!Number.isFinite(val)) return '—';
  if (Math.abs(val) === 0) return '0';

  if (Math.abs(val) < 0.0001 && val !== 0) {
    return val.toExponential(3);
  }
  if (Math.abs(val) >= 1e8) {
    return val.toExponential(4);
  }

  const rounded = Number(val.toFixed(maxDecimals));
  return rounded.toLocaleString('en-US', {
    maximumFractionDigits: maxDecimals,
  });
}

/**
 * Core Pure Calculation Function
 */
export function calculateCylinderVolume(input: CylinderInput): CylinderResult {
  const { mode, lengthUnit } = input;
  const displayVolUnit: VolumeUnit = input.volumeUnit || NATURAL_VOLUME_UNIT[lengthUnit];
  const natVolUnit: VolumeUnit = NATURAL_VOLUME_UNIT[lengthUnit];

  let r = 0;
  let d = 0;
  let h = 0;
  let outerR = 0;
  let innerR = 0;
  let outerD = 0;
  let innerD = 0;
  let wallThickness = 0;
  let isHollow = false;
  let isOblique = false;
  let slantL = 0;
  let slantAngle = 0;

  const steps: string[] = [];

  switch (mode) {
    case 'radius_height': {
      const rawR = Number(input.radius);
      const rawH = Number(input.height);

      if (!input.radius || isNaN(rawR) || rawR <= 0) {
        throw new Error('Please enter a valid positive radius (r > 0).');
      }
      if (!input.height || isNaN(rawH) || rawH <= 0) {
        throw new Error('Please enter a valid positive height (h > 0).');
      }

      r = rawR;
      d = 2 * r;
      h = rawH;

      steps.push(`Mode: Standard Right Circular Cylinder (Radius + Height)`);
      steps.push(`Given: Radius r = ${r} ${lengthUnit}, Perpendicular Height h = ${h} ${lengthUnit}`);
      steps.push(`Diameter: d = 2 × r = 2 × ${r} = ${d} ${lengthUnit}`);
      steps.push(`Base Area: A_base = π × r² = π × (${r})² = ${formatNum(Math.PI * r * r)} ${lengthUnit}²`);
      steps.push(`Volume Formula: V = π × r² × h = Base Area × Height`);
      steps.push(`Substitution: V = π × (${r})² × ${h} = π × ${r * r} × ${h} = ${formatNum(Math.PI * r * r * h)} ${natVolUnit}`);
      break;
    }

    case 'diameter_height': {
      const rawD = Number(input.diameter);
      const rawH = Number(input.height);

      if (!input.diameter || isNaN(rawD) || rawD <= 0) {
        throw new Error('Please enter a valid positive diameter (d > 0).');
      }
      if (!input.height || isNaN(rawH) || rawH <= 0) {
        throw new Error('Please enter a valid positive height (h > 0).');
      }

      d = rawD;
      r = d / 2;
      h = rawH;

      steps.push(`Mode: Cylinder Volume from Diameter & Height`);
      steps.push(`Given: Diameter d = ${d} ${lengthUnit}, Height h = ${h} ${lengthUnit}`);
      steps.push(`Radius: r = d / 2 = ${d} / 2 = ${r} ${lengthUnit}`);
      steps.push(`Volume Formula: V = (π × d² × h) / 4 = π × r² × h`);
      steps.push(`Substitution: V = (π × ${d}² × ${h}) / 4 = (π × ${d * d} × ${h}) / 4 = ${formatNum((Math.PI * d * d * h) / 4)} ${natVolUnit}`);
      break;
    }

    case 'find_height': {
      const rawV = Number(input.volume);
      const rawR = Number(input.radius);
      const inVolUnit = input.inputVolumeUnit || natVolUnit;

      if (!input.volume || isNaN(rawV) || rawV <= 0) {
        throw new Error('Please enter a valid positive volume (V > 0).');
      }
      if (!input.radius || isNaN(rawR) || rawR <= 0) {
        throw new Error('Please enter a valid positive radius (r > 0).');
      }

      r = rawR;
      d = 2 * r;

      // Convert input volume to the natural volume unit of lengthUnit
      const volInNatUnit = convertVolume(rawV, inVolUnit, natVolUnit);
      h = volInNatUnit / (Math.PI * r * r);

      if (h <= 0 || !Number.isFinite(h)) {
        throw new Error('Invalid calculation result. Please check your numerical inputs.');
      }

      steps.push(`Mode: Reverse Calculation (Find Height from Volume & Radius)`);
      steps.push(`Given: Volume V = ${rawV} ${inVolUnit}, Radius r = ${r} ${lengthUnit}`);
      if (inVolUnit !== natVolUnit) {
        steps.push(`Unit Harmonization: V = ${formatNum(volInNatUnit)} ${natVolUnit}`);
      }
      steps.push(`Base Area: A_base = π × r² = π × (${r})² = ${formatNum(Math.PI * r * r)} ${lengthUnit}²`);
      steps.push(`Derivation: V = π × r² × h  ⟹  h = V / (π × r²)`);
      steps.push(`Substitution: h = ${formatNum(volInNatUnit)} / (π × ${r * r}) = ${formatNum(h)} ${lengthUnit}`);
      break;
    }

    case 'find_radius': {
      const rawV = Number(input.volume);
      const rawH = Number(input.height);
      const inVolUnit = input.inputVolumeUnit || natVolUnit;

      if (!input.volume || isNaN(rawV) || rawV <= 0) {
        throw new Error('Please enter a valid positive volume (V > 0).');
      }
      if (!input.height || isNaN(rawH) || rawH <= 0) {
        throw new Error('Please enter a valid positive height (h > 0).');
      }

      h = rawH;
      const volInNatUnit = convertVolume(rawV, inVolUnit, natVolUnit);
      r = Math.sqrt(volInNatUnit / (Math.PI * h));
      d = 2 * r;

      if (r <= 0 || !Number.isFinite(r)) {
        throw new Error('Invalid calculation result. Please check your numerical inputs.');
      }

      steps.push(`Mode: Reverse Calculation (Find Radius from Volume & Height)`);
      steps.push(`Given: Volume V = ${rawV} ${inVolUnit}, Height h = ${h} ${lengthUnit}`);
      if (inVolUnit !== natVolUnit) {
        steps.push(`Unit Harmonization: V = ${formatNum(volInNatUnit)} ${natVolUnit}`);
      }
      steps.push(`Derivation: V = π × r² × h  ⟹  r² = V / (π × h)  ⟹  r = √(V / (π × h))`);
      steps.push(`Substitution: r = √(${formatNum(volInNatUnit)} / (π × ${h})) = √(${formatNum(volInNatUnit / (Math.PI * h))}) = ${formatNum(r)} ${lengthUnit}`);
      steps.push(`Derived Diameter: d = 2 × r = 2 × ${formatNum(r)} = ${formatNum(d)} ${lengthUnit}`);
      break;
    }

    case 'hollow_radius': {
      const rawR = Number(input.outerRadius);
      const rawr = Number(input.innerRadius);
      const rawH = Number(input.height);

      if (!input.outerRadius || isNaN(rawR) || rawR <= 0) {
        throw new Error('Please enter a valid positive outer radius (R > 0).');
      }
      if (!input.innerRadius || isNaN(rawr) || rawr <= 0) {
        throw new Error('Please enter a valid positive inner radius (r > 0).');
      }
      if (rawR <= rawr) {
        throw new Error(`Outer radius (${rawR}) must be strictly greater than inner radius (${rawr}).`);
      }
      if (!input.height || isNaN(rawH) || rawH <= 0) {
        throw new Error('Please enter a valid positive height (h > 0).');
      }

      isHollow = true;
      outerR = rawR;
      innerR = rawr;
      outerD = 2 * outerR;
      innerD = 2 * innerR;
      wallThickness = outerR - innerR;
      r = outerR; // for general scaling
      d = outerD;
      h = rawH;

      steps.push(`Mode: Hollow Cylinder / Cylindrical Shell (Using Radii)`);
      steps.push(`Given: Outer Radius R = ${outerR} ${lengthUnit}, Inner Radius r = ${innerR} ${lengthUnit}, Height h = ${h} ${lengthUnit}`);
      steps.push(`Geometric Verification: R (${outerR}) > r (${innerR}) is valid. Wall Thickness t = R − r = ${formatNum(wallThickness)} ${lengthUnit}`);
      steps.push(`Cross-Sectional Ring Area: A_ring = π × (R² − r²) = π × (${outerR}² − ${innerR}²) = π × (${outerR * outerR} − ${innerR * innerR}) = ${formatNum(Math.PI * (outerR * outerR - innerR * innerR))} ${lengthUnit}²`);
      steps.push(`Shell Volume Formula: V = π × (R² − r²) × h = Ring Area × Height`);
      steps.push(`Substitution: V = π × (${outerR * outerR} − ${innerR * innerR}) × ${h} = π × ${outerR * outerR - innerR * innerR} × ${h} = ${formatNum(Math.PI * (outerR * outerR - innerR * innerR) * h)} ${natVolUnit}`);
      break;
    }

    case 'hollow_diameter': {
      const rawD = Number(input.outerDiameter);
      const rawd = Number(input.innerDiameter);
      const rawH = Number(input.height);

      if (!input.outerDiameter || isNaN(rawD) || rawD <= 0) {
        throw new Error('Please enter a valid positive outer diameter (D > 0).');
      }
      if (!input.innerDiameter || isNaN(rawd) || rawd <= 0) {
        throw new Error('Please enter a valid positive inner diameter (d > 0).');
      }
      if (rawD <= rawd) {
        throw new Error(`Outer diameter (${rawD}) must be strictly greater than inner diameter (${rawd}).`);
      }
      if (!input.height || isNaN(rawH) || rawH <= 0) {
        throw new Error('Please enter a valid positive height (h > 0).');
      }

      isHollow = true;
      outerD = rawD;
      innerD = rawd;
      outerR = outerD / 2;
      innerR = innerD / 2;
      wallThickness = (outerD - innerD) / 2;
      r = outerR;
      d = outerD;
      h = rawH;

      steps.push(`Mode: Hollow Cylinder / Pipe (Using Diameters)`);
      steps.push(`Given: Outer Diameter D = ${outerD} ${lengthUnit}, Inner Diameter d = ${innerD} ${lengthUnit}, Height h = ${h} ${lengthUnit}`);
      steps.push(`Converted Radii: R = D / 2 = ${outerR} ${lengthUnit}, r = d / 2 = ${innerR} ${lengthUnit}`);
      steps.push(`Wall Thickness: t = (D − d) / 2 = ${formatNum(wallThickness)} ${lengthUnit}`);
      steps.push(`Diameter Formula: V = [π × (D² − d²) × h] / 4 = π × (R² − r²) × h`);
      steps.push(`Substitution: V = [π × (${outerD}² − ${innerD}²) × ${h}] / 4 = [π × (${outerD * outerD - innerD * innerD}) × ${h}] / 4 = ${formatNum((Math.PI * (outerD * outerD - innerD * innerD) * h) / 4)} ${natVolUnit}`);
      break;
    }

    case 'oblique': {
      const rawR = Number(input.radius);
      if (!input.radius || isNaN(rawR) || rawR <= 0) {
        throw new Error('Please enter a valid positive base radius (r > 0).');
      }
      r = rawR;
      d = 2 * r;
      isOblique = true;

      const obliqueType = input.obliqueInputType || 'perpendicular_height';

      if (obliqueType === 'slant_angle') {
        const rawL = Number(input.slantLength);
        const rawAngle = Number(input.slantAngleDeg);

        if (!input.slantLength || isNaN(rawL) || rawL <= 0) {
          throw new Error('Please enter a valid positive slant side length (L > 0).');
        }
        if (!input.slantAngleDeg || isNaN(rawAngle) || rawAngle <= 0 || rawAngle >= 90) {
          throw new Error('Please enter a valid acute slant angle θ between 0° and 90° (non-inclusive).');
        }

        slantL = rawL;
        slantAngle = rawAngle;
        const angleRad = (slantAngle * Math.PI) / 180;
        h = slantL * Math.sin(angleRad);

        steps.push(`Mode: Oblique / Slanted Cylinder (from Slant Length & Inclination Angle)`);
        steps.push(`Given: Radius r = ${r} ${lengthUnit}, Slant Side Length L = ${slantL} ${lengthUnit}, Slant Angle θ = ${slantAngle}°`);
        steps.push(`CRITICAL GEOMETRY PRINCIPLE: Slant length L is NOT the height. Volume strictly depends on perpendicular height h.`);
        steps.push(`Trigonometric Height Derivation: h = L × sin(θ) = ${slantL} × sin(${slantAngle}°) = ${slantL} × ${formatNum(Math.sin(angleRad))} = ${formatNum(h)} ${lengthUnit}`);
        steps.push(`Volume Formula: V = π × r² × h = π × (${r})² × ${formatNum(h)} = ${formatNum(Math.PI * r * r * h)} ${natVolUnit}`);
      } else {
        const rawH = Number(input.height);
        if (!input.height || isNaN(rawH) || rawH <= 0) {
          throw new Error('Please enter a valid positive perpendicular height (h > 0).');
        }
        h = rawH;

        steps.push(`Mode: Oblique Cylinder (from Perpendicular Height)`);
        steps.push(`Given: Radius r = ${r} ${lengthUnit}, Perpendicular Height h = ${h} ${lengthUnit}`);
        steps.push(`Cavalieri’s Principle: Every parallel cross-section parallel to the base has area A = π × r² = ${formatNum(Math.PI * r * r)} ${lengthUnit}².`);
        steps.push(`Because the perpendicular separation between parallel bases is h, volume equals right cylinder volume:`);
        steps.push(`V = π × r² × h = π × (${r})² × ${h} = ${formatNum(Math.PI * r * r * h)} ${natVolUnit}`);
      }
      break;
    }

    default:
      throw new Error(`Unsupported cylinder mode: "${mode}"`);
  }

  // Calculate Natural Volume in (lengthUnit)³
  let naturalVol = 0;
  let baseArea = 0;
  let lateralArea = 0;
  let topAndBottomArea = 0;

  if (isHollow) {
    baseArea = Math.PI * (outerR * outerR - innerR * innerR);
    topAndBottomArea = 2 * baseArea;
    lateralArea = 2 * Math.PI * (outerR + innerR) * h; // outer lateral + inner lateral
    naturalVol = baseArea * h;
  } else {
    baseArea = Math.PI * r * r;
    topAndBottomArea = 2 * baseArea;
    lateralArea = 2 * Math.PI * r * h;
    naturalVol = baseArea * h;
  }

  const totalSurfaceArea = lateralArea + topAndBottomArea;
  const surfaceToVolumeRatio = naturalVol > 0 ? totalSurfaceArea / naturalVol : 0;

  // Convert natural volume to m³ for universal conversions
  const m3Factor = Math.pow(LENGTH_TO_METERS[lengthUnit], 3);
  const volumeM3 = naturalVol * m3Factor;

  // Compute Volume Conversions across all standard units
  const volumeConversions: VolumeConversions = {
    m3: volumeM3,
    cm3: volumeM3 * VOLUME_FROM_M3.cm3,
    mm3: volumeM3 * VOLUME_FROM_M3.mm3,
    in3: volumeM3 * VOLUME_FROM_M3.in3,
    ft3: volumeM3 * VOLUME_FROM_M3.ft3,
    yd3: volumeM3 * VOLUME_FROM_M3.yd3,
    L: volumeM3 * VOLUME_FROM_M3.L,
    mL: volumeM3 * VOLUME_FROM_M3.mL,
    us_gal: volumeM3 * VOLUME_FROM_M3.us_gal,
    imp_gal: volumeM3 * VOLUME_FROM_M3.imp_gal,
  };

  // Primary output volume in displayVolumeUnit
  const volume = volumeConversions[displayVolUnit];

  // Water weight metrics (1 m³ water at 4°C ≈ 1000 kg ≈ 1 metric ton ≈ 2204.62 lbs)
  const waterWeightKg = volumeM3 * 1000;
  const waterWeightTons = volumeM3;
  const waterWeightLbs = volumeM3 * 2204.62262;

  return {
    mode,
    lengthUnit,
    displayVolumeUnit: displayVolUnit,

    radius: r,
    diameter: d,
    height: h,

    isHollow,
    outerRadius: isHollow ? outerR : undefined,
    innerRadius: isHollow ? innerR : undefined,
    outerDiameter: isHollow ? outerD : undefined,
    innerDiameter: isHollow ? innerD : undefined,
    wallThickness: isHollow ? wallThickness : undefined,

    isOblique,
    slantLength: isOblique && slantL > 0 ? slantL : undefined,
    slantAngleDeg: isOblique && slantAngle > 0 ? slantAngle : undefined,

    volume,
    volumeM3,
    naturalVolume: naturalVol,
    naturalVolumeUnit: natVolUnit,

    baseArea,
    topAndBottomArea,
    lateralSurfaceArea: lateralArea,
    totalSurfaceArea,
    surfaceToVolumeRatio,

    volumeConversions,
    waterWeightKg,
    waterWeightTons,
    waterWeightLbs,

    steps,
  };
}
