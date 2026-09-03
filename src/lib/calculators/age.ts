/**
 * Age & Date of Birth Calculation Engine
 */

export interface AgeInput {
  birthDate: string; // YYYY-MM-DD
  targetDate?: string; // default today
}

export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  nextBirthdayDays: number;
  dayOfWeekBorn: string;
}

export function calculateAge(input: AgeInput): AgeResult {
  const birth = new Date(input.birthDate);
  const target = input.targetDate ? new Date(input.targetDate) : new Date();

  if (isNaN(birth.getTime())) {
    throw new Error('Invalid birth date provided.');
  }

  if (birth > target) {
    throw new Error('Birth date cannot be in the future.');
  }

  let years = target.getFullYear() - birth.getFullYear();
  let months = target.getMonth() - birth.getMonth();
  let days = target.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const prevMonthDays = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
    days += prevMonthDays;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const diffMs = target.getTime() - birth.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;
  const totalSeconds = totalMinutes * 60;

  // Next birthday calculation
  const nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday < target) {
    nextBirthday.setFullYear(target.getFullYear() + 1);
  }
  const nextBirthdayDays = Math.ceil((nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeekBorn = daysOfWeek[birth.getDay()];

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalHours,
    totalMinutes,
    totalSeconds,
    nextBirthdayDays,
    dayOfWeekBorn,
  };
}
