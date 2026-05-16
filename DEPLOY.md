# 🚀 DEPLOY YOUR WEBSITE — STEP BY STEP

Follow these steps exactly. After this, your website will be **live and searchable on Google**.

---

## 📋 PART 1 — DEPLOY TO GITHUB PAGES (FREE HOSTING)

### Step 1: Create a GitHub account
1. Go to https://github.com/signup
2. Sign up with your email
3. Verify your email

### Step 2: Create a new repository
1. Click the **+** icon (top right) → **New repository**
2. Repository name: `aye-tech-hub` (or `yourusername.github.io` for root URL)
3. Set it to **Public**
4. Check ✅ **Add a README file**
5. Click **Create repository**

### Step 3: Upload your files
1. In your new repo, click **Add file** → **Upload files**
2. Drag and drop these files from the ZIP:
   - `index.html`
   - `sitemap.xml`
   - `robots.txt`
   - `README.md`
   - The entire `assets/` folder
3. Scroll down → write commit message: `Initial website upload`
4. Click **Commit changes**

### Step 4: Enable GitHub Pages
1. Go to your repo → click **Settings**
2. Scroll left sidebar → click **Pages**
3. Under **Source** → select **Deploy from a branch**
4. Branch: `main` → Folder: `/ (root)` → Click **Save**
5. Wait 1–2 minutes
6. Your site is now live at:
   **`https://YOUR-USERNAME.github.io/aye-tech-hub/`**

✅ **Your website is now live!**

---

## 🌍 PART 2 — CONNECT A CUSTOM DOMAIN (Optional)

### If you want `ayetechhub.com` instead of the github URL:

### Step 1: Buy a domain
- Recommended: **Namecheap** (~$10/year) or **GoDaddy**
- Search for `ayetechhub.com` or similar

### Step 2: Point domain to GitHub
1. In your domain registrar's DNS settings, add these records:

```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     YOUR-USERNAME.github.io
```

### Step 3: Add domain to GitHub
1. Go to repo → **Settings** → **Pages**
2. Under **Custom domain** → enter `ayetechhub.com` → Save
3. Wait ~10 min, then check ✅ **Enforce HTTPS**

✅ **Your website is now at https://ayetechhub.com**

---

## 🔍 PART 3 — MAKE GOOGLE FIND YOU (SEO)

This is what makes your site **searchable on Google**.

### Step 1: Submit to Google Search Console
1. Go to https://search.google.com/search-console
2. Sign in with Gmail
3. Click **Add property** → choose **URL prefix**
4. Enter: `https://YOUR-USERNAME.github.io/aye-tech-hub/` (or your custom domain)
5. Verify ownership (easiest: download HTML file → upload to your repo → re-deploy)

### Step 2: Submit your sitemap
1. In Search Console → click **Sitemaps** (left sidebar)
2. Enter: `sitemap.xml`
3. Click **Submit**
4. Google will start indexing within 24–72 hours

### Step 3: Submit to Bing
1. Go to https://www.bing.com/webmasters
2. Sign in → Add your site
3. Submit your sitemap URL: `https://yourdomain.com/sitemap.xml`

### Step 4: Update URLs in your files
Before submitting, open these files and replace `ayetechhub.com` with your actual URL:
- `index.html` — search for `ayetechhub.com` and replace all
- `sitemap.xml` — replace all `ayetechhub.com` with your domain
- `robots.txt` — update the `Sitemap:` and `Host:` lines

### Step 5: Test your SEO
- **Mobile-friendly test:** https://search.google.com/test/mobile-friendly
- **Rich Results test:** https://search.google.com/test/rich-results
- **PageSpeed Insights:** https://pagespeed.web.dev/

---

## 🎨 PART 4 — ADD YOUR LOGOS

### Step 1: Prepare your logos
Save these files into `assets/images/`:
- `logo.png` — Main logo (transparent PNG, ~200×200px)
- `logo-white.png` — White version for dark footer
- `favicon.png` — Browser tab icon (32×32px or 64×64px)
- `techengine-logo.png` — Division logo
- `techpro-logo.png` — Division logo
- `og-cover.png` — Social share image (1200×630px, JPG or PNG)

### Step 2: Replace placeholders in index.html
Find this kind of line:
```html
<div class="logo-box">AYE</div>
```

Replace with:
```html
<img src="assets/images/logo.png" alt="AYE Tech Hub" style="width:42px;height:42px;object-fit:contain;" />
```

Locations in the HTML (already commented):
- Loading screen
- Navbar
- Hero center orb
- About section
- Division cards (use techengine-logo and techpro-logo)
- Contact section
- Footer

### Step 3: Re-upload to GitHub
- Go to your repo → drag updated files → commit
- Site updates automatically in 1–2 minutes

---

## 🔄 PART 5 — UPDATING CONTENT LATER

### To change anything (text, courses, PDFs, etc.):
1. Go to your GitHub repo
2. Click `index.html` → click the **✏️ pencil icon** to edit
3. Make your changes
4. Scroll down → commit
5. Site updates automatically

### To upload new files:
1. Go to your repo
2. **Add file** → **Upload files**
3. Drop the new files → commit

---

## 🚨 ALTERNATIVE: Netlify Deployment (Easier)

If GitHub feels complex:

1. Go to https://app.netlify.com/drop
2. Drag and drop your entire `aye-tech-hub` folder onto the page
3. Done! Site is live with a free URL like `aye-tech-hub-abc123.netlify.app`
4. To add a custom domain: Site settings → Domain management → Add custom domain

---

## ✅ FINAL CHECKLIST

Before considering yourself "done":

- [ ] Site is live (test the URL in a browser)
- [ ] Site works on mobile (open on your phone)
- [ ] Logos are added (not placeholders)
- [ ] All social media links point to YOUR real accounts
- [ ] Email/Telegram contact info is YOUR real info
- [ ] URLs in sitemap.xml match your actual domain
- [ ] Google Search Console is set up
- [ ] Sitemap is submitted to Google
- [ ] Mobile-friendly test passes
- [ ] PageSpeed score is above 80

---

## 📈 TIMELINE TO BE "SEARCHABLE"

| Action | Timeline |
|--------|----------|
| Site live on GitHub Pages | Immediate (within 2 min) |
| Custom domain working | 1–24 hours (DNS propagation) |
| Submitted to Google | Immediate |
| First indexed by Google | 1–7 days |
| Searchable in Google results | 1–4 weeks |
| Ranking for keywords | 1–6 months (depends on content/links) |

---

## 💡 TIPS TO RANK HIGHER

1. **Add real content regularly** — write blog posts, add new PDFs
2. **Get backlinks** — share on Telegram, YouTube descriptions, LinkedIn
3. **Speed matters** — your site already loads fast ✅
4. **Mobile matters** — your site is responsive ✅
5. **Use keywords naturally** — "PLC programming Ethiopia", "engineering PDF", etc.
6. **Update sitemap.xml lastmod date** whenever you add new content

---

## 🆘 Need Help?

If something breaks:
- Check the browser console (F12) for errors
- Make sure file paths are correct (case-sensitive!)
- Verify all files were uploaded to GitHub
- Wait 5 min after a commit before testing

Good luck! 🚀
