/**
 * Image to PDF Tool — 100% Client-Side
 * Uses pdf-lib to create PDF documents from images.
 */
(function () {
  'use strict';

  var fileQueue = [];
  var nextId = 0;
  var isCreating = false;

  var dropZone = document.getElementById('itp-drop-zone');
  var fileInput = document.getElementById('itp-file-input');
  var selectBtn = document.getElementById('itp-select-btn');
  var fileListSection = document.getElementById('itp-file-list-section');
  var fileListEl = document.getElementById('itp-file-list');
  var totalCountEl = document.getElementById('itp-total-count');
  var totalSizeEl = document.getElementById('itp-total-size');
  var addMoreBtn = document.getElementById('itp-add-more-btn');
  var createBtn = document.getElementById('itp-create-btn');
  var clearBtn = document.getElementById('itp-clear-btn');
  var statusSection = document.getElementById('itp-status-section');
  var statusIcon = document.getElementById('itp-status-icon');
  var statusTitle = document.getElementById('itp-status-title');
  var statusBody = document.getElementById('itp-status-body');
  var downloadSection = document.getElementById('itp-download-section');
  var errorBox = document.getElementById('itp-error-box');
  var errorText = document.getElementById('itp-error-text');

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

  function isImageFile(file) {
    return file.type.startsWith('image/');
  }

  function readFileAsDataURL(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function (e) { resolve(e.target.result); };
      reader.onerror = function () { reject(new Error('Failed to read file')); };
      reader.readAsDataURL(file);
    });
  }

  function readFileAsArrayBuffer(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function (e) { resolve(e.target.result); };
      reader.onerror = function () { reject(new Error('Failed to read file')); };
      reader.readAsArrayBuffer(file);
    });
  }

  function addFiles(fileList) {
    var added = 0;
    for (var i = 0; i < fileList.length; i++) {
      var f = fileList[i];
      if (!isImageFile(f)) {
        showError('"' + f.name + '" is not a valid image file. Only image files are accepted.');
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

  function renderFileList() {
    if (!fileListEl) return;
    fileListEl.innerHTML = '';

    if (fileQueue.length === 0) {
      if (fileListSection) fileListSection.classList.add('hidden');
      updateCreateBtn();
      return;
    }

    if (fileListSection) fileListSection.classList.remove('hidden');

    fileQueue.forEach(function (item, idx) {
      var isFirst = idx === 0;
      var isLast = idx === fileQueue.length - 1;

      var row = document.createElement('div');
      row.className = 'flex items-center gap-2 sm:gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 group hover:border-green-300 dark:hover:border-green-700 transition-colors';

      var dataURL = URL.createObjectURL(item.file);

      row.innerHTML =
        '<span class="shrink-0 flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 tabular-nums">' + (idx + 1) + '</span>' +
        '<div class="shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">' +
          '<img src="' + dataURL + '" alt="" class="w-full h-full object-cover" />' +
        '</div>' +
        '<div class="flex-1 min-w-0">' +
          '<p class="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate" title="' + escapeHtml(item.name) + '">' + escapeHtml(item.name) + '</p>' +
          '<p class="text-[11px] text-slate-400 dark:text-slate-500">' + formatBytes(item.size) + '</p>' +
        '</div>' +
        '<div class="flex items-center gap-1 shrink-0">' +
          '<button type="button" data-action="up" data-id="' + item.id + '" class="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-950/40 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer" ' + (isFirst ? 'disabled' : '') + '>↑</button>' +
          '<button type="button" data-action="down" data-id="' + item.id + '" class="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-950/40 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer" ' + (isLast ? 'disabled' : '') + '>↓</button>' +
          '<button type="button" data-action="remove" data-id="' + item.id + '" class="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition cursor-pointer">✕</button>' +
        '</div>';

      fileListEl.appendChild(row);
    });

    var totalSize = fileQueue.reduce(function (acc, item) { return acc + item.size; }, 0);
    if (totalCountEl) totalCountEl.textContent = fileQueue.length;
    if (totalSizeEl) totalSizeEl.textContent = formatBytes(totalSize);

    updateCreateBtn();
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function updateCreateBtn() {
    if (!createBtn) return;
    createBtn.disabled = fileQueue.length === 0 || isCreating;
  }

  async function createPDF() {
    if (isCreating || fileQueue.length === 0) return;
    if (typeof window.PDFLib === 'undefined') {
      showError('PDF library is still loading. Please wait and try again.');
      return;
    }

    isCreating = true;
    clearError();
    hideDownload();
    if (createBtn) createBtn.disabled = true;

    try {
      setStatus('⏳', 'Creating PDF…', 'Processing ' + fileQueue.length + ' image' + (fileQueue.length !== 1 ? 's' : '') + '.');

      var PDFDocument = window.PDFLib.PDFDocument;
      var pdfDoc = await PDFDocument.create();

      for (var i = 0; i < fileQueue.length; i++) {
        var item = fileQueue[i];
        setStatus('⏳', 'Creating PDF…', 'Embedding image ' + (i + 1) + ' of ' + fileQueue.length + ': ' + escapeHtml(item.name));

        var arrayBuffer = await readFileAsArrayBuffer(item.file);

        var image;
        try {
          if (item.file.type === 'image/png') {
            image = await pdfDoc.embedPng(arrayBuffer);
          } else if (item.file.type === 'image/jpeg' || item.file.type === 'image/jpg') {
            image = await pdfDoc.embedJpg(arrayBuffer);
          } else {
            // For other formats, convert to data URL and embed as PNG
            var dataURL = await readFileAsDataURL(item.file);
            var base64 = dataURL.split(',')[1];
            var bytes = Uint8Array.from(atob(base64), function (c) { return c.charCodeAt(0); });
            image = await pdfDoc.embedPng(bytes);
          }
        } catch (embedErr) {
          throw new Error('Could not embed "' + item.name + '". The file may be corrupted or in an unsupported format.');
        }

        var imgWidth = image.width;
        var imgHeight = image.height;

        // Create page with image dimensions (max 11x17 inches at 72 DPI)
        var maxWidth = 11 * 72;  // 792 points
        var maxHeight = 17 * 72; // 1224 points

        var scale = 1;
        if (imgWidth > maxWidth || imgHeight > maxHeight) {
          scale = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
        }

        var pageWidth = imgWidth * scale;
        var pageHeight = imgHeight * scale;

        var page = pdfDoc.addPage([pageWidth, pageHeight]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: pageWidth,
          height: pageHeight
        });
      }

      var pdfBytes = await pdfDoc.save();
      var blob = new Blob([pdfBytes], { type: 'application/pdf' });
      var url = URL.createObjectURL(blob);

      downloadSection.innerHTML =
        '<div class="rounded-2xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/30 p-4">' +
          '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">' +
            '<div class="flex items-center gap-3">' +
              '<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white text-lg">✅</div>' +
              '<div>' +
                '<p class="text-sm font-bold text-emerald-900 dark:text-emerald-200">PDF created successfully</p>' +
                '<p class="text-xs text-emerald-700 dark:text-emerald-400">' + fileQueue.length + ' image' + (fileQueue.length !== 1 ? 's' : '') + ' converted • ' + formatBytes(blob.size) + '</p>' +
              '</div>' +
            '</div>' +
            '<a href="' + url + '" download="images.pdf" class="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white shadow transition no-underline">' +
              '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>' +
              'Download PDF' +
            '</a>' +
          '</div>' +
        '</div>';
      downloadSection.classList.remove('hidden');

      setStatus('✅', 'PDF created', fileQueue.length + ' image' + (fileQueue.length !== 1 ? 's' : '') + ' converted successfully.');

    } catch (err) {
      console.error('[Image to PDF]', err);
      showError(err.message || 'An error occurred while creating PDF.');
      hideStatus();
    } finally {
      isCreating = false;
      updateCreateBtn();
    }
  }

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function onDragOver(e) {
    preventDefaults(e);
    if (dropZone) dropZone.classList.add('itp-drag-active');
  }

  function onDragLeave(e) {
    preventDefaults(e);
    if (dropZone) dropZone.classList.remove('itp-drag-active');
  }

  function onDrop(e) {
    preventDefaults(e);
    if (dropZone) dropZone.classList.remove('itp-drag-active');
    var dt = e.dataTransfer;
    if (dt && dt.files && dt.files.length > 0) {
      addFiles(dt.files);
    }
  }

  document.addEventListener('dragover', preventDefaults, false);
  document.addEventListener('drop', preventDefaults, false);

  if (dropZone) {
    dropZone.addEventListener('dragover', onDragOver, false);
    dropZone.addEventListener('dragleave', onDragLeave, false);
    dropZone.addEventListener('drop', onDrop, false);
    dropZone.addEventListener('click', function (e) {
      if (e.target === dropZone || e.target.closest('#itp-drop-zone') === dropZone) {
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
        fileInput.value = '';
      }
    });
  }

  if (addMoreBtn) {
    addMoreBtn.addEventListener('click', function () {
      if (fileInput) fileInput.click();
    });
  }

  if (fileListEl) {
    fileListEl.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action]');
      if (!btn) return;
      var action = btn.getAttribute('data-action');
      var id = parseInt(btn.getAttribute('data-id'), 10);
      if (action === 'remove') removeFile(id);
      else if (action === 'up') moveUp(id);
      else if (action === 'down') moveDown(id);
    });
  }

  if (createBtn) {
    createBtn.addEventListener('click', createPDF);
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', clearAll);
  }

  renderFileList();
  updateCreateBtn();

})();
