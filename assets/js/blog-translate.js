/**
 * AYE Tech Hub — Blog Inline Translation
 * Google Translate widget wrapper with custom styled buttons.
 * Supports: English (en), Tigrinya (ti), Amharic (am)
 */

'use strict';

// Called automatically by Google Translate script once loaded
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'ti,am',
    autoDisplay: false,
    multilanguagePage: false
  }, 'google_translate_element');

  // Restore previously selected language (from sessionStorage)
  var saved = sessionStorage.getItem('blog_lang');
  if (saved && saved !== 'en') {
    setTimeout(function() { _applyLang(saved); }, 600);
  }
}

// Switch language — called by button clicks
function blogLang(lang) {
  // Update active button UI
  document.querySelectorAll('.bl-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  var btn = document.getElementById('bl-' + lang);
  if (btn) btn.classList.add('active');

  sessionStorage.setItem('blog_lang', lang);

  if (lang === 'en') {
    _restoreEnglish();
    return;
  }
  _applyLang(lang);
}

function _applyLang(lang) {
  var select = document.querySelector('.goog-te-combo');
  if (!select) {
    // Widget not loaded yet — wait and retry
    setTimeout(function() { _applyLang(lang); }, 400);
    return;
  }
  select.value = lang;
  var ev = document.createEvent('HTMLEvents');
  ev.initEvent('change', true, true);
  select.dispatchEvent(ev);
}

function _restoreEnglish() {
  // Try to click the "Show original" restore button in the Google toolbar
  var frame = document.querySelector('.goog-te-banner-frame, iframe.skiptranslate');
  if (frame) {
    try {
      var doc = frame.contentDocument || frame.contentWindow.document;
      var restore = doc.querySelector('[id=":1.restore"]') ||
                    doc.querySelector('.goog-close-link') ||
                    doc.querySelector('[class*="restore"]');
      if (restore) { restore.click(); return; }
    } catch(e) {}
  }
  // Fallback: reset via select and reload
  var select = document.querySelector('.goog-te-combo');
  if (select) {
    select.value = '';
    var ev = document.createEvent('HTMLEvents');
    ev.initEvent('change', true, true);
    select.dispatchEvent(ev);
  }
}

// Remove the Google Translate banner that pushes content down
document.addEventListener('DOMContentLoaded', function() {
  // Inject CSS to suppress the Google Translate bar
  var style = document.createElement('style');
  style.textContent = [
    '.goog-te-banner-frame { display:none!important }',
    '.skiptranslate { display:none!important }',
    'body { top:0!important }',
    '#goog-gt-tt { display:none!important }',
    '.goog-te-balloon-frame { display:none!important }',
    '.goog-tooltip { display:none!important }',
  ].join('\n');
  document.head.appendChild(style);
});
