/**
 * Passport Size Photo Maker & Printable Sheet Generator (aifreecalculator.com)
 * 100% Client-Side Interactive HTML5 Canvas & jsPDF Engine
 */

(function () {
  'use strict';

  // --- Country Passport / Visa Size Presets ---
  const SIZE_PRESETS = {
    'india_35x45': {
      id: 'india_35x45',
      name: '3.5 CM x 4.5 CM',
      subname: '35 MM x 45 MM',
      desc: 'India, Philippines, UK, Europe, Australia',
      wMm: 35,
      hMm: 45,
      aspectRatio: 35 / 45
    },
    'india': {
      id: 'india',
      name: '3.5 CM x 4.5 CM',
      subname: '35 MM x 45 MM',
      desc: 'India, Philippines, UK, Europe, Australia',
      wMm: 35,
      hMm: 45,
      aspectRatio: 35 / 45
    },
    'usa_2x2': {
      id: 'usa_2x2',
      name: '2 Inch X 2 Inch',
      subname: '51 MM x 51 MM',
      desc: 'USA, OCI Card',
      wMm: 50.8,
      hMm: 50.8,
      aspectRatio: 1
    },
    'us': {
      id: 'us',
      name: '2 Inch X 2 Inch',
      subname: '51 MM x 51 MM',
      desc: 'USA, OCI Card',
      wMm: 50.8,
      hMm: 50.8,
      aspectRatio: 1
    },
    'canada_50x70': {
      id: 'canada_50x70',
      name: '50 MM x 70 MM',
      subname: '5 CM x 7 CM',
      desc: 'Canada',
      wMm: 50,
      hMm: 70,
      aspectRatio: 50 / 70
    },
    'canada': {
      id: 'canada',
      name: '50 MM x 70 MM',
      subname: '5 CM x 7 CM',
      desc: 'Canada',
      wMm: 50,
      hMm: 70,
      aspectRatio: 50 / 70
    },
    'custom': {
      id: 'custom',
      name: 'Custom',
      subname: 'Custom Size',
      desc: 'User Defined Dimensions',
      wMm: 35,
      hMm: 45,
      aspectRatio: 35 / 45
    }
  };

  const MM_TO_INCH = 1 / 25.4;
  const DPI = 300;

  function mmToPx(mm, dpi = DPI) {
    return Math.round(mm * MM_TO_INCH * dpi);
  }

  function normalizeSheetFormat(fmt) {
    if (!fmt) return '3a4';
    const s = String(fmt).toLowerCase().trim();
    if (s === '3-a4' || s === '3a4' || s === '1/3a4' || s === '1-3-a4' || s === 'strip') return '3a4';
    if (s === '4x6' || s === '4*6' || s === '4-6') return '4x6';
    if (s === 'a4') return 'a4';
    return s;
  }

  // --- App State ---
  const state = {
    // Current Wizard Step: 'size' | 'crop' | 'background' | 'download'
    step: 'size',
    dpi: 300,

    // Raw and Processed Images
    rawImage: null,          // HTMLImageElement
    rawImageUrl: null,       // Track object URL for revoking
    rawImageFilename: 'passport_photo',
    croppedBitmapCanvas: null, // HTMLCanvasElement with cropped output
    finalSingleCanvas: null,   // Finished single photo canvas

    // Step 1: Size
    selectedPresetId: 'india_35x45',
    photoWidthMm: 35,
    photoHeightMm: 45,
    customUnit: 'cm',

    // Step 2: Interactive Live Crop Box (Default: Freely Croppable)
    cropBox: { x: 50, y: 30, w: 200, h: 257 },
    cropScaleRatio: 1, // mapping between canvas display size and raw image
    activeHandle: null,
    isDraggingCrop: false,
    dragStart: { x: 0, y: 0, boxX: 0, boxY: 0, boxW: 0, boxH: 0 },
    cropRatioLocked: false, // Default to freeform manual crop

    // Adjustments
    brightness: 100,
    contrast: 100,
    saturation: 100,
    zoomFactor: 1.0,

    // Step 3: Background & Name/Date
    bgStyle: 'original', // 'original' | 'color'
    bgColor: '#ffffff',
    bgTolerance: 25,
    bgSampleColor: null,
    isPickingBgColor: false,
    segmentedPersonCanvas: null,
    writeNameDate: false,
    personName: '',
    personDate: '',

    // Step 4: Download & Sheet
    targetFileSize: 'max', // Default to Original Quality (Max)
    sheetFormat: '3a4',    // 'a4' | '3a4' | '4x6'
    sheetCustomCount: 8
  };

  // --- Cached DOM Elements ---
  const el = {};

  function init() {
    cacheElements();
    bindEvents();
  }

  function cacheElements() {
    // Hero Dropzone
    el.heroUpload = document.getElementById('passport-hero-upload');
    el.fileInput = document.getElementById('passport-file-input');
    el.browseBtn = document.getElementById('passport-browse-btn');
    el.dropZone = document.getElementById('passport-drop-zone');

    // Main Studio / Wizard container
    el.studioContainer = document.getElementById('passport-studio-container');

    // Step Navigation Tabs
    el.stepTabs = document.querySelectorAll('.wizard-step-tab');

    // Panels
    el.panelSize = document.getElementById('panel-step-size');
    el.panelCrop = document.getElementById('panel-step-crop');
    el.panelBg = document.getElementById('panel-step-bg');
    el.panelDownload = document.getElementById('panel-step-download');

    // Step 1: Size
    el.sizeCards = document.querySelectorAll('.passport-size-card');
    el.inputDpi = document.getElementById('passport-dpi-input');
    el.customW = document.getElementById('custom-size-w');
    el.customH = document.getElementById('custom-size-h');
    el.customUnitRadios = document.querySelectorAll('input[name="custom-unit"]');
    el.btnNextToCrop = document.getElementById('btn-size-next');

    // Step 2: Crop
    el.cropCanvas = document.getElementById('crop-canvas');
    el.cropCtx = el.cropCanvas ? el.cropCanvas.getContext('2d') : null;
    el.cropCanvasWrapper = document.getElementById('crop-canvas-wrapper');
    el.btnCropZoomIn = document.getElementById('btn-crop-zoom-in');
    el.btnCropZoomOut = document.getElementById('btn-crop-zoom-out');
    el.btnCropBrightness = document.getElementById('btn-crop-brightness');
    el.btnCropContrast = document.getElementById('btn-crop-contrast');
    el.btnCropSaturation = document.getElementById('btn-crop-saturation');
    el.cropSliderBar = document.getElementById('crop-slider-bar');
    el.cropSlider = document.getElementById('crop-adjustment-slider');
    el.cropSliderLabel = document.getElementById('crop-slider-label');
    el.btnResetAdjust = document.getElementById('btn-reset-crop-adjust');
    el.btnCropLockRatio = document.getElementById('btn-crop-lock-ratio');
    el.cropRatioIcon = document.getElementById('crop-ratio-icon');
    el.cropRatioText = document.getElementById('crop-ratio-text');
    el.btnCropReset = document.getElementById('btn-crop-reset');
    el.btnCropBack = document.getElementById('btn-crop-back');
    el.btnCropNext = document.getElementById('btn-crop-next');

    // Step 3: Background
    el.cardBgOriginal = document.getElementById('card-bg-original');
    el.cardBgColor = document.getElementById('card-bg-color');
    el.canvasPreviewOriginal = document.getElementById('canvas-preview-original');
    el.canvasPreviewColor = document.getElementById('canvas-preview-color');
    el.bgColorInput = document.getElementById('bg-color-picker');
    el.colorSwatches = document.querySelectorAll('.bg-swatch-btn');
    el.bgToleranceSlider = document.getElementById('bg-tolerance-slider');
    el.bgToleranceVal = document.getElementById('bg-tolerance-val');
    el.btnPickBgColor = document.getElementById('btn-pick-bg-color');
    el.pickBgBtnText = document.getElementById('pick-bg-btn-text');
    el.checkNameDate = document.getElementById('check-name-date');
    el.nameDateFields = document.getElementById('name-date-inputs');
    el.inputPersonName = document.getElementById('input-person-name');
    el.inputPersonDate = document.getElementById('input-person-date');
    el.btnBgBack = document.getElementById('btn-bg-back');
    el.btnBgToDownload = document.getElementById('btn-bg-to-download');

    // Step 4: Download
    el.downloadSingleCanvas = document.getElementById('download-single-canvas');
    el.downloadSheetCanvas = document.getElementById('download-sheet-canvas');
    el.singleDimLabel = document.getElementById('download-single-dimensions');
    el.targetKbSelect = document.getElementById('target-kb-select');
    el.sheetRadios = document.querySelectorAll('input[name="sheet-format"]');
    el.btnDownloadSingleJpg = document.getElementById('btn-download-single-jpg');
    el.btnDownloadSinglePng = document.getElementById('btn-download-single-png');
    el.btnDownloadSheetPdf = document.getElementById('btn-download-sheet-pdf');
    el.btnDownloadSheetJpg = document.getElementById('btn-download-sheet-jpg');
    el.btnMakeNewImage = document.getElementById('btn-make-new-image');
    el.btnDownloadBack = document.getElementById('btn-download-back');
  }

  // --- Wizard Step Navigation ---
  function setStep(newStep) {
    if (newStep === 'bg') newStep = 'background';
    if (newStep !== 'size' && !state.rawImage) return; // Block step changes until image uploaded

    state.step = newStep;

    // Update active tab styles & accessibility attributes
    if (el.stepTabs) {
      el.stepTabs.forEach(tab => {
        let tabStep = tab.dataset.step;
        if (tabStep === 'bg') tabStep = 'background';
        const isCurrent = (tabStep === newStep);
        tab.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
        if (isCurrent) {
          tab.classList.add('bg-blue-700', 'text-white', 'shadow-sm', 'font-bold');
          tab.classList.remove('text-slate-600', 'dark:text-slate-300', 'font-semibold', 'hover:text-slate-900', 'dark:hover:text-white');
        } else {
          tab.classList.remove('bg-blue-700', 'text-white', 'shadow-sm', 'font-bold');
          tab.classList.add('text-slate-600', 'dark:text-slate-300', 'font-semibold', 'hover:text-slate-900', 'dark:hover:text-white');
        }
      });
    }

    // Toggle Panels
    const panels = [
      { step: 'size', el: el.panelSize },
      { step: 'crop', el: el.panelCrop },
      { step: 'background', el: el.panelBg },
      { step: 'download', el: el.panelDownload }
    ];

    panels.forEach(p => {
      if (p.el) {
        if (p.step === newStep) {
          p.el.classList.remove('hidden');
        } else {
          p.el.classList.add('hidden');
        }
      }
    });

    // Step-specific initializations
    if (newStep === 'crop') {
      initCropWorkspace();
    } else if (newStep === 'background') {
      renderBackgroundStep();
    } else if (newStep === 'download') {
      loadJsPdf().catch(() => {});
      renderDownloadStep();
    }

    // Smooth scroll to studio top
    if (el.studioContainer) {
      el.studioContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // --- Bind All Events ---
  let cropEventsBound = false;
  let windowCropEventsBound = false;

  function bindEvents() {
    if (el.studioContainer && el.studioContainer.dataset.passportBound === 'true') {
      return;
    }
    if (el.studioContainer) {
      el.studioContainer.dataset.passportBound = 'true';
    }

    // 1. File Upload & Drag & Drop with stopPropagation to prevent double file dialog
    if (el.browseBtn && el.fileInput) {
      el.browseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        el.fileInput.click();
      });
    }
    if (el.dropZone && el.fileInput) {
      el.dropZone.addEventListener('click', (e) => {
        if (e.target === el.browseBtn || el.browseBtn?.contains(e.target)) return;
        el.fileInput.click();
      });
    }
    if (el.fileInput) {
      el.fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          handleUploadedFile(e.target.files[0]);
        }
      });
    }
    if (el.dropZone) {
      ['dragenter', 'dragover'].forEach(name => {
        el.dropZone.addEventListener(name, (e) => {
          e.preventDefault();
          el.dropZone.classList.add('border-blue-500', 'bg-blue-50/50');
        });
      });
      ['dragleave', 'drop'].forEach(name => {
        el.dropZone.addEventListener(name, (e) => {
          e.preventDefault();
          el.dropZone.classList.remove('border-blue-500', 'bg-blue-50/50');
        });
      });
      el.dropZone.addEventListener('drop', (e) => {
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
          handleUploadedFile(e.dataTransfer.files[0]);
        }
      });
    }

    // 2. Step Tabs Navigation (guarded against navigation without uploaded photo)
    if (el.stepTabs) {
      el.stepTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          if (!state.rawImage) return; // Must have image to navigate
          const targetStep = tab.dataset.step;
          if (targetStep) setStep(targetStep);
        });
      });
    }

    // 3. Step 1: Size Selection
    if (el.sizeCards) {
      el.sizeCards.forEach(card => {
        const selectHandler = () => {
          const presetId = card.dataset.preset;
          selectSizePreset(presetId);
        };
        card.addEventListener('click', selectHandler);
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectHandler();
          }
        });
      });
    }
    if (el.inputDpi) {
      el.inputDpi.addEventListener('input', (e) => {
        state.dpi = parseInt(e.target.value, 10) || 300;
        if (state.selectedPresetId === 'custom') updateCustomDimensions();
      });
    }


    if (el.customW) el.customW.addEventListener('input', updateCustomDimensions);
    if (el.customH) el.customH.addEventListener('input', updateCustomDimensions);
    if (el.customUnitRadios) {
      el.customUnitRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
          if (e.target.checked) {
            const newUnit = e.target.value;
            state.customUnit = newUnit;

            // Dynamically convert existing values to the new unit for optimal UX
            if (el.customW && el.customH) {
              const curWmm = state.photoWidthMm;
              const curHmm = state.photoHeightMm;
              if (newUnit === 'cm') {
                el.customW.value = (curWmm / 10).toFixed(1);
                el.customH.value = (curHmm / 10).toFixed(1);
                el.customW.step = '0.1';
                el.customH.step = '0.1';
              } else if (newUnit === 'mm') {
                el.customW.value = Math.round(curWmm);
                el.customH.value = Math.round(curHmm);
                el.customW.step = '1';
                el.customH.step = '1';
              } else if (newUnit === 'inch') {
                el.customW.value = (curWmm / 25.4).toFixed(2);
                el.customH.value = (curHmm / 25.4).toFixed(2);
                el.customW.step = '0.05';
                el.customH.step = '0.05';
              } else if (newUnit === 'px') {
                el.customW.value = Math.round((curWmm / 25.4) * state.dpi);
                el.customH.value = Math.round((curHmm / 25.4) * state.dpi);
                el.customW.step = '1';
                el.customH.step = '1';
              }
            }
            updateCustomDimensions();
          }
        });
      });
    }

    if (el.btnNextToCrop) {
      el.btnNextToCrop.addEventListener('click', () => {
        if (!state.rawImage) return;
        setStep('crop');
      });
    }

    // 4. Step 2: Crop Face Events
    bindCropEvents();

    // 5. Step 3: Background Events
    if (el.cardBgOriginal) {
      const selectOrig = () => {
        state.bgStyle = 'original';
        updateBgCardSelection();
      };
      el.cardBgOriginal.addEventListener('click', selectOrig);
      el.cardBgOriginal.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectOrig();
        }
      });
    }
    if (el.cardBgColor) {
      const selectColor = () => {
        state.bgStyle = 'color';
        updateBgCardSelection();
      };
      el.cardBgColor.addEventListener('click', selectColor);
      el.cardBgColor.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectColor();
        }
      });
    }
    if (el.colorSwatches) {
      el.colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', (e) => {
          e.stopPropagation();
          state.bgStyle = 'color';
          state.bgColor = swatch.dataset.color || '#ffffff';
          if (el.bgColorInput) el.bgColorInput.value = state.bgColor;
          updateBgCardSelection();
          renderBgPreviews();
        });
      });
    }
    if (el.bgColorInput) {
      el.bgColorInput.addEventListener('input', (e) => {
        state.bgStyle = 'color';
        state.bgColor = e.target.value;
        updateBgCardSelection();
        renderBgPreviews();
      });
    }

    if (el.bgToleranceSlider) {
      el.bgToleranceSlider.addEventListener('input', (e) => {
        state.bgTolerance = parseInt(e.target.value, 10);
        if (el.bgToleranceVal) el.bgToleranceVal.textContent = state.bgTolerance + '%';
        generateBackgroundCutout();
        renderBgPreviews();
      });
    }

    if (el.btnPickBgColor) {
      el.btnPickBgColor.addEventListener('click', () => {
        state.isPickingBgColor = !state.isPickingBgColor;
        if (state.isPickingBgColor) {
          if (el.pickBgBtnText) el.pickBgBtnText.textContent = 'Click on Photo...';
          if (el.canvasPreviewOriginal) el.canvasPreviewOriginal.style.cursor = 'crosshair';
          if (el.canvasPreviewColor) el.canvasPreviewColor.style.cursor = 'crosshair';
        } else {
          if (el.pickBgBtnText) el.pickBgBtnText.textContent = 'Pick Color from Photo';
          if (el.canvasPreviewOriginal) el.canvasPreviewOriginal.style.cursor = 'default';
          if (el.canvasPreviewColor) el.canvasPreviewColor.style.cursor = 'default';
        }
      });
    }

    function handleEyedropperSample(targetCanvas, e) {
      if (!state.isPickingBgColor || !state.croppedBitmapCanvas || !targetCanvas) return;
      const rect = targetCanvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const scaleX = targetCanvas.width / rect.width;
      const scaleY = targetCanvas.height / rect.height;

      const px = Math.max(0, Math.min(targetCanvas.width - 1, Math.floor(clickX * scaleX)));
      const py = Math.max(0, Math.min(targetCanvas.height - 1, Math.floor(clickY * scaleY)));

      // Sample original photo pixel data for true source color
      const srcCtx = state.croppedBitmapCanvas.getContext('2d');
      if (!srcCtx) return;
      if (!targetCanvas.width || !targetCanvas.height || !state.croppedBitmapCanvas.width || !state.croppedBitmapCanvas.height) return;

      const origX = Math.round(px * (state.croppedBitmapCanvas.width / targetCanvas.width));
      const origY = Math.round(py * (state.croppedBitmapCanvas.height / targetCanvas.height));
      const pixel = srcCtx.getImageData(origX, origY, 1, 1).data;

      state.bgSampleColor = { r: pixel[0], g: pixel[1], b: pixel[2] };
      state.isPickingBgColor = false;
      if (el.canvasPreviewOriginal) el.canvasPreviewOriginal.style.cursor = 'default';
      if (el.canvasPreviewColor) el.canvasPreviewColor.style.cursor = 'default';
      if (el.pickBgBtnText) el.pickBgBtnText.textContent = 'Color Sampled! ✓';
      setTimeout(() => {
        if (el.pickBgBtnText) el.pickBgBtnText.textContent = 'Pick Color from Photo';
      }, 2000);

      generateBackgroundCutout();
      renderBgPreviews();
    }

    if (el.canvasPreviewOriginal) {
      el.canvasPreviewOriginal.addEventListener('click', (e) => handleEyedropperSample(el.canvasPreviewOriginal, e));
    }
    if (el.canvasPreviewColor) {
      el.canvasPreviewColor.addEventListener('click', (e) => handleEyedropperSample(el.canvasPreviewColor, e));
    }

    if (el.checkNameDate) {
      el.checkNameDate.addEventListener('change', (e) => {
        state.writeNameDate = e.target.checked;
        if (el.nameDateFields) {
          el.nameDateFields.classList.toggle('hidden', !state.writeNameDate);
        }
        renderBgPreviews();
      });
    }

    if (el.inputPersonName) {
      el.inputPersonName.addEventListener('input', (e) => {
        state.personName = e.target.value.trim();
        renderBgPreviews();
      });
    }
    if (el.inputPersonDate) {
      el.inputPersonDate.addEventListener('input', (e) => {
        state.personDate = e.target.value;
        renderBgPreviews();
      });
    }
    if (el.btnBgBack) el.btnBgBack.addEventListener('click', () => setStep('crop'));
    if (el.btnBgToDownload) el.btnBgToDownload.addEventListener('click', () => setStep('download'));

    // 6. Step 4: Download Events
    if (el.sheetRadios) {
      el.sheetRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
          if (e.target.checked) {
            state.sheetFormat = normalizeSheetFormat(e.target.value);
            renderSheetPreview();
          }
        });
      });
    }
    if (el.targetKbSelect) {
      el.targetKbSelect.addEventListener('change', (e) => {
        state.targetFileSize = e.target.value;
      });
    }
    if (el.btnDownloadSingleJpg) el.btnDownloadSingleJpg.addEventListener('click', () => downloadSinglePhoto('image/jpeg', 'jpg'));
    if (el.btnDownloadSinglePng) el.btnDownloadSinglePng.addEventListener('click', () => downloadSinglePhoto('image/png', 'png'));
    if (el.btnDownloadSheetPdf) el.btnDownloadSheetPdf.addEventListener('click', downloadSheetPDF);
    if (el.btnDownloadSheetJpg) el.btnDownloadSheetJpg.addEventListener('click', downloadSheetJPG);

    if (el.btnMakeNewImage) {
      el.btnMakeNewImage.addEventListener('click', resetAll);
    }
    if (el.btnDownloadBack) {
      el.btnDownloadBack.addEventListener('click', () => setStep('background'));
    }
  }

  // --- File Reader Handler ---
  async function handleUploadedFile(file) {
    if (!file) return;

    // Clear error for HEIC/unsupported files
    const ext = (file.name.split('.').pop() || '').toLowerCase();
    if (ext === 'heic' || ext === 'heif' || file.type === 'image/heic' || file.type === 'image/heif') {
      alert('Apple HEIC/HEIF photos are not natively supported by web browsers. Please convert your photo to JPG or PNG before uploading.');
      if (el.fileInput) el.fileInput.value = '';
      return;
    }

    if (!file.type.match(/^image\/(jpeg|png|webp)$/i) && !['jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
      alert('Please upload a valid JPG, PNG, or WebP photo.');
      if (el.fileInput) el.fileInput.value = '';
      return;
    }

    state.rawImageFilename = file.name.replace(/\.[^/.]+$/, '');

    // Revoke previous object URL if any
    if (state.rawImageUrl) {
      URL.revokeObjectURL(state.rawImageUrl);
      state.rawImageUrl = null;
    }

    let loadedImg = null;

    const MAX_IMAGE_DIMENSION = 4000;

    // 1. Try createImageBitmap with imageOrientation: 'from-image' to honor EXIF camera rotation
    if (typeof window.createImageBitmap === 'function') {
      try {
        const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
        const naturalW = bitmap.width;
        const naturalH = bitmap.height;
        const isTooLarge = Math.max(naturalW, naturalH) > MAX_IMAGE_DIMENSION;

        if (!isTooLarge) {
          if (typeof bitmap.close === 'function') bitmap.close();
          state.rawImageUrl = URL.createObjectURL(file);
          loadedImg = await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = state.rawImageUrl;
          });
        } else {
          // Downscale high-resolution photo (>4000px) to prevent mobile memory crashes
          const ratio = Math.min(MAX_IMAGE_DIMENSION / naturalW, MAX_IMAGE_DIMENSION / naturalH);
          const bw = Math.round(naturalW * ratio);
          const bh = Math.round(naturalH * ratio);

          const canvas = document.createElement('canvas');
          canvas.width = bw;
          canvas.height = bh;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(bitmap, 0, 0, bw, bh);
          }
          if (typeof bitmap.close === 'function') bitmap.close();

          const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
          const blob = await new Promise(res => canvas.toBlob(res, mime, 0.95));

          // Clean up temporary canvas
          if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
          canvas.width = 1;
          canvas.height = 1;

          if (blob) {
            state.rawImageUrl = URL.createObjectURL(blob);
            loadedImg = await new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = () => resolve(img);
              img.onerror = reject;
              img.src = state.rawImageUrl;
            });
          }
        }
      } catch (err) {
        console.warn('createImageBitmap with EXIF orientation failed, falling back:', err);
      }
    }

    // 2. Fallback to standard Image loading via ObjectURL
    if (!loadedImg) {
      try {
        const initialUrl = URL.createObjectURL(file);
        loadedImg = await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = initialUrl;
        });

        const rawW = loadedImg.naturalWidth || loadedImg.width;
        const rawH = loadedImg.naturalHeight || loadedImg.height;

        if (Math.max(rawW, rawH) <= MAX_IMAGE_DIMENSION) {
          state.rawImageUrl = initialUrl;
        } else {
          // Downscale fallback if image exceeds 4000px
          const ratio = Math.min(MAX_IMAGE_DIMENSION / rawW, MAX_IMAGE_DIMENSION / rawH);
          const bw = Math.round(rawW * ratio);
          const bh = Math.round(rawH * ratio);

          const canvas = document.createElement('canvas');
          canvas.width = bw;
          canvas.height = bh;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(loadedImg, 0, 0, bw, bh);
          }

          const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
          const blob = await new Promise(res => canvas.toBlob(res, mime, 0.95));

          if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
          canvas.width = 1;
          canvas.height = 1;
          URL.revokeObjectURL(initialUrl);

          if (blob) {
            state.rawImageUrl = URL.createObjectURL(blob);
            loadedImg = await new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = () => resolve(img);
              img.onerror = reject;
              img.src = state.rawImageUrl;
            });
          }
        }
      } catch (err) {
        alert('Could not open the selected image file. Please try another image.');
        if (el.fileInput) el.fileInput.value = '';
        return;
      }
    }

    state.rawImage = loadedImg;

    // Hide upload hero, show studio
    if (el.heroUpload) el.heroUpload.classList.add('hidden');
    if (el.studioContainer) el.studioContainer.classList.remove('hidden');

    // Set default size and step to Size
    selectSizePreset('india_35x45');
    setStep('size');
  }

  // --- Step 1: Size Preset Selection ---
  function selectSizePreset(presetId) {
    state.selectedPresetId = presetId;
    if (presetId === 'custom') {
      updateCustomDimensions();
    } else {
      const p = SIZE_PRESETS[presetId] || SIZE_PRESETS['india'];
      state.photoWidthMm = p.wMm;
      state.photoHeightMm = p.hMm;
    }

    if (el.sizeCards) {
      el.sizeCards.forEach(card => {
        const isSelected = card.dataset.preset === presetId;
        const badge = card.querySelector('.selected-badge');
        card.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
        if (isSelected) {
          card.classList.add('border-blue-600', 'ring-2', 'ring-blue-600', 'bg-blue-50/20');
          card.classList.remove('border-slate-200', 'dark:border-slate-800');
          if (badge) badge.classList.remove('hidden');
        } else {
          card.classList.remove('border-blue-600', 'ring-2', 'ring-blue-600', 'bg-blue-50/20');
          card.classList.add('border-slate-200', 'dark:border-slate-800');
          if (badge) badge.classList.add('hidden');
        }
      });
    }
  }

  function updateCustomDimensions() {
    if (state.selectedPresetId !== 'custom') return;
    const wVal = parseFloat(el.customW?.value) || 3.5;
    const hVal = parseFloat(el.customH?.value) || 4.5;
    const unit = state.customUnit || 'cm';
    let wMm = wVal;
    let hMm = hVal;
    if (unit === 'cm') {
      wMm = wVal * 10;
      hMm = hVal * 10;
    } else if (unit === 'mm') {
      wMm = wVal;
      hMm = hVal;
    } else if (unit === 'inch') {
      wMm = wVal * 25.4;
      hMm = hVal * 25.4;
    } else if (unit === 'px') {
      wMm = (wVal / state.dpi) * 25.4;
      hMm = (hVal / state.dpi) * 25.4;
    }
    state.photoWidthMm = Math.round(wMm * 10) / 10;
    state.photoHeightMm = Math.round(hMm * 10) / 10;
  }

  // --- Step 2: Interactive Live Crop Engine ---
  let activeAdjustMode = null; // 'brightness' | 'contrast' | 'saturation'

  function initCropWorkspace() {
    if (!state.rawImage || !el.cropCanvas) return;
    if (!el.cropCtx && el.cropCanvas) el.cropCtx = el.cropCanvas.getContext('2d');
    if (!el.cropCtx) return;

    const img = state.rawImage;
    const maxDisplayW = Math.min(500, window.innerWidth - 48);
    // Dynamically constrain height so controls fit in desktop/laptop viewport without scrolling
    const maxDisplayH = Math.min(320, Math.max(220, window.innerHeight - 340));

    // Calculate aspect ratio fit on screen
    let scale = Math.min(maxDisplayW / img.width, maxDisplayH / img.height, 1);
    const canvasW = Math.round(img.width * scale);
    const canvasH = Math.round(img.height * scale);

    el.cropCanvas.width = canvasW;
    el.cropCanvas.height = canvasH;
    state.cropScaleRatio = scale;

    // Compute initial crop box (centered, occupying ~75% of dimension, matching aspect ratio)
    const p = SIZE_PRESETS[state.selectedPresetId] || SIZE_PRESETS['india'];
    const targetAspect = p.wMm / p.hMm;

    let boxH = Math.round(canvasH * 0.75);
    let boxW = Math.round(boxH * targetAspect);

    if (boxW > canvasW * 0.85) {
      boxW = Math.round(canvasW * 0.85);
      boxH = Math.round(boxW / targetAspect);
    }

    state.cropBox = {
      x: Math.round((canvasW - boxW) / 2),
      y: Math.round((canvasH - boxH) / 2),
      w: boxW,
      h: boxH
    };

    if (el.btnCropLockRatio) {
      if (state.cropRatioLocked) {
        if (el.cropRatioIcon) el.cropRatioIcon.textContent = '🔒';
        if (el.cropRatioText) el.cropRatioText.textContent = 'Ratio Locked';
        el.btnCropLockRatio.classList.add('bg-blue-50', 'text-blue-700', 'border-blue-300');
        el.btnCropLockRatio.classList.remove('bg-amber-50', 'text-amber-700', 'border-amber-300');
      } else {
        if (el.cropRatioIcon) el.cropRatioIcon.textContent = '🔓';
        if (el.cropRatioText) el.cropRatioText.textContent = 'Freeform Crop';
        el.btnCropLockRatio.classList.remove('bg-blue-50', 'text-blue-700', 'border-blue-300');
        el.btnCropLockRatio.classList.add('bg-amber-50', 'text-amber-700', 'border-amber-300');
      }
    }

    renderCropCanvas();
  }

  function renderCropCanvas() {
    if (!el.cropCanvas || !el.cropCtx || !state.rawImage) return;
    const ctx = el.cropCtx;
    const img = state.rawImage;
    const cw = el.cropCanvas.width;
    const ch = el.cropCanvas.height;

    ctx.clearRect(0, 0, cw, ch);

    // Apply Realtime Brightness / Contrast / Saturation Filters
    ctx.filter = `brightness(${state.brightness}%) contrast(${state.contrast}%) saturate(${state.saturation}%)`;
    ctx.drawImage(img, 0, 0, cw, ch);
    ctx.filter = 'none';

    // 1. Darken outer area outside crop box
    const cb = state.cropBox;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';

    // Top
    ctx.fillRect(0, 0, cw, cb.y);
    // Bottom
    ctx.fillRect(0, cb.y + cb.h, cw, ch - (cb.y + cb.h));
    // Left
    ctx.fillRect(0, cb.y, cb.x, cb.h);
    // Right
    ctx.fillRect(cb.x + cb.w, cb.y, cw - (cb.x + cb.w), cb.h);

    // 2. Crop border
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    ctx.strokeRect(cb.x, cb.y, cb.w, cb.h);

    // 3. Biometric Oval Face Guideline, Eye-line & Chin Guides
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.setLineDash([5, 4]);
    ctx.lineWidth = 1.5;

    // Face oval
    ctx.beginPath();
    ctx.ellipse(
      cb.x + cb.w / 2,
      cb.y + cb.h * 0.45,
      cb.w * 0.32,
      cb.h * 0.36,
      0, 0, Math.PI * 2
    );
    ctx.stroke();

    // Eye line guideline (standard biometric ~55-60% from chin)
    ctx.beginPath();
    ctx.moveTo(cb.x + cb.w * 0.22, cb.y + cb.h * 0.43);
    ctx.lineTo(cb.x + cb.w * 0.78, cb.y + cb.h * 0.43);
    ctx.stroke();

    // Chin line guideline
    ctx.beginPath();
    ctx.moveTo(cb.x + cb.w * 0.35, cb.y + cb.h * 0.81);
    ctx.lineTo(cb.x + cb.w * 0.65, cb.y + cb.h * 0.81);
    ctx.stroke();
    ctx.restore();

    // 4. Draw Interactive Resize Corner Handles
    const handles = getCropHandles();
    handles.forEach(h => {
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(h.x, h.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
  }

  function getCropHandles() {
    const cb = state.cropBox;
    return [
      { name: 'nw', x: cb.x, y: cb.y },
      { name: 'ne', x: cb.x + cb.w, y: cb.y },
      { name: 'sw', x: cb.x, y: cb.y + cb.h },
      { name: 'se', x: cb.x + cb.w, y: cb.y + cb.h },
      { name: 'n', x: cb.x + cb.w / 2, y: cb.y },
      { name: 's', x: cb.x + cb.w / 2, y: cb.y + cb.h },
      { name: 'w', x: cb.x, y: cb.y + cb.h / 2 },
      { name: 'e', x: cb.x + cb.w, y: cb.y + cb.h / 2 }
    ];
  }

  function getCropCoords(clientX, clientY) {
    if (!el.cropCanvas) return { x: clientX, y: clientY };
    const rect = el.cropCanvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return { x: 0, y: 0 };
    const scaleX = el.cropCanvas.width / rect.width;
    const scaleY = el.cropCanvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }

  function bindCropEvents() {
    if (cropEventsBound || !el.cropCanvas) return;
    cropEventsBound = true;

    const finishCropDrag = () => {
      if (!el.cropCanvas) {
        state.isDraggingCrop = false;
        state.activeHandle = null;
        return;
      }
      if (state.activeHandle === 'draw') {
        const cb = state.cropBox;
        if (cb.w < 35 || cb.h < 35) {
          // If drawn box was tiny (accidental click), restore a centered standard box
          const p = SIZE_PRESETS[state.selectedPresetId] || SIZE_PRESETS['india'];
          const targetAspect = p.wMm / p.hMm;
          let boxH = Math.round(el.cropCanvas.height * 0.75);
          let boxW = Math.round(boxH * targetAspect);
          if (boxW > el.cropCanvas.width * 0.85) {
            boxW = Math.round(el.cropCanvas.width * 0.85);
            boxH = Math.round(boxW / targetAspect);
          }
          cb.x = Math.round((el.cropCanvas.width - boxW) / 2);
          cb.y = Math.round((el.cropCanvas.height - boxH) / 2);
          cb.w = boxW;
          cb.h = boxH;
          renderCropCanvas();
        }
      }
      state.isDraggingCrop = false;
      state.activeHandle = null;
    };

    // Mouse Down
    el.cropCanvas.addEventListener('mousedown', (e) => {
      const pos = getCropCoords(e.clientX, e.clientY);
      handleCropPointerDown(pos.x, pos.y);
    });

    // Window Mouse & Touch Listeners (registered once globally)
    if (!windowCropEventsBound) {
      window.addEventListener('mousemove', (e) => {
        if (!state.isDraggingCrop) {
          // Update hover cursor
          if (el.cropCanvas && el.cropCanvas.offsetParent !== null) {
            const pos = getCropCoords(e.clientX, e.clientY);
            updateCropCursor(pos.x, pos.y);
          }
          return;
        }
        const pos = getCropCoords(e.clientX, e.clientY);
        handleCropPointerMove(pos.x, pos.y);
      });

      window.addEventListener('mouseup', finishCropDrag);

      window.addEventListener('touchmove', (e) => {
        if (!state.isDraggingCrop || e.touches.length !== 1) return;
        const t = e.touches[0];
        const pos = getCropCoords(t.clientX, t.clientY);
        handleCropPointerMove(pos.x, pos.y);
        e.preventDefault();
      }, { passive: false });

      window.addEventListener('touchend', finishCropDrag);
      windowCropEventsBound = true;
    }

    // Quick Adjustments Toolbar
    if (el.btnCropZoomIn) {
      el.btnCropZoomIn.addEventListener('click', () => {
        zoomCropBox(-0.06);
      });
    }
    if (el.btnCropZoomOut) {
      el.btnCropZoomOut.addEventListener('click', () => {
        zoomCropBox(0.06);
      });
    }
    if (el.btnCropBrightness) {
      el.btnCropBrightness.addEventListener('click', () => toggleAdjustSlider('brightness', 'Brightness', state.brightness));
    }
    if (el.btnCropContrast) {
      el.btnCropContrast.addEventListener('click', () => toggleAdjustSlider('contrast', 'Contrast', state.contrast));
    }
    if (el.btnCropSaturation) {
      el.btnCropSaturation.addEventListener('click', () => toggleAdjustSlider('saturation', 'Saturation', state.saturation));
    }
    if (el.cropSlider) {
      el.cropSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        if (activeAdjustMode === 'brightness') state.brightness = val;
        else if (activeAdjustMode === 'contrast') state.contrast = val;
        else if (activeAdjustMode === 'saturation') state.saturation = val;
        renderCropCanvas();
      });
    }
    if (el.btnResetAdjust) {
      el.btnResetAdjust.addEventListener('click', () => {
        state.brightness = 100;
        state.contrast = 100;
        state.saturation = 100;
        if (el.cropSlider) el.cropSlider.value = 100;
        renderCropCanvas();
      });
    }

    if (el.btnCropLockRatio) {
      el.btnCropLockRatio.addEventListener('click', () => {
        if (!el.cropCanvas) return;
        state.cropRatioLocked = !state.cropRatioLocked;
        if (state.cropRatioLocked) {
          if (el.cropRatioIcon) el.cropRatioIcon.textContent = '🔒';
          if (el.cropRatioText) el.cropRatioText.textContent = 'Ratio Locked';
          el.btnCropLockRatio.classList.add('bg-blue-50', 'text-blue-700', 'border-blue-300');
          el.btnCropLockRatio.classList.remove('bg-amber-50', 'text-amber-700', 'border-amber-300');
          // Re-adjust crop box to preset aspect ratio
          const p = SIZE_PRESETS[state.selectedPresetId] || SIZE_PRESETS['india'];
          const aspect = p.wMm / p.hMm;
          const cb = state.cropBox;
          cb.h = Math.round(cb.w / aspect);
          if (cb.y + cb.h > el.cropCanvas.height) {
            cb.h = el.cropCanvas.height - cb.y;
            cb.w = Math.round(cb.h * aspect);
          }
        } else {
          if (el.cropRatioIcon) el.cropRatioIcon.textContent = '🔓';
          if (el.cropRatioText) el.cropRatioText.textContent = 'Freeform Crop';
          el.btnCropLockRatio.classList.remove('bg-blue-50', 'text-blue-700', 'border-blue-300');
          el.btnCropLockRatio.classList.add('bg-amber-50', 'text-amber-700', 'border-amber-300');
        }
        renderCropCanvas();
      });
    }

    if (el.btnCropReset) {
      el.btnCropReset.addEventListener('click', () => {
        initCropWorkspace();
      });
    }

    // Step 2 Buttons
    if (el.btnCropBack) el.btnCropBack.addEventListener('click', () => setStep('size'));
    if (el.btnCropNext) {
      el.btnCropNext.addEventListener('click', () => {
        saveCroppedPhoto();
        setStep('background');
      });
    }
  }

  function zoomCropBox(delta) {
    if (!el.cropCanvas) return;
    const cb = state.cropBox;
    const p = SIZE_PRESETS[state.selectedPresetId] || SIZE_PRESETS['india'];
    const aspect = state.cropRatioLocked ? (p.wMm / p.hMm) : (cb.w / (cb.h || 1));
    const cw = el.cropCanvas.width;
    const ch = el.cropCanvas.height;
    if (!cw || !ch) return;

    const newW = cb.w * (1 + delta);
    const newH = newW / aspect;

    if (newW >= 50 && newH >= 50 && newW <= cw && newH <= ch) {
      const centerX = cb.x + cb.w / 2;
      const centerY = cb.y + cb.h / 2;
      cb.x = Math.max(0, Math.min(cw - newW, centerX - newW / 2));
      cb.y = Math.max(0, Math.min(ch - newH, centerY - newH / 2));
      cb.w = newW;
      cb.h = newH;
      renderCropCanvas();
    }
  }

  function toggleAdjustSlider(mode, label, val) {
    if (activeAdjustMode === mode && el.cropSliderBar && !el.cropSliderBar.classList.contains('hidden')) {
      el.cropSliderBar.classList.add('hidden');
      activeAdjustMode = null;
      return;
    }
    activeAdjustMode = mode;
    if (el.cropSliderBar) el.cropSliderBar.classList.remove('hidden');
    if (el.cropSliderLabel) el.cropSliderLabel.textContent = label;
    if (el.cropSlider) el.cropSlider.value = val;
  }

  function handleCropPointerDown(px, py) {
    const handles = getCropHandles();
    let hitHandle = null;

    for (let i = 0; i < handles.length; i++) {
      const h = handles[i];
      if (Math.abs(px - h.x) <= 14 && Math.abs(py - h.y) <= 14) {
        hitHandle = h.name;
        break;
      }
    }

    const cb = state.cropBox;
    const isInsideBox = px >= cb.x && px <= cb.x + cb.w && py >= cb.y && py <= cb.y + cb.h;

    if (hitHandle) {
      state.isDraggingCrop = true;
      state.activeHandle = hitHandle;
      state.dragStart = { x: px, y: py, boxX: cb.x, boxY: cb.y, boxW: cb.w, boxH: cb.h };
    } else if (isInsideBox) {
      state.isDraggingCrop = true;
      state.activeHandle = 'move';
      state.dragStart = { x: px, y: py, boxX: cb.x, boxY: cb.y, boxW: cb.w, boxH: cb.h };
    } else {
      // User clicked outside the crop box directly on the image -> Draw a new crop box with cursor!
      state.isDraggingCrop = true;
      state.activeHandle = 'draw';
      state.dragStart = { x: px, y: py, boxX: px, boxY: py, boxW: 0, boxH: 0 };
    }
  }

  function handleCropPointerMove(px, py) {
    if (!el.cropCanvas) return;
    const cb = state.cropBox;
    const ds = state.dragStart;
    const dx = px - ds.x;
    const dy = py - ds.y;
    const cw = el.cropCanvas.width;
    const ch = el.cropCanvas.height;
    if (!cw || !ch) return;

    const p = SIZE_PRESETS[state.selectedPresetId] || SIZE_PRESETS['india'];
    const aspect = p.wMm / p.hMm;

    if (state.activeHandle === 'move') {
      cb.x = Math.max(0, Math.min(cw - cb.w, ds.boxX + dx));
      cb.y = Math.max(0, Math.min(ch - cb.h, ds.boxY + dy));
      renderCropCanvas();
      return;
    }

    if (!state.activeHandle) return;

    if (state.activeHandle === 'draw') {
      const startX = ds.x;
      const startY = ds.y;
      let rawW = Math.abs(px - startX);
      let rawH = Math.abs(py - startY);

      if (rawW < 8 && rawH < 8) return;

      let boxW = rawW;
      let boxH = rawH;

      if (state.cropRatioLocked) {
        // Maintain the exact preset passport aspect ratio selected by user
        if (rawW / (rawH || 1) > aspect) {
          boxW = rawW;
          boxH = Math.round(boxW / aspect);
        } else {
          boxH = rawH;
          boxW = Math.round(boxH * aspect);
        }
      }

      let boxX = px < startX ? startX - boxW : startX;
      let boxY = py < startY ? startY - boxH : startY;

      // Keep within canvas bounds
      if (boxX < 0) boxX = 0;
      if (boxY < 0) boxY = 0;
      if (boxX + boxW > cw) {
        boxW = cw - boxX;
        if (state.cropRatioLocked) boxH = Math.round(boxW / aspect);
      }
      if (boxY + boxH > ch) {
        boxH = ch - boxY;
        if (state.cropRatioLocked) boxW = Math.round(boxH * aspect);
      }

      if (boxW >= 30 && boxH >= 30) {
        cb.x = Math.round(boxX);
        cb.y = Math.round(boxY);
        cb.w = Math.round(boxW);
        cb.h = Math.round(boxH);
        renderCropCanvas();
      }
      return;
    }

    if (state.cropRatioLocked) {
      // Locked aspect ratio resizing
      let newW = ds.boxW;
      let newH = ds.boxH;

      if (state.activeHandle === 'se') {
        newW = Math.max(50, Math.min(cw - ds.boxX, ds.boxW + dx));
        newH = Math.round(newW / aspect);
        if (ds.boxY + newH > ch) {
          newH = ch - ds.boxY;
          newW = Math.round(newH * aspect);
        }
        cb.w = newW;
        cb.h = newH;
      } else if (state.activeHandle === 'nw') {
        newW = Math.max(50, Math.min(ds.boxX + ds.boxW, ds.boxW - dx));
        newH = Math.round(newW / aspect);
        cb.x = ds.boxX + ds.boxW - newW;
        cb.y = ds.boxY + ds.boxH - newH;
        cb.w = newW;
        cb.h = newH;
      } else if (state.activeHandle === 'ne') {
        newW = Math.max(50, Math.min(cw - ds.boxX, ds.boxW + dx));
        newH = Math.round(newW / aspect);
        cb.y = ds.boxY + ds.boxH - newH;
        cb.w = newW;
        cb.h = newH;
      } else if (state.activeHandle === 'sw') {
        newW = Math.max(50, Math.min(ds.boxX + ds.boxW, ds.boxW - dx));
        newH = Math.round(newW / aspect);
        if (ds.boxY + newH > ch) {
          newH = ch - ds.boxY;
          newW = Math.round(newH * aspect);
        }
        cb.x = ds.boxX + ds.boxW - newW;
        cb.w = newW;
        cb.h = newH;
      } else if (state.activeHandle === 'e') {
        newW = Math.max(50, Math.min(cw - ds.boxX, ds.boxW + dx));
        newH = Math.round(newW / aspect);
        const centerY = ds.boxY + ds.boxH / 2;
        cb.w = newW;
        cb.h = newH;
        cb.y = Math.max(0, Math.min(ch - newH, centerY - newH / 2));
      } else if (state.activeHandle === 'w') {
        newW = Math.max(50, Math.min(ds.boxX + ds.boxW, ds.boxW - dx));
        newH = Math.round(newW / aspect);
        const centerY = ds.boxY + ds.boxH / 2;
        cb.x = ds.boxX + ds.boxW - newW;
        cb.w = newW;
        cb.h = newH;
        cb.y = Math.max(0, Math.min(ch - newH, centerY - newH / 2));
      } else if (state.activeHandle === 's') {
        newH = Math.max(50, Math.min(ch - ds.boxY, ds.boxH + dy));
        newW = Math.round(newH * aspect);
        const centerX = ds.boxX + ds.boxW / 2;
        cb.w = newW;
        cb.h = newH;
        cb.x = Math.max(0, Math.min(cw - newW, centerX - newW / 2));
      } else if (state.activeHandle === 'n') {
        newH = Math.max(50, Math.min(ds.boxY + ds.boxH, ds.boxH - dy));
        newW = Math.round(newH * aspect);
        const centerX = ds.boxX + ds.boxW / 2;
        cb.y = ds.boxY + ds.boxH - newH;
        cb.w = newW;
        cb.h = newH;
        cb.x = Math.max(0, Math.min(cw - newW, centerX - newW / 2));
      }
    } else {
      // Freeform unconstrained resizing
      if (state.activeHandle === 'se') {
        cb.w = Math.max(40, Math.min(cw - ds.boxX, ds.boxW + dx));
        cb.h = Math.max(40, Math.min(ch - ds.boxY, ds.boxH + dy));
      } else if (state.activeHandle === 'sw') {
        const newW = Math.max(40, Math.min(ds.boxX + ds.boxW, ds.boxW - dx));
        cb.x = ds.boxX + ds.boxW - newW;
        cb.w = newW;
        cb.h = Math.max(40, Math.min(ch - ds.boxY, ds.boxH + dy));
      } else if (state.activeHandle === 'ne') {
        cb.w = Math.max(40, Math.min(cw - ds.boxX, ds.boxW + dx));
        const newH = Math.max(40, Math.min(ds.boxY + ds.boxH, ds.boxH - dy));
        cb.y = ds.boxY + ds.boxH - newH;
        cb.h = newH;
      } else if (state.activeHandle === 'nw') {
        const newW = Math.max(40, Math.min(ds.boxX + ds.boxW, ds.boxW - dx));
        const newH = Math.max(40, Math.min(ds.boxY + ds.boxH, ds.boxH - dy));
        cb.x = ds.boxX + ds.boxW - newW;
        cb.y = ds.boxY + ds.boxH - newH;
        cb.w = newW;
        cb.h = newH;
      } else if (state.activeHandle === 'e') {
        cb.w = Math.max(40, Math.min(cw - ds.boxX, ds.boxW + dx));
      } else if (state.activeHandle === 'w') {
        const newW = Math.max(40, Math.min(ds.boxX + ds.boxW, ds.boxW - dx));
        cb.x = ds.boxX + ds.boxW - newW;
        cb.w = newW;
      } else if (state.activeHandle === 's') {
        cb.h = Math.max(40, Math.min(ch - ds.boxY, ds.boxH + dy));
      } else if (state.activeHandle === 'n') {
        const newH = Math.max(40, Math.min(ds.boxY + ds.boxH, ds.boxH - dy));
        cb.y = ds.boxY + ds.boxH - newH;
        cb.h = newH;
      }
    }

    renderCropCanvas();
  }

  function updateCropCursor(px, py) {
    if (!el.cropCanvas) return;
    const handles = getCropHandles();
    let cursor = 'crosshair';

    for (let i = 0; i < handles.length; i++) {
      const h = handles[i];
      if (Math.abs(px - h.x) <= 12 && Math.abs(py - h.y) <= 12) {
        if (h.name === 'nw' || h.name === 'se') cursor = 'nwse-resize';
        else if (h.name === 'ne' || h.name === 'sw') cursor = 'nesw-resize';
        else if (h.name === 'n' || h.name === 's') cursor = 'ns-resize';
        else if (h.name === 'w' || h.name === 'e') cursor = 'ew-resize';
        break;
      }
    }

    const cb = state.cropBox;
    if (cursor === 'crosshair' && px >= cb.x && px <= cb.x + cb.w && py >= cb.y && py <= cb.y + cb.h) {
      cursor = 'move';
    }

    el.cropCanvas.style.cursor = cursor;
  }

  // Save the cropped image slice at high print quality
  function saveCroppedPhoto() {
    if (!state.rawImage) return;

    const img = state.rawImage;
    const scale = state.cropScaleRatio;
    const cb = state.cropBox;

    // Convert display coordinates back to natural full-resolution image coordinates
    const sx = Math.max(0, Math.round(cb.x / scale));
    const sy = Math.max(0, Math.round(cb.y / scale));
    const sw = Math.min(img.width - sx, Math.round(cb.w / scale));
    const sh = Math.min(img.height - sy, Math.round(cb.h / scale));

    // Target 300 DPI canvas dimensions for crisp physical printing
    const targetW = mmToPx(state.photoWidthMm, state.dpi);
    const targetH = mmToPx(state.photoHeightMm, state.dpi);

    const canvas = document.createElement('canvas');
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Calculate aspect fit so freeform cropping NEVER distorts or stretches the person's face
    const cropAspect = sw / (sh || 1);
    const targetAspect = targetW / targetH;

    let drawW, drawH, drawX, drawY;
    if (cropAspect > targetAspect) {
      // Cropped area is wider: cover height, center horizontally
      drawH = targetH;
      drawW = targetH * cropAspect;
      drawX = (targetW - drawW) / 2;
      drawY = 0;
    } else {
      // Cropped area is taller or equal: cover width, center vertically
      drawW = targetW;
      drawH = targetW / cropAspect;
      drawX = 0;
      drawY = (targetH - drawH) / 2;
    }

    // Apply color tone adjustments
    ctx.filter = `brightness(${state.brightness}%) contrast(${state.contrast}%) saturate(${state.saturation}%)`;
    ctx.drawImage(img, sx, sy, sw, sh, drawX, drawY, drawW, drawH);
    ctx.filter = 'none';

    // Clean up previous canvas if any
    if (state.croppedBitmapCanvas) {
      const pCtx = state.croppedBitmapCanvas.getContext('2d');
      if (pCtx) pCtx.clearRect(0, 0, state.croppedBitmapCanvas.width, state.croppedBitmapCanvas.height);
      state.croppedBitmapCanvas.width = 1;
      state.croppedBitmapCanvas.height = 1;
    }

    state.croppedBitmapCanvas = canvas;
    generateBackgroundCutout();
  }

  // --- Automatic & Smart Client-Side Background Removal ---
  function isSkinPixel(r, g, b) {
    // Standard RGB human skin detection model (protects face, ears, neck, and upper chest)
    if (r < 75 || g < 38 || b < 20) return false;
    if (r > 248 && g > 248 && b > 248) return false;
    if (r <= g || g <= b * 0.72) return false;
    const rDiff = r - g;
    const rbDiff = r - b;
    if (rDiff < 10 || rbDiff < 14) return false;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    return (max - min) >= 15;
  }

  function generateBackgroundCutout() {
    if (!state.croppedBitmapCanvas) return;
    const src = state.croppedBitmapCanvas;
    const w = src.width;
    const h = src.height;

    const out = document.createElement('canvas');
    out.width = w;
    out.height = h;
    const ctx = out.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(src, 0, 0);

    const imgData = ctx.getImageData(0, 0, w, h);
    const d = imgData.data;
    const totalPixels = w * h;

    // 1. Determine background reference color
    let bgR = 255, bgG = 255, bgB = 255;
    if (state.bgSampleColor) {
      bgR = state.bgSampleColor.r;
      bgG = state.bgSampleColor.g;
      bgB = state.bgSampleColor.b;
    } else {
      // Sample top border and corners
      let rSum = 0, gSum = 0, bSum = 0, count = 0;
      const sampleRows = Math.max(4, Math.floor(h * 0.08));
      const sampleCols = Math.max(4, Math.floor(w * 0.15));

      for (let y = 0; y < sampleRows; y++) {
        for (let x = 0; x < w; x++) {
          if (y < 4 || x < sampleCols || x >= w - sampleCols) {
            const idx = (y * w + x) * 4;
            rSum += d[idx];
            gSum += d[idx + 1];
            bSum += d[idx + 2];
            count++;
          }
        }
      }
      if (count > 0) {
        bgR = Math.round(rSum / count);
        bgG = Math.round(gSum / count);
        bgB = Math.round(bSum / count);
      }
    }

    // 2. Tolerance calculation (controlled threshold)
    const tol = state.bgTolerance || 25;
    const maxDist = tol * 1.5;

    function getDist(idx) {
      const dr = d[idx] - bgR;
      const dg = d[idx + 1] - bgG;
      const db = d[idx + 2] - bgB;
      return Math.sqrt(0.299 * dr * dr + 0.587 * dg * dg + 0.114 * db * db);
    }

    // 3. Fast BFS Flood-fill from borders with skin and edge protection
    const isBg = new Uint8Array(totalPixels);
    const queue = new Int32Array(totalPixels);
    let head = 0;
    let tail = 0;

    // Seed top border
    for (let x = 0; x < w; x++) {
      const idx = x * 4;
      if (!isSkinPixel(d[idx], d[idx + 1], d[idx + 2]) && getDist(idx) <= maxDist) {
        isBg[x] = 1;
        queue[tail++] = x;
      }
    }

    // Seed upper left and right edges (down to 75% height)
    const maxBorderY = Math.floor(h * 0.75);
    for (let y = 1; y < maxBorderY; y++) {
      const leftIdx = y * w;
      const l4 = leftIdx * 4;
      if (!isBg[leftIdx] && !isSkinPixel(d[l4], d[l4 + 1], d[l4 + 2]) && getDist(l4) <= maxDist) {
        isBg[leftIdx] = 1;
        queue[tail++] = leftIdx;
      }
      const rightIdx = y * w + (w - 1);
      const r4 = rightIdx * 4;
      if (!isBg[rightIdx] && !isSkinPixel(d[r4], d[r4 + 1], d[r4 + 2]) && getDist(r4) <= maxDist) {
        isBg[rightIdx] = 1;
        queue[tail++] = rightIdx;
      }
    }

    // BFS expansion
    while (head < tail) {
      const curr = queue[head++];
      const cx = curr % w;
      const cy = (curr / w) | 0;

      const currIdx4 = curr * 4;
      const cR = d[currIdx4];
      const cG = d[currIdx4 + 1];
      const cB = d[currIdx4 + 2];

      const tryNeighbor = (n, nx, ny) => {
        if (isBg[n]) return;

        const nIdx4 = n * 4;
        const nR = d[nIdx4];
        const nG = d[nIdx4 + 1];
        const nB = d[nIdx4 + 2];

        // 1. Skin protection: never flood over face, ears, neck, or chest skin
        if (isSkinPixel(nR, nG, nB)) return;

        // 2. Edge barrier: do not jump across contrast outlines/seams
        const edgeDist = Math.abs(nR - cR) + Math.abs(nG - cG) + Math.abs(nB - cB);
        if (edgeDist > 34) return;

        // 3. Lower Torso Protection: prevent flooding light shirts/clothing in center
        let allowedDist = maxDist;
        if (ny > h * 0.55 && nx > w * 0.22 && nx < w * 0.78) {
          allowedDist = maxDist * 0.55;
        }

        if (getDist(nIdx4) <= allowedDist) {
          isBg[n] = 1;
          queue[tail++] = n;
        }
      };

      // 4-way expansion to all directions (cleanly reaches bottom along shoulders without arbitrary cutoff)
      if (cx > 0) tryNeighbor(curr - 1, cx - 1, cy);
      if (cx < w - 1) tryNeighbor(curr + 1, cx + 1, cy);
      if (cy > 0) tryNeighbor(curr - w, cx, cy - 1);
      if (cy < h - 1) tryNeighbor(curr + w, cx, cy + 1);
    }

    // 4. Soft Edge Feathering / Anti-aliasing
    const alpha = new Uint8Array(totalPixels);
    for (let i = 0; i < totalPixels; i++) {
      alpha[i] = isBg[i] ? 0 : 255;
    }

    // Feather boundary pixels
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const idx = y * w + x;
        if (alpha[idx] === 255) {
          if (
            alpha[idx - 1] === 0 ||
            alpha[idx + 1] === 0 ||
            alpha[idx - w] === 0 ||
            alpha[idx + w] === 0
          ) {
            alpha[idx] = 150; // soft edge
          }
        }
      }
    }

    // Apply alpha to image data
    for (let i = 0; i < totalPixels; i++) {
      d[i * 4 + 3] = alpha[i];
    }

    ctx.putImageData(imgData, 0, 0);

    // Clean up previous cutout canvas if any
    if (state.segmentedPersonCanvas) {
      const pCtx = state.segmentedPersonCanvas.getContext('2d');
      if (pCtx) pCtx.clearRect(0, 0, state.segmentedPersonCanvas.width, state.segmentedPersonCanvas.height);
      state.segmentedPersonCanvas.width = 1;
      state.segmentedPersonCanvas.height = 1;
    }

    state.segmentedPersonCanvas = out;
  }

  // --- Step 3: Background Styling & Name/Date ---
  function updateBgCardSelection() {
    const isColor = state.bgStyle === 'color';
    if (el.cardBgOriginal) {
      el.cardBgOriginal.classList.toggle('ring-2', !isColor);
      el.cardBgOriginal.classList.toggle('ring-blue-600', !isColor);
      el.cardBgOriginal.setAttribute('aria-pressed', (!isColor).toString());
      const b = el.cardBgOriginal.querySelector('.selected-badge');
      if (b) b.classList.toggle('hidden', isColor);
    }
    if (el.cardBgColor) {
      el.cardBgColor.classList.toggle('ring-2', isColor);
      el.cardBgColor.classList.toggle('ring-blue-600', isColor);
      el.cardBgColor.setAttribute('aria-pressed', isColor.toString());
      const b = el.cardBgColor.querySelector('.selected-badge');
      if (b) b.classList.toggle('hidden', !isColor);
    }
    renderBgPreviews();
  }

  function renderBackgroundStep() {
    updateBgCardSelection();
    renderBgPreviews();
  }

  function renderBgPreviews() {
    if (!state.croppedBitmapCanvas) return;

    // Render Original Preview Card
    if (el.canvasPreviewOriginal) {
      renderSinglePassportPhoto(el.canvasPreviewOriginal, false);
    }
    // Render Background Card
    if (el.canvasPreviewColor) {
      renderSinglePassportPhoto(el.canvasPreviewColor, true);
    }
  }

  // --- Step 4: Download & Sheet Preview ---
  function renderDownloadStep() {
    // 1. Single Photo Preview
    if (el.downloadSingleCanvas) {
      renderSinglePassportPhoto(el.downloadSingleCanvas, state.bgStyle === 'color');
    }
    // Update resolution badge
    if (el.singleDimLabel) {
      const p = SIZE_PRESETS[state.selectedPresetId] || SIZE_PRESETS['india'];
      const targetW = mmToPx(state.photoWidthMm, state.dpi);
      const targetH = mmToPx(state.photoHeightMm, state.dpi);
      el.singleDimLabel.textContent = `${state.photoWidthMm} × ${state.photoHeightMm} mm (${targetW} × ${targetH} px @ ${state.dpi} DPI)`;
    }

    // 2. Printable Sheet Grid
    renderSheetPreview();
  }

  // Core drawing method for rendering a single passport photo
  function renderSinglePassportPhoto(targetCanvas, applyColorBg) {
    if (!state.croppedBitmapCanvas || !targetCanvas) return;

    const base = state.croppedBitmapCanvas;
    const w = base.width;
    const h = base.height;

    targetCanvas.width = w;
    targetCanvas.height = h;
    const ctx = targetCanvas.getContext('2d');
    if (!ctx) return;

    // 1. Background & Photo
    if (applyColorBg && state.bgStyle === 'color') {
      ctx.fillStyle = state.bgColor;
      ctx.fillRect(0, 0, w, h);

      // Draw the segmented person with transparent background over the new solid background
      if (state.segmentedPersonCanvas) {
        ctx.drawImage(state.segmentedPersonCanvas, 0, 0, w, h);
      } else {
        ctx.drawImage(base, 0, 0, w, h);
      }
    } else {
      // Draw original photo with its original background intact
      ctx.drawImage(base, 0, 0, w, h);
    }

    // 4. White Bottom Strip for Name & Date (if checked)
    if (state.writeNameDate && (state.personName || state.personDate)) {
      ctx.save();
      const stripH = Math.round(h * 0.16);
      const stripY = h - stripH;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, stripY, w, stripH);

      ctx.strokeStyle = '#000000';
      ctx.lineWidth = Math.max(1, Math.round(w * 0.003));
      ctx.strokeRect(0, stripY, w, stripH);

      ctx.fillStyle = '#000000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const fontSize = Math.max(12, Math.round(w * 0.048));
      ctx.font = `bold ${fontSize}px sans-serif`;

      // Format date from YYYY-MM-DD to DD/MM/YYYY for official passport standards
      let formattedDate = state.personDate || '';
      if (/^\d{4}-\d{2}-\d{2}$/.test(formattedDate)) {
        const [year, month, day] = formattedDate.split('-');
        formattedDate = `${day}/${month}/${year}`;
      }

      if (state.personName && formattedDate) {
        ctx.fillText(state.personName.toUpperCase(), w / 2, stripY + stripH * 0.32);
        ctx.font = `600 ${Math.round(fontSize * 0.85)}px sans-serif`;
        ctx.fillText(`DOB/DOP: ${formattedDate}`, w / 2, stripY + stripH * 0.72);
      } else {
        const text = (state.personName || formattedDate).toUpperCase();
        ctx.fillText(text, w / 2, stripY + stripH / 2);
      }
      ctx.restore();
    }
  }

  // --- Sheet Grid Preview & Generation ---
  function renderSheetPreview() {
    if (!el.downloadSheetCanvas) return;
    renderPrintableSheet(el.downloadSheetCanvas, 72); // Fast 72 DPI on-screen preview
  }

  function renderPrintableSheet(targetCanvas, renderDpi = 300) {
    if (!state.croppedBitmapCanvas || !targetCanvas) return;

    // Single photo canvas rendered with current styles
    const singleCanvas = document.createElement('canvas');
    renderSinglePassportPhoto(singleCanvas, state.bgStyle === 'color');

    const sheetFormat = normalizeSheetFormat(state.sheetFormat);
    let paperWmm = 210;
    let paperHmm = 297; // A4 default

    if (sheetFormat === '4x6') {
      paperWmm = 101.6;
      paperHmm = 152.4;
    }

    const sheetPxW = mmToPx(paperWmm, renderDpi);
    const sheetPxH = mmToPx(paperHmm, renderDpi);

    targetCanvas.width = sheetPxW;
    targetCanvas.height = sheetPxH;
    const ctx = targetCanvas.getContext('2d');
    if (!ctx) return;

    // Solid paper background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, sheetPxW, sheetPxH);

    const photoWpx = mmToPx(state.photoWidthMm, renderDpi);
    const photoHpx = mmToPx(state.photoHeightMm, renderDpi);
    const gapPx = mmToPx(3, renderDpi);
    const marginPx = sheetFormat === '4x6' ? mmToPx(5, renderDpi) : mmToPx(8, renderDpi);

    let maxCols = Math.floor((sheetPxW - marginPx * 2 + gapPx) / (photoWpx + gapPx));
    let maxRows = Math.floor((sheetPxH - marginPx * 2 + gapPx) / (photoHpx + gapPx));

    let totalCount = maxCols * maxRows;
    if (sheetFormat === '3a4') {
      // 1 or 2 rows (strip)
      maxRows = Math.min(2, maxRows);
      totalCount = maxCols * maxRows;
    } else if (sheetFormat === 'custom') {
      totalCount = Math.min(state.sheetCustomCount || 8, maxCols * maxRows);
    }

    const gridW = maxCols * photoWpx + (maxCols - 1) * gapPx;
    const startX = Math.max(marginPx, (sheetPxW - gridW) / 2);
    const startY = marginPx;

    let placed = 0;
    for (let r = 0; r < maxRows; r++) {
      for (let c = 0; c < maxCols; c++) {
        if (placed >= totalCount) break;

        const x = startX + c * (photoWpx + gapPx);
        const y = startY + r * (photoHpx + gapPx);

        // Draw photo
        ctx.drawImage(singleCanvas, x, y, photoWpx, photoHpx);

        // Thin cutting guide border
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = Math.max(1, Math.round(renderDpi * 0.002));
        ctx.strokeRect(x, y, photoWpx, photoHpx);

        placed++;
      }
      if (placed >= totalCount) break;
    }

    // Clean up temporary singleCanvas
    const sCtx = singleCanvas.getContext('2d');
    if (sCtx) sCtx.clearRect(0, 0, singleCanvas.width, singleCanvas.height);
    singleCanvas.width = 1;
    singleCanvas.height = 1;
  }

  // --- Downloads ---
  function downloadSinglePhoto(mimeType, ext) {
    const canvas = document.createElement('canvas');
    renderSinglePassportPhoto(canvas, state.bgStyle === 'color');

    const filename = `${state.rawImageFilename}_passport_${state.photoWidthMm}x${state.photoHeightMm}.${ext}`;

    const cleanupCanvas = () => {
      const cCtx = canvas.getContext('2d');
      if (cCtx) cCtx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = 1;
      canvas.height = 1;
    };

    if (state.targetFileSize && state.targetFileSize !== 'max') {
      // Compress to target KB (JPEG format for strict file size limits on official portals)
      const maxBytes = parseInt(state.targetFileSize, 10) * 1024;
      compressToTargetBytes(canvas, maxBytes, (blob) => {
        cleanupCanvas();
        const outName = ext === 'png' ? filename.replace(/\.png$/, '.jpg') : filename;
        if (blob) saveBlob(blob, outName);
      });
    } else {
      canvas.toBlob((blob) => {
        cleanupCanvas();
        if (blob) saveBlob(blob, filename);
      }, mimeType, 0.98);
    }
  }

  function compressToTargetBytes(canvas, maxBytes, callback) {
    let minQuality = 0.05;
    let maxQuality = 0.98;
    let bestBlob = null;
    let iterations = 0;

    function attempt() {
      const q = (minQuality + maxQuality) / 2;
      canvas.toBlob((blob) => {
        iterations++;
        if (blob) {
          if (blob.size <= maxBytes) {
            bestBlob = blob;
            minQuality = q; // try higher quality
          } else {
            maxQuality = q; // try lower quality
          }
        }
        if (iterations < 7 && (maxQuality - minQuality) > 0.02) {
          attempt();
        } else {
          if (bestBlob) {
            callback(bestBlob);
          } else if (blob && blob.size > maxBytes) {
            // If even at minimum quality it exceeds maxBytes (e.g. 20KB limit), downscale slightly
            const factor = Math.min(0.85, Math.sqrt(maxBytes / blob.size) * 0.95);
            const scaled = document.createElement('canvas');
            scaled.width = Math.max(100, Math.round(canvas.width * factor));
            scaled.height = Math.max(100, Math.round(canvas.height * factor));
            const sctx = scaled.getContext('2d');
            if (sctx) sctx.drawImage(canvas, 0, 0, scaled.width, scaled.height);
            scaled.toBlob((finalBlob) => {
              if (sctx) sctx.clearRect(0, 0, scaled.width, scaled.height);
              scaled.width = 1;
              scaled.height = 1;
              callback(finalBlob || blob);
            }, 'image/jpeg', 0.85);
          } else {
            callback(blob);
          }
        }
      }, 'image/jpeg', q);
    }

    attempt();
  }

  let jsPdfLoadPromise = null;

  function loadJsPdf() {
    if (window.jspdf && window.jspdf.jsPDF) {
      return Promise.resolve(window.jspdf);
    }
    if (jsPdfLoadPromise) return jsPdfLoadPromise;

    jsPdfLoadPromise = new Promise((resolve, reject) => {
      if (window.jspdf && window.jspdf.jsPDF) {
        resolve(window.jspdf);
        return;
      }
      const existing = document.querySelector('script[src*="jspdf"]');
      if (existing) {
        if (window.jspdf && window.jspdf.jsPDF) {
          resolve(window.jspdf);
          return;
        }
        existing.addEventListener('load', () => {
          if (window.jspdf && window.jspdf.jsPDF) resolve(window.jspdf);
          else reject(new Error('window.jspdf not defined after script load'));
        });
        existing.addEventListener('error', () => {
          inject('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js', true);
        });
        return;
      }

      const cdnEl = document.getElementById('jspdf-cdn');
      const primarySrc = (cdnEl && cdnEl.getAttribute('data-src')) || '/js/vendor/jspdf.umd.min.js';
      const cdnFallback = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';

      function inject(src, isFallback) {
        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.onload = () => {
          if (window.jspdf && window.jspdf.jsPDF) {
            resolve(window.jspdf);
          } else if (!isFallback) {
            inject(cdnFallback, true);
          } else {
            jsPdfLoadPromise = null;
            reject(new Error('jsPDF loaded but window.jspdf not defined'));
          }
        };
        s.onerror = (e) => {
          if (!isFallback) {
            inject(cdnFallback, true);
          } else {
            jsPdfLoadPromise = null;
            reject(e);
          }
        };
        document.head.appendChild(s);
      }

      inject(primarySrc, false);
    });

    return jsPdfLoadPromise;
  }

  async function downloadSheetPDF() {
    const btn = el.btnDownloadSheetPdf;
    const originalContent = btn ? btn.innerHTML : '';

    if (btn) {
      btn.disabled = true;
      btn.style.pointerEvents = 'none';
      btn.setAttribute('aria-busy', 'true');
      btn.innerHTML = '<span class="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent mr-1"></span> Preparing PDF...';
    }

    try {
      if (typeof window.jspdf === 'undefined' || !window.jspdf.jsPDF) {
        await loadJsPdf();
      }

      if (!window.jspdf || !window.jspdf.jsPDF) {
        throw new Error('PDF library unavailable');
      }

      const { jsPDF } = window.jspdf;
      const sheetFormat = normalizeSheetFormat(state.sheetFormat);
      const is4x6 = sheetFormat === '4x6';
      const paperW = is4x6 ? 101.6 : 210;
      const paperH = is4x6 ? 152.4 : 297;
      const format = is4x6 ? [101.6, 152.4] : 'a4';

      // Render full 300 DPI sheet
      const sheetCanvas = document.createElement('canvas');
      renderPrintableSheet(sheetCanvas, 300);

      const imgData = sheetCanvas.toDataURL('image/jpeg', 0.98);

      // Clean up temporary canvas
      const sCtx = sheetCanvas.getContext('2d');
      if (sCtx) sCtx.clearRect(0, 0, sheetCanvas.width, sheetCanvas.height);
      sheetCanvas.width = 1;
      sheetCanvas.height = 1;

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: format,
        compress: true
      });

      // 100% scale - matches exact paper millimeter dimensions
      pdf.addImage(imgData, 'JPEG', 0, 0, paperW, paperH, undefined, 'SLOW');
      pdf.save(`${state.rawImageFilename}_printable_sheet.pdf`);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      alert('Failed to generate PDF. Please ensure your browser has an active internet connection or try downloading as JPG.');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.style.pointerEvents = '';
        btn.removeAttribute('aria-busy');
        btn.innerHTML = originalContent;
      }
    }
  }

  function downloadSheetJPG() {
    const sheetCanvas = document.createElement('canvas');
    renderPrintableSheet(sheetCanvas, 300);

    sheetCanvas.toBlob((blob) => {
      const sCtx = sheetCanvas.getContext('2d');
      if (sCtx) sCtx.clearRect(0, 0, sheetCanvas.width, sheetCanvas.height);
      sheetCanvas.width = 1;
      sheetCanvas.height = 1;

      if (blob) {
        saveBlob(blob, `${state.rawImageFilename}_printable_sheet.jpg`);
      }
    }, 'image/jpeg', 0.98);
  }

  function saveBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function resetAll() {
    // 1. Revoke and release source image resources
    if (state.rawImageUrl) {
      URL.revokeObjectURL(state.rawImageUrl);
      state.rawImageUrl = null;
    }
    if (state.rawImage) {
      state.rawImage.onload = null;
      state.rawImage.onerror = null;
      state.rawImage.src = '';
      state.rawImage = null;
    }

    // 2. Free and resize all offscreen and working canvas buffers
    function releaseCanvas(c) {
      if (!c) return;
      try {
        const ctx = c.getContext('2d');
        if (ctx) {
          ctx.filter = 'none';
          ctx.clearRect(0, 0, c.width, c.height);
        }
      } catch {}
      c.width = 1;
      c.height = 1;
    }

    releaseCanvas(state.croppedBitmapCanvas);
    state.croppedBitmapCanvas = null;

    releaseCanvas(state.segmentedPersonCanvas);
    state.segmentedPersonCanvas = null;

    releaseCanvas(state.finalSingleCanvas);
    state.finalSingleCanvas = null;

    const workingCanvases = [
      el.cropCanvas,
      el.canvasPreviewOriginal,
      el.canvasPreviewColor,
      el.downloadSingleCanvas,
      el.downloadSheetCanvas
    ];
    workingCanvases.forEach(releaseCanvas);

    // 3. Reset application state
    state.rawImageFilename = 'passport_photo';
    state.bgSampleColor = null;
    state.isPickingBgColor = false;
    state.bgTolerance = 25;
    state.bgStyle = 'original';
    state.bgColor = '#ffffff';
    state.cropRatioLocked = false;
    state.isDraggingCrop = false;
    state.activeHandle = null;
    state.cropScaleRatio = 1;
    state.writeNameDate = false;
    state.personName = '';
    state.personDate = '';
    state.brightness = 100;
    state.contrast = 100;
    state.saturation = 100;
    state.zoomFactor = 1.0;
    state.targetFileSize = 'max';
    state.sheetFormat = '3a4';
    state.step = 'size';

    activeAdjustMode = null;

    // 4. Reset input DOM elements
    if (el.fileInput) el.fileInput.value = '';
    if (el.targetKbSelect) el.targetKbSelect.value = 'max';
    if (el.bgToleranceSlider) el.bgToleranceSlider.value = 25;
    if (el.bgToleranceVal) el.bgToleranceVal.textContent = '25%';
    if (el.checkNameDate) el.checkNameDate.checked = false;
    if (el.nameDateFields) el.nameDateFields.classList.add('hidden');
    if (el.inputPersonName) el.inputPersonName.value = '';
    if (el.inputPersonDate) el.inputPersonDate.value = '';
    if (el.cropSliderBar) el.cropSliderBar.classList.add('hidden');
    if (el.cropSlider) el.cropSlider.value = 100;
    if (el.cropSliderLabel) el.cropSliderLabel.textContent = '100%';
    if (el.pickBgBtnText) el.pickBgBtnText.textContent = 'Pick Color from Photo';
    if (el.canvasPreviewOriginal) el.canvasPreviewOriginal.style.cursor = 'default';
    if (el.canvasPreviewColor) el.canvasPreviewColor.style.cursor = 'default';

    const radio3a4 = document.getElementById('sheet-fmt-3a4') || document.getElementById('sheet-fmt-3-a4');
    if (radio3a4) radio3a4.checked = true;

    // 5. Reset wizard panels
    if (el.panelSize) el.panelSize.classList.remove('hidden');
    if (el.panelCrop) el.panelCrop.classList.add('hidden');
    if (el.panelBg) el.panelBg.classList.add('hidden');
    if (el.panelDownload) el.panelDownload.classList.add('hidden');

    // 6. Reset step tab styles
    if (el.stepTabs) {
      el.stepTabs.forEach(tab => {
        const isSize = tab.dataset.step === 'size';
        tab.setAttribute('aria-selected', isSize ? 'true' : 'false');
        if (isSize) {
          tab.classList.add('bg-blue-700', 'text-white', 'shadow-sm', 'font-bold');
          tab.classList.remove('text-slate-600', 'dark:text-slate-300', 'font-semibold', 'hover:text-slate-900', 'dark:hover:text-white');
        } else {
          tab.classList.remove('bg-blue-700', 'text-white', 'shadow-sm', 'font-bold');
          tab.classList.add('text-slate-600', 'dark:text-slate-300', 'font-semibold', 'hover:text-slate-900', 'dark:hover:text-white');
        }
      });
    }

    // 7. Toggle Hero Upload and Studio Containers
    if (el.studioContainer) el.studioContainer.classList.add('hidden');
    if (el.heroUpload) el.heroUpload.classList.remove('hidden');
  }

  // Defer initialization for instant initial page paint & support Astro transitions
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('astro:page-load', () => {
    cacheElements();
    if (el.heroUpload || el.studioContainer) {
      cropEventsBound = false;
      bindEvents();
    }
  });
})();
