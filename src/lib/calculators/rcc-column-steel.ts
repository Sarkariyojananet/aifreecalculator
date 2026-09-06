/**
 * RCC Column Steel Bar Bending Schedule (BBS) & Civil Engineering Estimation Engine
 *
 * Implements:
 * 1. Advanced Detailed BBS Mode:
 *    - IS 456:2000 & SP 34 Bar Bending Detailing for RCC Columns (Square, Rectangular, Circular)
 *    - IS 13920:2016 Ductile Detailing for Seismic Zones (Confinement Zones L0 at top & bottom with closely-spaced ties)
 *    - Main longitudinal vertical bars with lap length (50d) & footing starter L-bends (16d or 300mm)
 *    - Outer lateral tie rings with 135° seismic hooks (10d, min 75mm)
 *    - Inner lateral ties / cross links (diamond ties / links for 6, 8, 12 bar configurations as per IS 456 Cl. 26.5.3.2)
 *    - Circular columns with circular hoops or continuous spiral / helical ties
 *    - Standard 12m stock commercial rebar rods and factory mill bundle takeoff
 *    - Concrete mix BOQ (M15, M20, M25: Cement bags, Sand, Aggregate, Water)
 *    - Shuttering / Formwork area and binding wire (~1% of steel weight)
 *
 * 2. Normal / Thumb-Rule Estimator Mode:
 *    - CPWD / IS structural thumb-rule rates (1.5% to 3.5% steel ratio or 120-275 kg/m³)
 *    - Instant site takeoff for preliminary budgeting & estimation
 *
 * 3. Backward Compatible Legacy calculateRccColumnSteel function.
 */

export type DimensionUnit = 'm' | 'ft';
export type SmallUnit = 'mm' | 'in';
export type ColumnShape = 'rectangular' | 'circular';
export type ConcreteMixGrade = 'M20' | 'M25' | 'M15';
export type TieSpacingMode = 'uniform' | 'two_zone';
export type ColumnFloorType = 'floor_lap' | 'ground_starter' | 'top_roof';

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
  M20: { label: 'M20 (1 : 1.5 : 3) - Standard Column', cement: 1, sand: 1.5, aggregate: 3 },
  M25: { label: 'M25 (1 : 1 : 2) - Heavy / Commercial Column', cement: 1, sand: 1, aggregate: 2 },
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

export interface RccColumnInput {
  columnType: 'rectangular' | 'circular';
  heightMeters: number;
  widthMm: number; // For rectangular, or diameter for circular
  depthMm?: number; // For rectangular
  clearCoverMm: number; // typically 40mm
  mainBarsCount: number;
  mainBarDiaMm: number;
  tiesDiaMm: number;
  tiesSpacingMm: number;
  lapLengthFactor?: number; // default 50d
}

export interface RccColumnResult {
  columnVolumeCum: number;
  mainBarsCuttingLengthMeters: number;
  mainBarsWeightKg: number;
  lateralTiesCount: number;
  tieCuttingLengthMeters: number;
  tiesWeightKg: number;
  totalSteelWeightKg: number;
  shutteringAreaSqm: number;
}

export function calculateRccColumnSteel(input: RccColumnInput): RccColumnResult {
  const {
    columnType,
    heightMeters: H,
    widthMm: Wmm,
    depthMm: Dmm = Wmm,
    clearCoverMm: cover,
    mainBarsCount,
    mainBarDiaMm,
    tiesDiaMm,
    tiesSpacingMm,
    lapLengthFactor = 50,
  } = input;

  const Wm = Wmm / 1000;
  const Dm = Dmm / 1000;

  let columnVolumeCum = 0;
  let shutteringAreaSqm = 0;

  if (columnType === 'circular') {
    const radius = Wm / 2;
    columnVolumeCum = Number((Math.PI * radius * radius * H).toFixed(3));
    shutteringAreaSqm = Number((Math.PI * Wm * H).toFixed(2));
  } else {
    columnVolumeCum = Number((Wm * Dm * H).toFixed(3));
    shutteringAreaSqm = Number((2 * (Wm + Dm) * H).toFixed(2));
  }

  // Lap / development length extra
  const lapLengthM = (lapLengthFactor * mainBarDiaMm) / 1000;
  const bendHookM = (16 * mainBarDiaMm) / 1000;
  const mainBarsCuttingLengthMeters = Number((H + lapLengthM + bendHookM).toFixed(3));

  const unitWtMain = (mainBarDiaMm * mainBarDiaMm) / 162;
  const unitWtTies = (tiesDiaMm * tiesDiaMm) / 162;

  const mainBarsWeightKg = Number((mainBarsCount * mainBarsCuttingLengthMeters * unitWtMain).toFixed(1));

  // Lateral ties
  const lateralTiesCount = tiesSpacingMm > 0 ? Math.floor((H * 1000) / tiesSpacingMm) + 1 : 0;
  let tieCuttingLengthMeters = 0;

  if (columnType === 'circular') {
    const coreDia = Wmm - 2 * cover;
    tieCuttingLengthMeters = Number(((Math.PI * coreDia + 2 * (10 * tiesDiaMm)) / 1000).toFixed(3));
  } else {
    const coreW = Wmm - 2 * cover;
    const coreD = Dmm - 2 * cover;
    tieCuttingLengthMeters = Number(((2 * (coreW + coreD) + 2 * (10 * tiesDiaMm) - 3 * (2 * tiesDiaMm)) / 1000).toFixed(3));
  }

  const tiesWeightKg = Number((lateralTiesCount * tieCuttingLengthMeters * unitWtTies).toFixed(1));
  const totalSteelWeightKg = Number((mainBarsWeightKg + tiesWeightKg).toFixed(1));

  return {
    columnVolumeCum,
    mainBarsCuttingLengthMeters,
    mainBarsWeightKg,
    lateralTiesCount,
    tieCuttingLengthMeters,
    tiesWeightKg,
    totalSteelWeightKg,
    shutteringAreaSqm,
  };
}

// -------------------------------------------------------------
// 2. NORMAL / THUMB-RULE ESTIMATOR INTERFACES & FUNCTION
// -------------------------------------------------------------

export interface NormalRccColumnInput {
  columnType: ColumnShape;
  height: number;
  width: number; // width for rect, or diameter for circular
  depth?: number; // for rect
  dimensionUnit: DimensionUnit;
  sectionUnit: SmallUnit;
  constructionType: 'light' | 'standard' | 'heavy' | 'custom';
  customSteelRateKgPerCum?: number;
  numberOfColumns?: number;
  primaryBarDiaMm?: number;
  concreteGrade?: ConcreteMixGrade;
  wastagePercent?: number;
  steelCostPerKg?: number;
  concreteCostPerCum?: number;
  shutteringCostPerSqm?: number;
}

export interface NormalRccColumnResult {
  heightM: number;
  widthMm: number;
  depthMm: number;
  columnType: ColumnShape;
  numberOfColumns: number;
  singleColumnVolumeCum: number;
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

  primaryBarDiaMm: number;
  commercial12mRodsCount: number;
  barsPerBundle: number;
  commercialBundlesCount: number;
  bindingWireKg: number;

  concreteGrade: ConcreteMixGrade;
  cementBags: number;
  sandCum: number;
  sandCuft: number;
  aggregateCum: number;
  aggregateCuft: number;
  waterLiters: number;

  singleColumnShutteringSqm: number;
  totalShutteringSqm: number;
  totalShutteringSqft: number;

  steelCost: number;
  concreteCost: number;
  shutteringCost: number;
  bindingWireCost: number;
  totalEstimatedCost: number;
}

export function calculateNormalRccColumnSteel(input: NormalRccColumnInput): NormalRccColumnResult {
  const {
    columnType = 'rectangular',
    height,
    width,
    depth = width,
    dimensionUnit = 'm',
    sectionUnit = 'mm',
    constructionType = 'standard',
    customSteelRateKgPerCum = 195,
    numberOfColumns = 1,
    primaryBarDiaMm = 16,
    concreteGrade = 'M20',
    wastagePercent = 3,
    steelCostPerKg = 75,
    concreteCostPerCum = 4800,
    shutteringCostPerSqm = 350,
  } = input;

  const heightM = toMeters(height, dimensionUnit);
  const widthMm = toMillimeters(width, sectionUnit);
  const depthMm = columnType === 'circular' ? widthMm : toMillimeters(depth, sectionUnit);
  const nCols = Math.max(1, Math.round(numberOfColumns));

  const Wm = widthMm / 1000;
  const Dm = depthMm / 1000;

  let singleColumnVolumeCum = 0;
  let singleColumnShutteringSqm = 0;

  if (columnType === 'circular') {
    const radius = Wm / 2;
    singleColumnVolumeCum = Number((Math.PI * radius * radius * heightM).toFixed(4));
    singleColumnShutteringSqm = Number((Math.PI * Wm * heightM).toFixed(3));
  } else {
    singleColumnVolumeCum = Number((Wm * Dm * heightM).toFixed(4));
    singleColumnShutteringSqm = Number((2 * (Wm + Dm) * heightM).toFixed(3));
  }

  const totalConcreteVolumeCum = Number((singleColumnVolumeCum * nCols).toFixed(3));
  const totalConcreteVolumeCuft = Number((totalConcreteVolumeCum * 35.3147).toFixed(1));

  // CPWD / Structural Column Thumb Rules:
  // Light (1-story residential column): 1.5% steel = ~120 kg/m³
  // Standard (G+1, G+2 floor column): 2.5% steel = ~195 kg/m³ (approx 160-200 kg/m³)
  // Heavy (Commercial / High-Rise column): 3.5% steel = ~275 kg/m³
  let steelRate = 195;
  if (constructionType === 'light') steelRate = 120;
  else if (constructionType === 'standard') steelRate = 195;
  else if (constructionType === 'heavy') steelRate = 275;
  else if (constructionType === 'custom') {
    steelRate = Math.max(20, customSteelRateKgPerCum || 195);
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

  // Binding wire = ~1% of steel weight
  const bindingWireKg = Math.max(1, Math.round((totalSteelKg * 0.01) * 10) / 10);

  // Concrete Mix BOQ
  const mixBOQ = calculateConcreteMixBreakup(totalConcreteVolumeCum, concreteGrade, 1.54);

  // Shuttering
  const totalShutteringSqm = Number((singleColumnShutteringSqm * nCols).toFixed(2));
  const totalShutteringSqft = Number((totalShutteringSqm * 10.7639).toFixed(1));

  // Costs
  const steelCost = Math.round(totalSteelKg * steelCostPerKg);
  const concreteCost = Math.round(totalConcreteVolumeCum * concreteCostPerCum);
  const shutteringCost = Math.round(totalShutteringSqm * shutteringCostPerSqm);
  const bindingWireCost = Math.round(bindingWireKg * 100);
  const totalEstimatedCost = steelCost + concreteCost + shutteringCost + bindingWireCost;

  return {
    heightM,
    widthMm,
    depthMm,
    columnType,
    numberOfColumns: nCols,
    singleColumnVolumeCum,
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

    singleColumnShutteringSqm,
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
  countPerColumn: number;
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

export interface AdvancedRccColumnInput {
  columnShape: ColumnShape; // 'rectangular' | 'circular'
  height: number;
  width: number; // width or circular diameter
  depth?: number; // for rectangular
  dimensionUnit: DimensionUnit;
  sectionUnit: SmallUnit;
  clearCover?: number; // typically 40mm (IS 456)
  numberOfColumns?: number;

  // Longitudinal Bars
  mainBarsCount: number; // min 4 rect, min 6 circular
  mainBarDiaMm: number; // 12, 16, 20, 25, 32
  floorCondition?: ColumnFloorType; // 'floor_lap' | 'ground_starter' | 'top_roof'
  lapFactor?: number; // default 50 (50d)
  starterFootingBendMm?: number; // default 300mm

  // Lateral Ties (Transverse Links)
  outerTieDiaMm?: number; // default 8mm
  includeInnerTies?: boolean; // diamond tie or cross links for 6/8/12 bars
  innerTieDiaMm?: number;
  tieMode?: TieSpacingMode; // 'two_zone' (IS 13920) | 'uniform'
  tieSpacingUniformMm?: number; // e.g. 150mm
  tieSpacingConfinedMm?: number; // e.g. 100mm in L0 zone
  tieSpacingMidMm?: number; // e.g. 150mm in central zone

  // Procurement & Costs
  wastagePercent?: number;
  concreteGrade?: ConcreteMixGrade;
  steelCostPerKg?: number;
  concreteCostPerCum?: number;
  shutteringCostPerSqm?: number;
}

export interface AdvancedRccColumnResult {
  heightM: number;
  widthMm: number;
  depthMm: number;
  columnShape: ColumnShape;
  clearCoverMm: number;
  numberOfColumns: number;

  singleColumnVolumeCum: number;
  totalConcreteVolumeCum: number;
  totalConcreteVolumeCuft: number;

  bbsItems: BBSBarItem[];
  diameterBreakdown: DiameterSummaryItem[];

  baseSteelWeightKg: number;
  wastageKg: number;
  totalSteelWeightKg: number;
  totalSteelQuintals: number;
  totalSteelTonnes: number;
  steelKgPerCum: number;
  steelPercentage: number;

  totalTiesCount: number;
  outerTieCutLenM: number;
  confinementZoneL0M: number;

  total12mStockBars: number;
  totalBundles: number;
  bindingWireKg: number;

  concreteBOQ: ConcreteMixBreakup;

  singleColumnShutteringSqm: number;
  totalShutteringSqm: number;
  totalShutteringSqft: number;

  steelCost: number;
  concreteCost: number;
  shutteringCost: number;
  bindingWireCost: number;
  totalEstimatedCost: number;
}

export function calculateAdvancedRccColumnSteel(input: AdvancedRccColumnInput): AdvancedRccColumnResult {
  const {
    columnShape = 'rectangular',
    height,
    width,
    depth = width,
    dimensionUnit = 'm',
    sectionUnit = 'mm',
    clearCover = 40,
    numberOfColumns = 1,

    mainBarsCount = 4,
    mainBarDiaMm = 16,
    floorCondition = 'floor_lap',
    lapFactor = 50,
    starterFootingBendMm = 300,

    outerTieDiaMm = 8,
    includeInnerTies = true,
    innerTieDiaMm = 8,
    tieMode = 'two_zone',
    tieSpacingUniformMm = 150,
    tieSpacingConfinedMm = 100,
    tieSpacingMidMm = 150,

    wastagePercent = 3,
    concreteGrade = 'M20',
    steelCostPerKg = 75,
    concreteCostPerCum = 4800,
    shutteringCostPerSqm = 350,
  } = input;

  const heightM = toMeters(height, dimensionUnit);
  const widthMm = toMillimeters(width, sectionUnit);
  const depthMm = columnShape === 'circular' ? widthMm : toMillimeters(depth, sectionUnit);
  const coverMm = sectionUnit === 'in' ? clearCover * 25.4 : clearCover;
  const nCols = Math.max(1, Math.round(numberOfColumns));

  const Wm = widthMm / 1000;
  const Dm = depthMm / 1000;

  let singleColumnVolumeCum = 0;
  let singleColumnShutteringSqm = 0;

  if (columnShape === 'circular') {
    const radius = Wm / 2;
    singleColumnVolumeCum = Number((Math.PI * radius * radius * heightM).toFixed(4));
    singleColumnShutteringSqm = Number((Math.PI * Wm * heightM).toFixed(3));
  } else {
    singleColumnVolumeCum = Number((Wm * Dm * heightM).toFixed(4));
    singleColumnShutteringSqm = Number((2 * (Wm + Dm) * heightM).toFixed(3));
  }

  const totalConcreteVolumeCum = Number((singleColumnVolumeCum * nCols).toFixed(3));
  const totalConcreteVolumeCuft = Number((totalConcreteVolumeCum * 35.3147).toFixed(1));

  // 1. Longitudinal Vertical Rebar Cutting Length
  // Calculation details:
  // Floor height H
  // Lap length = 50d (or lapFactor * d)
  // Crank / offset at lap = approx 1:6 slope = ~6d offset = +100mm
  // Starter bend into footing or anchor into beam:
  let starterBendM = 0;
  let lapLengthM = (lapFactor * mainBarDiaMm) / 1000;
  let crankM = 0.08; // 80mm joggled crank for lapping

  if (floorCondition === 'ground_starter') {
    // Column originates from footing: embedment into footing depth + 300mm 90° bend at bottom + lap at top
    starterBendM = (starterFootingBendMm || 300) / 1000;
  } else if (floorCondition === 'top_roof') {
    // Terminating at roof: 90° bend into roof beam (16d or 300mm), no top lap
    lapLengthM = 0;
    crankM = 0;
    starterBendM = Math.max(0.2, (16 * mainBarDiaMm) / 1000);
  }

  const mainCutLenM = Number((heightM + lapLengthM + starterBendM + crankM).toFixed(3));
  const totalMainBarsCount = mainBarsCount * nCols;
  const totalMainLenM = Number((totalMainBarsCount * mainCutLenM).toFixed(2));
  const unitWtMain = getBarUnitWeight(mainBarDiaMm);
  const totalMainWtKg = Number((totalMainLenM * unitWtMain).toFixed(2));

  const bbsItems: BBSBarItem[] = [
    {
      barMark: '01',
      description: `Vertical Main Longitudinal Bars (${floorCondition.replace('_', ' ').toUpperCase()})`,
      diaMm: mainBarDiaMm,
      shapeCode: floorCondition === 'ground_starter' ? 'STARTER-CRANK' : (floorCondition === 'top_roof' ? 'TOP-HOOK' : 'CRANK-LAP'),
      shapeDesc: floorCondition === 'ground_starter'
        ? `Footing L-Bend (${Math.round(starterBendM * 1000)}mm) + Lap (${Math.round(lapLengthM * 1000)}mm)`
        : (floorCondition === 'top_roof' ? `Anchored into roof beam (${Math.round(starterBendM * 1000)}mm hook)` : `Joggled Crank + Lap (${Math.round(lapLengthM * 1000)}mm)`),
      countPerColumn: mainBarsCount,
      totalCount: totalMainBarsCount,
      cuttingLengthM: mainCutLenM,
      totalLengthM: totalMainLenM,
      unitWeightKgPerM: unitWtMain,
      totalWeightKg: totalMainWtKg,
    },
  ];

  // 2. Lateral Ties (Transverse Shear & Confinement Links)
  // Confinement zone length L0 as per IS 13920:2016 Cl. 7.4.1:
  // L0 shall not be less than:
  // 1) Larger lateral dimension of column (max of W, D)
  // 2) 1/6 of clear span H (H / 6)
  // 3) 450 mm
  const largerDimM = Math.max(Wm, Dm);
  const confinementZoneL0M = Number(Math.max(largerDimM, heightM / 6, 0.45).toFixed(3));
  const midZoneLenM = Number(Math.max(0, heightM - 2 * confinementZoneL0M).toFixed(3));

  let tiesPerCol = 0;
  let tieDesc = '';

  if (tieMode === 'two_zone') {
    const sConf = Math.max(50, tieSpacingConfinedMm);
    const sMid = Math.max(50, tieSpacingMidMm);
    // Rings in top & bottom confinement zones L0
    const ringsPerL0 = Math.floor((confinementZoneL0M * 1000) / sConf) + 1;
    const ringsMid = sMid > 0 && midZoneLenM > 0 ? Math.floor((midZoneLenM * 1000) / sMid) : 0;
    tiesPerCol = ringsPerL0 * 2 + ringsMid;
    tieDesc = `Outer Ties (2-Zone Ductile: Top/Bot L0 @ ${sConf}mm c/c, Mid @ ${sMid}mm c/c)`;
  } else {
    const sUni = Math.max(50, tieSpacingUniformMm);
    tiesPerCol = Math.floor((heightM * 1000) / sUni) + 1;
    tieDesc = `Outer Ties (Uniform @ ${sUni}mm c/c)`;
  }

  // Outer Tie Cutting Length
  let outerTieCutLenMm = 0;
  if (columnShape === 'circular') {
    const coreDia = Math.max(50, widthMm - 2 * coverMm);
    // Circular hoop: circumference + 2 hooks of 10d (min 75mm)
    const hookLen = Math.max(75, 10 * outerTieDiaMm);
    outerTieCutLenMm = Math.PI * coreDia + 2 * hookLen;
  } else {
    const coreW = Math.max(50, widthMm - 2 * coverMm);
    const coreD = Math.max(50, depthMm - 2 * coverMm);
    const hookLen = Math.max(75, 10 * outerTieDiaMm);
    // IS 2502: 3 bends of 90° (6d) + 2 bends of 135° (6d) = 12d
    outerTieCutLenMm = 2 * (coreW + coreD) + 2 * hookLen - 12 * outerTieDiaMm;
  }

  const outerTieCutLenM = Number(Math.max(0.3, outerTieCutLenMm / 1000).toFixed(3));
  const totalOuterTiesCount = tiesPerCol * nCols;
  const totalOuterTieLenM = Number((totalOuterTiesCount * outerTieCutLenM).toFixed(2));
  const unitWtOuterTie = getBarUnitWeight(outerTieDiaMm);
  const totalOuterTieWtKg = Number((totalOuterTieLenM * unitWtOuterTie).toFixed(2));

  bbsItems.push({
    barMark: '02',
    description: tieDesc,
    diaMm: outerTieDiaMm,
    shapeCode: columnShape === 'circular' ? 'CIRC-HOOP' : 'RING-135',
    shapeDesc: columnShape === 'circular' ? 'Circular ring with 135° hooks' : 'Outer rectangular tie with 135° seismic hooks',
    countPerColumn: tiesPerCol,
    totalCount: totalOuterTiesCount,
    cuttingLengthM: outerTieCutLenM,
    totalLengthM: totalOuterTieLenM,
    unitWeightKgPerM: unitWtOuterTie,
    totalWeightKg: totalOuterTieWtKg,
  });

  // 3. Inner Ties / Cross Links (IS 456 Cl. 26.5.3.2 & IS 13920)
  // Required when more than 4 bars exist (e.g. 6, 8, 10, 12 bars) to restrain intermediate bars
  if (columnShape === 'rectangular' && includeInnerTies && mainBarsCount > 4) {
    const coreW = Math.max(50, widthMm - 2 * coverMm);
    const coreD = Math.max(50, depthMm - 2 * coverMm);
    const hookLen = Math.max(75, 10 * innerTieDiaMm);

    let innerTieCutLenMm = 0;
    let innerShapeCode = 'CROSS-TIE';
    let innerDesc = '';

    if (mainBarsCount === 8) {
      // Diamond Tie or Cross Ties
      // Diamond tie perimeter approx = 4 * hypotenuse(coreW/2, coreD/2) + 2 * hook - deductions
      const diagSide = Math.sqrt(Math.pow(coreW / 2, 2) + Math.pow(coreD / 2, 2));
      innerTieCutLenMm = 4 * diagSide + 2 * hookLen - 8 * innerTieDiaMm;
      innerShapeCode = 'DIAMOND-TIE';
      innerDesc = 'Inner Diamond Tie Ring (Restrains 4 side bars)';
    } else {
      // 6 or 10+ bars: Internal cross link / J-hook tie
      innerTieCutLenMm = coreD + 2 * hookLen - 4 * innerTieDiaMm;
      innerShapeCode = 'CROSS-LINK';
      innerDesc = 'Internal Cross Link / J-Tie (Restrains intermediate bars)';
    }

    const innerTieCutLenM = Number(Math.max(0.2, innerTieCutLenMm / 1000).toFixed(3));
    const totalInnerTiesCount = tiesPerCol * nCols;
    const totalInnerTieLenM = Number((totalInnerTiesCount * innerTieCutLenM).toFixed(2));
    const unitWtInnerTie = getBarUnitWeight(innerTieDiaMm);
    const totalInnerTieWtKg = Number((totalInnerTieLenM * unitWtInnerTie).toFixed(2));

    bbsItems.push({
      barMark: '03',
      description: innerDesc,
      diaMm: innerTieDiaMm,
      shapeCode: innerShapeCode,
      shapeDesc: innerShapeCode === 'DIAMOND-TIE' ? 'Rhombus / Diamond internal tie' : 'Cross link connecting opposing face bars',
      countPerColumn: tiesPerCol,
      totalCount: totalInnerTiesCount,
      cuttingLengthM: innerTieCutLenM,
      totalLengthM: totalInnerTieLenM,
      unitWeightKgPerM: unitWtInnerTie,
      totalWeightKg: totalInnerTieWtKg,
    });
  }

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

  // Concrete Mix BOQ
  const concreteBOQ = calculateConcreteMixBreakup(totalConcreteVolumeCum, concreteGrade, 1.54);

  // Formwork Shuttering
  const totalShutteringSqm = Number((singleColumnShutteringSqm * nCols).toFixed(2));
  const totalShutteringSqft = Number((totalShutteringSqm * 10.7639).toFixed(1));

  // Costs
  const steelCost = Math.round(totalSteelWeightKg * steelCostPerKg);
  const concreteCost = Math.round(totalConcreteVolumeCum * concreteCostPerCum);
  const shutteringCost = Math.round(totalShutteringSqm * shutteringCostPerSqm);
  const bindingWireCost = Math.round(bindingWireKg * 100);
  const totalEstimatedCost = steelCost + concreteCost + shutteringCost + bindingWireCost;

  return {
    heightM,
    widthMm,
    depthMm,
    columnShape,
    clearCoverMm: coverMm,
    numberOfColumns: nCols,

    singleColumnVolumeCum,
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

    totalTiesCount: tiesPerCol * nCols,
    outerTieCutLenM,
    confinementZoneL0M,

    total12mStockBars,
    totalBundles,
    bindingWireKg,

    concreteBOQ,

    singleColumnShutteringSqm,
    totalShutteringSqm,
    totalShutteringSqft,

    steelCost,
    concreteCost,
    shutteringCost,
    bindingWireCost,
    totalEstimatedCost,
  };
}
