/**
 * RCC Beam Steel & Stirrups BBS Engine
 */

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
  const topBarLength = L + 2 * (12 * topBarDiaMm / 1000);
  const bottomBarLength = L + 2 * (12 * bottomBarDiaMm / 1000);

  const unitWtTop = (topBarDiaMm * topBarDiaMm) / 162;
  const unitWtBottom = (bottomBarDiaMm * bottomBarDiaMm) / 162;
  const unitWtStirrup = (stirrupDiaMm * stirrupDiaMm) / 162;

  const topBarsWeightKg = Number((topBarsCount * topBarLength * unitWtTop).toFixed(1));
  const bottomBarsWeightKg = Number((bottomBarsCount * bottomBarLength * unitWtBottom).toFixed(1));

  // Stirrups calculation
  const stirrupsCount = Math.floor((L * 1000) / stirrupSpacingMm) + 1;
  const coreWidth = (Bmm - 2 * cover);
  const coreDepth = (Dmm - 2 * cover);
  // Stirrup perimeter + 2 hooks of 10d
  const stirrupCuttingLengthMeters = Number(((2 * (coreWidth + coreDepth) + 2 * (10 * stirrupDiaMm) - 3 * (2 * stirrupDiaMm)) / 1000).toFixed(3));
  const stirrupsTotalWeightKg = Number((stirrupsCount * stirrupCuttingLengthMeters * unitWtStirrup).toFixed(1));

  const totalSteelWeightKg = Number((topBarsWeightKg + bottomBarsWeightKg + stirrupsTotalWeightKg).toFixed(1));
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
