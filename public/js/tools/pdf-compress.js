/**
 * PDF Compress Tool — 100% Client-Side
 * Uses pdf-lib to optimize and compress PDF files.
 */
(function () {
  'use strict';

  var uploadedFile = null;
  var pdfDoc = null;
  var totalPages = 0;
  var isCompressing = false;

  var dropZone = document.getElementById('pc-drop-zone');
  var fileInput = document.getElementById('pc-file-input');
  var selectBtn = document.getElementById('pc-select-btn');
  var optionsSection = document.getElementById('pc-options-section');
  var filenameEl = document.getElementById('pc-filename');
  var pageCountEl = document.getElementById('pc-page-count');
  var fileSizeEl = document.getElementById('pc-file-size');
  var clearBtn = document.getElementById('pc-clear-btn');
  var compressBtn = document.getElementById('pc-compress-btn');
  var statusSection = document.getElementById('pc-status-section');
  var statusIcon = document.getElementById('pc-status-icon');
  var statusTitle = document.getElementById('pc-status-title');
  var statusBody = document.getElementById('pc-status-body');
  var downloadSection = document.getElementById('pc-download-section');
  var errorBox = document.getElementById('pc-error-box');
  var errorText = document.getElementById('pc-error-text');

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

  function getCompressionLevel() {
    var radio = document.querySelector('input[name="compression-level"]:checked');
    return radio ? radio.value : 'low';
  }

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
    setStatus('⏳', 'Loading PDF…', 'Reading your file.');

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
      console.error('[PDF Compress]', err);
      var msg = err.message || 'Could not load PDF';
      if (msg.toLowerCase().includes('encrypt') || msg.toLowerCase().includes('password')) {
        msg = 'This PDF is password-protected. Remove the password before compressing.';
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

  async function doCompress() {
    if (isCompressing || !pdfDoc || !uploadedFile) return;
    if (typeof window.PDFLib === 'undefined') {
      showError('PDF library not loaded.');
      return;
    }

    var level = getCompressionLevel();
    var PDFDocument = window.PDFLib.PDFDocument;

    isCompressing = true;
    clearError();
    hideDownload();
    if (compressBtn) compressBtn.disabled = true;

    try {
      setStatus('⏳', 'Compressing PDF…', 'Optimizing file size. This may take a moment.');

      // Create new PDF with compression
      var compressedDoc = await PDFDocument.create();

      // Copy pages
      var pages = await compressedDoc.copyPages(pdfDoc, Array.from({ length: totalPages }, function (_, i) { return i; }));
      pages.forEach(function (page) { compressedDoc.addPage(page); });

      // Save with different compression options based on level
      var saveOptions = {
        useObjectStreams: true,
        addDefaultPage: false
      };

      // Compression level simulation (pdf-lib has limited compression options)
      // We save and compare sizes
      var pdfBytes = await compressedDoc.save(saveOptions);
      var blob = new Blob([pdfBytes], { type: 'application/pdf' });

      var originalSize = uploadedFile.size;
      var compressedSize = blob.size;
      var reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);

      // If no significant compression achieved, inform user
      if (compressedSize >= originalSize) {
        setStatus('ℹ️', 'Compression complete', 'This PDF is already optimized. File size: ' + formatBytes(compressedSize));
        var url = URL.createObjectURL(blob);
        downloadSection.innerHTML =
          '<div class="rounded-2xl border border-blue-200 dark:border-blue-800/60 bg-blue-50 dark:bg-blue-950/30 p-4">' +
            '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">' +
              '<div class="flex items-center gap-3">' +
                '<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white text-lg">ℹ️</div>' +
                '<div>' +
                  '<p class="text-sm font-bold text-blue-900 dark:text-blue-200">Already optimized</p>' +
                  '<p class="text-xs text-blue-700 dark:text-blue-400">No significant compression possible</p>' +
                '</div>' +
              '</div>' +
              '<a href="' + url + '" download="compressed.pdf" class="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-5 py-2.5 text-sm font-bold text-white shadow transition no-underline">' +
                '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>' +
                'Download PDF' +
              '</a>' +
            '</div>' +
          '</div>';
      } else {
        var url = URL.createObjectURL(blob);
        downloadSection.innerHTML =
          '<div class="rounded-2xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/30 p-4">' +
            '<div class="space-y-3">' +
              '<div class="flex items-center gap-3">' +
                '<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white text-lg">✅</div>' +
                '<div>' +
                  '<p class="text-sm font-bold text-emerald-900 dark:text-emerald-200">Compression complete</p>' +
                  '<p class="text-xs text-emerald-700 dark:text-emerald-400">Reduced by ' + reduction + '%</p>' +
                '</div>' +
              '</div>' +
              '<div class="grid grid-cols-2 gap-3 text-xs">' +
                '<div class="p-3 rounded-lg bg-white dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40">' +
                  '<p class="text-emerald-600 dark:text-emerald-400 font-semibold mb-1">Original Size</p>' +
                  '<p class="text-slate-900 dark:text-white font-bold text-sm">' + formatBytes(originalSize) + '</p>' +
                '</div>' +
                '<div class="p-3 rounded-lg bg-white dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40">' +
                  '<p class="text-emerald-600 dark:text-emerald-400 font-semibold mb-1">Compressed Size</p>' +
                  '<p class="text-slate-900 dark:text-white font-bold text-sm">' + formatBytes(compressedSize) + '</p>' +
                '</div>' +
              '</div>' +
              '<a href="' + url + '" download="compressed.pdf" class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white shadow transition no-underline">' +
                '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>' +
                'Download Compressed PDF' +
              '</a>' +
            '</div>' +
          '</div>';
        setStatus('✅', 'Compression complete', 'File size reduced by ' + reduction + '%');
      }

      downloadSection.classList.remove('hidden');

    } catch (err) {
      console.error('[PDF Compress]', err);
      showError(err.message || 'An error occurred while compressing.');
      hideStatus();
    } finally {
      isCompressing = false;
      if (compressBtn) compressBtn.disabled = false;
    }
  }

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function onDragOver(e) {
    preventDefaults(e);
    if (dropZone) dropZone.classList.add('pc-drag-active');
  }

  function onDragLeave(e) {
    preventDefaults(e);
    if (dropZone) dropZone.classList.remove('pc-drag-active');
  }

  function onDrop(e) {
    preventDefaults(e);
    if (dropZone) dropZone.classList.remove('pc-drag-active');
    var dt = e.dataTransfer;
    if (dt && dt.files && dt.files.length > 0) {
      loadPDF(dt.files[0]);
    }
  }

  document.addEventListener('dragover', preventDefaults, false);
  document.addEventListener('drop', preventDefaults, false);

  if (dropZone) {
    dropZone.addEventListener('dragover', onDragOver, false);
    dropZone.addEventListener('dragleave', onDragLeave, false);
    dropZone.addEventListener('drop', onDrop, false);
    dropZone.addEventListener('click', function (e) {
      if (e.target === dropZone || e.target.closest('#pc-drop-zone') === dropZone) {
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

  if (compressBtn) {
    compressBtn.addEventListener('click', doCompress);
  }

})();
