# Quick Reference Guide - Multi-Language Website

## 🚀 Quick Commands

```bash
# Build the site
npm run build

# Validate i18n translations
npm run validate:i18n

# Run dev server
npm run dev

# Deploy to production
npm run deploy
```

---

## 📂 Key Files Reference

### Core Configuration
- `astro.config.mjs` - Astro + i18n config (9 languages)
- `src/i18n/config.ts` - Language definitions and locale config
- `src/i18n/utils.ts` - i18n utility functions

### Styling
- `src/styles/global.css` - Global styles + language-specific typography + animations

### Components
- `src/components/Header.astro` - Main header with language switcher
- `src/components/LanguageSwitcher.astro` - Dropdown/mobile language switcher
- `src/components/LanguageBanner.astro` - Language confirmation banner (NEW)
- `src/components/Footer.astro` - Footer with localized links

### Layouts
- `src/layouts/BaseLayout.astro` - Base layout with SEO, fonts, analytics

### Pages
- `src/pages/index.astro` - English homepage
- `src/pages/[lang]/index.astro` - Translated homepages (hi, es, ja, fr, de, pt, ko, it)

---

## 🌍 Supported Languages

| Code | Language | Native Name | Flag |
|------|----------|-------------|------|
| en | English | English | 🇺🇸 |
| hi | Hindi | हिन्दी | 🇮🇳 |
| es | Spanish | Español | 🇪🇸 |
| ja | Japanese | 日本語 | 🇯🇵 |
| fr | French | Français | 🇫🇷 |
| de | German | Deutsch | 🇩🇪 |
| pt | Portuguese | Português | 🇧🇷 |
| ko | Korean | 한국어 | 🇰🇷 |
| it | Italian | Italiano | 🇮🇹 |

---

## 🎨 CSS Classes Reference

### Gradient Text
```html
<h1 class="gradient-text-hero">Your Title</h1>
```
- Animated gradient (blue → purple → pink)
- 8-second animation cycle
- Dark mode optimized

### Flag Hover Animation
```html
<span class="flag-hover">🇺🇸</span>
```
- Scale 1.15 + rotate 5° on hover
- 0.3s smooth transition

### Language Transition
```html
<div class="lang-transition">Content</div>
```
- Fade-in-up animation
- 0.4s ease-out

### Language Badge Shimmer
```html
<button class="language-badge">Button</button>
```
- Subtle shimmer effect on hover
- Gradient shine animation

---

## 🔧 Adding a New Language

### Step 1: Update Config
```typescript
// src/i18n/config.ts
export const ALL_LOCALES = [
  'en', 'hi', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it',
  'ar' // NEW LANGUAGE
] as const;

export const LOCALES_CONFIG: Record<Locale, LocaleConfig> = {
  // ... existing languages
  ar: {
    code: 'ar',
    label: 'Arabic',
    name: 'Arabic',
    nativeName: 'العربية',
    bcp47: 'ar-SA',
    dir: 'rtl', // Right-to-left!
    flag: '🇸🇦',
  },
};
```

### Step 2: Update Astro Config
```javascript
// astro.config.mjs
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'hi', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it', 'ar'],
  routing: {
    prefixDefaultLocale: false,
  },
},
```

### Step 3: Add Translations
Create translation files in:
- `src/i18n/translations/common/ar.json`
- `src/i18n/translations/categories/ar.json`
- `src/i18n/translations/calculators/data/*-calculator-ar.json`

### Step 4: Add to Language Banner
```typescript
// src/components/LanguageBanner.astro
const bannerMessages: Record<Locale, ...> = {
  // ... existing
  ar: {
    viewing: 'أنت تشاهد هذا الموقع بالعربية',
    setDefault: 'استخدام العربية دائماً',
    dismiss: 'إغلاق'
  }
};
```

### Step 5: Validate
```bash
npm run validate:i18n
npm run build
```

---

## 🐛 Troubleshooting

### Issue: Build fails with i18n error
```bash
# Check translations are complete
npm run validate:i18n

# Look for missing translation keys
grep -r "Missing translation" src/
```

### Issue: Language switcher not working
```javascript
// Check browser console for errors
// Verify localStorage is enabled
localStorage.setItem('test', 'test');
```

### Issue: Gradient text not showing
```css
/* Ensure these CSS classes exist in global.css */
.gradient-text-hero {
  background: linear-gradient(...);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Issue: Language banner not appearing
```javascript
// Clear sessionStorage and test
sessionStorage.setItem('lang_just_switched', 'true');
// Reload page
```

---

## 📊 Performance Monitoring

### Key Metrics to Watch
- **LCP (Largest Contentful Paint):** Target < 2.5s
- **FID (First Input Delay):** Target < 100ms
- **CLS (Cumulative Layout Shift):** Target < 0.1
- **Build Time:** Currently ~21s for 640 pages

### Optimization Tips
```javascript
// Preload critical fonts
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

// Use font-display: swap
@font-face {
  font-family: system-ui;
  font-display: swap;
}

// Lazy load images
<img loading="lazy" src="..." alt="..." />
```

---

## 🔐 Security Best Practices

### Language Input Validation
```typescript
// Always validate locale input
import { isValidLocale } from '../i18n/config';

const lang = isValidLocale(userInput) ? userInput : DEFAULT_LOCALE;
```

### XSS Prevention
```html
<!-- Use Astro's automatic escaping -->
<p>{userProvidedText}</p>

<!-- NOT raw HTML -->
<p set:html={userProvidedText}></p> ❌
```

---

## 🧪 Testing Checklist

### Before Deploy
- [ ] Run `npm run build` - no errors
- [ ] Run `npm run validate:i18n` - 100% coverage
- [ ] Test all 9 language pages load correctly
- [ ] Verify language switcher works (desktop + mobile)
- [ ] Check language banner appears and dismisses
- [ ] Test dark mode on all language pages
- [ ] Verify gradient animations work
- [ ] Check mobile responsive design
- [ ] Test SEO meta tags for each language
- [ ] Verify hreflang tags are correct

### Manual Testing URLs
```
English:    https://aifreecalculator.com/
Hindi:      https://aifreecalculator.com/hi/
Spanish:    https://aifreecalculator.com/es/
Japanese:   https://aifreecalculator.com/ja/
French:     https://aifreecalculator.com/fr/
German:     https://aifreecalculator.com/de/
Portuguese: https://aifreecalculator.com/pt/
Korean:     https://aifreecalculator.com/ko/
Italian:    https://aifreecalculator.com/it/
```

---

## 📝 Maintenance Notes

### Regular Tasks
1. **Weekly:** Check i18n validation
2. **Monthly:** Review analytics for language usage
3. **Quarterly:** Update translations based on user feedback
4. **Yearly:** Add new languages based on traffic

### Update Workflow
```bash
# 1. Pull latest changes
git pull origin main

# 2. Make changes to translations
# Edit src/i18n/translations/**/*.json

# 3. Validate
npm run validate:i18n

# 4. Test build
npm run build

# 5. Commit and push
git add .
git commit -m "Update translations"
git push origin main
```

---

## 🎯 Success Metrics

### Current Status (2026-09-18)
- ✅ 9 languages supported
- ✅ 640 pages generated
- ✅ 100% translation coverage
- ✅ Zero build errors
- ✅ 21.6s build time
- ✅ All visual enhancements active

### Target Metrics
- Language switcher usage: 15%+ of visitors
- Multi-language page views: 30%+ of total
- Bounce rate on non-EN pages: <40%
- Average session duration: >2 minutes

---

## 📞 Support Resources

### Documentation
- Astro i18n: https://docs.astro.build/en/guides/internationalization/
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs/

### Internal Documentation
- `IMPROVEMENTS_SUMMARY.md` - Complete changelog
- `VISUAL_IMPROVEMENTS.md` - Before/after visual guide
- `MULTILINGUAL_IMPROVEMENTS.md` - Implementation plan

---

## 🚀 Quick Wins for Future

### Easy Improvements (< 1 hour each)
1. Add more languages (Arabic, Chinese, Russian)
2. Implement region-specific currency symbols
3. Add transliterated search keywords
4. Create language-specific OG images
5. Add language selector to 404 page

### Medium Improvements (2-4 hours each)
1. Regional content adaptation (India-specific calculators on Hindi pages)
2. Date/number format localization
3. Language-specific meta descriptions optimization
4. Add language analytics dashboard
5. Implement A/B testing for language UI

---

**Last Updated:** 2026-09-18
**Version:** 1.0
**Build Status:** ✅ All passing
