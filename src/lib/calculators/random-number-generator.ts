/**
 * Cryptographically Secure Random Number Generator Engine
 * Supports Single Integers, Decimals, Multiple Numbers, No-Repeats, Wheel Shuffling, and Custom Lists
 */

/**
 * Generate a random integer between min and max (inclusive) using crypto.getRandomValues if available
 */
export function secureRandomInt(min: number, max: number): number {
  const low = Math.min(min, max);
  const high = Math.max(min, max);
  const range = high - low + 1;

  if (range <= 0) return low;

  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const maxUint32 = 0xffffffff;
    const limit = maxUint32 - (maxUint32 % range);
    const buffer = new Uint32Array(1);

    do {
      crypto.getRandomValues(buffer);
    } while (buffer[0] >= limit);

    return low + (buffer[0] % range);
  }

  return Math.floor(Math.random() * range) + low;
}

/**
 * Generate a random decimal number between min and max with specified precision
 */
export function secureRandomDecimal(min: number, max: number, decimalPlaces: number = 2): number {
  const low = Math.min(min, max);
  const high = Math.max(min, max);
  const factor = Math.pow(10, Math.max(1, Math.min(6, decimalPlaces)));
  const randomIntVal = secureRandomInt(0, Math.round((high - low) * factor));
  return Number((low + randomIntVal / factor).toFixed(decimalPlaces));
}

export interface MultipleRngInput {
  min: number;
  max: number;
  count: number;
  allowDuplicates: boolean;
  type: 'integer' | 'decimal';
  decimalPlaces?: number;
}

/**
 * Generate multiple random numbers (with or without duplicates)
 */
export function generateMultipleRandomNumbers(input: MultipleRngInput): number[] {
  const { min, max, count, allowDuplicates, type, decimalPlaces = 2 } = input;
  const low = Math.min(min, max);
  const high = Math.max(min, max);

  if (count <= 0) return [];

  const range = high - low + 1;
  if (!allowDuplicates && type === 'integer' && count > range) {
    throw new Error(`Cannot generate ${count} unique numbers from a range of only ${range} numbers.`);
  }

  // Optimized Fisher-Yates shuffle if selecting a large subset without duplicates
  if (!allowDuplicates && type === 'integer' && range <= 100000 && count >= range * 0.3) {
    const allNumbers: number[] = [];
    for (let i = low; i <= high; i++) {
      allNumbers.push(i);
    }
    // Shuffle only up to count
    for (let i = 0; i < count; i++) {
      const j = secureRandomInt(i, allNumbers.length - 1);
      const temp = allNumbers[i];
      allNumbers[i] = allNumbers[j];
      allNumbers[j] = temp;
    }
    return allNumbers.slice(0, count);
  }

  const results: number[] = [];
  const seen = new Set<number>();
  let attempts = 0;

  while (results.length < count && attempts < 200000) {
    attempts++;
    const val = type === 'integer' ? secureRandomInt(low, high) : secureRandomDecimal(low, high, decimalPlaces);

    if (allowDuplicates || !seen.has(val)) {
      seen.add(val);
      results.push(val);
    }
  }

  return results;
}

/**
 * Pick one or multiple random elements from a custom string list
 */
export function pickRandomFromList(
  items: string[],
  count: number = 1,
  allowDuplicates: boolean = true
): string[] {
  const cleanItems = items.map((i) => i.trim()).filter((i) => i.length > 0);
  if (cleanItems.length === 0) return [];

  if (!allowDuplicates && count > cleanItems.length) {
    throw new Error(`Requested count (${count}) exceeds available list items (${cleanItems.length}).`);
  }

  if (!allowDuplicates) {
    const shuffled = [...cleanItems];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = secureRandomInt(0, i);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  }

  const results: string[] = [];
  for (let i = 0; i < count; i++) {
    const idx = secureRandomInt(0, cleanItems.length - 1);
    results.push(cleanItems[idx]);
  }
  return results;
}
