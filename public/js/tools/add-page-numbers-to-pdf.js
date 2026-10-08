/**
 * Add Page Numbers to PDF Tool — 100% Client-Side
 * Adds customizable page numbers to PDF documents directly in the browser.
 */
(function () {
  'use strict';

  var uploadedFile = null;
  var fileArrayBuffer = null;
  var totalPages = 0;
  var isProcessing = false;

  // DOM Elements
  var dropZone = document.getElementById('pn-drop-zone');
  var fileInput = document.getElementById('pn-file-input');
  var selectBtn = document.getElementById('pn-select-btn');
  var optionsSection = document.getElementById('pn-options-section');
  var filenameEl = document.getElementById('pn-filename');
  var fileSizeEl = document.getElementById('pn-file-size');
  var pageCountEl = document.getElementById('pn-page-count');
  var clearBtn = document.getElementById('pn-clear-btn');
  var processBtn = document.getElementById('pn-process-btn');

  var positionSelect = document.getElementById('pn-position');
  var formatSelect = document.getElementById('pn-format');
  var startNumInput = document.getElementById('pn-start-num');
  var fontSizeSelect = document.getElementById('pn-font-size');
  var skipCoverCheck = document.getElementById('pn-skip-cover');

  var statusSection = document.getElementById('pn-status-section');
  var statusIcon = document.getElementById('pn-status-icon');
  var statusTitle = document.getElementById('pn-status-title');
  var statusBody = document.getElementById('pn-status-body');
  var progressBar = document.getElementById('pn-progress-bar');
  var progressFill = document.getElementById('pn-progress-fill');

  var downloadSection = document.getElementById('pn-download-section');
  var downloadBtn = document.getElementById('pn-download-btn');
  var downloadFilename = document.getElementById('pn-download-filename');
  var downloadSize = document.getElementById('pn-download-size');
  var startOverBtn = document.getElementById('pn-start-over-btn');

  var errorBox = document.getElementById('pn-error-box');
  var errorText = document.getElementById('pn-error-text');

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
    totalPages = 0;
    isProcessing = false;
    if (fileInput) fileInput.value = '';
    clearError();
    hideStatus();
    hideDownload();
    if (optionsSection) optionsSection.classList.add('hidden');
    if (dropZone) dropZone.classList.remove('hidden');
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
      try {
        if (typeof window.PDFLib !== 'undefined') {
          var PDFDocument = window.PDFLib.PDFDocument;
          var doc = await PDFDocument.load(fileArrayBuffer, { ignoreEncryption: true });
          totalPages = doc.getPageCount();
          if (pageCountEl) pageCountEl.textContent = totalPages + (totalPages === 1 ? ' page' : ' pages');
        }
      } catch (err) {
        console.warn('Could not read page count', err);
      }
      if (dropZone) dropZone.classList.add('hidden');
      if (optionsSection) optionsSection.classList.remove('hidden');
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

  if (processBtn) {
    processBtn.addEventListener('click', async function () {
      if (isProcessing) return;
      clearError();

      if (!fileArrayBuffer || !uploadedFile) {
        showError('Please upload a PDF file first.');
        return;
      }

      var position = (positionSelect ? positionSelect.value : 'bottom-center');
      var format = (formatSelect ? formatSelect.value : 'page-n-of-total');
      var startNum = parseInt(startNumInput ? startNumInput.value : '1', 10) || 1;
      var fontSize = parseInt(fontSizeSelect ? fontSizeSelect.value : '10', 10) || 10;
      var skipCover = skipCoverCheck ? skipCoverCheck.checked : false;

      try {
        isProcessing = true;
        processBtn.disabled = true;
        setStatus('🔢', 'Numbering PDF Pages...', 'Calculating coordinates and stamping numbers.');
        showProgress();
        updateProgress(30);

        var PDFDocument = window.PDFLib.PDFDocument;
        var StandardFonts = window.PDFLib.StandardFonts;
        var rgb = window.PDFLib.rgb;

        var pdfDoc = await PDFDocument.load(fileArrayBuffer, { ignoreEncryption: true });
        var helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        var pages = pdfDoc.getPages();
        var total = pages.length;

        var textColor = rgb(0.25, 0.25, 0.25);
        var margin = 28; // points from edge

        for (var i = 0; i < total; i++) {
          if (skipCover && i === 0) continue;

          var pageNumber = startNum + (skipCover ? (i - 1) : i);
          var effectiveTotal = skipCover ? (total - 1) : total;

          var textStr = '';
          if (format === 'page-n-of-total') {
            textStr = 'Page ' + pageNumber + ' of ' + effectiveTotal;
          } else if (format === 'n-slash-total') {
            textStr = pageNumber + ' / ' + effectiveTotal;
          } else if (format === 'page-n') {
            textStr = 'Page ' + pageNumber;
          } else if (format === 'dash-n') {
            textStr = '- ' + pageNumber + ' -';
          } else {
            textStr = '' + pageNumber;
          }

          var page = pages[i];
          var width = page.getWidth();
          var height = page.getHeight();
          var textWidth = helveticaFont.widthOfTextAtSize(textStr, fontSize);

          var x = 0;
          var y = 0;

          // Compute X
          if (position.includes('left')) {
            x = margin;
          } else if (position.includes('right')) {
            x = width - margin - textWidth;
          } else {
            // center
            x = (width - textWidth) / 2;
          }

          // Compute Y
          if (position.includes('top')) {
            y = height - margin;
          } else {
            // bottom
            y = margin;
          }

          page.drawText(textStr, {
            x: x,
            y: y,
            size: fontSize,
            font: helveticaFont,
            color: textColor
          });
        }

        updateProgress(80);
        var numberedBytes = await pdfDoc.save();
        updateProgress(100);

        var numberedBlob = new Blob([numberedBytes], { type: 'application/pdf' });

        hideStatus();
        if (optionsSection) optionsSection.classList.add('hidden');
        if (downloadSection) downloadSection.classList.remove('hidden');

        var outName = uploadedFile.name.replace(/\.pdf$/i, '') + '-numbered.pdf';
        if (downloadFilename) downloadFilename.textContent = outName;
        if (downloadSize) downloadSize.textContent = formatBytes(numberedBlob.size);

        if (downloadBtn) {
          var oldUrl = downloadBtn.getAttribute('data-url');
          if (oldUrl) URL.revokeObjectURL(oldUrl);

          var url = URL.createObjectURL(numberedBlob);
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
        showError(err.message || 'An error occurred while adding page numbers.');
      } finally {
        isProcessing = false;
        if (processBtn) processBtn.disabled = false;
      }
    });
  }
})();
