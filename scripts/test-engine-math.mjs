import { convertUnits, formatPrecision } from '../src/lib/calculators/unit-converter-engine.ts';

console.log('=== TESTING CONVERSION ENGINE CALCULATIONS ===\n');

// Test 1: Length (10 meters to feet)
const lengthRes = convertUnits('length', 'meter', 'foot', 10);
console.log(`10 m to ft: ${lengthRes.result} (Formula: ${lengthRes.formula})`);
if (Math.abs(lengthRes.result - 32.80839895) > 0.001) throw new Error('Length conversion failed');

// Test 2: Temperature (100 C to F)
const tempRes = convertUnits('temperature', 'celsius', 'fahrenheit', 100);
console.log(`100 °C to °F: ${tempRes.result} (Formula: ${tempRes.formula})`);
if (Math.abs(tempRes.result - 212) > 0.001) throw new Error('Temperature conversion failed');

// Test 3: Mass (1 kg to lb)
const massRes = convertUnits('mass', 'kilogram', 'pound', 1);
console.log(`1 kg to lb: ${massRes.result} (Formula: ${massRes.formula})`);
if (Math.abs(massRes.result - 2.20462262) > 0.001) throw new Error('Mass conversion failed');

// Test 4: Pressure (1 bar to psi)
const pressRes = convertUnits('pressure', 'bar', 'psi', 1);
console.log(`1 bar to psi: ${pressRes.result} (Formula: ${pressRes.formula})`);
if (Math.abs(pressRes.result - 14.50377) > 0.01) throw new Error('Pressure conversion failed');

// Test 5: Fuel Economy (30 mpg to l/100km)
const fuelRes = convertUnits('fuel', 'mpg_us', 'l_per_100km', 30);
console.log(`30 mpg_us to l/100km: ${fuelRes.result}`);
if (Math.abs(fuelRes.result - 7.8405) > 0.01) throw new Error('Fuel conversion failed');

// Test 6: Cooking (1 cup to tbsp)
const cookRes = convertUnits('cooking', 'cooking_cup', 'tbsp', 1);
console.log(`1 cup to tbsp: ${cookRes.result}`);
if (Math.abs(cookRes.result - 16) > 0.01) throw new Error('Cooking conversion failed');

console.log('\nALL 6 CALCULATION ENGINE TESTS PASSED PERFECTLY!');
