# AYE Tech Hub – Site Management Guide

## File Structure

```
ayetechub-main/
├── index.html              ← Home page (existing, keep intact)
├── courses.html            ← Courses listing page
├── pdfs.html               ← PDF Library page
├── tutorials.html          ← Video Tutorials page
├── ai-tools.html           ← AI Tools directory
├── downloads.html          ← Downloads page
├── blog.html               ← Blog / Articles page
├── contact.html            ← Contact page
├── electrical-qa.html      ← Existing electrical quiz
│
├── assets/
│   ├── css/
│   │   ├── main.css        ← Core styles (extracted from index.html)
│   │   └── pages.css       ← Platform page styles
│   ├── js/
│   │   ├── data.js         ← ALL content data (courses, PDFs, blog, etc.)
│   │   ├── platform.js     ← Rendering, search, filter logic
│   │   └── main.js         ← Original JS (particles, loading, etc.)
│   └── images/             ← Logo, photos, etc.
│
├── courses/                ← Individual course lesson pages
│   ├── plc-fundamentals.html
│   ├── electrical-engineering.html
│   └── ... (one page per course)
│
├── pdfs/                   ← PDF files go here
│   └── README.md           ← Instructions for adding PDFs
│
├── downloads/              ← Excel tools, ZIP files, etc.
│   └── README.md
│
└── tutorials/              ← Reserved for tutorial pages
```

---

## How to Add New PDFs

1. Drop the `.pdf` file into `/pdfs/`
2. Open `assets/js/data.js`
3. Add a new object to the `PDFS` array:

```javascript
{
  id: 'unique-id',
  title: 'Display Title Here',
  category: 'electrical',     // plc | electrical | mechanical | design | ai
  pages: 120,
  size: '7.5 MB',
  downloads: '0',
  badge: 'FREE',              // FREE | PREMIUM
  description: 'Short description.',
  file: 'pdfs/filename.pdf',  // path from root
  color: '#00d4ff',           // card accent color
  preview: true
}
```

4. Save the file — it appears on the PDF Library page automatically.

---

## How to Add New Courses

1. Create a course page in `/courses/` (copy `plc-fundamentals.html` as a template)
2. Edit the lesson list and content for that course
3. Add a new object to the `COURSES` array in `assets/js/data.js`:

```javascript
{
  id: 'my-course',
  title: 'My Course Title',
  category: 'electrical',     // plc | electrical | mechanical | design | ai
  level: 'Beginner',          // Beginner | Intermediate | Advanced
  duration: '10 hrs',
  lessons: 20,
  students: '0',
  rating: 4.8,
  description: 'Course description.',
  instructor: 'Awet G. Nway',
  color: '#00d4ff',
  bgGradient: 'linear-gradient(135deg,#001a33,#003366)',
  icon: 'microchip',          // see SVG_ICONS in platform.js for options
  badge: 'FREE',
  url: 'courses/my-course.html',
  tags: ['Tag1', 'Tag2']
}
```

4. The course card appears on `courses.html` automatically.

---

## How to Edit Content

### Editing Course/PDF/Blog Data
- All content is in **`assets/js/data.js`** — edit values, add entries, remove entries.
- Changes are reflected immediately — no build step needed.

### Editing Page Structure
- Each page is a self-contained HTML file.
- The shared nav and footer are **copied** into each page (not templated).
- If you change the nav, update it in all HTML files.

### Editing Styles
- **Core styles**: `assets/css/main.css`
- **Page-specific styles**: `assets/css/pages.css`
- **Home page styles**: still inline in `index.html` (to preserve original design)

### Editing the Home Page
- The home page `index.html` retains all original sections (hero, about, divisions, services, founder, courses preview, pdf preview, youtube, social, blog, testimonials, faq, contact).
- Only the **navigation links** were updated to point to the new sub-pages.

---

## How to Add Blog Articles

Add to the `BLOG_POSTS` array in `assets/js/data.js`:

```javascript
{
  id: 'article-id',
  title: 'Article Title',
  category: 'ai',             // ai | plc | electrical | mechanical | design | study
  date: '2026-06-01',
  author: 'Awet G. Nway',
  readTime: '5 min read',
  excerpt: 'Short summary of the article.',
  image: 'assets/images/og-cover.png',  // or specific image
  url: '#',                   // link to full article (or '#' if not yet written)
  featured: false
}
```

---

## Deploying to GitHub Pages

### Initial Setup
```bash
git init
git remote add origin https://github.com/YOUR-USERNAME/ayetechub.git
git add .
git commit -m "Add multi-page platform"
git push -u origin main
```

Then in GitHub: **Settings → Pages → Branch: main → /root**

### Updating After Changes
```bash
git add .
git commit -m "Update: [describe what you changed]"
git push
```

GitHub Pages auto-deploys within 1–2 minutes.

### Custom Domain (ayetechub.com)
- Already configured via the `CNAME` file in the repo root.
- DNS should point: `CNAME www → YOUR-USERNAME.github.io`

---

## Tech Stack

- **HTML5** – semantic, accessible markup
- **CSS3** – custom properties (variables), CSS Grid, Flexbox
- **Vanilla JS** – no frameworks, no dependencies
- **Static hosting** – works on GitHub Pages, Netlify, Vercel, or any web server

No build tool, no npm, no backend. Drop files, edit data.js, push to GitHub.
