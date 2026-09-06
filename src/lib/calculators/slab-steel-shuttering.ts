/**
 * Comprehensive Slab Steel & Shuttering (Formwork & Scaffolding) Calculation Engine
 *
 * Implements:
 * 1. Normal Mode (Contractor Thumb Rule & Site Material Takeoff):
 *    - Bottom soffit area, side edge formwork, opening deductions
 *    - Commercial shuttering plywood sheets (8ft x 4ft / 32 sq.ft with 5% wastage)
 *    - Steel shuttering plates (3ft x 2ft / 6 sq.ft or 900x600mm)
 *    - Timber runners / battens (4"x3" or 3"x2" @ 1.5-2 ft c/c)
 *    - Acrow props scaffolding grid & base sole plates
 *    - Shuttering release oil (1 L per 28 m² / 300 sq.ft)
 *    - Steel estimate via CPWD volume rate (80-100 kg/m³) or area rate (8-12 kg/m²)
 *    - Commercial 12m rebar rods & bundles
 *    - Concrete mix BOQ (Cement bags, Sand, Aggregate) with dry factor 1.54
 *
 * 2. Advanced Mode (Engineering BBS + Staging Grid):
 *    - One-Way vs Two-Way slab classification (Ly / Lx)
 *    - Opening perimeter edge formwork additions
 *    - Detailed reinforcement with cover deduction & 2 * 9D hooks
 *    - Top negative support extra steel / cranked bars
 *    - Diameter-wise commercial rebar schedule
 *    - Full formwork & scaffolding bill of quantities (BOQ)
 */

export type DimensionUnit = 'm' | 'ft';
export type SmallUnit = 'mm' | 'in';
export type AreaUnit = 'sqm' | 'sqft';
export type SteelMethod = 'volume_rate' | 'area_rate' | 'detailed_bbs';
export type ConcreteMixGrade = 'M20' | 'M25' | 'M15';

export const STANDARD_PLY_SHEET_SQFT = 32; // 8 ft x 4 ft = 2.973 m²
export const STANDARD_PLY_SHEET_SQM = 2.973;
export const STANDARD_STEEL_PLATE_SQFT = 6; // 3 ft x 2 ft = 0.557 m²
export const STANDARD_STEEL_PLATE_SQM = 0.557;
export const SHUTTERING_OIL_COVERAGE_SQM = 28; // ~1 Liter per 28 m² (300 sq.ft)

// Commercial bundle packing (India / International standard)
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

export const CONCRETE_MIX_SPECS: Record<
  ConcreteMixGrade,
  { label: string; cement: number; sand: number; aggregate: number }
> = {
  M20: { label: 'M20 (1 : 1.5 : 3) - Standard Slab', cement: 1, sand: 1.5, aggregate: 3 },
  M25: { label: 'M25 (1 : 1 : 2) - Heavy / Commercial', cement: 1, sand: 1, aggregate: 2 },
  M15: { label: 'M15 (1 : 2 : 4) - Lean / Low Load', cement: 1, sand: 2, aggregate: 4 },
};

export function getRebarUnitWeightKgM(diaMm: number): number {
  if (isNaN(diaMm) || diaMm <= 0) return 0;
  return Number(((diaMm * diaMm) / 162.28).toFixed(4));
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
// CONCRETE MIX BREAKDOWN FUNCTION (DRY FACTOR 1.54)
// -------------------------------------------------------------
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

  const dryVolumeM3 = Number((wetVolume * dryFactor).toFixed(4));
  const cementVolumeM3 = Number((dryVolumeM3 * (cementRatio / totalRatio)).toFixed(4));
  const cementWeightKg = Number((cementVolumeM3 * 1440).toFixed(2));
  const cementBagsExact = Number((cementWeightKg / 50).toFixed(2));
  const cementBags = Math.ceil(cementBagsExact);

  const sandVolumeM3 = Number((dryVolumeM3 * (sandRatio / totalRatio)).toFixed(3));
  const sandVolumeCft = Number((sandVolumeM3 * 35.3147).toFixed(1));

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

// -------------------------------------------------------------
// NORMAL / THUMB-RULE ESTIMATION FUNCTION
// -------------------------------------------------------------
export interface NormalSlabShutteringInput {
  length: number;
  width: number;
  dimensionUnit: DimensionUnit; // 'm' | 'ft'
  thickness: number;
  thicknessUnit: SmallUnit; // 'mm' | 'in'
  includeBottomSoffit?: boolean;
  includeSideShuttering?: boolean;
  openingArea?: number;
  openingUnit?: AreaUnit; // 'sqm' | 'sqft'
  steelRateType?: 'volume' | 'area';
  steelRateValue?: number; // e.g. 80 kg/m³ or 10 kg/m²
  primaryBarDiaMm?: number; // 8, 10, 12 mm
  propSpacingLength?: number; // e.g. 1.2m
  propSpacingWidth?: number; // e.g. 1.2m
  propSpacingUnit?: DimensionUnit;
  concreteGrade?: ConcreteMixGrade;
  plyWastagePercent?: number; // 5% default
}

export interface NormalSlabShutteringResult {
  slabLengthM: number;
  slabWidthM: number;
  slabThicknessMm: number;
  grossAreaSqm: number;
  slabGrossAreaSqm: number;
  grossAreaSqft: number;
  openingAreaSqm: number;
  openingAreaSqft: number;
  netSlabAreaSqm: number;
  netSlabAreaSqft: number;
  perimeterM: number;
  perimeterFt: number;
  concreteVolumeCum: number;
  concreteVolumeCuft: number;

  // Shuttering Area
  bottomSoffitSqm: number;
  bottomSoffitSqft: number;
  sideShutteringSqm: number;
  sideShutteringSqft: number;
  totalShutteringSqm: number;
  totalShutteringSqft: number;

  // Formwork Materials Takeoff
  plywoodSheetsCount: number; // 8x4 ft (32 sqft)
  steelPlatesCount: number; // 3x2 ft (6 sqft)
  timberRunnersRmt: number; // Running meters
  timberRunnersRft: number; // Running feet
  shutteringOilLiters: number;

  // Staging Props Scaffolding
  propSpacingLengthM: number;
  propSpacingWidthM: number;
  rowsAlongLength: number;
  rowsAlongWidth: number;
  totalPropsCount: number;
  baseSolePlatesCount: number;

  // Steel Reinforcement
  steelWeightKg: number;
  steelWeightQuintal: number;
  steelWeightTonnes: number;
  primaryBarDiaMm: number;
  commercial12mRodsCount: number;
  commercialBundlesCount: number;
  barsPerBundle: number;
  bindingWireKg: number;

  // Concrete Mix BOQ
  mixBreakup: ConcreteMixBreakup;
}

export function calculateNormalSlabSteelShuttering(input: NormalSlabShutteringInput): NormalSlabShutteringResult {
  const {
    length,
    width,
    dimensionUnit = 'm',
    thickness = 125,
    thicknessUnit = 'mm',
    includeBottomSoffit = true,
    includeSideShuttering = true,
    openingArea = 0,
    openingUnit = 'sqm',
    steelRateType = 'volume',
    steelRateValue = 80,
    primaryBarDiaMm = 10,
    propSpacingLength = 1.2,
    propSpacingWidth = 1.2,
    propSpacingUnit = 'm',
    concreteGrade = 'M20',
    plyWastagePercent = 5,
  } = input;

  const L = toMeters(length, dimensionUnit);
  const W = toMeters(width, dimensionUnit);
  const thicknessMm = toMillimeters(thickness, thicknessUnit);
  const T = thicknessMm / 1000;

  const grossAreaSqm = Number((L * W).toFixed(3));
  const grossAreaSqft = Number((grossAreaSqm * 10.7639).toFixed(2));

  let rawOpening = Number(openingArea) || 0;
  let openingSqm = openingUnit === 'sqft' ? rawOpening / 10.7639 : rawOpening;
  openingSqm = Math.min(grossAreaSqm * 0.99, Math.max(0, openingSqm));
  const openingSqft = Number((openingSqm * 10.7639).toFixed(2));

  const netSlabAreaSqm = Number((grossAreaSqm - openingSqm).toFixed(3));
  const netSlabAreaSqft = Number((netSlabAreaSqm * 10.7639).toFixed(2));
  const perimeterM = Number((2 * (L + W)).toFixed(3));
  const perimeterFt = Number((perimeterM * 3.28084).toFixed(2));

  const concreteVolumeCum = Number((netSlabAreaSqm * T).toFixed(3));
  const concreteVolumeCuft = Number((concreteVolumeCum * 35.3147).toFixed(2));

  // Shuttering Area
  const bottomSoffitSqm = includeBottomSoffit ? netSlabAreaSqm : 0;
  const bottomSoffitSqft = Number((bottomSoffitSqm * 10.7639).toFixed(2));

  const sideShutteringSqm = includeSideShuttering ? Number((perimeterM * T).toFixed(3)) : 0;
  const sideShutteringSqft = Number((sideShutteringSqm * 10.7639).toFixed(2));

  const totalShutteringSqm = Number((bottomSoffitSqm + sideShutteringSqm).toFixed(3));
  const totalShutteringSqft = Number((totalShutteringSqm * 10.7639).toFixed(2));

  // Formwork Materials
  const plyWasteFactor = 1 + Math.max(0, plyWastagePercent) / 100;
  const plywoodSheetsCount = Math.ceil((totalShutteringSqft / STANDARD_PLY_SHEET_SQFT) * plyWasteFactor);
  const steelPlatesCount = Math.ceil(totalShutteringSqft / STANDARD_STEEL_PLATE_SQFT);
  // Timber runners: placed at ~0.5m (20 inches) intervals under the soffit
  const runnerRows = Math.ceil(L / 0.5) + 1;
  const timberRunnersRmt = Number((runnerRows * W).toFixed(1));
  const timberRunnersRft = Number((timberRunnersRmt * 3.28084).toFixed(1));
  const shutteringOilLiters = Number(Math.max(0.5, totalShutteringSqm / SHUTTERING_OIL_COVERAGE_SQM).toFixed(1));

  // Staging Props Scaffolding
  const propSpL = toMeters(propSpacingLength, propSpacingUnit);
  const propSpW = toMeters(propSpacingWidth, propSpacingUnit);
  const rowsAlongLength = Math.ceil(L / Math.max(0.3, propSpL)) + 1;
  const rowsAlongWidth = Math.ceil(W / Math.max(0.3, propSpW)) + 1;
  const totalPropsCount = rowsAlongLength * rowsAlongWidth;
  const baseSolePlatesCount = totalPropsCount;

  // Steel Reinforcement Takeoff
  let steelWeightKg = 0;
  if (steelRateType === 'volume') {
    steelWeightKg = Number((concreteVolumeCum * Math.max(10, steelRateValue)).toFixed(1));
  } else {
    // Area rate
    const ratePerSqm = steelRateValue;
    steelWeightKg = Number((netSlabAreaSqm * Math.max(1, ratePerSqm)).toFixed(1));
  }
  const steelWeightQuintal = Number((steelWeightKg / 100).toFixed(2));
  const steelWeightTonnes = Number((steelWeightKg / 1000).toFixed(3));

  const barDia = Math.max(6, primaryBarDiaMm);
  const unitWt = getRebarUnitWeightKgM(barDia);
  const wt12m = Number((unitWt * 12).toFixed(2));
  const commercial12mRodsCount = wt12m > 0 ? Math.ceil(steelWeightKg / wt12m) : 0;
  const bundlePacking = BARS_PER_BUNDLE[barDia] || 7;
  const commercialBundlesCount = Number((commercial12mRodsCount / bundlePacking).toFixed(1));
  const bindingWireKg = Number(Math.max(1, steelWeightKg * 0.01).toFixed(1));

  // Concrete Mix Breakup
  const mixBreakup = calculateConcreteMixBreakup(concreteVolumeCum, concreteGrade, 1.54);

  return {
    slabLengthM: Number(L.toFixed(3)),
    slabWidthM: Number(W.toFixed(3)),
    slabThicknessMm: Number(thicknessMm.toFixed(1)),
    grossAreaSqm,
    slabGrossAreaSqm: grossAreaSqm,
    grossAreaSqft,
    openingAreaSqm: Number(openingSqm.toFixed(3)),
    openingAreaSqft: openingSqft,
    netSlabAreaSqm,
    netSlabAreaSqft,
    perimeterM,
    perimeterFt,
    concreteVolumeCum,
    concreteVolumeCuft,

    bottomSoffitSqm,
    bottomSoffitSqft,
    sideShutteringSqm,
    sideShutteringSqft,
    totalShutteringSqm,
    totalShutteringSqft,

    plywoodSheetsCount,
    steelPlatesCount,
    timberRunnersRmt,
    timberRunnersRft,
    shutteringOilLiters,

    propSpacingLengthM: Number(propSpL.toFixed(2)),
    propSpacingWidthM: Number(propSpW.toFixed(2)),
    rowsAlongLength,
    rowsAlongWidth,
    totalPropsCount,
    baseSolePlatesCount,

    steelWeightKg,
    steelWeightQuintal,
    steelWeightTonnes,
    primaryBarDiaMm: barDia,
    commercial12mRodsCount,
    commercialBundlesCount,
    barsPerBundle: bundlePacking,
    bindingWireKg,

    mixBreakup,
  };
}

// -------------------------------------------------------------
// ADVANCED BBS & STAGING ENGINEERING INTERFACES & FUNCTION
// -------------------------------------------------------------
export interface AdvancedSlabShutteringInput {
  length: number;
  width: number;
  dimensionUnit: DimensionUnit;
  thickness: number;
  thicknessUnit: SmallUnit;
  clearCoverMm?: number;

  includeBottomSoffit?: boolean;
  includeSideShuttering?: boolean;
  openingArea?: number;
  openingUnit?: AreaUnit;
  includeOpeningPerimeterSideFormwork?: boolean;

  // Short Span Main Steel
  mainBarDiaMm: number;
  mainBarSpacingMm: number;

  // Long Span Steel
  distBarDiaMm: number;
  distBarSpacingMm: number;

  // Detailing Options
  includeTopSteel?: boolean;
  extraTopSteelPercent?: number; // 10%
  wastagePercent?: number; // 3%
  lapsPercent?: number; // 5%

  // Staging Props
  propSpacingLengthM?: number;
  propSpacingWidthM?: number;

  concreteGrade?: ConcreteMixGrade;
}

export interface DetailedBbsItem {
  mark: string;
  description: string;
  diaMm: number;
  shape: string;
  barCount: number;
  cutLengthM: number;
  totalLengthM: number;
  unitWeightKgM: number;
  totalWeightKg: number;
  rods12m: number;
}

export interface AdvancedSlabShutteringResult {
  slabLengthM: number;
  slabWidthM: number;
  aspectRatio: number; // Ly / Lx
  isTwoWaySlab: boolean;
  slabThicknessMm: number;
  clearCoverMm: number;
  grossAreaSqm: number;
  slabGrossAreaSqm: number;
  grossAreaSqft: number;
  openingAreaSqm: number;
  openingAreaSqft: number;
  netSlabAreaSqm: number;
  netSlabAreaSqft: number;
  perimeterM: number;
  concreteVolumeCum: number;
  concreteVolumeCuft: number;

  // Shuttering Takeoff
  bottomSoffitSqm: number;
  bottomSoffitSqft: number;
  outerSideShutteringSqm: number;
  openingEdgeShutteringSqm: number;
  totalShutteringSqm: number;
  totalShutteringSqft: number;

  plywoodSheetsCount: number;
  steelPlatesCount: number;
  timberRunnersRmt: number;
  timberRunnersRft: number;
  shutteringOilLiters: number;

  // Props & Scaffolding
  propSpacingLengthM: number;
  propSpacingWidthM: number;
  rowsAlongLength: number;
  rowsAlongWidth: number;
  totalPropsCount: number;
  baseSolePlatesCount: number;
  bracingPipesRmt: number;

  // Steel BBS Takeoff
  bbsItems: DetailedBbsItem[];
  baseSteelKg: number;
  extraTopSteelKg: number;
  lapsKg: number;
  wastageKg: number;
  totalSteelWeightKg: number;
  totalSteelWeightQuintal: number;
  totalSteelWeightTonnes: number;

  // Commercial Procurement Schedule
  procurement: Array<{
    diaMm: number;
    totalWeightKg: number;
    weightPer12mRod: number;
    rodsCount: number;
    bundlePacking: number;
    bundlesCount: number;
  }>;
  bindingWireKg: number;

  mixBreakup: ConcreteMixBreakup;
}

export function calculateAdvancedSlabSteelShuttering(input: AdvancedSlabShutteringInput): AdvancedSlabShutteringResult {
  const {
    length,
    width,
    dimensionUnit = 'm',
    thickness = 125,
    thicknessUnit = 'mm',
    clearCoverMm = 15,
    includeBottomSoffit = true,
    includeSideShuttering = true,
    openingArea = 0,
    openingUnit = 'sqm',
    includeOpeningPerimeterSideFormwork = true,
    mainBarDiaMm = 10,
    mainBarSpacingMm = 150,
    distBarDiaMm = 8,
    distBarSpacingMm = 150,
    includeTopSteel = true,
    extraTopSteelPercent = 10,
    wastagePercent = 3,
    lapsPercent = 5,
    propSpacingLengthM = 1.2,
    propSpacingWidthM = 1.2,
    concreteGrade = 'M20',
  } = input;

  const L = toMeters(length, dimensionUnit);
  const W = toMeters(width, dimensionUnit);
  const thicknessMm = toMillimeters(thickness, thicknessUnit);
  const T = thicknessMm / 1000;
  const coverM = clearCoverMm / 1000;

  const longSpanM = Math.max(L, W);
  const shortSpanM = Math.min(L, W);
  const aspectRatio = shortSpanM > 0 ? Number((longSpanM / shortSpanM).toFixed(2)) : 1;
  const isTwoWaySlab = aspectRatio < 2.0;

  const grossAreaSqm = Number((L * W).toFixed(3));
  const grossAreaSqft = Number((grossAreaSqm * 10.7639).toFixed(2));

  let rawOpening = Number(openingArea) || 0;
  let openingSqm = openingUnit === 'sqft' ? rawOpening / 10.7639 : rawOpening;
  openingSqm = Math.min(grossAreaSqm * 0.99, Math.max(0, openingSqm));
  const openingSqft = Number((openingSqm * 10.7639).toFixed(2));

  const netSlabAreaSqm = Number((grossAreaSqm - openingSqm).toFixed(3));
  const netSlabAreaSqft = Number((netSlabAreaSqm * 10.7639).toFixed(2));
  const perimeterM = Number((2 * (L + W)).toFixed(3));

  const concreteVolumeCum = Number((netSlabAreaSqm * T).toFixed(3));
  const concreteVolumeCuft = Number((concreteVolumeCum * 35.3147).toFixed(2));

  // Shuttering Area
  const bottomSoffitSqm = includeBottomSoffit ? netSlabAreaSqm : 0;
  const bottomSoffitSqft = Number((bottomSoffitSqm * 10.7639).toFixed(2));

  const outerSideShutteringSqm = includeSideShuttering ? Number((perimeterM * T).toFixed(3)) : 0;
  // Opening perimeter side edge formwork (e.g. square opening side shuttering = 4 * sqrt(opening) * T)
  const openingPerimeterM = openingSqm > 0 && includeOpeningPerimeterSideFormwork ? 4 * Math.sqrt(openingSqm) : 0;
  const openingEdgeShutteringSqm = Number((openingPerimeterM * T).toFixed(3));

  const totalShutteringSqm = Number((bottomSoffitSqm + outerSideShutteringSqm + openingEdgeShutteringSqm).toFixed(3));
  const totalShutteringSqft = Number((totalShutteringSqm * 10.7639).toFixed(2));

  // Formwork Materials
  const plywoodSheetsCount = Math.ceil((totalShutteringSqft / STANDARD_PLY_SHEET_SQFT) * 1.05);
  const steelPlatesCount = Math.ceil(totalShutteringSqft / STANDARD_STEEL_PLATE_SQFT);
  const runnerRows = Math.ceil(L / 0.5) + 1;
  const timberRunnersRmt = Number((runnerRows * W).toFixed(1));
  const timberRunnersRft = Number((timberRunnersRmt * 3.28084).toFixed(1));
  const shutteringOilLiters = Number(Math.max(0.5, totalShutteringSqm / SHUTTERING_OIL_COVERAGE_SQM).toFixed(1));

  // Acrow Props & Staging
  const propSpL = Math.max(0.3, propSpacingLengthM);
  const propSpW = Math.max(0.3, propSpacingWidthM);
  const rowsAlongLength = Math.ceil(L / propSpL) + 1;
  const rowsAlongWidth = Math.ceil(W / propSpW) + 1;
  const totalPropsCount = rowsAlongLength * rowsAlongWidth;
  const baseSolePlatesCount = totalPropsCount;
  // Horizontal bracing pipes: 2 tier horizontal pipes along grid lines
  const bracingPipesRmt = Number((rowsAlongLength * W + rowsAlongWidth * L).toFixed(1));

  // BBS Steel Detailing
  const bbsItems: DetailedBbsItem[] = [];

  // Short Span Main Steel (Placed across Long Span)
  const mainDia = Math.max(6, mainBarDiaMm);
  const mainSpMm = Math.max(50, mainBarSpacingMm);
  const mainDistributeMm = Math.max(0, longSpanM * 1000 - 2 * clearCoverMm);
  const shortBarsCount = Math.ceil(mainDistributeMm / mainSpMm) + 1;
  const shortHookM = 2 * (9 * (mainDia / 1000));
  const shortCutLengthM = Math.max(0, Number((shortSpanM - 2 * coverM + shortHookM).toFixed(3)));
  const shortTotalLenM = Number((shortBarsCount * shortCutLengthM).toFixed(2));
  const shortUnitWt = getRebarUnitWeightKgM(mainDia);
  const shortTotalWtKg = Number((shortTotalLenM * shortUnitWt).toFixed(2));

  bbsItems.push({
    mark: 'B1',
    description: 'Short Span Main Bottom Reinforcement',
    diaMm: mainDia,
    shape: 'Straight with 90° Hooks',
    barCount: shortBarsCount,
    cutLengthM: shortCutLengthM,
    totalLengthM: shortTotalLenM,
    unitWeightKgM: shortUnitWt,
    totalWeightKg: shortTotalWtKg,
    rods12m: Math.ceil(shortTotalLenM / 12),
  });

  // Long Span Steel (Placed across Short Span)
  const distDia = Math.max(6, distBarDiaMm);
  const distSpMm = Math.max(50, distBarSpacingMm);
  const distDistributeMm = Math.max(0, shortSpanM * 1000 - 2 * clearCoverMm);
  const longBarsCount = Math.ceil(distDistributeMm / distSpMm) + 1;
  const longHookM = 2 * (9 * (distDia / 1000));
  const longCutLengthM = Math.max(0, Number((longSpanM - 2 * coverM + longHookM).toFixed(3)));
  const longTotalLenM = Number((longBarsCount * longCutLengthM).toFixed(2));
  const distUnitWt = getRebarUnitWeightKgM(distDia);
  const longTotalWtKg = Number((longTotalLenM * distUnitWt).toFixed(2));

  bbsItems.push({
    mark: 'B2',
    description: isTwoWaySlab ? 'Long Span Main Bottom Reinforcement' : 'Long Span Distribution Reinforcement',
    diaMm: distDia,
    shape: 'Straight with 90° Hooks',
    barCount: longBarsCount,
    cutLengthM: longCutLengthM,
    totalLengthM: longTotalLenM,
    unitWeightKgM: distUnitWt,
    totalWeightKg: longTotalWtKg,
    rods12m: Math.ceil(longTotalLenM / 12),
  });

  const baseSteelKg = Number((shortTotalWtKg + longTotalWtKg).toFixed(2));
  const extraTopSteelKg = includeTopSteel
    ? Number((baseSteelKg * (Math.max(0, extraTopSteelPercent) / 100)).toFixed(2))
    : 0;

  if (extraTopSteelKg > 0) {
    const topUnitWt = getRebarUnitWeightKgM(mainDia);
    const topTotalLenM = topUnitWt > 0 ? Number((extraTopSteelKg / topUnitWt).toFixed(1)) : 0;
    bbsItems.push({
      mark: 'T-EXT',
      description: 'Top Support Extra Negative Steel (L/4 Zone)',
      diaMm: mainDia,
      shape: 'Curtailment Straight',
      barCount: Math.ceil(topTotalLenM / Math.max(1, shortSpanM / 4)),
      cutLengthM: Number((shortSpanM / 4).toFixed(3)),
      totalLengthM: topTotalLenM,
      unitWeightKgM: topUnitWt,
      totalWeightKg: extraTopSteelKg,
      rods12m: Math.ceil(topTotalLenM / 12),
    });
  }

  const lapsKg = Number((baseSteelKg * (Math.max(0, lapsPercent) / 100)).toFixed(2));
  const subtotalKg = baseSteelKg + extraTopSteelKg + lapsKg;
  const wastageKg = Number((subtotalKg * (Math.max(0, wastagePercent) / 100)).toFixed(2));
  const totalSteelWeightKg = Number((subtotalKg + wastageKg).toFixed(2));
  const totalSteelWeightQuintal = Number((totalSteelWeightKg / 100).toFixed(2));
  const totalSteelWeightTonnes = Number((totalSteelWeightKg / 1000).toFixed(3));

  // Procurement summary
  const diaMap = new Map<number, number>();
  diaMap.set(mainDia, (diaMap.get(mainDia) || 0) + shortTotalWtKg + extraTopSteelKg);
  diaMap.set(distDia, (diaMap.get(distDia) || 0) + longTotalWtKg);

  const grossMultiplier = baseSteelKg > 0 ? totalSteelWeightKg / baseSteelKg : 1.0;
  const procurement: AdvancedSlabShutteringResult['procurement'] = [];
  diaMap.forEach((baseWt, d) => {
    const grossWt = Number((baseWt * grossMultiplier).toFixed(1));
    const uWt = getRebarUnitWeightKgM(d);
    const wt12m = Number((uWt * 12).toFixed(2));
    const rodsCount = wt12m > 0 ? Math.ceil(grossWt / wt12m) : 0;
    const pack = BARS_PER_BUNDLE[d] || 7;
    const bundlesCount = Number((rodsCount / pack).toFixed(1));

    procurement.push({
      diaMm: d,
      totalWeightKg: grossWt,
      weightPer12mRod: wt12m,
      rodsCount,
      bundlePacking: pack,
      bundlesCount,
    });
  });

  const bindingWireKg = Number(Math.max(1, totalSteelWeightKg * 0.01).toFixed(1));
  const mixBreakup = calculateConcreteMixBreakup(concreteVolumeCum, concreteGrade, 1.54);

  return {
    slabLengthM: Number(L.toFixed(3)),
    slabWidthM: Number(W.toFixed(3)),
    aspectRatio,
    isTwoWaySlab,
    slabThicknessMm: Number(thicknessMm.toFixed(1)),
    clearCoverMm,
    grossAreaSqm,
    slabGrossAreaSqm: grossAreaSqm,
    grossAreaSqft,
    openingAreaSqm: Number(openingSqm.toFixed(3)),
    openingAreaSqft: openingSqft,
    netSlabAreaSqm,
    netSlabAreaSqft,
    perimeterM,
    concreteVolumeCum,
    concreteVolumeCuft,

    bottomSoffitSqm,
    bottomSoffitSqft,
    outerSideShutteringSqm,
    openingEdgeShutteringSqm,
    totalShutteringSqm,
    totalShutteringSqft,

    plywoodSheetsCount,
    steelPlatesCount,
    timberRunnersRmt,
    timberRunnersRft,
    shutteringOilLiters,

    propSpacingLengthM: Number(propSpL.toFixed(2)),
    propSpacingWidthM: Number(propSpW.toFixed(2)),
    rowsAlongLength,
    rowsAlongWidth,
    totalPropsCount,
    baseSolePlatesCount,
    bracingPipesRmt,

    bbsItems,
    baseSteelKg,
    extraTopSteelKg,
    lapsKg,
    wastageKg,
    totalSteelWeightKg,
    totalSteelWeightQuintal,
    totalSteelWeightTonnes,

    procurement,
    bindingWireKg,
    mixBreakup,
  };
}

// Backward compatibility alias
export const calculateSlabSteelShuttering = (input: any) => {
  const res = calculateNormalSlabSteelShuttering({
    length: input.lengthMeters,
    width: input.widthMeters,
    dimensionUnit: 'm',
    thickness: input.thicknessMm,
    thicknessUnit: 'mm',
    includeBottomSoffit: input.includeBottomSoffit,
    includeSideShuttering: input.includeSideShuttering,
    openingArea: input.openingAreaSqm,
    openingUnit: 'sqm',
    steelRateType: input.steelMode === 'simple' ? 'area' : 'volume',
    steelRateValue: input.simpleSteelRateKgPerSqm || 10,
    propSpacingLength: input.propSpacingLengthM || 1.2,
    propSpacingWidth: input.propSpacingWidthM || 1.2,
    propSpacingUnit: 'm',
  });
  return {
    ...res,
    slabGrossAreaSqm: res.grossAreaSqm,
  };
};
