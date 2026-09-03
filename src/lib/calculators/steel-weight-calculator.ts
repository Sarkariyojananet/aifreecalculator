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
