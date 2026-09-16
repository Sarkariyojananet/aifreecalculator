/**
 * Client-Side JPG to PNG Converter
 * 100% Browser-Side Execution - Zero Server or Cloudflare Worker Compute
 * Genuine HTML5 Canvas & Blob image/png encoding
 * Supports Single & Multi-Image Batch Conversion
 */

(function () {
  'use strict';

  // DOM Elements
  const dropZone = document.getElementById('j2p-drop-zone');
  const fileInput = document.getElementById('j2p-file-input');
  const selectFileBtn = document.getElementById('j2p-select-file-btn');
  const uploadSection = document.getElementById('j2p-upload-section');
  const workspaceSingle = document.getElementById('j2p-workspace-single');
  const workspaceBatch = document.getElementById('j2p-workspace-batch');
  const batchList = document.getElementById('j2p-batch-list');
  const batchDownloadAllBtn = document.getElementById('j2p-batch-download-all');
  const batchResetBtn = document.getElementById('j2p-batch-reset');
  const batchCountBadge = document.getElementById('j2p-batch-count');
  
  const loadingOverlay = document.getElementById('j2p-loading-overlay');
  const loadingText = document.getElementById('j2p-loading-text');
  const alertBox = document.getElementById('j2p-alert-box');
  const alertText = document.getElementById('j2p-alert-text');

  // Single Mode Elements
  const previewOrigImg = document.getElementById('j2p-preview-orig');
  const previewPngImg = document.getElementById('j2p-preview-png');
  const badgeOrig = document.getElementById('j2p-badge-orig');
  const badgePng = document.getElementById('j2p-badge-png');
  const statOrigName = document.getElementById('j2p-stat-orig-name');
  const statOrigSize = document.getElementById('j2p-stat-orig-size');
  const statOrigDim = document.getElementById('j2p-stat-orig-dim');
  const statPngName = document.getElementById('j2p-stat-png-name');
  const statPngSize = document.getElementById('j2p-stat-png-size');
  const statPngDim = document.getElementById('j2p-stat-png-dim');
  const statSizeDiff = document.getElementById('j2p-stat-size-diff');
  const downloadSingleBtn = document.getElementById('j2p-download-single');
  const resetSingleBtn = document.getElementById('j2p-reset-single');

  // State
  let activeUrls = [];
  let batchItems = []; // Array of { file, origUrl, pngBlob, pngUrl, width, height, pngName }
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
    batchItems = [];
    isConverting = false;

    if (fileInput) fileInput.value = '';
    if (previewOrigImg) previewOrigImg.src = '';
    if (previewPngImg) previewPngImg.src = '';
    if (batchList) batchList.innerHTML = '';
    hideAlert();

    if (workspaceSingle) workspaceSingle.classList.add('hidden');
    if (workspaceBatch) workspaceBatch.classList.add('hidden');
    if (uploadSection) uploadSection.classList.remove('hidden');
  }

  // Convert single image file to PNG blob via Canvas
  function convertJpgToPngBlob(file) {
    return new Promise((resolve, reject) => {
      const origBlobUrl = URL.createObjectURL(file);
      activeUrls.push(origBlobUrl);

      const img = new Image();
      img.onload = () => {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Canvas failed to produce PNG data.'));
            return;
          }
          const pngUrl = URL.createObjectURL(blob);
          activeUrls.push(pngUrl);
          const baseName = file.name.replace(/\.(jpe?g)$/i, '');
          const pngName = `${baseName}.png`;

          resolve({
            file,
            origUrl: origBlobUrl,
            pngBlob: blob,
            pngUrl,
            width: w,
            height: h,
            pngName
          });
        }, 'image/png');
      };

      img.onerror = () => {
        reject(new Error(`Could not decode "${file.name}". Ensure it is a valid JPG/JPEG file.`));
      };

      img.src = origBlobUrl;
    });
  }

  // Handle single file presentation
  function displaySingle(item) {
    if (uploadSection) uploadSection.classList.add('hidden');
    if (workspaceBatch) workspaceBatch.classList.add('hidden');
    if (workspaceSingle) workspaceSingle.classList.remove('hidden');

    // Previews
    if (previewOrigImg) previewOrigImg.src = item.origUrl;
    if (previewPngImg) previewPngImg.src = item.pngUrl;
    if (badgeOrig) badgeOrig.textContent = `${formatBytes(item.file.size)} • ${item.width}×${item.height}`;
    if (badgePng) badgePng.textContent = `${formatBytes(item.pngBlob.size)} • ${item.width}×${item.height}`;

    // Stats
    if (statOrigName) statOrigName.textContent = item.file.name;
    if (statOrigSize) statOrigSize.textContent = formatBytes(item.file.size);
    if (statOrigDim) statOrigDim.textContent = `${item.width} × ${item.height} px`;

    if (statPngName) statPngName.textContent = item.pngName;
    if (statPngSize) statPngSize.textContent = formatBytes(item.pngBlob.size);
    if (statPngDim) statPngDim.textContent = `${item.width} × ${item.height} px`;

    // Size comparison note
    if (statSizeDiff) {
      const diff = item.pngBlob.size - item.file.size;
      if (diff > 0) {
        const pct = ((diff / item.file.size) * 100).toFixed(0);
        statSizeDiff.innerHTML = `+${pct}% (${formatBytes(diff)} larger) <span class="block text-[10px] font-normal text-slate-400">Normal: PNG uses lossless deflate compression</span>`;
        statSizeDiff.className = 'mt-1 font-mono text-xs font-bold text-amber-600 dark:text-amber-400 sm:text-sm';
      } else {
        const pct = ((-diff / item.file.size) * 100).toFixed(0);
        statSizeDiff.innerHTML = `-${pct}% (${formatBytes(-diff)} smaller)`;
        statSizeDiff.className = 'mt-1 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 sm:text-sm';
      }
    }

    // Download Single
    if (downloadSingleBtn) {
      downloadSingleBtn.onclick = () => {
        const a = document.createElement('a');
        a.href = item.pngUrl;
        a.download = item.pngName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };
    }
  }

  // Handle batch file presentation
  function displayBatch(items) {
    if (uploadSection) uploadSection.classList.add('hidden');
    if (workspaceSingle) workspaceSingle.classList.add('hidden');
    if (workspaceBatch) workspaceBatch.classList.remove('hidden');

    if (batchCountBadge) {
      batchCountBadge.textContent = `${items.length} Images Converted`;
    }

    if (batchList) {
      batchList.innerHTML = '';
      items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-2xs dark:border-slate-800 dark:bg-slate-900';

        card.innerHTML = `
          <div class="flex items-center gap-3.5 w-full sm:w-auto">
            <img src="${item.pngUrl}" alt="${item.pngName}" class="h-12 w-12 rounded-xl object-contain bg-slate-100 dark:bg-slate-800 p-1 shrink-0 border border-slate-200 dark:border-slate-700" />
            <div class="min-w-0 flex-1">
              <div class="truncate text-xs font-bold text-slate-900 dark:text-white">${item.pngName}</div>
              <div class="text-[11px] text-slate-500 dark:text-slate-400">
                ${item.width}×${item.height} px • <span class="line-through">${formatBytes(item.file.size)}</span> → <strong class="text-blue-600 dark:text-blue-400">${formatBytes(item.pngBlob.size)}</strong>
              </div>
            </div>
          </div>
          <button
            type="button"
            data-index="${index}"
            class="j2p-batch-download-item w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-2xs hover:bg-blue-700 transition cursor-pointer"
          >
            <span>📥 Download PNG</span>
          </button>
        `;

        batchList.appendChild(card);
      });

      // Attach individual download handlers
      const itemBtns = batchList.querySelectorAll('.j2p-batch-download-item');
      itemBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
          const item = items[idx];
          if (item) {
            const a = document.createElement('a');
            a.href = item.pngUrl;
            a.download = item.pngName;
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
        items.forEach((item, i) => {
          setTimeout(() => {
            const a = document.createElement('a');
            a.href = item.pngUrl;
            a.download = item.pngName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }, i * 250); // slight stagger for multiple browser downloads
        });
      };
    }
  }

  // Process selected files
  async function handleFiles(fileList) {
    if (!fileList || fileList.length === 0) return;
    hideAlert();

    const rawFiles = Array.from(fileList);
    const validFiles = [];

    for (const f of rawFiles) {
      const ext = f.name.split('.').pop().toLowerCase();
      const isJpg = ext === 'jpg' || ext === 'jpeg' || f.type === 'image/jpeg' || f.type === 'image/jpg';

      if (!isJpg) {
        showAlert(`"${f.name}" is not a JPG/JPEG file. Only JPG and JPEG formats are supported by this converter. To convert other formats, explore our Free Online Tools.`, true);
        return;
      }
      if (f.size > MAX_FILE_SIZE) {
        showAlert(`"${f.name}" is larger than 50MB. Please select images under 50MB.`, true);
        return;
      }
      validFiles.push(f);
    }

    if (validFiles.length === 0) return;

    cleanupUrls();
    batchItems = [];
    isConverting = true;

    if (loadingOverlay) {
      loadingOverlay.classList.remove('hidden');
      loadingOverlay.classList.add('flex');
    }
    if (loadingText) {
      loadingText.textContent = validFiles.length === 1 ? 'Converting JPG to PNG...' : `Converting ${validFiles.length} JPG files to PNG...`;
    }

    await new Promise((r) => setTimeout(r, 20));

    try {
      for (const file of validFiles) {
        const item = await convertJpgToPngBlob(file);
        batchItems.push(item);
      }

      if (batchItems.length === 1) {
        displaySingle(batchItems[0]);
      } else {
        displayBatch(batchItems);
      }
    } catch (err) {
      console.error(err);
      showAlert(err.message || 'An error occurred during conversion.');
      resetAll();
    } finally {
      isConverting = false;
      if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
        loadingOverlay.classList.remove('flex');
      }
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

  // Reset Listeners
  if (resetSingleBtn) resetSingleBtn.addEventListener('click', resetAll);
  if (batchResetBtn) batchResetBtn.addEventListener('click', resetAll);

  // Unload cleanup
  window.addEventListener('beforeunload', cleanupUrls);

})();
