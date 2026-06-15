# Project: AYE Tech Hub — Main Website

## 1. Domain Guidelines

### Language & Tone
- Professional engineering brand voice — authoritative but approachable.
- Reflect the Ethiopia–Korea engineering bridge in copy (dual-culture pride, world-class standards).
- Support languages: **EN → TI → AM** (English, Tigrinya, Amharic). No Oromo on this site.
- Brand names are never translated: *AYE Tech Hub*, *AYE Fit Hub*, *Habesha Hearts*, *Awet G. Nway*.

### Translation Priority
- EN is always the source of truth and the automatic fallback.
- TI (Tigrinya) and AM (Amharic) must be complete — no missing keys.
- If a key is missing in TI or AM, the engine falls back to EN silently; still fix it.

## 2. Localization System

This project uses a **custom JS i18n engine** (`js/i18n.js` v2) — NOT Flutter intl, NOT i18next.

**Primary translation files** (ES modules, loaded dynamically):
- `js/i18n/en.js` — English (source of truth)
- `js/i18n/ti.js` — Tigrinya
- `js/i18n/am.js` — Amharic

**JSON fallback files** (loaded if the JS module fails):
- `lang/en.json`, `lang/ti.json`, `lang/am.json`

The JS modules and JSON files must stay in sync. When you add a key to `js/i18n/en.js`, also add it to `js/i18n/ti.js`, `js/i18n/am.js`, `lang/en.json`, `lang/ti.json`, and `lang/am.json`.

**Engine public API** (available as `window.i18n`):
```js
i18n.setLang('ti')     // switch language, saves to localStorage key: ayetechub_lang
i18n.getLang()         // returns current language code
i18n.t('nav.about')    // translate a key
i18n.refresh()         // re-render all data-i18n elements
```

**Language detection order**: URL param `?lang=ti` → localStorage → browser language → default `en`.

## 3. HTML Translation Rules

- **NEVER hardcode user-visible text** in HTML without a `data-i18n` attribute.
- Use `data-i18n="section.key"` for text content:
  ```html
  <a href="about.html" data-i18n="nav.about">About</a>
  ```
- Use `data-i18n-attr="placeholder:key"` for element attributes:
  ```html
  <input data-i18n-attr="placeholder:pdfs.search_placeholder" />
  ```
- Use `data-i18n-html="key"` for innerHTML (rich text with HTML tags):
  ```html
  <p data-i18n-html="hero.subtitle_html"></p>
  ```
- Elements with JS-dynamic content (e.g., `id="idx-pdf-count2"`) must **not** get `data-i18n` — the i18n engine would overwrite the JS value. Translate only static sibling/child elements.

### Adding a new translatable string:
1. Add the key to `js/i18n/en.js` under the appropriate section object.
2. Add TI and AM translations to `js/i18n/ti.js` and `js/i18n/am.js`.
3. Mirror all three additions into the JSON fallback files (`lang/en.json`, `lang/ti.json`, `lang/am.json`).
4. Add `data-i18n="section.key"` (or `data-i18n-html` / `data-i18n-attr`) to the HTML element.

## 4. Key Structure

Keys are grouped by section (matching the page layout):

```
nav.*         — navigation links and brand tag
hero.*        — hero section stats and buttons
about.*       — about section
divisions.*   — Our Divisions section (engine_* for Tech Hub, fithub_* for Fit Hub)
services.*    — Engineering Services (Tigray)
pdfs.*        — PDF Download Center
courses.*     — Courses section
tutorials.*   — Video Tutorials section
blog.*        — Engineering Blog
downloads.*   — Free Downloads
ai_tools.*    — AI Tools section
lang_switcher.* — language toggle buttons
common.*      — reusable strings (loading, close, coming_soon, etc.)
founder.*     — Founder section (stats: stat_years, stat_countries, stat_degrees, stat_mission)
contact.*     — Contact section and form
faq.*         — FAQ
footer.*      — Footer links, newsletter, copyright
```

## 5. File Conventions

- `index.html` — main page (3700+ lines); all sections are inline, no partials.
- `js/i18n.js` — i18n engine; do not modify unless fixing a bug in the engine itself.
- `js/i18n/<code>.js` — primary translation modules; always edit these first.
- `lang/<code>.json` — JSON fallbacks; must mirror the JS modules.
- `assets/images/` — all images; filenames are referenced directly in HTML.
- CSS in `<style>` tag inside `index.html`; utility classes use BEM-like naming.

## 6. Technical Notes

- Verify UTF-8 encoding for all files — Ge'ez script (Amharic/Tigrinya) must render correctly.
- Do not use ASCII substitutes for Ge'ez characters.
- The site supports dark/light theme toggle (`data-theme` on `<html>`); do not hardcode colors that break theme switching.
- `SUPPORTED` languages array in `js/i18n.js` is `['en', 'ti', 'am']` — do not add languages without updating the engine.
