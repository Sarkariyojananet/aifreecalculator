/**
 * Centralized Live Page Metadata Catalog
 * Keeps /admin/seo/bulk/, audit-engine.ts, and real-time live Astro pages in 100% perfect sync.
 */

export interface PageMetaItem {
  title: string;
  description: string;
}

export const LIVE_PAGE_METADATA: Record<string, PageMetaItem> = {
  "bmi-calculator": {
    "title": "Free BMI Calculator: Check Body Mass Index & Healthy Weight Range",
    "description": "Calculate your BMI instantly with kg/cm, lbs/feet, or stones/meters. View WHO or Asian/Indian BMI categories, a healthy weight range, and practical body-composition estimates."
  },
  "age-calculator": {
    "title": "Age Calculator - Calculate Your Exact Age Online",
    "description": "Calculate your exact chronological age in years, months, and days for today or any selected date."
  },
  "height-calculator": {
    "title": "Height Converter - Feet, Inches, CM & Meters",
    "description": "Convert height between centimeters, meters, feet, and inches with percentile chart comparisons."
  },
  "weight-calculator": {
    "title": "Weight Converter Calculator – Convert KG, LBS, Grams and More",
    "description": "Free online weight converter calculator. Accurately convert weight and mass between kilograms (kg), pounds (lbs), grams (g), ounces (oz), stones, metric tonnes, gold Troy ounces, and calculate height-weight BMI."
  },
  "time-calculator": {
    "title": "Date & Time Calculator – Calculate Time, Work Hours and Date Differences",
    "description": "Free online Date & Time calculator. Add and subtract time, calculate work hours with breaks, elapsed time between two times/dates, convert time to decimal hours, working days, and USPS delivery date estimates."
  },
  "percentage-calculator": {
    "title": "Percentage Calculator – Calculate Percentages, Marks, CGPA, Attendance and More",
    "description": "Free online percentage calculator. Solve what is X% of Y, marks percentage, CGPA to percentage, salary hike, attendance target, body fat %, win rate, average %, and percentage increase/decrease."
  },
  "date-difference-calculator": {
    "title": "Date Difference Calculator - AI Free Calculator",
    "description": "Calculate exact duration between two dates in years, months, weeks, days, and total business days."
  },
  "side-drain-slab-boq-calculator": {
    "title": "Side Drain & Slab BOQ Calculator - Bill of Quantities",
    "description": "Calculate Bill of Quantities (BOQ) for open and covered drains: excavation, bed PCC, RCC walls, cover slab, steel rebar, and formwork shuttering."
  },
  "rcc-slab-steel-calculator": {
    "title": "RCC Slab Steel Calculator – Calculate Slab Reinforcement Steel Quantity",
    "description": "Free RCC slab steel calculator. Estimate reinforcement bar count, cutting length, main & distribution rebar weight in kg, quintals, tonnes, and concrete volume with BBS steps."
  },
  "slab-steel-shuttering-calculator": {
    "title": "Slab Steel & Shuttering Calculator - Formwork & Scaffolding Area",
    "description": "Estimate slab bottom soffit shuttering, side edge formwork, opening deductions, Acrow staging props count, and reinforcement steel quantity."
  },
  "rcc-beam-steel-calculator": {
    "title": "RCC Beam Steel Calculator - BBS Stirrups & Main Bars",
    "description": "Calculate RCC beam top & bottom main reinforcement rebar weight, stirrups ring cutting length, concrete volume, and shuttering formwork."
  },
  "rcc-column-steel-calculator": {
    "title": "RCC Column Steel Calculator - Vertical Rebar & Lateral Ties BBS",
    "description": "Calculate RCC column main vertical bars, lateral tie rings cutting length, total steel reinforcement weight, and concrete volume."
  },
  "rcc-footing-steel-calculator": {
    "title": "RCC Footing Steel Calculator - Foundation Mesh BBS & Excavation",
    "description": "Calculate RCC isolated pad footing mesh reinforcement steel weight, bar cutting length, pit excavation volume, and concrete requirements."
  },
  "steel-weight-calculator": {
    "title": "Steel Weight Calculator – Calculate Steel Weight in KG | AI Free Calculator",
    "description": "Free steel weight calculator in kg and tonnes. Calculate rebar weight (D²/162), round bars, steel plates, pipes, hollow sections, structural steel, and stainless steel."
  },
  "concrete-material-breakup-calculator": {
    "title": "Concrete Material Breakup Calculator – Cement, Sand & Aggregate Quantity | AI Free Calculator",
    "description": "Calculate the approximate quantity of cement, sand, aggregate, water, and cement bags required for a given volume of concrete."
  },
  "brickwork-calculator": {
    "title": "Brickwork & Mortar Calculator – Calculate Bricks, Cement & Sand | AI Free Calculator",
    "description": "Calculate the number of bricks, mortar volume, cement bags, sand quantities, and paving bricks required for walls and masonry projects with opening deductions and wastage analysis."
  },
  "plaster-calculator": {
    "title": "${tilePresetLabel}",
    "description": "Calculate plaster and mortar quantities, estimate cement and sand requirements, and use dedicated mortar tools for tile work and supported games."
  },
  "emi-calculator": {
    "title": "EMI Calculator – Home, Car, Personal & Bike Loan EMI",
    "description": "Calculate your monthly EMI, total interest, total repayment amount, and complete loan repayment schedule for home, car, personal, and bike loans."
  },
  "sip-calculator": {
    "title": "SIP Calculator – Calculate Monthly Investment Returns & Step-Up SIP",
    "description": "Estimate the potential future value of your monthly investments, compare regular and step-up contributions, and view your projected growth over time."
  },
  "income-tax-calculator": {
    "title": "Income Tax Calculator – Estimate Tax for India & US",
    "description": "Estimate your income tax based on your selected country, tax year, income, deductions, and applicable tax regime or filing status."
  },
  "gst-calculator": {
    "title": "GST Calculator – Add or Remove GST Online",
    "description": "Calculate GST on an amount, add GST to an exclusive price, or remove GST from an inclusive amount. View the GST amount and applicable tax breakdown instantly after calculation."
  },
  "simple-interest-calculator": {
    "title": "Simple Interest Calculator – Calculate Interest Online",
    "description": "Calculate simple interest, total interest, and the final amount based on your principal, interest rate, and investment or loan duration."
  },
  "compound-interest-calculator": {
    "title": "Compound Interest Calculator – Calculate Investment Growth",
    "description": "Calculate compound interest and estimate how your money may grow over time based on your initial investment, interest rate, duration, compounding frequency, and optional regular contributions."
  },
  "salary-calculator": {
    "title": "Salary & Take-Home Pay Calculator – Estimate Your In-Hand Salary",
    "description": "Estimate your monthly and annual take-home salary after accounting for salary components, taxes, and applicable deductions."
  },
  "mortgage-calculator": {
    "title": "Mortgage Loan Calculator – Estimate Your Monthly Payment",
    "description": "Estimate your monthly mortgage payment, total interest, and loan repayment schedule based on your home price, down payment, interest rate, and loan term."
  },
  "loan-calculator": {
    "title": "Personal Loan Calculator – Calculate EMI & Total Interest",
    "description": "Estimate your monthly loan payment, total interest, and repayment schedule based on your loan amount, interest rate, and repayment term."
  },
  "auto-loan-calculator": {
    "title": "Auto & Car Loan Calculator – Calculate EMI, Interest & Repayment",
    "description": "Estimate your monthly car loan payment, total interest, and repayment schedule based on your vehicle price, down payment, interest rate, and loan term."
  },
  "retirement-calculator": {
    "title": "Retirement Corpus Calculator – Calculate Your Retirement Savings Goal",
    "description": "Estimate how much money you may need for retirement based on your current expenses, retirement age, inflation, life expectancy, savings, and expected investment returns."
  },
  "amortization-calculator": {
    "title": "Loan Amortization Schedule Calculator – EMI, Interest & Repayment Table",
    "description": "Calculate your monthly loan payment, principal and interest breakdown, remaining balance, and complete loan amortization schedule."
  },
  "sales-tax-calculator": {
    "title": "Sales Tax Calculator – Calculate Tax, Total Price & Reverse Sales Tax",
    "description": "Calculate sales tax, total purchase cost, or the original price before tax using a custom or selected tax rate."
  },
  "discount-calculator": {
    "title": "Discount & Sale Price Calculator – Calculate Discount and Final Price",
    "description": "Calculate the discount amount, amount saved, and final sale price using a percentage or fixed discount."
  },
  "body-fat-calculator": {
    "title": "Body Fat Percentage Calculator – Accurate Navy & BMI Methods",
    "description": "Calculate your estimated body fat percentage, fat mass, and lean body mass using the validated U.S. Navy circumference and BMI methods."
  },
  "calorie-calculator": {
    "title": "Calorie Calculator – Calculate Daily Calories, Maintenance TDEE & Weight Goals",
    "description": "Estimate your daily calorie needs, maintenance calories (TDEE), and target calories for weight loss or muscle gain based on age, sex, height, weight, and activity level."
  },
  "bmr-calculator": {
    "title": "BMR Calculator – Calculate Basal Metabolic Rate for Men and Women",
    "description": "Estimate your basal metabolic rate (BMR) based on your age, sex, height, weight, and selected calculation formula."
  },
  "gpa-calculator": {
    "title": "GPA Calculator – College, High School & Cumulative GPA",
    "description": "Calculate your GPA, cumulative GPA, weighted GPA, unweighted GPA, and percentage-to-GPA conversions with customizable grading scales."
  },
  "scientific-calculator": {
    "title": "Scientific Calculator Online – Free Advanced Math & Engineering Tool",
    "description": "Use this online scientific calculator to perform basic arithmetic, trigonometric functions, logarithms, powers, roots, fractions, statistics, and other advanced mathematical calculations."
  },
  "fraction-calculator": {
    "title": "Fraction Calculator – Solve, Simplify and Convert Fractions",
    "description": "Free fraction calculator with step-by-step solutions. Add, subtract, multiply, and divide fractions, mixed numbers, decimal to fraction, fraction simplifier, and partial fraction decomposition."
  },
  "random-number-generator-calculator": {
    "title": "Random Number Generator – Generate Random Numbers Instantly",
    "description": "Free random number generator (RNG). Generate single or multiple random numbers, unique numbers with no repeats, spin an interactive random wheel, or pick from custom lists."
  },
  "standard-deviation-calculator": {
    "title": "Standard Deviation Calculator - AI Free Calculator",
    "description": "Calculate population and sample standard deviation, variance, mean, and sum of squares."
  },
  "category:finance": {
    "title": "Financial & Investment Calculators - AI Free Calculator",
    "description": "Smart financial calculation tools: Loan EMI, SIP mutual fund returns, Indian Income Tax (New vs Old regime), GST, Take-Home Salary, Compound Interest, and Retirement planning."
  },
  "category:construction": {
    "title": "Civil Construction & RCC BOQ Calculators - AI Free Calculator",
    "description": "Professional civil engineering calculators: RCC slab BBS, beam rebar, column steel, concrete mix breakup (M15/M20/M25), brickwork, plaster, and master house estimate BOQ."
  },
  "category:health": {
    "title": "Health, Fitness & Nutrition Calculators - AI Free Calculator",
    "description": "Free scientifically backed fitness & health calculators: Daily Calorie TDEE, BMR metabolic rate, and Body Fat Percentage calculator."
  },
  "category:math": {
    "title": "Mathematics & Statistics Calculators - AI Free Calculator",
    "description": "Free online academic & scientific math tools: GPA calculator, Standard Deviation & Variance, Scientific Calculator, Fraction Arithmetic, and Secure Random Number Generator."
  },
  "category:general": {
    "title": "General & Daily Calculators - AI Free Calculator",
    "description": "Free essential everyday calculators: Age calculator, BMI, Height & Weight converters, Time calculator, Date difference, and Percentage solver."
  },
  "core:home": {
    "title": "Free Online Calculators for Finance, Health, Construction & Math | AIFreeCalculator",
    "description": "Calculate loans, investments, civil engineering quantities, health biometrics, percentages, and scientific math with 42+ verified free online calculators."
  },
  "core:about": {
    "title": "About Us - AI Free Calculator",
    "description": "Learn about AI Free Calculator, our mission to provide precision calculation tools, verified engineering formulas, and private client-side computing."
  },
  "core:contact": {
    "title": "Contact Us - AI Free Calculator",
    "description": "Get in touch with the AI Free Calculator team. Submit feedback, report calculation bugs, request new custom calculators, or discuss partnerships directly with support@aifreecalculator.com."
  },
  "core:privacy-policy": {
    "title": "Privacy Policy - AI Free Calculator",
    "description": "Read our transparent Privacy Policy. Learn how AI Free Calculator protects your privacy, handles client-side computations, cookies, and advertising partners."
  },
  "core:terms": {
    "title": "Terms of Service & Conditions - AI Free Calculator",
    "description": "Terms of Service and Conditions of Use for AI Free Calculator. Learn your rights, permitted usage, disclaimers, and intellectual property terms."
  },
  "core:disclaimer": {
    "title": "Disclaimer - AI Free Calculator",
    "description": "Mathematical and estimation disclaimers for civil construction, tax computation, financial forecasting, and health guidelines."
  }
};

export function getLivePageMeta(key: string, fallbackName?: string, fallbackDesc?: string): PageMetaItem {
  const found = LIVE_PAGE_METADATA[key];
  if (found) {
    return found;
  }
  return {
    title: fallbackName ? `${fallbackName} - AI Free Calculator` : 'AI Free Calculator',
    description: fallbackDesc || 'Free online calculators for construction, finance, health, and math.',
  };
}
