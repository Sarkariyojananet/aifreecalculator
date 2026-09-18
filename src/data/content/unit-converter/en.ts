import type { UnitConverterContent } from './types';

export const enContent: UnitConverterContent = {
  meta: {
    title: 'Unit Converter – Free Online Metric & Imperial Conversion Calculator',
    description: 'Free online mega unit converter. Instantly convert length, weight, temperature, area, volume, speed, time, pressure, energy, power, data, and cooking units with accurate formulas.',
    keywords: [
      'unit converter',
      'online unit converter',
      'metric to imperial converter',
      'length converter',
      'weight converter',
      'temperature converter',
      'celsius to fahrenheit',
      'kg to lbs converter',
      'inches to cm converter',
      'miles to km converter',
      'area converter',
      'volume converter',
      'pressure converter',
      'energy converter',
      'data storage converter',
      'fuel economy converter',
      'cooking converter'
    ],
    h1: 'Online Unit Converter',
    intro: 'Instantly convert between metric, imperial, and international standard units across 16 scientific and everyday categories. Fast, 100% client-side, and accurate to 8 decimal places.'
  },
  ui: {
    quickConversionsTitle: '⚡ Quick Conversions:',
    fromLabel: 'From Value',
    toLabel: 'Converted Result',
    swapButton: 'Swap Units',
    copyButton: 'Copy Result',
    copied: 'Copied! ✓',
    formulaLabel: 'Formula',
    convertedValueHeader: 'Converted Value',
    precisionLabel: 'Precision',
    precisionValue: 'Up to 8 decimals',
    standardUnitLabel: 'Standard Unit',
    equivalentHeader: '📋 Equivalent in Other Units',
    enterValuePlaceholder: 'Enter value to convert...',
    resultPlaceholder: 'Result will appear here...',
    indianLandBannerText: 'Looking for Indian Land Units (Bigha, Gaj, Biswa, Guntha, Acre, Cent)? Try our dedicated Land Area Converter →',
    indianLandBannerBtn: 'Open Converter',
    emptyHeroSub: 'Select units and enter a value above to calculate instantaneous conversions.'
  },
  categories: [
    { id: 'length', name: 'Length', desc: 'Convert meters, kilometers, miles, yards, feet, inches, and nautical miles.' },
    { id: 'area', name: 'Area', desc: 'Convert square meters, square feet, acres, hectares, square kilometers, and square miles.' },
    { id: 'volume', name: 'Volume', desc: 'Convert liters, milliliters, US gallons, UK gallons, cups, quarts, pints, and cubic meters.' },
    { id: 'mass', name: 'Mass & Weight', desc: 'Convert kilograms, grams, milligrams, pounds (lbs), ounces (oz), stones, and metric tons.' },
    { id: 'temperature', name: 'Temperature', desc: 'Convert temperature between Celsius (°C), Fahrenheit (°F), Kelvin (K), and Rankine (°R).' },
    { id: 'time', name: 'Time', desc: 'Convert seconds, minutes, hours, days, weeks, months, and years.' },
    { id: 'speed', name: 'Speed', desc: 'Convert kilometers per hour, miles per hour, meters per second, knots, and mach.' },
    { id: 'pressure', name: 'Pressure', desc: 'Convert pascals, bars, PSI, atmospheres, millibars, and torr.' },
    { id: 'energy', name: 'Energy', desc: 'Convert joules, kilojoules, calories, kilocalories, kilowatt-hours, and British thermal units (BTU).' },
    { id: 'power', name: 'Power', desc: 'Convert watts, kilowatts, megawatts, mechanical horsepower (hp), and metric horsepower (PS).' },
    { id: 'data', name: 'Digital Storage', desc: 'Convert bytes, kilobytes (KB), megabytes (MB), gigabytes (GB), terabytes (TB), and petabytes (PB).' },
    { id: 'data_rate', name: 'Data Transfer Rate', desc: 'Convert bits per second, Mbps, Gbps, megabytes per second (MB/s), and gigabytes per second.' },
    { id: 'frequency', name: 'Frequency', desc: 'Convert hertz (Hz), kilohertz (kHz), megahertz (MHz), gigahertz (GHz), and RPM.' },
    { id: 'angle', name: 'Angle', desc: 'Convert degrees, radians, gradians, arcminutes, arcseconds, and revolutions.' },
    { id: 'fuel', name: 'Fuel Economy', desc: 'Convert miles per gallon (MPG US & UK), kilometers per liter (km/L), and liters per 100km (L/100km).' },
    { id: 'cooking', name: 'Cooking Volume', desc: 'Convert teaspoons, tablespoons, cups, fluid ounces, pints, and milliliters for culinary recipes.' }
  ],
  presets: [
    { label: '1 Mile to Km', cat: 'length', from: 'mile', to: 'kilometer', val: '1' },
    { label: '1 Inch to cm', cat: 'length', from: 'inch', to: 'centimeter', val: '1' },
    { label: '1 Kg to Lbs', cat: 'mass', from: 'kilogram', to: 'pound', val: '1' },
    { label: '100°C to °F', cat: 'temperature', from: 'celsius', to: 'fahrenheit', val: '100' },
    { label: '1 Acre to Sq Ft', cat: 'area', from: 'acre', to: 'sqft', val: '1' },
    { label: '1 GB to MB', cat: 'data', from: 'gigabyte', to: 'megabyte', val: '1' },
    { label: '100 Mbps to MB/s', cat: 'data_rate', from: 'mbps', to: 'mb_per_sec', val: '100' },
    { label: '1 Bar to PSI', cat: 'pressure', from: 'bar', to: 'psi', val: '1' },
    { label: '1 kWh to Joules', cat: 'energy', from: 'kilowatt_hour', to: 'joule', val: '1' },
    { label: '1 Cup to mL', cat: 'cooking', from: 'cooking_cup', to: 'cooking_ml', val: '1' }
  ],
  article: {
    h2Overview: 'Comprehensive Guide to Unit Conversions: Metric, Imperial & Scientific Systems',
    pOverview1: 'Whether you are solving engineering calculations, baking a recipe from an international cookbook, planning an overseas road trip, or managing digital cloud storage, unit conversions are an indispensable part of daily life. The modern world relies heavily on two primary measurement frameworks: the International System of Units (SI Metric), adopted by virtually every country across the globe, and the US Customary / Imperial System, predominantly used in the United States, the United Kingdom, and select trading jurisdictions.',
    pOverview2: 'This free Mega Unit Converter provides precise, real-time conversions across 16 core categories. Every conversion is computed client-side using double-precision IEEE 754 floating-point arithmetic up to 8 decimal places for maximum scientific accuracy and everyday reliability.',

    categoriesHeader: 'In-Depth Breakdown of the 16 Conversion Categories',
    categoriesList: [
      {
        title: '1. Length and Distance',
        description: 'Length measures one-dimensional distance between two spatial points. The SI base unit is the meter (m). The imperial system relies on inches, feet, yards, and statute miles.',
        bulletPoints: [
          '1 Inch (in) = 2.54 Centimeters (cm) (exact international standard since 1959).',
          '1 Foot (ft) = 12 Inches = 0.3048 Meters (m).',
          '1 Yard (yd) = 3 Feet = 0.9144 Meters.',
          '1 Mile (mi) = 5,280 Feet = 1,760 Yards = 1.609344 Kilometers (km).',
          '1 Nautical Mile (nmi) = 1,852 Meters = 1.15078 Statute Miles (used in maritime and aviation navigation).'
        ],
        ruleOfThumb: 'Quick mental check: Multiply kilometers by 0.62 to approximate miles (e.g., 100 km/h ≈ 62 mph). Divide centimeters by 2.54 for inches.'
      },
      {
        title: '2. Area and Land Measurement',
        description: 'Area quantifies two-dimensional space within a boundary. In civil engineering, agriculture, and real estate, accurate conversion prevents costly commercial errors.',
        bulletPoints: [
          '1 Square Meter (m²) = 10.7639 Square Feet (sq ft).',
          '1 Acre = 43,560 Square Feet = 4,046.8564 Square Meters ≈ 0.4047 Hectares.',
          '1 Hectare (ha) = 10,000 Square Meters = 2.47105 Acres.',
          '1 Square Kilometer (km²) = 100 Hectares = 0.3861 Square Miles.',
          '1 Square Mile (mi²) = 640 Acres = 2.58999 Square Kilometers.'
        ]
      },
      {
        title: '3. Volume and Liquid Capacity',
        description: 'Volume measures three-dimensional space occupied by liquids, gases, or solids. Note that US fluid units differ substantially from UK Imperial liquid units.',
        bulletPoints: [
          '1 Liter (L) = 1,000 Milliliters (mL) = 0.264172 US Gallons = 33.814 US Fluid Ounces.',
          '1 US Liquid Gallon = 3.78541 Liters = 128 US Fluid Ounces = 4 Quarts = 8 Pints.',
          '1 UK Imperial Gallon = 4.54609 Liters = 160 UK Fluid Ounces (~20% larger than US gallon).',
          '1 US Cup = 8 US Fluid Ounces = 236.588 Milliliters.',
          '1 Cubic Meter (m³) = 1,000 Liters = 35.3147 Cubic Feet = 264.172 US Gallons.'
        ]
      },
      {
        title: '4. Mass and Weight',
        description: 'Mass represents the quantity of matter in an object, while weight reflects gravitational force. In trade and medicine, they are treated interchangeably at standard Earth gravity.',
        bulletPoints: [
          '1 Kilogram (kg) = 2.20462 Pounds (lbs) = 1,000 Grams (g).',
          '1 Pound (lb) = 16 Ounces (oz) = 453.59237 Grams = 0.453592 Kilograms.',
          '1 Metric Ton (tonne, t) = 1,000 Kilograms ≈ 2,204.62 Pounds.',
          '1 US Short Ton = 2,000 Pounds = 907.185 Kilograms.',
          '1 Stone (st, UK) = 14 Pounds = 6.35029 Kilograms.'
        ]
      },
      {
        title: '5. Temperature',
        description: 'Temperature measures average kinetic energy of molecular particles. Because temperature scales utilize different zero points, conversions require affine offset equations rather than pure multiplication.',
        bulletPoints: [
          'Celsius to Fahrenheit: °F = (°C × 9/5) + 32',
          'Fahrenheit to Celsius: °C = (°F - 32) × 5/9',
          'Celsius to Kelvin: K = °C + 273.15',
          'Kelvin to Celsius: °C = K - 273.15',
          'Fahrenheit to Rankine: °R = °F + 459.67'
        ]
      },
      {
        title: '6. Time',
        description: 'Time is the continuous sequence of existence and events. The SI base unit is the second, defined by atomic transitions of Caesium-133.',
        bulletPoints: [
          '1 Minute = 60 Seconds.',
          '1 Hour = 60 Minutes = 3,600 Seconds.',
          '1 Day = 24 Hours = 1,440 Minutes = 86,400 Seconds.',
          '1 Week = 7 Days = 168 Hours = 604,800 Seconds.',
          '1 Calendar Year (Gregorian standard) = 365 Days = 8,760 Hours = 31,536,000 Seconds (leap year: 366 days).'
        ]
      },
      {
        title: '7. Speed and Velocity',
        description: 'Speed is the magnitude of distance covered per unit of elapsed time.',
        bulletPoints: [
          '1 Kilometer per Hour (km/h) = 0.621371 Miles per Hour (mph) = 0.277778 Meters per Second (m/s).',
          '1 Mile per Hour (mph) = 1.609344 km/h = 0.44704 m/s = 0.868976 Knots.',
          '1 Knot (kn) = 1 Nautical Mile per Hour = 1.852 km/h = 1.15078 mph.',
          'Mach 1 (Speed of Sound at sea level, 20°C) ≈ 343 m/s ≈ 1,235 km/h ≈ 767.3 mph.'
        ]
      },
      {
        title: '8. Pressure',
        description: 'Pressure is force applied perpendicular to a surface per unit area. In meteorology, hydraulics, and tire maintenance, various units are customary.',
        bulletPoints: [
          '1 Pascal (Pa) = 1 Newton per square meter (N/m²).',
          '1 Bar = 100,000 Pascals (100 kPa) = 14.5038 PSI.',
          '1 Standard Atmosphere (atm) = 101,325 Pa = 1.01325 Bar = 14.6959 PSI.',
          '1 PSI (Pound per Square Inch) = 6,894.76 Pascals = 0.0689476 Bar.',
          '1 Torr = 1 mmHg ≈ 133.322 Pascals.'
        ]
      },
      {
        title: '9. Energy and Work',
        description: 'Energy is the quantitative property transferred to a body to perform physical work or produce heat.',
        bulletPoints: [
          '1 Joule (J) = 1 Watt-second = 1 Newton-meter.',
          '1 Kilowatt-hour (kWh) = 3,600,000 Joules (3.6 MJ).',
          '1 Calorie (thermochemical) = 4.184 Joules.',
          '1 Dietary Kilocalorie (kcal, Food Calorie) = 1,000 Small Calories = 4,184 Joules.',
          '1 British Thermal Unit (BTU) = 1,055.06 Joules = 252.164 Calories.'
        ]
      },
      {
        title: '10. Power',
        description: 'Power is the rate at which work is performed or energy is converted per unit of time.',
        bulletPoints: [
          '1 Watt (W) = 1 Joule per second.',
          '1 Kilowatt (kW) = 1,000 Watts = 1.34102 Mechanical Horsepower (hp).',
          '1 Mechanical Horsepower (Imperial hp) = 745.69987 Watts ≈ 0.746 kW.',
          '1 Metric Horsepower (PS / cv) = 735.49875 Watts ≈ 0.9863 Imperial hp.',
          '1 Megawatt (MW) = 1,000 Kilowatts = 1,000,000 Watts.'
        ]
      },
      {
        title: '11. Digital Storage',
        description: 'Digital storage measures electronic data capacity. Storage hardware manufacturers utilize decimal notation (base 10), while operating systems utilize binary notation (base 2).',
        bulletPoints: [
          '1 Byte (B) = 8 Bits (b).',
          '1 Kilobyte (KB) = 1,024 Bytes (binary) or 1,000 Bytes (decimal).',
          '1 Megabyte (MB) = 1,024 KB = 1,048,576 Bytes.',
          '1 Gigabyte (GB) = 1,024 MB = 1,073,741,824 Bytes.',
          '1 Terabyte (TB) = 1,024 GB = 1,099,511,627,776 Bytes.',
          '1 Petabyte (PB) = 1,024 TB.'
        ]
      },
      {
        title: '12. Data Transfer Rate (Bandwidth)',
        description: 'Bandwidth measures the transmission capacity of a network communication channel over time.',
        bulletPoints: [
          '1 Megabit per second (Mbps) = 1,000,000 bits per second (network speeds).',
          '1 Megabyte per second (MB/s) = 8 Megabits per second (file download speeds).',
          '1 Gigabit per second (Gbps) = 1,000 Mbps = 125 MB/s.',
          '100 Mbps Internet Connection downloads a maximum of 12.5 MB/s under ideal conditions.'
        ]
      },
      {
        title: '13. Frequency',
        description: 'Frequency is the number of occurrences of a repeating event per unit of time.',
        bulletPoints: [
          '1 Hertz (Hz) = 1 cycle per second.',
          '1 Kilohertz (kHz) = 1,000 Hz (audible acoustic range up to 20 kHz).',
          '1 Megahertz (MHz) = 1,000,000 Hz (radio broadcast and processor clocking).',
          '1 Gigahertz (GHz) = 1,000,000,000 Hz (modern computer processors, Wi-Fi 5 GHz).',
          '1 RPM (Revolutions per minute) = 1/60 Hz ≈ 0.016667 Hz.'
        ]
      },
      {
        title: '14. Plane Angle',
        description: 'An angle quantifies the circular opening between two intersecting lines or rays.',
        bulletPoints: [
          'Full Circle = 360 Degrees (°) = 2π Radians (≈ 6.283185 rad) = 400 Gradians (grad).',
          '1 Radian = 180 / π ≈ 57.2958 Degrees.',
          '1 Degree = π / 180 ≈ 0.0174533 Radians.',
          '1 Degree = 60 Arcminutes (′) = 3,600 Arcseconds (″).'
        ]
      },
      {
        title: '15. Fuel Economy',
        description: 'Fuel economy calculates distance traveled per unit volume of fuel, or conversely the volume consumed per fixed distance.',
        bulletPoints: [
          'Miles per Gallon (US MPG) to Kilometers per Liter: km/L = MPG × 0.425144.',
          'Miles per Gallon (US MPG) to L/100km: L/100km = 235.215 / US MPG (reciprocal relationship).',
          'Kilometers per Liter (km/L) to L/100km: L/100km = 100 / (km/L).',
          '1 UK Imperial MPG ≈ 1.20095 US MPG.'
        ]
      },
      {
        title: '16. Culinary & Cooking Volume',
        description: 'Baking and culinary preparation require delicate volumetric conversions between international measuring spoons, cups, and metric volume.',
        bulletPoints: [
          '1 US Tablespoon (tbsp) = 3 US Teaspoons (tsp) = 0.5 US Fluid Ounces ≈ 14.787 mL.',
          '1 US Cup = 16 Tablespoons = 48 Teaspoons = 8 Fluid Ounces ≈ 236.588 mL.',
          '1 Metric Cup (Australia, New Zealand, UK recipes) = 250 mL.',
          '1 US Pint = 2 Cups = 16 Fluid Ounces ≈ 473.176 mL.'
        ]
      }
    ],

    comparisonHeader: 'Metric vs Imperial: Key Philosophical and Practical Differences',
    comparisonText: 'The International Metric System (SI) is built on decimal coherence: each unit scales by powers of ten using standardized Greek and Latin prefixes (kilo-, centi-, milli-, micro-). In contrast, the US Customary and Imperial systems developed organically from historical agricultural, merchant, and trade traditions:',
    comparisonPoints: [
      'Decimal Convenience: In metric, 1 kilometer is 1,000 meters, and 1 meter is 100 centimeters. In imperial, 1 mile is 5,280 feet, and 1 foot is 12 inches.',
      'Scientific Unification: Almost all modern scientific research, aerospace instrumentation, medical dosing, and pharmaceutical formulations worldwide utilize the SI Metric system exclusively.',
      'Cultural Persistence: Imperial measurements remain deeply entrenched in US construction (2x4 lumber, plywood sheets), consumer automotive tire pressures (PSI), vehicle speed limits (mph), and real estate acreage.'
    ],

    formulasHeader: 'Mathematical Formulas & Temperature Benchmarks',
    formulasIntro: 'While linear unit conversions involve a straightforward multiplication factor (Result = Input × Factor), temperature involves affine scales with different zero points. The table below illustrates critical physical benchmarks across the primary temperature scales:',
    benchmarksTitle: 'Key Physical Temperature Benchmarks',
    benchmarksHeaders: {
      condition: 'Physical Phenomenon',
      celsius: 'Celsius (°C)',
      fahrenheit: 'Fahrenheit (°F)',
      kelvin: 'Kelvin (K)'
    },
    benchmarksRows: [
      { condition: 'Absolute Zero (No molecular motion)', celsius: '-273.15 °C', fahrenheit: '-459.67 °F', kelvin: '0.00 K' },
      { condition: 'Freezing Point of Pure Water (1 atm)', celsius: '0.00 °C', fahrenheit: '32.00 °F', kelvin: '273.15 K' },
      { condition: 'Standard Room Temperature', celsius: '20.00 to 22.00 °C', fahrenheit: '68.00 to 71.60 °F', kelvin: '293.15 to 295.15 K' },
      { condition: 'Average Human Body Temperature', celsius: '37.00 °C', fahrenheit: '98.60 °F', kelvin: '310.15 K' },
      { condition: 'Boiling Point of Pure Water (1 atm)', celsius: '100.00 °C', fahrenheit: '212.00 °F', kelvin: '373.15 K' }
    ],

    useCasesHeader: 'Real-World Conversion Use Cases',
    useCasesList: [
      {
        title: 'Global Travel and Driving',
        description: 'Renting a car abroad requires rapid mental conversion between km/h and mph, as well as understanding tire inflation pressures (bar vs. psi) and fuel volume (liters vs. gallons).'
      },
      {
        title: 'International Culinary Arts & Baking',
        description: 'Baking is an exact chemical process. Mixing up American fluid ounces with Imperial fluid ounces or dry ounces can ruin dough consistency and leavening reactions.'
      },
      {
        title: 'Engineering and Architectural Projects',
        description: 'Civil and mechanical engineers regularly convert architectural blueprints between metric millimeters and imperial feet/inches without risking structural rounding errors.'
      },
      {
        title: 'IT Infrastructure and Cloud Storage',
        description: 'Understanding the difference between raw hardware capacity (decimal gigabytes) and operating system allocation (binary gibibytes) prevents cloud server under-provisioning.'
      }
    ],

    limitationsHeader: 'Technical Assumptions and Precision Limitations',
    limitationsList: [
      'Calculations are performed client-side using IEEE 754 64-bit floating-point numbers. Rounding is displayed up to 8 decimal places to eliminate recurring binary precision artifacts.',
      'Cooking conversions assume standard liquid densities (approximately 1 g/mL for water). Dry ingredients like flour, sugar, or oats have varying packing densities and are best weighed with a precision kitchen scale.',
      'Atmospheric pressure and boiling point benchmarks assume standard sea-level pressure of 101,325 Pa (1 atmosphere).'
    ]
  },
  faqs: [
    {
      question: '1. How accurate is this online unit converter?',
      answer: 'All conversion ratios are based on the latest NIST (National Institute of Standards and Technology) and ISO international standards. Calculations are performed locally on your device using 64-bit IEEE 754 floating-point arithmetic, ensuring precision down to 8 decimal places without server latency.'
    },
    {
      question: '2. What is the fundamental difference between the Metric and Imperial measurement systems?',
      answer: 'The Metric system is decimal-based (powers of 10), making scaling between millimeters, centimeters, meters, and kilometers intuitive. The Imperial system is rooted in historical Anglo-Saxon units with non-decimal multipliers (12 inches in a foot, 3 feet in a yard, 16 ounces in a pound, 5,280 feet in a mile).'
    },
    {
      question: '3. Why is a US liquid gallon different from a UK Imperial gallon?',
      answer: 'A US liquid gallon is defined as 231 cubic inches (~3.7854 liters), derived from the historic Queen Anne wine gallon. The British Imperial gallon was standardized in 1824 as the volume of 10 pounds of distilled water at 62°F (~4.5461 liters). As a result, a UK gallon is approximately 20.09% larger than a US gallon.'
    },
    {
      question: '4. How do I convert temperatures between Celsius, Fahrenheit, and Kelvin?',
      answer: 'To convert Celsius to Fahrenheit: multiply by 9/5 (or 1.8) and add 32 [°F = (°C × 1.8) + 32]. To convert Fahrenheit to Celsius: subtract 32 and divide by 1.8 [°C = (°F - 32) ÷ 1.8]. To convert Celsius to Kelvin: add 273.15 [K = °C + 273.15]. Both scales intersect at exactly -40° (-40°C = -40°F).'
    },
    {
      question: '5. How many square feet are in an acre and a hectare?',
      answer: 'One acre equals exactly 43,560 square feet (approximately 4,046.86 square meters). One hectare equals 10,000 square meters, which is approximately 107,639 square feet or 2.47105 acres.'
    },
    {
      question: '6. Why does my 1 TB hard drive show as only 931 GB in Windows?',
      answer: 'Hardware manufacturers measure disk capacity using decimal gigabytes (1 TB = 1,000,000,000,000 bytes). Microsoft Windows measures disk capacity using binary gibibytes (GiB, 1 GiB = 1,073,741,824 bytes). Dividing 1,000,000,000,000 by 1,073,741,824 results in approximately 931.32 GiB, which Windows labels as "GB".'
    },
    {
      question: '7. What is the difference between megabits per second (Mbps) and megabytes per second (MB/s)?',
      answer: 'Megabits per second (Mbps with lowercase "b") measures network bandwidth and telecommunication line speed. Megabytes per second (MB/s with uppercase "B") measures file transfer and disk writing speed. Since there are 8 bits in one byte, divide your Mbps speed by 8 to find the theoretical download speed in MB/s (e.g., 100 Mbps ÷ 8 = 12.5 MB/s).'
    },
    {
      question: '8. How does fuel economy conversion work between MPG and L/100km?',
      answer: 'Fuel economy conversion between US MPG and L/100km is inverse (reciprocal): higher MPG means better efficiency, whereas lower L/100km means better efficiency. The formula is: L/100km = 235.215 ÷ US MPG. For example, 30 MPG equates to 235.215 ÷ 30 ≈ 7.84 L/100km.'
    },
    {
      question: '9. How many teaspoons are in a tablespoon and a culinary cup?',
      answer: 'In US culinary measurement, 1 tablespoon contains exactly 3 teaspoons (~14.79 mL). One US cup contains 16 tablespoons or 48 teaspoons (~236.59 mL). In metric cooking standards (such as in Australia and the UK), a metric cup is rounded to 250 mL.'
    },
    {
      question: '10. What is the difference between mass and weight in scientific vs everyday terms?',
      answer: 'Scientifically, mass is an intrinsic property measuring the quantity of matter (measured in kilograms), which remains constant anywhere in the universe. Weight is the downward gravitational force acting on that mass (measured in Newtons: W = m × g). In everyday commerce on Earth, weight and mass are treated interchangeably.'
    },
    {
      question: '11. How is atmospheric pressure measured across bar, psi, and atmospheres?',
      answer: 'Standard sea-level atmospheric pressure (1 atm) equals 101,325 Pascals, 1.01325 Bar, or 14.6959 PSI (pounds per square inch). One bar (100,000 Pa) is roughly 14.5038 PSI. Car tire gauges typically read in gauge pressure (PSI or bar relative to ambient atmosphere).'
    },
    {
      question: '12. Why are angles measured in both degrees and radians?',
      answer: 'Degrees (360° in a circle) originate from ancient Babylonian astronomical divisions. Radians are the natural SI scientific unit of angular measure, defined by the arc length equal to the radius of the circle (2π radians = 360°). Calculus and physics formulas require radians for trigonometric derivative calculations.'
    },
    {
      question: '13. Does this converter require an internet connection or send data to a server?',
      answer: 'No. This unit converter executes 100% locally in your web browser using client-side JavaScript. None of your entered values, numbers, or selections are sent over the network or saved on remote servers.'
    },
    {
      question: '14. Can I convert multiple units simultaneously?',
      answer: 'Yes. When you enter a value into the converter, the "Equivalent in Other Units" panel automatically calculates and displays the simultaneous equivalent across every unit available within the active category in real time.'
    }
  ]
};
