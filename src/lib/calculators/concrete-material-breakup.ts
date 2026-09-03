/**
 * Concrete Material Breakup Calculation Engine
 * High precision volumetric and material breakdown calculations
 */

export type DimensionUnit = 'mm' | 'cm' | 'meter' | 'feet' | 'inches';
export type VolumeUnit = 'cum' | 'cft' | 'cyd'; // m³, ft³, yd³
export type ConcreteMode = 'concrete_volume' | 'slab' | 'beam' | 'column' | 'footing' | 'custom_dimensions';

export interface ConcreteMixPreset {
  id: string;
  name: string;
  gradeLabel: string;
  cement: number;
  sand: number;
  aggregate: number;
  description: string;
}

export const CONCRETE_MIX_PRESETS: ConcreteMixPreset[] = [
  { id: '1:2:4', name: '1 : 2 : 4', gradeLabel: 'M15', cement: 1, sand: 2, aggregate: 4, description: 'General flooring, pavements & light RCC work' },
  { id: '1:1.5:3', name: '1 : 1.5 : 3', gradeLabel: 'M20', cement: 1, sand: 1.5, aggregate: 3, description: 'Standard RCC structural slabs, beams & columns' },
  { id: '1:1:2', name: '1 : 1 : 2', gradeLabel: 'M25', cement: 1, sand: 1, aggregate: 2, description: 'High-strength columns, heavy foundations & retaining structures' },
  { id: '1:3:6', name: '1 : 3 : 6', gradeLabel: 'M10', cement: 1, sand: 3, aggregate: 6, description: 'Plain cement concrete (PCC) levelling course & pathways' },
  { id: '1:4:8', name: '1 : 4 : 8', gradeLabel: 'M7.5', cement: 1, sand: 4, aggregate: 8, description: 'Sub-base under foundation footings & mass filling' },
  { id: '1:5:10', name: '1 : 5 : 10', gradeLabel: 'M5', cement: 1, sand: 5, aggregate: 10, description: 'Mass non-structural concrete foundations' },
];

export const CEMENT_DENSITY_KG_M3 = 1440; // Standard loose Portland cement density
export const SAND_DENSITY_KG_M3 = 1600;   // Standard dry river sand density
export const AGG_DENSITY_KG_M3 = 1500;    // Standard crushed gravel / coarse aggregate density
export const CFT_PER_M3 = 35.3146667;
export const CYD_PER_M3 = 1.30795;
export const LITERS_PER_GALLON = 3.78541;

/**
 * Unit conversion helper to meters
 */
export function convertToMeters(val: number, unit: DimensionUnit): number {
  switch (unit) {
    case 'mm': return val / 1000;
    case 'cm': return val / 100;
    case 'meter': return val;
    case 'feet': return val * 0.3048;
    case 'inches': return val * 0.0254;
    default: return val;
  }
}

/**
 * Volume conversion helper to m³
 */
export function convertVolumeToCum(val: number, unit: VolumeUnit): number {
  switch (unit) {
    case 'cum': return val;
    case 'cft': return val / CFT_PER_M3;
    case 'cyd': return val / CYD_PER_M3;
    default: return val;
  }
}

export interface MaterialItemBreakdown {
  material: string;
  baseVolumeCum: number;
  baseVolumeCft: number;
  wastageVolumeCum: number;
  wastageVolumeCft: number;
  finalVolumeCum: number;
  finalVolumeCft: number;
  weightKg: number;
  weightTons: number;
  practicalDisplay: string;
}

export interface ConcreteMixComparisonRow {
  presetId: string;
  name: string;
  gradeLabel: string;
  totalParts: number;
  cementBags: number;
  cementKg: number;
  sandCft: number;
  sandCum: number;
  sandTons: number;
  aggCft: number;
  aggCum: number;
  aggTons: number;
}

export interface ConcreteMaterialCalculationInput {
  mode: ConcreteMode;
  // Volume mode
  volumeValue?: number;
  volumeUnit?: VolumeUnit;
  // Structural Element / Custom Dimensions
  length?: number;
  lengthUnit?: DimensionUnit;
  width?: number;
  widthUnit?: DimensionUnit;
  heightOrDepth?: number;
  heightOrDepthUnit?: DimensionUnit;
  quantity?: number; // e.g. number of slabs, beams, columns, footings, units
  // Mix Ratio
  mixPreset?: string;
  cementPart: number;
  sandPart: number;
  aggregatePart: number;
  // Factors & settings
  dryVolumeFactor?: number; // default 1.54
  wastagePercent?: number;  // default 5%
  cementBagSizeKg?: number; // default 50kg
  // Water Estimation
  enableWater?: boolean;
  waterCementRatio?: number; // default 0.50
}

export interface ConcreteMaterialCalculationResult {
  mode: ConcreteMode;
  singleUnitVolumeCum: number;
  singleUnitVolumeCft: number;
  totalWetVolumeCum: number;
  totalWetVolumeCft: number;
  totalWetVolumeCyd: number;
  
  dryVolumeFactor: number;
  baseDryVolumeCum: number;
  baseDryVolumeCft: number;
  wastagePercent: number;
  finalDryVolumeCum: number;
  finalDryVolumeCft: number;

  mixRatioLabel: string;
  cementPart: number;
  sandPart: number;
  aggregatePart: number;
  totalRatioParts: number;

  cementBagSizeKg: number;
  cementVolumeCum: number;
  cementVolumeCft: number;
  cementWeightKg: number;
  cementWeightTons: number;
  cementBags: number;

  sandVolumeCum: number;
  sandVolumeCft: number;
  sandWeightKg: number;
  sandWeightTons: number;

  aggVolumeCum: number;
  aggVolumeCft: number;
  aggWeightKg: number;
  aggWeightTons: number;

  waterEnabled: boolean;
  waterCementRatio: number;
  waterLiters: number;
  waterGallons: number;

  tableBreakdown: MaterialItemBreakdown[];
  comparisonTable: ConcreteMixComparisonRow[];
  stepDetails: string[];
}

export function calculateConcreteMaterial(input: ConcreteMaterialCalculationInput): ConcreteMaterialCalculationResult {
  const {
    mode,
    dryVolumeFactor = 1.54,
    wastagePercent = 5,
    cementBagSizeKg = 50,
    cementPart,
    sandPart,
    aggregatePart,
    enableWater = true,
    waterCementRatio = 0.50,
  } = input;

  if (cementPart <= 0 || sandPart <= 0 || aggregatePart <= 0) {
    throw new Error('Mix ratio parts must be positive numbers greater than zero.');
  }
  if (dryVolumeFactor <= 0) {
    throw new Error('Dry volume factor must be greater than zero.');
  }
  if (cementBagSizeKg <= 0) {
    throw new Error('Cement bag size must be greater than zero.');
  }

  let singleUnitVolumeCum = 0;
  let totalWetVolumeCum = 0;
  const count = Math.max(1, Math.round(input.quantity || 1));

  if (mode === 'concrete_volume') {
    const rawVol = input.volumeValue || 0;
    if (rawVol <= 0) throw new Error('Concrete volume must be greater than zero.');
    totalWetVolumeCum = convertVolumeToCum(rawVol, input.volumeUnit || 'cum');
    singleUnitVolumeCum = totalWetVolumeCum;
  } else {
    // Structural elements & custom dimensions
    const l = convertToMeters(input.length || 0, input.lengthUnit || 'meter');
    const w = convertToMeters(input.width || 0, input.widthUnit || 'meter');
    const h = convertToMeters(input.heightOrDepth || 0, input.heightOrDepthUnit || 'meter');

    if (l <= 0 || w <= 0 || h <= 0) {
      throw new Error('Length, width, and height/depth dimensions must be greater than zero.');
    }

    singleUnitVolumeCum = l * w * h;
    totalWetVolumeCum = singleUnitVolumeCum * count;
  }

  if (totalWetVolumeCum <= 0) {
    throw new Error('Total concrete volume must be greater than zero.');
  }

  const totalWetVolumeCft = totalWetVolumeCum * CFT_PER_M3;
  const totalWetVolumeCyd = totalWetVolumeCum * CYD_PER_M3;
  const singleUnitVolumeCft = singleUnitVolumeCum * CFT_PER_M3;

  // Dry volume calculations
  const baseDryVolumeCum = totalWetVolumeCum * dryVolumeFactor;
  const baseDryVolumeCft = baseDryVolumeCum * CFT_PER_M3;
  
  const wastageMultiplier = 1 + wastagePercent / 100;
  const finalDryVolumeCum = baseDryVolumeCum * wastageMultiplier;
  const finalDryVolumeCft = finalDryVolumeCum * CFT_PER_M3;

  const totalRatioParts = cementPart + sandPart + aggregatePart;
  const mixRatioLabel = `${cementPart} : ${sandPart} : ${aggregatePart}`;

  // 1. Cement Calculations
  const baseCementVolCum = (baseDryVolumeCum * cementPart) / totalRatioParts;
  const finalCementVolCum = (finalDryVolumeCum * cementPart) / totalRatioParts;
  const wastageCementVolCum = finalCementVolCum - baseCementVolCum;

  const finalCementVolCft = finalCementVolCum * CFT_PER_M3;
  const baseCementVolCft = baseCementVolCum * CFT_PER_M3;
  const wastageCementVolCft = wastageCementVolCum * CFT_PER_M3;

  const cementWeightKg = finalCementVolCum * CEMENT_DENSITY_KG_M3;
  const cementWeightTons = cementWeightKg / 1000;
  const cementBags = cementWeightKg / cementBagSizeKg;

  // 2. Sand (Fine Aggregate) Calculations
  const baseSandVolCum = (baseDryVolumeCum * sandPart) / totalRatioParts;
  const finalSandVolCum = (finalDryVolumeCum * sandPart) / totalRatioParts;
  const wastageSandVolCum = finalSandVolCum - baseSandVolCum;

  const baseSandVolCft = baseSandVolCum * CFT_PER_M3;
  const finalSandVolCft = finalSandVolCum * CFT_PER_M3;
  const wastageSandVolCft = wastageSandVolCum * CFT_PER_M3;

  const sandWeightKg = finalSandVolCum * SAND_DENSITY_KG_M3;
  const sandWeightTons = sandWeightKg / 1000;

  // 3. Coarse Aggregate Calculations
  const baseAggVolCum = (baseDryVolumeCum * aggregatePart) / totalRatioParts;
  const finalAggVolCum = (finalDryVolumeCum * aggregatePart) / totalRatioParts;
  const wastageAggVolCum = finalAggVolCum - baseAggVolCum;

  const baseAggVolCft = baseAggVolCum * CFT_PER_M3;
  const finalAggVolCft = finalAggVolCum * CFT_PER_M3;
  const wastageAggVolCft = wastageAggVolCum * CFT_PER_M3;

  const aggWeightKg = finalAggVolCum * AGG_DENSITY_KG_M3;
  const aggWeightTons = aggWeightKg / 1000;

  // 4. Water Calculations
  let waterLiters = 0;
  let waterGallons = 0;
  if (enableWater && waterCementRatio > 0) {
    waterLiters = cementWeightKg * waterCementRatio;
    waterGallons = waterLiters / LITERS_PER_GALLON;
  }

  // Material Breakdown Table
  const tableBreakdown: MaterialItemBreakdown[] = [
    {
      material: 'Cement',
      baseVolumeCum: Number(baseCementVolCum.toFixed(3)),
      baseVolumeCft: Number(baseCementVolCft.toFixed(2)),
      wastageVolumeCum: Number(wastageCementVolCum.toFixed(3)),
      wastageVolumeCft: Number(wastageCementVolCft.toFixed(2)),
      finalVolumeCum: Number(finalCementVolCum.toFixed(3)),
      finalVolumeCft: Number(finalCementVolCft.toFixed(2)),
      weightKg: Number(cementWeightKg.toFixed(1)),
      weightTons: Number(cementWeightTons.toFixed(2)),
      practicalDisplay: `${cementBags.toFixed(1)} Bags (${cementBagSizeKg}kg) / ${Math.round(cementWeightKg).toLocaleString()} kg`,
    },
    {
      material: 'Sand (Fine Aggregate)',
      baseVolumeCum: Number(baseSandVolCum.toFixed(3)),
      baseVolumeCft: Number(baseSandVolCft.toFixed(2)),
      wastageVolumeCum: Number(wastageSandVolCum.toFixed(3)),
      wastageVolumeCft: Number(wastageSandVolCft.toFixed(2)),
      finalVolumeCum: Number(finalSandVolCum.toFixed(3)),
      finalVolumeCft: Number(finalSandVolCft.toFixed(2)),
      weightKg: Number(sandWeightKg.toFixed(1)),
      weightTons: Number(sandWeightTons.toFixed(2)),
      practicalDisplay: `${finalSandVolCft.toFixed(1)} CFT / ${finalSandVolCum.toFixed(2)} m³ (${sandWeightTons.toFixed(2)} Tons)`,
    },
    {
      material: 'Coarse Aggregate (Gravel/Stone)',
      baseVolumeCum: Number(baseAggVolCum.toFixed(3)),
      baseVolumeCft: Number(baseAggVolCft.toFixed(2)),
      wastageVolumeCum: Number(wastageAggVolCum.toFixed(3)),
      wastageVolumeCft: Number(wastageAggVolCft.toFixed(2)),
      finalVolumeCum: Number(finalAggVolCum.toFixed(3)),
      finalVolumeCft: Number(finalAggVolCft.toFixed(2)),
      weightKg: Number(aggWeightKg.toFixed(1)),
      weightTons: Number(aggWeightTons.toFixed(2)),
      practicalDisplay: `${finalAggVolCft.toFixed(1)} CFT / ${finalAggVolCum.toFixed(2)} m³ (${aggWeightTons.toFixed(2)} Tons)`,
    },
  ];

  if (enableWater && waterLiters > 0) {
    tableBreakdown.push({
      material: `Water (W/C: ${waterCementRatio.toFixed(2)})`,
      baseVolumeCum: Number(((baseCementVolCum * CEMENT_DENSITY_KG_M3 * waterCementRatio) / 1000).toFixed(3)),
      baseVolumeCft: Number((((baseCementVolCum * CEMENT_DENSITY_KG_M3 * waterCementRatio) / 1000) * CFT_PER_M3).toFixed(2)),
      wastageVolumeCum: Number(((waterLiters - (baseCementVolCum * CEMENT_DENSITY_KG_M3 * waterCementRatio)) / 1000).toFixed(3)),
      wastageVolumeCft: Number((((waterLiters - (baseCementVolCum * CEMENT_DENSITY_KG_M3 * waterCementRatio)) / 1000) * CFT_PER_M3).toFixed(2)),
      finalVolumeCum: Number((waterLiters / 1000).toFixed(3)),
      finalVolumeCft: Number(((waterLiters / 1000) * CFT_PER_M3).toFixed(2)),
      weightKg: Number(waterLiters.toFixed(1)),
      weightTons: Number((waterLiters / 1000).toFixed(2)),
      practicalDisplay: `${Math.round(waterLiters).toLocaleString()} Liters (${Math.round(waterGallons).toLocaleString()} Gallons)`,
    });
  }

  // Concrete Mix Comparison Matrix (Same entered volume across standard presets)
  const comparisonTable: ConcreteMixComparisonRow[] = CONCRETE_MIX_PRESETS.map((preset) => {
    const parts = preset.cement + preset.sand + preset.aggregate;
    const cVolCum = (finalDryVolumeCum * preset.cement) / parts;
    const cKg = cVolCum * CEMENT_DENSITY_KG_M3;
    const cBags = cKg / cementBagSizeKg;

    const sVolCum = (finalDryVolumeCum * preset.sand) / parts;
    const sCft = sVolCum * CFT_PER_M3;
    const sTons = (sVolCum * SAND_DENSITY_KG_M3) / 1000;

    const aVolCum = (finalDryVolumeCum * preset.aggregate) / parts;
    const aCft = aVolCum * CFT_PER_M3;
    const aTons = (aVolCum * AGG_DENSITY_KG_M3) / 1000;

    return {
      presetId: preset.id,
      name: preset.name,
      gradeLabel: preset.gradeLabel,
      totalParts: parts,
      cementBags: Number(cBags.toFixed(1)),
      cementKg: Math.round(cKg),
      sandCft: Number(sCft.toFixed(1)),
      sandCum: Number(sVolCum.toFixed(2)),
      sandTons: Number(sTons.toFixed(2)),
      aggCft: Number(aCft.toFixed(1)),
      aggCum: Number(aVolCum.toFixed(2)),
      aggTons: Number(aTons.toFixed(2)),
    };
  });

  // Step-by-step mathematical details
  const stepDetails: string[] = [
    `1. Total Compacted Wet Volume = ${totalWetVolumeCum.toFixed(3)} m³ (${totalWetVolumeCft.toFixed(2)} CFT / ${totalWetVolumeCyd.toFixed(2)} yd³)`,
    `2. Apply Dry Volume Factor (${dryVolumeFactor}): Base Dry Volume = ${totalWetVolumeCum.toFixed(3)} m³ × ${dryVolumeFactor} = ${baseDryVolumeCum.toFixed(3)} m³`,
    `3. Add Wastage (${wastagePercent}%): Final Dry Volume = ${baseDryVolumeCum.toFixed(3)} m³ × (1 + ${wastagePercent}/100) = ${finalDryVolumeCum.toFixed(3)} m³ (${finalDryVolumeCft.toFixed(2)} CFT)`,
    `4. Mix Ratio = ${mixRatioLabel} ➔ Total Parts = ${cementPart} + ${sandPart} + ${aggregatePart} = ${totalRatioParts}`,
    `5. Cement Volume = (${finalDryVolumeCum.toFixed(3)} × ${cementPart}/${totalRatioParts}) = ${finalCementVolCum.toFixed(3)} m³ (${finalCementVolCft.toFixed(2)} CFT)`,
    `   • Cement Weight = ${finalCementVolCum.toFixed(3)} m³ × ${CEMENT_DENSITY_KG_M3} kg/m³ = ${cementWeightKg.toFixed(1)} kg (${cementWeightTons.toFixed(2)} Tonnes)`,
    `   • Estimated Cement Bags = ${cementWeightKg.toFixed(1)} kg ÷ ${cementBagSizeKg} kg/bag = ${cementBags.toFixed(1)} Bags (${cementBagSizeKg}kg)`,
    `6. Sand Volume = (${finalDryVolumeCum.toFixed(3)} × ${sandPart}/${totalRatioParts}) = ${finalSandVolCum.toFixed(3)} m³ (${finalSandVolCft.toFixed(2)} CFT)`,
    `   • Sand Weight = ${finalSandVolCum.toFixed(3)} m³ × ${SAND_DENSITY_KG_M3} kg/m³ = ${sandWeightTons.toFixed(2)} Tonnes`,
    `7. Coarse Aggregate Volume = (${finalDryVolumeCum.toFixed(3)} × ${aggregatePart}/${totalRatioParts}) = ${finalAggVolCum.toFixed(3)} m³ (${finalAggVolCft.toFixed(2)} CFT)`,
    `   • Coarse Aggregate Weight = ${finalAggVolCum.toFixed(3)} m³ × ${AGG_DENSITY_KG_M3} kg/m³ = ${aggWeightTons.toFixed(2)} Tonnes`,
  ];

  if (enableWater && waterLiters > 0) {
    stepDetails.push(
      `8. Water Estimation (W/C: ${waterCementRatio.toFixed(2)}) = ${cementWeightKg.toFixed(1)} kg cement × ${waterCementRatio.toFixed(2)} = ${Math.round(waterLiters).toLocaleString()} Liters (${Math.round(waterGallons).toLocaleString()} Gallons)`
    );
  }

  return {
    mode,
    singleUnitVolumeCum: Number(singleUnitVolumeCum.toFixed(3)),
    singleUnitVolumeCft: Number(singleUnitVolumeCft.toFixed(2)),
    totalWetVolumeCum: Number(totalWetVolumeCum.toFixed(3)),
    totalWetVolumeCft: Number(totalWetVolumeCft.toFixed(2)),
    totalWetVolumeCyd: Number(totalWetVolumeCyd.toFixed(2)),
    dryVolumeFactor,
    baseDryVolumeCum: Number(baseDryVolumeCum.toFixed(3)),
    baseDryVolumeCft: Number(baseDryVolumeCft.toFixed(2)),
    wastagePercent,
    finalDryVolumeCum: Number(finalDryVolumeCum.toFixed(3)),
    finalDryVolumeCft: Number(finalDryVolumeCft.toFixed(2)),
    mixRatioLabel,
    cementPart,
    sandPart,
    aggregatePart,
    totalRatioParts,
    cementBagSizeKg,
    cementVolumeCum: Number(finalCementVolCum.toFixed(3)),
    cementVolumeCft: Number(finalCementVolCft.toFixed(2)),
    cementWeightKg: Number(cementWeightKg.toFixed(1)),
    cementWeightTons: Number(cementWeightTons.toFixed(2)),
    cementBags: Number(cementBags.toFixed(1)),
    sandVolumeCum: Number(finalSandVolCum.toFixed(3)),
    sandVolumeCft: Number(finalSandVolCft.toFixed(2)),
    sandWeightKg: Number(sandWeightKg.toFixed(1)),
    sandWeightTons: Number(sandWeightTons.toFixed(2)),
    aggVolumeCum: Number(finalAggVolCum.toFixed(3)),
    aggVolumeCft: Number(finalAggVolCft.toFixed(2)),
    aggWeightKg: Number(aggWeightKg.toFixed(1)),
    aggWeightTons: Number(aggWeightTons.toFixed(2)),
    waterEnabled: enableWater,
    waterCementRatio,
    waterLiters: Math.round(waterLiters),
    waterGallons: Math.round(waterGallons),
    tableBreakdown,
    comparisonTable,
    stepDetails,
  };
}
