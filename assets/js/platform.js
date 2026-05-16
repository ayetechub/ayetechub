'use strict';

/* ============================================================
   AYE Tech Hub – Platform JS
   Renders cards, handles search/filter for multi-page platform.
   Depends on: data.js being loaded first.
============================================================ */

/* ---- SVG Icon helper ---- */
const SVG_ICONS = {
  microchip: '<path fill="currentColor" d="M22 9V7h-2V5a2 2 0 0 0-2-2h-2V1h-2v2h-4V1H8v2H6a2 2 0 0 0-2 2v2H2v2h2v2H2v2h2v2H2v2h2v2a2 2 0 0 0 2 2h2v2h2v-2h4v2h2v-2h2a2 2 0 0 0 2-2v-2h2v-2h-2v-2h2v-2h-2V9zm-4 8H6V7h12z"/>',
  bolt: '<path fill="currentColor" d="M7 2v11h3v9l7-12h-4l3-8z"/>',
  industry: '<path fill="currentColor" d="M22 22H2v-4l4-2v-3l4-2V8l4-2v3l4-2v15zM6 18v2h12v-2zm0-4v2h12v-2zm6-4v2h6v-2z"/>',
  cogs: '<path fill="currentColor" d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65a.5.5 0 0 0 .12-.64l-2-3.46a.5.5 0 0 0-.61-.22l-2.49 1a7.3 7.3 0 0 0-1.69-.98l-.38-2.65A.49.49 0 0 0 14 2h-4a.49.49 0 0 0-.49.42l-.38 2.65a7.3 7.3 0 0 0-1.69.98l-2.49-1a.5.5 0 0 0-.61.22l-2 3.46a.49.49 0 0 0 .12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65a.5.5 0 0 0-.12.64l2 3.46a.5.5 0 0 0 .61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65A.49.49 0 0 0 10 22h4a.49.49 0 0 0 .49-.42l.38-2.65a7.3 7.3 0 0 0 1.69-.98l2.49 1a.5.5 0 0 0 .61-.22l2-3.46a.5.5 0 0 0-.12-.64zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"/>',
  compass: '<path fill="currentColor" d="M12 10.9a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1zM12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm2.19 12.19L6 18l3.81-8.19L18 6z"/>',
  robot: '<path fill="currentColor" d="M12 2a2 2 0 0 0-2 2v2H7a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h1v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2h1a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-1V8a2 2 0 0 0-2-2h-3V4a2 2 0 0 0-2-2zM9 11a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm6 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-6 4h6v2H9z"/>',
  pdf: '<path fill="currentColor" d="M20 2H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3zM9 9.5h1v-1H9zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4zm10.5 7h1v-3h-1z"/>',
  download: '<path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7zM5 18v2h14v-2z"/>',
  eye: '<path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>',
  play: '<path fill="currentColor" d="M8 5v14l11-7z"/>',
  search: '<path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>',
  clock: '<path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>',
  users: '<path fill="currentColor" d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>',
  graduation: '<path fill="currentColor" d="M5 13.18v4L12 21l7-3.82v-4L12 17zM12 3 1 9l11 6 9-4.91V17h2V9z"/>',
  star: '<path fill="currentColor" d="m12 17.27 6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>',
  file: '<path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm4 18H6V4h7v5h5z"/>',
  hdd: '<path fill="currentColor" d="M22 5H2v3h20zm-3 8h-4l-1.5 3h-3L9 13H5v6h14zm0-2V8H5v3z"/>',
  globe: '<path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1 17.93A8 8 0 0 1 4.07 13H7v1a2 2 0 0 0 2 2v3.93zm6.9-2.54A2 2 0 0 0 16 16h-1v-3a1 1 0 0 0-1-1H8v-2h2a1 1 0 0 0 1-1V7h2a2 2 0 0 0 2-2v-.41A8 8 0 0 1 17.9 17.39z"/>',
  shield: '<path fill="currentColor" d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5z"/>',
  arrowRight: '<path fill="currentColor" d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>',
  calendar: '<path fill="currentColor" d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V10h14zm0-12H5V6h14z"/>',
  mail: '<path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5z"/>',
  pin: '<path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>',
  phone: '<path fill="currentColor" d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a1 1 0 0 0-1.01.24l-1.57 1.97a15.49 15.49 0 0 1-6.92-6.91l1.97-1.66a1 1 0 0 0 .25-1.01A11.7 11.7 0 0 1 8.64 3.99 1 1 0 0 0 7.65 3H4.19A1 1 0 0 0 3.18 4.04C3.51 13.55 11.45 21.49 20.96 21.83a1 1 0 0 0 1.04-1V17.4a1 1 0 0 0-1-1z"/>',
  youtube: '<path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6z"/>',
  telegram: '<path fill="currentColor" d="M22 3 2 11l6 2 2 7 4-5 6 5 2-17zm-5 5L10 14l-1 4-1-3 9-7z"/>',
  tools: '<path fill="currentColor" d="m22.61 18.99-9.08-9.08c.93-2.34.45-5.1-1.44-7-2-1.99-4.96-2.4-7.37-1.24l4.05 4.04-2.83 2.83-4.04-4.04C.74 6.91 1.15 9.87 3.14 11.86c1.9 1.9 4.66 2.37 7 1.44l9.08 9.08z"/>',
  moon: '<path fill="currentColor" d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.39 5.39 0 0 1-4.4 2.26 5.5 5.5 0 0 1-3.14-10A9.32 9.32 0 0 0 12 3z"/>',
  sun: '<path fill="currentColor" d="M6.76 4.84 4.96 3.05 3.55 4.46l1.79 1.79zM4 10.5H1v2h3zm9-9.95h-2V3.5h2zm7.45 3.91-1.41-1.41-1.79 1.79 1.41 1.41zM17.24 18.16l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5v2h3v-2zM12 5.5a6 6 0 0 0-6 6c0 3.31 2.69 6 6 6s6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2zM4.96 19.95l1.41 1.41 1.79-1.8-1.41-1.41z"/>',
  menu: '<path fill="currentColor" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"/>',
  close: '<path fill="currentColor" d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>',
  arrowUp: '<path fill="currentColor" d="M4 12 5.41 13.41 11 7.83V20H13V7.83l5.58 5.59L20 12l-8-8z"/>'
};

function icon(name, cls = '', size = '1em') {
  const path = SVG_ICONS[name] || '';
  return `<svg style="width:${size};height:${size};fill:currentColor;display:inline-block;vertical-align:-0.125em;flex-shrink:0" class="${cls}" aria-hidden="true" viewBox="0 0 24 24">${path}</svg>`;
}

/* ---- Category labels ---- */
const CAT_LABELS = {
  all: 'All', plc: 'PLC & Automation', electrical: 'Electrical',
  mechanical: 'Mechanical', design: 'CAD & Design', ai: 'AI & Digital',
  general: 'General AI', coding: 'Coding', research: 'Research',
  productivity: 'Productivity', calculations: 'Calculations',
  study: 'Study Materials', software: 'Software', tools: 'Tools',
  certifications: 'Certifications'
};

/* ---- Level colors ---- */
const LEVEL_COLORS = {
  Beginner: '#22c55e', Intermediate: '#eab308', Advanced: '#ef4444'
};

/* ==============================================================
   COURSE CARD RENDERER
============================================================== */
function renderCourseCard(c, root = '.') {
  const levelColor = LEVEL_COLORS[c.level] || '#00d4ff';
  const badgeClass = c.badge === 'FREE' ? 'badge-free' : 'badge-premium';
  const tags = (c.tags || []).slice(0, 3).map(t => `<span class="course-tag">${t}</span>`).join('');
  const stars = '★'.repeat(Math.round(c.rating));

  return `
<article class="course-card-v2 reveal" data-category="${c.category}" data-title="${c.title}">
  <div class="course-thumb-v2" style="background:${c.bgGradient};color:${c.color}">
    ${icon(c.icon, 'c-icon')}
    <span class="c-label">${(c.category || '').toUpperCase()}</span>
    <span class="c-level" style="color:${levelColor}">${c.level}</span>
    <span class="c-badge ${badgeClass}">${c.badge}</span>
  </div>
  <div class="course-body-v2">
    <div class="course-rating">${icon('star', '', '0.85em')} ${c.rating} <span style="color:var(--text-muted);font-weight:400">(${c.students})</span></div>
    <h3>${c.title}</h3>
    <p>${c.description}</p>
    <div class="course-meta-row">
      <div class="course-meta-item">${icon('clock')} ${c.duration}</div>
      <div class="course-meta-item">${icon('graduation')} ${c.lessons} lessons</div>
      <div class="course-meta-item">${icon('users')} ${c.students}</div>
    </div>
    <div class="course-tags">${tags}</div>
    <div class="course-actions">
      <a href="${root}${c.url}" class="btn btn-primary">
        ${icon('graduation')} Open Course
      </a>
      <button class="btn btn-outline" onclick="notify('Download', '${c.title} — course materials coming soon.')" aria-label="Download">
        ${icon('download')}
      </button>
    </div>
  </div>
</article>`.trim();
}

/* ==============================================================
   PDF CARD RENDERER
============================================================== */
function renderPdfCard(p) {
  const badgeClass = p.badge === 'FREE' ? 'badge-free' : 'badge-premium';
  const fileAvailable = p.file && p.file !== '#coming-soon';
  const iconColor = p.color || '#00d4ff';

  return `
<article class="pdf-card-v2 reveal" data-category="${p.category}" data-title="${p.title}">
  <div class="pdf-card-header">
    <div class="pdf-icon-circle" style="background:linear-gradient(135deg,${iconColor}33,${iconColor}55);box-shadow:0 4px 12px ${iconColor}33">
      ${icon('pdf', '', '22px')}
    </div>
    <div class="pdf-card-info">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:4px">
        <h4>${p.title}</h4>
        <span class="c-badge ${badgeClass}" style="white-space:nowrap;font-size:0.65rem;padding:2px 8px;border-radius:10px">${p.badge}</span>
      </div>
      <p>${p.description}</p>
    </div>
  </div>
  <div class="pdf-card-meta">
    <span class="pdf-meta-chip">${icon('file')} ${p.pages} pages</span>
    <span class="pdf-meta-chip">${icon('hdd')} ${p.size}</span>
    <span class="pdf-meta-chip">${icon('download')} ${p.downloads}</span>
  </div>
  <div class="pdf-card-actions">
    ${fileAvailable
      ? `<a href="${p.file}" class="btn btn-primary" download>${icon('download')} Download</a>`
      : `<button class="btn btn-primary" onclick="notify('Coming Soon','${p.title} will be available soon.')" style="background:rgba(0,212,255,0.15);border:1px solid var(--border-strong)">${icon('download')} Coming Soon</button>`
    }
    ${p.preview
      ? `<button class="btn btn-outline" onclick="openPdfModal('${p.id}')" aria-label="Preview">${icon('eye')} Preview</button>`
      : `<button class="btn btn-outline" onclick="notify('Info','${p.title}')">Info</button>`
    }
  </div>
</article>`.trim();
}

/* ==============================================================
   TUTORIAL CARD RENDERER
============================================================== */
function renderTutorialCard(t, root = '') {
  const levelColor = LEVEL_COLORS[t.level] || '#00d4ff';
  return `
<article class="tutorial-card reveal" onclick="window.open('${t.url}','_blank')" data-category="${t.category}" data-title="${t.title}">
  <div class="tutorial-thumb">
    <img src="${root}${t.thumbnail}" alt="${t.title}" loading="lazy" onerror="this.style.display='none'" />
    <div class="tutorial-play">${icon('play', '', '22px')}</div>
    <span class="tutorial-duration">${t.duration}</span>
  </div>
  <div class="tutorial-body">
    <h3>${t.title}</h3>
    <p>${t.description}</p>
    <div class="tutorial-footer">
      <span class="t-views">${icon('eye', '', '12px')} ${t.views} views</span>
      <span style="color:${levelColor};font-size:0.72rem;font-weight:600">${t.level}</span>
    </div>
  </div>
</article>`.trim();
}

/* ==============================================================
   AI TOOL CARD RENDERER
============================================================== */
function renderAiToolCard(t) {
  const useCases = (t.useCases || []).map(u => `<span class="ai-use-case">${u}</span>`).join('');
  return `
<div class="ai-tool-card reveal" data-category="${t.category}">
  <div class="ai-tool-header">
    <div class="ai-tool-logo" style="background:${t.color};color:#fff">
      ${icon(t.icon, '', '24px')}
    </div>
    <div>
      <div class="ai-tool-name">${t.name}</div>
      <div class="ai-tool-badge" style="background:${t.badgeColor}22;color:${t.badgeColor}">${t.badge}</div>
    </div>
  </div>
  <p class="ai-tool-desc">${t.description}</p>
  <div class="ai-use-cases">${useCases}</div>
  <a href="${t.url}" target="_blank" rel="noopener" class="btn btn-outline" style="font-size:0.82rem;padding:8px 14px;margin-top:4px">
    Open Tool ${icon('arrowRight', '', '14px')}
  </a>
</div>`.trim();
}

/* ==============================================================
   DOWNLOAD CARD RENDERER
============================================================== */
function renderDownloadCard(d) {
  const badgeStyle = `background:${d.badgeColor}22;color:${d.badgeColor};border:1px solid ${d.badgeColor}44`;
  const canOpen = d.openable && d.file && d.file !== '#coming-soon';
  const canDl = !d.openable && d.file && d.file !== '#coming-soon';
  return `
<div class="download-card reveal" data-category="${d.category}">
  <div class="download-icon" style="background:${d.color}22;color:${d.color}">
    ${icon(d.icon, '', '22px')}
  </div>
  <div class="download-info">
    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px">
      <h4>${d.title}</h4>
      <span style="font-size:0.65rem;font-weight:700;padding:2px 8px;border-radius:10px;white-space:nowrap;${badgeStyle}">${d.badge}</span>
    </div>
    <p>${d.description}</p>
    <div class="download-meta">
      <span>${icon('file')} ${d.type}</span>
      <span>${icon('hdd')} ${d.size}</span>
      <span>${icon('download')} ${d.downloads} downloads</span>
    </div>
    <div class="download-actions">
      ${canOpen ? `<a href="${d.file}" class="btn btn-primary" style="font-size:0.79rem">${icon('play')} Open</a>` : ''}
      ${canDl ? `<a href="${d.file}" class="btn btn-primary" download style="font-size:0.79rem">${icon('download')} Download</a>` : ''}
      ${!canOpen && !canDl ? `<button class="btn btn-primary" onclick="notify('Coming Soon','${d.title} will be available soon.')" style="background:rgba(0,212,255,0.1);border:1px solid var(--border-strong);font-size:0.79rem">${icon('clock')} Coming Soon</button>` : ''}
    </div>
  </div>
</div>`.trim();
}

/* ==============================================================
   BLOG CARD RENDERER
============================================================== */
function renderBlogCard(b, root = '') {
  const date = new Date(b.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  return `
<article class="blog-card-v2 reveal" data-category="${b.category}">
  <div class="blog-img-v2">
    <img src="${root}${b.image}" alt="${b.title}" loading="lazy" onerror="this.style.display='none'" />
    <span class="blog-category-chip">${CAT_LABELS[b.category] || b.category}</span>
  </div>
  <div class="blog-body-v2">
    <div class="blog-meta-v2">
      <span>${icon('calendar', '', '12px')} ${date}</span>
      <span>${icon('clock', '', '12px')} ${b.readTime}</span>
    </div>
    <h3>${b.title}</h3>
    <p>${b.excerpt}</p>
    <a href="${b.url}" class="read-more-link">Read More ${icon('arrowRight', '', '14px')}</a>
  </div>
</article>`.trim();
}

/* ==============================================================
   GENERIC FILTER & SEARCH ENGINE
============================================================== */
function filterAndSearch(items, { category = 'all', query = '' }) {
  return items.filter(item => {
    const matchCat = category === 'all' || item.category === category;
    const searchable = (item.title + ' ' + (item.description || '') + ' ' + (item.tags || []).join(' ')).toLowerCase();
    const matchQ = !query || searchable.includes(query.toLowerCase());
    return matchCat && matchQ;
  });
}

/* ==============================================================
   GRID RENDERER (generic – fills a container)
============================================================== */
function renderGrid(containerId, items, renderFn, emptyMsg = 'No items found.') {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (!items || items.length === 0) {
    container.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
      <svg viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/></svg>
      <h3>${emptyMsg}</h3><p>Try adjusting your search or filter.</p></div>`;
    return;
  }
  container.innerHTML = items.map(renderFn).join('');
  initReveal();
  updateCount(containerId, items.length);
}

/* ==============================================================
   RESULT COUNT UPDATER
============================================================== */
function updateCount(gridId, count) {
  const el = document.querySelector(`[data-count-for="${gridId}"]`);
  if (el) el.textContent = `${count} result${count !== 1 ? 's' : ''}`;
}

/* ==============================================================
   NOTIFICATION HELPER
============================================================== */
let _notifTimer;
function notify(title, msg) {
  const n = document.getElementById('notif');
  if (!n) return;
  n.querySelector('.notif-title').textContent = title;
  n.querySelector('.notif-msg').textContent = msg;
  n.classList.add('show');
  clearTimeout(_notifTimer);
  _notifTimer = setTimeout(() => n.classList.remove('show'), 4000);
}
window.notify = notify;

/* ==============================================================
   PDF MODAL
============================================================== */
function openPdfModal(id) {
  const pdf = (typeof PDFS !== 'undefined') ? PDFS.find(p => p.id === id) : null;
  if (!pdf) return;
  const m = document.getElementById('pdf-modal-page');
  if (!m) return;
  m.querySelector('#pmodal-title').textContent = pdf.title;
  m.querySelector('#pmodal-desc').textContent = pdf.description;
  m.querySelector('#pmodal-meta').innerHTML = `
    <div class="modal-meta-item"><div class="l">Pages</div><div class="v">${pdf.pages}</div></div>
    <div class="modal-meta-item"><div class="l">Size</div><div class="v">${pdf.size}</div></div>
    <div class="modal-meta-item"><div class="l">Status</div><div class="v" style="color:${pdf.badge==='FREE'?'#22c55e':'#eab308'}">${pdf.badge}</div></div>
    <div class="modal-meta-item"><div class="l">Downloads</div><div class="v">${pdf.downloads}</div></div>
  `;
  const fileAvail = pdf.file && pdf.file !== '#coming-soon';
  m.querySelector('#pmodal-dl').innerHTML = fileAvail
    ? `<a href="${pdf.file}" class="btn btn-primary" download>${icon('download')} Download PDF</a>`
    : `<button class="btn btn-primary" onclick="notify('Coming Soon','This PDF is being prepared.')" style="background:rgba(0,212,255,0.1)">${icon('clock')} Coming Soon</button>`;
  m.classList.add('show');
}
function closePdfModal() {
  const m = document.getElementById('pdf-modal-page');
  if (m) m.classList.remove('show');
}
window.openPdfModal = openPdfModal;
window.closePdfModal = closePdfModal;

/* ==============================================================
   SCROLL REVEAL (IntersectionObserver)
============================================================== */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
}

/* ==============================================================
   THEME TOGGLE (shared)
============================================================== */
function toggleTheme() {
  const html = document.documentElement;
  const useEl = document.getElementById('theme-use');
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  if (useEl) useEl.setAttribute('href', isDark ? '#i-sun' : '#i-moon');
  try { localStorage.setItem('aye-theme', html.getAttribute('data-theme')); } catch(e) {}
}
window.toggleTheme = toggleTheme;

/* Load saved theme */
(function() {
  try {
    const saved = localStorage.getItem('aye-theme');
    if (saved === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      const useEl = document.getElementById('theme-use');
      if (useEl) useEl.setAttribute('href', '#i-sun');
    }
  } catch(e) {}
})();

/* ==============================================================
   MOBILE MENU TOGGLE (shared)
============================================================== */
function toggleMobileMenu() {
  document.getElementById('mobile-menu')?.classList.toggle('open');
}
window.toggleMobileMenu = toggleMobileMenu;

/* ==============================================================
   BACK TO TOP BUTTON
============================================================== */
window.addEventListener('scroll', () => {
  document.getElementById('btt-btn')?.classList.toggle('visible', window.scrollY > 400);
  document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
window.scrollToTop = scrollToTop;

/* ==============================================================
   LOADING SCREEN
============================================================== */
window.addEventListener('load', () => {
  setTimeout(() => {
    const ls = document.getElementById('loading-screen');
    if (ls) {
      ls.classList.add('hidden');
      setTimeout(() => ls.remove(), 700);
    }
  }, 1200);
});

/* ==============================================================
   CONTACT FORM SUBMIT
============================================================== */
function handleContact(e) {
  e.preventDefault();
  notify('Message Sent!', 'Thank you for contacting AYE Tech Hub. We\'ll respond shortly.');
  e.target.reset();
}
window.handleContact = handleContact;

/* ==============================================================
   NEWSLETTER SUBMIT
============================================================== */
function handleNewsletter(e) {
  e.preventDefault();
  notify('Subscribed!', 'Welcome to the AYE Tech Hub newsletter!');
  e.target.reset();
}
window.handleNewsletter = handleNewsletter;

/* Init on load */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  /* Close modal on background click */
  document.getElementById('pdf-modal-page')?.addEventListener('click', e => {
    if (e.target.id === 'pdf-modal-page') closePdfModal();
  });
});
