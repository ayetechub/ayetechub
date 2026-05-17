"""
AYE Tech Hub — Industrial Maintenance Manual PDF Generator
Uses aye_template.py master template (Motor Starters visual system)
Target: 15 pages
"""
import os, sys
import aye_template as T
from reportlab.platypus import PageBreak

OUT = os.path.join(os.path.dirname(__file__), 'pdfs', 'industrial-maintenance-manual.pdf')

CONFIG = {
    'title'    : 'INDUSTRIAL MAINTENANCE MANUAL',
    'subtitle' : 'A Complete Engineering Reference Guide',
    'doc_short': 'Industrial Maintenance Manual',
    'edition'  : '2025',
    'author'   : 'AYE Tech Hub Engineering Team',
    'subject'  : 'Industrial maintenance, preventive, predictive, RCM, CMMS, safety, KPIs',
    'topics'   : [
        'Preventive Maintenance',
        'Predictive Maintenance',
        'Reliability-Centered Maintenance',
        'Work Order Management & CMMS',
        'Lubrication & Tribology',
        'Mechanical Systems',
        'Hydraulic & Pneumatic Systems',
        'Electrical Maintenance',
        'Maintenance Safety (LOTO/PTW)',
        'Spare Parts Management',
        'KPIs & Maintenance Metrics',
        'Troubleshooting Guide',
    ],
}

CHAPTERS = [
    ( 1, 'Introduction to Industrial Maintenance'),
    ( 2, 'Preventive Maintenance Planning'),
    ( 3, 'Predictive Maintenance Technologies'),
    ( 4, 'Reliability-Centered Maintenance (RCM)'),
    ( 5, 'Work Order Management & CMMS'),
    ( 6, 'Lubrication & Tribology'),
    ( 7, 'Mechanical Systems Maintenance'),
    ( 8, 'Hydraulic & Pneumatic Systems'),
    ( 9, 'Electrical Systems Maintenance'),
    (10, 'Maintenance Safety — LOTO & PTW'),
    (11, 'Spare Parts & Inventory Management'),
    (12, 'KPIs & Maintenance Metrics'),
    (13, 'Troubleshooting Guide & Standards'),
]

# ─────────────────────────────────────────────────────────────────────────────
# PAGE 2 — TABLE OF CONTENTS
# ─────────────────────────────────────────────────────────────────────────────
def toc():
    return T.toc_section(CHAPTERS) + [PageBreak()]


# ─────────────────────────────────────────────────────────────────────────────
# CHAPTER 1 — Introduction to Industrial Maintenance
# ─────────────────────────────────────────────────────────────────────────────
def ch01():
    fl = []
    fl.append(T.P(
        'Industrial maintenance is the systematic set of activities aimed at keeping '
        'plant equipment, machinery, and infrastructure in safe, reliable, and productive '
        'operating condition. An effective maintenance strategy directly impacts equipment '
        'uptime, product quality, operational safety, and overall plant profitability.'
    ))
    fl.append(T.SP(6))
    fl.append(T.SEC('Maintenance Philosophy Overview'))
    fl.append(T.P(
        'Modern industrial maintenance has evolved from purely reactive "fix-it-when-it-breaks" '
        'approaches to data-driven, reliability-focused strategies. The four primary philosophies '
        'are applied based on equipment criticality, failure consequences, and cost-benefit analysis.'
    ))
    fl.append(T.SP(6))
    fl.append(T.make_table([
        ['Maintenance Type', 'Trigger', 'Best Applied When', 'Relative Cost'],
        ['Corrective (BM)',    'Equipment failure',       'Non-critical, cheap assets',      'Low upfront, High total'],
        ['Preventive (PM)',   'Calendar / usage interval', 'Known wear-out failure patterns', 'Medium'],
        ['Predictive (PdM)',  'Condition monitoring data', 'Critical rotating equipment',    'High upfront, Low total'],
        ['Proactive / RCM',  'Failure mode analysis',     'Safety-critical plant systems',   'Highest — best ROI'],
    ], col_widths=[110, 110, 130, 90]))
    fl.append(T.SP(8))
    fl.append(T.SEC('The True Cost of Poor Maintenance'))
    fl.append(T.P(
        'Studies by the US Department of Energy estimate that reactive-only maintenance '
        'costs 3–5× more per machine than a planned preventive programme due to '
        'unplanned downtime, secondary damage, emergency labour, and expedited spares.'
    ))
    fl.append(T.SP(6))
    fl.append(T.note_box('Engineering Note', [
        'World-class facilities target Overall Equipment Effectiveness (OEE) above 85%.',
        'Best-in-class maintenance ratio: Planned Work > 80% of total man-hours.',
        'Maintenance costs should be 2–5% of Replacement Asset Value (RAV) annually.',
        'Every $1 invested in planned maintenance returns $4–8 in avoided failure costs.',
    ]))
    return T.chapter(1, CHAPTERS[0][1], fl)


# ─────────────────────────────────────────────────────────────────────────────
# CHAPTER 2 — Preventive Maintenance Planning
# ─────────────────────────────────────────────────────────────────────────────
def ch02():
    fl = []
    fl.append(T.P(
        'Preventive Maintenance (PM) consists of scheduled, time-based or usage-based '
        'maintenance tasks performed to reduce the probability of equipment failure. '
        'PM tasks are defined by equipment manufacturer recommendations, historical data, '
        'and engineering judgement — then executed before failure occurs.'
    ))
    fl.append(T.SP(6))
    fl.append(T.SEC('PM Task Categories'))
    for item in [
        '<b>Inspection:</b> Visual checks, gauging, listening for abnormal sounds — non-intrusive, high frequency.',
        '<b>Lubrication:</b> Re-lubrication, oil changes, filter replacements on fixed intervals.',
        '<b>Cleaning:</b> Removal of contamination (dust, debris, process material) from mechanical and electrical components.',
        '<b>Adjustment:</b> Belt tension, alignment checks, valve packing, torque verification.',
        '<b>Replacement:</b> Planned swap of wear items (belts, filters, seals, consumables) at life-cycle intervals.',
        '<b>Testing:</b> Functional verification — safety devices, trip circuits, protection relays, interlocks.',
    ]:
        fl.append(T.bullet(item))
    fl.append(T.SP(8))
    fl.append(T.SEC('PM Frequency Determination'))
    fl.append(T.make_table([
        ['Equipment Class',         'Recommended PM Interval', 'Key Tasks'],
        ['Critical rotating (pumps, compressors)', 'Monthly',   'Vibration check, lubrication, alignment'],
        ['Conveyors & material handling',           'Weekly',    'Belt tension, bearing temp, lubrication'],
        ['Electrical panels & MCC',                 'Quarterly', 'Thermography, torque check, insulation test'],
        ['HVAC & cooling systems',                  'Monthly',   'Filter change, coil clean, belt inspect'],
        ['Safety valves & relief devices',          'Annual',    'Lift test, set-pressure verification'],
        ['Fire & gas detection',                    'Monthly',   'Functional test, sensor calibration'],
    ], col_widths=[155, 115, 170]))
    fl.append(T.SP(8))
    fl.append(T.note_box('PM Programme Success Factors', [
        'Compliance rate target: > 95% of scheduled PMs completed on time.',
        'Use failure history to optimise PM frequency — avoid over- and under-maintenance.',
        'Standardise task procedures (SWPs) to ensure consistency across technician shifts.',
    ]))
    return T.chapter(2, CHAPTERS[1][1], fl)


# ─────────────────────────────────────────────────────────────────────────────
# CHAPTER 3 — Predictive Maintenance Technologies
# ─────────────────────────────────────────────────────────────────────────────
def ch03():
    fl = []
    fl.append(T.P(
        'Predictive Maintenance (PdM) uses condition monitoring technologies to detect '
        'deterioration in equipment before failure occurs. By trending key parameters '
        '(vibration, temperature, oil quality, electrical signature), engineers can schedule '
        'maintenance precisely when needed — maximising run time and minimising unnecessary work.'
    ))
    fl.append(T.SP(6))
    fl.append(T.make_table([
        ['PdM Technology',         'Detects',                             'Equipment',            'Frequency'],
        ['Vibration Analysis',     'Imbalance, misalignment, bearing wear, looseness', 'Rotating machinery',    'Monthly'],
        ['Infrared Thermography',  'Hot spots, overloaded circuits, heat patterns',    'Electrical, mechanical','Quarterly'],
        ['Oil Analysis / Tribology','Wear metals, contamination, degradation',         'Gearboxes, engines',    'Quarterly'],
        ['Ultrasonic Testing',     'Leaks (air, steam), bearing defects, arcing',      'Bearings, valves, electrical','Monthly'],
        ['Motor Current Analysis', 'Rotor bar faults, eccentricity, load variation',   'Electric motors',       'Monthly'],
        ['Laser Alignment',        'Shaft misalignment (angular, parallel)',           'Couplings, shafts',     'As-needed'],
    ], col_widths=[110, 145, 100, 85]))
    fl.append(T.SP(8))
    fl.append(T.SEC('Vibration Severity — ISO 10816 Guidelines'))
    fl.append(T.P(
        'ISO 10816 classifies vibration severity into four zones for rotating machinery. '
        'RMS velocity is the most common parameter used for continuous monitoring:'
    ))
    fl.append(T.SP(4))
    for item in [
        '<b>Zone A (Good):</b> < 2.3 mm/s RMS — newly commissioned machinery, no action required.',
        '<b>Zone B (Acceptable):</b> 2.3–4.5 mm/s RMS — suitable for long-term continuous operation.',
        '<b>Zone C (Alert):</b> 4.5–7.1 mm/s RMS — operate short-term only; plan maintenance.',
        '<b>Zone D (Danger):</b> > 7.1 mm/s RMS — damage risk; shut down and inspect immediately.',
    ]:
        fl.append(T.bullet(item))
    fl.append(T.SP(8))
    fl.append(T.note_box('PdM Implementation Note', [
        'Begin with critical assets only — expand programme after establishing baselines.',
        'Trend data over time is more valuable than a single reading.',
        'Combine multiple PdM techniques for highest confidence in fault diagnosis.',
    ]))
    return T.chapter(3, CHAPTERS[2][1], fl)


# ─────────────────────────────────────────────────────────────────────────────
# CHAPTER 4 — Reliability-Centered Maintenance
# ─────────────────────────────────────────────────────────────────────────────
def ch04():
    fl = []
    fl.append(T.P(
        'Reliability-Centered Maintenance (RCM) is a structured analytical process used to '
        'determine the maintenance requirements of any physical asset in its operating context. '
        'Originally developed by the US aviation industry (Nowlan & Heap, 1978), RCM is now the '
        'foundation of maintenance strategy in oil & gas, power generation, mining, and process plants.'
    ))
    fl.append(T.SP(6))
    fl.append(T.SEC('The Seven RCM Questions'))
    for item in [
        '<b>Function:</b> What is the asset required to do in its current operating context?',
        '<b>Functional Failure:</b> In what ways can it fail to fulfil each function?',
        '<b>Failure Mode:</b> What causes each functional failure?',
        '<b>Failure Effect:</b> What happens when each failure mode occurs?',
        '<b>Failure Consequence:</b> In what way does each failure matter (safety/environment/operational/economic)?',
        '<b>Proactive Task:</b> What can be done to predict or prevent each failure?',
        '<b>Default Action:</b> What should be done if no proactive task can be found?',
    ]:
        fl.append(T.bullet(item))
    fl.append(T.SP(8))
    fl.append(T.SEC('FMEA — Failure Mode and Effects Analysis'))
    fl.append(T.make_table([
        ['Failure Mode',              'Effect',                    'RPN*', 'Maintenance Action'],
        ['Bearing wear (fatigue)',    'Vibration → unplanned stop','High', 'Vibration monitoring monthly'],
        ['Seal leakage',              'Product loss, contamination','Med', 'PM seal inspection quarterly'],
        ['Impeller erosion',          'Reduced flow, cavitation',  'Med',  'Ultrasonic thickness 6-monthly'],
        ['Motor winding degradation', 'Overheating → burnout',    'High', 'Insulation test (megger) annually'],
        ['Coupling misalignment',     'Vibration, bearing load',  'Med',  'Laser alignment at each outage'],
    ], col_widths=[140, 135, 48, 117]))
    fl.append(T.SP(5))
    fl.append(T.P('*RPN = Risk Priority Number (Severity × Occurrence × Detectability, scale 1–1000)', T.STYLE_CAPTION))
    fl.append(T.SP(6))
    fl.append(T.note_box('RCM Outcome', [
        'RCM analysis typically results in: 30–50% reduction in scheduled maintenance tasks.',
        'Remaining tasks are justified — each task prevents a real failure with real consequences.',
        'Software tools: SAP PM, Maximo, Meridium, Isograph Availability Workbench.',
    ]))
    return T.chapter(4, CHAPTERS[3][1], fl)


# ─────────────────────────────────────────────────────────────────────────────
# CHAPTER 5 — Work Order Management & CMMS
# ─────────────────────────────────────────────────────────────────────────────
def ch05():
    fl = []
    fl.append(T.P(
        'A Computerised Maintenance Management System (CMMS) is the digital backbone of any '
        'modern maintenance organisation. It manages work orders, tracks asset history, schedules '
        'PMs, controls spare parts inventory, and generates KPI reports — replacing paper-based '
        'systems and spreadsheets with a single source of maintenance truth.'
    ))
    fl.append(T.SP(6))
    fl.append(T.SEC('Work Order Lifecycle'))
    for item in [
        '<b>Identification:</b> Fault detected by operator, inspection, or PdM sensor alert.',
        '<b>Notification:</b> Work request raised in CMMS with description, location, and priority.',
        '<b>Planning:</b> Maintenance planner assigns craft, estimates labour hours, identifies spares.',
        '<b>Scheduling:</b> Work scheduled into maintenance window; resources confirmed available.',
        '<b>Execution:</b> Technician carries out work; completes job card with findings and time.',
        '<b>Completion:</b> Supervisor reviews, approves WO closure; failure cause code captured.',
        '<b>Analysis:</b> Data feeds into KPI reports, failure trends, and PM optimisation.',
    ]:
        fl.append(T.bullet(item))
    fl.append(T.SP(8))
    fl.append(T.SEC('Work Order Priority Classification'))
    fl.append(T.make_table([
        ['Priority',  'Description',               'Response Time', 'Example'],
        ['P1 — Emergency', 'Safety / production stop',  'Immediate',    'Fire system failure, major leak'],
        ['P2 — Urgent',    'Imminent failure risk',      '4 hours',      'Bearing temperature alarm'],
        ['P3 — High',      'Operational impact',         '24 hours',     'Pump performance degradation'],
        ['P4 — Routine',   'Scheduled PM or minor work', '1 week',       'Oil change, filter replacement'],
        ['P5 — Improvement','No operational impact',     'Next outage',  'Modification, minor upgrade'],
    ], col_widths=[95, 140, 90, 115]))
    fl.append(T.SP(8))
    fl.append(T.note_box('CMMS Selection Criteria', [
        'Key features: WO management, PM scheduling, asset registry, inventory, reporting.',
        'Leading platforms: SAP PM, IBM Maximo, Infor EAM, Fiix, UpKeep, Limble CMMS.',
        'Target: planned work ratio > 80%; backlog < 2 weeks of crew capacity.',
    ]))
    return T.chapter(5, CHAPTERS[4][1], fl)


# ─────────────────────────────────────────────────────────────────────────────
# CHAPTER 6 — Lubrication & Tribology
# ─────────────────────────────────────────────────────────────────────────────
def ch06():
    fl = []
    fl.append(T.P(
        'Lubrication is responsible for reducing friction, wear, and heat in moving components. '
        'Studies show that 36–50% of premature bearing failures are caused by improper '
        'lubrication — either wrong lubricant type, incorrect quantity, or wrong interval. '
        'A well-managed lubrication programme is one of the highest-ROI maintenance activities.'
    ))
    fl.append(T.SP(6))
    fl.append(T.SEC('Lubricant Selection Criteria'))
    fl.append(T.make_table([
        ['Component',     'Lubricant Type',     'ISO Viscosity Grade', 'Change Interval'],
        ['Rolling element bearings', 'Grease (NLGI 2–3)',    'N/A',       '500–2000 hrs or manufacturer spec'],
        ['Plain/journal bearings',   'Circulating oil',      'ISO VG 46–68', 'Annual with oil analysis'],
        ['Gearboxes (enclosed)',      'Gear oil',             'ISO VG 220–680', '6-monthly or oil analysis'],
        ['Hydraulic systems',         'Hydraulic oil',        'ISO VG 32–46', 'Annual or 2000 hrs'],
        ['Air compressors',           'Compressor oil',       'ISO VG 46–100', 'Per OEM spec (500–2000 hrs)'],
        ['Chains & open gears',       'Spray lube / grease',  'NLGI 0–1',  'Weekly or condition-based'],
    ], col_widths=[120, 110, 95, 115]))
    fl.append(T.SP(8))
    fl.append(T.SEC('Grease Re-Lubrication Formula'))
    fl.append(T.P(
        'The Mobil re-lubrication formula provides a bearing-specific re-greasing interval based '
        'on bearing bore diameter (d) and rotation speed (N):'
    ))
    fl.append(T.SP(4))
    fl.append(T.info_box('Re-Lubrication Interval Formula', [
        'Hours = K × [(14,000,000 / (N × d^0.5)) − 4d]',
        'Where: K = 1.0 (ball bearings), 0.5 (roller bearings)',
        '       N = rotational speed (RPM),  d = bore diameter (mm)',
        'Example: 6208 bearing (40mm bore) at 1450 RPM = K=1.0 → ≈ 1,920 hrs',
        'Reduce interval by 50% for: high temp (>70°C), wet/dirty environment, vertical shaft.',
    ]))
    fl.append(T.SP(6))
    fl.append(T.note_box('Lubrication Programme Essentials', [
        'Use colour-coded grease guns and fittings to prevent cross-contamination.',
        'Keep lubrication records in CMMS — track quantity, product, date, technician.',
        'Oil analysis (ferrography, viscosity, water content) at each change confirms condition.',
    ]))
    return T.chapter(6, CHAPTERS[5][1], fl)


# ─────────────────────────────────────────────────────────────────────────────
# CHAPTER 7 — Mechanical Systems Maintenance
# ─────────────────────────────────────────────────────────────────────────────
def ch07():
    fl = []
    fl.append(T.P(
        'Rotating mechanical components — bearings, gears, shafts, couplings, belts, and seals '
        '— are the most common source of unplanned industrial failures. '
        'Systematic inspection and condition monitoring of these components is central '
        'to any world-class mechanical maintenance programme.'
    ))
    fl.append(T.SP(6))
    fl.append(T.SEC('Bearing Maintenance'))
    for item in [
        '<b>Installation:</b> Always use proper fitting tools. Never strike inner ring directly. Heat-fit large bearings to 80–100°C (oil bath or induction heater).',
        '<b>Clearance:</b> Verify internal radial clearance (IRC) matches application. Pre-loaded bearings need precise shim selection.',
        '<b>Contamination:</b> Maintain seal integrity. Contamination causes 14% of premature failures (SKF data).',
        '<b>Overheating:</b> > 70°C ambient on housing indicates over-lubrication, overload, or misalignment.',
        '<b>Replacement:</b> Replace in matched sets on multi-bearing shafts. Record make, type, lot number in CMMS.',
    ]:
        fl.append(T.bullet(item))
    fl.append(T.SP(8))
    fl.append(T.SEC('Shaft Alignment Standards'))
    fl.append(T.make_table([
        ['Coupling Speed (RPM)', 'Offset Tolerance (mm)', 'Angular Tolerance (mm/100mm)', 'Method'],
        ['< 1,000',              '0.10',                  '0.10',                          'Dial indicator'],
        ['1,000–3,000',          '0.05',                  '0.05',                          'Laser alignment'],
        ['3,000–6,000',          '0.025',                 '0.025',                         'Laser alignment'],
        ['> 6,000',              '0.015',                 '0.015',                         'Laser + proximity probe'],
    ], col_widths=[115, 90, 130, 105]))
    fl.append(T.SP(8))
    fl.append(T.note_box('V-Belt Maintenance', [
        'Inspect belt tension monthly: deflection = (span/64) in mm under 2N force.',
        'Replace belts in full matched sets — never mix old and new on multi-belt drives.',
        'Misalignment > 0.5° causes rapid belt edge wear and bearing side-loading.',
    ]))
    return T.chapter(7, CHAPTERS[6][1], fl)


# ─────────────────────────────────────────────────────────────────────────────
# CHAPTER 8 — Hydraulic & Pneumatic Systems
# ─────────────────────────────────────────────────────────────────────────────
def ch08():
    fl = []
    fl.append(T.P(
        'Hydraulic and pneumatic systems power actuators, presses, lifts, clamps, and '
        'control valves across virtually every industrial plant. '
        'Contamination control and seal integrity are the two highest-priority maintenance '
        'activities for fluid power systems — responsible for over 70% of hydraulic failures.'
    ))
    fl.append(T.SP(6))
    fl.append(T.SEC('Hydraulic System Inspection Checklist'))
    for item in [
        '<b>Fluid level:</b> Check reservoir level daily. Low level causes pump cavitation.',
        '<b>Fluid condition:</b> Sample and test oil every 3 months — check viscosity, water content, particulate count (ISO 4406 cleanliness).',
        '<b>Filter condition:</b> Replace hydraulic filter at indicator trip or 500-hour interval.',
        '<b>Leak inspection:</b> Zero tolerance for external leaks — repair all seals, fittings, and hose connections.',
        '<b>System pressure:</b> Verify relief valve set-point monthly using calibrated gauge.',
        '<b>Actuator speed:</b> Measure cylinder stroke time — deviation indicates internal bypass or pump wear.',
        '<b>Temperature:</b> Normal operating temperature 40–60°C. > 70°C indicates heat exchanger or valve fault.',
    ]:
        fl.append(T.bullet(item))
    fl.append(T.SP(8))
    fl.append(T.SEC('Pneumatic System Maintenance'))
    fl.append(T.make_table([
        ['Component',          'Inspection Task',                   'Interval'],
        ['Air compressor',     'Belt, oil, filter, valve check',    'Monthly'],
        ['Air dryer/separator','Drain, desiccant, dew-point check', 'Monthly'],
        ['FRL units',          'Filter drain, regulator pressure, lubricator oil', 'Weekly'],
        ['Cylinders',          'Seal integrity, cushion adjustment','Quarterly'],
        ['Solenoid valves',    'Response time, seal condition',     'Annually'],
        ['Piping system',      'Leak survey (ultrasonic detector)', 'Quarterly'],
    ], col_widths=[130, 185, 125]))
    fl.append(T.SP(8))
    fl.append(T.note_box('Contamination Control', [
        'Target hydraulic cleanliness: ISO 4406 class 16/14/11 for servo systems.',
        'Use only approved fluid — never mix petroleum and synthetic hydraulic oils.',
        'All new oil must be pre-filtered to target cleanliness before filling system.',
    ]))
    return T.chapter(8, CHAPTERS[7][1], fl)


# ─────────────────────────────────────────────────────────────────────────────
# CHAPTER 9 — Electrical Systems Maintenance
# ─────────────────────────────────────────────────────────────────────────────
def ch09():
    fl = []
    fl.append(T.P(
        'Electrical maintenance encompasses the upkeep of power distribution, motor control '
        'centres (MCCs), transformers, switchgear, cabling, and instrumentation. '
        'Electrical failures are the leading cause of industrial fires and equipment damage — '
        'making planned electrical PM and condition monitoring critical safety requirements.'
    ))
    fl.append(T.SP(6))
    fl.append(T.SEC('Key Electrical Maintenance Tasks'))
    fl.append(T.make_table([
        ['System',              'Task',                                 'Interval', 'Technique'],
        ['LV Switchgear/MCC',  'Thermography, torque check, clean',    'Annually', 'Infrared camera'],
        ['HV Switchgear',      'Contact resistance, insulation test',  'Annually', 'Ductor, Megger'],
        ['Transformers',       'Oil sampling, DGA, thermal scan',      '6-monthly','Oil lab, IR'],
        ['Electric motors',    'Insulation test, air gap, vibration',  'Annually', 'Megger, vibration'],
        ['Cables & terminations','Thermal scan, visual, tug test',     'Annually', 'IR thermography'],
        ['UPS/Batteries',      'Load test, terminal resistance, capacity','6-monthly','Battery analyser'],
        ['Earth/Grounding',    'Earth continuity & resistance test',   'Annually', 'Earth tester'],
    ], col_widths=[105, 145, 70, 120]))
    fl.append(T.SP(8))
    fl.append(T.SEC('Motor Insulation Resistance — Acceptance Criteria'))
    for item in [
        '<b>Megger Test Voltage:</b> 500V DC for motors up to 1kV; 1000V DC for 1–6kV motors.',
        '<b>Minimum IR (at 40°C):</b> 1 MΩ per kV of rated voltage + 1 MΩ (IEEE 43 rule).',
        '<b>Polarisation Index (PI):</b> R₁₀ₘᵢₙ / R₁ₘᵢₙ — PI > 2.0 is acceptable; < 1.0 is critical.',
        '<b>Dielectric Absorption Ratio (DAR):</b> R₆₀ₛ / R₃₀ₛ > 1.25 acceptable.',
        '<b>Action levels:</b> IR < 2MΩ → investigate; PI < 1.5 → dry-out or rewind.',
    ]:
        fl.append(T.bullet(item))
    fl.append(T.SP(8))
    fl.append(T.note_box('Electrical Safety Reminder', [
        'All electrical work requires Permit to Work (PTW) and verified LOTO isolation.',
        'Never measure insulation resistance on energised conductors.',
        'Document all test results in CMMS against asset history for trend analysis.',
    ]))
    return T.chapter(9, CHAPTERS[8][1], fl)


# ─────────────────────────────────────────────────────────────────────────────
# CHAPTER 10 — Maintenance Safety: LOTO & PTW
# ─────────────────────────────────────────────────────────────────────────────
def ch10():
    fl = []
    fl.append(T.P(
        'Lockout/Tagout (LOTO) and Permit to Work (PTW) are the primary safety control systems '
        'for maintenance activities. LOTO prevents the unexpected energisation of equipment '
        'during maintenance work. PTW is the formal authorisation system that ensures all '
        'hazards are identified and controlled before work begins.'
    ))
    fl.append(T.SP(6))
    fl.append(T.SEC('LOTO — 6 Step Procedure (OSHA 1910.147)'))
    for item in [
        '<b>Step 1 — Notify:</b> Inform all affected personnel that equipment will be isolated.',
        '<b>Step 2 — Identify:</b> Locate all energy sources (electrical, hydraulic, pneumatic, gravity, thermal, chemical).',
        '<b>Step 3 — Isolate:</b> Operate all energy-isolating devices to de-energise the equipment.',
        '<b>Step 4 — Lockout/Tagout:</b> Each worker applies their personal lock and tag to all isolation points.',
        '<b>Step 5 — Release stored energy:</b> Bleed pressure, block gravity loads, discharge capacitors, drain fluids.',
        '<b>Step 6 — Verify:</b> Test for zero energy using calibrated meters before commencing work.',
    ]:
        fl.append(T.bullet(item))
    fl.append(T.SP(8))
    fl.append(T.SEC('PTW Categories'))
    fl.append(T.make_table([
        ['Permit Type',          'Required For',                               'Key Control'],
        ['Cold Work Permit',     'Non-hazardous mechanical tasks',             'LOTO verification'],
        ['Hot Work Permit',      'Welding, grinding, cutting — ignition risk', 'Gas test + fire watch'],
        ['Confined Space Entry', 'Work inside vessels, tanks, manholes',       'Continuous air monitoring'],
        ['Electrical HV Permit', 'Work on HV systems (> 1kV)',                'Authorised persons only'],
        ['Working at Height',    'Work > 2m above ground level',              'Full body harness, anchor'],
        ['Excavation Permit',    'Digging near buried services',              'Service drawings + spotter'],
    ], col_widths=[120, 175, 145]))
    fl.append(T.SP(8))
    fl.append(T.note_box('Zero Harm Principles', [
        'LOTO applies to ALL energy sources — not just electrical (hydraulics, steam, gravity).',
        'Never share locks. Each technician working on equipment applies their OWN lock.',
        'PTW must be signed off by authorised person before work starts and after completion.',
    ]))
    return T.chapter(10, CHAPTERS[9][1], fl)


# ─────────────────────────────────────────────────────────────────────────────
# CHAPTER 11 — Spare Parts & Inventory Management
# ─────────────────────────────────────────────────────────────────────────────
def ch11():
    fl = []
    fl.append(T.P(
        'Spare parts management ensures that the right part is available at the right time, '
        'without excessive capital tied up in slow-moving stock. '
        'Poor spares management is a top driver of extended Mean Time To Repair (MTTR) — '
        'with some studies indicating that 30–40% of downtime is caused by waiting for parts.'
    ))
    fl.append(T.SP(6))
    fl.append(T.SEC('Criticality Classification Matrix'))
    fl.append(T.make_table([
        ['Criticality',    'Criteria',                                    'Stock Policy',            'Lead Time Target'],
        ['Critical (A)',   'Single-point failure; long lead time; high cost of failure', 'Always stock (min/max)', '< 24 hours'],
        ['Important (B)',  'Significant downtime if unavailable; medium lead time',      'Stock based on usage',   '< 1 week'],
        ['Standard (C)',   'Short lead time; readily available from local suppliers',    'Order on demand / JIT',  '< 2 days'],
        ['Consumable (D)', 'Cheap, high-turnover items (filters, seals, gaskets)',       'Bulk stock with min',    'Stock carried'],
    ], col_widths=[80, 175, 115, 70]))
    fl.append(T.SP(8))
    fl.append(T.SEC('Min/Max Inventory Formula'))
    for item in [
        '<b>Reorder Point (ROP):</b> Average daily usage × Lead time days + Safety stock',
        '<b>Safety Stock:</b> (Max daily usage − Average daily usage) × Max lead time days',
        '<b>Economic Order Quantity (EOQ):</b> √(2 × Annual demand × Order cost / Holding cost per unit)',
        '<b>Inventory Turnover:</b> Annual issues value / Average stock value. Target: 2–4× per year for MRO.',
    ]:
        fl.append(T.bullet(item))
    fl.append(T.SP(8))
    fl.append(T.note_box('Spare Parts Best Practices', [
        'Tag every spare with asset number, OEM part number, and shelf life where applicable.',
        'Conduct annual stock-take to identify obsolete, damaged, or expired items.',
        'Use OEM recommended spares lists as the starting point for critical spares strategy.',
    ]))
    return T.chapter(11, CHAPTERS[10][1], fl)


# ─────────────────────────────────────────────────────────────────────────────
# CHAPTER 12 — KPIs & Maintenance Metrics
# ─────────────────────────────────────────────────────────────────────────────
def ch12():
    fl = []
    fl.append(T.P(
        'Maintenance Key Performance Indicators (KPIs) provide objective, data-driven insight '
        'into the effectiveness and efficiency of the maintenance function. '
        'Selecting the right KPIs and trending them consistently allows maintenance managers to '
        'identify opportunities, justify investment, and demonstrate value to the business.'
    ))
    fl.append(T.SP(6))
    fl.append(T.make_table([
        ['KPI',                     'Formula',                                    'World-Class Target'],
        ['Overall Equipment Effectiveness (OEE)', 'Availability × Performance × Quality', '≥ 85%'],
        ['Asset Availability',      '(Total Time − Downtime) / Total Time × 100','≥ 95%'],
        ['Mean Time Between Failures (MTBF)', 'Total uptime hours / Number of failures','Maximise (trend)'],
        ['Mean Time To Repair (MTTR)', 'Total repair time / Number of failures',  '< 4 hours (critical equip.)'],
        ['Planned Maintenance Compliance', 'PMs completed on time / PMs scheduled × 100', '≥ 95%'],
        ['Reactive Maintenance Ratio', 'Unplanned WOs / Total WOs × 100',         '< 20%'],
        ['Maintenance Cost / RAV',  'Annual maint. spend / Replacement Asset Value', '2–5%'],
        ['Schedule Compliance',     'WOs completed per plan / WOs scheduled × 100', '≥ 90%'],
    ], col_widths=[145, 175, 120]))
    fl.append(T.SP(8))
    fl.append(T.SEC('OEE Deep Dive'))
    for item in [
        '<b>Availability Loss:</b> Breakdowns, changeovers, startup delays → target > 90%.',
        '<b>Performance Loss:</b> Slow cycles, small stops, reduced speed → target > 95%.',
        '<b>Quality Loss:</b> Defects, rework, scrap at startup → target > 99%.',
    ]:
        fl.append(T.bullet(item))
    fl.append(T.SP(6))
    fl.append(T.note_box('KPI Reporting Cadence', [
        'Daily: Asset availability, breakdown count, emergency WOs.',
        'Weekly: PM compliance, backlog status, schedule compliance.',
        'Monthly: MTBF, MTTR, OEE, maintenance cost trend, critical spare stock level.',
    ]))
    return T.chapter(12, CHAPTERS[11][1], fl)


# ─────────────────────────────────────────────────────────────────────────────
# CHAPTER 13 — Troubleshooting Guide & Standards
# ─────────────────────────────────────────────────────────────────────────────
def ch13():
    fl = []
    fl.append(T.P(
        'Effective fault diagnosis is a systematic process of identifying, isolating, and '
        'rectifying equipment failures. The 5-Why and fault tree analysis methods, combined '
        'with structured troubleshooting checklists, reduce MTTR and prevent repeat failures '
        'by addressing root causes rather than symptoms.'
    ))
    fl.append(T.SP(6))
    fl.append(T.SEC('Common Failure Symptoms & Probable Causes'))
    fl.append(T.make_table([
        ['Symptom',                  'Probable Causes',                              'First Action'],
        ['High bearing temperature', 'Over-grease, misalignment, overload, bearing defect', 'Check lube, measure vibration'],
        ['Excessive vibration',      'Imbalance, misalignment, bearing wear, looseness',    'Vibration analysis, laser align'],
        ['Pump low flow / pressure', 'Wear rings, impeller erosion, cavitation, bypass',    'Performance curve test'],
        ['Motor trips on overload',  'Overloaded, phase loss, high ambient, winding fault',  'Check current, insulation test'],
        ['Hydraulic system slow',    'Low oil, worn pump, valve sticking, bypass',           'Pressure & flow test'],
        ['Air compressor pressure drop','Leaks, worn valves, ring/cylinder wear',           'Leak test, valve inspection'],
        ['Gearbox noise (howling)',  'Gear pitting, incorrect backlash, lubrication failure','Oil sample, visual inspection'],
    ], col_widths=[115, 175, 150]))
    fl.append(T.SP(8))
    fl.append(T.SEC('Key Standards Reference'))
    for item in [
        '<b>ISO 55001:</b> Asset Management Systems — framework for optimising asset lifecycle.',
        '<b>ISO 13306:</b> Maintenance terminology — standard definitions for all maintenance terms.',
        '<b>ISO 10816 / 20816:</b> Mechanical vibration — evaluation of machine vibration severity.',
        '<b>IEC 60364:</b> Electrical installation maintenance requirements.',
        '<b>OSHA 29 CFR 1910.147:</b> Lockout/Tagout (LOTO) standard for hazardous energy control.',
        '<b>SAE JA1011/JA1012:</b> Evaluation criteria and implementation guide for RCM.',
    ]:
        fl.append(T.bullet(item))
    fl.append(T.SP(8))
    fl.append(T.note_box('Root Cause Analysis (RCA)', [
        'Use 5-Why analysis for every critical failure — document findings in CMMS.',
        'RCA output: corrective action + preventive action + PM/PdM task update.',
        'Share lessons learned across sites to prevent repeat failures plant-wide.',
    ]))
    return T.chapter(13, CHAPTERS[12][1], fl)


# ─────────────────────────────────────────────────────────────────────────────
# BUILD
# ─────────────────────────────────────────────────────────────────────────────
def build():
    story = [PageBreak()]      # Page 1 is cover (drawn by canvas); PageBreak → page 2
    story += toc()             # Page 2: Table of Contents
    story += ch01()            # Page 3
    story += ch02()            # Page 4
    story += ch03()            # Page 5
    story += ch04()            # Page 6
    story += ch05()            # Page 7
    story += ch06()            # Page 8
    story += ch07()            # Page 9
    story += ch08()            # Page 10
    story += ch09()            # Page 11
    story += ch10()            # Page 12
    story += ch11()            # Page 13
    story += ch12()            # Page 14
    story += ch13()            # Page 15

    T.build_pdf(OUT, story, CONFIG)

if __name__ == '__main__':
    build()
