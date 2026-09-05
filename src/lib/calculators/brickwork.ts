/**
 * Brickwork & Mortar Calculation Engine
 * Supports:
 * 1. Wall Brickwork (Number of bricks, deductions, volume, wastage, cost)
 * 2. Brick Mortar (Wet/dry volume, cement bags, sand CFT/tonnes, cost)
 * 3. Paving Bricks (Pavers count, gap spacing, sand bedding volume, cost)
 * 4. Custom Brickwork (Comprehensive simultaneous brick & mortar estimation, cost)
 */

export type Currency = 'INR' | 'USD';

export const DEFAULT_BRICKWORK_PRICES_INR = {
  brickRate: 8.5,       // ₹ / brick (₹8,500 per 1,000 bricks)
  cementBagRate: 380,   // ₹ / 50kg bag
  sandRatePerCft: 55,   // ₹ / CFT (~₹1,940 per metric ton)
  paverRate: 22,        // ₹ / paver block
};

export const DEFAULT_BRICKWORK_PRICES_USD = {
  brickRate: 0.75,      // $ / brick ($750 per 1,000 bricks)
  cementBagRate: 14.50, // $ / 94lb / 50kg bag
  sandRatePerCft: 1.80, // $ / CFT (~$48.60 / cu yd)
  paverRate: 2.50,      // $ / paver block
};

export function formatCurrency(val: number, currency: Currency): string {
  const symbol = currency === 'INR' ? '₹' : '$';
  if (!Number.isFinite(val) || val < 0) return `${symbol} 0.00`;
  if (currency === 'INR') {
    return `${symbol} ${val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `${symbol}${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export interface MaterialCostSummary {
  brickCost?: number;
  cementCost?: number;
  sandCost?: number;
  paverCost?: number;
  totalMaterialCost: number;
  costPerSqm?: number;
  costPerSqft?: number;
  costPerCum?: number;
  currency: Currency;
  currencySymbol: string;
  formattedTotal: string;
}

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
  // Optional Cost Estimation
  enableCost?: boolean;
  currency?: Currency;
  brickRate?: number;
  cementBagRate?: number;
  sandRatePerCft?: number;
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
  // Estimated mortar requirements for this wall
  approxMortarVolumeCum?: number;
  approxCementBags?: number;
  approxSandCft?: number;
  costSummary?: MaterialCostSummary;
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
  // Optional Cost Estimation
  enableCost?: boolean;
  currency?: Currency;
  cementBagRate?: number;
  sandRatePerCft?: number;
  brickRate?: number;
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
  brickLengthMm: number;
  brickWidthMm: number;
  brickHeightMm: number;
  costSummary?: MaterialCostSummary;
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
  // Optional Cost Estimation
  enableCost?: boolean;
  currency?: Currency;
  paverRate?: number;
  sandRatePerCft?: number;
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
  costSummary?: MaterialCostSummary;
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
  // Optional Cost Estimation
  enableCost?: boolean;
  currency?: Currency;
  brickRate?: number;
  cementBagRate?: number;
  sandRatePerCft?: number;
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
  costSummary?: MaterialCostSummary;
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
    enableCost = false,
    currency = 'INR',
    brickRate,
    cementBagRate,
    sandRatePerCft,
  } = input;

  if (!Number.isFinite(wallLength) || wallLength <= 0) {
    throw new Error('Wall Length must be a positive number.');
  }
  if (!Number.isFinite(wallHeight) || wallHeight <= 0) {
    throw new Error('Wall Height must be a positive number.');
  }
  if (!Number.isFinite(numberOfWalls) || numberOfWalls <= 0) {
    throw new Error('Number of walls must be at least 1.');
  }
  if (!Number.isFinite(brickLengthMm) || brickLengthMm <= 0 ||
      !Number.isFinite(brickWidthMm) || brickWidthMm <= 0 ||
      !Number.isFinite(brickHeightMm) || brickHeightMm <= 0) {
    throw new Error('Brick dimensions must be valid positive numbers.');
  }

  let totalWallAreaSqm = 0;
  let openingsAreaSqm = 0;

  if (unitSystem === 'imperial') {
    const rawGrossSqft = wallLength * wallHeight * numberOfWalls;
    totalWallAreaSqm = rawGrossSqft / 10.7639;
    openingsAreaSqm = (Number.isFinite(openingsDeductionArea) && openingsDeductionArea > 0) ? openingsDeductionArea / 10.7639 : 0;
  } else {
    totalWallAreaSqm = wallLength * wallHeight * numberOfWalls;
    openingsAreaSqm = (Number.isFinite(openingsDeductionArea) && openingsDeductionArea > 0) ? openingsDeductionArea : 0;
  }

  const netWallAreaSqm = Math.max(0, totalWallAreaSqm - openingsAreaSqm);
  const totalWallAreaSqft = totalWallAreaSqm * 10.7639;
  const openingsAreaSqft = openingsAreaSqm * 10.7639;
  const netWallAreaSqft = netWallAreaSqm * 10.7639;

  // Determine wall thickness
  let wallThicknessMeters = 0.23;
  let wallThicknessLabel = '9" (One Brick Wall / 230 mm)';

  const jointSafe = Math.max(0, mortarJointMm || 0);

  if (wallThicknessType === 'half_brick') {
    wallThicknessMeters = (brickWidthMm + jointSafe) / 1000;
    wallThicknessLabel = `Half Brick Wall (${Math.round(wallThicknessMeters * 1000)} mm / 4.5")`;
  } else if (wallThicknessType === 'one_brick') {
    wallThicknessMeters = (brickLengthMm + jointSafe) / 1000;
    wallThicknessLabel = `One Brick Wall (${Math.round(wallThicknessMeters * 1000)} mm / 9")`;
  } else if (wallThicknessType === 'one_half_brick') {
    wallThicknessMeters = (brickLengthMm + brickWidthMm + 2 * jointSafe) / 1000;
    wallThicknessLabel = `One & Half Brick Wall (${Math.round(wallThicknessMeters * 1000)} mm / 13.5")`;
  } else {
    wallThicknessMeters = Number.isFinite(customThicknessMeters) && customThicknessMeters > 0 ? customThicknessMeters : 0.23;
    wallThicknessLabel = `Custom Thickness (${Math.round(wallThicknessMeters * 1000)} mm)`;
  }

  const wallVolumeCum = netWallAreaSqm * wallThicknessMeters;
  const wallVolumeCft = wallVolumeCum * 35.3147;

  // Nominal brick dimensions including mortar joint
  const nominalBrickLengthMm = brickLengthMm + jointSafe;
  const nominalBrickWidthMm = brickWidthMm + jointSafe;
  const nominalBrickHeightMm = brickHeightMm + jointSafe;

  const singleBrickVolumeCum = (brickLengthMm / 1000) * (brickWidthMm / 1000) * (brickHeightMm / 1000);
  const singleNominalBrickVolumeCum = (nominalBrickLengthMm / 1000) * (nominalBrickWidthMm / 1000) * (nominalBrickHeightMm / 1000);

  // Accurate Volumetric Brick Estimation
  let baseBricks = 0;
  if (singleNominalBrickVolumeCum > 0) {
    baseBricks = wallVolumeCum / singleNominalBrickVolumeCum;
  }

  const wastageSafe = Math.max(0, wastagePercent || 0);
  const wastageCount = baseBricks * (wastageSafe / 100);
  const finalEstimatedBricks = Math.ceil(baseBricks + wastageCount);

  // Comparison Table (0%, 3%, 5%, 7%, 10%)
  const comparisonPercentages = [0, 3, 5, 7, 10];
  const comparisonTable = comparisonPercentages.map((pct) => ({
    wastagePct: pct,
    totalBricks: Math.ceil(baseBricks * (1 + pct / 100)),
  }));

  // Approximate mortar estimate (based on standard 1:6 ratio, 1.33 dry factor, 10% wastage)
  const actualBricksVol = baseBricks * singleBrickVolumeCum;
  const approxWetMortarCum = Math.max(0, wallVolumeCum - actualBricksVol);
  const approxDryMortarCum = approxWetMortarCum * 1.33 * 1.10;
  const approxCementVolCum = approxDryMortarCum * (1 / 7);
  const approxCementBags = (approxCementVolCum * 1440) / 50;
  const approxSandCft = approxDryMortarCum * (6 / 7) * 35.3147;

  // Cost Estimation
  let costSummary: MaterialCostSummary | undefined = undefined;
  if (enableCost) {
    const activeCurrency = currency || 'INR';
    const defaults = activeCurrency === 'INR' ? DEFAULT_BRICKWORK_PRICES_INR : DEFAULT_BRICKWORK_PRICES_USD;
    const bRate = Number.isFinite(brickRate) && (brickRate as number) >= 0 ? (brickRate as number) : defaults.brickRate;
    const cRate = Number.isFinite(cementBagRate) && (cementBagRate as number) >= 0 ? (cementBagRate as number) : defaults.cementBagRate;
    const sRate = Number.isFinite(sandRatePerCft) && (sandRatePerCft as number) >= 0 ? (sandRatePerCft as number) : defaults.sandRatePerCft;

    const brickCost = finalEstimatedBricks * bRate;
    const cementCost = Math.ceil(approxCementBags) * cRate;
    const sandCost = approxSandCft * sRate;
    const totalMaterialCost = brickCost + cementCost + sandCost;

    costSummary = {
      brickCost: Number(brickCost.toFixed(2)),
      cementCost: Number(cementCost.toFixed(2)),
      sandCost: Number(sandCost.toFixed(2)),
      totalMaterialCost: Number(totalMaterialCost.toFixed(2)),
      costPerSqm: netWallAreaSqm > 0 ? Number((totalMaterialCost / netWallAreaSqm).toFixed(2)) : undefined,
      costPerSqft: netWallAreaSqft > 0 ? Number((totalMaterialCost / netWallAreaSqft).toFixed(2)) : undefined,
      costPerCum: wallVolumeCum > 0 ? Number((totalMaterialCost / wallVolumeCum).toFixed(2)) : undefined,
      currency: activeCurrency,
      currencySymbol: activeCurrency === 'INR' ? '₹' : '$',
      formattedTotal: formatCurrency(totalMaterialCost, activeCurrency),
    };
  }

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
    mortarJointMm: jointSafe,
    nominalBrickLengthMm,
    nominalBrickWidthMm,
    nominalBrickHeightMm,
    singleBrickVolumeCum: Number(singleBrickVolumeCum.toFixed(6)),
    singleNominalBrickVolumeCum: Number(singleNominalBrickVolumeCum.toFixed(6)),
    bricksBeforeWastage: Math.round(baseBricks),
    wastageCount: Math.round(wastageCount),
    finalEstimatedBricks,
    wastagePercent: wastageSafe,
    comparisonTable,
    approxMortarVolumeCum: Number(approxWetMortarCum.toFixed(3)),
    approxCementBags: Number(approxCementBags.toFixed(2)),
    approxSandCft: Number(approxSandCft.toFixed(2)),
    costSummary,
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
    enableCost = false,
    currency = 'INR',
    cementBagRate,
    sandRatePerCft,
    brickRate,
  } = input;

  if (!Number.isFinite(wallLength) || wallLength <= 0) {
    throw new Error('Wall Length must be a positive number.');
  }
  if (!Number.isFinite(wallHeight) || wallHeight <= 0) {
    throw new Error('Wall Height must be a positive number.');
  }
  if (!Number.isFinite(wallThicknessMeters) || wallThicknessMeters <= 0) {
    throw new Error('Wall Thickness must be a positive number.');
  }
  if (!Number.isFinite(numberOfWalls) || numberOfWalls <= 0) {
    throw new Error('Number of walls must be at least 1.');
  }
  if (!Number.isFinite(brickLengthMm) || brickLengthMm <= 0 ||
      !Number.isFinite(brickWidthMm) || brickWidthMm <= 0 ||
      !Number.isFinite(brickHeightMm) || brickHeightMm <= 0) {
    throw new Error('Brick dimensions must be valid positive numbers.');
  }

  let totalWallAreaSqm = 0;
  let openingsAreaSqm = 0;

  if (unitSystem === 'imperial') {
    totalWallAreaSqm = (wallLength * wallHeight * numberOfWalls) / 10.7639;
    openingsAreaSqm = (Number.isFinite(openingsDeductionArea) && openingsDeductionArea > 0) ? openingsDeductionArea / 10.7639 : 0;
  } else {
    totalWallAreaSqm = wallLength * wallHeight * numberOfWalls;
    openingsAreaSqm = (Number.isFinite(openingsDeductionArea) && openingsDeductionArea > 0) ? openingsDeductionArea : 0;
  }

  const netWallAreaSqm = Math.max(0, totalWallAreaSqm - openingsAreaSqm);
  const totalBrickworkVolumeCum = netWallAreaSqm * wallThicknessMeters;
  const totalBrickworkVolumeCft = totalBrickworkVolumeCum * 35.3147;

  const jointSafe = Math.max(0, mortarJointMm || 0);

  // Single Brick Volumes
  const nominalVolCum = ((brickLengthMm + jointSafe) / 1000) * ((brickWidthMm + jointSafe) / 1000) * ((brickHeightMm + jointSafe) / 1000);
  const actualSingleBrickVolCum = (brickLengthMm / 1000) * (brickWidthMm / 1000) * (brickHeightMm / 1000);

  const totalBricksCount = nominalVolCum > 0 ? totalBrickworkVolumeCum / nominalVolCum : 0;
  const actualBricksVolumeCum = totalBricksCount * actualSingleBrickVolCum;

  // Wet Mortar Volume = Total Brickwork Volume - Actual Bricks Volume
  const wetMortarVolumeCum = Math.max(0, totalBrickworkVolumeCum - actualBricksVolumeCum);
  const wetMortarVolumeCft = wetMortarVolumeCum * 35.3147;

  // Dry Mortar Volume
  const dryFactorSafe = Number.isFinite(dryVolumeFactor) && dryVolumeFactor > 0 ? dryVolumeFactor : 1.33;
  const wastageSafe = Math.max(0, mortarWastagePercent || 0);
  const dryMortarVolumeCum = wetMortarVolumeCum * dryFactorSafe * (1 + wastageSafe / 100);
  const dryMortarVolumeCft = dryMortarVolumeCum * 35.3147;

  // Mix Ratio Splitting
  let cementPart = 1;
  let sandPart = 6;
  let ratioLabel = mortarRatio;

  if (mortarRatio === 'custom') {
    cementPart = Number.isFinite(customCementPart) && (customCementPart as number) > 0 ? (customCementPart as number) : 1;
    sandPart = Number.isFinite(customSandPart) && (customSandPart as number) > 0 ? (customSandPart as number) : 6;
    ratioLabel = `${cementPart}:${sandPart}`;
  } else {
    const parts = (mortarRatio || '1:6').split(':').map(Number);
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1]) && parts[0] > 0 && parts[1] > 0) {
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

  // Cost Estimation
  let costSummary: MaterialCostSummary | undefined = undefined;
  if (enableCost) {
    const activeCurrency = currency || 'INR';
    const defaults = activeCurrency === 'INR' ? DEFAULT_BRICKWORK_PRICES_INR : DEFAULT_BRICKWORK_PRICES_USD;
    const cRate = Number.isFinite(cementBagRate) && (cementBagRate as number) >= 0 ? (cementBagRate as number) : defaults.cementBagRate;
    const sRate = Number.isFinite(sandRatePerCft) && (sandRatePerCft as number) >= 0 ? (sandRatePerCft as number) : defaults.sandRatePerCft;
    const bRate = Number.isFinite(brickRate) && (brickRate as number) >= 0 ? (brickRate as number) : defaults.brickRate;

    const cementCost = Math.ceil(cementBags50kg) * cRate;
    const sandCost = sandVolumeCft * sRate;
    const brickCost = Math.round(totalBricksCount) * bRate;
    const totalMaterialCost = cementCost + sandCost + brickCost;

    costSummary = {
      cementCost: Number(cementCost.toFixed(2)),
      sandCost: Number(sandCost.toFixed(2)),
      brickCost: Number(brickCost.toFixed(2)),
      totalMaterialCost: Number(totalMaterialCost.toFixed(2)),
      costPerSqm: netWallAreaSqm > 0 ? Number((totalMaterialCost / netWallAreaSqm).toFixed(2)) : undefined,
      costPerCum: totalBrickworkVolumeCum > 0 ? Number((totalMaterialCost / totalBrickworkVolumeCum).toFixed(2)) : undefined,
      currency: activeCurrency,
      currencySymbol: activeCurrency === 'INR' ? '₹' : '$',
      formattedTotal: formatCurrency(totalMaterialCost, activeCurrency),
    };
  }

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
    mortarWastagePercent: wastageSafe,
    dryVolumeFactor: dryFactorSafe,
    brickLengthMm,
    brickWidthMm,
    brickHeightMm,
    costSummary,
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
    enableCost = false,
    currency = 'INR',
    paverRate,
    sandRatePerCft,
  } = input;

  if (!Number.isFinite(pavingArea) || pavingArea <= 0) {
    throw new Error('Paving Area must be a positive number.');
  }
  if (!Number.isFinite(paverLengthMm) || paverLengthMm <= 0 ||
      !Number.isFinite(paverWidthMm) || paverWidthMm <= 0) {
    throw new Error('Paver dimensions must be valid positive numbers.');
  }

  let pavingAreaSqm = pavingArea;
  if (areaUnit === 'sqft') {
    pavingAreaSqm = pavingArea / 10.7639;
  } else if (areaUnit === 'sqyd') {
    pavingAreaSqm = pavingArea * 0.836127;
  }

  const pavingAreaSqft = pavingAreaSqm * 10.7639;
  const jointSafe = Math.max(0, jointGapMm || 0);

  const singlePaverAreaSqm = (paverLengthMm / 1000) * (paverWidthMm / 1000);
  const effectivePaverLengthM = (paverLengthMm + jointSafe) / 1000;
  const effectivePaverWidthM = (paverWidthMm + jointSafe) / 1000;
  const singleEffectivePaverAreaSqm = effectivePaverLengthM * effectivePaverWidthM;

  const paversPerSqm = singleEffectivePaverAreaSqm > 0 ? 1 / singleEffectivePaverAreaSqm : 0;
  const paversPerSqft = paversPerSqm / 10.7639;

  const paversBeforeWastage = singleEffectivePaverAreaSqm > 0 ? pavingAreaSqm / singleEffectivePaverAreaSqm : 0;
  const wastageSafe = Math.max(0, wastagePercent || 0);
  const wastageCount = paversBeforeWastage * (wastageSafe / 100);
  const finalEstimatedPavers = Math.ceil(paversBeforeWastage + wastageCount);

  let beddingSandVolumeCum: number | undefined = undefined;
  let beddingSandVolumeCft: number | undefined = undefined;
  let beddingSandTons: number | undefined = undefined;

  const beddingSafe = Math.max(0, beddingThicknessMm || 0);
  if (beddingSafe > 0) {
    beddingSandVolumeCum = Number((pavingAreaSqm * (beddingSafe / 1000)).toFixed(3));
    beddingSandVolumeCft = Number((beddingSandVolumeCum * 35.3147).toFixed(2));
    beddingSandTons = Number(((beddingSandVolumeCum * 1600) / 1000).toFixed(2));
  }

  // Cost Estimation
  let costSummary: MaterialCostSummary | undefined = undefined;
  if (enableCost) {
    const activeCurrency = currency || 'INR';
    const defaults = activeCurrency === 'INR' ? DEFAULT_BRICKWORK_PRICES_INR : DEFAULT_BRICKWORK_PRICES_USD;
    const pRate = Number.isFinite(paverRate) && (paverRate as number) >= 0 ? (paverRate as number) : defaults.paverRate;
    const sRate = Number.isFinite(sandRatePerCft) && (sandRatePerCft as number) >= 0 ? (sandRatePerCft as number) : defaults.sandRatePerCft;

    const paverCost = finalEstimatedPavers * pRate;
    const sandCost = (beddingSandVolumeCft || 0) * sRate;
    const totalMaterialCost = paverCost + sandCost;

    costSummary = {
      paverCost: Number(paverCost.toFixed(2)),
      sandCost: beddingSandVolumeCft ? Number(sandCost.toFixed(2)) : undefined,
      totalMaterialCost: Number(totalMaterialCost.toFixed(2)),
      costPerSqm: pavingAreaSqm > 0 ? Number((totalMaterialCost / pavingAreaSqm).toFixed(2)) : undefined,
      costPerSqft: pavingAreaSqft > 0 ? Number((totalMaterialCost / pavingAreaSqft).toFixed(2)) : undefined,
      currency: activeCurrency,
      currencySymbol: activeCurrency === 'INR' ? '₹' : '$',
      formattedTotal: formatCurrency(totalMaterialCost, activeCurrency),
    };
  }

  return {
    pavingAreaSqm: Number(pavingAreaSqm.toFixed(2)),
    pavingAreaSqft: Number(pavingAreaSqft.toFixed(2)),
    paverLengthMm,
    paverWidthMm,
    jointGapMm: jointSafe,
    singlePaverAreaSqm: Number(singlePaverAreaSqm.toFixed(4)),
    singleEffectivePaverAreaSqm: Number(singleEffectivePaverAreaSqm.toFixed(4)),
    paversPerSqm: Number(paversPerSqm.toFixed(1)),
    paversPerSqft: Number(paversPerSqft.toFixed(2)),
    paversBeforeWastage: Math.round(paversBeforeWastage),
    wastageCount: Math.round(wastageCount),
    finalEstimatedPavers,
    wastagePercent: wastageSafe,
    beddingSandVolumeCum,
    beddingSandVolumeCft,
    beddingSandTons,
    costSummary,
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
    enableCost = false,
    currency = 'INR',
    brickRate,
    cementBagRate,
    sandRatePerCft,
  } = input;

  if (!Number.isFinite(lengthM) || lengthM <= 0 ||
      !Number.isFinite(widthM) || widthM <= 0 ||
      !Number.isFinite(heightM) || heightM <= 0) {
    throw new Error('Structure dimensions (Length, Width, Height) must be positive numbers.');
  }
  if (!Number.isFinite(brickLengthMm) || brickLengthMm <= 0 ||
      !Number.isFinite(brickWidthMm) || brickWidthMm <= 0 ||
      !Number.isFinite(brickHeightMm) || brickHeightMm <= 0) {
    throw new Error('Brick dimensions must be valid positive numbers.');
  }

  const totalVolumeCum = lengthM * widthM * heightM;
  const totalVolumeCft = totalVolumeCum * 35.3147;

  const jointSafe = Math.max(0, mortarJointMm || 0);

  const nominalVolCum = ((brickLengthMm + jointSafe) / 1000) * ((brickWidthMm + jointSafe) / 1000) * ((brickHeightMm + jointSafe) / 1000);
  const actualSingleBrickVolCum = (brickLengthMm / 1000) * (brickWidthMm / 1000) * (brickHeightMm / 1000);

  const baseBricks = nominalVolCum > 0 ? totalVolumeCum / nominalVolCum : 0;
  const brickWastageSafe = Math.max(0, brickWastagePercent || 0);
  const finalBricks = Math.ceil(baseBricks * (1 + brickWastageSafe / 100));

  const actualBricksVolumeCum = baseBricks * actualSingleBrickVolCum;
  const wetMortarVolumeCum = Math.max(0, totalVolumeCum - actualBricksVolumeCum);
  const wetMortarVolumeCft = wetMortarVolumeCum * 35.3147;

  const dryFactorSafe = Number.isFinite(dryVolumeFactor) && dryVolumeFactor > 0 ? dryVolumeFactor : 1.33;
  const mortarWastageSafe = Math.max(0, mortarWastagePercent || 0);
  const dryMortarVolumeCum = wetMortarVolumeCum * dryFactorSafe * (1 + mortarWastageSafe / 100);
  const dryMortarVolumeCft = dryMortarVolumeCum * 35.3147;

  let cementPart = 1;
  let sandPart = 6;
  let ratioLabel = mortarRatio;

  if (mortarRatio === 'custom') {
    cementPart = Number.isFinite(customCementPart) && (customCementPart as number) > 0 ? (customCementPart as number) : 1;
    sandPart = Number.isFinite(customSandPart) && (customSandPart as number) > 0 ? (customSandPart as number) : 6;
    ratioLabel = `${cementPart}:${sandPart}`;
  } else {
    const parts = (mortarRatio || '1:6').split(':').map(Number);
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1]) && parts[0] > 0 && parts[1] > 0) {
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

  // Cost Estimation
  let costSummary: MaterialCostSummary | undefined = undefined;
  if (enableCost) {
    const activeCurrency = currency || 'INR';
    const defaults = activeCurrency === 'INR' ? DEFAULT_BRICKWORK_PRICES_INR : DEFAULT_BRICKWORK_PRICES_USD;
    const bRate = Number.isFinite(brickRate) && (brickRate as number) >= 0 ? (brickRate as number) : defaults.brickRate;
    const cRate = Number.isFinite(cementBagRate) && (cementBagRate as number) >= 0 ? (cementBagRate as number) : defaults.cementBagRate;
    const sRate = Number.isFinite(sandRatePerCft) && (sandRatePerCft as number) >= 0 ? (sandRatePerCft as number) : defaults.sandRatePerCft;

    const brickCost = finalBricks * bRate;
    const cementCost = Math.ceil(cementBags50kg) * cRate;
    const sandCost = sandVolumeCft * sRate;
    const totalMaterialCost = brickCost + cementCost + sandCost;

    costSummary = {
      brickCost: Number(brickCost.toFixed(2)),
      cementCost: Number(cementCost.toFixed(2)),
      sandCost: Number(sandCost.toFixed(2)),
      totalMaterialCost: Number(totalMaterialCost.toFixed(2)),
      costPerCum: totalVolumeCum > 0 ? Number((totalMaterialCost / totalVolumeCum).toFixed(2)) : undefined,
      currency: activeCurrency,
      currencySymbol: activeCurrency === 'INR' ? '₹' : '$',
      formattedTotal: formatCurrency(totalMaterialCost, activeCurrency),
    };
  }

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
    costSummary,
  };
}
