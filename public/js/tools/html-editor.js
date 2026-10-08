/**
 * Online HTML Editor - Interactive Browser Client Engine
 * AI Free Calculator
 */

(function () {
  const htmlInput = document.getElementById('html-code-input');
  const cssInput = document.getElementById('css-code-input');
  const jsInput = document.getElementById('js-code-input');
  const previewFrame = document.getElementById('html-preview-frame');
  const runBtn = document.getElementById('html-run-btn');
  const clearBtn = document.getElementById('html-clear-btn');
  const downloadBtn = document.getElementById('html-download-btn');
  const tabButtons = document.querySelectorAll('.code-tab-btn');
  const editorPanels = document.querySelectorAll('.code-editor-panel');
  const deviceButtons = document.querySelectorAll('.device-preview-btn');
  const previewWrapper = document.getElementById('preview-frame-wrapper');

  if (!htmlInput || !previewFrame) return;

  function updatePreview() {
    const html = htmlInput ? htmlInput.value : '';
    const css = cssInput ? cssInput.value : '';
    const js = jsInput ? jsInput.value : '';

    const source = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    ${css}
  </style>
</head>
<body>
  ${html}
  <script>
    try {
      ${js}
    } catch (err) {
      console.error(err);
    }
  </script>
</body>
</html>
    `;

    previewFrame.srcdoc = source;
  }

  // Tab switching
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabTarget = btn.getAttribute('data-tab');
      tabButtons.forEach((b) => {
        b.classList.remove('bg-blue-600', 'text-white');
        b.classList.add('bg-slate-100', 'text-slate-700', 'dark:bg-slate-800', 'dark:text-slate-300');
      });
      btn.classList.add('bg-blue-600', 'text-white');
      btn.classList.remove('bg-slate-100', 'text-slate-700', 'dark:bg-slate-800', 'dark:text-slate-300');

      editorPanels.forEach((panel) => {
        if (panel.id === `${tabTarget}-panel`) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      });
    });
  });

  // Device simulation
  deviceButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const device = btn.getAttribute('data-device');
      deviceButtons.forEach((b) => b.classList.remove('bg-slate-300', 'dark:bg-slate-700'));
      btn.classList.add('bg-slate-300', 'dark:bg-slate-700');

      if (!previewWrapper) return;
      if (device === 'mobile') {
        previewWrapper.style.maxWidth = '375px';
      } else if (device === 'tablet') {
        previewWrapper.style.maxWidth = '768px';
      } else {
        previewWrapper.style.maxWidth = '100%';
      }
    });
  });

  // Run button
  if (runBtn) {
    runBtn.addEventListener('click', updatePreview);
  }

  // Clear button
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (htmlInput) htmlInput.value = '';
      if (cssInput) cssInput.value = '';
      if (jsInput) jsInput.value = '';
      updatePreview();
    });
  }

  // Download combined HTML file
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const html = htmlInput ? htmlInput.value : '';
      const css = cssInput ? cssInput.value : '';
      const js = jsInput ? jsInput.value : '';
      const combined = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Page</title>
  <style>
${css}
  </style>
</head>
<body>
${html}

  <script>
${js}
  </script>
</body>
</html>`;

      const blob = new Blob([combined], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'index.html';
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  // Initial render
  setTimeout(updatePreview, 100);
})();
