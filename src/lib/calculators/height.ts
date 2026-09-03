/**
 * Height Conversion & Comparison Engine
 */

export interface HeightInput {
  value: number;
  unit: 'cm' | 'm' | 'feet' | 'inches' | 'ft_in';
  inchesExtra?: number;
}

export interface HeightResult {
  cm: number;
  meters: number;
  totalInches: number;
  feet: number;
  inches: number;
  formattedFtIn: string;
}

export function convertHeight(input: HeightInput): HeightResult {
  let cm = 0;

  if (input.unit === 'cm') {
    cm = input.value;
  } else if (input.unit === 'm') {
    cm = input.value * 100;
  } else if (input.unit === 'inches') {
    cm = input.value * 2.54;
  } else if (input.unit === 'feet') {
    cm = input.value * 30.48;
  } else if (input.unit === 'ft_in') {
    const totalIn = input.value * 12 + (input.inchesExtra || 0);
    cm = totalIn * 2.54;
  }

  const meters = Number((cm / 100).toFixed(3));
  const totalInches = Number((cm / 2.54).toFixed(2));
  const feet = Math.floor(totalInches / 12);
  const inches = Number((totalInches % 12).toFixed(1));
  const formattedFtIn = `${feet}' ${inches}"`;

  return {
    cm: Number(cm.toFixed(1)),
    meters,
    totalInches,
    feet,
    inches,
    formattedFtIn,
  };
}
