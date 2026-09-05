/**
 * RCC Slab Steel Bar Bending Schedule (BBS) & Civil Engineering Estimation Engine
 *
 * Implements:
 * 1. Advanced Detailed BBS Mode:
 *    - IS 456:2000 (Clause 24.1 One-Way vs Clause 24.4 Two-Way Slab classification based on Ly/Lx)
 *    - IS 2502 & SP 34 Bar Bending Detailing (Straight mesh vs Alternate Cranked / Bent-up bars @ 45° adding 0.42*H)
 *    - End anchorages (2 * 9d hook/bend length), clear cover deductions
 *    - Top support extra / negative moment steel, laps & anchorage, site wastage
 *    - Commercial procurement summary (standard 12m commercial rebar rods & bundles)
 *    - Concrete mix BOQ (Cement bags, Sand, Aggregate, Shuttering area, Binding wire)
 *
 * 2. Normal / Thumb Rule Estimator Mode:
 *    - CPWD / IS structural thumb-rule rates (80-110 kg/m³ of concrete or 0.8%-1.2% volume)
 *    - Immediate material takeoff without needing detailed BBS bar placements
 *
 * Standard steel unit weight: W = D² / 162.28 ≈ D² / 162 (kg/m)
 */

export type DimensionUnit = 'm' | 'ft';
export type SmallUnit = 'mm' | 'in';
export type MainDirection = 'short_span' | 'long_span';
export type SlabTypeSelection = 'auto' | 'one_way' | 'two_way';
export type BarProfileType = 'straight' | 'cranked';
export type ConcreteMixGrade = 'M20' | 'M25' | 'M15';

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
}

export const CONCRETE_MIX_SPECS: Record<
  ConcreteMixGrade,
  { label: string; cement: number; sand: number; aggregate: number }
> = {
  M20: { label: 'M20 (1 : 1.5 : 3) - Standard Slab', cement: 1, sand: 1.5, aggregate: 3 },
  M25: { label: 'M25 (1 : 1 : 2) - Heavy / Commercial', cement: 1, sand: 1, aggregate: 2 },
  M15: { label: 'M15 (1 : 2 : 4) - Lean / Low Load', cement: 1, sand: 2, aggregate: 4 },
};

export function calculateConcreteMixBreakup(
  volume: number,
  grade: ConcreteMixGrade = 'M20',
  dryFactorValue: number = 1.54
): ConcreteMixBreakup {
  const wetVolume = Number(volume);
  const dryFactor = Number(dryFactorValue);

  const mix = CONCRETE_MIX_SPECS[grade] || CONCRETE_MIX_SPECS.M20;
  const cementRatio = Number(mix.cement);
  const sandRatio = Number(mix.sand);
  const aggRatio = Number(mix.aggregate);
  const totalRatio = cementRatio + sandRatio + aggRatio;

  if (
    !Number.isFinite(wetVolume) ||
    wetVolume <= 0 ||
    !Number.isFinite(dryFactor) ||
    dryFactor <= 0 ||
    !Number.isFinite(cementRatio) ||
    !Number.isFinite(totalRatio) ||
    totalRatio <= 0
  ) {
    return {
      wetVolumeM3: 0,
      dryFactor: 1.54,
      dryVolumeM3: 0,
      grade,
      mixLabel: mix.label,
      ratio: { cement: 1, sand: 1.5, aggregate: 3, total: 5.5 },
      cementVolumeM3: 0,
      cementWeightKg: 0,
      cementBags: 0,
      cementBagsExact: 0,
      sandVolumeM3: 0,
      sandVolumeCft: 0,
      aggregateVolumeM3: 0,
      aggregateVolumeCft: 0,
    };
  }

  // Dry Volume = Wet Volume * Dry Factor (1.54)
  const dryVolumeM3 = Number((wetVolume * dryFactor).toFixed(4));
  // Cement Volume = Dry Volume * (Cement Ratio / Total Ratio)
  const cementVolumeM3 = Number((dryVolumeM3 * (cementRatio / totalRatio)).toFixed(4));
  // Cement Weight (kg) = Volume * Density (1440 kg/m3)
  const cementWeightKg = Number((cementVolumeM3 * 1440).toFixed(2));
  // Bags of 50 kg
  const cementBagsExact = Number((cementWeightKg / 50).toFixed(2));
  const cementBags = Math.ceil(cementBagsExact);

  // Sand Volume
  const sandVolumeM3 = Number((dryVolumeM3 * (sandRatio / totalRatio)).toFixed(3));
  const sandVolumeCft = Number((sandVolumeM3 * 35.3147).toFixed(1));

  // Aggregate Volume
  const aggregateVolumeM3 = Number((dryVolumeM3 * (aggRatio / totalRatio)).toFixed(3));
  const aggregateVolumeCft = Number((aggregateVolumeM3 * 35.3147).toFixed(1));

  return {
    wetVolumeM3: Number(wetVolume.toFixed(3)),
    dryFactor,
    dryVolumeM3: Number(dryVolumeM3.toFixed(3)),
    grade,
    mixLabel: mix.label,
    ratio: { cement: cementRatio, sand: sandRatio, aggregate: aggRatio, total: totalRatio },
    cementVolumeM3,
    cementWeightKg,
    cementBags: Number.isFinite(cementBags) ? cementBags : 0,
    cementBagsExact,
    sandVolumeM3,
    sandVolumeCft,
    aggregateVolumeM3,
    aggregateVolumeCft,
  };
}

export const CONCRETE_MIX_PROPORTIONS = CONCRETE_MIX_SPECS;

/**
 * Standard Rebar Reference Table Constants (D² / 162)
 */
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

// -------------------------------------------------------------
// NORMAL / THUMB RULE ESTIMATOR INTERFACES & FUNCTION
// -------------------------------------------------------------

export interface NormalRccSlabInput {
  length: number;
  width: number;
  dimensionUnit: DimensionUnit; // 'm' | 'ft'
  thickness: number;
  thicknessUnit: SmallUnit; // 'mm' | 'in'
  constructionType: 'residential' | 'commercial' | 'light' | 'custom';
  customSteelRateKgPerCum?: number; // e.g. 80 kg/m³
  primaryBarDiaMm?: number; // e.g. 10 mm
  concreteGrade?: ConcreteMixGrade; // 'M20' | 'M25' | 'M15'
  wastagePercent?: number; // e.g. 3% or 5%
}

export interface NormalRccSlabResult {
  lengthM: number;
  widthM: number;
  thicknessMm: number;
  slabAreaSqm: number;
  slabAreaSqft: number;
  concreteVolumeCum: number;
  concreteVolumeCuft: number;
  dryConcreteVolumeCum: number;

  steelRateKgPerCum: number;
  steelRateKgPerSqft: number;
  baseSteelKg: number;
  wastageKg: number;
  totalSteelKg: number;
  totalSteelQuintal: number;
  totalSteelTonnes: number;

  // Commercial Rebar Takeoff
  primaryBarDiaMm: number;
  weightPer12mRodKg: number;
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

  // Shuttering / Formwork
  soffitAreaSqm: number;
  soffitAreaSqft: number;
  sideFormworkSqm: number;
  totalShutteringSqm: number;
  totalShutteringSqft: number;
}

export function calculateNormalRccSlabSteel(input: NormalRccSlabInput): NormalRccSlabResult {
  const {
    length,
    width,
    dimensionUnit = 'm',
    thickness = 125,
    thicknessUnit = 'mm',
    constructionType = 'residential',
    customSteelRateKgPerCum = 80,
    primaryBarDiaMm = 10,
    concreteGrade = 'M20',
    wastagePercent = 3,
  } = input;

  const lengthM = toMeters(length, dimensionUnit);
  const widthM = toMeters(width, dimensionUnit);
  const thicknessMm = toMillimeters(thickness, thicknessUnit);

  const slabAreaSqm = Number((lengthM * widthM).toFixed(3));
  const slabAreaSqft = Number((slabAreaSqm * 10.7639).toFixed(2));
  const concreteVolumeCum = Number((slabAreaSqm * (thicknessMm / 1000)).toFixed(3));
  const concreteVolumeCuft = Number((concreteVolumeCum * 35.3147).toFixed(2));
  const dryConcreteVolumeCum = Number((concreteVolumeCum * 1.54).toFixed(3));

  // Determine Steel rate per m³
  let steelRate = 80; // default CPWD residential
  if (constructionType === 'residential') steelRate = 80;
  else if (constructionType === 'commercial') steelRate = 100;
  else if (constructionType === 'light') steelRate = 70;
  else if (constructionType === 'custom') steelRate = Math.max(10, customSteelRateKgPerCum);

  const baseSteelKg = Number((concreteVolumeCum * steelRate).toFixed(2));
  const wastageKg = Number((baseSteelKg * (Math.max(0, wastagePercent) / 100)).toFixed(2));
  const totalSteelKg = Number((baseSteelKg + wastageKg).toFixed(2));
  const totalSteelQuintal = Number((totalSteelKg / 100).toFixed(2));
  const totalSteelTonnes = Number((totalSteelKg / 1000).toFixed(3));
  const steelRateKgPerSqft = slabAreaSqft > 0 ? Number((totalSteelKg / slabAreaSqft).toFixed(3)) : 0;

  // Commercial 12m Bars & Bundles
  const barUnitWt = getBarUnitWeight(primaryBarDiaMm);
  const weightPer12mRodKg = Number((barUnitWt * 12).toFixed(2));
  const commercial12mRodsCount = weightPer12mRodKg > 0 ? Math.ceil(totalSteelKg / weightPer12mRodKg) : 0;
  const bundlePacking = BARS_PER_BUNDLE[primaryBarDiaMm] || 7;
  const commercialBundlesCount = Number((commercial12mRodsCount / bundlePacking).toFixed(1));

  // Binding wire: approx 10 kg per tonne of steel (1%)
  const bindingWireKg = Number(Math.max(1, (totalSteelKg * 0.01)).toFixed(2));

  // Concrete Mix BOQ
  const mixBreakup = calculateConcreteMixBreakup(concreteVolumeCum, concreteGrade, 1.54);
  const cementBags = mixBreakup.cementBags;
  const sandCum = mixBreakup.sandVolumeM3;
  const sandCuft = mixBreakup.sandVolumeCft;
  const aggregateCum = mixBreakup.aggregateVolumeM3;
  const aggregateCuft = mixBreakup.aggregateVolumeCft;

  // Shuttering
  const soffitAreaSqm = slabAreaSqm;
  const soffitAreaSqft = slabAreaSqft;
  const sideFormworkSqm = Number(((2 * (lengthM + widthM) * (thicknessMm / 1000))).toFixed(2));
  const totalShutteringSqm = Number((soffitAreaSqm + sideFormworkSqm).toFixed(2));
  const totalShutteringSqft = Number((totalShutteringSqm * 10.7639).toFixed(1));

  return {
    lengthM: Number(lengthM.toFixed(3)),
    widthM: Number(widthM.toFixed(3)),
    thicknessMm: Number(thicknessMm.toFixed(1)),
    slabAreaSqm,
    slabAreaSqft,
    concreteVolumeCum,
    concreteVolumeCuft,
    dryConcreteVolumeCum,
    steelRateKgPerCum: steelRate,
    steelRateKgPerSqft,
    baseSteelKg,
    wastageKg,
    totalSteelKg,
    totalSteelQuintal,
    totalSteelTonnes,
    primaryBarDiaMm,
    weightPer12mRodKg,
    commercial12mRodsCount,
    barsPerBundle: bundlePacking,
    commercialBundlesCount,
    bindingWireKg,
    concreteGrade,
    cementBags,
    sandCum,
    sandCuft,
    aggregateCum,
    aggregateCuft,
    soffitAreaSqm,
    soffitAreaSqft,
    sideFormworkSqm,
    totalShutteringSqm,
    totalShutteringSqft,
  };
}

// -------------------------------------------------------------
// ADVANCED DETAILED BBS ENGINE INTERFACES & FUNCTION
// -------------------------------------------------------------

export interface RccSlabSteelDetailedInput {
  // Slab Dimensions
  length: number;
  width: number;
  dimensionUnit: DimensionUnit; // 'm' or 'ft'
  thickness: number;
  thicknessUnit: SmallUnit; // 'mm' or 'in'
  clearCover: number;
  coverUnit: SmallUnit; // 'mm' or 'in'

  // Engineering Detailing Options
  slabTypeSelection?: SlabTypeSelection; // 'auto' | 'one_way' | 'two_way'
  barProfile?: BarProfileType; // 'straight' | 'cranked'
  endAnchorageLengthMm?: number; // standard 2 * 9D hook or custom

  // Short Span Reinforcement (Main Tension Steel)
  mainBarDiaMm: number; // e.g. 10 mm
  mainBarSpacing: number; // e.g. 150 mm
  mainSpacingUnit: SmallUnit; // 'mm' or 'in'

  // Long Span Reinforcement (Main for Two-Way, Distribution for One-Way)
  distBarDiaMm: number; // e.g. 8 mm or 10 mm
  distBarSpacing: number; // e.g. 150 or 200 mm
  distSpacingUnit: SmallUnit; // 'mm' or 'in'

  // Extra Detailing & Allowances
  layers?: number; // 1 (single bottom mesh) or 2 (double mesh)
  extraTopSteelPercent?: number; // e.g. 10% or 15% for negative moment over support beams
  lapAnchoragePercent?: number; // e.g. 5% or 10%
  wastagePercent?: number; // e.g. 3% or 5%
  concreteGrade?: ConcreteMixGrade;
}

export interface DetailedBbsBarItem {
  mark: string;
  description: string;
  diameterMm: number;
  shapeDescription: string;
  spanDirection: string;
  numberOfBars: number;
  cuttingLengthM: number;
  totalLengthM: number;
  unitWeightKgPerM: number;
  totalWeightKg: number;
  rods12mCount: number;
}

export interface ProcurementSummaryItem {
  diameterMm: number;
  totalLengthM: number;
  totalWeightKg: number;
  weightPer12mRodKg: number;
  commercial12mRodsCount: number;
  bundlePacking: number;
  commercialBundlesCount: number;
}

export interface RccSlabSteelDetailedResult {
  // Slab Geometry & Structural Classification
  lengthMeters: number;
  widthMeters: number;
  longSpanMeters: number;
  shortSpanMeters: number;
  aspectRatio: number; // Ly / Lx
  isTwoWaySlab: boolean;
  classificationTitle: string;
  classificationCodeClause: string;
  classificationDescription: string;

  slabAreaSqm: number;
  slabAreaSqft: number;
  thicknessMm: number;
  thicknessInches: number;
  concreteVolumeCum: number;
  concreteVolumeCuft: number;
  clearCoverMm: number;

  // Detailing Profile
  barProfile: BarProfileType;
  crankAdditionalLengthM: number; // 0.42 * H

  // Directional Steel Breakdowns
  shortSpanSteel: {
    label: string;
    role: 'Main Tension Steel';
    diameterMm: number;
    spacingMm: number;
    barsCount: number;
    straightBarsCount: number;
    crankedBarsCount: number;
    straightCuttingLengthM: number;
    crankedCuttingLengthM: number;
    avgCuttingLengthM: number;
    totalLengthM: number;
    unitWeightKgPerM: number;
    totalWeightKg: number;
  };

  longSpanSteel: {
    label: string;
    role: 'Main Tension Steel' | 'Distribution Steel';
    diameterMm: number;
    spacingMm: number;
    barsCount: number;
    straightBarsCount: number;
    crankedBarsCount: number;
    straightCuttingLengthM: number;
    crankedCuttingLengthM: number;
    avgCuttingLengthM: number;
    totalLengthM: number;
    unitWeightKgPerM: number;
    totalWeightKg: number;
  };

  // Base Reinforcement & Allowances
  baseSteelWeightKg: number;
  layersMultiplier: number;
  topSupportExtraSteelKg: number;
  lapAnchorageWeightKg: number;
  subtotalSteelWeightKg: number;
  wastageWeightKg: number;
  totalSteelWeightKg: number;
  totalSteelWeightQuintal: number;
  totalSteelWeightTonnes: number;

  // BBS Schedule Items
  bbsItems: DetailedBbsBarItem[];

  // Commercial Procurement Breakdown
  procurementSchedule: ProcurementSummaryItem[];
  bindingWireKg: number;

  // Concrete & Shuttering BOQ
  concreteGrade: ConcreteMixGrade;
  cementBags: number;
  sandCum: number;
  sandCuft: number;
  aggregateCum: number;
  aggregateCuft: number;
  soffitAreaSqm: number;
  soffitAreaSqft: number;
  sideFormworkSqm: number;
  totalShutteringSqm: number;
  totalShutteringSqft: number;

  // Steel Intensity Indicators
  steelPerSqmKg: number;
  steelPerSqftKg: number;
  steelPerCumConcreteKg: number;
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
    slabTypeSelection = 'auto',
    barProfile = 'straight',
    mainBarDiaMm,
    mainBarSpacing,
    mainSpacingUnit = 'mm',
    distBarDiaMm,
    distBarSpacing,
    distSpacingUnit = 'mm',
    layers = 1,
    extraTopSteelPercent = 0,
    lapAnchoragePercent = 0,
    wastagePercent = 3,
    concreteGrade = 'M20',
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
  const concreteVolumeCuft = Number((concreteVolumeCum * 35.3147).toFixed(2));

  // IS 456 Slab Classification: Ratio r = Ly / Lx
  const aspectRatio = shortSpanM > 0 ? Number((longSpanM / shortSpanM).toFixed(2)) : 1;
  let isTwoWaySlab = aspectRatio < 2.0;

  if (slabTypeSelection === 'one_way') isTwoWaySlab = false;
  if (slabTypeSelection === 'two_way') isTwoWaySlab = true;

  const classificationTitle = isTwoWaySlab ? 'Two-Way Slab (Ly / Lx < 2.0)' : 'One-Way Slab (Ly / Lx ≥ 2.0)';
  const classificationCodeClause = isTwoWaySlab ? 'IS 456:2000 Cl. 24.4' : 'IS 456:2000 Cl. 24.1';
  const classificationDescription = isTwoWaySlab
    ? 'Bending moments occur across both axes. Main tension reinforcement is placed along both the short span and long span.'
    : 'Load is carried predominantly along the shorter span. Primary tension reinforcement is along the short span; distribution reinforcement is along the long span.';

  // Crank / Bent-up depth calculation
  // H = Slab thickness - 2 * Cover - Bar diameter
  // Extra length per 45° crank = 0.42 * H (IS 2502 / SP 34)
  const effH_Mm = Math.max(0, thicknessMm - 2 * coverMm - mainBarDiaMm);
  const crankAdditionalLengthM = Number(((0.42 * effH_Mm) / 1000).toFixed(4));

  // 1. Short Span Steel (Main Tension Steel)
  // Runs along shortSpanM, distributed along longSpanM
  const mainSpacingMm = toMillimeters(mainBarSpacing, mainSpacingUnit);
  const mainUnitWt = getBarUnitWeight(mainBarDiaMm);
  const mainDistributeSpanMm = Math.max(0, longSpanM * 1000 - 2 * coverMm);
  const shortBarsCount = mainSpacingMm > 0 ? Math.ceil(mainDistributeSpanMm / mainSpacingMm) + 1 : 0;

  // End anchorage hooks (2 * 9D)
  const shortHookLengthM = 2 * (9 * (mainBarDiaMm / 1000));
  const shortStraightCutM = Math.max(0, Number((shortSpanM - 2 * coverM + shortHookLengthM).toFixed(3)));
  // Cranked bar has 2 bends (one near each support) = 2 * (0.42 * H)
  const shortCrankedCutM = Math.max(
    0,
    Number((shortStraightCutM + (barProfile === 'cranked' ? 2 * crankAdditionalLengthM : 0)).toFixed(3))
  );

  let shortStraightBars = shortBarsCount;
  let shortCrankedBars = 0;
  if (barProfile === 'cranked') {
    shortCrankedBars = Math.floor(shortBarsCount / 2);
    shortStraightBars = shortBarsCount - shortCrankedBars;
  }

  const shortTotalLenM = Number(
    (shortStraightBars * shortStraightCutM + shortCrankedBars * shortCrankedCutM).toFixed(2)
  );
  const shortTotalWtKg = Number((shortTotalLenM * mainUnitWt).toFixed(2));
  const avgShortCutM = shortBarsCount > 0 ? Number((shortTotalLenM / shortBarsCount).toFixed(3)) : 0;

  // 2. Long Span Steel (Main Steel for Two-Way, Distribution Steel for One-Way)
  // Runs along longSpanM, distributed along shortSpanM
  const distSpacingMm = toMillimeters(distBarSpacing, distSpacingUnit);
  const distUnitWt = getBarUnitWeight(distBarDiaMm);
  const distDistributeSpanMm = Math.max(0, shortSpanM * 1000 - 2 * coverMm);
  const longBarsCount = distSpacingMm > 0 ? Math.ceil(distDistributeSpanMm / distSpacingMm) + 1 : 0;

  const longHookLengthM = 2 * (9 * (distBarDiaMm / 1000));
  const longStraightCutM = Math.max(0, Number((longSpanM - 2 * coverM + longHookLengthM).toFixed(3)));
  const longCrankedCutM = Math.max(
    0,
    Number((longStraightCutM + (barProfile === 'cranked' ? 2 * crankAdditionalLengthM : 0)).toFixed(3))
  );

  let longStraightBars = longBarsCount;
  let longCrankedBars = 0;
  if (barProfile === 'cranked') {
    longCrankedBars = Math.floor(longBarsCount / 2);
    longStraightBars = longBarsCount - longCrankedBars;
  }

  const longTotalLenM = Number((longStraightBars * longStraightCutM + longCrankedBars * longCrankedCutM).toFixed(2));
  const longTotalWtKg = Number((longTotalLenM * distUnitWt).toFixed(2));
  const avgLongCutM = longBarsCount > 0 ? Number((longTotalLenM / longBarsCount).toFixed(3)) : 0;

  // Base Reinforcement & Allowances
  const singleLayerBaseWeightKg = shortTotalWtKg + longTotalWtKg;
  const layersMultiplier = Math.max(1, layers);
  const baseSteelWeightKg = Number((singleLayerBaseWeightKg * layersMultiplier).toFixed(2));

  // Top support extra negative steel
  const topSupportExtraSteelKg = Number(
    (baseSteelWeightKg * (Math.max(0, extraTopSteelPercent) / 100)).toFixed(2)
  );
  // Lap & anchorage
  const lapAnchorageWeightKg = Number(
    (baseSteelWeightKg * (Math.max(0, lapAnchoragePercent) / 100)).toFixed(2)
  );
  const subtotalSteelWeightKg = baseSteelWeightKg + topSupportExtraSteelKg + lapAnchorageWeightKg;
  // Wastage
  const wastageWeightKg = Number((subtotalSteelWeightKg * (Math.max(0, wastagePercent) / 100)).toFixed(2));
  const totalSteelWeightKg = Number((subtotalSteelWeightKg + wastageWeightKg).toFixed(2));
  const totalSteelWeightQuintal = Number((totalSteelWeightKg / 100).toFixed(2));
  const totalSteelWeightTonnes = Number((totalSteelWeightKg / 1000).toFixed(3));

  // Intensity Metrics
  const steelPerSqmKg = slabAreaSqm > 0 ? Number((totalSteelWeightKg / slabAreaSqm).toFixed(2)) : 0;
  const steelPerSqftKg = slabAreaSqft > 0 ? Number((totalSteelWeightKg / slabAreaSqft).toFixed(3)) : 0;
  const steelPerCumConcreteKg =
    concreteVolumeCum > 0 ? Number((totalSteelWeightKg / concreteVolumeCum).toFixed(1)) : 0;

  // Build Bar Bending Schedule (BBS) Table Items
  const bbsItems: DetailedBbsBarItem[] = [];

  if (barProfile === 'straight') {
    bbsItems.push({
      mark: 'B1',
      description: 'Short Span Main Bottom Bars',
      diameterMm: mainBarDiaMm,
      shapeDescription: 'Straight with 90° hooks',
      spanDirection: `Short Span (${shortSpanM.toFixed(2)}m)`,
      numberOfBars: shortBarsCount,
      cuttingLengthM: shortStraightCutM,
      totalLengthM: shortTotalLenM,
      unitWeightKgPerM: mainUnitWt,
      totalWeightKg: shortTotalWtKg,
      rods12mCount: Math.ceil(shortTotalLenM / 12),
    });

    bbsItems.push({
      mark: 'B2',
      description: isTwoWaySlab ? 'Long Span Main Bottom Bars' : 'Long Span Distribution Bars',
      diameterMm: distBarDiaMm,
      shapeDescription: 'Straight with 90° hooks',
      spanDirection: `Long Span (${longSpanM.toFixed(2)}m)`,
      numberOfBars: longBarsCount,
      cuttingLengthM: longStraightCutM,
      totalLengthM: longTotalLenM,
      unitWeightKgPerM: distUnitWt,
      totalWeightKg: longTotalWtKg,
      rods12mCount: Math.ceil(longTotalLenM / 12),
    });
  } else {
    // Cranked profile
    bbsItems.push({
      mark: 'B1-S',
      description: 'Short Span Main Straight Bars',
      diameterMm: mainBarDiaMm,
      shapeDescription: 'Straight with 90° hooks',
      spanDirection: `Short Span (${shortSpanM.toFixed(2)}m)`,
      numberOfBars: shortStraightBars,
      cuttingLengthM: shortStraightCutM,
      totalLengthM: Number((shortStraightBars * shortStraightCutM).toFixed(2)),
      unitWeightKgPerM: mainUnitWt,
      totalWeightKg: Number((shortStraightBars * shortStraightCutM * mainUnitWt).toFixed(2)),
      rods12mCount: Math.ceil((shortStraightBars * shortStraightCutM) / 12),
    });

    bbsItems.push({
      mark: 'B1-C',
      description: 'Short Span Main Cranked Bars (Bent-up @ 45° at L/4)',
      diameterMm: mainBarDiaMm,
      shapeDescription: 'Double Cranked (45°)',
      spanDirection: `Short Span (${shortSpanM.toFixed(2)}m)`,
      numberOfBars: shortCrankedBars,
      cuttingLengthM: shortCrankedCutM,
      totalLengthM: Number((shortCrankedBars * shortCrankedCutM).toFixed(2)),
      unitWeightKgPerM: mainUnitWt,
      totalWeightKg: Number((shortCrankedBars * shortCrankedCutM * mainUnitWt).toFixed(2)),
      rods12mCount: Math.ceil((shortCrankedBars * shortCrankedCutM) / 12),
    });

    bbsItems.push({
      mark: 'B2-S',
      description: isTwoWaySlab ? 'Long Span Main Straight Bars' : 'Long Span Dist Straight Bars',
      diameterMm: distBarDiaMm,
      shapeDescription: 'Straight with 90° hooks',
      spanDirection: `Long Span (${longSpanM.toFixed(2)}m)`,
      numberOfBars: longStraightBars,
      cuttingLengthM: longStraightCutM,
      totalLengthM: Number((longStraightBars * longStraightCutM).toFixed(2)),
      unitWeightKgPerM: distUnitWt,
      totalWeightKg: Number((longStraightBars * longStraightCutM * distUnitWt).toFixed(2)),
      rods12mCount: Math.ceil((longStraightBars * longStraightCutM) / 12),
    });

    bbsItems.push({
      mark: 'B2-C',
      description: isTwoWaySlab
        ? 'Long Span Main Cranked Bars (Bent-up @ 45° at L/4)'
        : 'Long Span Dist Cranked Bars',
      diameterMm: distBarDiaMm,
      shapeDescription: 'Double Cranked (45°)',
      spanDirection: `Long Span (${longSpanM.toFixed(2)}m)`,
      numberOfBars: longCrankedBars,
      cuttingLengthM: longCrankedCutM,
      totalLengthM: Number((longCrankedBars * longCrankedCutM).toFixed(2)),
      unitWeightKgPerM: distUnitWt,
      totalWeightKg: Number((longCrankedBars * longCrankedCutM * distUnitWt).toFixed(2)),
      rods12mCount: Math.ceil((longCrankedBars * longCrankedCutM) / 12),
    });
  }

  // If top extra steel is present, add as BBS item
  if (topSupportExtraSteelKg > 0) {
    const extraTopDia = mainBarDiaMm;
    const extraTopUnitWt = getBarUnitWeight(extraTopDia);
    const extraTopLenM = extraTopUnitWt > 0 ? Number((topSupportExtraSteelKg / extraTopUnitWt).toFixed(2)) : 0;
    bbsItems.push({
      mark: 'T-EXT',
      description: 'Top Support Negative Moment Extra Bars (Supports Zone L/4)',
      diameterMm: extraTopDia,
      shapeDescription: 'Straight Curtailment Bars',
      spanDirection: 'Support Beam Margins',
      numberOfBars: Math.ceil(extraTopLenM / Math.max(1, shortSpanM / 4)),
      cuttingLengthM: Number((shortSpanM / 4).toFixed(3)),
      totalLengthM: extraTopLenM,
      unitWeightKgPerM: extraTopUnitWt,
      totalWeightKg: topSupportExtraSteelKg,
      rods12mCount: Math.ceil(extraTopLenM / 12),
    });
  }

  // Commercial Procurement Summary (Grouped by Diameter)
  const diaMap = new Map<number, { lengthM: number; weightKg: number }>();
  bbsItems.forEach((b) => {
    const prev = diaMap.get(b.diameterMm) || { lengthM: 0, weightKg: 0 };
    diaMap.set(b.diameterMm, {
      lengthM: prev.lengthM + b.totalLengthM,
      weightKg: prev.weightKg + b.totalWeightKg,
    });
  });

  // Factor in laps and wastage into procurement quantities
  const grossFactor = (subtotalSteelWeightKg > 0 ? totalSteelWeightKg / subtotalSteelWeightKg : 1.0) * (lapAnchoragePercent > 0 ? 1 + lapAnchoragePercent / 100 : 1.0);

  const procurementSchedule: ProcurementSummaryItem[] = [];
  diaMap.forEach((val, dia) => {
    const grossWeight = Number((val.weightKg * grossFactor).toFixed(2));
    const grossLength = Number((val.lengthM * grossFactor).toFixed(2));
    const unitWt = getBarUnitWeight(dia);
    const wt12m = Number((unitWt * 12).toFixed(2));
    const rodsCount = wt12m > 0 ? Math.ceil(grossWeight / wt12m) : Math.ceil(grossLength / 12);
    const bundlePacking = BARS_PER_BUNDLE[dia] || 7;
    const bundlesCount = Number((rodsCount / bundlePacking).toFixed(1));

    procurementSchedule.push({
      diameterMm: dia,
      totalLengthM: grossLength,
      totalWeightKg: grossWeight,
      weightPer12mRodKg: wt12m,
      commercial12mRodsCount: rodsCount,
      bundlePacking,
      commercialBundlesCount: bundlesCount,
    });
  });

  // Binding wire: approx 10-12 kg per tonne of rebar
  const bindingWireKg = Number(Math.max(1, totalSteelWeightKg * 0.01).toFixed(2));

  // Concrete Mix & Shuttering BOQ
  const mixBreakup = calculateConcreteMixBreakup(concreteVolumeCum, concreteGrade, 1.54);
  const cementBags = mixBreakup.cementBags;
  const sandCum = mixBreakup.sandVolumeM3;
  const sandCuft = mixBreakup.sandVolumeCft;
  const aggregateCum = mixBreakup.aggregateVolumeM3;
  const aggregateCuft = mixBreakup.aggregateVolumeCft;

  const soffitAreaSqm = slabAreaSqm;
  const soffitAreaSqft = slabAreaSqft;
  const sideFormworkSqm = Number((2 * (lengthM + widthM) * (thicknessMm / 1000)).toFixed(2));
  const totalShutteringSqm = Number((soffitAreaSqm + sideFormworkSqm).toFixed(2));
  const totalShutteringSqft = Number((totalShutteringSqm * 10.7639).toFixed(1));

  return {
    lengthMeters: Number(lengthM.toFixed(3)),
    widthMeters: Number(widthM.toFixed(3)),
    longSpanMeters: Number(longSpanM.toFixed(3)),
    shortSpanMeters: Number(shortSpanM.toFixed(3)),
    aspectRatio,
    isTwoWaySlab,
    classificationTitle,
    classificationCodeClause,
    classificationDescription,
    slabAreaSqm,
    slabAreaSqft,
    thicknessMm: Number(thicknessMm.toFixed(1)),
    thicknessInches,
    concreteVolumeCum,
    concreteVolumeCuft,
    clearCoverMm: Number(coverMm.toFixed(1)),

    barProfile,
    crankAdditionalLengthM,

    shortSpanSteel: {
      label: 'Along Short Span (Maximum Moment Resistance)',
      role: 'Main Tension Steel',
      diameterMm: mainBarDiaMm,
      spacingMm: Number(mainSpacingMm.toFixed(1)),
      barsCount: shortBarsCount,
      straightBarsCount: shortStraightBars,
      crankedBarsCount: shortCrankedBars,
      straightCuttingLengthM: shortStraightCutM,
      crankedCuttingLengthM: shortCrankedCutM,
      avgCuttingLengthM: avgShortCutM,
      totalLengthM: shortTotalLenM,
      unitWeightKgPerM: mainUnitWt,
      totalWeightKg: shortTotalWtKg,
    },

    longSpanSteel: {
      label: isTwoWaySlab ? 'Along Long Span (Two-Way Main Steel)' : 'Along Long Span (Distribution Steel)',
      role: isTwoWaySlab ? 'Main Tension Steel' : 'Distribution Steel',
      diameterMm: distBarDiaMm,
      spacingMm: Number(distSpacingMm.toFixed(1)),
      barsCount: longBarsCount,
      straightBarsCount: longStraightBars,
      crankedBarsCount: longCrankedBars,
      straightCuttingLengthM: longStraightCutM,
      crankedCuttingLengthM: longCrankedCutM,
      avgCuttingLengthM: avgLongCutM,
      totalLengthM: longTotalLenM,
      unitWeightKgPerM: distUnitWt,
      totalWeightKg: longTotalWtKg,
    },

    baseSteelWeightKg,
    layersMultiplier,
    topSupportExtraSteelKg,
    lapAnchorageWeightKg,
    subtotalSteelWeightKg,
    wastageWeightKg,
    totalSteelWeightKg,
    totalSteelWeightQuintal,
    totalSteelWeightTonnes,

    bbsItems,
    procurementSchedule,
    bindingWireKg,

    concreteGrade,
    cementBags,
    sandCum,
    sandCuft,
    aggregateCum,
    aggregateCuft,
    soffitAreaSqm,
    soffitAreaSqft,
    sideFormworkSqm,
    totalShutteringSqm,
    totalShutteringSqft,

    steelPerSqmKg,
    steelPerSqftKg,
    steelPerCumConcreteKg,
  };
}
