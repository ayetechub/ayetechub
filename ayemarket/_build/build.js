#!/usr/bin/env node
/**
 * AYE Marketplace website — static page assembler.
 *
 * This is an authoring convenience, not a runtime dependency: it stitches
 * shared head/nav/footer markup around each page's content fragment and
 * writes plain .html files to ayemarket/. The output requires no build
 * step to serve or to hand-edit later (same deploy story as the rest of
 * ayetechub.com — GitHub Pages just serves the .html files directly).
 * Re-run `node build.js` from this folder after editing a partial or any
 * file in pages/ to regenerate everything.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..'); // ayemarket/
const PAGES_DIR = path.join(__dirname, 'pages');
const SITE_URL = 'https://ayetechub.com/ayemarket';
const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.ayetechub.ayemarket';

const NAV_LINKS = [
  { href: 'features.html', label: 'Features' },
  { href: 'how-it-works.html', label: 'How It Works' },
  { href: 'safety.html', label: 'Safety Center' },
  { href: 'pricing.html', label: 'Pricing' },
  { href: 'help.html', label: 'Help Center' },
  { href: 'about.html', label: 'About' },
  { href: 'contact.html', label: 'Contact' },
];

const FOOTER_COLUMNS = [
  {
    title: 'Company',
    links: [
      { href: 'about.html', label: 'About Us' },
      { href: 'how-it-works.html', label: 'How It Works' },
      { href: 'safety.html', label: 'Safety Center' },
      { href: 'developers.html', label: 'Developer Info' },
      { href: 'release-notes.html', label: 'Release Notes' },
    ],
  },
  {
    title: 'Product',
    links: [
      { href: 'features.html', label: 'Features' },
      { href: 'pricing.html', label: 'Premium Plans' },
      { href: 'help.html', label: 'Help Center / FAQ' },
      { href: 'contact.html', label: 'Contact Us' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: 'privacy-policy.html', label: 'Privacy Policy' },
      { href: 'terms.html', label: 'Terms of Service' },
      { href: 'community-guidelines.html', label: 'Community Guidelines' },
      { href: 'cookie-policy.html', label: 'Cookie Policy' },
    ],
  },
  {
    title: 'Your Privacy',
    links: [
      { href: 'privacy-center.html', label: 'Data & Privacy Center' },
      { href: 'delete-account.html', label: 'Delete My Account' },
    ],
  },
];

function head({ slug, title, description, structuredData }) {
  const canonical = slug === 'index' ? `${SITE_URL}/` : `${SITE_URL}/${slug}.html`;
  const ogImage = `${SITE_URL}/assets/images/logo.png`;
  return `<meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="${canonical}" />
  <link rel="icon" href="assets/images/logo.png" type="image/png" />
  <meta name="theme-color" content="#2E9E4F" />
  <meta name="robots" content="index, follow" />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="AYE Marketplace" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:locale" content="en_US" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${ogImage}" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="assets/css/style.css" />
  ${structuredData ? `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>` : ''}`;
}

function header(activeHref) {
  const links = NAV_LINKS.map(
    (l) => `<a href="${l.href}"${l.href === activeHref ? ' class="active" aria-current="page"' : ''}>${l.label}</a>`
  ).join('\n      ');
  return `<a class="skip-link" href="#main">Skip to content</a>
  <header class="navbar">
    <div class="container navbar-inner">
      <a href="index.html" class="navbar-brand">
        <img src="assets/images/logo.png" alt="AYE Marketplace logo" width="34" height="34" />
        AYE Marketplace
      </a>
      <nav class="navbar-links" data-nav-links aria-label="Primary">
        ${links}
      </nav>
      <div class="navbar-actions">
        <button class="theme-toggle" data-theme-toggle aria-label="Toggle dark mode">🌙</button>
        <a href="${PLAY_URL}" class="btn btn-primary btn-block-mobile" style="padding:10px 20px;font-size:0.88rem;">Get the App</a>
        <button class="nav-toggle" data-nav-toggle aria-label="Open menu" aria-expanded="false">☰</button>
      </div>
    </div>
  </header>`;
}

function footer() {
  const cols = FOOTER_COLUMNS.map(
    (col) => `<div class="footer-col">
          <h4>${col.title}</h4>
          ${col.links.map((l) => `<a href="${l.href}">${l.label}</a>`).join('\n          ')}
        </div>`
  ).join('\n        ');

  return `<footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <a href="index.html" class="footer-brand">
            <img src="assets/images/logo.png" alt="AYE Marketplace logo" width="32" height="32" />
            AYE Marketplace
          </a>
          <p style="max-width:280px;">Tigray's modern marketplace for buying, selling, and finding jobs — safely and locally.</p>
          <div class="footer-social">
            <a href="https://t.me/AYETechHub" aria-label="Telegram" target="_blank" rel="noopener">✈️</a>
            <a href="https://www.youtube.com/@AYETechEngine" aria-label="YouTube" target="_blank" rel="noopener">▶️</a>
            <a href="mailto:ayetechub@gmail.com" aria-label="Email">✉️</a>
          </div>
        </div>
        ${cols}
      </div>
      <div class="footer-bottom">
        <span>© <span data-year>2026</span> AYE Marketplace — a product of <a href="https://ayetechub.com" style="color:var(--brand-blue);">AYE Tech Hub</a>. All rights reserved.</span>
        <span>Made for Tigray, Ethiopia 🇪🇹</span>
      </div>
    </div>
  </footer>
  <script src="assets/js/main.js"></script>`;
}

function assemble(slug, meta, bodyContent) {
  return `<!doctype html>
<html lang="en">
<head>
  ${head({ slug, ...meta })}
</head>
<body>
  ${header(meta.activeHref || '')}
  <main id="main">
    ${bodyContent}
  </main>
  ${footer()}
</body>
</html>
`;
}

const metaPath = path.join(__dirname, 'meta.json');
const META = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

let count = 0;
for (const slug of Object.keys(META)) {
  const fragPath = path.join(PAGES_DIR, `${slug}.html`);
  if (!fs.existsSync(fragPath)) {
    console.warn(`SKIP: no content fragment for "${slug}" at ${fragPath}`);
    continue;
  }
  const bodyContent = fs.readFileSync(fragPath, 'utf8');
  const html = assemble(slug, META[slug], bodyContent);
  const outName = slug === 'index' ? 'index.html' : `${slug}.html`;
  fs.writeFileSync(path.join(ROOT, outName), html, 'utf8');
  count++;
}
console.log(`Built ${count} page(s) into ${ROOT}`);
