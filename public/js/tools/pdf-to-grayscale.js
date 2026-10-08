/**
 * PDF to Grayscale Tool — 100% Client-Side
 * Converts color PDF documents into black & white / grayscale PDFs directly in the browser.
 */
(function () {
  'use strict';

  var uploadedFile = null;
  var fileArrayBuffer = null;
  var isProcessing = false;

  // DOM Elements
  var dropZone = document.getElementById('pg-drop-zone');
  var fileInput = document.getElementById('pg-file-input');
  var selectBtn = document.getElementById('pg-select-btn');
  var optionsSection = document.getElementById('pg-options-section');
  var filenameEl = document.getElementById('pg-filename');
  var fileSizeEl = document.getElementById('pg-file-size');
  var clearBtn = document.getElementById('pg-clear-btn');
  var convertBtn = document.getElementById('pg-convert-btn');

  var qualitySelect = document.getElementById('pg-quality');
  var contrastSelect = document.getElementById('pg-contrast');

  var statusSection = document.getElementById('pg-status-section');
  var statusIcon = document.getElementById('pg-status-icon');
  var statusTitle = document.getElementById('pg-status-title');
  var statusBody = document.getElementById('pg-status-body');
  var progressBar = document.getElementById('pg-progress-bar');
  var progressFill = document.getElementById('pg-progress-fill');

  var downloadSection = document.getElementById('pg-download-section');
  var downloadBtn = document.getElementById('pg-download-btn');
  var downloadFilename = document.getElementById('pg-download-filename');
  var downloadSize = document.getElementById('pg-download-size');
  var startOverBtn = document.getElementById('pg-start-over-btn');

  var errorBox = document.getElementById('pg-error-box');
  var errorText = document.getElementById('pg-error-text');

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
    isProcessing = false;
    if (fileInput) fileInput.value = '';
    clearError();
    hideStatus();
    hideDownload();
    if (optionsSection) optionsSection.classList.add('hidden');
    if (dropZone) dropZone.classList.remove('hidden');
  }

  async function ensurePdfJs() {
    if (typeof window.pdfjsLib === 'undefined') {
      await new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        script.onload = function () {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
          resolve();
        };
        script.onerror = function () {
          reject(new Error('Failed to load PDF rendering engine.'));
        };
        document.head.appendChild(script);
      });
    }
  }

  async function ensurePdfLib() {
    if (typeof window.PDFLib === 'undefined') {
      await new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js';
        script.onload = resolve;
        script.onerror = function () {
          reject(new Error('Failed to load PDF library.'));
        };
        document.head.appendChild(script);
      });
    }
  }

  async function convertPdfToGrayscale(pdfBytes, scaleDpi, contrastBoost) {
    await ensurePdfJs();
    await ensurePdfLib();

    var loadingTask = window.pdfjsLib.getDocument({ data: pdfBytes });
    var pdf = await loadingTask.promise;
    var numPages = pdf.numPages;

    var PDFDocument = window.PDFLib.PDFDocument;
    var outPdfDoc = await PDFDocument.create();

    var scale = (scaleDpi === 'high' ? 2.0 : (scaleDpi === 'low' ? 1.0 : 1.5));

    for (var i = 1; i <= numPages; i++) {
      setStatus('⚙️', 'Processing Page ' + i + ' of ' + numPages, 'Converting color layers to grayscale luminance.');
      updateProgress(10 + Math.round((i / numPages) * 80));

      var page = await pdf.getPage(i);
      var viewport = page.getViewport({ scale: scale });
      var unscaledViewport = page.getViewport({ scale: 1.0 });

      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({
        canvasContext: ctx,
        viewport: viewport
      }).promise;

      // Apply Grayscale Filter to Canvas Pixel Buffer
      var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var data = imgData.data;
      var factor = contrastBoost ? 1.15 : 1.0;

      for (var p = 0; p < data.length; p += 4) {
        // Standard Rec. 601 Luma formula
        var gray = 0.299 * data[p] + 0.587 * data[p + 1] + 0.114 * data[p + 2];
        if (contrastBoost) {
          gray = ((gray - 128) * factor) + 128;
          gray = Math.max(0, Math.min(255, gray));
        }
        data[p] = gray;
        data[p + 1] = gray;
        data[p + 2] = gray;
      }
      ctx.putImageData(imgData, 0, 0);

      // Convert Canvas to JPEG bytes
      var jpegDataUrl = canvas.toDataURL('image/jpeg', 0.85);
      var jpegImageBytes = await fetch(jpegDataUrl).then(function (res) { return res.arrayBuffer(); });
      var embeddedJpg = await outPdfDoc.embedJpg(jpegImageBytes);

      var newPage = outPdfDoc.addPage([unscaledViewport.width, unscaledViewport.height]);
      newPage.drawImage(embeddedJpg, {
        x: 0,
        y: 0,
        width: unscaledViewport.width,
        height: unscaledViewport.height
      });
    }

    updateProgress(95);
    var grayscaleBytes = await outPdfDoc.save();
    return new Blob([grayscaleBytes], { type: 'application/pdf' });
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
    reader.onload = function (e) {
      fileArrayBuffer = e.target.result;
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

  if (convertBtn) {
    convertBtn.addEventListener('click', async function () {
      if (isProcessing) return;
      clearError();

      if (!fileArrayBuffer || !uploadedFile) {
        showError('Please upload a PDF file first.');
        return;
      }

      var quality = qualitySelect ? qualitySelect.value : 'medium';
      var contrast = contrastSelect ? (contrastSelect.value === 'high') : false;

      try {
        isProcessing = true;
        convertBtn.disabled = true;
        setStatus('🖨️', 'Converting to Grayscale...', 'Preparing document canvas and color filter.');
        showProgress();
        updateProgress(5);

        var grayscaleBlob = await convertPdfToGrayscale(fileArrayBuffer, quality, contrast);
        updateProgress(100);

        hideStatus();
        if (optionsSection) optionsSection.classList.add('hidden');
        if (downloadSection) downloadSection.classList.remove('hidden');

        var outName = uploadedFile.name.replace(/\.pdf$/i, '') + '-grayscale.pdf';
        if (downloadFilename) downloadFilename.textContent = outName;
        if (downloadSize) downloadSize.textContent = formatBytes(grayscaleBlob.size);

        if (downloadBtn) {
          var oldUrl = downloadBtn.getAttribute('data-url');
          if (oldUrl) URL.revokeObjectURL(oldUrl);

          var url = URL.createObjectURL(grayscaleBlob);
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
        showError(err.message || 'An error occurred while converting PDF to grayscale.');
      } finally {
        isProcessing = false;
        if (convertBtn) convertBtn.disabled = false;
      }
    });
  }
})();
