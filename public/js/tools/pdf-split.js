/**
 * PDF Split Tool — 100% Client-Side
 * Uses pdf-lib to extract pages from a PDF and create new documents.
 */
(function () {
  'use strict';

  // ─── State ────────────────────────────────────────────────────────────────────
  var uploadedFile = null;
  var pdfDoc = null;
  var totalPages = 0;
  var isSplitting = false;

  // ─── DOM References ───────────────────────────────────────────────────────────
  var dropZone = document.getElementById('ps-drop-zone');
  var fileInput = document.getElementById('ps-file-input');
  var selectBtn = document.getElementById('ps-select-btn');
  var optionsSection = document.getElementById('ps-options-section');
  var filenameEl = document.getElementById('ps-filename');
  var pageCountEl = document.getElementById('ps-page-count');
  var fileSizeEl = document.getElementById('ps-file-size');
  var clearBtn = document.getElementById('ps-clear-btn');
  var pageInputSection = document.getElementById('ps-page-input-section');
  var pageInput = document.getElementById('ps-page-input');
  var splitBtn = document.getElementById('ps-split-btn');
  var statusSection = document.getElementById('ps-status-section');
  var statusIcon = document.getElementById('ps-status-icon');
  var statusTitle = document.getElementById('ps-status-title');
  var statusBody = document.getElementById('ps-status-body');
  var downloadSection = document.getElementById('ps-download-section');
  var errorBox = document.getElementById('ps-error-box');
  var errorText = document.getElementById('ps-error-text');

  // ─── Helpers ──────────────────────────────────────────────────────────────────

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(2) + ' MB';
  }

  function showError(msg) {
    if (!errorBox || !errorText) return;
    errorText.textContent = msg;
    errorBox.classList.remove('hidden');
    errorBox.classList.add('flex');
    errorBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function clearError() {
    if (!errorBox) return;
    errorBox.classList.add('hidden');
    errorBox.classList.remove('flex');
    errorText.textContent = '';
  }

  function setStatus(icon, title, body) {
    if (!statusSection) return;
    statusSection.classList.remove('hidden');
    if (statusIcon) statusIcon.textContent = icon;
    if (statusTitle) statusTitle.textContent = title;
    if (statusBody) statusBody.innerHTML = body;
  }

  function hideStatus() {
    if (statusSection) statusSection.classList.add('hidden');
  }

  function hideDownload() {
    if (downloadSection) {
      downloadSection.classList.add('hidden');
      downloadSection.innerHTML = '';
    }
  }

  function getSplitMode() {
    var radio = document.querySelector('input[name="split-mode"]:checked');
    return radio ? radio.value : 'pages';
  }

  // ─── Parse Page Selection ─────────────────────────────────────────────────────

  function parsePageSelection(input, maxPage) {
    var pages = new Set();
    var parts = input.split(',');

    for (var i = 0; i < parts.length; i++) {
      var part = parts[i].trim();
      if (!part) continue;

      if (part.includes('-')) {
        var range = part.split('-');
        if (range.length !== 2) throw new Error('Invalid range: ' + part);
        var start = parseInt(range[0].trim(), 10);
        var end = parseInt(range[1].trim(), 10);
        if (isNaN(start) || isNaN(end)) throw new Error('Invalid range: ' + part);
        if (start < 1 || end > maxPage) throw new Error('Range out of bounds: ' + part);
        if (start > end) throw new Error('Invalid range (start > end): ' + part);
        for (var p = start; p <= end; p++) {
          pages.add(p);
        }
      } else {
        var page = parseInt(part, 10);
        if (isNaN(page)) throw new Error('Invalid page number: ' + part);
        if (page < 1 || page > maxPage) throw new Error('Page out of bounds: ' + page);
        pages.add(page);
      }
    }

    return Array.from(pages).sort(function (a, b) { return a - b; });
  }

  // ─── File Handling ────────────────────────────────────────────────────────────

  function readFileAsArrayBuffer(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function (e) { resolve(e.target.result); };
      reader.onerror = function () { reject(new Error('Failed to read file')); };
      reader.readAsArrayBuffer(file);
    });
  }

  async function loadPDF(file) {
    if (typeof window.PDFLib === 'undefined') {
      showError('PDF library is still loading. Please wait and try again.');
      return;
    }

    clearError();
    hideStatus();
    hideDownload();
    setStatus('⏳', 'Loading PDF…', 'Reading your file and analyzing pages.');

    try {
      var arrayBuffer = await readFileAsArrayBuffer(file);
      var PDFDocument = window.PDFLib.PDFDocument;
      pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: false });
      totalPages = pdfDoc.getPageCount();

      if (totalPages === 0) {
        throw new Error('This PDF contains no pages.');
      }

      uploadedFile = file;

      if (filenameEl) filenameEl.textContent = file.name;
      if (pageCountEl) pageCountEl.textContent = totalPages + ' page' + (totalPages !== 1 ? 's' : '');
      if (fileSizeEl) fileSizeEl.textContent = formatBytes(file.size);

      if (dropZone) dropZone.classList.add('hidden');
      if (optionsSection) optionsSection.classList.remove('hidden');
      hideStatus();

    } catch (err) {
      console.error('[PDF Split]', err);
      var msg = err.message || 'Could not load PDF';
      if (msg.toLowerCase().includes('encrypt') || msg.toLowerCase().includes('password')) {
        msg = 'This PDF is password-protected. Remove the password before splitting.';
      }
      showError(msg);
      resetTool();
    }
  }

  function resetTool() {
    uploadedFile = null;
    pdfDoc = null;
    totalPages = 0;
    if (fileInput) fileInput.value = '';
    if (dropZone) dropZone.classList.remove('hidden');
    if (optionsSection) optionsSection.classList.add('hidden');
    hideStatus();
    hideDownload();
    clearError();
  }

  // ─── Split Operations ─────────────────────────────────────────────────────────

  async function doSplit() {
    if (isSplitting || !pdfDoc) return;
    if (typeof window.PDFLib === 'undefined') {
      showError('PDF library not loaded.');
      return;
    }

    var mode = getSplitMode();
    var PDFDocument = window.PDFLib.PDFDocument;

    isSplitting = true;
    clearError();
    hideDownload();
    if (splitBtn) splitBtn.disabled = true;

    try {
      if (mode === 'pages') {
        // Extract specific pages
        var input = pageInput ? pageInput.value.trim() : '';
        if (!input) {
          throw new Error('Please enter page numbers or ranges.');
        }
        var pages = parsePageSelection(input, totalPages);
        if (pages.length === 0) {
          throw new Error('No valid pages selected.');
        }

        setStatus('⏳', 'Extracting pages…', 'Creating PDF with selected pages.');

        var newDoc = await PDFDocument.create();
        var copiedPages = await newDoc.copyPages(pdfDoc, pages.map(function (p) { return p - 1; }));
        copiedPages.forEach(function (page) { newDoc.addPage(page); });

        var pdfBytes = await newDoc.save();
        var blob = new Blob([pdfBytes], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);

        downloadSection.innerHTML =
          '<div class="rounded-2xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/30 p-4">' +
            '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">' +
              '<div class="flex items-center gap-3">' +
                '<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white text-lg">✅</div>' +
                '<div>' +
                  '<p class="text-sm font-bold text-emerald-900 dark:text-emerald-200">Extraction complete</p>' +
                  '<p class="text-xs text-emerald-700 dark:text-emerald-400">' + pages.length + ' page' + (pages.length !== 1 ? 's' : '') + ' extracted</p>' +
                '</div>' +
              '</div>' +
              '<a href="' + url + '" download="extracted-pages.pdf" class="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white shadow transition no-underline">' +
                '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>' +
                'Download PDF' +
              '</a>' +
            '</div>' +
          '</div>';
        downloadSection.classList.remove('hidden');
        setStatus('✅', 'Split complete', pages.length + ' page' + (pages.length !== 1 ? 's' : '') + ' extracted successfully.');

      } else if (mode === 'each') {
        // Split each page into separate PDFs
        setStatus('⏳', 'Splitting pages…', 'Creating individual PDF for each page.');

        var downloads = [];
        for (var i = 0; i < totalPages; i++) {
          var doc = await PDFDocument.create();
          var [copiedPage] = await doc.copyPages(pdfDoc, [i]);
          doc.addPage(copiedPage);
          var bytes = await doc.save();
          var blob = new Blob([bytes], { type: 'application/pdf' });
          var url = URL.createObjectURL(blob);
          downloads.push({ url: url, name: 'page-' + (i + 1) + '.pdf', page: i + 1 });
        }

        var html = '<div class="space-y-3">';
        html += '<div class="rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/30 p-4">';
        html += '<p class="text-sm font-bold text-emerald-900 dark:text-emerald-200">✅ Split complete</p>';
        html += '<p class="text-xs text-emerald-700 dark:text-emerald-400">' + totalPages + ' individual PDF' + (totalPages !== 1 ? 's' : '') + ' created</p>';
        html += '</div>';
        html += '<div class="grid grid-cols-1 sm:grid-cols-2 gap-2">';
        downloads.forEach(function (d) {
          html += '<a href="' + d.url + '" download="' + d.name + '" class="flex items-center justify-between gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-600 transition no-underline group">';
          html += '<span class="text-xs font-semibold text-slate-900 dark:text-white">Page ' + d.page + '</span>';
          html += '<span class="text-blue-600 dark:text-blue-400 text-xs group-hover:underline">Download</span>';
          html += '</a>';
        });
        html += '</div></div>';
        downloadSection.innerHTML = html;
        downloadSection.classList.remove('hidden');
        setStatus('✅', 'Split complete', totalPages + ' PDF' + (totalPages !== 1 ? 's' : '') + ' created successfully.');

      } else if (mode === 'ranges') {
        // Split by ranges (same as pages for now, but can be extended)
        var input = pageInput ? pageInput.value.trim() : '';
        if (!input) {
          throw new Error('Please enter page ranges (e.g., 1-3, 5-8).');
        }
        var pages = parsePageSelection(input, totalPages);
        if (pages.length === 0) {
          throw new Error('No valid pages selected.');
        }

        setStatus('⏳', 'Extracting pages…', 'Creating PDF with selected pages.');

        var newDoc = await PDFDocument.create();
        var copiedPages = await newDoc.copyPages(pdfDoc, pages.map(function (p) { return p - 1; }));
        copiedPages.forEach(function (page) { newDoc.addPage(page); });

        var pdfBytes = await newDoc.save();
        var blob = new Blob([pdfBytes], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);

        downloadSection.innerHTML =
          '<div class="rounded-2xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/30 p-4">' +
            '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">' +
              '<div class="flex items-center gap-3">' +
                '<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white text-lg">✅</div>' +
                '<div>' +
                  '<p class="text-sm font-bold text-emerald-900 dark:text-emerald-200">Extraction complete</p>' +
                  '<p class="text-xs text-emerald-700 dark:text-emerald-400">' + pages.length + ' page' + (pages.length !== 1 ? 's' : '') + ' extracted</p>' +
                '</div>' +
              '</div>' +
              '<a href="' + url + '" download="extracted-pages.pdf" class="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white shadow transition no-underline">' +
                '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>' +
                'Download PDF' +
              '</a>' +
            '</div>' +
          '</div>';
        downloadSection.classList.remove('hidden');
        setStatus('✅', 'Split complete', pages.length + ' page' + (pages.length !== 1 ? 's' : '') + ' extracted successfully.');
      }

    } catch (err) {
      console.error('[PDF Split]', err);
      showError(err.message || 'An error occurred while splitting.');
      hideStatus();
    } finally {
      isSplitting = false;
      if (splitBtn) splitBtn.disabled = false;
    }
  }

  // ─── Drag & Drop ──────────────────────────────────────────────────────────────

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function onDragOver(e) {
    preventDefaults(e);
    if (dropZone) dropZone.classList.add('ps-drag-active');
  }

  function onDragLeave(e) {
    preventDefaults(e);
    if (dropZone) dropZone.classList.remove('ps-drag-active');
  }

  function onDrop(e) {
    preventDefaults(e);
    if (dropZone) dropZone.classList.remove('ps-drag-active');
    var dt = e.dataTransfer;
    if (dt && dt.files && dt.files.length > 0) {
      loadPDF(dt.files[0]);
    }
  }

  document.addEventListener('dragover', preventDefaults, false);
  document.addEventListener('drop', preventDefaults, false);

  // ─── Event Listeners ──────────────────────────────────────────────────────────

  if (dropZone) {
    dropZone.addEventListener('dragover', onDragOver, false);
    dropZone.addEventListener('dragleave', onDragLeave, false);
    dropZone.addEventListener('drop', onDrop, false);
    dropZone.addEventListener('click', function (e) {
      if (e.target === dropZone || e.target.closest('#ps-drop-zone') === dropZone) {
        if (fileInput) fileInput.click();
      }
    });
    dropZone.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (fileInput) fileInput.click();
      }
    });
  }

  if (selectBtn) {
    selectBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (fileInput) fileInput.click();
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', function () {
      if (fileInput.files && fileInput.files.length > 0) {
        loadPDF(fileInput.files[0]);
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', resetTool);
  }

  if (splitBtn) {
    splitBtn.addEventListener('click', doSplit);
  }

  // Handle mode changes
  document.querySelectorAll('input[name="split-mode"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      var mode = getSplitMode();
      if (mode === 'each') {
        if (pageInputSection) pageInputSection.classList.add('hidden');
      } else {
        if (pageInputSection) pageInputSection.classList.remove('hidden');
      }
      hideDownload();
      hideStatus();
    });
  });

})();
