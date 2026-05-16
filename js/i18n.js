/* ============================================================
   AYE Tech Hub — i18n Engine  v2
   ------------------------------------------------------------
   Lightweight, dependency-free internationalization.

   Translation files live in /js/i18n/<code>.js as ES modules.
   Each exports a default object with nested key groups.

   How it works:
   1. On page load, reads the saved language from localStorage,
      or detects the browser language, or falls back to English.
   2. Dynamically imports the matching /js/i18n/<code>.js module.
      Uses an absolute root-relative path so subdirectory pages
      (e.g. /courses/plc.html) resolve the same file as root pages.
   3. Walks the DOM and swaps content of any element with a
      data-i18n="some.dotted.key" attribute.
   4. For attributes (placeholder, aria-label, title, etc.)
      use data-i18n-attr="placeholder:some.key,title:other.key".
   5. For raw HTML (where value contains tags), append "_html"
      to the JSON key OR use data-i18n-html="some.key".
   6. If a translation is missing or empty, falls back to English
      automatically. No broken pages.

   Public API:
   - window.i18n.setLang('en' | 'ti' | 'am')
   - window.i18n.getLang()
   - window.i18n.t('dotted.key')      // get a single string
   - window.i18n.refresh()            // re-apply translations
   - window.i18n.SUPPORTED            // ['en','ti','am']
   ============================================================ */

(function () {
  'use strict';

  const SUPPORTED   = ['en', 'ti', 'am'];
  const DEFAULT_LANG = 'en';
  const STORAGE_KEY  = 'ayetechub_lang';

  /* Resolve the base URL for /js/i18n/ regardless of page depth.
     We find the <script> tag that loaded this file and compute
     the sibling i18n/ directory from its absolute src URL.      */
  function resolveBase() {
    try {
      const scripts = document.querySelectorAll('script[src]');
      for (const s of scripts) {
        const src = s.getAttribute('src') || '';
        if (src.includes('i18n') && src.endsWith('.js')) {
          const abs = new URL(src, document.baseURI).href;
          // abs ends in "js/i18n.js" — replace tail with "js/i18n/"
          return abs.replace(/i18n\.js$/, 'i18n/');
        }
      }
    } catch (e) { /* ignore */ }
    // Fallback: absolute from domain root
    return window.location.origin + '/js/i18n/';
  }

  const BASE_URL = resolveBase(); // e.g. https://ayetechub.com/js/i18n/

  // Cache loaded modules
  const cache = {};
  let currentLang = DEFAULT_LANG;
  let currentDict = {};
  let englishDict  = {};

  // ----- utilities -------------------------------------------------

  function lookup(dict, key) {
    if (!dict || !key) return undefined;
    const parts = key.split('.');
    let node = dict;
    for (let i = 0; i < parts.length; i++) {
      if (node == null || typeof node !== 'object') return undefined;
      node = node[parts[i]];
    }
    return node;
  }

  function t(key) {
    let val = lookup(currentDict, key);
    if (val === undefined || val === null || val === '') {
      val = lookup(englishDict, key);
    }
    return val == null ? '' : String(val);
  }

  // ----- language detection ----------------------------------------

  function detectLang() {
    // 1. URL override: ?lang=ti
    try {
      const url   = new URL(window.location.href);
      const param = url.searchParams.get('lang');
      if (param && SUPPORTED.includes(param)) return param;
    } catch (e) { /* ignore */ }

    // 2. Saved preference
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.includes(saved)) return saved;
    } catch (e) { /* localStorage may be disabled */ }

    // 3. Browser language
    const browser = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (browser.startsWith('ti')) return 'ti';
    if (browser.startsWith('am')) return 'am';

    return DEFAULT_LANG;
  }

  // ----- module loading --------------------------------------------

  async function loadDict(code) {
    if (cache[code]) return cache[code];

    // Try ES dynamic import first (works on GitHub Pages with HTTPS)
    try {
      const url = BASE_URL + code + '.js';
      const mod = await import(url);
      const dict = mod.default || mod;
      if (dict && typeof dict === 'object') {
        cache[code] = dict;
        return dict;
      }
    } catch (err) {
      // Fall back to fetch + eval for environments that block import()
      try {
        const url = BASE_URL + code + '.js';
        const res = await fetch(url, { cache: 'no-cache' });
        if (res.ok) {
          const text = await res.text();
          // Extract the exported object from "export default { ... };"
          const match = text.match(/export\s+default\s+([\s\S]+?);?\s*$/);
          if (match) {
            /* eslint-disable no-new-func */
            const dict = new Function('return (' + match[1] + ')')();
            /* eslint-enable no-new-func */
            if (dict && typeof dict === 'object') {
              cache[code] = dict;
              return dict;
            }
          }
        }
      } catch (fetchErr) {
        console.warn('[i18n] Could not load ' + code + '.js:', fetchErr.message);
      }
    }

    // Also try legacy lang/<code>.json as a last resort
    try {
      const origin  = window.location.origin;
      const jsonUrl = origin + '/lang/' + code + '.json';
      const res     = await fetch(jsonUrl, { cache: 'no-cache' });
      if (res.ok) {
        const dict = await res.json();
        cache[code] = dict;
        return dict;
      }
    } catch (e) { /* ignore */ }

    console.warn('[i18n] All loading strategies failed for:', code);
    return null;
  }

  // ----- DOM application -------------------------------------------

  function applyToDom() {
    // data-i18n="key"
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (val === '') return;
      if (key.endsWith('_html')) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    });

    // data-i18n-html="key" -> always innerHTML
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      const val = t(key);
      if (val !== '') el.innerHTML = val;
    });

    // data-i18n-attr="placeholder:key1,aria-label:key2"
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      const spec = el.getAttribute('data-i18n-attr') || '';
      spec.split(',').forEach((pair) => {
        const [attr, key] = pair.split(':').map((s) => (s || '').trim());
        if (!attr || !key) return;
        const val = t(key);
        if (val !== '') el.setAttribute(attr, val);
      });
    });

    // Update <html lang="..."> and dir="..."
    document.documentElement.setAttribute('lang', currentLang);
    const dir = lookup(currentDict, '_meta.dir') || 'ltr';
    document.documentElement.setAttribute('dir', dir);

    // Sync active state on all lang switcher buttons
    document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
      const code = btn.getAttribute('data-lang-btn');
      const active = code === currentLang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    // Draft / incomplete translation notice
    const notice   = document.getElementById('i18n-draft-notice');
    const status   = lookup(currentDict, '_meta.status') || '';
    const noticeText = lookup(currentDict, 'lang_switcher.draft_notice') || '';
    if (notice) {
      if (currentLang !== 'en' && /TEMPLATE|DRAFT|NOT YET/i.test(status) && noticeText) {
        notice.textContent = noticeText;
        notice.hidden = false;
      } else {
        notice.hidden = true;
      }
    }
  }

  // ----- public API -----------------------------------------------

  async function setLang(code) {
    if (!SUPPORTED.includes(code)) {
      console.warn('[i18n] Unsupported language:', code);
      return;
    }

    currentLang = code;
    try { localStorage.setItem(STORAGE_KEY, code); } catch (e) { /* ignore */ }

    // Always keep English loaded as fallback
    if (!englishDict || !englishDict._meta) {
      englishDict = (await loadDict('en')) || {};
    }

    if (code === 'en') {
      currentDict = englishDict;
    } else {
      const dict  = await loadDict(code);
      currentDict = dict || englishDict;
    }

    applyToDom();
    document.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang: code } }));
  }

  function getLang()  { return currentLang; }
  function refresh()  { applyToDom(); }

  window.i18n = { setLang, getLang, t, refresh, SUPPORTED };

  // ----- bootstrap -------------------------------------------------

  document.addEventListener('DOMContentLoaded', async () => {
    const initial = detectLang();
    await setLang(initial);

    // Wire up all lang-switcher buttons (desktop + mobile)
    document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const code = btn.getAttribute('data-lang-btn');
        setLang(code);
      });
    });
  });
})();
