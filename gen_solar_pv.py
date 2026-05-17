"""AYE Tech Hub — Solar PV Design Guide PDF Generator"""
import os,sys
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor,white,black
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (SimpleDocTemplate,Paragraph,Spacer,Table,
    TableStyle,PageBreak,Flowable,KeepTogether)
from reportlab.graphics.shapes import (Drawing,Rect,Line,String,Circle,
    PolyLine,Group,Polygon)
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
AMB  =HexColor('#fbbf24')   # primary accent — amber (solar)
ORG  =HexColor('#f97316')   # secondary
GRN  =HexColor('#22c55e')
TEAL =HexColor('#14b8a6')
TXT  =HexColor('#e2e8f0')
TXT2 =HexColor('#94a3b8')
TXT3 =HexColor('#64748b')
WLINE=HexColor('#1e3a5f')

DOC_TITLE='Solar PV Systems Design Guide — Grid-Tied, Off-Grid & Hybrid Engineering'
AUTHOR   ='AYE Tech Hub Engineering Team'
SUBTITLE ='Site Assessment · Array Sizing · Inverter Selection · Battery Storage · Grid Connection'
out=os.path.join(os.path.dirname(__file__),'pdfs','solar-pv-design-guide.pdf')

FONT='Helvetica'
FONTB='Helvetica-Bold'

def styles():
    def s(name,**kw): return ParagraphStyle(name,**kw)
    H1=s('H1',fontName=FONTB,fontSize=18,textColor=AMB,spaceAfter=4,spaceBefore=8,leading=22)
    H2=s('H2',fontName=FONTB,fontSize=13,textColor=AMB,spaceAfter=3,spaceBefore=6,leading=16)
    H3=s('H3',fontName=FONTB,fontSize=10,textColor=ORG,spaceAfter=2,spaceBefore=4,leading=13)
    BD=s('BD',fontName=FONT,fontSize=9,textColor=TXT,leading=14,spaceAfter=2,
         spaceBefore=0,alignment=TA_JUSTIFY)
    BL=s('BL',fontName=FONT,fontSize=9,textColor=TXT,leading=13,spaceAfter=1,
         leftIndent=10,firstLineIndent=-7)
    CB=s('CB',fontName=FONTB,fontSize=8,textColor=BG,leading=11)
    CT=s('CT',fontName=FONTB,fontSize=8,textColor=AMB,leading=10,alignment=TA_CENTER)
    SM=s('SM',fontName=FONT,fontSize=8,textColor=TXT2,leading=11)
    return H1,H2,H3,BD,BL,CB,CT,SM
H1,H2,H3,BD,BL,CB,CT,SM=styles()

def P(t,st=BD): return Paragraph(t,st)
def SP(n=4): return Spacer(1,n*mm)

def bullet(t,c='#fbbf24'):
    return P(f'<font color="{c}">&#9632;</font>  {t}',BL)

def draw_cover(canv,doc):
    canv.saveState()
    canv.setFillColor(BG); canv.rect(0,0,W,H,fill=1,stroke=0)
    # amber glow at top
    for i,alpha in enumerate([0.20,0.12,0.06]):
        canv.setFillColor(AMB); canv.setFillAlpha(alpha)
        canv.rect(0,H-(i+1)*60,W,60,fill=1,stroke=0)
    canv.setFillAlpha(1.0)
    canv.setFillColor(AMB); canv.rect(0,0,5,H,fill=1,stroke=0)
    _draw_cover_solar(canv)
    canv.setFillColor(AMB); canv.setFont(FONTB,11)
    canv.drawString(M,H-18*mm,'AYE TECH HUB')
    canv.setFillColor(TXT2); canv.setFont(FONT,8)
    canv.drawString(M,H-24*mm,'Engineering the Future')
    canv.setFillColor(AMB)
    canv.roundRect(W-M-50,H-22*mm,50,12,3,fill=1,stroke=0)
    canv.setFillColor(BG); canv.setFont(FONTB,8)
    canv.drawCentredString(W-M-25,H-17*mm,'2025 EDITION')
    y=H*0.42
    canv.setFillColor(AMB); canv.setFont(FONTB,26)
    canv.drawString(M,y,'SOLAR PV SYSTEMS')
    canv.setFillColor(white); canv.setFont(FONTB,20)
    canv.drawString(M,y-28,'DESIGN GUIDE')
    canv.setFillColor(TXT2); canv.setFont(FONT,9)
    for i,line in enumerate(SUBTITLE.split(' · ')):
        canv.drawString(M,y-50-i*13,f'  {line}')
    canv.setStrokeColor(AMB); canv.setLineWidth(1.5)
    canv.line(M,y-95,W-M,y-95)
    stats=[('Grid-Tied','System Types'),('Off-Grid','Battery Storage'),('Hybrid','Solutions'),('IEC/IEEE','Standards')]
    bw=(W-2*M)/4; by=y-120
    for i,(val,lbl) in enumerate(stats):
        bx=M+i*bw+bw/2
        canv.setFillColor(AMB); canv.setFont(FONTB,12); canv.drawCentredString(bx,by,val)
        canv.setFillColor(TXT2); canv.setFont(FONT,7); canv.drawCentredString(bx,by-11,lbl)
    canv.setFillColor(BG2); canv.rect(0,22,W,22,fill=1,stroke=0)
    canv.setFillColor(AMB); canv.setFont(FONTB,8); canv.drawString(M,30,AUTHOR)
    canv.setFillColor(TXT3); canv.setFont(FONT,7); canv.drawRightString(W-M,30,'awetgknway@gmail.com')
    canv.restoreState()

def _draw_cover_solar(canv):
    """Solar panel array + sun diagram on cover."""
    canv.saveState()
    y0=H*0.55
    # Sun
    canv.setFillColor(AMB); canv.setFillAlpha(0.9)
    canv.circle(W-M-35,y0+60,28,fill=1,stroke=0)
    canv.setFillAlpha(0.3)
    canv.circle(W-M-35,y0+60,38,fill=1,stroke=0)
    canv.setFillAlpha(1.0)
    # Solar panel grid
    px,py=M+10,y0+10
    pw,ph=22,14
    for row in range(3):
        for col in range(7):
            bx=px+col*(pw+3); by=py+row*(ph+3)
            canv.setFillColor(BG3); canv.setStrokeColor(AMB)
            canv.setLineWidth(0.8); canv.rect(bx,by,pw,ph,fill=1,stroke=1)
            canv.setStrokeColor(HexColor('#1e3a5f')); canv.setLineWidth(0.3)
            canv.line(bx+pw/3,by,bx+pw/3,by+ph)
            canv.line(bx+2*pw/3,by,bx+2*pw/3,by+ph)
            canv.line(bx,by+ph/2,bx+pw,by+ph/2)
    # arrow from sun to panels
    canv.setStrokeColor(AMB); canv.setLineWidth(1.5)
    canv.setFillColor(AMB)
    canv.line(W-M-60,y0+55,px+180,y0+38)
    # inverter
    canv.setFillColor(BG3); canv.setStrokeColor(ORG); canv.setLineWidth(1)
    canv.roundRect(px+175,y0-20,55,30,3,fill=1,stroke=1)
    canv.setFillColor(ORG); canv.setFont(FONTB,7)
    canv.drawCentredString(px+202,y0-5,'INVERTER')
    canv.setFillColor(TXT2); canv.setFont(FONT,6)
    canv.drawCentredString(px+202,y0-13,'DC → AC')
    # grid connection
    canv.setStrokeColor(GRN); canv.setLineWidth(1.5)
    canv.line(px+230,y0-5,px+265,y0-5)
    canv.setFillColor(GRN); canv.setFont(FONTB,7)
    canv.drawString(px+268,y0-8,'GRID')
    canv.setFillColor(TXT3); canv.setFont(FONT,6)
    canv.drawCentredString(px+100,y0-32,'Fig. 1 — Grid-Tied Solar PV System Overview')
    canv.restoreState()

def draw_page(canv,doc):
    canv.saveState()
    canv.setFillColor(BG); canv.rect(0,0,W,H,fill=1,stroke=0)
    canv.setFillColor(BG2); canv.rect(0,H-10*mm,W,10*mm,fill=1,stroke=0)
    canv.setStrokeColor(AMB); canv.setLineWidth(1.5)
    canv.line(M,H-10*mm,W-M,H-10*mm)
    canv.setFillColor(AMB); canv.setFont(FONTB,8)
    canv.drawString(M,H-7*mm,'AYE Tech Hub')
    canv.setFillColor(TXT3); canv.setFont(FONT,7)
    canv.drawRightString(W-M,H-7*mm,'Solar PV Systems Design Guide')
    canv.setFillColor(BG2); canv.rect(0,0,W,10*mm,fill=1,stroke=0)
    canv.setStrokeColor(AMB); canv.line(M,10*mm,W-M,10*mm)
    canv.setFillColor(TXT3); canv.setFont(FONT,7)
    canv.drawString(M,3.5*mm,'AYE Tech Hub — Engineering the Future')
    canv.setFillColor(AMB); canv.setFont(FONTB,8)
    canv.drawRightString(W-M,3.5*mm,f'Page {doc.page-1}')
    canv.setFillColor(BG2); canv.rect(0,0,5,H,fill=1,stroke=0)
    canv.setFillColor(AMB); canv.rect(0,0,3,H,fill=1,stroke=0)
    canv.restoreState()

class Box(Flowable):
    def __init__(self,content,accent=None,width=None):
        Flowable.__init__(self)
        self.content=content; self.accent=accent or AMB; self.width=width or CW
    def wrap(self,aw,ah):
        self.w=min(self.width,aw); self.h=len(self.content)*14+14
        return self.w,self.h
    def draw(self):
        c=self.canv; c.saveState()
        c.setFillColor(BG3); c.roundRect(0,0,self.w,self.h,4,fill=1,stroke=0)
        c.setFillColor(self.accent); c.rect(0,0,3,self.h,fill=1,stroke=0)
        c.setFillColor(self.accent); c.setFont(FONTB,8)
        for i,line in enumerate(self.content):
            c.drawString(8,self.h-12-i*14,line)
        c.restoreState()

class ChHead(Flowable):
    def __init__(self,num,title,subtitle=''):
        Flowable.__init__(self); self.num=num; self.title=title; self.subtitle=subtitle
    def wrap(self,aw,ah): return aw,26*mm
    def draw(self):
        c=self.canv; w=self._availableWidth if hasattr(self,'_availableWidth') else CW
        c.saveState()
        c.setFillColor(BG2); c.roundRect(0,0,w,24*mm,4,fill=1,stroke=0)
        c.setStrokeColor(AMB); c.setLineWidth(2); c.line(0,24*mm,w,24*mm)
        c.setFillColor(BG3); c.roundRect(4,12*mm,22*mm,11*mm,3,fill=1,stroke=0)
        c.setFillColor(AMB); c.setFont(FONTB,18); c.drawCentredString(4+11*mm,14.5*mm,self.num)
        c.setFillColor(AMB); c.setFont(FONTB,14); c.drawString(30*mm,16*mm,self.title)
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
            c.setFillColor(TXT3); c.setFont(FONT,7); c.drawCentredString(self.w/2,3,self.caption)
        c.restoreState()

def dark_table(data,col_widths,hdr=True):
    style=[
        ('BACKGROUND',(0,0),(-1,0),BG3),
        ('TEXTCOLOR',(0,0),(-1,0),AMB),
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
        st=CT if (i==0 and hdr) else BD
        rows.append([Paragraph(str(c),st) for c in row])
    return Table(rows,colWidths=col_widths,style=TableStyle(style),repeatRows=1 if hdr else 0)

# ─── DIAGRAMS ──────────────────────────────────────────────────────────────────

def dia_system_types():
    """Three system types: grid-tied, off-grid, hybrid."""
    d=Drawing(CW,95)
    d.add(Rect(0,0,CW,95,fillColor=BG2,strokeColor=WLINE,strokeWidth=0.5))
    systems=[
        ('GRID-TIED',5,AMB,'PV+Inverter+Grid'),
        ('OFF-GRID',CW/3+5,GRN,'PV+Battery+Load'),
        ('HYBRID',2*CW/3+5,ORG,'PV+Battery+Grid'),
    ]
    bw=CW/3-10
    for label,bx,col,sub in systems:
        d.add(Rect(bx,18,bw,55,fillColor=BG3,strokeColor=col,strokeWidth=1.2,rx=4,ry=4))
        d.add(String(bx+bw/2,55,label,fillColor=col,fontSize=8,fontName=FONTB,textAnchor='middle'))
        d.add(String(bx+bw/2,40,sub,fillColor=TXT2,fontSize=6,fontName=FONT,textAnchor='middle'))
        # mini solar panel icon
        for px in range(3):
            for py2 in range(2):
                d.add(Rect(bx+8+px*10,y2:=28+py2*7,9,6,fillColor=BG3,strokeColor=col,strokeWidth=0.5))
    d.add(String(CW/2,5,'Fig. 1.1 — Solar PV System Configurations',
                 fillColor=TXT3,fontSize=6,fontName=FONT,textAnchor='middle'))
    return d

def dia_pv_cell():
    """PV module construction layers."""
    d=Drawing(CW,100)
    d.add(Rect(0,0,CW,100,fillColor=BG2,strokeColor=WLINE,strokeWidth=0.5))
    layers=[
        (80,'Tempered Glass (3.2mm)',AMB),
        (70,'EVA Encapsulant',TEAL),
        (58,'p-n Junction Solar Cells',GRN),
        (48,'EVA Encapsulant',TEAL),
        (38,'Backsheet (Tedlar)',ORG),
        (28,'Aluminium Frame',TXT3),
    ]
    x0=30; lw=220
    for y,label,col in layers:
        d.add(Rect(x0,y,lw,9,fillColor=BG3,strokeColor=col,strokeWidth=0.8))
        d.add(String(x0+lw+5,y+4,label,fillColor=col,fontSize=6,fontName=FONT))
    # arrows: photon
    d.add(Line(x0-15,88,x0-15,78,strokeColor=AMB,strokeWidth=1.5))
    d.add(String(x0-30,90,'hv',fillColor=AMB,fontSize=7,fontName=FONTB))
    d.add(String(CW/2,5,'Fig. 2.1 — PV Module Layer Construction',
                 fillColor=TXT3,fontSize=6,fontName=FONT,textAnchor='middle'))
    return d

def dia_iv_curve():
    """I-V and P-V curve sketch."""
    d=Drawing(CW,110)
    d.add(Rect(0,0,CW,110,fillColor=BG2,strokeColor=WLINE,strokeWidth=0.5))
    # axes
    d.add(Line(30,15,CW-10,15,strokeColor=TXT3,strokeWidth=0.8))
    d.add(Line(30,15,30,98,strokeColor=TXT3,strokeWidth=0.8))
    # I-V curve (approximated)
    iv_pts=[30,93,80,92,130,90,175,85,210,72,230,55,245,30,255,15]
    d.add(PolyLine(iv_pts,strokeColor=AMB,strokeWidth=2))
    # P-V curve
    pv_pts=[30,15,60,30,90,50,120,65,150,75,175,78,200,72,225,55,255,15]
    d.add(PolyLine(pv_pts,strokeColor=GRN,strokeWidth=1.5,strokeDashArray=[3,2]))
    # MPP point
    d.add(Circle(175,78,4,fillColor=ORG,strokeColor=None))
    d.add(String(178,80,'MPP',fillColor=ORG,fontSize=6,fontName=FONTB))
    # labels
    d.add(String(32,2,'Voltage (V)',fillColor=TXT3,fontSize=6,fontName=FONT))
    d.add(String(2,50,'I (A)',fillColor=AMB,fontSize=6,fontName=FONT))
    # legend
    d.add(Line(CW-70,95,CW-55,95,strokeColor=AMB,strokeWidth=2))
    d.add(String(CW-52,93,'I-V',fillColor=AMB,fontSize=6,fontName=FONT))
    d.add(Line(CW-70,85,CW-55,85,strokeColor=GRN,strokeWidth=1.5,strokeDashArray=[3,2]))
    d.add(String(CW-52,83,'P-V',fillColor=GRN,fontSize=6,fontName=FONT))
    d.add(String(CW/2,102,'I-V and P-V Curves — Maximum Power Point Tracking',
                 fillColor=TXT2,fontSize=7,fontName=FONTB,textAnchor='middle'))
    return d

def dia_battery_bank():
    """Battery bank series/parallel wiring."""
    d=Drawing(CW,95)
    d.add(Rect(0,0,CW,95,fillColor=BG2,strokeColor=WLINE,strokeWidth=0.5))
    # 3×2 battery grid
    for row in range(2):
        for col in range(3):
            bx=20+col*60; by=20+row*32
            d.add(Rect(bx,by,50,28,fillColor=BG3,strokeColor=GRN,strokeWidth=1.2,rx=2,ry=2))
            d.add(String(bx+25,by+16,'12V',fillColor=GRN,fontSize=7,fontName=FONTB,textAnchor='middle'))
            d.add(String(bx+25,by+6,'100Ah',fillColor=TXT2,fontSize=6,fontName=FONT,textAnchor='middle'))
    # series connections (top row)
    for col in range(2):
        bx=20+col*60+50; by=34
        d.add(Line(bx,by,bx+10,by,strokeColor=AMB,strokeWidth=1.5))
    # parallel connection (between rows)
    d.add(Line(45,48,45,52,strokeColor=TEAL,strokeWidth=1.5))
    # labels
    d.add(String(220,60,'Series: 3×12V = 36V',fillColor=AMB,fontSize=7,fontName=FONT))
    d.add(String(220,45,'Parallel: 2×100Ah = 200Ah',fillColor=TEAL,fontSize=7,fontName=FONT))
    d.add(String(220,30,'Total: 36V / 200Ah',fillColor=GRN,fontSize=7,fontName=FONTB))
    d.add(String(220,18,'= 7.2 kWh',fillColor=GRN,fontSize=7,fontName=FONTB))
    d.add(String(CW/2,5,'Fig. 7.1 — Battery Bank Series/Parallel Configuration',
                 fillColor=TXT3,fontSize=6,fontName=FONT,textAnchor='middle'))
    return d

# ─── CONTENT ──────────────────────────────────────────────────────────────────

def toc():
    fl=[ChHead('','Table of Contents','Chapter Overview'),SP(4)]
    chapters=[
        ('1','Solar PV Fundamentals — Physics, Technology & System Types'),
        ('2','PV Module Technology & Specifications'),
        ('3','Solar Resource Assessment & Site Analysis'),
        ('4','Array Sizing & Yield Estimation'),
        ('5','Grid-Tied System Design'),
        ('6','String & Combiner Box Design'),
        ('7','Battery Storage & Off-Grid Design'),
        ('8','Inverter Selection & Configuration'),
        ('9','Electrical Protection & Safety (IEC 60364-7-712)'),
        ('10','Grid Connection & Utility Requirements'),
        ('11','Monitoring, Commissioning & Performance'),
        ('12','Economic Analysis & Financial Modelling'),
    ]
    for num,title in chapters:
        fl.append(P(f'<font color="#fbbf24"><b>Chapter {num}</b></font>  <font color="#e2e8f0">{title}</font>',BD))
        fl.append(SP(1))
    return fl

def s1():
    fl=[ChHead('1','PV Fundamentals','Photovoltaic Physics, Technology & System Architectures'),SP(3)]
    fl.append(P('<b>The Photovoltaic Effect</b>',H2))
    fl.append(P('The photovoltaic effect is the generation of voltage and electric current in a material upon exposure to light. In a silicon solar cell, photons excite electrons across the p-n junction bandgap (1.12 eV for silicon), creating electron-hole pairs that are separated by the built-in electric field, producing a DC current.',BD))
    fl.append(SP(2))
    fl.extend([
        bullet('Bandgap Energy: Silicon absorbs photons with energy > 1.12 eV (wavelengths < 1100 nm)'),
        bullet('Photon Energy: E = hf = hc/λ (h = 6.626×10⁻³⁴ J·s, c = speed of light)'),
        bullet('Quantum Efficiency: % of incident photons that generate electron-hole pairs'),
        bullet('Fill Factor: FF = P_max / (V_oc × I_sc) — quality indicator, typical 0.7–0.85'),
        bullet('Module Efficiency: Ratio of electrical output to incident solar irradiance × area'),
    ])
    fl.append(SP(3))
    fl.append(P('<b>Solar Cell Technologies</b>',H2))
    data=[['Technology','Efficiency (%)','Temperature Coeff','Cost ($/W)','Application'],
          ['Monocrystalline Si (PERC)','20–24','-0.35%/°C','0.25–0.40','Residential, commercial'],
          ['Polycrystalline Si','16–19','-0.40%/°C','0.20–0.35','Utility scale'],
          ['HJT (Heterojunction)','22–26','-0.25%/°C','0.35–0.55','Premium residential'],
          ['TOPCon (Tunnel Oxide)','22–25','-0.30%/°C','0.30–0.50','Commercial, utility'],
          ['CdTe (Thin Film)','18–22','-0.25%/°C','0.15–0.25','Utility scale'],
          ['Bifacial','22–27 (+10–20% rear)','—','+5–10% premium','Ground-mount, rooftop']]
    fl.append(dark_table(data,[80,60,65,55,95]))
    return fl

def s2():
    fl=[ChHead('2','Module Technology','Specifications, Ratings & Performance Modelling'),SP(3)]
    fl.append(DiagramWrap(dia_pv_cell(),'Fig. 2.1 — PV Module Layer Construction'))
    fl.append(SP(3))
    fl.append(P('<b>Standard Test Conditions (STC)</b>',H2))
    fl.append(Box([
        'STC: Irradiance = 1000 W/m² | Cell Temp = 25°C | AM 1.5 spectrum',
        'NOCT (Nominal Operating Cell Temp): 800 W/m², 20°C ambient, 1 m/s wind',
        'PTC (PV USA Test Conditions): 1000 W/m², 20°C ambient, 10 m/s wind — closer to real-world',
        'Temperature Correction: P_actual = P_STC × [1 + (Tc - 25) × Pmax_coeff]',
    ],AMB))
    fl.append(SP(3))
    fl.append(DiagramWrap(dia_iv_curve(),'I-V and P-V Characteristic Curves'))
    fl.append(SP(3))
    fl.append(P('<b>Key Module Parameters</b>',H2))
    fl.extend([
        bullet('P_max (Wp): Peak power at STC — primary sizing parameter'),
        bullet('V_oc: Open-circuit voltage — determines max string voltage for inverter input'),
        bullet('I_sc: Short-circuit current — used for wire and fuse sizing'),
        bullet('V_mp / I_mp: Voltage/Current at maximum power point'),
        bullet('NOCT: Determines operating temperature for thermal correction'),
        bullet('Bifaciality Factor: Rear-side efficiency as % of front-side (typically 65–85%)'),
    ])
    return fl

def s3():
    fl=[ChHead('3','Solar Resource','Site Assessment, Irradiance Data & Shading Analysis'),SP(3)]
    fl.append(P('<b>Solar Irradiance Components</b>',H2))
    fl.extend([
        bullet('GHI (Global Horizontal Irradiance): Total irradiance on horizontal surface'),
        bullet('DNI (Direct Normal Irradiance): Beam radiation on surface perpendicular to sun'),
        bullet('DHI (Diffuse Horizontal Irradiance): Scattered radiation from sky (cloud/atmosphere)'),
        bullet('POA (Plane of Array): Irradiance on tilted module surface — what modules actually receive'),
        bullet('Peak Sun Hours (PSH): Hours/day of 1000 W/m² equivalent — same as kWh/m²/day'),
    ])
    fl.append(SP(2))
    fl.append(P('<b>Irradiance Data Sources</b>',H2))
    data=[['Database','Source','Data Period','Resolution','Best Use'],
          ['PVGIS','European Commission / JRC','1994–2022','Hourly/Monthly','European & global projects'],
          ['NASA SSE / POWER','NASA Langley','1981–present','Monthly/Daily','Global, remote sites'],
          ['SolarAnywhere','Clean Power Research','1998–present','30-min','North America'],
          ['SolarGIS','GeoModel Solar','1994–present','15-min','High accuracy, global'],
          ['Meteonorm','Meteotest','1991–2010','Hourly TMY','Simulation tools']]
    fl.append(dark_table(data,[55,85,70,60,90]))
    fl.append(SP(3))
    fl.append(P('<b>Optimal Tilt & Orientation</b>',H2))
    fl.append(Box([
        'Rule of Thumb — Fixed Tilt: Tilt = Latitude (within 10-15° for most sites)',
        'South-facing (NH) or North-facing (SH) maximises annual yield',
        'East-West bifacial: +10-15% land use efficiency for utility sites',
        'Shading Loss Model: Use Solargis, PVsyst ShadeTool, or helioscope for accurate analysis',
        'Near Shading: Critical in first 1-2 hours after sunrise and before sunset',
    ],ORG))
    fl.append(SP(2))
    fl.extend([
        bullet('Shade Analysis Tools: PVGIS (free), PVsyst, HelioScope, Aurora Solar'),
        bullet('Horizon Shading: Mountains, buildings — capture with Solmetric SunEye or drone survey'),
        bullet('Albedo: Ground reflectance affects bifacial yield — snow (0.8), concrete (0.2), grass (0.15)'),
    ])
    return fl

def s4():
    fl=[ChHead('4','Array Sizing','Energy Yield, System Losses & Performance Ratio'),SP(3)]
    fl.append(P('<b>Array Sizing Methodology</b>',H2))
    fl.append(Box([
        'STEP 1: Determine annual energy target (kWh/yr) from load analysis',
        'STEP 2: Get annual PSH for site (kWh/m²/day) from solar database',
        'STEP 3: Array Size (kWp) = Annual Target / (365 × PSH × PR)',
        'PR (Performance Ratio): Typically 0.75–0.85 for well-designed system',
        'STEP 4: Number of Modules = Array Size (Wp) / Module P_max (Wp)',
    ],AMB))
    fl.append(SP(3))
    fl.append(P('<b>System Losses — PR Breakdown</b>',H2))
    data=[['Loss Source','Typical (%)','Best Practice (%)','Notes'],
          ['Irradiance (spectral+angle)','2–4','2','Optical losses'],
          ['Temperature','3–8','3','Depends on climate + module coeff'],
          ['Shading','0–10','<2','Minimize with layout'],
          ['Soiling & Dust','1–5','1–2','Clean regularly'],
          ['Wiring & Transformer','1–3','1.5','Copper sizing'],
          ['Inverter Efficiency','2–5','2','MPPT + conversion losses'],
          ['Mismatch','1–3','1','Sort modules, use optimisers'],
          ['Availability','0–3','1','Downtime for maintenance']]
    fl.append(dark_table(data,[100,60,60,95]))
    fl.append(SP(3))
    fl.append(P('<b>Energy Yield Calculation Example</b>',H2))
    fl.extend([
        bullet('Site: Addis Ababa, Ethiopia | PSH: 5.5 kWh/m²/day | PR: 0.80'),
        bullet('Annual Target: 50,000 kWh/yr (commercial building)'),
        bullet('Array Size = 50,000 / (365 × 5.5 × 0.80) = 31.2 kWp'),
        bullet('Modules @ 400 Wp each: 31,200 / 400 = 78 modules'),
        bullet('Roof Area Required: 78 × 2.0 m² = 156 m² (standard 400W module)'),
        bullet('Ground Coverage Ratio: 0.40–0.45 for row spacing with no shading at winter solstice'),
    ])
    return fl

def s5():
    fl=[ChHead('5','Grid-Tied Design','String Configuration, Inverter Matching & Grid Integration'),SP(3)]
    fl.append(P('<b>String Sizing Fundamentals</b>',H2))
    fl.extend([
        bullet('String Voltage: V_string = N_modules × V_mp (at operating temp)'),
        bullet('Max String Voltage: N_max = V_inverter_max / V_oc_corrected'),
        bullet('V_oc Temperature Correction: V_oc_cold = V_oc_STC × [1 + β × (T_min - 25)]'),
        bullet('Min String Voltage: Must keep array above inverter MPPT min voltage in heat'),
        bullet('V_mp_hot = V_mp_STC × [1 + β × (T_max_cell - 25)]  where β = temp coeff'),
        bullet('IEC 60364-7-712: Design for 40-year minimum design life — use voltage safety margin'),
    ])
    fl.append(SP(2))
    fl.append(Box([
        'STRING SIZING EXAMPLE:',
        'Module: V_oc=45.2V, V_mp=37.8V, β=-0.28%/°C',
        'Inverter MPPT: 200-800V range, max 1000V',
        'T_min=-5°C: V_oc_cold = 45.2 × [1+(-0.0028)×(-5-25)] = 45.2 × 1.084 = 49.0V',
        'Max modules = floor(1000 / 49.0) = 20 modules per string',
        'Min modules: V_mp_hot at 70°C = 37.8×[1+(-0.0028)×45] = 37.8×0.874 = 33.0V',
        'Min string = ceil(200 / 33.0) = 7 modules → typical string: 14-18 modules',
    ],AMB))
    fl.append(SP(3))
    fl.append(P('<b>Inverter Sizing — DC:AC Ratio</b>',H2))
    fl.extend([
        bullet('DC:AC Ratio: Array kWp / Inverter kVA — typically 1.1–1.3'),
        bullet('Oversizing (clipping): Array output clipped when > inverter AC rating — intentional for economics'),
        bullet('Energy Clipping Loss: Calculate in PVsyst — accept <3% clipping for economics'),
        bullet('String Inverters: 1 MPPT per string group; best for uniform shading-free rooftops'),
        bullet('Central Inverters: >100kW; lower cost/W; requires combiner boxes; utility-scale'),
        bullet('Microinverters: 1 per module; shade tolerance; expensive; residential'),
        bullet('DC Optimisers: Module-level MPPT; shade tolerance; compatible with string inverters'),
    ])
    return fl

def s6():
    fl=[ChHead('6','String & Protection','Combiner Boxes, Cable Sizing & DC Protection'),SP(3)]
    fl.append(P('<b>DC Cable Sizing (IEC 60364-7-712)</b>',H2))
    data=[['Cable Segment','Min Rating (A)','Temperature Rating','Typical Size'],
          ['Module to string','1.25 × I_sc','90°C (solar cable)','4–6 mm²'],
          ['String to combiner','1.25 × I_sc','90°C (solar cable)','4–10 mm²'],
          ['Combiner to inverter','1.25 × Σ I_sc','70°C (DC main)','10–95 mm²'],
          ['Inverter AC output','Per inverter rating','70°C (AC main)','Per rating'],
          ['Earth bonding','Min 6 mm² Cu','—','6–16 mm²']]
    fl.append(dark_table(data,[90,70,75,85]))
    fl.append(SP(3))
    fl.append(P('<b>String Combiner Box Components</b>',H2))
    fl.extend([
        bullet('String Fuses: 1.5 × I_sc per string; IEC 60269-6 rated; positive AND negative conductor'),
        bullet('String DC Disconnect: Lockable isolator per IEC 60947-3; 1200V rated for 1000V systems'),
        bullet('Surge Protection (SPD): Type 2 at combiner box + inverter input; Type 1 if exposed site'),
        bullet('Monitoring CTs: Per-string current monitoring for fault detection'),
        bullet('Enclosure: IP65 minimum; anti-condensation heater for cold climates'),
    ])
    fl.append(SP(2))
    fl.append(Box([
        'VOLTAGE DROP LIMITS:',
        'DC strings to inverter: Max 1.5% voltage drop (IEC 60364-7-712)',
        'AC output to grid connection: Max 3% (local utility may require less)',
        'Formula: Vd% = (2 × L × I × ρ) / (A × V_nominal) × 100',
        'ρ (copper) = 0.0175 Ω·mm²/m at 20°C; derate for temperature',
    ],ORG))
    return fl

def s7():
    fl=[ChHead('7','Battery Storage','Off-Grid Design, Battery Types & Charge Controllers'),SP(3)]
    fl.append(DiagramWrap(dia_battery_bank(),'Battery Bank Series/Parallel Configuration'))
    fl.append(SP(3))
    fl.append(P('<b>Battery Technologies for Solar Storage</b>',H2))
    data=[['Technology','Cycle Life','DoD (%)','Energy Density','Round-Trip Eff.','Cost ($/kWh)'],
          ['Flooded Lead-Acid','500–1500','50%','25–35 Wh/kg','70–80%','100–150'],
          ['AGM/VRLA','500–1200','60%','30–45 Wh/kg','80–85%','150–250'],
          ['LiFePO4 (LFP)','3000–6000','80–90%','90–160 Wh/kg','92–97%','200–350'],
          ['NMC Li-ion','1000–3000','80%','150–220 Wh/kg','93–97%','150–300'],
          ['Flow (Vanadium)','10,000+','100%','15–25 Wh/kg','65–75%','400–800']]
    fl.append(dark_table(data,[75,55,45,65,60,65]))
    fl.append(SP(3))
    fl.append(P('<b>Battery Bank Sizing for Off-Grid Systems</b>',H2))
    fl.append(Box([
        'STEP 1: Daily Load (Wh/day) = Sum of [appliance W × hours/day]',
        'STEP 2: Autonomy Days (AD): Typically 1-3 days (no sun days)',
        'STEP 3: Required Capacity = Daily Load × AD / DoD',
        'STEP 4: Ah at system voltage = Required Wh / System Voltage (24V or 48V)',
        'STEP 5: Parallel strings = Required Ah / Battery Ah',
        'Example: 10kWh/day × 2 days / 0.8 DoD = 25 kWh → 25000Wh / 48V = 520 Ah',
    ],GRN))
    fl.append(SP(2))
    fl.append(P('<b>Charge Controller Selection</b>',H2))
    fl.extend([
        bullet('PWM (Pulse Width Modulation): Simple, cheaper; array voltage must match battery voltage'),
        bullet('MPPT Charge Controller: Tracks maximum power point; 15–30% more efficient than PWM'),
        bullet('MPPT Input Range: Must accept string V_oc under cold conditions'),
        bullet('Sizing: Controller A rating ≥ 1.25 × I_sc of connected PV strings'),
        bullet('Temperature Compensation: Adjust charge voltage for battery temperature (typically -3mV/°C/cell)'),
    ])
    return fl

def s8():
    fl=[ChHead('8','Inverter Selection','Grid-Tied & Off-Grid Inverter Configuration'),SP(3)]
    fl.append(P('<b>Grid-Tied Inverter Requirements</b>',H2))
    data=[['Requirement','Standard / Specification','Typical Range'],
          ['Grid Voltage','IEC 62116 / EN 50549','230V / 400V (3-phase)'],
          ['Frequency Tolerance','±1–2 Hz of nominal','49–51 Hz (50Hz grid)'],
          ['THD (output)','<5% total harmonic distortion','< 3% premium inverters'],
          ['Power Factor','Per utility requirements','0.9 lead – 0.9 lag'],
          ['Anti-islanding','IEEE 1547 / IEC 62116','Certified required'],
          ['Efficiency (Euro)','Weighted average','96–98.6% top inverters'],
          ['DC Input Voltage','Model-specific MPPT range','200–1000 V typical']]
    fl.append(dark_table(data,[100,120,100]))
    fl.append(SP(3))
    fl.append(P('<b>Inverter Types Comparison</b>',H2))
    fl.extend([
        bullet('String Inverters (1–60 kW): Most common; simple; shade sensitivity; 1 per string group'),
        bullet('Central Inverters (>100 kW): Utility-scale; low cost/W; require combiner boxes'),
        bullet('Hybrid Inverters: Grid-tied + battery management in one unit; growing segment'),
        bullet('Off-Grid Inverter/Charger: Battery-based; creates its own grid; Victron, SMA Sunny Island'),
        bullet('Microinverters: Per-module AC; no DC arc hazard; premium cost; easy expansion'),
    ])
    fl.append(SP(2))
    fl.append(Box([
        'HYBRID INVERTER OPERATING MODES:',
        '1. Grid + PV → Load (grid is priority backup)',
        '2. PV → Load + Battery Charge (self-consumption priority)',
        '3. Battery → Load (grid outage / peak-shaving)',
        '4. Grid → Battery (time-of-use charging at low tariff)',
        '5. Export to Grid (excess after load + battery full)',
    ],AMB))
    return fl

def s9():
    fl=[ChHead('9','Protection & Safety','IEC 60364-7-712, Arc Fault & Earthing Design'),SP(3)]
    fl.append(P('<b>DC Arc Fault Protection</b>',H2))
    fl.extend([
        bullet('DC arc faults: Major fire cause in PV systems — series or parallel faults in DC wiring'),
        bullet('AFCI (Arc Fault Circuit Interrupter): Required by NEC 690.11 (US); growing adoption globally'),
        bullet('SMA / Fronius / Huawei: Most modern inverters include integrated arc detection'),
        bullet('Series arc: Broken conductor, corroded connector — detected by current signature'),
        bullet('Parallel arc: Insulation fault — detected by ground fault monitoring'),
    ])
    fl.append(SP(2))
    fl.append(P('<b>Ground Fault & Insulation Monitoring</b>',H2))
    fl.extend([
        bullet('Insulation Resistance: Measure at commissioning with 1000V megger; min 1 MΩ per string'),
        bullet('Ground Fault Detection: Inverter monitors for DC leakage to earth; trip on fault'),
        bullet('IT System (Floating): Both conductors ungrounded — IEC 60364-7-712 default; requires ISFL'),
        bullet('Earthing Conductors: Frame bonding min 4 mm² Cu; connect all frames to earth bus'),
        bullet('Lightning Protection: SPD at array (Type 1+2) and inverter (Type 2); earthing per IEC 62305'),
    ])
    fl.append(SP(2))
    fl.append(Box([
        'COMMISSIONING SAFETY CHECKS:',
        '1. Verify polarity of each string before connecting to inverter',
        '2. Insulation resistance test (all strings to earth) > 1 MΩ',
        '3. V_oc measurement per string — verify matches design (±5%)',
        '4. I_sc measurement with clamp meter — verify per string',
        '5. Anti-islanding test: Disconnect grid, verify inverter shuts down in <5s',
    ],ORG))
    return fl

def s10():
    fl=[ChHead('10','Grid Connection','Utility Requirements, Power Quality & Metering'),SP(3)]
    fl.append(P('<b>Grid Connection Process</b>',H2))
    fl.extend([
        bullet('Application: Submit technical specs (single-line diagram, equipment datasheets) to utility'),
        bullet('G99 / G98 (UK) / IEEE 1547 (US) / EN 50549 (EU): Local grid code compliance required'),
        bullet('Protection Relay: ROCOF (df/dt), voltage, frequency relays — type-tested per grid code'),
        bullet('Metering: Bidirectional smart meter for import/export measurement'),
        bullet('CT Sizing: Revenue-grade accuracy class 0.5 for grid connection point'),
        bullet('Export Limitation: Some utilities cap export (e.g., 50% of contracted capacity)'),
    ])
    fl.append(SP(2))
    fl.append(P('<b>Power Quality Requirements</b>',H2))
    data=[['Parameter','Limit','Standard'],
          ['THD (current)','< 5% at rated power','IEEE 1547 / EN 61000-3-2'],
          ['Voltage imbalance','< 2% at PCC','EN 50160'],
          ['Flicker (Pst)','< 0.35 / 0.25 (Plt)','EN 61000-3-3'],
          ['DC injection','< 0.5% rated AC current','IEEE 1547'],
          ['Power factor','> 0.95 lag–lead at rated power','Local grid code'],
          ['Inrush current','Soft-start ramp rate limit','Utility specific']]
    fl.append(dark_table(data,[100,115,120]))
    fl.append(SP(2))
    fl.append(Box([
        'NET METERING & FEED-IN TARIFF:',
        'Net Metering: Exported units offset imported units (1:1 credit)',
        'FiT (Feed-in Tariff): Fixed price paid per kWh exported (utility-set rate)',
        'Self-Consumption: Maximise by matching PV peak to load peak — add battery + DCS',
        'Power Purchase Agreement (PPA): Developer funds system; building owner buys power at discount',
    ],TEAL))
    return fl

def s11():
    fl=[ChHead('11','Monitoring & Commissioning','Performance Analysis, Fault Detection & O&M'),SP(3)]
    fl.append(P('<b>Monitoring System Architecture</b>',H2))
    fl.extend([
        bullet('String-Level Monitoring: Current per string (combiner box CTs) — detects shading, faults'),
        bullet('Module-Level Monitoring: Microinverter or optimiser data — full visibility, highest cost'),
        bullet('Weather Station: Irradiance (pyranometer), temperature, wind — required for PR calculation'),
        bullet('Communication: Inverter RS485/Modbus → datalogger → cloud platform'),
        bullet('Alerts: Set alarms for string underperformance (>10% deviation from expected)'),
    ])
    fl.append(SP(2))
    fl.append(P('<b>Key Performance Indicators (KPIs)</b>',H2))
    data=[['KPI','Formula','Good Value','Poor Value'],
          ['Performance Ratio (PR)','E_actual / (G_POA × P_STC)','> 80%','< 70%'],
          ['Capacity Factor','E_annual / (P_STC × 8760h)','15–25% (utility)','< 12%'],
          ['Specific Yield','E_annual (kWh) / P_STC (kWp)','900–1800 kWh/kWp','< 700'],
          ['System Availability','Operating hours / Total hours','> 99%','< 95%'],
          ['Energy Clipping','Clipped kWh / Yield kWh','< 3%','> 5%']]
    fl.append(dark_table(data,[80,110,65,65]))
    fl.append(SP(2))
    fl.append(Box([
        'FAULT DETECTION PRIORITY:',
        '1. Zero output string: Check string fuse, connector, module damage',
        '2. Low output (30–70%): Partial shading, soiling, module degradation',
        '3. High temperature shutdown: Check ventilation, derating setting',
        '4. Grid fault: Check AC voltage, frequency, anti-islanding relay',
        '5. Insulation fault: Megger test all strings to earth; check connectors',
    ],AMB))
    return fl

def s12():
    fl=[ChHead('12','Financial Analysis','LCOE, Payback, IRR & Project Financing'),SP(3)]
    fl.append(P('<b>Key Financial Metrics</b>',H2))
    fl.extend([
        bullet('LCOE (Levelised Cost of Energy): Total lifecycle cost / Total lifetime kWh produced'),
        bullet('Simple Payback: System cost / Annual savings (years) — 4–8 years typical'),
        bullet('NPV (Net Present Value): PV of future cash flows minus initial cost'),
        bullet('IRR (Internal Rate of Return): Discount rate that makes NPV = 0; compare to WACC'),
        bullet('Degradation Rate: Module output degrades ~0.5–0.7%/year (linear); account over 25 years'),
    ])
    fl.append(SP(2))
    fl.append(P('<b>LCOE Calculation Framework</b>',H2))
    fl.append(Box([
        'LCOE ($/kWh) = (CAPEX + PV of O&M + PV of replacement) / PV of lifetime yield',
        '',
        'Global Benchmarks (2025):',
        'Utility-scale ground mount:  $0.020–0.045 / kWh',
        'Commercial rooftop C&I:      $0.040–0.080 / kWh',
        'Residential rooftop:         $0.080–0.150 / kWh',
        'Off-grid with battery:       $0.150–0.300 / kWh',
    ],AMB))
    fl.append(SP(3))
    fl.append(P('<b>Financing Options</b>',H2))
    data=[['Finance Model','Description','Who Bears Risk','Typical IRR'],
          ['Cash Purchase','Owner pays upfront','Owner','8–15%'],
          ['Bank Loan (secured)','Debt financing; own asset','Owner','10–20% equity'],
          ['Operating Lease','Pay monthly; off-balance sheet','Developer','—'],
          ['PPA','Buy power, not system','Developer (owns)','8–12%'],
          ['Green Bond','Corporate bond for RE projects','Issuer','Bond rate + margin']]
    fl.append(dark_table(data,[75,110,75,65]))
    fl.append(SP(2))
    fl.extend([
        bullet('O&M Cost: Budget $10–15/kWp/year (cleaning, monitoring, insurance, inverter maintenance)'),
        bullet('Insurance: Property + liability; specify in CAPEX budget (typically 0.25–0.5% of system cost/yr)'),
        bullet('Inverter Replacement: Budget for 1× inverter replacement at year 12–15 (string inverters)'),
    ])
    return fl

def build():
    # remove invalid syntax from dia_system_types
    story=[PageBreak()]
    for sec in [toc,s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12]:
        story.extend(sec()); story.append(PageBreak())
    doc=SimpleDocTemplate(out,pagesize=A4,leftMargin=M,rightMargin=M,
        topMargin=18*mm,bottomMargin=16*mm,title=DOC_TITLE,author=AUTHOR,
        subject='Solar PV design, system sizing, battery storage, grid connection',
        creator='AYE Tech Hub PDF Engine')
    doc.build(story,onFirstPage=draw_cover,onLaterPages=draw_page)
    size=os.path.getsize(out)/1024
    pages=doc.page
    import builtins; builtins.print(f'Generated: {out}  ({size:.0f} KB, {pages} pages)')

if __name__=='__main__': build()
