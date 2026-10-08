/**
 * Unlock PDF Tool — 100% Client-Side
 * Removes password protection and security restrictions from PDF documents directly in the browser.
 */
(function () {
  'use strict';

  var uploadedFile = null;
  var fileArrayBuffer = null;
  var isProcessing = false;

  // DOM Elements
  var dropZone = document.getElementById('up-drop-zone');
  var fileInput = document.getElementById('up-file-input');
  var selectBtn = document.getElementById('up-select-btn');
  var optionsSection = document.getElementById('up-options-section');
  var filenameEl = document.getElementById('up-filename');
  var fileSizeEl = document.getElementById('up-file-size');
  var clearBtn = document.getElementById('up-clear-btn');
  var unlockBtn = document.getElementById('up-unlock-btn');

  var passwordInput = document.getElementById('up-password');
  var togglePasswordBtn = document.getElementById('up-toggle-password');

  var statusSection = document.getElementById('up-status-section');
  var statusIcon = document.getElementById('up-status-icon');
  var statusTitle = document.getElementById('up-status-title');
  var statusBody = document.getElementById('up-status-body');
  var progressBar = document.getElementById('up-progress-bar');
  var progressFill = document.getElementById('up-progress-fill');

  var downloadSection = document.getElementById('up-download-section');
  var downloadBtn = document.getElementById('up-download-btn');
  var downloadFilename = document.getElementById('up-download-filename');
  var downloadSize = document.getElementById('up-download-size');
  var startOverBtn = document.getElementById('up-start-over-btn');

  var errorBox = document.getElementById('up-error-box');
  var errorText = document.getElementById('up-error-text');

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
    if (passwordInput) passwordInput.value = '';
    clearError();
    hideStatus();
    hideDownload();
    if (optionsSection) optionsSection.classList.add('hidden');
    if (dropZone) dropZone.classList.remove('hidden');
  }

  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', function () {
      var type = passwordInput.type === 'password' ? 'text' : 'password';
      passwordInput.type = type;
      togglePasswordBtn.textContent = type === 'password' ? '👁️ Show' : '🙈 Hide';
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

  async function unlockPdf(pdfBytes, password) {
    if (typeof window.PDFLib === 'undefined') {
      throw new Error('PDF library is loading. Please check your internet connection and try again.');
    }

    var PDFDocument = window.PDFLib.PDFDocument;
    var loadedDoc = null;

    try {
      // Try loading with ignoreEncryption or user password
      loadedDoc = await PDFDocument.load(pdfBytes, {
        ignoreEncryption: true,
        password: password || undefined
      });
    } catch (err) {
      throw new Error('Incorrect password or unsupported encryption format. Please check your password and try again.');
    }

    // Create a fresh, fully unencrypted PDF document and copy all pages
    var freshDoc = await PDFDocument.create();
    var pageCount = loadedDoc.getPageCount();
    var pageIndices = [];
    for (var i = 0; i < pageCount; i++) {
      pageIndices.push(i);
    }

    var copiedPages = await freshDoc.copyPages(loadedDoc, pageIndices);
    copiedPages.forEach(function (page) {
      freshDoc.addPage(page);
    });

    freshDoc.setTitle(loadedDoc.getTitle() || 'Unlocked PDF');
    var unlockedBytes = await freshDoc.save();
    return new Blob([unlockedBytes], { type: 'application/pdf' });
  }

  if (unlockBtn) {
    unlockBtn.addEventListener('click', async function () {
      if (isProcessing) return;
      clearError();

      if (!fileArrayBuffer || !uploadedFile) {
        showError('Please upload a PDF file first.');
        return;
      }

      var password = (passwordInput ? passwordInput.value : '').trim();

      try {
        isProcessing = true;
        unlockBtn.disabled = true;
        setStatus('🔓', 'Unlocking PDF...', 'Decryption in progress. Removing password restrictions.');
        showProgress();
        updateProgress(35);

        await new Promise(function (resolve) { setTimeout(resolve, 300); });
        updateProgress(75);

        var unlockedBlob = await unlockPdf(fileArrayBuffer, password);
        updateProgress(100);

        hideStatus();
        if (optionsSection) optionsSection.classList.add('hidden');
        if (downloadSection) downloadSection.classList.remove('hidden');

        var outName = uploadedFile.name.replace(/\.pdf$/i, '') + '-unlocked.pdf';
        if (downloadFilename) downloadFilename.textContent = outName;
        if (downloadSize) downloadSize.textContent = formatBytes(unlockedBlob.size);

        if (downloadBtn) {
          var oldUrl = downloadBtn.getAttribute('data-url');
          if (oldUrl) URL.revokeObjectURL(oldUrl);

          var url = URL.createObjectURL(unlockedBlob);
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
        showError(err.message || 'Could not unlock this PDF document. Please verify the password and try again.');
      } finally {
        isProcessing = false;
        if (unlockBtn) unlockBtn.disabled = false;
      }
    });
  }
})();
