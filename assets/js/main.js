
'use strict';

/* ===== Loading screen ===== */
window.addEventListener('load', () => {
  setTimeout(() => {
    const ls = document.getElementById('loading-screen');
    ls.classList.add('hidden');
    setTimeout(() => ls.remove(), 700);
    setTimeout(() => showNotification('Welcome to AYE Tech Hub!','Explore courses and free PDFs'), 1500);
    setTimeout(() => document.getElementById('newsletter-popup').classList.add('show'), 9000);
  }, 1800);
});

/* ===== Theme toggle ===== */
function toggleTheme() {
  const html = document.documentElement;
  const icon = document.getElementById('theme-icon').querySelector('use');
  if (html.getAttribute('data-theme') === 'dark') {
    html.setAttribute('data-theme', 'light');
    icon.setAttribute('href', '#i-sun');
  } else {
    html.setAttribute('data-theme', 'dark');
    icon.setAttribute('href', '#i-moon');
  }
  try { localStorage.setItem('aye-theme', html.getAttribute('data-theme')); } catch(e) {}
}
try {
  const saved = localStorage.getItem('aye-theme');
  if (saved === 'light') toggleTheme();
} catch(e) {}

/* ===== Navbar scroll ===== */
const navbar = document.getElementById('navbar');
const btt = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  btt.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

/* ===== Mobile menu ===== */
function toggleMobileMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

/* ===== Notification ===== */
let notifTimer;
function showNotification(title, msg) {
  const n = document.getElementById('notification');
  document.getElementById('notif-title').textContent = title;
  document.getElementById('notif-msg').textContent = msg;
  n.classList.add('show');
  clearTimeout(notifTimer);
  notifTimer = setTimeout(() => n.classList.remove('show'), 4500);
}
function closeNotification(){ document.getElementById('notification').classList.remove('show'); }

/* ===== Newsletter popup ===== */
function closeNewsletter(){ document.getElementById('newsletter-popup').classList.remove('show'); }

/* ===== PDF modal ===== */
function openModal(title, desc, pages, size, label, downloads) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-desc').textContent = desc;
  document.getElementById('modal-meta').innerHTML = `
    <div class="modal-meta-item"><div class="l">Pages</div><div class="v">${pages}</div></div>
    <div class="modal-meta-item"><div class="l">Size</div><div class="v">${size}</div></div>
    <div class="modal-meta-item"><div class="l">Status</div><div class="v" style="color:${label==='FREE'?'#22c55e':'#eab308'}">${label}</div></div>
    <div class="modal-meta-item"><div class="l">Downloads</div><div class="v">${downloads}</div></div>
  `;
  document.getElementById('pdf-modal').classList.add('show');
}
function closeModal(){ document.getElementById('pdf-modal').classList.remove('show'); }
document.getElementById('pdf-modal').addEventListener('click', e => { if (e.target.id === 'pdf-modal') closeModal(); });

/* ===== Typing animation ===== */
const words = ['Engineering','Solar Power','HVAC Systems','MEP Design','Education','Innovation'];
let wIdx = 0, cIdx = 0, deleting = false;
function typeLoop() {
  const el = document.getElementById('typing-text');
  if (!el) return;
  const w = words[wIdx];
  if (!deleting) {
    el.textContent = w.substring(0, cIdx + 1);
    cIdx++;
    if (cIdx === w.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
  } else {
    el.textContent = w.substring(0, cIdx - 1);
    cIdx--;
    if (cIdx === 0) { deleting = false; wIdx = (wIdx + 1) % words.length; }
  }
  setTimeout(typeLoop, deleting ? 60 : 90);
}
setTimeout(typeLoop, 1000);

/* ===== Counters ===== */
function animateCounter(el, target) {
  let current = 0;
  const step = target / 80;
  const t = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(t); }
    el.textContent = current >= 1000 ? (current/1000).toFixed(1) + 'K+' : Math.floor(current) + '+';
  }, 20);
}

/* ===== Scroll reveal + counter trigger ===== */
const obs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.classList.add('visible');
      en.target.querySelectorAll('[data-count]').forEach(c => {
        if (!c.dataset.done) {
          c.dataset.done = '1';
          animateCounter(c, parseInt(c.dataset.count));
        }
      });
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal, .reveal-l, .reveal-r').forEach(el => obs.observe(el));
document.querySelectorAll('[data-count]').forEach(el => {
  if (!el.closest('.reveal, .reveal-l, .reveal-r')) {
    const o = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting && !el.dataset.done) { el.dataset.done = '1'; animateCounter(el, parseInt(el.dataset.count)); o.disconnect(); } });
    }, { threshold: 0.3 });
    o.observe(el);
  }
});

/* ===== Particle canvas ===== */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resize(){ canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
resize();
window.addEventListener('resize', resize);
class P {
  constructor(){ this.reset(); }
  reset(){
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.vx = (Math.random()-0.5)*0.5;
    this.vy = (Math.random()-0.5)*0.5;
    this.r = Math.random()*2 + 0.5;
    this.a = Math.random()*0.5 + 0.1;
    this.c = Math.random()>0.7 ? '#3b82f6' : '#00d4ff';
  }
  update(){
    this.x += this.vx; this.y += this.vy;
    if (this.x<0||this.x>canvas.width||this.y<0||this.y>canvas.height) this.reset();
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
    ctx.fillStyle = this.c;
    ctx.globalAlpha = this.a;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}
for (let i=0; i<60; i++) particles.push(new P());
function connect() {
  for (let i=0; i<particles.length; i++) {
    for (let j=i+1; j<particles.length; j++) {
      const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
      const d = Math.sqrt(dx*dx + dy*dy);
      if (d < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = '#00d4ff';
        ctx.globalAlpha = (1 - d/120) * 0.15;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  }
}
function loop() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  connect();
  requestAnimationFrame(loop);
}
loop();

/* ===== Course filter ===== */
function filterCourses(cat, btn) {
  document.querySelectorAll('#courses-grid .course-card').forEach(c => {
    c.style.display = (cat==='all' || c.dataset.category === cat) ? '' : 'none';
  });
  document.querySelectorAll('#courses .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

/* ===== PDF filter & search ===== */
function filterPdfs(cat, btn) {
  document.querySelectorAll('#pdf-grid .pdf-card').forEach(c => {
    c.style.display = (cat==='all' || c.dataset.category === cat) ? '' : 'none';
  });
  document.querySelectorAll('#pdfs .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}
function searchPdfs(q) {
  const term = q.toLowerCase();
  document.querySelectorAll('#pdf-grid .pdf-card').forEach(c => {
    c.style.display = c.dataset.title.toLowerCase().includes(term) ? '' : 'none';
  });
}

/* ===== Video tab switch ===== */
function switchVideoTab(btn) {
  btn.parentElement.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

/* ===== FAQ ===== */
function toggleFaq(btn) {
  const item = btn.parentElement;
  const ans = item.querySelector('.faq-a');
  const open = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => {
    i.classList.remove('open');
    i.querySelector('.faq-a').classList.remove('open');
    i.querySelector('.faq-q').setAttribute('aria-expanded','false');
  });
  if (!open) {
    item.classList.add('open');
    ans.classList.add('open');
    btn.setAttribute('aria-expanded','true');
  }
}

/* ===== Testimonial slider ===== */
let tIdx = 0;
const track = document.getElementById('t-track');
const dots = document.querySelectorAll('#t-dots .t-dot');
function perPage(){ return window.innerWidth>=1024 ? 3 : (window.innerWidth>=768 ? 2 : 1); }
function updateT(){
  const pp = perPage();
  const max = Math.max(0, 4 - pp);
  tIdx = Math.min(tIdx, max);
  track.style.transform = `translateX(-${tIdx * (100/pp)}%)`;
  dots.forEach((d,i) => d.classList.toggle('active', i === tIdx));
}
function moveTestimonial(dir){
  const max = Math.max(0, 4 - perPage());
  tIdx = Math.max(0, Math.min(max, tIdx + dir));
  updateT();
}
function goToTestimonial(i){ tIdx = i; updateT(); }
window.addEventListener('resize', updateT);
setInterval(() => {
  const max = Math.max(0, 4 - perPage());
  tIdx = tIdx >= max ? 0 : tIdx + 1;
  updateT();
}, 6000);

console.log('%c AYE Tech Hub ', 'background:#00d4ff;color:#020817;padding:6px 14px;font-weight:bold;font-size:13px;border-radius:4px');
console.log('Site loaded. Replace .logo-box elements with <img src="assets/images/logo.png"> when ready.');
</script>

<!-- Draft-language notice banner (shows only when an incomplete TI/AM translation is active) -->
<div id="i18n-draft-notice" hidden role="status" aria-live="polite"></div>

<!-- i18n engine -->
<script src="js/i18n.js" defer>
