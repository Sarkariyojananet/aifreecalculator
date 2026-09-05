
  // Global App State
  let currentMode = 'wall_plaster';
  let currentUnitSystem = 'metric';
  let currentCurrency = 'INR';
  let lastResultData = null;

  // Pricing Defaults
  const PLASTER_PRICES = {
    INR: { cement: 380, sand: 55, adhesive: 450 },
    USD: { cement: 14.50, sand: 1.80, adhesive: 22.00 },
  };

  // Top Toolbar Elements
  const btnUnitMetric = document.getElementById('btn-unit-metric');
  const btnUnitImperial = document.getElementById('btn-unit-imperial');
  const btnCurrInr = document.getElementById('btn-curr-inr');
  const btnCurrUsd = document.getElementById('btn-curr-usd');

  // Mode Tabs
  const modeButtons = document.querySelectorAll('.btn-pm-tab');
  const modeBadge = document.getElementById('lbl-mode-badge');
  const sectionWallPlaster = document.getElementById('section-input-wall-plaster');
  const sectionGeneralMortar = document.getElementById('section-input-general-mortar');
  const sectionTileMortar = document.getElementById('section-input-tile-mortar');
  const sectionGamingMortar = document.getElementById('section-input-gaming-mortar');

  // Live Visual Diagram Elements
  const svgPlaster = document.getElementById('svg-plaster');
  const lblVisualBadge = document.getElementById('lbl-visual-badge');
  const lblVisualCaption = document.getElementById('lbl-visual-caption');
  const txtVisualDimensions = document.getElementById('txt-visual-dimensions');

  // Cost Section Elements
  const chkEnableCost = document.getElementById('chk-enable-cost');
  const divCostInputs = document.getElementById('div-cost-inputs');
  const lblCostCurrency = document.getElementById('lbl-cost-currency');
  const inpRateCement = document.getElementById('inp-rate-cement');
  const inpRateSand = document.getElementById('inp-rate-sand');
  const inpRateTileAdh = document.getElementById('inp-rate-tile-adh');
  const divCostBreakdown = document.getElementById('div-cost-breakdown');
  const tbodyCostBreakdown = document.getElementById('tbody-cost-breakdown');
  const lblCostTotalTag = document.getElementById('lbl-cost-total-tag');

  // Action Buttons, Placeholder, and Stale Elements
  const btnCalc = document.getElementById('btn-calc-pm');
  const btnClear = document.getElementById('btn-clear-pm');
  const errBox = document.getElementById('err-pm');
  const staleWarning = document.getElementById('stale-warning');
  const btnRecalculateStale = document.getElementById('btn-recalculate-stale');
  const resultsPlaceholder = document.getElementById('results-placeholder');
  const resultsSection = document.getElementById('pm-results-section');
  const btnDownloadPdf = document.getElementById('btn-pm-download-pdf');

  // Hero Result Elements
  const lblHeroTag = document.getElementById('lbl-hero-tag');
  const resHeroMain = document.getElementById('res-hero-main');
  const resHeroSub = document.getElementById('res-hero-sub');
  const gridResultMetrics = document.getElementById('grid-result-metrics');
  const tbodyMaterialBreakdown = document.getElementById('tbody-material-breakdown');
  const txtCalcDetails = document.getElementById('txt-calc-details');

  // Inputs - Wall Plaster
  const wpLength = document.getElementById('inp-wp-length');
  const wpHeight = document.getElementById('inp-wp-height');
  const wpWalls = document.getElementById('inp-wp-walls');
  const wpOpenings = document.getElementById('inp-wp-openings');
  const wpThickPreset = document.getElementById('inp-wp-thick-preset');
  const divWpCustomThick = document.getElementById('div-wp-custom-thick');
  const wpCustomThickVal = document.getElementById('inp-wp-custom-thick-val');
  const wpCustomThickUnit = document.getElementById('inp-wp-custom-thick-unit');
  const wpRatio = document.getElementById('inp-wp-ratio');
  const divWpCustomRatio = document.getElementById('div-wp-custom-ratio');
  const wpCustomC = document.getElementById('inp-wp-custom-c');
  const wpCustomS = document.getElementById('inp-wp-custom-s');
  const wpWastage = document.getElementById('inp-wp-wastage');
  const wpDryFactor = document.getElementById('inp-wp-dry-factor');

  // Inputs - General Mortar
  const gmLength = document.getElementById('inp-gm-length');
  const gmWidth = document.getElementById('inp-gm-width');
  const gmDepth = document.getElementById('inp-gm-depth');
  const gmDepthUnit = document.getElementById('inp-gm-depth-unit');
  const gmSections = document.getElementById('inp-gm-sections');
  const gmRatio = document.getElementById('inp-gm-ratio');
  const divGmCustomRatio = document.getElementById('div-gm-custom-ratio');
  const gmCustomC = document.getElementById('inp-gm-custom-c');
  const gmCustomS = document.getElementById('inp-gm-custom-s');
  const gmWastage = document.getElementById('inp-gm-wastage');
  const gmDryFactor = document.getElementById('inp-gm-dry-factor');

  // Inputs - Tile Mortar
  const tmArea = document.getElementById('inp-tm-area');
  const tmType = document.getElementById('inp-tm-type');
  const tmPreset = document.getElementById('inp-tm-preset');
  const divTmCustomSize = document.getElementById('div-tm-custom-size');
  const tmCustomLen = document.getElementById('inp-tm-custom-len');
  const tmCustomWid = document.getElementById('inp-tm-custom-wid');
  const tmThick = document.getElementById('inp-tm-thick');
  const tmCoverage = document.getElementById('inp-tm-coverage');
  const tmBagSize = document.getElementById('inp-tm-bag-size');
  const tmWastage = document.getElementById('inp-tm-wastage');

  // Inputs - Gaming Mortar
  const gameSelect = document.getElementById('inp-gm-game');
  const gameX1 = document.getElementById('inp-game-x1');
  const gameY1 = document.getElementById('inp-game-y1');
  const gameX2 = document.getElementById('inp-game-x2');
  const gameY2 = document.getElementById('inp-game-y2');
  const gameElev = document.getElementById('inp-game-elev');

  // Global Unit Switcher
  function setGlobalUnitSystem(unit) {
    if (unit === currentUnitSystem) return;
    const prev = currentUnitSystem;
    currentUnitSystem = unit;

    if (btnUnitMetric && btnUnitImperial) {
      if (unit === 'metric') {
        btnUnitMetric.className = 'px-3 py-1 text-xs font-bold rounded-lg bg-blue-600 text-white shadow-xs transition cursor-pointer';
        btnUnitImperial.className = 'px-3 py-1 text-xs font-bold rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition cursor-pointer';
      } else {
        btnUnitImperial.className = 'px-3 py-1 text-xs font-bold rounded-lg bg-blue-600 text-white shadow-xs transition cursor-pointer';
        btnUnitMetric.className = 'px-3 py-1 text-xs font-bold rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition cursor-pointer';
      }
    }

    // Update static unit labels
    document.querySelectorAll('.lbl-current-unit').forEach(el => el.textContent = unit === 'metric' ? 'Metric' : 'Imperial');
    document.querySelectorAll('.unit-len-label').forEach(el => el.textContent = unit === 'metric' ? 'm' : 'ft');
    document.querySelectorAll('.unit-gm-len').forEach(el => el.textContent = unit === 'metric' ? 'm' : 'ft');
    document.querySelectorAll('.unit-area-label, .unit-tm-area-label').forEach(el => el.textContent = unit === 'metric' ? 'm²' : 'sq.ft');

    // Convert input values preserving physical dimensions
    if (unit === 'imperial' && prev === 'metric') {
      if (wpLength) wpLength.value = (parseFloat(wpLength.value) * 3.28084).toFixed(1);
      if (wpHeight) wpHeight.value = (parseFloat(wpHeight.value) * 3.28084).toFixed(1);
      if (wpOpenings && parseFloat(wpOpenings.value) > 0) wpOpenings.value = (parseFloat(wpOpenings.value) * 10.7639).toFixed(1);
      if (gmLength) gmLength.value = (parseFloat(gmLength.value) * 3.28084).toFixed(1);
      if (gmWidth) gmWidth.value = (parseFloat(gmWidth.value) * 3.28084).toFixed(1);
      if (tmArea) tmArea.value = (parseFloat(tmArea.value) * 10.7639).toFixed(1);
    } else if (unit === 'metric' && prev === 'imperial') {
      if (wpLength) wpLength.value = (parseFloat(wpLength.value) / 3.28084).toFixed(1);
      if (wpHeight) wpHeight.value = (parseFloat(wpHeight.value) / 3.28084).toFixed(1);
      if (wpOpenings && parseFloat(wpOpenings.value) > 0) wpOpenings.value = (parseFloat(wpOpenings.value) / 10.7639).toFixed(1);
      if (gmLength) gmLength.value = (parseFloat(gmLength.value) / 3.28084).toFixed(1);
      if (gmWidth) gmWidth.value = (parseFloat(gmWidth.value) / 3.28084).toFixed(1);
      if (tmArea) tmArea.value = (parseFloat(tmArea.value) / 10.7639).toFixed(1);
    }

    renderDynamicVisual();
    markResultsStale();
  }

  // Global Currency Switcher
  function setGlobalCurrency(curr) {
    if (curr === currentCurrency) return;
    currentCurrency = curr;

    if (btnCurrInr && btnCurrUsd) {
      if (curr === 'INR') {
        btnCurrInr.className = 'px-3 py-1 text-xs font-bold rounded-lg bg-emerald-600 text-white shadow-xs transition cursor-pointer';
        btnCurrUsd.className = 'px-3 py-1 text-xs font-bold rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition cursor-pointer';
      } else {
        btnCurrUsd.className = 'px-3 py-1 text-xs font-bold rounded-lg bg-emerald-600 text-white shadow-xs transition cursor-pointer';
        btnCurrInr.className = 'px-3 py-1 text-xs font-bold rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition cursor-pointer';
      }
    }

    const sym = curr === 'INR' ? '₹' : '$';
    document.querySelectorAll('.currency-symbol').forEach(el => el.textContent = sym);
    if (lblCostCurrency) lblCostCurrency.textContent = curr === 'INR' ? 'INR (₹)' : 'USD ($)';

    // Update input rates defaults
    const prices = PLASTER_PRICES[curr];
    if (inpRateCement) inpRateCement.value = prices.cement;
    if (inpRateSand) inpRateSand.value = prices.sand;
    if (inpRateTileAdh) inpRateTileAdh.value = prices.adhesive;

    markResultsStale();
  }

  if (btnUnitMetric) btnUnitMetric.addEventListener('click', () => setGlobalUnitSystem('metric'));
  if (btnUnitImperial) btnUnitImperial.addEventListener('click', () => setGlobalUnitSystem('imperial'));
  if (btnCurrInr) btnCurrInr.addEventListener('click', () => setGlobalCurrency('INR'));
  if (btnCurrUsd) btnCurrUsd.addEventListener('click', () => setGlobalCurrency('USD'));

  // Toggle Cost Inputs
  if (chkEnableCost) {
    chkEnableCost.addEventListener('change', () => {
      if (divCostInputs) divCostInputs.classList.toggle('hidden', !chkEnableCost.checked);
      markResultsStale();
    });
  }

  // Stale Notification (Rule 9)
  function markResultsStale() {
    if (lastResultData && staleWarning) {
      staleWarning.classList.remove('hidden');
    }
  }

  // Live Dynamic SVG Visualizer (Rule 10 & 11)
  function renderDynamicVisual() {
    if (!svgPlaster) return;

    if (currentMode === 'wall_plaster') {
      const len = parseFloat(wpLength.value) || 10;
      const ht = parseFloat(wpHeight.value) || 3;
      const ded = parseFloat(wpOpenings.value) || 0;
      let thickMm = 15;
      if (wpThickPreset.value === 'custom') {
        const cVal = parseFloat(wpCustomThickVal.value) || 15;
        const cUnit = wpCustomThickUnit.value;
        thickMm = cUnit === 'cm' ? cVal * 10 : cUnit === 'in' ? cVal * 25.4 : cVal;
      } else {
        thickMm = parseFloat(wpThickPreset.value) || 15;
      }
      const ratio = wpRatio.value === 'custom' ? `${wpCustomC.value || 1}:${wpCustomS.value || 4}` : wpRatio.value;

      if (lblVisualBadge) lblVisualBadge.textContent = 'Elevation & Section';
      if (lblVisualCaption) lblVisualCaption.textContent = 'Wall Surface & Plaster Coat Profile';
      if (txtVisualDimensions) txtVisualDimensions.textContent = `Wall: ${len}${currentUnitSystem === 'imperial' ? 'ft' : 'm'} × ${ht}${currentUnitSystem === 'imperial' ? 'ft' : 'm'} | Plaster: ${thickMm.toFixed(1)}mm (${ratio} Mix)`;

      const hasDed = ded > 0;
      svgPlaster.innerHTML = `
        <defs>
          <pattern id="pat-brick" width="30" height="15" patternUnits="userSpaceOnUse">
            <rect width="30" height="15" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.8"/>
            <rect x="0" y="0" width="15" height="7.5" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="0.8"/>
            <rect x="15" y="7.5" width="15" height="7.5" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="0.8"/>
          </pattern>
          <pattern id="pat-plaster" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.8" fill="#93c5fd" opacity="0.6"/>
            <circle cx="8" cy="7" r="0.9" fill="#60a5fa" opacity="0.6"/>
            <circle cx="5" cy="11" r="0.7" fill="#3b82f6" opacity="0.5"/>
          </pattern>
          <marker id="dot" markerWidth="6" markerHeight="6" refX="3" refY="3" markerUnits="strokeWidth">
            <circle cx="3" cy="3" r="2" fill="#2563eb"/>
          </marker>
        </defs>
        <!-- LEFT PANEL: Wall Elevation -->
        <g transform="translate(20, 25)">
          <text x="140" y="-8" text-anchor="middle" font-size="11" font-weight="bold" fill="#475569">WALL FRONT ELEVATION</text>
          <!-- Masonry Base -->
          <rect x="0" y="0" width="280" height="140" rx="4" fill="url(#pat-brick)" stroke="#94a3b8" stroke-width="1.5"/>
          <!-- Plaster Overlay (Translucent) -->
          <rect x="0" y="0" width="280" height="140" rx="4" fill="url(#pat-plaster)" opacity="0.85"/>
          
          ${hasDed ? `
            <!-- Openings Deduction Cutout -->
            <rect x="90" y="35" width="100" height="70" rx="2" fill="#e2e8f0" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4 2"/>
            <text x="140" y="65" text-anchor="middle" font-size="9" font-weight="bold" fill="#dc2626">OPENING DEDUCTION</text>
            <text x="140" y="78" text-anchor="middle" font-size="8" fill="#64748b">${ded} ${currentUnitSystem === 'imperial' ? 'sq.ft' : 'm²'}</text>
          ` : ''}

          <!-- Length Dimension Marker -->
          <line x1="0" y1="152" x2="280" y2="152" stroke="#2563eb" stroke-width="1.2"/>
          <line x1="0" y1="147" x2="0" y2="157" stroke="#2563eb" stroke-width="1.2"/>
          <line x1="280" y1="147" x2="280" y2="157" stroke="#2563eb" stroke-width="1.2"/>
          <text x="140" y="166" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">Length = ${len} ${currentUnitSystem === 'imperial' ? 'ft' : 'm'}</text>

          <!-- Height Dimension Marker -->
          <line x1="-10" y1="0" x2="-10" y2="140" stroke="#2563eb" stroke-width="1.2"/>
          <line x1="-15" y1="0" x2="-5" y2="0" stroke="#2563eb" stroke-width="1.2"/>
          <line x1="-15" y1="140" x2="-5" y2="140" stroke="#2563eb" stroke-width="1.2"/>
          <text x="-16" y="75" text-anchor="end" font-size="10" font-weight="bold" fill="#1d4ed8">${ht} ${currentUnitSystem === 'imperial' ? 'ft' : 'm'}</text>
        </g>

        <!-- RIGHT PANEL: Cross-Section Layer Profile -->
        <g transform="translate(360, 25)">
          <text x="100" y="-8" text-anchor="middle" font-size="11" font-weight="bold" fill="#475569">CROSS-SECTION DETAIL</text>
          <!-- Brick Masonry Substrate -->
          <rect x="20" y="10" width="100" height="130" fill="#fed7aa" stroke="#ea580c" stroke-width="1.5"/>
          <text x="70" y="70" text-anchor="middle" font-size="10" font-weight="bold" fill="#c2410c">Substrate</text>
          <text x="70" y="85" text-anchor="middle" font-size="8" fill="#9a3412">Brick / Block</text>

          <!-- Undercoat / Plaster Coat Layer -->
          <rect x="120" y="10" width="28" height="130" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5"/>
          <!-- Smooth Finish Line -->
          <line x1="148" y1="10" x2="148" y2="140" stroke="#1d4ed8" stroke-width="2.5"/>

          <!-- Thickness Callout Arrow -->
          <path d="M 120 155 L 148 155" stroke="#2563eb" stroke-width="1.5" marker-start="url(#dot)" marker-end="url(#dot)"/>
          <line x1="120" y1="150" x2="120" y2="160" stroke="#2563eb" stroke-width="1.2"/>
          <line x1="148" y1="150" x2="148" y2="160" stroke="#2563eb" stroke-width="1.2"/>
          <text x="134" y="172" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e40af">${thickMm.toFixed(0)} mm</text>
          <text x="134" y="184" text-anchor="middle" font-size="8" fill="#64748b">Plaster Coat</text>
        </g>
      `;
    } else if (currentMode === 'general_mortar') {
      const len = parseFloat(gmLength.value) || 5;
      const wid = parseFloat(gmWidth.value) || 4;
      const depth = parseFloat(gmDepth.value) || 50;
      const dUnit = gmDepthUnit.value;
      const sections = parseInt(gmSections.value, 10) || 1;

      if (lblVisualBadge) lblVisualBadge.textContent = '3D Mortar Bed';
      if (lblVisualCaption) lblVisualCaption.textContent = 'Isometric Mortar Screed Volume';
      if (txtVisualDimensions) txtVisualDimensions.textContent = `Mortar Bed: ${len} × ${wid} × ${depth}${dUnit} (${sections} section${sections > 1 ? 's' : ''})`;

      svgPlaster.innerHTML = `
        <g transform="translate(100, 30)">
          <text x="200" y="-8" text-anchor="middle" font-size="12" font-weight="bold" fill="#475569">MORTAR BED / SCREED LAYER</text>
          <!-- 3D Isometric Prism of Mortar Bed -->
          <!-- Top Face -->
          <polygon points="120,20 280,20 200,80 40,80" fill="#93c5fd" stroke="#2563eb" stroke-width="1.5"/>
          <!-- Front Face -->
          <polygon points="40,80 200,80 200,120 40,120" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1.5"/>
          <!-- Right Face -->
          <polygon points="200,80 280,20 280,60 200,120" fill="#1d4ed8" stroke="#1e40af" stroke-width="1.5"/>

          <!-- Dimension Labels -->
          <text x="120" y="105" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">Length = ${len} ${currentUnitSystem === 'imperial' ? 'ft' : 'm'}</text>
          <text x="250" y="70" text-anchor="middle" font-size="9" font-weight="bold" fill="#ffffff" transform="rotate(-30, 250, 70)">Width = ${wid} ${currentUnitSystem === 'imperial' ? 'ft' : 'm'}</text>
          <text x="15" y="105" text-anchor="end" font-size="9" font-weight="bold" fill="#2563eb">Depth: ${depth}${dUnit}</text>
          <line x1="25" y1="80" x2="25" y2="120" stroke="#2563eb" stroke-width="1.2"/>
        </g>
      `;
    } else if (currentMode === 'tile_mortar') {
      const area = parseFloat(tmArea.value) || 50;
      const pLabel = tmPreset.value === 'custom' ? `${tmCustomLen.value}x${tmCustomWid.value}mm` : tmPreset.value;
      const thick = parseFloat(tmThick.value) || 6;

      if (lblVisualBadge) lblVisualBadge.textContent = 'Tile Layout & Bed';
      if (lblVisualCaption) lblVisualCaption.textContent = 'Tiling Grid & Notched Adhesive Bed';
      if (txtVisualDimensions) txtVisualDimensions.textContent = `Area: ${area}${currentUnitSystem === 'imperial' ? 'sq.ft' : 'm²'} | Preset: ${pLabel} | Bed: ${thick}mm`;

      svgPlaster.innerHTML = `
        <g transform="translate(60, 25)">
          <text x="240" y="-8" text-anchor="middle" font-size="12" font-weight="bold" fill="#475569">TILE GRID & NOTCHED ADHESIVE BED</text>
          <!-- Left: Tiled Surface Grid -->
          <g transform="translate(0, 10)">
            <rect x="0" y="0" width="180" height="130" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
            <!-- Tiles 3x3 -->
            <rect x="5" y="5" width="52" height="36" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.2" rx="2"/>
            <rect x="62" y="5" width="52" height="36" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.2" rx="2"/>
            <rect x="119" y="5" width="52" height="36" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.2" rx="2"/>
            <rect x="5" y="46" width="52" height="36" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.2" rx="2"/>
            <rect x="62" y="46" width="52" height="36" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.2" rx="2"/>
            <rect x="119" y="46" width="52" height="36" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.2" rx="2"/>
            <rect x="5" y="87" width="52" height="36" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.2" rx="2"/>
            <rect x="62" y="87" width="52" height="36" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.2" rx="2"/>
            <rect x="119" y="87" width="52" height="36" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.2" rx="2"/>
            <text x="90" y="152" text-anchor="middle" font-size="10" font-weight="bold" fill="#0369a1">Format: ${pLabel}</text>
          </g>

          <!-- Right: Notched Trowel Adhesive Profile -->
          <g transform="translate(240, 20)">
            <rect x="0" y="0" width="220" height="24" rx="2" fill="#cbd5e1" stroke="#64748b" stroke-width="1.2"/>
            <text x="110" y="16" text-anchor="middle" font-size="10" font-weight="bold" fill="#334155">Tile Body / Slab</text>
            <!-- Notched Adhesive Ridges -->
            <path d="M 5 24 L 15 42 L 25 24 L 35 42 L 45 24 L 55 42 L 65 24 L 75 42 L 85 24 L 95 42 L 105 24 L 115 42 L 125 24 L 135 42 L 145 24 L 155 42 L 165 24 L 175 42 L 185 24 L 195 42 L 205 24 L 215 42" stroke="#2563eb" stroke-width="2" fill="#93c5fd"/>
            <rect x="0" y="42" width="220" height="50" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.2"/>
            <text x="110" y="70" text-anchor="middle" font-size="10" font-weight="bold" fill="#475569">Concrete / Screed Substrate</text>

            <line x1="230" y1="24" x2="230" y2="42" stroke="#2563eb" stroke-width="1.2"/>
            <text x="238" y="36" font-size="9" font-weight="bold" fill="#2563eb">${thick} mm Notch Bed</text>
          </g>
        </g>
      `;
    } else if (currentMode === 'gaming_mortar') {
      const x1 = parseFloat(gameX1.value) || 1000;
      const y1 = parseFloat(gameY1.value) || 1000;
      const x2 = parseFloat(gameX2.value) || 1600;
      const y2 = parseFloat(gameY2.value) || 1800;
      const dx = x2 - x1;
      const dy = y2 - y1;
      const dist = Math.sqrt(dx * dx + dy * dy);
      let deg = (Math.atan2(dx, dy) * 180) / Math.PI;
      if (deg < 0) deg += 360;

      if (lblVisualBadge) lblVisualBadge.textContent = 'Artillery Radar Grid';
      if (lblVisualCaption) lblVisualCaption.textContent = 'Tactical Vector Trajectory & Azimuth Arc';
      if (txtVisualDimensions) txtVisualDimensions.textContent = `Range: ${Math.round(dist)}m | Bearing: ${deg.toFixed(1)}° (${Math.round((deg / 360) * 6400)} Mils)`;

      svgPlaster.innerHTML = `
        <g transform="translate(150, 10)">
          <text x="150" y="10" text-anchor="middle" font-size="11" font-weight="bold" fill="#b45309">TACTICAL COORDINATE TARGETING MAP</text>
          <!-- Tactical Radar Rings -->
          <circle cx="150" cy="115" r="90" fill="none" stroke="#fde68a" stroke-width="1" stroke-dasharray="3 3"/>
          <circle cx="150" cy="115" r="60" fill="none" stroke="#fde68a" stroke-width="1" stroke-dasharray="3 3"/>
          <circle cx="150" cy="115" r="30" fill="none" stroke="#fde68a" stroke-width="1" stroke-dasharray="3 3"/>
          <line x1="150" y1="20" x2="150" y2="210" stroke="#fcd34d" stroke-width="0.8"/>
          <line x1="55" y1="115" x2="245" y2="115" stroke="#fcd34d" stroke-width="0.8"/>

          <!-- Mortar Tube Position (Origin) -->
          <circle cx="150" cy="115" r="7" fill="#2563eb" stroke="#ffffff" stroke-width="1.5"/>
          <text x="150" y="138" text-anchor="middle" font-size="9" font-weight="bold" fill="#1d4ed8">Mortar (${x1}, ${y1})</text>

          <!-- Line of Fire -->
          <line x1="150" y1="115" x2="${150 + Math.sin((deg * Math.PI) / 180) * 75}" y2="${115 - Math.cos((deg * Math.PI) / 180) * 75}" stroke="#dc2626" stroke-width="2" stroke-dasharray="4 2"/>

          <!-- Target Position -->
          <circle cx="${150 + Math.sin((deg * Math.PI) / 180) * 75}" cy="${115 - Math.cos((deg * Math.PI) / 180) * 75}" r="6" fill="#dc2626" stroke="#ffffff" stroke-width="1.5"/>
          <text x="${150 + Math.sin((deg * Math.PI) / 180) * 75}" y="${115 - Math.cos((deg * Math.PI) / 180) * 75 - 10}" text-anchor="middle" font-size="9" font-weight="bold" fill="#b91c1c">Target (${x2}, ${y2})</text>

          <!-- Range Badge -->
          <rect x="235" y="60" width="105" height="42" rx="6" fill="#ffffff" stroke="#f59e0b" stroke-width="1.2"/>
          <text x="242" y="78" font-size="9" font-weight="bold" fill="#b45309">Dist: ${Math.round(dist)} m</text>
          <text x="242" y="93" font-size="8.5" font-weight="bold" fill="#475569">Az: ${deg.toFixed(1)}° (${Math.round((deg / 360) * 6400)} Mils)</text>
        </g>
      `;
    }
  }

  // Invalidate and mark stale when inputs change
  function handleInputChange() {
    renderDynamicVisual();
    markResultsStale();
  }

  // Handle Tab Switch
  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode');
      if (mode === currentMode) return;
      currentMode = mode;

      modeButtons.forEach((b) => {
        b.classList.remove('active', 'border-blue-600', 'bg-blue-50', 'text-blue-700', 'dark:border-blue-500', 'dark:bg-blue-950/60', 'dark:text-blue-300');
        b.classList.add('border-slate-300', 'bg-white', 'text-slate-700', 'dark:border-slate-700', 'dark:bg-slate-800', 'dark:text-slate-200');
      });

      btn.classList.add('active', 'border-blue-600', 'bg-blue-50', 'text-blue-700', 'dark:border-blue-500', 'dark:bg-blue-950/60', 'dark:text-blue-300');
      btn.classList.remove('border-slate-300', 'bg-white', 'text-slate-700', 'dark:border-slate-700', 'dark:bg-slate-800', 'dark:text-slate-200');

      sectionWallPlaster.classList.add('hidden');
      sectionGeneralMortar.classList.add('hidden');
      sectionTileMortar.classList.add('hidden');
      sectionGamingMortar.classList.add('hidden');

      if (mode === 'wall_plaster') {
        sectionWallPlaster.classList.remove('hidden');
        if (modeBadge) modeBadge.textContent = 'Construction Tool';
        btnCalc.textContent = 'Calculate Wall Plaster →';
      } else if (mode === 'general_mortar') {
        sectionGeneralMortar.classList.remove('hidden');
        if (modeBadge) modeBadge.textContent = 'Mortar Tool';
        btnCalc.textContent = 'Calculate Mortar Quantity →';
      } else if (mode === 'tile_mortar') {
        sectionTileMortar.classList.remove('hidden');
        if (modeBadge) modeBadge.textContent = 'Tile Work';
        btnCalc.textContent = 'Calculate Tile Mortar →';
      } else if (mode === 'gaming_mortar') {
        sectionGamingMortar.classList.remove('hidden');
        if (modeBadge) modeBadge.textContent = 'Gaming Artillery';
        btnCalc.textContent = 'Calculate Coordinates & Range →';
      }

      renderDynamicVisual();
      markResultsStale();
    });
  });

  // Toggle Custom Inputs
  if (wpThickPreset) {
    wpThickPreset.addEventListener('change', () => {
      divWpCustomThick.classList.toggle('hidden', wpThickPreset.value !== 'custom');
      handleInputChange();
    });
  }

  if (wpRatio) {
    wpRatio.addEventListener('change', () => {
      divWpCustomRatio.classList.toggle('hidden', wpRatio.value !== 'custom');
      handleInputChange();
    });
  }

  if (gmRatio) {
    gmRatio.addEventListener('change', () => {
      divGmCustomRatio.classList.toggle('hidden', gmRatio.value !== 'custom');
      handleInputChange();
    });
  }

  // Dynamic Tile Preset and Custom Size listeners
  if (tmPreset) {
    tmPreset.addEventListener('change', () => {
      if (divTmCustomSize) {
        divTmCustomSize.classList.toggle('hidden', tmPreset.value !== 'custom');
      }
      if (tmPreset.value === '300x300') {
        tmThick.value = 4;
        tmCoverage.value = 4.0;
      } else if (tmPreset.value === '600x600') {
        tmThick.value = 6;
        tmCoverage.value = 5.0;
      } else if (tmPreset.value === '600x1200') {
        tmThick.value = 8;
        tmCoverage.value = 6.5;
      }
      handleInputChange();
    });
  }

  // Attach change listeners to all form inputs
  document.querySelectorAll('#form-plaster-mortar input, #form-plaster-mortar select').forEach((inp) => {
    inp.addEventListener('input', handleInputChange);
    inp.addEventListener('change', handleInputChange);
  });

  // Show Error Helper
  function showError(msg) {
    if (!errBox) return;
    errBox.textContent = msg;
    errBox.classList.remove('hidden');
  }

  // MAIN CALCULATION ROUTINE (Manual Trigger - Rule 8)
  function performCalculation() {
    if (errBox) {
      errBox.classList.add('hidden');
      errBox.textContent = '';
    }

    try {
      const isImp = currentUnitSystem === 'imperial';
      const enableCost = chkEnableCost ? chkEnableCost.checked : false;
      const cRate = parseFloat(inpRateCement.value) || 0;
      const sRate = parseFloat(inpRateSand.value) || 0;
      const aRate = parseFloat(inpRateTileAdh.value) || 0;

      if (currentMode === 'wall_plaster') {
        const len = parseFloat(wpLength.value);
        const ht = parseFloat(wpHeight.value);
        const walls = parseInt(wpWalls.value, 10) || 1;
        const openDed = parseFloat(wpOpenings.value) || 0;
        const wastage = parseFloat(wpWastage.value) || 0;
        const dryFactor = parseFloat(wpDryFactor.value) || 1.30;

        if (isNaN(len) || len <= 0) return showError('Please enter a valid Wall Length greater than zero.');
        if (isNaN(ht) || ht <= 0) return showError('Please enter a valid Wall Height greater than zero.');
        if (walls <= 0) return showError('Number of walls must be at least 1.');
        if (openDed < 0) return showError('Openings deduction cannot be negative.');

        let thick = 15;
        let thickUnit = 'mm';
        if (wpThickPreset.value === 'custom') {
          thick = parseFloat(wpCustomThickVal.value);
          thickUnit = wpCustomThickUnit.value;
          if (isNaN(thick) || thick <= 0) return showError('Please enter a valid plaster thickness.');
        } else {
          thick = parseFloat(wpThickPreset.value);
        }

        const ratio = wpRatio.value;
        let customC = 1;
        let customS = 4;
        if (ratio === 'custom') {
          customC = parseFloat(wpCustomC.value);
          customS = parseFloat(wpCustomS.value);
          if (isNaN(customC) || customC <= 0 || isNaN(customS) || customS <= 0) {
            return showError('Please enter valid custom mortar ratio parts.');
          }
        }

        // Calculations
        let totalWallAreaSqm = isImp ? (len * ht * walls) / 10.7639104 : (len * ht * walls);
        let openingsAreaSqm = isImp ? openDed / 10.7639104 : openDed;

        if (openingsAreaSqm >= totalWallAreaSqm) {
          return showError('Openings deduction area cannot exceed or equal total wall area.');
        }

        const netAreaSqm = totalWallAreaSqm - openingsAreaSqm;
        const netAreaSqft = netAreaSqm * 10.7639104;

        let thicknessM = (thickUnit === 'cm') ? thick / 100 : (thickUnit === 'in') ? (thick * 25.4) / 1000 : thick / 1000;
        let thicknessMm = (thickUnit === 'cm') ? thick * 10 : (thickUnit === 'in') ? thick * 25.4 : thick;
        let wetVolCum = netAreaSqm * thicknessM;
        let dryVolCum = wetVolCum * dryFactor * (1 + wastage / 100);

        let cPart = (ratio === 'custom') ? customC : parseInt(ratio.split(':')[0], 10);
        let sPart = (ratio === 'custom') ? customS : parseInt(ratio.split(':')[1], 10);
        let totalParts = cPart + sPart;

        let cementVolCum = (dryVolCum * cPart) / totalParts;
        let cementKg = cementVolCum * 1440;
        let cementBags = cementKg / 50;
        let cementBagsRound = Math.ceil(cementBags);

        let sandVolCum = (dryVolCum * sPart) / totalParts;
        let sandCft = sandVolCum * 35.3146667;
        let sandTons = (sandVolCum * 1600) / 1000;

        let costSummary = null;
        if (enableCost) {
          const cementCost = cementBagsRound * cRate;
          const sandCost = sandCft * sRate;
          const totalCost = cementCost + sandCost;
          const sym = currentCurrency === 'INR' ? '₹' : '$';
          costSummary = {
            currency: currentCurrency,
            currencySymbol: sym,
            items: [
              { name: 'Cement (50 kg Bags)', quantity: cementBagsRound, unit: 'Bags', unitRate: cRate, totalCost: cementCost },
              { name: 'Sand (CFT)', quantity: Number(sandCft.toFixed(2)), unit: 'CFT', unitRate: sRate, totalCost: sandCost },
            ],
            totalCost: totalCost,
            formattedTotal: sym + (currentCurrency === 'INR' ? Math.round(totalCost).toLocaleString('en-IN') : totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })),
          };
        }

        lastResultData = {
          mode: 'wall_plaster',
          title: 'Plaster Material Calculation',
          netAreaSqm: netAreaSqm.toFixed(2),
          netAreaSqft: netAreaSqft.toFixed(2),
          thickMm: thicknessMm.toFixed(1),
          wetVolCum: wetVolCum.toFixed(3),
          wetVolCft: (wetVolCum * 35.3146667).toFixed(2),
          dryVolCum: dryVolCum.toFixed(3),
          dryVolCft: (dryVolCum * 35.3146667).toFixed(2),
          cementKg: cementKg.toFixed(1),
          cementBags: cementBags.toFixed(2),
          cementBagsRound: cementBagsRound,
          sandCft: sandCft.toFixed(2),
          sandTons: sandTons.toFixed(2),
          ratioLabel: `${cPart}:${sPart}`,
          wastage: wastage,
          dryFactor: dryFactor,
          costSummary: costSummary,
        };

        // Render Hero
        lblHeroTag.textContent = 'ESTIMATED PLASTER MATERIAL REQUIREMENT';
        resHeroMain.textContent = `${lastResultData.cementBagsRound} Cement Bags (50kg)`;
        resHeroSub.textContent = `Exact: ${lastResultData.cementBags} Bags (${lastResultData.cementKg} kg) + ${lastResultData.sandCft} CFT Sand | Dry Vol: ${lastResultData.dryVolCum} m³`;

        // Render Grid
        gridResultMetrics.innerHTML = `
          <div class="rounded-xl border border-blue-200/60 bg-white/80 p-3 dark:border-slate-800 dark:bg-slate-900/70">
            <div class="text-slate-500 dark:text-slate-400 font-semibold">Net Plaster Area</div>
            <div class="mt-1 text-sm sm:text-base font-bold text-slate-900 dark:text-white">${lastResultData.netAreaSqm} m² <span class="text-xs font-normal text-slate-500">(${lastResultData.netAreaSqft} sq.ft)</span></div>
          </div>
          <div class="rounded-xl border border-blue-200/60 bg-white/80 p-3 dark:border-slate-800 dark:bg-slate-900/70">
            <div class="text-slate-500 dark:text-slate-400 font-semibold">Wet Mortar Volume</div>
            <div class="mt-1 text-sm sm:text-base font-bold text-slate-900 dark:text-white">${lastResultData.wetVolCum} m³ <span class="text-xs font-normal text-slate-500">(${lastResultData.wetVolCft} CFT)</span></div>
          </div>
          <div class="rounded-xl border border-blue-200/60 bg-white/80 p-3 dark:border-slate-800 dark:bg-slate-900/70">
            <div class="text-slate-500 dark:text-slate-400 font-semibold">Sand Required</div>
            <div class="mt-1 text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400">${lastResultData.sandCft} CFT <span class="text-xs font-normal text-slate-500">(${lastResultData.sandTons} Tonnes)</span></div>
          </div>
          <div class="rounded-xl border border-blue-200/60 bg-white/80 p-3 dark:border-slate-800 dark:bg-slate-900/70">
            <div class="text-slate-500 dark:text-slate-400 font-semibold">Dry Volume (${lastResultData.wastage}% waste)</div>
            <div class="mt-1 text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400">${lastResultData.dryVolCum} m³ <span class="text-xs font-normal text-slate-500">(${lastResultData.dryVolCft} CFT)</span></div>
          </div>
        `;

        // Render BOQ Table
        tbodyMaterialBreakdown.innerHTML = `
          <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
            <td class="p-3 font-semibold">Cement (50 kg Standard Bags)</td>
            <td class="p-3 font-bold text-blue-600 dark:text-blue-400">${lastResultData.cementBagsRound} Bags (${lastResultData.cementKg} kg)</td>
            <td class="p-3 text-slate-600 dark:text-slate-400">${(lastResultData.cementKg * 2.20462).toFixed(1)} lbs</td>
            <td class="p-3 font-mono text-[11px]">1440 kg/m³ density</td>
          </tr>
          <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
            <td class="p-3 font-semibold">Sand (Plastering River / M-Sand)</td>
            <td class="p-3 font-bold text-emerald-600 dark:text-emerald-400">${lastResultData.sandCft} CFT</td>
            <td class="p-3 text-slate-600 dark:text-slate-400">${(parseFloat(lastResultData.sandCft) / 27).toFixed(2)} cu.yd</td>
            <td class="p-3 font-mono text-[11px]">${lastResultData.sandTons} Metric Tonnes (~1600 kg/m³)</td>
          </tr>
          <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
            <td class="p-3 font-semibold">Dry Mortar Total Volume</td>
            <td class="p-3 font-bold">${lastResultData.dryVolCum} m³</td>
            <td class="p-3 text-slate-600 dark:text-slate-400">${lastResultData.dryVolCft} CFT</td>
            <td class="p-3 font-mono text-[11px]">Dry Factor: ${lastResultData.dryFactor} × ${(1 + wastage/100).toFixed(2)}</td>
          </tr>
        `;

        // Render Calculation Breakdown
        txtCalcDetails.innerHTML = `
          <div>1. Total Wall Area = ${len} × ${ht} × ${walls} = ${(len * ht * walls).toFixed(2)} ${isImp ? 'sq.ft' : 'm²'}</div>
          <div>2. Openings Deduction = ${openDed.toFixed(2)} ${isImp ? 'sq.ft' : 'm²'} ➔ Net Plaster Area = ${lastResultData.netAreaSqm} m² (${lastResultData.netAreaSqft} sq.ft)</div>
          <div>3. Wet Mortar Volume = ${lastResultData.netAreaSqm} m² × ${lastResultData.thickMm}mm = ${lastResultData.wetVolCum} m³ (${lastResultData.wetVolCft} CFT)</div>
          <div>4. Dry Factor (${dryFactor}) + Wastage (${wastage}%) ➔ Dry Volume = ${lastResultData.wetVolCum} × ${dryFactor} × ${(1 + wastage / 100).toFixed(2)} = ${lastResultData.dryVolCum} m³</div>
          <div>5. Mortar Ratio ${lastResultData.ratioLabel} (${cPart} part Cement, ${sPart} parts Sand)</div>
          <div>   • Cement Volume = (${lastResultData.dryVolCum} × ${cPart}/${totalParts}) = ${(cementVolCum).toFixed(3)} m³ ➔ ${lastResultData.cementKg} kg ➔ ${lastResultData.cementBags} Bags (50kg) ➔ <strong>${lastResultData.cementBagsRound} Bags</strong></div>
          <div>   • Sand Volume = (${lastResultData.dryVolCum} × ${sPart}/${totalParts}) = ${(sandVolCum).toFixed(3)} m³ ➔ <strong>${lastResultData.sandCft} CFT (${lastResultData.sandTons} Tonnes)</strong></div>
        `;

      } else if (currentMode === 'general_mortar') {
        const len = parseFloat(gmLength.value);
        const wid = parseFloat(gmWidth.value);
        const depth = parseFloat(gmDepth.value);
        const depthUnit = gmDepthUnit.value;
        const sections = parseInt(gmSections.value, 10) || 1;
        const wastage = parseFloat(gmWastage.value) || 0;
        const dryFactor = parseFloat(gmDryFactor.value) || 1.30;

        if (isNaN(len) || len <= 0 || isNaN(wid) || wid <= 0 || isNaN(depth) || depth <= 0) {
          return showError('Please enter valid Length, Width, and Depth greater than zero.');
        }

        let lenM = isImp ? len * 0.3048 : len;
        let widM = isImp ? wid * 0.3048 : wid;
        let depthM = (depthUnit === 'mm') ? depth / 1000 : (depthUnit === 'cm') ? depth / 100 : (depthUnit === 'in') ? (depth * 25.4) / 1000 : depth;

        let wetVolCum = lenM * widM * depthM * sections;
        let dryVolCum = wetVolCum * dryFactor * (1 + wastage / 100);

        const ratio = gmRatio.value;
        let cPart = (ratio === 'custom') ? parseFloat(gmCustomC.value) : parseInt(ratio.split(':')[0], 10);
        let sPart = (ratio === 'custom') ? parseFloat(gmCustomS.value) : parseInt(ratio.split(':')[1], 10);
        let totalParts = cPart + sPart;

        let cementVolCum = (dryVolCum * cPart) / totalParts;
        let cementKg = cementVolCum * 1440;
        let cementBags = cementKg / 50;
        let cementBagsRound = Math.ceil(cementBags);

        let sandVolCum = (dryVolCum * sPart) / totalParts;
        let sandCft = sandVolCum * 35.3146667;
        let sandTons = (sandVolCum * 1600) / 1000;

        let costSummary = null;
        if (enableCost) {
          const cementCost = cementBagsRound * cRate;
          const sandCost = sandCft * sRate;
          const totalCost = cementCost + sandCost;
          const sym = currentCurrency === 'INR' ? '₹' : '$';
          costSummary = {
            currency: currentCurrency,
            currencySymbol: sym,
            items: [
              { name: 'Cement (50 kg Bags)', quantity: cementBagsRound, unit: 'Bags', unitRate: cRate, totalCost: cementCost },
              { name: 'Sand (CFT)', quantity: Number(sandCft.toFixed(2)), unit: 'CFT', unitRate: sRate, totalCost: sandCost },
            ],
            totalCost: totalCost,
            formattedTotal: sym + (currentCurrency === 'INR' ? Math.round(totalCost).toLocaleString('en-IN') : totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })),
          };
        }

        lastResultData = {
          mode: 'general_mortar',
          title: 'Mortar Quantity Calculation',
          wetVolCum: wetVolCum.toFixed(3),
          wetVolCft: (wetVolCum * 35.3146667).toFixed(2),
          dryVolCum: dryVolCum.toFixed(3),
          dryVolCft: (dryVolCum * 35.3146667).toFixed(2),
          cementKg: cementKg.toFixed(1),
          cementBags: cementBags.toFixed(2),
          cementBagsRound: cementBagsRound,
          sandCft: sandCft.toFixed(2),
          sandTons: sandTons.toFixed(2),
          ratioLabel: `${cPart}:${sPart}`,
          wastage: wastage,
          dryFactor: dryFactor,
          costSummary: costSummary,
        };

        lblHeroTag.textContent = 'ESTIMATED MORTAR QUANTITY';
        resHeroMain.textContent = `${lastResultData.cementBagsRound} Bags Cement + ${lastResultData.sandCft} CFT Sand`;
        resHeroSub.textContent = `Wet Volume: ${lastResultData.wetVolCum} m³ (${lastResultData.wetVolCft} CFT) | Dry Volume: ${lastResultData.dryVolCum} m³`;

        gridResultMetrics.innerHTML = `
          <div class="rounded-xl border border-blue-200/60 bg-white/80 p-3 dark:border-slate-800 dark:bg-slate-900/70">
            <div class="text-slate-500 dark:text-slate-400 font-semibold">Total Wet Volume</div>
            <div class="mt-1 text-sm sm:text-base font-bold text-slate-900 dark:text-white">${lastResultData.wetVolCum} m³ <span class="text-xs font-normal text-slate-500">(${lastResultData.wetVolCft} CFT)</span></div>
          </div>
          <div class="rounded-xl border border-blue-200/60 bg-white/80 p-3 dark:border-slate-800 dark:bg-slate-900/70">
            <div class="text-slate-500 dark:text-slate-400 font-semibold">Cement Required</div>
            <div class="mt-1 text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400">${lastResultData.cementBagsRound} Bags <span class="text-xs font-normal text-slate-500">(${lastResultData.cementKg} kg)</span></div>
          </div>
          <div class="rounded-xl border border-blue-200/60 bg-white/80 p-3 dark:border-slate-800 dark:bg-slate-900/70">
            <div class="text-slate-500 dark:text-slate-400 font-semibold">Sand Required</div>
            <div class="mt-1 text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400">${lastResultData.sandCft} CFT <span class="text-xs font-normal text-slate-500">(${lastResultData.sandTons} Tonnes)</span></div>
          </div>
          <div class="rounded-xl border border-blue-200/60 bg-white/80 p-3 dark:border-slate-800 dark:bg-slate-900/70">
            <div class="text-slate-500 dark:text-slate-400 font-semibold">Mix Ratio</div>
            <div class="mt-1 text-sm sm:text-base font-bold text-slate-900 dark:text-white">${lastResultData.ratioLabel} <span class="text-xs font-normal text-slate-500">(Wastage: ${wastage}%)</span></div>
          </div>
        `;

        tbodyMaterialBreakdown.innerHTML = `
          <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
            <td class="p-3 font-semibold">Cement (50 kg Bags)</td>
            <td class="p-3 font-bold text-blue-600 dark:text-blue-400">${lastResultData.cementBagsRound} Bags (${lastResultData.cementKg} kg)</td>
            <td class="p-3 text-slate-600 dark:text-slate-400">${(lastResultData.cementKg * 2.20462).toFixed(1)} lbs</td>
            <td class="p-3 font-mono text-[11px]">1440 kg/m³</td>
          </tr>
          <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
            <td class="p-3 font-semibold">Sand Required</td>
            <td class="p-3 font-bold text-emerald-600 dark:text-emerald-400">${lastResultData.sandCft} CFT</td>
            <td class="p-3 text-slate-600 dark:text-slate-400">${(parseFloat(lastResultData.sandCft) / 27).toFixed(2)} cu.yd</td>
            <td class="p-3 font-mono text-[11px]">${lastResultData.sandTons} Tonnes</td>
          </tr>
        `;

        txtCalcDetails.innerHTML = `
          <div>1. Wet Volume = ${lenM.toFixed(2)}m × ${widM.toFixed(2)}m × ${depthM.toFixed(3)}m × ${sections} = ${lastResultData.wetVolCum} m³ (${lastResultData.wetVolCft} CFT)</div>
          <div>2. Dry Volume = ${lastResultData.wetVolCum} × ${dryFactor} × ${(1 + wastage / 100).toFixed(2)} = ${lastResultData.dryVolCum} m³ (${lastResultData.dryVolCft} CFT)</div>
          <div>3. Cement Portion = (${lastResultData.dryVolCum} × ${cPart}/${totalParts}) × 1440 kg/m³ = ${lastResultData.cementKg} kg ➔ ${lastResultData.cementBags} Bags (50kg) ➔ <strong>${lastResultData.cementBagsRound} Bags</strong></div>
          <div>4. Sand Portion = (${lastResultData.dryVolCum} × ${sPart}/${totalParts}) × 35.3147 = <strong>${lastResultData.sandCft} CFT (${lastResultData.sandTons} Tonnes)</strong></div>
        `;

      } else if (currentMode === 'tile_mortar') {
        const area = parseFloat(tmArea.value);
        const tileType = tmType.value;
        const thickness = parseFloat(tmThick.value) || 6;
        const coverage = parseFloat(tmCoverage.value);
        const bagSize = parseFloat(tmBagSize.value) || 20;
        const wastage = parseFloat(tmWastage.value) || 10;

        if (isNaN(area) || area <= 0 || isNaN(coverage) || coverage <= 0) {
          return showError('Please enter valid Tiling Area and Coverage Rate.');
        }

        let tilePresetLabel = '600 × 600 mm (Medium Format)';
        if (tmPreset.value === 'custom') {
          const cLen = parseFloat(tmCustomLen.value);
          const cWid = parseFloat(tmCustomWid.value);
          if (isNaN(cLen) || cLen <= 0 || isNaN(cWid) || cWid <= 0) {
            return showError('Please enter valid Custom Tile Length and Width in millimeters.');
          }
          tilePresetLabel = `Custom (${cLen} × ${cWid} mm)`;
        } else {
          tilePresetLabel = tmPreset.options[tmPreset.selectedIndex].text;
        }

        let areaSqm = isImp ? area / 10.7639104 : area;
        let areaSqft = isImp ? area : area * 10.7639104;

        let baseKg = areaSqm * coverage;
        let wasteKg = baseKg * (wastage / 100);
        let totalKg = baseKg + wasteKg;
        let exactBags = totalKg / bagSize;
        let roundBags = Math.ceil(exactBags);

        let costSummary = null;
        if (enableCost) {
          const totalCost = roundBags * aRate;
          const sym = currentCurrency === 'INR' ? '₹' : '$';
          costSummary = {
            currency: currentCurrency,
            currencySymbol: sym,
            items: [
              { name: `Tile Adhesive (${bagSize} kg Bags)`, quantity: roundBags, unit: 'Bags', unitRate: aRate, totalCost: totalCost },
            ],
            totalCost: totalCost,
            formattedTotal: sym + (currentCurrency === 'INR' ? Math.round(totalCost).toLocaleString('en-IN') : totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })),
          };
        }

        lastResultData = {
          mode: 'tile_mortar',
          title: 'Tile Mortar Calculation',
          areaSqm: areaSqm.toFixed(2),
          areaSqft: areaSqft.toFixed(2),
          tileType: tileType === 'floor' ? 'Floor Tile' : 'Wall Tile',
          tilePresetLabel: tilePresetLabel,
          thicknessMm: thickness,
          coverage: coverage.toFixed(1),
          baseKg: baseKg.toFixed(1),
          wasteKg: wasteKg.toFixed(1),
          totalKg: totalKg.toFixed(1),
          bagSize: bagSize,
          exactBags: exactBags.toFixed(2),
          roundBags: roundBags,
          wastage: wastage,
          costSummary: costSummary,
        };

        lblHeroTag.textContent = 'ESTIMATED TILE MORTAR REQUIRED';
        resHeroMain.textContent = `${roundBags} Bags (${bagSize}kg each)`;
        resHeroSub.textContent = `Total Weight: ${lastResultData.totalKg} kg (Base: ${lastResultData.baseKg} kg + Wastage: ${lastResultData.wasteKg} kg) | Format: ${tilePresetLabel}`;

        gridResultMetrics.innerHTML = `
          <div class="rounded-xl border border-blue-200/60 bg-white/80 p-3 dark:border-slate-800 dark:bg-slate-900/70">
            <div class="text-slate-500 dark:text-slate-400 font-semibold">Tiling Surface Area</div>
            <div class="mt-1 text-sm sm:text-base font-bold text-slate-900 dark:text-white">${lastResultData.areaSqm} m² <span class="text-xs font-normal text-slate-500">(${lastResultData.areaSqft} sq.ft)</span></div>
          </div>
          <div class="rounded-xl border border-blue-200/60 bg-white/80 p-3 dark:border-slate-800 dark:bg-slate-900/70">
            <div class="text-slate-500 dark:text-slate-400 font-semibold">Tile Size & Bed</div>
            <div class="mt-1 text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400 truncate" title="${tilePresetLabel}">${tilePresetLabel} <span class="text-xs font-normal text-slate-500">(${thickness}mm bed)</span></div>
          </div>
          <div class="rounded-xl border border-blue-200/60 bg-white/80 p-3 dark:border-slate-800 dark:bg-slate-900/70">
            <div class="text-slate-500 dark:text-slate-400 font-semibold">Total Adhesive Required</div>
            <div class="mt-1 text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400">${lastResultData.totalKg} kg <span class="text-xs font-normal text-slate-500">(${roundBags} Bags)</span></div>
          </div>
          <div class="rounded-xl border border-blue-200/60 bg-white/80 p-3 dark:border-slate-800 dark:bg-slate-900/70">
            <div class="text-slate-500 dark:text-slate-400 font-semibold">Wastage Included</div>
            <div class="mt-1 text-sm sm:text-base font-bold text-slate-900 dark:text-white">${wastage}% <span class="text-xs font-normal text-slate-500">(${lastResultData.wasteKg} kg)</span></div>
          </div>
        `;

        tbodyMaterialBreakdown.innerHTML = `
          <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
            <td class="p-3 font-semibold">Tile Adhesive Ready-Mix (${bagSize} kg Bags)</td>
            <td class="p-3 font-bold text-emerald-600 dark:text-emerald-400">${roundBags} Bags (${lastResultData.totalKg} kg)</td>
            <td class="p-3 text-slate-600 dark:text-slate-400">${(parseFloat(lastResultData.totalKg) * 2.20462).toFixed(1)} lbs</td>
            <td class="p-3 font-mono text-[11px]">${coverage} kg/m² @ ${thickness}mm notched bed</td>
          </tr>
        `;

        txtCalcDetails.innerHTML = `
          <div>1. Total Tiling Area = ${lastResultData.areaSqm} m² (${lastResultData.areaSqft} sq.ft) | Format: ${tilePresetLabel}</div>
          <div>2. Base Adhesive Requirement = ${lastResultData.areaSqm} m² × ${lastResultData.coverage} kg/m² = ${lastResultData.baseKg} kg (${thickness}mm bed)</div>
          <div>3. Wastage Allowance (${wastage}%) = ${lastResultData.baseKg} kg × ${(wastage / 100).toFixed(2)} = ${lastResultData.wasteKg} kg</div>
          <div>4. Total Adhesive Weight = ${lastResultData.baseKg} + ${lastResultData.wasteKg} = ${lastResultData.totalKg} kg</div>
          <div>5. Number of ${bagSize}kg Bags = ${lastResultData.totalKg} / ${bagSize} = ${lastResultData.exactBags} ➔ <strong>${roundBags} Bags (rounded up)</strong></div>
        `;

      } else if (currentMode === 'gaming_mortar') {
        const game = gameSelect.value;
        const x1 = parseFloat(gameX1.value);
        const y1 = parseFloat(gameY1.value);
        const x2 = parseFloat(gameX2.value);
        const y2 = parseFloat(gameY2.value);
        const elev = parseFloat(gameElev.value) || 0;

        if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
          return showError('Please enter valid numeric X and Y coordinates for Mortar and Target.');
        }

        const dx = x2 - x1;
        const dy = y2 - y1;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist === 0) {
          return showError('Mortar position and Target position cannot be identical.');
        }

        let bearingRad = Math.atan2(dx, dy);
        let bearingDeg = (bearingRad * 180) / Math.PI;
        if (bearingDeg < 0) bearingDeg += 360;

        const natoMils = Math.round((bearingDeg / 360) * 6400);
        const warsawMils = Math.round((bearingDeg / 360) * 6000);

        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        const compass = directions[Math.round(((bearingDeg % 360) / 22.5)) % 16];

        let aimingRef = 'Azimuth: ' + bearingDeg.toFixed(1) + '° / ' + natoMils + ' NATO Mils';
        let aimingNotes = 'Reference geometric coordinate targeting.';

        if (game === 'squad') {
          if (dist < 50) {
            aimingRef = 'Below Min Range (<50m)';
            aimingNotes = 'Target is within minimum arming distance (50m).';
          } else if (dist > 1250) {
            aimingRef = 'Out of Range (>1250m)';
            aimingNotes = 'Target exceeds maximum effective range of Squad 81/82mm tube (1250m).';
          } else {
            const baseMil = 1579 - (dist - 50) * 0.8325;
            const finalMil = Math.round(baseMil - elev / 3.5);
            aimingRef = `${finalMil} Mils Elevation`;
            aimingNotes = `Squad 81mm/82mm standard tube reference. Est flight time ~28s. Elevation diff: ${elev >= 0 ? '+' : ''}${elev}m.`;
          }
        } else if (game === 'arma_reforger') {
          aimingRef = `Azimuth: ${natoMils} Mils (Range: ${Math.round(dist)}m)`;
          aimingNotes = 'Arma Reforger grid targeting reference.';
        } else if (game === 'arma') {
          let charge = 'Charge 0 (Close: 50-450m)';
          if (dist > 450 && dist <= 1800) charge = 'Charge 1 (Medium: 150-1800m)';
          else if (dist > 1800 && dist <= 3300) charge = 'Charge 2 (Far: 300-3300m)';
          else if (dist > 3300) charge = 'Out of Range (>3300m)';
          aimingRef = charge;
          aimingNotes = `Arma 3 Mk6 82mm reference. Range: ${Math.round(dist)}m, Bearing: ${bearingDeg.toFixed(1)}° (${natoMils} Mils).`;
        }

        lastResultData = {
          mode: 'gaming_mortar',
          title: 'Gaming Mortar Calculation',
          gameName: gameSelect.options[gameSelect.selectedIndex].text,
          mortarCoords: `(${x1}, ${y1})`,
          targetCoords: `(${x2}, ${y2})`,
          dx: dx.toFixed(1),
          dy: dy.toFixed(1),
          distM: dist.toFixed(1),
          distKm: (dist / 1000).toFixed(3),
          bearingDeg: bearingDeg.toFixed(1),
          compass: compass,
          natoMils: natoMils,
          warsawMils: warsawMils,
          elevDiff: elev,
          aimingRef: aimingRef,
          aimingNotes: aimingNotes,
        };

        lblHeroTag.textContent = 'TARGET DISTANCE & BEARING';
        resHeroMain.textContent = `${lastResultData.distM} meters`;
        resHeroSub.textContent = `Bearing: ${lastResultData.bearingDeg}° (${compass}) | ${natoMils} Mils NATO | ${aimingRef}`;

        gridResultMetrics.innerHTML = `
          <div class="rounded-xl border border-amber-200/60 bg-white/80 p-3 dark:border-slate-800 dark:bg-slate-900/70">
            <div class="text-slate-500 dark:text-slate-400 font-semibold">Horizontal Distance</div>
            <div class="mt-1 text-sm sm:text-base font-bold text-amber-600 dark:text-amber-400">${lastResultData.distM} m <span class="text-xs font-normal text-slate-500">(${lastResultData.distKm} km)</span></div>
          </div>
          <div class="rounded-xl border border-amber-200/60 bg-white/80 p-3 dark:border-slate-800 dark:bg-slate-900/70">
            <div class="text-slate-500 dark:text-slate-400 font-semibold">Direction / Azimuth</div>
            <div class="mt-1 text-sm sm:text-base font-bold text-slate-900 dark:text-white">${lastResultData.bearingDeg}° <span class="text-xs font-normal text-blue-600">(${compass})</span></div>
          </div>
          <div class="rounded-xl border border-amber-200/60 bg-white/80 p-3 dark:border-slate-800 dark:bg-slate-900/70">
            <div class="text-slate-500 dark:text-slate-400 font-semibold">NATO Mils</div>
            <div class="mt-1 text-sm sm:text-base font-bold text-slate-900 dark:text-white">${natoMils} Mils <span class="text-xs font-normal text-slate-500">(6400 scale)</span></div>
          </div>
          <div class="rounded-xl border border-amber-200/60 bg-white/80 p-3 dark:border-slate-800 dark:bg-slate-900/70">
            <div class="text-slate-500 dark:text-slate-400 font-semibold">Aiming / Elevation</div>
            <div class="mt-1 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400">${aimingRef}</div>
          </div>
        `;

        tbodyMaterialBreakdown.innerHTML = `
          <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
            <td class="p-3 font-semibold">Target Direct Distance</td>
            <td class="p-3 font-bold text-amber-600 dark:text-amber-400">${lastResultData.distM} meters</td>
            <td class="p-3 text-slate-600 dark:text-slate-400">${(parseFloat(lastResultData.distM) * 3.28084).toFixed(1)} feet (${lastResultData.distKm} km)</td>
            <td class="p-3 font-mono text-[11px]">Euclidean 2D sqrt(dx² + dy²)</td>
          </tr>
          <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
            <td class="p-3 font-semibold">Azimuth / Direction</td>
            <td class="p-3 font-bold">${lastResultData.bearingDeg}° (${compass})</td>
            <td class="p-3 text-slate-600 dark:text-slate-400">${natoMils} NATO Mils</td>
            <td class="p-3 font-mono text-[11px]">${warsawMils} Warsaw Mils</td>
          </tr>
        `;

        txtCalcDetails.innerHTML = `
          <div>1. Mortar Position = ${lastResultData.mortarCoords} | Target Position = ${lastResultData.targetCoords}</div>
          <div>2. ΔX (Easting Difference) = ${x2} − ${x1} = ${lastResultData.dx} m</div>
          <div>3. ΔY (Northing Difference) = ${y2} − ${y1} = ${lastResultData.dy} m</div>
          <div>4. 2D Euclidean Distance = √(${lastResultData.dx}² + ${lastResultData.dy}²) = <strong>${lastResultData.distM} meters</strong></div>
          <div>5. Azimuth Bearing = atan2(${lastResultData.dx}, ${lastResultData.dy}) = <strong>${lastResultData.bearingDeg}° (${compass})</strong> = ${natoMils} NATO Mils</div>
          <div>6. Reference Aiming Guidance: ${aimingNotes}</div>
        `;
      }

      // Render Cost Breakdown Table
      if (lastResultData.costSummary && divCostBreakdown && tbodyCostBreakdown) {
        divCostBreakdown.classList.remove('hidden');
        if (lblCostTotalTag) lblCostTotalTag.textContent = `Total: ${lastResultData.costSummary.formattedTotal}`;
        tbodyCostBreakdown.innerHTML = lastResultData.costSummary.items.map((item) => `
          <tr class="hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20">
            <td class="p-3 font-semibold">${item.name}</td>
            <td class="p-3">${item.quantity} ${item.unit}</td>
            <td class="p-3 font-mono">${lastResultData.costSummary.currencySymbol}${item.unitRate}</td>
            <td class="p-3 font-bold text-right text-emerald-600 dark:text-emerald-400 font-mono">${lastResultData.costSummary.currencySymbol}${item.totalCost.toLocaleString()}</td>
          </tr>
        `).join('');
      } else if (divCostBreakdown) {
        divCostBreakdown.classList.add('hidden');
      }

      // Hide placeholder and stale warning; display results
      if (resultsPlaceholder) resultsPlaceholder.classList.add('hidden');
      if (staleWarning) staleWarning.classList.add('hidden');
      if (resultsSection) {
        resultsSection.classList.remove('hidden');
      }
      try { document.dispatchEvent(new CustomEvent('calculator:updated')); } catch (e) {}
    } catch (e) {
      showError('An unexpected error occurred during calculation: ' + (e.message || ''));
    }
  }

  // Clear All
  function performClearAll() {
    wpLength.value = currentUnitSystem === 'imperial' ? '32.8' : '10';
    wpHeight.value = currentUnitSystem === 'imperial' ? '9.8' : '3';
    wpWalls.value = '1';
    wpOpenings.value = '0';
    wpThickPreset.value = '15';
    divWpCustomThick.classList.add('hidden');
    wpCustomThickVal.value = '15';
    wpRatio.value = '1:4';
    divWpCustomRatio.classList.add('hidden');
    wpCustomC.value = '1';
    wpCustomS.value = '4';
    wpWastage.value = '10';
    wpDryFactor.value = '1.30';

    gmLength.value = currentUnitSystem === 'imperial' ? '16.4' : '5';
    gmWidth.value = currentUnitSystem === 'imperial' ? '13.1' : '4';
    gmDepth.value = '50';
    gmDepthUnit.value = 'mm';
    gmSections.value = '1';
    gmRatio.value = '1:3';
    divGmCustomRatio.classList.add('hidden');
    gmCustomC.value = '1';
    gmCustomS.value = '3';
    gmWastage.value = '10';
    gmDryFactor.value = '1.30';

    tmArea.value = currentUnitSystem === 'imperial' ? '538.2' : '50';
    tmType.value = 'floor';
    tmPreset.value = '600x600';
    if (divTmCustomSize) divTmCustomSize.classList.add('hidden');
    if (tmCustomLen) tmCustomLen.value = '800';
    if (tmCustomWid) tmCustomWid.value = '800';
    tmThick.value = '6';
    tmCoverage.value = '5.0';
    tmBagSize.value = '20';
    tmWastage.value = '10';

    gameSelect.value = 'squad';
    gameX1.value = '1000';
    gameY1.value = '1000';
    gameX2.value = '1600';
    gameY2.value = '1800';
    gameElev.value = '0';

    lastResultData = null;
    if (resultsSection) resultsSection.classList.add('hidden');
    if (resultsPlaceholder) resultsPlaceholder.classList.remove('hidden');
    if (staleWarning) staleWarning.classList.add('hidden');
    if (errBox) {
      errBox.classList.add('hidden');
      errBox.textContent = '';
    }

    renderDynamicVisual();
  }

  btnCalc.addEventListener('click', performCalculation);
  btnClear.addEventListener('click', performClearAll);
  if (btnRecalculateStale) btnRecalculateStale.addEventListener('click', performCalculation);

  // Enter Key Handler
  document.querySelectorAll('input').forEach((inp) => {
    inp.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        performCalculation();
      }
    });
  });

  // Initial Visual Rendering & Calculation
  renderDynamicVisual();
  performCalculation();

  // PDF Export
  if (btnDownloadPdf) {
    btnDownloadPdf.addEventListener('click', async () => {
      if (!lastResultData) return;

      const txtBtn = document.getElementById('txt-btn-pm-pdf');
      if (txtBtn) txtBtn.textContent = 'Generating...';

      try {
        let jsPDFModule = window.jspdf;
        if (!jsPDFModule) {
          const script1 = document.createElement('script');
          script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
          await new Promise((resolve, reject) => {
            script1.onload = resolve;
            script1.onerror = reject;
            document.head.appendChild(script1);
          });
          const script2 = document.createElement('script');
          script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js';
          await new Promise((resolve, reject) => {
            script2.onload = resolve;
            script2.onerror = reject;
            document.head.appendChild(script2);
          });
          jsPDFModule = window.jspdf;
        } else if (!window.jspdf?.plugin?.autotable && !window.autoTable) {
          const script2 = document.createElement('script');
          script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js';
          await new Promise((resolve, reject) => {
            script2.onload = resolve;
            script2.onerror = reject;
            document.head.appendChild(script2);
          });
        }

        const { jsPDF } = jsPDFModule;
        const doc = new jsPDF({ unit: 'pt', format: 'a4' });

        const primaryColor = [37, 99, 235]; // #2563eb
        const darkColor = [15, 23, 42]; // #0f172a
        const slateColor = [100, 116, 139]; // #64748b
        const lightBg = [248, 250, 252]; // #f8fafc

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 40;
        let y = 45;

        // Header Branding
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.setTextColor(...primaryColor);
        doc.text('AIFreecalculator.com', margin, y);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...slateColor);
        doc.text('Free Online Civil & Construction Engineering Calculators', margin, y + 13);

        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        doc.text(`Generated: ${dateStr}`, pageWidth - margin, y + 5, { align: 'right' });

        y += 28;
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(1);
        doc.line(margin, y, pageWidth - margin, y);
        y += 24;

        // Title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(...darkColor);
        doc.text(lastResultData.title, margin, y);
        y += 18;

        // Summary Hero Box
        doc.setFillColor(...lightBg);
        doc.roundedRect(margin, y, pageWidth - margin * 2, 54, 8, 8, 'F');
        doc.setDrawColor(203, 213, 225);
        doc.roundedRect(margin, y, pageWidth - margin * 2, 54, 8, 8, 'D');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(...primaryColor);
        doc.text(lblHeroTag.textContent, margin + 14, y + 18);

        doc.setFontSize(14);
        doc.setTextColor(...darkColor);
        doc.text(resHeroMain.textContent, margin + 14, y + 36);

        y += 68;

        let tableRows = [];
        if (lastResultData.mode === 'wall_plaster') {
          tableRows = [
            ['Net Plaster Area', `${lastResultData.netAreaSqm} m2 (${lastResultData.netAreaSqft} sq.ft)`],
            ['Plaster Thickness', `${lastResultData.thickMm} mm`],
            ['Mortar Mix Ratio', `1:${lastResultData.ratioLabel.split(':')[1] || '4'} (Cement : Sand)`],
            ['Wet Mortar Volume', `${lastResultData.wetVolCum} m3 (${lastResultData.wetVolCft} CFT)`],
            ['Dry Mortar Volume', `${lastResultData.dryVolCum} m3 (${lastResultData.dryVolCft} CFT)`],
            ['Dry Factor & Wastage', `Multiplier: ${lastResultData.dryFactor} | Wastage: ${lastResultData.wastage}%`],
            ['Cement Required', `${lastResultData.cementBagsRound} Bags of 50kg (${lastResultData.cementKg} kg)`],
            ['Sand Required', `${lastResultData.sandCft} CFT (${lastResultData.sandTons} Tonnes)`],
          ];
        } else if (lastResultData.mode === 'general_mortar') {
          tableRows = [
            ['Total Wet Volume', `${lastResultData.wetVolCum} m3 (${lastResultData.wetVolCft} CFT)`],
            ['Total Dry Volume', `${lastResultData.dryVolCum} m3 (${lastResultData.dryVolCft} CFT)`],
            ['Mix Ratio', lastResultData.ratioLabel],
            ['Wastage Allowance', `${lastResultData.wastage}%`],
            ['Cement Required', `${lastResultData.cementBagsRound} Bags of 50kg (${lastResultData.cementKg} kg)`],
            ['Sand Required', `${lastResultData.sandCft} CFT (${lastResultData.sandTons} Tonnes)`],
          ];
        } else if (lastResultData.mode === 'tile_mortar') {
          tableRows = [
            ['Tiling Area', `${lastResultData.areaSqm} m2 (${lastResultData.areaSqft} sq.ft)`],
            ['Tile Application & Format', `${lastResultData.tileType} | ${lastResultData.tilePresetLabel}`],
            ['Bed Thickness & Coverage', `${lastResultData.thicknessMm}mm bed @ ${lastResultData.coverage} kg/m2`],
            ['Base Adhesive Weight', `${lastResultData.baseKg} kg`],
            ['Wastage Allowance', `${lastResultData.wastage}% (${lastResultData.wasteKg} kg)`],
            ['Total Required Weight', `${lastResultData.totalKg} kg`],
            ['Package Requirement', `${lastResultData.roundBags} Bags (${lastResultData.bagSize}kg each)`],
          ];
        } else if (lastResultData.mode === 'gaming_mortar') {
          tableRows = [
            ['Game Mode', lastResultData.gameName],
            ['Mortar Coordinates', lastResultData.mortarCoords],
            ['Target Coordinates', lastResultData.targetCoords],
            ['Coordinate Differences', `dX = ${lastResultData.dx}m, dY = ${lastResultData.dy}m`],
            ['Direct Distance', `${lastResultData.distM} meters (${lastResultData.distKm} km)`],
            ['Azimuth / Bearing', `${lastResultData.bearingDeg} deg (${lastResultData.compass}) | ${lastResultData.natoMils} NATO Mils`],
            ['Elevation Differential', `${lastResultData.elevDiff} meters`],
            ['Aiming Reference', lastResultData.aimingRef],
          ];
        }

        // Draw Table
        doc.autoTable({
          startY: y,
          head: [['Specification / Parameter', 'Calculated Requirement']],
          body: tableRows.map(([lbl, val]) => [
            String(lbl).replace(/[³²×÷₹Δ°]/g, (m) => m === '³' ? '^3' : m === '²' ? '^2' : m === '×' ? 'x' : m === 'Δ' ? 'd' : m === '°' ? ' deg' : '/'),
            String(val).replace(/[³²×÷₹Δ°]/g, (m) => m === '³' ? ' m3' : m === '²' ? ' m2' : m === '×' ? ' x ' : m === 'Δ' ? 'd' : m === '°' ? ' deg' : '/')
          ]),
          theme: 'striped',
          headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: 'bold', fontSize: 9 },
          columnStyles: {
            0: { cellWidth: 200, fontStyle: 'bold' },
            1: { cellWidth: 'auto' },
          },
          margin: { left: margin, right: margin, top: 40, bottom: 40 },
          styles: { fontSize: 8.5, cellPadding: 4.5, overflow: 'linebreak' },
          pageBreak: 'auto',
        });

        // Add Cost table in PDF if cost is enabled
        if (lastResultData.costSummary) {
          const finalY = (doc.lastAutoTable && doc.lastAutoTable.finalY) ? doc.lastAutoTable.finalY : y + 180;
          doc.autoTable({
            startY: finalY + 15,
            head: [['Cost Line Item', 'Quantity', 'Unit Rate', 'Total Cost']],
            body: lastResultData.costSummary.items.map((it) => [
              it.name,
              `${it.quantity} ${it.unit}`,
              `${lastResultData.costSummary.currencySymbol}${it.unitRate}`,
              `${lastResultData.costSummary.currencySymbol}${it.totalCost.toLocaleString()}`
            ]),
            theme: 'grid',
            headStyles: { fillColor: [5, 150, 105], textColor: 255, fontStyle: 'bold', fontSize: 9 },
            margin: { left: margin, right: margin, top: 40, bottom: 40 },
            styles: { fontSize: 8.5, cellPadding: 4 },
          });
        }

        // Footer Branding on every page
        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
          doc.setPage(i);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(...slateColor);
          doc.text('Generated using AIFreecalculator.com', margin, pageHeight - 20);
          doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 20, { align: 'right' });
        }

        const fileDate = dateStr;
        const fileName = `plaster-calculation-${fileDate}.pdf`;
        doc.save(fileName);
      } catch (err) {
        console.error('PDF export error:', err);
      } finally {
        if (txtBtn) txtBtn.textContent = 'Download PDF';
      }
    });
  }

