/**
 * Pure Mathematical Engine for Comprehensive Volume Calculations
 * Supports 8 shape & application modes, high-precision unit conversions,
 * step-by-step mathematical substitution derivation, and fluid/material metrics.
 */

export type LengthUnit = 'mm' | 'cm' | 'm' | 'in' | 'ft';
export type VolumeUnit = 'm3' | 'L' | 'mL' | 'cm3' | 'mm3' | 'us_gal' | 'imp_gal' | 'ft3' | 'in3';

// Conversion factors to SI base (Meter)
export const LENGTH_CONVERSIONS_TO_METERS: Record<LengthUnit, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1.0,
  in: 0.0254,
  ft: 0.3048,
};

// Conversion factors from SI base (Cubic Meter: m³)
export const VOLUME_CONVERSIONS_FROM_M3: Record<VolumeUnit, number> = {
  m3: 1.0,
  L: 1000.0,
  mL: 1000000.0,
  cm3: 1000000.0,
  mm3: 1000000000.0,
  us_gal: 1.0 / 0.003785411784, // 231 cu in exact
  imp_gal: 1.0 / 0.00454609,     // 4.54609 L exact
  ft3: 1.0 / 0.028316846592,    // 0.3048³ exact
  in3: 1.0 / 0.000016387064,    // 0.0254³ exact
};

export const UNIT_LABELS: Record<VolumeUnit, string> = {
  m3: 'Cubic Meters (m³)',
  L: 'Liters (L)',
  mL: 'Milliliters (mL)',
  cm3: 'Cubic Centimeters (cm³)',
  mm3: 'Cubic Millimeters (mm³)',
  us_gal: 'US Liquid Gallons (gal)',
  imp_gal: 'Imperial Gallons (UK gal)',
  ft3: 'Cubic Feet (ft³)',
  in3: 'Cubic Inches (in³)',
};

export const UNIT_SHORT_SYMBOLS: Record<VolumeUnit, string> = {
  m3: 'm³',
  L: 'L',
  mL: 'mL',
  cm3: 'cm³',
  mm3: 'mm³',
  us_gal: 'US gal',
  imp_gal: 'Imp gal',
  ft3: 'ft³',
  in3: 'in³',
};

/** Convert length to meters */
export function toMeters(value: number, unit: LengthUnit): number {
  if (value < 0 || !Number.isFinite(value)) return 0;
  return value * (LENGTH_CONVERSIONS_TO_METERS[unit] || 1);
}

/** Convert volume from cubic meters to target unit */
export function fromCubicMeters(m3Val: number, targetUnit: VolumeUnit): number {
  if (m3Val < 0 || !Number.isFinite(m3Val)) return 0;
  return m3Val * (VOLUME_CONVERSIONS_FROM_M3[targetUnit] || 1);
}

/** Convert volume from source unit to target unit */
export function convertVolume(val: number, fromUnit: VolumeUnit, toUnit: VolumeUnit): number {
  if (val < 0 || !Number.isFinite(val)) return 0;
  const m3 = val / (VOLUME_CONVERSIONS_FROM_M3[fromUnit] || 1);
  return m3 * (VOLUME_CONVERSIONS_FROM_M3[toUnit] || 1);
}

export interface VolumeEquivalents {
  m3: number;
  liters: number;
  milliliters: number;
  cm3: number;
  mm3: number;
  usGallons: number;
  imperialGallons: number;
  cubicFeet: number;
  cubicInches: number;
  waterWeightKg: number;
  waterWeightMetricTons: number;
  waterWeightLbs: number;
}

export function calculateEquivalents(volumeM3: number): VolumeEquivalents {
  const v = Math.max(0, volumeM3);
  return {
    m3: v,
    liters: v * VOLUME_CONVERSIONS_FROM_M3.L,
    milliliters: v * VOLUME_CONVERSIONS_FROM_M3.mL,
    cm3: v * VOLUME_CONVERSIONS_FROM_M3.cm3,
    mm3: v * VOLUME_CONVERSIONS_FROM_M3.mm3,
    usGallons: v * VOLUME_CONVERSIONS_FROM_M3.us_gal,
    imperialGallons: v * VOLUME_CONVERSIONS_FROM_M3.imp_gal,
    cubicFeet: v * VOLUME_CONVERSIONS_FROM_M3.ft3,
    cubicInches: v * VOLUME_CONVERSIONS_FROM_M3.in3,
    waterWeightKg: v * 1000.0,
    waterWeightMetricTons: v,
    waterWeightLbs: v * 1000.0 * 2.20462262185,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. RECTANGULAR TANK / BOX
// ─────────────────────────────────────────────────────────────────────────────
export interface RectangularVolumeInput {
  length: number;
  lengthUnit: LengthUnit;
  width: number;
  widthUnit: LengthUnit;
  height: number;
  heightUnit: LengthUnit;
  outputUnit?: VolumeUnit;
}

export interface RectangularVolumeResult {
  volumeM3: number;
  primaryVolume: number;
  primaryUnit: VolumeUnit;
  equivalents: VolumeEquivalents;
  formula: string;
  steps: string[];
}

export function calculateRectangularVolume(input: RectangularVolumeInput): RectangularVolumeResult {
  const { length, lengthUnit, width, widthUnit, height, heightUnit, outputUnit = 'm3' } = input;
  if (length <= 0 || width <= 0 || height <= 0) {
    throw new Error('All dimensions (length, width, height) must be positive numbers greater than 0.');
  }

  const lM = toMeters(length, lengthUnit);
  const wM = toMeters(width, widthUnit);
  const hM = toMeters(height, heightUnit);

  const volumeM3 = lM * wM * hM;
  const primaryVolume = fromCubicMeters(volumeM3, outputUnit);
  const equivalents = calculateEquivalents(volumeM3);

  const steps = [
    `Formula: Volume = Length × Width × Height`,
    `Input values: ${length} ${lengthUnit} × ${width} ${widthUnit} × ${height} ${heightUnit}`,
    `Converted to standard meters: ${lM.toFixed(4).replace(/\.?0+$/, '')} m × ${wM.toFixed(4).replace(/\.?0+$/, '')} m × ${hM.toFixed(4).replace(/\.?0+$/, '')} m`,
    `Volume in m³ = ${volumeM3.toFixed(6).replace(/\.?0+$/, '')} m³`,
    `Converted to ${UNIT_LABELS[outputUnit]}: ${primaryVolume.toLocaleString('en-US', { maximumFractionDigits: 4 })} ${UNIT_SHORT_SYMBOLS[outputUnit]}`,
  ];

  return {
    volumeM3,
    primaryVolume,
    primaryUnit: outputUnit,
    equivalents,
    formula: 'V = L × W × H',
    steps,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. CYLINDER / CYLINDRICAL TANK
// ─────────────────────────────────────────────────────────────────────────────
export interface CylinderVolumeInput {
  dimensionType: 'radius' | 'diameter';
  dimensionValue: number;
  dimensionUnit: LengthUnit;
  height: number;
  heightUnit: LengthUnit;
  outputUnit?: VolumeUnit;
}

export interface CylinderVolumeResult {
  volumeM3: number;
  primaryVolume: number;
  primaryUnit: VolumeUnit;
  radiusMeters: number;
  heightMeters: number;
  equivalents: VolumeEquivalents;
  formula: string;
  steps: string[];
}

export function calculateCylinderVolume(input: CylinderVolumeInput): CylinderVolumeResult {
  const { dimensionType, dimensionValue, dimensionUnit, height, heightUnit, outputUnit = 'm3' } = input;
  if (dimensionValue <= 0 || height <= 0) {
    throw new Error(`The ${dimensionType} and height must be positive numbers greater than 0.`);
  }

  const rawMeters = toMeters(dimensionValue, dimensionUnit);
  const radiusMeters = dimensionType === 'diameter' ? rawMeters / 2 : rawMeters;
  const heightMeters = toMeters(height, heightUnit);

  const volumeM3 = Math.PI * Math.pow(radiusMeters, 2) * heightMeters;
  const primaryVolume = fromCubicMeters(volumeM3, outputUnit);
  const equivalents = calculateEquivalents(volumeM3);

  const formula = dimensionType === 'radius' ? 'V = π × r² × h' : 'V = π × (d / 2)² × h';
  const steps = [
    `Formula: ${formula}`,
    dimensionType === 'diameter'
      ? `Given Diameter = ${dimensionValue} ${dimensionUnit} → Radius = ${(dimensionValue / 2).toFixed(4).replace(/\.?0+$/, '')} ${dimensionUnit}`
      : `Given Radius = ${dimensionValue} ${dimensionUnit}`,
    `Converted to standard meters: Radius = ${radiusMeters.toFixed(4).replace(/\.?0+$/, '')} m, Height = ${heightMeters.toFixed(4).replace(/\.?0+$/, '')} m`,
    `Calculation: π × (${radiusMeters.toFixed(4).replace(/\.?0+$/, '')})² × ${heightMeters.toFixed(4).replace(/\.?0+$/, '')}`,
    `Volume in m³ = ${volumeM3.toFixed(6).replace(/\.?0+$/, '')} m³`,
    `Converted to ${UNIT_LABELS[outputUnit]}: ${primaryVolume.toLocaleString('en-US', { maximumFractionDigits: 4 })} ${UNIT_SHORT_SYMBOLS[outputUnit]}`,
  ];

  return {
    volumeM3,
    primaryVolume,
    primaryUnit: outputUnit,
    radiusMeters,
    heightMeters,
    equivalents,
    formula,
    steps,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. PIPE VOLUME CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────
export interface PipeVolumeInput {
  inputMode: 'inner_diameter' | 'outer_and_wall';
  innerDiameter?: number;
  innerDiameterUnit?: LengthUnit;
  outerDiameter?: number;
  outerDiameterUnit?: LengthUnit;
  wallThickness?: number;
  wallThicknessUnit?: LengthUnit;
  length: number;
  lengthUnit: LengthUnit;
  outputUnit?: VolumeUnit;
}

export interface PipeVolumeResult {
  internalVolumeM3: number;
  primaryInternalVolume: number;
  primaryUnit: VolumeUnit;
  materialVolumeM3: number | null;
  primaryMaterialVolume: number | null;
  innerDiameterMeters: number;
  outerDiameterMeters: number | null;
  lengthMeters: number;
  volumePerMeterLiters: number;
  volumePerFootLiters: number;
  equivalents: VolumeEquivalents;
  formula: string;
  steps: string[];
}

export function calculatePipeVolume(input: PipeVolumeInput): PipeVolumeResult {
  const {
    inputMode,
    innerDiameter = 0,
    innerDiameterUnit = 'mm',
    outerDiameter = 0,
    outerDiameterUnit = 'mm',
    wallThickness = 0,
    wallThicknessUnit = 'mm',
    length,
    lengthUnit,
    outputUnit = 'L',
  } = input;

  if (length <= 0) {
    throw new Error('Pipe length must be greater than 0.');
  }

  const lengthMeters = toMeters(length, lengthUnit);
  let innerDiaM: number;
  let outerDiaM: number | null = null;
  let wallThicknessM: number = 0;

  if (inputMode === 'inner_diameter') {
    if (innerDiameter <= 0) {
      throw new Error('Internal diameter must be greater than 0.');
    }
    innerDiaM = toMeters(innerDiameter, innerDiameterUnit);

    // If wall thickness provided optionally
    if (wallThickness > 0) {
      wallThicknessM = toMeters(wallThickness, wallThicknessUnit);
      outerDiaM = innerDiaM + 2 * wallThicknessM;
    }
  } else {
    // outer_and_wall
    if (outerDiameter <= 0) {
      throw new Error('Outer diameter must be greater than 0.');
    }
    if (wallThickness <= 0) {
      throw new Error('Wall thickness must be greater than 0.');
    }
    outerDiaM = toMeters(outerDiameter, outerDiameterUnit);
    wallThicknessM = toMeters(wallThickness, wallThicknessUnit);
    innerDiaM = outerDiaM - 2 * wallThicknessM;
    if (innerDiaM <= 0) {
      throw new Error('Wall thickness is too thick: Outer diameter must be strictly greater than 2 × Wall Thickness.');
    }
  }

  const innerRadiusM = innerDiaM / 2;
  const internalVolumeM3 = Math.PI * Math.pow(innerRadiusM, 2) * lengthMeters;
  const primaryInternalVolume = fromCubicMeters(internalVolumeM3, outputUnit);

  let materialVolumeM3: number | null = null;
  let primaryMaterialVolume: number | null = null;

  if (outerDiaM !== null) {
    const outerRadiusM = outerDiaM / 2;
    const totalCylinderM3 = Math.PI * Math.pow(outerRadiusM, 2) * lengthMeters;
    materialVolumeM3 = totalCylinderM3 - internalVolumeM3;
    primaryMaterialVolume = fromCubicMeters(materialVolumeM3, outputUnit);
  }

  const equivalents = calculateEquivalents(internalVolumeM3);
  const volumePerMeterLiters = (internalVolumeM3 * 1000) / lengthMeters;
  const lengthFeet = lengthMeters / 0.3048;
  const volumePerFootLiters = (internalVolumeM3 * 1000) / lengthFeet;

  const formula = 'V_internal = π × (ID / 2)² × L';
  const steps = [
    `Formula: Internal Capacity = π × (Internal Diameter / 2)² × Length`,
    `Internal Diameter (ID): ${innerDiaM.toFixed(4).replace(/\.?0+$/, '')} m (Radius = ${innerRadiusM.toFixed(4).replace(/\.?0+$/, '')} m)`,
    `Pipe Length: ${lengthMeters.toFixed(4).replace(/\.?0+$/, '')} m`,
    `Calculation: π × (${innerRadiusM.toFixed(4).replace(/\.?0+$/, '')} m)² × ${lengthMeters.toFixed(4).replace(/\.?0+$/, '')} m`,
    `Internal Capacity = ${internalVolumeM3.toFixed(6).replace(/\.?0+$/, '')} m³ = ${(internalVolumeM3 * 1000).toFixed(3)} Liters`,
    `Linear Metric Capacity: ${volumePerMeterLiters.toFixed(3)} Liters per linear meter`,
  ];

  if (materialVolumeM3 !== null && outerDiaM !== null) {
    steps.push(
      `Pipe Material Volume: Outer Cylinder (${(Math.PI * Math.pow(outerDiaM / 2, 2) * lengthMeters).toFixed(5)} m³) − Inner Lumen (${internalVolumeM3.toFixed(5)} m³) = ${materialVolumeM3.toFixed(5)} m³`
    );
  }

  return {
    internalVolumeM3,
    primaryInternalVolume,
    primaryUnit: outputUnit,
    materialVolumeM3,
    primaryMaterialVolume,
    innerDiameterMeters: innerDiaM,
    outerDiameterMeters: outerDiaM,
    lengthMeters,
    volumePerMeterLiters,
    volumePerFootLiters,
    equivalents,
    formula,
    steps,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. SWIMMING POOL VOLUME
// ─────────────────────────────────────────────────────────────────────────────
export type PoolShape = 'rectangular' | 'circular' | 'oval';
export type PoolDepthMode = 'average' | 'shallow_deep';

export interface PoolVolumeInput {
  shape: PoolShape;
  length?: number;
  lengthUnit?: LengthUnit;
  width?: number;
  widthUnit?: LengthUnit;
  diameter?: number;
  diameterUnit?: LengthUnit;
  depthMode: PoolDepthMode;
  averageDepth?: number;
  averageDepthUnit?: LengthUnit;
  shallowDepth?: number;
  shallowDepthUnit?: LengthUnit;
  deepDepth?: number;
  deepDepthUnit?: LengthUnit;
  outputUnit?: VolumeUnit;
}

export interface PoolVolumeResult {
  volumeM3: number;
  primaryVolume: number;
  primaryUnit: VolumeUnit;
  calculatedAverageDepthM: number;
  surfaceAreaM2: number;
  equivalents: VolumeEquivalents;
  formula: string;
  steps: string[];
}

export function calculatePoolVolume(input: PoolVolumeInput): PoolVolumeResult {
  const {
    shape,
    length = 0,
    lengthUnit = 'm',
    width = 0,
    widthUnit = 'm',
    diameter = 0,
    diameterUnit = 'm',
    depthMode,
    averageDepth = 0,
    averageDepthUnit = 'm',
    shallowDepth = 0,
    shallowDepthUnit = 'm',
    deepDepth = 0,
    deepDepthUnit = 'm',
    outputUnit = 'L',
  } = input;

  let avgDepthM: number;
  let depthExplanation: string;

  if (depthMode === 'average') {
    if (averageDepth <= 0) throw new Error('Average pool depth must be greater than 0.');
    avgDepthM = toMeters(averageDepth, averageDepthUnit);
    depthExplanation = `Direct average depth = ${averageDepth} ${averageDepthUnit} (${avgDepthM.toFixed(3)} m)`;
  } else {
    if (shallowDepth <= 0 || deepDepth <= 0) {
      throw new Error('Both shallow depth and deep depth must be greater than 0.');
    }
    const shallowM = toMeters(shallowDepth, shallowDepthUnit);
    const deepM = toMeters(deepDepth, deepDepthUnit);
    avgDepthM = (shallowM + deepM) / 2;
    depthExplanation = `Average Depth = (${shallowDepth} ${shallowDepthUnit} + ${deepDepth} ${deepDepthUnit}) / 2 = ${avgDepthM.toFixed(3)} m (assuming standard gradual linear bottom slope)`;
  }

  let surfaceAreaM2: number;
  let formula: string;
  let calculationStep: string;

  if (shape === 'rectangular') {
    if (length <= 0 || width <= 0) throw new Error('Pool length and width must be greater than 0.');
    const lM = toMeters(length, lengthUnit);
    const wM = toMeters(width, widthUnit);
    surfaceAreaM2 = lM * wM;
    formula = 'V = Length × Width × Average Depth';
    calculationStep = `${lM.toFixed(3)} m × ${wM.toFixed(3)} m × ${avgDepthM.toFixed(3)} m`;
  } else if (shape === 'circular') {
    if (diameter <= 0) throw new Error('Pool diameter must be greater than 0.');
    const dM = toMeters(diameter, diameterUnit);
    const rM = dM / 2;
    surfaceAreaM2 = Math.PI * Math.pow(rM, 2);
    formula = 'V = π × (Diameter / 2)² × Average Depth';
    calculationStep = `π × (${rM.toFixed(3)} m)² × ${avgDepthM.toFixed(3)} m`;
  } else {
    // oval
    if (length <= 0 || width <= 0) throw new Error('Oval pool major length and minor width must be greater than 0.');
    const lM = toMeters(length, lengthUnit);
    const wM = toMeters(width, widthUnit);
    surfaceAreaM2 = Math.PI * (lM / 2) * (wM / 2);
    formula = 'V = π × (Length / 2) × (Width / 2) × Average Depth';
    calculationStep = `π × ${(lM / 2).toFixed(3)} m × ${(wM / 2).toFixed(3)} m × ${avgDepthM.toFixed(3)} m`;
  }

  const volumeM3 = surfaceAreaM2 * avgDepthM;
  const primaryVolume = fromCubicMeters(volumeM3, outputUnit);
  const equivalents = calculateEquivalents(volumeM3);

  const steps = [
    `Pool Shape: ${shape.charAt(0).toUpperCase() + shape.slice(1)} Pool`,
    `Formula: ${formula}`,
    depthExplanation,
    `Surface Area: ${surfaceAreaM2.toFixed(3)} m²`,
    `Volume Calculation: ${calculationStep}`,
    `Total Water Volume: ${volumeM3.toFixed(4).replace(/\.?0+$/, '')} m³ = ${(volumeM3 * 1000).toLocaleString('en-US', { maximumFractionDigits: 1 })} Liters`,
    `US Gallons: ${(volumeM3 * VOLUME_CONVERSIONS_FROM_M3.us_gal).toLocaleString('en-US', { maximumFractionDigits: 0 })} gal (approx)`,
    `Note: Bottom slope approximation assumes continuous gradual incline between ends.`,
  ];

  return {
    volumeM3,
    primaryVolume,
    primaryUnit: outputUnit,
    calculatedAverageDepthM: avgDepthM,
    surfaceAreaM2,
    equivalents,
    formula,
    steps,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. SPHERE VOLUME CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────
export interface SphereVolumeInput {
  dimensionType: 'radius' | 'diameter';
  dimensionValue: number;
  dimensionUnit: LengthUnit;
  outputUnit?: VolumeUnit;
}

export interface SphereVolumeResult {
  volumeM3: number;
  primaryVolume: number;
  primaryUnit: VolumeUnit;
  radiusMeters: number;
  surfaceAreaM2: number;
  equivalents: VolumeEquivalents;
  formula: string;
  steps: string[];
}

export function calculateSphereVolume(input: SphereVolumeInput): SphereVolumeResult {
  const { dimensionType, dimensionValue, dimensionUnit, outputUnit = 'm3' } = input;
  if (dimensionValue <= 0) {
    throw new Error(`Sphere ${dimensionType} must be greater than 0.`);
  }

  const rawM = toMeters(dimensionValue, dimensionUnit);
  const radiusMeters = dimensionType === 'diameter' ? rawM / 2 : rawM;

  const volumeM3 = (4.0 / 3.0) * Math.PI * Math.pow(radiusMeters, 3);
  const surfaceAreaM2 = 4.0 * Math.PI * Math.pow(radiusMeters, 2);
  const primaryVolume = fromCubicMeters(volumeM3, outputUnit);
  const equivalents = calculateEquivalents(volumeM3);

  const formula = 'V = (4 / 3) × π × r³';
  const steps = [
    `Formula: Volume = (4 / 3) × π × Radius³`,
    dimensionType === 'diameter'
      ? `Given Diameter = ${dimensionValue} ${dimensionUnit} → Radius = ${(dimensionValue / 2).toFixed(4).replace(/\.?0+$/, '')} ${dimensionUnit}`
      : `Given Radius = ${dimensionValue} ${dimensionUnit}`,
    `Converted to standard meters: Radius = ${radiusMeters.toFixed(5).replace(/\.?0+$/, '')} m`,
    `Calculation: (4 / 3) × π × (${radiusMeters.toFixed(5).replace(/\.?0+$/, '')})³`,
    `Total Volume = ${volumeM3.toFixed(7).replace(/\.?0+$/, '')} m³`,
    `Surface Area = ${surfaceAreaM2.toFixed(5).replace(/\.?0+$/, '')} m²`,
    `Converted to ${UNIT_LABELS[outputUnit]}: ${primaryVolume.toLocaleString('en-US', { maximumFractionDigits: 5 })} ${UNIT_SHORT_SYMBOLS[outputUnit]}`,
  ];

  return {
    volumeM3,
    primaryVolume,
    primaryUnit: outputUnit,
    radiusMeters,
    surfaceAreaM2,
    equivalents,
    formula,
    steps,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. CONE VOLUME CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────
export interface ConeVolumeInput {
  dimensionType: 'radius' | 'diameter';
  dimensionValue: number;
  dimensionUnit: LengthUnit;
  height: number;
  heightUnit: LengthUnit;
  outputUnit?: VolumeUnit;
}

export interface ConeVolumeResult {
  volumeM3: number;
  primaryVolume: number;
  primaryUnit: VolumeUnit;
  radiusMeters: number;
  heightMeters: number;
  slantHeightMeters: number;
  baseAreaM2: number;
  equivalents: VolumeEquivalents;
  formula: string;
  steps: string[];
}

export function calculateConeVolume(input: ConeVolumeInput): ConeVolumeResult {
  const { dimensionType, dimensionValue, dimensionUnit, height, heightUnit, outputUnit = 'm3' } = input;
  if (dimensionValue <= 0 || height <= 0) {
    throw new Error(`The cone ${dimensionType} and height must be positive numbers greater than 0.`);
  }

  const rawM = toMeters(dimensionValue, dimensionUnit);
  const radiusMeters = dimensionType === 'diameter' ? rawM / 2 : rawM;
  const heightMeters = toMeters(height, heightUnit);

  const volumeM3 = (1.0 / 3.0) * Math.PI * Math.pow(radiusMeters, 2) * heightMeters;
  const slantHeightMeters = Math.sqrt(Math.pow(radiusMeters, 2) + Math.pow(heightMeters, 2));
  const baseAreaM2 = Math.PI * Math.pow(radiusMeters, 2);
  const primaryVolume = fromCubicMeters(volumeM3, outputUnit);
  const equivalents = calculateEquivalents(volumeM3);

  const formula = 'V = (1 / 3) × π × r² × h';
  const steps = [
    `Formula: Volume = (1 / 3) × π × Radius² × Height`,
    dimensionType === 'diameter'
      ? `Given Diameter = ${dimensionValue} ${dimensionUnit} → Radius = ${(dimensionValue / 2).toFixed(4).replace(/\.?0+$/, '')} ${dimensionUnit}`
      : `Given Radius = ${dimensionValue} ${dimensionUnit}`,
    `Converted to standard meters: Radius = ${radiusMeters.toFixed(4).replace(/\.?0+$/, '')} m, Height = ${heightMeters.toFixed(4).replace(/\.?0+$/, '')} m`,
    `Calculation: (1 / 3) × π × (${radiusMeters.toFixed(4).replace(/\.?0+$/, '')})² × ${heightMeters.toFixed(4).replace(/\.?0+$/, '')}`,
    `Slant Height (Pythagoras: √(r² + h²)): ${slantHeightMeters.toFixed(4).replace(/\.?0+$/, '')} m`,
    `Volume in m³ = ${volumeM3.toFixed(6).replace(/\.?0+$/, '')} m³`,
    `Converted to ${UNIT_LABELS[outputUnit]}: ${primaryVolume.toLocaleString('en-US', { maximumFractionDigits: 4 })} ${UNIT_SHORT_SYMBOLS[outputUnit]}`,
  ];

  return {
    volumeM3,
    primaryVolume,
    primaryUnit: outputUnit,
    radiusMeters,
    heightMeters,
    slantHeightMeters,
    baseAreaM2,
    equivalents,
    formula,
    steps,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. PROSTATE VOLUME CALCULATOR (MEDICAL MEASUREMENT ESTIMATION)
// ─────────────────────────────────────────────────────────────────────────────
export type ProstateUnit = 'cm' | 'mm';

export interface ProstateVolumeInput {
  length: number;
  lengthUnit: ProstateUnit;
  width: number;
  widthUnit: ProstateUnit;
  height: number; // AP (Antero-Posterior) Diameter
  heightUnit: ProstateUnit;
}

export interface ProstateVolumeResult {
  volumeML: number; // in mL (or cc, 1 cc = 1 mL)
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  volumeM3: number;
  formula: string;
  disclaimer: string;
  steps: string[];
}

export const PROSTATE_DISCLAIMER =
  'This calculator provides an estimated volume based on measurements entered by the user and is not a substitute for professional medical interpretation.';

export function calculateProstateVolume(input: ProstateVolumeInput): ProstateVolumeResult {
  const { length, lengthUnit, width, widthUnit, height, heightUnit } = input;
  if (length <= 0 || width <= 0 || height <= 0) {
    throw new Error('All prostate dimensions (length, width, height/AP diameter) must be greater than 0.');
  }

  // Convert to centimeters internally
  const lengthCm = lengthUnit === 'mm' ? length / 10.0 : length;
  const widthCm = widthUnit === 'mm' ? width / 10.0 : width;
  const heightCm = heightUnit === 'mm' ? height / 10.0 : height;

  // Standard prolate ellipsoid formula: Volume = Length × Width × Height × (π / 6) ≈ L × W × H × 0.52
  const volumeML = lengthCm * widthCm * heightCm * 0.52;
  const volumeM3 = volumeML * 1e-6; // 1 mL = 1 cm³ = 10⁻⁶ m³

  const steps = [
    `Formula: Prostate Volume = Length × Width × Height × 0.52 (Standard Prolate Ellipsoid Approximation)`,
    `Dimensions in centimeters: Length = ${lengthCm.toFixed(2)} cm, Width = ${widthCm.toFixed(2)} cm, Height (AP) = ${heightCm.toFixed(2)} cm`,
    `Calculation: ${lengthCm.toFixed(2)} cm × ${widthCm.toFixed(2)} cm × ${heightCm.toFixed(2)} cm × 0.52`,
    `Estimated Volume = ${volumeML.toFixed(2)} mL (cc)`,
    `Medical Notice: ${PROSTATE_DISCLAIMER}`,
  ];

  return {
    volumeML,
    lengthCm,
    widthCm,
    heightCm,
    volumeM3,
    formula: 'V = L × W × H × 0.52',
    disclaimer: PROSTATE_DISCLAIMER,
    steps,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// UNIFIED DISPATCHER (For test harness & automated execution)
// ─────────────────────────────────────────────────────────────────────────────
export type VolumeMode = 'rectangular' | 'cylinder' | 'pipe' | 'pool' | 'sphere' | 'cone' | 'prostate';

export interface ComprehensiveVolumeParams {
  mode: VolumeMode;
  rectangular?: Partial<RectangularVolumeInput>;
  cylinder?: Partial<CylinderVolumeInput>;
  pipe?: Partial<PipeVolumeInput>;
  pool?: Partial<PoolVolumeInput>;
  sphere?: Partial<SphereVolumeInput>;
  cone?: Partial<ConeVolumeInput>;
  prostate?: Partial<ProstateVolumeInput>;
}

export function calculateVolumeComprehensive(params: ComprehensiveVolumeParams) {
  const { mode } = params;
  switch (mode) {
    case 'rectangular': {
      const p = params.rectangular || {};
      return calculateRectangularVolume({
        length: p.length ?? 5,
        lengthUnit: p.lengthUnit ?? 'm',
        width: p.width ?? 2,
        widthUnit: p.widthUnit ?? 'm',
        height: p.height ?? 1.5,
        heightUnit: p.heightUnit ?? 'm',
        outputUnit: p.outputUnit ?? 'm3',
      });
    }
    case 'cylinder': {
      const p = params.cylinder || {};
      return calculateCylinderVolume({
        dimensionType: p.dimensionType ?? 'radius',
        dimensionValue: p.dimensionValue ?? 2,
        dimensionUnit: p.dimensionUnit ?? 'm',
        height: p.height ?? 5,
        heightUnit: p.heightUnit ?? 'm',
        outputUnit: p.outputUnit ?? 'm3',
      });
    }
    case 'pipe': {
      const p = params.pipe || {};
      return calculatePipeVolume({
        inputMode: p.inputMode ?? 'inner_diameter',
        innerDiameter: p.innerDiameter ?? 100,
        innerDiameterUnit: p.innerDiameterUnit ?? 'mm',
        outerDiameter: p.outerDiameter,
        outerDiameterUnit: p.outerDiameterUnit ?? 'mm',
        wallThickness: p.wallThickness,
        wallThicknessUnit: p.wallThicknessUnit ?? 'mm',
        length: p.length ?? 10,
        lengthUnit: p.lengthUnit ?? 'm',
        outputUnit: p.outputUnit ?? 'L',
      });
    }
    case 'pool': {
      const p = params.pool || {};
      return calculatePoolVolume({
        shape: p.shape ?? 'rectangular',
        length: p.length ?? 10,
        lengthUnit: p.lengthUnit ?? 'm',
        width: p.width ?? 5,
        widthUnit: p.widthUnit ?? 'm',
        diameter: p.diameter ?? 6,
        diameterUnit: p.diameterUnit ?? 'm',
        depthMode: p.depthMode ?? 'average',
        averageDepth: p.averageDepth ?? 2,
        averageDepthUnit: p.averageDepthUnit ?? 'm',
        shallowDepth: p.shallowDepth ?? 1,
        shallowDepthUnit: p.shallowDepthUnit ?? 'm',
        deepDepth: p.deepDepth ?? 2.5,
        deepDepthUnit: p.deepDepthUnit ?? 'm',
        outputUnit: p.outputUnit ?? 'L',
      });
    }
    case 'sphere': {
      const p = params.sphere || {};
      return calculateSphereVolume({
        dimensionType: p.dimensionType ?? 'radius',
        dimensionValue: p.dimensionValue ?? 5,
        dimensionUnit: p.dimensionUnit ?? 'cm',
        outputUnit: p.outputUnit ?? 'cm3',
      });
    }
    case 'cone': {
      const p = params.cone || {};
      return calculateConeVolume({
        dimensionType: p.dimensionType ?? 'radius',
        dimensionValue: p.dimensionValue ?? 3,
        dimensionUnit: p.dimensionUnit ?? 'm',
        height: p.height ?? 6,
        heightUnit: p.heightUnit ?? 'm',
        outputUnit: p.outputUnit ?? 'm3',
      });
    }
    case 'prostate': {
      const p = params.prostate || {};
      return calculateProstateVolume({
        length: p.length ?? 4,
        lengthUnit: p.lengthUnit ?? 'cm',
        width: p.width ?? 3,
        widthUnit: p.widthUnit ?? 'cm',
        height: p.height ?? 4,
        heightUnit: p.heightUnit ?? 'cm',
      });
    }
    default:
      throw new Error(`Unsupported volume calculation mode: ${mode}`);
  }
}
