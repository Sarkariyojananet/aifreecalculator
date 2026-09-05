/**
 * RCC Footing Steel & Foundation BBS Calculation Engine
 * Complies with IS 456:2000, IS 2502:1963, SP 34, and ACI 318-19.
 *
 * Supports:
 * - Isolated Flat Pad Footings & Sloped / Trapezoidal Footings
 * - Bottom Mesh (X and Y directions) with 90° anchorage bend-ups and standard bend deduction
 * - Optional Top Mesh (for heavy/combined/raft footings)
 * - Column Starter Dowel Rebars with development lap length and bottom mesh ties
 * - Commercial 12-meter Rebar Stock & Factory Bundles Takeoff
 * - Concrete BOQ (Cement, Sand, Aggregate), PCC Blinding Bed, Formwork & Pit Excavation
 * - Normal Thumb-Rule (kg/m³) Estimation Mode for quick budgeting
 */

export interface RccFootingInput {
  lengthMeters: number; // L
  widthMeters: number; // B
  depthMm: number; // D
  clearCoverMm: number; // e.g. 50mm
  barDiaXMm: number;
  spacingXMm: number;
  barDiaYMm: number;
  spacingYMm: number;
}

export interface RccFootingResult {
  footingVolumeCum: number;
  excavationVolumeCum: number;
  xBarsCount: number;
  xBarCuttingLengthMeters: number;
  xBarsWeightKg: number;
  yBarsCount: number;
  yBarCuttingLengthMeters: number;
  yBarsWeightKg: number;
  totalSteelWeightKg: number;
  shutteringAreaSqm: number;
}

/**
 * Standard factory packaging bundle quantities for 12-meter commercial TMT rebars.
 */
export const BARS_PER_BUNDLE_MAP: Record<number, number> = {
  8: 10,
  10: 7,
  12: 5,
  16: 3,
  20: 2,
  25: 1,
  28: 1,
  32: 1,
};

/**
 * Unit weight of TMT steel rebar in kg/m: d² / 162.2 (or rounded 162).
 */
export function getBarUnitWeight(diaMm: number): number {
  return (diaMm * diaMm) / 162.0;
}

/**
 * Legacy calculation function preserved for complete backward compatibility.
 */
export function calculateRccFootingSteel(input: RccFootingInput): RccFootingResult {
  const {
    lengthMeters: L,
    widthMeters: B,
    depthMm: Dmm,
    clearCoverMm: cover,
    barDiaXMm,
    spacingXMm,
    barDiaYMm,
    spacingYMm,
  } = input;

  const D = Dmm / 1000;
  const coverM = cover / 1000;

  const footingVolumeCum = Number((L * B * D).toFixed(3));
  // Excavation: 0.3m working space extra each side and depth + 1.2m
  const excavationVolumeCum = Number(((L + 0.6) * (B + 0.6) * (D + 1.2)).toFixed(2));

  const unitWtX = getBarUnitWeight(barDiaXMm);
  const unitWtY = getBarUnitWeight(barDiaYMm);

  // X-direction bars have bend ups of (D - 2*cover) on both ends
  const bendUpHeight = Math.max(0.1, D - 2 * coverM);
  const xBarCuttingLengthMeters = Number((L - 2 * coverM + 2 * bendUpHeight).toFixed(3));
  const xBarsCount = Math.floor((B * 1000) / spacingXMm) + 1;
  const xBarsWeightKg = Number((xBarsCount * xBarCuttingLengthMeters * unitWtX).toFixed(1));

  // Y-direction bars
  const yBarCuttingLengthMeters = Number((B - 2 * coverM + 2 * bendUpHeight).toFixed(3));
  const yBarsCount = Math.floor((L * 1000) / spacingYMm) + 1;
  const yBarsWeightKg = Number((yBarsCount * yBarCuttingLengthMeters * unitWtY).toFixed(1));

  const totalSteelWeightKg = Number((xBarsWeightKg + yBarsWeightKg).toFixed(1));
  const shutteringAreaSqm = Number((2 * (L + B) * D).toFixed(2));

  return {
    footingVolumeCum,
    excavationVolumeCum,
    xBarsCount,
    xBarCuttingLengthMeters,
    xBarsWeightKg,
    yBarsCount,
    yBarCuttingLengthMeters,
    yBarsWeightKg,
    totalSteelWeightKg,
    shutteringAreaSqm,
  };
}

// ---------------------------------------------------------------------------
// ADVANCED BBS & COMPREHENSIVE TAKEOFF ENGINE
// ---------------------------------------------------------------------------

export type FootingGeometryType = 'flat' | 'sloped';

export interface BbsItem {
  mark: string;
  desc: string;
  dia: number;
  shapeCode: string;
  count: number;
  cuttingLengthM: number;
  totalLengthM: number;
  unitWeightKgM: number;
  totalWeightKg: number;
}

export interface DiameterSummary {
  dia: number;
  totalLengthM: number;
  totalWeightKg: number;
  stock12mRods: number;
  barsPerBundle: number;
  bundleCount: number;
}

export interface MaterialBOQ {
  dryVolumeM3: number;
  cementBags50kg: number;
  cementWeightKg: number;
  sandVolumeM3: number;
  sandVolumeCft: number;
  aggregateVolumeM3: number;
  aggregateVolumeCft: number;
  pccBlindingVolumeM3: number;
  pccCementBags: number;
  pitExcavationVolumeM3: number;
  formworkShutteringSqm: number;
  formworkShutteringSqft: number;
  bindingWireKg: number;
}

export interface AdvancedFootingInput {
  geometryType: FootingGeometryType;
  lengthM: number; // Overall base length L
  widthM: number; // Overall base width B
  depthMm: number; // Total footing depth D
  topDepthMm?: number; // Base depth D1 for sloped footing (vertical edge)
  pedestalLengthMm?: number; // Top column pedestal length a (default e.g. 400mm)
  pedestalWidthMm?: number; // Top column pedestal width b (default e.g. 400mm)
  clearCoverMm: number; // Bottom & side clear cover (standard 50mm as per IS 456 Cl 26.4.2.2)
  footingCount: number; // Number of similar footings

  // Bottom Mesh
  barDiaXMm: number;
  spacingXMm: number;
  barDiaYMm: number;
  spacingYMm: number;
  includeBendUp: boolean; // Standard L-bend anchorage hooks (D - 2*cover)

  // Top Mesh (Optional)
  hasTopMesh?: boolean;
  topDiaMm?: number;
  topSpacingMm?: number;

  // Column Starter Dowel Rebars (Optional)
  includeDowels?: boolean;
  dowelCount?: number;
  dowelDiaMm?: number;
  dowelLapLengthMm?: number; // e.g. 50d lap above footing top

  // PCC Blinding Bed
  pccThicknessMm?: number; // typically 75mm - 100mm
  pccOffsetMm?: number; // typically 100mm offset each side

  // Pit Excavation
  excavationDepthM?: number; // Foundation ground depth, e.g. 1.5m
  excavationWorkingSpaceM?: number; // Working allowance e.g. 0.3m per side

  wastagePercent: number; // e.g. 3%
}

export interface AdvancedFootingResult {
  singleFootingVolumeM3: number;
  totalFootingVolumeM3: number;
  pccVolumeM3: number;
  excavationVolumeM3: number;
  formworkAreaSqm: number;

  bbsItems: BbsItem[];
  diameterSummaries: DiameterSummary[];

  baseSteelWeightKg: number;
  wastageWeightKg: number;
  totalSteelWeightKg: number;
  steelWeightPerFootingKg: number;
  steelIntensityKgM3: number; // kg of steel per m³ concrete

  boq: MaterialBOQ;
}

/**
 * Advanced BBS & Structural Calculation for RCC Footings.
 */
export function calculateAdvancedRccFootingSteel(input: AdvancedFootingInput): AdvancedFootingResult {
  const {
    geometryType,
    lengthM: L,
    widthM: B,
    depthMm: Dmm,
    topDepthMm = 150,
    pedestalLengthMm = 400,
    pedestalWidthMm = 400,
    clearCoverMm: coverMm,
    footingCount: N,
    barDiaXMm,
    spacingXMm,
    barDiaYMm,
    spacingYMm,
    includeBendUp,
    hasTopMesh = false,
    topDiaMm = 10,
    topSpacingMm = 150,
    includeDowels = true,
    dowelCount = 4,
    dowelDiaMm = 16,
    dowelLapLengthMm,
    pccThicknessMm = 100,
    pccOffsetMm = 100,
    excavationDepthM = 1.5,
    excavationWorkingSpaceM = 0.3,
    wastagePercent = 3.0,
  } = input;

  const D = Dmm / 1000;
  const coverM = coverMm / 1000;

  // 1. Concrete Volume Calculation
  let singleFootingVolumeM3 = 0;
  let formworkAreaSingleSqm = 0;

  if (geometryType === 'sloped') {
    // Sloped / Trapezoidal Footing
    // Lower rectangular base block (D1) + upper truncated pyramid (D - D1)
    const D1 = Math.min(D, Math.max(0.1, topDepthMm / 1000));
    const hTrap = Math.max(0, D - D1);
    const vBase = L * B * D1;

    const a = (pedestalLengthMm || 400) / 1000;
    const b = (pedestalWidthMm || 400) / 1000;
    const A1 = L * B;
    const A2 = a * b;

    // Prismoidal formula for truncated pyramid: (h / 3) * (A1 + A2 + sqrt(A1 * A2))
    const vTrap = hTrap > 0 ? (hTrap / 3) * (A1 + A2 + Math.sqrt(A1 * A2)) : 0;
    singleFootingVolumeM3 = vBase + vTrap;

    // Formwork is typically only required for the vertical base sides D1
    formworkAreaSingleSqm = 2 * (L + B) * D1;
  } else {
    // Standard Flat Pad Footing
    singleFootingVolumeM3 = L * B * D;
    formworkAreaSingleSqm = 2 * (L + B) * D;
  }

  const totalFootingVolumeM3 = singleFootingVolumeM3 * N;
  const formworkAreaSqm = formworkAreaSingleSqm * N;

  // 2. PCC Blinding Bed Volume
  const pccOffM = pccOffsetMm / 1000;
  const pccThickM = pccThicknessMm / 1000;
  const pccL = L + 2 * pccOffM;
  const pccB = B + 2 * pccOffM;
  const pccVolumeM3 = pccL * pccB * pccThickM * N;

  // 3. Pit Excavation Volume
  const pitL = L + 2 * excavationWorkingSpaceM;
  const pitB = B + 2 * excavationWorkingSpaceM;
  const pitH = Math.max(D + pccThickM, excavationDepthM);
  const excavationVolumeM3 = pitL * pitB * pitH * N;

  // 4. Bar Bending Schedule (BBS) Components
  const bbsItems: BbsItem[] = [];

  // A. Bottom Mesh - X Direction Bars (Run along length L, distributed across width B)
  const netSpanBX = Math.max(0.1, B - 2 * coverM);
  const countXPerFooting = spacingXMm > 0 ? Math.floor((netSpanBX * 1000) / spacingXMm) + 1 : 0;
  const totCountX = countXPerFooting * N;

  // Bend-up height: (D - 2*cover)
  const legHeightX = includeBendUp ? Math.max(0.1, D - 2 * coverM) : 0;
  // Bend deduction for two 90° bends = 2 * (2 * d) = 4 * d as per IS 2502
  const bendDeductX = includeBendUp ? (4 * barDiaXMm) / 1000 : 0;
  const cutLenX = Math.max(0.2, Number((L - 2 * coverM + 2 * legHeightX - bendDeductX).toFixed(3)));
  const totLenX = totCountX * cutLenX;
  const unitWtX = getBarUnitWeight(barDiaXMm);
  const totWtX = totLenX * unitWtX;

  bbsItems.push({
    mark: '01',
    desc: `Bottom Mesh Rebars (X-Direction, parallel to Length L)`,
    dia: barDiaXMm,
    shapeCode: includeBendUp ? 'U-MESH (90° End Bend-ups)' : 'STRAIGHT (Flat Mesh)',
    count: totCountX,
    cuttingLengthM: cutLenX,
    totalLengthM: totLenX,
    unitWeightKgM: unitWtX,
    totalWeightKg: totWtX,
  });

  // B. Bottom Mesh - Y Direction Bars (Run along width B, distributed across length L)
  const netSpanLY = Math.max(0.1, L - 2 * coverM);
  const countYPerFooting = spacingYMm > 0 ? Math.floor((netSpanLY * 1000) / spacingYMm) + 1 : 0;
  const totCountY = countYPerFooting * N;

  const legHeightY = includeBendUp ? Math.max(0.1, D - 2 * coverM) : 0;
  const bendDeductY = includeBendUp ? (4 * barDiaYMm) / 1000 : 0;
  const cutLenY = Math.max(0.2, Number((B - 2 * coverM + 2 * legHeightY - bendDeductY).toFixed(3)));
  const totLenY = totCountY * cutLenY;
  const unitWtY = getBarUnitWeight(barDiaYMm);
  const totWtY = totLenY * unitWtY;

  bbsItems.push({
    mark: '02',
    desc: `Bottom Mesh Rebars (Y-Direction, parallel to Width B)`,
    dia: barDiaYMm,
    shapeCode: includeBendUp ? 'U-MESH (90° End Bend-ups)' : 'STRAIGHT (Flat Mesh)',
    count: totCountY,
    cuttingLengthM: cutLenY,
    totalLengthM: totLenY,
    unitWeightKgM: unitWtY,
    totalWeightKg: totWtY,
  });

  // C. Optional Top Mesh (for raft/heavy footings)
  if (hasTopMesh) {
    const topUnitWt = getBarUnitWeight(topDiaMm);

    // Top X bars
    const countTopX = topSpacingMm > 0 ? Math.floor((netSpanBX * 1000) / topSpacingMm) + 1 : 0;
    const totCountTopX = countTopX * N;
    const cutLenTopX = Math.max(0.2, Number((L - 2 * coverM).toFixed(3)));
    const totLenTopX = totCountTopX * cutLenTopX;
    const totWtTopX = totLenTopX * topUnitWt;

    bbsItems.push({
      mark: '03',
      desc: `Top Mesh Rebars (X-Direction Distribution)`,
      dia: topDiaMm,
      shapeCode: 'STRAIGHT (Top Mat)',
      count: totCountTopX,
      cuttingLengthM: cutLenTopX,
      totalLengthM: totLenTopX,
      unitWeightKgM: topUnitWt,
      totalWeightKg: totWtTopX,
    });

    // Top Y bars
    const countTopY = topSpacingMm > 0 ? Math.floor((netSpanLY * 1000) / topSpacingMm) + 1 : 0;
    const totCountTopY = countTopY * N;
    const cutLenTopY = Math.max(0.2, Number((B - 2 * coverM).toFixed(3)));
    const totLenTopY = totCountTopY * cutLenTopY;
    const totWtTopY = totLenTopY * topUnitWt;

    bbsItems.push({
      mark: '04',
      desc: `Top Mesh Rebars (Y-Direction Distribution)`,
      dia: topDiaMm,
      shapeCode: 'STRAIGHT (Top Mat)',
      count: totCountTopY,
      cuttingLengthM: cutLenTopY,
      totalLengthM: totLenTopY,
      unitWeightKgM: topUnitWt,
      totalWeightKg: totWtTopY,
    });
  }

  // D. Column Starter Dowel Rebars
  if (includeDowels && dowelCount > 0) {
    const dowelUnitWt = getBarUnitWeight(dowelDiaMm);
    const lapLenM = (dowelLapLengthMm || 50 * dowelDiaMm) / 1000;
    // Embedment in footing: footing depth D - cover (resting on bottom mesh)
    const embedM = Math.max(0.2, D - coverM);
    // 90° Bend foot projection tied to bottom mesh: typically 300mm or 16d
    const footBendM = Math.max(0.3, (16 * dowelDiaMm) / 1000);
    // 90° bend deduction = 2 * dowelDiaMm
    const dowelBendDeduct = (2 * dowelDiaMm) / 1000;

    const cutLenDowel = Math.max(0.5, Number((lapLenM + embedM + footBendM - dowelBendDeduct).toFixed(3)));
    const totDowelCount = dowelCount * N;
    const totDowelLen = totDowelCount * cutLenDowel;
    const totDowelWt = totDowelLen * dowelUnitWt;

    bbsItems.push({
      mark: hasTopMesh ? '05' : '03',
      desc: `Column Starter Dowel Rebars (Lap + Embedment + 300mm Foot Bend)`,
      dia: dowelDiaMm,
      shapeCode: 'L-DOWEL (Column Starter)',
      count: totDowelCount,
      cuttingLengthM: cutLenDowel,
      totalLengthM: totDowelLen,
      unitWeightKgM: dowelUnitWt,
      totalWeightKg: totDowelWt,
    });
  }

  // 5. Aggregate Steel Totals
  const baseSteelWeightKg = bbsItems.reduce((sum, item) => sum + item.totalWeightKg, 0);
  const wastageWeightKg = baseSteelWeightKg * (wastagePercent / 100);
  const totalSteelWeightKg = baseSteelWeightKg + wastageWeightKg;
  const steelWeightPerFootingKg = totalSteelWeightKg / Math.max(1, N);
  const steelIntensityKgM3 = totalFootingVolumeM3 > 0 ? totalSteelWeightKg / totalFootingVolumeM3 : 0;

  // 6. Group Commercial 12-Meter Stock Takeoff by Diameter
  const diaMap = new Map<number, { totalLen: number; totalWt: number }>();
  for (const item of bbsItems) {
    const cur = diaMap.get(item.dia) || { totalLen: 0, totalWt: 0 };
    cur.totalLen += item.totalLengthM;
    cur.totalWt += item.totalWeightKg;
    diaMap.set(item.dia, cur);
  }

  const diameterSummaries: DiameterSummary[] = [];
  const sortedDias = Array.from(diaMap.keys()).sort((a, b) => a - b);
  for (const dia of sortedDias) {
    const data = diaMap.get(dia)!;
    // Add wastage proportionally to commercial length
    const grossLenM = data.totalLen * (1 + wastagePercent / 100);
    const stock12mRods = Math.ceil(grossLenM / 12);
    const barsPerBundle = BARS_PER_BUNDLE_MAP[dia] || 3;
    const bundleCount = Math.ceil(stock12mRods / barsPerBundle);
    const grossWtKg = data.totalWt * (1 + wastagePercent / 100);

    diameterSummaries.push({
      dia,
      totalLengthM: Number(grossLenM.toFixed(1)),
      totalWeightKg: Number(grossWtKg.toFixed(1)),
      stock12mRods,
      barsPerBundle,
      bundleCount,
    });
  }

  // 7. Concrete Mix BOQ & Material Breakup (Standard M20 / 1:1.5:3 baseline)
  const dryVolFactor = 1.54;
  const dryVol = totalFootingVolumeM3 * dryVolFactor;
  // M20 (1:1.5:3), total parts = 5.5
  const cementM3 = dryVol * (1 / 5.5);
  const cementWeightKg = cementM3 * 1440; // Cement density 1440 kg/m³
  const cementBags50kg = Math.ceil(cementWeightKg / 50);

  const sandM3 = dryVol * (1.5 / 5.5);
  const sandVolumeCft = sandM3 * 35.3147;

  const aggregateM3 = dryVol * (3 / 5.5);
  const aggregateVolumeCft = aggregateM3 * 35.3147;

  // PCC Blinding M10 (1:3:6, parts = 10)
  const pccDryVol = pccVolumeM3 * 1.54;
  const pccCementKg = pccDryVol * (1 / 10) * 1440;
  const pccCementBags = Math.ceil(pccCementKg / 50);

  // Binding wire (~1% of total steel weight, 18 gauge GI wire)
  const bindingWireKg = Math.max(1, Number(((totalSteelWeightKg * 0.01)).toFixed(1)));

  const boq: MaterialBOQ = {
    dryVolumeM3: Number(dryVol.toFixed(3)),
    cementBags50kg,
    cementWeightKg: Number(cementWeightKg.toFixed(1)),
    sandVolumeM3: Number(sandM3.toFixed(3)),
    sandVolumeCft: Number(sandVolumeCft.toFixed(1)),
    aggregateVolumeM3: Number(aggregateM3.toFixed(3)),
    aggregateVolumeCft: Number(aggregateVolumeCft.toFixed(1)),
    pccBlindingVolumeM3: Number(pccVolumeM3.toFixed(3)),
    pccCementBags,
    pitExcavationVolumeM3: Number(excavationVolumeM3.toFixed(2)),
    formworkShutteringSqm: Number(formworkAreaSqm.toFixed(2)),
    formworkShutteringSqft: Number((formworkAreaSqm * 10.7639).toFixed(1)),
    bindingWireKg,
  };

  return {
    singleFootingVolumeM3: Number(singleFootingVolumeM3.toFixed(3)),
    totalFootingVolumeM3: Number(totalFootingVolumeM3.toFixed(3)),
    pccVolumeM3: Number(pccVolumeM3.toFixed(3)),
    excavationVolumeM3: Number(excavationVolumeM3.toFixed(2)),
    formworkAreaSqm: Number(formworkAreaSqm.toFixed(2)),
    bbsItems,
    diameterSummaries,
    baseSteelWeightKg: Number(baseSteelWeightKg.toFixed(1)),
    wastageWeightKg: Number(wastageWeightKg.toFixed(1)),
    totalSteelWeightKg: Number(totalSteelWeightKg.toFixed(1)),
    steelWeightPerFootingKg: Number(steelWeightPerFootingKg.toFixed(1)),
    steelIntensityKgM3: Number(steelIntensityKgM3.toFixed(1)),
    boq,
  };
}

// ---------------------------------------------------------------------------
// NORMAL / THUMB-RULE CALCULATION ENGINE
// ---------------------------------------------------------------------------

export type FootingThumbRuleType = 'light' | 'standard' | 'heavy' | 'custom';

export interface NormalFootingInput {
  lengthM: number;
  widthM: number;
  depthMm: number;
  footingCount: number;
  thumbRuleType: FootingThumbRuleType;
  customRateKgM3?: number;
  nominalBarDiaMm: number; // e.g. 12mm
  concreteGrade?: string; // M20, M25, M15
  wastagePercent?: number; // e.g. 3%
}

export interface NormalFootingResult {
  singleFootingVolumeM3: number;
  totalFootingVolumeM3: number;
  totalSteelWeightKg: number;
  steelWeightPerFootingKg: number;
  steelIntensityKgM3: number;
  stock12mRods: number;
  bundleCount: number;
  estimatedBarCount: number; // for live visual detailing mesh lines
  boq: MaterialBOQ;
}

/**
 * Normal (Thumb-Rule) Calculation for rapid pre-construction budgeting.
 */
export function calculateNormalRccFootingSteel(input: NormalFootingInput): NormalFootingResult {
  const {
    lengthM: L,
    widthM: B,
    depthMm: Dmm,
    footingCount: N,
    thumbRuleType,
    customRateKgM3 = 75,
    nominalBarDiaMm,
    concreteGrade = 'M20',
    wastagePercent = 3.0,
  } = input;

  const D = Dmm / 1000;
  const singleFootingVolumeM3 = L * B * D;
  const totalFootingVolumeM3 = singleFootingVolumeM3 * N;

  let rateKgM3 = 75; // Standard isolated footing (60-80 kg/m³)
  if (thumbRuleType === 'light') rateKgM3 = 55;
  else if (thumbRuleType === 'standard') rateKgM3 = 75;
  else if (thumbRuleType === 'heavy') rateKgM3 = 100;
  else if (thumbRuleType === 'custom') rateKgM3 = Math.max(10, customRateKgM3);

  const baseSteelKg = totalFootingVolumeM3 * rateKgM3;
  const totalSteelWeightKg = baseSteelKg * (1 + wastagePercent / 100);
  const steelWeightPerFootingKg = totalSteelWeightKg / Math.max(1, N);

  const uWt = getBarUnitWeight(nominalBarDiaMm);
  const totalLengthM = totalSteelWeightKg / uWt;
  const stock12mRods = Math.ceil(totalLengthM / 12);
  const barsPerBundle = BARS_PER_BUNDLE_MAP[nominalBarDiaMm] || 5;
  const bundleCount = Math.ceil(stock12mRods / barsPerBundle);

  // Estimate mesh count for visual preview: (L + B) * avgBars * uWt ~ steelWeightPerFooting
  const avgMeshBarLen = (L + B) / 2 + 2 * D;
  const estimatedBarCount = Math.max(8, Math.round(steelWeightPerFootingKg / (avgMeshBarLen * uWt)));

  // BOQ
  const dryVol = totalFootingVolumeM3 * 1.54;
  let cPart = 1, sPart = 1.5, aPart = 3;
  if (concreteGrade === 'M25') { cPart = 1; sPart = 1; aPart = 2; }
  else if (concreteGrade === 'M15') { cPart = 1; sPart = 2; aPart = 4; }
  const totalParts = cPart + sPart + aPart;

  const cementKg = dryVol * (cPart / totalParts) * 1440;
  const cementBags = Math.ceil(cementKg / 50);
  const sandM3 = dryVol * (sPart / totalParts);
  const aggM3 = dryVol * (aPart / totalParts);

  const pccVol = (L + 0.2) * (B + 0.2) * 0.1 * N;
  const pccBags = Math.ceil(pccVol * 1.54 * 0.1 * 1440 / 50);
  const excavVol = (L + 0.6) * (B + 0.6) * Math.max(1.5, D + 0.1) * N;
  const shutArea = 2 * (L + B) * D * N;
  const bindWire = Math.max(1, Math.round(totalSteelWeightKg * 0.01 * 10) / 10);

  const boq: MaterialBOQ = {
    dryVolumeM3: Number(dryVol.toFixed(3)),
    cementBags50kg: cementBags,
    cementWeightKg: Number(cementKg.toFixed(1)),
    sandVolumeM3: Number(sandM3.toFixed(3)),
    sandVolumeCft: Number((sandM3 * 35.3147).toFixed(1)),
    aggregateVolumeM3: Number(aggM3.toFixed(3)),
    aggregateVolumeCft: Number((aggM3 * 35.3147).toFixed(1)),
    pccBlindingVolumeM3: Number(pccVol.toFixed(3)),
    pccCementBags: pccBags,
    pitExcavationVolumeM3: Number(excavVol.toFixed(2)),
    formworkShutteringSqm: Number(shutArea.toFixed(2)),
    formworkShutteringSqft: Number((shutArea * 10.7639).toFixed(1)),
    bindingWireKg: bindWire,
  };

  return {
    singleFootingVolumeM3: Number(singleFootingVolumeM3.toFixed(3)),
    totalFootingVolumeM3: Number(totalFootingVolumeM3.toFixed(3)),
    totalSteelWeightKg: Number(totalSteelWeightKg.toFixed(1)),
    steelWeightPerFootingKg: Number(steelWeightPerFootingKg.toFixed(1)),
    steelIntensityKgM3: rateKgM3,
    stock12mRods,
    bundleCount,
    estimatedBarCount,
    boq,
  };
}
