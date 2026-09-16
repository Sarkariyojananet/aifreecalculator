/**
 * Client-Side Image Resizer Engine
 * 100% Browser-Side Execution - Zero Server or Worker Invocations
 * Supports Pixels (px), Centimeters (cm + DPI), and Target File Size (KB / 50KB)
 */

(function () {
  'use strict';

  // DOM Elements - Upload & Containers
  const dropZone = document.getElementById('ir-drop-zone');
  const fileInput = document.getElementById('ir-file-input');
  const selectFileBtn = document.getElementById('ir-select-file-btn');
  const uploadSection = document.getElementById('ir-upload-section');
  const workspaceSection = document.getElementById('ir-workspace-section');
  const loadingOverlay = document.getElementById('ir-loading-overlay');
  const loadingText = document.getElementById('ir-loading-text');
  const alertBox = document.getElementById('ir-alert-box');
  const alertText = document.getElementById('ir-alert-text');
  const transparencyNotice = document.getElementById('ir-transparency-notice');

  // Mode Tabs
  const tabPixels = document.getElementById('ir-tab-pixels');
  const tabCm = document.getElementById('ir-tab-cm');
  const tabKb = document.getElementById('ir-tab-kb');
  const panelPixels = document.getElementById('ir-panel-pixels');
  const panelCm = document.getElementById('ir-panel-cm');
  const panelKb = document.getElementById('ir-panel-kb');

  // Controls - Pixels Mode
  const inputWidthPx = document.getElementById('ir-width-px');
  const inputHeightPx = document.getElementById('ir-height-px');
  const lockAspectCheck = document.getElementById('ir-lock-aspect');
  const presetPercentBtns = document.querySelectorAll('.ir-preset-pct');

  // Controls - CM Mode
  const inputWidthCm = document.getElementById('ir-width-cm');
  const inputHeightCm = document.getElementById('ir-height-cm');
  const inputDpi = document.getElementById('ir-dpi');
  const lockAspectCmCheck = document.getElementById('ir-lock-aspect-cm');
  const cmCalcNotice = document.getElementById('ir-cm-calc-notice');
  const dpiPresetBtns = document.querySelectorAll('.ir-dpi-preset');

  // Controls - KB Mode
  const kbPresetBtns = document.querySelectorAll('.ir-kb-preset');
  const inputCustomKb = document.getElementById('ir-custom-kb');
  const applyCustomKbBtn = document.getElementById('ir-apply-custom-kb');

  // Common Controls
  const formatSelect = document.getElementById('ir-format-select');
  const qualitySlider = document.getElementById('ir-quality-slider');
  const qualityValDisplay = document.getElementById('ir-quality-val');
  const qualityLabelDisplay = document.getElementById('ir-quality-label');
  const applyResizeBtn = document.getElementById('ir-apply-resize-btn');

  // Stats Displays
  const statOrigDim = document.getElementById('ir-stat-orig-dim');
  const statOrigSize = document.getElementById('ir-stat-orig-size');
  const statOrigRatio = document.getElementById('ir-stat-orig-ratio');
  const statResizedDim = document.getElementById('ir-stat-resized-dim');
  const statResizedSize = document.getElementById('ir-stat-resized-size');
  const statChangeRatio = document.getElementById('ir-stat-change-ratio');

  // Previews & Actions
  const previewOrigImg = document.getElementById('ir-preview-orig');
  const previewResizedImg = document.getElementById('ir-preview-resized');
  const badgeOrigPreview = document.getElementById('ir-badge-orig');
  const badgeResizedPreview = document.getElementById('ir-badge-resized');
  const downloadBtn = document.getElementById('ir-download-btn');
  const resetBtn = document.getElementById('ir-reset-btn');

  // Internal State
  let currentFile = null;
  let originalImage = null;
  let originalBlobUrl = null;
  let resizedBlob = null;
  let resizedBlobUrl = null;
  
  let origWidth = 0;
  let origHeight = 0;
  let aspectRatio = 1;
  let hasTransparency = false;

  let activeMode = 'pixels'; // 'pixels' | 'cm' | 'kb'
  let lockAspectRatio = true;
  let targetKB = 50;
  let manualQuality = 0.85;
  let selectedFormat = 'auto'; // 'auto' | 'image/jpeg' | 'image/png' | 'image/webp'
  let currentDpi = 96;

  let isProcessing = false;
  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

  // Helper: Format bytes
  function formatBytes(bytes) {
    if (!bytes || bytes <= 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const val = bytes / Math.pow(k, i);
    return (val >= 100 || i === 0 ? val.toFixed(0) : val.toFixed(1)) + ' ' + sizes[i];
  }

  // Helper: Calculate Aspect Ratio String (e.g. 16:9, 4:3, 1:1)
  function getAspectRatioString(w, h) {
    function gcd(a, b) {
      return b === 0 ? a : gcd(b, a % b);
    }
    const divisor = gcd(w, h);
    const rw = w / divisor;
    const rh = h / divisor;
    if (rw <= 20 && rh <= 20) {
      return `${rw}:${rh}`;
    }
    return (w / h).toFixed(2) + ':1';
  }

  // Helper: Convert CM to Pixels based on DPI
  // 1 inch = 2.54 cm -> pixels = (cm / 2.54) * DPI
  function cmToPx(cm, dpi) {
    return Math.round((cm / 2.54) * dpi);
  }

  // Helper: Convert Pixels to CM based on DPI
  function pxToCm(px, dpi) {
    return parseFloat(((px * 2.54) / dpi).toFixed(2));
  }

  // UI Alerts
  function showAlert(msg, isWarning = false) {
    if (!alertBox || !alertText) return;
    alertText.textContent = msg;
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

  // Revoke object URLs to free memory
  function cleanupUrls() {
    if (originalBlobUrl) {
      URL.revokeObjectURL(originalBlobUrl);
      originalBlobUrl = null;
    }
    if (resizedBlobUrl) {
      URL.revokeObjectURL(resizedBlobUrl);
      resizedBlobUrl = null;
    }
  }

  // Reset entire tool
  function resetTool() {
    cleanupUrls();
    currentFile = null;
    originalImage = null;
    resizedBlob = null;
    origWidth = 0;
    origHeight = 0;
    aspectRatio = 1;
    hasTransparency = false;
    isProcessing = false;

    if (fileInput) fileInput.value = '';
    if (previewOrigImg) previewOrigImg.src = '';
    if (previewResizedImg) previewResizedImg.src = '';
    hideAlert();
    if (transparencyNotice) transparencyNotice.classList.add('hidden');

    if (workspaceSection) workspaceSection.classList.add('hidden');
    if (uploadSection) uploadSection.classList.remove('hidden');
  }

  // Convert canvas to Blob via Promise
  function canvasToBlob(canvas, type, quality) {
    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), type, quality);
    });
  }

  // Check transparency
  function checkTransparency(img) {
    try {
      const testCanvas = document.createElement('canvas');
      const sampleW = Math.min(200, img.naturalWidth);
      const sampleH = Math.min(200, img.naturalHeight);
      testCanvas.width = sampleW;
      testCanvas.height = sampleH;
      const ctx = testCanvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, sampleW, sampleH);
      const data = ctx.getImageData(0, 0, sampleW, sampleH).data;
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] < 250) return true;
      }
    } catch (e) {
      // Ignored for safety
    }
    return false;
  }

  // Output MIME resolution
  function resolveOutputMime(sourceType, format, transparent) {
    if (format === 'image/jpeg') return 'image/jpeg';
    if (format === 'image/png') return 'image/png';
    if (format === 'image/webp') return 'image/webp';

    // Auto Mode:
    if (sourceType === 'image/png') {
      return transparent ? 'image/png' : 'image/jpeg';
    }
    if (sourceType === 'image/webp') return 'image/webp';
    return 'image/jpeg';
  }

  // Execute Resizing
  async function performResize() {
    if (!originalImage || !currentFile || isProcessing) return;

    hideAlert();
    isProcessing = true;
    if (loadingOverlay) {
      loadingOverlay.classList.remove('hidden');
      loadingOverlay.classList.add('flex');
    }
    if (loadingText) loadingText.textContent = 'Processing resized image...';

    // Yield to allow UI refresh
    await new Promise((r) => setTimeout(r, 20));

    try {
      const outputMime = resolveOutputMime(currentFile.type, selectedFormat, hasTransparency);

      // Warning if converting transparent PNG to JPEG
      if (hasTransparency && outputMime === 'image/jpeg') {
        if (transparencyNotice) {
          transparencyNotice.textContent = 'Note: This image has transparent areas. JPEG format does not support transparency, so backgrounds are rendered white. Select PNG or WebP to preserve transparency.';
          transparencyNotice.classList.remove('hidden');
        }
      } else {
        if (transparencyNotice) transparencyNotice.classList.add('hidden');
      }

      let targetW = origWidth;
      let targetH = origHeight;
      let qualityUsed = manualQuality;
      let finalBlob = null;

      if (activeMode === 'pixels') {
        targetW = parseInt(inputWidthPx.value, 10);
        targetH = parseInt(inputHeightPx.value, 10);
        if (isNaN(targetW) || targetW <= 0 || isNaN(targetH) || targetH <= 0) {
          throw new Error('Please enter valid positive pixel dimensions.');
        }
        if (targetW > 15000 || targetH > 15000) {
          throw new Error('Dimensions exceed 15,000 pixels. Please enter realistic dimensions.');
        }

        const canvas = document.createElement('canvas');
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        if (outputMime === 'image/jpeg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, targetW, targetH);
        }
        ctx.drawImage(originalImage, 0, 0, targetW, targetH);
        finalBlob = await canvasToBlob(canvas, outputMime, qualityUsed);

      } else if (activeMode === 'cm') {
        const cmW = parseFloat(inputWidthCm.value);
        const cmH = parseFloat(inputHeightCm.value);
        const dpi = parseInt(inputDpi.value, 10);

        if (isNaN(cmW) || cmW <= 0 || isNaN(cmH) || cmH <= 0) {
          throw new Error('Please enter valid positive centimeter dimensions.');
        }
        if (isNaN(dpi) || dpi <= 10 || dpi > 1200) {
          throw new Error('Please specify a realistic DPI between 10 and 1200.');
        }

        targetW = cmToPx(cmW, dpi);
        targetH = cmToPx(cmH, dpi);

        if (targetW <= 0 || targetH <= 0 || targetW > 15000 || targetH > 15000) {
          throw new Error(`The resulting pixel dimensions (${targetW} × ${targetH} px) are invalid or exceed 15,000 px.`);
        }

        const canvas = document.createElement('canvas');
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        if (outputMime === 'image/jpeg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, targetW, targetH);
        }
        ctx.drawImage(originalImage, 0, 0, targetW, targetH);
        finalBlob = await canvasToBlob(canvas, outputMime, qualityUsed);

      } else if (activeMode === 'kb') {
        // Mode C: Target File Size (Binary Search on Quality + Proportional Scaling if needed)
        const targetBytes = targetKB * 1024;
        let curW = origWidth;
        let curH = origHeight;

        // If user set target KB, check iteratively
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        let bestBlob = null;
        let bestQ = 0.85;

        for (let pass = 0; pass < 4; pass++) {
          if (loadingText) {
            loadingText.textContent = pass === 0
              ? `Optimizing quality for ${targetKB} KB target...`
              : `Adjusting dimensions (${curW} × ${curH} px)...`;
          }

          canvas.width = curW;
          canvas.height = curH;
          if (outputMime === 'image/jpeg') {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, curW, curH);
          }
          ctx.drawImage(originalImage, 0, 0, curW, curH);

          if (outputMime === 'image/png') {
            // PNG is lossless deflate
            const testBlob = await canvasToBlob(canvas, 'image/png');
            if (testBlob.size <= targetBytes) {
              bestBlob = testBlob;
              targetW = curW;
              targetH = curH;
              break;
            } else {
              const scale = Math.sqrt(targetBytes / testBlob.size) * 0.92;
              curW = Math.max(80, Math.round(curW * scale));
              curH = Math.max(80, Math.round(curH * scale));
              bestBlob = testBlob;
              targetW = curW;
              targetH = curH;
            }
          } else {
            // JPEG / WebP binary search
            let low = 0.05;
            let high = 0.98;
            let passBestBlob = null;
            let passBestQ = 0.05;

            for (let iter = 0; iter < 7; iter++) {
              const mid = (low + high) / 2;
              const testBlob = await canvasToBlob(canvas, outputMime, mid);
              if (testBlob.size <= targetBytes) {
                passBestBlob = testBlob;
                passBestQ = mid;
                low = mid;
              } else {
                high = mid;
              }
            }

            if (passBestBlob) {
              bestBlob = passBestBlob;
              bestQ = passBestQ;
              targetW = curW;
              targetH = curH;
              if (passBestBlob.size >= targetBytes * 0.75) {
                break;
              }
            } else {
              // Quality 0.05 exceeds target KB, scale dimensions
              const testLowest = await canvasToBlob(canvas, outputMime, 0.08);
              const scale = Math.min(0.85, Math.max(0.25, Math.sqrt(targetBytes / testLowest.size) * 0.94));
              const nextW = Math.round(curW * scale);
              const nextH = Math.round(curH * scale);
              if (nextW < 60 || nextH < 60 || (nextW === curW && nextH === curH)) {
                bestBlob = testLowest;
                targetW = curW;
                targetH = curH;
                break;
              }
              curW = nextW;
              curH = nextH;
            }
          }
        }

        finalBlob = bestBlob;
        qualityUsed = bestQ;
      }

      if (!finalBlob) {
        throw new Error('Unable to render resized image. Please check input parameters.');
      }

      // Free previous resized URL
      if (resizedBlobUrl) {
        URL.revokeObjectURL(resizedBlobUrl);
      }
      resizedBlob = finalBlob;
      resizedBlobUrl = URL.createObjectURL(finalBlob);

      renderResults(finalBlob, targetW, targetH, outputMime);
    } catch (err) {
      console.error(err);
      showAlert(err.message || 'An error occurred while resizing image.');
    } finally {
      isProcessing = false;
      if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
        loadingOverlay.classList.remove('flex');
      }
    }
  }

  // Update DOM with results
  function renderResults(blob, resW, resH, mimeType) {
    const origBytes = currentFile.size;
    const resBytes = blob.size;

    if (statResizedDim) statResizedDim.textContent = `${resW} × ${resH} px`;
    if (statResizedSize) statResizedSize.textContent = formatBytes(resBytes);

    if (statChangeRatio) {
      const diff = origBytes - resBytes;
      if (diff > 0) {
        const pct = ((diff / origBytes) * 100).toFixed(1);
        statChangeRatio.textContent = `-${pct}% (${formatBytes(diff)} saved)`;
        statChangeRatio.className = 'mt-1 font-mono text-base font-black text-emerald-600 dark:text-emerald-400 sm:text-lg';
      } else if (diff < 0) {
        const pct = ((-diff / origBytes) * 100).toFixed(1);
        statChangeRatio.textContent = `+${pct}% (expanded)`;
        statChangeRatio.className = 'mt-1 font-mono text-base font-black text-blue-600 dark:text-blue-400 sm:text-lg';
      } else {
        statChangeRatio.textContent = 'Same Size';
        statChangeRatio.className = 'mt-1 font-mono text-base font-black text-slate-600 dark:text-slate-300 sm:text-lg';
      }
    }

    if (previewResizedImg) {
      previewResizedImg.src = resizedBlobUrl;
    }
    if (badgeResizedPreview) {
      badgeResizedPreview.textContent = `${formatBytes(resBytes)} • ${resW}×${resH}`;
    }

    // Set download action
    if (downloadBtn) {
      downloadBtn.onclick = () => {
        const baseName = currentFile.name.replace(/\.[^/.]+$/, '');
        let ext = '.jpg';
        if (mimeType === 'image/png') ext = '.png';
        if (mimeType === 'image/webp') ext = '.webp';

        const filename = `${baseName}-resized${ext}`;
        const a = document.createElement('a');
        a.href = resizedBlobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };
    }
  }

  // File selection handler
  function handleFileSelect(file) {
    if (!file) return;
    hideAlert();

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      showAlert('Unsupported format. Please select a JPG, JPEG, PNG, or WebP image.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      showAlert(`File is too large (${formatBytes(file.size)}). Maximum supported size is 50MB.`);
      return;
    }

    cleanupUrls();
    currentFile = file;
    originalBlobUrl = URL.createObjectURL(file);

    const img = new Image();
    img.onload = () => {
      originalImage = img;
      origWidth = img.naturalWidth;
      origHeight = img.naturalHeight;
      aspectRatio = origWidth / origHeight;
      hasTransparency = file.type === 'image/png' ? checkTransparency(img) : false;

      // Populate Pixels Mode
      if (inputWidthPx) inputWidthPx.value = origWidth;
      if (inputHeightPx) inputHeightPx.value = origHeight;

      // Populate CM Mode
      currentDpi = parseInt(inputDpi?.value || '96', 10);
      if (inputWidthCm) inputWidthCm.value = pxToCm(origWidth, currentDpi);
      if (inputHeightCm) inputHeightCm.value = pxToCm(origHeight, currentDpi);
      updateCmNotice();

      // Stats
      if (statOrigDim) statOrigDim.textContent = `${origWidth} × ${origHeight} px`;
      if (statOrigSize) statOrigSize.textContent = formatBytes(file.size);
      if (statOrigRatio) statOrigRatio.textContent = getAspectRatioString(origWidth, origHeight);

      // Preview
      if (previewOrigImg) previewOrigImg.src = originalBlobUrl;
      if (badgeOrigPreview) badgeOrigPreview.textContent = `${formatBytes(file.size)} • ${origWidth}×${origHeight}`;

      // Show workspace
      if (uploadSection) uploadSection.classList.add('hidden');
      if (workspaceSection) workspaceSection.classList.remove('hidden');

      // Trigger initial resize
      performResize();
    };

    img.onerror = () => {
      showAlert('Unable to decode this image file. The file may be corrupt or an unsupported format.');
      resetTool();
    };

    img.src = originalBlobUrl;
  }

  // Update CM notice
  function updateCmNotice() {
    if (!cmCalcNotice || !inputWidthCm || !inputHeightCm || !inputDpi) return;
    const cmW = parseFloat(inputWidthCm.value) || 0;
    const cmH = parseFloat(inputHeightCm.value) || 0;
    const dpi = parseInt(inputDpi.value, 10) || 96;
    const calcW = cmToPx(cmW, dpi);
    const calcH = cmToPx(cmH, dpi);
    cmCalcNotice.textContent = `Calculated Dimensions: ${calcW} × ${calcH} px (at ${dpi} DPI)`;
  }

  // Setup Drag & Drop
  if (dropZone) {
    ['dragenter', 'dragover'].forEach((event) => {
      dropZone.addEventListener(event, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add('border-blue-500', 'bg-blue-50/70', 'dark:bg-blue-950/30');
      });
    });

    ['dragleave', 'drop'].forEach((event) => {
      dropZone.addEventListener(event, (e) => {
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

    dropZone.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        fileInput?.click();
      }
    });
  }

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

  // Clipboard paste support
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

  // Tab Switching
  function switchTab(mode) {
    activeMode = mode;
    [tabPixels, tabCm, tabKb].forEach((tab) => {
      tab.classList.remove('active', 'border-blue-600', 'text-blue-600', 'dark:text-blue-400', 'border-b-2');
      tab.classList.add('text-slate-500', 'dark:text-slate-400', 'hover:text-slate-700');
    });
    [panelPixels, panelCm, panelKb].forEach((panel) => panel.classList.add('hidden'));

    if (mode === 'pixels') {
      tabPixels.classList.add('active', 'border-blue-600', 'text-blue-600', 'dark:text-blue-400', 'border-b-2');
      tabPixels.classList.remove('text-slate-500', 'dark:text-slate-400');
      panelPixels.classList.remove('hidden');
    } else if (mode === 'cm') {
      tabCm.classList.add('active', 'border-blue-600', 'text-blue-600', 'dark:text-blue-400', 'border-b-2');
      tabCm.classList.remove('text-slate-500', 'dark:text-slate-400');
      panelCm.classList.remove('hidden');
      updateCmNotice();
    } else if (mode === 'kb') {
      tabKb.classList.add('active', 'border-blue-600', 'text-blue-600', 'dark:text-blue-400', 'border-b-2');
      tabKb.classList.remove('text-slate-500', 'dark:text-slate-400');
      panelKb.classList.remove('hidden');
    }
  }

  if (tabPixels) tabPixels.addEventListener('click', () => switchTab('pixels'));
  if (tabCm) tabCm.addEventListener('click', () => switchTab('cm'));
  if (tabKb) tabKb.addEventListener('click', () => switchTab('kb'));

  // Aspect Ratio Sync - Pixels
  if (lockAspectCheck) {
    lockAspectCheck.addEventListener('change', () => {
      lockAspectRatio = lockAspectCheck.checked;
    });
  }

  if (inputWidthPx) {
    inputWidthPx.addEventListener('input', () => {
      if (lockAspectRatio && aspectRatio > 0) {
        const w = parseInt(inputWidthPx.value, 10);
        if (!isNaN(w) && w > 0) {
          inputHeightPx.value = Math.round(w / aspectRatio);
        }
      }
    });
  }

  if (inputHeightPx) {
    inputHeightPx.addEventListener('input', () => {
      if (lockAspectRatio && aspectRatio > 0) {
        const h = parseInt(inputHeightPx.value, 10);
        if (!isNaN(h) && h > 0) {
          inputWidthPx.value = Math.round(h * aspectRatio);
        }
      }
    });
  }

  // Quick Preset % Buttons
  presetPercentBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const pct = parseFloat(btn.getAttribute('data-pct'));
      if (!isNaN(pct) && origWidth > 0 && origHeight > 0) {
        inputWidthPx.value = Math.round(origWidth * (pct / 100));
        inputHeightPx.value = Math.round(origHeight * (pct / 100));
        performResize();
      }
    });
  });

  // Aspect Ratio Sync - CM
  if (lockAspectCmCheck) {
    lockAspectCmCheck.addEventListener('change', () => {
      lockAspectRatio = lockAspectCmCheck.checked;
      if (lockAspectCheck) lockAspectCheck.checked = lockAspectRatio;
    });
  }

  if (inputWidthCm) {
    inputWidthCm.addEventListener('input', () => {
      if (lockAspectRatio && aspectRatio > 0) {
        const cmW = parseFloat(inputWidthCm.value);
        if (!isNaN(cmW) && cmW > 0) {
          inputHeightCm.value = (cmW / aspectRatio).toFixed(2);
        }
      }
      updateCmNotice();
    });
  }

  if (inputHeightCm) {
    inputHeightCm.addEventListener('input', () => {
      if (lockAspectRatio && aspectRatio > 0) {
        const cmH = parseFloat(inputHeightCm.value);
        if (!isNaN(cmH) && cmH > 0) {
          inputWidthCm.value = (cmH * aspectRatio).toFixed(2);
        }
      }
      updateCmNotice();
    });
  }

  if (inputDpi) {
    inputDpi.addEventListener('input', () => {
      updateCmNotice();
    });
  }

  // DPI Preset Buttons
  dpiPresetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const dpi = parseInt(btn.getAttribute('data-dpi'), 10);
      if (!isNaN(dpi) && inputDpi) {
        inputDpi.value = dpi;
        updateCmNotice();
      }
    });
  });

  // KB Preset Buttons (20KB, 50KB, 100KB, 200KB)
  kbPresetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      kbPresetBtns.forEach((b) => {
        b.classList.remove('active', 'bg-blue-600', 'text-white', 'border-blue-600');
        b.classList.add('border-slate-200', 'bg-white', 'text-slate-700', 'dark:border-slate-700', 'dark:bg-slate-800', 'dark:text-slate-200');
      });
      btn.classList.add('active', 'bg-blue-600', 'text-white', 'border-blue-600');
      btn.classList.remove('border-slate-200', 'bg-white', 'text-slate-700', 'dark:border-slate-700', 'dark:bg-slate-800', 'dark:text-slate-200');

      const kb = parseInt(btn.getAttribute('data-kb'), 10);
      if (!isNaN(kb) && kb > 0) {
        targetKB = kb;
        if (inputCustomKb) inputCustomKb.value = '';
        performResize();
      }
    });
  });

  // Apply Custom KB
  if (applyCustomKbBtn && inputCustomKb) {
    applyCustomKbBtn.addEventListener('click', () => {
      const val = parseInt(inputCustomKb.value, 10);
      if (isNaN(val) || val < 5 || val > 10000) {
        showAlert('Please enter a realistic target size between 5 KB and 10,000 KB.', true);
        return;
      }
      hideAlert();
      targetKB = val;
      kbPresetBtns.forEach((b) => {
        b.classList.remove('active', 'bg-blue-600', 'text-white', 'border-blue-600');
        b.classList.add('border-slate-200', 'bg-white', 'text-slate-700', 'dark:border-slate-700', 'dark:bg-slate-800', 'dark:text-slate-200');
      });
      performResize();
    });

    inputCustomKb.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') applyCustomKbBtn.click();
    });
  }

  // Format Selector
  if (formatSelect) {
    formatSelect.addEventListener('change', (e) => {
      selectedFormat = e.target.value;
      performResize();
    });
  }

  // Quality Slider
  if (qualitySlider) {
    qualitySlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      manualQuality = val / 100;
      if (qualityValDisplay) qualityValDisplay.textContent = `${val}%`;
      if (qualityLabelDisplay) {
        if (val < 40) qualityLabelDisplay.textContent = '(Low)';
        else if (val < 75) qualityLabelDisplay.textContent = '(Medium)';
        else qualityLabelDisplay.textContent = '(High)';
      }
    });
    qualitySlider.addEventListener('change', () => {
      if (activeMode !== 'kb') {
        performResize();
      }
    });
  }

  // Main Action: Apply Resize
  if (applyResizeBtn) {
    applyResizeBtn.addEventListener('click', performResize);
  }

  // Reset
  if (resetBtn) {
    resetBtn.addEventListener('click', resetTool);
  }

  // Cleanup on unload
  window.addEventListener('beforeunload', cleanupUrls);

})();
