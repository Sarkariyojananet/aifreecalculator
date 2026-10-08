/**
 * Pure calculation & date engine for Monthly Time Table Maker
 * Uses Date.UTC and UTC methods to avoid DST and timezone shifts.
 * Handles full 1900-2100 range and 0-99 years safely.
 */

export type WeekStartDay = 'monday' | 'sunday';
export type DayFilter = 'all' | 'weekdays' | 'weekends';
export type DateFormat =
  | 'DD-MM-YYYY'
  | 'MM-DD-YYYY'
  | 'YYYY-MM-DD'
  | 'D MMMM YYYY'
  | 'DD MMMM YYYY';
export type TimetableView = 'calendar' | 'table' | 'fullyear';

export interface DayRecord {
  date: Date;
  dateStr: string; // YYYY-MM-DD format
  formattedDate: string;
  dayOfMonth: number;
  month: number; // 0-11
  monthName: string;
  year: number;
  dayOfWeekIndex: number; // 0 (Sun) - 6 (Sat)
  dayName: string;
  shortDayName: string;
  isWeekend: boolean;
  isToday: boolean;
  note?: string;
  isBlank?: boolean;
}

export interface MonthData {
  monthIndex: number; // 0-11
  monthName: string;
  shortMonthName: string;
  year: number;
  totalDays: number;
  days: DayRecord[];
  calendarWeeks: (DayRecord | null)[][];
}

export interface YearTimetableData {
  year: number;
  isLeapYear: boolean;
  totalDays: number;
  totalWeekdays: number;
  totalWeekends: number;
  months: MonthData[];
}

export const EN_LOCALE = {
  monthNames: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  shortMonthNames: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ],
  dayNames: [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ],
  shortDayNamesMondayStart: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  shortDayNamesSundayStart: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  dayTypes: {
    weekday: 'Weekday',
    weekend: 'Weekend'
  }
};

/**
 * Safely creates a UTC date handling year 0-99 correctly.
 */
export function createUTCDate(year: number, monthIndex: number, day: number): Date {
  const d = new Date(Date.UTC(2000, monthIndex, day));
  d.setUTCFullYear(year);
  return d;
}

/**
 * Checks if a given year is a leap year.
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Gets number of days in a given month.
 */
export function getDaysInMonth(year: number, monthIndex: number): number {
  const standardDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (monthIndex === 1) {
    return isLeapYear(year) ? 29 : 28;
  }
  return standardDays[monthIndex] || 31;
}

/**
 * Checks if a date falls on a weekend (Saturday or Sunday in UTC).
 */
export function isWeekend(dayOfWeekIndex: number): boolean {
  return dayOfWeekIndex === 0 || dayOfWeekIndex === 6;
}

/**
 * Formats a Date object using pure UTC values.
 */
export function formatDate(
  year: number,
  monthIndex: number,
  day: number,
  format: DateFormat = 'DD-MM-YYYY'
): string {
  const dd = String(day).padStart(2, '0');
  const mm = String(monthIndex + 1).padStart(2, '0');
  const yyyy = String(year);
  const monthName = EN_LOCALE.monthNames[monthIndex] || '';

  switch (format) {
    case 'MM-DD-YYYY':
      return `${mm}-${dd}-${yyyy}`;
    case 'YYYY-MM-DD':
      return `${yyyy}-${mm}-${dd}`;
    case 'D MMMM YYYY':
      return `${day} ${monthName} ${yyyy}`;
    case 'DD MMMM YYYY':
      return `${dd} ${monthName} ${yyyy}`;
    case 'DD-MM-YYYY':
    default:
      return `${dd}-${mm}-${yyyy}`;
  }
}

/**
 * Checks if a date matches today's date in local user time.
 */
export function checkIfToday(year: number, monthIndex: number, day: number): boolean {
  const now = new Date();
  return (
    now.getFullYear() === year &&
    now.getMonth() === monthIndex &&
    now.getDate() === day
  );
}

/**
 * Builds data for a single month.
 */
export function getMonthDays(
  year: number,
  monthIndex: number,
  weekStart: WeekStartDay = 'monday',
  dateFormat: DateFormat = 'DD-MM-YYYY',
  dayFilter: DayFilter = 'all',
  checkToday: boolean = false,
  notes: Record<string, string> = {}
): MonthData {
  const totalDays = getDaysInMonth(year, monthIndex);
  const monthName = EN_LOCALE.monthNames[monthIndex];
  const shortMonthName = EN_LOCALE.shortMonthNames[monthIndex];
  const days: DayRecord[] = [];

  for (let d = 1; d <= totalDays; d++) {
    const utcDate = createUTCDate(year, monthIndex, d);
    const dayOfWeek = utcDate.getUTCDay(); // 0 (Sun) to 6 (Sat)
    const weekend = isWeekend(dayOfWeek);
    const dateStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

    const matchFilter =
      dayFilter === 'all' ||
      (dayFilter === 'weekdays' && !weekend) ||
      (dayFilter === 'weekends' && weekend);

    if (matchFilter) {
      days.push({
        date: utcDate,
        dateStr,
        formattedDate: formatDate(year, monthIndex, d, dateFormat),
        dayOfMonth: d,
        month: monthIndex,
        monthName,
        year,
        dayOfWeekIndex: dayOfWeek,
        dayName: EN_LOCALE.dayNames[dayOfWeek],
        shortDayName: EN_LOCALE.dayNames[dayOfWeek].slice(0, 3),
        isWeekend: weekend,
        isToday: checkToday ? checkIfToday(year, monthIndex, d) : false,
        note: notes[dateStr] || ''
      });
    }
  }

  // 7-column Calendar Weeks Matrix
  const firstDayUTC = createUTCDate(year, monthIndex, 1).getUTCDay();
  const startOffset = weekStart === 'monday'
    ? (firstDayUTC === 0 ? 6 : firstDayUTC - 1)
    : firstDayUTC;

  const calendarWeeks: (DayRecord | null)[][] = [];
  let currentWeek: (DayRecord | null)[] = [];

  // Leading empty slots
  for (let i = 0; i < startOffset; i++) {
    currentWeek.push(null);
  }

  for (let d = 1; d <= totalDays; d++) {
    const utcDate = createUTCDate(year, monthIndex, d);
    const dayOfWeek = utcDate.getUTCDay();
    const weekend = isWeekend(dayOfWeek);
    const dateStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

    const dayRecord: DayRecord = {
      date: utcDate,
      dateStr,
      formattedDate: formatDate(year, monthIndex, d, dateFormat),
      dayOfMonth: d,
      month: monthIndex,
      monthName,
      year,
      dayOfWeekIndex: dayOfWeek,
      dayName: EN_LOCALE.dayNames[dayOfWeek],
      shortDayName: EN_LOCALE.dayNames[dayOfWeek].slice(0, 3),
      isWeekend: weekend,
      isToday: checkToday ? checkIfToday(year, monthIndex, d) : false,
      note: notes[dateStr] || ''
    };

    currentWeek.push(dayRecord);

    if (currentWeek.length === 7) {
      calendarWeeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // Trailing empty slots
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    calendarWeeks.push(currentWeek);
  }

  return {
    monthIndex,
    monthName,
    shortMonthName,
    year,
    totalDays,
    days,
    calendarWeeks
  };
}

/**
 * Builds the complete 12-month year timetable dataset.
 */
export function buildYear(
  year: number,
  weekStart: WeekStartDay = 'monday',
  dateFormat: DateFormat = 'DD-MM-YYYY',
  dayFilter: DayFilter = 'all',
  checkToday: boolean = false,
  notes: Record<string, string> = {}
): YearTimetableData {
  const safeYear = Math.max(1900, Math.min(2100, Math.floor(year) || new Date().getFullYear()));
  const months: MonthData[] = [];
  let totalDays = 0;
  let totalWeekdays = 0;
  let totalWeekends = 0;

  for (let m = 0; m < 12; m++) {
    const mData = getMonthDays(safeYear, m, weekStart, dateFormat, dayFilter, checkToday, notes);
    months.push(mData);

    for (const d of mData.days) {
      totalDays++;
      if (d.isWeekend) {
        totalWeekends++;
      } else {
        totalWeekdays++;
      }
    }
  }

  return {
    year: safeYear,
    isLeapYear: isLeapYear(safeYear),
    totalDays,
    totalWeekdays,
    totalWeekends,
    months
  };
}

/**
 * Generates Calendar Grid structured CSV with 7 columns per month and notes.
 */
export function generateCalendarCSV(
  yearData: YearTimetableData,
  selectedMonth: number | number[] | 'all' = 'all',
  weekStart: WeekStartDay = 'monday',
  notes: Record<string, string> = {}
): string {
  const rows: string[] = [];
  const headers = weekStart === 'monday'
    ? EN_LOCALE.shortDayNamesMondayStart
    : EN_LOCALE.shortDayNamesSundayStart;

  let monthsToInclude: MonthData[] = [];
  if (selectedMonth === 'all') {
    monthsToInclude = yearData.months;
  } else if (Array.isArray(selectedMonth)) {
    monthsToInclude = selectedMonth.map(idx => yearData.months[idx]).filter(Boolean);
  } else {
    monthsToInclude = [yearData.months[selectedMonth]].filter(Boolean);
  }

  monthsToInclude.forEach((m, mIdx) => {
    if (mIdx > 0) {
      rows.push('');
      rows.push('');
    }

    // Month Title Banner
    rows.push([`"${m.monthName} ${m.year}"`, '', '', '', '', '', ''].join(','));
    // 7-column weekday headers
    rows.push(headers.map(h => `"${h}"`).join(','));

    // Calendar Weeks Matrix
    m.calendarWeeks.forEach(week => {
      // Day numbers row
      const numRow = week.map(cell => {
        if (!cell) return '""';
        return `"${cell.dayOfMonth}"`;
      });
      rows.push(numRow.join(','));

      // Notes sub-row (if any day in this week has notes)
      const hasAnyNoteInWeek = week.some(cell => cell && (notes[cell.dateStr] || cell.note));
      if (hasAnyNoteInWeek) {
        const noteRow = week.map(cell => {
          if (!cell) return '""';
          const n = (notes[cell.dateStr] || cell.note || '').trim();
          return n ? `"[• ${n.replace(/"/g, '""')}]"` : '""';
        });
        rows.push(noteRow.join(','));
      }
    });
  });

  // Prepend UTF-8 BOM
  return '﻿' + rows.join('\r\n');
}

/**
 * Generates Tabular CSV format.
 */
export function generateTimetableCSV(
  yearData: YearTimetableData,
  selectedMonth: number | number[] | 'all' = 'all',
  dayFilter: DayFilter = 'all',
  dateFormat: DateFormat = 'DD-MM-YYYY',
  notes: Record<string, string> = {}
): string {
  const rows: string[] = [];
  // Standard header with Notes column
  rows.push(['Date', 'Day', 'Month', 'Year', 'Type', 'Notes / Schedule'].join(','));

  let monthsToInclude: MonthData[] = [];
  if (selectedMonth === 'all') {
    monthsToInclude = yearData.months;
  } else if (Array.isArray(selectedMonth)) {
    monthsToInclude = selectedMonth.map(idx => yearData.months[idx]).filter(Boolean);
  } else {
    monthsToInclude = [yearData.months[selectedMonth]].filter(Boolean);
  }

  for (const m of monthsToInclude) {
    for (const d of m.days) {
      const type = d.isWeekend ? 'Weekend' : 'Weekday';
      const noteText = (notes[d.dateStr] || d.note || '').replace(/"/g, '""');
      const escapedDate = `"${d.formattedDate}"`;
      const escapedDay = `"${d.dayName}"`;
      const escapedMonth = `"${m.monthName}"`;
      const escapedNotes = `"${noteText}"`;
      rows.push([escapedDate, escapedDay, escapedMonth, d.year, type, escapedNotes].join(','));
    }
  }

  // Prepend UTF-8 BOM
  return '﻿' + rows.join('\r\n');
}
