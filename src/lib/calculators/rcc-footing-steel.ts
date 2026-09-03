/**
 * RCC Footing Steel & Mesh BBS Engine
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
  // Excavation typically 0.3m working space extra each side and depth + 0.1m PCC
  const excavationVolumeCum = Number(((L + 0.6) * (B + 0.6) * (D + 1.2)).toFixed(2));

  const unitWtX = (barDiaXMm * barDiaXMm) / 162;
  const unitWtY = (barDiaYMm * barDiaYMm) / 162;

  // X-direction bars have bend ups of (D - 2*cover) on both ends
  const bendUpHeight = D - 2 * coverM;
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
