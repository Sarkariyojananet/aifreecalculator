/**
 * RCC Beam Steel Bar Bending Schedule (BBS) & Civil Engineering Estimation Engine
 *
 * Implements:
 * 1. Advanced Detailed BBS Mode:
 *    - IS 456:2000 & SP 34 Bar Bending Detailing for RCC Beams
 *    - IS 13920:2016 Ductile Detailing for Seismic Zones (2-Zone Shear Stirrups: closer spacing at supports L/4)
 *    - Top continuous main bars + Top extra support bars (hogging moment curtailment @ L/4 or L/3)
 *    - Bottom continuous main bars + Bottom extra mid-span bars (sagging moment curtailment @ 0.7L)
 *    - Side face skin reinforcement (IS 456 Cl. 26.5.1.6 when Depth D > 750 mm)
 *    - Stirrups / Shear Links (2-legged and 4-legged, 135° seismic hooks with IS 2502 bend deductions)
 *    - Standard 12m stock commercial rebar rods and factory bundle takeoff
 *    - Concrete mix BOQ (M15, M20, M25: Cement bags, Sand, Aggregate, Water)
 *    - Shuttering / Formwork area (bottom soffit + 2 side faces) and binding wire
 *
 * 2. Normal / Thumb-Rule Estimator Mode:
 *    - CPWD / IS structural thumb-rule rates (1.0% to 2.0% steel ratio or 80-160 kg/m³)
 *    - Instant site takeoff for estimation & budgeting before structural drawings
 *
 * 3. Backward Compatible Legacy calculateRccBeamSteel function.
 */

export type DimensionUnit = 'm' | 'ft';
export type SmallUnit = 'mm' | 'in';
export type ConcreteMixGrade = 'M20' | 'M25' | 'M15';
export type StirrupSpacingMode = 'uniform' | 'two_zone';
export type HookAnchorType = 'standard_90' | 'deep_ld' | 'hook_135';

// Standard 12-meter commercial bundle packing counts (India / International standard)
export const BARS_PER_BUNDLE: Record<number, number> = {
  6: 15,
  8: 10,
  10: 7,
  12: 5,
  16: 3,
  20: 2,
  25: 1,
  32: 1,
};

export const STANDARD_REBAR_WEIGHTS = [
  { diaMm: 6, weightKgPerM: 0.222, weightKgPerFt: 0.068 },
  { diaMm: 8, weightKgPerM: 0.395, weightKgPerFt: 0.120 },
  { diaMm: 10, weightKgPerM: 0.617, weightKgPerFt: 0.188 },
  { diaMm: 12, weightKgPerM: 0.889, weightKgPerFt: 0.271 },
  { diaMm: 16, weightKgPerM: 1.58, weightKgPerFt: 0.482 },
  { diaMm: 20, weightKgPerM: 2.469, weightKgPerFt: 0.753 },
  { diaMm: 25, weightKgPerM: 3.858, weightKgPerFt: 1.176 },
  { diaMm: 32, weightKgPerM: 6.321, weightKgPerFt: 1.927 },
];

export interface ConcreteMixBreakup {
  wetVolumeM3: number;
  dryFactor: number;
  dryVolumeM3: number;
  grade: ConcreteMixGrade;
  mixLabel: string;
  ratio: { cement: number; sand: number; aggregate: number; total: number };
  cementVolumeM3: number;
  cementWeightKg: number;
  cementBags: number;
  cementBagsExact: number;
  sandVolumeM3: number;
  sandVolumeCft: number;
  aggregateVolumeM3: number;
  aggregateVolumeCft: number;
  waterLiters: number;
}

export const CONCRETE_MIX_SPECS: Record<
  ConcreteMixGrade,
  { label: string; cement: number; sand: number; aggregate: number }
> = {
  M20: { label: 'M20 (1 : 1.5 : 3) - Standard Beam', cement: 1, sand: 1.5, aggregate: 3 },
  M25: { label: 'M25 (1 : 1 : 2) - Heavy / Commercial', cement: 1, sand: 1, aggregate: 2 },
  M15: { label: 'M15 (1 : 2 : 4) - Lean / Low Load', cement: 1, sand: 2, aggregate: 4 },
};

export const CONCRETE_MIX_PROPORTIONS = CONCRETE_MIX_SPECS;

export function calculateConcreteMixBreakup(
  volume: number,
  grade: ConcreteMixGrade = 'M20',
  dryFactorValue: number = 1.54
): ConcreteMixBreakup {
  const wetVolume = Math.max(0, Number(volume) || 0);
  const dryFactor = Number(dryFactorValue) || 1.54;
  const mix = CONCRETE_MIX_SPECS[grade] || CONCRETE_MIX_SPECS.M20;
  const totalRatio = mix.cement + mix.sand + mix.aggregate;

  if (wetVolume <= 0) {
    return {
      wetVolumeM3: 0,
      dryFactor,
      dryVolumeM3: 0,
      grade,
      mixLabel: mix.label,
      ratio: { cement: mix.cement, sand: mix.sand, aggregate: mix.aggregate, total: totalRatio },
      cementVolumeM3: 0,
      cementWeightKg: 0,
      cementBags: 0,
      cementBagsExact: 0,
      sandVolumeM3: 0,
      sandVolumeCft: 0,
      aggregateVolumeM3: 0,
      aggregateVolumeCft: 0,
      waterLiters: 0,
    };
  }

  const dryVolumeM3 = Number((wetVolume * dryFactor).toFixed(4));
  const cementVolumeM3 = Number((dryVolumeM3 * (mix.cement / totalRatio)).toFixed(4));
  const cementWeightKg = Number((cementVolumeM3 * 1440).toFixed(2));
  const cementBagsExact = Number((cementWeightKg / 50).toFixed(2));
  const cementBags = Math.ceil(cementBagsExact);

  const sandVolumeM3 = Number((dryVolumeM3 * (mix.sand / totalRatio)).toFixed(3));
  const sandVolumeCft = Number((sandVolumeM3 * 35.3147).toFixed(1));

  const aggregateVolumeM3 = Number((dryVolumeM3 * (mix.aggregate / totalRatio)).toFixed(3));
  const aggregateVolumeCft = Number((aggregateVolumeM3 * 35.3147).toFixed(1));

  // Approx water 28-30L per 50kg bag (water-cement ratio ~0.50)
  const waterLiters = Math.round(cementBags * 28);

  return {
    wetVolumeM3: Number(wetVolume.toFixed(3)),
    dryFactor,
    dryVolumeM3: Number(dryVolumeM3.toFixed(3)),
    grade,
    mixLabel: mix.label,
    ratio: { cement: mix.cement, sand: mix.sand, aggregate: mix.aggregate, total: totalRatio },
    cementVolumeM3,
    cementWeightKg,
    cementBags,
    cementBagsExact,
    sandVolumeM3,
    sandVolumeCft,
    aggregateVolumeM3,
    aggregateVolumeCft,
    waterLiters,
  };
}

/**
 * Standard rebar unit weight formula: W = D² / 162.28 ≈ D² / 162 (kg/m)
 */
export function getBarUnitWeight(diameterMm: number): number {
  if (isNaN(diameterMm) || diameterMm <= 0) return 0;
  return Number(((diameterMm * diameterMm) / 162).toFixed(4));
}

export function toMeters(val: number, unit: DimensionUnit): number {
  if (isNaN(val) || val <= 0) return 0;
  return unit === 'ft' ? val * 0.3048 : val;
}

export function toMillimeters(val: number, unit: SmallUnit): number {
  if (isNaN(val) || val <= 0) return 0;
  return unit === 'in' ? val * 25.4 : val;
}

// -------------------------------------------------------------
// 1. LEGACY CALCULATOR FUNCTION (PRESERVED FOR BACKWARD COMPATIBILITY)
// -------------------------------------------------------------

export interface RccBeamInput {
  lengthMeters: number;
  widthMm: number; // e.g. 230mm or 300mm
  depthMm: number; // e.g. 450mm or 600mm
  clearCoverMm: number; // e.g. 25mm
  topBarsCount: number;
  topBarDiaMm: number;
  bottomBarsCount: number;
  bottomBarDiaMm: number;
  stirrupDiaMm: number;
  stirrupSpacingMm: number;
}

export interface RccBeamResult {
  beamVolumeCum: number;
  topBarsWeightKg: number;
  bottomBarsWeightKg: number;
  stirrupsCount: number;
  stirrupCuttingLengthMeters: number;
  stirrupsTotalWeightKg: number;
  totalSteelWeightKg: number;
  shutteringAreaSqm: number;
}

export function calculateRccBeamSteel(input: RccBeamInput): RccBeamResult {
  const {
    lengthMeters: L,
    widthMm: Bmm,
    depthMm: Dmm,
    clearCoverMm: cover,
    topBarsCount,
    topBarDiaMm,
    bottomBarsCount,
    bottomBarDiaMm,
    stirrupDiaMm,
    stirrupSpacingMm,
  } = input;

  const B = Bmm / 1000;
  const D = Dmm / 1000;
  const beamVolumeCum = Number((L * B * D).toFixed(3));

  // Development length hook = 2 * (12 * Dia / 1000)
  const topBarLength = L + 2 * ((12 * topBarDiaMm) / 1000);
  const bottomBarLength = L + 2 * ((12 * bottomBarDiaMm) / 1000);

  const unitWtTop = (topBarDiaMm * topBarDiaMm) / 162;
  const unitWtBottom = (bottomBarDiaMm * bottomBarDiaMm) / 162;
  const unitWtStirrup = (stirrupDiaMm * stirrupDiaMm) / 162;

  const topBarsWeightKg = Number((topBarsCount * topBarLength * unitWtTop).toFixed(1));
  const bottomBarsWeightKg = Number((bottomBarsCount * bottomBarLength * unitWtBottom).toFixed(1));

  // Stirrups calculation
  const stirrupsCount = stirrupSpacingMm > 0 ? Math.floor((L * 1000) / stirrupSpacingMm) + 1 : 0;
  const coreWidth = Bmm - 2 * cover;
  const coreDepth = Dmm - 2 * cover;
  // Stirrup perimeter + 2 hooks of 10d - 3 bends of 2d
  const stirrupCuttingLengthMeters = Number(
    (
      (2 * (coreWidth + coreDepth) + 2 * (10 * stirrupDiaMm) - 3 * (2 * stirrupDiaMm)) /
      1000
    ).toFixed(3)
  );
  const stirrupsTotalWeightKg = Number(
    (stirrupsCount * stirrupCuttingLengthMeters * unitWtStirrup).toFixed(1)
  );

  const totalSteelWeightKg = Number(
    (topBarsWeightKg + bottomBarsWeightKg + stirrupsTotalWeightKg).toFixed(1)
  );
  // Formwork area = 2 sides + bottom
  const shutteringAreaSqm = Number((L * (2 * D + B)).toFixed(2));

  return {
    beamVolumeCum,
    topBarsWeightKg,
    bottomBarsWeightKg,
    stirrupsCount,
    stirrupCuttingLengthMeters,
    stirrupsTotalWeightKg,
    totalSteelWeightKg,
    shutteringAreaSqm,
  };
}

// -------------------------------------------------------------
// 2. NORMAL / THUMB-RULE ESTIMATOR INTERFACES & FUNCTION
// -------------------------------------------------------------

export interface NormalRccBeamInput {
  length: number;
  width: number;
  depth: number;
  dimensionUnit: DimensionUnit; // 'm' | 'ft'
  sectionUnit: SmallUnit; // 'mm' | 'in'
  constructionType: 'light' | 'standard' | 'heavy' | 'custom';
  customSteelRateKgPerCum?: number; // e.g. 120 kg/m³
  numberOfBeams?: number;
  primaryBarDiaMm?: number; // e.g. 16 mm
  concreteGrade?: ConcreteMixGrade;
  wastagePercent?: number; // e.g. 3% or 5%
  steelCostPerKg?: number;
  concreteCostPerCum?: number;
  shutteringCostPerSqm?: number;
}

export interface NormalRccBeamResult {
  lengthM: number;
  widthMm: number;
  depthMm: number;
  numberOfBeams: number;
  singleBeamVolumeCum: number;
  totalConcreteVolumeCum: number;
  totalConcreteVolumeCuft: number;
  dryConcreteVolumeCum: number;

  steelRateKgPerCum: number;
  steelPercentage: number;
  baseSteelKg: number;
  wastageKg: number;
  totalSteelKg: number;
  totalSteelQuintal: number;
  totalSteelTonnes: number;

  // Commercial Rebar Breakdown
  primaryBarDiaMm: number;
  commercial12mRodsCount: number;
  barsPerBundle: number;
  commercialBundlesCount: number;
  bindingWireKg: number;

  // Concrete Mix BOQ
  concreteGrade: ConcreteMixGrade;
  cementBags: number;
  sandCum: number;
  sandCuft: number;
  aggregateCum: number;
  aggregateCuft: number;
  waterLiters: number;

  // Shuttering / Formwork
  singleBeamShutteringSqm: number;
  totalShutteringSqm: number;
  totalShutteringSqft: number;

  // Cost Estimates
  steelCost: number;
  concreteCost: number;
  shutteringCost: number;
  bindingWireCost: number;
  totalEstimatedCost: number;
}

export function calculateNormalRccBeamSteel(input: NormalRccBeamInput): NormalRccBeamResult {
  const {
    length,
    width,
    depth,
    dimensionUnit = 'm',
    sectionUnit = 'mm',
    constructionType = 'standard',
    customSteelRateKgPerCum = 120,
    numberOfBeams = 1,
    primaryBarDiaMm = 16,
    concreteGrade = 'M20',
    wastagePercent = 3,
    steelCostPerKg = 75,
    concreteCostPerCum = 4800,
    shutteringCostPerSqm = 350,
  } = input;

  const lengthM = toMeters(length, dimensionUnit);
  const widthMm = toMillimeters(width, sectionUnit);
  const depthMm = toMillimeters(depth, sectionUnit);
  const nBeams = Math.max(1, Math.round(numberOfBeams));

  const B = widthMm / 1000;
  const D = depthMm / 1000;
  const singleBeamVolumeCum = Number((lengthM * B * D).toFixed(4));
  const totalConcreteVolumeCum = Number((singleBeamVolumeCum * nBeams).toFixed(3));
  const totalConcreteVolumeCuft = Number((totalConcreteVolumeCum * 35.3147).toFixed(1));

  // CPWD / Structural Thumb Rule:
  // Light (residential roof beam, low load): 1.0% steel = ~80 kg/m³
  // Standard (regular floor/plinth beam): 1.5% steel = ~120 kg/m³
  // Heavy (commercial/transfer beam, heavy shear): 2.0% steel = ~160 kg/m³
  let steelRate = 120;
  if (constructionType === 'light') steelRate = 80;
  else if (constructionType === 'standard') steelRate = 120;
  else if (constructionType === 'heavy') steelRate = 160;
  else if (constructionType === 'custom') {
    steelRate = Math.max(10, customSteelRateKgPerCum || 120);
  }

  const steelPercentage = Number(((steelRate / 7850) * 100).toFixed(2));
  const baseSteelKg = totalConcreteVolumeCum * steelRate;
  const wastageKg = baseSteelKg * (Math.max(0, wastagePercent) / 100);
  const totalSteelKg = Number((baseSteelKg + wastageKg).toFixed(1));
  const totalSteelQuintal = Number((totalSteelKg / 100).toFixed(2));
  const totalSteelTonnes = Number((totalSteelKg / 1000).toFixed(3));

  // Commercial 12m stock rebar
  const unitWt = getBarUnitWeight(primaryBarDiaMm) || 1.58;
  const wtPer12m = unitWt * 12;
  const commercial12mRodsCount = Math.ceil(totalSteelKg / wtPer12m);
  const bundleSize = BARS_PER_BUNDLE[primaryBarDiaMm] || 3;
  const commercialBundlesCount = Math.ceil(commercial12mRodsCount / bundleSize);

  // Binding wire = ~1% of steel weight (or 10 kg per ton)
  const bindingWireKg = Math.max(1, Math.round((totalSteelKg * 0.01) * 10) / 10);

  // Concrete Mix BOQ
  const mixBOQ = calculateConcreteMixBreakup(totalConcreteVolumeCum, concreteGrade, 1.54);

  // Shuttering (Formwork): bottom soffit + 2 vertical sides = (2D + B) * L
  const singleBeamShutteringSqm = Number((lengthM * (2 * D + B)).toFixed(3));
  const totalShutteringSqm = Number((singleBeamShutteringSqm * nBeams).toFixed(2));
  const totalShutteringSqft = Number((totalShutteringSqm * 10.7639).toFixed(1));

  // Cost estimates
  const steelCost = Math.round(totalSteelKg * steelCostPerKg);
  const concreteCost = Math.round(totalConcreteVolumeCum * concreteCostPerCum);
  const shutteringCost = Math.round(totalShutteringSqm * shutteringCostPerSqm);
  const bindingWireCost = Math.round(bindingWireKg * 100); // approx ₹100/kg
  const totalEstimatedCost = steelCost + concreteCost + shutteringCost + bindingWireCost;

  return {
    lengthM,
    widthMm,
    depthMm,
    numberOfBeams: nBeams,
    singleBeamVolumeCum,
    totalConcreteVolumeCum,
    totalConcreteVolumeCuft,
    dryConcreteVolumeCum: mixBOQ.dryVolumeM3,

    steelRateKgPerCum: steelRate,
    steelPercentage,
    baseSteelKg: Number(baseSteelKg.toFixed(1)),
    wastageKg: Number(wastageKg.toFixed(1)),
    totalSteelKg,
    totalSteelQuintal,
    totalSteelTonnes,

    primaryBarDiaMm,
    commercial12mRodsCount,
    barsPerBundle: bundleSize,
    commercialBundlesCount,
    bindingWireKg,

    concreteGrade,
    cementBags: mixBOQ.cementBags,
    sandCum: mixBOQ.sandVolumeM3,
    sandCuft: mixBOQ.sandVolumeCft,
    aggregateCum: mixBOQ.aggregateVolumeM3,
    aggregateCuft: mixBOQ.aggregateVolumeCft,
    waterLiters: mixBOQ.waterLiters,

    singleBeamShutteringSqm,
    totalShutteringSqm,
    totalShutteringSqft,

    steelCost,
    concreteCost,
    shutteringCost,
    bindingWireCost,
    totalEstimatedCost,
  };
}

// -------------------------------------------------------------
// 3. ADVANCED DETAILED BBS INTERFACES & FUNCTION
// -------------------------------------------------------------

export interface BBSBarItem {
  barMark: string;
  description: string;
  diaMm: number;
  shapeCode: string;
  shapeDesc: string;
  countPerBeam: number;
  totalCount: number;
  cuttingLengthM: number;
  totalLengthM: number;
  unitWeightKgPerM: number;
  totalWeightKg: number;
}

export interface DiameterSummaryItem {
  diaMm: number;
  totalLengthM: number;
  unitWeightKgPerM: number;
  weightKg: number;
  stock12mBars: number;
  barsPerBundle: number;
  bundles: number;
}

export interface AdvancedRccBeamInput {
  // Geometry
  clearSpan: number; // Clear distance between support faces
  supportWidth: number; // Support / Column bearing width (e.g. 230mm)
  beamWidth: number;
  beamDepth: number;
  dimensionUnit: DimensionUnit; // 'm' | 'ft'
  sectionUnit: SmallUnit; // 'mm' | 'in'
  clearCover: number; // Default 25mm as per IS 456
  numberOfBeams: number;

  // Main Top Reinforcement
  topMainCount: number;
  topMainDiaMm: number;
  topExtraCount?: number; // At supports (hogging negative moment)
  topExtraDiaMm?: number;
  topExtraExtensionFactor?: number; // e.g. 0.25 (L/4) or 0.33 (L/3)

  // Main Bottom Reinforcement
  bottomMainCount: number;
  bottomMainDiaMm: number;
  bottomExtraCount?: number; // Mid-span extra bars (sagging positive moment)
  bottomExtraDiaMm?: number;
  bottomExtraLengthRatio?: number; // e.g. 0.70 (0.7L)

  // Side Face Reinforcement (IS 456 Cl. 26.5.1.6 if depth > 750mm)
  hasSideFaceBars?: boolean;
  sideFaceCountPerSide?: number;
  sideFaceDiaMm?: number;

  // Stirrups (Shear Links)
  stirrupDiaMm: number;
  stirrupLegs?: 2 | 4;
  stirrupMode: StirrupSpacingMode; // 'uniform' | 'two_zone'
  stirrupSpacingUniformMm?: number; // for uniform mode (e.g. 150mm)
  stirrupSpacingSupportMm?: number; // for 2-zone mode (e.g. 100mm)
  stirrupSpacingMidMm?: number; // for 2-zone mode (e.g. 150mm)
  hookAnchorType?: HookAnchorType; // 'standard_90' | 'deep_ld'

  // Other Options
  wastagePercent?: number;
  concreteGrade?: ConcreteMixGrade;
  steelCostPerKg?: number;
  concreteCostPerCum?: number;
  shutteringCostPerSqm?: number;
}

export interface AdvancedRccBeamResult {
  clearSpanM: number;
  supportWidthM: number;
  totalLengthM: number;
  beamWidthMm: number;
  beamDepthMm: number;
  clearCoverMm: number;
  numberOfBeams: number;

  singleBeamVolumeCum: number;
  totalConcreteVolumeCum: number;
  totalConcreteVolumeCuft: number;

  // BBS Rebar Line Items
  bbsItems: BBSBarItem[];
  diameterBreakdown: DiameterSummaryItem[];

  baseSteelWeightKg: number;
  wastageKg: number;
  totalSteelWeightKg: number;
  totalSteelQuintals: number;
  totalSteelTonnes: number;
  steelKgPerCum: number;
  steelPercentage: number;

  totalStirrupsCount: number;
  singleStirrupCutLenM: number;

  // Commercial Rebar Summary
  total12mStockBars: number;
  totalBundles: number;
  bindingWireKg: number;

  // Concrete Mix BOQ
  concreteBOQ: ConcreteMixBreakup;

  // Shuttering Formwork
  singleBeamShutteringSqm: number;
  totalShutteringSqm: number;
  totalShutteringSqft: number;

  // Cost Breakup
  steelCost: number;
  concreteCost: number;
  shutteringCost: number;
  bindingWireCost: number;
  totalEstimatedCost: number;
}

export function calculateAdvancedRccBeamSteel(input: AdvancedRccBeamInput): AdvancedRccBeamResult {
  const {
    clearSpan,
    supportWidth = 230,
    beamWidth,
    beamDepth,
    dimensionUnit = 'm',
    sectionUnit = 'mm',
    clearCover = 25,
    numberOfBeams = 1,

    topMainCount = 2,
    topMainDiaMm = 12,
    topExtraCount = 0,
    topExtraDiaMm = 12,
    topExtraExtensionFactor = 0.25, // L/4

    bottomMainCount = 3,
    bottomMainDiaMm = 16,
    bottomExtraCount = 0,
    bottomExtraDiaMm = 16,
    bottomExtraLengthRatio = 0.75,

    hasSideFaceBars = false,
    sideFaceCountPerSide = 1,
    sideFaceDiaMm = 10,

    stirrupDiaMm = 8,
    stirrupLegs = 2,
    stirrupMode = 'uniform',
    stirrupSpacingUniformMm = 150,
    stirrupSpacingSupportMm = 100,
    stirrupSpacingMidMm = 150,
    hookAnchorType = 'standard_90',

    wastagePercent = 3,
    concreteGrade = 'M20',
    steelCostPerKg = 75,
    concreteCostPerCum = 4800,
    shutteringCostPerSqm = 350,
  } = input;

  const clearSpanM = toMeters(clearSpan, dimensionUnit);
  const supportWidthM = sectionUnit === 'in' ? supportWidth * 0.0254 : supportWidth / 1000;
  const totalLengthM = Number((clearSpanM + 2 * supportWidthM).toFixed(3));
  const beamWidthMm = toMillimeters(beamWidth, sectionUnit);
  const beamDepthMm = toMillimeters(beamDepth, sectionUnit);
  const clearCoverMm = sectionUnit === 'in' ? clearCover * 25.4 : clearCover;
  const nBeams = Math.max(1, Math.round(numberOfBeams));

  const B = beamWidthMm / 1000;
  const D = beamDepthMm / 1000;
  const singleBeamVolumeCum = Number((totalLengthM * B * D).toFixed(4));
  const totalConcreteVolumeCum = Number((singleBeamVolumeCum * nBeams).toFixed(3));
  const totalConcreteVolumeCuft = Number((totalConcreteVolumeCum * 35.3147).toFixed(1));

  // End Anchorage Calculation:
  // Hook length = 12d or 16d for standard 90° L-bend; or Development Length Ld = 48d (Fe500/M20)
  // End cover deduction = 25mm at each column face
  const endCoverM = Math.max(0.015, clearCoverMm / 1000);
  const bearingEmbedmentM = Math.max(0.1, supportWidthM - endCoverM);

  function getEndHookLength(diaMm: number): number {
    if (hookAnchorType === 'deep_ld') {
      // Full development length Ld = 48d into column support
      return (48 * diaMm) / 1000;
    }
    // Standard 90° bend = 12d or 16d, minimum 150mm
    return Math.max(0.15, (12 * diaMm) / 1000);
  }

  // 90° Bend deduction per bend = 2d
  function getBendDeduction(diaMm: number, bendsCount: number = 2): number {
    return (bendsCount * 2 * diaMm) / 1000;
  }

  const bbsItems: BBSBarItem[] = [];

  // 1. Top Main Through Bars
  if (topMainCount > 0) {
    const hook = getEndHookLength(topMainDiaMm);
    const bendDed = getBendDeduction(topMainDiaMm, 2);
    // Length = Clear Span + 2 * Bearing Embedment + 2 * Hook - 2 * 90° bend deduction
    const cutLen = Number(
      Math.max(0.5, clearSpanM + 2 * bearingEmbedmentM + 2 * hook - bendDed).toFixed(3)
    );
    const totCount = topMainCount * nBeams;
    const totLen = Number((totCount * cutLen).toFixed(2));
    const uWt = getBarUnitWeight(topMainDiaMm);
    const totWt = Number((totLen * uWt).toFixed(2));

    bbsItems.push({
      barMark: '01',
      description: 'Top Main Straight Through Bars',
      diaMm: topMainDiaMm,
      shapeCode: 'L-HOOK',
      shapeDesc: 'Both ends 90° bend L-hook',
      countPerBeam: topMainCount,
      totalCount: totCount,
      cuttingLengthM: cutLen,
      totalLengthM: totLen,
      unitWeightKgPerM: uWt,
      totalWeightKg: totWt,
    });
  }

  // 2. Top Extra Support Bars (Negative hogging moment at supports)
  if (topExtraCount > 0) {
    const hook = getEndHookLength(topExtraDiaMm);
    const bendDed = (2 * topExtraDiaMm) / 1000; // 1 bend of 90°
    const extensionM = Number((clearSpanM * topExtraExtensionFactor).toFixed(3)); // L/4 from column face
    // Cutting length = Extension + Bearing Embedment + Hook - Bend deduction
    const cutLen = Number(Math.max(0.3, extensionM + bearingEmbedmentM + hook - bendDed).toFixed(3));
    // 2 supports (Left & Right)
    const countPerBeam = topExtraCount * 2;
    const totCount = countPerBeam * nBeams;
    const totLen = Number((totCount * cutLen).toFixed(2));
    const uWt = getBarUnitWeight(topExtraDiaMm);
    const totWt = Number((totLen * uWt).toFixed(2));

    bbsItems.push({
      barMark: '02',
      description: `Top Support Extra Bars (Hogging @ L/${Math.round(1 / topExtraExtensionFactor)})`,
      diaMm: topExtraDiaMm,
      shapeCode: 'ONE-HOOK',
      shapeDesc: 'One end 90° anchored into column, L/4 span',
      countPerBeam,
      totalCount: totCount,
      cuttingLengthM: cutLen,
      totalLengthM: totLen,
      unitWeightKgPerM: uWt,
      totalWeightKg: totWt,
    });
  }

  // 3. Bottom Main Through Bars
  if (bottomMainCount > 0) {
    const hook = getEndHookLength(bottomMainDiaMm);
    const bendDed = getBendDeduction(bottomMainDiaMm, 2);
    const cutLen = Number(
      Math.max(0.5, clearSpanM + 2 * bearingEmbedmentM + 2 * hook - bendDed).toFixed(3)
    );
    const totCount = bottomMainCount * nBeams;
    const totLen = Number((totCount * cutLen).toFixed(2));
    const uWt = getBarUnitWeight(bottomMainDiaMm);
    const totWt = Number((totLen * uWt).toFixed(2));

    bbsItems.push({
      barMark: '03',
      description: 'Bottom Main Tension Bars (Full Span)',
      diaMm: bottomMainDiaMm,
      shapeCode: 'L-HOOK',
      shapeDesc: 'Both ends 90° bend anchored into supports',
      countPerBeam: bottomMainCount,
      totalCount: totCount,
      cuttingLengthM: cutLen,
      totalLengthM: totLen,
      unitWeightKgPerM: uWt,
      totalWeightKg: totWt,
    });
  }

  // 4. Bottom Extra Mid-Span Bars (Positive sagging moment at center span)
  if (bottomExtraCount > 0) {
    // Curtailment: straight bar placed in central span
    const cutLen = Number(Math.max(0.5, clearSpanM * bottomExtraLengthRatio).toFixed(3));
    const totCount = bottomExtraCount * nBeams;
    const totLen = Number((totCount * cutLen).toFixed(2));
    const uWt = getBarUnitWeight(bottomExtraDiaMm);
    const totWt = Number((totLen * uWt).toFixed(2));

    bbsItems.push({
      barMark: '04',
      description: `Bottom Extra Mid-Span Bars (${Math.round(bottomExtraLengthRatio * 100)}% Span)`,
      diaMm: bottomExtraDiaMm,
      shapeCode: 'STRAIGHT',
      shapeDesc: 'Straight curtailed rebar at mid-span',
      countPerBeam: bottomExtraCount,
      totalCount: totCount,
      cuttingLengthM: cutLen,
      totalLengthM: totLen,
      unitWeightKgPerM: uWt,
      totalWeightKg: totWt,
    });
  }

  // 5. Side Face Reinforcement (IS 456 Cl. 26.5.1.6 when Depth D > 750 mm)
  if (hasSideFaceBars || beamDepthMm > 750) {
    const sideBarsCount = Math.max(1, sideFaceCountPerSide) * 2; // 2 faces
    const hook = Math.max(0.12, (10 * sideFaceDiaMm) / 1000);
    const cutLen = Number(
      Math.max(0.5, clearSpanM + 2 * bearingEmbedmentM + 2 * hook - 0.04).toFixed(3)
    );
    const totCount = sideBarsCount * nBeams;
    const totLen = Number((totCount * cutLen).toFixed(2));
    const uWt = getBarUnitWeight(sideFaceDiaMm);
    const totWt = Number((totLen * uWt).toFixed(2));

    bbsItems.push({
      barMark: '05',
      description: 'Side Face Skin Reinforcement (IS 456 Depth > 750mm)',
      diaMm: sideFaceDiaMm,
      shapeCode: 'L-HOOK',
      shapeDesc: 'Longitudinal skin bars along beam web',
      countPerBeam: sideBarsCount,
      totalCount: totCount,
      cuttingLengthM: cutLen,
      totalLengthM: totLen,
      unitWeightKgPerM: uWt,
      totalWeightKg: totWt,
    });
  }

  // 6. Stirrups (Shear Links)
  // Core dimensions:
  const coreW = Math.max(50, beamWidthMm - 2 * clearCoverMm);
  const coreD = Math.max(50, beamDepthMm - 2 * clearCoverMm);

  // Hook length: 135° seismic hook = 10d (minimum 75mm) as per IS 13920 & IS 2502
  const hookLenMm = Math.max(75, 10 * stirrupDiaMm);
  // IS 2502 Bend deductions:
  // Three 90° bends = 3 * 2d = 6d
  // Two 135° bends = 2 * 3d = 6d
  // Total deduction = 12d
  const bendDeductionMm = 12 * stirrupDiaMm;

  let singleStirrupCutLenMm = 2 * (coreW + coreD) + 2 * hookLenMm - bendDeductionMm;
  // If 4-legged stirrup, add internal link:
  if (stirrupLegs === 4) {
    singleStirrupCutLenMm += (coreD + 2 * hookLenMm - 6 * stirrupDiaMm);
  }
  const singleStirrupCutLenM = Number(Math.max(0.4, singleStirrupCutLenMm / 1000).toFixed(3));

  // Stirrup count calculation:
  let stirrupsPerBeam = 0;
  let stirrupDesc = '';

  if (stirrupMode === 'two_zone') {
    // IS 13920 Seismic / Ductile Detailing:
    // Support Zone length at each end = 2 * D (or L/4)
    const supportZoneLenM = Number(Math.min(clearSpanM * 0.25, Math.max(0.5, 2 * D)).toFixed(3));
    const midZoneLenM = Number(Math.max(0, clearSpanM - 2 * supportZoneLenM).toFixed(3));

    const sSup = Math.max(50, stirrupSpacingSupportMm);
    const sMid = Math.max(50, stirrupSpacingMidMm);

    // Number of rings in left & right support zones:
    const ringsPerSupport = Math.floor((supportZoneLenM * 1000) / sSup) + 1;
    const ringsMid = sMid > 0 && midZoneLenM > 0 ? Math.floor((midZoneLenM * 1000) / sMid) : 0;

    stirrupsPerBeam = ringsPerSupport * 2 + ringsMid;
    stirrupDesc = `2-Zone Stirrups (${stirrupLegs}-Legged: Support Zone @ ${sSup}mm c/c, Mid @ ${sMid}mm c/c)`;
  } else {
    // Uniform Spacing
    const sUniform = Math.max(50, stirrupSpacingUniformMm);
    stirrupsPerBeam = Math.floor((clearSpanM * 1000) / sUniform) + 1;
    stirrupDesc = `Uniform Stirrups (${stirrupLegs}-Legged Ring @ ${sUniform}mm c/c)`;
  }

  const totalStirrupsCount = stirrupsPerBeam * nBeams;
  const totalStirrupLenM = Number((totalStirrupsCount * singleStirrupCutLenM).toFixed(2));
  const uWtStirrup = getBarUnitWeight(stirrupDiaMm);
  const totalStirrupWtKg = Number((totalStirrupLenM * uWtStirrup).toFixed(2));

  bbsItems.push({
    barMark: '06',
    description: stirrupDesc,
    diaMm: stirrupDiaMm,
    shapeCode: 'RING-135',
    shapeDesc: 'Rectangular stirrup with 135° seismic hooks',
    countPerBeam: stirrupsPerBeam,
    totalCount: totalStirrupsCount,
    cuttingLengthM: singleStirrupCutLenM,
    totalLengthM: totalStirrupLenM,
    unitWeightKgPerM: uWtStirrup,
    totalWeightKg: totalStirrupWtKg,
  });

  // Aggregate Diameter Summary:
  const diaMap = new Map<number, { totalLen: number; totalWt: number }>();
  for (const item of bbsItems) {
    const cur = diaMap.get(item.diaMm) || { totalLen: 0, totalWt: 0 };
    cur.totalLen += item.totalLengthM;
    cur.totalWt += item.totalWeightKg;
    diaMap.set(item.diaMm, cur);
  }

  const diameterBreakdown: DiameterSummaryItem[] = [];
  let total12mStockBars = 0;
  let totalBundles = 0;

  const sortedDias = Array.from(diaMap.keys()).sort((a, b) => a - b);
  for (const dia of sortedDias) {
    const data = diaMap.get(dia)!;
    const uWeight = getBarUnitWeight(dia);
    const stockBars = Math.ceil(data.totalLen / 12);
    const perBundle = BARS_PER_BUNDLE[dia] || 3;
    const bundles = Math.ceil(stockBars / perBundle);

    total12mStockBars += stockBars;
    totalBundles += bundles;

    diameterBreakdown.push({
      diaMm: dia,
      totalLengthM: Number(data.totalLen.toFixed(1)),
      unitWeightKgPerM: uWeight,
      weightKg: Number(data.totalWt.toFixed(1)),
      stock12mBars: stockBars,
      barsPerBundle: perBundle,
      bundles,
    });
  }

  const baseSteelWeightKg = Number(
    bbsItems.reduce((acc, it) => acc + it.totalWeightKg, 0).toFixed(1)
  );
  const wastageKg = Number((baseSteelWeightKg * (Math.max(0, wastagePercent) / 100)).toFixed(1));
  const totalSteelWeightKg = Number((baseSteelWeightKg + wastageKg).toFixed(1));
  const totalSteelQuintals = Number((totalSteelWeightKg / 100).toFixed(2));
  const totalSteelTonnes = Number((totalSteelWeightKg / 1000).toFixed(3));

  const steelKgPerCum =
    totalConcreteVolumeCum > 0
      ? Number((totalSteelWeightKg / totalConcreteVolumeCum).toFixed(1))
      : 0;
  const steelPercentage = Number(((steelKgPerCum / 7850) * 100).toFixed(2));

  // Binding wire = ~1% of steel weight
  const bindingWireKg = Math.max(1, Math.round((totalSteelWeightKg * 0.01) * 10) / 10);

  // Concrete BOQ
  const concreteBOQ = calculateConcreteMixBreakup(totalConcreteVolumeCum, concreteGrade, 1.54);

  // Formwork (Shuttering Area): bottom soffit + 2 vertical sides = (2D + B) * L
  const singleBeamShutteringSqm = Number((totalLengthM * (2 * D + B)).toFixed(3));
  const totalShutteringSqm = Number((singleBeamShutteringSqm * nBeams).toFixed(2));
  const totalShutteringSqft = Number((totalShutteringSqm * 10.7639).toFixed(1));

  // Costs
  const steelCost = Math.round(totalSteelWeightKg * steelCostPerKg);
  const concreteCost = Math.round(totalConcreteVolumeCum * concreteCostPerCum);
  const shutteringCost = Math.round(totalShutteringSqm * shutteringCostPerSqm);
  const bindingWireCost = Math.round(bindingWireKg * 100);
  const totalEstimatedCost = steelCost + concreteCost + shutteringCost + bindingWireCost;

  return {
    clearSpanM,
    supportWidthM,
    totalLengthM,
    beamWidthMm,
    beamDepthMm,
    clearCoverMm,
    numberOfBeams: nBeams,

    singleBeamVolumeCum,
    totalConcreteVolumeCum,
    totalConcreteVolumeCuft,

    bbsItems,
    diameterBreakdown,

    baseSteelWeightKg,
    wastageKg,
    totalSteelWeightKg,
    totalSteelQuintals,
    totalSteelTonnes,
    steelKgPerCum,
    steelPercentage,

    totalStirrupsCount,
    singleStirrupCutLenM,

    total12mStockBars,
    totalBundles,
    bindingWireKg,

    concreteBOQ,

    singleBeamShutteringSqm,
    totalShutteringSqm,
    totalShutteringSqft,

    steelCost,
    concreteCost,
    shutteringCost,
    bindingWireCost,
    totalEstimatedCost,
  };
}
