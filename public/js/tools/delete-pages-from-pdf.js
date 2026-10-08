/**
 * Delete Pages from PDF Tool — 100% Client-Side
 * Removes unwanted pages from PDF documents with interactive visual page selector and custom range inputs.
 */
(function () {
  'use strict';

  var uploadedFile = null;
  var fileArrayBuffer = null;
  var pdfDoc = null;
  var totalPages = 0;
  var isProcessing = false;
  var selectedForDeletion = new Set(); // 0-based page indices

  // DOM Elements
  var dropZone = document.getElementById('dp-drop-zone');
  var fileInput = document.getElementById('dp-file-input');
  var selectBtn = document.getElementById('dp-select-btn');
  var optionsSection = document.getElementById('dp-options-section');
  var filenameEl = document.getElementById('dp-filename');
  var fileSizeEl = document.getElementById('dp-file-size');
  var pageCountEl = document.getElementById('dp-page-count');
  var pagesGrid = document.getElementById('dp-pages-grid');
  var rangeInput = document.getElementById('dp-range-input');
  var applyRangeBtn = document.getElementById('dp-apply-range');
  var selectAllBtn = document.getElementById('dp-select-all');
  var deselectAllBtn = document.getElementById('dp-deselect-all');
  var deleteInfoText = document.getElementById('dp-delete-info');

  var clearBtn = document.getElementById('dp-clear-btn');
  var deleteBtn = document.getElementById('dp-delete-btn');

  var statusSection = document.getElementById('dp-status-section');
  var statusIcon = document.getElementById('dp-status-icon');
  var statusTitle = document.getElementById('dp-status-title');
  var statusBody = document.getElementById('dp-status-body');
  var progressBar = document.getElementById('dp-progress-bar');
  var progressFill = document.getElementById('dp-progress-fill');

  var downloadSection = document.getElementById('dp-download-section');
  var downloadBtn = document.getElementById('dp-download-btn');
  var downloadFilename = document.getElementById('dp-download-filename');
  var downloadSize = document.getElementById('dp-download-size');
  var startOverBtn = document.getElementById('dp-start-over-btn');

  var errorBox = document.getElementById('dp-error-box');
  var errorText = document.getElementById('dp-error-text');

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
    isProcessing = false;
    selectedForDeletion.clear();
    if (fileInput) fileInput.value = '';
    if (pagesGrid) pagesGrid.innerHTML = '';
    if (rangeInput) rangeInput.value = '';
    clearError();
    hideStatus();
    hideDownload();
    if (optionsSection) optionsSection.classList.add('hidden');
    if (dropZone) dropZone.classList.remove('hidden');
  }

  function updateVisualCards() {
    var cards = pagesGrid ? pagesGrid.querySelectorAll('[data-page-index]') : [];
    cards.forEach(function (card) {
      var idx = parseInt(card.getAttribute('data-page-index'), 10);
      var isDeleted = selectedForDeletion.has(idx);
      var trashBadge = card.querySelector('.trash-badge');

      if (isDeleted) {
        card.classList.add('border-red-500', 'bg-red-50', 'dark:bg-red-950/40', 'opacity-60');
        card.classList.remove('border-slate-200', 'dark:border-slate-700', 'bg-white', 'dark:bg-slate-800');
        if (trashBadge) trashBadge.classList.remove('hidden');
      } else {
        card.classList.remove('border-red-500', 'bg-red-50', 'dark:bg-red-950/40', 'opacity-60');
        card.classList.add('border-slate-200', 'dark:border-slate-700', 'bg-white', 'dark:bg-slate-800');
        if (trashBadge) trashBadge.classList.add('hidden');
      }
    });

    var delCount = selectedForDeletion.size;
    var retainCount = totalPages - delCount;
    if (deleteInfoText) {
      deleteInfoText.textContent = delCount > 0
        ? 'Selected ' + delCount + ' page(s) to delete (' + retainCount + ' pages remaining)'
        : 'Click on pages below to select them for deletion';
    }
    if (deleteBtn) {
      deleteBtn.disabled = delCount === 0 || retainCount === 0;
    }
  }

  function togglePageSelection(idx) {
    if (selectedForDeletion.has(idx)) {
      selectedForDeletion.delete(idx);
    } else {
      if (selectedForDeletion.size >= totalPages - 1 && !selectedForDeletion.has(idx)) {
        showError('You cannot delete all pages. At least one page must remain in the PDF.');
        return;
      }
      clearError();
      selectedForDeletion.add(idx);
    }
    updateVisualCards();
  }

  function parsePageRange(str, max) {
    var pages = new Set();
    var parts = str.split(',');
    for (var i = 0; i < parts.length; i++) {
      var part = parts[i].trim();
      if (!part) continue;
      if (part.indexOf('-') !== -1) {
        var range = part.split('-');
        var start = parseInt(range[0].trim(), 10);
        var end = parseInt(range[1].trim(), 10);
        if (!isNaN(start) && !isNaN(end)) {
          for (var p = Math.min(start, end); p <= Math.max(start, end); p++) {
            if (p >= 1 && p <= max) {
              pages.add(p - 1);
            }
          }
        }
      } else {
        var num = parseInt(part, 10);
        if (!isNaN(num) && num >= 1 && num <= max) {
          pages.add(num - 1);
        }
      }
    }
    return pages;
  }

  async function renderThumbnails(pdfBytes) {
    if (!pagesGrid) return;
    pagesGrid.innerHTML = '';
    selectedForDeletion.clear();

    try {
      if (typeof window.PDFLib === 'undefined') {
        throw new Error('PDF library is loading. Please try again.');
      }

      var PDFDocument = window.PDFLib.PDFDocument;
      pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
      totalPages = pdfDoc.getPageCount();

      if (pageCountEl) pageCountEl.textContent = totalPages + (totalPages === 1 ? ' page' : ' pages');

      for (var i = 0; i < totalPages; i++) {
        var card = document.createElement('div');
        card.className = 'group relative flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition cursor-pointer hover:shadow-md';
        card.setAttribute('data-page-index', i);

        var trashBadge = document.createElement('div');
        trashBadge.className = 'trash-badge hidden absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white shadow-sm';
        trashBadge.textContent = '✕ DELETE';

        var previewBox = document.createElement('div');
        previewBox.className = 'w-full h-32 flex items-center justify-center bg-slate-100 dark:bg-slate-900/60 rounded-lg text-3xl font-mono';
        previewBox.textContent = '📄 ' + (i + 1);

        var badge = document.createElement('div');
        badge.className = 'mt-2 text-xs font-semibold text-slate-700 dark:text-slate-300';
        badge.textContent = 'Page ' + (i + 1);

        card.appendChild(trashBadge);
        card.appendChild(previewBox);
        card.appendChild(badge);

        (function (pageIdx) {
          card.addEventListener('click', function () {
            togglePageSelection(pageIdx);
          });
        })(i);

        pagesGrid.appendChild(card);
      }
      updateVisualCards();
    } catch (err) {
      console.error(err);
      showError('Could not load PDF pages: ' + err.message);
    }
  }

  if (applyRangeBtn && rangeInput) {
    applyRangeBtn.addEventListener('click', function () {
      var val = rangeInput.value.trim();
      if (!val) return;
      var parsed = parsePageRange(val, totalPages);
      if (parsed.size >= totalPages) {
        showError('You cannot delete all pages. Please specify fewer pages.');
        return;
      }
      clearError();
      selectedForDeletion = parsed;
      updateVisualCards();
    });
  }

  if (deselectAllBtn) {
    deselectAllBtn.addEventListener('click', function () {
      selectedForDeletion.clear();
      updateVisualCards();
    });
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
      await renderThumbnails(fileArrayBuffer);
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

  if (deleteBtn) {
    deleteBtn.addEventListener('click', async function () {
      if (isProcessing) return;
      clearError();

      if (!fileArrayBuffer || !uploadedFile) {
        showError('Please upload a PDF file first.');
        return;
      }

      if (selectedForDeletion.size === 0) {
        showError('Please select at least one page to delete.');
        return;
      }

      if (selectedForDeletion.size >= totalPages) {
        showError('Cannot delete all pages from the PDF document.');
        return;
      }

      try {
        isProcessing = true;
        deleteBtn.disabled = true;
        setStatus('🗑️', 'Removing Selected Pages...', 'Constructing clean PDF without deleted pages.');
        showProgress();
        updateProgress(30);

        var PDFDocument = window.PDFLib.PDFDocument;
        var loadedDoc = await PDFDocument.load(fileArrayBuffer, { ignoreEncryption: true });
        var freshDoc = await PDFDocument.create();

        var retainIndices = [];
        for (var i = 0; i < totalPages; i++) {
          if (!selectedForDeletion.has(i)) {
            retainIndices.push(i);
          }
        }

        updateProgress(60);
        var copiedPages = await freshDoc.copyPages(loadedDoc, retainIndices);
        copiedPages.forEach(function (p) {
          freshDoc.addPage(p);
        });

        freshDoc.setTitle(loadedDoc.getTitle() || 'Modified PDF');
        var modifiedBytes = await freshDoc.save();
        updateProgress(100);

        var modifiedBlob = new Blob([modifiedBytes], { type: 'application/pdf' });

        hideStatus();
        if (optionsSection) optionsSection.classList.add('hidden');
        if (downloadSection) downloadSection.classList.remove('hidden');

        var outName = uploadedFile.name.replace(/\.pdf$/i, '') + '-modified.pdf';
        if (downloadFilename) downloadFilename.textContent = outName;
        if (downloadSize) downloadSize.textContent = formatBytes(modifiedBlob.size);

        if (downloadBtn) {
          var oldUrl = downloadBtn.getAttribute('data-url');
          if (oldUrl) URL.revokeObjectURL(oldUrl);

          var url = URL.createObjectURL(modifiedBlob);
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
        showError(err.message || 'An error occurred while deleting pages from the PDF.');
      } finally {
        isProcessing = false;
        if (deleteBtn) deleteBtn.disabled = false;
      }
    });
  }
})();
