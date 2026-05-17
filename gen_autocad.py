#!/usr/bin/env python3
"""AYE Tech Hub — AutoCAD Commands Cheat Sheet generator."""
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

PW, PH = A4; M = 18*mm; CW = PW - 2*M
BG=HexColor('#020817'); BG2=HexColor('#0a1628'); BG3=HexColor('#0d1f3c'); BG4=HexColor('#1e293b')
CYAN=HexColor('#00d4ff'); WHT=HexColor('#ffffff'); GR1=HexColor('#e2e8f0'); GR2=HexColor('#94a3b8')
GR3=HexColor('#475569'); GR4=HexColor('#1e293b'); GRN=HexColor('#22c55e'); YEL=HexColor('#eab308')
RED=HexColor('#ef4444'); ORG=HexColor('#f97316'); PRP=HexColor('#a78bfa'); CYA2=HexColor('#00a8cc')
FOOTER="AYE Tech Hub — Engineering the Future"; DOC_TITLE="AutoCAD Commands Cheat Sheet"; AUTHOR="Awet G. Nway"
ACC=ORG  # accent color for this guide

def draw_cover(canv, doc):
    canv.setFillColor(BG); canv.rect(0,0,PW,PH,fill=1,stroke=0)
    canv.setFillColor(HexColor('#1a0800')); canv.rect(0,PH-220,PW,220,fill=1,stroke=0)
    canv.saveState(); canv.setStrokeColor(HexColor('#f9731615')); canv.setLineWidth(0.8)
    for i in range(-100,int(PW)+200,28): canv.line(i,PH,i-200,PH-220)
    canv.restoreState()
    canv.setFillColor(ACC); canv.rect(0,PH-5,PW,5,fill=1,stroke=0)
    canv.setFillColor(BG2); canv.roundRect(M,PH-95,88,55,7,fill=1,stroke=0)
    canv.setStrokeColor(ACC); canv.setLineWidth(1.5); canv.roundRect(M,PH-95,88,55,7,fill=0,stroke=1)
    canv.setFillColor(ACC); canv.setFont('Helvetica-Bold',26); canv.drawCentredString(M+44,PH-72,'AYE')
    canv.setFillColor(GR2); canv.setFont('Helvetica',7.5); canv.drawCentredString(M+44,PH-86,'TECH HUB')
    canv.setFillColor(HexColor('#f9731620')); canv.setStrokeColor(ACC); canv.setLineWidth(1)
    canv.roundRect(PW-M-130,PH-92,130,30,6,fill=1,stroke=1)
    canv.setFillColor(ACC); canv.setFont('Helvetica-Bold',8.5); canv.drawCentredString(PW-M-65,PH-74,'CAD & DESIGN')
    canv.setFillColor(GR2); canv.setFont('Helvetica',7); canv.drawCentredString(PW-M-65,PH-85,'ENGINEERING GUIDE')
    canv.setFillColor(WHT); canv.setFont('Helvetica-Bold',32); canv.drawString(M,PH-158,'AutoCAD Commands')
    canv.setFillColor(ACC); canv.setFont('Helvetica-Bold',32); canv.drawString(M,PH-196,'Cheat Sheet')
    canv.setFillColor(GR1); canv.setFont('Helvetica',12)
    canv.drawString(M,PH-226,'2D Drafting  ·  3D Modeling  ·  Layers  ·  Dimensioning  ·  Blocks')
    canv.drawString(M,PH-244,'Plotting  ·  Advanced Tools  ·  Shortcuts  ·  Best Practices')
    canv.setStrokeColor(ACC); canv.setLineWidth(1.5); canv.line(M,PH-262,PW-M,PH-262)
    stats=[('200+','COMMANDS'),('50+','SHORTCUTS'),('15','CATEGORIES'),('FREE','ACCESS')]
    sw=CW/4
    for i,(n,l) in enumerate(stats):
        x=M+i*sw+sw/2
        canv.setFillColor(ACC); canv.setFont('Helvetica-Bold',22); canv.drawCentredString(x,PH-289,n)
        canv.setFillColor(GR2); canv.setFont('Helvetica',7.5); canv.drawCentredString(x,PH-303,l)
    # CAD drawing visual panel
    py=PH-540; ph2=175
    canv.setFillColor(BG2); canv.roundRect(M,py,CW,ph2,8,fill=1,stroke=0)
    canv.setStrokeColor(GR4); canv.setLineWidth(0.8); canv.roundRect(M,py,CW,ph2,8,fill=0,stroke=1)
    # Draw a technical drawing visual
    cx=M+CW/2; cy=py+ph2/2
    # main rectangle (building plan)
    canv.setStrokeColor(ACC); canv.setLineWidth(1.5); canv.rect(M+30,py+25,CW-60,ph2-50,fill=0,stroke=1)
    # internal room divisions
    canv.setStrokeColor(CYA2); canv.setLineWidth(0.8)
    canv.line(M+30+120,py+25,M+30+120,py+ph2-25)
    canv.line(M+30,py+25+60,M+30+120,py+25+60)
    # dimension lines
    canv.setStrokeColor(GR3); canv.setLineWidth(0.5)
    canv.line(M+30,py+15,M+30+CW-60,py+15)
    canv.line(M+30,py+13,M+30,py+17); canv.line(M+30+CW-60,py+13,M+30+CW-60,py+17)
    canv.setFillColor(YEL); canv.setFont('Helvetica',6.5); canv.drawCentredString(M+CW/2,py+9,'24,000mm')
    # text annotations
    canv.setFillColor(GR2); canv.setFont('Helvetica',7)
    canv.drawCentredString(M+80,py+75,'ROOM A')
    canv.drawCentredString(M+250,py+95,'ROOM B')
    # hatch lines
    canv.setStrokeColor(GR3); canv.setLineWidth(0.3)
    for y in range(int(py+26),int(py+25+60),5): canv.line(M+31,y,M+30+118,y)
    canv.setFillColor(GR3); canv.setFont('Helvetica',6)
    canv.drawCentredString(M+CW/2,py+10,'— TYPICAL FLOOR PLAN — AUTOCAD 2D DRAFTING —')
    # keyboard shortcut badge
    for i,(cmd,desc) in enumerate([('L','LINE'),('C','CIRCLE'),('REC','RECTANGLE'),('H','HATCH'),('DIM','DIMENSION')]):
        bx=M+20+i*(CW/5-2); by=py+ph2-22
        canv.setFillColor(BG3); canv.roundRect(bx,by,CW/5-6,16,3,fill=1,stroke=0)
        canv.setStrokeColor(ACC); canv.setLineWidth(0.8); canv.roundRect(bx,by,CW/5-6,16,3,fill=0,stroke=1)
        canv.setFillColor(ACC); canv.setFont('Helvetica-Bold',7); canv.drawString(bx+4,by+5,cmd)
        canv.setFillColor(GR2); canv.setFont('Helvetica',6); canv.drawString(bx+18,by+5,desc)
    ay=py-50; canv.setFillColor(BG3); canv.roundRect(M,ay,CW,40,6,fill=1,stroke=0)
    canv.setFillColor(ACC); canv.setFont('Helvetica-Bold',11); canv.drawString(M+15,ay+24,AUTHOR)
    canv.setFillColor(GR2); canv.setFont('Helvetica',8.5)
    canv.drawString(M+15,ay+10,'Founder, AYE Tech Hub  |  CAD & Engineering Design Expert')
    canv.setFillColor(GRN); canv.roundRect(PW-M-90,ay+7,80,26,4,fill=1,stroke=0)
    canv.setFillColor(WHT); canv.setFont('Helvetica-Bold',10); canv.drawCentredString(PW-M-50,ay+22,'FREE')
    canv.setFont('Helvetica',6.5); canv.drawCentredString(PW-M-50,ay+10,'OPEN ACCESS')
    canv.setFillColor(BG2); canv.rect(0,0,PW,26,fill=1,stroke=0)
    canv.setFillColor(ACC); canv.setFont('Helvetica-Bold',8); canv.drawCentredString(PW/2,15,FOOTER)
    canv.setFillColor(GR3); canv.setFont('Helvetica',7)
    canv.drawString(M,6,'ayetechub.com'); canv.drawRightString(PW-M,6,'© 2026 AYE Tech Hub. All Rights Reserved.')

def draw_page(canv, doc):
    canv.setFillColor(BG); canv.rect(0,0,PW,PH,fill=1,stroke=0)
    canv.setStrokeColor(ACC); canv.setLineWidth(1.5); canv.line(M,PH-12*mm,PW-M,PH-12*mm)
    canv.setFillColor(ACC); canv.setFont('Helvetica-Bold',7); canv.drawString(M,PH-9*mm,'AYE TECH HUB')
    canv.setFillColor(GR2); canv.setFont('Helvetica',7); canv.drawRightString(PW-M,PH-9*mm,DOC_TITLE.upper())
    canv.setStrokeColor(GR4); canv.setLineWidth(0.5); canv.line(M,11*mm,PW-M,11*mm)
    canv.setFillColor(GR2); canv.setFont('Helvetica',6.5); canv.drawString(M,7.5*mm,FOOTER)
    canv.setFillColor(ACC); canv.setFont('Helvetica-Bold',8); canv.drawRightString(PW-M,7.5*mm,str(doc.page-1))

def S(name,**kw):
    d=dict(fontName='Helvetica',fontSize=9.5,textColor=GR1,leading=14,spaceAfter=6); d.update(kw)
    return ParagraphStyle(name,**d)
st={
    'h1':S('h1',fontName='Helvetica-Bold',fontSize=20,textColor=WHT,leading=24,spaceAfter=4),
    'h2':S('h2',fontName='Helvetica-Bold',fontSize=13,textColor=ACC,leading=17,spaceAfter=6,spaceBefore=14),
    'h3':S('h3',fontName='Helvetica-Bold',fontSize=10.5,textColor=WHT,leading=14,spaceAfter=5,spaceBefore=10),
    'body':S('body',spaceAfter=7,leading=14,alignment=TA_JUSTIFY),
    'bullet':S('bullet',leftIndent=14,spaceAfter=4,leading=13),
    'code':S('code',fontName='Courier',fontSize=8,textColor=ACC,backColor=BG2,leading=12,leftIndent=10,rightIndent=10,spaceAfter=8,spaceBefore=4),
    'caption':S('caption',fontSize=7.5,textColor=GR2,alignment=TA_CENTER,spaceAfter=10),
    'toc1':S('toc1',fontName='Helvetica-Bold',fontSize=10,textColor=WHT,leading=14,spaceAfter=3),
    'meta':S('meta',fontSize=8,textColor=GR2,leading=12),
    'label':S('label',fontName='Helvetica-Bold',fontSize=8.5,textColor=ACC,leading=12,spaceAfter=3),
    'cmd':S('cmd',fontName='Courier',fontSize=9,textColor=ACC,leading=13,spaceAfter=2),
}

class Box(Flowable):
    def __init__(self,title,lines,color=None,icon='ℹ'):
        Flowable.__init__(self); self.title=title; self.lines=lines
        self.color=color or ACC; self.icon=icon; self.width=CW
    def wrap(self,aw,ah): self._h=14+13*len(self.lines)+10; return self.width,self._h
    def draw(self):
        h=self._h; self.canv.saveState()
        self.canv.setFillColor(BG3); self.canv.roundRect(0,0,self.width,h,4,fill=1,stroke=0)
        self.canv.setFillColor(self.color); self.canv.rect(0,0,4,h,fill=1,stroke=0)
        self.canv.setFont('Helvetica-Bold',8.5); self.canv.drawString(14,h-12,f'{self.icon}  {self.title}')
        self.canv.setFillColor(GR1); self.canv.setFont('Helvetica',8.5)
        for i,line in enumerate(self.lines): self.canv.drawString(14,h-12-13*(i+1),f'  {line}')
        self.canv.restoreState()

class ChHead(Flowable):
    def __init__(self,number,title,subtitle=''):
        Flowable.__init__(self); self.number=number; self.title=title; self.subtitle=subtitle; self.width=CW
    def wrap(self,aw,ah): return self.width,56
    def draw(self):
        w=self.width; self.canv.saveState()
        self.canv.setFillColor(BG3); self.canv.roundRect(0,0,w,56,5,fill=1,stroke=0)
        self.canv.setStrokeColor(ACC); self.canv.setLineWidth(1); self.canv.roundRect(0,0,w,56,5,fill=0,stroke=1)
        self.canv.setFillColor(ACC); self.canv.roundRect(10,30,68,18,4,fill=1,stroke=0)
        self.canv.setFillColor(BG); self.canv.setFont('Helvetica-Bold',8); self.canv.drawCentredString(44,36,f'SECTION {self.number}')
        self.canv.setFillColor(WHT); self.canv.setFont('Helvetica-Bold',16); self.canv.drawString(10,12,self.title)
        if self.subtitle:
            self.canv.setFillColor(GR2); self.canv.setFont('Helvetica',8.5); self.canv.drawString(86,36,self.subtitle)
        self.canv.restoreState()

class Divider(Flowable):
    def __init__(self,color=GR4,w=None):
        Flowable.__init__(self); self.color=color; self.w=w or CW
    def wrap(self,aw,ah): return self.w,8
    def draw(self):
        self.canv.setStrokeColor(self.color); self.canv.setLineWidth(0.5); self.canv.line(0,4,self.w,4)

def P(txt,style='body'): return Paragraph(txt,st[style])
def SP(n=1): return Spacer(1,n*mm)
def bullet(txt): return P(f'<bullet>•</bullet> {txt}','bullet')

def cmd_table(data, col_widths=None):
    if col_widths is None: col_widths=[CW*0.18, CW*0.14, CW*0.68]
    t=Table(data,colWidths=col_widths)
    t.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,0),BG3),('TEXTCOLOR',(0,0),(-1,0),ACC),
        ('FONTNAME',(0,0),(-1,0),'Helvetica-Bold'),('FONTSIZE',(0,0),(-1,0),8.5),
        ('ROWBACKGROUNDS',(0,1),(-1,-1),[BG2,BG4]),('TEXTCOLOR',(0,1),(-1,-1),GR1),
        ('FONTNAME',(0,1),(-1,-1),'Helvetica'),('FONTSIZE',(0,1),(-1,-1),8.5),
        ('GRID',(0,0),(-1,-1),0.4,GR4),('TOPPADDING',(0,0),(-1,-1),5),
        ('BOTTOMPADDING',(0,0),(-1,-1),5),('LEFTPADDING',(0,0),(-1,-1),8),
        ('RIGHTPADDING',(0,0),(-1,-1),8),('VALIGN',(0,0),(-1,-1),'MIDDLE'),
        ('LINEBELOW',(0,0),(-1,0),1,ACC),
        ('FONTNAME',(0,1),(-2,-1),'Courier'),
    ]))
    return t

def two_col_table(left_data, right_data):
    lw=rw=CW/2-4
    lt=cmd_table(left_data, [lw*0.28, lw*0.14, lw*0.58])
    rt=cmd_table(right_data, [rw*0.28, rw*0.14, rw*0.58])
    wrapper=Table([[lt,rt]],colWidths=[CW/2-4, CW/2-4])
    wrapper.setStyle(TableStyle([('TOPPADDING',(0,0),(-1,-1),0),('BOTTOMPADDING',(0,0),(-1,-1),0),
        ('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),4)]))
    return wrapper

def toc():
    sections=[
        (1,'Drawing & Object Commands','3'),
        (2,'Modify & Edit Commands','5'),
        (3,'Layer Management','7'),
        (4,'Dimensioning Commands','9'),
        (5,'Annotation & Text','11'),
        (6,'Blocks, Xrefs & References','12'),
        (7,'View & Navigation','13'),
        (8,'Selection & Grip Tools','14'),
        (9,'Plotting & Publishing','15'),
        (10,'3D Modeling Commands','16'),
        (11,'Advanced & Express Tools','17'),
        (12,'Keyboard Shortcuts Master List','18'),
        (13,'Layer Standards & Best Practices','20'),
        (14,'Drawing Setup & Templates','21'),
        (15,'Troubleshooting & Tips','22'),
    ]
    e=[SP(4),P('TABLE OF CONTENTS','h1'),Divider(ACC),SP(3)]
    for num,title,pg in sections:
        dots='.'*max(2,55-len(f'Section {num} — {title}'))
        e.append(P(f'<font color="#f97316"><b>Section {num} — </b></font>'
                   f'<font color="#e2e8f0">{title}</font>'
                   f'<font color="#475569">{dots}{pg}</font>','toc1'))
        e.append(SP(1))
    return e

def s1():
    e=[ChHead('1','Drawing & Object Commands','LINE · CIRCLE · ARC · RECTANGLE · POLYGON'),SP(3)]
    e.append(P('These are the foundational drawing commands used in every AutoCAD 2D project. '
               'Mastering their options dramatically increases drafting speed.','body'))
    e.append(P('2D Drawing Commands','h2'))
    draw_cmds=[
        ['Command','Alias','Description & Key Options'],
        ['LINE','L','Draw straight lines. Options: Close (C), Undo (U). Multi-segment: keep clicking points.'],
        ['CIRCLE','C','Draw circles. Options: 3P (3-point), 2P (2-point), TTR (tangent-tangent-radius), TTT.'],
        ['ARC','A','Draw arcs. 11 subtypes: 3-Point, Start-Center-End, Start-Center-Angle, Start-End-Radius.'],
        ['RECTANGLE','REC','Draw rectangles. Options: Chamfer (C), Elevation (E), Fillet (F), Thickness (T), Width (W).'],
        ['POLYGON','POL','Draw regular polygons 3–1024 sides. Options: Inscribed in circle / Circumscribed about circle.'],
        ['ELLIPSE','EL','Draw ellipses. Options: Arc (creates elliptical arc), Center, Axis-End.'],
        ['PLINE','PL','Draw polylines (connected line+arc segments). Assigns width. Use for closed shapes.'],
        ['SPLINE','SPL','Draw smooth NURBS curves through or near control points. Types: Fit, CV.'],
        ['POINT','PO','Place a point object. Display controlled by PDMODE/PDSIZE system variables.'],
        ['DONUT','DO','Draw filled rings or solid filled circles. Specify inside/outside diameter.'],
        ['XLINE','XL','Draw infinite construction lines (rays through 2 points). Great for layout.'],
        ['RAY','RAY','Draw semi-infinite construction ray from a start point through a second point.'],
        ['SOLID','SO','Draw filled triangular or quadrilateral solid shapes (not 3D solid).'],
        ['BOUNDARY','BO','Create a closed boundary polyline or region from enclosed areas automatically.'],
        ['REGION','REG','Convert 2D closed objects into 2D surface regions for Boolean operations.'],
        ['REVCLOUD','REVCLOUD','Draw revision clouds to mark changed areas on drawings. Options: Arc length, Style.'],
        ['SKETCH','SKETCH','Freehand sketching with incremental line segments. Rarely used in production.'],
    ]
    cols=[CW*0.14,CW*0.08,CW*0.78]
    e.append(cmd_table([[Paragraph(c,st['label'] if r==0 else (st['cmd'] if j<2 else st['body'])) for j,c in enumerate(row)] for r,row in enumerate(draw_cmds)],cols))
    e.append(SP(3))
    e.append(P('Object Snap (OSNAP) Settings','h2'))
    osnap=[
        ['OSNAP Mode','Shortcut','Description'],
        ['Endpoint','END','Snap to the nearest endpoint of lines, arcs, polylines.'],
        ['Midpoint','MID','Snap to the midpoint of lines, arcs, polylines.'],
        ['Center','CEN','Snap to the center of circles, arcs, ellipses.'],
        ['Node','NOD','Snap to point objects.'],
        ['Quadrant','QUA','Snap to 0°, 90°, 180°, 270° of circles/arcs/ellipses.'],
        ['Intersection','INT','Snap to the intersection of two objects.'],
        ['Extension','EXT','Snap to the imaginary extension of a line or arc.'],
        ['Insertion','INS','Snap to the insertion point of blocks and text.'],
        ['Perpendicular','PER','Snap perpendicular to a line, arc, or circle.'],
        ['Tangent','TAN','Snap tangent to a circle or arc.'],
        ['Nearest','NEA','Snap to the nearest point on any object.'],
        ['Apparent Intersection','APPINT','Snap where two objects would intersect if extended.'],
        ['Parallel','PAR','Snap to draw parallel to an existing line.'],
    ]
    cols2=[CW*0.22,CW*0.14,CW*0.64]
    e.append(cmd_table([[Paragraph(c,st['label'] if r==0 else (st['cmd'] if j<2 else st['body'])) for j,c in enumerate(row)] for r,row in enumerate(osnap)],cols2))
    e.append(SP(3))
    e.append(Box('Pro Tip: OSNAP Keyboard Override',[
        'Type the 3-letter OSNAP shortcut during any command to snap exactly once.',
        'Example: While in LINE command, type MID then click a line → snaps to midpoint.',
        'F3 toggles running OSNAP on/off. ~SHIFT+right-click opens OSNAP context menu.',
    ],ACC,'★'))
    return e

def s2():
    e=[ChHead('2','Modify & Edit Commands','MOVE · COPY · TRIM · EXTEND · OFFSET'),SP(3)]
    e.append(P('Modify commands transform, restructure, and refine existing geometry. '
               'These are used constantly in professional drafting — mastering them is essential.','body'))
    mod_cmds=[
        ['Command','Alias','Description & Key Options'],
        ['MOVE','M','Move objects from one location to another. Uses base point + displacement.'],
        ['COPY','CO / CP','Copy objects. Options: Array (A) for multiple copies at set spacing.'],
        ['ROTATE','RO','Rotate objects around a base point. Options: Copy (C), Reference (R).'],
        ['SCALE','SC','Scale objects uniformly or non-uniformly. Options: Copy (C), Reference (R).'],
        ['MIRROR','MI','Mirror objects across a line. Option to delete or keep original.'],
        ['OFFSET','O','Create parallel copies at a specified distance. Options: Through (T), Erase (E).'],
        ['TRIM','TR','Trim objects to cutting edges. SHIFT+click extends instead of trims.'],
        ['EXTEND','EX','Extend objects to boundary edges. SHIFT+click trims instead of extends.'],
        ['FILLET','F','Create rounded corners. R sets radius. Options: Polyline (P), Trim (T), Multiple (M).'],
        ['CHAMFER','CHA','Create beveled corners. D sets distances. Options: Polyline (P), Angle (A).'],
        ['ARRAY','AR','Create rectangular, polar, or path arrays of objects. Classic: ARRAYCLASSIC.'],
        ['STRETCH','S','Stretch geometry by moving endpoints within a crossing selection window.'],
        ['LENGTHEN','LEN','Lengthen or shorten lines/arcs. Options: Delta (DE), Percent (P), Total (T).'],
        ['BREAK','BR','Break objects at two points or at a point (BR P). Removes segment between points.'],
        ['JOIN','J','Join collinear lines, overlapping arcs, and polylines into a single object.'],
        ['EXPLODE','X','Explode blocks, polylines, dimensions, hatches into constituent elements.'],
        ['PEDIT','PE','Edit polylines: Join, Width, Fit, Spline, Reverse. Also converts lines to polylines.'],
        ['SPLINEDIT','SPE','Edit spline control vertices, fit points, open/close, add/remove vertices.'],
        ['GRIP EDIT','—','Click object to show grips. Click grip then move/stretch/rotate. SPACE cycles modes.'],
    ]
    cols=[CW*0.14,CW*0.10,CW*0.76]
    e.append(cmd_table([[Paragraph(c,st['label'] if r==0 else (st['cmd'] if j<2 else st['body'])) for j,c in enumerate(row)] for r,row in enumerate(mod_cmds)],cols))
    e.append(SP(3))
    e.append(Box('Trim/Extend Master Tip',[
        'Press ENTER at "Select cutting edges" prompt → ALL objects become cutting edges automatically.',
        'This is the fastest workflow: TR > ENTER > click everything to trim.',
        'SHIFT+click during TRIM = extend; SHIFT+click during EXTEND = trim.',
    ],GRN,'★'))
    return e

def s3():
    e=[ChHead('3','Layer Management','LAYER · PROPERTIES · FILTERS · STANDARDS'),SP(3)]
    e.append(P('Layers are the organizational backbone of every AutoCAD drawing. Professional '
               'drawings use industry-standard layer naming conventions to ensure compatibility, '
               'readability, and collaboration across teams and disciplines.','body'))
    layer_cmds=[
        ['Command','Alias','Description'],
        ['LAYER','LA','Open Layer Properties Manager. Create, delete, rename, freeze, lock layers.'],
        ['LAYERSTATE','—','Save and restore complete layer configurations (visibility, color, linetype).'],
        ['LAYON','—','Turn on all layers. Equivalent to setting all layers to ON state.'],
        ['LAYOFF','—','Turn off layers by clicking objects on them. Objects invisible but still exist.'],
        ['LAYFRZ','—','Freeze layers by clicking objects. Frozen layers excluded from REGEN.'],
        ['LAYTHW','—','Thaw all frozen layers. Reverse of LAYFRZ.'],
        ['LAYLCK','—','Lock layers by clicking objects. Objects visible but not selectable.'],
        ['LAYULK','—','Unlock layers by clicking objects.'],
        ['LAYMCH','—','Match selected objects\' layer to destination layer by clicking target.'],
        ['LAYCUR','—','Move selected objects to current layer.'],
        ['LAYDEL','—','Delete all objects on a layer and remove the layer from the drawing.'],
        ['LAYISO','—','Isolate a layer: all other layers faded or locked. LAYUNISO to restore.'],
        ['LAYWALK','—','Walk through layers: highlights each layer in sequence to check content.'],
        ['-LAYER','—','Command-line layer management (scriptable, without dialog).'],
    ]
    cols=[CW*0.14,CW*0.08,CW*0.78]
    e.append(cmd_table([[Paragraph(c,st['label'] if r==0 else (st['cmd'] if j<2 else st['body'])) for j,c in enumerate(row)] for r,row in enumerate(layer_cmds)],cols))
    e.append(SP(3))
    e.append(P('AIA/NCS Layer Naming Standard','h3'))
    e.append(P('The AIA CAD Layer Guidelines (National CAD Standard) defines the format: '
               '<b>L-DDDD-SSSS-MMMM</b> where L=discipline, D=major category, S=minor, M=status.','body'))
    layers=[
        ['Discipline Code','Major Group','Example Layer','Description'],
        ['A (Architectural)','WALL','A-WALL-FULL','Full-height walls'],
        ['S (Structural)','COLS','S-COLS-CONC','Concrete columns'],
        ['M (Mechanical)','DUCT','M-DUCT-SUPP','Supply ductwork'],
        ['E (Electrical)','LITE','E-LITE-CLIG','Ceiling light fixtures'],
        ['P (Plumbing)','PIPE','P-PIPE-DOMW','Domestic water piping'],
        ['C (Civil)','TOPO','C-TOPO-MAJR','Major topographic contours'],
        ['L (Landscape)','PLNT','L-PLNT-TREE','Trees'],
        ['G (General)','ANNO','G-ANNO-TEXT','General annotation text'],
        ['0','—','0 (zero)','Default layer — geometry placed here only temporarily'],
        ['DEFPOINTS','—','DEFPOINTS','Dimension definition points — never plot'],
    ]
    cols2=[CW*0.18,CW*0.14,CW*0.22,CW*0.46]
    e.append(cmd_table([[Paragraph(c,st['label'] if r==0 else st['body']) for c in row] for r,row in enumerate(layers)],cols2))
    return e

def s4():
    e=[ChHead('4','Dimensioning Commands','LINEAR · ALIGNED · ANGULAR · RADIAL · LEADERS'),SP(3)]
    dim_cmds=[
        ['Command','Alias','Description'],
        ['DIMLINEAR','DLI','Horizontal or vertical dimensions. Smart: picks correct orientation.'],
        ['DIMALIGNED','DAL','Dimensions aligned to an angled object (true length).'],
        ['DIMANGULAR','DAN','Dimensions the angle between two lines or three points.'],
        ['DIMRADIUS','DRA','Radius dimension with leader pointing to arc or circle center.'],
        ['DIMDIAMETER','DDI','Diameter dimension (Ø symbol). Click on circle or arc.'],
        ['DIMARC','DAR','Measures arc length. Displays arc symbol (⌒) above dimension text.'],
        ['DIMBASELINE','DBA','Creates dimensions from a common baseline. Continue after first dim.'],
        ['DIMCONTINUE','DCO','Creates chain of dimensions continuing from previous endpoint.'],
        ['DIMORDINATE','DOR','Creates ordinate (datum) dimensions showing X or Y coordinates.'],
        ['QDIM','QDIM','Quick dimension: select objects and click → multiple dims at once.'],
        ['DIM','DIM','Smart dimensioning: automatically selects correct dim type from selection.'],
        ['DIMSPACE','—','Equally space parallel linear dimensions at a specified distance.'],
        ['DIMBREAK','—','Adds breaks to dimension lines where they cross geometry.'],
        ['DIMEDIT','DED','Edit dimension text or extension line angles. Options: Home, New, Rotate.'],
        ['DIMSTYLE','D','Manage dimension styles (text height, arrowheads, tolerances, scale).'],
        ['DIMTEDIT','—','Move or rotate dimension text. Modes: Left, Right, Center, Home, Angle.'],
        ['QLEADER','LE','Quick leader with text or block annotation.'],
        ['MLEADER','MLD','Multileader: supports multiple leaders with formatted content.'],
    ]
    cols=[CW*0.18,CW*0.10,CW*0.72]
    e.append(cmd_table([[Paragraph(c,st['label'] if r==0 else (st['cmd'] if j<2 else st['body'])) for j,c in enumerate(row)] for r,row in enumerate(dim_cmds)],cols))
    e.append(SP(3))
    e.append(Box('Dimension Style Best Practices',[
        'Always create a project-specific DIMSTYLE — never use the default "Standard" style in production.',
        'Set DIMSCALE to match your plot scale factor (e.g., 1:100 → DIMSCALE = 100 in Model Space).',
        'Use ANNOTATIVE dimension style for layouts — AutoCAD handles scale automatically.',
        'Create separate dimstyles for different annotation scales (1:50, 1:100, 1:200).',
    ],ACC,'⚙'))
    return e

def s5():
    e=[ChHead('5','Annotation & Text','MTEXT · DTEXT · STYLE · FIELD'),SP(3)]
    text_cmds=[
        ['Command','Alias','Description'],
        ['MTEXT','MT/T','Multiline text with full formatting (bold, italic, color, tabs, lists).'],
        ['TEXT / DTEXT','DT','Single-line dynamic text. Repositions after each Enter.'],
        ['SPELL','SP','Check spelling on selected text objects.'],
        ['FIND','FI','Find and optionally replace text strings within the drawing.'],
        ['STYLE','ST','Manage text styles (font, height, oblique angle, backwards/upside down).'],
        ['TEXTTOFRONT','—','Bring all text and dimensions in front of other objects.'],
        ['SCALETEXT','—','Scale text objects without changing their insertion points.'],
        ['JUSTIFYTEXT','—','Change text justification without moving the text visually.'],
        ['ARCTEXT','—','Write text along an arc. (Express Tools required)'],
        ['FIELD','—','Insert data-linked field text: file name, date, sheet number, object properties.'],
        ['MLEADER','MLD','Multileader annotation. Supports text, blocks, and complex callouts.'],
        ['TOLERANCE','TOL','Insert GD&T (geometric dimensioning and tolerancing) symbols.'],
    ]
    cols=[CW*0.18,CW*0.10,CW*0.72]
    e.append(cmd_table([[Paragraph(c,st['label'] if r==0 else (st['cmd'] if j<2 else st['body'])) for j,c in enumerate(row)] for r,row in enumerate(text_cmds)],cols))
    return e

def s6():
    e=[ChHead('6','Blocks, Xrefs & References','BLOCK · INSERT · XREF · WBLOCK'),SP(3)]
    block_cmds=[
        ['Command','Alias','Description'],
        ['BLOCK','B','Define a block from selected objects. Assigns name, base point, and properties.'],
        ['INSERT','I','Insert a block definition into the current drawing.'],
        ['WBLOCK','W','Write a block or objects to a separate DWG file on disk.'],
        ['EXPLODE','X','Explode a block insert to its constituent elements.'],
        ['BEDIT','BE','Edit a block definition in the Block Editor environment.'],
        ['REFEDIT','—','Edit an Xref or nested block in-place within the host drawing.'],
        ['ATTDEF','ATT','Define an attribute (variable text) to embed in a block.'],
        ['ATTEDIT','ATE','Edit attribute values in selected block inserts.'],
        ['EATTEDIT','—','Enhanced attribute editor with spreadsheet-style editing.'],
        ['ATTEXT','—','Extract attribute data from blocks to CSV/TXT/DXF.'],
        ['XREF','XR','Manage external reference files: attach, bind, overlay, detach.'],
        ['XATTACH','XA','Attach an external DWG as an Xref.'],
        ['XBIND','XB','Permanently bind Xref-dependent symbols (layers, styles) into drawing.'],
        ['XCLIP','XC','Clip an Xref or block with a boundary (rectangle, polygon, or polyline).'],
        ['REGEN','RE','Regenerate the drawing to update display of objects and Xrefs.'],
    ]
    cols=[CW*0.14,CW*0.08,CW*0.78]
    e.append(cmd_table([[Paragraph(c,st['label'] if r==0 else (st['cmd'] if j<2 else st['body'])) for j,c in enumerate(row)] for r,row in enumerate(block_cmds)],cols))
    return e

def s7():
    e=[ChHead('7','View & Navigation','ZOOM · PAN · VIEW · VIEWPORTS'),SP(3)]
    view_cmds=[
        ['Command','Alias','Description'],
        ['ZOOM','Z','Zoom options: All (A), Extents (E), Window (W), Previous (P), Scale (S), Realtime.'],
        ['PAN','P','Pan the drawing view. Press Esc or Enter to exit. Middle mouse button drags.'],
        ['VIEW','V','Save and restore named views. Useful for returning to key areas quickly.'],
        ['MVIEW','MV','Create and manage model space viewports in paper space layouts.'],
        ['VPORTS','—','Create tiled viewports in model space for simultaneous multi-view editing.'],
        ['VPCLIP','—','Clip a viewport with a custom boundary shape.'],
        ['VPLAYER','—','Freeze/thaw layers independently in each viewport.'],
        ['3DORBIT','3DO','Orbit around 3D model in real time. SHIFT+Middle button orbits.'],
        ['PLAN','—','Return to plan (top) view in 3D. Options: Current UCS, World, Named UCS.'],
        ['VSCURRENT','VS','Change visual style: 2D Wireframe, Conceptual, Realistic, X-Ray.'],
        ['REGEN','RE','Regenerate model (recalculate display). Fixes display artifacts.'],
        ['REGENALL','REA','Regenerate all viewports simultaneously.'],
    ]
    cols=[CW*0.14,CW*0.10,CW*0.76]
    e.append(cmd_table([[Paragraph(c,st['label'] if r==0 else (st['cmd'] if j<2 else st['body'])) for j,c in enumerate(row)] for r,row in enumerate(view_cmds)],cols))
    return e

def s8():
    e=[ChHead('8','Selection & Properties','SELECT · FILTER · PROPERTIES · QUICK SELECT'),SP(3)]
    sel_cmds=[
        ['Command','Alias','Description'],
        ['SELECT','SEL','Manually build selection sets. Options: Last, All, Window, Crossing, Fence, WPolygon, CPolygon.'],
        ['QSELECT','—','Quick Select: filter objects by type, layer, color, or property.'],
        ['FILTER','FI','Object Selection Filter: complex logical conditions (AND/OR) across all properties.'],
        ['PROPERTIES','PR / CTRL+1','Display/edit all properties of selected objects.'],
        ['MATCHPROP','MA','Copy properties (layer, color, linetype, style) from source to target objects.'],
        ['CHPROP','—','Change properties via command line (Layer, LType, Color, LTScale, Thickness).'],
        ['SELECTSIMILAR','—','Add all similar objects (same block name, layer, or type) to selection.'],
        ['GROUP','G','Create a named group of objects for easy re-selection.'],
        ['UNGROUP','—','Dissolve a group back to individual objects.'],
        ['ISOLATEOBJECTS','—','Isolate selected objects; hide all others. HISOLATEOBJECTS hides them.'],
        ['UNISOLATEOBJECTS','—','Restore all hidden/isolated objects to full visibility.'],
    ]
    cols=[CW*0.18,CW*0.10,CW*0.72]
    e.append(cmd_table([[Paragraph(c,st['label'] if r==0 else (st['cmd'] if j<2 else st['body'])) for j,c in enumerate(row)] for r,row in enumerate(sel_cmds)],cols))
    return e

def s9():
    e=[ChHead('9','Plotting & Publishing','PLOT · PUBLISH · PDF · CTB/STB'),SP(3)]
    plot_cmds=[
        ['Command','Alias','Description'],
        ['PLOT','CTRL+P','Open Plot dialog: printer, paper size, plot area, scale, style table.'],
        ['PUBLISH','—','Batch-plot multiple layouts or sheets to DWF, DWFx, PDF, or printer.'],
        ['PAGESETUP','—','Define page setup (printer/plotter, paper size, scale) without plotting.'],
        ['EXPORTPDF','—','Export drawing to PDF. Supports single sheet or all layouts.'],
        ['EXPORTDWF','—','Export to Design Web Format for online sharing and review.'],
        ['ETRANSMIT','—','Package drawing with all dependencies (Xrefs, images, fonts) for transmittal.'],
        ['RECOVER','—','Recover a damaged DWG file that will not open normally.'],
        ['AUDIT','—','Audit drawing for errors and fix (AUDIT then answer "Yes" to fix errors).'],
        ['PURGE','PU','Remove unused blocks, layers, styles, linetypes to reduce file size.'],
        ['DWGPROPS','—','Set drawing properties (title, subject, author, keywords) for file management.'],
        ['STATUSBAR','—','Toggle the status bar display (OSNAP, GRID, ORTHO, POLAR, etc.)'],
        ['PLOTTERMANAGER','—','Open the Plotter Manager to configure plotter/printer PC3 files.'],
        ['STYLESMANAGER','—','Open Plot Style Manager to edit CTB (Color-dependent) or STB tables.'],
    ]
    cols=[CW*0.18,CW*0.10,CW*0.72]
    e.append(cmd_table([[Paragraph(c,st['label'] if r==0 else (st['cmd'] if j<2 else st['body'])) for j,c in enumerate(row)] for r,row in enumerate(plot_cmds)],cols))
    e.append(SP(3))
    e.append(Box('Plot Scale Best Practice',[
        'Always plot from PAPER SPACE layouts — not from Model Space directly.',
        'Set viewport scale (VP scale) = 1:drawing scale (e.g., 1:100). Then plot at 1:1.',
        'Use ANNOTATIVE text and dims — AutoCAD adjusts scale per viewport automatically.',
        'Use a project CTB file with consistent lineweights: 0.18mm (thin), 0.35mm (medium), 0.70mm (thick).',
    ],ACC,'⚙'))
    return e

def s10():
    e=[ChHead('10','3D Modeling Commands','EXTRUDE · REVOLVE · UNION · SUBTRACT'),SP(3)]
    cmds3d=[
        ['Command','Alias','Description'],
        ['EXTRUDE','EXT','Extrude 2D profile to create 3D solid or surface. Supports taper angle.'],
        ['REVOLVE','REV','Revolve 2D profile around an axis to create solid of revolution.'],
        ['LOFT','LOFT','Loft between cross-section profiles to create organic 3D shapes.'],
        ['SWEEP','SWEEP','Sweep a 2D profile along a path curve to create 3D solid or surface.'],
        ['UNION','UNI','Boolean union: combine two or more 3D solids into one.'],
        ['SUBTRACT','SU','Boolean subtract: remove one solid from another (holes, pockets).'],
        ['INTERSECT','IN','Boolean intersect: keep only the overlapping volume of two solids.'],
        ['CHAMFEREDGE','—','Chamfer edges of 3D solids. Select edges, set distances.'],
        ['FILLETEDGE','—','Fillet (round) edges of 3D solids. Select edges, set radius.'],
        ['SECTION','SEC','Create 2D cross-section from a 3D solid using a cutting plane.'],
        ['SLICE','SL','Slice a 3D solid with a plane. Keep one half, both halves, or selected side.'],
        ['SHELL','—','Create hollow shell from a 3D solid. Specify wall thickness and open faces.'],
        ['3DARRAY','—','Create 3D rectangular or polar arrays of 3D objects.'],
        ['3DMIRROR','—','Mirror 3D objects about a plane (XY, YZ, ZX, or 3-point defined plane).'],
        ['3DROTATE','3R','Rotate 3D objects around X, Y, or Z axis using 3D rotate gizmo.'],
        ['3DMOVE','3M','Move objects in 3D using move gizmo with axis constraints.'],
        ['RENDERPRESETS','—','Configure rendering quality and output for 3D visualizations.'],
    ]
    cols=[CW*0.16,CW*0.10,CW*0.74]
    e.append(cmd_table([[Paragraph(c,st['label'] if r==0 else (st['cmd'] if j<2 else st['body'])) for j,c in enumerate(row)] for r,row in enumerate(cmds3d)],cols))
    return e

def s11():
    e=[ChHead('11','Advanced & Express Tools','OVERKILL · FLATTEN · BURST · SUPERHATCH'),SP(3)]
    adv_cmds=[
        ['Command','Source','Description'],
        ['OVERKILL','Standard','Remove duplicate and overlapping geometry. Options: Tolerance, Ignore properties.'],
        ['FLATTEN','Express','Flatten 3D geometry to Z=0 elevation for 2D plotting.'],
        ['BURST','Express','Explode block and retain attribute values as Mtext objects (not EXPLODE).'],
        ['SUPERHATCH','Express','Hatch with an image, block, or Xref as the hatch pattern.'],
        ['TXTEXP','Express','Explode text to polylines (for CNC export, unusual fonts).'],
        ['ARCTEXT','Express','Write text along an arc path.'],
        ['BREAKLINE','Express','Insert break line symbol automatically sized to viewport.'],
        ['DIMREASSOC','Standard','Reassociate dimensions to geometry if they have become disassociated.'],
        ['FIXDISASSOCIATEDDIM','—','Fix disassociated dimensions using automatic object recognition.'],
        ['NCOPY','Express','Copy objects nested in Xrefs or blocks to the current space.'],
        ['MSTRETCH','Express','Stretch multiple objects simultaneously.'],
        ['TCOUNT','Express','Add sequential numbering to multiple text objects automatically.'],
        ['CONVERT','Standard','Convert proxy objects (from other software) to native AutoCAD objects.'],
        ['DRAWORDER','DR','Control draw order: Front, Back, Above/Below Object.'],
        ['TEXTMASK','Express','Apply a wipe-out mask behind text for clear readability over hatching.'],
        ['LISP','—','Run AutoLISP routines. Commands: APPLOAD, VLIDE, (load "file.lsp")'],
        ['ACTRECORD','—','Action Recorder: record commands as a macro for automation.'],
    ]
    cols=[CW*0.18,CW*0.12,CW*0.70]
    e.append(cmd_table([[Paragraph(c,st['label'] if r==0 else (st['cmd'] if j<2 else st['body'])) for j,c in enumerate(row)] for r,row in enumerate(adv_cmds)],cols))
    return e

def s12():
    e=[ChHead('12','Keyboard Shortcuts Master List','Function Keys · Ctrl · System Variables'),SP(3)]
    e.append(P('Keyboard Shortcuts','h2'))
    shortcuts=[
        ['Shortcut','Action','Shortcut','Action'],
        ['F1','Help','F2','Text Window (Command History)'],
        ['F3','OSNAP Toggle','F4','3D Object Snap (Model Space)'],
        ['F5','Isoplane Toggle','F6','Dynamic UCS Toggle'],
        ['F7','Grid Display','F8','ORTHO Mode'],
        ['F9','SNAP Toggle','F10','Polar Tracking'],
        ['F11','Object Snap Tracking','F12','Dynamic Input'],
        ['CTRL+A','Select All','CTRL+B','Grid Snap On/Off'],
        ['CTRL+C','Copy to Clipboard','CTRL+V','Paste from Clipboard'],
        ['CTRL+SHIFT+V','Paste as Block','CTRL+D','Dynamic UCS'],
        ['CTRL+E','Isoplane Cycle','CTRL+F','Running OSNAP'],
        ['CTRL+G','Grid','CTRL+H','PICKSTYLE toggle'],
        ['CTRL+J / Enter','Repeat Last Command','CTRL+K','Hyperlinks'],
        ['CTRL+L','ORTHO Mode','CTRL+N','New Drawing'],
        ['CTRL+O','Open Drawing','CTRL+P','Plot (Print)'],
        ['CTRL+Q','Exit AutoCAD','CTRL+R','Cycle Viewports'],
        ['CTRL+S','Save','CTRL+SHIFT+S','Save As'],
        ['CTRL+T','Tablet Mode','CTRL+U','Polar Tracking'],
        ['CTRL+W','Object Snap Tracking','CTRL+X','Cut to Clipboard'],
        ['CTRL+Y','Redo','CTRL+Z','Undo'],
        ['CTRL+1','Properties Palette','CTRL+2','DesignCenter'],
        ['CTRL+3','Tool Palettes','CTRL+4','Sheet Set Manager'],
        ['CTRL+6','dbConnect','CTRL+7','Markup Set Manager'],
        ['CTRL+8','Quick Calc','CTRL+9','Command Line'],
        ['ESC','Cancel Command','ENTER/SPACE','Confirm / Repeat Last Cmd'],
    ]
    cols=[CW*0.18,CW*0.32,CW*0.18,CW*0.32]
    e.append(cmd_table([[Paragraph(c,st['label'] if r==0 else (st['cmd'] if j%2==0 else st['body'])) for j,c in enumerate(row)] for r,row in enumerate(shortcuts)],cols))
    e.append(SP(3))
    e.append(P('Essential System Variables','h3'))
    sysvars=[
        ['Variable','Default','Description'],
        ['LTSCALE','1.0','Global linetype scale factor. Increase for smaller-scale drawings.'],
        ['PSLTSCALE','1','0=linetype scale controls both spaces; 1=scale relative to viewport.'],
        ['DIMSCALE','1.0','Dimension scale factor. Set = 1/plot scale for Model Space dims.'],
        ['TEXTSIZE','0.2','Default height for single-line text created with the TEXT command.'],
        ['PICKBOX','3','Size (pixels) of the selection pick box cursor.'],
        ['PICKFIRST','1','1=select before command (noun-verb); 0=command then select.'],
        ['PDMODE','0','Point display mode (0=dot, 3=X, 33=X with circle, 35=star with circle).'],
        ['FILEDIA','1','1=show file dialog boxes; 0=command-line file entry only.'],
        ['MEASUREMENT','0','0=imperial (inch) hatch/linetype definitions; 1=metric.'],
        ['SAVETIME','10','Auto-save interval in minutes. Set to 5-10 for safety.'],
    ]
    cols2=[CW*0.20,CW*0.12,CW*0.68]
    e.append(cmd_table([[Paragraph(c,st['label'] if r==0 else (st['cmd'] if j<2 else st['body'])) for j,c in enumerate(row)] for r,row in enumerate(sysvars)],cols2))
    return e

def s13():
    e=[ChHead('13','Layer Standards & Best Practices','NCS · Color Standards · Linetype'),SP(3)]
    e.append(P('Professional layer standards ensure drawing quality, file compatibility across '
               'design teams, and efficient plotting. AIA Layer Guidelines / NCS is the dominant '
               'standard in the USA; ISO 13567 is the international equivalent.','body'))
    e.append(P('Recommended Layer Color Coding','h3'))
    colors=[
        ['Color','Number','Object Type','Standard Use'],
        ['White / 7','7','Primary drawing elements','Main geometry (walls, structural elements)'],
        ['Red / 1','1','Electrical, fire safety','Electrical conduit, fire alarm systems'],
        ['Yellow / 2','2','Furniture, equipment','FF&E items, process equipment'],
        ['Green / 3','3','Plumbing, mechanical','Pipe systems, HVAC ductwork'],
        ['Cyan / 4','4','Temporary / construction','Construction phasing, demolition'],
        ['Blue / 5','5','Dimensions, annotation','All dimensioning and notes'],
        ['Magenta / 6','6','Civil, structural','Survey, structural steel, concrete'],
        ['Gray / 8','8','Hatching, poche','Background fills, material indication'],
        ['Dashed / 9','9','Hidden, future work','Hidden lines, future phase elements'],
    ]
    cols=[CW*0.15,CW*0.10,CW*0.25,CW*0.50]
    e.append(cmd_table([[Paragraph(c,st['label'] if r==0 else st['body']) for c in row] for r,row in enumerate(colors)],cols))
    e.append(SP(3))
    e.append(Box('Layer Best Practices',[
        'NEVER draw on layer 0 (zero) in production — use it only as a temporary scratch layer.',
        'All objects should be ByLayer for color, linetype, and lineweight — never override per object.',
        'Create a Layer Template DWT file with all standard layers pre-defined for every new project.',
        'Use Layer States to save/restore layer configurations for different view exports (floor plan, ceiling plan, etc.).',
    ],ACC,'⚙'))
    return e

def s14():
    e=[ChHead('14','Drawing Setup & Templates','LIMITS · UNITS · TEMPLATE · PAGE SETUP'),SP(3)]
    setup=[
        ['Command','Description'],
        ['NEW (with template)','Start new drawing from DWT template with pre-set layers, styles, and settings.'],
        ['UNITS','Set drawing units (decimal, architectural, engineering), precision, and angle settings.'],
        ['LIMITS','Set drawing bounds. GRID will display within limits. Not strictly enforced.'],
        ['MVSETUP','Set up viewport, units, and scale in a single workflow.'],
        ['PAGESETUP','Configure plotter, paper size, and plot style for each layout tab.'],
        ['LAYOUT','Create, copy, rename, delete paper space layouts.'],
        ['LAYOUTWIZARD','Step-by-step layout creation: plotter, paper, viewport, title block.'],
        ['DWGPROPS','Set drawing metadata: Title, Subject, Author, Keywords for file management.'],
        ['OPTIONS','Customize all AutoCAD settings: display, file paths, selection, plotting, etc.'],
        ['CUSTOMIZE','Customize ribbons, toolbars, keyboard shortcuts, and workspaces.'],
        ['CUI','Complete User Interface customization (ribbons, menus, workspaces, macros).'],
    ]
    cols=[CW*0.20,CW*0.80]
    dt=Table([[Paragraph(c,st['label'] if r==0 else (st['cmd'] if j==0 else st['body'])) for j,c in enumerate(row)] for r,row in enumerate(setup)],colWidths=cols)
    dt.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,0),BG3),('TEXTCOLOR',(0,0),(-1,0),ACC),
        ('FONTNAME',(0,0),(-1,0),'Helvetica-Bold'),('FONTSIZE',(0,0),(-1,0),8.5),
        ('ROWBACKGROUNDS',(0,1),(-1,-1),[BG2,BG4]),('TEXTCOLOR',(0,1),(-1,-1),GR1),
        ('FONTNAME',(0,1),(-1,-1),'Helvetica'),('FONTSIZE',(0,1),(-1,-1),8.5),
        ('GRID',(0,0),(-1,-1),0.4,GR4),('TOPPADDING',(0,0),(-1,-1),5),
        ('BOTTOMPADDING',(0,0),(-1,-1),5),('LEFTPADDING',(0,0),(-1,-1),8),
        ('RIGHTPADDING',(0,0),(-1,-1),8),('VALIGN',(0,0),(-1,-1),'MIDDLE'),
        ('LINEBELOW',(0,0),(-1,0),1,ACC),
        ('FONTNAME',(1,1),(-2,-1),'Courier'),
    ]))
    e.append(dt)
    return e

def s15():
    e=[ChHead('15','Troubleshooting & Pro Tips','Performance · Recovery · Productivity'),SP(3)]
    tips=[
        ('Speed Up AutoCAD',[
            'Type CLEANSCREENON / F9 for distraction-free fullscreen drafting.',
            'PURGE regularly to remove unused blocks/styles and reduce file size.',
            'AUDIT after PURGE to fix errors. Restart after WSSETTINGS changes.',
            'Turn off hardware acceleration if experiencing display glitches.',
            'Limit the number of Xrefs open simultaneously — each adds overhead.',
        ],ACC,'★'),
        ('Common Mistakes & Fixes',[
            'Nothing on screen: type ZOOM > E (Extents) to find all objects.',
            'Objects not snapping: check F3 (OSNAP) is ON and correct modes enabled.',
            'Dimension text too small/large: check DIMSCALE matches your plot scale.',
            'Layer frozen vs off: frozen layers excluded from REGEN — use freeze for speed.',
            'Hatching fails: objects must form a completely closed boundary (use BOUNDARY).',
        ],YEL,'⚠'),
        ('Productivity Hacks',[
            'Right-click on ribbon > Customize → add your most-used commands to Quick Access Toolbar.',
            'CTRL+SHIFT+click selects sub-objects within blocks without exploding.',
            'Double-click to enter block editor; double-click text to edit in-place.',
            'BCOUNT (Express) counts block instances — useful for BOM/quantity take-offs.',
            'Use ACTION RECORDER (ACTRECORD) to automate repetitive multi-step tasks.',
        ],GRN,'💡'),
    ]
    for title,items,color,icon in tips:
        e.append(Box(title,items,color,icon))
        e.append(SP(3))
    e.append(P('© 2026 AYE Tech Hub. Awet G. Nway — ayetechub.com — t.me/ayetechub','meta'))
    return e

def build():
    out=os.path.join(os.path.dirname(__file__),'pdfs','autocad-cheatsheet.pdf')
    story=[PageBreak()]
    for sec in [toc,s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14,s15]:
        story.extend(sec()); story.append(PageBreak())
    doc=SimpleDocTemplate(out,pagesize=A4,leftMargin=M,rightMargin=M,
        topMargin=18*mm,bottomMargin=16*mm,title=DOC_TITLE,author=AUTHOR,
        subject='AutoCAD commands, shortcuts, layer standards, plotting best practices',
        creator='AYE Tech Hub PDF Engine')
    doc.build(story,onFirstPage=draw_cover,onLaterPages=draw_page)
    size=os.path.getsize(out)/1024
    pages=doc.page
    open(1,'w').close() if False else None
    import builtins; builtins.print(f'Generated: {out}  ({size:.0f} KB, {pages} pages)')

if __name__=='__main__': build()
