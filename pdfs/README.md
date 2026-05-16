# AYE Tech Hub – PDF Library

## How to Add New PDFs

1. **Drop the PDF file** into this `/pdfs/` folder.
   - Use a clean, descriptive filename: `my-engineering-guide.pdf`
   - No spaces in filenames (use hyphens instead)

2. **Register it in the data file** — open `assets/js/data.js` and add a new entry to the `PDFS` array:

```javascript
{
  id: 'my-guide',                          // unique ID (no spaces)
  title: 'My Engineering Guide',           // display title
  category: 'electrical',                  // plc | electrical | mechanical | design | ai
  pages: 120,                              // number of pages
  size: '7.5 MB',                          // file size
  downloads: '0',                          // download counter (update manually)
  badge: 'FREE',                           // FREE | PREMIUM
  description: 'Short description here.',  // 1-2 sentences
  file: 'pdfs/my-engineering-guide.pdf',  // path from root
  color: '#00d4ff',                        // card accent color
  preview: true                            // show Preview button?
}
```

3. **Save the file** — the PDF appears on `pdfs.html` automatically.

## Current PDFs

| File | Description | Status |
|------|-------------|--------|
| `plc-programming-guide.pdf` | PLC Programming Complete Guide | Place file here |
| `electrical-safety-handbook.pdf` | Electrical Safety Handbook | Place file here |
| `autocad-cheatsheet.pdf` | AutoCAD Commands Cheat Sheet | Place file here |
| `revit-mep-reference.pdf` | Revit MEP Complete Reference | Place file here |
| `ai-engineering-guide.pdf` | AI Tools for Engineers Guide | Place file here |
| `hvac-design-manual.pdf` | HVAC System Design Manual | Place file here |
| `solar-pv-design-guide.pdf` | Solar PV System Design Guide | Place file here |
| `scada-manual.pdf` | SCADA & HMI Programming Manual | Coming soon |
| `mep-handbook.pdf` | MEP Engineering Handbook | Coming soon |

## Notes

- PDF files are served directly — no backend needed
- For GitHub Pages: files up to 25MB each are fine
- The `manifest.json` is read by the platform to list PDFs dynamically
- Large PDFs (>25MB): host on Google Drive and link to them instead
