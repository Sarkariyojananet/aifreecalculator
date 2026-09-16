/**
 * Client-Side PNG to JPG Converter Engine
 * 100% Browser-Side Execution - Zero Server or Worker Invocations
 * Automatic Transparency Detection & Custom Background Compositing
 * Supports Single & Multi-Image Batch Conversion
 */

(function () {
  'use strict';

  // DOM Elements - Upload & Containers
  const dropZone = document.getElementById('p2j-drop-zone');
  const fileInput = document.getElementById('p2j-file-input');
  const selectFileBtn = document.getElementById('p2j-select-file-btn');
  const uploadSection = document.getElementById('p2j-upload-section');
  const workspaceSingle = document.getElementById('p2j-workspace-single');
  const workspaceBatch = document.getElementById('p2j-workspace-batch');
  const batchList = document.getElementById('p2j-batch-list');
  const batchDownloadAllBtn = document.getElementById('p2j-batch-download-all');
  const batchResetBtn = document.getElementById('p2j-batch-reset');
  const batchCountBadge = document.getElementById('p2j-batch-count');

  const loadingOverlay = document.getElementById('p2j-loading-overlay');
  const loadingText = document.getElementById('p2j-loading-text');
  const alertBox = document.getElementById('p2j-alert-box');
  const alertText = document.getElementById('p2j-alert-text');
  const transparencyNotice = document.getElementById('p2j-transparency-notice');

  // Controls - Background Color
  const bgWhiteBtn = document.getElementById('p2j-bg-white');
  const bgBlackBtn = document.getElementById('p2j-bg-black');
  const bgCustomColorInput = document.getElementById('p2j-bg-custom-color');
  const bgCustomColorHex = document.getElementById('p2j-bg-custom-hex');

  // Controls - Quality & Actions
  const qualitySlider = document.getElementById('p2j-quality-slider');
  const qualityValDisplay = document.getElementById('p2j-quality-val');
  const qualityLabelDisplay = document.getElementById('p2j-quality-label');
  const convertActionBtn = document.getElementById('p2j-convert-btn');

  // Single Mode Elements
  const previewOrigImg = document.getElementById('p2j-preview-orig');
  const previewJpgImg = document.getElementById('p2j-preview-jpg');
  const badgeOrig = document.getElementById('p2j-badge-orig');
  const badgeJpg = document.getElementById('p2j-badge-jpg');
  const statOrigName = document.getElementById('p2j-stat-orig-name');
  const statOrigSize = document.getElementById('p2j-stat-orig-size');
  const statOrigDim = document.getElementById('p2j-stat-orig-dim');
  const statOrigRatio = document.getElementById('p2j-stat-orig-ratio');
  const statJpgName = document.getElementById('p2j-stat-jpg-name');
  const statJpgSize = document.getElementById('p2j-stat-jpg-size');
  const statJpgDim = document.getElementById('p2j-stat-jpg-dim');
  const statSizeDiff = document.getElementById('p2j-stat-size-diff');
  const downloadSingleBtn = document.getElementById('p2j-download-single');
  const resetSingleBtn = document.getElementById('p2j-reset-single');

  // Internal State
  let activeUrls = [];
  let currentFile = null;
  let currentImage = null;
  let hasTransparency = false;
  let selectedBgColor = '#ffffff'; // default white background
  let selectedQuality = 0.90; // default 90%
  let batchItems = [];
  let isConverting = false;
  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

  function formatBytes(bytes) {
    if (!bytes || bytes <= 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const val = bytes / Math.pow(k, i);
    return (val >= 100 || i === 0 ? val.toFixed(0) : val.toFixed(1)) + ' ' + sizes[i];
  }

  function getAspectRatioString(w, h) {
    function gcd(a, b) {
      return b === 0 ? a : gcd(b, a % b);
    }
    const divisor = gcd(w, h);
    const rw = w / divisor;
    const rh = h / divisor;
    if (rw <= 20 && rh <= 20) return `${rw}:${rh}`;
    return (w / h).toFixed(2) + ':1';
  }

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

  function cleanupUrls() {
    activeUrls.forEach((url) => {
      try {
        URL.revokeObjectURL(url);
      } catch (e) {}
    });
    activeUrls = [];
  }

  function resetAll() {
    cleanupUrls();
    currentFile = null;
    currentImage = null;
    hasTransparency = false;
    batchItems = [];
    isConverting = false;

    if (fileInput) fileInput.value = '';
    if (previewOrigImg) previewOrigImg.src = '';
    if (previewJpgImg) previewJpgImg.src = '';
    if (batchList) batchList.innerHTML = '';
    hideAlert();
    if (transparencyNotice) transparencyNotice.classList.add('hidden');

    if (workspaceSingle) workspaceSingle.classList.add('hidden');
    if (workspaceBatch) workspaceBatch.classList.add('hidden');
    if (uploadSection) uploadSection.classList.remove('hidden');
  }

  // Detect whether image has transparent pixels
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

  // Convert a single image element to JPG Blob with background compositing
  function encodeToJpgBlob(img, file, bgColor, quality) {
    return new Promise((resolve, reject) => {
      try {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // 1. Fill solid background color for transparency compositing
        ctx.fillStyle = bgColor || '#ffffff';
        ctx.fillRect(0, 0, w, h);

        // 2. Draw PNG image onto canvas
        ctx.drawImage(img, 0, 0, w, h);

        // 3. Export as JPEG with specified quality
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Canvas failed to encode JPG image.'));
            return;
          }
          const jpgUrl = URL.createObjectURL(blob);
          activeUrls.push(jpgUrl);
          const baseName = file.name.replace(/\.png$/i, '');
          const jpgName = `${baseName}.jpg`;

          resolve({
            file,
            jpgBlob: blob,
            jpgUrl,
            width: w,
            height: h,
            jpgName,
            quality
          });
        }, 'image/jpeg', quality);
      } catch (err) {
        reject(err);
      }
    });
  }

  // Render Single Image Workspace
  async function renderSingleConversion() {
    if (!currentImage || !currentFile || isConverting) return;

    isConverting = true;
    if (loadingOverlay) {
      loadingOverlay.classList.remove('hidden');
      loadingOverlay.classList.add('flex');
    }
    if (loadingText) loadingText.textContent = 'Converting PNG to JPG with selected background...';
    hideAlert();

    await new Promise((r) => setTimeout(r, 20));

    try {
      const result = await encodeToJpgBlob(currentImage, currentFile, selectedBgColor, selectedQuality);

      if (previewJpgImg) previewJpgImg.src = result.jpgUrl;
      if (badgeJpg) badgeJpg.textContent = `${formatBytes(result.jpgBlob.size)} • ${result.width}×${result.height}`;

      if (statJpgName) statJpgName.textContent = result.jpgName;
      if (statJpgSize) statJpgSize.textContent = formatBytes(result.jpgBlob.size);
      if (statJpgDim) statJpgDim.textContent = `${result.width} × ${result.height} px`;

      // Size comparison
      if (statSizeDiff) {
        const diff = currentFile.size - result.jpgBlob.size;
        if (diff > 0) {
          const pct = ((diff / currentFile.size) * 100).toFixed(1);
          statSizeDiff.innerHTML = `-${pct}% (${formatBytes(diff)} saved) <span class="block text-[10px] font-normal text-emerald-600 dark:text-emerald-400">Smaller file size with JPEG compression</span>`;
          statSizeDiff.className = 'mt-1 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 sm:text-sm';
        } else {
          const pct = ((-diff / currentFile.size) * 100).toFixed(1);
          statSizeDiff.innerHTML = `+${pct}% (${formatBytes(-diff)} larger) <span class="block text-[10px] font-normal text-slate-400">High quality setting on graphic artwork</span>`;
          statSizeDiff.className = 'mt-1 font-mono text-xs font-bold text-slate-700 dark:text-slate-300 sm:text-sm';
        }
      }

      // Download button
      if (downloadSingleBtn) {
        downloadSingleBtn.onclick = () => {
          const a = document.createElement('a');
          a.href = result.jpgUrl;
          a.download = result.jpgName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };
      }

    } catch (err) {
      console.error(err);
      showAlert('Conversion failed: ' + (err.message || 'Please check your image.'));
    } finally {
      isConverting = false;
      if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
        loadingOverlay.classList.remove('flex');
      }
    }
  }

  // Load selected single file
  function handleSingleSelect(file) {
    cleanupUrls();
    currentFile = file;

    const origBlobUrl = URL.createObjectURL(file);
    activeUrls.push(origBlobUrl);

    const img = new Image();
    img.onload = () => {
      currentImage = img;
      hasTransparency = checkTransparency(img);

      // Transparency notice
      if (transparencyNotice) {
        if (hasTransparency) {
          transparencyNotice.innerHTML = `
            <strong>Transparency Detected:</strong> This PNG contains transparent regions. Since JPG does not support transparency, transparent areas will be filled with your selected background color below.
          `;
          transparencyNotice.classList.remove('hidden');
        } else {
          transparencyNotice.classList.add('hidden');
        }
      }

      // Display Original Previews & Info
      if (previewOrigImg) previewOrigImg.src = origBlobUrl;
      if (badgeOrig) badgeOrig.textContent = `${formatBytes(file.size)} • ${img.naturalWidth}×${img.naturalHeight}`;

      if (statOrigName) statOrigName.textContent = file.name;
      if (statOrigSize) statOrigSize.textContent = formatBytes(file.size);
      if (statOrigDim) statOrigDim.textContent = `${img.naturalWidth} × ${img.naturalHeight} px`;
      if (statOrigRatio) statOrigRatio.textContent = getAspectRatioString(img.naturalWidth, img.naturalHeight);

      // Switch panels
      if (uploadSection) uploadSection.classList.add('hidden');
      if (workspaceBatch) workspaceBatch.classList.add('hidden');
      if (workspaceSingle) workspaceSingle.classList.remove('hidden');

      // Trigger conversion
      renderSingleConversion();
    };

    img.onerror = () => {
      showAlert('Could not decode PNG image. The file may be corrupt or not a true PNG.');
      resetAll();
    };

    img.src = origBlobUrl;
  }

  // Handle batch selection
  async function handleBatchSelect(files) {
    cleanupUrls();
    batchItems = [];
    isConverting = true;

    if (loadingOverlay) {
      loadingOverlay.classList.remove('hidden');
      loadingOverlay.classList.add('flex');
    }
    if (loadingText) loadingText.textContent = `Converting ${files.length} PNG images to JPG...`;

    await new Promise((r) => setTimeout(r, 20));

    try {
      for (const file of files) {
        const origUrl = URL.createObjectURL(file);
        activeUrls.push(origUrl);

        const img = await new Promise((res, rej) => {
          const image = new Image();
          image.onload = () => res(image);
          image.onerror = () => rej(new Error(`Failed to decode "${file.name}"`));
          image.src = origUrl;
        });

        const result = await encodeToJpgBlob(img, file, selectedBgColor, selectedQuality);
        batchItems.push(result);
      }

      // Render batch UI
      if (uploadSection) uploadSection.classList.add('hidden');
      if (workspaceSingle) workspaceSingle.classList.add('hidden');
      if (workspaceBatch) workspaceBatch.classList.remove('hidden');

      if (batchCountBadge) batchCountBadge.textContent = `${batchItems.length} Images Converted`;

      if (batchList) {
        batchList.innerHTML = '';
        batchItems.forEach((item, index) => {
          const card = document.createElement('div');
          card.className = 'flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-2xs dark:border-slate-800 dark:bg-slate-900';

          card.innerHTML = `
            <div class="flex items-center gap-3.5 w-full sm:w-auto">
              <img src="${item.jpgUrl}" alt="${item.jpgName}" class="h-12 w-12 rounded-xl object-contain bg-slate-100 dark:bg-slate-800 p-1 shrink-0 border border-slate-200 dark:border-slate-700" />
              <div class="min-w-0 flex-1">
                <div class="truncate text-xs font-bold text-slate-900 dark:text-white">${item.jpgName}</div>
                <div class="text-[11px] text-slate-500 dark:text-slate-400">
                  ${item.width}×${item.height} px • <span class="line-through">${formatBytes(item.file.size)}</span> → <strong class="text-blue-600 dark:text-blue-400">${formatBytes(item.jpgBlob.size)}</strong>
                </div>
              </div>
            </div>
            <button
              type="button"
              data-index="${index}"
              class="p2j-batch-download-item w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-2xs hover:bg-blue-700 transition cursor-pointer"
            >
              <span>📥 Download JPG</span>
            </button>
          `;

          batchList.appendChild(card);
        });

        // Individual item download handlers
        const itemBtns = batchList.querySelectorAll('.p2j-batch-download-item');
        itemBtns.forEach((btn) => {
          btn.addEventListener('click', (e) => {
            const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
            const item = batchItems[idx];
            if (item) {
              const a = document.createElement('a');
              a.href = item.jpgUrl;
              a.download = item.jpgName;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }
          });
        });
      }

      // Batch Download All
      if (batchDownloadAllBtn) {
        batchDownloadAllBtn.onclick = () => {
          batchItems.forEach((item, i) => {
            setTimeout(() => {
              const a = document.createElement('a');
              a.href = item.jpgUrl;
              a.download = item.jpgName;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }, i * 250);
          });
        };
      }

    } catch (err) {
      console.error(err);
      showAlert(err.message || 'An error occurred during batch conversion.');
      resetAll();
    } finally {
      isConverting = false;
      if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
        loadingOverlay.classList.remove('flex');
      }
    }
  }

  // Process incoming files
  function handleFiles(fileList) {
    if (!fileList || fileList.length === 0) return;
    hideAlert();

    const rawFiles = Array.from(fileList);
    const validFiles = [];

    for (const f of rawFiles) {
      const ext = f.name.split('.').pop().toLowerCase();
      const isPng = ext === 'png' || f.type === 'image/png';

      if (!isPng) {
        showAlert(`"${f.name}" is not a PNG file. Supported format: PNG. To convert JPG to PNG, please use our JPG to PNG converter.`, true);
        return;
      }
      if (f.size > MAX_FILE_SIZE) {
        showAlert(`"${f.name}" exceeds the 50MB file size limit. Please upload images under 50MB.`, true);
        return;
      }
      validFiles.push(f);
    }

    if (validFiles.length === 1) {
      handleSingleSelect(validFiles[0]);
    } else if (validFiles.length > 1) {
      handleBatchSelect(validFiles);
    }
  }

  // Setup Drag & Drop
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
        handleFiles(files);
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
        handleFiles(files);
      }
    });
  }

  // Clipboard Paste Support
  window.addEventListener('paste', (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    const pasted = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) pasted.push(file);
      }
    }
    if (pasted.length > 0) {
      handleFiles(pasted);
    }
  });

  // Background Color Controls
  function setActiveBg(btn, color) {
    selectedBgColor = color;
    [bgWhiteBtn, bgBlackBtn].forEach((b) => {
      if (b) {
        b.classList.remove('border-blue-600', 'ring-2', 'ring-blue-500/30');
        b.classList.add('border-slate-200', 'dark:border-slate-700');
      }
    });
    if (btn) {
      btn.classList.add('border-blue-600', 'ring-2', 'ring-blue-500/30');
      btn.classList.remove('border-slate-200', 'dark:border-slate-700');
    }
    if (currentImage) renderSingleConversion();
  }

  if (bgWhiteBtn) {
    bgWhiteBtn.addEventListener('click', () => setActiveBg(bgWhiteBtn, '#ffffff'));
  }
  if (bgBlackBtn) {
    bgBlackBtn.addEventListener('click', () => setActiveBg(bgBlackBtn, '#000000'));
  }
  if (bgCustomColorInput) {
    bgCustomColorInput.addEventListener('input', (e) => {
      const color = e.target.value;
      selectedBgColor = color;
      if (bgCustomColorHex) bgCustomColorHex.textContent = color.toUpperCase();
      [bgWhiteBtn, bgBlackBtn].forEach((b) => {
        if (b) b.classList.remove('border-blue-600', 'ring-2', 'ring-blue-500/30');
      });
    });
    bgCustomColorInput.addEventListener('change', () => {
      if (currentImage) renderSingleConversion();
    });
  }

  // Quality Slider
  if (qualitySlider) {
    qualitySlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      selectedQuality = val / 100;
      if (qualityValDisplay) qualityValDisplay.textContent = `${val}%`;
      if (qualityLabelDisplay) {
        if (val < 40) qualityLabelDisplay.textContent = '(Low)';
        else if (val < 75) qualityLabelDisplay.textContent = '(Medium)';
        else qualityLabelDisplay.textContent = '(High)';
      }
    });
    qualitySlider.addEventListener('change', () => {
      if (currentImage) renderSingleConversion();
    });
  }

  // Convert Button Click
  if (convertActionBtn) {
    convertActionBtn.addEventListener('click', () => {
      if (currentImage) renderSingleConversion();
    });
  }

  // Reset Listeners
  if (resetSingleBtn) resetSingleBtn.addEventListener('click', resetAll);
  if (batchResetBtn) batchResetBtn.addEventListener('click', resetAll);

  // Unload cleanup
  window.addEventListener('beforeunload', cleanupUrls);

})();
