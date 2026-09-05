/**
 * Comprehensive Steel Weight & Rebar Calculation Engine
 * Supports TMT Rebar (D²/162 formula), Structural Steel Shapes, and Stainless Steel Grades
 */

// 1. Centralized Material Densities (kg/m³)
export interface MaterialInfo {
  name: string;
  densityKgM3: number; // kg/m³
  densityGPerCm3: number; // g/cm³
  description: string;
}

export const MATERIAL_DENSITIES: Record<string, MaterialInfo> = {
  mild_steel: {
    name: 'Mild Steel / Carbon Steel',
    densityKgM3: 7850,
    densityGPerCm3: 7.85,
    description: 'Standard structural and construction carbon steel',
  },
  ss_304: {
    name: 'Stainless Steel 304',
    densityKgM3: 7930,
    densityGPerCm3: 7.93,
    description: 'Standard 18/8 austenitic stainless steel',
  },
  ss_316: {
    name: 'Stainless Steel 316',
    densityKgM3: 8000,
    densityGPerCm3: 8.00,
    description: 'Marine-grade molybdenum-alloyed stainless steel',
  },
  generic_ss: {
    name: 'Generic Stainless Steel',
    densityKgM3: 7900,
    densityGPerCm3: 7.90,
    description: 'General stainless steel alloy average',
  },
  cast_iron: {
    name: 'Cast Iron',
    densityKgM3: 7200,
    densityGPerCm3: 7.20,
    description: 'Gray and ductile cast iron',
  },
  aluminium: {
    name: 'Aluminium 6061 / Structural',
    densityKgM3: 2700,
    densityGPerCm3: 2.70,
    description: 'Lightweight commercial alloy',
  },
};

// 2. Rebar Standard Weights & 12m Commercial Bar Info
export interface RebarSizeInfo {
  diameterMm: number;
  weightPerMeterKg: number;
  weightPerFootKg: number;
  weightPer12mBarKg: number;
  barsPerTon: number;
  barsPerQuintal: number;
}

export const STANDARD_REBAR_SIZES: RebarSizeInfo[] = [
  { diameterMm: 6, weightPerMeterKg: 0.222, weightPerFootKg: 0.068, weightPer12mBarKg: 2.67, barsPerTon: 374, barsPerQuintal: 37.4 },
  { diameterMm: 8, weightPerMeterKg: 0.395, weightPerFootKg: 0.120, weightPer12mBarKg: 4.74, barsPerTon: 211, barsPerQuintal: 21.1 },
  { diameterMm: 10, weightPerMeterKg: 0.617, weightPerFootKg: 0.188, weightPer12mBarKg: 7.41, barsPerTon: 135, barsPerQuintal: 13.5 },
  { diameterMm: 12, weightPerMeterKg: 0.889, weightPerFootKg: 0.271, weightPer12mBarKg: 10.67, barsPerTon: 93, barsPerQuintal: 9.3 },
  { diameterMm: 16, weightPerMeterKg: 1.580, weightPerFootKg: 0.482, weightPer12mBarKg: 18.96, barsPerTon: 52, barsPerQuintal: 5.2 },
  { diameterMm: 20, weightPerMeterKg: 2.469, weightPerFootKg: 0.753, weightPer12mBarKg: 29.63, barsPerTon: 33, barsPerQuintal: 3.3 },
  { diameterMm: 25, weightPerMeterKg: 3.858, weightPerFootKg: 1.176, weightPer12mBarKg: 46.30, barsPerTon: 21, barsPerQuintal: 2.1 },
  { diameterMm: 28, weightPerMeterKg: 4.839, weightPerFootKg: 1.475, weightPer12mBarKg: 58.07, barsPerTon: 17, barsPerQuintal: 1.7 },
  { diameterMm: 32, weightPerMeterKg: 6.321, weightPerFootKg: 1.927, weightPer12mBarKg: 75.85, barsPerTon: 13, barsPerQuintal: 1.3 },
  { diameterMm: 36, weightPerMeterKg: 8.000, weightPerFootKg: 2.438, weightPer12mBarKg: 96.00, barsPerTon: 10, barsPerQuintal: 1.0 },
  { diameterMm: 40, weightPerMeterKg: 9.876, weightPerFootKg: 3.010, weightPer12mBarKg: 118.52, barsPerTon: 8, barsPerQuintal: 0.8 },
];

/**
 * Standard Rebar Unit Weight Formula: W = D² / 162.28 kg/m
 */
export function getRebarUnitWeight(diameterMm: number): number {
  if (isNaN(diameterMm) || diameterMm <= 0) return 0;
  return Number(((diameterMm * diameterMm) / 162.28).toFixed(4));
}

// 3. Rebar Multi-Mode Calculation
export type RebarInputMode = 'bars' | 'length' | 'weight';

export interface RebarCalculationResult {
  diameterMm: number;
  inputMode: RebarInputMode;
  inputQuantity: number;
  unitWeightKgPerMeter: number;
  weightPer12mBarKg: number;
  totalLengthMeters: number;
  totalBars12mCount: number;
  totalWeightKg: number;
  totalWeightQuintals: number;
  totalWeightTonnes: number;
  barsPerTon: number;
}

export function calculateRebarWeight(
  diameterMm: number,
  mode: RebarInputMode,
  quantity: number
): RebarCalculationResult {
  const d = Math.max(1, diameterMm);
  const q = Math.max(0, quantity);
  const unitWt = getRebarUnitWeight(d);
  const wt12m = Number((unitWt * 12).toFixed(3));
  const barsPerTon = wt12m > 0 ? Math.floor(1000 / wt12m) : 0;

  let totalLengthMeters = 0;
  let totalBars12mCount = 0;
  let totalWeightKg = 0;

  if (mode === 'bars') {
    totalBars12mCount = q;
    totalLengthMeters = Number((q * 12).toFixed(2));
    totalWeightKg = Number((totalLengthMeters * unitWt).toFixed(2));
  } else if (mode === 'length') {
    totalLengthMeters = q;
    totalBars12mCount = Number((q / 12).toFixed(2));
    totalWeightKg = Number((q * unitWt).toFixed(2));
  } else {
    // mode === 'weight'
    totalWeightKg = q;
    totalLengthMeters = unitWt > 0 ? Number((q / unitWt).toFixed(2)) : 0;
    totalBars12mCount = Number((totalLengthMeters / 12).toFixed(2));
  }

  return {
    diameterMm: d,
    inputMode: mode,
    inputQuantity: q,
    unitWeightKgPerMeter: unitWt,
    weightPer12mBarKg: wt12m,
    totalLengthMeters,
    totalBars12mCount,
    totalWeightKg,
    totalWeightQuintals: Number((totalWeightKg / 100).toFixed(2)),
    totalWeightTonnes: Number((totalWeightKg / 1000).toFixed(3)),
    barsPerTon,
  };
}

// 4. Structural Steel & Stainless Steel Geometric Calculation Result
export interface StructuralCalculationResult {
  shapeType: string;
  shapeName: string;
  materialName: string;
  densityKgM3: number;
  areaMm2: number;
  areaCm2: number;
  volumeM3: number;
  lengthMeters: number;
  quantity: number;
  weightPerMeterKg: number;
  weightPerPieceKg: number;
  totalWeightKg: number;
  totalWeightTonnes: number;
  formulaDescription: string;
}

/**
 * Solid Round Bar
 */
export function calculateRoundBar(
  diameterMm: number,
  lengthMeters: number,
  quantity: number = 1,
  materialKey: string = 'mild_steel'
): StructuralCalculationResult {
  const mat = MATERIAL_DENSITIES[materialKey] || MATERIAL_DENSITIES.mild_steel;
  const radiusM = (diameterMm / 2) / 1000;
  const areaM2 = Math.PI * radiusM * radiusM;
  const areaMm2 = Number((areaM2 * 1000000).toFixed(2));
  const wtPerMeter = Number((areaM2 * mat.densityKgM3).toFixed(4));
  const wtPerPiece = Number((wtPerMeter * lengthMeters).toFixed(3));
  const totalWeight = Number((wtPerPiece * quantity).toFixed(2));

  return {
    shapeType: 'round_bar',
    shapeName: `Round Bar (Ø${diameterMm} mm)`,
    materialName: mat.name,
    densityKgM3: mat.densityKgM3,
    areaMm2,
    areaCm2: Number((areaMm2 / 100).toFixed(2)),
    volumeM3: Number((areaM2 * lengthMeters * quantity).toFixed(5)),
    lengthMeters,
    quantity,
    weightPerMeterKg: wtPerMeter,
    weightPerPieceKg: wtPerPiece,
    totalWeightKg: totalWeight,
    totalWeightTonnes: Number((totalWeight / 1000).toFixed(3)),
    formulaDescription: `Area = π × (D/2)² = ${areaMm2} mm² | Weight = Area × Length × Density`,
  };
}

/**
 * Solid Square Bar
 */
export function calculateSquareBar(
  sideMm: number,
  lengthMeters: number,
  quantity: number = 1,
  materialKey: string = 'mild_steel'
): StructuralCalculationResult {
  const mat = MATERIAL_DENSITIES[materialKey] || MATERIAL_DENSITIES.mild_steel;
  const sideM = sideMm / 1000;
  const areaM2 = sideM * sideM;
  const areaMm2 = Number((sideMm * sideMm).toFixed(2));
  const wtPerMeter = Number((areaM2 * mat.densityKgM3).toFixed(4));
  const wtPerPiece = Number((wtPerMeter * lengthMeters).toFixed(3));
  const totalWeight = Number((wtPerPiece * quantity).toFixed(2));

  return {
    shapeType: 'square_bar',
    shapeName: `Square Bar (${sideMm} × ${sideMm} mm)`,
    materialName: mat.name,
    densityKgM3: mat.densityKgM3,
    areaMm2,
    areaCm2: Number((areaMm2 / 100).toFixed(2)),
    volumeM3: Number((areaM2 * lengthMeters * quantity).toFixed(5)),
    lengthMeters,
    quantity,
    weightPerMeterKg: wtPerMeter,
    weightPerPieceKg: wtPerPiece,
    totalWeightKg: totalWeight,
    totalWeightTonnes: Number((totalWeight / 1000).toFixed(3)),
    formulaDescription: `Area = Side² = ${areaMm2} mm² | Weight = Area × Length × Density`,
  };
}

/**
 * Flat Bar / Plate / Sheet
 */
export function calculatePlateFlatBar(
  widthMm: number,
  thicknessMm: number,
  lengthMeters: number,
  quantity: number = 1,
  materialKey: string = 'mild_steel'
): StructuralCalculationResult {
  const mat = MATERIAL_DENSITIES[materialKey] || MATERIAL_DENSITIES.mild_steel;
  const areaMm2 = Number((widthMm * thicknessMm).toFixed(2));
  const areaM2 = (widthMm / 1000) * (thicknessMm / 1000);
  const wtPerMeter = Number((areaM2 * mat.densityKgM3).toFixed(4));
  const wtPerPiece = Number((wtPerMeter * lengthMeters).toFixed(3));
  const totalWeight = Number((wtPerPiece * quantity).toFixed(2));

  return {
    shapeType: 'flat_bar',
    shapeName: `Flat Bar / Plate (${widthMm} × ${thicknessMm} mm)`,
    materialName: mat.name,
    densityKgM3: mat.densityKgM3,
    areaMm2,
    areaCm2: Number((areaMm2 / 100).toFixed(2)),
    volumeM3: Number((areaM2 * lengthMeters * quantity).toFixed(5)),
    lengthMeters,
    quantity,
    weightPerMeterKg: wtPerMeter,
    weightPerPieceKg: wtPerPiece,
    totalWeightKg: totalWeight,
    totalWeightTonnes: Number((totalWeight / 1000).toFixed(3)),
    formulaDescription: `Area = Width × Thickness = ${areaMm2} mm² | Weight = Volume × Density`,
  };
}

/**
 * Steel Pipe (Round Hollow)
 */
export function calculatePipe(
  outerDiaMm: number,
  wallThickMm: number,
  lengthMeters: number,
  quantity: number = 1,
  materialKey: string = 'mild_steel'
): StructuralCalculationResult {
  const mat = MATERIAL_DENSITIES[materialKey] || MATERIAL_DENSITIES.mild_steel;
  const innerDiaMm = Math.max(0, outerDiaMm - 2 * wallThickMm);
  const areaMm2 = Number((Math.PI * (outerDiaMm - wallThickMm) * wallThickMm).toFixed(2));
  const areaM2 = areaMm2 / 1000000;
  const wtPerMeter = Number((areaM2 * mat.densityKgM3).toFixed(4));
  const wtPerPiece = Number((wtPerMeter * lengthMeters).toFixed(3));
  const totalWeight = Number((wtPerPiece * quantity).toFixed(2));

  return {
    shapeType: 'pipe',
    shapeName: `Steel Pipe (OD ${outerDiaMm} mm, Wall ${wallThickMm} mm)`,
    materialName: mat.name,
    densityKgM3: mat.densityKgM3,
    areaMm2,
    areaCm2: Number((areaMm2 / 100).toFixed(2)),
    volumeM3: Number((areaM2 * lengthMeters * quantity).toFixed(5)),
    lengthMeters,
    quantity,
    weightPerMeterKg: wtPerMeter,
    weightPerPieceKg: wtPerPiece,
    totalWeightKg: totalWeight,
    totalWeightTonnes: Number((totalWeight / 1000).toFixed(3)),
    formulaDescription: `Area = π × (OD - T) × T = ${areaMm2} mm² | Weight = Area × Length × Density`,
  };
}

/**
 * Square Hollow Section (SHS) / Rectangular Hollow Section (RHS)
 */
export function calculateHollowSection(
  widthMm: number,
  heightMm: number,
  wallThickMm: number,
  lengthMeters: number,
  quantity: number = 1,
  materialKey: string = 'mild_steel'
): StructuralCalculationResult {
  const mat = MATERIAL_DENSITIES[materialKey] || MATERIAL_DENSITIES.mild_steel;
  const outerArea = widthMm * heightMm;
  const innerWidth = Math.max(0, widthMm - 2 * wallThickMm);
  const innerHeight = Math.max(0, heightMm - 2 * wallThickMm);
  const innerArea = innerWidth * innerHeight;
  const areaMm2 = Number((outerArea - innerArea).toFixed(2));
  const areaM2 = areaMm2 / 1000000;
  const wtPerMeter = Number((areaM2 * mat.densityKgM3).toFixed(4));
  const wtPerPiece = Number((wtPerMeter * lengthMeters).toFixed(3));
  const totalWeight = Number((wtPerPiece * quantity).toFixed(2));

  const isSquare = widthMm === heightMm;
  const namePrefix = isSquare ? `Square Hollow Section SHS (${widthMm}×${widthMm}×${wallThickMm} mm)` : `Rectangular Hollow Section RHS (${widthMm}×${heightMm}×${wallThickMm} mm)`;

  return {
    shapeType: isSquare ? 'shs' : 'rhs',
    shapeName: namePrefix,
    materialName: mat.name,
    densityKgM3: mat.densityKgM3,
    areaMm2,
    areaCm2: Number((areaMm2 / 100).toFixed(2)),
    volumeM3: Number((areaM2 * lengthMeters * quantity).toFixed(5)),
    lengthMeters,
    quantity,
    weightPerMeterKg: wtPerMeter,
    weightPerPieceKg: wtPerPiece,
    totalWeightKg: totalWeight,
    totalWeightTonnes: Number((totalWeight / 1000).toFixed(3)),
    formulaDescription: `Area = (W×H) - ((W-2T)×(H-2T)) = ${areaMm2} mm² | Weight = Area × Length × Density`,
  };
}

/**
 * Equal / Unequal Angle (L-Section)
 */
export function calculateAngle(
  leg1Mm: number,
  leg2Mm: number,
  thicknessMm: number,
  lengthMeters: number,
  quantity: number = 1,
  materialKey: string = 'mild_steel'
): StructuralCalculationResult {
  const mat = MATERIAL_DENSITIES[materialKey] || MATERIAL_DENSITIES.mild_steel;
  const areaMm2 = Number((thicknessMm * (leg1Mm + leg2Mm - thicknessMm)).toFixed(2));
  const areaM2 = areaMm2 / 1000000;
  const wtPerMeter = Number((areaM2 * mat.densityKgM3).toFixed(4));
  const wtPerPiece = Number((wtPerMeter * lengthMeters).toFixed(3));
  const totalWeight = Number((wtPerPiece * quantity).toFixed(2));

  return {
    shapeType: 'angle',
    shapeName: `Angle (${leg1Mm} × ${leg2Mm} × ${thicknessMm} mm)`,
    materialName: mat.name,
    densityKgM3: mat.densityKgM3,
    areaMm2,
    areaCm2: Number((areaMm2 / 100).toFixed(2)),
    volumeM3: Number((areaM2 * lengthMeters * quantity).toFixed(5)),
    lengthMeters,
    quantity,
    weightPerMeterKg: wtPerMeter,
    weightPerPieceKg: wtPerPiece,
    totalWeightKg: totalWeight,
    totalWeightTonnes: Number((totalWeight / 1000).toFixed(3)),
    formulaDescription: `Area = T × (L1 + L2 - T) = ${areaMm2} mm² | Weight = Area × Length × Density`,
  };
}

/**
 * C-Channel
 */
export function calculateChannel(
  heightMm: number,
  flangeWidthMm: number,
  webThickMm: number,
  flangeThickMm: number,
  lengthMeters: number,
  quantity: number = 1,
  materialKey: string = 'mild_steel'
): StructuralCalculationResult {
  const mat = MATERIAL_DENSITIES[materialKey] || MATERIAL_DENSITIES.mild_steel;
  const webArea = (heightMm - 2 * flangeThickMm) * webThickMm;
  const flangeArea = 2 * (flangeWidthMm * flangeThickMm);
  const areaMm2 = Number((webArea + flangeArea).toFixed(2));
  const areaM2 = areaMm2 / 1000000;
  const wtPerMeter = Number((areaM2 * mat.densityKgM3).toFixed(4));
  const wtPerPiece = Number((wtPerMeter * lengthMeters).toFixed(3));
  const totalWeight = Number((wtPerPiece * quantity).toFixed(2));

  return {
    shapeType: 'channel',
    shapeName: `C-Channel (${heightMm} × ${flangeWidthMm} mm, Web ${webThickMm}mm, Flange ${flangeThickMm}mm)`,
    materialName: mat.name,
    densityKgM3: mat.densityKgM3,
    areaMm2,
    areaCm2: Number((areaMm2 / 100).toFixed(2)),
    volumeM3: Number((areaM2 * lengthMeters * quantity).toFixed(5)),
    lengthMeters,
    quantity,
    weightPerMeterKg: wtPerMeter,
    weightPerPieceKg: wtPerPiece,
    totalWeightKg: totalWeight,
    totalWeightTonnes: Number((totalWeight / 1000).toFixed(3)),
    formulaDescription: `Area = 2×(B×tf) + (H - 2×tf)×tw = ${areaMm2} mm² | Weight = Area × Length × Density`,
  };
}

/**
 * I-Beam / H-Beam
 */
export function calculateBeam(
  depthMm: number,
  flangeWidthMm: number,
  webThickMm: number,
  flangeThickMm: number,
  lengthMeters: number,
  quantity: number = 1,
  materialKey: string = 'mild_steel'
): StructuralCalculationResult {
  const mat = MATERIAL_DENSITIES[materialKey] || MATERIAL_DENSITIES.mild_steel;
  const flangesArea = 2 * (flangeWidthMm * flangeThickMm);
  const webArea = (depthMm - 2 * flangeThickMm) * webThickMm;
  const areaMm2 = Number((flangesArea + webArea).toFixed(2));
  const areaM2 = areaMm2 / 1000000;
  const wtPerMeter = Number((areaM2 * mat.densityKgM3).toFixed(4));
  const wtPerPiece = Number((wtPerMeter * lengthMeters).toFixed(3));
  const totalWeight = Number((wtPerPiece * quantity).toFixed(2));

  return {
    shapeType: 'beam',
    shapeName: `I-Beam / H-Beam (${depthMm} × ${flangeWidthMm} mm)`,
    materialName: mat.name,
    densityKgM3: mat.densityKgM3,
    areaMm2,
    areaCm2: Number((areaMm2 / 100).toFixed(2)),
    volumeM3: Number((areaM2 * lengthMeters * quantity).toFixed(5)),
    lengthMeters,
    quantity,
    weightPerMeterKg: wtPerMeter,
    weightPerPieceKg: wtPerPiece,
    totalWeightKg: totalWeight,
    totalWeightTonnes: Number((totalWeight / 1000).toFixed(3)),
    formulaDescription: `Area = 2×(B×tf) + (D - 2×tf)×tw = ${areaMm2} mm² | Weight = Area × Length × Density`,
  };
}

/**
 * Solid Hexagonal Bar (Measured across flats S)
 * Area = (sqrt(3) / 2) * S² ≈ 0.8660254 * S²
 */
export function calculateHexagonalBar(
  sideAcrossFlatsMm: number,
  lengthMeters: number,
  quantity: number = 1,
  materialKey: string = 'mild_steel'
): StructuralCalculationResult {
  const mat = MATERIAL_DENSITIES[materialKey] || MATERIAL_DENSITIES.mild_steel;
  const s = Math.max(0.1, sideAcrossFlatsMm);
  const areaMm2 = Number(((Math.sqrt(3) / 2) * s * s).toFixed(2));
  const areaM2 = areaMm2 / 1000000;
  const wtPerMeter = Number((areaM2 * mat.densityKgM3).toFixed(4));
  const wtPerPiece = Number((wtPerMeter * lengthMeters).toFixed(3));
  const totalWeight = Number((wtPerPiece * quantity).toFixed(2));

  return {
    shapeType: 'hex_bar',
    shapeName: `Hexagonal Bar (${s} mm across flats)`,
    materialName: mat.name,
    densityKgM3: mat.densityKgM3,
    areaMm2,
    areaCm2: Number((areaMm2 / 100).toFixed(2)),
    volumeM3: Number((areaM2 * lengthMeters * quantity).toFixed(5)),
    lengthMeters,
    quantity,
    weightPerMeterKg: wtPerMeter,
    weightPerPieceKg: wtPerPiece,
    totalWeightKg: totalWeight,
    totalWeightTonnes: Number((totalWeight / 1000).toFixed(3)),
    formulaDescription: `Area = (√3/2) × S² = ${areaMm2} mm² | Weight = Area × Length × Density`,
  };
}

// ---------------------------------------------------------------------------
// 5. UNIVERSAL MULTI-UNIT & COST-ENABLED STEEL CALCULATION ENGINE
// ---------------------------------------------------------------------------

export type SteelShapeType =
  | 'rebar'
  | 'round_bar'
  | 'square_bar'
  | 'hex_bar'
  | 'plate'
  | 'pipe'
  | 'shs'
  | 'rhs'
  | 'angle'
  | 'channel'
  | 'beam';

export type DimensionUnit = 'metric' | 'imperial';
export type CurrencyCode = 'INR' | 'USD';

export interface UniversalSteelInput {
  shapeType: SteelShapeType;
  materialKey?: string;
  unitSystem?: DimensionUnit; // 'metric' (mm, m, kg) or 'imperial' (in, ft, lb)

  // Dimensions
  diameter?: number;
  side?: number;
  width?: number;
  height?: number;
  thickness?: number;
  outerDiameter?: number;
  leg1?: number;
  leg2?: number;
  flangeWidth?: number;
  webThickness?: number;
  flangeThickness?: number;

  // Length & Quantity
  length?: number; // length per piece (m or ft)
  quantity?: number; // number of pieces
  rebarMode?: 'bars' | 'length' | 'weight';
  rebarQuantity?: number; // quantity for rebar mode

  // Procurement & Pricing
  wastagePercent?: number; // e.g. 0, 3, 5%
  pricePerUnitWeight?: number; // price per kg (metric) or per lb (imperial)
  currency?: CurrencyCode; // 'INR' or 'USD'
}

export interface UniversalSteelResult {
  shapeType: SteelShapeType;
  shapeName: string;
  materialName: string;
  materialDensityKgM3: number;
  materialDensityLbIn3: number;

  // Cross-sectional Area
  areaMm2: number;
  areaCm2: number;
  areaIn2: number;

  // Geometry Lengths
  lengthM: number;
  lengthFt: number;
  totalPieces: number;
  totalLengthM: number;
  totalLengthFt: number;

  // Weight Metrics
  unitWeightKgM: number;
  unitWeightLbFt: number;
  weightPerPieceKg: number;
  weightPerPieceLb: number;

  // Weights with Wastage
  baseWeightKg: number;
  baseWeightLb: number;
  wastageWeightKg: number;
  wastageWeightLb: number;
  totalWeightKg: number;
  totalWeightLb: number;
  totalWeightTonnes: number;
  totalWeightUSTons: number;
  totalWeightQuintals: number;

  // Commercial 12m (approx 40ft) Stock & Bundles
  standard12mBars: number;
  bundleCount: number;
  barsPerBundle: number;

  // Cost Estimation
  pricePerUnit: number;
  currency: CurrencyCode;
  currencySymbol: string;
  baseCost: number;
  wastageCost: number;
  totalCost: number;

  // Formula & Explanations
  formulaDescription: string;
  workedSteps: string[];
}

export const REBAR_BUNDLE_MAP: Record<number, number> = {
  6: 15,
  8: 10,
  10: 7,
  12: 5,
  16: 3,
  20: 2,
  25: 1,
  28: 1,
  32: 1,
  36: 1,
  40: 1,
};

/**
 * Universal calculation engine supporting all steel profiles, Metric & Imperial conversion,
 * commercial rod takeoff, and currency cost breakdown.
 */
export function calculateUniversalSteelWeight(input: UniversalSteelInput): UniversalSteelResult {
  const isImperial = input.unitSystem === 'imperial';
  const matKey = input.materialKey || 'mild_steel';
  const mat = MATERIAL_DENSITIES[matKey] || MATERIAL_DENSITIES.mild_steel;
  const densityKgM3 = mat.densityKgM3;
  // 1 kg/m³ = 0.0000361273 lb/in³
  const densityLbIn3 = Number((densityKgM3 * 0.0000361273).toFixed(6));

  const currency: CurrencyCode = input.currency || (isImperial ? 'USD' : 'INR');
  const currencySymbol = currency === 'USD' ? '$' : '₹';
  const wastagePercent = Math.max(0, input.wastagePercent || 0);

  // Helper to convert dimension input to millimeters
  const toMm = (val?: number): number => {
    if (!val || isNaN(val) || val <= 0) return 0;
    return isImperial ? val * 25.4 : val;
  };

  // Helper to convert length input to meters
  const toM = (val?: number): number => {
    if (!val || isNaN(val) || val <= 0) return 0;
    return isImperial ? val * 0.3048 : val;
  };

  let areaMm2 = 0;
  let shapeName = '';
  let formulaDescription = '';
  let workedSteps: string[] = [];

  let lengthPerPieceM = toM(input.length) || 1.0;
  let totalPieces = Math.max(1, Math.round(input.quantity || 1));
  let totalLengthM = lengthPerPieceM * totalPieces;
  let baseWeightKg = 0;
  let nominalDiaForBundle = 12;

  switch (input.shapeType) {
    case 'rebar': {
      const dMm = toMm(input.diameter) || 12;
      nominalDiaForBundle = Math.round(dMm);
      const mode = input.rebarMode || 'bars';
      const q = Math.max(0.1, input.rebarQuantity || (mode === 'bars' ? 50 : 100));

      const unitWtKgM = (dMm * dMm) / 162.28;
      const wt12m = unitWtKgM * 12;

      if (mode === 'bars') {
        totalPieces = Math.round(q);
        lengthPerPieceM = 12;
        totalLengthM = q * 12;
        baseWeightKg = totalLengthM * unitWtKgM;
      } else if (mode === 'length') {
        totalLengthM = isImperial ? q * 0.3048 : q;
        lengthPerPieceM = 12;
        totalPieces = Math.ceil(totalLengthM / 12);
        baseWeightKg = totalLengthM * unitWtKgM;
      } else {
        // mode === 'weight'
        baseWeightKg = isImperial ? q * 0.45359237 : q;
        totalLengthM = unitWtKgM > 0 ? baseWeightKg / unitWtKgM : 0;
        lengthPerPieceM = 12;
        totalPieces = Math.ceil(totalLengthM / 12);
      }

      areaMm2 = Number((Math.PI * Math.pow(dMm / 2, 2)).toFixed(2));
      shapeName = `TMT Rebar (Ø${dMm.toFixed(1)} mm / ${(dMm / 25.4).toFixed(3)}")`;
      formulaDescription = `Unit Weight = D² ÷ 162.28 kg/m = ${unitWtKgM.toFixed(4)} kg/m (${(unitWtKgM * 0.671969).toFixed(4)} lb/ft)`;

      workedSteps.push(`• Nominal Diameter: ${dMm.toFixed(1)} mm (${(dMm / 25.4).toFixed(3)} in)`);
      workedSteps.push(`• Unit Weight = D² ÷ 162.28 = ${dMm.toFixed(1)}² ÷ 162.28 = ${unitWtKgM.toFixed(4)} kg/m`);
      workedSteps.push(`• Weight of 1 Commercial 12m Bar = ${wt12m.toFixed(2)} kg (${(wt12m * 2.20462).toFixed(2)} lb)`);
      workedSteps.push(`• Total Length = ${totalLengthM.toFixed(2)} m (${(totalLengthM * 3.28084).toFixed(1)} ft) across ${totalPieces} bars`);
      break;
    }

    case 'round_bar': {
      const dMm = toMm(input.diameter) || 25;
      nominalDiaForBundle = Math.round(dMm);
      areaMm2 = Number((Math.PI * Math.pow(dMm / 2, 2)).toFixed(2));
      shapeName = `Solid Round Bar (Ø${dMm.toFixed(1)} mm / ${(dMm / 25.4).toFixed(3)}")`;
      formulaDescription = `Area = π × (D/2)² = ${areaMm2} mm² | Weight = Area × Length × Density`;
      workedSteps.push(`• Diameter: ${dMm.toFixed(1)} mm | Length: ${lengthPerPieceM.toFixed(2)} m | Qty: ${totalPieces}`);
      workedSteps.push(`• Cross-Sectional Area = π × (${dMm.toFixed(1)}/2)² = ${areaMm2} mm²`);
      break;
    }

    case 'square_bar': {
      const sMm = toMm(input.side) || 20;
      areaMm2 = Number((sMm * sMm).toFixed(2));
      shapeName = `Solid Square Bar (${sMm.toFixed(1)} × ${sMm.toFixed(1)} mm)`;
      formulaDescription = `Area = Side² = ${areaMm2} mm² | Weight = Area × Length × Density`;
      workedSteps.push(`• Side: ${sMm.toFixed(1)} mm | Length: ${lengthPerPieceM.toFixed(2)} m | Qty: ${totalPieces}`);
      workedSteps.push(`• Cross-Sectional Area = ${sMm.toFixed(1)} × ${sMm.toFixed(1)} = ${areaMm2} mm²`);
      break;
    }

    case 'hex_bar': {
      const sMm = toMm(input.side) || 25;
      areaMm2 = Number(((Math.sqrt(3) / 2) * sMm * sMm).toFixed(2));
      shapeName = `Hexagonal Bar (${sMm.toFixed(1)} mm across flats)`;
      formulaDescription = `Area = (√3/2) × S² = ${areaMm2} mm² | Weight = Area × Length × Density`;
      workedSteps.push(`• Across Flats S: ${sMm.toFixed(1)} mm | Length: ${lengthPerPieceM.toFixed(2)} m | Qty: ${totalPieces}`);
      workedSteps.push(`• Cross-Sectional Area = (√3/2) × ${sMm.toFixed(1)}² = ${areaMm2} mm²`);
      break;
    }

    case 'plate': {
      const wMm = toMm(input.width) || 500;
      const tMm = toMm(input.thickness) || 10;
      areaMm2 = Number((wMm * tMm).toFixed(2));
      shapeName = `Flat Bar / Plate (${wMm.toFixed(1)} × ${tMm.toFixed(1)} mm)`;
      formulaDescription = `Area = Width × Thickness = ${areaMm2} mm² | Weight = Area × Length × Density`;
      workedSteps.push(`• Width: ${wMm.toFixed(1)} mm | Thickness: ${tMm.toFixed(1)} mm | Length: ${lengthPerPieceM.toFixed(2)} m`);
      workedSteps.push(`• Cross-Sectional Area = ${wMm.toFixed(1)} × ${tMm.toFixed(1)} = ${areaMm2} mm²`);
      break;
    }

    case 'pipe': {
      const odMm = toMm(input.outerDiameter) || 114.3;
      const tMm = toMm(input.thickness) || 4.5;
      const safeT = Math.min(tMm, odMm / 2 - 0.1);
      areaMm2 = Number((Math.PI * (odMm - safeT) * safeT).toFixed(2));
      shapeName = `Round Pipe / Tube (OD ${odMm.toFixed(1)} mm, Wall ${safeT.toFixed(1)} mm)`;
      formulaDescription = `Area = π × (OD - T) × T = ${areaMm2} mm² | Weight = Area × Length × Density`;
      workedSteps.push(`• Outer Dia: ${odMm.toFixed(1)} mm | Wall Thickness: ${safeT.toFixed(1)} mm | Length: ${lengthPerPieceM.toFixed(2)} m`);
      workedSteps.push(`• Cross-Sectional Area = π × (${odMm.toFixed(1)} - ${safeT.toFixed(1)}) × ${safeT.toFixed(1)} = ${areaMm2} mm²`);
      break;
    }

    case 'shs':
    case 'rhs': {
      const wMm = toMm(input.width) || 100;
      const hMm = input.shapeType === 'shs' ? wMm : (toMm(input.height) || 100);
      const tMm = toMm(input.thickness) || 5;
      const safeT = Math.min(tMm, Math.min(wMm, hMm) / 2 - 0.1);
      const outerA = wMm * hMm;
      const innerA = (wMm - 2 * safeT) * (hMm - 2 * safeT);
      areaMm2 = Number((outerA - innerA).toFixed(2));
      shapeName = input.shapeType === 'shs'
        ? `Square Hollow Section SHS (${wMm.toFixed(1)}×${wMm.toFixed(1)}×${safeT.toFixed(1)} mm)`
        : `Rectangular Hollow Section RHS (${wMm.toFixed(1)}×${hMm.toFixed(1)}×${safeT.toFixed(1)} mm)`;
      formulaDescription = `Area = (W×H) - ((W-2T)×(H-2T)) = ${areaMm2} mm² | Weight = Area × Length × Density`;
      workedSteps.push(`• Outer: ${wMm.toFixed(1)}×${hMm.toFixed(1)} mm | Wall: ${safeT.toFixed(1)} mm | Length: ${lengthPerPieceM.toFixed(2)} m`);
      workedSteps.push(`• Cross-Sectional Area = (${wMm.toFixed(1)}×${hMm.toFixed(1)}) - (${(wMm - 2 * safeT).toFixed(1)}×${(hMm - 2 * safeT).toFixed(1)}) = ${areaMm2} mm²`);
      break;
    }

    case 'angle': {
      const l1Mm = toMm(input.leg1) || 50;
      const l2Mm = toMm(input.leg2) || 50;
      const tMm = toMm(input.thickness) || 5;
      const safeT = Math.min(tMm, Math.min(l1Mm, l2Mm) - 0.1);
      areaMm2 = Number((safeT * (l1Mm + l2Mm - safeT)).toFixed(2));
      shapeName = `Angle (${l1Mm.toFixed(1)} × ${l2Mm.toFixed(1)} × ${safeT.toFixed(1)} mm)`;
      formulaDescription = `Area = T × (L1 + L2 - T) = ${areaMm2} mm² | Weight = Area × Length × Density`;
      workedSteps.push(`• Leg 1: ${l1Mm.toFixed(1)} mm | Leg 2: ${l2Mm.toFixed(1)} mm | Thickness: ${safeT.toFixed(1)} mm`);
      workedSteps.push(`• Cross-Sectional Area = ${safeT.toFixed(1)} × (${l1Mm.toFixed(1)} + ${l2Mm.toFixed(1)} - ${safeT.toFixed(1)}) = ${areaMm2} mm²`);
      break;
    }

    case 'channel': {
      const hMm = toMm(input.height) || 150;
      const bMm = toMm(input.flangeWidth) || 75;
      const twMm = toMm(input.webThickness) || 5;
      const tfMm = toMm(input.flangeThickness) || 8;
      const webA = Math.max(0, hMm - 2 * tfMm) * twMm;
      const flangeA = 2 * (bMm * tfMm);
      areaMm2 = Number((webA + flangeA).toFixed(2));
      shapeName = `C-Channel (${hMm.toFixed(1)} × ${bMm.toFixed(1)} mm, Web ${twMm.toFixed(1)}mm, Flange ${tfMm.toFixed(1)}mm)`;
      formulaDescription = `Area = 2×(B×Tf) + (H - 2×Tf)×Tw = ${areaMm2} mm² | Weight = Area × Length × Density`;
      workedSteps.push(`• Height: ${hMm.toFixed(1)} mm | Flange: ${bMm.toFixed(1)} mm | Web Tw: ${twMm.toFixed(1)} mm | Flange Tf: ${tfMm.toFixed(1)} mm`);
      workedSteps.push(`• Cross-Sectional Area = 2×(${bMm.toFixed(1)}×${tfMm.toFixed(1)}) + (${hMm.toFixed(1)} - 2×${tfMm.toFixed(1)})×${twMm.toFixed(1)} = ${areaMm2} mm²`);
      break;
    }

    case 'beam': {
      const hMm = toMm(input.height) || 150;
      const bMm = toMm(input.flangeWidth) || 75;
      const twMm = toMm(input.webThickness) || 5;
      const tfMm = toMm(input.flangeThickness) || 8;
      const flangesA = 2 * (bMm * tfMm);
      const webA = Math.max(0, hMm - 2 * tfMm) * twMm;
      areaMm2 = Number((flangesA + webA).toFixed(2));
      shapeName = `I-Beam / H-Beam (${hMm.toFixed(1)} × ${bMm.toFixed(1)} mm)`;
      formulaDescription = `Area = 2×(B×Tf) + (H - 2×Tf)×Tw = ${areaMm2} mm² | Weight = Area × Length × Density`;
      workedSteps.push(`• Depth: ${hMm.toFixed(1)} mm | Flange: ${bMm.toFixed(1)} mm | Web Tw: ${twMm.toFixed(1)} mm | Flange Tf: ${tfMm.toFixed(1)} mm`);
      workedSteps.push(`• Cross-Sectional Area = 2×(${bMm.toFixed(1)}×${tfMm.toFixed(1)}) + (${hMm.toFixed(1)} - 2×${tfMm.toFixed(1)})×${twMm.toFixed(1)} = ${areaMm2} mm²`);
      break;
    }
  }

  // Generic Weight Computations
  const areaM2 = areaMm2 / 1000000;
  const unitWeightKgM = Number((areaM2 * densityKgM3).toFixed(4));
  const weightPerPieceKg = Number((unitWeightKgM * lengthPerPieceM).toFixed(3));

  if (input.shapeType !== 'rebar') {
    baseWeightKg = Number((weightPerPieceKg * totalPieces).toFixed(2));
  }

  const wastageWeightKg = Number((baseWeightKg * (wastagePercent / 100)).toFixed(2));
  const totalWeightKg = Number((baseWeightKg + wastageWeightKg).toFixed(2));

  // Imperial conversions
  const unitWeightLbFt = Number((unitWeightKgM * 0.671968975).toFixed(4));
  const weightPerPieceLb = Number((weightPerPieceKg * 2.20462262).toFixed(2));
  const baseWeightLb = Number((baseWeightKg * 2.20462262).toFixed(2));
  const wastageWeightLb = Number((wastageWeightKg * 2.20462262).toFixed(2));
  const totalWeightLb = Number((totalWeightKg * 2.20462262).toFixed(2));
  const totalWeightTonnes = Number((totalWeightKg / 1000).toFixed(3));
  const totalWeightUSTons = Number((totalWeightLb / 2000).toFixed(3));
  const totalWeightQuintals = Number((totalWeightKg / 100).toFixed(2));

  const lengthFt = Number((lengthPerPieceM * 3.2808399).toFixed(2));
  const totalLengthFt = Number((totalLengthM * 3.2808399).toFixed(2));
  const areaIn2 = Number((areaMm2 * 0.0015500031).toFixed(3));

  // Commercial 12-meter rod takeoff
  const standard12mBars = Math.ceil((totalLengthM * (1 + wastagePercent / 100)) / 12);
  const barsPerBundle = REBAR_BUNDLE_MAP[nominalDiaForBundle] || 3;
  const bundleCount = Math.ceil(standard12mBars / barsPerBundle);

  // Pricing
  const pricePerUnit = input.pricePerUnitWeight || 0;
  let baseCost = 0;
  let wastageCost = 0;
  let totalCost = 0;

  if (pricePerUnit > 0) {
    const costWeight = isImperial ? totalWeightLb : totalWeightKg;
    const baseCostWeight = isImperial ? baseWeightLb : baseWeightKg;
    const wastageCostWeight = isImperial ? wastageWeightLb : wastageWeightKg;

    baseCost = Math.round(baseCostWeight * pricePerUnit);
    wastageCost = Math.round(wastageCostWeight * pricePerUnit);
    totalCost = Math.round(costWeight * pricePerUnit);
  }

  workedSteps.push(`• Area in m² = ${areaMm2} ÷ 1,000,000 = ${areaM2.toFixed(6)} m²`);
  workedSteps.push(`• Unit Weight per Meter = ${areaM2.toFixed(6)} m² × ${densityKgM3} kg/m³ = ${unitWeightKgM.toFixed(3)} kg/m (${unitWeightLbFt.toFixed(3)} lb/ft)`);
  workedSteps.push(`• Base Weight = ${baseWeightKg.toFixed(2)} kg (${baseWeightLb.toFixed(2)} lb)`);
  if (wastagePercent > 0) {
    workedSteps.push(`• Scrap / Wastage (${wastagePercent}%) = +${wastageWeightKg.toFixed(2)} kg`);
    workedSteps.push(`👉 Grand Total Steel Weight = ${totalWeightKg.toFixed(2)} kg (${totalWeightTonnes.toFixed(3)} MT / ${totalWeightLb.toFixed(2)} lb)`);
  } else {
    workedSteps.push(`👉 Grand Total Steel Weight = ${totalWeightKg.toFixed(2)} kg (${totalWeightTonnes.toFixed(3)} MT / ${totalWeightLb.toFixed(2)} lb)`);
  }

  return {
    shapeType: input.shapeType,
    shapeName,
    materialName: mat.name,
    materialDensityKgM3: densityKgM3,
    materialDensityLbIn3: densityLbIn3,
    areaMm2,
    areaCm2: Number((areaMm2 / 100).toFixed(2)),
    areaIn2,
    lengthM: lengthPerPieceM,
    lengthFt,
    totalPieces,
    totalLengthM,
    totalLengthFt,
    unitWeightKgM,
    unitWeightLbFt,
    weightPerPieceKg,
    weightPerPieceLb,
    baseWeightKg,
    baseWeightLb,
    wastageWeightKg,
    wastageWeightLb,
    totalWeightKg,
    totalWeightLb,
    totalWeightTonnes,
    totalWeightUSTons,
    totalWeightQuintals,
    standard12mBars,
    bundleCount,
    barsPerBundle,
    pricePerUnit,
    currency,
    currencySymbol,
    baseCost,
    wastageCost,
    totalCost,
    formulaDescription,
    workedSteps,
  };
}
