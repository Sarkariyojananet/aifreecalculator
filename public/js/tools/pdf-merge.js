/**
 * PDF Merge Tool — 100% Client-Side
 * Uses pdf-lib (loaded from CDN) to copy pages from multiple PDFs into one.
 * No files are uploaded to any server. All processing happens in the browser.
 */
(function () {
  'use strict';

  // ─── State ────────────────────────────────────────────────────────────────────
  var fileQueue = [];   // [{ id, file, name, size }]
  var mergedBlobUrl = null;
  var isMerging = false;
  var nextId = 0;

  // ─── DOM References ───────────────────────────────────────────────────────────
  var dropZone        = document.getElementById('pm-drop-zone');
  var fileInput       = document.getElementById('pm-file-input');
  var selectBtn       = document.getElementById('pm-select-btn');
  var fileListSection = document.getElementById('pm-file-list-section');
  var fileListEl      = document.getElementById('pm-file-list');
  var totalCountEl    = document.getElementById('pm-total-count');
  var totalSizeEl     = document.getElementById('pm-total-size');
  var mergeBtn        = document.getElementById('pm-merge-btn');
  var clearBtn        = document.getElementById('pm-clear-btn');
  var statusSection   = document.getElementById('pm-status-section');
  var statusIcon      = document.getElementById('pm-status-icon');
  var statusTitle     = document.getElementById('pm-status-title');
  var statusBody      = document.getElementById('pm-status-body');
  var downloadSection = document.getElementById('pm-download-section');
  var downloadBtn     = document.getElementById('pm-download-btn');
  var errorBox        = document.getElementById('pm-error-box');
  var errorText       = document.getElementById('pm-error-text');
  var minWarning      = document.getElementById('pm-min-warning');

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
    if (statusIcon)  statusIcon.textContent  = icon;
    if (statusTitle) statusTitle.textContent = title;
    if (statusBody)  statusBody.innerHTML    = body;
  }

  function hideStatus() {
    if (statusSection) statusSection.classList.add('hidden');
  }

  function hideDownload() {
    if (downloadSection) downloadSection.classList.add('hidden');
    if (mergedBlobUrl) {
      URL.revokeObjectURL(mergedBlobUrl);
      mergedBlobUrl = null;
    }
  }

  function isPdfFile(file) {
    // Check MIME type AND extension
    var mimeOk = file.type === 'application/pdf' || file.type === '';
    var extOk  = file.name.toLowerCase().endsWith('.pdf');
    return extOk && (mimeOk || file.type === 'application/pdf');
  }

  // ─── File Queue Management ────────────────────────────────────────────────────

  function addFiles(fileList) {
    var added = 0;
    for (var i = 0; i < fileList.length; i++) {
      var f = fileList[i];
      if (!isPdfFile(f)) {
        showError('"' + f.name + '" could not be recognized as a valid PDF. Only .pdf files are accepted.');
        continue;
      }
      fileQueue.push({ id: nextId++, file: f, name: f.name, size: f.size });
      added++;
    }
    if (added > 0) {
      clearError();
      hideStatus();
      hideDownload();
      renderFileList();
    }
  }

  function removeFile(id) {
    fileQueue = fileQueue.filter(function (item) { return item.id !== id; });
    renderFileList();
    hideStatus();
    hideDownload();
  }

  function moveUp(id) {
    var idx = fileQueue.findIndex(function (item) { return item.id === id; });
    if (idx <= 0) return;
    var tmp = fileQueue[idx - 1];
    fileQueue[idx - 1] = fileQueue[idx];
    fileQueue[idx] = tmp;
    renderFileList();
    hideStatus();
    hideDownload();
  }

  function moveDown(id) {
    var idx = fileQueue.findIndex(function (item) { return item.id === id; });
    if (idx < 0 || idx >= fileQueue.length - 1) return;
    var tmp = fileQueue[idx + 1];
    fileQueue[idx + 1] = fileQueue[idx];
    fileQueue[idx] = tmp;
    renderFileList();
    hideStatus();
    hideDownload();
  }

  function clearAll() {
    fileQueue = [];
    hideStatus();
    hideDownload();
    clearError();
    renderFileList();
    if (fileInput) fileInput.value = '';
  }

  // ─── Render ───────────────────────────────────────────────────────────────────

  function renderFileList() {
    if (!fileListEl) return;
    fileListEl.innerHTML = '';

    if (fileQueue.length === 0) {
      if (fileListSection) fileListSection.classList.add('hidden');
      updateMergeBtn();
      return;
    }

    if (fileListSection) fileListSection.classList.remove('hidden');

    fileQueue.forEach(function (item, idx) {
      var isFirst = idx === 0;
      var isLast  = idx === fileQueue.length - 1;

      var row = document.createElement('div');
      row.className = 'flex items-center gap-2 sm:gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 group hover:border-blue-300 dark:hover:border-blue-700 transition-colors';
      row.setAttribute('data-id', item.id);

      row.innerHTML =
        '<span class="shrink-0 flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 tabular-nums">' + (idx + 1) + '</span>' +
        '<span class="shrink-0 text-red-500 text-base" aria-hidden="true">📄</span>' +
        '<div class="flex-1 min-w-0">' +
          '<p class="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate" title="' + escapeHtml(item.name) + '">' + escapeHtml(item.name) + '</p>' +
          '<p class="text-[11px] text-slate-400 dark:text-slate-500">' + formatBytes(item.size) + '</p>' +
        '</div>' +
        '<div class="flex items-center gap-1 shrink-0">' +
          '<button type="button" data-action="up" data-id="' + item.id + '" class="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="Move ' + escapeHtml(item.name) + ' up"' + (isFirst ? ' disabled' : '') + '>↑</button>' +
          '<button type="button" data-action="down" data-id="' + item.id + '" class="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="Move ' + escapeHtml(item.name) + ' down"' + (isLast ? ' disabled' : '') + '>↓</button>' +
          '<button type="button" data-action="remove" data-id="' + item.id + '" class="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500" aria-label="Remove ' + escapeHtml(item.name) + ' from list">✕</button>' +
        '</div>';

      fileListEl.appendChild(row);
    });

    // Summary
    var totalSize = fileQueue.reduce(function (acc, item) { return acc + item.size; }, 0);
    if (totalCountEl) totalCountEl.textContent = fileQueue.length;
    if (totalSizeEl)  totalSizeEl.textContent  = formatBytes(totalSize);

    updateMergeBtn();
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function updateMergeBtn() {
    if (!mergeBtn) return;
    var count = fileQueue.length;
    mergeBtn.disabled = count < 2 || isMerging;

    if (minWarning) {
      if (count === 1) {
        minWarning.textContent = 'At least two PDF files are required to merge.';
        minWarning.classList.remove('hidden');
      } else {
        minWarning.classList.add('hidden');
      }
    }
  }

  // ─── PDF Merging ──────────────────────────────────────────────────────────────

  function readFileAsArrayBuffer(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload  = function (e) { resolve(e.target.result); };
      reader.onerror = function ()  { reject(new Error('Failed to read file: ' + file.name)); };
      reader.readAsArrayBuffer(file);
    });
  }

  async function doMerge() {
    if (isMerging || fileQueue.length < 2) return;
    if (typeof window.PDFLib === 'undefined') {
      showError('The PDF library is still loading. Please wait a moment and try again.');
      return;
    }

    isMerging = true;
    clearError();
    hideDownload();
    mergeBtn.disabled = true;
    setStatus('⏳', 'Merging PDFs…', 'Reading your files and combining pages. This may take a moment for large documents.');

    var PDFDocument = window.PDFLib.PDFDocument;
    var totalPages = 0;
    var mergedPdf;

    try {
      mergedPdf = await PDFDocument.create();

      for (var i = 0; i < fileQueue.length; i++) {
        var item = fileQueue[i];
        setStatus('⏳', 'Merging PDFs…', 'Processing file ' + (i + 1) + ' of ' + fileQueue.length + ': ' + escapeHtml(item.name));

        var arrayBuffer;
        try {
          arrayBuffer = await readFileAsArrayBuffer(item.file);
        } catch (readErr) {
          throw new Error('Could not read "' + item.name + '". The file may be inaccessible.');
        }

        var srcPdf;
        try {
          srcPdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: false });
        } catch (loadErr) {
          var msg = String(loadErr.message || '');
          if (msg.toLowerCase().includes('encrypt') || msg.toLowerCase().includes('password') || msg.toLowerCase().includes('encrypted')) {
            throw new Error('"' + item.name + '" is password-protected or encrypted and could not be processed. Remove the password protection before merging.');
          }
          throw new Error('"' + item.name + '" could not be parsed as a valid PDF. The file may be corrupted or in an unsupported format.');
        }

        var pageCount = srcPdf.getPageCount();
        if (pageCount === 0) {
          throw new Error('"' + item.name + '" contains no pages and cannot be merged.');
        }

        var pageIndices = Array.from({ length: pageCount }, function (_, k) { return k; });
        var copiedPages = await mergedPdf.copyPages(srcPdf, pageIndices);
        copiedPages.forEach(function (page) { mergedPdf.addPage(page); });
        totalPages += pageCount;
      }

      var mergedBytes = await mergedPdf.save();
      var blob = new Blob([mergedBytes], { type: 'application/pdf' });

      if (mergedBlobUrl) URL.revokeObjectURL(mergedBlobUrl);
      mergedBlobUrl = URL.createObjectURL(blob);

      if (downloadBtn) {
        downloadBtn.href     = mergedBlobUrl;
        downloadBtn.download = 'merged.pdf';
      }
      if (downloadSection) downloadSection.classList.remove('hidden');

      var outputSize = formatBytes(blob.size);
      setStatus(
        '✅',
        'PDFs merged successfully',
        '<span class="inline-flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold text-slate-600 dark:text-slate-300">' +
          '<span>' + fileQueue.length + ' PDFs merged</span>' +
          '<span>•</span>' +
          '<span>' + totalPages + ' total page' + (totalPages !== 1 ? 's' : '') + '</span>' +
          '<span>•</span>' +
          '<span>' + outputSize + '</span>' +
        '</span>'
      );

    } catch (err) {
      console.error('[PDF Merge]', err);
      var userMsg = err.message || 'An unexpected error occurred while merging.';
      if (userMsg.includes('memory') || userMsg.includes('quota') || userMsg.includes('allocation')) {
        userMsg = 'These files may be too large for the available browser memory. Try merging fewer or smaller PDFs.';
      }
      hideStatus();
      showError(userMsg);
    } finally {
      isMerging = false;
      updateMergeBtn();
    }
  }

  // ─── Drag & Drop ──────────────────────────────────────────────────────────────

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function onDragOver(e) {
    preventDefaults(e);
    if (dropZone) dropZone.classList.add('pm-drag-active');
  }

  function onDragLeave(e) {
    preventDefaults(e);
    if (dropZone) dropZone.classList.remove('pm-drag-active');
  }

  function onDrop(e) {
    preventDefaults(e);
    if (dropZone) dropZone.classList.remove('pm-drag-active');
    var dt = e.dataTransfer;
    if (dt && dt.files && dt.files.length > 0) {
      addFiles(dt.files);
    }
  }

  // Prevent accidental navigation if files are dropped outside the zone
  document.addEventListener('dragover',  preventDefaults, false);
  document.addEventListener('drop',      preventDefaults, false);

  // ─── Event Listeners ──────────────────────────────────────────────────────────

  if (dropZone) {
    dropZone.addEventListener('dragover',  onDragOver,  false);
    dropZone.addEventListener('dragleave', onDragLeave, false);
    dropZone.addEventListener('drop',      onDrop,      false);
    dropZone.addEventListener('click', function (e) {
      // Only trigger if click is on the zone itself, not a button inside
      if (e.target === dropZone || e.target.closest('#pm-drop-zone') === dropZone) {
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
        addFiles(fileInput.files);
        fileInput.value = ''; // allow re-selecting same files
      }
    });
  }

  if (fileListEl) {
    fileListEl.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action]');
      if (!btn) return;
      var action = btn.getAttribute('data-action');
      var id     = parseInt(btn.getAttribute('data-id'), 10);
      if (action === 'remove') removeFile(id);
      else if (action === 'up')   moveUp(id);
      else if (action === 'down') moveDown(id);
    });
  }

  if (mergeBtn) {
    mergeBtn.addEventListener('click', function () {
      doMerge();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', clearAll);
  }

  // ─── Initial State ────────────────────────────────────────────────────────────
  renderFileList();
  updateMergeBtn();

})();
