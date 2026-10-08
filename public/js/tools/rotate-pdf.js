/**
 * Rotate PDF Tool — 100% Client-Side
 * Rotates PDF pages (90° CW, 180°, 270° CW) with interactive page preview and multi-page selection.
 */
(function () {
  'use strict';

  var uploadedFile = null;
  var fileArrayBuffer = null;
  var pdfDoc = null;
  var totalPages = 0;
  var isProcessing = false;
  var pageRotations = {}; // page index -> rotation angle added (90, 180, 270)

  // DOM Elements
  var dropZone = document.getElementById('rp-drop-zone');
  var fileInput = document.getElementById('rp-file-input');
  var selectBtn = document.getElementById('rp-select-btn');
  var optionsSection = document.getElementById('rp-options-section');
  var filenameEl = document.getElementById('rp-filename');
  var fileSizeEl = document.getElementById('rp-file-size');
  var pageCountEl = document.getElementById('rp-page-count');
  var clearBtn = document.getElementById('rp-clear-btn');
  var rotateBtn = document.getElementById('rp-rotate-btn');

  var rotate90Btn = document.getElementById('rp-rot-90');
  var rotate180Btn = document.getElementById('rp-rot-180');
  var rotate270Btn = document.getElementById('rp-rot-270');
  var resetRotBtn = document.getElementById('rp-rot-reset');
  var pagesGrid = document.getElementById('rp-pages-grid');

  var statusSection = document.getElementById('rp-status-section');
  var statusIcon = document.getElementById('rp-status-icon');
  var statusTitle = document.getElementById('rp-status-title');
  var statusBody = document.getElementById('rp-status-body');
  var progressBar = document.getElementById('rp-progress-bar');
  var progressFill = document.getElementById('rp-progress-fill');

  var downloadSection = document.getElementById('rp-download-section');
  var downloadBtn = document.getElementById('rp-download-btn');
  var downloadFilename = document.getElementById('rp-download-filename');
  var downloadSize = document.getElementById('rp-download-size');
  var startOverBtn = document.getElementById('rp-start-over-btn');

  var errorBox = document.getElementById('rp-error-box');
  var errorText = document.getElementById('rp-error-text');

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
    hideProgress();
  }

  function showProgress() {
    if (progressBar) progressBar.classList.remove('hidden');
    updateProgress(0);
  }

  function updateProgress(percent) {
    if (progressFill) {
      var clamped = Math.max(0, Math.min(100, Math.round(percent)));
      progressFill.style.width = clamped + '%';
    }
  }

  function hideProgress() {
    if (progressBar) progressBar.classList.add('hidden');
    if (progressFill) progressFill.style.width = '0%';
  }

  function hideDownload() {
    if (downloadSection) downloadSection.classList.add('hidden');
  }

  function resetAll() {
    uploadedFile = null;
    fileArrayBuffer = null;
    pdfDoc = null;
    totalPages = 0;
    pageRotations = {};
    isProcessing = false;
    if (fileInput) fileInput.value = '';
    if (pagesGrid) pagesGrid.innerHTML = '';
    clearError();
    hideStatus();
    hideDownload();
    if (optionsSection) optionsSection.classList.add('hidden');
    if (dropZone) dropZone.classList.remove('hidden');
  }

  async function renderPageThumbnails(pdfBytes) {
    if (!pagesGrid) return;
    pagesGrid.innerHTML = '';

    try {
      if (typeof window.PDFLib === 'undefined') {
        throw new Error('PDF library is loading. Please try again in a few seconds.');
      }

      var PDFDocument = window.PDFLib.PDFDocument;
      pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
      totalPages = pdfDoc.getPageCount();

      if (pageCountEl) pageCountEl.textContent = totalPages + (totalPages === 1 ? ' page' : ' pages');

      for (var i = 0; i < totalPages; i++) {
        pageRotations[i] = 0;

        var card = document.createElement('div');
        card.className = 'group relative flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition hover:border-red-400';
        card.setAttribute('data-page-index', i);

        var previewBox = document.createElement('div');
        previewBox.id = 'rp-preview-' + i;
        previewBox.className = 'w-full h-32 flex items-center justify-center bg-slate-100 dark:bg-slate-900/60 rounded-lg text-3xl font-mono transition-transform duration-200';
        previewBox.textContent = '📄 ' + (i + 1);

        var badge = document.createElement('div');
        badge.className = 'mt-2 text-xs font-semibold text-slate-700 dark:text-slate-300';
        badge.textContent = 'Page ' + (i + 1);

        var rotLabel = document.createElement('div');
        rotLabel.id = 'rp-rot-label-' + i;
        rotLabel.className = 'text-[11px] text-slate-400 dark:text-slate-500 font-medium';
        rotLabel.textContent = '0°';

        // Rotate individual button
        var rotSingleBtn = document.createElement('button');
        rotSingleBtn.type = 'button';
        rotSingleBtn.className = 'mt-1.5 px-2 py-0.5 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-700 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/60 transition';
        rotSingleBtn.textContent = '⟳ Rotate';
        (function (pageIdx) {
          rotSingleBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            rotateSinglePage(pageIdx, 90);
          });
        })(i);

        card.appendChild(previewBox);
        card.appendChild(badge);
        card.appendChild(rotLabel);
        card.appendChild(rotSingleBtn);

        pagesGrid.appendChild(card);
      }
    } catch (err) {
      console.error(err);
      showError('Could not load PDF pages: ' + err.message);
    }
  }

  function rotateSinglePage(pageIdx, angle) {
    pageRotations[pageIdx] = ((pageRotations[pageIdx] || 0) + angle) % 360;
    updateCardVisual(pageIdx);
  }

  function rotateAllPages(angle) {
    for (var i = 0; i < totalPages; i++) {
      pageRotations[i] = ((pageRotations[i] || 0) + angle) % 360;
      updateCardVisual(i);
    }
  }

  function resetRotations() {
    for (var i = 0; i < totalPages; i++) {
      pageRotations[i] = 0;
      updateCardVisual(i);
    }
  }

  function updateCardVisual(pageIdx) {
    var preview = document.getElementById('rp-preview-' + pageIdx);
    var rotLabel = document.getElementById('rp-rot-label-' + pageIdx);
    var rot = pageRotations[pageIdx] || 0;

    if (preview) {
      preview.style.transform = 'rotate(' + rot + 'deg)';
    }
    if (rotLabel) {
      rotLabel.textContent = rot + '°';
      rotLabel.className = rot > 0
        ? 'text-[11px] text-red-600 dark:text-red-400 font-bold'
        : 'text-[11px] text-slate-400 dark:text-slate-500 font-medium';
    }
  }

  if (rotate90Btn) {
    rotate90Btn.addEventListener('click', function () { rotateAllPages(90); });
  }
  if (rotate180Btn) {
    rotate180Btn.addEventListener('click', function () { rotateAllPages(180); });
  }
  if (rotate270Btn) {
    rotate270Btn.addEventListener('click', function () { rotateAllPages(270); });
  }
  if (resetRotBtn) {
    resetRotBtn.addEventListener('click', resetRotations);
  }

  function handleFile(file) {
    clearError();
    hideDownload();
    hideStatus();

    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      showError('Please select a valid PDF document (.pdf)');
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      showError('File is too large (maximum 100 MB). Please choose a smaller PDF.');
      return;
    }

    uploadedFile = file;
    if (filenameEl) filenameEl.textContent = file.name;
    if (fileSizeEl) fileSizeEl.textContent = formatBytes(file.size);

    var reader = new FileReader();
    reader.onload = async function (e) {
      fileArrayBuffer = e.target.result;
      if (dropZone) dropZone.classList.add('hidden');
      if (optionsSection) optionsSection.classList.remove('hidden');
      await renderPageThumbnails(fileArrayBuffer);
    };
    reader.onerror = function () {
      showError('Could not read the selected PDF file. Please try again.');
    };
    reader.readAsArrayBuffer(file);
  }

  if (dropZone) {
    dropZone.addEventListener('dragover', function (e) {
      e.preventDefault();
      dropZone.classList.add('border-red-500', 'bg-red-50/50', 'dark:bg-red-950/30');
    });
    dropZone.addEventListener('dragleave', function (e) {
      e.preventDefault();
      dropZone.classList.remove('border-red-500', 'bg-red-50/50', 'dark:bg-red-950/30');
    });
    dropZone.addEventListener('drop', function (e) {
      e.preventDefault();
      dropZone.classList.remove('border-red-500', 'bg-red-50/50', 'dark:bg-red-950/30');
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFile(e.dataTransfer.files[0]);
      }
    });
    dropZone.addEventListener('click', function (e) {
      if (e.target !== selectBtn && fileInput) {
        fileInput.click();
      }
    });
  }

  if (selectBtn && fileInput) {
    selectBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      fileInput.click();
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', function () {
      if (fileInput.files && fileInput.files.length > 0) {
        handleFile(fileInput.files[0]);
      }
    });
  }

  if (clearBtn) clearBtn.addEventListener('click', resetAll);
  if (startOverBtn) startOverBtn.addEventListener('click', resetAll);

  if (rotateBtn) {
    rotateBtn.addEventListener('click', async function () {
      if (isProcessing) return;
      clearError();

      if (!fileArrayBuffer || !uploadedFile) {
        showError('Please upload a PDF file first.');
        return;
      }

      try {
        isProcessing = true;
        rotateBtn.disabled = true;
        setStatus('🔄', 'Rotating PDF Pages...', 'Applying rotation angles to pages.');
        showProgress();
        updateProgress(30);

        var PDFDocument = window.PDFLib.PDFDocument;
        var degrees = window.PDFLib.degrees;

        var loadedDoc = await PDFDocument.load(fileArrayBuffer, { ignoreEncryption: true });
        var pages = loadedDoc.getPages();

        for (var i = 0; i < pages.length; i++) {
          var additionalRotation = pageRotations[i] || 0;
          if (additionalRotation !== 0) {
            var currentAngle = pages[i].getRotation().angle;
            var newAngle = (currentAngle + additionalRotation) % 360;
            pages[i].setRotation(degrees(newAngle));
          }
        }
        updateProgress(75);

        var rotatedBytes = await loadedDoc.save();
        updateProgress(100);

        var rotatedBlob = new Blob([rotatedBytes], { type: 'application/pdf' });

        hideStatus();
        if (optionsSection) optionsSection.classList.add('hidden');
        if (downloadSection) downloadSection.classList.remove('hidden');

        var outName = uploadedFile.name.replace(/\.pdf$/i, '') + '-rotated.pdf';
        if (downloadFilename) downloadFilename.textContent = outName;
        if (downloadSize) downloadSize.textContent = formatBytes(rotatedBlob.size);

        if (downloadBtn) {
          var oldUrl = downloadBtn.getAttribute('data-url');
          if (oldUrl) URL.revokeObjectURL(oldUrl);

          var url = URL.createObjectURL(rotatedBlob);
          downloadBtn.setAttribute('data-url', url);
          downloadBtn.onclick = function () {
            var a = document.createElement('a');
            a.href = url;
            a.download = outName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          };
        }
      } catch (err) {
        console.error(err);
        hideStatus();
        showError(err.message || 'An error occurred while rotating the PDF.');
      } finally {
        isProcessing = false;
        if (rotateBtn) rotateBtn.disabled = false;
      }
    });
  }
})();
