import { getTestCasesForSlug } from '../src/lib/calculator-tests/test-cases.ts';
import { runTestCase } from '../src/lib/calculator-tests/result-validator.ts';

async function test() {
  const cases = getTestCasesForSlug('right-triangle-area-calculator');
  console.log('Total test cases:', cases.length);
  for (const tc of cases) {
    const res = await runTestCase(tc);
    const message = (res as any).message || (res as any).error || (res as any).failureReason || 'OK';
    console.log(`${res.state}: ${tc.name} -> ${message}`);
  }
}

test();
