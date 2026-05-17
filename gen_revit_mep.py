"""AYE Tech Hub — Revit MEP Reference Guide PDF Generator"""
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
ORG  =HexColor('#f97316')   # primary accent — orange (design)
CYAN =HexColor('#00d4ff')   # secondary accent
YEL  =HexColor('#fbbf24')
GRN  =HexColor('#22c55e')
TXT  =HexColor('#e2e8f0')
TXT2 =HexColor('#94a3b8')
TXT3 =HexColor('#64748b')
WLINE=HexColor('#1e3a5f')

DOC_TITLE='Revit MEP Reference Guide — Mechanical, Electrical & Plumbing BIM Workflows'
AUTHOR   ='AYE Tech Hub Engineering Team'
SUBTITLE ='System Families · Routing · Coordination · Schedules · Clash Detection · IFC Export'
out=os.path.join(os.path.dirname(__file__),'pdfs','revit-mep-reference.pdf')

FONT='Helvetica'
FONTB='Helvetica-Bold'

def styles():
    def s(name,**kw): return ParagraphStyle(name,**kw)
    H1=s('H1',fontName=FONTB,fontSize=18,textColor=ORG,spaceAfter=4,spaceBefore=8,leading=22)
    H2=s('H2',fontName=FONTB,fontSize=13,textColor=ORG,spaceAfter=3,spaceBefore=6,leading=16)
    H3=s('H3',fontName=FONTB,fontSize=10,textColor=CYAN,spaceAfter=2,spaceBefore=4,leading=13)
    BD=s('BD',fontName=FONT,fontSize=9,textColor=TXT,leading=14,spaceAfter=2,
         spaceBefore=0,alignment=TA_JUSTIFY)
    BL=s('BL',fontName=FONT,fontSize=9,textColor=TXT,leading=13,spaceAfter=1,
         leftIndent=10,firstLineIndent=-7)
    CB=s('CB',fontName=FONTB,fontSize=8,textColor=BG,leading=11)
    CT=s('CT',fontName=FONTB,fontSize=8,textColor=ORG,leading=10,alignment=TA_CENTER)
    SM=s('SM',fontName=FONT,fontSize=8,textColor=TXT2,leading=11)
    return H1,H2,H3,BD,BL,CB,CT,SM
H1,H2,H3,BD,BL,CB,CT,SM=styles()

def P(t,st=BD): return Paragraph(t,st)
def SP(n=4): return Spacer(1,n*mm)
def bullet(t,c='#f97316'): return P(f'<font color="{c}">&#9632;</font>  {t}',BL)

def draw_cover(canv,doc):
    canv.saveState()
    canv.setFillColor(BG); canv.rect(0,0,W,H,fill=1,stroke=0)
    for i,alpha in enumerate([0.18,0.10,0.05]):
        canv.setFillColor(ORG); canv.setFillAlpha(alpha)
        canv.rect(0,H-(i+1)*55,W,55,fill=1,stroke=0)
    canv.setFillAlpha(1.0)
    canv.setFillColor(ORG); canv.rect(0,0,5,H,fill=1,stroke=0)
    _draw_cover_diagram(canv)
    canv.setFillColor(ORG); canv.setFont(FONTB,11)
    canv.drawString(M,H-18*mm,'AYE TECH HUB')
    canv.setFillColor(TXT2); canv.setFont(FONT,8)
    canv.drawString(M,H-24*mm,'Engineering the Future')
    canv.setFillColor(ORG)
    canv.roundRect(W-M-50,H-22*mm,50,12,3,fill=1,stroke=0)
    canv.setFillColor(BG); canv.setFont(FONTB,8)
    canv.drawCentredString(W-M-25,H-17*mm,'2025 EDITION')
    y=H*0.42
    canv.setFillColor(ORG); canv.setFont(FONTB,26)
    canv.drawString(M,y,'REVIT MEP')
    canv.setFillColor(white); canv.setFont(FONTB,20)
    canv.drawString(M,y-28,'REFERENCE GUIDE')
    canv.setFillColor(TXT2); canv.setFont(FONT,9)
    for i,line in enumerate(SUBTITLE.split(' · ')):
        canv.drawString(M,y-50-i*13,f'  {line}')
    canv.setStrokeColor(ORG); canv.setLineWidth(1.5)
    canv.line(M,y-98,W-M,y-98)
    stats=[('MEP','Systems'),('BIM','Coordination'),('Revit','Workflows'),('IFC','Export')]
    bw=(W-2*M)/4; by=y-122
    for i,(val,lbl) in enumerate(stats):
        bx=M+i*bw+bw/2
        canv.setFillColor(ORG); canv.setFont(FONTB,12); canv.drawCentredString(bx,by,val)
        canv.setFillColor(TXT2); canv.setFont(FONT,7); canv.drawCentredString(bx,by-11,lbl)
    canv.setFillColor(BG2); canv.rect(0,22,W,22,fill=1,stroke=0)
    canv.setFillColor(ORG); canv.setFont(FONTB,8); canv.drawString(M,30,AUTHOR)
    canv.setFillColor(TXT3); canv.setFont(FONT,7); canv.drawRightString(W-M,30,'awetgknway@gmail.com')
    canv.restoreState()

def _draw_cover_diagram(canv):
    """Simple BIM model layering diagram."""
    canv.saveState()
    y0=H*0.56
    # Layer blocks representing MEP disciplines
    layers=[
        ('ARCHITECTURE','#94a3b8',y0+72),
        ('STRUCTURAL','#60a5fa',y0+54),
        ('MECHANICAL','#22c55e',y0+36),
        ('ELECTRICAL','#fbbf24',y0+18),
        ('PLUMBING','#00d4ff',y0),
    ]
    lw=200; lh=15; lx=M+10
    for label,col,ly in layers:
        canv.setFillColor(HexColor(col)); canv.setFillAlpha(0.15)
        canv.rect(lx,ly,lw,lh,fill=1,stroke=0)
        canv.setFillAlpha(1.0)
        canv.setStrokeColor(HexColor(col)); canv.setLineWidth(0.8)
        canv.rect(lx,ly,lw,lh,fill=0,stroke=1)
        canv.setFillColor(HexColor(col)); canv.setFont(FONTB,7)
        canv.drawString(lx+6,ly+5,label)
    # arrow
    canv.setFillColor(ORG); canv.setFont(FONTB,8)
    canv.drawString(lx+lw+8,y0+40,'BIM')
    canv.drawString(lx+lw+8,y0+28,'Model')
    canv.setStrokeColor(ORG); canv.setLineWidth(1)
    canv.line(lx+lw+5,y0+46,lx+lw+25,y0+46)
    canv.setFillColor(TXT3); canv.setFont(FONT,6)
    canv.drawCentredString(lx+lw/2,y0-10,'Fig. 1 — Federated BIM Model — MEP Discipline Layers')
    canv.restoreState()

def draw_page(canv,doc):
    canv.saveState()
    canv.setFillColor(BG); canv.rect(0,0,W,H,fill=1,stroke=0)
    canv.setFillColor(BG2); canv.rect(0,H-10*mm,W,10*mm,fill=1,stroke=0)
    canv.setStrokeColor(ORG); canv.setLineWidth(1.5)
    canv.line(M,H-10*mm,W-M,H-10*mm)
    canv.setFillColor(ORG); canv.setFont(FONTB,8)
    canv.drawString(M,H-7*mm,'AYE Tech Hub')
    canv.setFillColor(TXT3); canv.setFont(FONT,7)
    canv.drawRightString(W-M,H-7*mm,'Revit MEP Reference Guide')
    canv.setFillColor(BG2); canv.rect(0,0,W,10*mm,fill=1,stroke=0)
    canv.setStrokeColor(ORG); canv.line(M,10*mm,W-M,10*mm)
    canv.setFillColor(TXT3); canv.setFont(FONT,7)
    canv.drawString(M,3.5*mm,'AYE Tech Hub — Engineering the Future')
    canv.setFillColor(ORG); canv.setFont(FONTB,8)
    canv.drawRightString(W-M,3.5*mm,f'Page {doc.page-1}')
    canv.setFillColor(BG2); canv.rect(0,0,5,H,fill=1,stroke=0)
    canv.setFillColor(ORG); canv.rect(0,0,3,H,fill=1,stroke=0)
    canv.restoreState()

class Box(Flowable):
    def __init__(self,content,accent=None,width=None):
        Flowable.__init__(self)
        self.content=content; self.accent=accent or ORG; self.width=width or CW
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
        c.setStrokeColor(ORG); c.setLineWidth(2); c.line(0,24*mm,w,24*mm)
        c.setFillColor(BG3); c.roundRect(4,12*mm,22*mm,11*mm,3,fill=1,stroke=0)
        c.setFillColor(ORG); c.setFont(FONTB,18); c.drawCentredString(4+11*mm,14.5*mm,self.num)
        c.setFillColor(ORG); c.setFont(FONTB,14); c.drawString(30*mm,16*mm,self.title)
        if self.subtitle:
            c.setFillColor(TXT2); c.setFont(FONT,8); c.drawString(30*mm,10*mm,self.subtitle)
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
        ('TEXTCOLOR',(0,0),(-1,0),ORG),
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
        st=ParagraphStyle('CT2',fontName=FONTB,fontSize=8,textColor=ORG,
                          leading=10,alignment=TA_CENTER) if (i==0 and hdr) else BD
        rows.append([Paragraph(str(c),st) for c in row])
    return Table(rows,colWidths=col_widths,style=TableStyle(style),repeatRows=1 if hdr else 0)

# ─── DIAGRAMS ──────────────────────────────────────────────────────────────────

def dia_bim_lod():
    """LOD progression diagram."""
    d=Drawing(CW,85)
    d.add(Rect(0,0,CW,85,fillColor=BG2,strokeColor=WLINE,strokeWidth=0.5))
    lods=[('100',20,ORG,'Concept'),('200',68,CYAN,'Schematic'),
          ('300',116,GRN,'Design Dev'),('350',164,YEL,'Coord'),('400',212,HexColor('#a855f7'),'Fabrication')]
    for lod,bx,col,label in lods:
        d.add(Rect(bx,22,42,42,fillColor=BG3,strokeColor=col,strokeWidth=1.2,rx=3,ry=3))
        d.add(String(bx+21,48,f'LOD',fillColor=col,fontSize=6,fontName=FONTB,textAnchor='middle'))
        d.add(String(bx+21,38,lod,fillColor=col,fontSize=11,fontName=FONTB,textAnchor='middle'))
        d.add(String(bx+21,13,label,fillColor=TXT2,fontSize=6,fontName=FONT,textAnchor='middle'))
        if lod != '400':
            d.add(Line(bx+42,43,bx+47,43,strokeColor=TXT3,strokeWidth=1))
    d.add(String(CW/2,75,'Level of Development (LOD) — BIM Progression',
                 fillColor=TXT2,fontSize=7,fontName=FONTB,textAnchor='middle'))
    return d

def dia_clash_matrix():
    """Discipline coordination matrix."""
    d=Drawing(CW,110)
    d.add(Rect(0,0,CW,110,fillColor=BG2,strokeColor=WLINE,strokeWidth=0.5))
    discs=['ARCH','STRUCT','MECH','ELEC','PLUMB']
    colors=[TXT3,HexColor('#60a5fa'),GRN,YEL,CYAN]
    cell=38; ox=65; oy=15
    # header row
    for j,(disc,col) in enumerate(zip(discs,colors)):
        d.add(String(ox+j*cell+cell/2,oy+5*cell+5,disc,fillColor=col,fontSize=6,
                     fontName=FONTB,textAnchor='middle'))
    # header col
    for i,(disc,col) in enumerate(zip(discs,colors)):
        d.add(String(20,oy+(4-i)*cell+cell/2,disc,fillColor=col,fontSize=6,
                     fontName=FONTB,textAnchor='middle'))
    # cells
    clash_data=[['-','S','H','M','M'],
                ['','- ','M','H','M'],
                ['','','- ','H','H'],
                ['','','','- ','H'],
                ['','','','','- ']]
    clash_colors={'H':HexColor('#ef4444'),'M':YEL,'S':CYAN,'-':TXT3}
    for i in range(5):
        for j in range(5):
            cx=ox+j*cell; cy=oy+(4-i)*cell
            val=clash_data[i][j]
            col_bg=BG3 if val in ('H','M','S') else BG2
            d.add(Rect(cx,cy,cell,cell,fillColor=col_bg,strokeColor=WLINE,strokeWidth=0.4))
            d.add(String(cx+cell/2,cy+cell/2-3,val,fillColor=clash_colors.get(val,TXT3),
                         fontSize=8,fontName=FONTB,textAnchor='middle'))
    # legend
    d.add(String(CW-80,80,'H = High clash risk',fillColor=HexColor('#ef4444'),fontSize=6,fontName=FONT))
    d.add(String(CW-80,68,'M = Medium risk',fillColor=YEL,fontSize=6,fontName=FONT))
    d.add(String(CW-80,56,'S = Single clash',fillColor=CYAN,fontSize=6,fontName=FONT))
    d.add(String(CW/2,5,'Discipline Clash Risk Matrix',fillColor=TXT3,fontSize=6,
                 fontName=FONT,textAnchor='middle'))
    return d

def dia_workflow():
    """Revit MEP workflow steps."""
    d=Drawing(CW,85)
    d.add(Rect(0,0,CW,85,fillColor=BG2,strokeColor=WLINE,strokeWidth=0.5))
    steps=[('1\nSetup','Project\nTemplate',10,ORG),
           ('2\nLinks','Link Arch\n& Struct',60,CYAN),
           ('3\nSystems','Model MEP\nSystems',110,GRN),
           ('4\nCoord','Clash\nDetect',160,YEL),
           ('5\nDocs','Sheets &\nSchedules',210,HexColor('#a855f7')),
           ('6\nExport','IFC / DWG\nExport',260,ORG)]
    for num,label,bx,col in steps:
        d.add(Rect(bx,18,46,48,fillColor=BG3,strokeColor=col,strokeWidth=1.2,rx=3,ry=3))
        lines=num.split('\n')
        d.add(String(bx+23,52,lines[0],fillColor=col,fontSize=9,fontName=FONTB,textAnchor='middle'))
        for k,l in enumerate(label.split('\n')):
            d.add(String(bx+23,38-k*10,l,fillColor=TXT2,fontSize=6,fontName=FONT,textAnchor='middle'))
        if bx<260:
            d.add(Line(bx+46,42,bx+50,42,strokeColor=TXT3,strokeWidth=1))
    d.add(String(CW/2,5,'Revit MEP Project Workflow',fillColor=TXT3,fontSize=6,
                 fontName=FONT,textAnchor='middle'))
    return d

# ─── CONTENT ──────────────────────────────────────────────────────────────────

def toc():
    fl=[ChHead('','Table of Contents','Chapter Overview'),SP(4)]
    chapters=[
        ('1','BIM Fundamentals & Revit MEP Overview'),
        ('2','Project Setup — Templates, Worksets & Linked Models'),
        ('3','Mechanical Systems — HVAC in Revit'),
        ('4','Electrical Systems — Power, Lighting & Communication'),
        ('5','Plumbing & Piping Systems'),
        ('6','Families — System Families & Loadable Components'),
        ('7','Clash Detection & Multi-Discipline Coordination'),
        ('8','Schedules, Legends & Annotation'),
        ('9','Views, Sheets & Drawing Production'),
        ('10','IFC Export, COBie & Data Exchange'),
        ('11','Revit API, Dynamo & Automation'),
        ('12','Best Practices, Standards & Career Pathways'),
    ]
    for num,title in chapters:
        fl.append(P(f'<font color="#f97316"><b>Chapter {num}</b></font>  <font color="#e2e8f0">{title}</font>',BD))
        fl.append(SP(1))
    return fl

def s1():
    fl=[ChHead('1','BIM & Revit MEP','Building Information Modelling Fundamentals'),SP(3)]
    fl.append(P('<b>What is BIM?</b>',H2))
    fl.append(P('Building Information Modelling (BIM) is a process for creating and managing digital representations of physical and functional characteristics of a facility. Revit MEP is Autodesk\'s dedicated tool for mechanical, electrical, and plumbing engineering within the BIM environment, enabling parametric modelling, automated schedules, and multi-discipline coordination.',BD))
    fl.append(SP(2))
    fl.append(DiagramWrap(dia_bim_lod(),'Level of Development (LOD) Progression'))
    fl.append(SP(3))
    fl.append(P('<b>Revit MEP vs. AutoCAD MEP</b>',H2))
    data=[['Feature','Revit MEP','AutoCAD MEP'],
          ['Model Type','Parametric 3D BIM','2D with 3D elements'],
          ['Data Intelligence','Full MEP system data','Limited attributes'],
          ['Schedule Generation','Automatic from model','Manual or semi-auto'],
          ['Clash Detection','Via Navisworks link','Limited native'],
          ['Coordination','Federated model','Xref-based'],
          ['Learning Curve','Steep (3–6 months)','Moderate'],
          ['Industry Adoption','Standard (ISO 19650)','Diminishing new projects']]
    fl.append(dark_table(data,[100,110,100]))
    fl.append(SP(2))
    fl.append(DiagramWrap(dia_workflow(),'Revit MEP Project Workflow'))
    return fl

def s2():
    fl=[ChHead('2','Project Setup','Templates, Worksets, Worksharing & Linked Models'),SP(3)]
    fl.append(P('<b>Project Template Best Practices</b>',H2))
    fl.extend([
        bullet('Use discipline-specific MEP template (metric or imperial) as starting point'),
        bullet('Load only required system families — keep template lightweight'),
        bullet('Pre-configure view templates for each drawing type (plan, section, schematic)'),
        bullet('Set project units, annotation, and shared coordinates before any modelling'),
        bullet('Create discipline browser organisation (Mechanical, Electrical, Plumbing, Coordination)'),
        bullet('Define project phases: Existing, Demolition, New Construction'),
    ])
    fl.append(SP(2))
    fl.append(Box([
        'WORKSHARING SETUP ORDER:',
        '1. Enable Worksharing (Collaborate tab → Worksets)',
        '2. Create Worksets: Shared Levels, MECH-Ductwork, ELEC-Conduit, PLUMB-Pipe',
        '3. Save to BIM360/ACC or network central file',
        '4. Each user creates local copy (not the central file directly)',
        '5. Synchronise with Central at key milestones — avoid long gaps',
    ],ORG))
    fl.append(SP(3))
    fl.append(P('<b>Linking Discipline Models</b>',H2))
    fl.extend([
        bullet('Insert tab → Link Revit → select Architectural / Structural model'),
        bullet('Link method: Auto — By Shared Coordinates (requires coordinate setup)'),
        bullet('Copy/Monitor: Grids, Levels, Columns — update when architect revises'),
        bullet('Manage Links panel: Reload / Unload / Manage links visibility'),
        bullet('Do NOT explode linked models — maintain live link for coordination'),
        bullet('Visibility control: Linked model visibility per view via VV/VG Revit Links tab'),
    ])
    fl.append(SP(2))
    data=[['Workset Name','Discipline','Contents','Owner'],
          ['Shared Levels & Grids','All','Levels, grids, reference planes','BIM Manager'],
          ['ARCH-Link','Architecture','Linked arch model','Read-only'],
          ['MECH-Ductwork','Mechanical','HVAC duct systems','Mechanical Eng.'],
          ['MECH-Piping','Mechanical','Chilled water, steam, refrig.','Mechanical Eng.'],
          ['ELEC-Power','Electrical','Conduit, cable tray, switchgear','Electrical Eng.'],
          ['ELEC-Lighting','Electrical','Luminaires, circuits, panels','Electrical Eng.'],
          ['PLUMB-Pipe','Plumbing','Domestic, drainage, fire','Plumbing Eng.']]
    fl.append(dark_table(data,[80,70,120,80]))
    return fl

def s3():
    fl=[ChHead('3','Mechanical Systems','HVAC Ductwork, Equipment & System Configuration'),SP(3)]
    fl.append(P('<b>Creating Mechanical Systems in Revit</b>',H2))
    fl.extend([
        bullet('Place Air Terminals (diffusers, grilles, registers) on ceiling/wall faces'),
        bullet('Place Mechanical Equipment (AHU, FCU, VAV) at correct elevation'),
        bullet('Create System: Select terminal → Create System → Supply Air / Return Air / Exhaust'),
        bullet('Select equipment as Air Handling Unit for the system'),
        bullet('Use Duct (DU) command to draw ductwork — Revit auto-routes between terminals'),
        bullet('Flex Duct: Use for terminal connections (max 1.5m length per SMACNA guideline)'),
    ])
    fl.append(SP(2))
    fl.append(P('<b>Duct Sizing in Revit</b>',H2))
    fl.append(Box([
        'Mechanical Settings → Duct Settings → Sizing Method:',
        '  Equal Friction (Pa/m): Enter 0.8–1.2 Pa/m for comfort systems',
        '  Velocity: Enter max velocity per section type',
        'Analyze tab → Duct Pressure Loss Report — export to schedule',
        'Size Ducts: Select system → Duct System tab → Size Ducts (auto-size)',
        'Manual override: Select duct segment → Properties → Width / Height',
    ],CYAN))
    fl.append(SP(3))
    fl.append(P('<b>Mechanical Equipment & Connectors</b>',H2))
    data=[['Connector Type','Usage','Flow Direction','System Classification'],
          ['Air Connector','Duct connections','Supply / Return / Exhaust','Ductwork'],
          ['Pipe Connector','Chilled water, HW, Refrig.','Flow In / Out','Piping'],
          ['Electrical Connector','Equipment power supply','—','Power'],
          ['Face-based','Wall/ceiling mounted equip.','—','Family type specific'],
          ['Work Plane-based','Standalone equipment','—','Floor-level placement']]
    fl.append(dark_table(data,[75,90,75,80]))
    fl.append(SP(2))
    fl.extend([
        bullet('Insulation: Select duct → Add Insulation (Modify|Ducts) → specify thickness/material'),
        bullet('Duct Lining: Select duct → Add Lining → reduces internal area (check sizing)'),
        bullet('Duct Fittings: Revit auto-places elbows, tees, reducers when routing; load family if missing'),
    ])
    return fl

def s4():
    fl=[ChHead('4','Electrical Systems','Power Distribution, Lighting & Panel Scheduling'),SP(3)]
    fl.append(P('<b>Electrical Model Components</b>',H2))
    fl.extend([
        bullet('Distribution Equipment: Panels, switchboards, transformers, generators, UPS'),
        bullet('Power Devices: Outlets, switches, communication outlets, emergency devices'),
        bullet('Lighting Fixtures: Ceiling-hosted or face-based; load family with IES photometric data'),
        bullet('Conduit & Cable Tray: Route from equipment to devices; set conduit type and size'),
        bullet('Electrical Circuits: Connect devices to panel via Electrical → Power → Circuit'),
    ])
    fl.append(SP(2))
    fl.append(P('<b>Panel Scheduling Workflow</b>',H2))
    fl.append(Box([
        '1. Place Distribution Board (panel) family at correct location & voltage level',
        '2. Set Panel Properties: Voltage, phases (1PH / 3PH), mains type, number of circuits',
        '3. Create Circuits: Select devices → Modify tab → Power → Create Circuit → assign to panel',
        '4. Panel Schedule: Analyse tab → Panel Schedules → Create/Modify → load count, VA per circuit',
        '5. Verify load totals — Revit auto-calculates connected, estimated, demand loads',
        '6. Export: Right-click panel schedule → Export (for client submission)',
    ],ORG))
    fl.append(SP(3))
    fl.append(P('<b>Conduit Routing</b>',H2))
    fl.extend([
        bullet('Systems tab → Conduit with Fittings → Draw conduit run between devices and panels'),
        bullet('Conduit Type: Set EMT, RMC, PVC based on project spec (load via type properties)'),
        bullet('Conduit Size: Set manually (properties) or use Conduit Sizing (analyse tab)'),
        bullet('Cable Tray: Systems tab → Cable Tray → route backbone horizontal runs above ceiling'),
        bullet('Fittings: Revit auto-places standard elbows/tees; load manufacturer families for accuracy'),
        bullet('Conduit Stub-Up: Use Conduit Run that terminates at equipment connector point'),
    ])
    fl.append(SP(2))
    data=[['Electrical System Type','Example Components','Revit Classification','Voltage Level'],
          ['Normal Power (LV)','Lighting, general outlets','Power systems','230/400 V'],
          ['Emergency/EL','Emergency lighting, fire panels','Power systems','230/400 V'],
          ['Fire Alarm','FA devices, panels, loop','Data systems','24 VDC / 230 VAC'],
          ['Data/BMS','IT outlets, BMS sensors','Communication','24 VDC / POE'],
          ['MV Distribution','HV switchgear, transformers','—','11kV / 33kV']]
    fl.append(dark_table(data,[90,100,80,65]))
    return fl

def s5():
    fl=[ChHead('5','Plumbing & Piping','Domestic Water, Drainage, Fire Protection & Piping Systems'),SP(3)]
    fl.append(P('<b>Piping Systems in Revit</b>',H2))
    fl.extend([
        bullet('Pipe (PI) command: Systems tab → Pipe → draw between equipment/fixtures'),
        bullet('Pipe Types: Set material (copper, PVC, carbon steel, stainless) and joining method'),
        bullet('System Classification: Domestic Cold/Hot, Hydronic Supply/Return, Fire Protection, Fuel'),
        bullet('Slope: Set pipe slope in Properties → slope value (mm/m) for gravity drainage'),
        bullet('Pipe Sizing: Analyse tab → Pipe Pressure Loss Report; or set size manually'),
        bullet('Insulation: Select pipe → Add Insulation → choose material/thickness'),
    ])
    fl.append(SP(2))
    fl.append(P('<b>Plumbing Fixture Placement</b>',H2))
    fl.extend([
        bullet('Load plumbing fixture families (WCs, basins, showers) from Revit library or manufacturer'),
        bullet('Place face-based fixtures on wall/floor — ensure correct rotation and offset'),
        bullet('Connect: Select fixture → Connect → pipe appears; complete routing back to riser'),
        bullet('Drainage: Model horizontal waste pipes with slope; connect to vertical stacks'),
        bullet('Hot/Cold: Route separate systems; colour-code by system type for coordination drawings'),
        bullet('Fixture Units (FU): Input in fixture properties for demand load calculation'),
    ])
    fl.append(SP(2))
    fl.append(Box([
        'PIPE SIZING IN REVIT:',
        '1. Set system type and design flow rates in system properties',
        '2. Analyse tab → Pipe Pressure Loss Report → review friction and velocity',
        '3. Target velocity: 1.2–2.0 m/s domestic; 1.5–2.5 m/s chilled water',
        '4. Friction loss: 200–400 Pa/m for domestic; 150–300 Pa/m for HVAC pipework',
        '5. Manually size critical sections; use Revit sizing tool for remainder',
    ],GRN))
    fl.append(SP(3))
    data=[['Pipe System','Colour Code (CIBSE)','Typical Material','Slope Required'],
          ['Domestic Cold Water','Blue','CPVC / Copper','No (pressurised)'],
          ['Domestic Hot Water','Red','Copper / Stainless','No (pressurised)'],
          ['Chilled Water Supply','Cyan','Carbon steel / Cu-Ni','No'],
          ['Chilled Water Return','Cyan (dashed)','Carbon steel / Cu-Ni','No'],
          ['HWS Supply','Orange','Carbon steel','No'],
          ['Soil & Waste (drain)','Grey / Brown','uPVC','Yes: 1:80 minimum'],
          ['Fire Sprinkler','Red (dashed)','Black steel / CPVC','Drain slope only']]
    fl.append(dark_table(data,[90,85,80,65]))
    return fl

def s6():
    fl=[ChHead('6','Families','System Families, Loadable Components & Family Editor'),SP(3)]
    fl.append(P('<b>Types of Revit Families</b>',H2))
    data=[['Family Type','Definition','Examples','Editable?'],
          ['System Family','Built into Revit; not in library','Ducts, pipes, walls, floors','Properties only'],
          ['Loadable Family','External .rfa files; loaded into project','Luminaires, FCUs, valves','Full editor access'],
          ['In-Place Family','Created directly in project for unique items','Custom plenums, cable routes','Project-specific'],
          ['Annotation Family','2D symbols for documentation','Tags, title blocks, North arrow','Full editor access']]
    fl.append(dark_table(data,[70,120,110,60]))
    fl.append(SP(3))
    fl.append(P('<b>Family Editor — MEP Connector Setup</b>',H2))
    fl.append(Box([
        'CREATING AN MEP EQUIPMENT FAMILY:',
        '1. New Family → select template: Mechanical Equipment, Electrical Equipment, etc.',
        '2. Create 3D geometry (Extrusion/Blend) matching equipment envelope',
        '3. Add MEP Connector: Create tab → Connector → place on face at connection point',
        '4. Set connector: System Classification (Duct Air/Pipe Hydronic/Electrical)',
        '5. Add parameters: Flow, Pressure, Voltage — make them instance or type params',
        '6. Load into Project: Family editor → Load into Project (Ctrl+Shift+O)',
    ],ORG))
    fl.append(SP(3))
    fl.append(P('<b>Managing Family Libraries</b>',H2))
    fl.extend([
        bullet('Autodesk Content Library: Revit/Content folder — basic families included'),
        bullet('Manufacturer BIM Libraries: Danfoss, Grundfos, Schneider, Legrand provide Revit families'),
        bullet('BIMobject / NBS Source: Online repositories — verify LOD and parameter completeness'),
        bullet('Company Library: Create standardised, tested families for consistent project use'),
        bullet('Purge Unused: Manage tab → Purge Unused → remove unneeded families (reduces file size)'),
        bullet('Transfer Project Standards: Manage → Transfer Project Standards → between projects'),
    ])
    return fl

def s7():
    fl=[ChHead('7','Clash Detection','Navisworks, Coordination Views & BIM Coordination'),SP(3)]
    fl.append(DiagramWrap(dia_clash_matrix(),'Discipline Clash Risk Matrix — High/Medium/Standard'))
    fl.append(SP(3))
    fl.append(P('<b>Navisworks Clash Detection Workflow</b>',H2))
    fl.append(Box([
        '1. Export: Revit → Navisworks (.nwc) — each discipline exports separately',
        '2. Append in Navisworks: File → Append all discipline files to form federated model',
        '3. Clash Detective: Home tab → Clash Detective → New Test',
        '4. Select A (MECH) vs B (STRUCT/ARCH) — set tolerance (typically 25mm)',
        '5. Run test → review results → group and assign clashes to responsible party',
        '6. Status tracking: Assign → Active → Approved/Resolved → Reviewed',
        '7. Report: Clash Detective → Report → export PDF/HTML for coordination meeting',
    ],ORG))
    fl.append(SP(3))
    fl.append(P('<b>Coordination View Setup in Revit</b>',H2))
    fl.extend([
        bullet('Create 3D coordination view: Hide all linked models except discipline of interest'),
        bullet('Override Graphics: Colour-code each system by type (View → Override Graphics in View)'),
        bullet('Section Box: Use section box to isolate coordination area/zone'),
        bullet('Interference Check: Collaborate tab → Interference Check → between elements in project'),
        bullet('Revit Cloud Worksharing: BIM 360 Coordination for issue tracking and markup'),
    ])
    fl.append(SP(2))
    fl.append(P('<b>Common MEP Clash Scenarios</b>',H2))
    data=[['Clash Type','Typical Cause','Resolution','Priority'],
          ['Duct vs Beam','Structural depths not allowed for','Offset duct, raise beam if possible','High'],
          ['Pipe vs Conduit','Route conflicts at ceiling zone','Vertical separation (pipe above)','High'],
          ['Duct vs Door frame','Insufficient ceiling-to-soffit','Reduce duct size or reroute','High'],
          ['Cable Tray vs Structure','Tray spans over beams','Step tray up/down or penetrate','Medium'],
          ['Sprinkler vs Light','Grid ceiling coordination','Adjust layout in coordination model','Medium']]
    fl.append(dark_table(data,[75,110,110,45]))
    return fl

def s8():
    fl=[ChHead('8','Schedules & Annotation','Equipment Schedules, Tags & Sheet Annotation'),SP(3)]
    fl.append(P('<b>Creating MEP Schedules</b>',H2))
    fl.extend([
        bullet('View tab → Schedules → Schedule/Quantities → select category (e.g., Mechanical Equipment)'),
        bullet('Fields: Add parameters you need — Family, Type, Mark, System Name, Flow, Power, etc.'),
        bullet('Filter: Show only specific system types or levels (Filter by "System Classification" = Supply Air)'),
        bullet('Sorting/Grouping: Sort by mark number; group by system or level'),
        bullet('Formatting: Set column width, header text, number formatting'),
        bullet('Key Schedule: Create lookup key for repeated parameter combos (e.g., insulation type codes)'),
    ])
    fl.append(SP(2))
    fl.append(P('<b>Tag Families for MEP</b>',H2))
    fl.append(Box([
        'TAGGING MEP ELEMENTS:',
        'Annotate tab → Tag All Not Tagged → select category → apply to view',
        'Common tags: Duct Tag (size+system), Pipe Tag, Space Tag, Equipment Tag',
        'Tag Leaders: Enable leader in type properties for space-constrained annotations',
        'Keynote: Annotate → Keynote → By Element — links to specification system',
        'Room/Space Tags: Show ventilation zone name, number, area in RCP plans',
    ],CYAN))
    fl.append(SP(3))
    fl.append(P('<b>Useful MEP Schedule Types</b>',H2))
    data=[['Schedule Name','Category','Key Parameters','Use'],
          ['Equipment Schedule','Mechanical Equipment','Tag, Type, Capacity, Power','Specifications & BOQ'],
          ['Duct Schedule','Ducts','Length, Width, Height, System','Quantity take-off'],
          ['Panel Schedule','Electrical Equipment','Circuits, Loads, Breaker size','Electrical drawings'],
          ['Pipe Schedule','Pipes','Length, Diameter, Material, System','Quantity & procurement'],
          ['Space Schedule','Spaces','Area, Volume, Occupancy, Air Flow','Compliance & ventilation'],
          ['Lighting Fixture','Lighting Fixtures','Mark, Watts, Lumens, Circuit','Energy analysis']]
    fl.append(dark_table(data,[80,90,120,90]))
    return fl

def s9():
    fl=[ChHead('9','Views & Sheet Production','Plan Views, Sections, Sections & Drawing Sheets'),SP(3)]
    fl.append(P('<b>View Management Best Practices</b>',H2))
    fl.extend([
        bullet('View Template: Apply to all similar views — controls visibility, detail level, scale'),
        bullet('View Range: Set top/cut/bottom for correct plan display (especially for reflected ceiling plans)'),
        bullet('Discipline: Set Mechanical, Electrical, Coordination per view — controls default visibility'),
        bullet('Detail Level: Coarse (schematic), Medium (construction), Fine (fabrication)'),
        bullet('VG Overrides (VV): Override visibility per element category or filter per view'),
        bullet('Filters: Create rule-based filters (e.g., all Supply Air ducts → cyan colour fill)'),
    ])
    fl.append(SP(2))
    fl.append(P('<b>Sheet Setup & Titleblock</b>',H2))
    fl.append(Box([
        'SHEET NUMBERING CONVENTION (ISO/BS 1192):',
        'M-001: Mechanical — Floor Plans',
        'E-001: Electrical — Power Plans',
        'P-001: Plumbing — Domestic Water Plans',
        'FP-001: Fire Protection — Sprinkler Plans',
        'C-001: Coordination — Combined MEP Coordination Plans',
        'SC-001: Schematics / Riser Diagrams per discipline',
    ],ORG))
    fl.append(SP(3))
    fl.append(P('<b>Commonly Required MEP Drawings</b>',H2))
    data=[['Drawing Type','Scale','Contents','View Type'],
          ['Floor Plan — HVAC','1:100','Ductwork, equipment, diffusers, space names','Plan (RCP)'],
          ['Floor Plan — Electrical','1:100','Conduit, panels, outlets, lighting','Plan (ceiling/floor)'],
          ['Floor Plan — Plumbing','1:100','Pipe runs, fixtures, risers','Plan'],
          ['Schematic/Riser Diagram','NTS','System schematic, connectivity, sizing','Drafting view'],
          ['Equipment Room Plan','1:50','AHU, chillers, pumps with clearances','Plan'],
          ['Coordination Plan','1:100','All services combined (clash check)','3D / plan coordination'],
          ['Detail Sheet','1:20/1:10','Penetration, support, connection detail','Detail / section']]
    fl.append(dark_table(data,[90,35,130,90]))
    return fl

def s10():
    fl=[ChHead('10','IFC & Data Export','Open BIM, COBie, IFC Export & Interoperability'),SP(3)]
    fl.append(P('<b>IFC Export from Revit</b>',H2))
    fl.extend([
        bullet('File → Export → IFC → use IFC Export Setup (configure before first export)'),
        bullet('IFC Version: Use IFC4 for new projects; IFC2x3 for legacy software compatibility'),
        bullet('Level of Detail: Set matching project LOD (100–400) for intended use'),
        bullet('Property Sets: Map Revit parameters to IFC property sets (use IFC Export Settings)'),
        bullet('Coordinate: Export with shared coordinates (not project internal) for federation'),
        bullet('Element Mapping: Verify IFC entity mapping (IFCDuct, IFCPipeSegment, IFCLightFixture)'),
    ])
    fl.append(SP(2))
    fl.append(Box([
        'IFC ENTITY MAPPING — KEY MEP TYPES:',
        'Duct → IFCDuctSegment / IFCDuctFitting',
        'Pipe → IFCPipeSegment / IFCPipeFitting',
        'Air Terminal → IFCAirTerminal',
        'AHU → IFCUnitaryEquipment',
        'Chiller → IFCChiller',
        'Electrical Panel → IFCElectricDistributionBoard',
        'Cable Tray → IFCCableCarrierSegment',
    ],ORG))
    fl.append(SP(3))
    fl.append(P('<b>COBie Data for Facilities Management</b>',H2))
    fl.extend([
        bullet('COBie (Construction Operations Building Information Exchange) — structured asset data for FM'),
        bullet('Revit COBie Extension: Export via Manage → COBie Export → Excel/IFC-based output'),
        bullet('Key COBie sheets: Facility, Floor, Space, Zone, Component, System, Attribute'),
        bullet('Component: Each maintainable asset (AHU, fan, valve) = one COBie Component row'),
        bullet('Attribute: Additional data (serial number, warranty, maintenance interval, manufacturer)'),
        bullet('Required at project completion for asset handover to FM team per ISO 19650 Part 3'),
    ])
    return fl

def s11():
    fl=[ChHead('11','Dynamo & API','Revit API, Dynamo Scripting & Automation'),SP(3)]
    fl.append(P('<b>Dynamo for MEP Automation</b>',H2))
    fl.append(P('Dynamo is a visual programming environment integrated with Revit. MEP engineers use Dynamo to automate repetitive tasks, generate elements from external data, and perform complex geometric operations that would be impractical through the Revit UI.',BD))
    fl.append(SP(2))
    fl.extend([
        bullet('Access: Manage tab → Visual Programming → Dynamo Player / Dynamo (editor)'),
        bullet('Common MEP uses: Auto-number equipment tags, populate schedules from Excel, place outlets on a grid'),
        bullet('Nodes: Revit.Elements.Element → Get/SetParameterByName for batch parameter changes'),
        bullet('Data-Shapes: Package for user input forms in Dynamo scripts (install via Package Manager)'),
        bullet('Select All Elements of Category: Get all ducts/pipes on level → filter → set parameter'),
    ])
    fl.append(SP(2))
    fl.append(P('<b>Common Dynamo MEP Scripts</b>',H2))
    data=[['Script Purpose','Input','Output','Complexity'],
          ['Auto-number Duct Tags','Duct selection, prefix string','Sequential tag marks','Low'],
          ['Space to Zone Mapping','Space schedule CSV','Zone assignments in model','Medium'],
          ['Equipment from Excel','Excel table (mark, type, loc)','Placed families with params','High'],
          ['Parameter Copy','Source parameter, target','Mapped data across elements','Low'],
          ['Duct Length Report','Level/system filter','CSV with lengths per system','Medium'],
          ['Circuit Load Balancing','Panel + circuit data','Suggest phase assignment','High']]
    fl.append(dark_table(data,[100,100,100,60]))
    fl.append(SP(2))
    fl.append(Box([
        'REVIT API (Python/C#):',
        'FilteredElementCollector: Query all elements of a category in a document',
        'Transaction: All model changes must be wrapped in a Transaction context',
        'pyRevit: Python-based Revit macro framework — install for rapid script development',
        'Use cases: Batch export, custom validation, BIM health checks, automated QA reports',
    ],CYAN))
    return fl

def s12():
    fl=[ChHead('12','Best Practices & Careers','Standards, Quality Control & MEP BIM Career Paths'),SP(3)]
    fl.append(P('<b>MEP BIM Standards</b>',H2))
    fl.extend([
        bullet('ISO 19650 Parts 1–5: International BIM standard — information management over asset lifecycle'),
        bullet('BS EN ISO 19650-2: Delivery phase — EIR, BEP, OIR, AIR document structure'),
        bullet('RIBA Plan of Work 2020: UK project stages (0–7) with BIM responsibility matrix'),
        bullet('AIA E203 / G202 (US): BIM protocol document and Project BIM Plan'),
        bullet('COBie UK 2012 / COBie Schema 2.4: Asset data handover standard'),
        bullet('IFC4 ADD2: OpenBIM interoperability standard for all disciplines'),
    ])
    fl.append(SP(2))
    fl.append(P('<b>Model Quality Control Checklist</b>',H2))
    fl.append(Box([
        'PRE-ISSUE MODEL QC:',
        '1. All elements on correct worksets and correct level',
        '2. No unconnected duct/pipe ends (use Manage → Warnings)',
        '3. All spaces enclosed and tagged (no open boundary warnings)',
        '4. Equipment marks are unique and follow project convention',
        '5. All systems have equipment assigned (no orphan terminals)',
        '6. Purge unused families, types, materials before issue',
        '7. Run Interference Check — resolve or document accepted clashes',
    ],ORG))
    fl.append(SP(3))
    fl.append(P('<b>Revit MEP Career Pathways</b>',H2))
    data=[['Role','Focus','Tools','Salary Range'],
          ['BIM Technician / Drafter','Model production, drawing output','Revit, Navisworks','$45K–65K'],
          ['MEP BIM Engineer','System design + modelling','Revit, Hevacomp/EnergyPlus','$60K–85K'],
          ['BIM Coordinator','Multi-discipline coordination','Revit, Navisworks, BIM360','$70K–95K'],
          ['BIM Manager','Standards, templates, QC','Revit, Dynamo, Forge API','$90K–120K'],
          ['Digital Engineering Lead','Digital delivery strategy','All + cloud platforms','$110K–150K+']]
    fl.append(dark_table(data,[100,90,95,80]))
    fl.append(SP(2))
    fl.extend([
        bullet('Certifications: Autodesk Certified Professional (ACP) — Revit MEP; buildingSMART Professional'),
        bullet('BSc/MSc in Mechanical/Electrical Engineering is baseline; BIM is the differentiator'),
        bullet('Portfolio: Showcase coordinated federated models, Dynamo scripts, clash resolution reports'),
    ])
    return fl

def build():
    story=[PageBreak()]
    for sec in [toc,s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12]:
        story.extend(sec()); story.append(PageBreak())
    doc=SimpleDocTemplate(out,pagesize=A4,leftMargin=M,rightMargin=M,
        topMargin=18*mm,bottomMargin=16*mm,title=DOC_TITLE,author=AUTHOR,
        subject='Revit MEP, BIM coordination, HVAC modelling, electrical systems, IFC export',
        creator='AYE Tech Hub PDF Engine')
    doc.build(story,onFirstPage=draw_cover,onLaterPages=draw_page)
    size=os.path.getsize(out)/1024
    pages=doc.page
    import builtins; builtins.print(f'Generated: {out}  ({size:.0f} KB, {pages} pages)')

if __name__=='__main__': build()
