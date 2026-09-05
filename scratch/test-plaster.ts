import {
  calculateWallPlaster,
  calculateGeneralMortar,
  calculateTileMortar,
  calculateGamingMortar,
} from '../src/lib/calculators/plaster.ts';

console.log('=== Plaster & Mortar Calculator Test Suite ===');

let passed = 0;
let failed = 0;

function assert(condition: boolean, msg: string) {
  if (condition) {
    console.log(`✔ ${msg}: PASS`);
    passed++;
  } else {
    console.error(`❌ ${msg}: FAIL`);
    failed++;
  }
}

// 1. Standard Wall Plaster (Metric)
try {
  const r1 = calculateWallPlaster({
    unitSystem: 'metric',
    wallLength: 10,
    wallHeight: 3,
    numberOfWalls: 1,
    openingsDeduction: 0,
    thickness: 12,
    thicknessUnit: 'mm',
    mortarRatio: '1:4',
  });
  assert(r1.netPlasterAreaSqm === 30, `Mode 1 Net Area = 30 (got ${r1.netPlasterAreaSqm})`);
  assert(r1.wetMortarVolumeCum === 0.36, `Mode 1 Wet Volume = 0.36 (got ${r1.wetMortarVolumeCum})`);
  assert(r1.cementBagsRound === 3, `Mode 1 Cement Bags = 3 (got ${r1.cementBagsRound})`);
} catch (e: any) {
  assert(false, `Mode 1 metric error: ${e.message}`);
}

// 2. Imperial Wall Plaster with Deduction
try {
  const r2 = calculateWallPlaster({
    unitSystem: 'imperial',
    wallLength: 30,
    wallHeight: 10,
    numberOfWalls: 1,
    openingsDeduction: 40,
    thickness: 15,
    thicknessUnit: 'mm',
    mortarRatio: '1:4',
  });
  assert(Math.abs(r2.netPlasterAreaSqft - 260) < 1.0, `Mode 1 Imperial Net Area ≈ 260 (got ${r2.netPlasterAreaSqft})`);
} catch (e: any) {
  assert(false, `Mode 1 imperial error: ${e.message}`);
}

// 3. Lean Mortar 1:6 Mix
try {
  const r3 = calculateWallPlaster({
    unitSystem: 'metric',
    wallLength: 10,
    wallHeight: 3,
    thickness: 15,
    mortarRatio: '1:6',
  });
  assert(r3.ratioLabel === '1:6', `Mode 1 Ratio 1:6 label (got ${r3.ratioLabel})`);
  assert(r3.cementPart === 1 && r3.sandPart === 6, `Mode 1 Ratio parts (got ${r3.cementPart}:${r3.sandPart})`);
} catch (e: any) {
  assert(false, `Mode 1 ratio error: ${e.message}`);
}

// 4. General Mortar Bed
try {
  const r4 = calculateGeneralMortar({
    unitSystem: 'metric',
    length: 5,
    width: 4,
    depth: 50,
    depthUnit: 'mm',
    numberOfSections: 1,
    mortarRatio: '1:3',
  });
  assert(r4.wetVolumeCum === 1.0, `Mode 2 Wet Volume = 1.00 (got ${r4.wetVolumeCum})`);
  assert(r4.cementBagsRound > 0, `Mode 2 Cement bags > 0 (got ${r4.cementBagsRound})`);
} catch (e: any) {
  assert(false, `Mode 2 error: ${e.message}`);
}

// 5. Tile Adhesive
try {
  const r5 = calculateTileMortar({
    unitSystem: 'metric',
    area: 50,
    tileType: 'floor',
    tilePreset: '600x600',
    bedThicknessMm: 6,
    coverageRateKgPerSqm: 5.0,
    wastagePercent: 10,
    bagSizeKg: 20,
  });
  assert(r5.estimatedBagsRounded === 14, `Mode 3 Tile Bags = 14 (got ${r5.estimatedBagsRounded})`);
  assert(r5.totalRequiredKg === 275, `Mode 3 Total Kg = 275 (got ${r5.totalRequiredKg})`);
} catch (e: any) {
  assert(false, `Mode 3 error: ${e.message}`);
}

// 6. Gaming Mortar
try {
  const r6 = calculateGamingMortar({
    game: 'squad',
    mortarX: 1000,
    mortarY: 1000,
    targetX: 1600,
    targetY: 1800,
  });
  assert(r6.distanceMeters === 1000, `Mode 4 Range = 1000m (got ${r6.distanceMeters})`);
  assert(r6.bearingNatoMils > 0, `Mode 4 NATO Mils > 0 (got ${r6.bearingNatoMils})`);
} catch (e: any) {
  assert(false, `Mode 4 error: ${e.message}`);
}

// 7. Cost Estimation in INR & USD
try {
  const r7_inr = calculateWallPlaster({
    unitSystem: 'metric',
    wallLength: 10,
    wallHeight: 3,
    thickness: 15,
    mortarRatio: '1:4',
    enableCost: true,
    currency: 'INR',
    cementBagRate: 380,
    sandRatePerCft: 55,
  });
  assert(Boolean(r7_inr.costSummary && r7_inr.costSummary.totalMaterialCost > 0), `INR Cost Summary Generated (Total: ${r7_inr.costSummary?.formattedTotalCost})`);

  const r7_usd = calculateWallPlaster({
    unitSystem: 'metric',
    wallLength: 10,
    wallHeight: 3,
    thickness: 15,
    mortarRatio: '1:4',
    enableCost: true,
    currency: 'USD',
    cementBagRate: 14.50,
    sandRatePerCft: 1.80,
  });
  assert(Boolean(r7_usd.costSummary && r7_usd.costSummary.currency === 'USD'), `USD Cost Summary Generated (Total: ${r7_usd.costSummary?.formattedTotalCost})`);
} catch (e: any) {
  assert(false, `Cost estimation error: ${e.message}`);
}

// 8. Validation Guard
try {
  let threw = false;
  try {
    calculateWallPlaster({
      unitSystem: 'metric',
      wallLength: -5,
      wallHeight: 3,
      thickness: 15,
      mortarRatio: '1:4',
    });
  } catch {
    threw = true;
  }
  assert(threw, 'Correctly rejected negative wall length');
} catch (e: any) {
  assert(false, `Validation test error: ${e.message}`);
}

console.log(`\nFinal Test Results: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
