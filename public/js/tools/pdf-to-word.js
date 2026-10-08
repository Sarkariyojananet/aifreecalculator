/**
 * PDF to Word (DOCX) Tool — 100% Client-Side
 * Extracts text and layout structure from PDF documents and generates Microsoft Word (.docx) files in the browser.
 */
(function () {
  'use strict';

  var uploadedFile = null;
  var fileArrayBuffer = null;
  var isProcessing = false;

  // DOM Elements
  var dropZone = document.getElementById('pw-drop-zone');
  var fileInput = document.getElementById('pw-file-input');
  var selectBtn = document.getElementById('pw-select-btn');
  var optionsSection = document.getElementById('pw-options-section');
  var filenameEl = document.getElementById('pw-filename');
  var fileSizeEl = document.getElementById('pw-file-size');
  var clearBtn = document.getElementById('pw-clear-btn');
  var convertBtn = document.getElementById('pw-convert-btn');

  var statusSection = document.getElementById('pw-status-section');
  var statusIcon = document.getElementById('pw-status-icon');
  var statusTitle = document.getElementById('pw-status-title');
  var statusBody = document.getElementById('pw-status-body');
  var progressBar = document.getElementById('pw-progress-bar');
  var progressFill = document.getElementById('pw-progress-fill');

  var downloadSection = document.getElementById('pw-download-section');
  var downloadBtn = document.getElementById('pw-download-btn');
  var downloadFilename = document.getElementById('pw-download-filename');
  var downloadSize = document.getElementById('pw-download-size');
  var startOverBtn = document.getElementById('pw-start-over-btn');

  var errorBox = document.getElementById('pw-error-box');
  var errorText = document.getElementById('pw-error-text');

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(2) + ' MB';
  }

  function showError(msg) {
    if (!errorBox || !errorText) return;
    errorText.textContent = msg;
    errorBox.classList.remove('hidden');
    errorBox.classList.add('flex');
    errorBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function clearError() {
    if (!errorBox) return;
    errorBox.classList.add('hidden');
    errorBox.classList.remove('flex');
    errorText.textContent = '';
  }

  function setStatus(icon, title, body) {
    if (!statusSection) return;
    statusSection.classList.remove('hidden');
    if (statusIcon) statusIcon.textContent = icon;
    if (statusTitle) statusTitle.textContent = title;
    if (statusBody) statusBody.innerHTML = body;
  }

  function hideStatus() {
    if (statusSection) statusSection.classList.add('hidden');
    hideProgress();
  }

  function showProgress() {
    if (progressBar) progressBar.classList.remove('hidden');
    updateProgress(0);
  }

  function updateProgress(percent) {
    if (progressFill) {
      var clamped = Math.max(0, Math.min(100, Math.round(percent)));
      progressFill.style.width = clamped + '%';
    }
  }

  function hideProgress() {
    if (progressBar) progressBar.classList.add('hidden');
    if (progressFill) progressFill.style.width = '0%';
  }

  function hideDownload() {
    if (downloadSection) downloadSection.classList.add('hidden');
  }

  function resetAll() {
    uploadedFile = null;
    fileArrayBuffer = null;
    isProcessing = false;
    if (fileInput) fileInput.value = '';
    clearError();
    hideStatus();
    hideDownload();
    if (optionsSection) optionsSection.classList.add('hidden');
    if (dropZone) dropZone.classList.remove('hidden');
  }

  function escapeXml(unsafe) {
    return unsafe.replace(/[<>&'"]/g, function (c) {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
      }
    });
  }

  // Generate valid DOCX container using JSZip or lightweight ZIP package
  async function generateDocxBlob(pageParagraphs) {
    if (typeof window.JSZip === 'undefined') {
      // Load JSZip dynamically if not already available
      await new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
        script.onload = resolve;
        script.onerror = function () {
          reject(new Error('Failed to load document formatting engine.'));
        };
        document.head.appendChild(script);
      });
    }

    var zip = new window.JSZip();

    // 1. [Content_Types].xml
    var contentTypes = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
      '<Default Extension="xml" ContentType="application/xml"/>' +
      '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>' +
      '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>' +
      '</Types>';
    zip.file('[Content_Types].xml', contentTypes);

    // 2. _rels/.rels
    var rootRels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' +
      '</Relationships>';
    zip.file('_rels/.rels', rootRels);

    // 3. word/_rels/document.xml.rels
    var docRels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>' +
      '</Relationships>';
    zip.file('word/_rels/document.xml.rels', docRels);

    // 4. word/styles.xml
    var stylesXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">' +
      '<w:docDefaults>' +
      '<w:rPrDefault>' +
      '<w:rPr>' +
      '<w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/>' +
      '<w:sz w:val="22"/>' +
      '<w:szCs w:val="22"/>' +
      '<w:lang w:val="en-US"/>' +
      '</w:rPr>' +
      '</w:rPrDefault>' +
      '</w:docDefaults>' +
      '</w:styles>';
    zip.file('word/styles.xml', stylesXml);

    // 5. word/document.xml
    var docXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">' +
      '<w:body>';

    for (var p = 0; p < pageParagraphs.length; p++) {
      var lines = pageParagraphs[p];
      for (var l = 0; l < lines.length; l++) {
        var cleanText = escapeXml(lines[l]);
        docXml += '<w:p><w:r><w:t xml:space="preserve">' + cleanText + '</w:t></w:r></w:p>';
      }
      if (p < pageParagraphs.length - 1) {
        // Page break between PDF pages
        docXml += '<w:p><w:r><w:br w:type="page"/></w:r></w:p>';
      }
    }

    docXml += '<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/></w:sectPr>';
    docXml += '</w:body></w:document>';
    zip.file('word/document.xml', docXml);

    return await zip.generateAsync({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      compression: 'DEFLATE'
    });
  }

  async function extractTextFromPdf(pdfBytes) {
    if (typeof window.pdfjsLib === 'undefined') {
      // Load PDF.js dynamically
      await new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        script.onload = function () {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
          resolve();
        };
        script.onerror = function () {
          reject(new Error('Failed to load PDF extraction engine.'));
        };
        document.head.appendChild(script);
      });
    }

    var loadingTask = window.pdfjsLib.getDocument({ data: pdfBytes });
    var pdf = await loadingTask.promise;
    var pageCount = pdf.numPages;
    var allPages = [];

    for (var i = 1; i <= pageCount; i++) {
      updateProgress(20 + Math.round((i / pageCount) * 50));
      var page = await pdf.getPage(i);
      var textContent = await page.getTextContent();

      var lines = [];
      var currentLine = '';
      var lastY = null;

      for (var j = 0; j < textContent.items.length; j++) {
        var item = textContent.items[j];
        var itemY = item.transform ? item.transform[5] : null;

        if (lastY !== null && itemY !== null && Math.abs(itemY - lastY) > 5) {
          if (currentLine.trim().length > 0) {
            lines.push(currentLine.trim());
          }
          currentLine = item.str;
        } else {
          currentLine += (currentLine ? ' ' : '') + item.str;
        }
        lastY = itemY;
      }

      if (currentLine.trim().length > 0) {
        lines.push(currentLine.trim());
      }

      allPages.push(lines.length > 0 ? lines : ['[No extractable text on page ' + i + ']']);
    }

    return allPages;
  }

  function handleFile(file) {
    clearError();
    hideDownload();
    hideStatus();

    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      showError('Please select a valid PDF document (.pdf)');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      showError('File is too large (maximum 50 MB). Please choose a smaller PDF.');
      return;
    }

    uploadedFile = file;
    if (filenameEl) filenameEl.textContent = file.name;
    if (fileSizeEl) fileSizeEl.textContent = formatBytes(file.size);

    var reader = new FileReader();
    reader.onload = function (e) {
      fileArrayBuffer = e.target.result;
      if (dropZone) dropZone.classList.add('hidden');
      if (optionsSection) optionsSection.classList.remove('hidden');
    };
    reader.onerror = function () {
      showError('Could not read the selected PDF file. Please try again.');
    };
    reader.readAsArrayBuffer(file);
  }

  if (dropZone) {
    dropZone.addEventListener('dragover', function (e) {
      e.preventDefault();
      dropZone.classList.add('border-red-500', 'bg-red-50/50', 'dark:bg-red-950/30');
    });
    dropZone.addEventListener('dragleave', function (e) {
      e.preventDefault();
      dropZone.classList.remove('border-red-500', 'bg-red-50/50', 'dark:bg-red-950/30');
    });
    dropZone.addEventListener('drop', function (e) {
      e.preventDefault();
      dropZone.classList.remove('border-red-500', 'bg-red-50/50', 'dark:bg-red-950/30');
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFile(e.dataTransfer.files[0]);
      }
    });
    dropZone.addEventListener('click', function (e) {
      if (e.target !== selectBtn && fileInput) {
        fileInput.click();
      }
    });
  }

  if (selectBtn && fileInput) {
    selectBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      fileInput.click();
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', function () {
      if (fileInput.files && fileInput.files.length > 0) {
        handleFile(fileInput.files[0]);
      }
    });
  }

  if (clearBtn) clearBtn.addEventListener('click', resetAll);
  if (startOverBtn) startOverBtn.addEventListener('click', resetAll);

  if (convertBtn) {
    convertBtn.addEventListener('click', async function () {
      if (isProcessing) return;
      clearError();

      if (!fileArrayBuffer || !uploadedFile) {
        showError('Please upload a PDF file first.');
        return;
      }

      try {
        isProcessing = true;
        convertBtn.disabled = true;
        setStatus('📄', 'Converting PDF to Word...', 'Parsing document structure and text content.');
        showProgress();
        updateProgress(15);

        var extractedPages = await extractTextFromPdf(fileArrayBuffer);
        setStatus('📝', 'Building Word Document (.docx)...', 'Generating OpenXML formatting container.');
        updateProgress(75);

        var docxBlob = await generateDocxBlob(extractedPages);
        updateProgress(100);

        hideStatus();
        if (optionsSection) optionsSection.classList.add('hidden');
        if (downloadSection) downloadSection.classList.remove('hidden');

        var outName = uploadedFile.name.replace(/\.pdf$/i, '') + '.docx';
        if (downloadFilename) downloadFilename.textContent = outName;
        if (downloadSize) downloadSize.textContent = formatBytes(docxBlob.size);

        if (downloadBtn) {
          var oldUrl = downloadBtn.getAttribute('data-url');
          if (oldUrl) URL.revokeObjectURL(oldUrl);

          var url = URL.createObjectURL(docxBlob);
          downloadBtn.setAttribute('data-url', url);
          downloadBtn.onclick = function () {
            var a = document.createElement('a');
            a.href = url;
            a.download = outName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          };
        }
      } catch (err) {
        console.error(err);
        hideStatus();
        showError(err.message || 'An error occurred while converting PDF to Word.');
      } finally {
        isProcessing = false;
        if (convertBtn) convertBtn.disabled = false;
      }
    });
  }
})();
