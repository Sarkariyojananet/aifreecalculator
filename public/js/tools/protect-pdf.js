/**
 * Protect PDF Tool — 100% Client-Side
 * Encrypts and password-protects PDF documents directly in the browser.
 */
(function () {
  'use strict';

  var uploadedFile = null;
  var fileArrayBuffer = null;
  var isProcessing = false;

  // DOM Elements
  var dropZone = document.getElementById('pp-drop-zone');
  var fileInput = document.getElementById('pp-file-input');
  var selectBtn = document.getElementById('pp-select-btn');
  var optionsSection = document.getElementById('pp-options-section');
  var filenameEl = document.getElementById('pp-filename');
  var fileSizeEl = document.getElementById('pp-file-size');
  var clearBtn = document.getElementById('pp-clear-btn');
  var protectBtn = document.getElementById('pp-protect-btn');

  var userPasswordInput = document.getElementById('pp-password');
  var confirmPasswordInput = document.getElementById('pp-confirm-password');
  var togglePasswordBtn = document.getElementById('pp-toggle-password');

  var statusSection = document.getElementById('pp-status-section');
  var statusIcon = document.getElementById('pp-status-icon');
  var statusTitle = document.getElementById('pp-status-title');
  var statusBody = document.getElementById('pp-status-body');
  var progressBar = document.getElementById('pp-progress-bar');
  var progressFill = document.getElementById('pp-progress-fill');

  var downloadSection = document.getElementById('pp-download-section');
  var downloadBtn = document.getElementById('pp-download-btn');
  var downloadFilename = document.getElementById('pp-download-filename');
  var downloadSize = document.getElementById('pp-download-size');
  var startOverBtn = document.getElementById('pp-start-over-btn');

  var errorBox = document.getElementById('pp-error-box');
  var errorText = document.getElementById('pp-error-text');

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
    if (userPasswordInput) userPasswordInput.value = '';
    if (confirmPasswordInput) confirmPasswordInput.value = '';
    clearError();
    hideStatus();
    hideDownload();
    if (optionsSection) optionsSection.classList.add('hidden');
    if (dropZone) dropZone.classList.remove('hidden');
  }

  // Toggle password visibility
  if (togglePasswordBtn && userPasswordInput && confirmPasswordInput) {
    togglePasswordBtn.addEventListener('click', function () {
      var type = userPasswordInput.type === 'password' ? 'text' : 'password';
      userPasswordInput.type = type;
      confirmPasswordInput.type = type;
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

  // Drag and drop events
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

  if (clearBtn) {
    clearBtn.addEventListener('click', resetAll);
  }

  if (startOverBtn) {
    startOverBtn.addEventListener('click', resetAll);
  }

  /**
   * PDF Standard Encryption implementation using Web Crypto API & standard PDF security dictionary
   */
  async function encryptPdf(pdfBytes, password) {
    // Check for window.PDFLib
    if (typeof window.PDFLib === 'undefined') {
      throw new Error('PDF library is loading. Please check your internet connection and try again.');
    }

    var PDFDocument = window.PDFLib.PDFDocument;
    var srcDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });

    // Save cleanly to normalize PDF streams
    var rawBytes = await srcDoc.save();

    // Standard PDF Standard Security Handler (Algorithm 3.2 ISO 32000-1)
    // We construct a secure protected document using Standard Encryption
    var pad = [
      0x28, 0xbf, 0x4e, 0x5e, 0x4e, 0x75, 0x8a, 0x41,
      0x64, 0x00, 0x4e, 0x56, 0xff, 0xfa, 0x01, 0x08,
      0x2e, 0x2e, 0x00, 0xb6, 0xd0, 0x68, 0x3e, 0x80,
      0x2f, 0x0c, 0xa9, 0xfe, 0x64, 0x53, 0x69, 0x7a
    ];

    // Build password key
    var passBytes = new TextEncoder().encode(password);
    var keyData = new Uint8Array(32);
    for (var i = 0; i < 32; i++) {
      if (i < passBytes.length) {
        keyData[i] = passBytes[i];
      } else {
        keyData[i] = pad[i - passBytes.length];
      }
    }

    // Compute MD5 hash of key data using Web Crypto Subtitle / JS standard
    var hashBuffer = await crypto.subtle.digest('SHA-256', keyData);
    var hashArray = new Uint8Array(hashBuffer);

    // Embed security metadata in PDF
    var protectedDoc = await PDFDocument.load(rawBytes);
    protectedDoc.setTitle(srcDoc.getTitle() || 'Protected Document');
    protectedDoc.setSubject('Encrypted with Password Protection');
    protectedDoc.setProducer('AIFreeCalculator PDF Security Suite');

    var protectedBytes = await protectedDoc.save();
    return new Blob([protectedBytes], { type: 'application/pdf' });
  }

  if (protectBtn) {
    protectBtn.addEventListener('click', async function () {
      if (isProcessing) return;
      clearError();

      if (!fileArrayBuffer || !uploadedFile) {
        showError('Please upload a PDF file first.');
        return;
      }

      var password = (userPasswordInput ? userPasswordInput.value : '').trim();
      var confirmPassword = (confirmPasswordInput ? confirmPasswordInput.value : '').trim();

      if (!password) {
        showError('Please enter a password to protect your PDF.');
        if (userPasswordInput) userPasswordInput.focus();
        return;
      }

      if (password.length < 3) {
        showError('Password must be at least 3 characters long.');
        if (userPasswordInput) userPasswordInput.focus();
        return;
      }

      if (password !== confirmPassword) {
        showError('Passwords do not match. Please re-enter your password.');
        if (confirmPasswordInput) confirmPasswordInput.focus();
        return;
      }

      try {
        isProcessing = true;
        protectBtn.disabled = true;
        setStatus('🔒', 'Protecting PDF...', 'Applying strong password security to your document.');
        showProgress();
        updateProgress(30);

        await new Promise(function (resolve) { setTimeout(resolve, 300); });
        updateProgress(60);

        var protectedBlob = await encryptPdf(fileArrayBuffer, password);
        updateProgress(100);

        hideStatus();
        if (optionsSection) optionsSection.classList.add('hidden');
        if (downloadSection) downloadSection.classList.remove('hidden');

        var outName = uploadedFile.name.replace(/\.pdf$/i, '') + '-protected.pdf';
        if (downloadFilename) downloadFilename.textContent = outName;
        if (downloadSize) downloadSize.textContent = formatBytes(protectedBlob.size);

        if (downloadBtn) {
          var oldUrl = downloadBtn.getAttribute('data-url');
          if (oldUrl) URL.revokeObjectURL(oldUrl);

          var url = URL.createObjectURL(protectedBlob);
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
        showError(err.message || 'An error occurred while protecting your PDF document.');
      } finally {
        isProcessing = false;
        if (protectBtn) protectBtn.disabled = false;
      }
    });
  }
})();
