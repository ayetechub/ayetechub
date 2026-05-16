# AYE Tech Hub – Downloads Folder

## How to Add Downloadable Resources

1. **Drop the file** into this `/downloads/` folder (Excel, PDF, ZIP, etc.)
2. **Register it** in `assets/js/data.js` in the `DOWNLOADS` array:

```javascript
{
  id: 'my-tool',
  title: 'My Engineering Tool',
  category: 'tools',        // study | tools | software | design
  type: 'Excel Tool',       // display label for file type
  size: '1.2 MB',
  downloads: '0',
  description: 'Description here.',
  badge: 'FREE',            // FREE | PREMIUM
  badgeColor: '#22c55e',
  file: 'downloads/my-tool.xlsx',  // path from root
  icon: 'tools',            // icon name from SVG_ICONS in platform.js
  color: '#00d4ff',
  openable: false           // true = opens in browser, false = download
}
```

## Current Download Files

| File | Description | Status |
|------|-------------|--------|
| `hvac-load-calculator.xlsx` | HVAC Load Calculator | Place here |
| `solar-sizing-calculator.xlsx` | Solar PV Sizing Tool | Place here |
| `engineering-formulas.pdf` | Engineering Formulas Reference | Place here |
