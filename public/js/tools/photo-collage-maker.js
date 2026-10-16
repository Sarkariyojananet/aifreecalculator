/**
 * Advanced Photo Collage & Print Layout Generator
 * 100% Client-Side HTML5 Canvas & jsPDF Engine
 */

(function () {
  'use strict';

  // --- Preset Canvas Sizes ---
  // Physical dimensions (mmW, mmH) and exact PDF page format for every preset
  const PRESET_SIZES = {
    // Print Sizes (Calculated at 300 DPI for physical print accuracy)
    'a4-p': { name: 'A4 (210×297 mm)', width: 2480, height: 3508, dpi: 300, unit: 'mm', mmW: 210, mmH: 297, pdfFormat: 'a4', pdfOrientation: 'p' },
    'a4-l': { name: 'A4 Landscape (297×210 mm)', width: 3508, height: 2480, dpi: 300, unit: 'mm', mmW: 297, mmH: 210, pdfFormat: 'a4', pdfOrientation: 'l' },
    'legal-p': { name: 'Legal (8.5×14 in)', width: 2550, height: 4200, dpi: 300, unit: 'in', mmW: 215.9, mmH: 355.6, pdfFormat: 'legal', pdfOrientation: 'p' },
    'legal-l': { name: 'Legal Landscape (14×8.5 in)', width: 4200, height: 2550, dpi: 300, unit: 'in', mmW: 355.6, mmH: 215.9, pdfFormat: 'legal', pdfOrientation: 'l' },
    'letter-p': { name: 'Letter (8.5×11 in)', width: 2550, height: 3300, dpi: 300, unit: 'in', mmW: 215.9, mmH: 279.4, pdfFormat: 'letter', pdfOrientation: 'p' },
    'letter-l': { name: 'Letter Landscape (11×8.5 in)', width: 3300, height: 2550, dpi: 300, unit: 'in', mmW: 279.4, mmH: 215.9, pdfFormat: 'letter', pdfOrientation: 'l' },
    '4x6-p': { name: '4 × 6 Photo Print (4×6 in)', width: 1200, height: 1800, dpi: 300, unit: 'in', mmW: 101.6, mmH: 152.4, pdfFormat: [101.6, 152.4], pdfOrientation: 'p' },
    '4x6-l': { name: '6 × 4 Photo Print (6×4 in)', width: 1800, height: 1200, dpi: 300, unit: 'in', mmW: 152.4, mmH: 101.6, pdfFormat: [152.4, 101.6], pdfOrientation: 'l' },
    // Social Media Sizes (Exact mm dimensions matching resolution at 96 DPI, exact custom [width, height] PDF format)
    'insta-square': { name: 'Instagram Square (1080×1080 px)', width: 1080, height: 1080, dpi: 96, unit: 'px', mmW: 285.75, mmH: 285.75, pdfFormat: [285.75, 285.75], pdfOrientation: 'p' },
    'insta-portrait': { name: 'Instagram Portrait (1080×1350 px)', width: 1080, height: 1350, dpi: 96, unit: 'px', mmW: 285.75, mmH: 357.19, pdfFormat: [285.75, 357.19], pdfOrientation: 'p' },
    'insta-story': { name: 'Story / Reel / TikTok (1080×1920 px)', width: 1080, height: 1920, dpi: 96, unit: 'px', mmW: 285.75, mmH: 508.0, pdfFormat: [285.75, 508.0], pdfOrientation: 'p' },
    'fb-post': { name: 'Facebook Post (1200×630 px)', width: 1200, height: 630, dpi: 96, unit: 'px', mmW: 317.5, mmH: 166.69, pdfFormat: [317.5, 166.69], pdfOrientation: 'l' },
    'fb-cover': { name: 'Facebook Cover (1640×924 px)', width: 1640, height: 924, dpi: 96, unit: 'px', mmW: 433.92, mmH: 244.48, pdfFormat: [433.92, 244.48], pdfOrientation: 'l' },
    'x-header': { name: 'Twitter / X Header (1500×500 px)', width: 1500, height: 500, dpi: 96, unit: 'px', mmW: 396.88, mmH: 132.29, pdfFormat: [396.88, 132.29], pdfOrientation: 'l' }
  };

  // --- Layout Generators (Normalized 0.0 - 1.0 bounding boxes) ---
  const LAYOUTS = {
    // 2 Photos
    '2-vert': {
      id: '2-vert', name: '2 Photos (1×2 side by side)', count: 2, category: 'simple',
      slots: [
        { x: 0, y: 0, w: 0.5, h: 1 },
        { x: 0.5, y: 0, w: 0.5, h: 1 }
      ]
    },
    '2-horiz': {
      id: '2-horiz', name: '2 Photos (2×1 stacked)', count: 2, category: 'simple',
      slots: [
        { x: 0, y: 0, w: 1, h: 0.5 },
        { x: 0, y: 0.5, w: 1, h: 0.5 }
      ]
    },

    // 3 Photos
    '3-top-split': {
      id: '3-top-split', name: '3 Photos (1 top, 2 bottom)', count: 3, category: 'simple',
      slots: [
        { x: 0, y: 0, w: 1, h: 0.5 },
        { x: 0, y: 0.5, w: 0.5, h: 0.5 },
        { x: 0.5, y: 0.5, w: 0.5, h: 0.5 }
      ]
    },
    '3-left-split': {
      id: '3-left-split', name: '3 Photos (1 left, 2 right)', count: 3, category: 'advanced',
      slots: [
        { x: 0, y: 0, w: 0.5, h: 1 },
        { x: 0.5, y: 0, w: 0.5, h: 0.5 },
        { x: 0.5, y: 0.5, w: 0.5, h: 0.5 }
      ]
    },
    '3-triptych': {
      id: '3-triptych', name: '3 Photos (3 vertical strips)', count: 3, category: 'simple',
      slots: [
        { x: 0, y: 0, w: 1 / 3, h: 1 },
        { x: 1 / 3, y: 0, w: 1 / 3, h: 1 },
        { x: 2 / 3, y: 0, w: 1 / 3, h: 1 }
      ]
    },

    // 4 Photos
    '4-grid': {
      id: '4-grid', name: '4 Photos (2×2 grid)', count: 4, category: 'simple',
      slots: [
        { x: 0, y: 0, w: 0.5, h: 0.5 },
        { x: 0.5, y: 0, w: 0.5, h: 0.5 },
        { x: 0, y: 0.5, w: 0.5, h: 0.5 },
        { x: 0.5, y: 0.5, w: 0.5, h: 0.5 }
      ]
    },
    '4-hero-sidebar': {
      id: '4-hero-sidebar', name: '4 Photos (1 hero, 3 stacked)', count: 4, category: 'advanced',
      slots: [
        { x: 0, y: 0, w: 0.66, h: 1 },
        { x: 0.66, y: 0, w: 0.34, h: 1 / 3 },
        { x: 0.66, y: 1 / 3, w: 0.34, h: 1 / 3 },
        { x: 0.66, y: 2 / 3, w: 0.34, h: 1 / 3 }
      ]
    },
    '4-masonry': {
      id: '4-masonry', name: '4 Photos (masonry)', count: 4, category: 'advanced',
      slots: [
        { x: 0, y: 0, w: 0.5, h: 0.6 },
        { x: 0.5, y: 0, w: 0.5, h: 0.4 },
        { x: 0, y: 0.6, w: 0.5, h: 0.4 },
        { x: 0.5, y: 0.4, w: 0.5, h: 0.6 }
      ]
    },

    // 6 Photos
    '6-grid-3x2': {
      id: '6-grid-3x2', name: '6 Photos (3×2 grid)', count: 6, category: 'simple',
      slots: [
        { x: 0, y: 0, w: 0.5, h: 1 / 3 },
        { x: 0.5, y: 0, w: 0.5, h: 1 / 3 },
        { x: 0, y: 1 / 3, w: 0.5, h: 1 / 3 },
        { x: 0.5, y: 1 / 3, w: 0.5, h: 1 / 3 },
        { x: 0, y: 2 / 3, w: 0.5, h: 1 / 3 },
        { x: 0.5, y: 2 / 3, w: 0.5, h: 1 / 3 }
      ]
    },
    '6-grid-2x3': {
      id: '6-grid-2x3', name: '6 Photos (2×3 grid)', count: 6, category: 'simple',
      slots: [
        { x: 0, y: 0, w: 1 / 3, h: 0.5 },
        { x: 1 / 3, y: 0, w: 1 / 3, h: 0.5 },
        { x: 2 / 3, y: 0, w: 1 / 3, h: 0.5 },
        { x: 0, y: 0.5, w: 1 / 3, h: 0.5 },
        { x: 1 / 3, y: 0.5, w: 1 / 3, h: 0.5 },
        { x: 2 / 3, y: 0.5, w: 1 / 3, h: 0.5 }
      ]
    },
    '6-hero-center': {
      id: '6-hero-center', name: '6 Photos (center mosaic)', count: 6, category: 'advanced',
      slots: [
        { x: 0, y: 0, w: 0.33, h: 0.5 },
        { x: 0.33, y: 0, w: 0.34, h: 0.5 },
        { x: 0.67, y: 0, w: 0.33, h: 0.5 },
        { x: 0, y: 0.5, w: 0.33, h: 0.5 },
        { x: 0.33, y: 0.5, w: 0.34, h: 0.5 },
        { x: 0.67, y: 0.5, w: 0.33, h: 0.5 }
      ]
    },

    // 8 Photos (Print / Passport Photo Grid)
    '8-grid-4x2': {
      id: '8-grid-4x2', name: '8 Photos (4×2 passport grid)', count: 8, category: 'simple',
      slots: [
        { x: 0, y: 0, w: 0.5, h: 0.25 },
        { x: 0.5, y: 0, w: 0.5, h: 0.25 },
        { x: 0, y: 0.25, w: 0.5, h: 0.25 },
        { x: 0.5, y: 0.25, w: 0.5, h: 0.25 },
        { x: 0, y: 0.5, w: 0.5, h: 0.25 },
        { x: 0.5, y: 0.5, w: 0.5, h: 0.25 },
        { x: 0, y: 0.75, w: 0.5, h: 0.25 },
        { x: 0.5, y: 0.75, w: 0.5, h: 0.25 }
      ]
    },
    '8-grid-2x4': {
      id: '8-grid-2x4', name: '8 Photos (2×4 grid)', count: 8, category: 'simple',
      slots: [
        { x: 0, y: 0, w: 0.25, h: 0.5 },
        { x: 0.25, y: 0, w: 0.25, h: 0.5 },
        { x: 0.5, y: 0, w: 0.25, h: 0.5 },
        { x: 0.75, y: 0, w: 0.25, h: 0.5 },
        { x: 0, y: 0.5, w: 0.25, h: 0.5 },
        { x: 0.25, y: 0.5, w: 0.25, h: 0.5 },
        { x: 0.5, y: 0.5, w: 0.25, h: 0.5 },
        { x: 0.75, y: 0.5, w: 0.25, h: 0.5 }
      ]
    },
    '8-scrapbook': {
      id: '8-scrapbook', name: '8 Photos (scrapbook)', count: 8, category: 'advanced',
      slots: [
        { x: 0, y: 0, w: 0.5, h: 0.35 },
        { x: 0.5, y: 0, w: 0.5, h: 0.35 },
        { x: 0, y: 0.35, w: 1 / 3, h: 0.35 },
        { x: 1 / 3, y: 0.35, w: 1 / 3, h: 0.35 },
        { x: 2 / 3, y: 0.35, w: 1 / 3, h: 0.35 },
        { x: 0, y: 0.7, w: 1 / 3, h: 0.3 },
        { x: 1 / 3, y: 0.7, w: 1 / 3, h: 0.3 },
        { x: 2 / 3, y: 0.7, w: 1 / 3, h: 0.3 }
      ]
    }
  };

  // --- State ---
  const state = {
    canvasPreset: 'a4-p',
    width: 2480,
    height: 3508,
    dpi: 300,
    currentLayoutId: '4-grid',
    gapMm: 3,
    marginMm: 6,
    borderRadiusMm: 2,
    borderWidthMm: 0,
    borderStyle: 'none',
    borderColor: '#000000',
    bgColor: '#ffffff',
    shadowEnabled: false,
    cropMarks: false,
    globalFitMode: 'cover',
    headerText: '',
    headerFontSizePt: 18,
    headerColor: '#1e293b',
    headerAlign: 'center',
    headerBold: false,
    headerUnderline: false,
    headerItalic: false,

    // Uploaded library: Array<{ id: string, img: HTMLImageElement, name: string, src: string, objectUrl?: string | null }>
    library: [],

    // Active Slot assignments: Array<{ imageId: string | null, zoom: number, panX: number, panY: number, rotation: number, fitMode: 'cover' | 'contain', flipH: boolean, flipV: boolean }>
    slotsData: [],

    // Persistent Slot History: Map of index -> slot settings so photos and settings are NOT lost when switching layouts
    slotHistory: {},

    selectedSlotIndex: 0,

    // Pointer Interaction State
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    dragSlotIndex: -1,
    previewScale: 1.0
  };

  // DOM Elements
  let canvas, ctx, canvasWrapper;
  let sizeSelect, layoutDropdown, globalFitSelect;
  let photoSlotsContainer;
  let borderStyleSelect, borderWidthInput, roundedCornersInput, gapInput, pageMarginInput, cropMarksCheck;
  let headerTextInput, headerSizeInput, headerColorInput, headerBoldCheck, headerUnderlineCheck, headerItalicCheck, headerAlignSelect;
  let bgColorInput, bgTransparentCheck, shadowToggle;

  // Inline Adjust Panel Elements
  let inlineAdjustPanel, inlineAdjustTitle, inlineAdjustStatus;
  let inlineSlotZoom, inlineSlotZoomVal;
  let inlineSlotRotate, inlineSlotRotateVal;
  let inlineSlotPanX, inlineSlotPanXVal;
  let inlineSlotPanY, inlineSlotPanYVal;
  let inlineBtnReset, inlineBtnFit, inlineBtnFill, inlineBtnFlipH, inlineBtnFlipV;

  let downloadPngBtn, downloadJpgBtn, downloadPdfBtn;
  let statusResolution, statusDpi;

  // AbortController for clean, idempotent event listener lifecycle under Astro
  let activeAbortController = null;

  function cleanupListeners() {
    if (activeAbortController) {
      activeAbortController.abort();
      activeAbortController = null;
    }
  }

  function mmToPx(mm) {
    return Math.round((mm * state.dpi) / 25.4);
  }

  function ptToPx(pt) {
    return Math.round((pt * state.dpi) / 72);
  }

  function init() {
    cleanupListeners();

    canvas = document.getElementById('collage-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvasWrapper = document.getElementById('canvas-wrapper');

    // Top Bar Selectors
    sizeSelect = document.getElementById('preset-size-select');
    layoutDropdown = document.getElementById('layout-select-dropdown');
    globalFitSelect = document.getElementById('global-fit-select');

    // Interactive Photo Slots Container
    photoSlotsContainer = document.getElementById('photo-slots-container');

    // Spacing, Borders, Crop Marks & Header Text
    borderStyleSelect = document.getElementById('border-style-select');
    borderWidthInput = document.getElementById('input-border-width-mm');
    roundedCornersInput = document.getElementById('input-rounded-corners-mm');
    gapInput = document.getElementById('input-gap-mm');
    pageMarginInput = document.getElementById('input-page-margin-mm');
    cropMarksCheck = document.getElementById('check-crop-marks');

    headerTextInput = document.getElementById('input-header-text');
    headerSizeInput = document.getElementById('input-header-size-pt');
    headerColorInput = document.getElementById('input-header-color');
    headerBoldCheck = document.getElementById('check-header-bold');
    headerUnderlineCheck = document.getElementById('check-header-underline');
    headerItalicCheck = document.getElementById('check-header-italic');
    headerAlignSelect = document.getElementById('select-header-align');

    bgColorInput = document.getElementById('color-bg');
    bgTransparentCheck = document.getElementById('check-bg-transparent');
    shadowToggle = document.getElementById('toggle-shadow');

    // Inline Adjust Panel Elements
    inlineAdjustPanel = document.getElementById('inline-adjust-panel');
    inlineAdjustTitle = document.getElementById('inline-adjust-title');
    inlineAdjustStatus = document.getElementById('inline-adjust-status');
    inlineSlotZoom = document.getElementById('inline-slot-zoom');
    inlineSlotZoomVal = document.getElementById('inline-slot-zoom-val');
    inlineSlotRotate = document.getElementById('inline-slot-rotate');
    inlineSlotRotateVal = document.getElementById('inline-slot-rotate-val');
    inlineSlotPanX = document.getElementById('inline-slot-panx');
    inlineSlotPanXVal = document.getElementById('inline-slot-panx-val');
    inlineSlotPanY = document.getElementById('inline-slot-pany');
    inlineSlotPanYVal = document.getElementById('inline-slot-pany-val');
    inlineBtnReset = document.getElementById('inline-btn-reset-adjust');
    inlineBtnFit = document.getElementById('inline-btn-fit');
    inlineBtnFill = document.getElementById('inline-btn-fill');
    inlineBtnFlipH = document.getElementById('inline-btn-fliph');
    inlineBtnFlipV = document.getElementById('inline-btn-flipv');

    // Export Buttons
    downloadPngBtn = document.getElementById('btn-download-png');
    downloadJpgBtn = document.getElementById('btn-download-jpg');
    downloadPdfBtn = document.getElementById('btn-download-pdf');

    // Status bar
    statusResolution = document.getElementById('status-resolution');
    statusDpi = document.getElementById('status-dpi');

    if (bgTransparentCheck) {
      bgTransparentCheck.checked = (state.bgColor === 'transparent');
      if (bgColorInput) bgColorInput.disabled = (state.bgColor === 'transparent');
    }

    // Initialize layout and presets
    applyPresetSize(state.canvasPreset || 'a4-p');
    applyLayout(state.currentLayoutId || '4-grid');
    bindEvents();
    renderSlotCards();
    updateInlineAdjustPanel();
    renderCollage();
  }

  // Maximum preview canvas dimension (ensures sharp Retina display while keeping memory <5MB and render <5ms)
  const MAX_PREVIEW_DIMENSION = 1400;

  function updatePreviewCanvasSize() {
    if (!canvas) return;
    const maxDim = Math.max(state.width, state.height);
    state.previewScale = maxDim > MAX_PREVIEW_DIMENSION ? (MAX_PREVIEW_DIMENSION / maxDim) : 1.0;
    canvas.width = Math.round(state.width * state.previewScale);
    canvas.height = Math.round(state.height * state.previewScale);

    if (canvasWrapper) {
      canvas.style.aspectRatio = `${state.width} / ${state.height}`;
    }
  }

  // --- Apply Preset Size ---
  function applyPresetSize(key) {
    const preset = PRESET_SIZES[key] || PRESET_SIZES['a4-p'];
    state.canvasPreset = key;
    state.width = preset.width;
    state.height = preset.height;
    state.dpi = preset.dpi;

    updatePreviewCanvasSize();

    if (statusResolution) statusResolution.textContent = `${state.width} × ${state.height} px`;
    if (statusDpi) statusDpi.textContent = `${state.dpi} DPI`;

    if (sizeSelect && sizeSelect.value !== key) {
      sizeSelect.value = key;
    }

    renderCollage();
  }

  // --- Apply Selected Layout with Photo Preservation ---
  function applyLayout(layoutId) {
    const layout = LAYOUTS[layoutId];
    if (!layout) return;
    state.currentLayoutId = layoutId;

    // 1. Snapshot all currently configured slots into slotHistory to prevent data loss
    state.slotsData.forEach((s, idx) => {
      if (s) {
        state.slotHistory[idx] = { ...s };
      }
    });

    // 2. Build new slots array restoring previous photo assignments and transformation settings
    const newSlotsData = [];
    layout.slots.forEach((_, idx) => {
      const historic = state.slotHistory[idx];
      if (historic && historic.imageId && state.library.some((img) => img.id === historic.imageId)) {
        newSlotsData.push({ ...historic });
      } else if (state.slotsData[idx] && state.slotsData[idx].imageId && state.library.some((img) => img.id === state.slotsData[idx].imageId)) {
        newSlotsData.push({ ...state.slotsData[idx] });
      } else if (state.library[idx]) {
        newSlotsData.push({
          imageId: state.library[idx].id,
          zoom: 1,
          panX: 0,
          panY: 0,
          rotation: 0,
          fitMode: state.globalFitMode,
          flipH: false,
          flipV: false
        });
      } else {
        newSlotsData.push({
          imageId: null,
          zoom: 1,
          panX: 0,
          panY: 0,
          rotation: 0,
          fitMode: state.globalFitMode,
          flipH: false,
          flipV: false
        });
      }
    });

    state.slotsData = newSlotsData;
    if (state.selectedSlotIndex >= layout.slots.length) {
      state.selectedSlotIndex = 0;
    }

    if (layoutDropdown && layoutDropdown.value !== layoutId) {
      layoutDropdown.value = layoutId;
    }

    // Do NOT delete photos from library on layout switch - preserve them for when user switches back!
    updateInlineAdjustPanel();
    renderSlotCards();
    renderCollage();
  }

  // --- Memory Management Helpers ---
  function revokeLibraryItem(item) {
    if (!item) return;
    if (item.objectUrl) {
      try {
        URL.revokeObjectURL(item.objectUrl);
      } catch (e) {}
      item.objectUrl = null;
    }
    if (item.src && typeof item.src === 'string' && item.src.startsWith('blob:')) {
      try {
        URL.revokeObjectURL(item.src);
      } catch (e) {}
    }
    if (item.img) {
      item.img.onload = null;
      item.img.onerror = null;
      item.img.src = '';
      item.img = null;
    }
  }

  const MAX_LIBRARY_SIZE = 24;

  function limitLibrarySize() {
    if (state.library.length > MAX_LIBRARY_SIZE) {
      const activeIds = new Set(state.slotsData.map((s) => s && s.imageId).filter(Boolean));
      const historicIds = new Set(Object.values(state.slotHistory).map((s) => s && s.imageId).filter(Boolean));

      while (state.library.length > MAX_LIBRARY_SIZE) {
        const unusedIdx = state.library.findIndex((item) => !activeIds.has(item.id) && !historicIds.has(item.id));
        if (unusedIdx !== -1) {
          revokeLibraryItem(state.library[unusedIdx]);
          state.library.splice(unusedIdx, 1);
        } else {
          break;
        }
      }
    }
  }

  function removeImageFromSlot(slotIndex, shouldRender = true) {
    const slotData = state.slotsData[slotIndex];
    if (!slotData) return;

    const removedImageId = slotData.imageId;

    slotData.imageId = null;
    slotData.zoom = 1;
    slotData.panX = 0;
    slotData.panY = 0;
    slotData.rotation = 0;

    if (state.slotHistory[slotIndex]) {
      state.slotHistory[slotIndex].imageId = null;
    }

    // If this image is no longer referenced anywhere in active or historic slots, remove and revoke it
    if (removedImageId) {
      const isUsedInActive = state.slotsData.some((s) => s && s.imageId === removedImageId);
      const isUsedInHistory = Object.values(state.slotHistory).some((s) => s && s.imageId === removedImageId);
      if (!isUsedInActive && !isUsedInHistory) {
        const libIndex = state.library.findIndex((item) => item.id === removedImageId);
        if (libIndex !== -1) {
          revokeLibraryItem(state.library[libIndex]);
          state.library.splice(libIndex, 1);
        }
      }
    }

    if (shouldRender) {
      updateInlineAdjustPanel();
      renderSlotCards();
      renderCollage();
    }
  }

  // --- Render Interactive Slot Containers ---
  function renderSlotCards() {
    if (!photoSlotsContainer) return;
    photoSlotsContainer.innerHTML = '';

    const layout = LAYOUTS[state.currentLayoutId];
    if (!layout) return;

    layout.slots.forEach((slot, index) => {
      const slotData = state.slotsData[index] || {};
      const libItem = state.library.find((img) => img.id === slotData.imageId);
      const isSelected = index === state.selectedSlotIndex;

      const card = document.createElement('div');
      card.className = `relative flex items-center justify-center rounded-2xl h-32 sm:h-36 overflow-hidden transition-all ${
        isSelected
          ? 'ring-3 ring-blue-500 border-2 border-blue-500 shadow-md'
          : 'border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
      } bg-white dark:bg-slate-900/60`;

      if (libItem && libItem.src) {
        // FILLED SLOT CONTAINER
        card.classList.remove('border-dashed');
        card.classList.add('border-solid');

        const imgEl = document.createElement('img');
        imgEl.src = libItem.src;
        imgEl.className = 'w-full h-full object-cover select-none pointer-events-none';
        card.appendChild(imgEl);

        // Edit Button (Pencil Icon on Top-Left)
        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.className = 'absolute top-2 left-2 w-7 h-7 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white flex items-center justify-center text-[11px] shadow-md transition transform hover:scale-110 z-10';
        editBtn.innerHTML = '✏️';
        editBtn.title = `Adjust Photo ${index + 1}`;
        editBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          selectSlot(index);
          if (inlineAdjustPanel) {
            inlineAdjustPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        });
        card.appendChild(editBtn);

        // Delete Button (Cross Icon on Top-Right with memory cleanup)
        const delBtn = document.createElement('button');
        delBtn.type = 'button';
        delBtn.className = 'absolute top-2 right-2 w-7 h-7 rounded-full bg-slate-900/80 hover:bg-rose-600 text-white flex items-center justify-center text-[11px] shadow-md transition transform hover:scale-110 z-10';
        delBtn.innerHTML = '✕';
        delBtn.title = `Remove Photo ${index + 1}`;
        delBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          removeImageFromSlot(index);
        });
        card.appendChild(delBtn);

        // Slot Label pill at bottom
        const labelPill = document.createElement('div');
        labelPill.className = 'absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-slate-900/70 text-white text-[10px] font-semibold backdrop-blur-xs pointer-events-none';
        labelPill.textContent = `Photo ${index + 1}`;
        card.appendChild(labelPill);

        card.addEventListener('click', () => {
          selectSlot(index);
        });

        // Drag & Drop to replace image on filled card
        ['dragenter', 'dragover'].forEach((eventName) => {
          card.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            card.classList.add('ring-3', 'ring-blue-500');
          });
        });
        ['dragleave', 'drop'].forEach((eventName) => {
          card.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            card.classList.remove('ring-3', 'ring-blue-500');
          });
        });
        card.addEventListener('drop', (e) => {
          if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
            uploadSingleFileToSlot(e.dataTransfer.files[0], index);
          }
        });
      } else {
        // EMPTY SLOT CONTAINER
        card.classList.add('cursor-pointer', 'hover:bg-blue-50/30', 'dark:hover:bg-blue-950/20');

        const centerText = document.createElement('div');
        centerText.className = 'flex flex-col items-center justify-center text-center p-3 space-y-1';
        centerText.innerHTML = `
          <span class="text-base font-bold text-slate-500 dark:text-slate-400">Photo ${index + 1}</span>
          <span class="text-[11px] text-slate-400 dark:text-slate-500">Click or Drop Photo Here</span>
        `;
        card.appendChild(centerText);

        // Hidden slot file input
        const slotFileInput = document.createElement('input');
        slotFileInput.type = 'file';
        slotFileInput.accept = 'image/*';
        slotFileInput.className = 'hidden';
        slotFileInput.addEventListener('click', (e) => {
          e.stopPropagation();
        });
        slotFileInput.addEventListener('change', (e) => {
          if (e.target.files && e.target.files[0]) {
            uploadSingleFileToSlot(e.target.files[0], index);
            e.target.value = '';
          }
        });
        card.appendChild(slotFileInput);

        card.addEventListener('click', () => {
          selectSlot(index);
          slotFileInput.click();
        });

        // Drag & Drop directly onto this card
        ['dragenter', 'dragover'].forEach((eventName) => {
          card.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            card.classList.add('border-blue-500', 'bg-blue-50/50');
          });
        });
        ['dragleave', 'drop'].forEach((eventName) => {
          card.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            card.classList.remove('border-blue-500', 'bg-blue-50/50');
          });
        });
        card.addEventListener('drop', (e) => {
          if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
            uploadSingleFileToSlot(e.dataTransfer.files[0], index);
          }
        });
      }

      photoSlotsContainer.appendChild(card);
    });
  }

  // --- Downscale & Load Image Helper (Guard max 4000px dimension) ---
  const MAX_IMAGE_DIMENSION = 4000;

  async function loadImageFromFile(file) {
    let imgBitmap = null;
    let naturalW = 0;
    let naturalH = 0;

    if (typeof window.createImageBitmap === 'function') {
      try {
        imgBitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
        naturalW = imgBitmap.width;
        naturalH = imgBitmap.height;
      } catch (e) {
        imgBitmap = null;
      }
    }

    const isTooLarge = Math.max(naturalW, naturalH) > MAX_IMAGE_DIMENSION;

    if (imgBitmap && !isTooLarge) {
      if (typeof imgBitmap.close === 'function') imgBitmap.close();
      const objectUrl = URL.createObjectURL(file);
      const img = new Image();
      await new Promise((res, rej) => {
        img.onload = res;
        img.onerror = (e) => {
          URL.revokeObjectURL(objectUrl);
          rej(e);
        };
        img.src = objectUrl;
      });
      return { img, objectUrl };
    } else if (imgBitmap && isTooLarge) {
      // Downscale high-resolution photo (>4000px) proportionally to prevent memory crashes
      const ratio = Math.min(MAX_IMAGE_DIMENSION / naturalW, MAX_IMAGE_DIMENSION / naturalH);
      const dw = Math.round(naturalW * ratio);
      const dh = Math.round(naturalH * ratio);

      const downscaleCanvas = document.createElement('canvas');
      downscaleCanvas.width = dw;
      downscaleCanvas.height = dh;
      const dCtx = downscaleCanvas.getContext('2d');
      if (dCtx) {
        dCtx.imageSmoothingEnabled = true;
        dCtx.imageSmoothingQuality = 'high';
        dCtx.drawImage(imgBitmap, 0, 0, dw, dh);
      }
      if (typeof imgBitmap.close === 'function') imgBitmap.close();

      const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
      const blob = await new Promise((res) => downscaleCanvas.toBlob(res, mime, 0.92));

      if (dCtx) dCtx.clearRect(0, 0, dw, dh);
      downscaleCanvas.width = 1;
      downscaleCanvas.height = 1;

      if (!blob) throw new Error('Downscaling failed');
      const objectUrl = URL.createObjectURL(blob);
      const img = new Image();
      await new Promise((res, rej) => {
        img.onload = res;
        img.onerror = (e) => {
          URL.revokeObjectURL(objectUrl);
          rej(e);
        };
        img.src = objectUrl;
      });
      return { img, objectUrl };
    }

    // Fallback: Standard Image element loading
    const initialUrl = URL.createObjectURL(file);
    const rawImg = new Image();
    await new Promise((res, rej) => {
      rawImg.onload = res;
      rawImg.onerror = (e) => {
        URL.revokeObjectURL(initialUrl);
        rej(e);
      };
      rawImg.src = initialUrl;
    });

    const rawW = rawImg.naturalWidth || rawImg.width;
    const rawH = rawImg.naturalHeight || rawImg.height;

    if (Math.max(rawW, rawH) <= MAX_IMAGE_DIMENSION) {
      return { img: rawImg, objectUrl: initialUrl };
    }

    // Downscale fallback if image exceeds 4000px
    const ratio = Math.min(MAX_IMAGE_DIMENSION / rawW, MAX_IMAGE_DIMENSION / rawH);
    const dw = Math.round(rawW * ratio);
    const dh = Math.round(rawH * ratio);

    const downscaleCanvas = document.createElement('canvas');
    downscaleCanvas.width = dw;
    downscaleCanvas.height = dh;
    const dCtx = downscaleCanvas.getContext('2d');
    if (dCtx) {
      dCtx.imageSmoothingEnabled = true;
      dCtx.imageSmoothingQuality = 'high';
      dCtx.drawImage(rawImg, 0, 0, dw, dh);
    }

    const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
    const blob = await new Promise((res) => downscaleCanvas.toBlob(res, mime, 0.92));

    if (dCtx) dCtx.clearRect(0, 0, dw, dh);
    downscaleCanvas.width = 1;
    downscaleCanvas.height = 1;
    URL.revokeObjectURL(initialUrl);

    if (!blob) throw new Error('Downscaling failed');
    const objectUrl = URL.createObjectURL(blob);
    const img = new Image();
    await new Promise((res, rej) => {
      img.onload = res;
      img.onerror = (e) => {
        URL.revokeObjectURL(objectUrl);
        rej(e);
      };
      img.src = objectUrl;
    });
    return { img, objectUrl };
  }

  // --- Upload single image directly to a slot ---
  async function uploadSingleFileToSlot(file, slotIndex) {
    if (!file || !file.type.startsWith('image/')) return;

    try {
      // Remove any prior image in this slot before assigning the new one
      removeImageFromSlot(slotIndex, false);

      const { img, objectUrl } = await loadImageFromFile(file);

      const item = {
        id: 'img_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        img: img,
        name: file.name,
        src: objectUrl,
        objectUrl: objectUrl
      };

      // 1. Assign to slot FIRST so limitLibrarySize recognizes the image as active
      if (state.slotsData[slotIndex]) {
        state.slotsData[slotIndex].imageId = item.id;
        state.slotsData[slotIndex].zoom = 1;
        state.slotsData[slotIndex].panX = 0;
        state.slotsData[slotIndex].panY = 0;
        state.slotsData[slotIndex].rotation = 0;
        state.slotsData[slotIndex].fitMode = state.globalFitMode;
      }

      // 2. Snapshot into slot history
      state.slotHistory[slotIndex] = { ...state.slotsData[slotIndex] };

      // 3. Add to library and enforce limit
      state.library.push(item);
      limitLibrarySize();

      state.selectedSlotIndex = slotIndex;
      updateInlineAdjustPanel();
      renderSlotCards();
      renderCollage();
    } catch (err) {
      console.error('Failed to load image:', err);
      alert('Could not load the image. Please try another file.');
    }
  }

  // --- Slot Selection & Inline Adjust Update ---
  function selectSlot(slotIndex) {
    state.selectedSlotIndex = slotIndex;
    updateInlineAdjustPanel();
    renderSlotCards();
    renderCollage();
  }

  function updateInlineAdjustPanel() {
    const idx = (state.selectedSlotIndex >= 0 && state.selectedSlotIndex < state.slotsData.length)
      ? state.selectedSlotIndex
      : 0;
    const s = state.slotsData[idx] || {};

    if (inlineAdjustTitle) {
      inlineAdjustTitle.innerHTML = `<span>🎯</span> Adjust Photo ${idx + 1}`;
    }

    if (inlineAdjustStatus) {
      inlineAdjustStatus.textContent = s.imageId ? `Photo ${idx + 1} Selected` : `Slot #${idx + 1} (Empty)`;
    }

    const zoom = s.zoom !== undefined ? s.zoom : 1;
    if (inlineSlotZoom) inlineSlotZoom.value = zoom;
    if (inlineSlotZoomVal) inlineSlotZoomVal.textContent = `${Math.round(zoom * 100)}%`;

    const rot = s.rotation || 0;
    if (inlineSlotRotate) inlineSlotRotate.value = rot;
    if (inlineSlotRotateVal) inlineSlotRotateVal.textContent = `${rot}°`;

    const px = Math.round(s.panX || 0);
    if (inlineSlotPanX) inlineSlotPanX.value = px;
    if (inlineSlotPanXVal) inlineSlotPanXVal.textContent = `${px}`;

    const py = Math.round(s.panY || 0);
    if (inlineSlotPanY) inlineSlotPanY.value = py;
    if (inlineSlotPanYVal) inlineSlotPanYVal.textContent = `${py}`;

    updateInlineFitButtons(s.fitMode || state.globalFitMode);
  }

  function updateInlineFitButtons(mode) {
    if (inlineBtnFit && inlineBtnFill) {
      if (mode === 'contain') {
        inlineBtnFit.classList.add('bg-blue-600', 'text-white', 'border-blue-600');
        inlineBtnFit.classList.remove('bg-white', 'text-slate-700', 'dark:bg-slate-800', 'dark:text-slate-200');
        inlineBtnFill.classList.remove('bg-blue-600', 'text-white', 'border-blue-600');
        inlineBtnFill.classList.add('bg-white', 'text-slate-700', 'dark:bg-slate-800', 'dark:text-slate-200');
      } else {
        inlineBtnFill.classList.add('bg-blue-600', 'text-white', 'border-blue-600');
        inlineBtnFill.classList.remove('bg-white', 'text-slate-700', 'dark:bg-slate-800', 'dark:text-slate-200');
        inlineBtnFit.classList.remove('bg-blue-600', 'text-white', 'border-blue-600');
        inlineBtnFit.classList.add('bg-white', 'text-slate-700', 'dark:bg-slate-800', 'dark:text-slate-200');
      }
    }
  }

  // --- Main Canvas Render (Supports fast preview and 300 DPI export) ---
  function renderCollage(targetCanvas = canvas, targetCtx = ctx, isExport = false, exportType = 'preview') {
    if (!targetCanvas || !targetCtx) return;

    const scale = isExport ? 1.0 : (state.previewScale || 1.0);
    const W = state.width;
    const H = state.height;

    targetCtx.save();
    targetCtx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
    targetCtx.scale(scale, scale);

    // Alpha transparency handling
    if (state.bgColor === 'transparent') {
      if (!isExport) {
        // Visual checkerboard preview
        drawTransparentGrid(W, H, targetCtx);
      } else if (exportType === 'image/jpeg' || exportType === 'pdf') {
        // JPG / PDF must have an opaque background
        targetCtx.fillStyle = '#ffffff';
        targetCtx.fillRect(0, 0, W, H);
      }
      // For PNG export (exportType === 'image/png'), we leave the clearRect alpha transparent!
    } else {
      targetCtx.fillStyle = state.bgColor;
      targetCtx.fillRect(0, 0, W, H);
    }

    const marginPx = mmToPx(state.marginMm);
    const gapPx = mmToPx(state.gapMm);
    const radiusPx = mmToPx(state.borderRadiusMm);
    let borderThicknessPx = mmToPx(state.borderWidthMm);

    let borderColor = state.borderColor;
    if (state.borderStyle === 'none') {
      borderThicknessPx = 0;
    } else if (state.borderStyle === 'thin-black') {
      borderColor = '#000000';
    } else if (state.borderStyle === 'thick-black') {
      borderColor = '#000000';
      borderThicknessPx = Math.max(borderThicknessPx, mmToPx(2.5));
    } else if (state.borderStyle === 'thin-white') {
      borderColor = '#ffffff';
    } else if (state.borderStyle === 'elegant-grey') {
      borderColor = '#cbd5e1';
    }

    // Header Text Render
    let headerAreaHeight = 0;
    if (state.headerText && state.headerText.trim() !== '') {
      const fontSizePx = ptToPx(state.headerFontSizePt || 16);
      let fontStyleStr = '';
      if (state.headerItalic) fontStyleStr += 'italic ';
      if (state.headerBold) fontStyleStr += 'bold ';
      targetCtx.font = `${fontStyleStr}${fontSizePx}px Inter, sans-serif`;

      headerAreaHeight = fontSizePx * 1.8;

      targetCtx.save();
      targetCtx.fillStyle = state.headerColor;
      targetCtx.textBaseline = 'top';

      let textX = marginPx;
      if (state.headerAlign === 'center') {
        targetCtx.textAlign = 'center';
        textX = W / 2;
      } else if (state.headerAlign === 'right') {
        targetCtx.textAlign = 'right';
        textX = W - marginPx;
      } else {
        targetCtx.textAlign = 'left';
        textX = marginPx;
      }

      const textY = marginPx;
      targetCtx.fillText(state.headerText, textX, textY);

      if (state.headerUnderline) {
        const textMetrics = targetCtx.measureText(state.headerText);
        let lineStartX = textX;
        if (state.headerAlign === 'center') {
          lineStartX = textX - textMetrics.width / 2;
        } else if (state.headerAlign === 'right') {
          lineStartX = textX - textMetrics.width;
        }
        targetCtx.lineWidth = Math.max(2, Math.round(fontSizePx * 0.08));
        targetCtx.strokeStyle = state.headerColor;
        targetCtx.beginPath();
        targetCtx.moveTo(lineStartX, textY + fontSizePx * 1.15);
        targetCtx.lineTo(lineStartX + textMetrics.width, textY + fontSizePx * 1.15);
        targetCtx.stroke();
      }
      targetCtx.restore();
    }

    const layout = LAYOUTS[state.currentLayoutId];
    if (!layout) {
      targetCtx.restore();
      return;
    }

    const gridTop = marginPx + headerAreaHeight;
    const gridLeft = marginPx;
    const gridWidth = W - marginPx * 2;
    const gridHeight = H - gridTop - marginPx;

    if (gridWidth <= 0 || gridHeight <= 0) {
      targetCtx.restore();
      return;
    }

    layout.slots.forEach((slot, index) => {
      const slotData = state.slotsData[index] || {};

      const slotX = gridLeft + slot.x * gridWidth + (gapPx / 2);
      const slotY = gridTop + slot.y * gridHeight + (gapPx / 2);
      const slotW = slot.w * gridWidth - gapPx;
      const slotH = slot.h * gridHeight - gapPx;

      if (slotW <= 0 || slotH <= 0) return;

      targetCtx.save();

      if (state.shadowEnabled) {
        targetCtx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        targetCtx.shadowBlur = 20;
        targetCtx.shadowOffsetX = 0;
        targetCtx.shadowOffsetY = 6;
      }

      const r = Math.min(radiusPx, slotW / 2, slotH / 2);
      roundedRectPath(targetCtx, slotX, slotY, slotW, slotH, r);

      targetCtx.fillStyle = '#f8fafc';
      targetCtx.fill();

      targetCtx.shadowColor = 'transparent';

      targetCtx.save();
      targetCtx.clip();

      const libItem = state.library.find((img) => img.id === slotData.imageId);

      if (libItem && libItem.img && libItem.img.complete && libItem.img.naturalWidth > 0) {
        drawImageInSlot(targetCtx, libItem.img, slotX, slotY, slotW, slotH, slotData);
      } else {
        drawSlotPlaceholder(targetCtx, slotX, slotY, slotW, slotH, index + 1);
      }

      targetCtx.restore();

      if (borderThicknessPx > 0) {
        targetCtx.lineWidth = borderThicknessPx;
        targetCtx.strokeStyle = borderColor;
        roundedRectPath(targetCtx, slotX, slotY, slotW, slotH, r);
        targetCtx.stroke();
      }

      // Draw Selected Slot Outline in Preview mode
      if (!isExport && index === state.selectedSlotIndex) {
        targetCtx.save();
        targetCtx.lineWidth = Math.max(3, Math.round(4 / scale));
        targetCtx.strokeStyle = '#3b82f6';
        targetCtx.setLineDash([8 / scale, 6 / scale]);
        roundedRectPath(targetCtx, slotX, slotY, slotW, slotH, r);
        targetCtx.stroke();
        targetCtx.restore();
      }

      targetCtx.restore();

      // Render physical crop marks in both preview and export when enabled
      if (state.cropMarks) {
        drawSlotCropMarks(targetCtx, slotX, slotY, slotW, slotH);
      }
    });

    targetCtx.restore();
  }

  // --- Draw Image inside Slot (supports cover/contain, rotation, pan, zoom, flip) ---
  function drawImageInSlot(targetCtx, img, sx, sy, sw, sh, slotData) {
    if (!targetCtx || !img) return;
    const fitMode = slotData.fitMode || state.globalFitMode;
    const zoom = slotData.zoom || 1;
    const panX = slotData.panX || 0;
    const panY = slotData.panY || 0;
    const rotation = (slotData.rotation || 0) * (Math.PI / 180);
    const flipH = slotData.flipH ? -1 : 1;
    const flipV = slotData.flipV ? -1 : 1;

    const imgW = img.naturalWidth || img.width;
    const imgH = img.naturalHeight || img.height;
    if (!imgW || !imgH) return;

    const slotAspect = sw / sh;
    const imgAspect = imgW / imgH;

    let baseW, baseH;
    if (fitMode === 'contain') {
      if (imgAspect > slotAspect) {
        baseW = sw;
        baseH = sw / imgAspect;
      } else {
        baseH = sh;
        baseW = sh * imgAspect;
      }
    } else {
      if (imgAspect > slotAspect) {
        baseH = sh;
        baseW = sh * imgAspect;
      } else {
        baseW = sw;
        baseH = sw / imgAspect;
      }
    }

    const drawW = baseW * zoom;
    const drawH = baseH * zoom;

    targetCtx.save();
    targetCtx.translate(sx + sw / 2 + panX, sy + sh / 2 + panY);
    targetCtx.rotate(rotation);
    targetCtx.scale(flipH, flipV);

    targetCtx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    targetCtx.restore();
  }

  // --- Empty Slot Placeholder ---
  function drawSlotPlaceholder(targetCtx, sx, sy, sw, sh, num) {
    if (!targetCtx) return;
    targetCtx.save();
    targetCtx.fillStyle = '#f1f5f9';
    targetCtx.fillRect(sx, sy, sw, sh);

    targetCtx.strokeStyle = '#cbd5e1';
    targetCtx.lineWidth = Math.max(1, Math.round(sw * 0.005));
    targetCtx.strokeRect(sx + 2, sy + 2, sw - 4, sh - 4);

    const fontSize = Math.max(12, Math.round(Math.min(sw, sh) * 0.12));
    targetCtx.font = `600 ${fontSize}px Inter, sans-serif`;
    targetCtx.fillStyle = '#94a3b8';
    targetCtx.textAlign = 'center';
    targetCtx.textBaseline = 'middle';
    targetCtx.fillText(`Photo ${num}`, sx + sw / 2, sy + sh / 2);
    targetCtx.restore();
  }

  // --- Rounded Rect Path Helper ---
  function roundedRectPath(targetCtx, x, y, w, h, r) {
    if (!targetCtx) return;
    targetCtx.beginPath();
    targetCtx.moveTo(x + r, y);
    targetCtx.lineTo(x + w - r, y);
    targetCtx.arcTo(x + w, y, x + w, y + r, r);
    targetCtx.lineTo(x + w, y + h - r);
    targetCtx.arcTo(x + w, y + h, x + w - r, y + h, r);
    targetCtx.lineTo(x + r, y + h);
    targetCtx.arcTo(x, y + h, x, y + h - r, r);
    targetCtx.lineTo(x, y + r);
    targetCtx.arcTo(x, y, x + r, y, r);
    targetCtx.closePath();
  }

  // --- Transparent Checkerboard Background ---
  function drawTransparentGrid(w, h, targetCtx) {
    if (!targetCtx) return;
    const size = 32;
    for (let x = 0; x < w; x += size) {
      for (let y = 0; y < h; y += size) {
        targetCtx.fillStyle = (Math.floor(x / size) + Math.floor(y / size)) % 2 === 0 ? '#ffffff' : '#f1f5f9';
        targetCtx.fillRect(x, y, size, size);
      }
    }
  }

  // --- Precise 300 DPI Physical Crop Marks ---
  function drawSlotCropMarks(targetCtx, x, y, w, h) {
    if (!targetCtx) return;
    const len = mmToPx(3);
    const offset = mmToPx(1.5);
    targetCtx.save();
    targetCtx.strokeStyle = '#000000';
    targetCtx.lineWidth = mmToPx(0.25);

    // Top-Left
    targetCtx.beginPath();
    targetCtx.moveTo(x - offset - len, y);
    targetCtx.lineTo(x - offset, y);
    targetCtx.moveTo(x, y - offset - len);
    targetCtx.lineTo(x, y - offset);
    targetCtx.stroke();

    // Top-Right
    targetCtx.beginPath();
    targetCtx.moveTo(x + w + offset, y);
    targetCtx.lineTo(x + w + offset + len, y);
    targetCtx.moveTo(x + w, y - offset - len);
    targetCtx.lineTo(x + w, y - offset);
    targetCtx.stroke();

    // Bottom-Left
    targetCtx.beginPath();
    targetCtx.moveTo(x - offset - len, y + h);
    targetCtx.lineTo(x - offset, y + h);
    targetCtx.moveTo(x, y - offset - len);
    targetCtx.lineTo(x, y - offset);
    targetCtx.stroke();

    // Bottom-Right
    targetCtx.beginPath();
    targetCtx.moveTo(x + w + offset, y + h);
    targetCtx.lineTo(x + w + offset + len, y + h);
    targetCtx.moveTo(x + w, y + h + offset);
    targetCtx.lineTo(x + w, y + h + offset);
    targetCtx.stroke();

    targetCtx.restore();
  }

  // --- Bind Event Listeners ---
  function bindEvents() {
    // Abort previous listeners to ensure clean lifecycle across Astro client-side navigation
    if (activeAbortController) {
      activeAbortController.abort();
      activeAbortController = null;
    }
    activeAbortController = new AbortController();
    const { signal } = activeAbortController;

    document.addEventListener('astro:before-swap', cleanupListeners, { signal, once: true });

    // Top Bar Selectors
    if (sizeSelect) {
      sizeSelect.addEventListener('change', (e) => {
        applyPresetSize(e.target.value);
      });
    }

    if (layoutDropdown) {
      layoutDropdown.addEventListener('change', (e) => {
        applyLayout(e.target.value);
      });
    }

    if (globalFitSelect) {
      globalFitSelect.addEventListener('change', (e) => {
        state.globalFitMode = e.target.value;
        state.slotsData.forEach((s) => {
          if (s) s.fitMode = e.target.value;
        });
        renderCollage();
      });
    }

    // Spacing, Borders & Crop Marks
    if (borderStyleSelect) {
      borderStyleSelect.addEventListener('change', (e) => {
        state.borderStyle = e.target.value;
        renderCollage();
      });
    }
    if (borderWidthInput) {
      borderWidthInput.addEventListener('input', (e) => {
        state.borderWidthMm = parseFloat(e.target.value) || 0;
        renderCollage();
      });
    }
    if (roundedCornersInput) {
      roundedCornersInput.addEventListener('input', (e) => {
        state.borderRadiusMm = parseFloat(e.target.value) || 0;
        renderCollage();
      });
    }
    if (gapInput) {
      gapInput.addEventListener('input', (e) => {
        state.gapMm = parseFloat(e.target.value) || 0;
        renderCollage();
      });
    }
    if (pageMarginInput) {
      pageMarginInput.addEventListener('input', (e) => {
        state.marginMm = parseFloat(e.target.value) || 0;
        renderCollage();
      });
    }
    if (cropMarksCheck) {
      cropMarksCheck.addEventListener('change', (e) => {
        state.cropMarks = e.target.checked;
        renderCollage();
      });
    }

    // Header Text
    if (headerTextInput) {
      headerTextInput.addEventListener('input', (e) => {
        state.headerText = e.target.value;
        renderCollage();
      });
    }
    if (headerSizeInput) {
      headerSizeInput.addEventListener('input', (e) => {
        state.headerFontSizePt = parseInt(e.target.value, 10) || 16;
        renderCollage();
      });
    }
    if (headerColorInput) {
      headerColorInput.addEventListener('input', (e) => {
        state.headerColor = e.target.value;
        renderCollage();
      });
    }
    if (headerBoldCheck) {
      headerBoldCheck.addEventListener('change', (e) => {
        state.headerBold = e.target.checked;
        renderCollage();
      });
    }
    if (headerUnderlineCheck) {
      headerUnderlineCheck.addEventListener('change', (e) => {
        state.headerUnderline = e.target.checked;
        renderCollage();
      });
    }
    if (headerItalicCheck) {
      headerItalicCheck.addEventListener('change', (e) => {
        state.headerItalic = e.target.checked;
        renderCollage();
      });
    }
    if (headerAlignSelect) {
      headerAlignSelect.addEventListener('change', (e) => {
        state.headerAlign = e.target.value;
        renderCollage();
      });
    }

    // Background Color & Alpha Transparency Toggle
    if (bgColorInput) {
      bgColorInput.addEventListener('input', (e) => {
        state.bgColor = e.target.value;
        if (bgTransparentCheck) bgTransparentCheck.checked = false;
        bgColorInput.disabled = false;
        renderCollage();
      });
    }

    if (bgTransparentCheck) {
      bgTransparentCheck.addEventListener('change', (e) => {
        if (e.target.checked) {
          state.bgColor = 'transparent';
          if (bgColorInput) bgColorInput.disabled = true;
        } else {
          state.bgColor = (bgColorInput && bgColorInput.value) || '#ffffff';
          if (bgColorInput) bgColorInput.disabled = false;
        }
        renderCollage();
      });
    }

    if (shadowToggle) {
      shadowToggle.addEventListener('change', (e) => {
        state.shadowEnabled = e.target.checked;
        renderCollage();
      });
    }

    // Inline Adjust Panel Controls
    if (inlineSlotZoom) {
      inlineSlotZoom.addEventListener('input', (e) => {
        const s = state.slotsData[state.selectedSlotIndex];
        if (s) {
          s.zoom = parseFloat(e.target.value);
          if (inlineSlotZoomVal) inlineSlotZoomVal.textContent = `${Math.round(s.zoom * 100)}%`;
          renderCollage();
        }
      });
    }

    if (inlineSlotRotate) {
      inlineSlotRotate.addEventListener('input', (e) => {
        const s = state.slotsData[state.selectedSlotIndex];
        if (s) {
          s.rotation = parseInt(e.target.value, 10);
          if (inlineSlotRotateVal) inlineSlotRotateVal.textContent = `${s.rotation}°`;
          renderCollage();
        }
      });
    }

    if (inlineSlotPanX) {
      inlineSlotPanX.addEventListener('input', (e) => {
        const s = state.slotsData[state.selectedSlotIndex];
        if (s) {
          s.panX = parseFloat(e.target.value);
          if (inlineSlotPanXVal) inlineSlotPanXVal.textContent = `${Math.round(s.panX)}`;
          renderCollage();
        }
      });
    }

    if (inlineSlotPanY) {
      inlineSlotPanY.addEventListener('input', (e) => {
        const s = state.slotsData[state.selectedSlotIndex];
        if (s) {
          s.panY = parseFloat(e.target.value);
          if (inlineSlotPanYVal) inlineSlotPanYVal.textContent = `${Math.round(s.panY)}`;
          renderCollage();
        }
      });
    }

    if (inlineBtnReset) {
      inlineBtnReset.addEventListener('click', () => {
        const s = state.slotsData[state.selectedSlotIndex];
        if (s) {
          s.zoom = 1;
          s.rotation = 0;
          s.panX = 0;
          s.panY = 0;
          updateInlineAdjustPanel();
          renderSlotCards();
          renderCollage();
        }
      });
    }

    if (inlineBtnFit) {
      inlineBtnFit.addEventListener('click', () => {
        const s = state.slotsData[state.selectedSlotIndex];
        if (s) {
          s.fitMode = 'contain';
          updateInlineFitButtons('contain');
          renderCollage();
        }
      });
    }

    if (inlineBtnFill) {
      inlineBtnFill.addEventListener('click', () => {
        const s = state.slotsData[state.selectedSlotIndex];
        if (s) {
          s.fitMode = 'cover';
          updateInlineFitButtons('cover');
          renderCollage();
        }
      });
    }

    if (inlineBtnFlipH) {
      inlineBtnFlipH.addEventListener('click', () => {
        const s = state.slotsData[state.selectedSlotIndex];
        if (s) {
          s.flipH = !s.flipH;
          renderCollage();
        }
      });
    }

    if (inlineBtnFlipV) {
      inlineBtnFlipV.addEventListener('click', () => {
        const s = state.slotsData[state.selectedSlotIndex];
        if (s) {
          s.flipV = !s.flipV;
          renderCollage();
        }
      });
    }

    // Unified Pointer Events on Canvas (Pan & Slot Selection only; live canvas zoom disabled)
    if (canvas) {
      canvas.style.touchAction = 'pan-y';

      canvas.addEventListener('pointerdown', (e) => {
        const pos = getCanvasCoords(e.clientX, e.clientY);
        const slotIdx = getSlotAtPos(pos.x, pos.y);

        if (slotIdx !== -1) {
          selectSlot(slotIdx);
          const s = state.slotsData[slotIdx];
          if (s && s.imageId) {
            state.isDragging = true;
            state.dragStartX = pos.x;
            state.dragStartY = pos.y;
            state.dragSlotIndex = slotIdx;
            try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
            canvas.style.cursor = 'grabbing';
            canvas.style.touchAction = 'none';
          }
        }
      });

      canvas.addEventListener('pointermove', (e) => {
        if (!state.isDragging || state.dragSlotIndex === -1) return;
        const s = state.slotsData[state.dragSlotIndex];
        if (!s || !s.imageId) return;

        const pos = getCanvasCoords(e.clientX, e.clientY);
        const dx = pos.x - state.dragStartX;
        const dy = pos.y - state.dragStartY;

        s.panX = (s.panX || 0) + dx;
        s.panY = (s.panY || 0) + dy;

        state.dragStartX = pos.x;
        state.dragStartY = pos.y;

        if (inlineSlotPanX) inlineSlotPanX.value = Math.round(s.panX);
        if (inlineSlotPanXVal) inlineSlotPanXVal.textContent = `${Math.round(s.panX)}`;
        if (inlineSlotPanY) inlineSlotPanY.value = Math.round(s.panY);
        if (inlineSlotPanYVal) inlineSlotPanYVal.textContent = `${Math.round(s.panY)}`;

        renderCollage();
      });

      const onPointerUp = (e) => {
        try { canvas.releasePointerCapture(e.pointerId); } catch (err) {}
        state.isDragging = false;
        state.dragSlotIndex = -1;
        canvas.style.cursor = 'pointer';
        canvas.style.touchAction = 'pan-y';
      };

      canvas.addEventListener('pointerup', onPointerUp);
      canvas.addEventListener('pointercancel', onPointerUp);
    }

    // Export Triggers
    if (downloadPngBtn) downloadPngBtn.addEventListener('click', () => exportImage('image/png', 'png'));
    if (downloadJpgBtn) downloadJpgBtn.addEventListener('click', () => exportImage('image/jpeg', 'jpg'));
    if (downloadPdfBtn) downloadPdfBtn.addEventListener('click', exportPDF);
  }

  function getSlotAtPos(canvasX, canvasY) {
    const layout = LAYOUTS[state.currentLayoutId];
    if (!layout) return -1;

    const marginPx = mmToPx(state.marginMm);
    const gapPx = mmToPx(state.gapMm);
    let headerAreaHeight = 0;
    if (state.headerText && state.headerText.trim() !== '') {
      headerAreaHeight = ptToPx(state.headerFontSizePt || 16) * 1.8;
    }

    const gridTop = marginPx + headerAreaHeight;
    const gridLeft = marginPx;
    const gridWidth = state.width - marginPx * 2;
    const gridHeight = state.height - gridTop - marginPx;

    for (let i = 0; i < layout.slots.length; i++) {
      const slot = layout.slots[i];
      const sx = gridLeft + slot.x * gridWidth + (gapPx / 2);
      const sy = gridTop + slot.y * gridHeight + (gapPx / 2);
      const sw = slot.w * gridWidth - gapPx;
      const sh = slot.h * gridHeight - gapPx;

      if (canvasX >= sx && canvasX <= sx + sw && canvasY >= sy && canvasY <= sy + sh) {
        return i;
      }
    }
    return -1;
  }

  function getCanvasCoords(clientX, clientY) {
    if (!canvas) return { x: clientX, y: clientY };
    const rect = canvas.getBoundingClientRect();
    if (!rect || !rect.width || !rect.height) return { x: clientX, y: clientY };
    const scaleX = state.width / rect.width;
    const scaleY = state.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }

  // --- Export Image (PNG / JPG) rendered directly at full 300 DPI with Safe Memory Release ---
  function exportImage(mimeType, ext) {
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = state.width;
    exportCanvas.height = state.height;
    const expCtx = exportCanvas.getContext('2d');
    if (!expCtx) {
      alert('Export failed. Canvas context not available.');
      return;
    }

    try {
      // Render full 300 DPI print quality directly to offscreen canvas
      renderCollage(exportCanvas, expCtx, true, mimeType);

      exportCanvas.toBlob(
        (blob) => {
          // Clean up export canvas buffer immediately
          try { expCtx.clearRect(0, 0, exportCanvas.width, exportCanvas.height); } catch (e) {}
          exportCanvas.width = 1;
          exportCanvas.height = 1;

          if (!blob) {
            alert('Export failed. Please try again.');
            return;
          }

          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = getExportFilename(ext);
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setTimeout(() => URL.revokeObjectURL(url), 2000);
        },
        mimeType,
        0.98
      );
    } catch (err) {
      console.error('Export failed:', err);
      alert('Export failed. Please try again.');
      try { expCtx.clearRect(0, 0, exportCanvas.width, exportCanvas.height); } catch (e) {}
      exportCanvas.width = 1;
      exportCanvas.height = 1;
    }
  }

  // --- jsPDF Loader with local file preference and CDN fallback ---
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

      const primarySrc = '/js/vendor/jspdf.umd.min.js';
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

  // --- Export Print-Ready PDF with correct physical dimensions for all presets ---
  async function exportPDF() {
    const btn = downloadPdfBtn;
    const originalContent = btn ? btn.innerHTML : '';

    if (btn) {
      btn.disabled = true;
      btn.style.pointerEvents = 'none';
      btn.setAttribute('aria-busy', 'true');
      btn.innerHTML = '<span class="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent mr-1.5 align-middle"></span> Preparing PDF...';
    }

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = state.width;
    exportCanvas.height = state.height;
    const expCtx = exportCanvas.getContext('2d');

    try {
      if (typeof window.jspdf === 'undefined' || !window.jspdf.jsPDF) {
        await loadJsPdf();
      }

      if (!window.jspdf || !window.jspdf.jsPDF) {
        throw new Error('PDF library unavailable');
      }

      const { jsPDF } = window.jspdf;
      const preset = PRESET_SIZES[state.canvasPreset] || PRESET_SIZES['a4-p'];

      if (!expCtx) throw new Error('Could not get canvas context');

      // Render 300 DPI vector-accurate layout directly to offscreen canvas
      renderCollage(exportCanvas, expCtx, true, 'pdf');

      const imgData = exportCanvas.toDataURL('image/jpeg', 0.98);

      const orientation = preset.pdfOrientation || (preset.mmW >= preset.mmH ? 'l' : 'p');
      const format = preset.pdfFormat || [preset.mmW, preset.mmH];

      const pdf = new jsPDF({
        orientation: orientation,
        unit: 'mm',
        format: format,
        compress: true
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight, undefined, 'SLOW');
      pdf.save(getExportFilename('pdf'));
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      alert('Failed to generate PDF. Please ensure your browser has an active internet connection or try downloading as JPG/PNG.');
    } finally {
      if (expCtx) {
        try { expCtx.clearRect(0, 0, exportCanvas.width, exportCanvas.height); } catch (e) {}
      }
      exportCanvas.width = 1;
      exportCanvas.height = 1;

      if (btn) {
        btn.disabled = false;
        btn.style.pointerEvents = '';
        btn.removeAttribute('aria-busy');
        btn.innerHTML = originalContent;
      }
    }
  }

  // --- Helper: Generate clean download filename based on Header Text / Name ---
  function getExportFilename(ext) {
    const rawName = (headerTextInput && headerTextInput.value) ? headerTextInput.value : state.headerText;
    if (rawName && rawName.trim()) {
      const sanitized = rawName.trim()
        .replace(/[\\/:*?"<>|]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      if (sanitized) {
        return `${sanitized}.${ext}`;
      }
    }
    return `photo-collage-${state.canvasPreset}-${Date.now()}.${ext}`;
  }

  // Non-blocking initialization allows browser to paint layout first
  function scheduleInit() {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(init, { timeout: 80 });
    } else {
      requestAnimationFrame(init);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleInit);
  } else {
    scheduleInit();
  }

  document.addEventListener('astro:page-load', () => {
    const freshCanvas = document.getElementById('collage-canvas');
    if (freshCanvas) {
      init();
    }
  });
})();
