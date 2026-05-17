#!/usr/bin/env python3
"""AYE Tech Hub — Electrical Safety Handbook generator."""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer,
    Table, TableStyle, PageBreak, KeepTogether)
from reportlab.platypus.flowables import Flowable
from reportlab.graphics.shapes import Drawing, Rect, Line, String, Circle, PolyLine
from reportlab.graphics import renderPDF

PW, PH = A4
M  = 18 * mm
CW = PW - 2 * M

BG   = HexColor('#020817'); BG2  = HexColor('#0a1628')
BG3  = HexColor('#0d1f3c'); BG4  = HexColor('#1e293b')
CYAN = HexColor('#00d4ff'); CYA2 = HexColor('#00a8cc')
WHT  = HexColor('#ffffff'); GR1  = HexColor('#e2e8f0')
GR2  = HexColor('#94a3b8'); GR3  = HexColor('#475569')
GR4  = HexColor('#1e293b'); GRN  = HexColor('#22c55e')
YEL  = HexColor('#eab308'); RED  = HexColor('#ef4444')
ORG  = HexColor('#f97316'); PRP  = HexColor('#a78bfa')

FOOTER = "AYE Tech Hub — Engineering the Future"
DOC_TITLE = "Electrical Safety Handbook"
AUTHOR = "Awet G. Nway"


def draw_cover(canv, doc):
    canv.setFillColor(BG); canv.rect(0, 0, PW, PH, fill=1, stroke=0)
    canv.setFillColor(HexColor('#1a0a00'))
    canv.rect(0, PH-220, PW, 220, fill=1, stroke=0)
    canv.saveState()
    canv.setStrokeColor(HexColor('#eab30815')); canv.setLineWidth(0.8)
    for i in range(-100, int(PW)+200, 28): canv.line(i, PH, i-200, PH-220)
    canv.restoreState()
    canv.setFillColor(YEL); canv.rect(0, PH-5, PW, 5, fill=1, stroke=0)
    # logo
    canv.setFillColor(BG2); canv.roundRect(M, PH-95, 88, 55, 7, fill=1, stroke=0)
    canv.setStrokeColor(YEL); canv.setLineWidth(1.5)
    canv.roundRect(M, PH-95, 88, 55, 7, fill=0, stroke=1)
    canv.setFillColor(YEL); canv.setFont('Helvetica-Bold', 26)
    canv.drawCentredString(M+44, PH-72, 'AYE')
    canv.setFillColor(GR2); canv.setFont('Helvetica', 7.5)
    canv.drawCentredString(M+44, PH-86, 'TECH HUB')
    # badge
    canv.setFillColor(HexColor('#eab30820'))
    canv.setStrokeColor(YEL); canv.setLineWidth(1)
    canv.roundRect(PW-M-130, PH-92, 130, 30, 6, fill=1, stroke=1)
    canv.setFillColor(YEL); canv.setFont('Helvetica-Bold', 8.5)
    canv.drawCentredString(PW-M-65, PH-74, 'ELECTRICAL SAFETY')
    canv.setFillColor(GR2); canv.setFont('Helvetica', 7)
    canv.drawCentredString(PW-M-65, PH-85, 'ENGINEERING HANDBOOK')
    # lightning bolt decorative icon
    canv.setFillColor(HexColor('#eab30830'))
    canv.setFont('Helvetica-Bold', 120)
    canv.drawString(PW-M-110, PH-210, '⚡')
    # title
    canv.setFillColor(WHT); canv.setFont('Helvetica-Bold', 34)
    canv.drawString(M, PH-158, 'Electrical Safety')
    canv.setFillColor(YEL); canv.setFont('Helvetica-Bold', 34)
    canv.drawString(M, PH-198, 'Handbook')
    # subtitle
    canv.setFillColor(GR1); canv.setFont('Helvetica', 12)
    canv.drawString(M, PH-228, 'LOTO Procedures  ·  Arc Flash Protection  ·  NEC/IEC Standards')
    canv.drawString(M, PH-246, 'PPE Selection  ·  Safe Work Practices  ·  Incident Prevention')
    # divider
    canv.setStrokeColor(YEL); canv.setLineWidth(1.5)
    canv.line(M, PH-263, PW-M, PH-263)
    # stats
    stats = [('10','CHAPTERS'),('50+','STANDARDS'),('20+','PROCEDURES'),('FREE','ACCESS')]
    sw = CW/4
    for i,(n,l) in enumerate(stats):
        x = M+i*sw+sw/2
        canv.setFillColor(YEL); canv.setFont('Helvetica-Bold', 22)
        canv.drawCentredString(x, PH-290, n)
        canv.setFillColor(GR2); canv.setFont('Helvetica', 7.5)
        canv.drawCentredString(x, PH-304, l)
    # warning panel
    py = PH-540; ph2 = 175
    canv.setFillColor(BG2); canv.roundRect(M, py, CW, ph2, 8, fill=1, stroke=0)
    canv.setStrokeColor(YEL); canv.setLineWidth(1)
    canv.roundRect(M, py, CW, ph2, 8, fill=0, stroke=1)
    # Arc flash warning triangle visual
    cx2 = M + CW/2; ty = py + ph2 - 25
    # triangle
    pts = [cx2, ty, cx2-50, ty-80, cx2+50, ty-80]
    canv.setFillColor(YEL)
    canv.setStrokeColor(BG2); canv.setLineWidth(2)
    p = canv.beginPath()
    p.moveTo(cx2, ty); p.lineTo(cx2-55, ty-90); p.lineTo(cx2+55, ty-90); p.close()
    canv.drawPath(p, fill=1, stroke=0)
    canv.setFillColor(BG); canv.setFont('Helvetica-Bold', 36)
    canv.drawCentredString(cx2, ty-70, '!')
    # Warning text
    canv.setFillColor(YEL); canv.setFont('Helvetica-Bold', 13)
    canv.drawCentredString(cx2, ty-108, 'DANGER — ARC FLASH HAZARD')
    canv.setFillColor(GR1); canv.setFont('Helvetica', 9.5)
    canv.drawCentredString(cx2, ty-124, 'Unauthorized persons must not approach energized equipment')
    canv.drawCentredString(cx2, ty-138, 'without proper PPE and authorized Work Permit')
    canv.setFillColor(RED); canv.setFont('Helvetica-Bold', 8)
    canv.drawCentredString(cx2, py+15, 'NFPA 70E  ·  IEC 60479  ·  OSHA 29 CFR 1910.333')
    # author
    ay = py-50
    canv.setFillColor(BG3); canv.roundRect(M, ay, CW, 40, 6, fill=1, stroke=0)
    canv.setFillColor(YEL); canv.setFont('Helvetica-Bold', 11)
    canv.drawString(M+15, ay+24, AUTHOR)
    canv.setFillColor(GR2); canv.setFont('Helvetica', 8.5)
    canv.drawString(M+15, ay+10, 'Founder, AYE Tech Hub  |  Electrical Engineering & Safety Expert')
    canv.setFillColor(GRN); canv.roundRect(PW-M-90, ay+7, 80, 26, 4, fill=1, stroke=0)
    canv.setFillColor(WHT); canv.setFont('Helvetica-Bold', 10)
    canv.drawCentredString(PW-M-50, ay+22, 'FREE')
    canv.setFont('Helvetica', 6.5)
    canv.drawCentredString(PW-M-50, ay+10, 'OPEN ACCESS')
    canv.setFillColor(BG2); canv.rect(0, 0, PW, 26, fill=1, stroke=0)
    canv.setFillColor(YEL); canv.setFont('Helvetica-Bold', 8)
    canv.drawCentredString(PW/2, 15, FOOTER)
    canv.setFillColor(GR3); canv.setFont('Helvetica', 7)
    canv.drawString(M, 6, 'ayetechub.com')
    canv.drawRightString(PW-M, 6, '© 2026 AYE Tech Hub. All Rights Reserved.')


def draw_page(canv, doc):
    canv.setFillColor(BG); canv.rect(0, 0, PW, PH, fill=1, stroke=0)
    canv.setStrokeColor(YEL); canv.setLineWidth(1.5)
    canv.line(M, PH-12*mm, PW-M, PH-12*mm)
    canv.setFillColor(YEL); canv.setFont('Helvetica-Bold', 7)
    canv.drawString(M, PH-9*mm, 'AYE TECH HUB')
    canv.setFillColor(GR2); canv.setFont('Helvetica', 7)
    canv.drawRightString(PW-M, PH-9*mm, DOC_TITLE.upper())
    canv.setStrokeColor(GR4); canv.setLineWidth(0.5)
    canv.line(M, 11*mm, PW-M, 11*mm)
    canv.setFillColor(GR2); canv.setFont('Helvetica', 6.5)
    canv.drawString(M, 7.5*mm, FOOTER)
    canv.setFillColor(YEL); canv.setFont('Helvetica-Bold', 8)
    canv.drawRightString(PW-M, 7.5*mm, str(doc.page-1))


def S(name, **kw):
    defaults = dict(fontName='Helvetica', fontSize=9.5, textColor=GR1,
                    leading=14, spaceAfter=6)
    defaults.update(kw)
    return ParagraphStyle(name, **defaults)

st = {
    'h1': S('h1', fontName='Helvetica-Bold', fontSize=20, textColor=WHT, leading=24, spaceAfter=4),
    'h2': S('h2', fontName='Helvetica-Bold', fontSize=13, textColor=YEL, leading=17, spaceAfter=6, spaceBefore=14),
    'h3': S('h3', fontName='Helvetica-Bold', fontSize=10.5, textColor=WHT, leading=14, spaceAfter=5, spaceBefore=10),
    'body': S('body', spaceAfter=7, leading=14, alignment=TA_JUSTIFY),
    'bullet': S('bullet', leftIndent=14, spaceAfter=4, leading=13),
    'code': S('code', fontName='Courier', fontSize=8, textColor=YEL, backColor=BG2,
              leading=12, leftIndent=10, rightIndent=10, spaceAfter=8, spaceBefore=4),
    'caption': S('caption', fontSize=7.5, textColor=GR2, alignment=TA_CENTER, spaceAfter=10),
    'toc1': S('toc1', fontName='Helvetica-Bold', fontSize=10, textColor=WHT, leading=14, spaceAfter=3),
    'toc2': S('toc2', fontSize=9, textColor=GR2, leading=13, leftIndent=18, spaceAfter=2),
    'meta': S('meta', fontSize=8, textColor=GR2, leading=12),
    'label': S('label', fontName='Helvetica-Bold', fontSize=8.5, textColor=YEL, leading=12, spaceAfter=3),
    'warning': S('warning', fontName='Helvetica-Bold', fontSize=9.5, textColor=RED, leading=14, spaceAfter=6),
}


class Box(Flowable):
    def __init__(self, title, lines, color=YEL, icon='ℹ'):
        Flowable.__init__(self)
        self.title = title; self.lines = lines
        self.color = color; self.icon = icon; self.width = CW
    def wrap(self, aw, ah):
        self._h = 14 + 13*len(self.lines) + 10
        return self.width, self._h
    def draw(self):
        h = self._h
        self.canv.saveState()
        self.canv.setFillColor(BG3)
        self.canv.roundRect(0, 0, self.width, h, 4, fill=1, stroke=0)
        self.canv.setFillColor(self.color)
        self.canv.rect(0, 0, 4, h, fill=1, stroke=0)
        self.canv.setFont('Helvetica-Bold', 8.5)
        self.canv.drawString(14, h-12, f'{self.icon}  {self.title}')
        self.canv.setFillColor(GR1); self.canv.setFont('Helvetica', 8.5)
        for i, line in enumerate(self.lines):
            self.canv.drawString(14, h-12-13*(i+1), f'  {line}')
        self.canv.restoreState()


class ChHead(Flowable):
    def __init__(self, number, title, subtitle='', color=None):
        Flowable.__init__(self)
        self.number = number; self.title = title
        self.subtitle = subtitle; self.color = color or YEL; self.width = CW
    def wrap(self, aw, ah): return self.width, 56
    def draw(self):
        w = self.width
        self.canv.saveState()
        self.canv.setFillColor(BG3)
        self.canv.roundRect(0, 0, w, 56, 5, fill=1, stroke=0)
        self.canv.setStrokeColor(self.color); self.canv.setLineWidth(1)
        self.canv.roundRect(0, 0, w, 56, 5, fill=0, stroke=1)
        self.canv.setFillColor(self.color)
        self.canv.roundRect(10, 30, 68, 18, 4, fill=1, stroke=0)
        self.canv.setFillColor(BG); self.canv.setFont('Helvetica-Bold', 8)
        self.canv.drawCentredString(44, 36, f'CHAPTER {self.number}')
        self.canv.setFillColor(WHT); self.canv.setFont('Helvetica-Bold', 16)
        self.canv.drawString(10, 12, self.title)
        if self.subtitle:
            self.canv.setFillColor(GR2); self.canv.setFont('Helvetica', 8.5)
            self.canv.drawString(86, 36, self.subtitle)
        self.canv.restoreState()


class Divider(Flowable):
    def __init__(self, color=GR4, w=None):
        Flowable.__init__(self); self.color = color; self.w = w or CW
    def wrap(self, aw, ah): return self.w, 8
    def draw(self):
        self.canv.setStrokeColor(self.color); self.canv.setLineWidth(0.5)
        self.canv.line(0, 4, self.w, 4)


class DiagramWrap(Flowable):
    def __init__(self, drawing, caption=''):
        Flowable.__init__(self)
        self.d = drawing; self.caption = caption; self.width = CW
    def wrap(self, aw, ah):
        self._h = self.d.height + (14 if self.caption else 0) + 16
        return self.width, self._h
    def draw(self):
        self.canv.saveState()
        self.canv.setFillColor(BG3)
        self.canv.roundRect(0, 0, self.width, self._h, 5, fill=1, stroke=0)
        self.canv.setStrokeColor(GR4); self.canv.setLineWidth(0.5)
        self.canv.roundRect(0, 0, self.width, self._h, 5, fill=0, stroke=1)
        renderPDF.draw(self.d, self.canv, 8, 14 if self.caption else 8)
        if self.caption:
            self.canv.setFillColor(GR2); self.canv.setFont('Helvetica', 7)
            self.canv.drawCentredString(self.width/2, 4, self.caption)
        self.canv.restoreState()


def P(txt, style='body'): return Paragraph(txt, st[style])
def SP(n=1): return Spacer(1, n*mm)
def bullet(txt): return P(f'<bullet>•</bullet> {txt}', 'bullet')

def dark_table(data, col_widths):
    t = Table(data, colWidths=col_widths)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), BG3),
        ('TEXTCOLOR',  (0,0), (-1,0), YEL),
        ('FONTNAME',   (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE',   (0,0), (-1,0), 8.5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [BG2, BG4]),
        ('TEXTCOLOR',  (0,1), (-1,-1), GR1),
        ('FONTNAME',   (0,1), (-1,-1), 'Helvetica'),
        ('FONTSIZE',   (0,1), (-1,-1), 8.5),
        ('GRID',       (0,0), (-1,-1), 0.4, GR4),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING',  (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('VALIGN',     (0,0), (-1,-1), 'MIDDLE'),
        ('LINEBELOW',  (0,0), (-1,0), 1, YEL),
    ]))
    return t


# ── diagrams ──────────────────────────────────────────────────
def dia_loto_steps():
    dw, dh = CW-16, 95
    d = Drawing(dw, dh)
    steps = [
        ('1\nNOTIFY','Notify all\naffected persons', YEL),
        ('2\nSHUTDOWN','Shut down\nequipment', ORG),
        ('3\nISOLATE','Isolate all\nenergy sources', RED),
        ('4\nLOCKOUT','Apply lock\n& tag', GRN),
        ('5\nRELEASE','Release stored\nenergy (bleed)', CYAN),
        ('6\nVERIFY','Verify zero\nenergy state', PRP),
    ]
    sw = (dw-12) / len(steps)
    for i, (num, desc, c) in enumerate(steps):
        x = 6 + i*sw
        d.add(Rect(x, dh-75, sw-5, 60, rx=4, ry=4, fillColor=BG4,
                   strokeColor=c, strokeWidth=1.2))
        n_parts = num.split('\n')
        d.add(String(x+sw/2-2, dh-28, n_parts[0], textAnchor='middle',
                     fontSize=12, fillColor=c, fontName='Helvetica-Bold'))
        d.add(String(x+sw/2-2, dh-42, n_parts[1] if len(n_parts)>1 else '',
                     textAnchor='middle', fontSize=7, fillColor=c, fontName='Helvetica-Bold'))
        d_parts = desc.split('\n')
        d.add(String(x+sw/2-2, dh-58, d_parts[0], textAnchor='middle',
                     fontSize=6.5, fillColor=GR2))
        if len(d_parts)>1:
            d.add(String(x+sw/2-2, dh-68, d_parts[1], textAnchor='middle',
                         fontSize=6.5, fillColor=GR2))
        if i < len(steps)-1:
            ax = x+sw-3; ay = dh-45
            d.add(String(ax, ay-3, '▶', fontSize=7, fillColor=GR3))
    d.add(String(dw/2, 5, 'LOTO Sequence — OSHA 29 CFR 1910.147 / IEC 60204-1',
                 textAnchor='middle', fontSize=7, fillColor=GR2))
    return d


def dia_arc_flash():
    dw, dh = CW-16, 120
    d = Drawing(dw, dh)
    # Incident energy zones
    zones = [
        ('DANGER ZONE\nProhibited Approach', 0.10, RED, '< Limited Boundary'),
        ('ARC FLASH\nBOUNDARY', 0.35, ORG, 'PPE Required'),
        ('RESTRICTED\nAPPROACH', 0.60, YEL, 'Qualified Persons Only'),
        ('LIMITED\nAPPROACH', 0.85, GRN, 'Unqualified — Escort Required'),
    ]
    cx = dw/2; cy = dh/2 + 10
    for label, r_frac, c, sublabel in zones:
        r = (dw/2 - 10) * r_frac
        d.add(Circle(cx, cy, r, fillColor=None, strokeColor=c, strokeWidth=1.5))
    # center person icon
    d.add(Circle(cx, cy+12, 6, fillColor=CYAN, strokeColor=None))
    d.add(Line(cx, cy+6, cx, cy-14, strokeColor=CYAN, strokeWidth=2))
    d.add(Line(cx-10, cy, cx+10, cy, strokeColor=CYAN, strokeWidth=2))
    d.add(Line(cx, cy-14, cx-8, cy-28, strokeColor=CYAN, strokeWidth=2))
    d.add(Line(cx, cy-14, cx+8, cy-28, strokeColor=CYAN, strokeWidth=2))
    # labels
    labels = [
        (0.10, RED, 'Prohibited'), (0.35, ORG, 'Arc Flash Boundary'),
        (0.60, YEL, 'Restricted Approach'), (0.85, GRN, 'Limited Approach')
    ]
    for r_frac, c, lbl in labels:
        r = (dw/2 - 10) * r_frac
        d.add(String(cx + r - 5, cy + 4, lbl, fontSize=6.5, fillColor=c,
                     fontName='Helvetica-Bold'))
    d.add(String(dw/2, 6, 'Arc Flash Protection Boundaries — NFPA 70E 2024',
                 textAnchor='middle', fontSize=7, fillColor=GR2))
    return d


def dia_ppe_levels():
    dw, dh = CW-16, 110
    d = Drawing(dw, dh)
    ppe = [
        ('HRC 1','4 cal/cm²',GRN,'FR shirt, pants\nSafety glasses'),
        ('HRC 2','8 cal/cm²',YEL,'FR shirt+pants\nor coverall'),
        ('HRC 3','25 cal/cm²',ORG,'FR coverall+\narc flash suit'),
        ('HRC 4','40 cal/cm²',RED,'Multi-layer arc\nflash suit system'),
    ]
    bw = (dw-16)/4
    for i,(hrc,cal,c,equip) in enumerate(ppe):
        x = 8 + i*(bw+4)
        d.add(Rect(x, dh-85, bw, 72, rx=4, ry=4, fillColor=BG4,
                   strokeColor=c, strokeWidth=1.5))
        d.add(Rect(x, dh-22, bw, 9, fillColor=c, strokeColor=None))
        d.add(String(x+bw/2, dh-16, hrc, textAnchor='middle',
                     fontSize=8, fillColor=BG, fontName='Helvetica-Bold'))
        d.add(String(x+bw/2, dh-35, cal, textAnchor='middle',
                     fontSize=9, fillColor=c, fontName='Helvetica-Bold'))
        eq_parts = equip.split('\n')
        for j, ep in enumerate(eq_parts):
            d.add(String(x+bw/2, dh-52-j*13, ep, textAnchor='middle',
                         fontSize=6.5, fillColor=GR1))
    d.add(String(dw/2, 6, 'Arc Flash PPE Categories — NFPA 70E Table 130.5(G)',
                 textAnchor='middle', fontSize=7, fillColor=GR2))
    return d


def dia_grounding():
    dw, dh = CW-16, 100
    d = Drawing(dw, dh)
    # Source transformer
    d.add(Rect(10, dh-70, 60, 45, rx=4, ry=4, fillColor=BG4, strokeColor=YEL, strokeWidth=1.2))
    d.add(String(40, dh-40, 'XFMR', textAnchor='middle', fontSize=8, fillColor=YEL, fontName='Helvetica-Bold'))
    d.add(String(40, dh-55, '480V', textAnchor='middle', fontSize=7, fillColor=GR2))
    # panel
    d.add(Rect(dw/2-30, dh-70, 60, 45, rx=4, ry=4, fillColor=BG4, strokeColor=CYA2, strokeWidth=1.2))
    d.add(String(dw/2, dh-40, 'MCC', textAnchor='middle', fontSize=8, fillColor=CYA2, fontName='Helvetica-Bold'))
    d.add(String(dw/2, dh-55, 'PANEL', textAnchor='middle', fontSize=7, fillColor=GR2))
    # load
    d.add(Rect(dw-80, dh-70, 60, 45, rx=4, ry=4, fillColor=BG4, strokeColor=GRN, strokeWidth=1.2))
    d.add(String(dw-50, dh-40, 'MOTOR', textAnchor='middle', fontSize=8, fillColor=GRN, fontName='Helvetica-Bold'))
    d.add(String(dw-50, dh-55, '15 kW', textAnchor='middle', fontSize=7, fillColor=GR2))
    # phase conductors
    d.add(Line(70, dh-47, dw/2-30, dh-47, strokeColor=RED, strokeWidth=1.5))
    d.add(Line(70, dh-52, dw/2-30, dh-52, strokeColor=WHT, strokeWidth=1.5))
    d.add(Line(70, dh-57, dw/2-30, dh-57, strokeColor=BG2, strokeWidth=2.5))  # just visual
    d.add(String(dw/4, dh-43, 'L1 L2 L3', textAnchor='middle', fontSize=6.5, fillColor=GR2))
    d.add(Line(dw/2+30, dh-47, dw-80, dh-47, strokeColor=RED, strokeWidth=1.5))
    d.add(Line(dw/2+30, dh-52, dw-80, dh-52, strokeColor=WHT, strokeWidth=1.5))
    # ground conductor (green/yellow)
    d.add(Line(dw/2, dh-70, dw/2, dh-90, strokeColor=GRN, strokeWidth=2))
    d.add(Line(10+30, dh-90, dw-50, dh-90, strokeColor=GRN, strokeWidth=2))
    d.add(Line(10+30, dh-70, 10+30, dh-90, strokeColor=GRN, strokeWidth=2))
    d.add(Line(dw-50, dh-70, dw-50, dh-90, strokeColor=GRN, strokeWidth=2))
    # earth symbol
    for w,y in [(16,dh-92),(10,dh-96),(5,dh-100)]:
        d.add(Line(dw/2-w/2, y, dw/2+w/2, y, strokeColor=GRN, strokeWidth=1.5))
    d.add(String(dw/2, dh-90, 'PE (Protective Earth)', textAnchor='start',
                 fontSize=6.5, fillColor=GRN))
    d.add(String(dw/2, 6, 'Protective Earth Grounding System — IEC 60364 / NEC Article 250',
                 textAnchor='middle', fontSize=7, fillColor=GR2))
    return d


# ── content ───────────────────────────────────────────────────
def toc():
    chapters = [
        (1,'Fundamentals of Electrical Safety','3'),
        (2,'Hazard Identification & Risk Assessment','5'),
        (3,'Lockout/Tagout (LOTO) Procedures','7'),
        (4,'Arc Flash Protection','9'),
        (5,'Personal Protective Equipment (PPE)','11'),
        (6,'Electrical Grounding & Bonding','13'),
        (7,'Safe Work Practices & Permit Systems','15'),
        (8,'Emergency Response & First Aid','17'),
        (9,'Standards, Regulations & Compliance','19'),
        (10,'Incident Investigation & Prevention','21'),
        (0,'Quick Reference — Voltage/PPE/Distances','23'),
        (0,'References & Regulatory Resources','25'),
    ]
    e = [SP(4), P('TABLE OF CONTENTS','h1'), Divider(YEL), SP(3)]
    for num, title, pg in chapters:
        ch = f'Chapter {num} — ' if num else ''
        dots = '.' * max(2, 55-len(ch+title))
        e.append(P(f'<font color="#eab308"><b>{ch}</b></font>'
                   f'<font color="#e2e8f0">{title}</font>'
                   f'<font color="#475569">{dots}{pg}</font>', 'toc1'))
        e.append(SP(1))
    return e


def ch1():
    e = [ChHead('1','Fundamentals of Electrical Safety',
                'Voltage · Current · Resistance · Human Body Effects'), SP(3)]
    e.append(P('Electrical safety is not optional — it is the fundamental obligation of every engineer, '
               'technician, and worker who interacts with electrical systems. Each year, electrical '
               'hazards cause thousands of injuries, hundreds of fatalities, and billions in property '
               'damage globally. Understanding the physics of electrical hazards is the first step '
               'toward preventing incidents.', 'body'))
    e.append(P('Why Electricity is Dangerous', 'h2'))
    e.append(P('Electric current passing through the human body causes injury through three mechanisms:', 'body'))
    for item in [
        '<b>Electrocution (cardiac arrest):</b> As little as 50–100mA AC at 60Hz through the chest can cause ventricular fibrillation. This is why the "let-go threshold" (16mA AC) is a critical design parameter.',
        '<b>Electrical burns:</b> High current causes resistive heating of body tissues (I²R). Internal burns may not be visible externally but are often more severe than surface burns.',
        '<b>Arc flash injuries:</b> Electrical arcs can reach 35,000°F (19,400°C) — hotter than the sun\'s surface — causing severe burns, blast overpressure, and shrapnel injuries.',
    ]:
        e.append(bullet(item))
    e.append(SP(3))
    e.append(P('Current Effects on the Human Body', 'h2'))
    effects = [
        ['Current (AC, 60Hz)','Duration','Physiological Effect','Hazard Level'],
        ['0.5 – 2 mA','Any','Perception threshold — tingling sensation','Nuisance'],
        ['2 – 10 mA','Any','Pain, muscle contraction begins','Low Risk'],
        ['10 – 16 mA','Any','"Let-go threshold" — cannot release grip','DANGER'],
        ['16 – 50 mA','Any','Severe pain, respiratory difficulty','HIGH RISK'],
        ['50 – 100 mA','1–3 sec','Ventricular fibrillation (cardiac arrest)','POTENTIALLY FATAL'],
        ['100 – 200 mA','< 1 sec','Ventricular fibrillation, lung damage','FATAL'],
        ['> 200 mA','Any','Heart clamps, severe burns — may survive with CPR','CRITICAL'],
        ['> 1 A','Any','Severe tissue destruction, cardiac damage','ALMOST CERTAINLY FATAL'],
    ]
    cols = [CW*0.20, CW*0.14, CW*0.42, CW*0.24]
    e.append(dark_table(
        [[Paragraph(c, st['label'] if r==0 else st['body']) for c in row]
         for r,row in enumerate(effects)], cols))
    e.append(SP(3))
    e.append(Box('Critical Safety Insight', [
        'It is CURRENT, not voltage, that kills — but voltage determines current through body resistance.',
        'Dry skin resistance: 100,000 to 600,000 Ω. Wet/broken skin: as low as 1,000 Ω.',
        'At 240V with wet hands: I = 240/1000 = 240mA — easily FATAL.',
        'Even 50V DC can be fatal under the wrong conditions (wet skin, heart condition).',
    ], RED, '⚠'))
    e.append(SP(3))
    e.append(P('Voltage Classification (IEC 60038)', 'h3'))
    volt = [
        ['Classification','AC Voltage Range','DC Voltage Range','Typical Applications'],
        ['Extra Low Voltage (ELV)','< 50 V AC','< 120 V DC','Control circuits, instrumentation, SELV systems'],
        ['Low Voltage (LV)','50 V – 1,000 V AC','120 V – 1,500 V DC','Building wiring, motor controls, industrial panels'],
        ['Medium Voltage (MV)','1 kV – 35 kV','1.5 kV – 75 kV','Distribution networks, substations, wind turbines'],
        ['High Voltage (HV)','35 kV – 230 kV','>75 kV','Transmission lines, large power plants'],
        ['Extra High Voltage (EHV)','>230 kV','—','National grid interconnections'],
    ]
    cols2 = [CW*0.22, CW*0.18, CW*0.18, CW*0.42]
    e.append(dark_table(
        [[Paragraph(c, st['label'] if r==0 else st['body']) for c in row]
         for r,row in enumerate(volt)], cols2))
    return e


def ch2():
    e = [ChHead('2','Hazard Identification & Risk Assessment',
                'HAZID · Risk Matrix · Job Safety Analysis'), SP(3)]
    e.append(P('Systematic hazard identification is the foundation of any electrical safety management '
               'system. Before any work on or near electrical equipment, a formal risk assessment must '
               'identify all potential hazards, evaluate their risk level, and establish control measures '
               'using the Hierarchy of Controls.', 'body'))
    e.append(P('The Hierarchy of Controls', 'h2'))
    controls = [
        ('ELIMINATION','Remove the hazard entirely — most effective','#22c55e'),
        ('SUBSTITUTION','Replace with a less hazardous alternative','#4ade80'),
        ('ENGINEERING CONTROLS','Guards, interlocks, insulation, barriers','#eab308'),
        ('ADMINISTRATIVE CONTROLS','Procedures, training, permits, LOTO','#f97316'),
        ('PPE','Last resort — protect the worker','#ef4444'),
    ]
    ctrl_data = [['Control Level','Description','Effectiveness']]
    for lvl, desc, c in controls:
        ctrl_data.append([
            Paragraph(f'<font color="{c}"><b>{lvl}</b></font>', st['body']),
            Paragraph(desc, st['body']),
            Paragraph('■' * (5 - controls.index((lvl, desc, c))), st['body'])
        ])
    cols = [CW*0.28, CW*0.52, CW*0.20]
    e.append(dark_table(ctrl_data, cols))
    e.append(SP(3))
    e.append(P('Risk Assessment Matrix', 'h2'))
    e.append(P('Risk Level = Severity × Likelihood. All electrical work must be evaluated before proceeding:', 'body'))
    matrix = [
        ['Severity \\ Likelihood','Rare (1)','Unlikely (2)','Possible (3)','Likely (4)','Almost Certain (5)'],
        ['Catastrophic (5)','Medium','High','Critical','Critical','Critical'],
        ['Major (4)','Low','Medium','High','Critical','Critical'],
        ['Moderate (3)','Low','Medium','Medium','High','Critical'],
        ['Minor (2)','Negligible','Low','Medium','Medium','High'],
        ['Negligible (1)','Negligible','Negligible','Low','Low','Medium'],
    ]
    cols2 = [CW*0.22]+[CW*0.156]*5
    e.append(dark_table(
        [[Paragraph(c, st['label'] if r==0 else st['body']) for c in row]
         for r,row in enumerate(matrix)], cols2))
    e.append(SP(3))
    e.append(P('Job Safety Analysis (JSA) Steps', 'h3'))
    for item in [
        '<b>Step 1 — List job tasks:</b> Break the job into discrete sequential steps.',
        '<b>Step 2 — Identify hazards:</b> For each step, identify potential electrical, mechanical, and environmental hazards.',
        '<b>Step 3 — Assess risk level:</b> Apply the risk matrix to determine the risk level for each hazard.',
        '<b>Step 4 — Establish controls:</b> Select controls from the Hierarchy for each identified hazard.',
        '<b>Step 5 — Assign responsibility:</b> Designate responsible persons for each control measure.',
        '<b>Step 6 — Review and sign:</b> All workers performing the job must review and sign the JSA before starting.',
    ]:
        e.append(bullet(item))
    e.append(SP(3))
    e.append(Box('Always Remember', [
        'No electrical work is so urgent that it cannot be done safely.',
        'If in doubt — STOP. Consult a qualified engineer before proceeding.',
        'Complacency is the greatest safety hazard — most incidents happen to experienced workers.',
    ], RED, '🛑'))
    return e


def ch3():
    e = [ChHead('3','Lockout/Tagout (LOTO) Procedures',
                'Energy Isolation · OSHA 1910.147 · IEC 60204'), SP(3)]
    e.append(P('<b>Lockout/Tagout (LOTO)</b> is the most critical electrical safety procedure in '
               'industrial environments. It ensures that hazardous energy is isolated and cannot '
               'be re-energized while workers are performing maintenance or service. '
               'OSHA 29 CFR 1910.147 (The Control of Hazardous Energy) mandates LOTO programs '
               'for all facilities where workers may be exposed to hazardous energy.', 'body'))
    e.append(DiagramWrap(dia_loto_steps(),
        'Figure 3.1 — 6-Step LOTO Sequence per OSHA 29 CFR 1910.147'))
    e.append(SP(3))
    e.append(P('LOTO Step-by-Step Procedure', 'h2'))
    loto_steps = [
        ('1. Notify Affected Personnel',
         'Inform all affected workers that equipment will be locked out. Identify all energy sources.',
         YEL),
        ('2. Shut Down Equipment',
         'Follow the normal stopping procedure. Engage all stop buttons and controls.',
         ORG),
        ('3. Identify All Energy Sources',
         'Electrical (main + all secondary feeds), pneumatic, hydraulic, thermal, gravitational, chemical.',
         RED),
        ('4. Isolate Energy Sources',
         'Open all disconnect switches, close all isolation valves, block all gravity hazards.',
         RED),
        ('5. Apply Lockout Devices',
         'Each worker applies THEIR OWN padlock to each isolation point. Tags alone are NOT lockout.',
         RED),
        ('6. Release/Restrain Stored Energy',
         'Bleed pneumatic/hydraulic systems. Discharge capacitors. Block elevated loads.',
         ORG),
        ('7. Verify Zero Energy State',
         'Test with calibrated meter: confirm ZERO voltage at all work points before touching.',
         GRN),
    ]
    for title, desc, c in loto_steps:
        e.append(KeepTogether([Box(title, [desc], c, '→'), SP(2)]))
    e.append(P('LOTO Equipment Requirements', 'h3'))
    loto_eq = [
        ['Equipment','Standard Requirement','Notes'],
        ['Padlock','Individually keyed — each worker has their own','Never share keys during LOTO'],
        ['Hasp','Multi-lock hasp for group LOTO with multiple workers','All locks must be applied'],
        ['Tag','Durable, standardized warning tag attached to each lockout point','Tag supplements lock — never replaces it'],
        ['Lockout stations','Wall-mounted station with all LOTO devices','Keep fully stocked at all times'],
        ['Voltage tester','CAT III or CAT IV rated for voltage present','Must be tested before and after use'],
        ['LOTO log','Record each LOTO event: date, worker, equipment, energy sources','Required for OSHA compliance'],
    ]
    cols = [CW*0.18, CW*0.42, CW*0.40]
    e.append(dark_table(
        [[Paragraph(c, st['label'] if r==0 else st['body']) for c in row]
         for r,row in enumerate(loto_eq)], cols))
    return e


def ch4():
    e = [ChHead('4','Arc Flash Protection',
                'Incident Energy · Boundaries · PPE Selection'), SP(3)]
    e.append(P('An <b>arc flash</b> is an explosive electrical discharge through ionized air. '
               'Arc flash incidents release enormous amounts of thermal energy in milliseconds, '
               'with plasma temperatures reaching 35,000°F (19,400°C). A properly engineered '
               'arc flash protection program — per NFPA 70E and IEEE 1584 — determines the '
               'incident energy at working distance and prescribes the appropriate PPE.', 'body'))
    e.append(DiagramWrap(dia_arc_flash(),
        'Figure 4.1 — Arc Flash Protection Boundaries (NFPA 70E)'))
    e.append(SP(3))
    e.append(P('Arc Flash Boundary Definitions', 'h2'))
    boundaries = [
        ['Boundary','Definition','Who May Cross','Action Required'],
        ['Limited Approach Boundary','Shock hazard — energized conductor nearby','Qualified & unqualified persons (with escort)','Shock protection PPE required for unqualified'],
        ['Restricted Approach Boundary','Increased shock risk — accidental contact possible','Qualified persons only','Shock protection PPE + insulated tools mandatory'],
        ['Arc Flash Boundary','Incident energy at this distance = 1.2 cal/cm² (bare skin burn)','Qualified persons with PPE','Arc-rated PPE at minimum HRC 1 required'],
        ['Prohibited Approach','Same risk as direct contact with live part','Qualified — emergency only','Maximum PPE level; engineering controls preferred'],
    ]
    cols = [CW*0.20, CW*0.30, CW*0.22, CW*0.28]
    e.append(dark_table(
        [[Paragraph(c, st['label'] if r==0 else st['body']) for c in row]
         for r,row in enumerate(boundaries)], cols))
    e.append(SP(3))
    e.append(DiagramWrap(dia_ppe_levels(),
        'Figure 4.2 — Arc Flash PPE Categories (NFPA 70E Table 130.5(G))'))
    e.append(SP(3))
    e.append(Box('Arc Flash Study Requirements', [
        'An Arc Flash Hazard Analysis (AFHA) per IEEE 1584 must be performed for all electrical systems.',
        'Labels must be placed on all electrical equipment showing: Incident Energy (cal/cm²), Boundary distances, PPE category, Arc flash boundary distance.',
        'Studies must be updated every 5 years or when significant system changes occur.',
        'Equipment labels are MANDATORY per NFPA 70E and OSHA requirements.',
    ], ORG, '⚡'))
    return e


def ch5():
    e = [ChHead('5','Personal Protective Equipment (PPE)',
                'Arc-Rated · Insulated · Standard Requirements'), SP(3)]
    e.append(P('PPE is the last line of defense in the electrical safety hierarchy. '
               'It must be selected based on the specific hazard level determined by the '
               'risk assessment or arc flash study — never chosen arbitrarily. '
               'Incorrect PPE can create a false sense of security or fail to provide '
               'adequate protection.', 'body'))
    e.append(P('Electrical PPE Selection Guide', 'h2'))
    ppe_guide = [
        ['PPE Item','Standard','Voltage Range','Notes'],
        ['Class 00 Insulated Gloves','ASTM D120','500V AC max','Thin — must fit under leather protectors'],
        ['Class 0 Insulated Gloves','ASTM D120','1,000V AC max','Most common for LV work'],
        ['Class 2 Insulated Gloves','ASTM D120','17,000V AC max','Medium voltage switching'],
        ['Class 4 Insulated Gloves','ASTM D120','36,000V AC max','High voltage substation work'],
        ['Arc-Rated FR Clothing (HRC1)','NFPA 70E','Any (≤4 cal/cm²)','FR shirt + pants; safety glasses + face shield'],
        ['Arc Flash Suit (HRC4)','NFPA 70E','Any (≤40 cal/cm²)','Multi-layer coverall; arc-rated hood; balaclava'],
        ['Dielectric Safety Boots','ASTM F2413','Class 75 (18,000V)','Must be inspected before each use'],
        ['Safety Glasses/Goggles','ANSI Z87.1','All work','Mandatory at all times near electrical equipment'],
        ['Hard Hat — Class E','ANSI Z89.1','20,000V proof tested','Class E required for electrical environments'],
        ['Arc-Rated Face Shield','NFPA 70E','Cal/cm² rated','Must match or exceed HRC category being worked in'],
    ]
    cols = [CW*0.25, CW*0.15, CW*0.18, CW*0.42]
    e.append(dark_table(
        [[Paragraph(c, st['label'] if r==0 else st['body']) for c in row]
         for r,row in enumerate(ppe_guide)], cols))
    e.append(SP(3))
    e.append(Box('PPE Inspection Rules', [
        'Inspect ALL PPE before every use — even new equipment can be defective.',
        'Insulated gloves must be air-tested and visually inspected for cuts, tears, or swelling.',
        'Arc-rated clothing must be free of hydrocarbon contamination (oil, grease) — they fuel fires.',
        'Never wear polyester, nylon, or synthetic fibres near arc flash hazards — they melt to skin.',
        'Tag and remove any PPE that shows damage. Never use damaged electrical PPE.',
    ], YEL, '⚠'))
    return e


def ch6():
    e = [ChHead('6','Electrical Grounding & Bonding',
                'NEC Article 250 · IEC 60364 · TN/TT/IT Systems'), SP(3)]
    e.append(P('Grounding (earthing) and bonding are critical safety systems that protect personnel '
               'from electric shock and equipment from damage due to fault currents, lightning, '
               'and static electricity. A properly designed grounding system ensures that fault '
               'current returns safely to the source — tripping protective devices — rather than '
               'flowing through personnel.', 'body'))
    e.append(DiagramWrap(dia_grounding(),
        'Figure 6.1 — Protective Earth Grounding — IEC 60364 / NEC Article 250'))
    e.append(SP(3))
    e.append(P('Grounding System Types (IEC 60364)', 'h2'))
    systems = [
        ['System','Description','Neutral Grounding','Common Application'],
        ['TN-S','Separate PE and N conductors throughout','Solidly grounded at source','Modern industrial facilities, new buildings'],
        ['TN-C','Combined PEN conductor (N+PE combined)','Solidly grounded at source','Older European installations, not recommended'],
        ['TN-C-S','TN-C to distribution board, TN-S from board','Solidly grounded at source','Residential/commercial distributions'],
        ['TT','Transformer grounded; loads use separate earth electrode','Solidly grounded, separate earth at load','Rural areas, temporary supplies'],
        ['IT','No direct earth connection at source; impedance earthed','Isolated (ungrounded) or impedance grounded','Hospitals, critical process plants'],
    ]
    cols = [CW*0.10, CW*0.25, CW*0.22, CW*0.43]
    e.append(dark_table(
        [[Paragraph(c, st['label'] if r==0 else st['body']) for c in row]
         for r,row in enumerate(systems)], cols))
    e.append(SP(3))
    e.append(P('Grounding vs Bonding', 'h3'))
    for item in [
        '<b>Grounding:</b> Connecting electrical system conductors (neutral, equipment frames) to earth (ground electrode). Purpose: fault protection, lightning protection, voltage stabilization.',
        '<b>Bonding:</b> Connecting metal components together to ensure they are at the same electrical potential. Purpose: prevent dangerous voltage differences between metal parts that personnel might touch simultaneously.',
        '<b>Equipment Ground Conductor (EGC/PE):</b> The green or bare wire that connects equipment frames to the supply earth. Must carry full fault current for sufficient time to trip the breaker.',
    ]:
        e.append(bullet(item))
    e.append(SP(3))
    e.append(Box('Ground Resistance Requirements', [
        'Single electrode system: NEC 250.56 requires < 25 Ω. Otherwise, supplement with additional electrodes.',
        'Critical facilities (data centers, hospitals): Often design for < 5 Ω or < 1 Ω.',
        'Lightning protection ground: < 10 Ω per IEC 62305.',
        'Test ground resistance annually with a 3-point fall-of-potential test (Megger ground tester).',
        'Never rely on conduit, water pipes, or structural steel as the only ground path.',
    ], CYAN, 'ℹ'))
    return e


def ch7():
    e = [ChHead('7','Safe Work Practices & Permit Systems',
                'Energized Work Permit · Hot Work · Safe Distances'), SP(3)]
    e.append(P('Safe work practices for electrical work are mandated by NFPA 70E, '
               'OSHA 29 CFR 1910.333, and IEC 60204-1. The fundamental principle is: '
               '<b>de-energize before working</b>. When de-energizing is not feasible, '
               'a formal Energized Electrical Work Permit must be completed and approved '
               'by authorized management before work begins.', 'body'))
    e.append(P('Energized Electrical Work Permit Requirements', 'h2'))
    e.append(P('Per NFPA 70E 130.2(B), an Energized Electrical Work Permit must include:', 'body'))
    permit = [
        '<b>Description of circuit/equipment:</b> Voltage, amperage, location, panel ID.',
        '<b>Justification for energized work:</b> Why cannot the circuit be de-energized? (Production critical, continuous monitoring required, etc.)',
        '<b>Shock hazard analysis results:</b> Approach boundaries (limited, restricted).',
        '<b>Arc flash hazard analysis results:</b> Incident energy level, AFB distance, PPE category.',
        '<b>PPE to be worn:</b> Specific items required for shock and arc flash protection.',
        '<b>Work methods:</b> Specific safe work practices, tools to be used.',
        '<b>Responsible parties:</b> Signatures of performing worker, supervisor, and safety officer.',
        '<b>Emergency plan:</b> Who to call, where AED is located, nearest hospital.',
    ]
    for item in permit:
        e.append(bullet(item))
    e.append(SP(3))
    e.append(P('Minimum Safe Approach Distances (NEC/NFPA 70E)', 'h3'))
    approach = [
        ['System Voltage (Phase-Phase)','Limited Boundary','Restricted Boundary','Prohibited Boundary'],
        ['< 50 V (ELV)','Not specified','Not specified','Not specified'],
        ['50 V – 300 V LV','3.0 m (10 ft)','1.0 m (3 ft 6 in)','Avoid contact'],
        ['300 V – 750 V','3.0 m (10 ft)','1.0 m (3 ft 6 in)','Avoid contact'],
        ['750 V – 2 kV','3.0 m (10 ft)','1.0 m (3 ft 6 in)','Avoid contact'],
        ['2 kV – 15 kV MV','3.0 m (10 ft)','1.7 m (5 ft 6 in)','19 cm (7.5 in)'],
        ['15 kV – 36 kV MV','3.0 m (10 ft)','2.7 m (9 ft)','24 cm (9.5 in)'],
        ['36 kV – 46 kV','3.0 m (10 ft)','2.7 m (9 ft)','27 cm (10.5 in)'],
    ]
    cols = [CW*0.26, CW*0.22, CW*0.26, CW*0.26]
    e.append(dark_table(
        [[Paragraph(c, st['label'] if r==0 else st['body']) for c in row]
         for r,row in enumerate(approach)], cols))
    return e


def ch8():
    e = [ChHead('8','Emergency Response & First Aid',
                'Electric Shock · Burns · Arc Flash Response'), SP(3)]
    e.append(P('Rapid, correct emergency response saves lives. All workers in electrical '
               'environments must be trained in emergency response procedures, including '
               'CPR, AED operation, and the correct response to electrical burns and arc flash injuries.', 'body'))
    e.append(P('Electric Shock Emergency Response', 'h2'))
    response = [
        ('1. DO NOT TOUCH THE VICTIM', 'You could also be electrocuted. Assess the scene first.', RED),
        ('2. DISCONNECT THE POWER', 'Immediately de-energize the circuit. Use isolation switch — NOT by pulling the victim.', RED),
        ('3. CALL EMERGENCY SERVICES', 'Call immediately — 911 (US), 999 (UK), 112 (EU), or site emergency number.', ORG),
        ('4. CHECK RESPONSIVENESS', 'Once power is off, approach safely. Check for pulse and breathing.', YEL),
        ('5. BEGIN CPR IF NEEDED', 'If no pulse: 30 chest compressions + 2 rescue breaths. Repeat until AED or EMS arrives.', GRN),
        ('6. USE AED', 'Apply AED as soon as available. Follow AED voice instructions precisely.', CYAN),
    ]
    for title, desc, c in response:
        e.append(KeepTogether([Box(title, [desc], c, '→'), SP(2)]))
    e.append(P('Electrical Burn First Aid', 'h3'))
    for item in [
        '<b>Do NOT remove burned clothing</b> that is stuck to skin — this causes further damage.',
        'Cool minor burns with cool (not cold) running water for 10–20 minutes.',
        '<b>Do NOT apply ice, butter, or creams</b> to electrical burns.',
        'Cover loosely with a sterile non-stick bandage. Do not wrap tightly.',
        '<b>All electrical burns require hospital evaluation</b> — internal tissue damage is often worse than the surface injury suggests.',
        'Watch for signs of internal injuries: abdominal pain, confusion, cardiac arrhythmia.',
    ]:
        e.append(bullet(item))
    e.append(SP(3))
    e.append(Box('Site Emergency Preparedness Requirements', [
        'AED must be accessible within 3–5 minutes walking distance in all electrical work areas.',
        'Emergency contact numbers must be posted at every electrical room entrance.',
        'First Aid trained personnel must be available on every work shift.',
        'Emergency evacuation routes from all electrical rooms must be clearly marked.',
        'Conduct emergency response drills (including simulated electrical incidents) at least annually.',
    ], GRN, '✚'))
    return e


def ch9():
    e = [ChHead('9','Standards, Regulations & Compliance',
                'NFPA 70E · IEC 60364 · OSHA · NEC'), SP(3)]
    e.append(P('Compliance with electrical safety standards is legally required and ethically '
               'obligatory. Understanding the regulatory landscape ensures that safety programs '
               'are comprehensive, current, and defensible during regulatory inspections.', 'body'))
    standards = [
        ['Standard / Regulation','Issuer','Scope','Key Requirements'],
        ['NFPA 70E (2024 ed.)','NFPA (USA)','Electrical safety in the workplace','Arc flash PPE, LOTO, energized work permits, training requirements'],
        ['OSHA 29 CFR 1910.269','US Dept of Labor','Electric power generation/distribution','Approach distances, PPE, qualified worker definitions'],
        ['OSHA 29 CFR 1910.333','US Dept of Labor','General electrical safety','Working on energized equipment procedures'],
        ['NEC (NFPA 70) 2023','NFPA (USA)','Electrical installation','Wiring methods, grounding, breaker sizing, installation safety'],
        ['IEC 60364 Series','IEC (International)','Low voltage electrical installations','System design, protection, wiring, testing'],
        ['IEC 60204-1','IEC','Safety of machinery','Electrical equipment on machines — emergency stop, LOTO interface'],
        ['IEC 60479','IEC','Effects of current on human body','Physiological data for circuit protection design'],
        ['EN 50110','CENELEC (EU)','Operation of electrical installations','EU live working procedures, approach distances'],
        ['AS/NZS 3000','Standards Australia','Wiring rules (Australia/NZ)','Wiring standards, earthing requirements'],
    ]
    cols = [CW*0.22, CW*0.15, CW*0.20, CW*0.43]
    e.append(dark_table(
        [[Paragraph(c, st['label'] if r==0 else st['body']) for c in row]
         for r,row in enumerate(standards)], cols))
    e.append(SP(3))
    e.append(P('Qualified vs Unqualified Person Definitions', 'h3'))
    e.append(P('NFPA 70E and OSHA define "qualified person" as someone who has been trained in and '
               'demonstrated proficiency in construction and operation of electrical equipment and '
               'the associated hazards. Key distinctions:', 'body'))
    for item in [
        '<b>Qualified Person:</b> Trained in electrical safety. May cross the Restricted Approach Boundary with appropriate PPE.',
        '<b>Unqualified Person:</b> Not trained in electrical safety. May not cross the Limited Approach Boundary without a qualified escort.',
        '<b>Authorized Person:</b> Has received specific authorization (usually in writing) to perform a specific task on specific equipment.',
        '<b>Qualified Electrician:</b> Licensed professional (journeyman/master) qualified to perform electrical installation and maintenance work.',
    ]:
        e.append(bullet(item))
    e.append(SP(3))
    e.append(Box('Compliance Program Requirements', [
        'Written electrical safety program required per NFPA 70E 110.1.',
        'Training records must be maintained for all workers — per OSHA and NFPA 70E.',
        'Arc flash analysis must be updated every 5 years or after system changes.',
        'LOTO program must be documented, reviewed annually, and audited periodically.',
        'All electrical equipment must be labeled with arc flash and voltage hazard information.',
    ], YEL, '⚖'))
    return e


def ch10():
    e = [ChHead('10','Incident Investigation & Prevention',
                'Root Cause Analysis · Near Miss Reporting · Culture'), SP(3)]
    e.append(P('Every electrical incident — whether it results in injury, equipment damage, or '
               'was a "near miss" — must be thoroughly investigated. Root cause analysis (RCA) '
               'identifies the systemic failures that allowed the incident to occur, enabling '
               'corrective actions that prevent recurrence. A near miss today is a fatality prevented.', 'body'))
    e.append(P('Incident Investigation Process', 'h2'))
    investigation = [
        ['Phase','Activity','Responsible Party','Timeframe'],
        ['Immediate Response','Stabilize scene, provide first aid, secure area, notify management','Supervisor + First Aider','Minutes'],
        ['Preserve Evidence','Photograph scene, collect samples, tag equipment (do not repair yet)','Safety Officer','Hours'],
        ['Witness Interviews','Interview all witnesses independently, document statements','Safety Officer + HR','24–48 hours'],
        ['Root Cause Analysis','Apply 5-Why analysis, Fishbone diagram, or Fault Tree Analysis','Safety Team + Engineering','48–72 hours'],
        ['Corrective Actions','Develop, assign, and implement corrective and preventive actions (CAPA)','Management + Engineering','Days–Weeks'],
        ['Close-Out & Lessons Learned','Share findings across site/organization; update procedures','Safety Manager','30–90 days'],
    ]
    cols = [CW*0.18, CW*0.35, CW*0.22, CW*0.25]
    e.append(dark_table(
        [[Paragraph(c, st['label'] if r==0 else st['body']) for c in row]
         for r,row in enumerate(investigation)], cols))
    e.append(SP(3))
    e.append(P('Root Cause Categories (Common Electrical Incidents)', 'h3'))
    causes = [
        ('Inadequate Training','Worker performed task without proper safety training. Fix: Mandatory certified training program.', RED),
        ('Procedure Non-Compliance','Known procedures existed but were bypassed. Fix: Management accountability, behavioral safety program.', ORG),
        ('Missing/Inadequate Procedures','No written procedure existed for the task. Fix: Develop procedures for all electrical tasks.', YEL),
        ('Equipment Failure','Protective device (breaker, fuse) failed to operate. Fix: Preventive maintenance program, testing schedule.', CYA2),
        ('Design Deficiency','Original design lacked adequate protection. Fix: Engineering review, upgrade protection.', PRP),
    ]
    for title, desc, c in causes:
        e.append(Box(title, [desc], c, '→'))
        e.append(SP(2))
    e.append(Box('Building a Safety Culture', [
        'Encourage near miss reporting — reward reporting, never punish reporters.',
        'Leadership must visibly participate in safety activities (walkdowns, toolbox talks).',
        '"If you see something, say something" — every worker is responsible for safety.',
        'Measure safety leading indicators (training hours, near misses reported) not just lagging indicators (injuries).',
    ], GRN, '★'))
    return e


def quick_ref():
    e = [P('QUICK REFERENCE — VOLTAGE, PPE & DISTANCES', 'h1'), Divider(YEL), SP(3)]
    e.append(P('PPE Selection by Voltage Level', 'h2'))
    ppe_ref = [
        ['Voltage Range','Shock PPE','Minimum Eye Protection','Arc Flash PPE'],
        ['< 50 V (ELV)','Not required (take care)','Safety glasses','Not typically required'],
        ['50 V – 600 V (LV)','Class 0 insulated gloves + leather protectors','Safety glasses + face shield','Min HRC 1 (4 cal/cm²)'],
        ['600 V – 5 kV (MV)','Class 1 insulated gloves','Safety glasses + face shield','Per arc flash study'],
        ['5 kV – 15 kV (MV)','Class 2 insulated gloves','Full arc flash hood','Per arc flash study, min HRC 3'],
        ['15 kV – 36 kV (MV)','Class 3 insulated gloves','Full arc flash hood + suit','Per arc flash study, min HRC 4'],
        ['>36 kV (HV)','Class 4 insulated gloves','Full arc flash hood + suit','Per arc flash study — specialist required'],
    ]
    cols = [CW*0.19, CW*0.28, CW*0.24, CW*0.29]
    e.append(dark_table(
        [[Paragraph(c, st['label'] if r==0 else st['body']) for c in row]
         for r,row in enumerate(ppe_ref)], cols))
    e.append(SP(3))
    e.append(P('Emergency Contacts & Response Numbers', 'h2'))
    e.append(Box('Site-Specific Emergency Numbers (Fill in for your facility)', [
        'Site Emergency: _____________',
        'Plant Manager: _____________',
        'Safety Officer: _____________',
        'Local Fire/EMS: 911 (US) / 999 (UK) / 112 (EU)',
        'Nearest Hospital: _____________',
        'Poison Control: 1-800-222-1222 (US)',
    ], RED, '📞'))
    e.append(SP(3))
    e.append(P('Body Part Touch Voltage Limits (IEC 60479)', 'h3'))
    e.append(P('These conventional touch voltage limits are used for protective device design:', 'body'))
    touch = [
        ['Condition','AC Touch Voltage Limit','DC Touch Voltage Limit','Basis'],
        ['Dry skin, normal environment','50 V AC rms','120 V DC','IEC 60479-1'],
        ['Wet/damp conditions','25 V AC rms','60 V DC','IEC 60479-1'],
        ['Submerged/swimming pool','12 V AC rms','30 V DC','IEC 60479-1'],
        ['Medical / patient areas','10 mV – 100 mV','—','IEC 60601 (special environments)'],
    ]
    cols2 = [CW*0.25, CW*0.22, CW*0.18, CW*0.35]
    e.append(dark_table(
        [[Paragraph(c, st['label'] if r==0 else st['body']) for c in row]
         for r,row in enumerate(touch)], cols2))
    return e


def references():
    e = [P('REFERENCES & REGULATORY RESOURCES', 'h1'), Divider(YEL), SP(3)]
    e.append(P('Key Standards & Regulations', 'h2'))
    refs = [
        'NFPA 70E (2024) — Standard for Electrical Safety in the Workplace.',
        'NFPA 70 — National Electrical Code (NEC), 2023 edition.',
        'OSHA 29 CFR 1910.147 — Control of Hazardous Energy (LOTO).',
        'OSHA 29 CFR 1910.333 — Selection and use of work practices (Electrical).',
        'IEC 60364 — Low-voltage electrical installations.',
        'IEC 60204-1 — Safety of machinery: Electrical equipment of machines.',
        'IEC 60479-1 — Effects of current on human beings and livestock.',
        'IEEE 1584-2018 — Guide for Performing Arc Flash Hazard Calculations.',
        'ISO 45001:2018 — Occupational health and safety management systems.',
    ]
    for r in refs:
        e.append(bullet(r))
    e.append(SP(3))
    e.append(P('Learning & Training Resources', 'h2'))
    resources = [
        ['Resource','Website','Description'],
        ['AYE Tech Hub','ayetechub.com','Free electrical safety courses, guides, and engineering resources'],
        ['NFPA','nfpa.org','Access NFPA 70E standard, arc flash training, free safety resources'],
        ['OSHA eTools','osha.gov/etools','Free online OSHA compliance tools, incident reporting'],
        ['IEEE Xplore','ieeexplore.ieee.org','IEEE 1584 arc flash standard and technical papers'],
        ['ISA','isa.org','Electrical safety certifications and industrial automation standards'],
    ]
    res_data = [['Resource','Website','Description']]
    for name, url, desc in resources:
        res_data.append([Paragraph(f'<b>{name}</b>', st['body']),
                         Paragraph(f'<font color="#eab308">{url}</font>', st['body']),
                         Paragraph(desc, st['body'])])
    cols = [CW*0.20, CW*0.28, CW*0.52]
    e.append(dark_table(res_data, cols))
    e.append(SP(4))
    e.append(Divider(HexColor('#2a2a00')))
    e.append(SP(3))
    e.append(P('<b>AYE Tech Hub</b> — Engineering the Future', 'h2'))
    e.append(P('This handbook is published under the AYE Tech Hub free engineering education initiative. '
               'Visit <font color="#eab308">ayetechub.com</font> and join our Telegram community at '
               '<font color="#eab308">t.me/ayetechub</font> for more guides, courses, live support, '
               'and engineering discussions.', 'body'))
    e.append(SP(2))
    e.append(P('© 2026 AYE Tech Hub. Published by Awet G. Nway. '
               'Free for personal and educational use. Commercial reproduction requires written permission.', 'meta'))
    return e


def build():
    out = os.path.join(os.path.dirname(__file__), 'pdfs', 'electrical-safety-handbook.pdf')
    story = [PageBreak()]
    story.extend(toc());    story.append(PageBreak())
    story.extend(ch1());    story.append(PageBreak())
    story.extend(ch2());    story.append(PageBreak())
    story.extend(ch3());    story.append(PageBreak())
    story.extend(ch4());    story.append(PageBreak())
    story.extend(ch5());    story.append(PageBreak())
    story.extend(ch6());    story.append(PageBreak())
    story.extend(ch7());    story.append(PageBreak())
    story.extend(ch8());    story.append(PageBreak())
    story.extend(ch9());    story.append(PageBreak())
    story.extend(ch10());   story.append(PageBreak())
    story.extend(quick_ref()); story.append(PageBreak())
    story.extend(references())

    doc = SimpleDocTemplate(
        out, pagesize=A4,
        leftMargin=M, rightMargin=M,
        topMargin=18*mm, bottomMargin=16*mm,
        title=DOC_TITLE, author=AUTHOR,
        subject='Electrical Safety — NFPA 70E, IEC 60364, OSHA, Arc Flash, LOTO',
        creator='AYE Tech Hub PDF Engine'
    )
    doc.build(story, onFirstPage=draw_cover, onLaterPages=draw_page)
    size = os.path.getsize(out) / 1024
    print(f'✓ Generated: {out}  ({size:.0f} KB, {doc.page} pages)')

if __name__ == '__main__':
    build()
