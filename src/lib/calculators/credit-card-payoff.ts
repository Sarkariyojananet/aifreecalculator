/**
 * Credit Card Payoff & Debt Elimination Calculation Engine
 * High-precision financial logic tailored for US/UK/Canada & global credit card debt.
 */

export interface CreditCardPayoffInput {
  balance: number; // Current credit card balance ($)
  interestRate: number; // Annual Percentage Rate (APR %)
  paymentMode: 'fixed_payment' | 'target_months' | 'minimum_payment';
  monthlyPayment?: number; // Chosen fixed monthly payment ($)
  targetMonths?: number; // Desired months to become debt-free
  minimumPaymentPercent?: number; // Usually 2% to 3% of balance
  minimumPaymentFloor?: number; // Minimum dollar amount, usually $25 or $35
}

export interface CreditCardScheduleMonth {
  month: number;
  startingBalance: number;
  interestPaid: number;
  principalPaid: number;
  payment: number;
  endingBalance: number;
  totalInterestToDate: number;
}

export interface CreditCardPayoffResult {
  monthsToPayoff: number;
  yearsToPayoff: number;
  totalInterestPaid: number;
  totalAmountPaid: number;
  recommendedMonthlyPayment: number;
  isNeverEnding: boolean; // if payment <= interest
  schedule: CreditCardScheduleMonth[];
  minimumPaymentComparison?: {
    months: number;
    totalInterest: number;
    totalPaid: number;
    interestSaved: number;
    timeSavedMonths: number;
  };
}

export function calculateCreditCardPayoff(input: CreditCardPayoffInput): CreditCardPayoffResult {
  const {
    balance,
    interestRate,
    paymentMode,
    monthlyPayment = 0,
    targetMonths = 12,
    minimumPaymentPercent = 2.5,
    minimumPaymentFloor = 25,
  } = input;

  const monthlyRate = interestRate / 100 / 12;

  if (balance <= 0) {
    return {
      monthsToPayoff: 0,
      yearsToPayoff: 0,
      totalInterestPaid: 0,
      totalAmountPaid: 0,
      recommendedMonthlyPayment: 0,
      isNeverEnding: false,
      schedule: [],
    };
  }

  // 1. Target Months Mode: Solve for monthly payment
  if (paymentMode === 'target_months') {
    let paymentNeeded = 0;
    if (monthlyRate === 0) {
      paymentNeeded = balance / targetMonths;
    } else {
      paymentNeeded = (monthlyRate * balance) / (1 - Math.pow(1 + monthlyRate, -targetMonths));
    }

    const schedule = generateSchedule(balance, monthlyRate, paymentNeeded);
    const totalInterest = schedule.reduce((sum, item) => sum + item.interestPaid, 0);

    return {
      monthsToPayoff: targetMonths,
      yearsToPayoff: +(targetMonths / 12).toFixed(1),
      totalInterestPaid: Math.round(totalInterest * 100) / 100,
      totalAmountPaid: Math.round((balance + totalInterest) * 100) / 100,
      recommendedMonthlyPayment: Math.round(paymentNeeded * 100) / 100,
      isNeverEnding: false,
      schedule,
    };
  }

  // 2. Minimum Payment Mode
  if (paymentMode === 'minimum_payment') {
    let currBal = balance;
    let month = 0;
    let totalInterest = 0;
    const schedule: CreditCardScheduleMonth[] = [];
    const maxMonths = 600;

    while (currBal > 0.01 && month < maxMonths) {
      month++;
      const interest = currBal * monthlyRate;
      let payment = Math.max(currBal * (minimumPaymentPercent / 100), minimumPaymentFloor);

      if (payment > currBal + interest) {
        payment = currBal + interest;
      }

      const principal = payment - interest;
      if (principal <= 0) {
        return {
          monthsToPayoff: 999,
          yearsToPayoff: 99,
          totalInterestPaid: 999999,
          totalAmountPaid: 999999,
          recommendedMonthlyPayment: payment,
          isNeverEnding: true,
          schedule: [],
        };
      }

      currBal = currBal + interest - payment;
      totalInterest += interest;

      schedule.push({
        month,
        startingBalance: Math.round((currBal + payment - interest) * 100) / 100,
        interestPaid: Math.round(interest * 100) / 100,
        principalPaid: Math.round(principal * 100) / 100,
        payment: Math.round(payment * 100) / 100,
        endingBalance: Math.max(0, Math.round(currBal * 100) / 100),
        totalInterestToDate: Math.round(totalInterest * 100) / 100,
      });
    }

    return {
      monthsToPayoff: month,
      yearsToPayoff: +(month / 12).toFixed(1),
      totalInterestPaid: Math.round(totalInterest * 100) / 100,
      totalAmountPaid: Math.round((balance + totalInterest) * 100) / 100,
      recommendedMonthlyPayment: schedule[0]?.payment || minimumPaymentFloor,
      isNeverEnding: month >= maxMonths,
      schedule,
    };
  }

  // 3. Fixed Payment Mode
  const minInterestFirstMonth = balance * monthlyRate;
  if (monthlyPayment <= minInterestFirstMonth) {
    return {
      monthsToPayoff: 999,
      yearsToPayoff: 99,
      totalInterestPaid: 0,
      totalAmountPaid: 0,
      recommendedMonthlyPayment: Math.ceil(minInterestFirstMonth + 10),
      isNeverEnding: true,
      schedule: [],
    };
  }

  const schedule = generateSchedule(balance, monthlyRate, monthlyPayment);
  const totalInterest = schedule.reduce((sum, item) => sum + item.interestPaid, 0);
  const months = schedule.length;

  const minResult = calculateCreditCardPayoff({
    balance,
    interestRate,
    paymentMode: 'minimum_payment',
    minimumPaymentPercent,
    minimumPaymentFloor,
  });

  return {
    monthsToPayoff: months,
    yearsToPayoff: +(months / 12).toFixed(1),
    totalInterestPaid: Math.round(totalInterest * 100) / 100,
    totalAmountPaid: Math.round((balance + totalInterest) * 100) / 100,
    recommendedMonthlyPayment: monthlyPayment,
    isNeverEnding: false,
    schedule,
    minimumPaymentComparison: {
      months: minResult.monthsToPayoff,
      totalInterest: minResult.totalInterestPaid,
      totalPaid: minResult.totalAmountPaid,
      interestSaved: Math.max(0, Math.round((minResult.totalInterestPaid - totalInterest) * 100) / 100),
      timeSavedMonths: Math.max(0, minResult.monthsToPayoff - months),
    },
  };
}

function generateSchedule(
  initialBalance: number,
  monthlyRate: number,
  payment: number
): CreditCardScheduleMonth[] {
  let currBal = initialBalance;
  let month = 0;
  let totalInterest = 0;
  const schedule: CreditCardScheduleMonth[] = [];
  const maxMonths = 600;

  while (currBal > 0.01 && month < maxMonths) {
    month++;
    const interest = currBal * monthlyRate;
    let actualPayment = payment;

    if (currBal + interest < actualPayment) {
      actualPayment = currBal + interest;
    }

    const principal = actualPayment - interest;
    currBal = Math.max(0, currBal + interest - actualPayment);
    totalInterest += interest;

    schedule.push({
      month,
      startingBalance: Math.round((currBal + actualPayment - interest) * 100) / 100,
      interestPaid: Math.round(interest * 100) / 100,
      principalPaid: Math.round(principal * 100) / 100,
      payment: Math.round(actualPayment * 100) / 100,
      endingBalance: Math.round(currBal * 100) / 100,
      totalInterestToDate: Math.round(totalInterest * 100) / 100,
    });
  }

  return schedule;
}
