/**
 * RCC Column Steel & Tie Rings Calculation Engine
 */

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
  const lateralTiesCount = Math.floor((H * 1000) / tiesSpacingMm) + 1;
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
