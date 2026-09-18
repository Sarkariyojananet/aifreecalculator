/**
 * Unit Converter Engine - Comprehensive 16-Category Conversion System
 * 100% client-side compatible calculation engine with double-precision floating point.
 */

export interface UnitDefinition {
  id: string;
  name: string;
  symbol: string;
  toBase: (val: number) => number;
  fromBase: (baseVal: number) => number;
}

export interface CategoryDefinition {
  id: string;
  icon: string;
  name: string;
  baseUnit: string;
  defaultFrom: string;
  defaultTo: string;
  units: Record<string, UnitDefinition>;
}

export const UNIT_CATEGORIES: Record<string, CategoryDefinition> = {
  length: {
    id: 'length',
    icon: '📏',
    name: 'Length & Distance',
    baseUnit: 'meter',
    defaultFrom: 'meter',
    defaultTo: 'foot',
    units: {
      meter: { id: 'meter', name: 'Meter', symbol: 'm', toBase: x => x, fromBase: x => x },
      kilometer: { id: 'kilometer', name: 'Kilometer', symbol: 'km', toBase: x => x * 1000, fromBase: x => x / 1000 },
      centimeter: { id: 'centimeter', name: 'Centimeter', symbol: 'cm', toBase: x => x * 0.01, fromBase: x => x / 0.01 },
      millimeter: { id: 'millimeter', name: 'Millimeter', symbol: 'mm', toBase: x => x * 0.001, fromBase: x => x / 0.001 },
      micrometer: { id: 'micrometer', name: 'Micrometer', symbol: 'µm', toBase: x => x * 1e-6, fromBase: x => x / 1e-6 },
      nanometer: { id: 'nanometer', name: 'Nanometer', symbol: 'nm', toBase: x => x * 1e-9, fromBase: x => x / 1e-9 },
      mile: { id: 'mile', name: 'Mile', symbol: 'mi', toBase: x => x * 1609.344, fromBase: x => x / 1609.344 },
      yard: { id: 'yard', name: 'Yard', symbol: 'yd', toBase: x => x * 0.9144, fromBase: x => x / 0.9144 },
      foot: { id: 'foot', name: 'Foot', symbol: 'ft', toBase: x => x * 0.3048, fromBase: x => x / 0.3048 },
      inch: { id: 'inch', name: 'Inch', symbol: 'in', toBase: x => x * 0.0254, fromBase: x => x / 0.0254 },
      nautical_mile: { id: 'nautical_mile', name: 'Nautical Mile', symbol: 'nmi', toBase: x => x * 1852, fromBase: x => x / 1852 },
    },
  },

  area: {
    id: 'area',
    icon: '🗺️',
    name: 'Area & Land Measure',
    baseUnit: 'sqm',
    defaultFrom: 'acre',
    defaultTo: 'sqft',
    units: {
      sqm: { id: 'sqm', name: 'Square Meter', symbol: 'm²', toBase: x => x, fromBase: x => x },
      sqkm: { id: 'sqkm', name: 'Square Kilometer', symbol: 'km²', toBase: x => x * 1000000, fromBase: x => x / 1000000 },
      sqcm: { id: 'sqcm', name: 'Square Centimeter', symbol: 'cm²', toBase: x => x * 0.0001, fromBase: x => x / 0.0001 },
      sqmm: { id: 'sqmm', name: 'Square Millimeter', symbol: 'mm²', toBase: x => x * 1e-6, fromBase: x => x / 1e-6 },
      hectare: { id: 'hectare', name: 'Hectare', symbol: 'ha', toBase: x => x * 10000, fromBase: x => x / 10000 },
      acre: { id: 'acre', name: 'Acre', symbol: 'ac', toBase: x => x * 4046.8564224, fromBase: x => x / 4046.8564224 },
      sqmi: { id: 'sqmi', name: 'Square Mile', symbol: 'mi²', toBase: x => x * 2589988.110336, fromBase: x => x / 2589988.110336 },
      sqyd: { id: 'sqyd', name: 'Square Yard', symbol: 'yd²', toBase: x => x * 0.83612736, fromBase: x => x / 0.83612736 },
      sqft: { id: 'sqft', name: 'Square Foot', symbol: 'sq ft', toBase: x => x * 0.09290304, fromBase: x => x / 0.09290304 },
      sqin: { id: 'sqin', name: 'Square Inch', symbol: 'sq in', toBase: x => x * 0.00064516, fromBase: x => x / 0.00064516 },
    },
  },

  volume: {
    id: 'volume',
    icon: '🧪',
    name: 'Volume & Capacity',
    baseUnit: 'liter',
    defaultFrom: 'liter',
    defaultTo: 'us_gallon',
    units: {
      liter: { id: 'liter', name: 'Liter', symbol: 'L', toBase: x => x, fromBase: x => x },
      milliliter: { id: 'milliliter', name: 'Milliliter', symbol: 'mL', toBase: x => x * 0.001, fromBase: x => x / 0.001 },
      cubic_meter: { id: 'cubic_meter', name: 'Cubic Meter', symbol: 'm³', toBase: x => x * 1000, fromBase: x => x / 1000 },
      cubic_centimeter: { id: 'cubic_centimeter', name: 'Cubic Centimeter', symbol: 'cm³', toBase: x => x * 0.001, fromBase: x => x / 0.001 },
      us_gallon: { id: 'us_gallon', name: 'US Gallon', symbol: 'gal', toBase: x => x * 3.785411784, fromBase: x => x / 3.785411784 },
      us_quart: { id: 'us_quart', name: 'US Quart', symbol: 'qt', toBase: x => x * 0.946352946, fromBase: x => x / 0.946352946 },
      us_pint: { id: 'us_pint', name: 'US Pint', symbol: 'pt', toBase: x => x * 0.473176473, fromBase: x => x / 0.473176473 },
      us_cup: { id: 'us_cup', name: 'US Cup', symbol: 'cup', toBase: x => x * 0.2365882365, fromBase: x => x / 0.2365882365 },
      us_fl_oz: { id: 'us_fl_oz', name: 'US Fluid Ounce', symbol: 'fl oz', toBase: x => x * 0.0295735295625, fromBase: x => x / 0.0295735295625 },
      uk_gallon: { id: 'uk_gallon', name: 'UK Gallon', symbol: 'imp gal', toBase: x => x * 4.54609, fromBase: x => x / 4.54609 },
      uk_fl_oz: { id: 'uk_fl_oz', name: 'UK Fluid Ounce', symbol: 'imp fl oz', toBase: x => x * 0.0284130625, fromBase: x => x / 0.0284130625 },
      cubic_foot: { id: 'cubic_foot', name: 'Cubic Foot', symbol: 'ft³', toBase: x => x * 28.316846592, fromBase: x => x / 28.316846592 },
      cubic_inch: { id: 'cubic_inch', name: 'Cubic Inch', symbol: 'in³', toBase: x => x * 0.016387064, fromBase: x => x / 0.016387064 },
    },
  },

  mass: {
    id: 'mass',
    icon: '⚖️',
    name: 'Mass & Weight',
    baseUnit: 'kilogram',
    defaultFrom: 'kilogram',
    defaultTo: 'pound',
    units: {
      kilogram: { id: 'kilogram', name: 'Kilogram', symbol: 'kg', toBase: x => x, fromBase: x => x },
      gram: { id: 'gram', name: 'Gram', symbol: 'g', toBase: x => x * 0.001, fromBase: x => x / 0.001 },
      milligram: { id: 'milligram', name: 'Milligram', symbol: 'mg', toBase: x => x * 1e-6, fromBase: x => x / 1e-6 },
      tonne: { id: 'tonne', name: 'Metric Ton', symbol: 't', toBase: x => x * 1000, fromBase: x => x / 1000 },
      pound: { id: 'pound', name: 'Pound', symbol: 'lb', toBase: x => x * 0.45359237, fromBase: x => x / 0.45359237 },
      ounce: { id: 'ounce', name: 'Ounce', symbol: 'oz', toBase: x => x * 0.028349523125, fromBase: x => x / 0.028349523125 },
      stone: { id: 'stone', name: 'Stone', symbol: 'st', toBase: x => x * 6.35029318, fromBase: x => x / 6.35029318 },
      us_ton: { id: 'us_ton', name: 'US Short Ton', symbol: 'ton', toBase: x => x * 907.18474, fromBase: x => x / 907.18474 },
    },
  },

  temperature: {
    id: 'temperature',
    icon: '🌡️',
    name: 'Temperature',
    baseUnit: 'celsius',
    defaultFrom: 'celsius',
    defaultTo: 'fahrenheit',
    units: {
      celsius: {
        id: 'celsius',
        name: 'Celsius',
        symbol: '°C',
        toBase: x => x,
        fromBase: x => x,
      },
      fahrenheit: {
        id: 'fahrenheit',
        name: 'Fahrenheit',
        symbol: '°F',
        toBase: x => (x - 32) * (5 / 9),
        fromBase: x => (x * 9 / 5) + 32,
      },
      kelvin: {
        id: 'kelvin',
        name: 'Kelvin',
        symbol: 'K',
        toBase: x => x - 273.15,
        fromBase: x => x + 273.15,
      },
      rankine: {
        id: 'rankine',
        name: 'Rankine',
        symbol: '°R',
        toBase: x => (x - 491.67) * (5 / 9),
        fromBase: x => (x + 273.15) * 1.8,
      },
    },
  },

  time: {
    id: 'time',
    icon: '⏱️',
    name: 'Time',
    baseUnit: 'second',
    defaultFrom: 'hour',
    defaultTo: 'minute',
    units: {
      second: { id: 'second', name: 'Second', symbol: 's', toBase: x => x, fromBase: x => x },
      millisecond: { id: 'millisecond', name: 'Millisecond', symbol: 'ms', toBase: x => x * 0.001, fromBase: x => x / 0.001 },
      microsecond: { id: 'microsecond', name: 'Microsecond', symbol: 'µs', toBase: x => x * 1e-6, fromBase: x => x / 1e-6 },
      minute: { id: 'minute', name: 'Minute', symbol: 'min', toBase: x => x * 60, fromBase: x => x / 60 },
      hour: { id: 'hour', name: 'Hour', symbol: 'h', toBase: x => x * 3600, fromBase: x => x / 3600 },
      day: { id: 'day', name: 'Day', symbol: 'd', toBase: x => x * 86400, fromBase: x => x / 86400 },
      week: { id: 'week', name: 'Week', symbol: 'wk', toBase: x => x * 604800, fromBase: x => x / 604800 },
      month: { id: 'month', name: 'Month (avg)', symbol: 'mo', toBase: x => x * 2629746, fromBase: x => x / 2629746 },
      year: { id: 'year', name: 'Year (365d)', symbol: 'yr', toBase: x => x * 31536000, fromBase: x => x / 31536000 },
    },
  },

  speed: {
    id: 'speed',
    icon: '🚀',
    name: 'Speed & Velocity',
    baseUnit: 'mps',
    defaultFrom: 'kmh',
    defaultTo: 'mph',
    units: {
      mps: { id: 'mps', name: 'Meter per Second', symbol: 'm/s', toBase: x => x, fromBase: x => x },
      kmh: { id: 'kmh', name: 'Kilometer per Hour', symbol: 'km/h', toBase: x => x / 3.6, fromBase: x => x * 3.6 },
      mph: { id: 'mph', name: 'Mile per Hour', symbol: 'mph', toBase: x => x * 0.44704, fromBase: x => x / 0.44704 },
      knot: { id: 'knot', name: 'Knot', symbol: 'kn', toBase: x => x * 0.514444, fromBase: x => x / 0.514444 },
      fps: { id: 'fps', name: 'Foot per Second', symbol: 'ft/s', toBase: x => x * 0.3048, fromBase: x => x / 0.3048 },
      mach: { id: 'mach', name: 'Mach (Sound)', symbol: 'Ma', toBase: x => x * 343, fromBase: x => x / 343 },
    },
  },

  pressure: {
    id: 'pressure',
    icon: '🌪️',
    name: 'Pressure',
    baseUnit: 'pascal',
    defaultFrom: 'bar',
    defaultTo: 'psi',
    units: {
      pascal: { id: 'pascal', name: 'Pascal', symbol: 'Pa', toBase: x => x, fromBase: x => x },
      kilopascal: { id: 'kilopascal', name: 'Kilopascal', symbol: 'kPa', toBase: x => x * 1000, fromBase: x => x / 1000 },
      megapascal: { id: 'megapascal', name: 'Megapascal', symbol: 'MPa', toBase: x => x * 1e6, fromBase: x => x / 1e6 },
      bar: { id: 'bar', name: 'Bar', symbol: 'bar', toBase: x => x * 100000, fromBase: x => x / 100000 },
      millibar: { id: 'millibar', name: 'Millibar', symbol: 'mbar', toBase: x => x * 100, fromBase: x => x / 100 },
      psi: { id: 'psi', name: 'Pound per Square Inch', symbol: 'psi', toBase: x => x * 6894.757293, fromBase: x => x / 6894.757293 },
      atm: { id: 'atm', name: 'Standard Atmosphere', symbol: 'atm', toBase: x => x * 101325, fromBase: x => x / 101325 },
      torr: { id: 'torr', name: 'Torr / mmHg', symbol: 'Torr', toBase: x => x * 133.322368, fromBase: x => x / 133.322368 },
    },
  },

  energy: {
    id: 'energy',
    icon: '⚡',
    name: 'Energy & Work',
    baseUnit: 'joule',
    defaultFrom: 'kilowatt_hour',
    defaultTo: 'joule',
    units: {
      joule: { id: 'joule', name: 'Joule', symbol: 'J', toBase: x => x, fromBase: x => x },
      kilojoule: { id: 'kilojoule', name: 'Kilojoule', symbol: 'kJ', toBase: x => x * 1000, fromBase: x => x / 1000 },
      calorie: { id: 'calorie', name: 'Calorie (therm)', symbol: 'cal', toBase: x => x * 4.184, fromBase: x => x / 4.184 },
      kilocalorie: { id: 'kilocalorie', name: 'Kilocalorie (Food)', symbol: 'kcal', toBase: x => x * 4184, fromBase: x => x / 4184 },
      watt_hour: { id: 'watt_hour', name: 'Watt-hour', symbol: 'Wh', toBase: x => x * 3600, fromBase: x => x / 3600 },
      kilowatt_hour: { id: 'kilowatt_hour', name: 'Kilowatt-hour', symbol: 'kWh', toBase: x => x * 3.6e6, fromBase: x => x / 3.6e6 },
      btu: { id: 'btu', name: 'British Thermal Unit', symbol: 'BTU', toBase: x => x * 1055.05585, fromBase: x => x / 1055.05585 },
      foot_pound: { id: 'foot_pound', name: 'Foot-Pound', symbol: 'ft⋅lbf', toBase: x => x * 1.355818, fromBase: x => x / 1.355818 },
    },
  },

  power: {
    id: 'power',
    icon: '💡',
    name: 'Power',
    baseUnit: 'watt',
    defaultFrom: 'kilowatt',
    defaultTo: 'horsepower',
    units: {
      watt: { id: 'watt', name: 'Watt', symbol: 'W', toBase: x => x, fromBase: x => x },
      kilowatt: { id: 'kilowatt', name: 'Kilowatt', symbol: 'kW', toBase: x => x * 1000, fromBase: x => x / 1000 },
      megawatt: { id: 'megawatt', name: 'Megawatt', symbol: 'MW', toBase: x => x * 1e6, fromBase: x => x / 1e6 },
      horsepower: { id: 'horsepower', name: 'Horsepower (hp)', symbol: 'hp', toBase: x => x * 745.699872, fromBase: x => x / 745.699872 },
      metric_hp: { id: 'metric_hp', name: 'Metric Horsepower', symbol: 'PS', toBase: x => x * 735.49875, fromBase: x => x / 735.49875 },
      btu_per_hour: { id: 'btu_per_hour', name: 'BTU per Hour', symbol: 'BTU/h', toBase: x => x * 0.293071, fromBase: x => x / 0.293071 },
      ft_lb_per_sec: { id: 'ft_lb_per_sec', name: 'Foot-Pound/Second', symbol: 'ft⋅lb/s', toBase: x => x * 1.355818, fromBase: x => x / 1.355818 },
    },
  },

  data: {
    id: 'data',
    icon: '💾',
    name: 'Digital Storage',
    baseUnit: 'byte',
    defaultFrom: 'gigabyte',
    defaultTo: 'megabyte',
    units: {
      byte: { id: 'byte', name: 'Byte', symbol: 'B', toBase: x => x, fromBase: x => x },
      kilobyte: { id: 'kilobyte', name: 'Kilobyte', symbol: 'KB', toBase: x => x * 1024, fromBase: x => x / 1024 },
      megabyte: { id: 'megabyte', name: 'Megabyte', symbol: 'MB', toBase: x => x * 1048576, fromBase: x => x / 1048576 },
      gigabyte: { id: 'gigabyte', name: 'Gigabyte', symbol: 'GB', toBase: x => x * 1073741824, fromBase: x => x / 1073741824 },
      terabyte: { id: 'terabyte', name: 'Terabyte', symbol: 'TB', toBase: x => x * 1099511627776, fromBase: x => x / 1099511627776 },
      petabyte: { id: 'petabyte', name: 'Petabyte', symbol: 'PB', toBase: x => x * 1125899906842624, fromBase: x => x / 1125899906842624 },
      bit: { id: 'bit', name: 'Bit', symbol: 'b', toBase: x => x * 0.125, fromBase: x => x / 0.125 },
      gigabit: { id: 'gigabit', name: 'Gigabit', symbol: 'Gb', toBase: x => x * 134217728, fromBase: x => x / 134217728 },
    },
  },

  data_rate: {
    id: 'data_rate',
    icon: '🌐',
    name: 'Data Transfer Rate',
    baseUnit: 'mbps',
    defaultFrom: 'gbps',
    defaultTo: 'mbps',
    units: {
      bps: { id: 'bps', name: 'Bit per Second', symbol: 'bps', toBase: x => x / 1e6, fromBase: x => x * 1e6 },
      kbps: { id: 'kbps', name: 'Kilobit per Second', symbol: 'kbps', toBase: x => x / 1000, fromBase: x => x * 1000 },
      mbps: { id: 'mbps', name: 'Megabit per Second', symbol: 'Mbps', toBase: x => x, fromBase: x => x },
      gbps: { id: 'gbps', name: 'Gigabit per Second', symbol: 'Gbps', toBase: x => x * 1000, fromBase: x => x / 1000 },
      tbps: { id: 'tbps', name: 'Terabit per Second', symbol: 'Tbps', toBase: x => x * 1e6, fromBase: x => x / 1e6 },
      byte_per_sec: { id: 'byte_per_sec', name: 'Byte per Second', symbol: 'B/s', toBase: x => x / 125000, fromBase: x => x * 125000 },
      kb_per_sec: { id: 'kb_per_sec', name: 'Kilobyte per Second', symbol: 'KB/s', toBase: x => x / 125, fromBase: x => x * 125 },
      mb_per_sec: { id: 'mb_per_sec', name: 'Megabyte per Second', symbol: 'MB/s', toBase: x => x * 8, fromBase: x => x / 8 },
      gb_per_sec: { id: 'gb_per_sec', name: 'Gigabyte per Second', symbol: 'GB/s', toBase: x => x * 8000, fromBase: x => x / 8000 },
    },
  },

  frequency: {
    id: 'frequency',
    icon: '📡',
    name: 'Frequency',
    baseUnit: 'hertz',
    defaultFrom: 'gigahertz',
    defaultTo: 'megahertz',
    units: {
      hertz: { id: 'hertz', name: 'Hertz', symbol: 'Hz', toBase: x => x, fromBase: x => x },
      kilohertz: { id: 'kilohertz', name: 'Kilohertz', symbol: 'kHz', toBase: x => x * 1000, fromBase: x => x / 1000 },
      megahertz: { id: 'megahertz', name: 'Megahertz', symbol: 'MHz', toBase: x => x * 1e6, fromBase: x => x / 1e6 },
      gigahertz: { id: 'gigahertz', name: 'Gigahertz', symbol: 'GHz', toBase: x => x * 1e9, fromBase: x => x / 1e9 },
      rpm: { id: 'rpm', name: 'Revolutions per Minute', symbol: 'RPM', toBase: x => x / 60, fromBase: x => x * 60 },
    },
  },

  angle: {
    id: 'angle',
    icon: '📐',
    name: 'Angle',
    baseUnit: 'degree',
    defaultFrom: 'degree',
    defaultTo: 'radian',
    units: {
      degree: { id: 'degree', name: 'Degree', symbol: '°', toBase: x => x, fromBase: x => x },
      radian: { id: 'radian', name: 'Radian', symbol: 'rad', toBase: x => x * (180 / Math.PI), fromBase: x => x * (Math.PI / 180) },
      gradian: { id: 'gradian', name: 'Gradian', symbol: 'grad', toBase: x => x * 0.9, fromBase: x => x / 0.9 },
      arcminute: { id: 'arcminute', name: 'Arcminute', symbol: '′', toBase: x => x / 60, fromBase: x => x * 60 },
      arcsecond: { id: 'arcsecond', name: 'Arcsecond', symbol: '″', toBase: x => x / 3600, fromBase: x => x * 3600 },
      revolution: { id: 'revolution', name: 'Revolution / Turn', symbol: 'rev', toBase: x => x * 360, fromBase: x => x / 360 },
    },
  },

  fuel: {
    id: 'fuel',
    icon: '⛽',
    name: 'Fuel Economy',
    baseUnit: 'km_per_liter',
    defaultFrom: 'mpg_us',
    defaultTo: 'km_per_liter',
    units: {
      km_per_liter: { id: 'km_per_liter', name: 'Kilometer per Liter', symbol: 'km/L', toBase: x => x, fromBase: x => x },
      mpg_us: { id: 'mpg_us', name: 'Miles per Gallon (US)', symbol: 'mpg (US)', toBase: x => x * 0.425143707, fromBase: x => x / 0.425143707 },
      mpg_uk: { id: 'mpg_uk', name: 'Miles per Gallon (UK)', symbol: 'mpg (UK)', toBase: x => x * 0.35400619, fromBase: x => x / 0.35400619 },
      l_per_100km: {
        id: 'l_per_100km',
        name: 'Liters per 100km',
        symbol: 'L/100km',
        toBase: x => (x <= 0 ? 0 : 100 / x),
        fromBase: x => (x <= 0 ? 0 : 100 / x),
      },
    },
  },

  cooking: {
    id: 'cooking',
    icon: '🍳',
    name: 'Cooking & Recipe Volume',
    baseUnit: 'cooking_ml',
    defaultFrom: 'tbsp',
    defaultTo: 'tsp',
    units: {
      cooking_ml: { id: 'cooking_ml', name: 'Milliliter', symbol: 'mL', toBase: x => x, fromBase: x => x },
      tsp: { id: 'tsp', name: 'Teaspoon (US)', symbol: 'tsp', toBase: x => x * 4.92892, fromBase: x => x / 4.92892 },
      tbsp: { id: 'tbsp', name: 'Tablespoon (US)', symbol: 'tbsp', toBase: x => x * 14.78676, fromBase: x => x / 14.78676 },
      cooking_cup: { id: 'cooking_cup', name: 'Cup (US)', symbol: 'cup', toBase: x => x * 236.588, fromBase: x => x / 236.588 },
      cooking_fl_oz: { id: 'cooking_fl_oz', name: 'Fluid Ounce (US)', symbol: 'fl oz', toBase: x => x * 29.5735, fromBase: x => x / 29.5735 },
      cooking_pint: { id: 'cooking_pint', name: 'Pint (US)', symbol: 'pt', toBase: x => x * 473.176, fromBase: x => x / 473.176 },
      cooking_liter: { id: 'cooking_liter', name: 'Liter', symbol: 'L', toBase: x => x * 1000, fromBase: x => x / 1000 },
      drop: { id: 'drop', name: 'Drop (gtt)', symbol: 'drop', toBase: x => x * 0.05, fromBase: x => x / 0.05 },
    },
  },
};

/**
 * Perform conversion between two units in a given category.
 */
export function convertUnits(
  categoryKey: string,
  fromUnitKey: string,
  toUnitKey: string,
  value: number
): { result: number; formula: string } {
  const category = UNIT_CATEGORIES[categoryKey];
  if (!category) return { result: NaN, formula: '' };

  const fromUnit = category.units[fromUnitKey];
  const toUnit = category.units[toUnitKey];
  if (!fromUnit || !toUnit) return { result: NaN, formula: '' };

  const baseVal = fromUnit.toBase(value);
  const result = toUnit.fromBase(baseVal);

  const oneBase = fromUnit.toBase(1);
  const oneResult = toUnit.fromBase(oneBase);
  const formula = `1 ${fromUnit.symbol} = ${formatPrecision(oneResult)} ${toUnit.symbol}`;

  return { result, formula };
}

/**
 * Double-precision scientific formatting helper
 */
export function formatPrecision(val: number): string {
  if (isNaN(val) || !isFinite(val)) return '';
  if (val === 0) return '0';
  if (Math.abs(val) >= 1e9 || (Math.abs(val) > 0 && Math.abs(val) < 1e-6)) {
    return val.toExponential(4);
  }
  const fixed = val.toFixed(8);
  return parseFloat(fixed).toString();
}
