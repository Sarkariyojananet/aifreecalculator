/**
 * Static Decoupled Content Store Fallback
 * Provides lightweight static fallbacks for public pages.
 */

export async function getCalculatorOverrides(_locals?: any): Promise<Record<string, any>> {
  return {};
}

export async function getInternalLinks(_locals?: any): Promise<Record<string, string[]>> {
  return {};
}
