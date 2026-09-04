/**
 * Centralized Live Page Metadata Catalog
 * Keeps /admin/seo/bulk/, audit-engine.ts, and real-time live Astro pages in 100% perfect sync.
 * Clean, simple, professional titles (50-60 chars) and meta descriptions (130-155 chars).
 */

export interface PageMetaItem {
  title: string;
  description: string;
}

export const LIVE_PAGE_METADATA: Record<string, PageMetaItem> = {
  "bmi-calculator": {
    "title": "BMI Calculator - Check Body Mass Index & Weight Status",
    "description": "Calculate your Body Mass Index (BMI), healthy weight range, and body classification using metric (kg/cm) or imperial (lbs/feet) measurements."
  },
  "age-calculator": {
    "title": "Age Calculator - Calculate Exact Age from Date of Birth",
    "description": "Calculate your exact age in years, months, weeks, days, and hours from your birth date, with a live countdown to your next upcoming birthday."
  },
  "height-calculator": {
    "title": "Height Converter - Convert Feet, Inches, CM & Meters",
    "description": "Convert height instantly between centimeters, meters, feet, and inches with standard percentile charts and quick unit conversion reference."
  },
  "weight-calculator": {
    "title": "Weight Converter - Convert KG, Lbs, Grams & Ounces",
    "description": "Convert weight and mass between kilograms (kg), pounds (lbs), grams (g), ounces (oz), stones, metric tons, and Troy ounces for precious metals."
  },
  "time-calculator": {
    "title": "Time Calculator - Add, Subtract & Calculate Work Hours",
    "description": "Add or subtract time, calculate elapsed work hours with break deductions, and convert hours, minutes, and seconds to decimal values online."
  },
  "percentage-calculator": {
    "title": "Percentage Calculator - Quick Percentage & Math Solver",
    "description": "Calculate percentage increase, decrease, marks percentage, discounts, CGPA to percentage, and find what percent one number is of another."
  },
  "date-difference-calculator": {
    "title": "Date Difference Calculator - Days Between Two Dates",
    "description": "Calculate the exact duration between two dates in total days, weeks, months, years, and working business days with weekend exclusion."
  },
  "side-drain-slab-boq-calculator": {
    "title": "Side Drain & Slab BOQ Calculator - Drain Quantity Estimator",
    "description": "Calculate Bill of Quantities (BOQ) for open and covered drains, including excavation volume, PCC bed, RCC walls, slab cover, and steel rebar."
  },
  "rcc-slab-steel-calculator": {
    "title": "RCC Slab Steel Calculator - Bar Bending Schedule & Rebar",
    "description": "Calculate main and distribution steel rebar weight in kg and quintals, bar cutting lengths, and concrete volume for RCC roof and floor slabs."
  },
  "slab-steel-shuttering-calculator": {
    "title": "Slab Shuttering & Formwork Calculator - Area & Props",
    "description": "Estimate bottom soffit shuttering area, side edge formwork, Acrow staging props count, and reinforcement steel quantity for slab construction."
  },
  "rcc-beam-steel-calculator": {
    "title": "RCC Beam Steel Calculator - Main Rebar & Stirrups BBS",
    "description": "Calculate top and bottom longitudinal rebar weight, stirrup ring cutting lengths, concrete volume, and shuttering area for RCC beams."
  },
  "rcc-column-steel-calculator": {
    "title": "RCC Column Steel Calculator - Vertical Bars & Lateral Ties",
    "description": "Calculate main vertical reinforcement rebar weight, lateral tie ring cutting lengths, and concrete volume for rectangular and circular columns."
  },
  "rcc-footing-steel-calculator": {
    "title": "RCC Footing Steel Calculator - Foundation Mesh & Rebar",
    "description": "Calculate reinforcement steel mesh weight, rebar cutting length, pit excavation volume, and concrete requirements for isolated pad footings."
  },
  "steel-weight-calculator": {
    "title": "Steel Weight Calculator - Calculate Rebar, Plate & Pipe KG",
    "description": "Calculate unit weight of steel rebar using the D²/162 formula, round bars, square bars, flat plates, hollow pipes, and structural steel sections."
  },
  "concrete-material-breakup-calculator": {
    "title": "Concrete Mix Calculator - Cement, Sand & Aggregate Bags",
    "description": "Calculate the required number of cement bags, sand volume in cubic feet or tons, aggregate quantity, and water ratio for M15, M20, M25 concrete."
  },
  "brickwork-calculator": {
    "title": "Brickwork Calculator - Calculate Bricks, Mortar & Cement",
    "description": "Calculate the number of standard red bricks, fly ash bricks, mortar volume, and cement-sand bags needed for 4-inch and 9-inch wall masonry."
  },
  "plaster-calculator": {
    "title": "Plastering Calculator - Cement & Sand Quantity Estimator",
    "description": "Calculate the required cement bags and sand volume for internal and external wall plastering across 1:3, 1:4, 1:5, and 1:6 mix ratios."
  },
  "emi-calculator": {
    "title": "EMI Calculator - Calculate Home, Car & Personal Loan EMI",
    "description": "Calculate monthly loan EMI, total interest payable, and view the complete amortization repayment schedule for home, car, and personal loans."
  },
  "sip-calculator": {
    "title": "SIP Calculator - Mutual Fund Return & Growth Estimator",
    "description": "Calculate expected returns on mutual fund SIP investments, total wealth created, and projected growth with regular and step-up monthly contributions."
  },
  "income-tax-calculator": {
    "title": "Income Tax Calculator - Old vs New Tax Regime Slabs",
    "description": "Calculate your income tax liability, compare Old vs New tax regimes, and estimate deductions under Section 80C, 80D, and standard deductions."
  },
  "gst-calculator": {
    "title": "GST Calculator - Add or Remove GST with CGST & SGST Split",
    "description": "Calculate GST amount online. Add GST to exclusive prices or remove GST from inclusive totals with 5%, 12%, 18%, and 28% CGST and SGST tax splits."
  },
  "simple-interest-calculator": {
    "title": "Simple Interest Calculator - Principal & Interest Return",
    "description": "Calculate simple interest, total interest earned, and final maturity amount based on principal, annual interest rate, and time duration in years."
  },
  "compound-interest-calculator": {
    "title": "Compound Interest Calculator - Investment Growth Online",
    "description": "Calculate compound interest with annual, semi-annual, quarterly, or monthly compounding, regular deposits, and total maturity wealth growth."
  },
  "salary-calculator": {
    "title": "Salary Calculator - In-Hand Take Home Pay & Deductions",
    "description": "Calculate your monthly in-hand take-home salary from annual CTC after EPF, professional tax, income tax, and standard salary component deductions."
  },
  "mortgage-calculator": {
    "title": "Mortgage Calculator - Monthly Payment & Amortization",
    "description": "Calculate your monthly mortgage payment, total interest, property tax, and loan payoff schedule based on home purchase price and down payment."
  },
  "loan-calculator": {
    "title": "Personal Loan Calculator - Monthly Payment & Interest",
    "description": "Calculate monthly loan payments, total borrowing cost, and interest breakdown based on principal amount, interest rate, and repayment tenure."
  },
  "auto-loan-calculator": {
    "title": "Auto Loan Calculator - Monthly Car Payment & Interest",
    "description": "Calculate monthly car loan payments, total interest cost, and amortization schedule based on vehicle price, trade-in, and interest rate."
  },
  "retirement-calculator": {
    "title": "Retirement Calculator - Pension & Retirement Corpus Goal",
    "description": "Estimate the retirement savings corpus needed based on your current age, monthly expenses, expected inflation, and post-retirement longevity."
  },
  "amortization-calculator": {
    "title": "Loan Amortization Calculator - Full Schedule Breakdown",
    "description": "Generate a full monthly and yearly loan amortization schedule showing principal reduction, interest breakdown, and remaining loan balance."
  },
  "sales-tax-calculator": {
    "title": "Sales Tax Calculator - Calculate State & Local Tax Amount",
    "description": "Calculate total purchase cost with sales tax, or reverse calculate the pre-tax price from gross total using state and local sales tax rates."
  },
  "discount-calculator": {
    "title": "Discount Calculator - Final Sale Price & Savings Amount",
    "description": "Calculate final discounted price, total amount saved, and percentage discount on sale items with single or double stacked discount rates."
  },
  "body-fat-calculator": {
    "title": "Body Fat Calculator - US Navy Body Fat Percentage Method",
    "description": "Estimate body fat percentage, lean body mass, and fat mass using verified US Navy circumference measurements and body mass index formulas."
  },
  "calorie-calculator": {
    "title": "Calorie Calculator - Daily Calorie Intake & TDEE Needs",
    "description": "Calculate your daily maintenance calories (TDEE) and target calories for weight loss, maintenance, or muscle gain based on your activity level."
  },
  "bmr-calculator": {
    "title": "BMR Calculator - Basal Metabolic Rate for Men & Women",
    "description": "Calculate your Basal Metabolic Rate (BMR) using Mifflin-St Jeor and Harris-Benedict formulas to find resting daily calorie expenditure."
  },
  "gpa-calculator": {
    "title": "GPA Calculator - High School & College Semester GPA",
    "description": "Calculate your semester GPA, cumulative CGPA, weighted, and unweighted grade point average with customizable grade scales and credit hours."
  },
  "scientific-calculator": {
    "title": "Scientific Calculator - Advanced Math Functions Online",
    "description": "Free online scientific calculator for trigonometry, logarithms, powers, square roots, parentheses expressions, and engineering calculations."
  },
  "fraction-calculator": {
    "title": "Fraction Calculator - Add, Subtract & Simplify Fractions",
    "description": "Add, subtract, multiply, and divide fractions, mixed numbers, and improper fractions with step-by-step solutions and decimal conversion."
  },
  "random-number-generator-calculator": {
    "title": "Random Number Generator - Pick Numbers & Custom Draws",
    "description": "Generate single or multiple random numbers within a custom range, draw unique non-repeating numbers, and pick random items from custom lists."
  },
  "standard-deviation-calculator": {
    "title": "Standard Deviation Calculator - Variance & Sample Math",
    "description": "Calculate sample standard deviation, population standard deviation, variance, mean, and sum of squares for any dataset with step solutions."
  },
  "category:general": {
    "title": "General Calculators - Everyday Conversion & Math Tools",
    "description": "Free daily calculation tools: Age calculator, BMI, Height and Weight converters, Time calculator, Date difference, and Percentage math."
  },
  "category:construction": {
    "title": "Construction Calculators - Civil Engineering & BOQ Tools",
    "description": "Civil engineering and construction tools: RCC slab steel, beam rebar BBS, column ties, concrete mix design, brickwork, and plastering."
  },
  "category:finance": {
    "title": "Finance Calculators - Loans, Tax, SIP & Investment Tools",
    "description": "Smart financial planning tools: Loan EMI, SIP mutual fund returns, Indian income tax slabs, GST, in-hand salary, and retirement corpus."
  },
  "category:health": {
    "title": "Health Calculators - Body Fat, BMI, Calorie & BMR Tools",
    "description": "Scientifically verified health and fitness tools: Daily calorie TDEE, BMR metabolic rate, Body Fat percentage, and BMI healthy weight range."
  },
  "category:math": {
    "title": "Math Calculators - GPA, Fractions, Scientific & Statistics",
    "description": "Academic and scientific math tools: GPA calculator, Scientific Calculator, Fraction math, Standard Deviation variance, and Random Numbers."
  },
  "core:home": {
    "title": "Free Online Calculators - Finance, Health, Construction & Math",
    "description": "Use 42+ free online calculators for loan EMI, SIP returns, Indian income tax, RCC construction steel, BMI, calorie TDEE, percentages, and scientific math."
  },
  "core:about": {
    "title": "About Us - AI Free Calculator Mission & Methodology",
    "description": "Learn about AI Free Calculator, our mission to deliver fast, private, browser-based calculation engines and verified mathematical formulas."
  },
  "core:contact": {
    "title": "Contact Us - AI Free Calculator Support & Feedback",
    "description": "Contact the AI Free Calculator team for calculation questions, tool suggestions, feedback, bug reports, and technical support assistance."
  },
  "core:privacy-policy": {
    "title": "Privacy Policy - AI Free Calculator Data Protection",
    "description": "Read our Privacy Policy to understand how we protect visitor privacy with client-side processing, zero server data storage, and cookie safety."
  },
  "core:terms": {
    "title": "Terms of Service - AI Free Calculator Conditions of Use",
    "description": "Read the Terms of Service for AI Free Calculator covering usage guidelines, tool accuracy disclaimers, and intellectual property terms."
  },
  "core:disclaimer": {
    "title": "Disclaimer - AI Free Calculator Accuracy & Estimates",
    "description": "Review estimation disclaimers for civil construction BOQs, financial projections, income tax computations, and health biometric indicators."
  },
  "core:all-calculators": {
    "title": "All Calculators Directory (42+ Free Tools) - AI Free Calculator",
    "description": "Browse the complete directory of free online calculators for loan EMI, SIP returns, construction BOQ, steel rebar, BMI, calories, math, and everyday tasks."
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
