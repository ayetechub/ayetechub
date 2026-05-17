#!/usr/bin/env python3
"""AYE Tech Hub â€” PLC Programming Complete Guide generator."""
import os, math
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer,
    Table, TableStyle, PageBreak, KeepTogether)
from reportlab.platypus.flowables import Flowable
from reportlab.graphics.shapes import (Drawing, Rect, Line, String,
    Circle, PolyLine, Group)
from reportlab.graphics import renderPDF

# â”€â”€ dimensions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
PW, PH = A4
M  = 18 * mm
CW = PW - 2 * M

# â”€â”€ brand colors â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
BG   = HexColor('#020817')
BG2  = HexColor('#0a1628')
BG3  = HexColor('#0d1f3c')
BG4  = HexColor('#1e293b')
CYAN = HexColor('#00d4ff')
CYA2 = HexColor('#00a8cc')
CYA3 = HexColor('#007a99')
WHT  = HexColor('#ffffff')
GR1  = HexColor('#e2e8f0')
GR2  = HexColor('#94a3b8')
GR3  = HexColor('#475569')
GR4  = HexColor('#1e293b')
GRN  = HexColor('#22c55e')
YEL  = HexColor('#eab308')
RED  = HexColor('#ef4444')
ORG  = HexColor('#f97316')
PRP  = HexColor('#a78bfa')

FOOTER = "AYE Tech Hub â€” Engineering the Future"
DOC_TITLE = "PLC Programming Complete Guide"
AUTHOR = "Awet G. Nway"

# â”€â”€ page callbacks â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
def draw_cover(canv, doc):
    canv.setFillColor(BG)
    canv.rect(0, 0, PW, PH, fill=1, stroke=0)
    # dark-blue top panel
    canv.setFillColor(HexColor('#001a33'))
    canv.rect(0, PH-220, PW, 220, fill=1, stroke=0)
    # diagonal deco lines
    canv.saveState()
    canv.setStrokeColor(HexColor('#00d4ff15'))
    canv.setLineWidth(0.8)
    for i in range(-100, int(PW)+200, 28):
        canv.line(i, PH, i-200, PH-220)
    canv.restoreState()
    # cyan top bar
    canv.setFillColor(CYAN)
    canv.rect(0, PH-5, PW, 5, fill=1, stroke=0)
    # AYE logo box
    canv.setFillColor(BG2); canv.roundRect(M, PH-95, 88, 55, 7, fill=1, stroke=0)
    canv.setStrokeColor(CYAN); canv.setLineWidth(1.5)
    canv.roundRect(M, PH-95, 88, 55, 7, fill=0, stroke=1)
    canv.setFillColor(CYAN); canv.setFont('Helvetica-Bold', 26)
    canv.drawCentredString(M+44, PH-72, 'AYE')
    canv.setFillColor(GR2); canv.setFont('Helvetica', 7.5)
    canv.drawCentredString(M+44, PH-86, 'TECH HUB')
    # category tag
    canv.setFillColor(HexColor('#00d4ff20'))
    canv.setStrokeColor(CYAN); canv.setLineWidth(1)
    canv.roundRect(PW-M-130, PH-92, 130, 30, 6, fill=1, stroke=1)
    canv.setFillColor(CYAN); canv.setFont('Helvetica-Bold', 8.5)
    canv.drawCentredString(PW-M-65, PH-74, 'PLC & AUTOMATION')
    canv.setFillColor(GR2); canv.setFont('Helvetica', 7)
    canv.drawCentredString(PW-M-65, PH-85, 'ENGINEERING GUIDE')
    # main title
    canv.setFillColor(WHT); canv.setFont('Helvetica-Bold', 36)
    canv.drawString(M, PH-160, 'PLC Programming')
    canv.setFillColor(CYAN); canv.setFont('Helvetica-Bold', 36)
    canv.drawString(M, PH-200, 'Complete Guide')
    # subtitle
    canv.setFillColor(GR1); canv.setFont('Helvetica', 12.5)
    canv.drawString(M, PH-230, 'Siemens S7  Â·  Ladder Logic  Â·  FBD  Â·  Structured Text')
    canv.drawString(M, PH-248, 'HMI Integration  Â·  PROFINET  Â·  Safety Standards  Â·  Career Pathways')
    # divider
    canv.setStrokeColor(CYAN); canv.setLineWidth(1.5)
    canv.line(M, PH-265, PW-M, PH-265)
    # stats
    stats = [('12','CHAPTERS'),('150+','CONCEPTS'),('20+','DIAGRAMS'),('FREE','ACCESS')]
    sw = CW/4
    for i,(n,l) in enumerate(stats):
        x = M + i*sw + sw/2
        canv.setFillColor(CYAN); canv.setFont('Helvetica-Bold', 22)
        canv.drawCentredString(x, PH-292, n)
        canv.setFillColor(GR2); canv.setFont('Helvetica', 7.5)
        canv.drawCentredString(x, PH-306, l)
    # ladder diagram panel
    py = PH-540; ph2=175
    canv.setFillColor(BG2); canv.roundRect(M, py, CW, ph2, 8, fill=1, stroke=0)
    canv.setStrokeColor(GR4); canv.setLineWidth(0.8)
    canv.roundRect(M, py, CW, ph2, 8, fill=0, stroke=1)
    # rails
    rx=M+45; rrx=PW-M-45; rmid=py+ph2-30
    canv.setStrokeColor(GR3); canv.setLineWidth(2.5)
    canv.line(rx, py+15, rx, rmid)
    canv.line(rrx, py+15, rrx, rmid)
    # rung 1 â€“ NO contact + coil
    r1y=py+ph2-55
    canv.setStrokeColor(CYAN); canv.setLineWidth(1.5)
    canv.line(rx, r1y, rx+60, r1y)
    for cx in [rx+60, rx+72]: canv.line(cx, r1y-9, cx, r1y+9)
    canv.line(rx+72, r1y, rx+140, r1y)
    for cx in [rx+140, rx+152]: canv.line(cx, r1y-9, cx, r1y+9)
    canv.line(rx+152, r1y, rx+210, r1y)
    canv.circle(rx+222, r1y, 12, fill=0, stroke=1)
    canv.line(rx+234, r1y, rrx, r1y)
    canv.setFillColor(GRN); canv.setFont('Helvetica-Bold', 7)
    canv.drawCentredString(rx+66, r1y+13, 'I0.0'); canv.drawCentredString(rx+66, r1y-18, 'START')
    canv.drawCentredString(rx+146, r1y+13, 'I0.1'); canv.drawCentredString(rx+146, r1y-18, 'E-STOP')
    canv.setFillColor(ORG)
    canv.drawCentredString(rx+222, r1y+19, 'Q0.0'); canv.drawCentredString(rx+222, r1y-21, 'MOTOR')
    # rung 2 â€“ timer
    r2y=py+ph2-105
    canv.setStrokeColor(CYA2); canv.setLineWidth(1.5)
    canv.line(rx, r2y, rx+60, r2y)
    for cx in [rx+60, rx+72]: canv.line(cx, r2y-9, cx, r2y+9)
    canv.line(rx+72, r2y, rx+90, r2y)
    tx=rx+90; tw=80; th=36
    canv.rect(tx, r2y-th//2, tw, th, fill=0, stroke=1)
    canv.setFillColor(CYA2); canv.setFont('Helvetica-Bold', 9)
    canv.drawCentredString(tx+tw/2, r2y+7, 'TON')
    canv.setFillColor(GR2); canv.setFont('Helvetica', 7)
    canv.drawCentredString(tx+tw/2, r2y-5, 'PT: T#5S')
    canv.setStrokeColor(CYA2)
    canv.line(tx+tw, r2y, tx+tw+40, r2y)
    canv.circle(tx+tw+52, r2y, 12, fill=0, stroke=1)
    canv.line(tx+tw+64, r2y, rrx, r2y)
    canv.setFillColor(YEL); canv.setFont('Helvetica-Bold', 7)
    canv.drawCentredString(tx+tw+52, r2y+19, 'Q0.1')
    canv.drawCentredString(tx+tw+52, r2y-21, 'LAMP')
    # panel label
    canv.setFillColor(GR3); canv.setFont('Helvetica', 7)
    canv.drawCentredString(PW/2, py+8, 'LADDER LOGIC DIAGRAM â€” SIEMENS S7 STYLE')
    # author bar
    ay=py-50
    canv.setFillColor(BG3); canv.roundRect(M, ay, CW, 40, 6, fill=1, stroke=0)
    canv.setFillColor(CYAN); canv.setFont('Helvetica-Bold', 11)
    canv.drawString(M+15, ay+24, AUTHOR)
    canv.setFillColor(GR2); canv.setFont('Helvetica', 8.5)
    canv.drawString(M+15, ay+10, 'Founder, AYE Tech Hub  |  Industrial Automation & PLC Engineering Expert')
    canv.setFillColor(GRN); canv.roundRect(PW-M-90, ay+7, 80, 26, 4, fill=1, stroke=0)
    canv.setFillColor(WHT); canv.setFont('Helvetica-Bold', 10)
    canv.drawCentredString(PW-M-50, ay+22, 'FREE')
    canv.setFont('Helvetica', 6.5)
    canv.drawCentredString(PW-M-50, ay+10, 'OPEN ACCESS')
    # bottom bar
    canv.setFillColor(BG2); canv.rect(0, 0, PW, 26, fill=1, stroke=0)
    canv.setFillColor(CYAN); canv.setFont('Helvetica-Bold', 8)
    canv.drawCentredString(PW/2, 15, FOOTER)
    canv.setFillColor(GR3); canv.setFont('Helvetica', 7)
    canv.drawString(M, 6, 'ayetechub.com')
    canv.drawRightString(PW-M, 6, 'Â© 2026 AYE Tech Hub. All Rights Reserved.')


def draw_page(canv, doc):
    canv.setFillColor(BG); canv.rect(0, 0, PW, PH, fill=1, stroke=0)
    canv.setStrokeColor(CYAN); canv.setLineWidth(1.5)
    canv.line(M, PH-12*mm, PW-M, PH-12*mm)
    canv.setFillColor(CYAN); canv.setFont('Helvetica-Bold', 7)
    canv.drawString(M, PH-9*mm, 'AYE TECH HUB')
    canv.setFillColor(GR2); canv.setFont('Helvetica', 7)
    canv.drawRightString(PW-M, PH-9*mm, DOC_TITLE.upper())
    canv.setStrokeColor(GR4); canv.setLineWidth(0.5)
    canv.line(M, 11*mm, PW-M, 11*mm)
    canv.setFillColor(GR2); canv.setFont('Helvetica', 6.5)
    canv.drawString(M, 7.5*mm, FOOTER)
    canv.setFillColor(CYAN); canv.setFont('Helvetica-Bold', 8)
    canv.drawRightString(PW-M, 7.5*mm, str(doc.page-1))


# â”€â”€ styles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
def S(name, **kw):
    defaults = dict(fontName='Helvetica', fontSize=9.5, textColor=GR1,
                    leading=14, spaceAfter=6)
    defaults.update(kw)
    return ParagraphStyle(name, **defaults)

st = {
    'h1': S('h1', fontName='Helvetica-Bold', fontSize=20, textColor=WHT,
             leading=24, spaceAfter=4, spaceBefore=0),
    'h2': S('h2', fontName='Helvetica-Bold', fontSize=13, textColor=CYAN,
             leading=17, spaceAfter=6, spaceBefore=14),
    'h3': S('h3', fontName='Helvetica-Bold', fontSize=10.5, textColor=WHT,
             leading=14, spaceAfter=5, spaceBefore=10),
    'body': S('body', spaceAfter=7, leading=14, alignment=TA_JUSTIFY),
    'bullet': S('bullet', leftIndent=14, spaceAfter=4, leading=13),
    'code': S('code', fontName='Courier', fontSize=8, textColor=CYAN,
              backColor=BG2, leading=12, leftIndent=10, rightIndent=10,
              spaceAfter=8, spaceBefore=4),
    'caption': S('caption', fontSize=7.5, textColor=GR2, alignment=TA_CENTER,
                 spaceAfter=10),
    'toc1': S('toc1', fontName='Helvetica-Bold', fontSize=10, textColor=WHT,
              leading=14, spaceAfter=3),
    'toc2': S('toc2', fontSize=9, textColor=GR2, leading=13,
              leftIndent=18, spaceAfter=2),
    'meta': S('meta', fontSize=8, textColor=GR2, leading=12),
    'label': S('label', fontName='Helvetica-Bold', fontSize=8.5,
               textColor=CYAN, leading=12, spaceAfter=3),
}


# â”€â”€ custom flowables â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
class Box(Flowable):
    """Callout box with colored left border."""
    def __init__(self, title, lines, color=CYAN, icon='â„¹'):
        Flowable.__init__(self)
        self.title = title; self.lines = lines
        self.color = color; self.icon = icon
        self.width = CW
    def wrap(self, aw, ah):
        self._h = 14 + 13*len(self.lines) + 10
        return self.width, self._h
    def draw(self):
        h = self._h
        self.canv.saveState()
        # bg
        self.canv.setFillColor(BG3)
        self.canv.roundRect(0, 0, self.width, h, 4, fill=1, stroke=0)
        # left accent
        self.canv.setFillColor(self.color)
        self.canv.rect(0, 0, 4, h, fill=1, stroke=0)
        # title
        self.canv.setFillColor(self.color)
        self.canv.setFont('Helvetica-Bold', 8.5)
        self.canv.drawString(14, h-12, f'{self.icon}  {self.title}')
        # body
        self.canv.setFillColor(GR1)
        self.canv.setFont('Helvetica', 8.5)
        for i, line in enumerate(self.lines):
            self.canv.drawString(14, h-12-13*(i+1), f'  {line}')
        self.canv.restoreState()

class ChHead(Flowable):
    """Chapter header banner."""
    def __init__(self, number, title, subtitle=''):
        Flowable.__init__(self)
        self.number = number; self.title = title; self.subtitle = subtitle
        self.width = CW
    def wrap(self, aw, ah): return self.width, 56
    def draw(self):
        w = self.width
        self.canv.saveState()
        self.canv.setFillColor(BG3)
        self.canv.roundRect(0, 0, w, 56, 5, fill=1, stroke=0)
        self.canv.setStrokeColor(CYAN); self.canv.setLineWidth(1)
        self.canv.roundRect(0, 0, w, 56, 5, fill=0, stroke=1)
        # chapter number pill
        self.canv.setFillColor(CYAN)
        self.canv.roundRect(10, 30, 68, 18, 4, fill=1, stroke=0)
        self.canv.setFillColor(BG)
        self.canv.setFont('Helvetica-Bold', 8)
        self.canv.drawCentredString(44, 36, f'CHAPTER {self.number}')
        # title
        self.canv.setFillColor(WHT)
        self.canv.setFont('Helvetica-Bold', 16)
        self.canv.drawString(10, 12, self.title)
        # subtitle
        if self.subtitle:
            self.canv.setFillColor(GR2)
            self.canv.setFont('Helvetica', 8.5)
            self.canv.drawString(86, 36, self.subtitle)
        self.canv.restoreState()

class Divider(Flowable):
    def __init__(self, color=GR4, w=None):
        Flowable.__init__(self)
        self.color = color; self.w = w or CW
    def wrap(self, aw, ah): return self.w, 8
    def draw(self):
        self.canv.setStrokeColor(self.color)
        self.canv.setLineWidth(0.5)
        self.canv.line(0, 4, self.w, 4)

class DiagramWrap(Flowable):
    """Wraps a Drawing in a dark panel with optional caption."""
    def __init__(self, drawing, caption=''):
        Flowable.__init__(self)
        self.d = drawing; self.caption = caption
        self.width = CW
    def wrap(self, aw, ah):
        self._h = self.d.height + (14 if self.caption else 0) + 16
        return self.width, self._h
    def draw(self):
        self.canv.saveState()
        # panel bg
        self.canv.setFillColor(BG3)
        self.canv.roundRect(0, 0, self.width, self._h, 5, fill=1, stroke=0)
        self.canv.setStrokeColor(GR4); self.canv.setLineWidth(0.5)
        self.canv.roundRect(0, 0, self.width, self._h, 5, fill=0, stroke=1)
        # render drawing
        renderPDF.draw(self.d, self.canv, 8, 14 if self.caption else 8)
        # caption
        if self.caption:
            self.canv.setFillColor(GR2); self.canv.setFont('Helvetica', 7)
            self.canv.drawCentredString(self.width/2, 4, self.caption)
        self.canv.restoreState()


# â”€â”€ helper builders â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
def P(txt, style='body'): return Paragraph(txt, st[style])
def SP(n=1): return Spacer(1, n*mm)
def bullet(txt): return P(f'<bullet>â€¢</bullet> {txt}', 'bullet')

def dark_table(data, col_widths, header_rows=1):
    t = Table(data, colWidths=col_widths)
    style = [
        ('BACKGROUND', (0,0), (-1,0), BG3),
        ('TEXTCOLOR',  (0,0), (-1,0), CYAN),
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
        ('LINEBELOW',  (0,0), (-1,0), 1, CYAN),
    ]
    t.setStyle(TableStyle(style))
    return t


# â”€â”€ diagrams â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
def dia_plc_arch():
    dw, dh = CW-16, 160
    d = Drawing(dw, dh)
    # backplane
    d.add(Rect(0, 0, dw, dh, fillColor=None, strokeColor=None))
    d.add(Rect(8, 55, dw-16, 8, fillColor=CYA3, strokeColor=None))
    d.add(String(dw/2, 60, 'BACKPLANE BUS', textAnchor='middle',
                 fontSize=6, fillColor=WHT, fontName='Helvetica-Bold'))
    # modules
    modules = [
        ('PSU\n24V DC', 0, GR3, GR2),
        ('CPU\nS7-1500', 1, CYAN, WHT),
        ('DI 16x\n24VDC', 2, GRN, WHT),
        ('DO 16x\n24VDC', 3, ORG, WHT),
        ('AI 8x\n0-20mA', 4, CYA2, WHT),
        ('AO 4x\n4-20mA', 5, YEL, BG),
        ('CM\nPROFINET', 6, PRP, WHT),
    ]
    mw, mg = (dw-16)//7, 4
    for label, i, bc, tc in modules:
        x = 8 + i*(mw+mg)
        # module body
        d.add(Rect(x, 68, mw, dh-75,rx=3,ry=3,
                          fillColor=BG4, strokeColor=bc, strokeWidth=1.2))
        # top color tab
        d.add(Rect(x, dh-14, mw, 7, fillColor=bc, strokeColor=None))
        # label (split on \n)
        parts = label.split('\n')
        d.add(String(x+mw/2, 100, parts[0], textAnchor='middle',
                     fontSize=7.5, fillColor=tc, fontName='Helvetica-Bold'))
        if len(parts) > 1:
            d.add(String(x+mw/2, 88, parts[1], textAnchor='middle',
                         fontSize=6.5, fillColor=GR2))
        # LED indicator
        d.add(Circle(x+mw/2, 76, 4, fillColor=GRN, strokeColor=None))
    # field devices row
    field = [('SENSOR', GRN), ('ACTUATOR', ORG), ('MOTOR', CYA2), ('HMI', PRP)]
    fw = (dw-16)//4
    for i, (lbl, c) in enumerate(field):
        fx = 8 + i*(fw+mg)
        d.add(Rect(fx, 5, fw, 42,rx=3,ry=3, fillColor=BG3,
                          strokeColor=c, strokeWidth=1))
        d.add(String(fx+fw/2, 20, lbl, textAnchor='middle',
                     fontSize=7, fillColor=c, fontName='Helvetica-Bold'))
        # wiring arrow up to backplane
        d.add(Line(fx+fw/2, 47, fx+fw/2, 55, strokeColor=c,
                   strokeWidth=0.8))
    return d


def dia_ladder():
    dw, dh = CW-16, 130
    d = Drawing(dw, dh)
    # Rails
    for rx in [20, dw-20]:
        d.add(Line(rx, 10, rx, dh-10, strokeColor=GR3, strokeWidth=2.5))
    rungs = [
        # (y, contacts, coil_label, color)
        (dh-35, [('I0.0','START',True),('I0.1','ESTOP',True)], 'Q0.0\nMOTOR', CYAN),
        (dh-75, [('I0.2','AUTO',True),('I0.0','START',False)], 'Q0.1\nCONVEY', CYA2),
        (dh-110, [('M0.0','INT BIT',True)], 'M0.1\nFLAG', GRN),
    ]
    for ry, contacts, coil, col in rungs:
        cx = 20
        for tag, lbl, is_no in contacts:
            # wire
            d.add(Line(cx, ry, cx+30, ry, strokeColor=col, strokeWidth=1.2))
            cx += 30
            # contact symbol
            d.add(Line(cx, ry-8, cx, ry+8, strokeColor=col, strokeWidth=1.2))
            cx += 10
            d.add(Line(cx, ry-8, cx, ry+8, strokeColor=col, strokeWidth=1.2))
            if not is_no:  # NC â€“ diagonal slash
                d.add(Line(cx-8, ry-8, cx+2, ry+8, strokeColor=col, strokeWidth=0.8))
            d.add(String(cx-4, ry+11, tag, textAnchor='middle',
                         fontSize=6.5, fillColor=col, fontName='Helvetica-Bold'))
            d.add(String(cx-4, ry-18, lbl, textAnchor='middle',
                         fontSize=6, fillColor=GR2))
            cx += 10
        # wire to coil
        d.add(Line(cx, ry, dw-60, ry, strokeColor=col, strokeWidth=1.2))
        # coil
        d.add(Circle(dw-48, ry, 12, fillColor=None, strokeColor=col, strokeWidth=1.2))
        parts = coil.split('\n')
        d.add(String(dw-48, ry+5, parts[0], textAnchor='middle',
                     fontSize=6, fillColor=col, fontName='Helvetica-Bold'))
        if len(parts)>1:
            d.add(String(dw-48, ry-5, parts[1], textAnchor='middle',
                         fontSize=5.5, fillColor=GR2))
        d.add(Line(dw-36, ry, dw-20, ry, strokeColor=col, strokeWidth=1.2))
    return d


def dia_timer():
    dw, dh = CW-16, 110
    d = Drawing(dw, dh)
    ax, aw = 60, dw-80
    # IN signal
    in_y = dh-30
    d.add(String(8, in_y, 'IN', fontSize=8, fillColor=CYAN,
                 fontName='Helvetica-Bold'))
    pts_in = [ax,in_y-10, ax,in_y+10, ax+60,in_y+10, ax+60,in_y-10, dw-20,in_y-10]
    d.add(PolyLine(pts_in, strokeColor=GRN, strokeWidth=1.5))
    # Q output (delayed)
    q_y = dh-65
    d.add(String(8, q_y, 'Q', fontSize=8, fillColor=CYAN,
                 fontName='Helvetica-Bold'))
    pts_q = [ax,q_y-10, ax+60,q_y-10, ax+60,q_y+10, ax+120,q_y+10, ax+120,q_y-10, dw-20,q_y-10]
    d.add(PolyLine(pts_q, strokeColor=ORG, strokeWidth=1.5))
    # ET accumulator bar
    et_y = dh-95
    d.add(String(8, et_y, 'ET', fontSize=8, fillColor=CYAN,
                 fontName='Helvetica-Bold'))
    d.add(Line(ax+60, et_y, ax+120, et_y+16, strokeColor=CYA2, strokeWidth=1.2))
    d.add(Line(ax+120, et_y+16, dw-20, et_y+16, strokeColor=CYA2, strokeWidth=1.2))
    # PT label
    d.add(Line(ax+60, q_y-14, ax+120, q_y-14, strokeColor=YEL, strokeWidth=0.8))
    d.add(String((ax+60+ax+120)//2, q_y-22, 'PT (Preset Time)',
                 textAnchor='middle', fontSize=7, fillColor=YEL))
    # rising edge marks
    d.add(Line(ax+60, in_y-10, ax+60, in_y-18, strokeColor=GR3, strokeWidth=0.7))
    d.add(Line(ax+60, q_y-10, ax+60, q_y-18, strokeColor=GR3, strokeWidth=0.7))
    d.add(String(ax+60, in_y-26, 'â†‘ IN rises', textAnchor='middle',
                 fontSize=6.5, fillColor=GR2))
    d.add(String(ax+60, q_y-26, 'â†‘ Q after PT', textAnchor='middle',
                 fontSize=6.5, fillColor=GR2))
    return d


def dia_network():
    dw, dh = CW-16, 150
    d = Drawing(dw, dh)
    def box(x, y, w, h, label, sub, bc):
        d.add(Rect(x, y, w, h,rx=4,ry=4, fillColor=BG4,
                          strokeColor=bc, strokeWidth=1.2))
        d.add(String(x+w/2, y+h-14, label, textAnchor='middle',
                     fontSize=8, fillColor=bc, fontName='Helvetica-Bold'))
        d.add(String(x+w/2, y+5, sub, textAnchor='middle',
                     fontSize=6.5, fillColor=GR2))
    def wire(x1,y1,x2,y2,c=CYA2):
        d.add(Line(x1,y1,x2,y2, strokeColor=c, strokeWidth=1.2))
    # PLC CPU top-center
    cx=dw/2; box(cx-40, dh-55, 80, 48, 'S7-1500', 'PROFINET\nController', CYAN)
    # Switch mid
    box(cx-30, dh-105, 60, 35, 'Switch', 'PROFINET', CYA3)
    wire(cx, dh-55, cx, dh-70)
    # ET200SP
    box(cx-155, dh-130, 70, 48, 'ET200SP', 'Remote I/O', GRN)
    wire(cx-30, dh-90, cx-120, dh-105)
    # HMI
    box(cx-40, 5, 80, 48, 'HMI Panel', 'KTP900 Basic', PRP)
    wire(cx, dh-105, cx, 53)
    # Second PLC
    box(cx+85, dh-130, 70, 48, 'S7-1200', 'Sub PLC', CYA2)
    wire(cx+30, dh-90, cx+120, dh-105)
    # PROFIBUS slave
    box(cx-155, 5, 70, 48, 'DP Slave', 'PROFIBUS', YEL)
    wire(cx-120, dh-130, cx-120, 53)
    # labels on wires
    d.add(String(cx+10, dh-80, 'PROFINET', fontSize=6.5,
                 fillColor=GR2, fontName='Helvetica'))
    return d


def dia_scan_cycle():
    dw, dh = CW-16, 100
    d = Drawing(dw, dh)
    steps = ['READ\nINPUTS','EXECUTE\nPROGRAM','UPDATE\nOUTPUTS','COMM\n& DIAG']
    colors = [GRN, CYAN, ORG, PRP]
    sw = (dw-20)/len(steps)
    for i,(s,c) in enumerate(zip(steps,colors)):
        x=10+i*sw
        d.add(Rect(x, dh-70, sw-8, 55,rx=4,ry=4, fillColor=BG4,
                          strokeColor=c, strokeWidth=1.2))
        parts=s.split('\n')
        d.add(String(x+sw/2-4, dh-35, parts[0], textAnchor='middle',
                     fontSize=8, fillColor=c, fontName='Helvetica-Bold'))
        d.add(String(x+sw/2-4, dh-48, parts[1] if len(parts)>1 else '',
                     textAnchor='middle', fontSize=7.5, fillColor=GR2))
        if i < len(steps)-1:
            ax=x+sw-2; ay=dh-42
            d.add(Line(ax, ay, ax+6, ay, strokeColor=GR3, strokeWidth=1))
            d.add(String(ax+6, ay-3, 'â–¶', fontSize=6, fillColor=GR2))
    # cycle arrow
    d.add(String(dw/2, dh-82, 'â†º  Scan Cycle repeats every 1â€“100ms',
                 textAnchor='middle', fontSize=7.5, fillColor=GR2))
    return d


def dia_safety():
    dw, dh = CW-16, 110
    d = Drawing(dw, dh)
    levels = [
        ('SIL 4','10â»âµ to 10â»â´',RED,'Nuclear, Aerospace'),
        ('SIL 3','10â»â´ to 10â»Â³',ORG,'Oil & Gas, Chemical'),
        ('SIL 2','10â»Â³ to 10â»Â²',YEL,'Industrial Automation'),
        ('SIL 1','10â»Â² to 10â»Â¹',GRN,'General Machinery'),
    ]
    bh=20; by=dh-28
    for lbl, pfd, c, app in levels:
        bw=dw-16
        d.add(Rect(8, by, bw, bh, fillColor=BG4, strokeColor=c, strokeWidth=0.8))
        d.add(String(20, by+6, lbl, fontSize=8, fillColor=c, fontName='Helvetica-Bold'))
        d.add(String(100, by+6, f'PFD avg: {pfd}', fontSize=7.5, fillColor=GR1))
        d.add(String(dw-18, by+6, app, textAnchor='end', fontSize=7, fillColor=GR2))
        by -= bh+2
    d.add(String(dw/2, dh-8, 'IEC 61508 / IEC 62061 Safety Integrity Levels (SIL)',
                 textAnchor='middle', fontSize=7.5, fillColor=GR2))
    return d


# â”€â”€ content chapters â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
def toc():
    items = [
        (1,'PLC Architecture & Hardware','3'),
        (2,'Ladder Logic Programming','5'),
        (3,'Timers, Counters & Math','8'),
        (4,'Data Types & Variables','10'),
        (5,'Function Block Diagram (FBD)','12'),
        (6,'Structured Text (ST)','14'),
        (7,'HMI & SCADA Integration','16'),
        (8,'Industrial Communication Networks','18'),
        (9,'Safety Standards & SIL','20'),
        (10,'Troubleshooting & Diagnostics','22'),
        (11,'Programming Best Practices','24'),
        (12,'Career Pathways & Certifications','26'),
        (0,'Quick Reference Tables','28'),
        (0,'References & Resources','30'),
    ]
    e = [SP(4), P('TABLE OF CONTENTS','h1'), Divider(CYAN), SP(3)]
    for num, title, pg in items:
        ch = f'Chapter {num} â€” ' if num else ''
        dots = '.' * max(2, 55-len(ch+title))
        e.append(P(f'<font color="#00d4ff"><b>{ch}</b></font>'
                   f'<font color="#e2e8f0">{title}</font>'
                   f'<font color="#475569">{dots}{pg}</font>', 'toc1'))
        e.append(SP(1))
    return e


def ch1():
    e = [ChHead('1','PLC Architecture & Hardware',
                'CPU Â· I/O Modules Â· Memory Â· Scan Cycle'), SP(3)]
    e.append(P('A <b>Programmable Logic Controller (PLC)</b> is a ruggedized digital computer '
               'engineered for real-time industrial process control. Unlike general-purpose computers, '
               'PLCs are designed to withstand extreme temperatures, humidity, vibration, and electrical '
               'noise found in manufacturing environments. They execute a deterministic scan cycle and '
               'provide guaranteed response times essential for safety-critical applications.', 'body'))
    e.append(P('PLC Hardware Components', 'h2'))
    e.append(DiagramWrap(dia_plc_arch(),
        'Figure 1.1 â€” Siemens S7-1500 PLC Hardware Architecture'))
    e.append(SP(3))
    e.append(P('Key Hardware Modules', 'h3'))
    hw = [
        ['Module','Function','Typical Spec'],
        ['CPU','Program execution, memory management, comms','300MHz, 1MB work memory'],
        ['Power Supply','Convert AC/DC mains to 24VDC backplane power','24VDC / 10A'],
        ['Digital Input (DI)','Read ON/OFF signals from sensors, switches','16â€“64 ch, 24VDC'],
        ['Digital Output (DO)','Drive contactors, solenoids, pilot lights','16â€“32 ch, 2A/ch'],
        ['Analog Input (AI)','Read 0-10V or 4-20mA process signals','8 ch, 16-bit resolution'],
        ['Analog Output (AO)','Control VFDs, positioners, valves','4 ch, 12-bit resolution'],
        ['Communication (CM)','PROFINET, PROFIBUS, Modbus, EtherNet/IP','Depends on protocol'],
    ]
    cols = [CW*0.22, CW*0.38, CW*0.40]
    e.append(dark_table(
        [[Paragraph(c, st['label'] if r==0 else st['body']) for c in row]
         for r,row in enumerate(hw)], cols))
    e.append(SP(3))
    e.append(P('The PLC Scan Cycle', 'h2'))
    e.append(DiagramWrap(dia_scan_cycle(),
        'Figure 1.2 â€” PLC Deterministic Scan Cycle (1â€“100ms typical)'))
    e.append(SP(2))
    e.append(Box('Key Insight', [
        'Scan cycle time directly impacts control response speed.',
        'Fast processes (servo drives) may require <5ms scan; slow processes (HVAC) tolerate 100ms+.',
        'Always account for communication overhead when calculating worst-case cycle time.',
    ], CYAN, 'âš¡'))
    e.append(SP(3))
    e.append(P('Memory Architecture', 'h3'))
    e.append(P('Siemens S7-1500 organizes memory into distinct areas for program execution:', 'body'))
    for item in [
        '<b>Load Memory (Flash):</b> Stores project blocks (OB, FC, FB, DB) persistently across power cycles.',
        '<b>Work Memory (RAM):</b> Active execution area; blocks are loaded here during runtime.',
        '<b>Retentive Memory:</b> Data areas that survive power loss (M markers, DB values with RETAIN flag).',
        '<b>I/O Image Tables:</b> Input Image (I) and Output Image (Q) buffers updated each scan cycle.',
    ]:
        e.append(bullet(item))
    e.append(SP(3))
    e.append(P('PLC Family Comparison', 'h3'))
    cmp = [
        ['Model','I/O Points','Program Size','Typical Application'],
        ['S7-200 SMART','256 DI/DO','256 KB','Small OEM machines'],
        ['S7-1200','284 DI/DO','1 MB','Standalone machines'],
        ['S7-1500','1024 DI/DO','4 MB','Mid-large automation cells'],
        ['S7-400','8192 DI/DO','16 MB','Large process plants'],
        ['Allen-Bradley Micro850','144 DI/DO','512 KB','Small/mid machines'],
        ['Allen-Bradley ControlLogix','4096 DI/DO','32 MB','Complex multi-axis systems'],
    ]
    cols2 = [CW*0.22, CW*0.18, CW*0.18, CW*0.42]
    e.append(dark_table(
        [[Paragraph(c, st['label'] if r==0 else st['body']) for c in row]
         for r,row in enumerate(cmp)], cols2))
    return e


def ch2():
    e = [ChHead('2','Ladder Logic Programming',
                'Contacts Â· Coils Â· Rungs Â· Instructions'), SP(3)]
    e.append(P('Ladder Logic Diagram (LD) is the most widely used PLC programming language, '
               'standardized under IEC 61131-3. It graphically resembles relay control circuits, '
               'making it intuitive for electrical engineers transitioning to PLC programming. '
               'Each <b>rung</b> represents a control equation evaluated left-to-right, with '
               '<b>contacts</b> as inputs and <b>coils</b> as outputs.', 'body'))
    e.append(P('Ladder Logic Diagram Examples', 'h2'))
    e.append(DiagramWrap(dia_ladder(),
        'Figure 2.1 â€” Basic Ladder Logic Rungs: NO/NC Contacts, Coils, and Latch Logic'))
    e.append(SP(3))
    e.append(P('Core Ladder Instructions', 'h2'))
    instr = [
        ['Instruction','Symbol','Function','IEC 61131-3 Name'],
        ['Normally Open Contact','â€”| |â€”','Passes power if bit is TRUE','Examine if Closed (XIC)'],
        ['Normally Closed Contact','â€”|/|â€”','Passes power if bit is FALSE','Examine if Open (XIO)'],
        ['Output Coil','â€”( )â€”','Sets bit TRUE when rung is TRUE','Output Energize (OTE)'],
        ['Latch Coil','â€”(L)â€”','Sets bit TRUE; remains set until unlatched','Output Latch (OTL)'],
        ['Unlatch Coil','â€”(U)â€”','Resets a latched bit','Output Unlatch (OTU)'],
        ['Rising Edge','â€”(P)â€”','One-shot: TRUE for one scan on rising edge','Positive Transition'],
        ['Falling Edge','â€”(N)â€”','One-shot: TRUE for one scan on falling edge','Negative Transition'],
    ]
    cols = [CW*0.22, CW*0.12, CW*0.36, CW*0.30]
    e.append(dark_table(
        [[Paragraph(c, st['label'] if r==0 else st['body']) for c in row]
         for r,row in enumerate(instr)], cols))
    e.append(SP(3))
    e.append(Box('Programming Rule', [
        'Each output coil address (Q, M) should appear only once as an output in the program.',
        'Using the same coil twice creates a "double coil" conflict â€” last rung evaluated wins.',
        'Use internal memory bits (M/Flag bits) for complex interlocking logic.',
    ], YEL, 'âš '))
    e.append(SP(3))
    e.append(P('Practical Example: Motor Start/Stop Circuit', 'h3'))
    e.append(P(
        'The classic motor start/stop circuit demonstrates core LD concepts. '
        'A <b>sealing/holding contact</b> (Q0.0 parallel to START) latches the motor ON '
        'once the start button is released, while the E-STOP NC contact (I0.1) breaks the circuit '
        'on emergency:', 'body'))
    e.append(Paragraph(
        'Rung 1:  [I0.0 START]â”€â”€â”¬â”€â”€[I0.1/ESTOP]â”€â”€[I0.2/OL]â”€â”€(Q0.0 MOTOR RUN)\n'
        '         [Q0.0 SEAL ]â”€â”€â”˜',
        st['code']))
    e.append(SP(2))
    e.append(P('Addressing Conventions (Siemens S7)', 'h3'))
    addr = [
        ['Address Area','Prefix','Example','Description'],
        ['Digital Input','I','I0.0 â€” I127.7','Physical DI module terminals'],
        ['Digital Output','Q','Q0.0 â€” Q127.7','Physical DO module terminals'],
        ['Memory Bits','M','M0.0 â€” M4095.7','Internal non-retentive flags'],
        ['Data Block','DB','DB1.DBX0.0','Structured data storage'],
        ['Timer','T (S7-Classic)','T1 â€” T255','IEC timers via TON/TOF blocks'],
        ['Counter','C (S7-Classic)','C0 â€” C255','IEC counters via CTU/CTD blocks'],
        ['Analog Input','IW','IW96, IW98â€¦','16-bit analog input word'],
        ['Analog Output','QW','QW80, QW82â€¦','16-bit analog output word'],
    ]
    cols2 = [CW*0.22, CW*0.12, CW*0.20, CW*0.46]
    e.append(dark_table(
        [[Paragraph(c, st['label'] if r==0 else st['body']) for c in row]
         for r,row in enumerate(addr)], cols2))
    return e


def ch3():
    e = [ChHead('3','Timers, Counters & Math',
                'TON Â· TOF Â· CTU Â· CTD Â· Arithmetic'), SP(3)]
    e.append(P('Timers and counters are essential to virtually every PLC program. '
               'The IEC 61131-3 standard defines a rich set of timer and counter function blocks '
               'that replace the legacy S7-Classic timer/counter instructions with structured, '
               'reusable software objects.', 'body'))
    e.append(P('Timer Instructions', 'h2'))
    e.append(DiagramWrap(dia_timer(),
        'Figure 3.1 â€” TON (On-Delay Timer) Timing Diagram'))
    e.append(SP(3))
    timer_t = [
        ['IEC Block','Full Name','Behavior','Typical Use'],
        ['TON','Timer On-Delay','Q becomes TRUE after IN has been TRUE for â‰¥ PT','Delayed starts, dwell times'],
        ['TOF','Timer Off-Delay','Q stays TRUE for PT after IN goes FALSE','Cooling fans, lubrication'],
        ['TP','Timer Pulse','Q is TRUE for exactly PT regardless of IN changes','One-shot pulses'],
        ['TONR','Timer Retentive','Accumulates elapsed time across multiple IN pulses','Usage tracking'],
    ]
    cols = [CW*0.12, CW*0.22, CW*0.38, CW*0.28]
    e.append(dark_table(
        [[Paragraph(c, st['label'] if r==0 else st['body']) for c in row]
         for r,row in enumerate(timer_t)], cols))
    e.append(SP(3))
    e.append(Box('Timer Usage Example', [
        'TON instance: "Motor_Warmup" â€” PT := T#30S',
        'After motor Q0.0 energizes and 30 seconds elapse, "Motor_Warmup".Q enables conveyor.',
        'Using named instances (IEC style) avoids the T-number conflicts of classic Siemens timers.',
    ], CYAN, 'â±'))
    e.append(SP(3))
    e.append(P('Counter Instructions', 'h3'))
    ctr = [
        ['IEC Block','Name','Inputs','Function'],
        ['CTU','Count Up','CU (count), R (reset), PV (preset)','Counts rising edges on CU; Q TRUE when CV â‰¥ PV'],
        ['CTD','Count Down','CD (count), LD (load), PV','Decrements from PV; Q TRUE when CV â‰¤ 0'],
        ['CTUD','Up/Down Counter','CU, CD, R, LD, PV','Bidirectional counter for position tracking'],
    ]
    cols2 = [CW*0.13, CW*0.20, CW*0.34, CW*0.33]
    e.append(dark_table(
        [[Paragraph(c, st['label'] if r==0 else st['body']) for c in row]
         for r,row in enumerate(ctr)], cols2))
    e.append(SP(3))
    e.append(P('Arithmetic & Comparison Instructions', 'h2'))
    e.append(P('Math and comparison instructions process numeric data within the PLC program. '
               'They operate on DINT, INT, REAL, or LREAL data types:', 'body'))
    math_t = [
        ['Instruction','Operation','Example','Result'],
        ['ADD','Addition','ADD(A:=100, B:=55) => OUT','OUT = 155'],
        ['SUB','Subtraction','SUB(A:=Speed_SP, B:=Speed_Act)','Error = SP - Actual'],
        ['MUL','Multiplication','MUL(A:=Flow, B:=0.264)','Convert L/min â†’ GPM'],
        ['DIV','Division','DIV(A:=Pulses, B:=1000)','Scale encoder counts'],
        ['MOD','Modulo','MOD(A:=Batch_Num, B:=10)','Cyclic indexing'],
        ['ABS','Absolute value','ABS(IN:=Error_Val)','Remove sign from error'],
        ['SQRT','Square root','SQRT(IN:=Power_kW)','RMS calculations'],
        ['EQ / NEQ','Equal / Not equal','EQ(IN1:=Mode, IN2:=3)','Mode comparison'],
        ['GT / LT','Greater/Less than','GT(IN1:=Temp, IN2:=Setpoint)','Alarm logic'],
    ]
    cols3 = [CW*0.16, CW*0.18, CW*0.36, CW*0.30]
    e.append(dark_table(
        [[Paragraph(c, st['label'] if r==0 else st['body']) for c in row]
         for r,row in enumerate(math_t)], cols3))
    return e


def ch4():
    e = [ChHead('4','Data Types & Variables',
                'INT Â· REAL Â· BOOL Â· STRING Â· DB'), SP(3)]
    e.append(P('IEC 61131-3 defines a comprehensive type system that ensures type-safe '
               'programming. Choosing the correct data type minimizes memory usage, '
               'prevents overflow errors, and improves program readability.', 'body'))
    e.append(P('IEC 61131-3 Elementary Data Types', 'h2'))
    dt = [
        ['Type','Size','Range','Typical Use'],
        ['BOOL','1 bit','TRUE / FALSE','Digital I/O, flags, enable bits'],
        ['BYTE','8 bits','0 to 255','Bit-field registers, byte commands'],
        ['INT','16 bits','â€“32,768 to +32,767','Small integer values, counters'],
        ['DINT','32 bits','Â±2.1 Ã— 10â¹','Large counters, positions'],
        ['REAL','32 bits (IEEE 754)','Â±3.4 Ã— 10Â³â¸ (7 sig. digits)','Analog values, PID, engineering units'],
        ['LREAL','64 bits','Â±1.7 Ã— 10Â³â°â¸ (15 sig. digits)','High-precision calculations'],
        ['TIME','32 bits','T#0ms to T#49d17h','Timer presets, durations'],
        ['STRING','Variable','Up to 254 chars','HMI messages, recipe names'],
        ['ARRAY[0..n]','nÃ—element size','â€”','Recipe tables, data logs'],
        ['STRUCT','Sum of members','â€”','Grouped related variables'],
    ]
    cols = [CW*0.15, CW*0.18, CW*0.28, CW*0.39]
    e.append(dark_table(
        [[Paragraph(c, st['label'] if r==0 else st['body']) for c in row]
         for r,row in enumerate(dt)], cols))
    e.append(SP(3))
    e.append(P('Data Blocks (DB) â€” Structured Data Storage', 'h2'))
    e.append(P('Data Blocks are the primary data storage containers in Siemens S7 PLCs. '
               'They hold variables of any IEC data type and are accessed from any code block.', 'body'))
    for item in [
        '<b>Global DB:</b> Shared across all OBs, FCs, and FBs. Created manually. Access: DB1.DBX0.0, DB1.DBW2, DB1.DBD4.',
        '<b>Instance DB:</b> Automatically created for each FB call. Stores the FB\'s internal variable state.',
        '<b>RETAIN flag:</b> Variables marked RETAIN survive CPU power-down and retain values in flash memory.',
        '<b>Optimized DB:</b> TIA Portal V13+ default â€” compiler packs variables for efficiency; absolute addressing disabled.',
    ]:
        e.append(bullet(item))
    e.append(SP(3))
    e.append(Box('Best Practice', [
        'Always use symbolic names (e.g., "Conveyor.Speed_SP") rather than absolute addresses.',
        'Group related variables into STRUCTs or UDTs (User-Defined Types) for readability.',
        'Mark production-critical setpoints as RETAIN to survive power cycling.',
    ], GRN, 'âœ”'))
    e.append(SP(3))
    e.append(P('Variable Declaration Example (Structured Text style)', 'h3'))
    e.append(Paragraph(
        'VAR\n'
        '  Motor_Speed    : REAL;     (* Current speed in RPM *)  \n'
        '  Speed_Setpoint : REAL := 1450.0;  (* Default RPM *)  \n'
        '  Motor_Running  : BOOL;     (* Status flag *)  \n'
        '  Fault_Code     : INT;      (* 0 = No fault *)  \n'
        '  Run_Timer      : TON;      (* IEC timer instance *)  \n'
        '  Batch_Count    : DINT;     (* Production counter *)  \n'
        'END_VAR', st['code']))
    return e


def ch5():
    e = [ChHead('5','Function Block Diagram (FBD)',
                'Graphical Â· Reusable Â· IEC 61131-3'), SP(3)]
    e.append(P('<b>Function Block Diagram (FBD)</b> is a graphical programming language from the '
               'IEC 61131-3 standard. Unlike Ladder Logic\'s relay analogy, FBD uses signal flow '
               'networks where function blocks are connected by lines representing data flow. '
               'It is particularly well-suited for continuous process control, signal processing, '
               'and complex interlocking logic.', 'body'))
    e.append(P('FBD vs Ladder Logic', 'h2'))
    cmp = [
        ['Criterion','Ladder Logic (LD)','Function Block Diagram (FBD)'],
        ['Visual Style','Relay ladder rungs (horizontal)','Signal flow network (leftâ†’right)'],
        ['Best For','Discrete on/off logic, motor starters','Continuous control, PID, analog processing'],
        ['Readability','Familiar to electricians','Natural for process/control engineers'],
        ['Reusability','Less structured','High â€” FBs are inherently reusable instances'],
        ['Complex Logic','Can become unreadable','Cleaner for multi-input/output logic'],
        ['IEC Compliance','Full IEC 61131-3','Full IEC 61131-3'],
    ]
    cols = [CW*0.22, CW*0.39, CW*0.39]
    e.append(dark_table(
        [[Paragraph(c, st['label'] if r==0 else st['body']) for c in row]
         for r,row in enumerate(cmp)], cols))
    e.append(SP(3))
    e.append(P('Standard Function Blocks Available in FBD', 'h3'))
    for item in [
        '<b>Bistable (SR/RS):</b> Set-dominant or Reset-dominant flip-flops for latching logic.',
        '<b>TON/TOF/TP:</b> IEC timers used identically to LD but drawn as graphical blocks.',
        '<b>CTU/CTD/CTUD:</b> Counter blocks with graphical pin connections.',
        '<b>PID_Compact / PID_3Step:</b> Siemens library blocks for closed-loop control.',
        '<b>SCALE/NORM_X:</b> Analog signal scaling from raw counts to engineering units.',
        '<b>Custom FB:</b> User-created function blocks with graphical FBD body and any combination of inputs/outputs.',
    ]:
        e.append(bullet(item))
    e.append(SP(3))
    e.append(Box('FBD Design Tips', [
        'Connect outputs of one block directly to inputs of the next â€” avoid long crossing wires.',
        'Use negation circles (small bubble on pin) for inverted boolean signals.',
        'Group related FBD networks in sections with descriptive network titles.',
        'FBD networks execute top-to-bottom within an OB or FC.',
    ], CYA2, 'â„¹'))
    e.append(SP(3))
    e.append(P('PID Control in FBD', 'h3'))
    e.append(P('The PID_Compact block (TIA Portal library) implements a complete PID controller '
               'with auto-tuning, output limiting, and bumpless mode transfer. Typical connections:', 'body'))
    e.append(Paragraph(
        'PID_Compact\n'
        '  Setpoint   â†’ SP_INT     (REAL)   : Target process value\n'
        '  Actual     â†’ PV_IN      (REAL)   : Measured process variable\n'
        '  Enable     â†’ ModeActivate (BOOL) : Start/stop control\n'
        '              Output      (REAL) â†’ Analog Output (QW80)\n'
        '              OutputQC    (DWORD)â†’ Status word', st['code']))
    return e


def ch6():
    e = [ChHead('6','Structured Text (ST)',
                'IEC 61131-3 Â· High-Level Â· Algorithm-Ready'), SP(3)]
    e.append(P('<b>Structured Text (ST)</b> is the highest-level IEC 61131-3 language, syntactically '
               'similar to Pascal and Ada. It enables complex algorithm implementation â€” including '
               'mathematical computations, string processing, array manipulation, and complex state '
               'machines â€” that would be unwieldy in Ladder Logic or FBD.', 'body'))
    e.append(P('ST Language Constructs', 'h2'))
    e.append(Paragraph(
        '(* IF-THEN-ELSE: Motor speed control *)\n'
        'IF Start_PB AND NOT EStop THEN\n'
        '    Motor_Run := TRUE;\n'
        '    Speed_Ref := Speed_SP;\n'
        'ELSIF Speed_SP < 100.0 THEN\n'
        '    Speed_Ref := 100.0;  (* Minimum speed *)\n'
        'ELSE\n'
        '    Motor_Run := FALSE;\n'
        '    Speed_Ref := 0.0;\n'
        'END_IF;', st['code']))
    e.append(SP(2))
    e.append(Paragraph(
        '(* FOR loop: Initialize recipe array *)\n'
        'FOR i := 0 TO 9 DO\n'
        '    Recipe[i].Setpoint := 0.0;\n'
        '    Recipe[i].Enabled  := FALSE;\n'
        'END_FOR;\n\n'
        '(* WHILE loop: Find first fault *)\n'
        'WHILE (idx < 16) AND NOT Fault_Found DO\n'
        '    IF Fault_Array[idx] THEN\n'
        '        First_Fault := idx;\n'
        '        Fault_Found := TRUE;\n'
        '    END_IF;\n'
        '    idx := idx + 1;\n'
        'END_WHILE;', st['code']))
    e.append(SP(3))
    e.append(P('CASE Statement â€” State Machine', 'h3'))
    e.append(Paragraph(
        'CASE Machine_State OF\n'
        '    0: (* IDLE *)  \n'
        '        IF Start_Cmd THEN Machine_State := 1; END_IF;\n'
        '    1: (* HOMING *)  \n'
        '        HomeAxis(); \n'
        '        IF At_Home THEN Machine_State := 2; END_IF;\n'
        '    2: (* RUNNING *)  \n'
        '        RunProcess();\n'
        '        IF Fault OR Stop_Cmd THEN Machine_State := 10; END_IF;\n'
        '    10: (* FAULT *)  \n'
        '        AllOutputs_Off();\n'
        '        IF Reset_Cmd AND NOT Fault THEN Machine_State := 0; END_IF;\n'
        'ELSE\n'
        '    Machine_State := 0;\n'
        'END_CASE;', st['code']))
    e.append(SP(3))
    e.append(Box('When to Use Structured Text', [
        'Mathematical algorithms: PID tuning, interpolation, coordinate transforms.',
        'String manipulation: Recipe names, alarm messages, barcode parsing.',
        'Array processing: Batch data logging, spectrum analysis.',
        'State machines: Multi-step processes with many transitions.',
        'Avoid ST for simple discrete I/O logic â€” LD is more readable for maintenance technicians.',
    ], CYAN, 'â„¹'))
    return e


def ch7():
    e = [ChHead('7','HMI & SCADA Integration',
                'HMI Panels Â· SCADA Systems Â· Tag Linking'), SP(3)]
    e.append(P('Human-Machine Interface (HMI) panels and Supervisory Control and Data Acquisition '
               '(SCADA) systems provide operators with real-time process visualization, control, '
               'alarming, and data logging. Modern industrial systems tightly integrate PLC logic '
               'with HMI/SCADA through standardized tag-based communication.', 'body'))
    e.append(P('HMI vs SCADA', 'h2'))
    cmp = [
        ['Criterion','HMI Panel','SCADA System'],
        ['Location','Machine-level, on or near equipment','Plant/enterprise level, control room'],
        ['Users','Machine operators, maintenance','Supervisors, engineers, management'],
        ['Hardware','Dedicated touch panel (KTP, MP series)','PC-based (industrial workstation/server)'],
        ['Tag Count','Hundreds','Thousands to millions'],
        ['Historian','Limited local logging','Full process historian (hours/years of data)'],
        ['Examples','Siemens KTP900, Allen-Bradley PanelView','WinCC SCADA, iFIX, Wonderware, Ignition'],
    ]
    cols = [CW*0.20, CW*0.40, CW*0.40]
    e.append(dark_table(
        [[Paragraph(c, st['label'] if r==0 else st['body']) for c in row]
         for r,row in enumerate(cmp)], cols))
    e.append(SP(3))
    e.append(P('Tag Configuration Best Practices', 'h3'))
    for item in [
        '<b>Symbolic tags:</b> Always use symbolic names (e.g., "ConveyorSpeed") â€” never absolute addresses in HMI tags.',
        '<b>Tag groups:</b> Organize tags into groups matching plant areas for efficient polling.',
        '<b>Update cycle:</b> Set HMI polling rate based on process dynamics â€” 500ms for most values, 100ms for critical.',
        '<b>Alarm tags:</b> Dedicate separate BOOL bits for each alarm condition; link to HMI alarm server.',
        '<b>Access levels:</b> Implement password-protected user levels â€” Operator, Supervisor, Engineer, Admin.',
    ]:
        e.append(bullet(item))
    e.append(SP(3))
    e.append(Box('HMI Screen Design Rules', [
        'Use consistent color coding: GREEN = running, RED = fault, YELLOW = warning, GRAY = off.',
        'Limit each screen to one process area â€” avoid information overload.',
        'Always provide E-STOP visibility on every screen.',
        'Include a dedicated Alarm Summary screen accessible from any navigation level.',
        'Test HMI responsiveness under full PLC load â€” not just in simulation.',
    ], YEL, 'âš '))
    return e


def ch8():
    e = [ChHead('8','Industrial Communication Networks',
                'PROFINET Â· PROFIBUS Â· Modbus Â· EtherNet/IP'), SP(3)]
    e.append(P('Modern industrial plants use layered communication architectures to connect '
               'field devices, PLCs, HMIs, and enterprise systems. Understanding network protocols '
               'is essential for commissioning, troubleshooting, and designing robust automation systems.', 'body'))
    e.append(DiagramWrap(dia_network(),
        'Figure 8.1 â€” Typical Industrial Network Topology (PROFINET + PROFIBUS)'))
    e.append(SP(3))
    e.append(P('Protocol Comparison', 'h2'))
    proto = [
        ['Protocol','Medium','Speed','Topology','Typical Use'],
        ['PROFINET','Ethernet (RJ45/SFP)','100Mbps / 1Gbps','Star/Ring','Siemens drives, ET200, motion control'],
        ['PROFIBUS DP','RS-485 cable','9.6kbps â€“ 12Mbps','Linear bus','Legacy field devices, sensors, VFDs'],
        ['Modbus RTU','RS-485/RS-232','Up to 115.2kbps','Multi-drop','Meters, drives, third-party devices'],
        ['Modbus TCP','Ethernet','100Mbps+','Star','IT/OT integration, SCADA connections'],
        ['EtherNet/IP','Ethernet (RJ45)','100Mbps/1Gbps','Star','Allen-Bradley PLCs, Rockwell ecosystem'],
        ['DeviceNet','CAN-based','500kbps','Linear bus','AB sensors, solenoid valve manifolds'],
        ['IO-Link','3-wire sensor cable','230kbps','Point-to-point','Smart sensor parameterization'],
    ]
    cols = [CW*0.16, CW*0.19, CW*0.14, CW*0.14, CW*0.37]
    e.append(dark_table(
        [[Paragraph(c, st['label'] if r==0 else st['body']) for c in row]
         for r,row in enumerate(proto)], cols))
    e.append(SP(3))
    e.append(Box('Network Commissioning Checklist', [
        'â˜ Assign unique IP addresses to all PROFINET devices.',
        'â˜ Assign unique PROFIBUS addresses (DP slave addresses 1â€“126).',
        'â˜ Verify cable lengths: PROFIBUS max 1200m at 93.75kbps.',
        'â˜ Terminate RS-485 bus correctly at both ends (120Î© resistors).',
        'â˜ Configure device names in GSD/GSDML files and download to CPU.',
        'â˜ Test communications under normal load and at peak cycle times.',
    ], CYAN, 'â˜‘'))
    return e


def ch9():
    e = [ChHead('9','Safety Standards & SIL',
                'IEC 61508 Â· IEC 62061 Â· Safety PLCs'), SP(3)]
    e.append(P('Functional safety is a critical discipline in industrial automation. '
               'Standards such as <b>IEC 61508</b> (generic), <b>IEC 62061</b> (machinery), and '
               '<b>IEC 61511</b> (process industry) define how safety functions must be designed, '
               'verified, and maintained to achieve required Safety Integrity Levels (SIL).', 'body'))
    e.append(DiagramWrap(dia_safety(),
        'Figure 9.1 â€” IEC 61508 Safety Integrity Levels (SIL 1â€“4)'))
    e.append(SP(3))
    e.append(P('Safety PLC Architecture', 'h3'))
    for item in [
        '<b>1oo1 (One-out-of-One):</b> Single channel â€” SIL 1 maximum. No redundancy.',
        '<b>1oo2 (One-out-of-Two):</b> Either channel can trip â€” highest availability, SIL 2/3.',
        '<b>2oo2 (Two-out-of-Two):</b> Both channels must agree to trip â€” high SIL, demands voting logic.',
        '<b>2oo3 (Two-out-of-Three):</b> Majority vote â€” SIL 3/4. Used in critical process industries.',
    ]:
        e.append(bullet(item))
    e.append(SP(3))
    e.append(Box('Safety Design Rules', [
        'Always use certified Safety PLC (e.g., Siemens S7-1500F, PILZ PNOZmulti) for SIL-rated functions.',
        'Safety and standard logic must be strictly separated â€” never write to safety outputs from standard OBs.',
        'Perform a HAZOP (Hazard & Operability Study) before designing any Safety Instrumented Function.',
        'Validate all Safety Functions via proof testing at intervals defined by the SIL level (SFF, PFD calculations).',
        'Document all safety functions with functional safety assessments before commissioning.',
    ], RED, 'ðŸ”’'))
    e.append(SP(3))
    e.append(P('Emergency Stop (E-Stop) Circuit Requirements', 'h3'))
    e.append(P('Per ISO 13850 and IEC 60947-5-5, emergency stop circuits must be:', 'body'))
    for item in [
        'Red mushroom-head actuator on yellow background (color mandatory per standard).',
        'Positive-opening NC contacts â€” mechanically forced to open regardless of welding.',
        'Category 0 stop (immediate de-energization) for SIL 1+ requirements.',
        'Monitored by a safety relay or safety PLC with cross-circuit fault detection.',
        'Reset by deliberate manual action â€” no automatic restart after E-Stop.',
    ]:
        e.append(bullet(item))
    return e


def ch10():
    e = [ChHead('10','Troubleshooting & Diagnostics',
                'Fault Finding Â· Diagnostic Buffer Â· Online Tools'), SP(3)]
    e.append(P('Systematic troubleshooting minimizes plant downtime. The PLC provides powerful '
               'built-in diagnostic tools â€” the engineer\'s task is to know how to use them '
               'efficiently under production pressure.', 'body'))
    e.append(P('Diagnostic Workflow', 'h2'))
    steps = [
        ('1. Check Status LEDs','CPU RUN/STOP/ERROR LEDs give immediate hardware health.',GRN),
        ('2. Read Diagnostic Buffer','TIA Portal â†’ CPU â†’ Online â†’ Diagnostic Buffer â†’ analyze last 3500 events.',CYAN),
        ('3. Check I/O Module Status','Online CPU â†’ Device view â†’ Module status â†’ identify red/yellow faults.',CYA2),
        ('4. Monitor Online','Go online with TIA Portal â†’ Watch tables â†’ monitor live variable values.',YEL),
        ('5. Force I/O for Testing','Use Force table to override I/O for component testing (with safety precautions).',ORG),
        ('6. Check Communication','PROFINET/PROFIBUS diagnostics â†’ verify partner devices are online.',PRP),
    ]
    for step, desc, c in steps:
        e.append(KeepTogether([
            Box(step, [desc], c, 'â†’'),
            SP(2)
        ]))
    e.append(P('Common PLC Faults & Solutions', 'h2'))
    faults = [
        ['Fault','Cause','Solution'],
        ['CPU in STOP mode','OB not called, programming error, force table conflict','Check diagnostic buffer; verify OB1 exists; remove forces'],
        ['I/O module RED LED','Wiring break, blown fuse, module overtemperature','Check field wiring continuity; replace fuse; check cabinet temp'],
        ['PROFIBUS timeout','Cable break, wrong termination, duplicate DP address','Check cable/terminators; verify each slave address is unique'],
        ['Analog value 32767 (7FFF)','AI module fault: open circuit on 4-20mA loop','Check transmitter loop power; verify wiring polarity'],
        ['Timer not timing','TON IN not TRUE, timer instance not called','Check rung logic condition; verify timer FB called in scan'],
        ['Output not energizing','Fuse blown on DO module, software interlock active','Check hardware fuse; monitor rung logic in Watch table'],
        ['HMI tag shows "????"','Communication lost to PLC, tag address mismatch','Ping PLC IP; verify tag address against PLC symbol table'],
        ['Scan time overrun OB80','Program too long for watchdog time; long loops','Optimize code; increase watchdog time if safe to do so'],
    ]
    cols = [CW*0.24, CW*0.38, CW*0.38]
    e.append(dark_table(
        [[Paragraph(c, st['label'] if r==0 else st['body']) for c in row]
         for r,row in enumerate(faults)], cols))
    return e


def ch11():
    e = [ChHead('11','Programming Best Practices',
                'Naming Â· Modularization Â· Documentation'), SP(3)]
    e.append(P('Professional PLC code must be maintainable by any engineer who inherits the '
               'project. Applying consistent standards from day one dramatically reduces commissioning '
               'time and long-term maintenance costs.', 'body'))
    practices = [
        ('Naming Conventions', GRN, [
            'Use descriptive symbolic names: "Conveyor_01_Speed" not "MW100".',
            'Prefix I/O with area: "Feed_DI_StartBtn" (area_type_description).',
            'Use UPPER_CASE for constants, CamelCase for variables.',
            'Name FBs with their function: "MotorControl", "TemperatureController".',
        ]),
        ('Code Modularization', CYAN, [
            'Use Function Blocks (FB) for each piece of equipment â€” one FB per motor, valve, etc.',
            'Organize OB1 as a master call sequence; no logic in OB1 directly.',
            'Create a "Library" project with proven FBs; import tested blocks into new projects.',
            'Keep each network/rung to one logical function â€” no multi-purpose rungs.',
        ]),
        ('Documentation', YEL, [
            'Add network titles and comments explaining WHY, not just WHAT.',
            'Document all I/O in a wiring spreadsheet linked to the PLC tag table.',
            'Maintain a change log inside the project with date, engineer name, and change description.',
            'Export final tag table as Excel and attach to machine documentation package.',
        ]),
        ('Testing & Validation', ORG, [
            'Test all logic in simulation (PLCSIM) before hardware commissioning.',
            'Write a Factory Acceptance Test (FAT) checklist for every project.',
            'Verify all E-Stop paths, interlocks, and alarms function correctly before site handover.',
        ]),
    ]
    for title, color, items in practices:
        e.append(Box(title, items, color, 'â—'))
        e.append(SP(3))
    return e


def ch12():
    e = [ChHead('12','Career Pathways & Certifications',
                'From Technician to Senior Automation Engineer'), SP(3)]
    e.append(P('PLC programming skills open doors across every major industry â€” '
               'manufacturing, oil & gas, pharmaceuticals, water treatment, food processing, '
               'and building automation. Career progression is rapid for engineers who combine '
               'strong PLC skills with process knowledge and communication ability.', 'body'))
    e.append(P('Career Progression Roadmap', 'h2'))
    levels = [
        ('Junior PLC Programmer','0â€“2 years','Maintain existing programs, basic faults, wiring checks',GRN),
        ('PLC Engineer','2â€“5 years','New project programming, commissioning, HMI development',CYAN),
        ('Senior Automation Engineer','5â€“10 years','System architecture, safety design, project leadership',YEL),
        ('Automation Manager / Lead','10+ years','Department management, standards, vendor qualification',ORG),
        ('Consultant / Specialist','Any level','Independent consulting, specialized expertise (safety, robotics)',PRP),
    ]
    lv_data = [['Level','Experience','Key Responsibilities','Salary Range']]
    for l,e2,r,c in levels:
        lv_data.append([
            Paragraph(f'<font color="{c}">{l}</font>', st['body']),
            Paragraph(e2, st['body']),
            Paragraph(r, st['body']),
            Paragraph('$45Kâ€“$120K+', st['body'])
        ])
    cols = [CW*0.25, CW*0.12, CW*0.40, CW*0.23]
    e.append(dark_table(lv_data, cols))
    e.append(SP(3))
    e.append(P('Recommended Certifications', 'h3'))
    certs = [
        ['Certification','Issuer','Level','Validates'],
        ['Siemens SITRAIN TIA Portal','Siemens AG','Beginner â†’ Advanced','TIA Portal, S7-1200/1500, Ladder, FBD, ST'],
        ['Rockwell Certified Logix Designer','Rockwell Automation','Associate/Professional','Studio 5000, ControlLogix, programming'],
        ['Certified Automation Professional (CAP)','ISA','Professional','Broad automation: design, implementation, O&M'],
        ['TÃœV Functional Safety Engineer','TÃœV Rheinland/SÃœD','Professional','IEC 61508/62061, SIL, safety PLC design'],
        ['CSSA â€” Control System Security','ISA/ISCI (ISA-99)','Professional','OT cybersecurity, ICS network protection'],
        ['AWS Certified Solutions Architect','Amazon AWS','Cloud','IIoT, cloud SCADA, edge computing integration'],
    ]
    cols2 = [CW*0.30, CW*0.20, CW*0.14, CW*0.36]
    e.append(dark_table(
        [[Paragraph(c, st['label'] if r==0 else st['body']) for c in row]
         for r,row in enumerate(certs)], cols2))
    e.append(SP(3))
    e.append(Box('AYE Tech Hub Learning Path', [
        'â‘  Complete PLC Fundamentals course (free on ayetechub.com)',
        'â‘¡ Practice ladder logic on PLCSIM â€” Siemens free simulator',
        'â‘¢ Study this guide + motor-starters guide for industrial context',
        'â‘£ Take Siemens SITRAIN online (free introduction modules available)',
        'â‘¤ Join AYE Tech Hub Telegram for project guidance and peer support',
    ], CYAN, 'ðŸŽ¯'))
    return e


def quick_ref():
    e = [P('QUICK REFERENCE TABLES', 'h1'), Divider(CYAN), SP(3)]
    e.append(P('Siemens S7 Memory Areas', 'h2'))
    mem = [
        ['Area','Prefix','Bit','Byte','Word','DWord','Access'],
        ['Input Image','I','I0.0','IB0','IW0','ID0','Read (PLC refreshes each scan)'],
        ['Output Image','Q','Q0.0','QB0','QW0','QD0','Read/Write (PLC sends each scan)'],
        ['Memory Bits','M','M0.0','MB0','MW0','MD0','Read/Write (internal flags)'],
        ['Data Block','DB','DB1.DBX0.0','DB1.DBB0','DB1.DBW0','DB1.DBD0','Read/Write (structured data)'],
        ['Local Data','L','L0.0','LB0','LW0','LD0','Temp vars in FC/FB only'],
        ['Peripheral (direct)','PI/PQ','â€”','PIB,PQB','PIW,PQW','PID,PQD','Direct I/O bypass (no image)'],
    ]
    cols = [CW*0.13, CW*0.09, CW*0.13, CW*0.09, CW*0.09, CW*0.10, CW*0.37]
    e.append(dark_table(
        [[Paragraph(c, st['label'] if r==0 else st['body']) for c in row]
         for r,row in enumerate(mem)], cols))
    e.append(SP(3))
    e.append(P('IEC 61131-3 Languages Overview', 'h2'))
    langs = [
        ['Language','Type','Key Strength','Best Application'],
        ['Ladder Logic (LD)','Graphical','Relay circuit analogy, easy for electricians','Discrete I/O, motor control, interlocks'],
        ['Function Block (FBD)','Graphical','Signal flow, reusable blocks','PID, continuous control, drive programming'],
        ['Structured Text (ST)','Textual','High-level, algorithms, arrays','Math, state machines, data processing'],
        ['Instruction List (IL)','Textual','Assembly-like, low overhead','Legacy code, rarely used in new projects'],
        ['Sequential Function Chart (SFC)','Graphical','Step-by-step process sequencing','Batch control, robot sequences, recipes'],
    ]
    cols2 = [CW*0.18, CW*0.13, CW*0.34, CW*0.35]
    e.append(dark_table(
        [[Paragraph(c, st['label'] if r==0 else st['body']) for c in row]
         for r,row in enumerate(langs)], cols2))
    e.append(SP(3))
    e.append(P('Common Time Format Examples', 'h2'))
    times = [
        ['TIME Literal','Duration','Use Example'],
        ['T#500ms','500 milliseconds','Short debounce delay'],
        ['T#5S','5 seconds','Motor warmup delay'],
        ['T#2M30S','2 minutes 30 seconds','Cycle timer'],
        ['T#1H','1 hour','Shift production counter reset'],
        ['T#12H','12 hours','Daily maintenance alert'],
        ['T#7D','7 days','Weekly calibration reminder'],
    ]
    cols3 = [CW*0.22, CW*0.28, CW*0.50]
    e.append(dark_table(
        [[Paragraph(c, st['label'] if r==0 else st['body']) for c in row]
         for r,row in enumerate(times)], cols3))
    return e


def references():
    e = [P('REFERENCES & RESOURCES', 'h1'), Divider(CYAN), SP(3)]
    e.append(P('Standards & Specifications', 'h2'))
    refs = [
        'IEC 61131-3:2013 â€” Programmable Controllers: Programming Languages.',
        'IEC 61508:2010 â€” Functional Safety of Electrical/Electronic/Programmable Systems.',
        'IEC 62061:2021 â€” Safety of Machinery: Functional Safety of SCS.',
        'ISO 13850:2015 â€” Emergency Stop Equipment: Design Principles.',
        'IEC 60947-5-5 â€” Control Circuit Devices: Electrical Emergency Stop Devices.',
        'ISA-5.1 â€” Instrumentation Symbols and Identification.',
    ]
    for r in refs:
        e.append(bullet(f'<b>{r.split("â€”")[0].strip()}</b> â€” {r.split("â€”")[1].strip()}'
                        if 'â€”' in r else r))
    e.append(SP(3))
    e.append(P('Recommended Learning Resources', 'h2'))
    resources = [
        ('AYE Tech Hub','ayetechub.com','Free PLC courses, PDF guides, tutorials, AI tools for engineers'),
        ('Siemens Industry Online Support','support.industry.siemens.com','Official S7 documentation, GSDML files, firmware updates'),
        ('Rockwell Automation TechConnect','rok.auto/techconnect','Studio 5000 manuals, ControlLogix programming guides'),
        ('PLCopen','plcopen.org','IEC 61131-3 standard library function blocks, motion control spec'),
        ('ISA â€” Int. Society of Automation','isa.org','Standards, certifications (CAP, CSSA), technical conferences'),
    ]
    res_data = [['Resource','Website','Description']]
    for name, url, desc in resources:
        res_data.append([
            Paragraph(f'<b>{name}</b>', st['body']),
            Paragraph(f'<font color="#00d4ff">{url}</font>', st['body']),
            Paragraph(desc, st['body'])
        ])
    cols = [CW*0.25, CW*0.30, CW*0.45]
    e.append(dark_table(res_data, cols))
    e.append(SP(4))
    e.append(Divider(CYA3))
    e.append(SP(3))
    e.append(P('<b>AYE Tech Hub</b> â€” Engineering the Future', 'h2'))
    e.append(P('This guide is published under the AYE Tech Hub free engineering education initiative. '
               'Visit <font color="#00d4ff">ayetechub.com</font> for more guides, courses, and tools. '
               'Join our Telegram community at <font color="#00d4ff">t.me/ayetechub</font> for '
               'live support, project assistance, and engineering discussions.', 'body'))
    e.append(SP(2))
    e.append(P('Â© 2026 AYE Tech Hub. Published by Awet G. Nway. '
               'Free for personal and educational use. Commercial reproduction requires written permission.', 'meta'))
    return e


# â”€â”€ main â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
def build():
    out = os.path.join(os.path.dirname(__file__),
                       'pdfs', 'plc-programming-guide.pdf')
    story = [PageBreak()]   # page 1 = cover (drawn in draw_cover)
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
    story.extend(ch11());   story.append(PageBreak())
    story.extend(ch12());   story.append(PageBreak())
    story.extend(quick_ref()); story.append(PageBreak())
    story.extend(references())

    doc = SimpleDocTemplate(
        out, pagesize=A4,
        leftMargin=M, rightMargin=M,
        topMargin=18*mm, bottomMargin=16*mm,
        title=DOC_TITLE, author=AUTHOR,
        subject='PLC Programming â€” IEC 61131-3, Siemens S7',
        creator='AYE Tech Hub PDF Engine'
    )
    doc.build(story, onFirstPage=draw_cover, onLaterPages=draw_page)
    size = os.path.getsize(out) / 1024
    print(f'âœ“ Generated: {out}  ({size:.0f} KB, {doc.page} pages)')

if __name__ == '__main__':
    build()

