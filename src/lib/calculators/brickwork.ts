/**
 * Brickwork & Mortar Calculation Engine
 * Supports:
 * 1. Wall Brickwork (Number of bricks, deductions, volume, wastage)
 * 2. Brick Mortar (Wet/dry volume, cement bags, sand CFT/tonnes)
 * 3. Paving Bricks (Pavers count, gap spacing, sand bedding volume)
 * 4. Custom Brickwork (Comprehensive simultaneous brick & mortar estimation)
 */

export interface BrickPreset {
  id: string;
  name: string;
  lengthMm: number;
  widthMm: number;
  heightMm: number;
  description: string;
}

export const BRICK_PRESETS: BrickPreset[] = [
  {
    id: 'modular_metric',
    name: 'Standard Metric Modular (190 × 90 × 90 mm)',
    lengthMm: 190,
    widthMm: 90,
    heightMm: 90,
    description: 'Nominal 200 × 100 × 100 mm with mortar (500 bricks/m³)',
  },
  {
    id: 'indian_traditional',
    name: 'Indian Traditional Red Clay (225 × 112.5 × 75 mm / 9" × 4.25" × 3")',
    lengthMm: 225,
    widthMm: 112.5,
    heightMm: 75,
    description: 'Standard 9-inch country red brick used across India',
  },
  {
    id: 'uk_standard',
    name: 'UK Standard Facing Brick (215 × 102.5 × 65 mm)',
    lengthMm: 215,
    widthMm: 102.5,
    heightMm: 65,
    description: 'British Standard BS EN 771-1 format (60 bricks/m² single skin)',
  },
  {
    id: 'us_modular',
    name: 'US Modular Brick (194 × 92 × 57 mm / 7⅝" × 3⅝" × 2¼")',
    lengthMm: 194,
    widthMm: 92,
    heightMm: 57,
    description: 'US Standard architectural modular brick',
  },
];

export interface WallBrickInput {
  unitSystem: 'metric' | 'imperial';
  wallLength: number; // m or ft
  wallHeight: number; // m or ft
  wallThicknessType: 'half_brick' | 'one_brick' | 'one_half_brick' | 'custom';
  customThicknessMeters?: number;
  numberOfWalls: number;
  openingsDeductionArea: number; // m² or sq.ft
  brickLengthMm: number;
  brickWidthMm: number;
  brickHeightMm: number;
  mortarJointMm: number;
  wastagePercent: number;
}

export interface WallBrickResult {
  totalWallAreaSqm: number;
  totalWallAreaSqft: number;
  openingsAreaSqm: number;
  openingsAreaSqft: number;
  netWallAreaSqm: number;
  netWallAreaSqft: number;
  wallThicknessMeters: number;
  wallThicknessLabel: string;
  wallVolumeCum: number;
  wallVolumeCft: number;
  brickLengthMm: number;
  brickWidthMm: number;
  brickHeightMm: number;
  mortarJointMm: number;
  nominalBrickLengthMm: number;
  nominalBrickWidthMm: number;
  nominalBrickHeightMm: number;
  singleBrickVolumeCum: number;
  singleNominalBrickVolumeCum: number;
  bricksBeforeWastage: number;
  wastageCount: number;
  finalEstimatedBricks: number;
  wastagePercent: number;
  comparisonTable: Array<{ wastagePct: number; totalBricks: number }>;
}

export interface BrickMortarInput {
  unitSystem: 'metric' | 'imperial';
  wallLength: number; // m or ft
  wallHeight: number; // m or ft
  wallThicknessMeters: number;
  numberOfWalls: number;
  openingsDeductionArea: number;
  brickLengthMm: number;
  brickWidthMm: number;
  brickHeightMm: number;
  mortarJointMm: number;
  mortarRatio: string; // '1:3', '1:4', '1:5', '1:6', 'custom'
  customCementPart?: number;
  customSandPart?: number;
  mortarWastagePercent: number;
  dryVolumeFactor?: number; // default 1.33
}

export interface BrickMortarResult {
  totalBrickworkVolumeCum: number;
  totalBrickworkVolumeCft: number;
  netWallAreaSqm: number;
  totalBricksCount: number;
  actualBricksVolumeCum: number;
  wetMortarVolumeCum: number;
  wetMortarVolumeCft: number;
  dryMortarVolumeCum: number;
  dryMortarVolumeCft: number;
  cementPart: number;
  sandPart: number;
  ratioLabel: string;
  cementWeightKg: number;
  cementBags50kg: number;
  sandVolumeCum: number;
  sandVolumeCft: number;
  sandWeightTons: number;
  mortarWastagePercent: number;
  dryVolumeFactor: number;
}

export interface PavingBricksInput {
  unitSystem: 'metric' | 'imperial';
  pavingArea: number; // m², sq.ft, or sq.yd
  areaUnit: 'sqm' | 'sqft' | 'sqyd';
  paverLengthMm: number;
  paverWidthMm: number;
  jointGapMm: number;
  wastagePercent: number;
  beddingThicknessMm?: number; // optional sand bedding
}

export interface PavingBricksResult {
  pavingAreaSqm: number;
  pavingAreaSqft: number;
  paverLengthMm: number;
  paverWidthMm: number;
  jointGapMm: number;
  singlePaverAreaSqm: number;
  singleEffectivePaverAreaSqm: number;
  paversPerSqm: number;
  paversPerSqft: number;
  paversBeforeWastage: number;
  wastageCount: number;
  finalEstimatedPavers: number;
  wastagePercent: number;
  beddingSandVolumeCum?: number;
  beddingSandVolumeCft?: number;
  beddingSandTons?: number;
}

export interface CustomBrickworkInput {
  unitSystem: 'metric' | 'imperial';
  lengthM: number;
  widthM: number;
  heightM: number;
  brickLengthMm: number;
  brickWidthMm: number;
  brickHeightMm: number;
  mortarJointMm: number;
  mortarRatio: string;
  customCementPart?: number;
  customSandPart?: number;
  brickWastagePercent: number;
  mortarWastagePercent: number;
  dryVolumeFactor?: number;
}

export interface CustomBrickworkResult {
  totalVolumeCum: number;
  totalVolumeCft: number;
  baseBricks: number;
  finalBricks: number;
  wetMortarVolumeCum: number;
  wetMortarVolumeCft: number;
  dryMortarVolumeCum: number;
  dryMortarVolumeCft: number;
  cementWeightKg: number;
  cementBags50kg: number;
  sandVolumeCft: number;
  sandWeightTons: number;
  ratioLabel: string;
}

/**
 * 1. Calculate Wall Brickwork
 */
export function calculateWallBrickwork(input: WallBrickInput): WallBrickResult {
  const {
    unitSystem,
    wallLength,
    wallHeight,
    wallThicknessType,
    customThicknessMeters = 0.23,
    numberOfWalls = 1,
    openingsDeductionArea = 0,
    brickLengthMm,
    brickWidthMm,
    brickHeightMm,
    mortarJointMm = 10,
    wastagePercent = 5,
  } = input;

  let totalWallAreaSqm = 0;
  let openingsAreaSqm = 0;

  if (unitSystem === 'imperial') {
    const rawGrossSqft = wallLength * wallHeight * numberOfWalls;
    totalWallAreaSqm = rawGrossSqft / 10.7639;
    openingsAreaSqm = openingsDeductionArea / 10.7639;
  } else {
    totalWallAreaSqm = wallLength * wallHeight * numberOfWalls;
    openingsAreaSqm = openingsDeductionArea;
  }

  const netWallAreaSqm = Math.max(0, totalWallAreaSqm - openingsAreaSqm);
  const totalWallAreaSqft = totalWallAreaSqm * 10.7639;
  const openingsAreaSqft = openingsAreaSqm * 10.7639;
  const netWallAreaSqft = netWallAreaSqm * 10.7639;

  // Determine wall thickness
  let wallThicknessMeters = 0.23;
  let wallThicknessLabel = '9" (One Brick Wall / 230 mm)';

  if (wallThicknessType === 'half_brick') {
    wallThicknessMeters = (brickWidthMm + mortarJointMm) / 1000;
    wallThicknessLabel = `Half Brick Wall (${Math.round(wallThicknessMeters * 1000)} mm / 4.5")`;
  } else if (wallThicknessType === 'one_brick') {
    wallThicknessMeters = (brickLengthMm + mortarJointMm) / 1000;
    wallThicknessLabel = `One Brick Wall (${Math.round(wallThicknessMeters * 1000)} mm / 9")`;
  } else if (wallThicknessType === 'one_half_brick') {
    wallThicknessMeters = (brickLengthMm + brickWidthMm + 2 * mortarJointMm) / 1000;
    wallThicknessLabel = `One & Half Brick Wall (${Math.round(wallThicknessMeters * 1000)} mm / 13.5")`;
  } else {
    wallThicknessMeters = customThicknessMeters;
    wallThicknessLabel = `Custom Thickness (${(wallThicknessMeters * 1000).toFixed(0)} mm)`;
  }

  const wallVolumeCum = netWallAreaSqm * wallThicknessMeters;
  const wallVolumeCft = wallVolumeCum * 35.3147;

  // Nominal brick dimensions including mortar joint
  const nominalBrickLengthMm = brickLengthMm + mortarJointMm;
  const nominalBrickWidthMm = brickWidthMm + mortarJointMm;
  const nominalBrickHeightMm = brickHeightMm + mortarJointMm;

  const singleBrickVolumeCum = (brickLengthMm / 1000) * (brickWidthMm / 1000) * (brickHeightMm / 1000);
  const singleNominalBrickVolumeCum = (nominalBrickLengthMm / 1000) * (nominalBrickWidthMm / 1000) * (nominalBrickHeightMm / 1000);

  // Accurate Volumetric Brick Estimation
  let baseBricks = 0;
  if (singleNominalBrickVolumeCum > 0) {
    baseBricks = wallVolumeCum / singleNominalBrickVolumeCum;
  }

  const wastageCount = baseBricks * (wastagePercent / 100);
  const finalEstimatedBricks = Math.ceil(baseBricks + wastageCount);

  // Comparison Table (0%, 3%, 5%, 7%, 10%)
  const comparisonPercentages = [0, 3, 5, 7, 10];
  const comparisonTable = comparisonPercentages.map((pct) => ({
    wastagePct: pct,
    totalBricks: Math.ceil(baseBricks * (1 + pct / 100)),
  }));

  return {
    totalWallAreaSqm: Number(totalWallAreaSqm.toFixed(2)),
    totalWallAreaSqft: Number(totalWallAreaSqft.toFixed(2)),
    openingsAreaSqm: Number(openingsAreaSqm.toFixed(2)),
    openingsAreaSqft: Number(openingsAreaSqft.toFixed(2)),
    netWallAreaSqm: Number(netWallAreaSqm.toFixed(2)),
    netWallAreaSqft: Number(netWallAreaSqft.toFixed(2)),
    wallThicknessMeters: Number(wallThicknessMeters.toFixed(3)),
    wallThicknessLabel,
    wallVolumeCum: Number(wallVolumeCum.toFixed(3)),
    wallVolumeCft: Number(wallVolumeCft.toFixed(2)),
    brickLengthMm,
    brickWidthMm,
    brickHeightMm,
    mortarJointMm,
    nominalBrickLengthMm,
    nominalBrickWidthMm,
    nominalBrickHeightMm,
    singleBrickVolumeCum: Number(singleBrickVolumeCum.toFixed(6)),
    singleNominalBrickVolumeCum: Number(singleNominalBrickVolumeCum.toFixed(6)),
    bricksBeforeWastage: Math.round(baseBricks),
    wastageCount: Math.round(wastageCount),
    finalEstimatedBricks,
    wastagePercent,
    comparisonTable,
  };
}

/**
 * 2. Calculate Brick Mortar (Cement + Sand)
 */
export function calculateBrickMortar(input: BrickMortarInput): BrickMortarResult {
  const {
    unitSystem,
    wallLength,
    wallHeight,
    wallThicknessMeters,
    numberOfWalls = 1,
    openingsDeductionArea = 0,
    brickLengthMm,
    brickWidthMm,
    brickHeightMm,
    mortarJointMm = 10,
    mortarRatio,
    customCementPart = 1,
    customSandPart = 6,
    mortarWastagePercent = 10,
    dryVolumeFactor = 1.33,
  } = input;

  let totalWallAreaSqm = 0;
  let openingsAreaSqm = 0;

  if (unitSystem === 'imperial') {
    totalWallAreaSqm = (wallLength * wallHeight * numberOfWalls) / 10.7639;
    openingsAreaSqm = openingsDeductionArea / 10.7639;
  } else {
    totalWallAreaSqm = wallLength * wallHeight * numberOfWalls;
    openingsAreaSqm = openingsDeductionArea;
  }

  const netWallAreaSqm = Math.max(0, totalWallAreaSqm - openingsAreaSqm);
  const totalBrickworkVolumeCum = netWallAreaSqm * wallThicknessMeters;
  const totalBrickworkVolumeCft = totalBrickworkVolumeCum * 35.3147;

  // Single Brick Volumes
  const nominalVolCum = ((brickLengthMm + mortarJointMm) / 1000) * ((brickWidthMm + mortarJointMm) / 1000) * ((brickHeightMm + mortarJointMm) / 1000);
  const actualSingleBrickVolCum = (brickLengthMm / 1000) * (brickWidthMm / 1000) * (brickHeightMm / 1000);

  const totalBricksCount = nominalVolCum > 0 ? totalBrickworkVolumeCum / nominalVolCum : 0;
  const actualBricksVolumeCum = totalBricksCount * actualSingleBrickVolCum;

  // Wet Mortar Volume = Total Brickwork Volume - Actual Bricks Volume
  const wetMortarVolumeCum = Math.max(0, totalBrickworkVolumeCum - actualBricksVolumeCum);
  const wetMortarVolumeCft = wetMortarVolumeCum * 35.3147;

  // Dry Mortar Volume
  const dryMortarVolumeCum = wetMortarVolumeCum * dryVolumeFactor * (1 + mortarWastagePercent / 100);
  const dryMortarVolumeCft = dryMortarVolumeCum * 35.3147;

  // Mix Ratio Splitting
  let cementPart = 1;
  let sandPart = 6;
  let ratioLabel = mortarRatio;

  if (mortarRatio === 'custom') {
    cementPart = customCementPart > 0 ? customCementPart : 1;
    sandPart = customSandPart > 0 ? customSandPart : 6;
    ratioLabel = `${cementPart}:${sandPart}`;
  } else {
    const parts = mortarRatio.split(':').map(Number);
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      cementPart = parts[0];
      sandPart = parts[1];
    }
  }

  const totalParts = cementPart + sandPart;

  const cementVolumeCum = (dryMortarVolumeCum * cementPart) / totalParts;
  const cementWeightKg = cementVolumeCum * 1440;
  const cementBags50kg = cementWeightKg / 50;

  const sandVolumeCum = (dryMortarVolumeCum * sandPart) / totalParts;
  const sandVolumeCft = sandVolumeCum * 35.3147;
  const sandWeightTons = (sandVolumeCum * 1600) / 1000;

  return {
    totalBrickworkVolumeCum: Number(totalBrickworkVolumeCum.toFixed(3)),
    totalBrickworkVolumeCft: Number(totalBrickworkVolumeCft.toFixed(2)),
    netWallAreaSqm: Number(netWallAreaSqm.toFixed(2)),
    totalBricksCount: Math.round(totalBricksCount),
    actualBricksVolumeCum: Number(actualBricksVolumeCum.toFixed(3)),
    wetMortarVolumeCum: Number(wetMortarVolumeCum.toFixed(3)),
    wetMortarVolumeCft: Number(wetMortarVolumeCft.toFixed(2)),
    dryMortarVolumeCum: Number(dryMortarVolumeCum.toFixed(3)),
    dryMortarVolumeCft: Number(dryMortarVolumeCft.toFixed(2)),
    cementPart,
    sandPart,
    ratioLabel,
    cementWeightKg: Number(cementWeightKg.toFixed(1)),
    cementBags50kg: Number(cementBags50kg.toFixed(2)),
    sandVolumeCum: Number(sandVolumeCum.toFixed(3)),
    sandVolumeCft: Number(sandVolumeCft.toFixed(2)),
    sandWeightTons: Number(sandWeightTons.toFixed(2)),
    mortarWastagePercent,
    dryVolumeFactor,
  };
}

/**
 * 3. Calculate Paving Bricks / Blocks
 */
export function calculatePavingBricks(input: PavingBricksInput): PavingBricksResult {
  const {
    unitSystem,
    pavingArea,
    areaUnit,
    paverLengthMm,
    paverWidthMm,
    jointGapMm = 3,
    wastagePercent = 5,
    beddingThicknessMm = 0,
  } = input;

  let pavingAreaSqm = pavingArea;
  if (areaUnit === 'sqft') {
    pavingAreaSqm = pavingArea / 10.7639;
  } else if (areaUnit === 'sqyd') {
    pavingAreaSqm = pavingArea * 0.836127;
  }

  const pavingAreaSqft = pavingAreaSqm * 10.7639;

  const singlePaverAreaSqm = (paverLengthMm / 1000) * (paverWidthMm / 1000);
  const effectivePaverLengthM = (paverLengthMm + jointGapMm) / 1000;
  const effectivePaverWidthM = (paverWidthMm + jointGapMm) / 1000;
  const singleEffectivePaverAreaSqm = effectivePaverLengthM * effectivePaverWidthM;

  const paversPerSqm = singleEffectivePaverAreaSqm > 0 ? 1 / singleEffectivePaverAreaSqm : 0;
  const paversPerSqft = paversPerSqm / 10.7639;

  const paversBeforeWastage = singleEffectivePaverAreaSqm > 0 ? pavingAreaSqm / singleEffectivePaverAreaSqm : 0;
  const wastageCount = paversBeforeWastage * (wastagePercent / 100);
  const finalEstimatedPavers = Math.ceil(paversBeforeWastage + wastageCount);

  let beddingSandVolumeCum: number | undefined = undefined;
  let beddingSandVolumeCft: number | undefined = undefined;
  let beddingSandTons: number | undefined = undefined;

  if (beddingThicknessMm > 0) {
    beddingSandVolumeCum = Number((pavingAreaSqm * (beddingThicknessMm / 1000)).toFixed(3));
    beddingSandVolumeCft = Number((beddingSandVolumeCum * 35.3147).toFixed(2));
    beddingSandTons = Number(((beddingSandVolumeCum * 1600) / 1000).toFixed(2));
  }

  return {
    pavingAreaSqm: Number(pavingAreaSqm.toFixed(2)),
    pavingAreaSqft: Number(pavingAreaSqft.toFixed(2)),
    paverLengthMm,
    paverWidthMm,
    jointGapMm,
    singlePaverAreaSqm: Number(singlePaverAreaSqm.toFixed(4)),
    singleEffectivePaverAreaSqm: Number(singleEffectivePaverAreaSqm.toFixed(4)),
    paversPerSqm: Number(paversPerSqm.toFixed(1)),
    paversPerSqft: Number(paversPerSqft.toFixed(2)),
    paversBeforeWastage: Math.round(paversBeforeWastage),
    wastageCount: Math.round(wastageCount),
    finalEstimatedPavers,
    wastagePercent,
    beddingSandVolumeCum,
    beddingSandVolumeCft,
    beddingSandTons,
  };
}

/**
 * 4. Calculate Custom Brickwork
 */
export function calculateCustomBrickwork(input: CustomBrickworkInput): CustomBrickworkResult {
  const {
    unitSystem,
    lengthM,
    widthM,
    heightM,
    brickLengthMm,
    brickWidthMm,
    brickHeightMm,
    mortarJointMm = 10,
    mortarRatio,
    customCementPart = 1,
    customSandPart = 6,
    brickWastagePercent = 5,
    mortarWastagePercent = 10,
    dryVolumeFactor = 1.33,
  } = input;

  const totalVolumeCum = lengthM * widthM * heightM;
  const totalVolumeCft = totalVolumeCum * 35.3147;

  const nominalVolCum = ((brickLengthMm + mortarJointMm) / 1000) * ((brickWidthMm + mortarJointMm) / 1000) * ((brickHeightMm + mortarJointMm) / 1000);
  const actualSingleBrickVolCum = (brickLengthMm / 1000) * (brickWidthMm / 1000) * (brickHeightMm / 1000);

  const baseBricks = nominalVolCum > 0 ? totalVolumeCum / nominalVolCum : 0;
  const finalBricks = Math.ceil(baseBricks * (1 + brickWastagePercent / 100));

  const actualBricksVolumeCum = baseBricks * actualSingleBrickVolCum;
  const wetMortarVolumeCum = Math.max(0, totalVolumeCum - actualBricksVolumeCum);
  const wetMortarVolumeCft = wetMortarVolumeCum * 35.3147;

  const dryMortarVolumeCum = wetMortarVolumeCum * dryVolumeFactor * (1 + mortarWastagePercent / 100);
  const dryMortarVolumeCft = dryMortarVolumeCum * 35.3147;

  let cementPart = 1;
  let sandPart = 6;
  let ratioLabel = mortarRatio;

  if (mortarRatio === 'custom') {
    cementPart = customCementPart > 0 ? customCementPart : 1;
    sandPart = customSandPart > 0 ? customSandPart : 6;
    ratioLabel = `${cementPart}:${sandPart}`;
  } else {
    const parts = mortarRatio.split(':').map(Number);
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      cementPart = parts[0];
      sandPart = parts[1];
    }
  }

  const totalParts = cementPart + sandPart;

  const cementVolumeCum = (dryMortarVolumeCum * cementPart) / totalParts;
  const cementWeightKg = cementVolumeCum * 1440;
  const cementBags50kg = cementWeightKg / 50;

  const sandVolumeCum = (dryMortarVolumeCum * sandPart) / totalParts;
  const sandVolumeCft = sandVolumeCum * 35.3147;
  const sandWeightTons = (sandVolumeCum * 1600) / 1000;

  return {
    totalVolumeCum: Number(totalVolumeCum.toFixed(3)),
    totalVolumeCft: Number(totalVolumeCft.toFixed(2)),
    baseBricks: Math.round(baseBricks),
    finalBricks,
    wetMortarVolumeCum: Number(wetMortarVolumeCum.toFixed(3)),
    wetMortarVolumeCft: Number(wetMortarVolumeCft.toFixed(2)),
    dryMortarVolumeCum: Number(dryMortarVolumeCum.toFixed(3)),
    dryMortarVolumeCft: Number(dryMortarVolumeCft.toFixed(2)),
    cementWeightKg: Number(cementWeightKg.toFixed(1)),
    cementBags50kg: Number(cementBags50kg.toFixed(2)),
    sandVolumeCft: Number(sandVolumeCft.toFixed(2)),
    sandWeightTons: Number(sandWeightTons.toFixed(2)),
    ratioLabel,
  };
}
