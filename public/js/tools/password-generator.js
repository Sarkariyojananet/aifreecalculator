/**
 * Password Generator — Client-Side Only
 * Uses crypto.getRandomValues() exclusively. Math.random() is NOT used.
 * Passwords are never sent to any server, stored in cookies, localStorage, or URL params.
 */

(function () {
  'use strict';

  // ─── Character Sets ──────────────────────────────────────────────────────────
  var CHARS_UPPER   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var CHARS_LOWER   = 'abcdefghijklmnopqrstuvwxyz';
  var CHARS_DIGITS  = '0123456789';
  var CHARS_SYMBOLS = '!@#$%^&*-_=+[]{}|;:,.<>?';

  // ─── Defaults ────────────────────────────────────────────────────────────────
  var DEFAULT_LENGTH   = 16;
  var DEFAULT_UPPER    = true;
  var DEFAULT_LOWER    = true;
  var DEFAULT_DIGITS   = true;
  var DEFAULT_SYMBOLS  = true;
  var DEFAULT_REQUIRE  = true;

  // ─── State ───────────────────────────────────────────────────────────────────
  var currentPassword = '';
  var isPasswordVisible = false;

  // ─── Crypto Utilities ────────────────────────────────────────────────────────

  /**
   * Returns a cryptographically secure random integer in [0, max) using
   * rejection sampling to avoid modulo bias.
   */
  function secureRandInt(max) {
    if (max <= 0) throw new RangeError('max must be > 0');
    var limit = Math.floor(0x100000000 / max) * max;
    var buf = new Uint32Array(1);
    do {
      crypto.getRandomValues(buf);
    } while (buf[0] >= limit);
    return buf[0] % max;
  }

  /**
   * Cryptographically shuffles an array in place (Fisher-Yates using secureRandInt).
   */
  function secureShuffleArray(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = secureRandInt(i + 1);
      var tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
  }

  // ─── Password Generation ─────────────────────────────────────────────────────

  function generatePassword(length, useUpper, useLower, useDigits, useSymbols, requireEach) {
    var pools = [];
    if (useUpper)   pools.push(CHARS_UPPER);
    if (useLower)   pools.push(CHARS_LOWER);
    if (useDigits)  pools.push(CHARS_DIGITS);
    if (useSymbols) pools.push(CHARS_SYMBOLS);

    if (pools.length === 0) {
      return { error: 'Please select at least one character type.' };
    }

    if (requireEach && pools.length > length) {
      return { error: 'Password length must be at least ' + pools.length + ' to include one character from each selected type.' };
    }

    var combined = pools.join('');
    var chars = [];

    if (requireEach) {
      // Guarantee at least one char from each pool
      for (var p = 0; p < pools.length; p++) {
        chars.push(pools[p][secureRandInt(pools[p].length)]);
      }
    }

    // Fill remaining positions from combined pool
    var remaining = length - chars.length;
    for (var r = 0; r < remaining; r++) {
      chars.push(combined[secureRandInt(combined.length)]);
    }

    secureShuffleArray(chars);
    return { password: chars.join('') };
  }

  // ─── Strength Calculation ─────────────────────────────────────────────────────

  function calcStrength(password, useUpper, useLower, useDigits, useSymbols) {
    if (!password) return { level: 0, label: '', color: '', entropy: 0 };

    var poolSize = 0;
    if (useUpper)   poolSize += 26;
    if (useLower)   poolSize += 26;
    if (useDigits)  poolSize += 10;
    if (useSymbols) poolSize += CHARS_SYMBOLS.length;

    var entropy = poolSize > 0 ? (password.length * Math.log2(poolSize)) : 0;

    var level, label, colorClass, bgClass, textClass;

    if (entropy < 40) {
      level = 1; label = 'Weak';
      colorClass = 'bg-red-500'; bgClass = 'bg-red-100 dark:bg-red-950/40';
      textClass = 'text-red-600 dark:text-red-400';
    } else if (entropy < 60) {
      level = 2; label = 'Medium';
      colorClass = 'bg-amber-400'; bgClass = 'bg-amber-50 dark:bg-amber-950/40';
      textClass = 'text-amber-600 dark:text-amber-400';
    } else if (entropy < 80) {
      level = 3; label = 'Strong';
      colorClass = 'bg-emerald-500'; bgClass = 'bg-emerald-50 dark:bg-emerald-950/40';
      textClass = 'text-emerald-600 dark:text-emerald-400';
    } else {
      level = 4; label = 'Very Strong';
      colorClass = 'bg-blue-500'; bgClass = 'bg-blue-50 dark:bg-blue-950/40';
      textClass = 'text-blue-600 dark:text-blue-400';
    }

    return { level: level, label: label, colorClass: colorClass, bgClass: bgClass, textClass: textClass, entropy: Math.round(entropy) };
  }

  // ─── DOM Helpers ─────────────────────────────────────────────────────────────

  function $(id) { return document.getElementById(id); }

  function getOptions() {
    return {
      length:      parseInt($('pg-length-input').value, 10) || DEFAULT_LENGTH,
      useUpper:    $('pg-upper').checked,
      useLower:    $('pg-lower').checked,
      useDigits:   $('pg-digits').checked,
      useSymbols:  $('pg-symbols').checked,
      requireEach: $('pg-require-each').checked
    };
  }

  function showError(msg) {
    var el = $('pg-error');
    el.textContent = msg;
    el.classList.remove('hidden');
    $('pg-password-display').value = '';
    $('pg-strength-container').classList.add('hidden');
    currentPassword = '';
  }

  function clearError() {
    var el = $('pg-error');
    el.textContent = '';
    el.classList.add('hidden');
  }

  function updatePasswordDisplay(password) {
    var display = $('pg-password-display');
    currentPassword = password;
    display.value = isPasswordVisible ? password : password;
    display.type  = isPasswordVisible ? 'text' : 'password';
    $('pg-char-count').textContent = password.length + ' characters';
  }

  function updateStrengthUI(strength) {
    var container = $('pg-strength-container');
    if (!currentPassword) { container.classList.add('hidden'); return; }
    container.classList.remove('hidden');

    // Bar segments
    var bars = container.querySelectorAll('[data-strength-bar]');
    bars.forEach(function (bar, idx) {
      bar.className = 'h-2 flex-1 rounded-full transition-all duration-300 ';
      if (idx < strength.level) {
        bar.className += strength.colorClass;
      } else {
        bar.className += 'bg-slate-200 dark:bg-slate-700';
      }
    });

    // Label
    var labelEl = $('pg-strength-label');
    labelEl.textContent = strength.label + ' — estimated ' + strength.entropy + ' bits of entropy';
    labelEl.className = 'text-xs font-semibold ' + strength.textClass;

    // ARIA
    container.setAttribute('aria-label', 'Password strength: ' + strength.label);
  }

  function doGenerate() {
    clearError();
    var opts = getOptions();

    if (opts.length < 4 || opts.length > 128) {
      showError('Password length must be between 4 and 128 characters.');
      return;
    }

    var result = generatePassword(
      opts.length, opts.useUpper, opts.useLower, opts.useDigits, opts.useSymbols, opts.requireEach
    );

    if (result.error) {
      showError(result.error);
      return;
    }

    updatePasswordDisplay(result.password);
    var strength = calcStrength(result.password, opts.useUpper, opts.useLower, opts.useDigits, opts.useSymbols);
    updateStrengthUI(strength);
  }

  // ─── Bulk Generation ─────────────────────────────────────────────────────────

  function doBulkGenerate() {
    clearError();
    var opts = getOptions();
    var count = parseInt($('pg-bulk-count').value, 10) || 5;
    if (count < 1) count = 1;
    if (count > 10) count = 10;

    if (opts.length < 4 || opts.length > 128) {
      showError('Password length must be between 4 and 128 characters.');
      return;
    }

    var list = $('pg-bulk-list');
    list.innerHTML = '';

    for (var i = 0; i < count; i++) {
      var result = generatePassword(
        opts.length, opts.useUpper, opts.useLower, opts.useDigits, opts.useSymbols, opts.requireEach
      );
      if (result.error) { showError(result.error); return; }

      var pw = result.password;
      var li = document.createElement('li');
      li.className = 'flex items-center justify-between gap-3 py-2 border-b border-slate-100 dark:border-slate-800 last:border-0';

      var code = document.createElement('code');
      code.className = 'flex-1 font-mono text-sm text-slate-900 dark:text-white break-all select-all';
      code.textContent = pw;

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:hover:bg-blue-600 text-slate-600 dark:text-slate-300 transition cursor-pointer';
      btn.textContent = 'Copy';
      btn.setAttribute('aria-label', 'Copy password ' + (i + 1));
      (function (pwCopy, btnEl) {
        btnEl.addEventListener('click', function () {
          copyToClipboard(pwCopy, btnEl, 'Copy');
        });
      })(pw, btn);

      li.appendChild(code);
      li.appendChild(btn);
      list.appendChild(li);
    }

    $('pg-bulk-results').classList.remove('hidden');
  }

  // ─── Clipboard ───────────────────────────────────────────────────────────────

  function copyToClipboard(text, btnEl, originalLabel) {
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showCopyFeedback(btnEl, originalLabel);
      }).catch(function () {
        fallbackCopy(text, btnEl, originalLabel);
      });
    } else {
      fallbackCopy(text, btnEl, originalLabel);
    }
  }

  function fallbackCopy(text, btnEl, originalLabel) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showCopyFeedback(btnEl, originalLabel);
    } catch (e) {
      btnEl.textContent = 'Copy failed';
      setTimeout(function () { btnEl.textContent = originalLabel; }, 2000);
    }
  }

  function showCopyFeedback(btnEl, originalLabel) {
    btnEl.textContent = 'Copied!';
    btnEl.classList.add('!bg-emerald-600', '!text-white');
    setTimeout(function () {
      btnEl.textContent = originalLabel;
      btnEl.classList.remove('!bg-emerald-600', '!text-white');
    }, 2000);
  }

  // ─── Length Slider Sync ───────────────────────────────────────────────────────

  function syncLengthControls(source) {
    var slider = $('pg-length-slider');
    var input  = $('pg-length-input');
    var val = parseInt(source === 'slider' ? slider.value : input.value, 10);
    if (isNaN(val)) return;
    val = Math.min(128, Math.max(4, val));
    slider.value = val;
    input.value  = val;
  }

  // ─── Quick Length Buttons ─────────────────────────────────────────────────────

  function setLength(len) {
    $('pg-length-slider').value = len;
    $('pg-length-input').value  = len;
    updateActiveLengthBtn(len);
    doGenerate();
  }

  function updateActiveLengthBtn(len) {
    document.querySelectorAll('[data-quick-length]').forEach(function (btn) {
      var isActive = parseInt(btn.getAttribute('data-quick-length'), 10) === len;
      btn.className = btn.className
        .replace(/\bbg-blue-600\b|\btext-white\b|\bbg-slate-100\b|\btext-slate-600\b|\bdark:bg-slate-800\b|\bdark:text-slate-300\b/g, '')
        .trim();
      if (isActive) {
        btn.classList.add('bg-blue-600', 'text-white');
      } else {
        btn.classList.add('bg-slate-100', 'text-slate-600', 'dark:bg-slate-800', 'dark:text-slate-300');
      }
    });
  }

  // ─── Reset ───────────────────────────────────────────────────────────────────

  function doReset() {
    $('pg-length-slider').value  = DEFAULT_LENGTH;
    $('pg-length-input').value   = DEFAULT_LENGTH;
    $('pg-upper').checked        = DEFAULT_UPPER;
    $('pg-lower').checked        = DEFAULT_LOWER;
    $('pg-digits').checked       = DEFAULT_DIGITS;
    $('pg-symbols').checked      = DEFAULT_SYMBOLS;
    $('pg-require-each').checked = DEFAULT_REQUIRE;

    isPasswordVisible = false;
    var toggle = $('pg-show-toggle');
    toggle.textContent = 'Show';
    toggle.setAttribute('aria-pressed', 'false');

    var display = $('pg-password-display');
    display.type = 'password';

    updateActiveLengthBtn(DEFAULT_LENGTH);
    clearError();
    $('pg-bulk-results').classList.add('hidden');
    $('pg-strength-container').classList.add('hidden');
    currentPassword = '';
    display.value = '';
    $('pg-char-count').textContent = '';
  }

  // ─── Show/Hide ────────────────────────────────────────────────────────────────

  function toggleVisibility() {
    isPasswordVisible = !isPasswordVisible;
    var display = $('pg-password-display');
    var toggle  = $('pg-show-toggle');
    display.type = isPasswordVisible ? 'text' : 'password';
    toggle.textContent = isPasswordVisible ? 'Hide' : 'Show';
    toggle.setAttribute('aria-pressed', isPasswordVisible ? 'true' : 'false');
  }

  // ─── Init ─────────────────────────────────────────────────────────────────────

  function init() {
    // Generate button
    $('pg-generate-btn').addEventListener('click', doGenerate);

    // Copy button
    $('pg-copy-btn').addEventListener('click', function () {
      if (!currentPassword) { doGenerate(); return; }
      copyToClipboard(currentPassword, this, 'Copy Password');
    });

    // Show/hide toggle
    $('pg-show-toggle').addEventListener('click', toggleVisibility);

    // Reset
    $('pg-reset-btn').addEventListener('click', doReset);

    // Bulk generate
    $('pg-bulk-generate-btn').addEventListener('click', doBulkGenerate);

    // Length slider
    $('pg-length-slider').addEventListener('input', function () {
      syncLengthControls('slider');
      updateActiveLengthBtn(parseInt(this.value, 10));
    });
    $('pg-length-slider').addEventListener('change', doGenerate);

    // Length number input
    $('pg-length-input').addEventListener('input', function () {
      syncLengthControls('input');
    });
    $('pg-length-input').addEventListener('change', function () {
      syncLengthControls('input');
      updateActiveLengthBtn(parseInt(this.value, 10));
      doGenerate();
    });

    // Quick length buttons
    document.querySelectorAll('[data-quick-length]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLength(parseInt(this.getAttribute('data-quick-length'), 10));
      });
    });

    // Checkboxes → regenerate
    ['pg-upper', 'pg-lower', 'pg-digits', 'pg-symbols', 'pg-require-each'].forEach(function (id) {
      $(id).addEventListener('change', doGenerate);
    });

    // FAQ accordion — handled natively by <details>/<summary>

    // Initial state
    updateActiveLengthBtn(DEFAULT_LENGTH);
    doGenerate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
