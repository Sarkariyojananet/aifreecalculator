/**
 * RCC Slab Steel Bar Bending Schedule (BBS) & Quantity Estimation Engine
 * Standard steel unit weight calculation: W = D² / 162 (kg/m)
 */

export type DimensionUnit = 'm' | 'ft';
export type SmallUnit = 'mm' | 'in';
export type MainDirection = 'short_span' | 'long_span';

export interface RccSlabSteelDetailedInput {
  // Slab Dimensions
  length: number;
  width: number;
  dimensionUnit: DimensionUnit; // 'm' or 'ft'
  thickness: number;
  thicknessUnit: SmallUnit; // 'mm' or 'in'
  clearCover: number;
  coverUnit: SmallUnit; // 'mm' or 'in'

  // Main Reinforcement
  mainBarDiaMm: number; // e.g. 10
  mainBarSpacing: number; // e.g. 150
  mainSpacingUnit: SmallUnit; // 'mm' or 'in'
  mainDirection: MainDirection; // 'short_span' | 'long_span'

  // Distribution Reinforcement
  distBarDiaMm: number; // e.g. 8
  distBarSpacing: number; // e.g. 200
  distSpacingUnit: SmallUnit; // 'mm' or 'in'

  // Advanced Options
  layers?: number; // 1 (single mesh) or 2 (double mesh / top-bottom)
  wastagePercent?: number; // e.g. 3% or 5%
  lapAnchoragePercent?: number; // e.g. 5% or 10%
  extraTopSteelPercent?: number; // e.g. 0% or 15%
}

export interface DirectionCalculation {
  barDiameterMm: number;
  spacingMm: number;
  directionLabel: string;
  spanLengthMeters: number;
  distributionSpanMeters: number;
  numberOfBars: number;
  lengthPerBarMeters: number;
  totalBarLengthMeters: number;
  unitWeightKgPerMeter: number;
  totalWeightKg: number;
}

export interface RccSlabSteelDetailedResult {
  // Slab Geometry
  lengthMeters: number;
  widthMeters: number;
  slabAreaSqm: number;
  slabAreaSqft: number;
  thicknessMm: number;
  thicknessInches: number;
  concreteVolumeCum: number;
  clearCoverMm: number;

  // Reinforcement Breakdown
  mainSteel: DirectionCalculation;
  distSteel: DirectionCalculation;

  // Totals & Allowances
  baseSteelWeightKg: number;
  layersMultiplier: number;
  wastageWeightKg: number;
  lapAnchorageWeightKg: number;
  extraTopSteelWeightKg: number;
  totalSteelWeightKg: number;
  totalSteelWeightQuintal: number;
  totalSteelWeightTonnes: number;

  // Steel Intensity Indicators
  steelPerSqmKg: number;
  steelPerSqftKg: number;
  steelPerCumConcreteKg: number;
}

/**
 * Standard rebar unit weight formula: W = D² / 162 (kg/m)
 */
export function getBarUnitWeight(diameterMm: number): number {
  if (isNaN(diameterMm) || diameterMm <= 0) return 0;
  return Number(((diameterMm * diameterMm) / 162).toFixed(4));
}

/**
 * Normalizes length to meters
 */
export function toMeters(val: number, unit: DimensionUnit): number {
  if (isNaN(val) || val <= 0) return 0;
  return unit === 'ft' ? val * 0.3048 : val;
}

/**
 * Normalizes small measurements to millimeters
 */
export function toMillimeters(val: number, unit: SmallUnit): number {
  if (isNaN(val) || val <= 0) return 0;
  return unit === 'in' ? val * 25.4 : val;
}

export function calculateDetailedRccSlabSteel(input: RccSlabSteelDetailedInput): RccSlabSteelDetailedResult {
  const {
    length,
    width,
    dimensionUnit = 'm',
    thickness = 125,
    thicknessUnit = 'mm',
    clearCover = 15,
    coverUnit = 'mm',
    mainBarDiaMm,
    mainBarSpacing,
    mainSpacingUnit = 'mm',
    mainDirection = 'short_span',
    distBarDiaMm,
    distBarSpacing,
    distSpacingUnit = 'mm',
    layers = 1,
    wastagePercent = 0,
    lapAnchoragePercent = 0,
    extraTopSteelPercent = 0,
  } = input;

  // Normalize Dimensions
  const lengthM = toMeters(length, dimensionUnit);
  const widthM = toMeters(width, dimensionUnit);
  const longSpanM = Math.max(lengthM, widthM);
  const shortSpanM = Math.min(lengthM, widthM);

  const thicknessMm = toMillimeters(thickness, thicknessUnit);
  const thicknessInches = Number((thicknessMm / 25.4).toFixed(2));
  const coverMm = toMillimeters(clearCover, coverUnit);
  const coverM = coverMm / 1000;

  const slabAreaSqm = Number((lengthM * widthM).toFixed(3));
  const slabAreaSqft = Number((slabAreaSqm * 10.7639).toFixed(2));
  const concreteVolumeCum = Number((slabAreaSqm * (thicknessMm / 1000)).toFixed(3));

  // Determine span direction for Main and Distribution bars
  // Typically main bars run along short span (to resist max moment) and are distributed across long span.
  const isMainAlongShort = mainDirection === 'short_span';
  const mainBarSpanM = isMainAlongShort ? shortSpanM : longSpanM;
  const mainDistributeSpanM = isMainAlongShort ? longSpanM : shortSpanM;

  const distBarSpanM = isMainAlongShort ? longSpanM : shortSpanM;
  const distDistributeSpanM = isMainAlongShort ? shortSpanM : longSpanM;

  // Main Bar Calculations
  const mainSpacingMm = toMillimeters(mainBarSpacing, mainSpacingUnit);
  const mainUnitWt = getBarUnitWeight(mainBarDiaMm);
  // Number of bars = ceil(available distribution span / spacing) + 1
  const mainAvailableSpanMm = Math.max(0, mainDistributeSpanM * 1000 - 2 * coverMm);
  const mainBarsCount = mainSpacingMm > 0 ? Math.ceil(mainAvailableSpanMm / mainSpacingMm) + 1 : 0;
  // Length per bar = usable span after deducting 2 side covers + standard bend hooks (2 * 9D)
  const mainHookLengthM = 2 * (9 * mainBarDiaMm / 1000);
  const mainLengthPerBarM = Math.max(0, Number((mainBarSpanM - 2 * coverM + mainHookLengthM).toFixed(3)));
  const mainTotalLengthM = Number((mainBarsCount * mainLengthPerBarM).toFixed(2));
  const mainTotalWeightKg = Number((mainTotalLengthM * mainUnitWt).toFixed(2));

  const mainSteel: DirectionCalculation = {
    barDiameterMm: mainBarDiaMm,
    spacingMm: Number(mainSpacingMm.toFixed(1)),
    directionLabel: isMainAlongShort ? 'Along Short Span' : 'Along Long Span',
    spanLengthMeters: Number(mainBarSpanM.toFixed(3)),
    distributionSpanMeters: Number(mainDistributeSpanM.toFixed(3)),
    numberOfBars: mainBarsCount,
    lengthPerBarMeters: mainLengthPerBarM,
    totalBarLengthMeters: mainTotalLengthM,
    unitWeightKgPerMeter: mainUnitWt,
    totalWeightKg: mainTotalWeightKg,
  };

  // Distribution Bar Calculations
  const distSpacingMm = toMillimeters(distBarSpacing, distSpacingUnit);
  const distUnitWt = getBarUnitWeight(distBarDiaMm);
  const distAvailableSpanMm = Math.max(0, distDistributeSpanM * 1000 - 2 * coverMm);
  const distBarsCount = distSpacingMm > 0 ? Math.ceil(distAvailableSpanMm / distSpacingMm) + 1 : 0;
  const distHookLengthM = 2 * (9 * distBarDiaMm / 1000);
  const distLengthPerBarM = Math.max(0, Number((distBarSpanM - 2 * coverM + distHookLengthM).toFixed(3)));
  const distTotalLengthM = Number((distBarsCount * distLengthPerBarM).toFixed(2));
  const distTotalWeightKg = Number((distTotalLengthM * distUnitWt).toFixed(2));

  const distSteel: DirectionCalculation = {
    barDiameterMm: distBarDiaMm,
    spacingMm: Number(distSpacingMm.toFixed(1)),
    directionLabel: isMainAlongShort ? 'Along Long Span' : 'Along Short Span',
    spanLengthMeters: Number(distBarSpanM.toFixed(3)),
    distributionSpanMeters: Number(distDistributeSpanM.toFixed(3)),
    numberOfBars: distBarsCount,
    lengthPerBarMeters: distLengthPerBarM,
    totalBarLengthMeters: distTotalLengthM,
    unitWeightKgPerMeter: distUnitWt,
    totalWeightKg: distTotalWeightKg,
  };

  // Base Reinforcement (Single layer)
  const singleLayerBaseWeightKg = mainTotalWeightKg + distTotalWeightKg;
  const layersMultiplier = Math.max(1, layers);
  const baseSteelWeightKg = Number((singleLayerBaseWeightKg * layersMultiplier).toFixed(2));

  // Allowances
  const extraTopSteelWeightKg = Number((baseSteelWeightKg * (Math.max(0, extraTopSteelPercent) / 100)).toFixed(2));
  const lapAnchorageWeightKg = Number((baseSteelWeightKg * (Math.max(0, lapAnchoragePercent) / 100)).toFixed(2));
  const subtotalBeforeWastage = baseSteelWeightKg + extraTopSteelWeightKg + lapAnchorageWeightKg;
  const wastageWeightKg = Number((subtotalBeforeWastage * (Math.max(0, wastagePercent) / 100)).toFixed(2));

  const totalSteelWeightKg = Number((subtotalBeforeWastage + wastageWeightKg).toFixed(2));
  const totalSteelWeightQuintal = Number((totalSteelWeightKg / 100).toFixed(2));
  const totalSteelWeightTonnes = Number((totalSteelWeightKg / 1000).toFixed(3));

  // Intensity Metrics
  const steelPerSqmKg = slabAreaSqm > 0 ? Number((totalSteelWeightKg / slabAreaSqm).toFixed(2)) : 0;
  const steelPerSqftKg = slabAreaSqft > 0 ? Number((totalSteelWeightKg / slabAreaSqft).toFixed(3)) : 0;
  const steelPerCumConcreteKg = concreteVolumeCum > 0 ? Number((totalSteelWeightKg / concreteVolumeCum).toFixed(1)) : 0;

  return {
    lengthMeters: Number(lengthM.toFixed(3)),
    widthMeters: Number(widthM.toFixed(3)),
    slabAreaSqm,
    slabAreaSqft,
    thicknessMm: Number(thicknessMm.toFixed(1)),
    thicknessInches,
    concreteVolumeCum,
    clearCoverMm: Number(coverMm.toFixed(1)),
    mainSteel,
    distSteel,
    baseSteelWeightKg,
    layersMultiplier,
    wastageWeightKg,
    lapAnchorageWeightKg,
    extraTopSteelWeightKg,
    totalSteelWeightKg,
    totalSteelWeightQuintal,
    totalSteelWeightTonnes,
    steelPerSqmKg,
    steelPerSqftKg,
    steelPerCumConcreteKg,
  };
}

/**
 * Standard Rebar Reference Table Constants
 */
export const STANDARD_REBAR_WEIGHTS = [
  { diaMm: 6, weightKgPerM: 0.222, weightKgPerFt: 0.068 },
  { diaMm: 8, weightKgPerM: 0.395, weightKgPerFt: 0.120 },
  { diaMm: 10, weightKgPerM: 0.617, weightKgPerFt: 0.188 },
  { diaMm: 12, weightKgPerM: 0.889, weightKgPerFt: 0.271 },
  { diaMm: 16, weightKgPerM: 1.580, weightKgPerFt: 0.482 },
  { diaMm: 20, weightKgPerM: 2.469, weightKgPerFt: 0.753 },
  { diaMm: 25, weightKgPerM: 3.858, weightKgPerFt: 1.176 },
  { diaMm: 32, weightKgPerM: 6.321, weightKgPerFt: 1.927 },
];
