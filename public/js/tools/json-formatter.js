// =====================================================================
// AI Free Calculator - JSON Formatter & XML to JSON Controller
// 100% Client-Side, Zero Server Storage, Full Privacy
// =====================================================================

(function() {
  'use strict';

  // --- STATE ---
  const state = {
    mode: 'json', // 'json' | 'xml'
    indent: 2, // 2, 4, or '\t'
    lastParsedData: null,
    isInputValid: null
  };

  // --- DOM REFERENCES ---
  const jsonTabBtn = document.getElementById('jfJsonTabBtn');
  const xmlTabBtn = document.getElementById('jfXmlTabBtn');

  const inputArea = document.getElementById('jfInput');
  const outputArea = document.getElementById('jfOutput');

  const formatBtn = document.getElementById('jfFormatBtn');
  const minifyBtn = document.getElementById('jfMinifyBtn');
  const validateBtn = document.getElementById('jfValidateBtn');
  const clearBtn = document.getElementById('jfClearBtn');
  const loadExampleBtn = document.getElementById('jfLoadExampleBtn');
  const copyBtn = document.getElementById('jfCopyBtn');
  const downloadBtn = document.getElementById('jfDownloadBtn');
  const indentSelect = document.getElementById('jfIndentSelect');

  const statusBadge = document.getElementById('jfStatusBadge');
  const statusMessage = document.getElementById('jfStatusMessage');
  const copyToast = document.getElementById('jfCopyToast');

  // Statistics
  const statType = document.getElementById('jfStatType');
  const statChars = document.getElementById('jfStatChars');
  const statLines = document.getElementById('jfStatLines');
  const statSize = document.getElementById('jfStatSize');

  // Input label
  const inputPanelTitle = document.getElementById('jfInputPanelTitle');
  const inputFormatHint = document.getElementById('jfInputFormatHint');

  // Sample payloads
  const sampleJson = `{
  "tool": "JSON Formatter",
  "version": 2.0,
  "developer": {
    "name": "AI Free Calculator",
    "website": "https://aifreecalculator.com",
    "verified": true
  },
  "features": [
    "Format & Beautify",
    "Minify JSON",
    "Syntax Validation",
    "XML to JSON Conversion"
  ],
  "settings": {
    "indentation": 2,
    "clientSideOnly": true
  }
}`;

  const sampleXml = `<?xml version="1.0" encoding="UTF-8"?>
<note id="101" priority="high">
  <to>Developer</to>
  <from>AI Free Calculator</from>
  <heading>Quick Reminder</heading>
  <body>Convert XML to clean JSON in one click!</body>
  <tags>
    <tag>tools</tag>
    <tag>formatter</tag>
    <tag>converter</tag>
  </tags>
</note>`;

  // --- JSON PROCESSING LOGIC ---

  function getIndentValue() {
    const val = indentSelect ? indentSelect.value : '2';
    if (val === '4') return 4;
    if (val === 'tab') return '\t';
    return 2;
  }

  function findJsonErrorLocation(rawText, errorMsg) {
    let line = 1;
    let col = 1;

    // Check if error message contains line/column (e.g. "at position 42" or "line 3 column 5")
    const posMatch = errorMsg.match(/position\s+(\d+)/i);
    if (posMatch) {
      const pos = parseInt(posMatch[1], 10);
      const sub = rawText.slice(0, pos);
      const lines = sub.split('\n');
      line = lines.length;
      col = lines[lines.length - 1].length + 1;
      return { line, col, snippet: lines[lines.length - 1].trim() };
    }

    const lineColMatch = errorMsg.match(/line\s+(\d+)\s+column\s+(\d+)/i);
    if (lineColMatch) {
      line = parseInt(lineColMatch[1], 10);
      col = parseInt(lineColMatch[2], 10);
      const allLines = rawText.split('\n');
      const snippet = allLines[line - 1] ? allLines[line - 1].trim() : '';
      return { line, col, snippet };
    }

    return { line: null, col: null, snippet: '' };
  }

  function setStatus(isValid, text, isWarning = false) {
    if (!statusBadge || !statusMessage) return;

    if (isValid === true) {
      statusBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800';
      statusBadge.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-500"></span> Valid JSON ✓';
      statusMessage.textContent = text || 'Ready to copy or download';
      statusMessage.className = 'text-xs text-emerald-700 dark:text-emerald-400 font-medium truncate';
    } else if (isValid === false) {
      statusBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-300 dark:border-rose-800';
      statusBadge.innerHTML = '<span class="w-2 h-2 rounded-full bg-rose-500"></span> Invalid ' + (state.mode === 'xml' ? 'XML' : 'JSON') + ' ✕';
      statusMessage.textContent = text || 'Please check syntax and quotes';
      statusMessage.className = 'text-xs text-rose-700 dark:text-rose-400 font-medium truncate';
    } else {
      statusBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700';
      statusBadge.innerHTML = '<span class="w-2 h-2 rounded-full bg-slate-400"></span> Waiting for input';
      statusMessage.textContent = text || 'Paste or type data above';
      statusMessage.className = 'text-xs text-slate-500 dark:text-slate-400 font-medium truncate';
    }
  }

  function updateStatistics(data, outputText) {
    if (!statType || !statChars || !statLines || !statSize) return;

    if (!outputText || !outputText.trim()) {
      statType.textContent = '—';
      statChars.textContent = '0';
      statLines.textContent = '0';
      statSize.textContent = '0 B';
      return;
    }

    // Type
    let typeName = 'Object';
    if (Array.isArray(data)) {
      typeName = 'Array (' + data.length + ')';
    } else if (data === null) {
      typeName = 'null';
    } else if (typeof data === 'object') {
      typeName = 'Object (' + Object.keys(data).length + ')';
    } else {
      typeName = typeof data;
    }
    statType.textContent = typeName;

    // Characters & Lines
    const chars = outputText.length;
    const lines = outputText.split('\n').length;
    statChars.textContent = chars.toLocaleString();
    statLines.textContent = lines.toLocaleString();

    // Approximate Byte size
    const bytes = new Blob([outputText]).size;
    if (bytes < 1024) {
      statSize.textContent = bytes + ' B';
    } else if (bytes < 1024 * 1024) {
      statSize.textContent = (bytes / 1024).toFixed(1) + ' KB';
    } else {
      statSize.textContent = (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }
  }

  function formatJson() {
    const raw = (inputArea ? inputArea.value : '').trim();
    if (!raw) {
      setStatus(null, 'Please paste JSON before formatting');
      return;
    }

    if (state.mode === 'xml') {
      convertXmlToJson();
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      state.lastParsedData = parsed;
      const formatted = JSON.stringify(parsed, null, getIndentValue());
      if (outputArea) outputArea.value = formatted;
      setStatus(true, 'Formatted successfully');
      updateStatistics(parsed, formatted);
    } catch (err) {
      state.lastParsedData = null;
      const loc = findJsonErrorLocation(raw, err.message);
      let msg = err.message;
      if (loc.line !== null) {
        msg = `Line ${loc.line}, Col ${loc.col}: ${loc.snippet ? '"' + loc.snippet + '"' : ''} (${err.message})`;
      }
      setStatus(false, msg);
      updateStatistics(null, '');
    }
  }

  function minifyJson() {
    const raw = (inputArea ? inputArea.value : '').trim();
    if (!raw) {
      setStatus(null, 'Please paste JSON before minifying');
      return;
    }

    try {
      const parsed = (state.mode === 'xml') ? parseXmlToJsonObj(raw) : JSON.parse(raw);
      state.lastParsedData = parsed;
      const minified = JSON.stringify(parsed);
      if (outputArea) outputArea.value = minified;
      setStatus(true, 'Minified successfully (0 whitespace)');
      updateStatistics(parsed, minified);
    } catch (err) {
      state.lastParsedData = null;
      setStatus(false, err.message);
    }
  }

  function validateJson() {
    const raw = (inputArea ? inputArea.value : '').trim();
    if (!raw) {
      setStatus(null, 'Input is empty');
      return;
    }

    if (state.mode === 'xml') {
      validateXml();
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      state.lastParsedData = parsed;
      setStatus(true, 'Valid JSON: Syntax is clean and error-free');
      updateStatistics(parsed, raw);
    } catch (err) {
      state.lastParsedData = null;
      const loc = findJsonErrorLocation(raw, err.message);
      let msg = err.message;
      if (loc.line !== null) {
        msg = `Syntax Error at Line ${loc.line}, Col ${loc.col}`;
      }
      setStatus(false, msg);
    }
  }

  // --- XML TO JSON LOGIC ---

  function xmlNodeToJson(node) {
    // Text node
    if (node.nodeType === Node.TEXT_NODE) {
      return node.nodeValue.trim();
    }

    // Element node
    if (node.nodeType === Node.ELEMENT_NODE) {
      const obj = {};

      // Attributes
      if (node.attributes && node.attributes.length > 0) {
        for (let i = 0; i < node.attributes.length; i++) {
          const attr = node.attributes[i];
          obj['@' + attr.name] = attr.value;
        }
      }

      // Child elements
      let hasElementChildren = false;
      let textContent = '';

      for (let child = node.firstChild; child; child = child.nextSibling) {
        if (child.nodeType === Node.ELEMENT_NODE) {
          hasElementChildren = true;
          const nodeName = child.nodeName;
          const childObj = xmlNodeToJson(child);

          if (obj[nodeName] === undefined) {
            obj[nodeName] = childObj;
          } else {
            if (!Array.isArray(obj[nodeName])) {
              obj[nodeName] = [obj[nodeName]];
            }
            obj[nodeName].push(childObj);
          }
        } else if (child.nodeType === Node.TEXT_NODE) {
          const t = child.nodeValue.trim();
          if (t.length > 0) {
            textContent += t;
          }
        }
      }

      if (!hasElementChildren) {
        // If element only has attributes and text
        if (Object.keys(obj).length > 0) {
          if (textContent) obj['#text'] = textContent;
          return obj;
        }
        return textContent;
      } else if (textContent) {
        obj['#text'] = textContent;
      }

      return obj;
    }

    return null;
  }

  function parseXmlToJsonObj(xmlString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

    // Check for parser errors
    const parserError = xmlDoc.querySelector('parsererror');
    if (parserError) {
      throw new Error(parserError.textContent.replace(/Below is a rendering of the page up to the first error\..*/, '').trim() || 'Invalid XML syntax');
    }

    const root = xmlDoc.documentElement;
    if (!root) throw new Error('Empty or invalid XML document');

    const result = {};
    result[root.nodeName] = xmlNodeToJson(root);
    return result;
  }

  function convertXmlToJson() {
    const raw = (inputArea ? inputArea.value : '').trim();
    if (!raw) {
      setStatus(null, 'Please paste XML before converting');
      return;
    }

    try {
      const jsonObj = parseXmlToJsonObj(raw);
      state.lastParsedData = jsonObj;
      const formatted = JSON.stringify(jsonObj, null, getIndentValue());
      if (outputArea) outputArea.value = formatted;
      setStatus(true, 'XML converted to JSON successfully');
      updateStatistics(jsonObj, formatted);
    } catch (err) {
      state.lastParsedData = null;
      setStatus(false, 'XML Error: ' + err.message);
      updateStatistics(null, '');
    }
  }

  function validateXml() {
    const raw = (inputArea ? inputArea.value : '').trim();
    if (!raw) {
      setStatus(null, 'Input is empty');
      return;
    }

    try {
      parseXmlToJsonObj(raw);
      setStatus(true, 'Valid XML: Document tree is well-formed');
    } catch (err) {
      setStatus(false, 'Invalid XML: ' + err.message);
    }
  }

  // --- ACTIONS: COPY, DOWNLOAD, CLEAR, LOAD EXAMPLE ---

  function showToast(msg) {
    if (!copyToast) return;
    copyToast.textContent = msg;
    copyToast.classList.remove('opacity-0', 'translate-y-2');
    copyToast.classList.add('opacity-100', 'translate-y-0');
    setTimeout(() => {
      copyToast.classList.add('opacity-0', 'translate-y-2');
      copyToast.classList.remove('opacity-100', 'translate-y-0');
    }, 2200);
  }

  async function copyOutput() {
    const text = outputArea ? outputArea.value : '';
    if (!text) {
      showToast('Nothing to copy!');
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      showToast('JSON copied to clipboard!');
    } catch (e) {
      outputArea.select();
      document.execCommand('copy');
      showToast('JSON copied to clipboard!');
    }
  }

  function downloadJson() {
    const text = outputArea ? outputArea.value : '';
    if (!text) {
      alert('Please format or minify your JSON before downloading.');
      return;
    }
    const blob = new Blob([text], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 150);
  }

  function clearAll() {
    if (inputArea) inputArea.value = '';
    if (outputArea) outputArea.value = '';
    state.lastParsedData = null;
    setStatus(null, 'Cleared');
    updateStatistics(null, '');
  }

  function loadExample() {
    if (state.mode === 'xml') {
      if (inputArea) inputArea.value = sampleXml;
      convertXmlToJson();
    } else {
      if (inputArea) inputArea.value = sampleJson;
      formatJson();
    }
  }

  // --- MODE SWITCHER (JSON vs XML) ---

  function setMode(mode) {
    state.mode = mode;

    if (mode === 'xml') {
      xmlTabBtn?.classList.add('bg-white', 'dark:bg-slate-800', 'text-blue-600', 'dark:text-blue-400', 'shadow-xs');
      xmlTabBtn?.classList.remove('text-slate-600', 'dark:text-slate-400');
      jsonTabBtn?.classList.remove('bg-white', 'dark:bg-slate-800', 'text-blue-600', 'dark:text-blue-400', 'shadow-xs');
      jsonTabBtn?.classList.add('text-slate-600', 'dark:text-slate-400');

      if (inputPanelTitle) inputPanelTitle.textContent = 'Input XML';
      if (inputFormatHint) inputFormatHint.textContent = 'Paste raw or minified XML';
      if (inputArea) inputArea.placeholder = 'Paste your XML here... (e.g. <root><item>value</item></root>)';
      if (formatBtn) formatBtn.textContent = 'Convert to JSON';
    } else {
      jsonTabBtn?.classList.add('bg-white', 'dark:bg-slate-800', 'text-blue-600', 'dark:text-blue-400', 'shadow-xs');
      jsonTabBtn?.classList.remove('text-slate-600', 'dark:text-slate-400');
      xmlTabBtn?.classList.remove('bg-white', 'dark:bg-slate-800', 'text-blue-600', 'dark:text-blue-400', 'shadow-xs');
      xmlTabBtn?.classList.add('text-slate-600', 'dark:text-slate-400');

      if (inputPanelTitle) inputPanelTitle.textContent = 'Input JSON';
      if (inputFormatHint) inputFormatHint.textContent = 'Paste raw, minified, or unformatted JSON';
      if (inputArea) inputArea.placeholder = 'Paste your JSON here... (e.g. {"name": "value"})';
      if (formatBtn) formatBtn.textContent = 'Format JSON';
    }

    clearAll();
  }

  // --- INITIALIZATION ---

  function init() {
    jsonTabBtn?.addEventListener('click', () => setMode('json'));
    xmlTabBtn?.addEventListener('click', () => setMode('xml'));

    formatBtn?.addEventListener('click', formatJson);
    minifyBtn?.addEventListener('click', minifyJson);
    validateBtn?.addEventListener('click', validateJson);
    clearBtn?.addEventListener('click', clearAll);
    loadExampleBtn?.addEventListener('click', loadExample);
    copyBtn?.addEventListener('click', copyOutput);
    downloadBtn?.addEventListener('click', downloadJson);

    indentSelect?.addEventListener('change', () => {
      if (outputArea && outputArea.value && state.lastParsedData) {
        outputArea.value = JSON.stringify(state.lastParsedData, null, getIndentValue());
        updateStatistics(state.lastParsedData, outputArea.value);
      }
    });

    // Auto format example initially
    if (inputArea && !inputArea.value) {
      inputArea.value = sampleJson;
      formatJson();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
