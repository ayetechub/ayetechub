/* AYE Marketplace — shared site behavior (nav, theme, FAQ, reveal, sliders). */
(function () {
  'use strict';

  /* Theme toggle — persisted in localStorage, defaults to system preference. */
  var THEME_KEY = 'ayemarket-theme';
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var toggles = document.querySelectorAll('[data-theme-toggle]');
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].textContent = theme === 'dark' ? '☀️' : '🌙';
      toggles[i].setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }
  function initTheme() {
    var saved = localStorage.getItem(THEME_KEY);
    var theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(theme);
    var toggles = document.querySelectorAll('[data-theme-toggle]');
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme') || 'light';
        var next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
      });
    }
  }

  /* Mobile nav toggle */
  function initNav() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var links = document.querySelector('[data-nav-links]');
    if (!toggle || !links) return;
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      var expanded = links.classList.contains('open');
      toggle.setAttribute('aria-expanded', String(expanded));
      toggle.textContent = expanded ? '✕' : '☰';
    });
    var anchors = links.querySelectorAll('a');
    for (var i = 0; i < anchors.length; i++) {
      anchors[i].addEventListener('click', function () {
        links.classList.remove('open');
        toggle.textContent = '☰';
      });
    }
  }

  /* FAQ accordion */
  function initFaq() {
    var items = document.querySelectorAll('.faq-item');
    for (var i = 0; i < items.length; i++) {
      var q = items[i].querySelector('.faq-q');
      if (!q) continue;
      q.addEventListener('click', (function (item) {
        return function () { item.classList.toggle('open'); };
      })(items[i]));
    }

    var search = document.querySelector('[data-faq-search]');
    if (search) {
      search.addEventListener('input', function () {
        var term = search.value.trim().toLowerCase();
        var all = document.querySelectorAll('.faq-item');
        for (var j = 0; j < all.length; j++) {
          var text = all[j].textContent.toLowerCase();
          all[j].style.display = term === '' || text.indexOf(term) !== -1 ? '' : 'none';
        }
      });
    }

    var tabs = document.querySelectorAll('[data-faq-tab]');
    for (var t = 0; t < tabs.length; t++) {
      tabs[t].addEventListener('click', function () {
        var cat = this.getAttribute('data-faq-tab');
        for (var t2 = 0; t2 < tabs.length; t2++) tabs[t2].classList.remove('active');
        this.classList.add('active');
        var groups = document.querySelectorAll('[data-faq-group]');
        for (var g = 0; g < groups.length; g++) {
          groups[g].style.display = (cat === 'all' || groups[g].getAttribute('data-faq-group') === cat) ? '' : 'none';
        }
      });
    }
  }

  /* Reveal-on-scroll */
  function initReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      for (var i = 0; i < items.length; i++) items[i].classList.add('in-view');
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    for (var j = 0; j < items.length; j++) observer.observe(items[j]);
  }

  /* Screenshot slider (auto-advance + dots) */
  function initSlider() {
    var frame = document.querySelector('[data-slider]');
    if (!frame) return;
    var slides = frame.querySelectorAll('[data-slide]');
    var dotsWrap = document.querySelector('[data-slider-dots]');
    if (!slides.length) return;
    var index = 0;
    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      slides.forEach(function (_, i) {
        var dot = document.createElement('span');
        if (i === 0) dot.className = 'active';
        dotsWrap.appendChild(dot);
      });
    }
    function show(i) {
      slides.forEach(function (s, si) { s.style.display = si === i ? 'block' : 'none'; });
      if (dotsWrap) {
        var dots = dotsWrap.children;
        for (var d = 0; d < dots.length; d++) dots[d].className = d === i ? 'active' : '';
      }
    }
    show(0);
    setInterval(function () {
      index = (index + 1) % slides.length;
      show(index);
    }, 3200);
  }

  /* Footer year */
  function initYear() {
    var els = document.querySelectorAll('[data-year]');
    for (var i = 0; i < els.length; i++) els[i].textContent = new Date().getFullYear();
  }

  /* Contact form (Formspree-style POST — see contact.html for the endpoint note) */
  function initContactForm() {
    var form = document.querySelector('[data-contact-form]');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form-status');
      var submitBtn = form.querySelector('button[type="submit"]');
      var endpoint = form.getAttribute('action');
      if (!endpoint || endpoint.indexOf('YOUR_FORM_ID') !== -1) {
        status.textContent = 'This form is not connected yet — email ayetechub@gmail.com directly in the meantime.';
        status.className = 'form-status show error';
        return;
      }
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form)
      }).then(function (res) {
        if (res.ok) {
          status.textContent = 'Thanks — your message has been sent. We\'ll reply within 1–2 business days.';
          status.className = 'form-status show success';
          form.reset();
        } else {
          status.textContent = 'Something went wrong. Please email ayetechub@gmail.com directly.';
          status.className = 'form-status show error';
        }
      }).catch(function () {
        status.textContent = 'Network error. Please email ayetechub@gmail.com directly.';
        status.className = 'form-status show error';
      }).finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initNav();
    initFaq();
    initReveal();
    initSlider();
    initYear();
    initContactForm();
  });
})();
