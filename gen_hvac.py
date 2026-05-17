"""AYE Tech Hub — HVAC Design Manual PDF Generator"""
import os,sys
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor,white,black
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (SimpleDocTemplate,Paragraph,Spacer,Table,
    TableStyle,PageBreak,Flowable,KeepTogether)
from reportlab.graphics.shapes import (Drawing,Rect,Line,String,Circle,
    PolyLine,Group)
from reportlab.graphics import renderPDF
from reportlab.lib.enums import TA_LEFT,TA_CENTER,TA_RIGHT,TA_JUSTIFY
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

W,H=A4
M=18*mm
CW=W-2*M

BG   =HexColor('#020817')
BG2  =HexColor('#0a1628')
BG3  =HexColor('#0f2040')
GRN  =HexColor('#22c55e')   # primary accent — green (mechanical)
TEAL =HexColor('#14b8a6')   # secondary accent
YEL  =HexColor('#fbbf24')   # warning / highlight
RED  =HexColor('#ef4444')
TXT  =HexColor('#e2e8f0')
TXT2 =HexColor('#94a3b8')
TXT3 =HexColor('#64748b')
WLINE=HexColor('#1e3a5f')

DOC_TITLE='HVAC Systems Design Manual — Heating, Ventilation & Air Conditioning Engineering'
AUTHOR   ='AYE Tech Hub Engineering Team'
SUBTITLE ='Load Calculations · Duct Design · Equipment Selection · Controls & Energy Efficiency'
out=os.path.join(os.path.dirname(__file__),'pdfs','hvac-design-manual.pdf')

def reg(name,path):
    try: pdfmetrics.registerFont(TTFont(name,path)); return True
    except: return False
FONT='Helvetica'
FONTB='Helvetica-Bold'

def styles():
    def s(name,**kw):
        base=kw.pop('parent',None)
        return ParagraphStyle(name,parent=base,**kw)
    H1=s('H1',fontName=FONTB,fontSize=18,textColor=GRN,spaceAfter=4,spaceBefore=8,leading=22)
    H2=s('H2',fontName=FONTB,fontSize=13,textColor=GRN,spaceAfter=3,spaceBefore=6,leading=16)
    H3=s('H3',fontName=FONTB,fontSize=10,textColor=TEAL,spaceAfter=2,spaceBefore=4,leading=13)
    BD=s('BD',fontName=FONT,fontSize=9,textColor=TXT,leading=14,spaceAfter=2,
         spaceBefore=0,alignment=TA_JUSTIFY)
    BL=s('BL',fontName=FONT,fontSize=9,textColor=TXT,leading=13,spaceAfter=1,
         leftIndent=10,firstLineIndent=-7)
    CB=s('CB',fontName=FONTB,fontSize=8,textColor=BG,leading=11)
    CT=s('CT',fontName=FONTB,fontSize=8,textColor=GRN,leading=10,alignment=TA_CENTER)
    SM=s('SM',fontName=FONT,fontSize=8,textColor=TXT2,leading=11)
    return H1,H2,H3,BD,BL,CB,CT,SM
H1,H2,H3,BD,BL,CB,CT,SM=styles()

def P(t,st=BD): return Paragraph(t,st)
def SP(n=4): return Spacer(1,n*mm)

def bullet(t,c='#22c55e'):
    return P(f'<font color="{c}">&#9632;</font>  {t}',BL)

def draw_cover(canv,doc):
    canv.saveState()
    canv.setFillColor(BG); canv.rect(0,0,W,H,fill=1,stroke=0)
    # green gradient bands
    for i,alpha in enumerate([0.18,0.10,0.05]):
        canv.setFillColor(HexColor('#22c55e')); canv.setFillAlpha(alpha)
        canv.rect(0,H-(i+1)*55,W,55,fill=1,stroke=0)
    canv.setFillAlpha(1.0)
    # left accent bar
    canv.setFillColor(GRN); canv.rect(0,0,5,H,fill=1,stroke=0)
    # HVAC system diagram (top section)
    _draw_cover_diagram(canv)
    # AYE TECH HUB
    canv.setFillColor(GRN); canv.setFont(FONTB,11)
    canv.drawString(M,H-18*mm,'AYE TECH HUB')
    canv.setFillColor(TXT2); canv.setFont(FONT,8)
    canv.drawString(M,H-24*mm,'Engineering the Future')
    # edition badge
    canv.setFillColor(GRN)
    canv.roundRect(W-M-50,H-22*mm,50,12,3,fill=1,stroke=0)
    canv.setFillColor(BG); canv.setFont(FONTB,8)
    canv.drawCentredString(W-M-25,H-17*mm,'2025 EDITION')
    # main title block
    y=H*0.42
    canv.setFillColor(GRN); canv.setFont(FONTB,28)
    canv.drawString(M,y,'HVAC SYSTEMS')
    canv.setFillColor(white); canv.setFont(FONTB,22)
    canv.drawString(M,y-28,'DESIGN MANUAL')
    canv.setFillColor(TXT2); canv.setFont(FONT,10)
    for i,line in enumerate(SUBTITLE.split(' · ')):
        canv.drawString(M,y-50-i*14,f'  {line}')
    # divider
    canv.setStrokeColor(GRN); canv.setLineWidth(1.5)
    canv.line(M,y-95,W-M,y-95)
    # stats row
    stats=[('12+','Chapters'),('Key Systems','HVAC Topics'),('Formulas','Included'),('Industry','Standard')]
    bw=(W-2*M)/len(stats); by=y-95-28
    for i,(val,lbl) in enumerate(stats):
        bx=M+i*bw+bw/2
        canv.setFillColor(GRN); canv.setFont(FONTB,13); canv.drawCentredString(bx,by,val)
        canv.setFillColor(TXT2); canv.setFont(FONT,7); canv.drawCentredString(bx,by-11,lbl)
    # author bar
    canv.setFillColor(BG2); canv.rect(0,22,W,22,fill=1,stroke=0)
    canv.setFillColor(GRN); canv.setFont(FONTB,8)
    canv.drawString(M,30,AUTHOR)
    canv.setFillColor(TXT3); canv.setFont(FONT,7)
    canv.drawRightString(W-M,30,'awetgknway@gmail.com')
    canv.restoreState()

def _draw_cover_diagram(canv):
    """Simple HVAC system schematic on cover."""
    canv.saveState()
    x0,y0=M,H*0.55
    w2=CW; h2=95
    # AHU box
    canv.setStrokeColor(GRN); canv.setLineWidth(1)
    canv.setFillColor(BG3)
    canv.roundRect(x0,y0,90,55,4,fill=1,stroke=1)
    canv.setFillColor(GRN); canv.setFont(FONTB,7)
    canv.drawCentredString(x0+45,y0+30,'AIR HANDLING')
    canv.drawCentredString(x0+45,y0+20,'UNIT (AHU)')
    # supply duct arrow
    canv.setStrokeColor(TEAL); canv.setLineWidth(2)
    canv.line(x0+90,y0+35,x0+160,y0+35)
    canv.setFillColor(TEAL); canv.drawString(x0+95,y0+38,'Supply Air')
    # diffuser
    canv.setStrokeColor(TEAL); canv.setLineWidth(1)
    canv.setFillColor(BG3)
    canv.roundRect(x0+160,y0+22,30,26,2,fill=1,stroke=1)
    canv.setFillColor(TEAL); canv.setFont(FONT,6)
    canv.drawCentredString(x0+175,y0+33,'Diffuser')
    # return air
    canv.setStrokeColor(TXT3); canv.setLineWidth(1.5)
    canv.line(x0+175,y0+22,x0+175,y0+5)
    canv.line(x0+175,y0+5,x0+45,y0+5)
    canv.line(x0+45,y0+5,x0+45,y0)
    canv.setFillColor(TXT3); canv.setFont(FONT,6)
    canv.drawString(x0+80,y0+7,'Return Air')
    # chiller box (right side)
    canv.setStrokeColor(YEL); canv.setLineWidth(1)
    canv.setFillColor(BG3)
    canv.roundRect(x0+230,y0,80,55,4,fill=1,stroke=1)
    canv.setFillColor(YEL); canv.setFont(FONTB,7)
    canv.drawCentredString(x0+270,y0+30,'CHILLER')
    canv.setFillColor(TXT2); canv.setFont(FONT,6)
    canv.drawCentredString(x0+270,y0+18,'Chilled Water')
    # chilled water pipes
    canv.setStrokeColor(YEL); canv.setLineWidth(1.5)
    canv.line(x0+190,y0+42,x0+230,y0+42)
    canv.line(x0+190,y0+28,x0+230,y0+28)
    canv.setFillColor(YEL); canv.setFont(FONT,5)
    canv.drawString(x0+195,y0+44,'CHW Supply')
    canv.drawString(x0+195,y0+20,'CHW Return')
    # labels
    canv.setFillColor(TXT3); canv.setFont(FONT,6)
    canv.drawCentredString(x0+w2/2,y0-8,'Fig. 1 — Central HVAC System Overview')
    canv.restoreState()

def draw_page(canv,doc):
    canv.saveState()
    canv.setFillColor(BG); canv.rect(0,0,W,H,fill=1,stroke=0)
    canv.setFillColor(BG2); canv.rect(0,H-10*mm,W,10*mm,fill=1,stroke=0)
    canv.setStrokeColor(GRN); canv.setLineWidth(1.5)
    canv.line(M,H-10*mm,W-M,H-10*mm)
    canv.setFillColor(GRN); canv.setFont(FONTB,8)
    canv.drawString(M,H-7*mm,'AYE Tech Hub')
    canv.setFillColor(TXT3); canv.setFont(FONT,7)
    canv.drawRightString(W-M,H-7*mm,'HVAC Systems Design Manual')
    canv.setFillColor(BG2); canv.rect(0,0,W,10*mm,fill=1,stroke=0)
    canv.setStrokeColor(GRN); canv.line(M,10*mm,W-M,10*mm)
    canv.setFillColor(TXT3); canv.setFont(FONT,7)
    canv.drawString(M,3.5*mm,'AYE Tech Hub — Engineering the Future')
    canv.setFillColor(GRN); canv.setFont(FONTB,8)
    canv.drawRightString(W-M,3.5*mm,f'Page {doc.page-1}')
    canv.setFillColor(BG2); canv.rect(0,0,5,H,fill=1,stroke=0)
    canv.setFillColor(GRN); canv.rect(0,0,3,H,fill=1,stroke=0)
    canv.restoreState()

class Box(Flowable):
    def __init__(self,content,accent=None,width=None):
        Flowable.__init__(self)
        self.content=content; self.accent=accent or GRN
        self.width=width or CW
    def wrap(self,aw,ah):
        self.w=min(self.width,aw)
        lines=len(self.content)
        self.h=lines*14+14
        return self.w,self.h
    def draw(self):
        c=self.canv
        c.saveState()
        c.setFillColor(BG3); c.roundRect(0,0,self.w,self.h,4,fill=1,stroke=0)
        c.setFillColor(self.accent); c.rect(0,0,3,self.h,fill=1,stroke=0)
        c.setFillColor(self.accent); c.setFont(FONTB,8)
        for i,line in enumerate(self.content):
            y=self.h-12-i*14
            c.drawString(8,y,line)
        c.restoreState()

class ChHead(Flowable):
    def __init__(self,num,title,subtitle=''):
        Flowable.__init__(self)
        self.num=num; self.title=title; self.subtitle=subtitle
    def wrap(self,aw,ah): return aw,26*mm
    def draw(self):
        c=self.canv; w=self._availableWidth if hasattr(self,'_availableWidth') else CW
        c.saveState()
        c.setFillColor(BG2); c.roundRect(0,0,w,24*mm,4,fill=1,stroke=0)
        c.setStrokeColor(GRN); c.setLineWidth(2); c.line(0,24*mm,w,24*mm)
        c.setFillColor(BG3); c.roundRect(4,12*mm,22*mm,11*mm,3,fill=1,stroke=0)
        c.setFillColor(GRN); c.setFont(FONTB,18); c.drawCentredString(4+11*mm,14.5*mm,self.num)
        c.setFillColor(GRN); c.setFont(FONTB,14); c.drawString(30*mm,16*mm,self.title)
        if self.subtitle:
            c.setFillColor(TXT2); c.setFont(FONT,8); c.drawString(30*mm,10*mm,self.subtitle)
        c.restoreState()

class Divider(Flowable):
    def wrap(self,aw,ah): return aw,3*mm
    def draw(self):
        c=self.canv; c.saveState()
        c.setStrokeColor(WLINE); c.setLineWidth(0.5); c.line(0,1.5*mm,CW,1.5*mm)
        c.restoreState()

class DiagramWrap(Flowable):
    def __init__(self,drawing,caption=''):
        Flowable.__init__(self); self.d=drawing; self.caption=caption
    def wrap(self,aw,ah):
        self.w=min(self.d.width,aw); self.h=self.d.height+(10 if self.caption else 0)
        return self.w,self.h
    def draw(self):
        c=self.canv; c.saveState()
        renderPDF.draw(self.d,c,0,10 if self.caption else 0)
        if self.caption:
            c.setFillColor(TXT3); c.setFont(FONT,7)
            c.drawCentredString(self.w/2,3,self.caption)
        c.restoreState()

def dark_table(data,col_widths,hdr=True):
    style=[
        ('BACKGROUND',(0,0),(-1,0 if hdr else -1),BG3),
        ('TEXTCOLOR',(0,0),(-1,0),GRN if hdr else TXT),
        ('FONTNAME',(0,0),(-1,0),FONTB),
        ('FONTSIZE',(0,0),(-1,-1),8),
        ('FONTNAME',(0,1),(-1,-1),FONT),
        ('TEXTCOLOR',(0,1),(-1,-1),TXT),
        ('BACKGROUND',(0,1),(-1,-1),BG2),
        ('ROWBACKGROUNDS',(0,1),(-1,-1),[BG2,BG3]),
        ('GRID',(0,0),(-1,-1),0.4,WLINE),
        ('VALIGN',(0,0),(-1,-1),'MIDDLE'),
        ('TOPPADDING',(0,0),(-1,-1),4),
        ('BOTTOMPADDING',(0,0),(-1,-1),4),
        ('LEFTPADDING',(0,0),(-1,-1),5),
        ('RIGHTPADDING',(0,0),(-1,-1),5),
    ]
    rows=[]
    for i,row in enumerate(data):
        rows.append([Paragraph(str(c),CT if (i==0 and hdr) else BD) for c in row])
    return Table(rows,colWidths=col_widths,style=TableStyle(style),repeatRows=1 if hdr else 0)

# ─── DIAGRAMS ──────────────────────────────────────────────────────────────────

def dia_psychro():
    """Psychrometric chart simplified."""
    d=Drawing(CW,100)
    d.add(Rect(0,0,CW,100,fillColor=BG2,strokeColor=WLINE,strokeWidth=0.5))
    # axes
    d.add(Line(30,10,CW-10,10,strokeColor=TXT3,strokeWidth=0.8))
    d.add(Line(30,10,30,90,strokeColor=TXT3,strokeWidth=0.8))
    # saturation curve (approximated)
    pts=[30,10,50,25,80,40,120,55,170,68,230,78,CW-10,85]
    d.add(PolyLine(pts,strokeColor=TEAL,strokeWidth=2,strokeDashArray=None))
    # comfort zone
    d.add(Rect(120,30,80,28,fillColor=HexColor('#22c55e'),fillOpacity=0.15,
               strokeColor=GRN,strokeWidth=1))
    d.add(String(145,42,'Comfort',fillColor=GRN,fontSize=7,fontName=FONTB))
    d.add(String(145,33,'Zone',fillColor=GRN,fontSize=7,fontName=FONTB))
    # labels
    d.add(String(32,2,'Dry-Bulb Temperature (°C)',fillColor=TXT3,fontSize=6,fontName=FONT))
    d.add(String(2,35,'Humidity',fillColor=TXT3,fontSize=6,fontName=FONT))
    d.add(String(2,25,'Ratio',fillColor=TXT3,fontSize=6,fontName=FONT))
    d.add(String(2,15,'(g/kg)',fillColor=TXT3,fontSize=6,fontName=FONT))
    d.add(String(CW/2,90,'Psychrometric Chart — HVAC Design Reference',
                 fillColor=TXT2,fontSize=7,fontName=FONTB,textAnchor='middle'))
    return d

def dia_duct_sizing():
    """Duct sizing diagram."""
    d=Drawing(CW,90)
    d.add(Rect(0,0,CW,90,fillColor=BG2,strokeColor=WLINE,strokeWidth=0.5))
    # main duct
    d.add(Rect(20,35,180,28,fillColor=BG3,strokeColor=GRN,strokeWidth=1.5))
    d.add(String(110,47,'Main Duct (600×300mm)',fillColor=GRN,fontSize=7,
                 fontName=FONTB,textAnchor='middle'))
    # branch 1
    d.add(Rect(80,63,16,20,fillColor=BG3,strokeColor=TEAL,strokeWidth=1))
    d.add(String(88,85,'B1',fillColor=TEAL,fontSize=6,fontName=FONT,textAnchor='middle'))
    # branch 2
    d.add(Rect(140,63,16,20,fillColor=BG3,strokeColor=TEAL,strokeWidth=1))
    d.add(String(148,85,'B2',fillColor=TEAL,fontSize=6,fontName=FONT,textAnchor='middle'))
    # flow arrows
    d.add(Line(200,49,230,49,strokeColor=YEL,strokeWidth=2))
    d.add(String(232,47,'→ 2.5 m/s',fillColor=YEL,fontSize=6,fontName=FONT))
    d.add(String(CW/2,5,'Fig. — Equal Friction Duct Sizing Method',
                 fillColor=TXT3,fontSize=6,fontName=FONT,textAnchor='middle'))
    return d

def dia_cooling_load():
    """Bar chart of cooling load components."""
    d=Drawing(CW,110)
    d.add(Rect(0,0,CW,110,fillColor=BG2,strokeColor=WLINE,strokeWidth=0.5))
    comps=[('Solar Gain',42,'#22c55e'),('Occupants',18,'#14b8a6'),
           ('Lighting',15,'#fbbf24'),('Equipment',14,'#f97316'),
           ('Infiltration',11,'#ef4444')]
    bw=36; gap=8; x0=30; max_h=70
    for i,(name,pct,col) in enumerate(comps):
        bh=int(pct*max_h/42)
        bx=x0+i*(bw+gap)
        d.add(Rect(bx,20,bw,bh,fillColor=HexColor(col),strokeColor=None))
        d.add(String(bx+bw/2,20+bh+2,f'{pct}%',fillColor=HexColor(col),
                     fontSize=7,fontName=FONTB,textAnchor='middle'))
        d.add(String(bx+bw/2,12,name,fillColor=TXT3,fontSize=5.5,
                     fontName=FONT,textAnchor='middle'))
    d.add(Line(20,20,CW-10,20,strokeColor=WLINE,strokeWidth=0.5))
    d.add(String(CW/2,100,'Cooling Load Component Distribution (%)',
                 fillColor=TXT2,fontSize=7,fontName=FONTB,textAnchor='middle'))
    return d

def dia_refrigeration():
    """Vapour compression cycle schematic."""
    d=Drawing(CW,110)
    d.add(Rect(0,0,CW,110,fillColor=BG2,strokeColor=WLINE,strokeWidth=0.5))
    # boxes
    boxes=[('Compressor',55,50,80,30,GRN),
           ('Condenser',195,50,80,30,TEAL),
           ('Expansion\nValve',195,20,80,20,YEL),
           ('Evaporator',55,20,80,20,HexColor('#60a5fa'))]
    for label,bx,by,bw,bh,col in boxes:
        d.add(Rect(bx,by,bw,bh,fillColor=BG3,strokeColor=col,strokeWidth=1.2))
        lines=label.split('\n')
        for j,l in enumerate(lines):
            d.add(String(bx+bw/2,by+bh/2+(len(lines)-1-j)*7,l,
                         fillColor=col,fontSize=6.5,fontName=FONTB,textAnchor='middle'))
    # connecting arrows
    d.add(Line(135,65,195,65,strokeColor=TXT2,strokeWidth=1.5))   # comp→cond
    d.add(Line(235,50,235,40,strokeColor=TXT2,strokeWidth=1.5))   # cond→exp
    d.add(Line(195,30,135,30,strokeColor=TXT2,strokeWidth=1.5))   # exp→evap
    d.add(Line(95,37,95,50,strokeColor=TXT2,strokeWidth=1.5))     # evap→comp
    # labels
    d.add(String(160,68,'High P',fillColor=TXT3,fontSize=5.5,fontName=FONT,textAnchor='middle'))
    d.add(String(160,25,'Low P',fillColor=TXT3,fontSize=5.5,fontName=FONT,textAnchor='middle'))
    d.add(String(CW/2,5,'Vapour Compression Refrigeration Cycle',
                 fillColor=TXT3,fontSize=6,fontName=FONT,textAnchor='middle'))
    return d

# ─── CONTENT SECTIONS ──────────────────────────────────────────────────────────

def toc():
    fl=[ChHead('','Table of Contents','Chapter Overview'),SP(4)]
    chapters=[
        ('1','HVAC Fundamentals & Thermodynamics'),
        ('2','Psychrometrics & Air Properties'),
        ('3','Heating & Cooling Load Calculations'),
        ('4','Air Distribution Systems & Duct Design'),
        ('5','Mechanical Cooling — Chillers & DX Systems'),
        ('6','Heating Systems — Boilers, Heat Pumps & Radiant'),
        ('7','Ventilation, IAQ & ASHRAE 62.1'),
        ('8','Humidification & Dehumidification'),
        ('9','HVAC Controls & Building Automation'),
        ('10','Energy Efficiency & Green HVAC'),
        ('11','Equipment Selection & Specifications'),
        ('12','Commissioning, Testing & Maintenance'),
    ]
    for num,title in chapters:
        fl.append(P(f'<font color="#22c55e"><b>Chapter {num}</b></font>  <font color="#e2e8f0">{title}</font>',BD))
        fl.append(SP(1))
    return fl

def s1():
    fl=[ChHead('1','HVAC Fundamentals','Thermodynamics, Heat Transfer & System Types'),SP(3)]
    fl.append(P('<b>What is HVAC?</b>',H2))
    fl.append(P('HVAC (Heating, Ventilation, and Air Conditioning) encompasses the technology and engineering disciplines used to achieve thermal comfort and acceptable indoor air quality. Modern HVAC systems serve residential, commercial, and industrial applications ranging from simple split units to complex central plant systems.',BD))
    fl.append(SP(2))
    fl.append(P('<b>Core Thermodynamic Principles</b>',H2))
    fl.extend([
        bullet('Heat Transfer Modes: Conduction, Convection, Radiation'),
        bullet('First Law: Energy conservation — Q = mcΔT (sensible heat)'),
        bullet('Second Law: Heat flows from high to low temperature (driving principle of refrigeration)'),
        bullet('Latent Heat: Energy absorbed/released during phase change (evaporation, condensation)'),
        bullet('Specific Heat: Air = 1.006 kJ/kg·K; Water = 4.186 kJ/kg·K'),
    ])
    fl.append(SP(3))
    fl.append(Box([
        'KEY FORMULA — Sensible Cooling Load:',
        'Q_s = 1.23 × V × ΔT   (Q in W, V in L/s, ΔT in °C)',
        'KEY FORMULA — Latent Cooling Load:',
        'Q_l = 3010 × V × Δω   (ω = humidity ratio g/kg)',
    ],GRN))
    fl.append(SP(3))
    fl.append(P('<b>HVAC System Classifications</b>',H2))
    data=[['System Type','Configuration','Best Application','Typical COP'],
          ['Split/Multi-split','DX Refrigerant','Small commercial / residential','2.5–4.5'],
          ['VRF/VRV','Variable refrigerant flow','Medium commercial, offices','3.5–5.0'],
          ['Fan Coil Units (FCU)','Chilled/hot water','Hotels, large commercial','—'],
          ['Air Handling Units','Central ducted','Factories, hospitals','—'],
          ['Chilled Water Plant','Central plant','Large commercial, campus','5.0–7.0'],
          ['DX Rooftop (RTU)','Packaged self-contained','Retail, light commercial','2.8–4.2']]
    fl.append(dark_table(data,[55,80,90,50]))
    return fl

def s2():
    fl=[ChHead('2','Psychrometrics','Air Properties, Moisture & Comfort Conditions'),SP(3)]
    fl.append(P('<b>Psychrometric Properties of Moist Air</b>',H2))
    fl.extend([
        bullet('Dry-Bulb Temperature (DBT): Sensible temperature measured by thermometer'),
        bullet('Wet-Bulb Temperature (WBT): Temperature after adiabatic saturation — affects cooling tower design'),
        bullet('Dew Point: Temperature at which condensation begins — critical for chilled water coil design'),
        bullet('Relative Humidity (%RH): Ratio of actual to saturation vapour pressure'),
        bullet('Specific Humidity (ω): Mass of water vapour per kg of dry air (g/kg)'),
        bullet('Enthalpy (h): Total heat content of moist air (kJ/kg) — used in coil calculations'),
    ])
    fl.append(SP(3))
    fl.append(DiagramWrap(dia_psychro(),'Fig. 2.1 — Simplified Psychrometric Chart'))
    fl.append(SP(3))
    fl.append(P('<b>ASHRAE Comfort Conditions</b>',H2))
    fl.append(Box([
        'Summer:  DBT 23–26°C | RH 30–60% | Air velocity < 0.25 m/s',
        'Winter:  DBT 20–23°C | RH 30–50% | Air velocity < 0.15 m/s',
        'Operative Temperature: Average of air temp & mean radiant temp',
        'PMV (Predicted Mean Vote): Target range -0.5 to +0.5',
    ],TEAL))
    fl.append(SP(2))
    data=[['Property','Symbol','Unit','Typical Range'],
          ['Dry-Bulb Temp','DBT','°C','20–45 (outdoor)'],
          ['Wet-Bulb Temp','WBT','°C','5–35'],
          ['Relative Humidity','RH','%','30–70 (indoor)'],
          ['Specific Humidity','ω','g/kg','8–20'],
          ['Enthalpy','h','kJ/kg','40–100'],
          ['Specific Volume','v','m³/kg','0.82–0.96']]
    fl.append(dark_table(data,[55,40,35,90]))
    return fl

def s3():
    fl=[ChHead('3','Load Calculations','Heating & Cooling Load Estimation Methods'),SP(3)]
    fl.append(P('<b>Cooling Load Sources</b>',H2))
    fl.append(DiagramWrap(dia_cooling_load(),'Fig. 3.1 — Cooling Load Component Breakdown'))
    fl.append(SP(2))
    fl.append(P('<b>Heat Gain Components</b>',H2))
    fl.extend([
        bullet('Solar Heat Gain (SHGC): Q_solar = A × SHGC × SC × CLF'),
        bullet('Transmission: Q_trans = U × A × (T_out - T_in)  [W]'),
        bullet('Infiltration Sensible: Q_inf = 0.33 × n × V_room × ΔT'),
        bullet('Occupants: Sensible 75W + Latent 55W per person (office activity)'),
        bullet('Lighting: CLF × Watts × 3.412  [BTU/hr] or × 1.0 [W]'),
        bullet('Equipment: 70–100% of nameplate rating (diversity factor applied)'),
    ])
    fl.append(SP(3))
    fl.append(Box([
        'RULE OF THUMB — Preliminary Sizing:',
        'Offices:  80–120 W/m²   | Retail: 120–180 W/m²',
        'Hotels:   60–90 W/m²    | Hospitals: 100–150 W/m²',
        'Data Centres: 1000–3000 W/m² (server-driven, not envelope)',
        'Safety factor: add 10–15% to calculated load',
    ],GRN))
    fl.append(SP(3))
    fl.append(P('<b>Heating Load Calculation</b>',H2))
    fl.extend([
        bullet('Fabric Losses: Q_fab = ΣU·A × ΔT_design'),
        bullet('Ventilation Losses: Q_vent = 0.33 × ACH × V × ΔT'),
        bullet('Design ΔT = Indoor setpoint (21°C) − Outdoor design temp'),
        bullet('ASHRAE 99.6% design dry-bulb: site-specific (check ASHRAE HOF)'),
        bullet('No solar/internal gains credited for heating load (conservative)'),
    ])
    fl.append(SP(2))
    data=[['Space Type','Cooling W/m²','Heating W/m²','Ventilation L/s·p'],
          ['Open Plan Office','90–120','40–60','10'],
          ['Conference Room','100–150','50–70','10'],
          ['Server Room','600–3000','N/A','per heat load'],
          ['Kitchen (Commercial)','200–400','80–120','35–50'],
          ['Retail','120–180','60–90','10'],
          ['Hospital Ward','100–140','60–80','20–30']]
    fl.append(dark_table(data,[80,70,65,65]))
    return fl

def s4():
    fl=[ChHead('4','Air Distribution','Duct Design, Sizing & Air Terminal Devices'),SP(3)]
    fl.append(P('<b>Duct Design Methods</b>',H2))
    fl.extend([
        bullet('Equal Friction Method: Constant pressure loss per metre (0.8–1.5 Pa/m). Most common.'),
        bullet('Velocity Reduction: Step-down velocity from main to branches. Simple but less accurate.'),
        bullet('Static Regain: Pressure recovery in transitions — used for long low-velocity systems.'),
        bullet('T-Method (Optimization): Minimises lifecycle cost. Best for large complex systems.'),
    ])
    fl.append(SP(3))
    fl.append(DiagramWrap(dia_duct_sizing(),'Fig. 4.1 — Equal Friction Duct Sizing & Branch Configuration'))
    fl.append(SP(3))
    fl.append(P('<b>Recommended Air Velocities</b>',H2))
    data=[['Duct Section','Velocity (m/s)','Pressure Loss (Pa/m)','Notes'],
          ['Main supply duct','5.0–8.0','0.8–1.5','Low noise, offices'],
          ['Branch ducts','3.0–5.0','0.8–1.2','Keep < 5 for quiet'],
          ['Final runouts','2.0–3.0','0.5–0.8','Last metre to terminal'],
          ['Supply grille face','2.0–2.5','—','Controls throw & noise'],
          ['Return grilles','1.5–2.0','—','Less critical than supply'],
          ['High velocity (IU)','10–15','—','Industrial, not comfort']]
    fl.append(dark_table(data,[85,75,80,90]))
    fl.append(SP(3))
    fl.append(P('<b>Air Terminal Devices</b>',H2))
    fl.extend([
        bullet('Ceiling Diffusers: 360° spread, ideal for open-plan; 1 per 15–25 m² typical'),
        bullet('Linear Slot Diffusers: Wall/floor perimeter installations; good for floor-to-ceiling glass'),
        bullet('Swirl Diffusers: Used for high ceilings (>4m) and displacement ventilation'),
        bullet('Grilles & Registers: Simple supply/return — low cost, directional control via louvers'),
        bullet('Induction Units: High-velocity primary air induces room air; used in perimeter zones'),
    ])
    return fl

def s5():
    fl=[ChHead('5','Mechanical Cooling','Chillers, DX Systems & Refrigeration'),SP(3)]
    fl.append(DiagramWrap(dia_refrigeration(),'Fig. 5.1 — Vapour Compression Refrigeration Cycle'))
    fl.append(SP(3))
    fl.append(P('<b>Chiller Types & Selection</b>',H2))
    data=[['Chiller Type','Capacity Range','COP','Refrigerant','Best For'],
          ['Air-Cooled Scroll','20–400 kW','2.5–3.5','R410A / R32','Small-medium buildings'],
          ['Air-Cooled Screw','200–1500 kW','3.0–4.0','R134a / R513A','Medium commercial'],
          ['Water-Cooled Centrifugal','500–5000+ kW','5.5–7.0','R134a / R1234ze','Large central plant'],
          ['Water-Cooled Screw','200–2000 kW','4.5–6.0','R134a','Versatile medium–large'],
          ['Absorption (LiBr-H₂O)','300–5000 kW','0.7–1.2 (COP_th)','Water (refrigerant)','Waste heat / trigeneration']]
    fl.append(dark_table(data,[85,60,45,75,80]))
    fl.append(SP(3))
    fl.append(P('<b>Refrigerant Transition — Phase-Out Schedule</b>',H2))
    fl.extend([
        bullet('R22 (HCFC): Phased out globally — service only from recovered stock'),
        bullet('R410A (HFC): High GWP=2088 — EU F-Gas Phase-down by 2030'),
        bullet('R32 (HFC): GWP=675 — transitional, widely used in split systems'),
        bullet('R134a: GWP=1430 — phasing out in new equipment by 2025 (EU)'),
        bullet('R1234ze/R1234yf (HFO): GWP<1 — emerging standard for new chillers'),
        bullet('CO₂ (R744): Natural refrigerant, GWP=1 — transcritical systems growing'),
    ])
    fl.append(SP(2))
    fl.append(Box([
        'COOLING TOWER SELECTION:',
        'Approach Temp = Leaving Water Temp − Wet-Bulb Temp (target: 3–4°C)',
        'Range = Entering − Leaving CW Temp (typically 5–6°C)',
        'Size on L/min per kW: approx. 3.6 L/min per kW of condenser heat rejected',
    ],TEAL))
    return fl

def s6():
    fl=[ChHead('6','Heating Systems','Boilers, Heat Pumps & Radiant Heating'),SP(3)]
    fl.append(P('<b>Boiler Types & Efficiency</b>',H2))
    data=[['Boiler Type','Efficiency (%)','Fuel','Output Temp','Application'],
          ['Non-condensing','80–85','Gas/Oil','70–90°C','Older systems, high temp'],
          ['Condensing','90–98','Gas','55–80°C','Modern commercial & residential'],
          ['Electric Immersion','99','Electricity','Variable','Small / backup'],
          ['Biomass Pellet','78–85','Wood Pellets','70–85°C','Sustainable / rural'],
          ['Combined Heat & Power','CHP 80–90%','Gas/Bio','80–95°C','Large sites, simultaneous']]
    fl.append(dark_table(data,[80,60,55,60,100]))
    fl.append(SP(3))
    fl.append(P('<b>Heat Pump Technology</b>',H2))
    fl.extend([
        bullet('Air-Source Heat Pump (ASHP): COP 2.5–4.5 at 7°C ambient, 35°C flow temp'),
        bullet('Ground-Source Heat Pump (GSHP): COP 3.5–5.5 — stable ground temp (8–12°C)'),
        bullet('Water-Source HP: COP 4.0–6.0 — rivers, lakes, wastewater loops as heat sink'),
        bullet('Coefficient of Performance (COP) = Heat Output / Electrical Input'),
        bullet('SCOP (Seasonal): Average COP across heating season — used for EU energy ratings'),
        bullet('Low Temperature Systems (35–45°C) maximise HP efficiency; ideal with underfloor heating'),
    ])
    fl.append(SP(2))
    fl.append(Box([
        'HEAT PUMP SIZING RULE:',
        'Capacity = Peak Heat Loss (W) ÷ [1 - (1/COP)]   ← electrical input portion',
        'Minimum outdoor design temp: ASHP rated to -15°C (cold climate) / -7°C (standard)',
        'Buffer tank recommended: ≥50L per kW for cycling protection',
    ],GRN))
    fl.append(SP(3))
    fl.append(P('<b>Radiant Heating & Underfloor Systems</b>',H2))
    fl.extend([
        bullet('UFH Pipe Spacing: 100–200mm centres; flow temp 35–45°C (wet) or 55–65°C (screed)'),
        bullet('Surface Temperature Limit: Max 29°C occupied areas; 35°C bathrooms'),
        bullet('Heat Output: 80–120 W/m² typical; floor construction U-value affects performance'),
        bullet('Radiant Panels: Ceiling/wall; 45–60°C water; fast response, no ductwork'),
        bullet('Infrared (IR) Heaters: Industrial/warehouse; radiant efficiency 85–95%'),
    ])
    return fl

def s7():
    fl=[ChHead('7','Ventilation & IAQ','ASHRAE 62.1, Fresh Air & Pollutant Control'),SP(3)]
    fl.append(P('<b>Ventilation Rate Requirements</b>',H2))
    data=[['Space Type','Rp (L/s·p)','Ra (L/s·m²)','Typical OA (L/s·p)'],
          ['Office — Open Plan','5','0.3','10'],
          ['Conference Room','5','0.3','10'],
          ['Retail Store','7.5','0.3','15'],
          ['Restaurant Dining','7.5','0.6','18'],
          ['Hospital Patient Room','—','—','25–30'],
          ['Classroom','5','0.6','12'],
          ['Gymnasium','5','0.3','10']]
    fl.append(dark_table(data,[90,55,55,80]))
    fl.append(SP(3))
    fl.extend([
        P('<b>Rp</b> = People outdoor air rate (breathing zone)  |  <b>Ra</b> = Area rate (building-related pollutants)',SM),
        SP(2),
    ])
    fl.append(P('<b>Indoor Air Quality Pollutants</b>',H2))
    fl.extend([
        bullet('CO₂: < 1000 ppm (ASHRAE) — indicator of ventilation adequacy'),
        bullet('CO: < 9 ppm (8hr TWA) — combustion gases, parking garage exhaust'),
        bullet('PM2.5: < 12 µg/m³ (EPA annual average) — requires MERV-13+ filtration'),
        bullet('VOCs (Total): < 300 µg/m³ — off-gassing from materials, cleaning products'),
        bullet('Formaldehyde: < 0.1 ppm — composite wood, insulation; address at source'),
        bullet('Legionella: Control via cooling tower management, temperature maintenance'),
    ])
    fl.append(SP(2))
    fl.append(Box([
        'DEMAND-CONTROLLED VENTILATION (DCV):',
        'Modulate OA based on CO₂ sensors (setpoint: 700-800 ppm above ambient)',
        'Energy Savings: 20–40% OA reduction at partial occupancy',
        'Required by: ASHRAE 90.1 for occupancy > 25 people / 40 m²',
    ],TEAL))
    fl.append(SP(2))
    fl.append(P('<b>Heat Recovery Ventilation (HRV/ERV)</b>',H2))
    fl.extend([
        bullet('Plate Heat Exchanger: 60–80% sensible efficiency; no cross-contamination'),
        bullet('Rotary Heat Wheel: 75–85% total efficiency; slight cross-leakage'),
        bullet('Run-Around Coil: Cross-contamination proof; 45–65% efficiency'),
        bullet('ERV (Energy Recovery): Transfers both heat AND moisture — ideal for humid climates'),
        bullet('Minimum HRV required by ASHRAE 90.1 when OA > 70% of supply'),
    ])
    return fl

def s8():
    fl=[ChHead('8','Humidity Control','Humidification, Dehumidification & Mould Prevention'),SP(3)]
    fl.append(P('<b>Humidification Systems</b>',H2))
    data=[['Type','Method','Energy','Hygiene Risk','Capacity Range'],
          ['Steam (Electric)','Electrode boiler','High','Low','5–500 kg/hr'],
          ['Steam (Gas)','Gas-fired boiler','Medium','Low','50–2000 kg/hr'],
          ['Evaporative Pad','Adiabatic (water)','Low','Medium','5–200 kg/hr'],
          ['Ultrasonic','Piezoelectric vibration','Low','Medium-High','0.5–50 kg/hr'],
          ['High-Pressure Fog','Atomised nozzles','Low','Medium','10–500 kg/hr']]
    fl.append(dark_table(data,[80,75,50,60,75]))
    fl.append(SP(3))
    fl.append(P('<b>Dehumidification Strategies</b>',H2))
    fl.extend([
        bullet('Cooling Coil: Reduce air below dew point — most common method in AC systems'),
        bullet('Desiccant Wheel: Chemical absorption; regenerated with heat — hospitals, food processing'),
        bullet('Heat Pipe Assisted: Pre-cool before coil, reheat after — improves dehumidification efficiency'),
        bullet('Chilled Beam: Cannot handle latent loads — always use with separate OA ventilation'),
    ])
    fl.append(SP(2))
    fl.append(Box([
        'MOULD PREVENTION:',
        'Maintain RH < 70% (surface temp > dew point of room air)',
        'Cold bridge factor: fRsi > 0.75 (UK Building Regs) to prevent surface condensation',
        'Thermal bridges at junctions — calculate using software (THERM, PSI values)',
        'Vapour barriers on warm side of insulation in cold climates',
    ],YEL))
    return fl

def s9():
    fl=[ChHead('9','HVAC Controls','BMS, DDC, VFDs & Smart Building Integration'),SP(3)]
    fl.append(P('<b>Control Strategies</b>',H2))
    fl.extend([
        bullet('On/Off Control: Simple thermostat — acceptable for residential; poor energy performance'),
        bullet('Proportional (P): Output proportional to error — faster response, steady-state offset'),
        bullet('PID Control: Proportional + Integral + Derivative — eliminates offset, standard for AHU'),
        bullet('Setpoint Reset: Adjust supply air/water temp based on zone demand — saves energy'),
        bullet('Optimal Start: Learn thermal mass & pre-condition space before occupancy'),
    ])
    fl.append(SP(2))
    fl.append(P('<b>Variable Speed Drives (VSD/VFD)</b>',H2))
    fl.append(Box([
        'AFFINITY LAWS (Fan / Pump):',
        'Flow ∝ Speed  |  Pressure ∝ Speed²  |  Power ∝ Speed³',
        'Reducing speed to 80% → Power reduces to 51% (0.8³)',
        'Energy Savings: 30–50% vs. constant speed with damper control',
        'Apply to: Supply/Return fans, Chilled water pumps, Condenser water pumps',
    ],GRN))
    fl.append(SP(3))
    fl.append(P('<b>Building Automation System (BAS/BMS)</b>',H2))
    data=[['Protocol','Application','Communication','Speed'],
          ['BACnet','HVAC / Fire / Lighting','IP, MS/TP, LON','High'],
          ['Modbus RTU/TCP','Chillers, VFDs, Meters','RS-485 / Ethernet','Medium'],
          ['LON (LonWorks)','Building automation','Twisted pair','Medium'],
          ['KNX','Lighting / Blind / HVAC','TP, IP, RF','Medium'],
          ['DALI','Lighting control','2-wire bus','Fast']]
    fl.append(dark_table(data,[55,95,80,50]))
    fl.append(SP(2))
    fl.extend([
        bullet('DDC (Direct Digital Control): Microprocessor-based controllers at field level'),
        bullet('Supervisory Level: BMS graphical interface, trending, alarm management'),
        bullet('Cloud Integration: API connections to smart metering, weather data, predictive maintenance'),
    ])
    return fl

def s10():
    fl=[ChHead('10','Energy Efficiency','ASHRAE 90.1, LEED & Green HVAC Design'),SP(3)]
    fl.append(P('<b>ASHRAE 90.1 Key Requirements</b>',H2))
    fl.extend([
        bullet('Economiser Mode: Free cooling when OA enthalpy < RA enthalpy (climate zones 1–8)'),
        bullet('Supply Air Temperature Reset: Reset SAT up when zone demand is low'),
        bullet('Chiller Plant Efficiency: Min COP 5.5 for water-cooled centrifugal > 528 kW'),
        bullet('Boiler Efficiency: Min 80% Et for gas-fired > 88 kW input'),
        bullet('Fan Power Limitation: Max 1.25 W/L/s for supply fan (variable volume)'),
        bullet('Pipe & Duct Insulation: Per Table 6.8.3 — all supply/return must be insulated'),
    ])
    fl.append(SP(2))
    fl.append(P('<b>Energy Benchmarks</b>',H2))
    data=[['Building Type','EUI (kWh/m²/yr)','HVAC Share','LEED Target (% vs baseline)'],
          ['Office','150–220','40–50%','15–20% better'],
          ['Hotel','250–400','45–55%','15–20% better'],
          ['Hospital','400–800','50–60%','20–30% better'],
          ['Retail','200–350','35–45%','10–15% better'],
          ['Data Centre','600–2000','40–50% (IT+cooling)','PUE < 1.4']]
    fl.append(dark_table(data,[80,80,65,130]))
    fl.append(SP(3))
    fl.append(Box([
        'LOW-ENERGY HVAC STRATEGIES:',
        'Passive Cooling: Night purge ventilation, thermal mass, shading',
        'Radiant Cooling: Chilled beams / ceiling panels — lower supply temps, no fan coil noise',
        'TABS (Thermally Activated Building Systems): Concrete core cooling, lowest energy',
        'Geothermal Ground Loop: Stable source/sink temperature year-round',
        'Renewable Integration: Solar PV → electric HP; Solar thermal → DHW/absorption cooling',
    ],TEAL))
    return fl

def s11():
    fl=[ChHead('11','Equipment Selection','Specifications, Performance & Procurement'),SP(3)]
    fl.append(P('<b>AHU Selection Checklist</b>',H2))
    fl.extend([
        bullet('Airflow (L/s): Sum of all zone peak flows with 10% spare'),
        bullet('External Static Pressure: Include all components + distribution system resistance'),
        bullet('Coil Entering/Leaving Conditions: Match psychrometric design state points'),
        bullet('Filter Grade: MERV-8 pre-filter + MERV-13 final (or HEPA for healthcare)'),
        bullet('Fan Class: Class I (<750 Pa), Class II (750–1500 Pa), Class III (>1500 Pa)'),
        bullet('Sound Power Level: Specify max dB(A) at each octave band'),
        bullet('Access for Maintenance: Min. 600mm clear access for coils, filters, fan'),
    ])
    fl.append(SP(3))
    fl.append(P('<b>Chiller Plant Design</b>',H2))
    fl.extend([
        bullet('N+1 Redundancy: Install n+1 chillers for 100% capacity with one standby'),
        bullet('Chilled Water ΔT: Design for 6–8°C (5.5°C supply, 11.5°C return) for efficiency'),
        bullet('Variable Primary Flow: Eliminates secondary pumps; differential pressure control'),
        bullet('Free Cooling Mode: Plate heat exchanger bypass when ambient ≤ 12°C (WC chiller)'),
        bullet('Thermal Storage: Ice or chilled water storage for peak demand shifting'),
    ])
    fl.append(SP(2))
    fl.append(Box([
        'PUMP SELECTION:',
        'Head = System curve at design flow (all pressure drops summed)',
        'Duty point: Pump curve intersects system curve at design flow',
        'NPSH available > NPSH required + 0.5 m safety margin',
        'Min. efficiency index (MEI) ≥ 0.4 (EU regulation)',
    ],GRN))
    return fl

def s12():
    fl=[ChHead('12','Commissioning & Maintenance','TAB, HVAC Cx & Preventive Maintenance'),SP(3)]
    fl.append(P('<b>Testing, Adjusting & Balancing (TAB)</b>',H2))
    fl.extend([
        bullet('Air Balancing: Measure and adjust supply/return airflows to design values (±10%)'),
        bullet('Hydronic Balancing: Proportional balancing method — start from index circuit'),
        bullet('Instrumentation: Pitot tube traversal, Capture hood, Ultrasonic flow meter'),
        bullet('Acceptance Criteria: ASHRAE 111 (duct), ASHRAE 90.3 (hydronic)'),
        bullet('Reports: Document all measured vs. design values for each terminal'),
    ])
    fl.append(SP(2))
    fl.append(P('<b>Preventive Maintenance Schedule</b>',H2))
    data=[['Component','Monthly','Quarterly','Annually'],
          ['Air Filters','Inspect / replace','—','—'],
          ['Coils (evap/cond)','—','Clean & inspect','Full clean, UV treatment'],
          ['Belts & Bearings','—','Tension check','Replace if needed'],
          ['Refrigerant Charge','—','Leak check','Full performance test'],
          ['Chiller Tubes','—','—','Water-tube brush clean'],
          ['Cooling Tower','Biocide dosing','Blowdown check','Full inspection & clean'],
          ['BMS Calibration','—','Sensor calibration','Full sequence check']]
    fl.append(dark_table(data,[90,65,70,80]))
    fl.append(SP(2))
    fl.append(Box([
        'COMMISSIONING STAGES:',
        '1. Factory Acceptance Test (FAT) — verify before delivery',
        '2. Installation Check — correct piping, ductwork, controls wiring',
        '3. Pre-functional Tests — component-level checks (pump rotation, control signals)',
        '4. Functional Performance Tests — full sequence of operations under load',
        '5. O&M Training & Handover Documentation',
    ],GRN))
    return fl

def build():
    story=[PageBreak()]
    for sec in [toc,s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12]:
        story.extend(sec()); story.append(PageBreak())
    doc=SimpleDocTemplate(out,pagesize=A4,leftMargin=M,rightMargin=M,
        topMargin=18*mm,bottomMargin=16*mm,title=DOC_TITLE,author=AUTHOR,
        subject='HVAC design, load calculations, duct sizing, chiller selection, energy efficiency',
        creator='AYE Tech Hub PDF Engine')
    doc.build(story,onFirstPage=draw_cover,onLaterPages=draw_page)
    size=os.path.getsize(out)/1024
    pages=doc.page
    import builtins; builtins.print(f'Generated: {out}  ({size:.0f} KB, {pages} pages)')

if __name__=='__main__': build()
