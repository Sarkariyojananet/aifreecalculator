/**
 * Reorder PDF Pages Tool — 100% Client-Side
 * Rearranges and reorders PDF pages with interactive page sequence controls.
 */
(function () {
  'use strict';

  var uploadedFile = null;
  var fileArrayBuffer = null;
  var pdfDoc = null;
  var totalPages = 0;
  var isProcessing = false;
  var pageSequence = []; // array of 0-based page indices in current order

  // DOM Elements
  var dropZone = document.getElementById('ro-drop-zone');
  var fileInput = document.getElementById('ro-file-input');
  var selectBtn = document.getElementById('ro-select-btn');
  var optionsSection = document.getElementById('ro-options-section');
  var filenameEl = document.getElementById('ro-filename');
  var fileSizeEl = document.getElementById('ro-file-size');
  var pageCountEl = document.getElementById('ro-page-count');
  var pagesGrid = document.getElementById('ro-pages-grid');

  var reverseBtn = document.getElementById('ro-reverse-btn');
  var resetOrderBtn = document.getElementById('ro-reset-order-btn');
  var clearBtn = document.getElementById('ro-clear-btn');
  var reorderBtn = document.getElementById('ro-reorder-btn');

  var statusSection = document.getElementById('ro-status-section');
  var statusIcon = document.getElementById('ro-status-icon');
  var statusTitle = document.getElementById('ro-status-title');
  var statusBody = document.getElementById('ro-status-body');
  var progressBar = document.getElementById('ro-progress-bar');
  var progressFill = document.getElementById('ro-progress-fill');

  var downloadSection = document.getElementById('ro-download-section');
  var downloadBtn = document.getElementById('ro-download-btn');
  var downloadFilename = document.getElementById('ro-download-filename');
  var downloadSize = document.getElementById('ro-download-size');
  var startOverBtn = document.getElementById('ro-start-over-btn');

  var errorBox = document.getElementById('ro-error-box');
  var errorText = document.getElementById('ro-error-text');

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
    pageSequence = [];
    isProcessing = false;
    if (fileInput) fileInput.value = '';
    if (pagesGrid) pagesGrid.innerHTML = '';
    clearError();
    hideStatus();
    hideDownload();
    if (optionsSection) optionsSection.classList.add('hidden');
    if (dropZone) dropZone.classList.remove('hidden');
  }

  function renderGrid() {
    if (!pagesGrid) return;
    pagesGrid.innerHTML = '';

    for (var pos = 0; pos < pageSequence.length; pos++) {
      var originalPageIdx = pageSequence[pos];

      var card = document.createElement('div');
      card.className = 'group relative flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition';

      var posBadge = document.createElement('div');
      posBadge.className = 'absolute top-2 left-2 px-2 py-0.5 rounded text-[11px] font-bold bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900';
      posBadge.textContent = '#' + (pos + 1);

      var previewBox = document.createElement('div');
      previewBox.className = 'w-full h-32 flex items-center justify-center bg-slate-100 dark:bg-slate-900/60 rounded-lg text-3xl font-mono';
      previewBox.textContent = '📄 ' + (originalPageIdx + 1);

      var origLabel = document.createElement('div');
      origLabel.className = 'mt-2 text-xs font-semibold text-slate-700 dark:text-slate-300';
      origLabel.textContent = 'Original Page ' + (originalPageIdx + 1);

      // Reorder buttons container
      var actions = document.createElement('div');
      actions.className = 'mt-2 flex items-center gap-1.5';

      var moveLeftBtn = document.createElement('button');
      moveLeftBtn.type = 'button';
      moveLeftBtn.className = 'px-2 py-0.5 text-xs font-bold rounded bg-slate-100 dark:bg-slate-700 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/60 transition disabled:opacity-30';
      moveLeftBtn.textContent = '←';
      moveLeftBtn.title = 'Move Left';
      moveLeftBtn.disabled = (pos === 0);
      (function (currentPos) {
        moveLeftBtn.addEventListener('click', function () {
          movePage(currentPos, -1);
        });
      })(pos);

      var moveRightBtn = document.createElement('button');
      moveRightBtn.type = 'button';
      moveRightBtn.className = 'px-2 py-0.5 text-xs font-bold rounded bg-slate-100 dark:bg-slate-700 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/60 transition disabled:opacity-30';
      moveRightBtn.textContent = '→';
      moveRightBtn.title = 'Move Right';
      moveRightBtn.disabled = (pos === pageSequence.length - 1);
      (function (currentPos) {
        moveRightBtn.addEventListener('click', function () {
          movePage(currentPos, 1);
        });
      })(pos);

      actions.appendChild(moveLeftBtn);
      actions.appendChild(moveRightBtn);

      card.appendChild(posBadge);
      card.appendChild(previewBox);
      card.appendChild(origLabel);
      card.appendChild(actions);

      pagesGrid.appendChild(card);
    }
  }

  function movePage(pos, offset) {
    var targetPos = pos + offset;
    if (targetPos < 0 || targetPos >= pageSequence.length) return;
    var temp = pageSequence[pos];
    pageSequence[pos] = pageSequence[targetPos];
    pageSequence[targetPos] = temp;
    renderGrid();
  }

  function reverseOrder() {
    pageSequence.reverse();
    renderGrid();
  }

  function resetOrder() {
    pageSequence = [];
    for (var i = 0; i < totalPages; i++) {
      pageSequence.push(i);
    }
    renderGrid();
  }

  if (reverseBtn) reverseBtn.addEventListener('click', reverseOrder);
  if (resetOrderBtn) resetOrderBtn.addEventListener('click', resetOrder);

  async function loadPdfStructure(pdfBytes) {
    try {
      if (typeof window.PDFLib === 'undefined') {
        throw new Error('PDF library is loading. Please try again.');
      }

      var PDFDocument = window.PDFLib.PDFDocument;
      pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
      totalPages = pdfDoc.getPageCount();

      if (pageCountEl) pageCountEl.textContent = totalPages + (totalPages === 1 ? ' page' : ' pages');

      pageSequence = [];
      for (var i = 0; i < totalPages; i++) {
        pageSequence.push(i);
      }
      renderGrid();
    } catch (err) {
      console.error(err);
      showError('Could not load PDF document: ' + err.message);
    }
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
      await loadPdfStructure(fileArrayBuffer);
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

  if (reorderBtn) {
    reorderBtn.addEventListener('click', async function () {
      if (isProcessing) return;
      clearError();

      if (!fileArrayBuffer || !uploadedFile) {
        showError('Please upload a PDF file first.');
        return;
      }

      try {
        isProcessing = true;
        reorderBtn.disabled = true;
        setStatus('📑', 'Reordering PDF Pages...', 'Applying new page sequence.');
        showProgress();
        updateProgress(30);

        var PDFDocument = window.PDFLib.PDFDocument;
        var loadedDoc = await PDFDocument.load(fileArrayBuffer, { ignoreEncryption: true });
        var freshDoc = await PDFDocument.create();

        updateProgress(60);
        var copiedPages = await freshDoc.copyPages(loadedDoc, pageSequence);
        copiedPages.forEach(function (p) {
          freshDoc.addPage(p);
        });

        freshDoc.setTitle(loadedDoc.getTitle() || 'Reordered PDF');
        var reorderedBytes = await freshDoc.save();
        updateProgress(100);

        var reorderedBlob = new Blob([reorderedBytes], { type: 'application/pdf' });

        hideStatus();
        if (optionsSection) optionsSection.classList.add('hidden');
        if (downloadSection) downloadSection.classList.remove('hidden');

        var outName = uploadedFile.name.replace(/\.pdf$/i, '') + '-reordered.pdf';
        if (downloadFilename) downloadFilename.textContent = outName;
        if (downloadSize) downloadSize.textContent = formatBytes(reorderedBlob.size);

        if (downloadBtn) {
          var oldUrl = downloadBtn.getAttribute('data-url');
          if (oldUrl) URL.revokeObjectURL(oldUrl);

          var url = URL.createObjectURL(reorderedBlob);
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
        showError(err.message || 'An error occurred while reordering PDF pages.');
      } finally {
        isProcessing = false;
        if (reorderBtn) reorderBtn.disabled = false;
      }
    });
  }
})();
