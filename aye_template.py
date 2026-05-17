"""
AYE Tech Hub — Master PDF Template System v2
=============================================
Reverse-engineered from the Motor Starters Course Guide (master reference).
All measurements, colors, fonts, and layout are extracted from that PDF.

Usage:
    import aye_template as T

    config = {
        'title'    : 'DOCUMENT TITLE',      # shown large on cover cyan band
        'subtitle' : 'Course subtitle...',   # shown below cyan band
        'doc_short': 'Short Doc Name',       # shown in page header (right side)
        'topics'   : ['Topic 1', 'Topic 2'], # cover topics-covered list
        'edition'  : '2025',
        'author'   : 'AYE Tech Hub Engineering Team',
        'subject'  : 'engineering guide ...',
    }
    story = [PageBreak()]   # first element must be PageBreak to skip cover
    story += T.toc_section([('01','Chapter One'), ('02','Chapter Two'), ...])
    story += T.chapter(1, 'Chapter One Title', [...flowables...])
    T.build_pdf('output.pdf', story, config)
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, Flowable, KeepTogether, HRFlowable,
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY

# ═══════════════════════════════════════════════════════════════════════════════
#  PAGE GEOMETRY  (exact measurements from Motor Starters master template)
# ═══════════════════════════════════════════════════════════════════════════════
W, H = A4          # 595.28 × 841.89 pt  (A4)
LM   = 77          # left margin (pt) — from motor starters analysis: text at x=77
RM   = 78          # right margin
TM   = 52          # top margin — clears 40pt header bar + 12pt breathing room
BM   = 38          # bottom margin — clears footer text at y≈22
CW   = W - LM - RM  # usable content width ≈ 440 pt


# ═══════════════════════════════════════════════════════════════════════════════
#  EXACT COLOR PALETTE  (extracted from motor-starters-guide.pdf via PyMuPDF)
# ═══════════════════════════════════════════════════════════════════════════════
#  Motor starters BG fill:  (0.039, 0.145, 0.251) → RGB(10, 37, 64)
NAVY      = HexColor('#0A2540')   # primary — header bar, ch numbers, table header
#  Cyan accent: (0.0, 0.722, 0.831) → RGB(0, 184, 212)
CYAN      = HexColor('#00B8D4')   # accent — lines, section hdrs, bullets, logo
#  Medium navy box: (0.102, 0.227, 0.361) → RGB(26, 58, 92)
NAVY2     = HexColor('#1A3A5C')   # secondary — topics box on cover, info boxes
#  Body text: #1A202C (very dark gray — from text color analysis)
DARK_TXT  = HexColor('#1A202C')   # primary body text
#  Footer / caption gray: #4A5568
GRAY_TXT  = HexColor('#4A5568')   # captions, footer tagline, secondary text
#  Table alt row: (0.961, 0.969, 0.980) → RGB(245, 247, 250)
ALT_ROW   = HexColor('#F5F7FA')   # alternating table row
#  Note/callout box: (1.0, 0.973, 0.882) → RGB(255, 248, 225)
NOTE_BG   = HexColor('#FFF8E1')   # yellow callout background
#  Table border color
TBL_LINE  = HexColor('#CBD5E0')   # table grid lines

# Font names (standard built-in PDF fonts — no embedding needed)
FONT  = 'Helvetica'
FONTB = 'Helvetica-Bold'
FONTI = 'Helvetica-Oblique'
FONTBI= 'Helvetica-BoldOblique'


# ═══════════════════════════════════════════════════════════════════════════════
#  PARAGRAPH STYLES  (match Motor Starters typography exactly)
# ═══════════════════════════════════════════════════════════════════════════════
def _ps(name, **kw):
    return ParagraphStyle(name, **kw)

# Chapter heading label (drawn as Flowable, not Paragraph — see ChapterHeader)
# Section header: 12pt Helvetica-Bold, CYAN — from page 5 analysis
STYLE_SECTION = _ps('section',
    fontName=FONTB, fontSize=12, textColor=CYAN,
    spaceAfter=4, spaceBefore=10, leading=16)

# Body text: 10pt Helvetica, #1A202C, justified — from body analysis
STYLE_BODY = _ps('body',
    fontName=FONT, fontSize=10, textColor=DARK_TXT,
    leading=15, spaceAfter=5, spaceBefore=0, alignment=TA_JUSTIFY)

STYLE_BODY_L = _ps('body_l',
    fontName=FONT, fontSize=10, textColor=DARK_TXT,
    leading=15, spaceAfter=4, spaceBefore=0)

# Bullet text: same as body but with indent for hanging bullet
STYLE_BULLET = _ps('bullet',
    fontName=FONT, fontSize=10, textColor=DARK_TXT,
    leading=15, spaceAfter=3, spaceBefore=0,
    leftIndent=16, firstLineIndent=-14)

# TOC entries
STYLE_TOC_NUM = _ps('toc_num',
    fontName=FONTB, fontSize=11, textColor=NAVY,
    leading=20, spaceAfter=0)
STYLE_TOC_TIT = _ps('toc_tit',
    fontName=FONT, fontSize=11, textColor=DARK_TXT,
    leading=20, spaceAfter=0)

# Table header cell
STYLE_TH = _ps('th',
    fontName=FONTB, fontSize=10, textColor=white,
    leading=14, alignment=TA_CENTER)

# Table body — first col (category label) is bold navy
STYLE_TC_KEY = _ps('tc_key',
    fontName=FONTB, fontSize=10, textColor=NAVY, leading=14)
STYLE_TC_VAL = _ps('tc_val',
    fontName=FONT,  fontSize=10, textColor=DARK_TXT, leading=14)

# Note box styles
STYLE_NOTE_HDR = _ps('note_hdr',
    fontName=FONTB, fontSize=10, textColor=NAVY, leading=14)
STYLE_NOTE_TXT = _ps('note_txt',
    fontName=FONT,  fontSize=10, textColor=NAVY, leading=14, spaceAfter=0)

# Caption / figure label
STYLE_CAPTION = _ps('caption',
    fontName=FONTI, fontSize=9, textColor=GRAY_TXT,
    leading=12, spaceAfter=4, alignment=TA_CENTER)


# ═══════════════════════════════════════════════════════════════════════════════
#  FLOWABLE HELPERS
# ═══════════════════════════════════════════════════════════════════════════════

def SP(pt=6):
    """Vertical spacer in points."""
    return Spacer(1, pt)

def P(txt, style=None):
    """Paragraph with default body style."""
    return Paragraph(txt, style or STYLE_BODY)

def PL(txt):
    return Paragraph(txt, STYLE_BODY_L)

def SEC(txt):
    """Section header — 12pt Helvetica-Bold cyan."""
    return Paragraph(txt, STYLE_SECTION)

def bullet(txt):
    """
    Bullet point — cyan filled square prefix, matching motor starters style.
    ZapfDingbats bullet in CYAN + regular text.
    """
    return Paragraph(
        f'<font face="ZapfDingbats" color="#00B8D4" size="8">n</font>'
        f'  {txt}',
        STYLE_BULLET,
    )

def caption(txt):
    return Paragraph(txt, STYLE_CAPTION)


# ═══════════════════════════════════════════════════════════════════════════════
#  TABLE BUILDER  (exact motor starters style)
# ═══════════════════════════════════════════════════════════════════════════════

def make_table(data, col_widths, first_col_key=True):
    """
    Build a styled table matching Motor Starters:
    - NAVY header row with white bold text
    - Alternating white / ALT_ROW body rows
    - First body column in FONTB NAVY if first_col_key=True
    - Thin TBL_LINE grid borders
    """
    rows = []
    for r_idx, row in enumerate(data):
        styled_row = []
        for c_idx, cell in enumerate(row):
            if r_idx == 0:
                styled_row.append(Paragraph(str(cell), STYLE_TH))
            elif c_idx == 0 and first_col_key:
                styled_row.append(Paragraph(str(cell), STYLE_TC_KEY))
            else:
                styled_row.append(Paragraph(str(cell), STYLE_TC_VAL))
        rows.append(styled_row)

    ts = TableStyle([
        # Header
        ('BACKGROUND',    (0, 0), (-1,  0), NAVY),
        ('TEXTCOLOR',     (0, 0), (-1,  0), white),
        ('FONTNAME',      (0, 0), (-1,  0), FONTB),
        # Body rows
        ('FONTNAME',      (0, 1), (-1, -1), FONT),
        ('FONTSIZE',      (0, 0), (-1, -1), 10),
        # Padding
        ('TOPPADDING',    (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING',   (0, 0), (-1, -1), 8),
        ('RIGHTPADDING',  (0, 0), (-1, -1), 6),
        # Alignment
        ('VALIGN',        (0, 0), (-1, -1), 'MIDDLE'),
        # Grid
        ('GRID',          (0, 0), (-1, -1), 0.4, TBL_LINE),
        ('LINEBELOW',     (0, 0), (-1,  0), 1.0, NAVY),
    ])
    # Alternating row backgrounds
    for i in range(1, len(rows)):
        bg = white if i % 2 == 1 else ALT_ROW
        ts.add('BACKGROUND', (0, i), (-1, i), bg)

    return Table(rows, colWidths=col_widths,
                 style=ts, repeatRows=1, hAlign='LEFT')


# ═══════════════════════════════════════════════════════════════════════════════
#  NOTE / CALLOUT BOX  (yellow — motor starters style)
# ═══════════════════════════════════════════════════════════════════════════════

def note_box(heading, body_lines):
    """
    Yellow callout box (NOTE_BG) with cyan left accent bar.
    heading: string — bold heading inside box
    body_lines: list of strings — each shown as a line inside the box
    """
    head_cell = Paragraph(f'<b>&#9632; {heading}</b>', STYLE_NOTE_HDR)
    body_paras = [Paragraph(line, STYLE_NOTE_TXT) for line in body_lines]
    content_cell = [head_cell] + body_paras

    # Build as a single-column table so ReportLab handles text wrapping
    inner = [[item] for item in content_cell]
    inner_t = Table(inner, colWidths=[CW - 18])
    inner_t.setStyle(TableStyle([
        ('BACKGROUND',    (0, 0), (-1, -1), NOTE_BG),
        ('TOPPADDING',    (0, 0), (-1, -1), 2),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2),
        ('LEFTPADDING',   (0, 0), (-1, -1), 4),
        ('RIGHTPADDING',  (0, 0), (-1, -1), 6),
    ]))

    # Wrap in outer table to get left cyan border
    outer = Table([[inner_t]], colWidths=[CW])
    outer.setStyle(TableStyle([
        ('BACKGROUND',    (0, 0), (-1, -1), NOTE_BG),
        ('TOPPADDING',    (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING',   (0, 0), (-1, -1), 14),
        ('RIGHTPADDING',  (0, 0), (-1, -1), 0),
        ('LINEBEFORE',    (0, 0), (0, -1),  4, CYAN),
    ]))
    return outer


# ═══════════════════════════════════════════════════════════════════════════════
#  INFO BOX  (dark navy — for key facts / summaries)
# ═══════════════════════════════════════════════════════════════════════════════

def info_box(heading, lines):
    """
    Dark navy info box with white text.
    lines: list of strings
    """
    head_p = Paragraph(
        f'<font color="#00B8D4"><b>{heading}</b></font>',
        _ps('ib_h', fontName=FONTB, fontSize=11, textColor=CYAN, leading=15)
    )
    line_style = _ps('ib_l', fontName=FONT, fontSize=10,
                     textColor=white, leading=15)
    body_ps = [Paragraph(ln, line_style) for ln in lines]

    rows = [[head_p]] + [[p] for p in body_ps]
    t = Table(rows, colWidths=[CW])
    t.setStyle(TableStyle([
        ('BACKGROUND',    (0, 0), (-1, -1), NAVY2),
        ('TOPPADDING',    (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING',   (0, 0), (-1, -1), 14),
        ('RIGHTPADDING',  (0, 0), (-1, -1), 10),
        ('TOPPADDING',    (0, 0), (0,  0),  10),
        ('BOTTOMPADDING', (0,-1), (-1,-1),  10),
        ('LINEBEFORE',    (0, 0), (0, -1),  4, CYAN),
    ]))
    return t


# ═══════════════════════════════════════════════════════════════════════════════
#  CHAPTER HEADER FLOWABLE  (motor starters chapter heading style)
# ═══════════════════════════════════════════════════════════════════════════════

class ChapterHeader(Flowable):
    """
    Chapter heading bar — exactly matching Motor Starters layout:
    Left: 22pt Helvetica-Bold CYAN chapter number (zero-padded)
    Right: 15pt Helvetica-Bold NAVY chapter title
    Underline: 0.5pt CYAN rule the full content width
    """
    def __init__(self, num, title):
        super().__init__()
        self.num   = f'{int(num):02d}' if str(num).isdigit() else str(num)
        self.title = title

    def wrap(self, aw, ah):
        self._aw = aw
        return aw, 40   # height matches motor starters ch heading

    def draw(self):
        c = self.canv
        c.saveState()
        # Chapter number (CYAN, 22pt bold)
        c.setFillColor(CYAN)
        c.setFont(FONTB, 22)
        c.drawString(0, 10, self.num)
        # Chapter title (NAVY, 15pt bold) — offset right by ~42pt
        c.setFillColor(NAVY)
        c.setFont(FONTB, 15)
        c.drawString(46, 12, self.title)
        # Underline rule
        c.setStrokeColor(CYAN)
        c.setLineWidth(0.6)
        c.line(0, 4, self._aw, 4)
        c.restoreState()


# ═══════════════════════════════════════════════════════════════════════════════
#  TOC SECTION BUILDER
# ═══════════════════════════════════════════════════════════════════════════════

def toc_section(chapters):
    """
    Build a Table of Contents section.
    chapters: list of (num_str, title_str) tuples
    Returns a list of flowables.
    """
    fl = []
    fl.append(Paragraph('TABLE OF CONTENTS', _ps('toc_main',
        fontName=FONTB, fontSize=20, textColor=NAVY,
        spaceAfter=12, spaceBefore=0, leading=24)))
    fl.append(HRFlowable(width=CW, thickness=1.5, color=CYAN, spaceAfter=10))

    for num, title in chapters:
        num_str = f'{int(num):02d}' if str(num).isdigit() else str(num)
        row = [[
            Paragraph(f'<font color="#0A2540"><b>{num_str}</b></font>', STYLE_TOC_NUM),
            Paragraph(title, STYLE_TOC_TIT),
        ]]
        t = Table(row, colWidths=[42, CW - 42])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), white),
            ('VALIGN',     (0, 0), (-1, -1), 'MIDDLE'),
            ('TOPPADDING', (0, 0), (-1, -1), 2),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 2),
            ('LEFTPADDING',   (0, 0), (-1, -1), 0),
        ]))
        fl.append(t)

    return fl


# ═══════════════════════════════════════════════════════════════════════════════
#  CHAPTER WRAPPER  (adds chapter header + forces new page)
# ═══════════════════════════════════════════════════════════════════════════════

def chapter(num, title, flowables):
    """
    Wraps chapter content: chapter header + content + page break.
    Returns a list of flowables.
    """
    return [
        ChapterHeader(num, title),
        SP(8),
    ] + flowables + [PageBreak()]


# ═══════════════════════════════════════════════════════════════════════════════
#  COVER PAGE  (drawn via canvas — exact motor starters layout)
# ═══════════════════════════════════════════════════════════════════════════════

def _draw_cover(canv, doc):
    cfg       = getattr(doc, '_aye_cfg', {})
    title     = cfg.get('title',    'DOCUMENT TITLE').upper()
    subtitle  = cfg.get('subtitle', '')
    topics    = cfg.get('topics',   [])
    edition   = cfg.get('edition',  '2025')

    canv.saveState()

    # ── 1. FULL DARK NAVY BACKGROUND ─────────────────────────────────────────
    canv.setFillColor(NAVY)
    canv.rect(0, 0, W, H, fill=1, stroke=0)

    # ── 2. CYAN MIDDLE BAND  (y_pdf=379, h=126 → RL y=337, h=126) ───────────
    canv.setFillColor(CYAN)
    canv.rect(0, 337, W, 126, fill=1, stroke=0)

    # ── 3. AYE LOGO BOX  (white square, cyan outline, centered at top) ───────
    #    Motor starters: x=252, y_pdf=140, 91×91 → RL (252, 611, 91, 91)
    canv.setFillColor(white)
    canv.rect(252, 611, 91, 91, fill=1, stroke=0)
    canv.setStrokeColor(CYAN)
    canv.setLineWidth(2)
    canv.rect(252, 611, 91, 91, fill=0, stroke=1)
    # "AYE" inside box
    canv.setFillColor(NAVY)
    canv.setFont(FONTB, 26)
    canv.drawCentredString(297, 636, 'AYE')

    # ── 4. "AYE TECH HUB" HEADING  ───────────────────────────────────────────
    #    Motor starters: 28pt, y_pdf=229 → RL baseline ≈ 591
    canv.setFillColor(white)
    canv.setFont(FONTB, 28)
    canv.drawCentredString(W / 2, 591, 'AYE TECH HUB')

    # ── 5. TAGLINE  ───────────────────────────────────────────────────────────
    canv.setFillColor(CYAN)
    canv.setFont(FONTI, 12)
    canv.drawCentredString(W / 2, 568, 'Engineering. Knowledge. Innovation.')

    # ── 6. DOCUMENT TITLE  (inside cyan band, NAVY text) ─────────────────────
    #    Band occupies RL 337-463. Center ≈ 400.
    words  = title.split()
    # Measure how many words fit on one line at 30pt
    from reportlab.pdfbase.pdfmetrics import stringWidth
    line1, line2 = [], []
    cur_line = []
    for w in words:
        cur_line.append(w)
        if stringWidth(' '.join(cur_line), FONTB, 30) > CW - 20:
            cur_line.pop()
            if not line1:
                line1 = cur_line[:]
                cur_line = [w]
            else:
                line2 = cur_line[:]
                cur_line = [w]
    # remaining words go to whichever line is empty
    if not line1:
        line1 = cur_line
    elif not line2:
        line2 = cur_line
    else:
        line2 += cur_line

    canv.setFillColor(NAVY)
    canv.setFont(FONTB, 30)
    if line2:
        canv.drawCentredString(W / 2, 425, ' '.join(line1))
        canv.drawCentredString(W / 2, 388, ' '.join(line2))
    else:
        canv.drawCentredString(W / 2, 407, ' '.join(line1))

    # ── 7. SUBTITLE  (just below cyan band) ──────────────────────────────────
    if subtitle:
        canv.setFillColor(white)
        canv.setFont(FONTI, 12)
        canv.drawCentredString(W / 2, 318, subtitle)

    # ── 8. TOPICS COVERED BOX  ───────────────────────────────────────────────
    #    Motor starters: x=71, y_pdf=587, 454×142 → RL (71, 113, 454, 207)
    box_x, box_y, box_w, box_h = 71, 85, 454, 215
    canv.setFillColor(NAVY2)
    canv.rect(box_x, box_y, box_w, box_h, fill=1, stroke=0)
    # Cyan left accent bar
    canv.setFillColor(CYAN)
    canv.rect(box_x, box_y, 4, box_h, fill=1, stroke=0)
    # "TOPICS COVERED" heading
    canv.setFillColor(CYAN)
    canv.setFont(FONTB, 11)
    canv.drawString(box_x + 14, box_y + box_h - 22, 'TOPICS COVERED')
    # Underline
    canv.setStrokeColor(CYAN)
    canv.setLineWidth(0.5)
    canv.line(box_x + 14, box_y + box_h - 26,
              box_x + 180, box_y + box_h - 26)
    # Topics in two columns
    if topics:
        canv.setFillColor(white)
        canv.setFont(FONT, 9.5)
        mid  = (len(topics) + 1) // 2
        col1 = topics[:mid]
        col2 = topics[mid:]
        for i, t in enumerate(col1):
            canv.setFillColor(CYAN)
            canv.rect(box_x + 16, box_y + box_h - 44 - i * 19 + 3,
                      6, 6, fill=1, stroke=0)
            canv.setFillColor(white)
            canv.drawString(box_x + 28, box_y + box_h - 44 - i * 19, t)
        for i, t in enumerate(col2):
            canv.setFillColor(CYAN)
            canv.rect(box_x + 230, box_y + box_h - 44 - i * 19 + 3,
                      6, 6, fill=1, stroke=0)
            canv.setFillColor(white)
            canv.drawString(box_x + 242, box_y + box_h - 44 - i * 19, t)

    # ── 9. CYAN FOOTER BAR  ───────────────────────────────────────────────────
    canv.setFillColor(CYAN)
    canv.rect(0, 0, W, 42, fill=1, stroke=0)
    canv.setFillColor(NAVY)
    canv.setFont(FONTB, 9)
    canv.drawString(LM, 15, 'ayetechub.com')
    canv.setFont(FONTI, 9)
    canv.drawCentredString(W / 2, 15, 'Engineering. Knowledge. Innovation.')
    canv.setFont(FONTB, 9)
    canv.drawRightString(W - RM, 15, f'© {edition} AYE Tech Hub')

    canv.restoreState()


# ═══════════════════════════════════════════════════════════════════════════════
#  CONTENT PAGE HEADER + FOOTER  (motor starters style)
# ═══════════════════════════════════════════════════════════════════════════════

def _draw_page(canv, doc):
    cfg       = getattr(doc, '_aye_cfg', {})
    doc_short = cfg.get('doc_short', 'AYE Tech Hub')

    canv.saveState()

    # ── HEADER BAR ────────────────────────────────────────────────────────────
    # Dark navy strip — motor starters: Rect 0,0 595×40 (PDF top-left)
    # In RL: (0, H-40, W, 40)
    canv.setFillColor(NAVY)
    canv.rect(0, H - 40, W, 40, fill=1, stroke=0)

    # Cyan-bordered AYE logo box (no fill) — Motor starters: x=33, y_pdf=10, 20×20
    # RL: (33, H-30, 20, 20)
    canv.setStrokeColor(CYAN)
    canv.setLineWidth(1.2)
    canv.rect(33, H - 30, 20, 20, fill=0, stroke=1)
    canv.setFillColor(white)
    canv.setFont(FONTB, 7.5)
    canv.drawCentredString(43, H - 23, 'AYE')

    # "AYE TECH HUB" — Motor starters: 12pt bold white, x=65, y_pdf=8 → RL baseline≈H-28
    canv.setFillColor(white)
    canv.setFont(FONTB, 12)
    canv.drawString(60, H - 28, 'AYE TECH HUB')

    # Document short name (right, CYAN italic) — motor starters: x=65, y_pdf=21
    canv.setFillColor(CYAN)
    canv.setFont(FONTI, 8)
    canv.drawRightString(W - 34, H - 22, doc_short)

    # ── FOOTER ────────────────────────────────────────────────────────────────
    # Motor starters footer: y_pdf=812 → RL y ≈ 22 (with 8pt font, baseline)
    # "ayetechub.com" left — 8pt bold NAVY
    canv.setFillColor(NAVY)
    canv.setFont(FONTB, 8)
    canv.drawString(LM, 22, 'ayetechub.com')

    # "Engineering. Knowledge. Innovation." center — 8pt italic gray
    canv.setFillColor(GRAY_TXT)
    canv.setFont(FONTI, 8)
    canv.drawCentredString(W / 2, 22, 'Engineering. Knowledge. Innovation.')

    # "Page N" right — 8pt bold NAVY
    canv.setFillColor(NAVY)
    canv.setFont(FONTB, 8)
    canv.drawRightString(W - RM, 22, f'Page {doc.page}')

    # Copyright micro-text — 6pt, gray, very bottom
    canv.setFillColor(GRAY_TXT)
    canv.setFont(FONT, 6)
    canv.drawCentredString(W / 2, 9, '© AYE Tech Hub  ·  awetgknway@gmail.com')

    canv.restoreState()


# ═══════════════════════════════════════════════════════════════════════════════
#  MAIN BUILD FUNCTION
# ═══════════════════════════════════════════════════════════════════════════════

def build_pdf(out_path, story, config):
    """
    Build a PDF using the AYE Tech Hub master template.

    Parameters
    ----------
    out_path : str   — absolute or relative path for the output .pdf
    story    : list  — list of ReportLab flowables; MUST start with PageBreak()
    config   : dict  — document configuration:
        title     : str   — cover title (e.g. 'MOTOR STARTERS')
        subtitle  : str   — cover subtitle (e.g. 'A Complete Engineering Course Guide')
        doc_short : str   — short name shown in page header right side
        topics    : list  — list of topic strings for cover topics box
        edition   : str   — year string, e.g. '2025'
        author    : str   — PDF metadata author
        subject   : str   — PDF metadata subject

    Returns
    -------
    (pages, size_kb) : tuple
    """
    doc = SimpleDocTemplate(
        out_path,
        pagesize=A4,
        leftMargin=LM,
        rightMargin=RM,
        topMargin=TM,
        bottomMargin=BM,
        title=config.get('title', ''),
        author=config.get('author', 'AYE Tech Hub'),
        subject=config.get('subject', ''),
        creator='AYE Tech Hub PDF Engine v2.0',
    )
    doc._aye_cfg = config  # attach config for canvas callbacks

    doc.build(story, onFirstPage=_draw_cover, onLaterPages=_draw_page)

    size = os.path.getsize(out_path) / 1024
    import builtins
    builtins.print(f'[AYE Template v2] {out_path}  ({size:.0f} KB, {doc.page} pages)')
    return doc.page, size
