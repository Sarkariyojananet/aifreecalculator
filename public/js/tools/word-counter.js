// =====================================================================
// AI Free Calculator - Word Counter Controller
// 100% Client-Side, Zero Server Storage, Full Privacy
// =====================================================================

(function () {
  'use strict';

  // Common stop words filtered from the top words frequency table
  const stopWords = new Set([
    'the', 'a', 'an', 'is', 'of', 'and', 'to', 'in', 'that', 'it', 'for', 'on', 'with', 'as',
    'this', 'was', 'at', 'by', 'be', 'from', 'or', 'are', 'your', 'you', 'i', 'we', 'they',
    'he', 'she', 'not', 'have', 'has', 'had', 'but', 'if', 'so', 'can', 'will', 'my', 'all',
    'there', 'their', 'what', 'which', 'who', 'when', 'where', 'how', 'me', 'him', 'her', 'us',
    'them', 'its', 'our', 'more', 'about', 'into', 'than', 'then', 'up', 'out', 'no', 'just',
    'do', 'did', 'does', 'been', 'would', 'could', 'should'
  ]);

  const SAMPLE_TEXT =
    "The quick brown fox jumps over the lazy dog. Writing clearly requires state-of-the-art attention to word choice. It's John's 3.14 calculation! This free online word counter helps writers, students, researchers, and editors track words, characters, sentences, paragraphs, and estimated reading time with complete privacy. नमस्ते दुनिया।";

  // Explicit, deterministic tokenization policy:
  // 1. Numbers with decimal fractions: \p{N}+(?:\.\p{N}+)+ (e.g. 3.14)
  // 2. Words with internal hyphens or apostrophes: [\p{L}\p{N}\p{M}]+(?:[-'’][\p{L}\p{N}\p{M}]+)* (e.g. state-of-the-art, It's, John's)
  const WORD_TOKEN_REGEX = /\p{N}+(?:\.\p{N}+)+|[\p{L}\p{N}\p{M}]+(?:[-'’][\p{L}\p{N}\p{M}]+)*/gu;

  // Unicode-aware grapheme counting (user-perceived characters)
  function countGraphemes(text) {
    if (!text) return 0;
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      try {
        const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
        let count = 0;
        for (const _ of segmenter.segment(text)) {
          count++;
        }
        return count;
      } catch (e) {
        // Fallback to surrogate-aware array length
      }
    }
    return Array.from(text).length;
  }

  // Deterministic sentence-counting algorithm:
  // - Supports terminators: . ! ? । ॥
  // - Prevents decimal points in numbers (e.g. 3.14) from triggering sentence ends
  // - Groups consecutive terminators (e.g. ... or ?!) into a single sentence boundary
  // - Requires preceding word content before counting a sentence
  // - Unpunctuated text (e.g. "Hello world") returns 0 sentences
  function countSentences(text) {
    if (!text || !text.trim()) return 0;
    let count = 0;
    let hasSentenceContent = false;
    const len = text.length;

    for (let i = 0; i < len; i++) {
      const ch = text[i];
      let isTerminator = false;

      if (ch === '!' || ch === '?' || ch === '\u0964' || ch === '\u0965') {
        isTerminator = true;
      } else if (ch === '.') {
        // Decimal check: preceded by digit AND followed by digit is a decimal point, NOT a terminator
        const isPrevDigit = i > 0 && /\d/.test(text[i - 1]);
        const isNextDigit = i + 1 < len && /\d/.test(text[i + 1]);
        if (!(isPrevDigit && isNextDigit)) {
          isTerminator = true;
        }
      }

      if (isTerminator) {
        if (hasSentenceContent) {
          count++;
          hasSentenceContent = false;
        }
        // Advance past consecutive terminators (e.g. "...", "?!", "!!")
        while (i + 1 < len) {
          const next = text[i + 1];
          if (next === '.' || next === '!' || next === '?' || next === '\u0964' || next === '\u0965') {
            if (next === '.') {
              const prevD = /\d/.test(text[i]);
              const nextD = i + 2 < len && /\d/.test(text[i + 2]);
              if (prevD && nextD) break;
            }
            i++;
          } else {
            break;
          }
        }
      } else if (/[\p{L}\p{N}\p{M}]/u.test(ch)) {
        hasSentenceContent = true;
      }
    }

    return count;
  }

  // Core Analysis Engine
  function analyze(text) {
    if (!text || text.trim().length === 0) {
      return {
        words: 0,
        characters: text ? countGraphemes(text) : 0,
        charactersNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: '0 min',
        speakingTime: '0 min',
        topWords: []
      };
    }

    // User-perceived characters (Graphemes)
    const characters = countGraphemes(text);
    const charactersNoSpaces = countGraphemes(text.replace(/\s/gu, ''));

    // Paragraphs: non-empty chunks separated by newlines
    const paragraphs = text
      .split(/\r?\n+/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0).length;

    // Words & Tokens using single defined tokenizer policy
    const wordTokens = text.match(WORD_TOKEN_REGEX) || [];
    const words = wordTokens.length;

    // Sentences using deterministic scanner
    const sentences = countSentences(text);

    // Reading time: Average adult silent reading ~225 WPM
    let readingTime = '0 min';
    if (words > 0) {
      const rMinutes = words / 225;
      readingTime = rMinutes < 0.5 ? '< 1 min' : Math.round(rMinutes) + ' min';
    }

    // Speaking time: Average presentation speaking ~130 WPM
    let speakingTime = '0 min';
    if (words > 0) {
      const sMinutes = words / 130;
      speakingTime = sMinutes < 0.5 ? '< 1 min' : Math.round(sMinutes) + ' min';
    }

    // Keyword / Top Words Frequency: Uses the exact same tokenizer
    const freq = {};
    for (let i = 0; i < words; i++) {
      const w = wordTokens[i].toLowerCase();
      if (w.length > 1 && !stopWords.has(w) && !/^\d+(?:\.\d+)?$/.test(w)) {
        freq[w] = (freq[w] || 0) + 1;
      }
    }

    const topWords = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([word, count]) => ({
        word,
        count,
        pct: Math.round((count / (words || 1)) * 100)
      }));

    return {
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
      topWords
    };
  }

  // Unicode-safe Title Case conversion
  function toTitleCase(text) {
    if (!text) return '';
    return text.toLowerCase().replace(/(^|[^\p{L}\p{N}\p{M}'’])(\p{L})/gu, (m, prefix, char) => {
      return prefix + char.toUpperCase();
    });
  }

  // Unicode-safe Sentence Case conversion
  function toSentenceCase(text) {
    if (!text) return '';
    const lower = text.toLowerCase();
    return lower
      .replace(/(^|\s*[\.!\?।॥]["'’\)]*\s+)\s*(\p{L})/gu, (m, prefix, char) => {
        return prefix + char.toUpperCase();
      })
      .replace(/^\s*\p{L}/u, (m) => m.toUpperCase());
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function showToast(msg) {
    const copyToast = document.getElementById('wcCopyToast');
    if (!copyToast) return;
    copyToast.textContent = msg;
    copyToast.classList.remove('opacity-0', 'translate-y-2');
    copyToast.classList.add('opacity-100', 'translate-y-0');
    setTimeout(() => {
      copyToast.classList.add('opacity-0', 'translate-y-2');
      copyToast.classList.remove('opacity-100', 'translate-y-0');
    }, 2400);
  }

  function initWordCounter() {
    const textInput = document.getElementById('wcTextInput');
    if (!textInput) return;
    if (textInput.dataset.wcBound) return;
    textInput.dataset.wcBound = 'true';

    const wordsDisplay = document.getElementById('wcWords');
    const charsDisplay = document.getElementById('wcChars');
    const charsNoSpacesDisplay = document.getElementById('wcCharsNoSpaces');
    const sentencesDisplay = document.getElementById('wcSentences');
    const paragraphsDisplay = document.getElementById('wcParagraphs');
    const readingTimeDisplay = document.getElementById('wcReadingTime');
    const speakingTimeDisplay = document.getElementById('wcSpeakingTime');
    const topWordsList = document.getElementById('wcTopWordsList');
    const topWordsContainer = document.getElementById('wcTopWordsContainer');
    const statusText = document.getElementById('wcStatusText');

    const countBtn = document.getElementById('wcCountBtn');
    const sampleBtn = document.getElementById('wcSampleBtn');
    const copyBtn = document.getElementById('wcCopyBtn');
    const clearBtn = document.getElementById('wcClearBtn');

    // Case Transform Buttons
    const upperCaseBtn = document.getElementById('wcUpperCaseBtn');
    const lowerCaseBtn = document.getElementById('wcLowerCaseBtn');
    const titleCaseBtn = document.getElementById('wcTitleCaseBtn');
    const sentenceCaseBtn = document.getElementById('wcSentenceCaseBtn');

    let debounceTimer = null;
    let lastAnalyzedText = null;

    function renderUI(stats, explicitCount) {
      if (wordsDisplay) wordsDisplay.textContent = stats.words.toLocaleString();
      if (charsDisplay) charsDisplay.textContent = stats.characters.toLocaleString();
      if (charsNoSpacesDisplay) charsNoSpacesDisplay.textContent = stats.charactersNoSpaces.toLocaleString();
      if (sentencesDisplay) sentencesDisplay.textContent = stats.sentences.toLocaleString();
      if (paragraphsDisplay) paragraphsDisplay.textContent = stats.paragraphs.toLocaleString();
      if (readingTimeDisplay) readingTimeDisplay.textContent = stats.readingTime;
      if (speakingTimeDisplay) speakingTimeDisplay.textContent = stats.speakingTime;

      // Top words table
      if (topWordsList && topWordsContainer) {
        if (stats.topWords.length > 0) {
          topWordsContainer.classList.remove('hidden');
          topWordsList.innerHTML = stats.topWords
            .map(
              (item) => `
            <div class="flex items-center justify-between py-1.5 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs">
              <span class="font-medium text-slate-800 dark:text-slate-200 truncate mr-2">${escapeHtml(item.word)}</span>
              <div class="flex items-center gap-2 shrink-0">
                <span class="text-slate-400 text-[11px]">${item.pct}%</span>
                <span class="font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full text-[11px]">${item.count}</span>
              </div>
            </div>
          `
            )
            .join('');
        } else {
          topWordsContainer.classList.add('hidden');
          topWordsList.innerHTML = '';
        }
      }

      if (statusText) {
        if (stats.words > 0) {
          statusText.textContent = `Counted: ${stats.words.toLocaleString()} words • ${stats.characters.toLocaleString()} chars`;
        } else {
          statusText.textContent = 'Ready • Type or Paste Text';
        }
      }

      if (explicitCount && stats.words > 0) {
        showToast(`Counted ${stats.words.toLocaleString()} words!`);

        // Visual feedback highlight on the words display card
        const wordsCard = wordsDisplay ? wordsDisplay.closest('div.p-4, div.rounded-2xl') : null;
        if (wordsCard) {
          wordsCard.classList.add('ring-4', 'ring-blue-500/40');
          setTimeout(() => {
            wordsCard.classList.remove('ring-4', 'ring-blue-500/40');
          }, 500);
        }

        // Fire analytics calculation outcome
        if (typeof window !== 'undefined' && typeof window.__trackCalculatorEvent === 'function') {
          window.__trackCalculatorEvent('calculate_click');
          window.__trackCalculatorEvent('calculation_success');
        }
      }
    }

    function updateUI(explicitCount) {
      const text = textInput ? textInput.value : '';

      // Skip duplicate full-text calculations if text has not changed
      if (!explicitCount && text === lastAnalyzedText) {
        return;
      }

      lastAnalyzedText = text;
      const stats = analyze(text);
      renderUI(stats, explicitCount);
    }

    // Debounced update for input typing to prevent duplicate full-text recalculation
    function scheduleUpdate() {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      debounceTimer = setTimeout(() => {
        updateUI(false);
      }, 50);
    }

    // Requirement 4: Single input listener for typing, pasting, cutting, deleting
    if (textInput) {
      textInput.addEventListener('input', scheduleUpdate);
    }

    // Explicit "Count Words" button (immediate, no debounce)
    countBtn?.addEventListener('click', () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      if (!textInput || textInput.value.trim().length === 0) {
        if (textInput) {
          textInput.focus();
          textInput.classList.add('ring-2', 'ring-blue-500/50');
          setTimeout(() => textInput.classList.remove('ring-2', 'ring-blue-500/50'), 600);
        }
        showToast('Please type or paste some text first!');
        return;
      }
      updateUI(true);
    });

    // Load Sample Text button
    sampleBtn?.addEventListener('click', () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      if (textInput) {
        textInput.value = SAMPLE_TEXT;
        textInput.focus();
      }
      updateUI(true);
      showToast('Sample text loaded and counted!');
    });

    // Copy Text
    copyBtn?.addEventListener('click', async () => {
      if (!textInput || !textInput.value) {
        showToast('Nothing to copy!');
        return;
      }
      try {
        await navigator.clipboard.writeText(textInput.value);
        showToast('Text copied to clipboard!');
      } catch (err) {
        textInput.select();
        document.execCommand('copy');
        showToast('Text copied to clipboard!');
      }
    });

    // Clear Text
    clearBtn?.addEventListener('click', () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      if (textInput) {
        textInput.value = '';
        textInput.focus();
      }
      updateUI(false);
      showToast('Cleared!');
    });

    // Case conversions: Unicode-safe
    upperCaseBtn?.addEventListener('click', () => {
      if (!textInput || !textInput.value) return;
      textInput.value = textInput.value.toUpperCase();
      updateUI(false);
    });

    lowerCaseBtn?.addEventListener('click', () => {
      if (!textInput || !textInput.value) return;
      textInput.value = textInput.value.toLowerCase();
      updateUI(false);
    });

    titleCaseBtn?.addEventListener('click', () => {
      if (!textInput || !textInput.value) return;
      textInput.value = toTitleCase(textInput.value);
      updateUI(false);
    });

    sentenceCaseBtn?.addEventListener('click', () => {
      if (!textInput || !textInput.value) return;
      textInput.value = toSentenceCase(textInput.value);
      updateUI(false);
    });

    // Initial analysis on page load
    updateUI(false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWordCounter);
  } else {
    initWordCounter();
  }
  document.addEventListener('astro:page-load', initWordCounter);
})();
