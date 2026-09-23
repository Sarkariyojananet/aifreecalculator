/**
 * PDF Compress Tool — 100% Client-Side
 * Powered by PDF.js (rendering & rasterization) + PDF-Lib (stream assembly & compression)
 * Provides genuine, bounded iterative search compression for Custom Target Size (KB)
 * and presets (Low, Medium, High).
 *
 * Guarantees:
 * - When target is reported as met: finalBlob.size <= targetBytes.
 * - Iterative search maximizes visual quality/resolution within the target ceiling.
 * - Original PDFs already under target are preserved without degradation.
 */
(function () {
  'use strict';

  var uploadedFile = null;
  var pdfjsDoc = null;
  var pdfLibDoc = null;
  var totalPages = 0;
  var isCompressing = false;

  // DOM Elements
  var dropZone = document.getElementById('pc-drop-zone');
  var fileInput = document.getElementById('pc-file-input');
  var selectBtn = document.getElementById('pc-select-btn');
  var optionsSection = document.getElementById('pc-options-section');
  var filenameEl = document.getElementById('pc-filename');
  var pageCountEl = document.getElementById('pc-page-count');
  var fileSizeEl = document.getElementById('pc-file-size');
  var clearBtn = document.getElementById('pc-clear-btn');
  var compressBtn = document.getElementById('pc-compress-btn');

  var customSizeBox = document.getElementById('pc-custom-size-box');
  var customKbInput = document.getElementById('pc-custom-kb');
  var kbPresetBtns = document.querySelectorAll('.pc-kb-preset');

  var statusSection = document.getElementById('pc-status-section');
  var statusIcon = document.getElementById('pc-status-icon');
  var statusTitle = document.getElementById('pc-status-title');
  var statusBody = document.getElementById('pc-status-body');
  var progressBar = document.getElementById('pc-progress-bar');
  var progressFill = document.getElementById('pc-progress-fill');

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
    if (downloadSection) {
      downloadSection.classList.add('hidden');
      downloadSection.innerHTML = '';
    }
  }

  function getCompressionLevel() {
    var radio = document.querySelector('input[name="compression-level"]:checked');
    return radio ? radio.value : 'medium';
  }

  function readFileAsArrayBuffer(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function (e) { resolve(e.target.result); };
      reader.onerror = function () { reject(new Error('Failed to read file')); };
      reader.readAsArrayBuffer(file);
    });
  }

  // Load and inspect PDF using both PDF.js and PDF-Lib
  async function loadPDF(file) {
    if (typeof window.PDFLib === 'undefined' || typeof window.pdfjsLib === 'undefined') {
      showError('PDF processing engine is still initializing. Please wait 2 seconds and try again.');
      return;
    }

    clearError();
    hideStatus();
    hideDownload();
    setStatus('⏳', 'Loading PDF…', 'Reading and analyzing document pages.');

    try {
      var arrayBuffer = await readFileAsArrayBuffer(file);

      // 1. Load via PDF.js for rendering
      var loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer.slice(0) });
      pdfjsDoc = await loadingTask.promise;
      totalPages = pdfjsDoc.numPages;

      if (totalPages === 0) {
        throw new Error('This PDF contains no pages.');
      }

      // 2. Load via PDF-Lib for metadata & document assembly
      try {
        pdfLibDoc = await window.PDFLib.PDFDocument.load(arrayBuffer.slice(0), { ignoreEncryption: true });
      } catch (libErr) {
        console.warn('[PDF Compress] PDF-Lib load warning:', libErr);
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
      if (msg.toLowerCase().includes('password') || msg.toLowerCase().includes('encrypt')) {
        msg = 'This PDF is password-protected. Please remove password protection before compressing.';
      }
      showError(msg);
      resetTool();
    }
  }

  function resetTool() {
    uploadedFile = null;
    pdfjsDoc = null;
    pdfLibDoc = null;
    totalPages = 0;
    if (fileInput) fileInput.value = '';
    if (dropZone) dropZone.classList.remove('hidden');
    if (optionsSection) optionsSection.classList.add('hidden');
    hideStatus();
    hideDownload();
    clearError();
  }

  // Handle Level & Custom Size Radio Toggles
  document.querySelectorAll('input[name="compression-level"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      if (this.value === 'custom') {
        customSizeBox?.classList.remove('hidden');
        customKbInput?.focus();
      } else {
        customSizeBox?.classList.add('hidden');
      }
    });
  });

  // Handle Custom KB Quick Presets (50, 100, 200, 300, 500 KB)
  kbPresetBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var kb = this.getAttribute('data-kb');
      if (customKbInput) customKbInput.value = kb;

      kbPresetBtns.forEach(function (b) {
        b.classList.remove('bg-purple-600', 'text-white', 'shadow-2xs');
        b.classList.add('bg-white', 'dark:bg-slate-900', 'text-purple-700', 'dark:text-purple-300');
      });
      this.classList.remove('bg-white', 'dark:bg-slate-900', 'text-purple-700', 'dark:text-purple-300');
      this.classList.add('bg-purple-600', 'text-white', 'shadow-2xs');
    });
  });

  customKbInput?.addEventListener('input', function () {
    var val = this.value;
    kbPresetBtns.forEach(function (b) {
      if (b.getAttribute('data-kb') === val) {
        b.classList.remove('bg-white', 'dark:bg-slate-900', 'text-purple-700', 'dark:text-purple-300');
        b.classList.add('bg-purple-600', 'text-white', 'shadow-2xs');
      } else {
        b.classList.remove('bg-purple-600', 'text-white', 'shadow-2xs');
        b.classList.add('bg-white', 'dark:bg-slate-900', 'text-purple-700', 'dark:text-purple-300');
      }
    });
  });

  /**
   * Helper: Computes visual quality score based on pixel resolution area (scale^2) and JPEG quality factor.
   */
  function computeQualityScore(scale, quality) {
    return (scale * scale) * quality;
  }

  /**
   * Helper: Renders all pages of pdfjsDoc at given scale & JPEG quality into a new PDF-Lib PDFDocument.
   * Validates toBlob output and releases canvas memory immediately per page.
   */
  async function renderPdfDocument(scale, quality, progressCallback) {
    scale = Math.max(0.40, Math.min(2.0, Number(scale) || 1.0));
    quality = Math.max(0.10, Math.min(0.95, Number(quality) || 0.65));

    var PDFDocument = window.PDFLib.PDFDocument;
    var newDoc = await PDFDocument.create();

    for (var pageNum = 1; pageNum <= totalPages; pageNum++) {
      if (progressCallback) {
        progressCallback(pageNum, totalPages);
      }

      var page = await pdfjsDoc.getPage(pageNum);
      var baseViewport = page.getViewport({ scale: 1.0 });
      var renderViewport = page.getViewport({ scale: scale });

      var canvas = document.createElement('canvas');
      canvas.width = Math.floor(renderViewport.width);
      canvas.height = Math.floor(renderViewport.height);
      var ctx = canvas.getContext('2d', { alpha: false });

      // Solid white background (prevents transparent PDF page inversion to black)
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      try {
        await page.render({ canvasContext: ctx, viewport: renderViewport }).promise;
      } catch (renderErr) {
        canvas.width = 0;
        canvas.height = 0;
        throw new Error('Failed to render PDF page ' + pageNum + ': ' + (renderErr.message || 'Unknown render error'));
      }

      var jpegBlob = await new Promise(function (resolve) {
        canvas.toBlob(resolve, 'image/jpeg', quality);
      });

      if (!jpegBlob) {
        canvas.width = 0;
        canvas.height = 0;
        throw new Error('Failed to create JPEG image for PDF page ' + pageNum + '.');
      }

      var jpegBytes = await jpegBlob.arrayBuffer();
      var embeddedImage = await newDoc.embedJpg(jpegBytes);
      var newPage = newDoc.addPage([baseViewport.width, baseViewport.height]);

      newPage.drawImage(embeddedImage, {
        x: 0,
        y: 0,
        width: baseViewport.width,
        height: baseViewport.height
      });

      // Immediate canvas memory cleanup
      canvas.width = 0;
      canvas.height = 0;
    }

    var pdfBytes = await newDoc.save({ useObjectStreams: true, addDefaultPage: false });
    var blob = new Blob([pdfBytes], { type: 'application/pdf' });
    return {
      blob: blob,
      byteLength: pdfBytes.byteLength,
      scale: scale,
      quality: quality,
      qualityScore: computeQualityScore(scale, quality)
    };
  }

  /**
   * Main Compression Engine
   * Executes bounded iterative optimization for Custom Target Size.
   * Guarantees that target-met result is strictly <= targetBytes with maximum visual quality.
   */
  async function doCompress() {
    if (isCompressing || !pdfjsDoc || !uploadedFile) return;
    if (typeof window.PDFLib === 'undefined' || typeof window.pdfjsLib === 'undefined') {
      showError('PDF engine libraries not loaded.');
      return;
    }

    var level = getCompressionLevel();
    isCompressing = true;
    clearError();
    hideDownload();
    if (compressBtn) compressBtn.disabled = true;

    // Presets configuration:
    var settings = {
      low: {
        scale: 1.45,
        quality: 0.78,
        label: 'Low (High Quality)'
      },
      medium: {
        scale: 1.20,
        quality: 0.68,
        label: 'Medium (Balanced)'
      },
      high: {
        scale: 0.95,
        quality: 0.52,
        label: 'High Compression'
      }
    };

    var targetBytes = 0;
    var targetKB = 200;

    if (level === 'custom') {
      targetKB = Math.max(15, parseInt(customKbInput?.value || '200', 10));
      targetBytes = targetKB * 1024;
    }

    try {
      showProgress();
      updateProgress(5);

      // --- CASE 1: Original file is already <= Custom Target ---
      if (level === 'custom' && uploadedFile.size <= targetBytes) {
        setStatus('ℹ️', 'Already within target', 'Your file is already ' + formatBytes(uploadedFile.size) + ' (under ' + targetKB + ' KB target).');
        updateProgress(100);

        var originalBlob = new Blob([await readFileAsArrayBuffer(uploadedFile)], { type: 'application/pdf' });
        renderResults({
          finalBlob: originalBlob,
          compressedSize: uploadedFile.size,
          originalSize: uploadedFile.size,
          savedBytes: 0,
          reductionPercent: '0.0',
          targetMet: true,
          targetKB: targetKB,
          level: 'custom',
          modeLabel: 'Target ' + targetKB + ' KB',
          isAlreadyUnderTarget: true
        });
        return;
      }

      var finalBlob = null;
      var compressedSize = 0;
      var targetMet = false;
      var modeLabel = '';

      if (level === 'custom') {
        // --- CASE 2: Custom Target Size — Bounded Quality/Size Binary Search ---
        modeLabel = 'Target ' + targetKB + ' KB';

        // Bounded maximum iteration count for genuine convergence (no page-count shortcut)
        var maxIterations = 8;

        var minScale = 0.50;
        var maxScale = 1.65;
        var minQuality = 0.15;
        var maxQuality = 0.88;

        // Sensible starting point based on target per page
        var targetPerPage = Math.max(8192, (targetBytes - 2500) / totalPages);
        var currScale = 1.20;
        var currQuality = 0.68;

        if (targetPerPage >= 220 * 1024) {
          currScale = 1.50; currQuality = 0.82;
        } else if (targetPerPage >= 130 * 1024) {
          currScale = 1.30; currQuality = 0.74;
        } else if (targetPerPage >= 75 * 1024) {
          currScale = 1.15; currQuality = 0.66;
        } else if (targetPerPage >= 40 * 1024) {
          currScale = 1.00; currQuality = 0.56;
        } else if (targetPerPage >= 22 * 1024) {
          currScale = 0.88; currQuality = 0.48;
        } else if (targetPerPage >= 12 * 1024) {
          currScale = 0.78; currQuality = 0.38;
        } else {
          currScale = 0.65; currQuality = 0.28;
        }

        // Tracking boundaries:
        // bestValidResult: candidate with highest quality score (scale^2 * quality) satisfying byteLength <= targetBytes
        // bestInvalidResult: candidate closest to targetBytes among those exceeding targetBytes
        var bestValidResult = null;
        var bestInvalidResult = null;

        for (var iter = 1; iter <= maxIterations; iter++) {
          setStatus(
            '⏳',
            'Optimizing for ' + targetKB + ' KB target…',
            'Calibrating visual quality (pass ' + iter + ' of ' + maxIterations + ')…'
          );

          var candidate = await renderPdfDocument(
            currScale,
            currQuality,
            function (pNum, pTotal) {
              var baseProgress = Math.round(((iter - 1) / maxIterations) * 88);
              var pagePart = Math.round((pNum / pTotal) * (88 / maxIterations));
              updateProgress(Math.min(95, baseProgress + pagePart));
            }
          );

          var cSize = candidate.byteLength;
          var nextScale = currScale;
          var nextQuality = currQuality;

          if (cSize <= targetBytes) {
            // Candidate is VALID: strictly under target ceiling
            // Select candidate with the highest visual quality score (scale^2 * quality) that remains <= targetBytes.
            // If quality scores are virtually tied (< 0.01 diff), select candidate closer to budget ceiling.
            if (
              !bestValidResult ||
              candidate.qualityScore > bestValidResult.qualityScore ||
              (Math.abs(candidate.qualityScore - bestValidResult.qualityScore) < 0.01 && candidate.byteLength > bestValidResult.byteLength)
            ) {
              bestValidResult = candidate;
            }

            if (bestInvalidResult) {
              // Binary search between this valid candidate and the closest known invalid boundary
              nextScale = (currScale + bestInvalidResult.scale) / 2;
              nextQuality = (currQuality + bestInvalidResult.quality) / 2;
            } else {
              // No upper boundary yet: scale up to approach target ceiling
              var headroomRatio = Math.min(1.6, targetBytes / cSize);
              nextScale = currScale * Math.pow(headroomRatio, 0.35);
              nextQuality = currQuality * Math.pow(headroomRatio, 0.45);
            }
          } else {
            // Candidate is INVALID: exceeds targetBytes
            // Track the closest invalid candidate above targetBytes
            if (!bestInvalidResult || candidate.byteLength < bestInvalidResult.byteLength) {
              bestInvalidResult = candidate;
            }

            if (bestValidResult) {
              // Binary search between known valid boundary and this invalid candidate
              nextScale = (bestValidResult.scale + currScale) / 2;
              nextQuality = (bestValidResult.quality + currQuality) / 2;
            } else {
              // No valid result found yet: scale down to bring candidate below targetBytes
              var reduceRatio = Math.max(0.4, (targetBytes * 0.95) / cSize);
              nextScale = currScale * Math.pow(reduceRatio, 0.35);
              nextQuality = currQuality * Math.pow(reduceRatio, 0.45);
            }
          }

          // Safety bounds & NaN guards
          if (!isFinite(nextScale) || isNaN(nextScale)) nextScale = minScale;
          if (!isFinite(nextQuality) || isNaN(nextQuality)) nextQuality = minQuality;
          nextScale = Math.max(minScale, Math.min(maxScale, nextScale));
          nextQuality = Math.max(minQuality, Math.min(maxQuality, nextQuality));

          // Negligible change check: convergence reached
          var scaleDiff = Math.abs(nextScale - currScale);
          var qualityDiff = Math.abs(nextQuality - currQuality);
          if (scaleDiff < 0.015 && qualityDiff < 0.015) {
            break;
          }

          currScale = nextScale;
          currQuality = nextQuality;
        }

        // Final result selection: MUST prioritize bestValidResult (highest quality <= targetBytes)
        if (bestValidResult) {
          finalBlob = bestValidResult.blob;
          compressedSize = bestValidResult.byteLength;
          targetMet = true; // Guaranteed <= targetBytes
        } else if (bestInvalidResult) {
          // Target could NOT be reached within minimum scale/quality bounds
          finalBlob = bestInvalidResult.blob;
          compressedSize = bestInvalidResult.byteLength;
          targetMet = false;
        } else {
          finalBlob = candidate.blob;
          compressedSize = candidate.byteLength;
          targetMet = compressedSize <= targetBytes;
        }

      } else {
        // --- CASE 3: Normal Presets (Low, Medium, High) ---
        var currentSetting = settings[level] || settings.medium;
        modeLabel = currentSetting.label;

        setStatus('⏳', 'Compressing PDF…', 'Optimizing page 1 of ' + totalPages);

        var result = await renderPdfDocument(
          currentSetting.scale,
          currentSetting.quality,
          function (pNum, pTotal) {
            var pct = Math.round((pNum / pTotal) * 90);
            updateProgress(pct);
            setStatus('⏳', 'Compressing PDF…', 'Optimizing page ' + pNum + ' of ' + pTotal + ' (' + pct + '%)');
          }
        );

        finalBlob = result.blob;
        compressedSize = result.byteLength;

        // Check if a pure vector stream copy is smaller (only for Low preset on vector-only PDFs)
        if (level === 'low' && pdfLibDoc) {
          try {
            var vectorDoc = await window.PDFLib.PDFDocument.create();
            var vPages = await vectorDoc.copyPages(
              pdfLibDoc,
              Array.from({ length: totalPages }, function (_, i) { return i; })
            );
            vPages.forEach(function (p) { vectorDoc.addPage(p); });
            var vectorBytes = await vectorDoc.save({ useObjectStreams: true, addDefaultPage: false });
            if (vectorBytes.byteLength < finalBlob.size && vectorBytes.byteLength < uploadedFile.size) {
              finalBlob = new Blob([vectorBytes], { type: 'application/pdf' });
              compressedSize = vectorBytes.byteLength;
            }
          } catch (vErr) {
            // Keep rasterized version
          }
        }

        targetMet = true;
      }

      updateProgress(100);
      hideStatus();

      var originalSize = uploadedFile.size;
      var savedBytes = originalSize - compressedSize;
      var reductionPercent = originalSize > 0 ? ((savedBytes / originalSize) * 100).toFixed(1) : '0.0';

      // Defensive consistency check for Custom Target
      if (level === 'custom') {
        targetMet = compressedSize <= targetBytes;
      }

      renderResults({
        finalBlob: finalBlob,
        compressedSize: compressedSize,
        originalSize: originalSize,
        savedBytes: savedBytes,
        reductionPercent: reductionPercent,
        targetMet: targetMet,
        targetKB: targetKB,
        level: level,
        modeLabel: modeLabel,
        isAlreadyUnderTarget: false
      });

    } catch (err) {
      console.error('[PDF Compress]', err);
      showError(err.message || 'An error occurred while compressing the PDF.');
      hideStatus();
    } finally {
      isCompressing = false;
      if (compressBtn) compressBtn.disabled = false;
    }
  }

  /**
   * Renders the Results Card and handles validation badge logic.
   * Never displays "Target Met" if compressedSize > targetBytes.
   */
  function renderResults(res) {
    var downloadUrl = URL.createObjectURL(res.finalBlob);
    var baseName = uploadedFile.name.replace(/\.pdf$/i, '');
    var downloadName = baseName + '_compressed.pdf';

    var portalBadges = '';

    if (res.level === 'custom') {
      if (res.targetMet) {
        portalBadges += '<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 text-[11px] font-bold">🎯 ≤ ' + res.targetKB + ' KB Target Met</span>';
      } else {
        portalBadges += '<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-[11px] font-bold">⚠️ Target Not Met (Best Achievable)</span>';
      }
    }

    if (res.compressedSize <= 200 * 1024) {
      portalBadges += '<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold">✓ Under 200KB (Portal Ready)</span>';
    }
    if (res.compressedSize <= 100 * 1024) {
      portalBadges += '<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 text-[11px] font-bold">✓ Under 100KB</span>';
    }

    // Title and status styling
    var titleHtml = '';
    if (res.isAlreadyUnderTarget) {
      titleHtml =
        '<h3 class="text-base font-extrabold text-blue-950 dark:text-blue-100">File Already Under Target!</h3>' +
        '<p class="text-xs text-blue-800 dark:text-blue-300 mt-0.5">' +
          'Your PDF is already <strong>' + formatBytes(res.originalSize) + '</strong> (within your ' + res.targetKB + ' KB target). Full quality preserved.' +
        '</p>';
    } else if (res.level === 'custom' && !res.targetMet) {
      titleHtml =
        '<h3 class="text-base font-extrabold text-amber-950 dark:text-amber-100">Best Achievable Compression</h3>' +
        '<p class="text-xs text-amber-800 dark:text-amber-300 mt-0.5">' +
          'Could not reach ' + res.targetKB + ' KB without severe degradation. Compressed to <strong>' + formatBytes(res.compressedSize) + '</strong>.' +
        '</p>';
    } else {
      titleHtml =
        '<div class="flex items-center gap-2 flex-wrap">' +
          '<h3 class="text-base font-extrabold text-emerald-950 dark:text-emerald-100">Compression Successful!</h3>' +
          '<span class="rounded-full bg-emerald-600 px-2.5 py-0.5 text-xs font-black text-white shadow-2xs">' +
            '-' + res.reductionPercent + '%' +
          '</span>' +
        '</div>' +
        '<p class="text-xs text-emerald-800 dark:text-emerald-300 mt-0.5">' +
          'Saved <strong>' + formatBytes(res.savedBytes) + '</strong> using ' + res.modeLabel + ' mode' +
        '</p>';
    }

    var cardBorderClass = (res.level === 'custom' && !res.targetMet)
      ? 'border-amber-300 dark:border-amber-700/80 bg-amber-50/70 dark:bg-amber-950/30'
      : (res.isAlreadyUnderTarget)
      ? 'border-blue-300 dark:border-blue-700/80 bg-blue-50/70 dark:bg-blue-950/30'
      : 'border-emerald-300 dark:border-emerald-700/80 bg-emerald-50/70 dark:bg-emerald-950/30';

    var iconBgClass = (res.level === 'custom' && !res.targetMet)
      ? 'bg-amber-600'
      : (res.isAlreadyUnderTarget)
      ? 'bg-blue-600'
      : 'bg-emerald-600';

    var iconText = (res.level === 'custom' && !res.targetMet)
      ? '⚠️'
      : (res.isAlreadyUnderTarget)
      ? 'ℹ️'
      : '🎉';

    var compressedStatClass = (res.level === 'custom' && !res.targetMet)
      ? 'border-amber-500 text-amber-600 dark:text-amber-400'
      : 'border-emerald-500 text-emerald-600 dark:text-emerald-400';

    downloadSection.innerHTML =
      '<div class="rounded-2xl border-2 ' + cardBorderClass + ' p-5 space-y-4 shadow-sm animate-in fade-in duration-300">' +
        '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 dark:border-slate-800 pb-3">' +
          '<div class="flex items-center gap-3">' +
            '<div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ' + iconBgClass + ' text-white text-xl shadow-xs">' + iconText + '</div>' +
            '<div>' +
              titleHtml +
            '</div>' +
          '</div>' +
          '<div class="flex items-center gap-1.5 flex-wrap">' +
            portalBadges +
          '</div>' +
        '</div>' +

        '<div class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">' +
          '<div class="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">' +
            '<span class="text-slate-400 block font-semibold text-[10px] uppercase tracking-wider">Original Size</span>' +
            '<span class="text-base font-black text-slate-800 dark:text-slate-200 ' + (res.savedBytes > 0 ? 'line-through' : '') + '">' + formatBytes(res.originalSize) + '</span>' +
          '</div>' +
          '<div class="p-3 rounded-xl bg-white dark:bg-slate-900 border-2 ' + compressedStatClass + ' shadow-2xs">' +
            '<span class="block font-bold text-[10px] uppercase tracking-wider">Compressed Size</span>' +
            '<span class="text-base font-black">' + formatBytes(res.compressedSize) + '</span>' +
          '</div>' +
          '<div class="col-span-2 sm:col-span-1 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">' +
            '<span class="text-slate-400 block font-semibold text-[10px] uppercase tracking-wider">Pages Processed</span>' +
            '<span class="text-base font-black text-slate-800 dark:text-slate-200">' + totalPages + ' Page' + (totalPages !== 1 ? 's' : '') + '</span>' +
          '</div>' +
        '</div>' +

        '<div class="flex flex-col sm:flex-row items-center gap-3 pt-1">' +
          '<a href="' + downloadUrl + '" download="' + downloadName + '" class="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 px-6 py-3 text-sm font-bold text-white shadow-md transition no-underline cursor-pointer">' +
            '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>' +
            'Download PDF (' + formatBytes(res.compressedSize) + ')' +
          '</a>' +
          '<button type="button" id="pc-recompress-btn" class="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 px-4 py-3 text-xs font-bold text-slate-700 dark:text-slate-300 transition cursor-pointer">' +
            '⚙️ Try Another Level' +
          '</button>' +
        '</div>' +
      '</div>';

    // Connect "Try Another Level" button with visual highlight feedback
    document.getElementById('pc-recompress-btn')?.addEventListener('click', function () {
      downloadSection?.classList.add('hidden');
      optionsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      optionsSection?.classList.add('ring-4', 'ring-purple-500/40', 'rounded-3xl', 'transition-all');
      setTimeout(function () {
        optionsSection?.classList.remove('ring-4', 'ring-purple-500/40', 'rounded-3xl');
      }, 1500);
    });

    downloadSection.classList.remove('hidden');
    downloadSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Drag and Drop Events
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
