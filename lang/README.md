# AYE Tech Hub — Translation Guide

A one-page guide for translating the AYE Tech Hub website to Tigrinya (ትግርኛ) and Amharic (አማርኛ). No coding knowledge required.

---

## What you need

- A text editor that supports UTF-8 (VS Code, Notepad++, or even GitHub's web editor)
- Ability to type in Ge'ez script (Tigrinya / Amharic)
- About 2–3 hours per language (176 strings)

## The files you'll edit

```
lang/
  en.json   ← Master English. DO NOT EDIT (used as fallback)
  ti.json   ← Tigrinya. EDIT THIS
  am.json   ← Amharic. EDIT THIS
```

## How it works

Each file is a structured list of phrases used on the website. Every phrase has a **key** (do not change) and a **value** (the translation).

Example:
```json
"nav": {
  "about": "",          ← put "ብዛዕባ" here (Tigrinya for "About")
  "divisions": "",      ← put "ክፍልታት" here
  "services": ""        ← put "ኣገልግሎታት 🇪🇹" here
}
```

## The 5 Rules

**1. Keep the keys exactly as they are.** The left side (`"about":`) is a code identifier. Never translate or change keys. Only translate the value (the part between quotes after the colon).

**2. Preserve HTML inside `_html` keys.** Some values contain HTML tags like `<strong>`, `<br/>`, or `<i>`. Keep those tags in the same positions; translate only the text around them.

✅ Correct:
```json
"languages_bar_html": "🌍 <strong>ቋንቋታት፦</strong> ትግርኛ · አማርኛ · English"
```
❌ Wrong (HTML removed):
```json
"languages_bar_html": "🌍 ቋንቋታት፦ ትግርኛ · አማርኛ · English"
```

**3. Keep emojis.** Emojis like 🇪🇹 🇰🇷 ⚡ 🔧 ☀️ are part of the design. Keep them in the same position.

**4. Phone numbers and brand names stay in English.** "AYE Tech Hub", "AYE TechEngine", "AYE TechPro", and phone numbers (`+251 919 281 449`, `+82 10-9859-6223`) should not be translated.

**5. When done, change the status.** At the top of your file, change:
```json
"status": "TEMPLATE — NOT YET TRANSLATED"
```
to:
```json
"status": "complete"
```

This removes the yellow "translation in progress" banner from the website.

## What to translate (and what not to)

| Translate | Do not translate |
|---|---|
| Section titles | Brand names: AYE Tech Hub, AYE TechEngine, AYE TechPro |
| Button labels | Phone numbers |
| Body paragraphs | URLs, emails, social handles (@ayetechub) |
| FAQ questions and answers | Emojis |
| Form field labels | HTML tags (`<strong>`, `<br/>`, etc.) |

## Engineering term notes

Some engineering terms have no direct translation. Use your local Tigray engineering team's preferences. Two options:

- **Transliteration**: Write the English word using Ge'ez characters (e.g. HVAC → ኤች-ቪ-ኤ-ሲ)
- **Functional description**: Describe what it does (e.g. HVAC → "ስርዓት መሞቕን መዝሓልን አየር")

Be consistent across the file. If you use a transliteration for "PLC" once, use it everywhere.

## Testing your work

1. Save the file
2. Open the website
3. Click your language button in the navbar
4. Walk through every page and verify all your translations show up correctly
5. If you see English text where you expected your translation, the key may have a typo or be empty — check the file

## When ready

Commit the file to the repo, or send it to Awet via WhatsApp/email. The change goes live on next site rebuild — no developer needed.

## Questions?

WhatsApp: +251 919 281 449 (Tigray team) · +82 10-9859-6223 (Awet, founder)
