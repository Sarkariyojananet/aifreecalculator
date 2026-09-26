/**
 * PDF to Image Tool — 100% Client-Side
 * Uses PDF.js to render PDF pages as PNG/JPG images.
 */
(function () {
  'use strict';

  var uploadedFile = null;
  var pdfDoc = null;
  var totalPages = 0;
  var isConverting = false;

  var dropZone = document.getElementById('pti-drop-zone');
  var fileInput = document.getElementById('pti-file-input');
  var selectBtn = document.getElementById('pti-select-btn');
  var optionsSection = document.getElementById('pti-options-section');
  var filenameEl = document.getElementById('pti-filename');
  var pageCountEl = document.getElementById('pti-page-count');
  var clearBtn = document.getElementById('pti-clear-btn');
  var convertBtn = document.getElementById('pti-convert-btn');
  var statusSection = document.getElementById('pti-status-section');
  var statusIcon = document.getElementById('pti-status-icon');
  var statusTitle = document.getElementById('pti-status-title');
  var statusBody = document.getElementById('pti-status-body');
  var progressBar = document.getElementById('pti-progress-bar');
  var progressFill = document.getElementById('pti-progress-fill');
  var downloadSection = document.getElementById('pti-download-section');
  var errorBox = document.getElementById('pti-error-box');
  var errorText = document.getElementById('pti-error-text');

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
    if (progressBar) progressBar.classList.add('hidden');
  }

  function showProgress() {
    if (progressBar) progressBar.classList.remove('hidden');
  }

  function updateProgress(percent) {
    if (progressFill) progressFill.style.width = percent + '%';
  }

  function hideDownload() {
    if (downloadSection) {
      downloadSection.classList.add('hidden');
      downloadSection.innerHTML = '';
    }
  }

  function getImageFormat() {
    var radio = document.querySelector('input[name="image-format"]:checked');
    return radio ? radio.value : 'png';
  }

  function readFileAsArrayBuffer(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function (e) { resolve(new Uint8Array(e.target.result)); };
      reader.onerror = function () { reject(new Error('Failed to read file')); };
      reader.readAsArrayBuffer(file);
    });
  }

  async function loadPDF(file) {
    if (typeof window.pdfjsLib === 'undefined') {
      showError('PDF.js library is still loading. Please wait and try again.');
      return;
    }

    clearError();
    hideStatus();
    hideDownload();
    setStatus('⏳', 'Loading PDF…', 'Reading your file.');

    try {
      var arrayBuffer = await readFileAsArrayBuffer(file);
      var loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
      pdfDoc = await loadingTask.promise;
      totalPages = pdfDoc.numPages;

      if (totalPages === 0) {
        throw new Error('This PDF contains no pages.');
      }

      uploadedFile = file;

      if (filenameEl) filenameEl.textContent = file.name;
      if (pageCountEl) pageCountEl.textContent = totalPages + ' page' + (totalPages !== 1 ? 's' : '');

      if (dropZone) dropZone.classList.add('hidden');
      if (optionsSection) optionsSection.classList.remove('hidden');
      hideStatus();

    } catch (err) {
      console.error('[PDF to Image]', err);
      var msg = err.message || 'Could not load PDF';
      if (msg.includes('password') || msg.includes('encrypted')) {
        msg = 'This PDF is password-protected. Remove the password before converting.';
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

  async function doConvert() {
    if (isConverting || !pdfDoc || !uploadedFile) return;
    if (typeof window.pdfjsLib === 'undefined') {
      showError('PDF.js library not loaded.');
      return;
    }

    var format = getImageFormat();
    var mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
    var ext = format === 'jpg' ? 'jpg' : 'png';

    isConverting = true;
    clearError();
    hideDownload();
    if (convertBtn) convertBtn.disabled = true;

    try {
      setStatus('⏳', 'Converting pages…', 'Rendering page 1 of ' + totalPages);
      showProgress();
      updateProgress(0);

      var images = [];
      var scale = 2; // 2x for high quality (192 DPI)

      for (var i = 1; i <= totalPages; i++) {
        setStatus('⏳', 'Converting pages…', 'Rendering page ' + i + ' of ' + totalPages);
        updateProgress((i / totalPages) * 100);

        var page = await pdfDoc.getPage(i);
        var viewport = page.getViewport({ scale: scale });

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };

        await page.render(renderContext).promise;

        var blob = await new Promise(function (resolve) {
          canvas.toBlob(resolve, mimeType, 0.95);
        });

        var url = URL.createObjectURL(blob);
        images.push({
          url: url,
          name: 'page-' + i + '.' + ext,
          page: i,
          blob: blob
        });
      }

      updateProgress(100);

      var html = '<div class="space-y-3">';
      html += '<div class="rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/30 p-4">';
      html += '<p class="text-sm font-bold text-emerald-900 dark:text-emerald-200">✅ Conversion complete</p>';
      html += '<p class="text-xs text-emerald-700 dark:text-emerald-400">' + totalPages + ' image' + (totalPages !== 1 ? 's' : '') + ' created (' + format.toUpperCase() + ')</p>';
      html += '</div>';

      html += '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">';
      images.forEach(function (img) {
        html += '<div class="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 space-y-2">';
        html += '<div class="aspect-4/3 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">';
        html += '<img src="' + img.url + '" alt="Page ' + img.page + '" class="w-full h-full object-contain" />';
        html += '</div>';
        html += '<div class="flex items-center justify-between gap-2">';
        html += '<span class="text-xs font-semibold text-slate-700 dark:text-slate-300">Page ' + img.page + '</span>';
        html += '<a href="' + img.url + '" download="' + img.name + '" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold transition no-underline">';
        html += '<svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>';
        html += 'Download';
        html += '</a>';
        html += '</div>';
        html += '</div>';
      });
      html += '</div>';

      // Add download all button
      if (images.length > 1) {
        html += '<button id="pti-download-all" class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white shadow transition cursor-pointer">';
        html += '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>';
        html += 'Download All Images';
        html += '</button>';
        html += '</div>';
      }

      downloadSection.innerHTML = html;
      downloadSection.classList.remove('hidden');

      // Add event listener for download all
      var downloadAllBtn = document.getElementById('pti-download-all');
      if (downloadAllBtn) {
        downloadAllBtn.addEventListener('click', function () {
          images.forEach(function (img, idx) {
            setTimeout(function () {
              var a = document.createElement('a');
              a.href = img.url;
              a.download = img.name;
              a.click();
            }, idx * 200); // Stagger downloads
          });
        });
      }

      setStatus('✅', 'Conversion complete', totalPages + ' page' + (totalPages !== 1 ? 's' : '') + ' converted to ' + format.toUpperCase());

    } catch (err) {
      console.error('[PDF to Image]', err);
      showError(err.message || 'An error occurred while converting.');
      hideStatus();
    } finally {
      isConverting = false;
      if (convertBtn) convertBtn.disabled = false;
    }
  }

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function onDragOver(e) {
    preventDefaults(e);
    if (dropZone) dropZone.classList.add('pti-drag-active');
  }

  function onDragLeave(e) {
    preventDefaults(e);
    if (dropZone) dropZone.classList.remove('pti-drag-active');
  }

  function onDrop(e) {
    preventDefaults(e);
    if (dropZone) dropZone.classList.remove('pti-drag-active');
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
      if (e.target === dropZone || e.target.closest('#pti-drop-zone') === dropZone) {
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

  if (convertBtn) {
    convertBtn.addEventListener('click', doConvert);
  }

})();
