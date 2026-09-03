/**
 * Date Difference & Working Days Calculation Engine
 */

export interface DateDifferenceInput {
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  includeEndDate?: boolean;
  workingDays?: number[]; // [1, 2, 3, 4, 5] for Mon-Fri (0=Sun, 1=Mon... 6=Sat)
}

export interface DateDifferenceResult {
  totalDays: number;
  years: number;
  months: number;
  days: number;
  totalWeeks: number;
  remainingDays: number;
  businessDays: number;
  weekendDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  formattedSummary: string;
}

export function calculateDateDifference(input: DateDifferenceInput): DateDifferenceResult {
  const start = new Date(input.startDate + 'T00:00:00');
  const end = new Date(input.endDate + 'T00:00:00');

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('Invalid dates provided.');
  }

  const isReverse = end < start;
  const early = isReverse ? end : start;
  const late = isReverse ? start : end;

  let totalDays = Math.round((late.getTime() - early.getTime()) / (1000 * 60 * 60 * 24));
  if (input.includeEndDate) {
    totalDays += 1;
  }

  // Calculate Years, Months, Days breakdown
  let years = late.getFullYear() - early.getFullYear();
  let months = late.getMonth() - early.getMonth();
  let days = late.getDate() - early.getDate();

  if (days < 0) {
    months--;
    const prevMonthDays = new Date(late.getFullYear(), late.getMonth(), 0).getDate();
    days += prevMonthDays;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Calculate working days vs non-working days
  // Default working days: Mon(1), Tue(2), Wed(3), Thu(4), Fri(5)
  const activeWorkDays = input.workingDays && input.workingDays.length > 0 ? input.workingDays : [1, 2, 3, 4, 5];

  let businessDays = 0;
  let weekendDays = 0;
  const cur = new Date(early);
  const finish = new Date(late);
  if (!input.includeEndDate) {
    finish.setDate(finish.getDate() - 1);
  }

  while (cur <= finish) {
    const dayOfWeek = cur.getDay();
    if (activeWorkDays.includes(dayOfWeek)) {
      businessDays++;
    } else {
      weekendDays++;
    }
    cur.setDate(cur.getDate() + 1);
  }

  const totalWeeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;
  const totalSeconds = totalMinutes * 60;

  let formattedParts = [];
  if (years > 0) formattedParts.push(`${years} Year${years > 1 ? 's' : ''}`);
  if (months > 0) formattedParts.push(`${months} Month${months > 1 ? 's' : ''}`);
  if (days > 0) formattedParts.push(`${days} Day${days > 1 ? 's' : ''}`);
  const formattedSummary = formattedParts.length > 0 ? formattedParts.join(', ') : `${totalDays} Days`;

  return {
    totalDays,
    years,
    months,
    days,
    totalWeeks,
    remainingDays,
    businessDays,
    weekendDays,
    totalHours,
    totalMinutes,
    totalSeconds,
    formattedSummary,
  };
}
