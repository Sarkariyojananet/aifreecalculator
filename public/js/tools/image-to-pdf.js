/**
 * Image to PDF Tool — 100% Client-Side
 * Uses pdf-lib to create PDF documents from images with customizable orientation, page size, margins, and merge options.
 */
(function () {
  'use strict';

  var fileQueue = [];
  var nextId = 0;
  var isCreating = false;

  // Options State
  var selectedOrientation = 'portrait'; // 'portrait' | 'landscape'
  var selectedPageSize = 'a4';          // 'a4' | 'a3' | 'a5' | 'letter' | 'legal'
  var selectedMargin = 'none';          // 'none' | 'small' | 'big'
  var isMerged = false;                 // boolean

  // Page Configurations (Dimensions in PDF points: 1 pt = 1/72 in, 1 mm ≈ 2.83465 pt)
  var PAGE_CONFIGS = {
    a4: {
      portrait: [595.28, 841.89],
      landscape: [841.89, 595.28],
      labelPortrait: 'A4 (210x297 mm)',
      labelLandscape: 'A4 (297x210 mm)'
    },
    a3: {
      portrait: [841.89, 1190.55],
      landscape: [1190.55, 841.89],
      labelPortrait: 'A3 (297x420 mm)',
      labelLandscape: 'A3 (420x297 mm)'
    },
    a5: {
      portrait: [419.53, 595.28],
      landscape: [595.28, 419.53],
      labelPortrait: 'A5 (148x210 mm)',
      labelLandscape: 'A5 (210x148 mm)'
    },
    letter: {
      portrait: [612.0, 792.0],
      landscape: [792.0, 612.0],
      labelPortrait: 'Letter (216x279 mm)',
      labelLandscape: 'Letter (279x216 mm)'
    },
    legal: {
      portrait: [612.0, 1008.0],
      landscape: [1008.0, 612.0],
      labelPortrait: 'Legal (216x356 mm)',
      labelLandscape: 'Legal (356x216 mm)'
    }
  };

  // Margin Configurations in PDF points
  var MARGIN_VALUES = {
    none: 0,
    small: 20, // ~7 mm / 0.28 in
    big: 40    // ~14 mm / 0.55 in
  };

  // Card Active / Inactive CSS classes
  var ACTIVE_CARD_CLASSES = ['border-red-500', 'bg-red-50/50', 'dark:bg-red-950/20', 'text-red-600', 'dark:text-red-400', 'font-bold'];
  var INACTIVE_CARD_CLASSES = ['border-slate-200', 'dark:border-slate-700', 'bg-slate-50', 'dark:bg-slate-800/60', 'text-slate-500', 'dark:text-slate-400', 'font-medium'];

  // DOM Elements
  var dropZone = document.getElementById('itp-drop-zone');
  var fileInput = document.getElementById('itp-file-input');
  var selectBtn = document.getElementById('itp-select-btn');
  var fileListSection = document.getElementById('itp-file-list-section');
  var fileListEl = document.getElementById('itp-file-list');
  var totalCountEl = document.getElementById('itp-total-count');
  var totalSizeEl = document.getElementById('itp-total-size');
  var addMoreBtn = document.getElementById('itp-add-more-btn');
  var createBtn = document.getElementById('itp-create-btn');
  var createBtnText = document.getElementById('itp-create-btn-text');
  var clearBtn = document.getElementById('itp-clear-btn');
  var statusSection = document.getElementById('itp-status-section');
  var statusIcon = document.getElementById('itp-status-icon');
  var statusTitle = document.getElementById('itp-status-title');
  var statusBody = document.getElementById('itp-status-body');
  var downloadSection = document.getElementById('itp-download-section');
  var errorBox = document.getElementById('itp-error-box');
  var errorText = document.getElementById('itp-error-text');

  var orientationBtns = document.querySelectorAll('.itp-orientation-btn');
  var pageSizeSelect = document.getElementById('itp-page-size');
  var marginBtns = document.querySelectorAll('.itp-margin-btn');
  var mergeCheckbox = document.getElementById('itp-merge-checkbox');

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

  function readFileAsArrayBuffer(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function (e) { resolve(e.target.result); };
      reader.onerror = function () { reject(new Error('Failed to read file buffer')); };
      reader.readAsArrayBuffer(file);
    });
  }

  function convertImageToPngBuffer(file) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      var url = URL.createObjectURL(file);
      img.onload = function () {
        URL.revokeObjectURL(url);
        try {
          var canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || img.width;
          canvas.height = img.naturalHeight || img.height;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(function (blob) {
            if (!blob) {
              reject(new Error('Canvas image conversion failed'));
              return;
            }
            blob.arrayBuffer().then(resolve).catch(reject);
          }, 'image/png');
        } catch (cErr) {
          reject(cErr);
        }
      };
      img.onerror = function () {
        URL.revokeObjectURL(url);
        reject(new Error('Could not decode image format for "' + file.name + '"'));
      };
      img.src = url;
    });
  }

  async function embedImage(pdfDoc, file) {
    var type = (file.type || '').toLowerCase();
    if (type === 'image/jpeg' || type === 'image/jpg') {
      try {
        var jpgBuffer = await readFileAsArrayBuffer(file);
        return await pdfDoc.embedJpg(jpgBuffer);
      } catch (e) {
        // Fallback to canvas rasterization if native embed fails
        var fallbackPng1 = await convertImageToPngBuffer(file);
        return await pdfDoc.embedPng(fallbackPng1);
      }
    } else if (type === 'image/png') {
      try {
        var pngBuffer = await readFileAsArrayBuffer(file);
        return await pdfDoc.embedPng(pngBuffer);
      } catch (e) {
        var fallbackPng2 = await convertImageToPngBuffer(file);
        return await pdfDoc.embedPng(fallbackPng2);
      }
    } else {
      // WebP, GIF, BMP, SVG, TIFF, AVIF etc.
      var pngConverted = await convertImageToPngBuffer(file);
      return await pdfDoc.embedPng(pngConverted);
    }
  }

  function appendImagePage(pdfDoc, image) {
    var config = PAGE_CONFIGS[selectedPageSize] || PAGE_CONFIGS.a4;
    var dims = selectedOrientation === 'landscape' ? config.landscape : config.portrait;
    var pageWidth = dims[0];
    var pageHeight = dims[1];
    var margin = MARGIN_VALUES[selectedMargin] !== undefined ? MARGIN_VALUES[selectedMargin] : 0;

    var availWidth = Math.max(1, pageWidth - (2 * margin));
    var availHeight = Math.max(1, pageHeight - (2 * margin));

    var imgWidth = image.width;
    var imgHeight = image.height;

    // Aspect ratio preservation without distortion
    var scale = Math.min(availWidth / imgWidth, availHeight / imgHeight);
    var drawWidth = imgWidth * scale;
    var drawHeight = imgHeight * scale;

    var drawX = margin + (availWidth - drawWidth) / 2;
    var drawY = margin + (availHeight - drawHeight) / 2;

    var page = pdfDoc.addPage([pageWidth, pageHeight]);
    page.drawImage(image, {
      x: drawX,
      y: drawY,
      width: drawWidth,
      height: drawHeight
    });
  }

  function updateOrientationUI() {
    orientationBtns.forEach(function (btn) {
      var val = btn.getAttribute('data-orientation');
      var isSelected = val === selectedOrientation;
      btn.setAttribute('aria-checked', isSelected ? 'true' : 'false');
      if (isSelected) {
        ACTIVE_CARD_CLASSES.forEach(function (c) { btn.classList.add(c); });
        INACTIVE_CARD_CLASSES.forEach(function (c) { btn.classList.remove(c); });
      } else {
        ACTIVE_CARD_CLASSES.forEach(function (c) { btn.classList.remove(c); });
        INACTIVE_CARD_CLASSES.forEach(function (c) { btn.classList.add(c); });
      }
    });
    updatePageSizeLabels();
  }

  function updatePageSizeLabels() {
    if (!pageSizeSelect) return;
    var currentVal = pageSizeSelect.value;
    var isLandscape = selectedOrientation === 'landscape';

    for (var i = 0; i < pageSizeSelect.options.length; i++) {
      var opt = pageSizeSelect.options[i];
      var config = PAGE_CONFIGS[opt.value];
      if (config) {
        opt.textContent = isLandscape ? config.labelLandscape : config.labelPortrait;
      }
    }
    pageSizeSelect.value = currentVal;
  }

  function updateMarginUI() {
    marginBtns.forEach(function (btn) {
      var val = btn.getAttribute('data-margin');
      var isSelected = val === selectedMargin;
      btn.setAttribute('aria-checked', isSelected ? 'true' : 'false');
      if (isSelected) {
        ACTIVE_CARD_CLASSES.forEach(function (c) { btn.classList.add(c); });
        INACTIVE_CARD_CLASSES.forEach(function (c) { btn.classList.remove(c); });
      } else {
        ACTIVE_CARD_CLASSES.forEach(function (c) { btn.classList.remove(c); });
        INACTIVE_CARD_CLASSES.forEach(function (c) { btn.classList.add(c); });
      }
    });
  }

  function updateCreateBtn() {
    if (!createBtn) return;
    createBtn.disabled = fileQueue.length === 0 || isCreating;
    if (createBtnText) {
      if (isMerged) {
        createBtnText.textContent = 'Convert & Merge Images to PDF';
      } else {
        if (fileQueue.length > 1) {
          createBtnText.textContent = 'Convert Images to PDF';
        } else {
          createBtnText.textContent = 'Convert Image to PDF';
        }
      }
    }
  }

  function resetOptions() {
    selectedOrientation = 'portrait';
    selectedPageSize = 'a4';
    selectedMargin = 'none';
    isMerged = false;
    if (pageSizeSelect) pageSizeSelect.value = 'a4';
    if (mergeCheckbox) mergeCheckbox.checked = false;
    updateOrientationUI();
    updateMarginUI();
    updateCreateBtn();
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
    resetOptions();
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
      row.className = 'flex items-center gap-2 sm:gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 group hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors';

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
          '<button type="button" data-action="up" data-id="' + item.id + '" aria-label="Move image up" class="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer" ' + (isFirst ? 'disabled' : '') + '>↑</button>' +
          '<button type="button" data-action="down" data-id="' + item.id + '" aria-label="Move image down" class="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer" ' + (isLast ? 'disabled' : '') + '>↓</button>' +
          '<button type="button" data-action="remove" data-id="' + item.id + '" aria-label="Remove image" class="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition cursor-pointer">✕</button>' +
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

  async function createPDF() {
    if (isCreating || fileQueue.length === 0) return;
    if (typeof window.PDFLib === 'undefined') {
      showError('PDF library is still loading. Please wait and try again.');
      return;
    }

    isCreating = true;
    clearError();
    hideDownload();
    updateCreateBtn();

    try {
      var PDFDocument = window.PDFLib.PDFDocument;

      if (isMerged || fileQueue.length === 1) {
        // Single combined PDF file
        setStatus('⏳', 'Creating PDF…', 'Processing ' + fileQueue.length + ' image' + (fileQueue.length !== 1 ? 's' : '') + ' (' + selectedOrientation + ', ' + selectedPageSize.toUpperCase() + ').');

        var pdfDoc = await PDFDocument.create();

        for (var i = 0; i < fileQueue.length; i++) {
          var item = fileQueue[i];
          setStatus('⏳', 'Creating PDF…', 'Embedding image ' + (i + 1) + ' of ' + fileQueue.length + ': ' + escapeHtml(item.name));
          var image = await embedImage(pdfDoc, item.file);
          appendImagePage(pdfDoc, image);
        }

        setStatus('⏳', 'Finalizing PDF…', 'Generating PDF document bytes…');
        var pdfBytes = await pdfDoc.save();
        var blob = new Blob([pdfBytes], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var filename = isMerged && fileQueue.length > 1
          ? 'images.pdf'
          : (fileQueue[0].name.replace(/\.[^/.]+$/, '') || 'image') + '.pdf';

        var downloadLabel = isMerged && fileQueue.length > 1
          ? fileQueue.length + ' images merged into 1 PDF • ' + formatBytes(blob.size)
          : '1 image converted • ' + formatBytes(blob.size);

        downloadSection.innerHTML =
          '<div class="rounded-2xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/30 p-4">' +
            '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">' +
              '<div class="flex items-center gap-3">' +
                '<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white text-lg">✅</div>' +
                '<div>' +
                  '<p class="text-sm font-bold text-emerald-900 dark:text-emerald-200">PDF created successfully</p>' +
                  '<p class="text-xs text-emerald-700 dark:text-emerald-400">' + downloadLabel + '</p>' +
                '</div>' +
              '</div>' +
              '<a href="' + url + '" download="' + escapeHtml(filename) + '" class="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white shadow transition no-underline">' +
                '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>' +
                'Download PDF' +
              '</a>' +
            '</div>' +
          '</div>';
        downloadSection.classList.remove('hidden');

        setStatus('✅', 'PDF created', fileQueue.length + ' image' + (fileQueue.length !== 1 ? 's' : '') + ' converted successfully.');

      } else {
        // Multiple individual PDF files
        setStatus('⏳', 'Creating PDFs…', 'Generating ' + fileQueue.length + ' individual PDF files (' + selectedOrientation + ', ' + selectedPageSize.toUpperCase() + ')…');

        var downloads = [];
        for (var j = 0; j < fileQueue.length; j++) {
          var fItem = fileQueue[j];
          setStatus('⏳', 'Creating PDFs…', 'Converting image ' + (j + 1) + ' of ' + fileQueue.length + ': ' + escapeHtml(fItem.name));

          var singleDoc = await PDFDocument.create();
          var singleImg = await embedImage(singleDoc, fItem.file);
          appendImagePage(singleDoc, singleImg);

          var singleBytes = await singleDoc.save();
          var singleBlob = new Blob([singleBytes], { type: 'application/pdf' });
          var singleUrl = URL.createObjectURL(singleBlob);
          var singleName = (fItem.name.replace(/\.[^/.]+$/, '') || ('image-' + (j + 1))) + '.pdf';

          downloads.push({
            name: singleName,
            url: singleUrl,
            size: singleBlob.size
          });
        }

        var totalBytes = downloads.reduce(function (acc, d) { return acc + d.size; }, 0);

        var html = '<div class="space-y-3">';
        html += '<div class="rounded-2xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/30 p-4">';
        html += '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">';
        html += '<div class="flex items-center gap-3">';
        html += '<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white text-lg">✅</div>';
        html += '<div>';
        html += '<p class="text-sm font-bold text-emerald-900 dark:text-emerald-200">PDFs created successfully</p>';
        html += '<p class="text-xs text-emerald-700 dark:text-emerald-400">' + downloads.length + ' individual PDFs created • ' + formatBytes(totalBytes) + ' total</p>';
        html += '</div>';
        html += '</div>';
        html += '<button type="button" id="itp-download-all-btn" class="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white shadow transition cursor-pointer">';
        html += '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>';
        html += 'Download All PDFs';
        html += '</button>';
        html += '</div>';
        html += '</div>';

        html += '<div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">';
        downloads.forEach(function (d, idx) {
          html += '<a href="' + d.url + '" download="' + escapeHtml(d.name) + '" class="flex items-center justify-between gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20 transition no-underline group">';
          html += '<div class="flex items-center gap-2.5 min-w-0 flex-1">';
          html += '<span class="shrink-0 flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 tabular-nums">' + (idx + 1) + '</span>';
          html += '<div class="min-w-0 flex-1">';
          html += '<p class="text-xs font-semibold text-slate-900 dark:text-white truncate" title="' + escapeHtml(d.name) + '">' + escapeHtml(d.name) + '</p>';
          html += '<p class="text-[11px] text-slate-400 dark:text-slate-500">' + formatBytes(d.size) + '</p>';
          html += '</div>';
          html += '</div>';
          html += '<span class="shrink-0 inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:underline">Download →</span>';
          html += '</a>';
        });
        html += '</div>';
        html += '</div>';

        downloadSection.innerHTML = html;
        downloadSection.classList.remove('hidden');

        var downloadAllBtn = document.getElementById('itp-download-all-btn');
        if (downloadAllBtn) {
          downloadAllBtn.addEventListener('click', function () {
            downloads.forEach(function (d, i) {
              setTimeout(function () {
                var a = document.createElement('a');
                a.href = d.url;
                a.download = d.name;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }, i * 300);
            });
          });
        }

        setStatus('✅', 'PDFs created', downloads.length + ' individual PDFs created successfully.');
      }

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

  // Options: Orientation Events
  orientationBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var orientation = btn.getAttribute('data-orientation');
      if (orientation && (orientation === 'portrait' || orientation === 'landscape')) {
        selectedOrientation = orientation;
        updateOrientationUI();
      }
    });
  });

  // Options: Page Size Event
  if (pageSizeSelect) {
    pageSizeSelect.addEventListener('change', function () {
      if (PAGE_CONFIGS[pageSizeSelect.value]) {
        selectedPageSize = pageSizeSelect.value;
      }
    });
  }

  // Options: Margin Events
  marginBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var margin = btn.getAttribute('data-margin');
      if (margin && MARGIN_VALUES[margin] !== undefined) {
        selectedMargin = margin;
        updateMarginUI();
      }
    });
  });

  // Options: Merge Checkbox Event
  if (mergeCheckbox) {
    mergeCheckbox.addEventListener('change', function () {
      isMerged = mergeCheckbox.checked;
      updateCreateBtn();
    });
  }

  if (createBtn) {
    createBtn.addEventListener('click', createPDF);
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', clearAll);
  }

  // Initial State Setup
  updateOrientationUI();
  updateMarginUI();
  renderFileList();
  updateCreateBtn();

})();
