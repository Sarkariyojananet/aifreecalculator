/**
 * Land Area & Regional Indian Unit Converter
 * High-accuracy area conversion engine supporting universal and state-wise Indian land measurement units.
 */

// All units normalized to Square Feet (sq ft)
export interface LandUnitDef {
  id: string;
  name: string;
  hindiName: string;
  sqftFactor: number; // 1 unit = X sq ft
  region: 'Universal' | 'North India' | 'South & West' | 'East India';
  description: string;
}

export const LAND_UNITS: LandUnitDef[] = [
  // Universal
  { id: 'sqft', name: 'Square Feet (sq ft)', hindiName: 'वर्ग फुट', sqftFactor: 1, region: 'Universal', description: 'Standard international unit (144 sq inches)' },
  { id: 'gaj', name: 'Gaj / Sq Yard', hindiName: 'गज / वर्ग गज', sqftFactor: 9, region: 'Universal', description: 'Standard 1 Gaj = 9 sq ft (3 ft x 3 ft)' },
  { id: 'sqm', name: 'Square Meter (m²)', hindiName: 'वर्ग मीटर', sqftFactor: 10.7639104, region: 'Universal', description: 'Metric standard (1 m x 1 m)' },
  { id: 'acre', name: 'Acre', hindiName: 'एकड़', sqftFactor: 43560, region: 'Universal', description: 'Standard 43,560 sq ft (4,840 sq yards)' },
  { id: 'hectare', name: 'Hectare', hindiName: 'हेक्टेयर', sqftFactor: 107639.104, region: 'Universal', description: '10,000 m² = ~2.471 Acres' },
  { id: 'are', name: 'Are', hindiName: 'आर', sqftFactor: 1076.39104, region: 'Universal', description: '100 m² (1/100th of Hectare)' },

  // North India
  { id: 'bigha_up', name: 'Bigha (UP, Rajasthan, Bihar)', hindiName: 'पक्का बीघा', sqftFactor: 27225, region: 'North India', description: '3,025 sq yards (165 ft x 165 ft)' },
  { id: 'bigha_hr', name: 'Bigha (Haryana, Punjab)', hindiName: 'कच्चा बीघा', sqftFactor: 12100, region: 'North India', description: 'Used in parts of Haryana/Punjab (1,008 sq yards)' },
  { id: 'biswa', name: 'Biswa (UP, Delhi, Haryana)', hindiName: 'बिस्वा', sqftFactor: 1361.25, region: 'North India', description: '1/20th of Standard Bigha (1361.25 sq ft)' },
  { id: 'kanal', name: 'Kanal (Punjab, Haryana, HP)', hindiName: 'कनाल', sqftFactor: 5445, region: 'North India', description: '1/8th of an Acre (605 sq yards)' },
  { id: 'marla', name: 'Marla (Punjab, Haryana)', hindiName: 'मरला', sqftFactor: 272.25, region: 'North India', description: '1/20th of a Kanal (30.25 sq yards)' },
  { id: 'killa', name: 'Killa (Punjab, Haryana)', hindiName: 'किल्ला', sqftFactor: 43560, region: 'North India', description: 'Equivalent to 1 Acre (4,840 sq yards)' },

  // South & West India
  { id: 'guntha', name: 'Guntha (MH, Gujarat, Karnataka)', hindiName: 'गुंठा', sqftFactor: 1089, region: 'South & West', description: '121 sq yards = 33 ft x 33 ft (1/40th Acre)' },
  { id: 'cent', name: 'Cent (Tamil Nadu, Kerala, AP)', hindiName: 'सेंट', sqftFactor: 435.6, region: 'South & West', description: '1/100th of an Acre (435.6 sq ft)' },
  { id: 'ground', name: 'Ground (Tamil Nadu, Chennai)', hindiName: 'ग्राउंड', sqftFactor: 2400, region: 'South & West', description: 'Chennai real estate standard (2,400 sq ft)' },
  { id: 'ankanam', name: 'Ankanam (Andhra Pradesh)', hindiName: 'अंकणम', sqftFactor: 72, region: 'South & West', description: 'Used in AP/Telangana (72 sq ft)' },

  // East India
  { id: 'kattha_bihar', name: 'Kattha (Bihar, Jharkhand)', hindiName: 'कट्ठा', sqftFactor: 1361.25, region: 'East India', description: '1/20th of standard Bihar Bigha' },
  { id: 'kattha_bengal', name: 'Kattha (West Bengal)', hindiName: 'काठा (बंगाल)', sqftFactor: 720, region: 'East India', description: '1/20th of Bengal Bigha (720 sq ft)' },
  { id: 'dhur', name: 'Dhur (Bihar, Jharkhand)', hindiName: 'धुर', sqftFactor: 68.0625, region: 'East India', description: '1/20th of a Kattha' },
  { id: 'decimal', name: 'Decimal / Dismil (Bengal, Odisha)', hindiName: 'डिसमिल', sqftFactor: 435.6, region: 'East India', description: '1/100th of an Acre (435.6 sq ft)' },
];

export interface LandConversionResult {
  sourceUnit: LandUnitDef;
  sourceValue: number;
  totalSqFt: number;
  conversions: Array<{
    unit: LandUnitDef;
    value: number;
    formatted: string;
  }>;
}

export function convertLandArea(value: number, fromUnitId: string): LandConversionResult {
  const sourceUnit = LAND_UNITS.find(u => u.id === fromUnitId) || LAND_UNITS[0];
  const safeVal = isNaN(value) || value < 0 ? 0 : value;
  const totalSqFt = safeVal * sourceUnit.sqftFactor;

  const conversions = LAND_UNITS.map(targetUnit => {
    const val = totalSqFt / targetUnit.sqftFactor;
    let formatted = '';
    if (val >= 1000) {
      formatted = val.toLocaleString('en-IN', { maximumFractionDigits: 2 });
    } else if (val >= 1) {
      formatted = val.toLocaleString('en-IN', { maximumFractionDigits: 4 });
    } else {
      formatted = val.toLocaleString('en-IN', { maximumFractionDigits: 6 });
    }
    return {
      unit: targetUnit,
      value: val,
      formatted,
    };
  });

  return {
    sourceUnit,
    sourceValue: safeVal,
    totalSqFt,
    conversions,
  };
}
