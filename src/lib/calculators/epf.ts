/**
 * Employees' Provident Fund (EPF) Calculation Engine
 * Conforms to EPFO (Employees' Provident Fund Organisation) rules in India.
 *
 * Rules:
 * - Employee EPF: 12% of Basic Salary + DA.
 * - Employer Contribution: 3.67% to EPF + 8.33% to EPS (capped at ₹1,250/mo under ₹15k wage ceiling).
 * - EPFO Benchmark Interest Rate: 8.25% p.a. (compounded annually).
 * - Standard Retirement Age: 58 Years.
 */

export interface EpfCalculationInput {
  currentAge: number; // e.g. 25 to 55
  retirementAge?: number; // default 58
  monthlyBasicSalary: number; // Basic + DA (₹)
  currentEpfBalance?: number; // ₹ (existing corpus)
  employeeContributionPercent?: number; // default 12%
  employerContributionPercent?: number; // default 3.67% (EPF share)
  annualSalaryIncrementPercent?: number; // e.g. 5% to 10%
  annualInterestRate?: number; // default 8.25%
}

export interface EpfYearRow {
  yearNumber: number;
  age: number;
  monthlyBasicSalary: number;
  employeeYearlyContribution: number;
  employerYearlyContribution: number;
  totalYearlyContribution: number;
  interestEarned: number;
  endingBalance: number;
}

export interface EpfCalculationResult {
  totalEmployeeContribution: number;
  totalEmployerContribution: number;
  totalContributions: number;
  totalInterestEarned: number;
  finalCorpus: number;
  yearsToRetirement: number;
  schedule: EpfYearRow[];
}

export function calculateEpf(input: EpfCalculationInput): EpfCalculationResult {
  const {
    currentAge,
    retirementAge = 58,
    monthlyBasicSalary,
    currentEpfBalance = 0,
    employeeContributionPercent = 12,
    employerContributionPercent = 3.67,
    annualSalaryIncrementPercent = 7,
    annualInterestRate = 8.25,
  } = input;

  const totalYears = Math.max(1, retirementAge - currentAge);
  const monthlyRate = annualInterestRate / 100 / 12;

  let balance = currentEpfBalance;
  let currentMonthlySalary = monthlyBasicSalary;
  let totalEmployeeContrib = 0;
  let totalEmployerContrib = 0;
  let totalInterest = 0;
  const schedule: EpfYearRow[] = [];

  for (let yr = 1; yr <= totalYears; yr++) {
    const age = currentAge + yr;
    let yearlyEmployee = 0;
    let yearlyEmployer = 0;
    let yearlyInterest = 0;

    // Monthly compounding accumulation as contributions occur monthly
    for (let m = 1; m <= 12; m++) {
      const empMonthly = currentMonthlySalary * (employeeContributionPercent / 100);
      const emplyrMonthly = currentMonthlySalary * (employerContributionPercent / 100);
      const totalMonthlyContrib = empMonthly + emplyrMonthly;

      yearlyEmployee += empMonthly;
      yearlyEmployer += emplyrMonthly;

      balance += totalMonthlyContrib;
      const mInterest = balance * monthlyRate;
      yearlyInterest += mInterest;
      balance += mInterest;
    }

    totalEmployeeContrib += yearlyEmployee;
    totalEmployerContrib += yearlyEmployer;
    totalInterest += yearlyInterest;

    schedule.push({
      yearNumber: yr,
      age,
      monthlyBasicSalary: Math.round(currentMonthlySalary),
      employeeYearlyContribution: Math.round(yearlyEmployee),
      employerYearlyContribution: Math.round(yearlyEmployer),
      totalYearlyContribution: Math.round(yearlyEmployee + yearlyEmployer),
      interestEarned: Math.round(yearlyInterest),
      endingBalance: Math.round(balance),
    });

    // Apply annual salary increment for next year
    currentMonthlySalary *= 1 + annualSalaryIncrementPercent / 100;
  }

  return {
    totalEmployeeContribution: Math.round(totalEmployeeContrib),
    totalEmployerContribution: Math.round(totalEmployerContrib),
    totalContributions: Math.round(totalEmployeeContrib + totalEmployerContrib),
    totalInterestEarned: Math.round(totalInterest),
    finalCorpus: Math.round(balance),
    yearsToRetirement: totalYears,
    schedule,
  };
}
