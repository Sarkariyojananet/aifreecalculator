/**
 * Side Drain & Slab BOQ Civil Engineering Calculation Engine
 */

export interface SideDrainInput {
  lengthMeters: number;
  internalWidthMeters: number;
  internalDepthMeters: number;
  wallThicknessMeters: number;
  bedConcreteThicknessMeters: number;
  coverSlabThicknessMeters: number;
  rebarDiameterMm: number;
  rebarSpacingMm: number;
}

export interface SideDrainResult {
  earthworkExcavationCum: number;
  bedPccVolumeCum: number;
  rccWallsVolumeCum: number;
  rccCoverSlabVolumeCum: number;
  totalRccVolumeCum: number;
  shutteringAreaSqm: number;
  rebarWeightKg: number;
  plasterInternalAreaSqm: number;
}

export function calculateSideDrainBOQ(input: SideDrainInput): SideDrainResult {
  const {
    lengthMeters: L,
    internalWidthMeters: W,
    internalDepthMeters: D,
    wallThicknessMeters: Tw,
    bedConcreteThicknessMeters: Tb,
    coverSlabThicknessMeters: Ts,
    rebarDiameterMm,
    rebarSpacingMm,
  } = input;

  const totalWidth = W + 2 * Tw;
  const totalDepth = D + Tb + Ts;

  // 1. Excavation Volume
  const earthworkExcavationCum = Number((L * totalWidth * totalDepth).toFixed(2));

  // 2. Bed PCC Volume
  const bedPccVolumeCum = Number((L * totalWidth * Tb).toFixed(2));

  // 3. RCC Drain Walls Volume (2 side walls)
  const rccWallsVolumeCum = Number((2 * L * Tw * D).toFixed(2));

  // 4. RCC Cover Slab Volume
  const rccCoverSlabVolumeCum = Number((L * totalWidth * Ts).toFixed(2));

  // 5. Total RCC
  const totalRccVolumeCum = Number((rccWallsVolumeCum + rccCoverSlabVolumeCum).toFixed(2));

  // 6. Shuttering Area (Wall inner/outer surfaces + cover slab soffit)
  const shutteringAreaSqm = Number((2 * (2 * D) * L + L * totalWidth).toFixed(2));

  // 7. Rebar Weight Estimation (approx 80kg/cum for drain RCC or bar formula)
  const unitWeight = (rebarDiameterMm * rebarDiameterMm) / 162;
  const numBarsPerMeter = 1000 / rebarSpacingMm;
  const rebarWeightKg = Number((totalRccVolumeCum * 85).toFixed(1));

  // 8. Internal Plaster Area (Base + 2 inner sides)
  const plasterInternalAreaSqm = Number((L * (W + 2 * D)).toFixed(2));

  return {
    earthworkExcavationCum,
    bedPccVolumeCum,
    rccWallsVolumeCum,
    rccCoverSlabVolumeCum,
    totalRccVolumeCum,
    shutteringAreaSqm,
    rebarWeightKg,
    plasterInternalAreaSqm,
  };
}
