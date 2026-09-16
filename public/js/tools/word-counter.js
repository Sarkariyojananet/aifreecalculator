// =====================================================================
// AI Free Calculator - Word Counter Controller
// 100% Client-Side, Zero Server Storage, Full Privacy
// =====================================================================

(function() {
  'use strict';

  // DOM Elements
  const textInput = document.getElementById('wcTextInput');
  const wordsDisplay = document.getElementById('wcWords');
  const charsDisplay = document.getElementById('wcChars');
  const charsNoSpacesDisplay = document.getElementById('wcCharsNoSpaces');
  const sentencesDisplay = document.getElementById('wcSentences');
  const paragraphsDisplay = document.getElementById('wcParagraphs');
  const readingTimeDisplay = document.getElementById('wcReadingTime');
  const speakingTimeDisplay = document.getElementById('wcSpeakingTime');
  const topWordsList = document.getElementById('wcTopWordsList');
  const topWordsContainer = document.getElementById('wcTopWordsContainer');

  const copyBtn = document.getElementById('wcCopyBtn');
  const clearBtn = document.getElementById('wcClearBtn');
  const copyToast = document.getElementById('wcCopyToast');

  // Case Transform Buttons
  const upperCaseBtn = document.getElementById('wcUpperCaseBtn');
  const lowerCaseBtn = document.getElementById('wcLowerCaseBtn');
  const titleCaseBtn = document.getElementById('wcTitleCaseBtn');
  const sentenceCaseBtn = document.getElementById('wcSentenceCaseBtn');

  // Common stop words across writing to filter out of the frequency table
  const stopWords = new Set([
    'the', 'a', 'an', 'is', 'of', 'and', 'to', 'in', 'that', 'it', 'for', 'on', 'with', 'as', 
    'this', 'was', 'at', 'by', 'be', 'from', 'or', 'are', 'your', 'you', 'i', 'we', 'they', 
    'he', 'she', 'not', 'have', 'has', 'had', 'but', 'if', 'so', 'can', 'will', 'my', 'all',
    'there', 'their', 'what', 'which', 'who', 'when', 'where', 'how', 'me', 'him', 'her', 'us',
    'them', 'its', 'our', 'more', 'about', 'into', 'than', 'then', 'up', 'out', 'no', 'just',
    'do', 'did', 'does', 'been', 'would', 'could', 'should'
  ]);

  // Core Analysis Engine
  function analyze(text) {
    if (!text || text.length === 0) {
      return {
        words: 0,
        characters: 0,
        charactersNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: '0 min',
        speakingTime: '0 min',
        topWords: []
      };
    }

    // Characters
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;

    // Paragraphs: non-empty chunks separated by newlines
    const paragraphs = text
      .split(/\r?\n+/)
      .map(p => p.trim())
      .filter(p => p.length > 0).length;

    // Unicode-aware word extraction
    let wordsCount = 0;
    let wordTokens = [];

    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      try {
        const segmenter = new Intl.Segmenter(undefined, { granularity: 'word' });
        const segments = segmenter.segment(text);
        for (const s of segments) {
          if (s.isWordLike) {
            wordsCount++;
            wordTokens.push(s.segment.toLowerCase());
          }
        }
      } catch (e) {
        wordsCount = 0;
        wordTokens = [];
      }
    }

    // Fallback if Intl.Segmenter not supported or failed
    if (wordsCount === 0 && text.trim().length > 0) {
      const matches = text.match(/[\p{L}\p{N}\p{M}]+(?:[-'’][\p{L}\p{N}\p{M}]+)*/gu);
      if (matches) {
        wordsCount = matches.length;
        wordTokens = matches.map(w => w.toLowerCase());
      }
    }

    // Sentences: match ending punctuation (. ! ?) followed by whitespace or line end
    let sentences = 0;
    if (wordsCount > 0) {
      const sentenceMatches = text.match(/[^.!?\s][^.!?]*(?:[.!?]+(?:\s+|$)|$)/g);
      sentences = sentenceMatches ? sentenceMatches.filter(s => s.trim().length > 0).length : 1;
    }

    // Reading time: Average adult reads ~225 words per minute
    let readingTime = '0 min';
    if (wordsCount > 0) {
      const rMinutes = wordsCount / 225;
      if (rMinutes < 0.5) {
        readingTime = '< 1 min';
      } else {
        readingTime = Math.round(rMinutes) + ' min';
      }
    }

    // Speaking time: Average talking rate ~130 words per minute
    let speakingTime = '0 min';
    if (wordsCount > 0) {
      const sMinutes = wordsCount / 130;
      if (sMinutes < 0.5) {
        speakingTime = '< 1 min';
      } else {
        speakingTime = Math.round(sMinutes) + ' min';
      }
    }

    // Keyword / Top Words Frequency
    const freq = {};
    for (let i = 0; i < wordTokens.length; i++) {
      const w = wordTokens[i];
      if (w.length > 1 && !stopWords.has(w) && !/^\d+$/.test(w)) {
        freq[w] = (freq[w] || 0) + 1;
      }
    }

    const sortedWords = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([word, count]) => ({
        word,
        count,
        pct: Math.round((count / (wordsCount || 1)) * 100)
      }));

    return {
      words: wordsCount,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
      topWords: sortedWords
    };
  }

  // Update UI Displays
  function updateUI() {
    const text = textInput ? textInput.value : '';
    const stats = analyze(text);

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
        topWordsList.innerHTML = stats.topWords.map(item => `
          <div class="flex items-center justify-between py-1.5 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs">
            <span class="font-medium text-slate-800 dark:text-slate-200 truncate mr-2">${escapeHtml(item.word)}</span>
            <div class="flex items-center gap-2 shrink-0">
              <span class="text-slate-400 text-[11px]">${item.pct}%</span>
              <span class="font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full text-[11px]">${item.count}</span>
            </div>
          </div>
        `).join('');
      } else {
        topWordsContainer.classList.add('hidden');
        topWordsList.innerHTML = '';
      }
    }
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function showToast(msg) {
    if (!copyToast) return;
    copyToast.textContent = msg;
    copyToast.classList.remove('opacity-0', 'translate-y-2');
    copyToast.classList.add('opacity-100', 'translate-y-0');
    setTimeout(() => {
      copyToast.classList.add('opacity-0', 'translate-y-2');
      copyToast.classList.remove('opacity-100', 'translate-y-0');
    }, 2400);
  }

  // Event Listeners
  function init() {
    if (textInput) {
      textInput.addEventListener('input', updateUI);
      textInput.addEventListener('keyup', updateUI);
      textInput.addEventListener('paste', () => setTimeout(updateUI, 10));
    }

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
      if (textInput) {
        textInput.value = '';
        textInput.focus();
      }
      updateUI();
      showToast('Cleared!');
    });

    // Case conversions
    upperCaseBtn?.addEventListener('click', () => {
      if (!textInput || !textInput.value) return;
      textInput.value = textInput.value.toUpperCase();
      updateUI();
    });

    lowerCaseBtn?.addEventListener('click', () => {
      if (!textInput || !textInput.value) return;
      textInput.value = textInput.value.toLowerCase();
      updateUI();
    });

    titleCaseBtn?.addEventListener('click', () => {
      if (!textInput || !textInput.value) return;
      textInput.value = textInput.value.toLowerCase().replace(/(^|\s|\b)\p{L}/gu, (c) => c.toUpperCase());
      updateUI();
    });

    sentenceCaseBtn?.addEventListener('click', () => {
      if (!textInput || !textInput.value) return;
      textInput.value = textInput.value.toLowerCase().replace(/(^\s*|\.\s*|\!\s*|\?\s*)\p{L}/gu, (c) => c.toUpperCase());
      updateUI();
    });

    // Initial analysis
    updateUI();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
