# Calculator Pro Design MD

> **Visual & Design System Specification**  
> **Status:** Active Single Source of Truth  
> **Replaces:** Legacy Versal / Vercel Analysis Design Specification  
> **Scope:** Pure Visual Presentation, UI & UX Styling Only  

---

## ⚠️ Critical Preservation Rule

> **"This design system controls visual presentation only."**

This design system must strictly govern appearance, styling, responsive layouts, spacing, typography, and visual polish. Under NO circumstances does this design system permit or instruct future development steps, agents, or engineers to:

1. **Remove existing tools, tabs, or calculators.**
2. **Add unnecessary tools or bloat.**
3. **Change calculator mathematical formulas, conversion factors, or numerical algorithms.**
4. **Alter calculation logic, state handlers, event listeners, or client-side calculation triggers.**
5. **Change routes, URLs, query parameters, or file paths.**
6. **Remove, truncate, or rewrite existing SEO content, heading content, FAQs, or editorial guides.**
7. **Remove or alter metadata, JSON-LD structured schema, canonical links, OpenGraph, or Twitter tags.**
8. **Remove, alter, or break Google AdSense configurations, ad slots, or placements.**
9. **Remove or disrupt Google Analytics, tracking scripts, search logging, or telemetry.**
10. **Remove or modify existing integrations (Cloudflare D1, Admin CMS, Export PDF/CSV/Print, Web Workers, etc.).**
11. **Change existing calculator workflows, input configurations, preset buttons, or result metric outputs.**

**Existing functionality, formulas, tools, and technical infrastructure must remain 100% intact.**

---

## 1. System Overview & Visual Direction

Calculator Pro is an ultra-clean, high-utility, modern design language crafted specifically for high-frequency online calculators and engineering/financial utility platforms.

### Core Philosophy & Principles
* **Clean & Modern:** Sharp lines, generous breathing room, intentional negative space, and crisp visual boundaries.
* **Premium & Professional:** Calm corporate aesthetic rooted in deep navy typography, neutral surfaces, refined soft shadows, and high-trust electric/royal blue accents.
* **Minimal & Spacious:** Absence of visual noise, unnecessary ornamentation, or distracting decorative elements. Utility-first clarity where input fields and calculation outcomes command visual priority.
* **Calculator-Focused:** Visual hierarchy directs the user's eye effortlessly: **Context (Header) → Inputs (Form) → Actions (Calculate/Reset) → Primary Output (Hero Metric) → Secondary Breakdown (Details/Charts/Tables) → Deep Reference (SEO/FAQs)**.
* **Mobile-First & Fluid:** Engineered for instantaneous, comfortable one-handed mobile touch interactions without compromising desktop density or power-user efficiency.
* **Performance-First:** Pure HTML/CSS with Astro and Tailwind CSS v4. Zero heavy JavaScript UI libraries, zero layout-shift-inducing webfonts, and zero non-critical runtime overhead.

### Visual Characteristics to Enforce
* Crisp white and soft light-grey canvas backgrounds (`#ffffff`, `#f8fafc`).
* Subtle, calming light-blue tint blocks (`#f0f7ff`, `#e0f2fe`) for highlighted callouts and summary cards.
* Dark navy / slate typography (`#0f172a`, `#1e293b`) for maximum legibility and reduced eye strain compared to harsh pure black.
* Vibrant, high-contrast primary blue accent (`#2563eb`, `#1d4ed8`) for primary CTAs and active states.
* Soft, muted pastel badges/backgrounds for category chips and calculator category indicators (amber, emerald, indigo, sky, violet).
* Ultra-thin 1px crisp borders (`#e2e8f0`, `#cbd5e1`).
* Feather-soft, multi-layer micro shadows (`box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05), 0 1px 2px rgba(15, 23, 42, 0.03)`).
* Consistent modern rounded corners (Cards: `rounded-2xl` / 16px; Inputs & Buttons: `rounded-xl` / 12px; Chips & Pills: `rounded-full` / 9999px).
* Generous, predictable spacing scale with strictly unified padding across all cards.

### Aesthetic Elements to Strictly Avoid
* ❌ Heavy, dark, or saturated multi-stop gradients across backgrounds or large panels.
* ❌ Frosted glassmorphism with high blur that harms mobile CPU/GPU performance and readability.
* ❌ Neon, fluorescent, or hyper-saturated accent colors.
* ❌ Harsh, muddy, or pitch-black drop shadows (`shadow-2xl` with high alpha).
* ❌ Bouncing, spinning, or continuous looping CSS/JS animations.
* ❌ Visual clutter, extraneous borders, and crowded icon boxes.
* ❌ Inconsistent card styles, mismatched corner radii, or unpredictable button heights.

---

## 2. Color System & Design Tokens

Every color token is designated for semantic clarity in both Light and Dark modes:

### Base Surface & Neutral Tokens
| Token | Light Mode Value | Dark Mode Value | Semantic Role |
|---|---|---|---|
| `--color-canvas` | `#f8fafc` (slate-50) | `#090d16` | Main page body background |
| `--color-surface` | `#ffffff` (white) | `#0f172a` (slate-900) | Primary card, container, and calculator surface |
| `--color-surface-subtle` | `#f1f5f9` (slate-100) | `#1e293b` (slate-800) | Secondary panels, field backdrops, preset trays |
| `--color-surface-highlight` | `#f0f7ff` (blue-50/60) | `#172554` (blue-950/40) | Result summary cards, featured metric containers |
| `--color-border-subtle` | `#f1f5f9` (slate-100) | `#1e293b` (slate-800) | Hairline interior row dividers |
| `--color-border` | `#e2e8f0` (slate-200) | `#334155` (slate-700) | Standard card, input, and container borders |
| `--color-border-focus` | `#2563eb` (blue-600) | `#60a5fa` (blue-400) | Input focus rings and active card borders |

### Typography Tokens
| Token | Light Mode Value | Dark Mode Value | Semantic Role |
|---|---|---|---|
| `--color-text-primary` | `#0f172a` (slate-900) | `#f8fafc` (slate-50) | Primary headings, prominent values, key labels |
| `--color-text-secondary` | `#334155` (slate-700) | `#cbd5e1` (slate-300) | Subheadings, input labels, table contents |
| `--color-text-muted` | `#64748b` (slate-500) | `#94a3b8` (slate-400) | Supporting descriptions, helper hints, timestamps |
| `--color-text-subtle` | `#94a3b8` (slate-400) | `#64748b` (slate-500) | Placeholders, inactive icons, breadcrumb chevrons |

### Brand & Interactive Tokens
| Token | Value (Light) | Value (Dark) | Semantic Role |
|---|---|---|---|
| `--color-primary` | `#2563eb` (blue-600) | `#3b82f6` (blue-500) | Primary action buttons, active tab indicators |
| `--color-primary-hover` | `#1d4ed8` (blue-700) | `#2563eb` (blue-600) | Button hover state, interactive link focus |
| `--color-primary-active` | `#1e40af` (blue-800) | `#1d4ed8` (blue-700) | Pressed button state |
| `--color-primary-soft` | `#eff6ff` (blue-50) | `#1e3a8a` (blue-900/50) | Selected chip backdrop, active state pill |
| `--color-primary-text` | `#ffffff` | `#ffffff` | Text / icons on primary blue surfaces |

### State & Feedback Tokens
| State | Badge BG (Light) | Badge Text (Light) | Badge BG (Dark) | Badge Text (Dark) | Semantic Role |
|---|---|---|---|---|---|
| **Success** | `#ecfdf5` (emerald-50) | `#047857` (emerald-700) | `#064e3b` (emerald-950) | `#34d399` (emerald-400) | Positive delta, savings, safe limits, healthy BMI |
| **Warning** | `#fffbeb` (amber-50) | `#b45309` (amber-700) | `#78350f` (amber-950) | `#fbbf24` (amber-400) | Moderate debt ratio, overweight, attention callout |
| **Error / Alert** | `#fef2f2` (red-50) | `#b91c1c` (red-700) | `#7f1d1d` (red-950) | `#f87171` (red-400) | Validation errors, high interest drain, critical alerts |
| **Info** | `#f0f9ff` (sky-50) | `#0369a1` (sky-700) | `#082f49` (sky-950) | `#38bdf8` (sky-400) | Formula notes, assumption footnotes, tax slabs |

### Category Pastel Accent System
For category badges, icon backgrounds, and subtle card markers:
* **Finance:** Pastel Indigo (`bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 border-indigo-200`)
* **Construction:** Pastel Amber (`bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200`)
* **Health:** Pastel Emerald (`bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200`)
* **Math:** Pastel Cyan/Sky (`bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300 border-sky-200`)
* **General:** Pastel Violet (`bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300 border-violet-200`)

---

## 3. Typography & Text Hierarchy

### Font Stack
To guarantee optimal Performance-First delivery with 0ms FOIT (Flash of Invisible Text) and zero external network latency:
```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
```
*Monospace (Numbers, Formulas, Coordinates, Code)*:
```css
font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
```

### Scale & Hierarchy Specifications
| Level | Font Size | Line Height | Font Weight | Letter Spacing | Use Case |
|---|---|---|---|---|---|
| **Display / Hero H1** | `2.25rem` – `2.75rem` (36–44px) | 1.15 | 800 (Extrabold) | `-0.03em` | Main homepage title, hero headline |
| **Page H1 (Calculator)** | `1.75rem` – `2.25rem` (28–36px) | 1.2 | 800 (Extrabold) | `-0.025em` | Calculator main title |
| **Section H2** | `1.375rem` – `1.625rem` (22–26px) | 1.25 | 700 (Bold) | `-0.02em` | Major content headers, FAQ headers, tool tabs |
| **Card H3** | `1.125rem` – `1.25rem` (18–20px) | 1.3 | 600 (Semibold) | `-0.01em` | Tool card titles, subsection headers |
| **Result Hero Number** | `2.25rem` – `3.00rem` (36–48px) | 1.05 | 800 (Extrabold) | `-0.03em` | Primary output metric (e.g., Monthly EMI ₹24,850) |
| **Result Sub-Metric** | `1.25rem` – `1.50rem` (20–24px) | 1.15 | 700 (Bold) | `-0.015em` | Secondary results (Total Interest, Payable Amount) |
| **Field Label** | `0.875rem` (14px) | 1.25 | 600 (Semibold) | `0` | Form labels, input titles |
| **Body (Standard)** | `0.9375rem` – `1.0rem` (15–16px) | 1.6 | 400 (Regular) | `0` | Editorial copy, guide articles, descriptions |
| **Body (Compact)** | `0.875rem` (14px) | 1.5 | 400 (Regular) | `0` | Table data, card snippets, breakdown notes |
| **Caption / Helper** | `0.75rem` – `0.8125rem` (12–13px) | 1.4 | 500 (Medium) | `0.01em` | Unit helpers, input limits, disclaimer footnotes |
| **Eyebrow / Badge** | `0.6875rem` – `0.75rem` (11–12px) | 1 | 700 (Bold) | `0.05em` | Uppercase category tags, feature badges |

---

## 4. Spacing, Shapes, Elevation & Grid

### Elevation & Shadow Scale
Shadows must remain subtle, soft, and realistic—never harsh or heavy:
* **Flat (`shadow-none`):** Flat hairline borders on `#ffffff` surfaces.
* **Subtle Elevation (`shadow-xs` / `shadow-sm`):**  
  `box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.05);`  
  *Applied to: Form input fields, preset pill chips, secondary buttons.*
* **Card Elevation (`shadow-md`):**  
  `box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.04), 0 2px 4px -2px rgba(15, 23, 42, 0.03);`  
  *Applied to: Main calculator container, result summary card, tool cards.*
* **Floating Elevation (`shadow-lg`):**  
  `box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.06), 0 4px 6px -4px rgba(15, 23, 42, 0.04);`  
  *Applied to: Sticky action toolbars, dropdown menus, modals, toasts.*

### Border Radius Hierarchy
* **Extra Small (`rounded-md` / 6px):** Badges, tag chips, small unit indicators.
* **Small (`rounded-lg` / 8px):** Table row focus items, inline action buttons.
* **Medium (`rounded-xl` / 12px):** Standard form inputs, select boxes, primary/secondary action buttons.
* **Large (`rounded-2xl` / 16px):** Calculator containers, result cards, related tool cards, content blocks.
* **Full (`rounded-full` / 9999px):** Category tabs, preset chips, circular icon buttons, toggle switches.

### Container & Layout Constraints
* **Max Content Width (`max-w-7xl`):** `1280px` for header, footer, and full-width grids.
* **Standard Calculator Max Width:** `1200px` (2-column layout: Form `minmax(0, 1.1fr)`, Results `minmax(0, 0.9fr)`).
* **Narrow Article / Reading Max Width (`max-w-4xl`):** `896px` for optimal typography line-length readability.
* **Horizontal Page Padding:**  
  * Mobile (`< 640px`): `px-4` (16px)  
  * Tablet (`640px – 1024px`): `px-6` (24px)  
  * Desktop (`> 1024px`): `px-8` (32px)  

---

## 5. Component Visual Standards

### 5.1 Site Header & Navigation
* **Bar Surface:** `#ffffff` (Dark: `#0f172a`), fixed or sticky top with `border-b border-slate-200/80 dark:border-slate-800` and backdrop-blur support for smooth scrolling feel.
* **Brand Wordmark:** Deep navy text (`text-slate-900 dark:text-white`) with high-contrast accent icon/emoji. High legibility, no complex SVG clipping.
* **Desktop Links:** Clean horizontal links (`text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400`), semibold 14px (`font-semibold text-sm`), transitions `transition-colors duration-150`.
* **Category Dropdown / Mega Menu:** Clean elevated card (`rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900`).
* **Theme Toggle:** Compact rounded button (`rounded-xl p-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100`).
* **Mobile Hamburger & Drawer:** Crisp 44x44px touch target. Drawer slides or smoothly fades over canvas, with vertically stacked navigation pills, category groupings, and immediate tap responsiveness.

### 5.2 Breadcrumbs
* Compact, muted, unobtrusive navigation trail above the calculator title.
* Height: `text-xs font-medium text-slate-500 dark:text-slate-400`.
* Dividers: Crisp `/` or subtle chevron `›` in `text-slate-300 dark:text-slate-600`.
* Active page: `text-slate-800 dark:text-slate-200 font-semibold`, non-clickable.

### 5.3 Calculator Category Tabs
* **Format:** Horizontal pill strip with smooth horizontal scroll capability (`overflow-x-auto no-scrollbar`).
* **Default Pill:** `bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold hover:border-slate-300 hover:bg-slate-50`.
* **Active Pill:** `bg-blue-600 text-white border-blue-600 dark:bg-blue-600 dark:border-blue-600 shadow-sm`.
* **Touch Target:** Minimum 38px height on mobile with 8px gaps (`gap-2 sm:gap-3`).

### 5.4 Preset Chips
* **Visual Style:** Lightweight pills placed immediately below or above numerical inputs (e.g., Loan Tenure: "5Y", "10Y", "15Y", "20Y", "25Y").
* **Inactive Chip:** `bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs font-semibold hover:bg-slate-200/80 hover:text-slate-900`.
* **Active / Selected Chip:** `bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-700 font-bold`.

### 5.5 Calculator Cards (Grid & Listing)
* **Surface:** `bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200`.
* **Icon Treatment:** 48x48px pastel container with rounded-xl border (`rounded-xl p-3 bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400`).
* **Title & Excerpt:** Card title in `text-slate-900 dark:text-white font-bold text-base sm:text-lg mb-1.5`, 2-line snippet in `text-slate-600 dark:text-slate-400 text-xs sm:text-sm line-clamp-2`.
* **Action Cue:** Subtle "Calculate →" or arrow badge in `text-blue-600 dark:text-blue-400 font-semibold text-xs mt-3 flex items-center gap-1`.

### 5.6 Calculator Page Header
* **Layout:** Centered or left-aligned clear title block.
* **Category Pill:** Uppercase mini badge (e.g., `FINANCIAL UTILITY`, `CONSTRUCTION SUITE`) with pastel theme.
* **Heading H1:** Bold, clean typography with high-contrast text.
* **Subtitle:** 1–2 sentence description of what the calculator computes, avoiding jargon or clutter.
* **Trust / Feature Badges:** Inline micro-indicators (e.g., "Updated for FY 2026-27", "Instant Verification", "100% Free & Private") styled with `text-slate-500 text-xs flex items-center gap-1.5`.

### 5.7 Form Inputs & Select Fields
* **Label:** `block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5`.
* **Input Box:** `w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 sm:py-3 text-slate-900 dark:text-white text-sm sm:text-base font-semibold placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none transition-all`.
* **Prefix / Suffix Adornments:** (e.g., "₹", "$", "%", "kg", "ft", "months") cleanly docked with `text-slate-500 dark:text-slate-400 font-bold text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border-l (or r) border-slate-300 dark:border-slate-700 px-3 flex items-center`.
* **Slider Sync Component:** High-precision input paired with a native/custom slider track:
  * Track: `h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full`.
  * Thumb / Indicator: `w-4 h-4 bg-blue-600 rounded-full shadow-sm cursor-pointer`.
* **Error State:** `border-red-500 focus:border-red-600 focus:ring-red-500/20 text-red-900`. Error message: `text-xs text-red-600 dark:text-red-400 font-medium mt-1 flex items-center gap-1`.

### 5.8 Buttons (Primary & Secondary)
* **Primary Button:**  
  `w-full sm:w-auto bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm sm:text-base px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-150 flex items-center justify-center gap-2`.
* **Secondary / Reset Button:**  
  `w-full sm:w-auto bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold text-sm sm:text-base px-5 py-3 rounded-xl transition-all duration-150 flex items-center justify-center gap-2`.
* **Icon-Only / Utility Button:**  
  `p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 hover:text-slate-900 transition-colors`.

### 5.9 Result Card & Metric Containers
The output card is the visual payoff of the calculator:
* **Container:** `bg-gradient-to-b from-blue-50/70 to-white dark:from-slate-900 dark:to-slate-950 rounded-2xl border border-blue-100 dark:border-blue-900/40 p-6 sm:p-7 shadow-sm`.
* **Hero Result Metric:**
  * Label: `text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-900/80 dark:text-blue-300 mb-1`.
  * Value: `text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight font-mono`.
  * Subtitle / Context: `text-xs text-slate-500 dark:text-slate-400 mt-1`.
* **Metric Grid (Breakdown Items):** 2 or 3 columns (`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-5 pt-5 border-t border-slate-200/80 dark:border-slate-800`).
  * Sub-item: `bg-white dark:bg-slate-900/80 rounded-xl p-3.5 border border-slate-200/60 dark:border-slate-800`.
  * Sub-label: `text-xs font-medium text-slate-500 dark:text-slate-400`.
  * Sub-value: `text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5`.

### 5.10 Visual Charts & SVG Diagrams
* **Donut / Pie Charts:** Embedded clean SVG or lightweight Canvas charts with clear labels and pastel colored legends:
  * Principal / Base: `#2563eb` (Royal Blue)
  * Interest / Add-on: `#f59e0b` (Amber) or `#10b981` (Emerald)
* **Construction & Structural SVG Detailing Diagrams:**
  * High-contrast vector lines (`stroke-width: 1.5px` or `2px`).
  * Inverted crisp colors in Dark Mode per established architectural guidelines.
  * Dimension witness lines in crisp slate (`#64748b` in light, `#94a3b8` in dark).

### 5.11 Tables (Amortization, Material Breakup, Slabs)
* **Container:** `w-full overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900`.
* **Table Header (`thead`):** `bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 py-3 px-4 text-left`.
* **Table Rows (`tbody tr`):** `border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 text-xs sm:text-sm text-slate-700 dark:text-slate-200 transition-colors`.
* **Numerical Alignment:** Monospace font for numbers (`font-mono`), right-aligned numeric columns.

### 5.12 Save, Share & Project Action Toolbar
* **Placement:** Bottom of the Result Card or sticky on mobile viewport edge.
* **Style:** Sleek pill or compact row (`flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-200/80 dark:border-slate-800`).
* **Action Buttons (Copy Link, PDF, CSV, Print, Share):**
  * `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs`.

### 5.13 FAQ Accordions
* **Container:** Stacked cards or border-separated accordion list (`space-y-3 mt-6`).
* **Summary / Trigger:** `w-full text-left font-bold text-sm sm:text-base text-slate-900 dark:text-white py-3.5 px-4 sm:px-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100/80 border border-slate-200/80 dark:border-slate-700 flex justify-between items-center transition-colors cursor-pointer`.
* **Chevron Icon:** Clean rotating indicator `transition-transform duration-200`.
* **Content Panel:** `px-5 py-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-700/60`.

### 5.14 Related Calculator Cards
* **Grid:** 2-column or 3-column responsive card grid (`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6`).
* **Visual Appearance:** Compact version of standard calculator card with icon, title, short description, and arrow link.

### 5.15 SEO Content & Guide Sections
* **Layout:** Generous spacing, contained within `max-w-4xl` for optimal reading flow.
* **Section Headers (H2/H3):** Prominent deep navy headers with subtle bottom border or accent bar.
* **Prose Styling:** High-legibility slate paragraphs, bold highlighted terms, bulleted formulas with light-blue tinted formula boxes (`bg-blue-50/70 dark:bg-blue-950/40 p-4 rounded-xl border border-blue-100 font-mono text-xs sm:text-sm`).

### 5.16 Support & Contact Section
* **Style:** Clean, reassuring card layout with clear contact options (Feedback form, email link, bug reporting).
* **Tone:** Professional, accessible, welcoming.

### 5.17 Site Footer
* **Surface:** `#ffffff` (Dark: `#090d16`) with top hairline border (`border-t border-slate-200 dark:border-slate-800 py-12 px-4 sm:px-8`).
* **Content Grid:** Organized column layout (Brand & mission summary, Finance calculators, Construction calculators, Health & Math calculators, Legal/Privacy/Terms links).
* **Copyright & Disclaimers:** Compact bottom row (`text-xs text-slate-400 dark:text-slate-500 pt-8 border-t border-slate-100 dark:border-slate-850 flex flex-col sm:flex-row justify-between items-center gap-4`).

### 5.18 Ad Containers (Google AdSense)
* **Container Styling:** Clean, dedicated containment boxes (`min-h-[90px] sm:min-h-[250px] bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center text-[10px] text-slate-400 tracking-wider uppercase`).
* **Layout Stability:** Fixed min-height attributes to eliminate Cumulative Layout Shift (CLS).

---

## 6. Calculator Page Architecture & Responsive Rules

### Desktop Layout (≥ 1024px)
* **Two-Column Master Grid (`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start`):**
  * **Left Column (7 cols):** Form Inputs, Preset Selectors, Sliders, Action Buttons (Calculate / Reset).
  * **Right Column (5 cols, sticky top-24):** Instant Results Card, Key Breakdown Metrics, Visual SVG/Donut Chart, Save/Share/Export Toolbar.
* **Full-Width Below-the-Fold:** Detailed Amortization/BOQ Schedule Tables, Formula Methodology, Real-Life Examples, FAQs, Related Calculators, Ad Placements.

### Tablet Layout (640px – 1023px)
* **Single Column Fluid Grid:** Inputs first, followed immediately by prominent Result Summary Card, Charts, Schedules, and Reference Content.
* **Spacing:** `p-6` card padding, `gap-6` component spacing.

### Mobile Layout (< 640px)
* **Strict Overflow Prevention:** Every container must have `max-w-full overflow-hidden` or controlled horizontal scroll (`overflow-x-auto`). The entire HTML body must never horizontally shift or scroll (`overflow-x-hidden`).
* **Touch-Friendly Controls:** All buttons and interactive pills must meet minimum 44x44px touch target guidelines.
* **Sticky Mobile Summary Bar:** When scrolled past the result card, an optional subtle sticky bottom drawer shows the primary output value (e.g. "EMI: ₹24,850/mo") with a "View Breakdown" tap target.
* **Horizontal Trays:** Category tabs, preset chips, and table columns must scroll horizontally with clean scroll snapping and hidden scrollbars (`no-scrollbar`).

---

## 7. Accessibility (a11y) Standards

* **Color Contrast:** All text must strictly comply with WCAG 2.1 AA contrast ratios (minimum 4.5:1 for standard body text, 3:1 for large display headings).
* **Focus Indicators:** Interactive elements must display a high-contrast focus ring (`focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 outline-none`).
* **Form Labels:** Every `<input>` and `<select>` must be paired with an explicitly associated `<label>` or `aria-label`.
* **Touch Targets:** No interactive element smaller than 40x40px (recommended 44x44px) on mobile viewports.
* **Semantic Structure:** Proper document outline utilizing hierarchical `<h1>`, `<h2>`, `<h3>` tags; clean `<nav>`, `<main>`, `<section>`, `<aside>`, and `<footer>` elements.
* **Reduced Motion:** Respect user system preferences via `@media (prefers-reduced-motion: reduce)` disabling non-essential transitions.

---

## 8. Dark Mode Specification

* **Mechanism:** Class-based `dark` variant (`@custom-variant dark (&:where(.dark, .dark *));`) with anti-flicker client storage synchronization.
* **Background Inversion:** Deep dark slate canvas (`#090d16`), elevated slate surface cards (`#0f172a`), hairline slate borders (`#334155`).
* **Text Contrast:** Crisp white headings (`#f8fafc`), light slate body (`#cbd5e1`), slate muted descriptions (`#94a3b8`).
* **SVG Diagram Telemetry:** Inversion rules already implemented in [`src/styles/global.css`](file:///c:/Users/Sachin/Desktop/aifreecalculator/src/styles/global.css) are standard and must be preserved.

---

## 9. Performance & Technical Constraints

* **Engine:** Built exclusively for Astro and Tailwind CSS.
* **Zero Bloat:** Do not introduce UI component kits (Radix, HeadlessUI, MUI), animation runtimes (Framer Motion, GSAP), or heavy icon packs.
* **Native Elements:** Prefer semantic native `<input type="number">`, `<input type="range">`, `<select>`, `<button>`, and `<details>/<summary>`.
* **Subtle Transitions:** Limit CSS transitions to `transition-colors duration-150` or `transition-all duration-200` to maintain constant 60fps on mobile.
