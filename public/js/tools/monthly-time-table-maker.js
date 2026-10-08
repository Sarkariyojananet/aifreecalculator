/**
 * Monthly Time Table Maker - Interactive Client Engine
 * - Multi-Calendar & Multi-Month Selection (Individual chips, Quarters, Semesters, All Year)
 * - Clickable Date-Wise Saved Notes (Click to open/edit, quick delete, localStorage sync)
 * - Show / Hide Weekdays & Weekends Toggles
 * - Clean URL handling (No long query params for default values)
 * - Layout-Matched Print / PDF (Prints only active selected calendars)
 * - Pure UTC Date engine for 1900-2100 (Safe Leap Years and 0-99 years)
 */

(function () {
  'use strict';

  // Locale constants
  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const SHORT_MONTH_NAMES = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const DAY_NAMES = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];
  const SHORT_DAYS_MON = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const SHORT_DAYS_SUN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Application State
  const now = new Date();
  const currentActualYear = now.getFullYear();
  const currentActualMonth = now.getMonth();
  const currentActualDay = now.getDate();

  const state = {
    year: currentActualYear,
    // Array of selected month indices 0-11. Default: all 12 months
    selectedMonths: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    view: 'calendar', // 'calendar' | 'table' | 'fullyear'
    showWeekdays: true,
    showWeekends: true,
    weekStart: 'sunday', // 'monday' | 'sunday'
    dateFormat: 'DD-MM-YYYY',
    notes: {} // Key: "YYYY-MM-DD", Value: "note string"
  };

  // Helper: compute active day filter
  function getDayFilter() {
    if (state.showWeekdays && state.showWeekends) return 'all';
    if (state.showWeekdays && !state.showWeekends) return 'weekdays';
    if (!state.showWeekdays && state.showWeekends) return 'weekends';
    return 'all';
  }

  // Load Notes from LocalStorage
  function loadNotes() {
    try {
      const saved = localStorage.getItem('mttm_date_notes');
      if (saved) {
        state.notes = JSON.parse(saved) || {};
        let changed = false;
        Object.keys(state.notes).forEach(dateStr => {
          const notes = getNotes(dateStr);
          if (notes.length > 0) {
            state.notes[dateStr] = notes;
          } else {
            delete state.notes[dateStr];
          }
          changed = true;
        });
        if (changed) {
          saveNotesToStorage();
        }
      }
    } catch (e) {
      console.warn('Failed to load notes from localStorage', e);
      state.notes = {};
    }
  }

  function saveNotesToStorage() {
    try {
      localStorage.setItem('mttm_date_notes', JSON.stringify(state.notes));
    } catch (e) {
      console.warn('Failed to save notes to localStorage', e);
    }
  }

  function normalizeNoteItem(raw, idx = 0) {
    if (!raw) return null;
    if (typeof raw === 'string') {
      const trimmed = raw.trim();
      if (!trimmed) return null;
      if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
        try {
          const parsed = JSON.parse(trimmed);
          if (parsed && typeof parsed.text === 'string' && parsed.text.trim()) {
            return {
              id: parsed.id || `n_${Date.now()}_${idx}`,
              text: parsed.text.trim(),
              size: parsed.size || 'normal',
              color: parsed.color || 'amber',
              bold: Boolean(parsed.bold),
              italic: Boolean(parsed.italic)
            };
          }
        } catch (e) {}
      }
      return {
        id: `n_leg_${idx}`,
        text: trimmed,
        size: 'normal',
        color: 'amber',
        bold: false,
        italic: false
      };
    }
    if (typeof raw === 'object') {
      const text = (raw.text || '').trim();
      if (!text) return null;
      return {
        id: raw.id || `n_item_${idx}`,
        text: text,
        size: raw.size || 'normal',
        color: raw.color || 'amber',
        bold: Boolean(raw.bold),
        italic: Boolean(raw.italic)
      };
    }
    return null;
  }

  function getNotes(dateStr) {
    const raw = state.notes[dateStr];
    if (!raw) return [];
    let list = [];
    if (Array.isArray(raw)) {
      list = raw.map((it, idx) => normalizeNoteItem(it, idx)).filter(Boolean);
    } else if (typeof raw === 'string') {
      const trimmed = raw.trim();
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        try {
          const arr = JSON.parse(trimmed);
          if (Array.isArray(arr)) {
            list = arr.map((it, idx) => normalizeNoteItem(it, idx)).filter(Boolean);
          }
        } catch (e) {}
      }
      if (list.length === 0) {
        const norm = normalizeNoteItem(trimmed, 0);
        if (norm) list = [norm];
      }
    } else if (typeof raw === 'object') {
      const norm = normalizeNoteItem(raw, 0);
      if (norm) list = [norm];
    }

    // Keep state.notes[dateStr] synced with stable array
    if (!Array.isArray(raw) || list.some((it, idx) => !raw[idx] || raw[idx].id !== it.id)) {
      state.notes[dateStr] = list;
    }
    return list;
  }

  function parseNoteData(raw) {
    if (!raw) return { text: '', size: 'normal', color: 'amber', bold: false, italic: false };
    const norm = normalizeNoteItem(raw);
    return norm || { text: '', size: 'normal', color: 'amber', bold: false, italic: false };
  }

  function getNote(dateStr) {
    const list = getNotes(dateStr);
    return list[0] || { text: '', size: 'normal', color: 'amber', bold: false, italic: false };
  }

  function addNote(dateStr, noteData) {
    const text = (noteData.text || '').trim();
    if (!text) return;
    const existing = getNotes(dateStr);
    const newNote = {
      id: `n_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      text: text,
      size: noteData.size || 'normal',
      color: noteData.color || 'amber',
      bold: Boolean(noteData.bold),
      italic: Boolean(noteData.italic)
    };
    state.notes[dateStr] = [...existing, newNote];
    saveNotesToStorage();
    render();
    renderDedicatedNotesList();
  }

  function updateNote(dateStr, noteId, updatedData) {
    const existing = getNotes(dateStr);
    const idx = existing.findIndex(n => n.id === noteId);
    if (idx === -1) {
      addNote(dateStr, updatedData);
      return;
    }
    const text = (updatedData.text || '').trim();
    if (!text) {
      deleteNoteItem(dateStr, noteId);
      return;
    }
    existing[idx] = {
      ...existing[idx],
      text: text,
      size: updatedData.size || existing[idx].size,
      color: updatedData.color || existing[idx].color,
      bold: Boolean(updatedData.bold),
      italic: Boolean(updatedData.italic)
    };
    state.notes[dateStr] = existing;
    saveNotesToStorage();
    render();
    renderDedicatedNotesList();
  }

  function deleteNoteItem(dateStr, noteId) {
    const existing = getNotes(dateStr);
    const filtered = existing.filter((n, idx) => {
      if (noteId === undefined || noteId === null) return false;
      return String(n.id) !== String(noteId) && String(idx) !== String(noteId);
    });
    if (filtered.length > 0) {
      state.notes[dateStr] = filtered;
    } else {
      delete state.notes[dateStr];
    }
    saveNotesToStorage();
    render();
    renderDedicatedNotesList();
    if (currentEditingDateStr === dateStr) {
      renderNoteModalExistingNotes();
    }
  }

  function deleteAllNotesForDate(dateStr) {
    delete state.notes[dateStr];
    saveNotesToStorage();
    render();
    renderDedicatedNotesList();
  }

  function setNote(dateStr, text, options = {}) {
    const trimmed = (text || '').trim();
    if (trimmed) {
      state.notes[dateStr] = [{
        id: `n_${Date.now()}`,
        text: trimmed,
        size: options.size || 'normal',
        color: options.color || 'amber',
        bold: Boolean(options.bold),
        italic: Boolean(options.italic)
      }];
    } else {
      delete state.notes[dateStr];
    }
    saveNotesToStorage();
    render();
    renderDedicatedNotesList();
  }

  function renderFormattedNote(rawNote, isPrint = false) {
    const note = parseNoteData(rawNote);
    if (!note.text) return '';

    // Markdown parse **bold** and *italic*
    let htmlText = escapeHtml(note.text)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Size styles
    const fontSizes = {
      sm: isPrint ? 'font-size: 8.5px;' : 'text-[9.5px]',
      normal: isPrint ? 'font-size: 10.5px;' : 'text-[11px]',
      lg: isPrint ? 'font-size: 12.5px;' : 'text-xs sm:text-sm font-semibold'
    };
    const sizeStyle = fontSizes[note.size] || fontSizes.normal;

    // Color themes
    const printColors = {
      amber: 'background:#fef3c7 !important; border:1px solid #fde68a !important; color:#78350f !important;',
      rose: 'background:#ffe4e6 !important; border:1px solid #fecdd3 !important; color:#9f1239 !important;',
      blue: 'background:#e0f2fe !important; border:1px solid #bae6fd !important; color:#0369a1 !important;',
      emerald: 'background:#d1fae5 !important; border:1px solid #a7f3d0 !important; color:#065f46 !important;',
      purple: 'background:#f3e8ff !important; border:1px solid #e9d5ff !important; color:#6b21a8 !important;'
    };

    const uiColors = {
      amber: 'bg-amber-100/90 dark:bg-amber-950/80 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200',
      rose: 'bg-rose-100/90 dark:bg-rose-950/80 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200',
      blue: 'bg-blue-100/90 dark:bg-blue-950/80 border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-200',
      emerald: 'bg-emerald-100/90 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200',
      purple: 'bg-purple-100/90 dark:bg-purple-950/80 border-purple-300 dark:border-purple-800 text-purple-900 dark:text-purple-200'
    };

    if (isPrint) {
      const col = printColors[note.color] || printColors.amber;
      const bStyle = note.bold ? 'font-weight: 800;' : '';
      const iStyle = note.italic ? 'font-style: italic;' : '';
      return `<div class="day-note" style="${col} ${sizeStyle} ${bStyle} ${iStyle}">📝 ${htmlText}</div>`;
    }

    const colClass = uiColors[note.color] || uiColors.amber;
    const bClass = note.bold ? 'font-bold' : '';
    const iClass = note.italic ? 'italic' : '';
    return `<div class="p-1 rounded-md border text-left leading-tight wrap-break-word line-clamp-3 shadow-2xs ${colClass} ${sizeStyle} ${bClass} ${iClass}">📝 ${htmlText}</div>`;
  }

  // Pure UTC Date Functions
  function createUTCDate(year, monthIndex, day) {
    const d = new Date(Date.UTC(2000, monthIndex, day));
    d.setUTCFullYear(year);
    return d;
  }

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  function getDaysInMonth(year, monthIndex) {
    const standardDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (monthIndex === 1) {
      return isLeapYear(year) ? 29 : 28;
    }
    return standardDays[monthIndex] || 31;
  }

  function isWeekend(dayOfWeekIndex) {
    return dayOfWeekIndex === 0 || dayOfWeekIndex === 6; // Sun = 0, Sat = 6
  }

  function formatDate(year, monthIndex, day, format) {
    const dd = String(day).padStart(2, '0');
    const mm = String(monthIndex + 1).padStart(2, '0');
    const yyyy = String(year);
    const mName = MONTH_NAMES[monthIndex];

    switch (format) {
      case 'MM-DD-YYYY':
        return `${mm}-${dd}-${yyyy}`;
      case 'YYYY-MM-DD':
        return `${yyyy}-${mm}-${dd}`;
      case 'D MMMM YYYY':
        return `${day} ${mName} ${yyyy}`;
      case 'DD MMMM YYYY':
        return `${dd} ${mName} ${yyyy}`;
      case 'DD-MM-YYYY':
      default:
        return `${dd}-${mm}-${yyyy}`;
    }
  }

  function isToday(year, monthIndex, day) {
    return (
      year === currentActualYear &&
      monthIndex === currentActualMonth &&
      day === currentActualDay
    );
  }

  function generateMonthData(year, monthIndex, weekStart, dateFormat, dayFilter) {
    const totalDays = getDaysInMonth(year, monthIndex);
    const days = [];

    for (let d = 1; d <= totalDays; d++) {
      const utcDate = createUTCDate(year, monthIndex, d);
      const dayOfWeek = utcDate.getUTCDay();
      const weekend = isWeekend(dayOfWeek);
      const dateStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const note = getNote(dateStr);

      const matchesFilter =
        dayFilter === 'all' ||
        (dayFilter === 'weekdays' && !weekend) ||
        (dayFilter === 'weekends' && weekend);

      if (matchesFilter) {
        days.push({
          date: utcDate,
          dateStr,
          dayOfMonth: d,
          month: monthIndex,
          year: year,
          dayOfWeekIndex: dayOfWeek,
          dayName: DAY_NAMES[dayOfWeek],
          shortDayName: DAY_NAMES[dayOfWeek].slice(0, 3),
          formattedDate: formatDate(year, monthIndex, d, dateFormat),
          isWeekend: weekend,
          isToday: isToday(year, monthIndex, d),
          note
        });
      }
    }

    // 7-column calendar matrix
    const firstDayUTC = createUTCDate(year, monthIndex, 1).getUTCDay();
    const startOffset = weekStart === 'monday'
      ? (firstDayUTC === 0 ? 6 : firstDayUTC - 1)
      : firstDayUTC;

    const calendarWeeks = [];
    let currentWeek = [];

    for (let i = 0; i < startOffset; i++) {
      currentWeek.push(null);
    }

    for (let d = 1; d <= totalDays; d++) {
      const utcDate = createUTCDate(year, monthIndex, d);
      const dayOfWeek = utcDate.getUTCDay();
      const weekend = isWeekend(dayOfWeek);
      const dateStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const note = getNote(dateStr);

      const matchesFilter =
        dayFilter === 'all' ||
        (dayFilter === 'weekdays' && !weekend) ||
        (dayFilter === 'weekends' && weekend);

      currentWeek.push({
        date: utcDate,
        dateStr,
        dayOfMonth: d,
        month: monthIndex,
        year: year,
        dayOfWeekIndex: dayOfWeek,
        dayName: DAY_NAMES[dayOfWeek],
        shortDayName: DAY_NAMES[dayOfWeek].slice(0, 3),
        formattedDate: formatDate(year, monthIndex, d, dateFormat),
        isWeekend: weekend,
        isToday: isToday(year, monthIndex, d),
        isFilteredOut: !matchesFilter,
        note
      });

      if (currentWeek.length === 7) {
        calendarWeeks.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      calendarWeeks.push(currentWeek);
    }

    return {
      monthIndex,
      monthName: MONTH_NAMES[monthIndex],
      shortMonthName: SHORT_MONTH_NAMES[monthIndex],
      year,
      totalDays,
      days,
      calendarWeeks
    };
  }

  function generateYearData(year, weekStart, dateFormat, dayFilter) {
    const months = [];
    let totalDays = 0;
    let totalWeekdays = 0;
    let totalWeekends = 0;

    for (let m = 0; m < 12; m++) {
      const mData = generateMonthData(year, m, weekStart, dateFormat, dayFilter);
      months.push(mData);

      for (let i = 0; i < mData.days.length; i++) {
        totalDays++;
        if (mData.days[i].isWeekend) {
          totalWeekends++;
        } else {
          totalWeekdays++;
        }
      }
    }

    return {
      year,
      isLeapYear: isLeapYear(year),
      totalDays,
      totalWeekdays,
      totalWeekends,
      months
    };
  }

  // URL Query Sync - ONLY adds parameters when they differ from default
  function readURLParams() {
    const params = new URLSearchParams(window.location.search);

    const qYear = parseInt(params.get('year'), 10);
    if (!isNaN(qYear) && qYear >= 1900 && qYear <= 2100) {
      state.year = qYear;
    }

    const qMonths = params.get('months');
    if (qMonths === 'all') {
      state.selectedMonths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    } else if (qMonths) {
      const parsed = qMonths.split(',').map(m => parseInt(m, 10)).filter(m => !isNaN(m) && m >= 0 && m <= 11);
      if (parsed.length > 0) {
        state.selectedMonths = parsed;
      }
    } else {
      const qMonth = params.get('month');
      if (qMonth !== null && qMonth !== 'all') {
        const parsed = parseInt(qMonth, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 11) {
          state.selectedMonths = [parsed];
        }
      }
    }

    const qView = params.get('view');
    if (qView === 'calendar' || qView === 'table' || qView === 'fullyear') {
      state.view = qView;
    }

    const qFilter = params.get('filter');
    if (qFilter === 'weekdays') {
      state.showWeekdays = true;
      state.showWeekends = false;
    } else if (qFilter === 'weekends') {
      state.showWeekdays = false;
      state.showWeekends = true;
    } else if (qFilter === 'all') {
      state.showWeekdays = true;
      state.showWeekends = true;
    }

    const qWeekStart = params.get('weekstart');
    if (qWeekStart === 'monday' || qWeekStart === 'sunday') {
      state.weekStart = qWeekStart;
    }

    const qFormat = params.get('fmt');
    if (qFormat && ['DD-MM-YYYY', 'MM-DD-YYYY', 'YYYY-MM-DD', 'D MMMM YYYY', 'DD MMMM YYYY'].includes(qFormat)) {
      state.dateFormat = qFormat;
    }
  }

  function syncURLParams() {
    // Keep URL completely clean: Never inject ?months= or query parameters into browser address bar
    // This prevents Google duplicate URL indexing, crawler parameter sprawl, and dirty URLs
    if (window.location.search) {
      try {
        window.history.replaceState({}, '', window.location.pathname);
      } catch (e) {}
    }
  }

  // DOM Elements
  const els = {
    yearInput: document.getElementById('ttYearInput'),
    yearPrevBtn: document.getElementById('ttYearPrevBtn'),
    yearNextBtn: document.getElementById('ttYearNextBtn'),
    yearError: document.getElementById('ttYearError'),
    monthSelect: document.getElementById('ttMonthSelect'),
    monthChipsContainer: document.getElementById('ttMonthChipsContainer'),
    toggleWeekdays: document.getElementById('ttToggleWeekdays'),
    toggleWeekends: document.getElementById('ttToggleWeekends'),
    weekStartSelect: document.getElementById('ttWeekStartSelect'),
    dateFormatSelect: document.getElementById('ttDateFormatSelect'),
    viewCalendarBtn: document.getElementById('ttViewCalendarBtn'),
    viewTableBtn: document.getElementById('ttViewTableBtn'),
    viewFullYearBtn: document.getElementById('ttViewFullYearBtn'),
    resetBtn: document.getElementById('ttResetBtn'),
    clearNotesBtn: document.getElementById('ttClearNotesBtn'),
    container: document.getElementById('ttTimetableContainer'),
    statYear: document.getElementById('ttStatYear'),
    statTotalDays: document.getElementById('ttStatTotalDays'),
    statWeekdays: document.getElementById('ttStatWeekdays'),
    statWeekends: document.getElementById('ttStatWeekends'),
    statLeap: document.getElementById('ttStatLeap'),
    statNotesCount: document.getElementById('ttStatNotesCount'),
    printTitle: document.getElementById('ttPrintTitle'),
    exportCsvBtn: document.getElementById('ttExportCsvBtn'),
    exportExcelBtn: document.getElementById('ttExportExcelBtn'),
    printPdfBtn: document.getElementById('ttPrintPdfBtn'),
    exportToast: document.getElementById('ttExportToast'),
    exportToastMsg: document.getElementById('ttExportToastMsg'),
    // Dedicated Notes Form
    dedicatedDateInput: document.getElementById('ttDedicatedDateInput'),
    dedicatedNoteInput: document.getElementById('ttDedicatedNoteInput'),
    dedicatedBoldBtn: document.getElementById('ttDedicatedBoldBtn'),
    dedicatedSizeSelect: document.getElementById('ttDedicatedSizeSelect'),
    dedicatedAddNoteBtn: document.getElementById('ttDedicatedAddNoteBtn'),
    dedicatedNotesList: document.getElementById('ttDedicatedNotesList'),
    // Modal Elements
    noteModal: document.getElementById('ttNoteModal'),
    noteModalTitle: document.getElementById('ttNoteModalTitle'),
    noteModalDateStr: document.getElementById('ttNoteModalDateStr'),
    noteModalCount: document.getElementById('ttNoteModalCount'),
    noteModalExistingList: document.getElementById('ttNoteModalExistingList'),
    noteModalInputLabel: document.getElementById('ttNoteModalInputLabel'),
    noteModalInput: document.getElementById('ttNoteModalInput'),
    noteModalBoldBtn: document.getElementById('ttNoteModalBoldBtn'),
    noteModalItalicBtn: document.getElementById('ttNoteModalItalicBtn'),
    noteModalSizeSelect: document.getElementById('ttNoteModalSizeSelect'),
    noteModalSaveBtn: document.getElementById('ttNoteModalSaveBtn'),
    noteModalDeleteBtn: document.getElementById('ttNoteModalDeleteBtn'),
    noteModalCancelEditBtn: document.getElementById('ttNoteModalCancelEditBtn'),
    noteModalCloseBtn: document.getElementById('ttNoteModalCloseBtn')
  };

  let currentEditingDateStr = '';
  let currentEditingNoteId = null;
  let modalActiveColor = 'amber';
  let modalActiveSize = 'normal';

  function chipColorClass(col) {
    switch (col) {
      case 'rose': return 'bg-rose-500';
      case 'blue': return 'bg-blue-500';
      case 'emerald': return 'bg-emerald-500';
      case 'purple': return 'bg-purple-500';
      default: return 'bg-amber-400';
    }
  }

  function updateModalColorChipsUI() {
    const chips = document.querySelectorAll('.tt-modal-color-chip');
    chips.forEach(chip => {
      const col = chip.getAttribute('data-color');
      if (col === modalActiveColor) {
        chip.className = `tt-modal-color-chip w-5 h-5 rounded-full ${chipColorClass(col)} ring-2 ring-blue-600 scale-110 cursor-pointer shadow-xs`;
      } else {
        chip.className = `tt-modal-color-chip w-5 h-5 rounded-full ${chipColorClass(col)} opacity-70 hover:opacity-100 cursor-pointer`;
      }
    });
  }

  function wrapSelection(textarea, before, after, placeholder = 'bold text') {
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const val = textarea.value;
    if (start !== end) {
      const selected = val.substring(start, end);
      textarea.value = val.substring(0, start) + before + selected + after + val.substring(end);
      textarea.selectionStart = start;
      textarea.selectionEnd = end + before.length + after.length;
    } else {
      textarea.value = val.substring(0, start) + before + placeholder + after + val.substring(end);
      textarea.selectionStart = start + before.length;
      textarea.selectionEnd = start + before.length + placeholder.length;
    }
    textarea.focus();
  }

  function resetModalInputForm() {
    currentEditingNoteId = null;
    if (els.noteModalInput) els.noteModalInput.value = '';
    if (els.noteModalInputLabel) {
      els.noteModalInputLabel.textContent = '➕ Add New Note:';
    }
    if (els.noteModalSaveBtn) {
      els.noteModalSaveBtn.textContent = '+ Add Note';
    }
    if (els.noteModalCancelEditBtn) {
      els.noteModalCancelEditBtn.classList.add('hidden');
    }
    modalActiveSize = 'normal';
    modalActiveColor = 'amber';
    if (els.noteModalSizeSelect) els.noteModalSizeSelect.value = 'normal';
    updateModalColorChipsUI();
  }

  function renderNoteModalExistingNotes() {
    if (!els.noteModalExistingList || !currentEditingDateStr) return;
    const notes = getNotes(currentEditingDateStr);
    if (els.noteModalCount) {
      els.noteModalCount.textContent = String(notes.length);
    }
    if (els.noteModalDeleteBtn) {
      if (notes.length > 0) {
        els.noteModalDeleteBtn.classList.remove('hidden');
      } else {
        els.noteModalDeleteBtn.classList.add('hidden');
      }
    }

    if (notes.length === 0) {
      els.noteModalExistingList.innerHTML = `
        <div class="text-xs text-slate-400 dark:text-slate-500 py-2.5 text-center italic bg-slate-50/50 dark:bg-slate-950/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
          No notes added yet for this date. Use the form below to add your first note!
        </div>
      `;
      return;
    }

    let html = '';
    notes.forEach((note, index) => {
      const isBeingEdited = currentEditingNoteId === note.id;
      html += `
        <div class="flex items-center justify-between gap-2 p-2.5 rounded-xl border ${isBeingEdited ? 'border-blue-500 ring-2 ring-blue-400/30 bg-blue-50/40 dark:bg-blue-950/40' : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40'}">
          <div class="flex-1 overflow-hidden">
            <div class="flex items-center gap-1.5 mb-1">
              <span class="text-[10px] font-bold text-slate-500 dark:text-slate-400">#${index + 1}</span>
            </div>
            <div>
              ${renderFormattedNote(note)}
            </div>
          </div>
          <div class="flex items-center gap-1 shrink-0 pt-0.5">
            <button
              type="button"
              onclick="window.mttmEditModalNote('${note.id}')"
              class="p-1 text-xs rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer"
              title="Edit this note"
            >
              ✏️
            </button>
            <button
              type="button"
              onclick="window.mttmDeleteModalNote('${note.id}')"
              class="p-1 text-xs rounded hover:bg-rose-100 dark:hover:bg-rose-950 text-rose-600 dark:text-rose-400 cursor-pointer"
              title="Delete this note"
            >
              🗑️
            </button>
          </div>
        </div>
      `;
    });
    els.noteModalExistingList.innerHTML = html;
  }

  window.mttmEditModalNote = function(noteId) {
    if (!currentEditingDateStr) return;
    const notes = getNotes(currentEditingDateStr);
    const target = notes.find(n => n.id === noteId);
    if (!target) return;

    currentEditingNoteId = noteId;
    if (els.noteModalInput) els.noteModalInput.value = target.text;
    if (els.noteModalSizeSelect) {
      els.noteModalSizeSelect.value = target.size || 'normal';
      modalActiveSize = target.size || 'normal';
    }
    modalActiveColor = target.color || 'amber';
    updateModalColorChipsUI();

    if (els.noteModalInputLabel) {
      els.noteModalInputLabel.textContent = '✏️ Edit Note:';
    }
    if (els.noteModalSaveBtn) {
      els.noteModalSaveBtn.textContent = 'Update Note';
    }
    if (els.noteModalCancelEditBtn) {
      els.noteModalCancelEditBtn.classList.remove('hidden');
    }
    renderNoteModalExistingNotes();
    if (els.noteModalInput) els.noteModalInput.focus();
  };

  window.mttmDeleteModalNote = function(noteId) {
    if (!currentEditingDateStr) return;
    deleteNoteItem(currentEditingDateStr, noteId);
    if (currentEditingNoteId === noteId) {
      resetModalInputForm();
    }
    renderNoteModalExistingNotes();
    showToast('Note deleted.');
  };

  function openNoteModal(dateStr, formattedDate, dayName, noteIdToEdit = null) {
    currentEditingDateStr = dateStr;
    resetModalInputForm();

    if (els.noteModalTitle) {
      els.noteModalTitle.textContent = `Schedule Notes — ${dayName}`;
    }
    if (els.noteModalDateStr) {
      els.noteModalDateStr.textContent = formattedDate;
    }

    renderNoteModalExistingNotes();

    if (noteIdToEdit) {
      window.mttmEditModalNote(noteIdToEdit);
    }

    if (els.noteModal) {
      els.noteModal.classList.remove('hidden');
      els.noteModal.classList.add('flex');
      setTimeout(() => {
        if (els.noteModalInput) els.noteModalInput.focus();
      }, 50);
    }
  }

  function closeNoteModal() {
    if (els.noteModal) {
      els.noteModal.classList.add('hidden');
      els.noteModal.classList.remove('flex');
    }
    currentEditingDateStr = '';
    currentEditingNoteId = null;
  }

  function showToast(message, isError = false) {
    if (!els.exportToast || !els.exportToastMsg) return;
    els.exportToastMsg.textContent = message;
    if (isError) {
      els.exportToast.className = 'fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-lg transition-all duration-300 transform translate-y-0 opacity-100 flex items-center gap-2 bg-rose-600 text-white';
    } else {
      els.exportToast.className = 'fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-lg transition-all duration-300 transform translate-y-0 opacity-100 flex items-center gap-2 bg-emerald-600 text-white';
    }

    setTimeout(() => {
      if (els.exportToast) {
        els.exportToast.classList.add('opacity-0', 'translate-y-4');
      }
    }, 3000);
  }

  // Update Controls UI states
  function updateControlsUI() {
    if (els.yearInput) els.yearInput.value = state.year;
    if (els.weekStartSelect) els.weekStartSelect.value = state.weekStart;
    if (els.dateFormatSelect) els.dateFormatSelect.value = state.dateFormat;

    // Day toggles
    if (els.toggleWeekdays) els.toggleWeekdays.checked = state.showWeekdays;
    if (els.toggleWeekends) els.toggleWeekends.checked = state.showWeekends;

    // View buttons
    const viewButtons = [
      { btn: els.viewCalendarBtn, view: 'calendar' },
      { btn: els.viewTableBtn, view: 'table' },
      { btn: els.viewFullYearBtn, view: 'fullyear' }
    ];

    viewButtons.forEach(item => {
      if (!item.btn) return;
      const isActive = state.view === item.view;
      item.btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      if (isActive) {
        item.btn.className = 'px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 text-white shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer';
      } else {
        item.btn.className = 'px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition flex items-center justify-center gap-1.5 cursor-pointer';
      }
    });

    // Month Select dropdown & Quick Month Chips
    updateMonthSelectorUI();
  }

  function updateMonthSelectorUI() {
    if (els.monthSelect) {
      if (state.selectedMonths.length === 12) {
        els.monthSelect.value = 'all';
      } else if (state.selectedMonths.length === 1) {
        els.monthSelect.value = String(state.selectedMonths[0]);
      } else if (state.selectedMonths.join(',') === '0,1,2') {
        els.monthSelect.value = 'q1';
      } else if (state.selectedMonths.join(',') === '3,4,5') {
        els.monthSelect.value = 'q2';
      } else if (state.selectedMonths.join(',') === '6,7,8') {
        els.monthSelect.value = 'q3';
      } else if (state.selectedMonths.join(',') === '9,10,11') {
        els.monthSelect.value = 'q4';
      } else if (state.selectedMonths.join(',') === '0,1,2,3,4,5') {
        els.monthSelect.value = 'h1';
      } else if (state.selectedMonths.join(',') === '6,7,8,9,10,11') {
        els.monthSelect.value = 'h2';
      } else {
        els.monthSelect.value = 'custom';
      }
    }

    // Render / update month chips
    if (els.monthChipsContainer) {
      const chipsHtml = SHORT_MONTH_NAMES.map((name, idx) => {
        const isSelected = state.selectedMonths.includes(idx);
        return `
          <button
            type="button"
            data-month-index="${idx}"
            class="tt-month-chip px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              isSelected
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }"
          >
            ${name}
          </button>
        `;
      }).join('');

      els.monthChipsContainer.innerHTML = `
        <div class="flex flex-wrap items-center gap-1.5">
          ${chipsHtml}
          <div class="flex items-center gap-1 ml-auto">
            <button
              type="button"
              id="ttSelectAllMonthsBtn"
              class="px-2 py-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded transition cursor-pointer"
            >
              All Year
            </button>
            <span class="text-slate-300 dark:text-slate-700">|</span>
            <button
              type="button"
              id="ttClearMonthsBtn"
              class="px-2 py-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded transition cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      `;

      // Attach chip click events
      const chipButtons = els.monthChipsContainer.querySelectorAll('.tt-month-chip');
      chipButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const mIdx = parseInt(btn.getAttribute('data-month-index'), 10);
          if (state.selectedMonths.includes(mIdx)) {
            if (state.selectedMonths.length > 1) {
              state.selectedMonths = state.selectedMonths.filter(m => m !== mIdx);
            } else {
              showToast('At least one month must be selected.', true);
              return;
            }
          } else {
            state.selectedMonths = [...state.selectedMonths, mIdx].sort((a, b) => a - b);
          }
          updateMonthSelectorUI();
          render();
        });
      });

      const selectAllBtn = document.getElementById('ttSelectAllMonthsBtn');
      if (selectAllBtn) {
        selectAllBtn.addEventListener('click', () => {
          state.selectedMonths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
          updateMonthSelectorUI();
          render();
        });
      }

      const clearMonthsBtn = document.getElementById('ttClearMonthsBtn');
      if (clearMonthsBtn) {
        clearMonthsBtn.addEventListener('click', () => {
          // Defaults to active month
          state.selectedMonths = [currentActualMonth];
          updateMonthSelectorUI();
          render();
        });
      }
    }
  }

  // Render Dedicated Notes List - CLICKABLE CARDS (Supports Multiple Notes per Date)
  function renderDedicatedNotesList() {
    if (!els.dedicatedNotesList) return;

    const safeYear = Math.max(1900, Math.min(2100, Math.floor(state.year) || currentActualYear));
    const yearPrefix = `${safeYear}-`;
    const sortedDates = Object.keys(state.notes)
      .filter(k => k.startsWith(yearPrefix) && getNotes(k).length > 0)
      .sort();

    if (sortedDates.length === 0) {
      els.dedicatedNotesList.innerHTML = `
        <div class="text-xs text-slate-500 dark:text-slate-400 py-3 text-center italic bg-slate-50/50 dark:bg-slate-950/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
          No schedule notes added yet for ${safeYear}. Select a date above to add your first note!
        </div>
      `;
      return;
    }

    let listHtml = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-60 overflow-y-auto pr-1">`;

    sortedDates.forEach(dStr => {
      const notes = getNotes(dStr);
      const parts = dStr.split('-');
      const y = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10) - 1;
      const d = parseInt(parts[2], 10);
      const utcDate = createUTCDate(y, m, d);
      const dayName = DAY_NAMES[utcDate.getUTCDay()];
      const fmtDate = formatDate(y, m, d, state.dateFormat);

      notes.forEach((note, nIdx) => {
        listHtml += `
          <div
            class="group flex items-start justify-between gap-2.5 p-3 rounded-2xl border border-amber-200/90 dark:border-amber-900/50 bg-white dark:bg-slate-900 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-md transition-all cursor-pointer"
            onclick="window.mttmOpenNote('${dStr}', '${fmtDate}', '${dayName}')"
            title="Click to view/manage notes for ${fmtDate}"
          >
            <div class="space-y-1.5 overflow-hidden flex-1">
              <div class="flex items-center gap-1.5 font-bold text-xs text-blue-600 dark:text-blue-400 group-hover:underline">
                <span>📅 ${fmtDate}</span>
                <span class="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300">
                  ${dayName}
                </span>
                ${notes.length > 1 ? `<span class="text-[9px] px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">#${nIdx + 1}</span>` : ''}
              </div>
              <div>
                ${renderFormattedNote(note)}
              </div>
            </div>
            <div class="flex items-center gap-1 shrink-0" onclick="event.stopPropagation()">
              <button
                type="button"
                onclick="window.mttmOpenNote('${dStr}', '${fmtDate}', '${dayName}', '${note.id}')"
                class="p-1 rounded text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                title="Edit / View in Modal"
              >
                ✏️
              </button>
              <button
                type="button"
                onclick="window.mttmDeleteSingleNote('${dStr}', '${note.id}')"
                class="p-1 rounded text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                title="Delete Note"
              >
                🗑️
              </button>
            </div>
          </div>
        `;
      });
    });

    listHtml += `</div>`;
    els.dedicatedNotesList.innerHTML = listHtml;
  }

  // Render Timetable Views
  function render() {
    if (!els.container) return;

    const safeYear = Math.max(1900, Math.min(2100, Math.floor(state.year) || currentActualYear));
    const activeFilter = getDayFilter();
    const yearData = generateYearData(safeYear, state.weekStart, state.dateFormat, activeFilter);

    // Count notes
    const totalNotesCount = Object.keys(state.notes)
      .filter(k => k.startsWith(`${safeYear}-`))
      .reduce((acc, k) => acc + getNotes(k).length, 0);

    // Update Stats
    if (els.statYear) els.statYear.textContent = String(safeYear);
    if (els.statTotalDays) els.statTotalDays.textContent = String(yearData.totalDays);
    if (els.statWeekdays) els.statWeekdays.textContent = String(yearData.totalWeekdays);
    if (els.statWeekends) els.statWeekends.textContent = String(yearData.totalWeekends);
    if (els.statLeap) els.statLeap.textContent = yearData.isLeapYear ? 'Yes (366 Days)' : 'No (365 Days)';
    if (els.statNotesCount) els.statNotesCount.textContent = `${totalNotesCount} Saved`;

    // Filter months to display based on state.selectedMonths
    const monthsToDisplay = state.selectedMonths.map(idx => yearData.months[idx]).filter(Boolean);

    // Update Print Title (Only shows active calendar info)
    if (els.printTitle) {
      let monthLabel = 'Full Year';
      if (monthsToDisplay.length === 1) {
        monthLabel = monthsToDisplay[0].monthName;
      } else if (monthsToDisplay.length < 12) {
        monthLabel = monthsToDisplay.map(m => m.shortMonthName).join(', ');
      }
      const viewLabel = state.view === 'calendar' ? 'Calendar View' : (state.view === 'table' ? 'Table View' : 'Overview');
      els.printTitle.textContent = `${monthLabel} ${safeYear} Timetable (${viewLabel})`;
    }

    const headers = state.weekStart === 'monday' ? SHORT_DAYS_MON : SHORT_DAYS_SUN;

    let html = '';

    if (state.view === 'calendar') {
      html = renderCalendarView(monthsToDisplay, headers);
    } else if (state.view === 'table') {
      html = renderTableView(monthsToDisplay);
    } else if (state.view === 'fullyear') {
      html = renderFullYearView(monthsToDisplay, headers);
    }

    els.container.innerHTML = html;
    attachDynamicTableInputs();
    renderDedicatedNotesList();
    syncURLParams();
  }

  function renderCalendarView(months, headers) {
    return `
      <div class="space-y-8">
        ${months.map(m => `
          <div class="month-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs print:shadow-none print:border-slate-300">
            <!-- Month Header -->
            <div class="px-4 py-3 bg-linear-to-r from-slate-50 to-blue-50/50 dark:from-slate-950 dark:to-blue-950/20 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between print:bg-none">
              <div class="flex items-center gap-2.5">
                <span class="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  ${m.monthName} ${m.year}
                </h3>
              </div>
              <div class="text-xs font-semibold text-slate-500 dark:text-slate-400">
                ${m.days.length} Days ${(!state.showWeekdays || !state.showWeekends) ? `(${getDayFilter()})` : ''}
              </div>
            </div>

            <!-- Calendar Grid -->
            <div class="p-3 sm:p-5">
              <!-- Days of Week Header -->
              <div class="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
                ${headers.map((day, idx) => {
                  const isWeekendHeader = (state.weekStart === 'monday' && idx >= 5) || (state.weekStart === 'sunday' && (idx === 0 || idx === 6));
                  return `
                    <div class="py-1.5 text-center text-[11px] sm:text-xs font-bold uppercase tracking-wider ${
                      isWeekendHeader
                        ? 'text-rose-600 dark:text-rose-400 bg-rose-50/60 dark:bg-rose-950/30 rounded-lg'
                        : 'text-slate-600 dark:text-slate-400 bg-slate-100/70 dark:bg-slate-800/70 rounded-lg'
                    }">
                      ${day}
                    </div>
                  `;
                }).join('')}
              </div>

              <!-- Calendar Matrix Cells -->
              <div class="grid grid-cols-7 gap-1 sm:gap-2">
                ${m.calendarWeeks.flat().map(cell => {
                  if (!cell) {
                    return `<div class="min-h-17.5 sm:min-h-21.25 rounded-xl border border-transparent bg-slate-50/30 dark:bg-slate-900/30 opacity-25"></div>`;
                  }

                  if (cell.isFilteredOut) {
                    return `
                      <div class="min-h-17.5 sm:min-h-21.25 p-1.5 sm:p-2 rounded-xl border border-slate-100 dark:border-slate-800/40 bg-slate-50/40 dark:bg-slate-950/20 opacity-30 flex flex-col justify-between">
                        <span class="text-xs font-medium text-slate-400">${cell.dayOfMonth}</span>
                      </div>
                    `;
                  }

                  let cellClasses = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 text-slate-800 dark:text-slate-200';
                  let badge = '';

                  if (cell.isToday) {
                    cellClasses = 'border-blue-500 ring-2 ring-blue-500/30 bg-blue-50/80 dark:bg-blue-950/60 text-blue-950 dark:text-white font-bold';
                    badge = `<span class="inline-block px-1.5 py-0.5 text-[9px] font-extrabold uppercase rounded bg-blue-600 text-white">Today</span>`;
                  } else if (cell.isWeekend) {
                    cellClasses = 'border-rose-200/80 dark:border-rose-900/40 bg-rose-50/40 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200';
                    badge = `<span class="inline-block text-[9px] font-bold text-rose-600 dark:text-rose-400">W/E</span>`;
                  }

                  const notes = getNotes(cell.dateStr);

                  return `
                    <div
                      class="group relative min-h-17.5 sm:min-h-21.25 p-1.5 sm:p-2 rounded-xl border ${cellClasses} transition hover:shadow-md flex flex-col justify-between cursor-pointer"
                      onclick="window.mttmOpenNote('${cell.dateStr}', '${cell.formattedDate}', '${cell.dayName}')"
                      title="Click to manage notes for ${cell.formattedDate}"
                    >
                      <!-- Top Day Header -->
                      <div class="flex items-center justify-between">
                        <span class="text-xs sm:text-sm font-bold">${cell.dayOfMonth}</span>
                        ${badge}
                      </div>

                      <!-- Middle Note Display (Multiple Notes Supported) -->
                      <div class="my-1 flex-1 overflow-hidden space-y-1">
                        ${notes.length > 0 ? `
                          ${notes.slice(0, 2).map(n => renderFormattedNote(n)).join('')}
                          ${notes.length > 2 ? `<div class="text-[9px] font-bold text-blue-600 dark:text-blue-400">+${notes.length - 2} more</div>` : ''}
                        ` : `
                          <div class="hidden group-hover:flex items-center gap-1 text-[10px] text-blue-600 dark:text-blue-400 font-semibold print:hidden">
                            <span>+ Note</span>
                          </div>
                        `}
                      </div>

                      <!-- Bottom Day Label -->
                      <div class="text-[10px] text-slate-400 dark:text-slate-500 truncate print:hidden">
                        ${cell.shortDayName}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderTableView(months) {
    return `
      <div class="space-y-8">
        ${months.map(m => `
          <div class="month-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs print:shadow-none print:border-slate-300">
            <div class="px-4 py-3 bg-linear-to-r from-slate-50 to-blue-50/50 dark:from-slate-950 dark:to-blue-950/20 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between print:bg-none">
              <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                ${m.monthName} ${m.year}
              </h3>
              <div class="text-xs font-semibold text-slate-500 dark:text-slate-400">
                ${m.days.length} Total Days
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm">
                <thead class="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider">
                  <tr>
                    <th class="py-2.5 px-3 sm:px-4 w-12">#</th>
                    <th class="py-2.5 px-3 sm:px-4">Date</th>
                    <th class="py-2.5 px-3 sm:px-4">Day</th>
                    <th class="py-2.5 px-3 sm:px-4">Type</th>
                    <th class="py-2.5 px-3 sm:px-4">Schedule Notes / Reminders</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60">
                  ${m.days.map((d, index) => {
                    const rowBg = d.isToday
                      ? 'bg-blue-50/60 dark:bg-blue-950/30'
                      : (d.isWeekend ? 'bg-rose-50/20 dark:bg-rose-950/10' : '');

                    const notes = getNotes(d.dateStr);

                    return `
                      <tr class="${rowBg} transition-colors">
                        <td class="py-2 px-3 sm:px-4 text-slate-400 dark:text-slate-500 font-mono text-xs">${index + 1}</td>
                        <td class="py-2 px-3 sm:px-4 font-mono font-medium text-slate-900 dark:text-slate-100">
                          ${d.formattedDate}
                          ${d.isToday ? '<span class="ml-1 px-1.5 py-0.5 text-[9px] font-bold rounded bg-blue-600 text-white uppercase">Today</span>' : ''}
                        </td>
                        <td class="py-2 px-3 sm:px-4 text-slate-700 dark:text-slate-300 font-medium">
                          ${d.dayName}
                        </td>
                        <td class="py-2 px-3 sm:px-4">
                          ${d.isWeekend
                            ? '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300">🌴 Weekend</span>'
                            : '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">💼 Weekday</span>'
                          }
                        </td>
                        <td class="py-2 px-3 sm:px-4">
                          <div class="space-y-1">
                            ${notes.length > 0 ? `
                              ${notes.map(n => renderFormattedNote(n)).join('')}
                              <button
                                type="button"
                                onclick="window.mttmOpenNote('${d.dateStr}', '${d.formattedDate}', '${d.dayName}')"
                                class="inline-block text-[10px] font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                              >
                                + Add another note
                              </button>
                            ` : `
                              <button
                                type="button"
                                onclick="window.mttmOpenNote('${d.dateStr}', '${d.formattedDate}', '${d.dayName}')"
                                class="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-medium"
                              >
                                + Add Schedule Note
                              </button>
                            `}
                          </div>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderFullYearView(months, headers) {
    return `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        ${months.map(m => `
          <div class="month-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 shadow-xs flex flex-col justify-between print:shadow-none print:border-slate-300">
            <div>
              <!-- Mini Month Header -->
              <div class="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                <h4 class="text-sm font-bold text-slate-900 dark:text-white">${m.monthName}</h4>
                <span class="text-[10px] font-semibold text-slate-400">${m.days.length}d</span>
              </div>

              <!-- Mini Weekday Header -->
              <div class="grid grid-cols-7 gap-0.5 mb-1.5 text-center">
                ${headers.map((day, idx) => {
                  const isWeekendHeader = (state.weekStart === 'monday' && idx >= 5) || (state.weekStart === 'sunday' && (idx === 0 || idx === 6));
                  return `
                    <span class="text-[9px] font-bold ${isWeekendHeader ? 'text-rose-500' : 'text-slate-400'}">
                      ${day.slice(0, 1)}
                    </span>
                  `;
                }).join('')}
              </div>

              <!-- Mini Day Matrix -->
              <div class="grid grid-cols-7 gap-0.5 text-center">
                ${m.calendarWeeks.flat().map(cell => {
                  if (!cell) {
                    return `<span class="h-6 block opacity-0"></span>`;
                  }
                  if (cell.isFilteredOut) {
                    return `<span class="h-6 flex items-center justify-center text-[10px] text-slate-300 dark:text-slate-700">${cell.dayOfMonth}</span>`;
                  }

                  let cellStyle = 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800';
                  if (cell.isToday) {
                    cellStyle = 'bg-blue-600 text-white font-bold rounded-full';
                  } else if (cell.isWeekend) {
                    cellStyle = 'text-rose-600 dark:text-rose-400 font-semibold bg-rose-50/40 dark:bg-rose-950/20 rounded';
                  }

                  const notes = getNotes(cell.dateStr);
                  const hasNote = notes.length > 0;
                  const noteTooltip = hasNote
                    ? ' — Notes: ' + notes.map(n => escapeHtml(n.text)).join(' | ')
                    : '';

                  return `
                    <span
                      class="h-6 flex items-center justify-center text-[10px] rounded transition cursor-pointer relative ${cellStyle}"
                      onclick="window.mttmOpenNote('${cell.dateStr}', '${cell.formattedDate}', '${cell.dayName}')"
                      title="${cell.formattedDate}${noteTooltip}"
                    >
                      ${cell.dayOfMonth}
                      ${hasNote ? '<span class="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-amber-500 rounded-full"></span>' : ''}
                    </span>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function escapeHtml(str) {
    return (str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Global handler for cell click & note deletion
  window.mttmOpenNote = function (dateStr, formattedDate, dayName, noteId = null) {
    openNoteModal(dateStr, formattedDate, dayName, noteId);
  };

  window.mttmDeleteSingleNote = function (dateStr, noteId) {
    deleteNoteItem(dateStr, noteId);
    showToast('Note deleted.');
  };

  window.mttmDeleteNote = function (dateStr) {
    deleteAllNotesForDate(dateStr);
    showToast(`Deleted all notes for ${dateStr}`);
  };

  function attachDynamicTableInputs() {
    const inputs = document.querySelectorAll('.tt-inline-note-input');
    inputs.forEach(input => {
      input.addEventListener('change', (e) => {
        const dateStr = e.target.getAttribute('data-datestr');
        setNote(dateStr, e.target.value);
        showToast(`Saved note for ${dateStr}`);
      });
    });
  }

  // Export CSV with CALENDAR-GRID STRUCTURE (For Selected Calendars)
  function exportCSV() {
    try {
      const activeFilter = getDayFilter();
      const yearData = generateYearData(state.year, state.weekStart, state.dateFormat, activeFilter);
      const monthsToInclude = state.selectedMonths.map(idx => yearData.months[idx]).filter(Boolean);

      const headers = state.weekStart === 'monday' ? SHORT_DAYS_MON : SHORT_DAYS_SUN;
      const rows = [];

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
          const numRow = week.map(cell => {
            if (!cell) return '""';
            return `"${cell.dayOfMonth}"`;
          });
          rows.push(numRow.join(','));

          const hasAnyNoteInWeek = week.some(cell => {
            if (!cell) return false;
            const notes = getNotes(cell.dateStr);
            return notes.length > 0;
          });
          if (hasAnyNoteInWeek) {
            const noteRow = week.map(cell => {
              if (!cell) return '""';
              const notes = getNotes(cell.dateStr);
              if (notes.length === 0) return '""';
              const combinedText = notes.map(n => (n.text || '').trim()).filter(Boolean).join(' • ');
              return combinedText ? `"[• ${combinedText.replace(/"/g, '""')}]"` : '""';
            });
            rows.push(noteRow.join(','));
          }
        });
      });

      const csvContent = '\uFEFF' + rows.join('\r\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      const fileSuffix = monthsToInclude.length === 1 ? monthsToInclude[0].shortMonthName.toLowerCase() : 'custom';
      link.setAttribute('download', `calendar-timetable-${state.year}-${fileSuffix}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast('Calendar CSV exported successfully!');
    } catch (e) {
      console.error(e);
      showToast('Failed to export CSV.', true);
    }
  }

  // Export Excel (.xlsx) with CALENDAR-GRID STRUCTURE (For Selected Calendars)
  async function exportExcel() {
    if (els.exportExcelBtn) {
      els.exportExcelBtn.disabled = true;
      els.exportExcelBtn.classList.add('opacity-60');
    }

    try {
      if (typeof XLSX === 'undefined') {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
          script.onload = resolve;
          script.onerror = () => reject(new Error('Failed to load XLSX engine.'));
          document.head.appendChild(script);
        });
      }

      const activeFilter = getDayFilter();
      const yearData = generateYearData(state.year, state.weekStart, state.dateFormat, activeFilter);
      const wb = XLSX.utils.book_new();
      const headers = state.weekStart === 'monday' ? SHORT_DAYS_MON : SHORT_DAYS_SUN;

      const monthsToInclude = state.selectedMonths.map(idx => yearData.months[idx]).filter(Boolean);

      monthsToInclude.forEach(m => {
        const sheetData = [];

        // Month Title Banner
        sheetData.push([`${m.monthName} ${m.year}`, '', '', '', '', '', '']);
        sheetData.push(headers);

        // Calendar Weeks with 2 rows per week
        m.calendarWeeks.forEach(week => {
          const numRow = week.map(cell => (cell ? cell.dayOfMonth : ''));
          sheetData.push(numRow);

          const hasAnyNote = week.some(cell => {
            if (!cell) return false;
            const notes = getNotes(cell.dateStr);
            return notes.length > 0;
          });
          if (hasAnyNote) {
            const noteRow = week.map(cell => {
              if (!cell) return '';
              const notes = getNotes(cell.dateStr);
              if (notes.length === 0) return '';
              const combinedText = notes.map(n => (n.text || '').trim()).filter(Boolean).join(' • ');
              return combinedText ? `• ${combinedText}` : '';
            });
            sheetData.push(noteRow);
          }
        });

        const ws = XLSX.utils.aoa_to_sheet(sheetData);

        ws['!cols'] = [
          { wch: 18 },
          { wch: 18 },
          { wch: 18 },
          { wch: 18 },
          { wch: 18 },
          { wch: 18 },
          { wch: 18 }
        ];

        const sheetName = m.shortMonthName;
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
      });

      XLSX.writeFile(wb, `calendar-timetable-${state.year}.xlsx`);
      showToast('Calendar Excel workbook exported successfully!');
    } catch (err) {
      console.error(err);
      showToast('Failed to export Excel.', true);
    } finally {
      if (els.exportExcelBtn) {
        els.exportExcelBtn.disabled = false;
        els.exportExcelBtn.classList.remove('opacity-60');
      }
    }
  }

  // Dedicated Calendar Print Engine (Prints ONLY the selected month calendars, stretching to FULL PAGE)
  function handlePrintPdf() {
    const safeYear = Math.max(1900, Math.min(2100, Math.floor(state.year) || currentActualYear));
    const activeFilter = getDayFilter();
    const yearData = generateYearData(safeYear, state.weekStart, state.dateFormat, activeFilter);

    // Filter strictly to only selected months
    const monthsToDisplay = state.selectedMonths.map(idx => yearData.months[idx]).filter(Boolean);
    if (monthsToDisplay.length === 0) {
      showToast('No months selected to print.', true);
      return;
    }

    const headers = state.weekStart === 'monday' ? SHORT_DAYS_MON : SHORT_DAYS_SUN;

    let monthSummary = 'Full Year';
    if (monthsToDisplay.length === 1) {
      monthSummary = monthsToDisplay[0].monthName;
    } else if (monthsToDisplay.length < 12) {
      monthSummary = monthsToDisplay.map(m => m.shortMonthName).join(', ');
    }

    let monthsHtml = '';
    monthsToDisplay.forEach((m) => {
      const daysHeaderHtml = headers.map((day, idx) => {
        const isWeekendHeader = (state.weekStart === 'monday' && idx >= 5) || (state.weekStart === 'sunday' && (idx === 0 || idx === 6));
        return `<div class="grid-th ${isWeekendHeader ? 'we-th' : ''}">${day}</div>`;
      }).join('');

      const totalWeeks = m.calendarWeeks.length;

      let cellsHtml = '';
      for (const cell of m.calendarWeeks.flat()) {
        if (!cell) {
          cellsHtml += '<div class="grid-day-cell empty-cell"></div>';
          continue;
        }

        if (cell.isFilteredOut) {
          cellsHtml += `<div class="grid-day-cell filtered-cell"><span class="dim-num">${cell.dayOfMonth}</span></div>`;
          continue;
        }

        const isWe = cell.isWeekend;
        const notes = getNotes(cell.dateStr);
        const hasNotes = notes.length > 0;

        cellsHtml += `
          <div class="grid-day-cell ${isWe ? 'we-cell' : ''}">
            <div class="day-top-bar">
              <span class="day-num-big">${cell.dayOfMonth}</span>
              ${isWe ? '<span class="we-badge">W/E</span>' : ''}
            </div>
            ${hasNotes ? `<div class="day-notes-wrapper">${notes.map(n => renderFormattedNote(n, true)).join('')}</div>` : ''}
          </div>
        `;
      }

      monthsHtml += `
        <div class="month-page">
          <div class="month-top-header">
            <div class="month-title-group">
              <h1 class="month-heading">${m.monthName}</h1>
              <span class="month-year-badge">${m.year}</span>
            </div>
            <div class="month-meta-info">
              <span>${m.days.length} Days</span>
              <span style="margin: 0 4px;">•</span>
              <span>AIFreeCalculator.com Timetable</span>
            </div>
          </div>
          <div class="month-grid-full" style="grid-template-rows: 28px repeat(${totalWeeks}, minmax(0, 1fr));">
            ${daysHeaderHtml}
            ${cellsHtml}
          </div>
          <div class="page-footer">
            <span>📅 ${m.monthName} ${m.year} Timetable</span>
            <span>Generated on AIFreeCalculator.com · Free Printable Monthly Schedule</span>
          </div>
        </div>
      `;
    });

    const printHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${monthSummary} ${safeYear} — Calendar Timetable</title>
  <style>
    @page {
      size: landscape;
      margin: 6mm 8mm;
    }
    *, *::before, *::after {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      background: #ffffff;
      color: #0f172a;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }
    .month-page {
      width: 100%;
      height: 98vh;
      max-height: 98vh;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-after: always;
      page-break-inside: avoid;
      break-after: page;
      break-inside: avoid;
      padding: 0;
      overflow: hidden;
    }
    .month-page:last-child {
      page-break-after: auto;
      break-after: auto;
    }
    .month-top-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding-bottom: 5px;
      margin-bottom: 5px;
      border-bottom: 2px solid #0f172a;
      flex-shrink: 0;
    }
    .month-title-group {
      display: flex;
      align-items: baseline;
      gap: 10px;
    }
    .month-heading {
      margin: 0;
      font-size: 24px;
      font-weight: 900;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      color: #0f172a;
      line-height: 1;
    }
    .month-year-badge {
      font-size: 18px;
      font-weight: 800;
      color: #2563eb;
    }
    .month-meta-info {
      font-size: 11px;
      font-weight: 600;
      color: #64748b;
    }
    .month-grid-full {
      display: grid;
      grid-template-columns: repeat(7, minmax(0, 1fr));
      width: 100%;
      flex: 1 1 auto;
      height: calc(100% - 55px);
      border-top: 1.5px solid #94a3b8;
      border-left: 1.5px solid #94a3b8;
      box-sizing: border-box;
      overflow: hidden;
    }
    .grid-th {
      height: 28px;
      background: #f1f5f9 !important;
      color: #1e293b;
      font-size: 11px;
      font-weight: 800;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1.5px solid #94a3b8;
      border-bottom: 1.5px solid #94a3b8;
      box-sizing: border-box;
    }
    .grid-th.we-th {
      color: #e11d48;
      background: #ffe4e6 !important;
    }
    .grid-day-cell {
      border-right: 1.5px solid #94a3b8;
      border-bottom: 1.5px solid #94a3b8;
      padding: 4px 6px;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      overflow: hidden;
      box-sizing: border-box;
      min-height: 0;
      min-width: 0;
    }
    .grid-day-cell.we-cell {
      background: #fff8f9 !important;
    }
    .grid-day-cell.empty-cell {
      background: #f8fafc;
      opacity: 0.35;
    }
    .grid-day-cell.filtered-cell {
      background: #f8fafc;
      opacity: 0.3;
      padding: 4px;
    }
    .day-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
      flex-shrink: 0;
    }
    .day-num-big {
      font-size: 15px;
      font-weight: 800;
      color: #0f172a;
      line-height: 1;
    }
    .we-badge {
      font-size: 8px;
      font-weight: 800;
      color: #e11d48;
      background: #ffe4e6;
      padding: 1px 3px;
      border-radius: 3px;
      line-height: 1;
    }
    .day-notes-wrapper {
      margin-top: 2px;
      flex: 1 1 auto;
      overflow: hidden;
    }
    .day-note {
      font-size: 10px;
      line-height: 1.25;
      padding: 2px 4px;
      border-radius: 4px;
      margin-bottom: 2px;
      word-break: break-word;
      white-space: pre-wrap;
    }
    .dim-num {
      font-size: 11px;
      font-weight: 600;
      color: #94a3b8;
    }
    .page-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 4px;
      font-size: 8px;
      color: #94a3b8;
      flex-shrink: 0;
    }
  </style>
</head>
<body>
  ${monthsHtml}
</body>
</html>`;

    let iframe = document.getElementById('tt-monthly-print-iframe');
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'tt-monthly-print-iframe';
      iframe.style.position = 'fixed';
      iframe.style.top = '-10000px';
      iframe.style.left = '-10000px';
      iframe.style.width = '1100px';
      iframe.style.height = '800px';
      iframe.style.border = 'none';
      document.body.appendChild(iframe);
    }

    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(printHtml);
    doc.close();

    setTimeout(() => {
      try {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      } catch (err) {
        console.warn('Iframe print error, falling back to window.print', err);
        window.print();
      }
    }, 350);
  }

  // Attach Event Listeners
  function attachEventListeners() {
    // Year input
    if (els.yearInput) {
      els.yearInput.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        if (isNaN(val) || val < 1900 || val > 2100) {
          if (els.yearError) {
            els.yearError.textContent = 'Please enter a valid year between 1900 and 2100.';
            els.yearError.classList.remove('hidden');
          }
          return;
        }

        if (els.yearError) els.yearError.classList.add('hidden');
        state.year = val;
        render();
      });
    }

    if (els.yearPrevBtn) {
      els.yearPrevBtn.addEventListener('click', () => {
        if (state.year > 1900) {
          state.year--;
          if (els.yearInput) els.yearInput.value = state.year;
          if (els.yearError) els.yearError.classList.add('hidden');
          render();
        }
      });
    }

    if (els.yearNextBtn) {
      els.yearNextBtn.addEventListener('click', () => {
        if (state.year < 2100) {
          state.year++;
          if (els.yearInput) els.yearInput.value = state.year;
          if (els.yearError) els.yearError.classList.add('hidden');
          render();
        }
      });
    }

    // Month Select Dropdown
    if (els.monthSelect) {
      els.monthSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        if (val === 'all') {
          state.selectedMonths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        } else if (val === 'q1') {
          state.selectedMonths = [0, 1, 2];
        } else if (val === 'q2') {
          state.selectedMonths = [3, 4, 5];
        } else if (val === 'q3') {
          state.selectedMonths = [6, 7, 8];
        } else if (val === 'q4') {
          state.selectedMonths = [9, 10, 11];
        } else if (val === 'h1') {
          state.selectedMonths = [0, 1, 2, 3, 4, 5];
        } else if (val === 'h2') {
          state.selectedMonths = [6, 7, 8, 9, 10, 11];
        } else if (!isNaN(parseInt(val, 10))) {
          state.selectedMonths = [parseInt(val, 10)];
        }
        updateMonthSelectorUI();
        render();
      });
    }

    // Weekday & Weekend Toggles
    if (els.toggleWeekdays) {
      els.toggleWeekdays.addEventListener('change', (e) => {
        if (!e.target.checked && !state.showWeekends) {
          showToast('At least Weekdays or Weekends must be checked.', true);
          e.target.checked = true;
          return;
        }
        state.showWeekdays = e.target.checked;
        render();
      });
    }

    if (els.toggleWeekends) {
      els.toggleWeekends.addEventListener('change', (e) => {
        if (!e.target.checked && !state.showWeekdays) {
          showToast('At least Weekdays or Weekends must be checked.', true);
          e.target.checked = true;
          return;
        }
        state.showWeekends = e.target.checked;
        render();
      });
    }

    // Week Start Select
    if (els.weekStartSelect) {
      els.weekStartSelect.addEventListener('change', (e) => {
        state.weekStart = e.target.value;
        render();
      });
    }

    // Date Format Select
    if (els.dateFormatSelect) {
      els.dateFormatSelect.addEventListener('change', (e) => {
        state.dateFormat = e.target.value;
        render();
      });
    }

    // View Switching Buttons
    if (els.viewCalendarBtn) {
      els.viewCalendarBtn.addEventListener('click', () => {
        state.view = 'calendar';
        updateControlsUI();
        render();
      });
    }

    if (els.viewTableBtn) {
      els.viewTableBtn.addEventListener('click', () => {
        state.view = 'table';
        updateControlsUI();
        render();
      });
    }

    if (els.viewFullYearBtn) {
      els.viewFullYearBtn.addEventListener('click', () => {
        state.view = 'fullyear';
        updateControlsUI();
        render();
      });
    }

    // Dedicated Notes Toolbar: Bold
    if (els.dedicatedBoldBtn) {
      els.dedicatedBoldBtn.addEventListener('click', () => {
        wrapSelection(els.dedicatedNoteInput, '**', '**', 'bold note');
      });
    }

    // Dedicated Add Note Form Handler
    if (els.dedicatedAddNoteBtn) {
      els.dedicatedAddNoteBtn.addEventListener('click', () => {
        const dateVal = els.dedicatedDateInput ? els.dedicatedDateInput.value : '';
        const noteVal = els.dedicatedNoteInput ? els.dedicatedNoteInput.value : '';
        const sizeVal = els.dedicatedSizeSelect ? els.dedicatedSizeSelect.value : 'normal';

        if (!dateVal) {
          showToast('Please select a date first.', true);
          return;
        }

        if (!noteVal.trim()) {
          showToast('Please type a note or task.', true);
          return;
        }

        addNote(dateVal, {
          text: noteVal,
          size: sizeVal,
          color: 'amber'
        });
        if (els.dedicatedNoteInput) els.dedicatedNoteInput.value = '';
        showToast(`Added note for ${dateVal}!`);
      });
    }

    // Reset Button
    if (els.resetBtn) {
      els.resetBtn.addEventListener('click', () => {
        state.year = currentActualYear;
        state.selectedMonths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        state.view = 'calendar';
        state.showWeekdays = true;
        state.showWeekends = true;
        state.weekStart = 'sunday';
        state.dateFormat = 'DD-MM-YYYY';
        if (els.yearError) els.yearError.classList.add('hidden');
        updateControlsUI();
        render();
        showToast('Settings reset to default.');
      });
    }

    // Clear All Notes Button
    if (els.clearNotesBtn) {
      els.clearNotesBtn.addEventListener('click', () => {
        if (Object.keys(state.notes).length === 0) {
          showToast('No saved notes to clear.');
          return;
        }
        if (confirm('Are you sure you want to clear all custom schedule notes?')) {
          state.notes = {};
          saveNotesToStorage();
          render();
          showToast('All schedule notes cleared.');
        }
      });
    }

    // Modal Formatting Toolbar
    if (els.noteModalBoldBtn) {
      els.noteModalBoldBtn.addEventListener('click', () => {
        wrapSelection(els.noteModalInput, '**', '**', 'bold text');
      });
    }

    if (els.noteModalItalicBtn) {
      els.noteModalItalicBtn.addEventListener('click', () => {
        wrapSelection(els.noteModalInput, '*', '*', 'italic text');
      });
    }

    if (els.noteModalSizeSelect) {
      els.noteModalSizeSelect.addEventListener('change', (e) => {
        modalActiveSize = e.target.value;
      });
    }

    // Modal Color Chips
    document.querySelectorAll('.tt-modal-color-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const col = chip.getAttribute('data-color');
        if (col) {
          modalActiveColor = col;
          updateModalColorChipsUI();
        }
      });
    });

    // Modal Events
    if (els.noteModalCancelEditBtn) {
      els.noteModalCancelEditBtn.addEventListener('click', () => {
        resetModalInputForm();
      });
    }

    if (els.noteModalSaveBtn) {
      els.noteModalSaveBtn.addEventListener('click', () => {
        if (!currentEditingDateStr) return;
        const text = (els.noteModalInput ? els.noteModalInput.value : '').trim();
        if (!text) {
          showToast('Please type your note text first.', true);
          return;
        }

        if (currentEditingNoteId) {
          updateNote(currentEditingDateStr, currentEditingNoteId, {
            text: text,
            size: modalActiveSize,
            color: modalActiveColor
          });
          showToast('Note updated successfully!');
        } else {
          addNote(currentEditingDateStr, {
            text: text,
            size: modalActiveSize,
            color: modalActiveColor
          });
          showToast('New note added!');
        }

        resetModalInputForm();
        renderNoteModalExistingNotes();
      });
    }

    if (els.noteModalDeleteBtn) {
      els.noteModalDeleteBtn.addEventListener('click', () => {
        if (!currentEditingDateStr) return;
        if (confirm('Delete all notes for this date?')) {
          deleteAllNotesForDate(currentEditingDateStr);
          resetModalInputForm();
          renderNoteModalExistingNotes();
          showToast(`Cleared all notes for ${currentEditingDateStr}`);
        }
      });
    }

    if (els.noteModalCloseBtn) {
      els.noteModalCloseBtn.addEventListener('click', closeNoteModal);
    }

    if (els.noteModal) {
      els.noteModal.addEventListener('click', (e) => {
        if (e.target === els.noteModal) {
          closeNoteModal();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && els.noteModal && !els.noteModal.classList.contains('hidden')) {
        closeNoteModal();
      }
    });

    // Export CSV & Excel Buttons
    if (els.exportCsvBtn) els.exportCsvBtn.addEventListener('click', exportCSV);
    if (els.exportExcelBtn) els.exportExcelBtn.addEventListener('click', exportExcel);

    // Combined Print / PDF Button
    if (els.printPdfBtn) {
      els.printPdfBtn.addEventListener('click', handlePrintPdf);
    }
  }

  // Initialization
  function init() {
    loadNotes();
    readURLParams();
    updateControlsUI();
    attachEventListeners();
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
