// =====================================================================
// AI Free Calculator - JSON Validator Controller
// 100% Client-Side Native Parsing, Zero Server Storage, Full Privacy
// =====================================================================

(function() {
  'use strict';

  // --- STATE ---
  const state = {
    isValid: null, // null | true | false
    parsedData: null,
    rawText: '',
    errorInfo: null,
    formattedText: ''
  };

  // --- DOM ELEMENTS ---
  const inputArea = document.getElementById('jvInput');
  const outputArea = document.getElementById('jvOutput');
  const validateBtn = document.getElementById('jvValidateBtn');
  const formatBtn = document.getElementById('jvFormatBtn');
  const minifyBtn = document.getElementById('jvMinifyBtn');
  const indentSelect = document.getElementById('jvIndentSelect');
  const clearBtn = document.getElementById('jvClearBtn');
  const loadExampleBtn = document.getElementById('jvLoadExampleBtn');
  const copyBtn = document.getElementById('jvCopyBtn');
  const downloadBtn = document.getElementById('jvDownloadBtn');

  // Status & Error Elements
  const statusCard = document.getElementById('jvStatusCard');
  const statusBadge = document.getElementById('jvStatusBadge');
  const statusTitle = document.getElementById('jvStatusTitle');
  const statusDesc = document.getElementById('jvStatusDesc');

  const errorPanel = document.getElementById('jvErrorPanel');
  const errorMessage = document.getElementById('jvErrorMessage');
  const errorLineBadge = document.getElementById('jvErrorLineBadge');
  const errorColBadge = document.getElementById('jvErrorColBadge');
  const errorSnippet = document.getElementById('jvErrorSnippet');
  const errorSnippetLine = document.getElementById('jvErrorSnippetLine');

  // Statistics
  const statType = document.getElementById('jvStatType');
  const statChars = document.getElementById('jvStatChars');
  const statLines = document.getElementById('jvStatLines');
  const statSize = document.getElementById('jvStatSize');

  const inputCharCount = document.getElementById('jvInputCharCount');
  const copyToast = document.getElementById('jvCopyToast');

  // Sample Valid JSON for "Load Example"
  const sampleJson = `{
  "tool": "JSON Validator",
  "version": "2.0.0",
  "status": "online",
  "clientSide": true,
  "features": [
    "Native syntax validation",
    "Line & column error detection",
    "Formatting with custom indentation",
    "Payload minification",
    "Direct file download"
  ],
  "author": {
    "organization": "AI Free Calculator",
    "website": "https://aifreecalculator.com",
    "isFree": true
  },
  "metrics": {
    "serverUploads": 0,
    "privacyGuaranteed": true,
    "rating": 5
  }
}`;

  // --- HELPERS ---

  function getIndent() {
    const val = indentSelect ? indentSelect.value : '2';
    if (val === '4') return 4;
    if (val === 'tab') return '\t';
    return 2;
  }

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }

  function getRootType(data) {
    if (data === null) return 'Null';
    if (Array.isArray(data)) return 'Array (' + data.length + ' items)';
    if (typeof data === 'object') return 'Object (' + Object.keys(data).length + ' keys)';
    if (typeof data === 'string') return 'String';
    if (typeof data === 'number') return 'Number';
    if (typeof data === 'boolean') return 'Boolean';
    return typeof data;
  }

  // Parses native SyntaxError message to extract line & column without inventing fake coordinates
  function parseErrorLocation(rawText, errorMsg) {
    let line = null;
    let col = null;

    // 1. Check for "line X column Y" or "at line X column Y"
    const lineColMatch = errorMsg.match(/line\s+(\d+)\s+column\s+(\d+)/i);
    if (lineColMatch) {
      line = parseInt(lineColMatch[1], 10);
      col = parseInt(lineColMatch[2], 10);
    } else {
      // 2. Check for "position P" (e.g. V8 / Chrome / Node "at position 42")
      const posMatch = errorMsg.match(/position\s+(\d+)/i);
      if (posMatch) {
        const pos = parseInt(posMatch[1], 10);
        if (!isNaN(pos) && pos >= 0 && pos <= rawText.length) {
          const sub = rawText.slice(0, pos);
          const lines = sub.split('\n');
          line = lines.length;
          col = lines[lines.length - 1].length + 1;
        }
      }
    }

    let snippet = '';
    if (line !== null) {
      const allLines = rawText.split('\n');
      if (allLines[line - 1] !== undefined) {
        snippet = allLines[line - 1];
      }
    }

    return { line, col, snippet };
  }

  function showToast(msg) {
    if (!copyToast) return;
    copyToast.textContent = msg || 'Copied!';
    copyToast.classList.remove('opacity-0', 'translate-y-2');
    copyToast.classList.add('opacity-100', 'translate-y-0');
    setTimeout(() => {
      copyToast.classList.remove('opacity-100', 'translate-y-0');
      copyToast.classList.add('opacity-0', 'translate-y-2');
    }, 2000);
  }

  // --- CORE VALIDATION LOGIC ---

  function validate(isManualClick) {
    if (!inputArea) return;
    const text = inputArea.value;
    state.rawText = text;

    // Update character count on input
    if (inputCharCount) {
      inputCharCount.textContent = text.length.toLocaleString() + ' chars';
    }

    if (!text.trim()) {
      resetState();
      return;
    }

    try {
      const parsed = JSON.parse(text);
      state.isValid = true;
      state.parsedData = parsed;
      state.errorInfo = null;

      // Automatically generate formatted preview using selected indentation
      state.formattedText = JSON.stringify(parsed, null, getIndent());
      if (outputArea) {
        outputArea.value = state.formattedText;
      }

      renderSuccess(parsed, text);
    } catch (err) {
      state.isValid = false;
      state.parsedData = null;
      const errorMsg = err.message || 'SyntaxError: Invalid JSON token';
      const loc = parseErrorLocation(text, errorMsg);
      state.errorInfo = { message: errorMsg, ...loc };

      if (outputArea) {
        outputArea.value = '/* INVALID JSON: ' + errorMsg + ' */';
      }

      renderError(state.errorInfo, text);
    }
  }

  function renderSuccess(parsed, text) {
    // Status Card
    if (statusCard) {
      statusCard.className = 'p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800';
    }
    if (statusBadge) {
      statusBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 shrink-0';
      statusBadge.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Valid JSON ✓';
    }
    if (statusTitle) {
      statusTitle.textContent = 'JSON Syntax is Valid';
      statusTitle.className = 'text-sm font-bold text-emerald-900 dark:text-emerald-200';
    }
    if (statusDesc) {
      statusDesc.textContent = 'Data successfully parsed according to the standard JSON specification (RFC 8259).';
      statusDesc.className = 'text-xs text-emerald-700 dark:text-emerald-400 mt-0.5';
    }

    // Hide error panel
    if (errorPanel) {
      errorPanel.classList.add('hidden');
    }

    // Statistics
    if (statType) statType.textContent = getRootType(parsed);
    if (statChars) statChars.textContent = text.length.toLocaleString();
    if (statLines) statLines.textContent = text.split('\n').length.toLocaleString();
    if (statSize) statSize.textContent = formatBytes(new Blob([text]).size);

    // Enable buttons
    if (formatBtn) formatBtn.disabled = false;
    if (minifyBtn) minifyBtn.disabled = false;
    if (copyBtn) copyBtn.disabled = false;
    if (downloadBtn) downloadBtn.disabled = false;
  }

  function renderError(errInfo, text) {
    // Status Card
    if (statusCard) {
      statusCard.className = 'p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 bg-rose-50/80 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800';
    }
    if (statusBadge) {
      statusBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300 border border-rose-300 dark:border-rose-700 shrink-0';
      statusBadge.innerHTML = '<span class="w-2 h-2 rounded-full bg-rose-500"></span> Invalid JSON ✕';
    }
    if (statusTitle) {
      statusTitle.textContent = 'Syntax Error Detected';
      statusTitle.className = 'text-sm font-bold text-rose-900 dark:text-rose-200';
    }
    if (statusDesc) {
      statusDesc.textContent = errInfo.line !== null
        ? 'Parsing failed at line ' + errInfo.line + (errInfo.col !== null ? ', column ' + errInfo.col : '') + '.'
        : 'Parsing failed. Review the parser error message below.';
      statusDesc.className = 'text-xs text-rose-700 dark:text-rose-400 mt-0.5';
    }

    // Error Panel Details
    if (errorPanel) {
      errorPanel.classList.remove('hidden');
    }
    if (errorMessage) {
      errorMessage.textContent = errInfo.message;
    }

    // Line & Column indicators
    if (errorLineBadge) {
      if (errInfo.line !== null) {
        errorLineBadge.textContent = 'Line ' + errInfo.line;
        errorLineBadge.classList.remove('hidden');
      } else {
        errorLineBadge.classList.add('hidden');
      }
    }
    if (errorColBadge) {
      if (errInfo.col !== null) {
        errorColBadge.textContent = 'Col ' + errInfo.col;
        errorColBadge.classList.remove('hidden');
      } else {
        errorColBadge.classList.add('hidden');
      }
    }

    // Snippet preview
    if (errorSnippet && errorSnippetLine) {
      if (errInfo.snippet) {
        errorSnippetLine.textContent = errInfo.snippet;
        errorSnippet.classList.remove('hidden');
      } else {
        errorSnippet.classList.add('hidden');
      }
    }

    // Statistics reset/adjusted
    if (statType) statType.textContent = 'Invalid';
    if (statChars) statChars.textContent = text.length.toLocaleString();
    if (statLines) statLines.textContent = text.split('\n').length.toLocaleString();
    if (statSize) statSize.textContent = formatBytes(new Blob([text]).size);

    // Disable format & minify when invalid
    if (formatBtn) formatBtn.disabled = true;
    if (minifyBtn) minifyBtn.disabled = true;
    if (copyBtn) copyBtn.disabled = true;
    if (downloadBtn) downloadBtn.disabled = true;
  }

  function resetState() {
    state.isValid = null;
    state.parsedData = null;
    state.rawText = '';
    state.errorInfo = null;
    state.formattedText = '';

    if (inputArea) inputArea.value = '';
    if (outputArea) outputArea.value = '';

    if (statusCard) {
      statusCard.className = 'p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800';
    }
    if (statusBadge) {
      statusBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700 shrink-0';
      statusBadge.innerHTML = '<span class="w-2 h-2 rounded-full bg-slate-400"></span> Waiting for Input';
    }
    if (statusTitle) {
      statusTitle.textContent = 'Ready to Validate';
      statusTitle.className = 'text-sm font-bold text-slate-800 dark:text-slate-200';
    }
    if (statusDesc) {
      statusDesc.textContent = 'Paste or type JSON into the input area and click "Validate JSON".';
      statusDesc.className = 'text-xs text-slate-500 dark:text-slate-400 mt-0.5';
    }

    if (errorPanel) errorPanel.classList.add('hidden');

    if (statType) statType.textContent = '—';
    if (statChars) statChars.textContent = '0';
    if (statLines) statLines.textContent = '0';
    if (statSize) statSize.textContent = '0 B';

    if (inputCharCount) inputCharCount.textContent = '0 chars';

    if (formatBtn) formatBtn.disabled = false;
    if (minifyBtn) minifyBtn.disabled = false;
    if (copyBtn) copyBtn.disabled = true;
    if (downloadBtn) downloadBtn.disabled = true;
  }

  // --- ACTION HANDLERS ---

  function handleFormat() {
    if (!inputArea) return;
    const text = inputArea.value;
    if (!text.trim()) {
      showToast('Please paste JSON first');
      return;
    }

    try {
      const parsed = JSON.parse(text);
      const indent = getIndent();
      const formatted = JSON.stringify(parsed, null, indent);
      state.formattedText = formatted;
      if (outputArea) outputArea.value = formatted;
      validate(true);
      showToast('Formatted successfully!');
    } catch (err) {
      validate(true);
    }
  }

  function handleMinify() {
    if (!inputArea) return;
    const text = inputArea.value;
    if (!text.trim()) {
      showToast('Please paste JSON first');
      return;
    }

    try {
      const parsed = JSON.parse(text);
      const minified = JSON.stringify(parsed);
      state.formattedText = minified;
      if (outputArea) outputArea.value = minified;
      validate(true);
      showToast('Minified successfully!');
    } catch (err) {
      validate(true);
    }
  }

  function handleCopy() {
    const textToCopy = (outputArea && outputArea.value) ? outputArea.value : state.formattedText;
    if (!textToCopy || !textToCopy.trim() || state.isValid === false) {
      showToast('No valid JSON to copy');
      return;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => showToast('Copied to clipboard!'))
        .catch(() => fallbackCopy(textToCopy));
    } else {
      fallbackCopy(textToCopy);
    }
  }

  function fallbackCopy(text) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      if (ok) showToast('Copied to clipboard!');
      else showToast('Copy failed. Please copy manually.');
    } catch (e) {
      showToast('Copy not supported on this browser.');
    }
  }

  function handleDownload() {
    const textToSave = (outputArea && outputArea.value) ? outputArea.value : state.formattedText;
    if (!textToSave || !textToSave.trim() || state.isValid === false) {
      showToast('No valid JSON to download');
      return;
    }

    try {
      const blob = new Blob([textToSave], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'validated.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      showToast('Downloaded validated.json');
    } catch (err) {
      showToast('Download failed. Please copy manually.');
    }
  }

  function handleLoadExample() {
    if (!inputArea) return;
    inputArea.value = sampleJson;
    validate(true);
    showToast('Sample JSON loaded');
  }

  // --- ATTACH EVENT LISTENERS ---

  if (validateBtn) {
    validateBtn.addEventListener('click', () => validate(true));
  }

  if (formatBtn) {
    formatBtn.addEventListener('click', handleFormat);
  }

  if (minifyBtn) {
    minifyBtn.addEventListener('click', handleMinify);
  }

  if (indentSelect) {
    indentSelect.addEventListener('change', () => {
      if (state.isValid && state.parsedData) {
        state.formattedText = JSON.stringify(state.parsedData, null, getIndent());
        if (outputArea) outputArea.value = state.formattedText;
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      resetState();
      showToast('Cleared input & output');
    });
  }

  if (loadExampleBtn) {
    loadExampleBtn.addEventListener('click', handleLoadExample);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', handleCopy);
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', handleDownload);
  }

  // Optional Live Validation with Debounce
  let debounceTimer = null;
  if (inputArea) {
    inputArea.addEventListener('input', () => {
      const text = inputArea.value;
      if (inputCharCount) {
        inputCharCount.textContent = text.length.toLocaleString() + ' chars';
      }

      if (!text.trim()) {
        resetState();
        return;
      }

      // If document is large (> 150 KB), skip live continuous parse to keep CPU light
      if (text.length > 150000) {
        if (statusBadge) {
          statusBadge.innerHTML = '<span class="w-2 h-2 rounded-full bg-amber-400"></span> Large Input';
        }
        if (statusTitle) {
          statusTitle.textContent = 'Large document detected';
        }
        if (statusDesc) {
          statusDesc.textContent = 'Click "Validate JSON" to inspect large payloads without browser lag.';
        }
        return;
      }

      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        validate(false);
      }, 250);
    });
  }

  // Initial state setup
  resetState();
})();
