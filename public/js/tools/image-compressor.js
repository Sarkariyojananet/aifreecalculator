/**
 * Client-Side Image Compressor
 * 100% Browser-Side Execution - Zero Server or Worker Compute
 * High Performance Binary Search for Target File Size (20KB, 50KB, 100KB, 200KB, Custom)
 */

(function () {
  'use strict';

  // DOM Elements
  const dropZone = document.getElementById('ic-drop-zone');
  const fileInput = document.getElementById('ic-file-input');
  const selectFileBtn = document.getElementById('ic-select-file-btn');
  const pastePrompt = document.getElementById('ic-paste-prompt');
  
  // Section Panels
  const uploadSection = document.getElementById('ic-upload-section');
  const workspaceSection = document.getElementById('ic-workspace-section');
  const loadingOverlay = document.getElementById('ic-loading-overlay');
  const loadingText = document.getElementById('ic-loading-text');
  const alertBox = document.getElementById('ic-alert-box');
  const alertText = document.getElementById('ic-alert-text');

  // Controls
  const presetButtons = document.querySelectorAll('.ic-preset-btn');
  const customTargetInput = document.getElementById('ic-custom-kb');
  const applyCustomBtn = document.getElementById('ic-apply-custom-btn');
  const formatSelect = document.getElementById('ic-format-select');
  const modeTargetRadio = document.getElementById('ic-mode-target');
  const modeQualityRadio = document.getElementById('ic-mode-quality');
  const targetControlGroup = document.getElementById('ic-target-controls');
  const qualityControlGroup = document.getElementById('ic-quality-controls');
  const qualitySlider = document.getElementById('ic-quality-slider');
  const qualityValueDisplay = document.getElementById('ic-quality-val');
  const transparencyNotice = document.getElementById('ic-transparency-notice');

  // Stats Displays
  const statOrigSize = document.getElementById('ic-stat-orig-size');
  const statOrigDim = document.getElementById('ic-stat-orig-dim');
  const statCompSize = document.getElementById('ic-stat-comp-size');
  const statCompDim = document.getElementById('ic-stat-comp-dim');
  const statReduction = document.getElementById('ic-stat-reduction');
  const statStatusBadge = document.getElementById('ic-status-badge');
  const statTargetSize = document.getElementById('ic-stat-target-size');

  // Previews & Actions
  const previewOrigImg = document.getElementById('ic-preview-orig');
  const previewCompImg = document.getElementById('ic-preview-comp');
  const previewOrigBadge = document.getElementById('ic-preview-orig-badge');
  const previewCompBadge = document.getElementById('ic-preview-comp-badge');
  const downloadBtn = document.getElementById('ic-download-btn');
  const resetBtn = document.getElementById('ic-reset-btn');
  const recompressBtn = document.getElementById('ic-recompress-btn');

  // State
  let currentFile = null;
  let originalImage = null;
  let originalBlobUrl = null;
  let compressedBlob = null;
  let compressedBlobUrl = null;
  let targetKB = 100;
  let manualQuality = 0.80;
  let compressionMode = 'target'; // 'target' | 'quality'
  let selectedFormat = 'auto'; // 'auto' | 'image/jpeg' | 'image/webp' | 'image/png'
  let hasTransparency = false;
  let isCompressing = false;

  const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50MB safety cap

  // Format bytes helper
  function formatBytes(bytes) {
    if (!bytes || bytes <= 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const val = (bytes / Math.pow(k, i));
    return (val >= 100 || i === 0 ? val.toFixed(0) : val.toFixed(1)) + ' ' + sizes[i];
  }

  // Show error / notice
  function showAlert(message, isWarning = false) {
    if (!alertBox || !alertText) return;
    alertText.textContent = message;
    alertBox.classList.remove('hidden', 'bg-red-50', 'border-red-200', 'text-red-700', 'bg-amber-50', 'border-amber-200', 'text-amber-800');
    if (isWarning) {
      alertBox.classList.add('bg-amber-50', 'border-amber-200', 'text-amber-800', 'dark:bg-amber-950/40', 'dark:border-amber-800', 'dark:text-amber-300');
    } else {
      alertBox.classList.add('bg-red-50', 'border-red-200', 'text-red-700', 'dark:bg-red-950/40', 'dark:border-red-800', 'dark:text-red-300');
    }
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideAlert() {
    if (alertBox) alertBox.classList.add('hidden');
  }

  // Cleanup object URLs to avoid memory leaks
  function cleanupUrls() {
    if (originalBlobUrl) {
      URL.revokeObjectURL(originalBlobUrl);
      originalBlobUrl = null;
    }
    if (compressedBlobUrl) {
      URL.revokeObjectURL(compressedBlobUrl);
      compressedBlobUrl = null;
    }
  }

  // Reset entire tool
  function resetTool() {
    cleanupUrls();
    currentFile = null;
    originalImage = null;
    compressedBlob = null;
    hasTransparency = false;
    isCompressing = false;

    if (fileInput) fileInput.value = '';
    if (previewOrigImg) previewOrigImg.src = '';
    if (previewCompImg) previewCompImg.src = '';
    hideAlert();
    if (transparencyNotice) transparencyNotice.classList.add('hidden');

    if (workspaceSection) workspaceSection.classList.add('hidden');
    if (uploadSection) uploadSection.classList.remove('hidden');
  }

  // Convert canvas to blob promise
  function canvasToBlob(canvas, type, quality) {
    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        type,
        quality
      );
    });
  }

  // Check if image has transparency (alpha channel < 250)
  function checkTransparency(img) {
    try {
      const testCanvas = document.createElement('canvas');
      const testCtx = testCanvas.getContext('2d', { willReadFrequently: true });
      // Sample down to max 200x200 for fast scanning
      const sampleW = Math.min(200, img.naturalWidth);
      const sampleH = Math.min(200, img.naturalHeight);
      testCanvas.width = sampleW;
      testCanvas.height = sampleH;
      testCtx.drawImage(img, 0, 0, sampleW, sampleH);
      const imgData = testCtx.getImageData(0, 0, sampleW, sampleH).data;
      for (let i = 3; i < imgData.length; i += 4) {
        if (imgData[i] < 250) {
          return true;
        }
      }
    } catch (e) {
      // Cross-origin or security restriction
    }
    return false;
  }

  // Determine output MIME type
  function resolveOutputMime(sourceType, chosenFormat, transparency) {
    if (chosenFormat === 'image/jpeg') return 'image/jpeg';
    if (chosenFormat === 'image/webp') return 'image/webp';
    if (chosenFormat === 'image/png') return 'image/png';

    // Auto mode
    if (sourceType === 'image/png') {
      // If PNG has transparency, WebP preserves it while allowing lossy compression
      if (transparency) {
        return 'image/webp';
      }
      return 'image/jpeg';
    }
    if (sourceType === 'image/webp') return 'image/webp';
    return 'image/jpeg';
  }

  // Core iterative binary search compression engine
  async function performCompression() {
    if (!originalImage || !currentFile || isCompressing) return;

    isCompressing = true;
    if (loadingOverlay) {
      loadingOverlay.classList.remove('hidden');
      loadingOverlay.classList.add('flex');
    }
    if (loadingText) loadingText.textContent = 'Analyzing and optimizing image...';
    hideAlert();

    // Small yield to allow UI repaint
    await new Promise((r) => setTimeout(r, 20));

    try {
      const origW = originalImage.naturalWidth;
      const origH = originalImage.naturalHeight;
      const outputMime = resolveOutputMime(currentFile.type, selectedFormat, hasTransparency);

      // Warn if user selected JPEG for a transparent image
      if (hasTransparency && outputMime === 'image/jpeg') {
        if (transparencyNotice) {
          transparencyNotice.textContent = 'Note: This image has transparency. Converting to JPEG replaces transparent background with clean white. Select WebP or Auto to preserve transparency.';
          transparencyNotice.classList.remove('hidden');
        }
      } else {
        if (transparencyNotice) transparencyNotice.classList.add('hidden');
      }

      let finalBlob = null;
      let finalW = origW;
      let finalH = origH;
      let qualityUsed = manualQuality;
      let reachedTarget = false;

      if (compressionMode === 'quality') {
        // Manual quality mode: single encode pass
        const canvas = document.createElement('canvas');
        canvas.width = origW;
        canvas.height = origH;
        const ctx = canvas.getContext('2d');
        if (outputMime === 'image/jpeg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, origW, origH);
        }
        ctx.drawImage(originalImage, 0, 0, origW, origH);
        finalBlob = await canvasToBlob(canvas, outputMime, manualQuality);
        finalW = origW;
        finalH = origH;
        reachedTarget = true;
      } else {
        // Target KB Mode: Iterative Binary Search on Quality + Dimension scaling if needed
        const targetBytes = targetKB * 1024;
        let curW = origW;
        let curH = origH;
        const maxDownscalePasses = 4;
        let bestBlobUnderTarget = null;
        let bestBlobQuality = 0.5;

        // If forced PNG format: browser canvas does not support lossy PNG compression
        if (outputMime === 'image/png') {
          const canvas = document.createElement('canvas');
          canvas.width = curW;
          canvas.height = curH;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(originalImage, 0, 0, curW, curH);
          let pngBlob = await canvasToBlob(canvas, 'image/png');

          // If larger than target, downscale dimensions
          let passes = 0;
          while (pngBlob.size > targetBytes && passes < 4) {
            passes++;
            const scale = Math.sqrt(targetBytes / pngBlob.size) * 0.92;
            curW = Math.max(80, Math.round(curW * scale));
            curH = Math.max(80, Math.round(curH * scale));
            canvas.width = curW;
            canvas.height = curH;
            ctx.clearRect(0, 0, curW, curH);
            ctx.drawImage(originalImage, 0, 0, curW, curH);
            pngBlob = await canvasToBlob(canvas, 'image/png');
          }
          finalBlob = pngBlob;
          finalW = curW;
          finalH = curH;
          reachedTarget = finalBlob.size <= targetBytes;
        } else {
          // JPEG or WebP Binary Search
          for (let pass = 0; pass < maxDownscalePasses; pass++) {
            if (loadingText) {
              loadingText.textContent = pass === 0 
                ? 'Optimizing quality...' 
                : `Fine-tuning dimensions (${curW} × ${curH})...`;
            }

            const canvas = document.createElement('canvas');
            canvas.width = curW;
            canvas.height = curH;
            const ctx = canvas.getContext('2d');
            if (outputMime === 'image/jpeg') {
              ctx.fillStyle = '#ffffff';
              ctx.fillRect(0, 0, curW, curH);
            }
            ctx.drawImage(originalImage, 0, 0, curW, curH);

            let lowQ = 0.05;
            let highQ = 0.96;
            let bestPassBlob = null;
            let bestPassQ = 0.05;

            // 7 iterations of binary search yields quality accuracy within ~0.007
            for (let iter = 0; iter < 7; iter++) {
              const midQ = (lowQ + highQ) / 2;
              const testBlob = await canvasToBlob(canvas, outputMime, midQ);

              if (testBlob.size <= targetBytes) {
                bestPassBlob = testBlob;
                bestPassQ = midQ;
                lowQ = midQ; // Try for better quality that still satisfies target
              } else {
                highQ = midQ; // File is too large, lower quality
              }
            }

            if (bestPassBlob) {
              bestBlobUnderTarget = bestPassBlob;
              bestBlobQuality = bestPassQ;
              finalW = curW;
              finalH = curH;
              reachedTarget = true;
              // If within 25% of target or reasonable size, stop search
              if (bestPassBlob.size >= targetBytes * 0.75) {
                break;
              }
            } else {
              // Even at lowest quality 0.05, file size exceeds target KB!
              // Intelligently reduce dimensions proportionally
              const testLowest = await canvasToBlob(canvas, outputMime, 0.08);
              const scale = Math.min(0.85, Math.max(0.25, Math.sqrt(targetBytes / testLowest.size) * 0.94));
              const nextW = Math.round(curW * scale);
              const nextH = Math.round(curH * scale);

              if (nextW < 60 || nextH < 60 || (nextW === curW && nextH === curH)) {
                // Minimum usable dimension threshold reached
                bestBlobUnderTarget = testLowest;
                finalW = curW;
                finalH = curH;
                reachedTarget = false;
                break;
              }
              curW = nextW;
              curH = nextH;
            }
          }

          finalBlob = bestBlobUnderTarget;
          qualityUsed = bestBlobQuality;
        }
      }

      if (!finalBlob) {
        throw new Error('Unable to encode compressed image.');
      }

      // Revoke previous compressed URL
      if (compressedBlobUrl) {
        URL.revokeObjectURL(compressedBlobUrl);
      }
      compressedBlob = finalBlob;
      compressedBlobUrl = URL.createObjectURL(finalBlob);

      // Render stats & previews
      renderResults(finalBlob, finalW, finalH, reachedTarget, outputMime);
    } catch (err) {
      console.error(err);
      showAlert('An error occurred while compressing this image: ' + (err.message || 'Please try another image.'));
    } finally {
      isCompressing = false;
      if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
        loadingOverlay.classList.remove('flex');
      }
    }
  }

  // Update DOM with compression results
  function renderResults(blob, compW, compH, reachedTarget, mimeType) {
    const origBytes = currentFile.size;
    const compBytes = blob.size;
    const origW = originalImage.naturalWidth;
    const origH = originalImage.naturalHeight;

    // Stat: Original
    if (statOrigSize) statOrigSize.textContent = formatBytes(origBytes);
    if (statOrigDim) statOrigDim.textContent = `${origW} × ${origH} px`;

    // Stat: Compressed
    if (statCompSize) statCompSize.textContent = formatBytes(compBytes);
    if (statCompDim) statCompDim.textContent = `${compW} × ${compH} px`;

    // Stat: Space Saved
    const diffBytes = origBytes - compBytes;
    const reductionPct = origBytes > 0 ? ((diffBytes / origBytes) * 100) : 0;
    if (statReduction) {
      if (diffBytes > 0) {
        statReduction.textContent = `Saved ${formatBytes(diffBytes)} (${reductionPct.toFixed(1)}%)`;
        statReduction.className = 'font-bold text-emerald-600 dark:text-emerald-400';
      } else {
        statReduction.textContent = 'Already optimized';
        statReduction.className = 'font-semibold text-slate-500 dark:text-slate-400';
      }
    }

    // Target Status Badge
    if (statStatusBadge) {
      if (compressionMode === 'target') {
        const targetBytes = targetKB * 1024;
        if (compBytes <= targetBytes) {
          statStatusBadge.innerHTML = `✅ Target Achieved: <strong>${formatBytes(compBytes)}</strong> (Target: ${targetKB} KB)`;
          statStatusBadge.className = 'inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300';
        } else {
          statStatusBadge.innerHTML = `⚠️ Best Achievable: <strong>${formatBytes(compBytes)}</strong> (Requested ${targetKB} KB)`;
          statStatusBadge.className = 'inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 border border-amber-200 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-300';
        }
      } else {
        statStatusBadge.innerHTML = `🎨 Manual Quality: <strong>${Math.round(manualQuality * 100)}%</strong>`;
        statStatusBadge.className = 'inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-200 dark:bg-blue-950/40 dark:border-blue-800 dark:text-blue-300';
      }
    }

    // Previews
    if (previewCompImg) {
      previewCompImg.src = compressedBlobUrl;
    }
    if (previewCompBadge) {
      previewCompBadge.textContent = `${formatBytes(compBytes)} • ${compW}×${compH}`;
    }

    // Setup Download Button
    if (downloadBtn) {
      downloadBtn.onclick = () => {
        const originalName = currentFile.name.replace(/\.[^/.]+$/, '');
        let ext = '.jpg';
        if (mimeType === 'image/png') ext = '.png';
        if (mimeType === 'image/webp') ext = '.webp';
        
        const filename = `${originalName}-compressed${ext}`;
        const a = document.createElement('a');
        a.href = compressedBlobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };
    }
  }

  // Load selected file
  function handleFileSelect(file) {
    if (!file) return;

    hideAlert();

    // Check MIME type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      showAlert('Unsupported format. Please upload a JPG, JPEG, PNG, or WebP image.');
      return;
    }

    // Check size limit
    if (file.size > MAX_FILE_SIZE_BYTES) {
      showAlert(`Image is too large (${formatBytes(file.size)}). Maximum supported file size is 50MB.`);
      return;
    }

    cleanupUrls();
    currentFile = file;

    originalBlobUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      originalImage = img;
      hasTransparency = (file.type === 'image/png') ? checkTransparency(img) : false;

      // Set original preview
      if (previewOrigImg) previewOrigImg.src = originalBlobUrl;
      if (previewOrigBadge) {
        previewOrigBadge.textContent = `${formatBytes(file.size)} • ${img.naturalWidth}×${img.naturalHeight}`;
      }

      // Switch views
      if (uploadSection) uploadSection.classList.add('hidden');
      if (workspaceSection) workspaceSection.classList.remove('hidden');

      // Automatically trigger initial compression
      performCompression();
    };

    img.onerror = () => {
      showAlert('Unable to decode this image file. The file may be corrupt or an unsupported format.');
      resetTool();
    };

    img.src = originalBlobUrl;
  }

  // Event Listeners: Drag & Drop
  if (dropZone) {
    ['dragenter', 'dragover'].forEach((eventName) => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add('border-blue-500', 'bg-blue-50/70', 'dark:bg-blue-950/30');
      });
    });

    ['dragleave', 'drop'].forEach((eventName) => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('border-blue-500', 'bg-blue-50/70', 'dark:bg-blue-950/30');
      });
    });

    dropZone.addEventListener('drop', (e) => {
      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        handleFileSelect(files[0]);
      }
    });

    // Keyboard support
    dropZone.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        fileInput?.click();
      }
    });
  }

  // Select File Button & Input
  if (selectFileBtn && fileInput) {
    selectFileBtn.addEventListener('click', () => fileInput.click());
  }
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFileSelect(files[0]);
      }
    });
  }

  // Clipboard Paste Support
  window.addEventListener('paste', (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          handleFileSelect(file);
          break;
        }
      }
    }
  });

  // Preset Buttons (20KB, 50KB, 100KB, 200KB)
  presetButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      presetButtons.forEach((b) => {
        b.classList.remove('active', 'bg-blue-600', 'text-white', 'border-blue-600', 'shadow-xs');
        b.classList.add('border-slate-200', 'bg-white', 'text-slate-700', 'dark:border-slate-700', 'dark:bg-slate-800', 'dark:text-slate-200');
      });
      btn.classList.add('active', 'bg-blue-600', 'text-white', 'border-blue-600', 'shadow-xs');
      btn.classList.remove('border-slate-200', 'bg-white', 'text-slate-700', 'dark:border-slate-700', 'dark:bg-slate-800', 'dark:text-slate-200');

      const kb = parseInt(btn.getAttribute('data-kb'), 10);
      if (!isNaN(kb) && kb > 0) {
        targetKB = kb;
        if (customTargetInput) customTargetInput.value = '';
        if (statTargetSize) statTargetSize.textContent = `${targetKB} KB`;
        performCompression();
      }
    });
  });

  // Custom Target Size
  if (applyCustomBtn && customTargetInput) {
    applyCustomBtn.addEventListener('click', () => {
      const val = parseInt(customTargetInput.value, 10);
      if (isNaN(val) || val < 5 || val > 10000) {
        showAlert('Please enter a realistic target size between 5 KB and 10,000 KB.', true);
        return;
      }
      hideAlert();
      targetKB = val;
      // Deselect preset buttons
      presetButtons.forEach((b) => {
        b.classList.remove('active', 'bg-blue-600', 'text-white', 'border-blue-600', 'shadow-xs');
        b.classList.add('border-slate-200', 'bg-white', 'text-slate-700', 'dark:border-slate-700', 'dark:bg-slate-800', 'dark:text-slate-200');
      });
      if (statTargetSize) statTargetSize.textContent = `${targetKB} KB`;
      performCompression();
    });

    customTargetInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        applyCustomBtn.click();
      }
    });
  }

  // Format Select
  if (formatSelect) {
    formatSelect.addEventListener('change', (e) => {
      selectedFormat = e.target.value;
      performCompression();
    });
  }

  // Mode Radio (Target vs Quality)
  if (modeTargetRadio && modeQualityRadio) {
    modeTargetRadio.addEventListener('change', () => {
      if (modeTargetRadio.checked) {
        compressionMode = 'target';
        targetControlGroup?.classList.remove('hidden');
        qualityControlGroup?.classList.add('hidden');
        performCompression();
      }
    });
    modeQualityRadio.addEventListener('change', () => {
      if (modeQualityRadio.checked) {
        compressionMode = 'quality';
        targetControlGroup?.classList.add('hidden');
        qualityControlGroup?.classList.remove('hidden');
        performCompression();
      }
    });
  }

  // Quality Slider
  if (qualitySlider && qualityValueDisplay) {
    qualitySlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      manualQuality = val / 100;
      qualityValueDisplay.textContent = `${val}%`;
    });
    qualitySlider.addEventListener('change', () => {
      if (compressionMode === 'quality') {
        performCompression();
      }
    });
  }

  // Recompress Button
  if (recompressBtn) {
    recompressBtn.addEventListener('click', () => performCompression());
  }

  // Reset Button ("Compress Another Image")
  if (resetBtn) {
    resetBtn.addEventListener('click', resetTool);
  }

  // Cleanup on window unload
  window.addEventListener('beforeunload', cleanupUrls);

})();
