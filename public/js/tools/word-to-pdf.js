/**
 * Word to PDF Tool — 100% Client-Side
 * Converts Word (.docx) documents into standard, printable PDF documents directly in the browser.
 */
(function () {
  'use strict';

  var uploadedFile = null;
  var fileArrayBuffer = null;
  var isProcessing = false;

  // DOM Elements
  var dropZone = document.getElementById('wp-drop-zone');
  var fileInput = document.getElementById('wp-file-input');
  var selectBtn = document.getElementById('wp-select-btn');
  var optionsSection = document.getElementById('wp-options-section');
  var filenameEl = document.getElementById('wp-filename');
  var fileSizeEl = document.getElementById('wp-file-size');
  var clearBtn = document.getElementById('wp-clear-btn');
  var convertBtn = document.getElementById('wp-convert-btn');

  var pageSizeSelect = document.getElementById('wp-page-size');
  var marginSelect = document.getElementById('wp-margin');

  var statusSection = document.getElementById('wp-status-section');
  var statusIcon = document.getElementById('wp-status-icon');
  var statusTitle = document.getElementById('wp-status-title');
  var statusBody = document.getElementById('wp-status-body');
  var progressBar = document.getElementById('wp-progress-bar');
  var progressFill = document.getElementById('wp-progress-fill');

  var downloadSection = document.getElementById('wp-download-section');
  var downloadBtn = document.getElementById('wp-download-btn');
  var downloadFilename = document.getElementById('wp-download-filename');
  var downloadSize = document.getElementById('wp-download-size');
  var startOverBtn = document.getElementById('wp-start-over-btn');

  var errorBox = document.getElementById('wp-error-box');
  var errorText = document.getElementById('wp-error-text');

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

  async function convertDocxToPdf(arrayBuffer, pageSize, marginVal) {
    // 1. Ensure Mammoth is loaded
    if (typeof window.mammoth === 'undefined') {
      await new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js';
        script.onload = resolve;
        script.onerror = function () {
          reject(new Error('Failed to load Word document reader library.'));
        };
        document.head.appendChild(script);
      });
    }

    // 2. Ensure jsPDF is loaded
    if (typeof window.jspdf === 'undefined') {
      await new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = resolve;
        script.onerror = function () {
          reject(new Error('Failed to load PDF generation engine.'));
        };
        document.head.appendChild(script);
      });
    }

    updateProgress(40);
    // Parse DOCX with Mammoth to raw text and structured HTML
    var result = await window.mammoth.extractRawText({ arrayBuffer: arrayBuffer });
    var rawText = result.value || '';
    if (!rawText.trim()) {
      throw new Error('The Word document does not contain readable text.');
    }

    updateProgress(70);
    var jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: pageSize === 'letter' ? 'letter' : 'a4'
    });

    var margin = marginVal === 'narrow' ? 36 : (marginVal === 'wide' ? 72 : 54);
    var pageWidth = doc.internal.pageSize.getWidth();
    var pageHeight = doc.internal.pageSize.getHeight();
    var maxLineWidth = pageWidth - (margin * 2);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);

    var paragraphs = rawText.split(/\r?\n/);
    var cursorY = margin + 10;
    var lineHeight = 16;

    for (var i = 0; i < paragraphs.length; i++) {
      var p = paragraphs[i].trim();
      if (!p) {
        cursorY += lineHeight * 0.5;
        continue;
      }

      var splitLines = doc.splitTextToSize(p, maxLineWidth);
      for (var j = 0; j < splitLines.length; j++) {
        if (cursorY + lineHeight > pageHeight - margin) {
          doc.addPage();
          cursorY = margin + 10;
        }
        doc.text(splitLines[j], margin, cursorY);
        cursorY += lineHeight;
      }
      cursorY += lineHeight * 0.4;
    }

    updateProgress(95);
    var pdfBlob = doc.output('blob');
    return pdfBlob;
  }

  function handleFile(file) {
    clearError();
    hideDownload();
    hideStatus();

    if (!file) return;

    var ext = file.name.toLowerCase();
    if (!ext.endsWith('.docx') && !ext.endsWith('.doc')) {
      showError('Please select a valid Word document (.docx or .doc)');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      showError('File is too large (maximum 50 MB). Please choose a smaller Word file.');
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
      showError('Could not read the selected Word document. Please try again.');
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
        showError('Please upload a Word document first.');
        return;
      }

      var pageSize = pageSizeSelect ? pageSizeSelect.value : 'a4';
      var margin = marginSelect ? marginSelect.value : 'normal';

      try {
        isProcessing = true;
        convertBtn.disabled = true;
        setStatus('📄', 'Converting Word to PDF...', 'Parsing document typography and building printable pages.');
        showProgress();
        updateProgress(20);

        var pdfBlob = await convertDocxToPdf(fileArrayBuffer, pageSize, margin);
        updateProgress(100);

        hideStatus();
        if (optionsSection) optionsSection.classList.add('hidden');
        if (downloadSection) downloadSection.classList.remove('hidden');

        var outName = uploadedFile.name.replace(/\.(docx|doc)$/i, '') + '.pdf';
        if (downloadFilename) downloadFilename.textContent = outName;
        if (downloadSize) downloadSize.textContent = formatBytes(pdfBlob.size);

        if (downloadBtn) {
          var oldUrl = downloadBtn.getAttribute('data-url');
          if (oldUrl) URL.revokeObjectURL(oldUrl);

          var url = URL.createObjectURL(pdfBlob);
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
        showError(err.message || 'An error occurred while converting Word to PDF.');
      } finally {
        isProcessing = false;
        if (convertBtn) convertBtn.disabled = false;
      }
    });
  }
})();
