/**
 * Comprehensive Slab Steel & Shuttering (Formwork) Calculation Engine
 * Calculates bottom soffit area, side edge formwork, opening deductions, Acrow props grid,
 * and reinforcement steel via area rates or detailed bar BBS ($D^2/162.28$).
 */

export interface SlabShutteringInput {
  // Slab Dimensions
  lengthMeters: number;
  widthMeters: number;
  thicknessMm: number;

  // Shuttering Configuration
  includeBottomSoffit?: boolean;
  includeSideShuttering?: boolean;
  openingAreaSqm?: number;

  // Steel Estimation
  steelMode: 'simple' | 'detailed';
  simpleSteelRateKgPerSqm?: number; // User-provided kg/m²

  // Detailed Steel
  bottomDir1DiaMm?: number;
  bottomDir1SpacingMm?: number;
  bottomDir2DiaMm?: number;
  bottomDir2SpacingMm?: number;

  includeTopSteel?: boolean;
  topDir1DiaMm?: number;
  topDir1SpacingMm?: number;
  topDir2DiaMm?: number;
  topDir2SpacingMm?: number;

  wastagePercentage?: number; // 0 to 20%

  // Acrow Props Configuration
  propSpacingLengthM?: number; // default 1.2m
  propSpacingWidthM?: number; // default 1.2m
}

export interface DetailedSteelDirectionResult {
  directionName: string;
  diaMm: number;
  spacingMm: number;
  barCount: number;
  lengthPerBarM: number;
  totalLengthM: number;
  unitWeightKgM: number;
  weightKg: number;
}

export interface SlabShutteringResult {
  // Geometry
  slabLengthM: number;
  slabWidthM: number;
  slabThicknessM: number;
  slabPerimeterM: number;
  slabGrossAreaSqm: number;
  slabGrossAreaSqft: number;
  openingAreaSqm: number;
  openingAreaSqft: number;
  concreteVolumeCum: number;

  // Shuttering
  bottomSoffitSqm: number;
  bottomSoffitSqft: number;
  sideShutteringSqm: number;
  sideShutteringSqft: number;
  totalShutteringSqm: number;
  totalShutteringSqft: number;

  // Steel
  steelMode: 'simple' | 'detailed';
  totalSteelWeightKg: number;
  totalSteelTonnes: number;
  steelDetails?: {
    directions: DetailedSteelDirectionResult[];
    baseSteelKg: number;
    wastagePercentage: number;
    wastageKg: number;
  };

  // Acrow Props
  propSpacingLengthM: number;
  propSpacingWidthM: number;
  rowsAlongLength: number;
  rowsAlongWidth: number;
  totalPropsCount: number;
}

export function getRebarUnitWeightKgM(diaMm: number): number {
  if (isNaN(diaMm) || diaMm <= 0) return 0;
  return Number(((diaMm * diaMm) / 162.28).toFixed(4));
}

export function calculateSlabSteelShuttering(input: SlabShutteringInput): SlabShutteringResult {
  const L = Math.max(0.1, input.lengthMeters || 0);
  const W = Math.max(0.1, input.widthMeters || 0);
  const Tmm = Math.max(1, input.thicknessMm || 125);
  const T = Tmm / 1000;

  const grossAreaSqm = Number((L * W).toFixed(4));
  const grossAreaSqft = Number((grossAreaSqm * 10.7639).toFixed(2));
  const openingSqm = Math.min(grossAreaSqm, Math.max(0, input.openingAreaSqm || 0));
  const openingSqft = Number((openingSqm * 10.7639).toFixed(2));
  const netSlabAreaSqm = Number((grossAreaSqm - openingSqm).toFixed(4));

  const perimeterM = Number((2 * (L + W)).toFixed(3));
  const concreteVolCum = Number((netSlabAreaSqm * T).toFixed(3));

  // 1. Shuttering Area Calculation
  const includeBottom = input.includeBottomSoffit !== false;
  const includeSide = input.includeSideShuttering !== false;

  const bottomSoffitSqm = includeBottom ? netSlabAreaSqm : 0;
  const bottomSoffitSqft = Number((bottomSoffitSqm * 10.7639).toFixed(2));

  const sideShutteringSqm = includeSide ? Number((perimeterM * T).toFixed(3)) : 0;
  const sideShutteringSqft = Number((sideShutteringSqm * 10.7639).toFixed(2));

  const totalShutteringSqm = Number((bottomSoffitSqm + sideShutteringSqm).toFixed(3));
  const totalShutteringSqft = Number((totalShutteringSqm * 10.7639).toFixed(2));

  // 2. Steel Calculation
  let totalSteelWeightKg = 0;
  let steelDetails: SlabShutteringResult['steelDetails'] | undefined;

  if (input.steelMode === 'simple') {
    const rate = Math.max(0, input.simpleSteelRateKgPerSqm || 10);
    totalSteelWeightKg = Number((netSlabAreaSqm * rate).toFixed(2));
  } else {
    // Detailed Reinforcement Calculation
    const directions: DetailedSteelDirectionResult[] = [];

    // Bottom Dir 1 (Runs along Width, spaced along Length)
    const b1Dia = Math.max(6, input.bottomDir1DiaMm || 10);
    const b1Spacing = Math.max(50, input.bottomDir1SpacingMm || 150) / 1000;
    const b1Count = Math.ceil(L / b1Spacing) + 1;
    const b1Len = W;
    const b1TotalLen = Number((b1Count * b1Len).toFixed(2));
    const b1UnitWt = getRebarUnitWeightKgM(b1Dia);
    const b1Wt = Number((b1TotalLen * b1UnitWt).toFixed(2));
    directions.push({
      directionName: 'Bottom Main Bars (Dir 1)',
      diaMm: b1Dia,
      spacingMm: b1Spacing * 1000,
      barCount: b1Count,
      lengthPerBarM: b1Len,
      totalLengthM: b1TotalLen,
      unitWeightKgM: b1UnitWt,
      weightKg: b1Wt,
    });

    // Bottom Dir 2 (Runs along Length, spaced along Width)
    const b2Dia = Math.max(6, input.bottomDir2DiaMm || 8);
    const b2Spacing = Math.max(50, input.bottomDir2SpacingMm || 175) / 1000;
    const b2Count = Math.ceil(W / b2Spacing) + 1;
    const b2Len = L;
    const b2TotalLen = Number((b2Count * b2Len).toFixed(2));
    const b2UnitWt = getRebarUnitWeightKgM(b2Dia);
    const b2Wt = Number((b2TotalLen * b2UnitWt).toFixed(2));
    directions.push({
      directionName: 'Bottom Distribution Bars (Dir 2)',
      diaMm: b2Dia,
      spacingMm: b2Spacing * 1000,
      barCount: b2Count,
      lengthPerBarM: b2Len,
      totalLengthM: b2TotalLen,
      unitWeightKgM: b2UnitWt,
      weightKg: b2Wt,
    });

    // Top Reinforcement if enabled
    if (input.includeTopSteel) {
      const t1Dia = Math.max(6, input.topDir1DiaMm || 8);
      const t1Spacing = Math.max(50, input.topDir1SpacingMm || 200) / 1000;
      const t1Count = Math.ceil(L / t1Spacing) + 1;
      const t1Len = W;
      const t1TotalLen = Number((t1Count * t1Len).toFixed(2));
      const t1UnitWt = getRebarUnitWeightKgM(t1Dia);
      const t1Wt = Number((t1TotalLen * t1UnitWt).toFixed(2));
      directions.push({
        directionName: 'Top Extra / Mesh (Dir 1)',
        diaMm: t1Dia,
        spacingMm: t1Spacing * 1000,
        barCount: t1Count,
        lengthPerBarM: t1Len,
        totalLengthM: t1TotalLen,
        unitWeightKgM: t1UnitWt,
        weightKg: t1Wt,
      });

      const t2Dia = Math.max(6, input.topDir2DiaMm || 8);
      const t2Spacing = Math.max(50, input.topDir2SpacingMm || 200) / 1000;
      const t2Count = Math.ceil(W / t2Spacing) + 1;
      const t2Len = L;
      const t2TotalLen = Number((t2Count * t2Len).toFixed(2));
      const t2UnitWt = getRebarUnitWeightKgM(t2Dia);
      const t2Wt = Number((t2TotalLen * t2UnitWt).toFixed(2));
      directions.push({
        directionName: 'Top Extra / Mesh (Dir 2)',
        diaMm: t2Dia,
        spacingMm: t2Spacing * 1000,
        barCount: t2Count,
        lengthPerBarM: t2Len,
        totalLengthM: t2TotalLen,
        unitWeightKgM: t2UnitWt,
        weightKg: t2Wt,
      });
    }

    const baseSteelKg = Number(directions.reduce((sum, d) => sum + d.weightKg, 0).toFixed(2));
    const wastagePct = Math.max(0, input.wastagePercentage || 0);
    const wastageKg = Number((baseSteelKg * (wastagePct / 100)).toFixed(2));
    totalSteelWeightKg = Number((baseSteelKg + wastageKg).toFixed(2));

    steelDetails = {
      directions,
      baseSteelKg,
      wastagePercentage: wastagePct,
      wastageKg,
    };
  }

  const totalSteelTonnes = Number((totalSteelWeightKg / 1000).toFixed(3));

  // 3. Acrow Props Grid Estimation
  const propSpacingL = Math.max(0.3, input.propSpacingLengthM || 1.2);
  const propSpacingW = Math.max(0.3, input.propSpacingWidthM || 1.2);

  const rowsAlongL = Math.ceil(L / propSpacingL) + 1;
  const rowsAlongW = Math.ceil(W / propSpacingW) + 1;
  const totalPropsCount = rowsAlongL * rowsAlongW;

  return {
    slabLengthM: L,
    slabWidthM: W,
    slabThicknessM: T,
    slabPerimeterM: perimeterM,
    slabGrossAreaSqm: grossAreaSqm,
    slabGrossAreaSqft: grossAreaSqft,
    openingAreaSqm: openingSqm,
    openingAreaSqft: openingSqft,
    concreteVolumeCum: concreteVolCum,

    bottomSoffitSqm,
    bottomSoffitSqft,
    sideShutteringSqm,
    sideShutteringSqft,
    totalShutteringSqm,
    totalShutteringSqft,

    steelMode: input.steelMode,
    totalSteelWeightKg,
    totalSteelTonnes,
    steelDetails,

    propSpacingLengthM: propSpacingL,
    propSpacingWidthM: propSpacingW,
    rowsAlongLength: rowsAlongL,
    rowsAlongWidth: rowsAlongW,
    totalPropsCount,
  };
}
