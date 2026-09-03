/**
 * Plaster & Mortar Calculation Engine
 * Supports:
 * 1. Wall Plaster Material Estimation (Net area, wet/dry volume, cement bags, sand CFT/tons)
 * 2. General Mortar Quantity Estimation
 * 3. Tile Mortar / Adhesive Estimation (Coverage, bed thickness, bag count)
 * 4. Gaming Mortar Artillery Calculations (Coordinates, distance, bearing in deg/mils, Squad & Arma aiming references)
 */

export interface WallPlasterInput {
  unitSystem: 'metric' | 'imperial';
  wallLength: number; // m or ft
  wallHeight: number; // m or ft
  numberOfWalls: number;
  openingsDeduction: number; // m² or sq.ft
  thickness: number; // mm, cm, or in
  thicknessUnit: 'mm' | 'cm' | 'in';
  mortarRatio: string; // '1:3' | '1:4' | '1:5' | '1:6' | 'custom'
  customCementPart?: number;
  customSandPart?: number;
  dryVolumeFactor?: number; // default 1.30
  wastagePercent?: number; // default 10%
}

export interface WallPlasterResult {
  totalWallAreaSqm: number;
  totalWallAreaSqft: number;
  openingsAreaSqm: number;
  openingsAreaSqft: number;
  netPlasterAreaSqm: number;
  netPlasterAreaSqft: number;
  thicknessMm: number;
  wetMortarVolumeCum: number;
  wetMortarVolumeCft: number;
  dryMortarVolumeCum: number;
  dryMortarVolumeCft: number;
  cementPart: number;
  sandPart: number;
  cementVolumeCum: number;
  cementWeightKg: number;
  cementBags50kg: number;
  sandVolumeCum: number;
  sandVolumeCft: number;
  sandWeightTons: number;
  wastagePercent: number;
  dryVolumeFactor: number;
  ratioLabel: string;
}

export interface GeneralMortarInput {
  unitSystem: 'metric' | 'imperial';
  length: number; // m or ft
  width: number; // m or ft
  depth: number; // mm, cm, m, or in
  depthUnit: 'mm' | 'cm' | 'm' | 'in';
  numberOfSections: number;
  mortarRatio: string;
  customCementPart?: number;
  customSandPart?: number;
  dryVolumeFactor?: number; // default 1.30
  wastagePercent?: number; // default 10%
}

export interface GeneralMortarResult {
  wetVolumeCum: number;
  wetVolumeCft: number;
  dryVolumeCum: number;
  dryVolumeCft: number;
  cementWeightKg: number;
  cementBags50kg: number;
  sandVolumeCum: number;
  sandVolumeCft: number;
  sandWeightTons: number;
  wastagePercent: number;
  dryVolumeFactor: number;
  ratioLabel: string;
}

export interface TileMortarInput {
  unitSystem: 'metric' | 'imperial';
  area: number; // m² or sq.ft
  tileType: 'floor' | 'wall';
  tilePreset: string; // '300x300' | '600x600' | '600x1200' | 'custom'
  bedThicknessMm: number; // mm
  coverageRateKgPerSqm: number; // kg/m²
  wastagePercent?: number; // default 10%
  bagSizeKg: number; // e.g. 20, 25, 30, 40
}

export interface TileMortarResult {
  areaSqm: number;
  areaSqft: number;
  tileType: 'floor' | 'wall';
  bedThicknessMm: number;
  coverageRateKgPerSqm: number;
  baseMaterialKg: number;
  wastageKg: number;
  totalRequiredKg: number;
  bagSizeKg: number;
  estimatedBagsExact: number;
  estimatedBagsRounded: number;
  wastagePercent: number;
}

export interface GamingMortarInput {
  game: 'arma_reforger' | 'arma' | 'squad' | 'generic';
  mortarX: number;
  mortarY: number;
  targetX: number;
  targetY: number;
  elevationDiffMeters?: number; // Target elevation - Mortar elevation
}

export interface GamingMortarResult {
  game: 'arma_reforger' | 'arma' | 'squad' | 'generic';
  gameLabel: string;
  mortarX: number;
  mortarY: number;
  targetX: number;
  targetY: number;
  deltaX: number;
  deltaY: number;
  distanceMeters: number;
  distanceKm: number;
  bearingDeg: number;
  bearingCompass: string;
  bearingNatoMils: number;
  bearingWarsawMils: number;
  elevationDiffMeters: number;
  referenceAimingElevation?: string;
  referenceNotes?: string;
}

/**
 * Helper to get compass direction name
 */
export function getCompassDirection(deg: number): string {
  const directions = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
  ];
  const idx = Math.round(((deg % 360) / 22.5)) % 16;
  return directions[idx];
}

/**
 * 1. Calculate Wall Plaster
 */
export function calculateWallPlaster(input: WallPlasterInput): WallPlasterResult {
  const {
    unitSystem,
    wallLength,
    wallHeight,
    numberOfWalls = 1,
    openingsDeduction = 0,
    thickness,
    thicknessUnit,
    mortarRatio,
    customCementPart = 1,
    customSandPart = 4,
    dryVolumeFactor = 1.30,
    wastagePercent = 10,
  } = input;

  // Convert raw wall area to square meters
  let totalWallAreaSqm = 0;
  let openingsAreaSqm = 0;

  if (unitSystem === 'imperial') {
    const rawAreaSqft = wallLength * wallHeight * numberOfWalls;
    totalWallAreaSqm = rawAreaSqft / 10.7639;
    openingsAreaSqm = openingsDeduction / 10.7639;
  } else {
    totalWallAreaSqm = wallLength * wallHeight * numberOfWalls;
    openingsAreaSqm = openingsDeduction;
  }

  const netPlasterAreaSqm = Math.max(0, totalWallAreaSqm - openingsAreaSqm);
  const totalWallAreaSqft = totalWallAreaSqm * 10.7639;
  const openingsAreaSqft = openingsAreaSqm * 10.7639;
  const netPlasterAreaSqft = netPlasterAreaSqm * 10.7639;

  // Convert thickness to meters and mm
  let thicknessMeters = 0;
  let thicknessMm = 0;

  if (thicknessUnit === 'cm') {
    thicknessMeters = thickness / 100;
    thicknessMm = thickness * 10;
  } else if (thicknessUnit === 'in') {
    thicknessMeters = (thickness * 25.4) / 1000;
    thicknessMm = thickness * 25.4;
  } else {
    thicknessMeters = thickness / 1000;
    thicknessMm = thickness;
  }

  // Wet Volume in m³
  const wetMortarVolumeCum = netPlasterAreaSqm * thicknessMeters;
  const wetMortarVolumeCft = wetMortarVolumeCum * 35.3147;

  // Dry Mortar Volume (dry factor accounts for sand void ratio + optional wastage)
  const dryMortarVolumeCum = wetMortarVolumeCum * dryVolumeFactor * (1 + wastagePercent / 100);
  const dryMortarVolumeCft = dryMortarVolumeCum * 35.3147;

  // Mortar ratio parts
  let cementPart = 1;
  let sandPart = 4;
  let ratioLabel = mortarRatio;

  if (mortarRatio === 'custom') {
    cementPart = customCementPart > 0 ? customCementPart : 1;
    sandPart = customSandPart > 0 ? customSandPart : 4;
    ratioLabel = `${cementPart}:${sandPart}`;
  } else {
    const parts = mortarRatio.split(':').map(Number);
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      cementPart = parts[0];
      sandPart = parts[1];
    }
  }

  const totalParts = cementPart + sandPart;

  // Cement (Density ~ 1440 kg/m³, 50kg bag)
  const cementVolumeCum = (dryMortarVolumeCum * cementPart) / totalParts;
  const cementWeightKg = cementVolumeCum * 1440;
  const cementBags50kg = cementWeightKg / 50;

  // Sand (Density ~ 1600 kg/m³)
  const sandVolumeCum = (dryMortarVolumeCum * sandPart) / totalParts;
  const sandVolumeCft = sandVolumeCum * 35.3147;
  const sandWeightTons = (sandVolumeCum * 1600) / 1000;

  return {
    totalWallAreaSqm: Number(totalWallAreaSqm.toFixed(2)),
    totalWallAreaSqft: Number(totalWallAreaSqft.toFixed(2)),
    openingsAreaSqm: Number(openingsAreaSqm.toFixed(2)),
    openingsAreaSqft: Number(openingsAreaSqft.toFixed(2)),
    netPlasterAreaSqm: Number(netPlasterAreaSqm.toFixed(2)),
    netPlasterAreaSqft: Number(netPlasterAreaSqft.toFixed(2)),
    thicknessMm: Number(thicknessMm.toFixed(1)),
    wetMortarVolumeCum: Number(wetMortarVolumeCum.toFixed(3)),
    wetMortarVolumeCft: Number(wetMortarVolumeCft.toFixed(2)),
    dryMortarVolumeCum: Number(dryMortarVolumeCum.toFixed(3)),
    dryMortarVolumeCft: Number(dryMortarVolumeCft.toFixed(2)),
    cementPart,
    sandPart,
    cementVolumeCum: Number(cementVolumeCum.toFixed(3)),
    cementWeightKg: Number(cementWeightKg.toFixed(1)),
    cementBags50kg: Number(cementBags50kg.toFixed(2)),
    sandVolumeCum: Number(sandVolumeCum.toFixed(3)),
    sandVolumeCft: Number(sandVolumeCft.toFixed(2)),
    sandWeightTons: Number(sandWeightTons.toFixed(2)),
    wastagePercent,
    dryVolumeFactor,
    ratioLabel,
  };
}

/**
 * 2. Calculate General Mortar Quantity
 */
export function calculateGeneralMortar(input: GeneralMortarInput): GeneralMortarResult {
  const {
    unitSystem,
    length,
    width,
    depth,
    depthUnit,
    numberOfSections = 1,
    mortarRatio,
    customCementPart = 1,
    customSandPart = 4,
    dryVolumeFactor = 1.30,
    wastagePercent = 10,
  } = input;

  let lengthM = length;
  let widthM = width;
  let depthM = depth;

  if (unitSystem === 'imperial') {
    lengthM = length * 0.3048;
    widthM = width * 0.3048;
  }

  if (depthUnit === 'mm') {
    depthM = depth / 1000;
  } else if (depthUnit === 'cm') {
    depthM = depth / 100;
  } else if (depthUnit === 'in') {
    depthM = (depth * 25.4) / 1000;
  }

  const wetVolumeCum = lengthM * widthM * depthM * numberOfSections;
  const wetVolumeCft = wetVolumeCum * 35.3147;

  const dryVolumeCum = wetVolumeCum * dryVolumeFactor * (1 + wastagePercent / 100);
  const dryVolumeCft = dryVolumeCum * 35.3147;

  let cementPart = 1;
  let sandPart = 4;
  let ratioLabel = mortarRatio;

  if (mortarRatio === 'custom') {
    cementPart = customCementPart > 0 ? customCementPart : 1;
    sandPart = customSandPart > 0 ? customSandPart : 4;
    ratioLabel = `${cementPart}:${sandPart}`;
  } else {
    const parts = mortarRatio.split(':').map(Number);
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      cementPart = parts[0];
      sandPart = parts[1];
    }
  }

  const totalParts = cementPart + sandPart;

  const cementVolumeCum = (dryVolumeCum * cementPart) / totalParts;
  const cementWeightKg = cementVolumeCum * 1440;
  const cementBags50kg = cementWeightKg / 50;

  const sandVolumeCum = (dryVolumeCum * sandPart) / totalParts;
  const sandVolumeCft = sandVolumeCum * 35.3147;
  const sandWeightTons = (sandVolumeCum * 1600) / 1000;

  return {
    wetVolumeCum: Number(wetVolumeCum.toFixed(3)),
    wetVolumeCft: Number(wetVolumeCft.toFixed(2)),
    dryVolumeCum: Number(dryVolumeCum.toFixed(3)),
    dryVolumeCft: Number(dryVolumeCft.toFixed(2)),
    cementWeightKg: Number(cementWeightKg.toFixed(1)),
    cementBags50kg: Number(cementBags50kg.toFixed(2)),
    sandVolumeCum: Number(sandVolumeCum.toFixed(3)),
    sandVolumeCft: Number(sandVolumeCft.toFixed(2)),
    sandWeightTons: Number(sandWeightTons.toFixed(2)),
    wastagePercent,
    dryVolumeFactor,
    ratioLabel,
  };
}

/**
 * 3. Calculate Tile Mortar / Adhesive
 */
export function calculateTileMortar(input: TileMortarInput): TileMortarResult {
  const {
    unitSystem,
    area,
    tileType,
    bedThicknessMm,
    coverageRateKgPerSqm,
    wastagePercent = 10,
    bagSizeKg = 20,
  } = input;

  let areaSqm = area;
  let areaSqft = area * 10.7639;

  if (unitSystem === 'imperial') {
    areaSqm = area / 10.7639;
    areaSqft = area;
  }

  const baseMaterialKg = areaSqm * coverageRateKgPerSqm;
  const wastageKg = baseMaterialKg * (wastagePercent / 100);
  const totalRequiredKg = baseMaterialKg + wastageKg;
  const estimatedBagsExact = totalRequiredKg / bagSizeKg;
  const estimatedBagsRounded = Math.ceil(estimatedBagsExact);

  return {
    areaSqm: Number(areaSqm.toFixed(2)),
    areaSqft: Number(areaSqft.toFixed(2)),
    tileType,
    bedThicknessMm,
    coverageRateKgPerSqm: Number(coverageRateKgPerSqm.toFixed(2)),
    baseMaterialKg: Number(baseMaterialKg.toFixed(1)),
    wastageKg: Number(wastageKg.toFixed(1)),
    totalRequiredKg: Number(totalRequiredKg.toFixed(1)),
    bagSizeKg,
    estimatedBagsExact: Number(estimatedBagsExact.toFixed(2)),
    estimatedBagsRounded,
    wastagePercent,
  };
}

/**
 * 4. Calculate Gaming Mortar Artillery Coordinates
 */
export function calculateGamingMortar(input: GamingMortarInput): GamingMortarResult {
  const { game, mortarX, mortarY, targetX, targetY, elevationDiffMeters = 0 } = input;

  const deltaX = targetX - mortarX;
  const deltaY = targetY - mortarY;

  // Euclidean 2D distance
  const distanceMeters = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const distanceKm = distanceMeters / 1000;

  // Standard military bearing: 0 deg = North (+Y), 90 deg = East (+X)
  let bearingRad = Math.atan2(deltaX, deltaY);
  let bearingDeg = (bearingRad * 180) / Math.PI;
  if (bearingDeg < 0) {
    bearingDeg += 360;
  }

  const bearingCompass = getCompassDirection(bearingDeg);

  // NATO Mils (6400 per 360 degrees = 17.7778 mils/deg)
  const bearingNatoMils = Math.round((bearingDeg / 360) * 6400);

  // Warsaw Pact Mils (6000 per 360 degrees = 16.6667 mils/deg)
  const bearingWarsawMils = Math.round((bearingDeg / 360) * 6000);

  let gameLabel = 'Generic Mortar';
  let referenceAimingElevation: string | undefined = undefined;
  let referenceNotes: string | undefined = undefined;

  if (game === 'squad') {
    gameLabel = 'Squad 81mm/82mm Mortar';
    // Standard Squad Mortar Ballistics (Min: 50m, Max: 1250m)
    if (distanceMeters < 50) {
      referenceAimingElevation = 'Below Minimum Range (< 50m)';
      referenceNotes = 'Target is within minimum safety arming distance (50m).';
    } else if (distanceMeters > 1250) {
      referenceAimingElevation = 'Out of Range (> 1250m)';
      referenceNotes = 'Target exceeds maximum effective range of Squad 81/82mm tube (1250m).';
    } else {
      // Linearized standard Squad elevation formula: ~1579 - (dist - 50) * 0.8325
      const baseMil = 1579 - (distanceMeters - 50) * 0.8325;
      const elevationCorrectionMil = elevationDiffMeters / 3.5;
      const finalMil = Math.round(baseMil - elevationCorrectionMil);
      referenceAimingElevation = `${finalMil} Mils`;
      referenceNotes = `Reference estimate for Squad standard mortar tube. Est. flight time: ~28s. (Elevation diff: ${elevationDiffMeters >= 0 ? '+' : ''}${elevationDiffMeters}m).`;
    }
  } else if (game === 'arma_reforger') {
    gameLabel = 'Arma Reforger Mortar';
    // Arma Reforger 82mm / 60mm reference
    const natoMilAngle = Math.round(bearingNatoMils);
    referenceAimingElevation = `Range: ${Math.round(distanceMeters)}m | Azimuth: ${natoMilAngle} Mils`;
    referenceNotes = 'Reference coordinate estimate for Arma Reforger standard artillery grid.';
  } else if (game === 'arma') {
    gameLabel = 'Arma 3 Mk6 Mortar';
    // Arma 3 Mk6 Charge recommendation
    let charge = 'Charge 0 (Close: 50-450m)';
    if (distanceMeters > 450 && distanceMeters <= 1800) {
      charge = 'Charge 1 (Medium: 150-1800m)';
    } else if (distanceMeters > 1800 && distanceMeters <= 3300) {
      charge = 'Charge 2 (Far: 300-3300m)';
    } else if (distanceMeters > 3300) {
      charge = 'Out of Range (> 3300m)';
    }
    referenceAimingElevation = `Recommended: ${charge}`;
    referenceNotes = `Distance: ${Math.round(distanceMeters)}m, Bearing: ${bearingDeg.toFixed(1)}° (${bearingNatoMils} Mils).`;
  } else {
    gameLabel = 'Generic Coordinate Artillery';
    referenceAimingElevation = `Azimuth: ${bearingDeg.toFixed(1)}° / ${bearingNatoMils} NATO Mils`;
    referenceNotes = 'Mathematical coordinate targeting values. Adjust for weapon elevation tables.';
  }

  return {
    game,
    gameLabel,
    mortarX,
    mortarY,
    targetX,
    targetY,
    deltaX: Number(deltaX.toFixed(1)),
    deltaY: Number(deltaY.toFixed(1)),
    distanceMeters: Number(distanceMeters.toFixed(1)),
    distanceKm: Number(distanceKm.toFixed(3)),
    bearingDeg: Number(bearingDeg.toFixed(1)),
    bearingCompass,
    bearingNatoMils,
    bearingWarsawMils,
    elevationDiffMeters,
    referenceAimingElevation,
    referenceNotes,
  };
}
