/* ============================================================
   AYE Tech Hub — i18n Engine
   ------------------------------------------------------------
   Lightweight, dependency-free internationalization.

   How it works:
   1. On page load, reads the saved language from localStorage,
      or detects the browser language, or falls back to English.
   2. Fetches the matching JSON file from /lang/<code>.json.
   3. Walks the DOM and swaps the content of any element with a
      data-i18n="some.dotted.key" attribute.
   4. For attributes (placeholder, aria-label, title, href, etc.)
      use data-i18n-attr="placeholder:some.key,title:other.key".
   5. For raw HTML (where the value contains tags), append "_html"
      to the JSON key OR use data-i18n-html="some.key".
   6. If a translation is missing or empty, falls back to English
      automatically. No broken pages.

   Public API:
   - window.i18n.setLang('en' | 'ti' | 'am')
   - window.i18n.getLang()
   - window.i18n.t('dotted.key')          // get a single string
   - window.i18n.refresh()                // re-apply translations
   ============================================================ */

(function () {
  'use strict';

  const SUPPORTED = ['en', 'ti', 'am'];
  const DEFAULT_LANG = 'en';
  const STORAGE_KEY = 'ayetechub_lang';
  const BASE_PATH = 'lang/'; // relative to index.html

  // Cache loaded language files so we don't refetch
  const cache = {};
  let currentLang = DEFAULT_LANG;
  let currentDict = {};
  let englishDict = {}; // always loaded as fallback

  // ----- utilities -------------------------------------------------

  /** Look up a dotted key like "nav.about" in a nested object. */
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

  /** Get a translation with English fallback. Returns '' if truly missing. */
  function t(key) {
    let val = lookup(currentDict, key);
    if (val === undefined || val === null || val === '') {
      val = lookup(englishDict, key);
    }
    return val == null ? '' : String(val);
  }

  /** Detect the user's preferred language. */
  function detectLang() {
    // 1. URL override: ?lang=ti
    try {
      const url = new URL(window.location.href);
      const fromUrl = url.searchParams.get('lang');
      if (fromUrl && SUPPORTED.includes(fromUrl)) return fromUrl;
    } catch (e) { /* ignore */ }

    // 2. Saved choice
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

  /** Fetch a language file (with cache). */
  async function loadDict(code) {
    if (cache[code]) return cache[code];
    try {
      const res = await fetch(BASE_PATH + code + '.json', { cache: 'no-cache' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const dict = await res.json();
      cache[code] = dict;
      return dict;
    } catch (err) {
      console.warn('[i18n] Could not load ' + code + '.json:', err.message);
      return null;
    }
  }

  // ----- DOM application -------------------------------------------

  /** Apply translations to all marked elements in the document. */
  function applyToDom() {
    // data-i18n="key"  -> textContent or innerHTML if key ends in _html
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (val === '') return; // keep existing content if nothing to use
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

    // Update <html lang="...">
    document.documentElement.setAttribute('lang', currentLang);
    const dir = lookup(currentDict, '_meta.dir') || 'ltr';
    document.documentElement.setAttribute('dir', dir);

    // Update active state on switcher
    document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
      const code = btn.getAttribute('data-lang-btn');
      btn.classList.toggle('is-active', code === currentLang);
      btn.setAttribute('aria-pressed', code === currentLang ? 'true' : 'false');
    });

    // Show draft notice if the current language is still a template
    const notice = document.getElementById('i18n-draft-notice');
    const status = lookup(currentDict, '_meta.status') || '';
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

    // Make sure English is always loaded (as fallback)
    if (!englishDict || !englishDict._meta) {
      englishDict = (await loadDict('en')) || {};
    }

    if (code === 'en') {
      currentDict = englishDict;
    } else {
      const dict = await loadDict(code);
      currentDict = dict || englishDict;
    }

    applyToDom();
    // Notify any listeners (e.g., the typing animation)
    document.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang: code } }));
  }

  function getLang() { return currentLang; }

  function refresh() { applyToDom(); }

  window.i18n = { setLang, getLang, t, refresh, SUPPORTED };

  // ----- bootstrap -------------------------------------------------

  document.addEventListener('DOMContentLoaded', async () => {
    const initial = detectLang();
    await setLang(initial);

    // Wire up switcher buttons
    document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const code = btn.getAttribute('data-lang-btn');
        setLang(code);
      });
    });
  });
})();
