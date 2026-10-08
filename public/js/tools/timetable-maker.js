/**
 * Interactive Client-Side Timetable Maker Engine
 * Features:
 * 1. Clean visual Time Picker (Hour : Minute AM/PM) without awkward native clipping
 * 2. Dedicated print-only mode: ONLY the timetable schedule prints (no headers, footers, SEO, ads)
 * AIFreeCalculator.com
 */

(function () {
  'use strict';

  // Inject Dedicated Print-Only Stylesheet (Normal Flow, No Blank Page)
  const printStyleId = 'tt-dedicated-print-style';
  if (!document.getElementById(printStyleId)) {
    const styleEl = document.createElement('style');
    styleEl.id = printStyleId;
    styleEl.textContent = `
      @media print {
        @page {
          size: landscape;
          margin: 6mm;
        }

        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }

        /* Hide all page chrome, ads, sidebars, seo prose, faqs, headers, footers */
        header,
        footer,
        nav,
        aside,
        .prose,
        details,
        #tt-entry-modal,
        .print\\:hidden,
        .tt-no-print,
        [data-slot-seo],
        .ad-slot,
        [id*="ad-"],
        #feedback-banner {
          display: none !important;
        }

        body {
          background: #ffffff !important;
          color: #000000 !important;
          margin: 0 !important;
          padding: 4mm !important;
        }

        /* Keep containers in normal flow so height is never 0 */
        main,
        .max-w-7xl,
        .grid,
        .min-w-0,
        .rounded-3xl,
        #tt-print-container {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          border: none !important;
          box-shadow: none !important;
          background: #ffffff !important;
        }

        #tt-print-container {
          position: static !important;
        }

        #tt-grid-container table {
          width: 100% !important;
          border-collapse: collapse !important;
          page-break-inside: avoid !important;
        }
        #tt-grid-container th,
        #tt-grid-container td {
          border: 1px solid #cbd5e1 !important;
          color: #0f172a !important;
        }
        #tt-grid-container th {
          background-color: #f1f5f9 !important;
          font-weight: 700 !important;
        }
        #tt-grid-container td {
          background-color: #ffffff !important;
        }
        #tt-grid-container [class*="rounded-lg"] {
          border-width: 1.5px !important;
          box-shadow: none !important;
          margin-bottom: 2px !important;
          padding: 2px 4px !important;
        }
      }
    `;
    document.head.appendChild(styleEl);
  }

  // Available event colors
  const COLOR_PALETTES = [
    { id: 'indigo', bg: 'bg-indigo-100 dark:bg-indigo-950/70', border: 'border-indigo-300 dark:border-indigo-700', text: 'text-indigo-800 dark:text-indigo-200', tag: 'bg-indigo-500' },
    { id: 'emerald', bg: 'bg-emerald-100 dark:bg-emerald-950/70', border: 'border-emerald-300 dark:border-emerald-700', text: 'text-emerald-800 dark:text-emerald-200', tag: 'bg-emerald-500' },
    { id: 'rose', bg: 'bg-rose-100 dark:bg-rose-950/70', border: 'border-rose-300 dark:border-rose-700', text: 'text-rose-800 dark:text-rose-200', tag: 'bg-rose-500' },
    { id: 'amber', bg: 'bg-amber-100 dark:bg-amber-950/70', border: 'border-amber-300 dark:border-amber-700', text: 'text-amber-800 dark:text-amber-200', tag: 'bg-amber-500' },
    { id: 'purple', bg: 'bg-purple-100 dark:bg-purple-950/70', border: 'border-purple-300 dark:border-purple-700', text: 'text-purple-800 dark:text-purple-200', tag: 'bg-purple-500' },
    { id: 'sky', bg: 'bg-sky-100 dark:bg-sky-950/70', border: 'border-sky-300 dark:border-sky-700', text: 'text-sky-800 dark:text-sky-200', tag: 'bg-sky-500' },
    { id: 'pink', bg: 'bg-pink-100 dark:bg-pink-950/70', border: 'border-pink-300 dark:border-pink-700', text: 'text-pink-800 dark:text-pink-200', tag: 'bg-pink-500' },
    { id: 'teal', bg: 'bg-teal-100 dark:bg-teal-950/70', border: 'border-teal-300 dark:border-teal-700', text: 'text-teal-800 dark:text-teal-200', tag: 'bg-teal-500' }
  ];

  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const DEFAULT_TIMES = [
    '08:00 AM',
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM'
  ];

  let config = window.__TIMETABLE_CONFIG || {
    toolSlug: 'timetable-maker',
    defaultTitle: 'Weekly Timetable Schedule',
    daysCount: 7,
    items: []
  };

  const storageKey = 'timetable_' + (config.toolSlug || 'default');

  // Load state from localStorage or default
  let scheduleState = {
    title: config.defaultTitle || 'My Schedule',
    daysCount: config.daysCount || 7,
    timeSlots: [...DEFAULT_TIMES],
    items: []
  };

  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && Array.isArray(parsed.items)) {
        scheduleState.items = parsed.items;
        if (parsed.title) scheduleState.title = parsed.title;
        if (parsed.daysCount) scheduleState.daysCount = parsed.daysCount;
        if (Array.isArray(parsed.timeSlots) && parsed.timeSlots.length > 0) {
          scheduleState.timeSlots = parsed.timeSlots;
        }
      }
    }
  } catch (e) {
    console.warn('LocalStorage access error', e);
  }

  // If no items loaded, populate with preset
  if (!scheduleState.items || scheduleState.items.length === 0) {
    scheduleState.items = Array.isArray(config.items) ? [...config.items] : [];
    if (!scheduleState.title && config.defaultTitle) {
      scheduleState.title = config.defaultTitle;
    }
  }

  function saveState() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(scheduleState));
    } catch (e) {}
  }

  // Time manipulation & parsing helpers
  function parseTimeToParts(timeStr) {
    if (!timeStr) return { h: '08', m: '00', ampm: 'AM' };
    const match = timeStr.trim().match(/(\d{1,2}):(\d{2})(?:\s*([APap][Mm]))?/);
    if (!match) return { h: '08', m: '00', ampm: 'AM' };
    let h = parseInt(match[1], 10);
    let m = parseInt(match[2], 10);
    let ampm = match[3] ? match[3].toUpperCase() : 'AM';
    if (h > 12) {
      h -= 12;
      ampm = 'PM';
    } else if (h === 0) {
      h = 12;
      ampm = 'AM';
    }
    return {
      h: String(h).padStart(2, '0'),
      m: String(m).padStart(2, '0'),
      ampm: ampm
    };
  }

  function timeToMinutes(str) {
    if (!str) return -1;
    const match = str.trim().match(/(\d{1,2}):(\d{2})(?:\s*([APap][Mm]))?/);
    if (!match) return -1;
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const ampm = match[3] ? match[3].toUpperCase() : null;
    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  }

  function parseHourKey(str) {
    if (!str) return '';
    const match = str.trim().match(/(\d{1,2}):(\d{2})(?:\s*([APap][Mm]))?/);
    if (!match) return str.trim().toLowerCase();
    let hours = parseInt(match[1], 10);
    const ampm = match[3] ? match[3].toUpperCase() : (hours >= 12 ? 'PM' : 'AM');
    if (hours > 12) hours -= 12;
    return `${String(hours).padStart(2, '0')} ${ampm}`;
  }

  function addMinutesToTime(timeStr, minsToAdd) {
    let total = timeToMinutes(timeStr);
    if (total === -1) total = 8 * 60;
    let endTotal = (total + minsToAdd) % (24 * 60);
    let h = Math.floor(endTotal / 60);
    let m = endTotal % 60;
    let ampm = h >= 12 ? 'PM' : 'AM';
    let h12 = h % 12;
    if (h12 === 0) h12 = 12;
    return `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
  }

  function matchItemToSlot(item, timeSlot) {
    if (item.slot && item.slot === timeSlot) return true;
    if (item.time && item.time === timeSlot) return true;
    const itemHour = parseHourKey(item.time);
    const slotHour = parseHourKey(timeSlot);
    if (itemHour && slotHour && itemHour === slotHour) return true;
    return false;
  }

  // DOM Elements
  const titleInput = document.getElementById('tt-title-input');
  const printTitleHeader = document.getElementById('tt-print-title');
  const daysToggleBtn = document.getElementById('tt-days-toggle-btn');
  const addEntryBtn = document.getElementById('tt-add-entry-btn');
  const resetBtn = document.getElementById('tt-reset-btn');
  const clearBtn = document.getElementById('tt-clear-btn');
  const printBtn = document.getElementById('tt-print-btn');
  const exportBtn = document.getElementById('tt-export-btn');
  const gridContainer = document.getElementById('tt-grid-container');
  const statsCount = document.getElementById('tt-total-events');

  // Modal elements
  const modal = document.getElementById('tt-entry-modal');
  const modalCloseBtn = document.getElementById('tt-modal-close-btn');
  const modalSaveBtn = document.getElementById('tt-modal-save-btn');
  const modalDeleteBtn = document.getElementById('tt-modal-delete-btn');
  const entryIdInput = document.getElementById('tt-modal-id');
  const entrySlotInput = document.getElementById('tt-modal-slot');
  const entryTitleInput = document.getElementById('tt-modal-title');
  const entryDaySelect = document.getElementById('tt-modal-day');
  const entryLocationInput = document.getElementById('tt-modal-location');
  const entryColorRadios = document.querySelectorAll('input[name="tt-modal-color"]');
  const quickDurBtns = document.querySelectorAll('.tt-quick-dur');
  const durPreview = document.getElementById('tt-dur-preview');

  // Time picker components
  const startHourSelect = document.getElementById('tt-start-hour');
  const startMinSelect = document.getElementById('tt-start-min');
  const startAmPmSelect = document.getElementById('tt-start-ampm');

  const endHourSelect = document.getElementById('tt-end-hour');
  const endMinSelect = document.getElementById('tt-end-min');
  const endAmPmSelect = document.getElementById('tt-end-ampm');

  function getFormattedStartTime() {
    if (!startHourSelect || !startMinSelect || !startAmPmSelect) return '08:00 AM';
    return `${startHourSelect.value}:${startMinSelect.value} ${startAmPmSelect.value}`;
  }

  function getFormattedEndTime() {
    if (!endHourSelect || !endMinSelect || !endAmPmSelect) return '09:00 AM';
    return `${endHourSelect.value}:${endMinSelect.value} ${endAmPmSelect.value}`;
  }

  function setStartTimeParts(timeStr) {
    const parts = parseTimeToParts(timeStr);
    if (startHourSelect) startHourSelect.value = parts.h;
    if (startMinSelect) startMinSelect.value = parts.m;
    if (startAmPmSelect) startAmPmSelect.value = parts.ampm;
    updateDurationPreview();
  }

  function setEndTimeParts(timeStr) {
    const parts = parseTimeToParts(timeStr);
    if (endHourSelect) endHourSelect.value = parts.h;
    if (endMinSelect) endMinSelect.value = parts.m;
    if (endAmPmSelect) endAmPmSelect.value = parts.ampm;
    updateDurationPreview();
  }

  function updateDurationPreview() {
    if (!durPreview) return;
    const startMins = timeToMinutes(getFormattedStartTime());
    const endMins = timeToMinutes(getFormattedEndTime());
    if (startMins >= 0 && endMins >= 0) {
      let diff = endMins - startMins;
      if (diff < 0) diff += 24 * 60;
      durPreview.textContent = `${diff} mins duration`;
    }
  }

  // Listen to time selects change
  [startHourSelect, startMinSelect, startAmPmSelect, endHourSelect, endMinSelect, endAmPmSelect].forEach((el) => {
    if (el) el.addEventListener('change', updateDurationPreview);
  });

  if (titleInput) {
    titleInput.value = scheduleState.title;
    titleInput.addEventListener('input', function () {
      scheduleState.title = this.value;
      if (printTitleHeader) printTitleHeader.textContent = this.value;
      saveState();
    });
  }

  // Setup quick duration buttons (+15m, +30m, +45m, +1h, +1.5h)
  quickDurBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      const mins = parseInt(this.getAttribute('data-mins'), 10) || 60;
      const startTime = getFormattedStartTime();
      const calculatedEnd = addMinutesToTime(startTime, mins);
      setEndTimeParts(calculatedEnd);
    });
  });

  function renderGrid() {
    if (!gridContainer) return;

    if (printTitleHeader) {
      printTitleHeader.textContent = scheduleState.title || 'My Timetable Schedule';
    }

    const visibleDays = scheduleState.daysCount === 5 ? DAYS.slice(0, 5) : DAYS;
    const timeSlots = scheduleState.timeSlots || DEFAULT_TIMES;

    // Build Table Header
    let html = `
      <div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm print:border print:border-slate-300 print:shadow-none">
        <table class="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr class="bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800">
              <th class="p-2 sm:p-3 font-bold text-slate-500 dark:text-slate-400 w-24 sm:w-32 text-center uppercase tracking-wider text-[11px] border-r border-slate-200 dark:border-slate-800">
                Time (Slot)
              </th>`;

    for (const d of visibleDays) {
      html += `
              <th class="p-2 sm:p-3 font-bold text-slate-800 dark:text-slate-200 text-center uppercase tracking-wider border-r border-slate-200 dark:border-slate-800 last:border-r-0">
                ${d}
              </th>`;
    }

    html += `
            </tr>
          </thead>
          <tbody>`;

    for (const timeSlot of timeSlots) {
      html += `
            <tr class="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
              <td class="p-2 sm:p-3 font-mono text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300 text-center bg-slate-50/60 dark:bg-slate-900/60 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap">
                <div class="flex items-center justify-center gap-1.5 group/time">
                  <span class="cursor-pointer hover:text-blue-600" title="Click to rename time slot" onclick="window.__TT_EDIT_SLOT('${timeSlot}')">${timeSlot}</span>
                  <button type="button" class="hidden group-hover/time:inline-block text-[10px] text-slate-400 hover:text-blue-600 cursor-pointer print:hidden" title="Edit this time slot" onclick="event.stopPropagation(); window.__TT_EDIT_SLOT('${timeSlot}')">✏️</button>
                </div>
              </td>`;

      for (const d of visibleDays) {
        const eventsInCell = scheduleState.items.filter(
          (item) => item.day === d && matchItemToSlot(item, timeSlot)
        );

        html += `
              <td class="p-1.5 sm:p-2 border-r border-slate-100 dark:border-slate-800/60 last:border-r-0 align-top min-w-27.5 sm:min-w-32.5 h-16 relative group cursor-pointer hover:bg-blue-50/40 dark:hover:bg-blue-950/20"
                  data-day="${d}" data-slot="${timeSlot}" onclick="window.__TT_OPEN_ADD('${d}', '${timeSlot}')">`;

        if (eventsInCell.length > 0) {
          for (const ev of eventsInCell) {
            const palette = COLOR_PALETTES.find((p) => p.id === ev.color) || COLOR_PALETTES[0];
            const timeRange = ev.endTime ? `${ev.time} - ${ev.endTime}` : ev.time;
            html += `
                <div class="mb-1 p-1.5 rounded-lg border ${palette.border} ${palette.bg} ${palette.text} shadow-xs transition transform hover:scale-[1.02] cursor-pointer"
                     onclick="event.stopPropagation(); window.__TT_OPEN_EDIT('${ev.id}')"
                     title="${ev.title} (${timeRange}) ${ev.location ? '📍 ' + ev.location : ''}">
                  <div class="font-bold text-xs leading-tight line-clamp-1">${ev.title}</div>
                  <div class="flex items-center justify-between text-[10px] mt-0.5 opacity-85 font-mono">
                    <span class="truncate font-semibold">${timeRange}</span>
                    ${ev.location ? `<span class="truncate ml-1 font-sans">📍${ev.location}</span>` : ''}
                  </div>
                </div>`;
          }
        } else {
          html += `
                <div class="hidden group-hover:flex items-center justify-center h-full text-slate-300 dark:text-slate-600 font-bold text-lg select-none print:hidden">
                  +
                </div>`;
        }

        html += `</td>`;
      }

      html += `</tr>`;
    }

    // Bottom Bar for Adding Custom Slot
    html += `
            <tr class="print:hidden">
              <td colspan="${visibleDays.length + 1}" class="p-2.5 text-center bg-slate-50/40 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800">
                <button type="button" onclick="window.__TT_ADD_SLOT()" class="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 inline-flex items-center gap-1.5 cursor-pointer">
                  <span>+</span> Add Custom Time Slot / Row (With Minutes)
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>`;

    gridContainer.innerHTML = html;

    if (statsCount) {
      statsCount.textContent = scheduleState.items.length;
    }

    if (daysToggleBtn) {
      daysToggleBtn.textContent = scheduleState.daysCount === 5 ? '5 Days (Mon-Fri)' : '7 Days (Mon-Sun)';
    }
  }

  function showModal() {
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  function hideModal() {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  // Global hooks for time slot management
  window.__TT_EDIT_SLOT = function (oldSlot) {
    const newSlot = prompt('Edit Time Slot Label (e.g. 08:30 AM or 08:30 - 09:15):', oldSlot);
    if (newSlot && newSlot.trim() && newSlot.trim() !== oldSlot) {
      const trimmed = newSlot.trim();
      const idx = scheduleState.timeSlots.indexOf(oldSlot);
      if (idx >= 0) {
        scheduleState.timeSlots[idx] = trimmed;
        scheduleState.items.forEach((item) => {
          if (item.slot === oldSlot) item.slot = trimmed;
          if (item.time === oldSlot) item.time = trimmed;
        });
        saveState();
        renderGrid();
      }
    }
  };

  window.__TT_ADD_SLOT = function () {
    const newSlot = prompt('Enter New Time Slot (e.g. 05:30 PM, 06:15 PM, 07:45 PM):');
    if (newSlot && newSlot.trim()) {
      const trimmed = newSlot.trim();
      if (!scheduleState.timeSlots.includes(trimmed)) {
        scheduleState.timeSlots.push(trimmed);
        saveState();
        renderGrid();
      }
    }
  };

  // Global hooks for cell clicks
  window.__TT_OPEN_ADD = function (day, timeSlot) {
    if (!modal) return;
    if (entryIdInput) entryIdInput.value = '';
    if (entrySlotInput) entrySlotInput.value = timeSlot || '09:00 AM';
    if (entryTitleInput) entryTitleInput.value = '';
    if (entryDaySelect) entryDaySelect.value = day || 'Mon';
    if (entryLocationInput) entryLocationInput.value = '';

    const defaultStartTime = timeSlot || '09:00 AM';
    setStartTimeParts(defaultStartTime);
    setEndTimeParts(addMinutesToTime(defaultStartTime, 60));

    if (modalDeleteBtn) modalDeleteBtn.classList.add('hidden');
    showModal();
    if (entryTitleInput) entryTitleInput.focus();
  };

  window.__TT_OPEN_EDIT = function (id) {
    const item = scheduleState.items.find((i) => i.id === id);
    if (!item || !modal) return;
    if (entryIdInput) entryIdInput.value = item.id;
    if (entrySlotInput) entrySlotInput.value = item.slot || item.time || '09:00 AM';
    if (entryTitleInput) entryTitleInput.value = item.title;
    if (entryDaySelect) entryDaySelect.value = item.day;
    if (entryLocationInput) entryLocationInput.value = item.location || '';

    setStartTimeParts(item.time || '09:00 AM');
    setEndTimeParts(item.endTime || addMinutesToTime(item.time || '09:00 AM', 60));

    entryColorRadios.forEach((r) => {
      r.checked = r.value === item.color;
    });

    if (modalDeleteBtn) modalDeleteBtn.classList.remove('hidden');
    showModal();
    if (entryTitleInput) entryTitleInput.focus();
  };

  // Modal Handlers
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', hideModal);
  }

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) hideModal();
    });
  }

  if (modalSaveBtn) {
    modalSaveBtn.addEventListener('click', function () {
      const title = entryTitleInput.value.trim();
      if (!title) {
        alert('Please enter an activity title or subject.');
        entryTitleInput.focus();
        return;
      }

      let selectedColor = 'indigo';
      entryColorRadios.forEach((r) => {
        if (r.checked) selectedColor = r.value;
      });

      const currentId = entryIdInput ? entryIdInput.value : '';
      const customStartTime = getFormattedStartTime();
      const customEndTime = getFormattedEndTime();
      const activeSlot = entrySlotInput ? entrySlotInput.value : customStartTime;

      const newItem = {
        id: currentId || 'item_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        title: title,
        day: entryDaySelect ? entryDaySelect.value : 'Mon',
        slot: activeSlot,
        time: customStartTime,
        endTime: customEndTime,
        location: entryLocationInput ? entryLocationInput.value.trim() : '',
        color: selectedColor
      };

      if (currentId) {
        const idx = scheduleState.items.findIndex((i) => i.id === currentId);
        if (idx >= 0) scheduleState.items[idx] = newItem;
      } else {
        scheduleState.items.push(newItem);
      }

      saveState();
      renderGrid();
      hideModal();
    });
  }

  if (modalDeleteBtn) {
    modalDeleteBtn.addEventListener('click', function () {
      const currentId = entryIdInput ? entryIdInput.value : '';
      if (currentId) {
        scheduleState.items = scheduleState.items.filter((i) => i.id !== currentId);
        saveState();
        renderGrid();
      }
      hideModal();
    });
  }

  // Days Toggle
  if (daysToggleBtn) {
    daysToggleBtn.addEventListener('click', function () {
      scheduleState.daysCount = scheduleState.daysCount === 5 ? 7 : 5;
      saveState();
      renderGrid();
    });
  }

  // Add Entry Button
  if (addEntryBtn) {
    addEntryBtn.addEventListener('click', function () {
      window.__TT_OPEN_ADD('Mon', scheduleState.timeSlots[0] || '08:00 AM');
    });
  }

  // Reset Button
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      if (confirm('Reset timetable to original template preset?')) {
        scheduleState.items = Array.isArray(config.items) ? [...config.items] : [];
        scheduleState.title = config.defaultTitle || 'My Schedule';
        scheduleState.timeSlots = [...DEFAULT_TIMES];
        if (titleInput) titleInput.value = scheduleState.title;
        saveState();
        renderGrid();
      }
    });
  }

  // Clear Button
  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      if (confirm('Are you sure you want to clear all activities?')) {
        scheduleState.items = [];
        saveState();
        renderGrid();
      }
    });
  }

  // Dedicated Standalone Print Engine (No blank page, zero website chrome)
  function printTimetableDocument() {
    const title = (scheduleState && scheduleState.title) || (titleInput ? titleInput.value : 'Weekly Timetable Schedule');
    const visibleDays = scheduleState.daysCount === 5 ? DAYS.slice(0, 5) : DAYS;
    const timeSlots = scheduleState.timeSlots || DEFAULT_TIMES;

    const PRINT_COLORS = {
      indigo: { bg: '#e0e7ff', border: '#6366f1', text: '#312e81' },
      emerald: { bg: '#d1fae5', border: '#10b981', text: '#064e3b' },
      rose: { bg: '#ffe4e6', border: '#f43f5e', text: '#881337' },
      amber: { bg: '#fef3c7', border: '#f59e0b', text: '#78350f' },
      purple: { bg: '#f3e8ff', border: '#a855f7', text: '#581c87' },
      sky: { bg: '#e0f2fe', border: '#0ea5e9', text: '#0c4a6e' },
      pink: { bg: '#fce7f3', border: '#ec4899', text: '#831843' },
      teal: { bg: '#ccfbf1', border: '#14b8a6', text: '#134e4a' }
    };

    function escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    let rowsHtml = '';
    for (const slot of timeSlots) {
      rowsHtml += '<tr>';
      rowsHtml += `<td class="slot-cell">${escapeHtml(slot)}</td>`;
      for (const d of visibleDays) {
        const events = scheduleState.items.filter(
          (item) => item.day === d && matchItemToSlot(item, slot)
        );
        rowsHtml += '<td class="day-cell">';
        for (const ev of events) {
          const col = PRINT_COLORS[ev.color] || PRINT_COLORS.indigo;
          const timeRange = ev.endTime ? `${ev.time} - ${ev.endTime}` : ev.time;
          rowsHtml += `
            <div class="card" style="background:${col.bg}; border-color:${col.border}; color:${col.text};">
              <div class="card-title">${escapeHtml(ev.title)}</div>
              <div class="card-meta">
                <span>⏱ ${escapeHtml(timeRange)}</span>
                ${ev.location ? `<span style="margin-left:6px;">📍 ${escapeHtml(ev.location)}</span>` : ''}
              </div>
            </div>
          `;
        }
        rowsHtml += '</td>';
      }
      rowsHtml += '</tr>';
    }

    let headersHtml = '<th style="width: 90px;">Time</th>';
    for (const d of visibleDays) {
      headersHtml += `<th>${d}</th>`;
    }

    const printHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(title)} - Timetable</title>
  <style>
    @page {
      size: landscape;
      margin: 6mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
    }
    .header {
      text-align: center;
      margin-bottom: 10px;
      padding-bottom: 6px;
      border-bottom: 2px solid #cbd5e1;
    }
    .header h1 {
      margin: 0;
      font-size: 20px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #0f172a;
    }
    .header p {
      margin: 2px 0 0;
      font-size: 11px;
      color: #64748b;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }
    th, td {
      border: 1px solid #cbd5e1;
      padding: 5px 6px;
      vertical-align: top;
    }
    th {
      background: #f1f5f9 !important;
      color: #0f172a;
      font-size: 11px;
      font-weight: 700;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 6px 4px;
    }
    td.slot-cell {
      background: #f8fafc !important;
      font-weight: 700;
      text-align: center;
      font-family: monospace;
      font-size: 11px;
      color: #334155;
      vertical-align: middle;
      width: 90px;
    }
    td.day-cell {
      min-height: 44px;
      background: #ffffff;
    }
    .card {
      border-width: 1.5px;
      border-style: solid;
      border-radius: 6px;
      padding: 3px 5px;
      margin-bottom: 3px;
      page-break-inside: avoid;
    }
    .card:last-child {
      margin-bottom: 0;
    }
    .card-title {
      font-weight: 700;
      font-size: 11px;
      line-height: 1.2;
    }
    .card-meta {
      font-size: 9.5px;
      margin-top: 2px;
      opacity: 0.95;
      font-family: monospace;
    }
    .footer {
      margin-top: 8px;
      text-align: right;
      font-size: 9px;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${escapeHtml(title)}</h1>
    <p>AIFreeCalculator.com · Weekly Timetable Planner</p>
  </div>
  <table>
    <thead>
      <tr>${headersHtml}</tr>
    </thead>
    <tbody>
      ${rowsHtml}
    </tbody>
  </table>
  <div class="footer">
    Created with AIFreeCalculator.com Timetable Maker
  </div>
</body>
</html>`;

    let iframe = document.getElementById('tt-print-iframe');
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'tt-print-iframe';
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

  // Expose print method globally
  window.__TT_PRINT = printTimetableDocument;

  // Print Button: Print ONLY the timetable
  if (printBtn) {
    printBtn.addEventListener('click', function () {
      printTimetableDocument();
    });
  }

  // Export JSON Button
  if (exportBtn) {
    exportBtn.addEventListener('click', function () {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(scheduleState, null, 2));
      const a = document.createElement('a');
      a.setAttribute('href', dataStr);
      a.setAttribute('download', (scheduleState.title || 'timetable').toLowerCase().replace(/\s+/g, '-') + '.json');
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  }

  // Initial render
  renderGrid();
})();
