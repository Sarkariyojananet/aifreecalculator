import { getTestCasesForSlug } from '../src/lib/calculator-tests/test-cases.ts';
import { runTestCase } from '../src/lib/calculator-tests/result-validator.ts';

async function test() {
  const cases = getTestCasesForSlug('brickwork-calculator');
  console.log('Total test cases:', cases.length);
  for (const tc of cases) {
    const res = await runTestCase(tc);
    console.log(`${res.state}: ${tc.name} -> ${res.message || 'OK'}`);
  }
}

test();
