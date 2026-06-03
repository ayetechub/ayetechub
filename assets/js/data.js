/* AYE Tech Hub – Centralized Content Data
   Edit this file to add/update courses, PDFs, tutorials, tools, blog posts, and downloads.
   No backend needed – everything is served statically.
*/

'use strict';

/* ============================================================
   COURSES
   To add a course: copy a block, change the values, save.
   url: path to course lesson page (e.g. 'courses/my-course.html')
============================================================ */
const COURSES = [
  {
    id: 'plc-fundamentals',
    title: {
      en: 'PLC Programming Fundamentals',
      ti: 'PLC ፕሮግራሚን መሰረታዊ',
      am: 'PLC ፕሮግራሚንግ መሰረታዊ'
    },
    category: 'plc',
    level: 'Beginner',
    duration: '12 hrs',
    lessons: 24,
    students: '1.2K',
    rating: 4.9,
    description: {
      en: 'Master Siemens S7, Ladder Logic, Function Block Diagram & industrial automation from scratch.',
      ti: 'Siemens S7, Ladder Logic, Function Block Diagram & ናይ ኢንዱስትሪ ኦቶሜሽን ካብ ምጅማሩ ተምሃሩ።',
      am: 'Siemens S7, Ladder Logic, Function Block Diagram & ኢንዱስትሪ አውቶሜሽን ከስር ጀምሮ ተማሩ።'
    },
    instructor: 'Awet G. Nway',
    color: '#00d4ff',
    bgGradient: 'linear-gradient(135deg,#001a33,#003366)',
    icon: 'microchip',
    badge: 'FREE',
    url: 'courses/plc-fundamentals.html',
    tags: ['Siemens S7','Ladder Logic','FBD','Automation']
  },
  {
    id: 'electrical-engineering',
    title: {
      en: 'Electrical Engineering Fundamentals',
      ti: 'ኤለክትሪካዊ ምህንድስና መሰረታዊ',
      am: 'ኤሌክትሪካል ምህንድስና መሰረታዊ'
    },
    category: 'electrical',
    level: 'Beginner',
    duration: '8 hrs',
    lessons: 18,
    students: '980',
    rating: 4.8,
    description: {
      en: 'Circuit analysis, power systems, wiring diagrams, and electrical safety for real-world applications.',
      ti: 'ናይ ሰርኪት ምትንታን፣ ናይ ሃይሊ ስርዓታት፣ ናይ ሽቦ ስዕሊ፣ ናይ ኤለክትሪካዊ ድሕነት ን ሓቀኛ ዓለም ትጽቢት።',
      am: 'የሰርኪት ትንተና፣ የኃይል ሥርዓቶች፣ የሽቦ ሥዕሎች፣ እና ለትክክለኛ አፕሊኬሽን ኤሌክትሪካዊ ደህንነት።'
    },
    instructor: 'Awet G. Nway',
    color: '#eab308',
    bgGradient: 'linear-gradient(135deg,#1a0a00,#3a1a00)',
    icon: 'bolt',
    badge: 'FREE',
    url: 'courses/electrical-engineering.html',
    tags: ['Circuits','Power Systems','Wiring','Safety']
  },
  {
    id: 'industrial-automation',
    title: {
      en: 'Industrial Automation & SCADA',
      ti: 'ናይ ኢንዱስትሪ ኦቶሜሽን & SCADA',
      am: 'ኢንዱስትሪ አውቶሜሽን & SCADA'
    },
    category: 'plc',
    level: 'Intermediate',
    duration: '16 hrs',
    lessons: 32,
    students: '750',
    rating: 4.9,
    description: {
      en: 'HMI programming, SCADA systems, VFD drives, sensor integration, and industrial network protocols.',
      ti: 'HMI ፕሮግራሚን፣ SCADA ስርዓታት፣ VFD ድራይቭ፣ ናይ ሴንሰር ምትእስሳር፣ ናይ ኢንዱስትሪ ናይ ኔትወርክ ፕሮቶኮላት።',
      am: 'HMI ፕሮግራሚንግ፣ SCADA ሥርዓቶች፣ VFD ድራይቭ፣ የሴንሰር ውህደት፣ ናይ ኢንዱስትሪ ፕሮቶኮሎች።'
    },
    instructor: 'Awet G. Nway',
    color: '#22c55e',
    bgGradient: 'linear-gradient(135deg,#001a1a,#003333)',
    icon: 'industry',
    badge: 'FREE',
    url: 'courses/industrial-automation.html',
    tags: ['SCADA','HMI','VFD','PROFIBUS']
  },
  {
    id: 'mechanical-engineering',
    title: {
      en: 'Mechanical Engineering Essentials',
      ti: 'ሜካኒካዊ ምህንድስና መሰረታዊ',
      am: 'ሜካኒካል ምህንድስና መሰረቶች'
    },
    category: 'mechanical',
    level: 'Beginner',
    duration: '10 hrs',
    lessons: 20,
    students: '600',
    rating: 4.7,
    description: {
      en: 'Thermodynamics, fluid mechanics, machine design, and manufacturing processes explained clearly.',
      ti: 'ቴርሞዳይናሚክስ፣ ናይ ፍሳሽ ሜካኒክስ፣ ናይ መሳርሒ ዲዛይን፣ ናይ ምፍራይ ስርዓታት ብሩህ ብሆነ ዝተገለጸ።',
      am: 'ቴርሞዳይናሚክስ፣ ፈሳሽ ሜካኒክስ፣ ማሽን ዲዛይን፣ እና ምርት ሂደቶች በቀላሉ ተገልጸዋሉ።'
    },
    instructor: 'Awet G. Nway',
    color: '#a78bfa',
    bgGradient: 'linear-gradient(135deg,#0d001a,#1a0033)',
    icon: 'cogs',
    badge: 'FREE',
    url: 'courses/mechanical-engineering.html',
    tags: ['Thermodynamics','Fluid Mechanics','Machine Design']
  },
  {
    id: 'revit-cad',
    title: {
      en: 'Revit & AutoCAD for Engineers',
      ti: 'Revit & AutoCAD ንኢንጂነራት',
      am: 'Revit & AutoCAD ለምህንዶሶች'
    },
    category: 'design',
    level: 'Beginner',
    duration: '14 hrs',
    lessons: 28,
    students: '890',
    rating: 4.8,
    description: {
      en: 'BIM fundamentals, 3D modeling, MEP systems in Revit, and professional AutoCAD drafting skills.',
      ti: 'BIM መሰረታዊ፣ 3D ሞዴሊን፣ MEP ስርዓታት ኣብ Revit፣ ሙያዊ AutoCAD ናይ ምሳልሕ ክእለት።',
      am: 'BIM መሰረቶች፣ 3D ሞዴሊንግ፣ MEP ሥርዓቶች በ Revit፣ ሙያዊ AutoCAD ዲዛይን ክህሎቶች።'
    },
    instructor: 'Awet G. Nway',
    color: '#f97316',
    bgGradient: 'linear-gradient(135deg,#1a0800,#3a1500)',
    icon: 'compass',
    badge: 'FREE',
    url: 'courses/revit-cad.html',
    tags: ['BIM','Revit','AutoCAD','MEP']
  },
  {
    id: 'ai-for-engineers',
    title: {
      en: 'AI Tools for Engineers',
      ti: 'AI ሓጋዚ ንኢንጂነራት',
      am: 'AI መሣሪያዎች ለምህንዶሶች'
    },
    category: 'ai',
    level: 'Beginner',
    duration: '6 hrs',
    lessons: 12,
    students: '1.5K',
    rating: 5.0,
    description: {
      en: 'ChatGPT, Gemini, Copilot, AI-assisted design and analysis tools for modern engineering workflows.',
      ti: 'ChatGPT, Gemini, Copilot, ናይ AI ሓጋዚ ዲዛይን ን ምትንታን ሓጋዚ ን ዘምናዊ ናይ ምህንድስና ምህዞ።',
      am: 'ChatGPT, Gemini, Copilot, AI-ተሸሽጦ ዲዛይን እና ትንተና መሣሪያዎች ለዘመናዊ ምህንድስና።'
    },
    instructor: 'Awet G. Nway',
    color: '#ec4899',
    bgGradient: 'linear-gradient(135deg,#1a0010,#330020)',
    icon: 'robot',
    badge: 'FREE',
    url: 'courses/ai-for-engineers.html',
    tags: ['ChatGPT','Gemini','Copilot','Automation']
  },
  {
    id: 'solar-hvac',
    title: {
      en: 'Solar & HVAC Systems Design',
      ti: 'ናይ ሶላር & HVAC ስርዓታት ዲዛይን',
      am: 'ሶላር & HVAC ሥርዓቶች ዲዛይን'
    },
    category: 'mechanical',
    level: 'Intermediate',
    duration: '18 hrs',
    lessons: 36,
    students: '420',
    rating: 4.9,
    description: {
      en: 'Solar PV system design, HVAC load calculations, ductwork design, and energy efficiency principles.',
      ti: 'ናይ ሶላር PV ስርዓት ዲዛይን፣ HVAC ናይ ጻዕሪ ስሌት፣ ናይ ቱቦ ዲዛይን፣ ናይ ሃይሊ ቀጥዒ ኣካይዳ።',
      am: 'ሶላር PV ሥርዓት ዲዛይን፣ HVAC ጭነት ስሌቶች፣ ዳክት ዲዛይን፣ የኃይል ቀልጣፋ መርሆዎች።'
    },
    instructor: 'Awet G. Nway',
    color: '#fbbf24',
    bgGradient: 'linear-gradient(135deg,#1a1000,#332000)',
    icon: 'bolt',
    badge: 'PREMIUM',
    url: 'courses/solar-hvac.html',
    tags: ['Solar PV','HVAC','Energy','Load Calc']
  },
  {
    id: 'robotics-maintenance',
    title: {
      en: 'Robotics & Maintenance',
      ti: 'ሮቦቲክስ & ዕቀባ',
      am: 'ሮቦቲክስ & ጥገና'
    },
    category: 'plc',
    level: 'Advanced',
    duration: '20 hrs',
    lessons: 40,
    students: '310',
    rating: 4.9,
    description: {
      en: 'Industrial robot programming, preventive maintenance, troubleshooting, and safety standards.',
      ti: 'ናይ ኢንዱስትሪ ሮቦት ፕሮግራሚን፣ ናይ ቅድሚ ምዕቃብ ዕቀባ፣ ናይ ጸገም ፍታሕ፣ ናይ ድሕነት ደረጃ።',
      am: 'ናይ ኢንዱስትሪ ሮቦት ፕሮግራሚንግ፣ ቅድሚያ ጥገና፣ ችግር መፍቻ፣ እና የደህንነት ደረጃዎች።'
    },
    instructor: 'Awet G. Nway',
    color: '#06b6d4',
    bgGradient: 'linear-gradient(135deg,#001518,#002a30)',
    icon: 'robot',
    badge: 'PREMIUM',
    url: 'courses/robotics-maintenance.html',
    tags: ['Robotics','ABB','Fanuc','Maintenance']
  }
];

/* ============================================================
   PDFs
   To add a PDF: drop the file into /pdfs/ folder, then add an
   entry below. Set 'file' to the path e.g. 'pdfs/my-guide.pdf'
   Set 'file' to '#coming-soon' if not yet uploaded.
============================================================ */
const PDFS = [
  {
    id: 'cad-curriculum-001-introduction-to-autocad',
    title: {
      en: 'CAD-001: Introduction to AutoCAD',
      ti: 'CAD-001: መእተዊ ናብ AutoCAD',
      am: 'CAD-001: ወደ AutoCAD መግቢያ'
    },
    category: 'autocad',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'NEW',
    description: {
      en: 'What AutoCAD is and why it matters, 5-product family diagram (AutoCAD core/Architecture/Electrical/Mechanical/Civil 3D), subscription vs AutoCAD LT comparison, 6-stage drawing workflow diagram (Template→Draw→Modify→Annotate→Layout→Print), DWG format version timeline, system requirements, career pathways with Africa salary ranges, and first-week getting-started guide — with diagrams — by Awet G. Nway.',
      ti: '5-product family diagram (AutoCAD/Architecture/Electrical/Mechanical/Civil 3D)፣ 6-stage workflow diagram፣ DWG version timeline፣ career pathways ምስ Africa salary — ብ Awet G. Nway።',
      am: '5-product family diagram (AutoCAD/Architecture/Electrical/Mechanical/Civil 3D)፣ 6-stage workflow diagram፣ DWG version timeline፣ career pathways ከ Africa salary ጋር — በ Awet G. Nway።'
    },
    file: 'pdfs/CAD-001-Introduction-to-AutoCAD.pdf',
    color: '#dc2626',
    preview: true
  },
  {
    id: 'cad-curriculum-002-autocad-interface',
    title: {
      en: 'CAD-002: AutoCAD Interface',
      ti: 'CAD-002: AutoCAD Interface',
      am: 'CAD-002: AutoCAD Interface'
    },
    category: 'autocad',
    pages: 4,
    size: '120 KB',
    downloads: '0',
    badge: 'NEW',
    description: {
      en: 'The 5 interface zones explained with annotated mockup diagram (Application Menu, Ribbon, Drawing Area, Command Line, Status Bar), OSNAP modes reference (Endpoint/Midpoint/Center/Intersection/Perpendicular/Nearest/Quadrant), all F1–F12 function keys, 30 essential keyboard shortcuts, workspace types, and interface customisation — with 3 diagrams — by Awet G. Nway.',
      ti: '5 interface zones (Application Menu, Ribbon, Drawing Area, Command Line, Status Bar), OSNAP modes, F1-F12 function keys, 30 shortcuts, workspace types — ብ Awet G. Nway።',
      am: '5 interface zones (Application Menu, Ribbon, Drawing Area, Command Line, Status Bar)፣ OSNAP modes፣ F1-F12 function keys፣ 30 shortcuts — በ Awet G. Nway።'
    },
    file: 'pdfs/CAD-002-AutoCAD-Interface.pdf',
    color: '#dc2626',
    preview: true
  },
  {
    id: 'robot-curriculum-001-introduction-to-industrial-robotics',
    title: {
      en: 'ROBOT-001: Introduction to Industrial Robotics',
      ti: 'ROBOT-001: መእተዊ ናብ ናይ ኢንዱስትሪ ሮቦቲክስ',
      am: 'ROBOT-001: ወደ ኢንዱስትሪ ሮቦቲክስ መግቢያ'
    },
    category: 'robotics',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'NEW',
    description: {
      en: 'What industrial robots are ($20B+ market), 6 robot types diagram (articulated/SCARA/delta/cartesian/cobot/cylindrical), robot anatomy 6-DOF diagram (J1-J6 joints), key specs (payload/reach/repeatability), top 5 brands (ABB/KUKA/Fanuc/Yaskawa/UR), industry applications, and career pathways with Africa salary ranges — with diagrams — by Awet G. Nway.',
      ti: '6 ዓይነታት robot diagram፣ 6-DOF anatomy diagram (J1-J6)፣ top 5 brands (ABB/KUKA/Fanuc/Yaskawa/UR)፣ career pathways — ብ Awet G. Nway።',
      am: '6 ዓይነት robot diagram፣ 6-DOF anatomy diagram (J1-J6)፣ top 5 brands (ABB/KUKA/Fanuc/Yaskawa/UR)፣ career pathways — በ Awet G. Nway።'
    },
    file: 'pdfs/ROBOT-001-Introduction-to-Industrial-Robotics.pdf',
    color: '#ec4899',
    preview: true
  },
  {
    id: 'robot-curriculum-002-robot-anatomy-and-components',
    title: {
      en: 'ROBOT-002: Robot Anatomy and Components',
      ti: 'ROBOT-002: ናይ ሮቦት ኣካላት ምስ ኮምፖነንቶቱ',
      am: 'ROBOT-002: የሮቦት አካሎች እና ክፍሎች'
    },
    category: 'robotics',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Servo motor closed-loop control diagram (controller→drive→motor→gearbox→encoder), servo system table, gearbox types diagram (harmonic drive/RV reducer/planetary), encoder types (absolute/incremental/resolver), robot controller components, teach pendant enabling device, end effector types diagram (parallel gripper/vacuum/magnetic/welding/tool changer/adaptive), and robot safety systems — with diagrams — by Awet G. Nway.',
      ti: 'Servo motor closed-loop diagram፣ gearbox types (harmonic/RV/planetary)፣ encoder types፣ robot controller & teach pendant፣ end effector types diagram፣ robot safety systems — ብ Awet G. Nway።',
      am: 'Servo motor closed-loop diagram፣ gearbox types (harmonic/RV/planetary)፣ encoder types፣ robot controller & teach pendant፣ end effector types diagram፣ robot safety systems — በ Awet G. Nway።'
    },
    file: 'pdfs/ROBOT-002-Robot-Anatomy-and-Components.pdf',
    color: '#ec4899',
    preview: true
  },
  {
    id: 'robot-curriculum-003-kinematics-and-coordinates',
    title: {
      en: 'ROBOT-003: Robot Kinematics and Coordinate Systems',
      ti: 'ROBOT-003: ናይ ሮቦት ኪነማቲክስን ኮኦርዲኔት ስርዓታትን',
      am: 'ROBOT-003: የሮቦት ኪነማቲክስ እና ኮኦርዲኔት ሥርዓቶች'
    },
    category: 'robotics',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Forward vs inverse kinematics diagram (FK/IK with input/output panels), kinematics table (FK/IK/motion planning/Jacobian), 5 coordinate frames hierarchy diagram (World/Base/Joint/TCP/User), frame comparison across ABB/KUKA/Fanuc, Joint space MoveJ vs Cartesian MoveL diagram (pros/cons), motion type table, 3 singularity types (shoulder/elbow/wrist) with prevention, TCP position notation — with diagrams — by Awet G. Nway.',
      ti: 'FK vs IK diagram፣ 5 coordinate frames hierarchy diagram (World/Base/Joint/TCP/User)፣ MoveJ vs MoveL diagram፣ 3 singularity types፣ TCP notation — ብ Awet G. Nway።',
      am: 'FK vs IK diagram፣ 5 coordinate frames hierarchy (World/Base/Joint/TCP/User)፣ MoveJ vs MoveL diagram፣ 3 singularity types፣ TCP notation — በ Awet G. Nway።'
    },
    file: 'pdfs/ROBOT-003-Robot-Kinematics-and-Coordinates.pdf',
    color: '#ec4899',
    preview: true
  },
  {
    id: 'robot-curriculum-004-abb-robot-systems',
    title: {
      en: 'ROBOT-004: ABB Robot Systems and Programming',
      ti: 'ROBOT-004: ናይ ABB Robot ስርዓታትን ፕሮግራሚንን',
      am: 'ROBOT-004: ABB Robot ሥርዓቶች እና ፕሮግራሚንግ'
    },
    category: 'robotics',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'ABB IRB robot families diagram (IRB 120 to IRB 8700 with payload/reach/applications), IRC5 controller overview, RobotStudio workflow, RAPID program code diagram (MODULE/PROC/MoveJ/MoveL/SetDO/WaitDI highlighted), 7-instruction RAPID reference, speed data vs zone data panels (v5-vmax and fine-z200), tooldata/wobjdata/speeddata/zonedata reference, and RAPID best practices — with diagrams — by Awet G. Nway.',
      ti: 'ABB IRB families diagram (IRB 120-8700)፣ RobotStudio workflow፣ RAPID program code diagram፣ 7-instruction RAPID reference፣ speed vs zone data panels — ብ Awet G. Nway።',
      am: 'ABB IRB families diagram (IRB 120-8700)፣ RobotStudio workflow፣ RAPID program code diagram፣ 7-instruction RAPID reference፣ speed vs zone data panels — በ Awet G. Nway።'
    },
    file: 'pdfs/ROBOT-004-ABB-Robot-Systems.pdf',
    color: '#ec4899',
    preview: true
  },
  {
    id: 'robot-curriculum-005-kuka-robot-programming',
    title: {
      en: 'ROBOT-005: KUKA Robot Programming',
      ti: 'ROBOT-005: ናይ KUKA Robot ፕሮግራሚን',
      am: 'ROBOT-005: KUKA Robot ፕሮግራሚንግ'
    },
    category: 'robotics',
    pages: 7,
    size: '138 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'KUKA robot models table (KR 6 to KR 1000 TITAN), KRC4 controller architecture diagram (KPC/KSD/KPS/SafetyBUS/SmartPad), KRL .SRC and .DAT file structure diagram, PTP/LIN/CIRC motion type diagram, KRL data types table (BOOL/INT/REAL/E6POS/E6AXIS), operators and control flow table, motion instruction syntax table, approximate positioning (C_DIS/C_VEL/C_ORI), digital I/O and subprogram tables, 5 practice exercises — 4 diagrams — by Awet G. Nway.',
      ti: 'KUKA robot models table፣ KRC4 controller architecture diagram፣ KRL .SRC/.DAT file structure diagram፣ PTP/LIN/CIRC motion diagram፣ KRL data types/operators/motion tables፣ I/O and subprogram tables፣ 5 exercises — ብ Awet G. Nway።',
      am: 'KUKA robot models table፣ KRC4 controller architecture diagram፣ KRL .SRC/.DAT file structure diagram፣ PTP/LIN/CIRC motion diagram፣ KRL data types/operators/motion tables፣ I/O and subprogram tables፣ 5 exercises — በ Awet G. Nway።'
    },
    file: 'pdfs/ROBOT-005-KUKA-Robot-Programming.pdf',
    color: '#ec4899',
    preview: true
  },
  {
    id: 'prota-curriculum-001-introduction-to-protastructure',
    title: {
      en: 'PROTA-001: Introduction to ProtaStructure',
      ti: 'PROTA-001: መእተዊ ናብ ProtaStructure',
      am: 'PROTA-001: ወደ ProtaStructure መግቢያ'
    },
    category: 'prota-structure',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'NEW',
    description: {
      en: 'What ProtaStructure is, 6-stage workflow diagram (Setup→Model→Loads→Analysis→Design→Detailing), RC structural system load path diagram (slab→beam→column→foundation), supported design codes (EC2/ACI/BS 8110/ASCE 7/seismic), ProtaStructure vs ETABS/SAP2000/SAFE/STAAD.Pro, and structural engineering career pathways — with diagrams — by Awet G. Nway.',
      ti: 'ProtaStructure እንታይ ምዃኑ፣ 6-stage workflow diagram፣ RC structural system diagram፣ design codes (EC2/ACI/BS 8110)፣ ProtaStructure vs ETABS/SAP2000 — ብ Awet G. Nway።',
      am: 'ProtaStructure ምን እንደሆነ፣ 6-stage workflow diagram፣ RC structural system diagram፣ design codes (EC2/ACI/BS 8110)፣ ProtaStructure vs ETABS/SAP2000 — በ Awet G. Nway።'
    },
    file: 'pdfs/PROTA-001-Introduction-to-ProtaStructure.pdf',
    color: '#0369a1',
    preview: true
  },
  {
    id: 'prota-curriculum-002-interface-and-navigation',
    title: {
      en: 'PROTA-002: Interface and Navigation',
      ti: 'PROTA-002: ናይ ProtaStructure Interface ምዝዋር',
      am: 'PROTA-002: ProtaStructure Interface እና Navigation'
    },
    category: 'prota-structure',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'ProtaStructure interface 7-zone diagram (menu/toolbar/building tree/viewport/properties/story selector/output bar), Building Tree hierarchy diagram (project→stories→columns/beams/slabs/foundations/loads), main toolbar icon guide, 3D/2D navigation controls diagram, 6 view modes, 20 keyboard shortcuts, and 5 common mistakes — with diagrams — by Awet G. Nway.',
      ti: 'ProtaStructure interface 7-zone diagram፣ Building Tree hierarchy diagram፣ main toolbar icon guide፣ 3D/2D navigation controls diagram፣ 20 keyboard shortcuts — ብ Awet G. Nway።',
      am: 'ProtaStructure interface 7-zone diagram፣ Building Tree hierarchy diagram፣ main toolbar icon guide፣ 3D/2D navigation controls diagram፣ 20 keyboard shortcuts — በ Awet G. Nway።'
    },
    file: 'pdfs/PROTA-002-Interface-and-Navigation.pdf',
    color: '#0369a1',
    preview: true
  },
  {
    id: 'prota-curriculum-003-structural-design-principles',
    title: {
      en: 'PROTA-003: Structural Design Principles',
      ti: 'PROTA-003: ናይ መዋቅር ዲዛይን ሞጎስ',
      am: 'PROTA-003: የሕንፃ ዲዛይን መሰረታዊ ሞጎሶች'
    },
    category: 'prota-structure',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: '5 load types diagram (Dead/Live/Wind/Seismic/Snow with typical values), load types table with ProtaStructure input, tributary area floor plan diagram (corner 9m²/edge 18m²/interior 36m²), Eurocode 2 vs ACI 318 load combinations table, partial safety factors explained, load path diagram (slab→beam→column→foundation), sway vs non-sway frames, and how ProtaStructure applies all concepts — with diagrams — by Awet G. Nway.',
      ti: '5 load types diagram፣ tributary area diagram (corner/edge/interior)፣ Eurocode 2 vs ACI 318 load combinations table፣ load path diagram (slab→beam→column→foundation)፣ sway vs non-sway — ብ Awet G. Nway።',
      am: '5 load types diagram፣ tributary area diagram (corner/edge/interior)፣ Eurocode 2 vs ACI 318 load combinations table፣ load path diagram (slab→beam→column→foundation)፣ sway vs non-sway — በ Awet G. Nway።'
    },
    file: 'pdfs/PROTA-003-Structural-Design-Principles.pdf',
    color: '#0369a1',
    preview: true
  },
  {
    id: 'prota-curriculum-004-grid-and-level-setup',
    title: {
      en: 'PROTA-004: Grid and Level Setup',
      ti: 'PROTA-004: Grid and Level Setup ኣብ ProtaStructure',
      am: 'PROTA-004: ProtaStructure Grid እና Level Setup'
    },
    category: 'prota-structure',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: '5-storey RC office project brief, Building Tree story hierarchy diagram (9 stories Basement to Roof), 5-step story creation table, 4×3 structural grid diagram (A-D × 1-3 at 6m bays), 6-step grid drawing procedure, material grades diagram (concrete C25-C40/rebar B500B/cover depth), analysis model configuration table (design code/load combos/seismic/mesh), and 9-item pre-modelling checklist — with diagrams — by Awet G. Nway.',
      ti: 'Building Tree story hierarchy diagram (9 stories)፣ 5-step story creation table፣ 4×3 grid diagram (A-D × 1-3 at 6m)፣ material grades diagram (concrete/rebar/cover)፣ analysis model config፣ 9-item checklist — ብ Awet G. Nway።',
      am: 'Building Tree story hierarchy diagram (9 stories)፣ 5-step story creation table፣ 4×3 grid diagram (A-D × 1-3 at 6m)፣ material grades diagram (concrete/rebar/cover)፣ analysis model config፣ 9-item checklist — በ Awet G. Nway።'
    },
    file: 'pdfs/PROTA-004-Grid-and-Level-Setup.pdf',
    color: '#0369a1',
    preview: true
  },
  {
    id: 'prota-curriculum-005-beam-design',
    title: {
      en: 'PROTA-005: Beam Design',
      ti: 'PROTA-005: ናይ Beam ዲዛይን',
      am: 'PROTA-005: Beam ዲዛይን'
    },
    category: 'prota-structure',
    pages: 4,
    size: '118 KB',
    downloads: '0',
    badge: 'NEW',
    description: {
      en: '4 beam types diagram (simply supported/continuous/cantilever/propped — support symbols, M formulas), BMD+SFD diagram for simply supported beam with UDL (parabolic moment, linear shear), RC beam cross-section diagram (tension bars/compression bars/links/cover/d notation), Eurocode 2 design checks table (bending/shear/deflection/crack width), 6-step ProtaStructure design workflow, and 4-row troubleshooting guide — with 3 diagrams — by Awet G. Nway.',
      ti: '4 beam types diagram (simply supported/continuous/cantilever/propped)፣ BMD+SFD diagram (parabolic moment/linear shear)፣ RC beam cross-section diagram (bars/links/cover)፣ Eurocode 2 checks table፣ 6-step ProtaStructure workflow — ብ Awet G. Nway።',
      am: '4 beam types diagram (simply supported/continuous/cantilever/propped)፣ BMD+SFD diagram (parabolic moment/linear shear)፣ RC beam cross-section diagram (bars/links/cover)፣ Eurocode 2 checks table፣ 6-step ProtaStructure workflow — በ Awet G. Nway።'
    },
    file: 'pdfs/PROTA-005-Beam-Design.pdf',
    color: '#0369a1',
    preview: true
  },
  {
    id: 'revit-curriculum-001-introduction-to-revit',
    title: {
      en: 'REVIT-001: Introduction to Revit',
      ti: 'REVIT-001: መእተዊ ናብ Revit',
      am: 'REVIT-001: ወደ Revit መግቢያ'
    },
    category: 'revit',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'NEW',
    description: {
      en: 'What BIM is and why it replaces CAD, BIM dimensions 3D–7D pyramid diagram, BIM maturity levels (ISO 19650), Revit project workflow (5 phases), three Revit disciplines diagram (Architecture/Structure/MEP), Revit vs AutoCAD comparison, system requirements, and BIM career pathways with Africa salary ranges — with diagrams — by Awet G. Nway.',
      ti: 'BIM እንታይ ምዃኑ፣ BIM dimensions 3D-7D pyramid diagram፣ 3 Revit disciplines (Architecture/Structure/MEP)፣ Revit vs AutoCAD፣ career pathways — ብ Awet G. Nway።',
      am: 'BIM ምን እንደሆነ፣ BIM dimensions 3D-7D pyramid diagram፣ 3 Revit disciplines (Architecture/Structure/MEP)፣ Revit vs AutoCAD፣ career pathways — በ Awet G. Nway።'
    },
    file: 'pdfs/REVIT-001-Introduction-to-Revit.pdf',
    color: '#4338ca',
    preview: true
  },
  {
    id: 'revit-curriculum-002-revit-interface-basics',
    title: {
      en: 'REVIT-002: Revit Interface Basics',
      ti: 'REVIT-002: ናይ Revit Interface መሰረታዊ',
      am: 'REVIT-002: Revit Interface መሰረታዊ'
    },
    category: 'revit',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Revit 2025 interface 8-zone diagram (title bar/QAT/ribbon/properties/canvas/project browser/view control/status bar), 5 ribbon tabs guide, Project Browser hierarchy diagram, Type vs Instance properties, 3D navigation methods, and 25 keyboard shortcuts (WA/DR/GR/VG/ZF and more) — with diagrams — by Awet G. Nway.',
      ti: 'Revit 2025 interface 8-zone diagram፣ 5 ribbon tabs guide፣ Project Browser hierarchy diagram፣ Type vs Instance properties፣ 3D navigation፣ 25 keyboard shortcuts — ብ Awet G. Nway።',
      am: 'Revit 2025 interface 8-zone diagram፣ 5 ribbon tabs guide፣ Project Browser hierarchy diagram፣ Type vs Instance properties፣ 3D navigation፣ 25 keyboard shortcuts — በ Awet G. Nway።'
    },
    file: 'pdfs/REVIT-002-Revit-Interface-Basics.pdf',
    color: '#4338ca',
    preview: true
  },
  {
    id: 'revit-curriculum-003-project-setup',
    title: {
      en: 'REVIT-003: Project Setup',
      ti: 'REVIT-003: ናይ ፕሮጀክት ምቕማጥ',
      am: 'REVIT-003: የፕሮጀክት ማዋቀር'
    },
    category: 'revit',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: '6-step project setup workflow diagram, 4 Revit template types (Architectural/Structural/MEP/Company), project units and coordinates settings, levels diagram (basement to roof with elevations), level creation steps, storey height standards, structural grid diagram (A-E columns × 1-4 rows with bubbles), grid tasks table, and title block/sheet setup guide — with diagrams — by Awet G. Nway.',
      ti: '6-step setup workflow diagram፣ 4 template types፣ levels diagram (basement to roof)፣ level creation steps፣ structural grid diagram (A-E × 1-4)፣ title block setup — ብ Awet G. Nway።',
      am: '6-step setup workflow diagram፣ 4 template types፣ levels diagram (basement to roof)፣ level creation steps፣ structural grid diagram (A-E × 1-4)፣ title block setup — በ Awet G. Nway።'
    },
    file: 'pdfs/REVIT-003-Project-Setup.pdf',
    color: '#4338ca',
    preview: true
  },
  {
    id: 'revit-curriculum-004-levels-and-grids-in-practice',
    title: {
      en: 'REVIT-004: Levels and Grids in Practice',
      ti: 'REVIT-004: Levels and Grids ኣብ ተግባር',
      am: 'REVIT-004: Levels and Grids በተግባር'
    },
    category: 'revit',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: '5-storey commercial building project brief, 7-level setup diagram (Ground Floor±0 to Roof Level+18000mm with colour-coded bands), 7-step level creation procedure, 5×4 structural grid diagram (A-E columns × 1-4 rows at 6m bays with dimension annotations), 9-step grid drawing procedure, DWG import 3-step workflow diagram, coordinate concepts table (PBP/Survey Point/Shared/True North), and 8-item pre-modelling checklist — with diagrams — by Awet G. Nway.',
      ti: '5-storey project brief፣ 7-level setup diagram (±0 to +18000mm)፣ 5×4 grid diagram (A-E × 1-4 at 6m)፣ DWG import 3-step diagram፣ coordinates table፣ 8-item pre-modelling checklist — ብ Awet G. Nway።',
      am: '5-storey project brief፣ 7-level setup diagram (±0 to +18000mm)፣ 5×4 grid diagram (A-E × 1-4 at 6m)፣ DWG import 3-step diagram፣ coordinates table፣ 8-item pre-modelling checklist — በ Awet G. Nway።'
    },
    file: 'pdfs/REVIT-004-Levels-and-Grids-in-Practice.pdf',
    color: '#4338ca',
    preview: true
  },
  {
    id: 'cohoom-curriculum-001-introduction-to-coohom',
    title: {
      en: 'COHOOM-001: Introduction to Coohom',
      ti: 'COHOOM-001: መእተዊ ናብ Coohom',
      am: 'COHOOM-001: ወደ Coohom መግቢያ'
    },
    category: 'coohom',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'NEW',
    description: {
      en: 'What Coohom is (15M+ users, cloud-based), 7-stage design workflow diagram (Brief→Floor Plan→3D→Materials→Lighting→Render→Present), key features grid (cloud/floor plan/furniture library/rendering/materials/VR), free vs Pro plan comparison, system requirements, Coohom vs SketchUp/AutoCAD/3ds Max, and career opportunities — with diagrams — by Awet G. Nway.',
      ti: 'Coohom እንታይ ምዃኑ (15M+ users)፣ 7-stage workflow diagram፣ key features grid፣ free vs Pro plan፣ Coohom vs SketchUp/AutoCAD፣ career opportunities — ብ Awet G. Nway።',
      am: 'Coohom ምን እንደሆነ (15M+ users)፣ 7-stage workflow diagram፣ key features grid፣ free vs Pro plan፣ Coohom vs SketchUp/AutoCAD፣ career opportunities — በ Awet G. Nway።'
    },
    file: 'pdfs/COHOOM-001-Introduction-to-Coohom.pdf',
    color: '#f43f5e',
    preview: true
  },
  {
    id: 'cohoom-curriculum-002-interface-and-navigation',
    title: {
      en: 'COHOOM-002: Interface and Navigation',
      ti: 'COHOOM-002: ናይ Coohom Interface ምዝዋር',
      am: 'COHOOM-002: Coohom Interface እና Navigation'
    },
    category: 'coohom',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Coohom interface layout diagram (6 zones), left panel tools guide (8 categories), right panel properties explained, 3D navigation controls diagram (orbit/pan/zoom/walk), 4 view modes diagram (2D/3D/walkthrough/panorama), 20 keyboard shortcuts, and 5 common mistakes to avoid — with diagrams — by Awet G. Nway.',
      ti: 'Coohom interface layout diagram (6 zones)፣ left panel tools (8 categories)፣ right panel properties፣ 3D navigation diagram፣ 4 view modes diagram፣ 20 keyboard shortcuts — ብ Awet G. Nway።',
      am: 'Coohom interface layout diagram (6 zones)፣ left panel tools (8 categories)፣ right panel properties፣ 3D navigation diagram፣ 4 view modes diagram፣ 20 keyboard shortcuts — በ Awet G. Nway።'
    },
    file: 'pdfs/COHOOM-002-Interface-and-Navigation.pdf',
    color: '#f43f5e',
    preview: true
  },
  {
    id: 'cohoom-curriculum-003-space-planning-basics',
    title: {
      en: 'COHOOM-003: Space Planning Basics',
      ti: 'COHOOM-003: መሰረታዊ ናይ ቦታ ምምቃል',
      am: 'COHOOM-003: የቦታ ዕቅድ መሰረታዊ'
    },
    category: 'coohom',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: '7 space planning principles grid (function/flow/focal/balance/scale/light/flexibility), minimum clearance standards (living room diagram + 8-room table), traffic flow types (primary 900mm/secondary 600mm/tertiary 450mm), activity zoning diagram (4 zones in open-plan), 6 zoning tools, and room-by-room checklist (living/bedroom/kitchen/dining/office/bathroom) — with diagrams — by Awet G. Nway.',
      ti: '7 space planning principles grid፣ minimum clearance standards diagram፣ traffic flow types፣ activity zoning diagram፣ room-by-room checklist — ብ Awet G. Nway።',
      am: '7 space planning principles grid፣ minimum clearance standards diagram፣ traffic flow types፣ activity zoning diagram፣ room-by-room checklist — በ Awet G. Nway።'
    },
    file: 'pdfs/COHOOM-003-Space-Planning-Basics.pdf',
    color: '#f43f5e',
    preview: true
  },
  {
    id: 'cohoom-curriculum-004-floor-plan-creation',
    title: {
      en: 'COHOOM-004: Floor Plan Creation',
      ti: 'COHOOM-004: ናይ ፍሎር ፕላን ምፍጣር',
      am: 'COHOOM-004: Floor Plan መፍጠር'
    },
    category: 'coohom',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: '6-step floor plan workflow diagram (Start→Draw Room→Add Walls→Place Doors→Add Windows→Verify), 4 wall drawing methods (Draw Room/Draw Wall/Import DXF/Template), annotated floor plan diagram (walls/doors/windows/dimensions labelled), door settings table (width/swing/hinge/style/height), window settings table (width/height/sill height/position/style), 5 common mistakes diagram with fixes, measurement tools, and multi-floor guide — with diagrams — by Awet G. Nway.',
      ti: '6-step floor plan workflow diagram፣ 4 wall drawing methods፣ annotated floor plan diagram፣ door & window settings tables፣ 5 common mistakes diagram with fixes — ብ Awet G. Nway።',
      am: '6-step floor plan workflow diagram፣ 4 wall drawing methods፣ annotated floor plan diagram፣ door & window settings tables፣ 5 common mistakes diagram with fixes — በ Awet G. Nway።'
    },
    file: 'pdfs/COHOOM-004-Floor-Plan-Creation.pdf',
    color: '#f43f5e',
    preview: true
  },
  {
    id: 'ct-001-introduction-to-critical-thinking',
    title: {
      en: 'CT-001: Introduction to Critical Thinking in the AI Age',
      ti: 'CT-001: መእተዊ ናብ ሓሳባዊ ሕሳብ ኣብ ዘመነ AI',
      am: 'CT-001: ወደ ወሳኝ አስተሳሰብ በ AI ዘመን መግቢያ'
    },
    category: 'critical-thinking',
    pages: 4,
    size: '120 KB',
    downloads: '0',
    badge: 'NEW',
    description: {
      en: 'Why critical thinking is the most valuable skill in 2026, the 6 core CT skills (analysis, evaluation, inference, explanation, self-regulation, interpretation), how AI amplifies your thinking style, the Paul-Elder 8-element framework, and a 10-day starter challenge — with diagrams — by Awet G. Nway.',
      ti: 'Critical thinking ስለምንታይ ቀዳምነት ክእለት ምዃኑ፣ 6 ቀንዲ ክእለታት CT፣ AI ሓሳብካ ኸመይ ዘጉልህ፣ Paul-Elder framework፣ 10-ቀን challenge — ብ Awet G. Nway።',
      am: 'Critical thinking ለምን ቁ.1 ክህሎት እንደሆነ፣ 6 ዋና CT ክህሎቶች፣ AI አስተሳሰብህን ኻ አጉልቶ ያሳያል፣ Paul-Elder framework፣ 10-ቀን challenge — በ Awet G. Nway።'
    },
    file: 'pdfs/CT-001-Introduction-to-Critical-Thinking.pdf',
    color: '#7c3aed',
    preview: true
  },
  {
    id: 'ct-002-cognitive-biases',
    title: {
      en: 'CT-002: Cognitive Biases — The Errors Your Brain Makes Daily',
      ti: 'CT-002: ናይ ሓሳብ ጌጋታት — ሎሚ ዘቅርቦ ቅምጥ ናይ ሓሳብካ',
      am: 'CT-002: የግንዛቤ አድልዎዎች — አንዳር አእምሮህ በዕለት ዕለት የሚሰሩ ስህተቶች'
    },
    category: 'critical-thinking',
    pages: 4,
    size: '120 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: '20 cognitive biases explained with real examples, the Dunning-Kruger curve (Peak of Mount Stupid → Valley of Despair → Slope of Enlightenment), the confirmation bias echo chamber diagram, top 10 biases deep dive with counter-moves, and 6 de-biasing strategies — with diagrams — by Awet G. Nway.',
      ti: '20 ናይ ሓሳብ ጌጋታት ምስ ኣብነታት፣ Dunning-Kruger curve፣ confirmation bias echo chamber diagram፣ top 10 biases + counter-moves — ብ Awet G. Nway።',
      am: '20 የግንዛቤ አድልዎዎች ከምሳሌዎች ጋር፣ Dunning-Kruger curve፣ confirmation bias echo chamber diagram፣ top 10 biases + counter-moves — በ Awet G. Nway።'
    },
    file: 'pdfs/CT-002-Cognitive-Biases.pdf',
    color: '#7c3aed',
    preview: true
  },
  {
    id: 'ct-003-how-to-spot-misinformation',
    title: {
      en: 'CT-003: How to Spot Misinformation and Fake News',
      ti: 'CT-003: ምስሕት ሓሶታትን ሓሶት ዜናን ኸምዚ ኽትፈልጥ',
      am: 'CT-003: የሀሰት መረጃ እና ሐሰት ዜናን እንዴት መለየት እንደሚቻል'
    },
    category: 'critical-thinking',
    pages: 4,
    size: '120 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Misinformation vs disinformation vs mal-information defined, the 7 types of information disorder (First Draft framework), the SIFT method (Stop/Investigate/Find/Trace), misinformation lifecycle diagram, 7 red flags checklist, AI fakes (deepfakes/synthetic text/voice cloning), and a 10-point verification checklist — with diagrams — by Awet G. Nway.',
      ti: 'Misinformation vs disinformation vs mal-information ትርጉም፣ 7 ዓይነታት ናይ information disorder፣ SIFT method፣ 7 red flags፣ AI fakes፣ 10-point verification checklist — ብ Awet G. Nway።',
      am: 'Misinformation vs disinformation ትርጓሜ፣ 7 ዓይነት information disorder፣ SIFT method፣ 7 red flags፣ AI fakes (deepfakes/voice cloning)፣ 10-point verification checklist — በ Awet G. Nway።'
    },
    file: 'pdfs/CT-003-How-to-Spot-Misinformation.pdf',
    color: '#7c3aed',
    preview: true
  },
  {
    id: 'ct-004-the-socratic-method',
    title: {
      en: 'CT-004: The Socratic Method — Questioning Everything',
      ti: 'CT-004: ናይ ሶቅራጠስ ኣገባብ — ኩሉ ነገር ምሕታት',
      am: 'CT-004: የሶቅራጥስ ዘዴ — ሁሉን ነገር መጠየቅ'
    },
    category: 'critical-thinking',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Who Socrates was and why Athens killed him, the 6 types of Socratic questions (clarification/assumptions/evidence/viewpoints/implications/the question itself), the 5-stage elenchus cycle, pyramid of question depth, applying Socratic questioning to AI outputs, and a daily practice guide — with diagrams — by Awet G. Nway.',
      ti: 'ሶቅራጠስ ናይ ጥልቅ ሕቶ 6 ዓይነታት፣ 5-stage elenchus cycle፣ pyramid of question depth፣ AI outputs ምሕታት — ብ Awet G. Nway።',
      am: 'ሶቅራጥስ 6 ዓይነት ጥያቄዎች፣ 5-stage elenchus cycle፣ pyramid of question depth፣ AI outputs ላይ ሶቅራቲካዊ ጥያቄ — በ Awet G. Nway።'
    },
    file: 'pdfs/CT-004-The-Socratic-Method.pdf',
    color: '#7c3aed',
    preview: true
  },
  {
    id: 'ct-005-logical-fallacies',
    title: {
      en: 'CT-005: Logical Fallacies — Arguments That Sound Right But Are Wrong',
      ti: 'CT-005: ምርጫ ሓሶት ሓሳባት — ቅኑዕ ዝመስሉ ጌጋ ሓሳባት',
      am: 'CT-005: ሎጂካዊ ስህተቶች — ትክክል የሚሰሙ ግን ስህተት የሆኑ ክርክሮች'
    },
    category: 'critical-thinking',
    pages: 4,
    size: '120 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: '20 logical fallacies in 4 categories (relevance/weak induction/presumption/ambiguity), top 10 fallacies deep-dive (ad hominem/straw man/false dilemma/appeal to authority/slippery slope/hasty generalisation and more), straw man 4-step flow diagram, false dilemma spectrum diagram, fallacies in AI output guide — with diagrams — by Awet G. Nway.',
      ti: '20 logical fallacies ኣብ 4 ዓይነታት፣ top 10 fallacies (ad hominem/straw man/false dilemma)፣ straw man 4-step diagram፣ false dilemma spectrum diagram፣ fallacies ኣብ AI output — ብ Awet G. Nway።',
      am: '20 logical fallacies ለ4 ምድቦች፣ top 10 fallacies (ad hominem/straw man/false dilemma)፣ straw man 4-step diagram፣ false dilemma spectrum diagram፣ AI output ውስጥ fallacies — በ Awet G. Nway።'
    },
    file: 'pdfs/CT-005-Logical-Fallacies.pdf',
    color: '#7c3aed',
    preview: true
  },
  {
    id: 'ct-006-ai-and-human-intelligence',
    title: {
      en: 'CT-006: AI and Human Intelligence — Partners or Rivals?',
      ti: 'CT-006: AI ምስ ናይ ሰብ ሓሳብ — ምሕዝነት ወይስ ምቅልላስ?',
      am: 'CT-006: AI እና የሰው ዕውቀት — ጓደኞች ወይስ ተቀናቃኞች?'
    },
    category: 'critical-thinking',
    pages: 4,
    size: '120 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'What AI actually is (stochastic pattern-matching, not thinking), AI strengths vs human strengths two-column diagram, 8 things only humans can do table, Human-AI partnership 4-step cycle diagram (Define→Execute→Evaluate→Decide), 5 partnership principles, job disruption spectrum diagram (routine→creative), 6-field job risk table, and 6 positioning strategies — with diagrams — by Awet G. Nway.',
      ti: 'AI ምንታይ ምዃኑ (stochastic pattern-matching)፣ AI vs Human strengths diagram፣ Human-AI partnership cycle diagram፣ job disruption spectrum፣ 6-field job risk table — ብ Awet G. Nway።',
      am: 'AI ምን እንደሆነ (stochastic pattern-matching)፣ AI vs Human strengths diagram፣ Human-AI partnership cycle diagram፣ job disruption spectrum፣ 6-field job risk table — በ Awet G. Nway።'
    },
    file: 'pdfs/CT-006-AI-and-Human-Intelligence.pdf',
    color: '#7c3aed',
    preview: true
  },
  {
    id: 'ct-curriculum-007-philosophy-of-free-will',
    title: {
      en: 'CT-007: The Philosophy of Free Will in a Deterministic World',
      ti: 'CT-007: ፍልስፍና ናይ ናጻ ፍቓድ ኣብ ዓለም ዝተወሰነ',
      am: 'CT-007: በተወሰነ ዓለም ውስጥ የነፃ ፍቃድ ፍልስፍና'
    },
    category: 'critical-thinking',
    pages: 8,
    size: '30 KB',
    downloads: '0',
    badge: 'NEW',
    description: {
      en: 'Three-position philosophical spectrum diagram (Hard Determinism/Compatibilism/Libertarian Free Will), Libet experiment timeline diagram (readiness potential 550ms before consciousness), definitions table, Hard Determinist argument structure, Libet interpretations table, five major compatibilist thinkers table, free will and justice system comparison, five classic thought experiments, practical life implications table, key thinkers reference card — by Awet G. Nway.',
      ti: 'Three-position philosophical spectrum diagram፣ Libet experiment timeline diagram (readiness potential 550ms)፣ definitions table፣ Hard Determinist argument፣ Libet interpretations table፣ 5 compatibilist thinkers table፣ justice system comparison፣ 5 thought experiments — ብ Awet G. Nway።',
      am: 'Three-position philosophical spectrum diagram፣ Libet experiment timeline diagram (readiness potential 550ms)፣ definitions table፣ Hard Determinist argument፣ Libet interpretations table፣ 5 compatibilist thinkers table፣ justice system comparison፣ 5 thought experiments — በ Awet G. Nway።'
    },
    file: 'pdfs/CT-007-The-Philosophy-of-Free-Will.pdf',
    color: '#7c3aed',
    preview: true
  },
  {
    id: 'ct-philosophy-truth-vs-consequences',
    title: {
      en: 'Truth and Falsehood: Should Truth Always Be Absolute?',
      ti: 'ሓቅን ሓሶትን: ሓቂ ኩሉ ግዜ ፍጹም ክትከውን ኣለዋ?',
      am: 'እውነት እና ሃሰት: እውነት ሁልጊዜ ፍጹም መሆን አለበት?'
    },
    category: 'critical-thinking',
    pages: 10,
    size: '2.1 MB',
    downloads: '0',
    badge: 'NEW',
    description: {
      en: 'A philosophical debate on truth and lying: Kant\'s deontology (lying is always wrong — a single lie fractures society) vs Mill\'s utilitarianism (morality is judged by consequences — a lie that saves a life is moral). Includes the famous knock-at-the-door dilemma and the anatomy of a moral choice.',
      ti: 'ፍልስፍናዊ ክትዓት ብዛዕባ ሓቅን ሓሶትን: Kant (ሓሶት ኩሉ ግዜ ጌጋ) vs Mill (ሞራልነት ብሳዕቤን ይውሰን). ናይ ናይ ሞራል ምርጫ ትምህርቲ.',
      am: 'ስለ እውነት እና ሃሰት ፍልስፍናዊ ክርክር: Kant (ሃሰት ሁልጊዜ ስህተት) vs Mill (ሥነ ምግባር በውጤት ይለካል). የሞራል ምርጫ ትንተና.'
    },
    file: 'pdfs/CT-Philosophy-Truth-vs-Consequences.pdf',
    color: '#7c3aed',
    preview: true
  },
  {
    id: 'industrial-plc-blueprint',
    title: {
      en: 'Industrial PLC Blueprint — From Fundamentals to Industrial Application',
      ti: 'ናይ ኢንዱስትሪ PLC ብሉፕሪንት — ካብ መሰረታዊ ክሳብ ናይ ኢንዱስትሪ ትጽቢት',
      am: 'ኢንዱስትሪ PLC ብሉፕሪንት — ከመሰረት እስከ ኢንዱስትሪ አፕሊኬሽን'
    },
    category: 'plc',
    pages: 20,
    size: '22 MB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Visual course guide covering PLC hardware anatomy, scan cycle, sinking/sourcing wiring, IEC 61131-3 languages, ladder logic, timers/counters, industrial networks (Modbus, PROFINET, OPC UA), safety, troubleshooting, and career pathways — by Awet G. Nway.',
      ti: 'ናይ ምስሊ ኮርስ መምርሒ ናይ PLC ሃርድዌር ቀዛፊ፣ ናይ ስካን ዑደት፣ IEC 61131-3 ቋንቋታት፣ Ladder Logic፣ ናይ ኢንዱስትሪ ኔትወርካት፣ ናይ ድሕነት፣ ናይ ምፍታሽን ናይ ስራሕ ጉዕዞን ዝሸፍን — ብ Awet G. Nway።',
      am: 'የPLC ሃርድዌር አናቶሚ፣ ስካን ሳይክል፣ IEC 61131-3 ቋንቋዎች፣ Ladder Logic፣ ኢንዱስትሪ ኔትወርኮች፣ ደህንነት፣ ፍትሻ እና ናይ ሙያ ጉዞ ዝሸፍን የምስል ኮርስ መምሪያ — በ Awet G. Nway።'
    },
    file: 'pdfs/industrial-plc-blueprint.pdf',
    color: '#00d4ff',
    preview: true
  },
  {
    id: 'industrial-awakening',
    title: {
      en: 'Industrial Awakening — The Engineer\'s Guide to Success: Escaping the Farm',
      ti: 'ናይ ኢንዱስትሪ ምትንሳእ — ናይ ኢንጂነር መምርሒ ናብ ዓወት: ካብ ሕርሻ ምውጻእ',
      am: 'ኢንዱስትሪያዊ ንቃት — የምህንድስና ስኬት መምሪያ: ከእርሻ ማምለጫ'
    },
    category: 'plc',
    pages: 13,
    size: '13.3 MB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'A visual manifesto for the modern engineer. Uses Animal Farm archetypes (Boxer, Snowball, Benjamin) to expose the mindset gap between analog workers and digital innovators — covering PLC automation, robotics, AI career strategy, and the AYE Tech Hub standard — by Awet G. Nway.',
      ti: 'ናይ ዘመናዊ ኢንጂነር ምስሊ ማኒፌስቶ። ናይ Animal Farm ምሳሌታት ተጠቒሙ ናይ ኣናሎግ ሰራሕተኛ ን ናይ ዲጂታል ፈጠርቲ ዝፈላሊ ናይ ኣእምሮ ፍልልይ ይቃልዕ — PLC automation፣ robotics፣ AI career — ብ Awet G. Nway።',
      am: 'ለዘመናዊ መሐንዲስ ምስላዊ ማኒፌስቶ። የ Animal Farm ምሳሌዎችን ተጠቅሞ ቀጣናዊ ሰራተኛ እና ዲጂታል ፈጠራ ሰው መካከል ያለውን የአስተሳሰብ ልዩነት ያጋልጣል — PLC automation፣ robotics፣ AI career strategy — በ Awet G. Nway።'
    },
    file: 'pdfs/industrial-awakening.pdf',
    color: '#f97316',
    preview: true
  },
  {
    id: 'plc-guide',
    title: {
      en: 'PLC Programming Complete Guide',
      ti: 'ምሉእ መምርሒ PLC ፕሮግራሚን',
      am: 'PLC ፕሮግራሚንግ ሙሉ መምሪያ'
    },
    category: 'plc',
    pages: 11,
    size: '68 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Comprehensive Siemens S7 PLC guide covering Ladder Logic, FBD, Structured Text, HMI, PROFINET, Safety SIL, and career pathways — by Awet G. Nway.',
      ti: 'ምሉእ Siemens S7 PLC መምርሒ ናይ Ladder Logic, FBD, ናይ ኢንዱስትሪ ፕሮግራሚን ዝሸፍን።',
      am: 'ሙሉ Siemens S7 PLC መምሪያ Ladder Logic, FBD, እና ኢንዱስትሪ ፕሮግራሚንግ የሚሸፍን።'
    },
    file: 'pdfs/plc-programming-guide.pdf',
    flipbook: 'plc-flipbook.html',
    color: '#00d4ff',
    preview: true
  },
  {
    id: 'ee-fundamentals-ch1-ch2',
    title: {
      en: 'EE Fundamentals — Ch.1 & 2: Signals, Systems & Complex Numbers',
      ti: 'EE መሰረታዊ — ምዕ.1 & 2: ምልክታት፣ ስርዓታት & ውሱብ ቁጽርታት',
      am: 'EE መሰረቶች — ምዕ.1 & 2: ምልክቶች፣ ሥርዓቶች & ውስብስብ ቁጥሮች'
    },
    category: 'electrical',
    pages: 11,
    size: '1.2 MB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'AYE Tech Hub course guide covering signals, systems, complex numbers, Euler\'s relation, elemental signals, and LTI systems — Chapters 1 & 2 by Awet G. Nway.',
      ti: 'AYE Tech Hub ናይ ኮርስ መምርሒ ምልክታት፣ ስርዓታት፣ ውሱብ ቁጽርታት፣ ናይ Euler ምትእስሳር፣ ናይ LTI ስርዓታት — ምዕ. 1 & 2 ብ Awet G. Nway።',
      am: 'AYE Tech Hub ናይ ኮርስ መምሪያ ምልክቶች፣ ሥርዓቶች፣ ውስብስብ ቁጥሮች፣ Euler ቀመር፣ LTI ሥርዓቶች — ምዕ. 1 & 2 በ Awet G. Nway።'
    },
    file: 'pdfs/ee-fundamentals-ch1-ch2.pdf',
    color: '#eab308',
    preview: true
  },
  {
    id: 'transformers-course-guide',
    title: {
      en: 'Transformers — Principles, Construction, Applications & Troubleshooting',
      ti: 'ትራንስፎርመራት — መሰረታዊ ሕጊ፣ ህንፃ፣ ትጽቢት & ምፍታሽ',
      am: 'ትራንስፎርሞች — መሰረታዊ ህግ፣ ግንባታ፣ አፕሊኬሽን & ፍትሻ'
    },
    category: 'electrical',
    pages: 11,
    size: '1.2 MB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Senior-engineer-level guide covering electromagnetic induction, transformer construction, step-up/step-down, three-phase vector groups (Dyn11/YNd1), losses, cooling classes (ONAN–OFAF), industrial applications, and a full troubleshooting & PM schedule — by Awet G. Nway.',
      ti: 'ናይ ዓበይቲ ምህንድስና ደረጃ መምርሒ ናይ ኤለክትሮማግኔቲክ ምትእስሳር፣ ህንፃ ትራንስፎርመር፣ ሰለስተ-ፋዝ ቬክተር ጉጅለ፣ ናይ ሃሪ ደረጃታት፣ ናይ ኢንዱስትሪ ትጽቢት፣ ምፍታሽን PM ፕሮግራምን ዝሸፍን — ብ Awet G. Nway።',
      am: 'ኤሌክትሮማግኔቲክ ኢንደክሽን፣ ትራንስፎርመር ግንባታ፣ ሶስት-ፋዝ ቬክተር ቡድኖች፣ ኪሳራዎች፣ የማቀዝቀዣ ክፍሎች፣ ኢንዱስትሪ አፕሊኬሽን እና PM መርሃ ግብር ዝሸፍን ናይ ከፍተኛ ምህንድስና መምሪያ — በ Awet G. Nway።'
    },
    file: 'pdfs/transformers-course-guide.pdf',
    color: '#eab308',
    preview: true
  },
  {
    id: 'electrical-safety',
    title: {
      en: 'Electrical Safety Handbook',
      ti: 'ናይ ኤለክትሪካዊ ድሕነት ሓጋዚ',
      am: 'የኤሌክትሪካዊ ደህንነት ማኑዋል'
    },
    category: 'electrical',
    pages: 19,
    size: '56 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Complete electrical safety handbook: LOTO procedures, arc flash protection, PPE selection, grounding, NFPA 70E, IEC 60364, OSHA compliance — by Awet G. Nway.',
      ti: 'ምሉእ ናይ ኤለክትሪካዊ ድሕነት ደረጃ፣ LOTO ኣሰራርሓ፣ ናይ Arc Flash ምክልኻል መምርሒ።',
      am: 'ሙሉ ኤሌክትሪካዊ ደህንነት ደረጃዎች፣ LOTO ሂደቶች፣ እና Arc Flash ጥበቃ መምሪያ።'
    },
    file: 'pdfs/electrical-safety-handbook.pdf',
    flipbook: 'electrical-safety-flipbook.html',
    color: '#eab308',
    preview: true
  },
  {
    id: 'autocad-cheatsheet',
    title: {
      en: 'AutoCAD Commands Cheat Sheet',
      ti: 'AutoCAD ትእዛዛት ሓጺር ወረቐት',
      am: 'AutoCAD ትዕዛዞች አጭር ዝርዝር'
    },
    category: 'design',
    pages: 20,
    size: '55 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Essential AutoCAD shortcuts, commands and workflows for faster engineering drafting.',
      ti: 'መሰረታዊ AutoCAD ሓጺር ትእዛዛት፣ ትእዛዛትን ስርዓትን ን ቀልጣፋ ናይ ምህንድስና ምሳልሕ።',
      am: 'ዋና AutoCAD አቋራጮች፣ ትዕዛዞች እና ለፈጣን ምህንድስና ዲዛይን ሥርዓቶች።'
    },
    file: 'pdfs/autocad-cheatsheet.pdf',
    color: '#f97316',
    preview: true
  },
  {
    id: 'revit-mep',
    title: 'Revit MEP Complete Reference',
    category: 'revit',
    pages: 14,
    size: '45 KB',
    downloads: '0',
    badge: 'FREE',
    description: 'Full MEP systems modeling in Revit: HVAC, electrical, plumbing from beginner to advanced.',
    file: 'pdfs/revit-mep-reference.pdf',
    color: '#f97316',
    preview: true
  },
  {
    id: 'ai-engineering-guide',
    title: {
      en: 'AI Engineering — Practical Course Guide',
      ti: 'AI ምህንድስና — ናይ ተሞክሮ ናይ ትምህርቲ መምርሒ',
      am: 'AI ምህንድስና — ተግባራዊ የኮርስ መምሪያ'
    },
    category: 'ai',
    pages: 15,
    size: '240 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'From Foundations to Real-World Deployment. 5-stage learning roadmap, tools, career paths, and responsible AI — by Awet G. Nway.',
      ti: 'ካብ መሰረታዊ ክሳብ ናይ ሓቀኛ ዓለም ምዝርጋሕ። ናይ 5-ምዕራፍ ናይ ትምህርቲ ካርታ፣ ሓጋዚ፣ ናይ ሞያ ጐደና፣ ዝሕተፍ AI — ብ Awet G. Nway።',
      am: 'ከመሰረት እስከ ትክክለኛ ዓለም ማሰማራት። 5-ደረጃ የትምህርት ካርታ፣ መሳሪያዎች፣ የሙያ መንገዶች — በ Awet G. Nway።'
    },
    file: 'pdfs/ai-engineering-course.pdf',
    color: '#ec4899',
    preview: true
  },
  {
    id: 'ai-30day-day01-intro-to-ai',
    title: {
      en: '30-Day AI Course — Day 1: Introduction to Artificial Intelligence',
      ti: '30-መዓልቲ AI ኮርስ — መዓልቲ 1: መእተዊ ናብ ሰናይ ምህሮ',
      am: '30-ቀን AI ኮርስ — ቀን 1: ወደ ሰው ሰራሽ ብልሃት መግቢያ'
    },
    category: 'ai',
    pages: 8,
    size: '2.1 MB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'What AI really is, how it got here, and why it matters now. Covers ANI/AGI/ASI, subfields (ML, NLP, Computer Vision, Robotics, Generative AI), AI vs traditional programming, and common misconceptions — by Awet G. Nway.',
      ti: 'AI ብሓቂ እንታይ ምዃኑ፣ ከመይ ናብዚ ምስ ዝበጽሐ፣ ስለምንታይ ሕጂ ዘገድስ። ANI/AGI/ASI፣ ንዑስ ዓውደ-ፍልጠታት (ML, NLP, Computer Vision)፣ AI ኣምጻ ዝተሓሳሰበ ፕሮግራሚን — ብ Awet G. Nway።',
      am: 'AI ምን እንደሆነ፣ እንዴት እዚህ እንደደረሰ፣ እና አሁን ስለምን እንደሚጠቅም። ANI/AGI/ASI፣ ንዑስ ዘርፎች (ML, NLP, Computer Vision)፣ AI ከባህላዊ ፕሮግራሚንግ ጋር ያለው ልዩነት — በ Awet G. Nway።'
    },
    file: 'pdfs/ai-30day-day01-intro-to-ai.pdf',
    color: '#ec4899',
    preview: true
  },
  {
    id: 'ai-30day-day02-how-ai-works',
    title: {
      en: '30-Day AI Course — Day 2: How AI Works',
      ti: '30-መዓልቲ AI ኮርስ — መዓልቲ 2: AI ከመይ ይሰርሕ',
      am: '30-ቀን AI ኮርስ — ቀን 2: AI እንዴት ይሰራል'
    },
    category: 'ai',
    pages: 9,
    size: '2.3 MB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Under the hood: neural networks, training, and why GPUs matter. Covers the 3 stages of AI (data→training→inference), weights & parameters, backpropagation, and a full worked example — by Awet G. Nway.',
      ti: 'ኣብ ትሕቲ ዝኾፈ: ናይ ነውራል ኔትወርካት፣ ምሰልጣን፣ ስለምንታይ GPU ዘገድስ። 3 ምዕራፋት AI (data→training→inference)፣ ናይ weights & parameters — ብ Awet G. Nway።',
      am: 'በስር: ነርቭ ኔትወርኮች፣ ስልጠና፣ GPU ለምን እንደሚጠቅም። የ AI 3 ደረጃዎች (data→training→inference)፣ weights & parameters — በ Awet G. Nway።'
    },
    file: 'pdfs/ai-30day-day02-how-ai-works.pdf',
    color: '#ec4899',
    preview: true
  },
  {
    id: 'ai-30day-day03-ai-in-daily-life',
    title: {
      en: '30-Day AI Course — Day 3: AI in Daily Life',
      ti: '30-መዓልቲ AI ኮርስ — መዓልቲ 3: AI ኣብ ዕለታዊ ህይወት',
      am: '30-ቀን AI ኮርስ — ቀን 3: AI በዕለት ተዕለት ህይወት'
    },
    category: 'ai',
    pages: 11,
    size: '3.1 MB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'How AI already runs your day — recommendation systems, voice assistants, maps, smart homes, healthcare wearables, banking fraud detection, and hidden AI you never notice — by Awet G. Nway.',
      ti: 'AI ዕለታዊ ህይወትካ ብኸምዚ ይዛወርዎ — ናይ ምምኻር ስርዓታት፣ ናይ ድምጺ ሓጋዚ፣ ካርታ፣ ብልሃተኛ ገዛ፣ ናይ ጥዕና ዌርብልስ — ብ Awet G. Nway።',
      am: 'AI ቀናዊ ህይወትዎን ቀድሞ እንዴት እንደሚያስተዳድር — የምክረ ሥርዓቶች፣ የድምጽ ረዳቶች፣ ካርታዎች፣ ብልህ ቤቶች፣ ጤና ዌርብልስ — በ Awet G. Nway።'
    },
    file: 'pdfs/ai-30day-day03-ai-in-daily-life.pdf',
    color: '#ec4899',
    preview: true
  },
  {
    id: 'ai-30day-day04-machine-learning-basics',
    title: {
      en: '30-Day AI Course — Day 4: Machine Learning Basics',
      ti: '30-መዓልቲ AI ኮርስ — መዓልቲ 4: መሰረታዊ ናይ ማሽን ለርኒን',
      am: '30-ቀን AI ኮርስ — ቀን 4: የማሽን ለርኒንግ መሰረታዊ ነገሮች'
    },
    category: 'ai',
    pages: 9,
    size: '2.8 MB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'How computers learn from data without being told the rules. Covers supervised vs unsupervised vs reinforcement learning, the 6-step ML workflow, overfitting/underfitting, and algorithm selection cheat sheet — by Awet G. Nway.',
      ti: 'ኮምፕዩተር ብዘይ ዝተነግሮ ሕጊ ካብ ዳታ ከመይ ይመሃር። supervised vs unsupervised vs reinforcement learning፣ 6-ስጉምቲ ML workflow — ብ Awet G. Nway።',
      am: 'ደንቡ ሳይነገረው ኮምፒዩተር ከዳታ እንዴት እንደሚማር። supervised vs unsupervised vs reinforcement learning፣ 6-ደረጃ ML workflow — በ Awet G. Nway።'
    },
    file: 'pdfs/ai-30day-day04-machine-learning-basics.pdf',
    color: '#ec4899',
    preview: true
  },
  {
    id: 'ai-30day-day05-deep-learning-neural-networks',
    title: {
      en: '30-Day AI Course — Day 5: Deep Learning & Neural Networks',
      ti: '30-መዓልቲ AI ኮርስ — መዓልቲ 5: ዲፕ ለርኒን ን ኒውራል ኔትወርክስ',
      am: '30-ቀን AI ኮርስ — ቀን 5: ዲፕ ለርኒንግ እና ነርቭ አውታረ መረቦች'
    },
    category: 'ai',
    pages: 8,
    size: '1.7 MB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'The engine behind ChatGPT, self-driving cars & image generation. Covers biological vs artificial neurons, backpropagation, activation functions (Sigmoid/ReLU/Tanh), CNN/RNN-LSTM/Transformer families, and the AlexNet milestone — by Awet G. Nway.',
      ti: 'ኣብ ድሕሪ ChatGPT፣ self-driving cars ን image generation ዘሎ ሞተር። biological vs artificial neurons፣ backpropagation፣ CNN/RNN/Transformer — ብ Awet G. Nway።',
      am: 'ከ ChatGPT፣ ራስ-ሰር መኪናዎች እና ምስል ፈጠራ ጀርባ ያለው ሞተር። ባዮሎጂካል vs አርቲፊሻል ነርቭ፣ backpropagation፣ CNN/RNN/Transformer — በ Awet G. Nway።'
    },
    file: 'pdfs/ai-30day-day05-deep-learning-neural-networks.pdf',
    color: '#ec4899',
    preview: true
  },
  {
    id: 'ai-30day-day06-generative-ai',
    title: {
      en: '30-Day AI Course — Day 6: Generative AI',
      ti: '30-መዓልቲ AI ኮርስ — መዓልቲ 6: ጀነሬቲቭ AI',
      am: '30-ቀን AI ኮርስ — ቀን 6: ጀነሬቲቭ AI'
    },
    category: 'ai',
    pages: 8,
    size: '1.2 MB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'How AI creates text, images, audio & video from a prompt. Covers discriminative vs generative AI, LLM token generation, diffusion models, the 5-ingredient prompt formula, real-world use cases, and risks (hallucination/deepfakes/bias) — by Awet G. Nway.',
      ti: 'AI ካብ prompt ጽሑፍ፣ ስእሊ፣ ድምጺ ን ቪዲዮ ከመይ ይፈጥር። LLM token generation፣ diffusion models፣ 5-ነጥቢ prompt formula — ብ Awet G. Nway።',
      am: 'AI ከ prompt ጽሑፍ፣ ምስል፣ ድምጽ እና ቪዲዮ እንዴት እንደሚፈጥር። LLM token generation፣ diffusion models፣ 5-ንጥረ ነገር prompt formula — በ Awet G. Nway።'
    },
    file: 'pdfs/ai-30day-day06-generative-ai.pdf',
    color: '#ec4899',
    preview: true
  },
  {
    id: 'ai-30day-day07-llms-in-depth',
    title: {
      en: '30-Day AI Course — Day 7: Large Language Models In Depth',
      ti: '30-መዓልቲ AI ኮርስ — መዓልቲ 7: ናይ ዓቢ ቋንቋ ሞዴላት ኣብ ዕምቆት',
      am: '30-ቀን AI ኮርስ — ቀን 7: ትልልቅ የቋንቋ ሞዴሎች በጥልቀት'
    },
    category: 'ai',
    pages: 8,
    size: '1.2 MB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'The engine behind ChatGPT, Claude & Gemini explained properly. Covers transformer architecture, self-attention, the 3-stage training pipeline (pretraining/SFT/RLHF), major LLM families of 2026, context windows, RAG, and model size selection — by Awet G. Nway.',
      ti: 'ኣብ ድሕሪ ChatGPT፣ Claude ን Gemini ዘሎ ሞተር ብኽብረት ተገሊጹ። Transformer architecture፣ self-attention፣ 3-ደረጃ training (pretraining/SFT/RLHF)፣ ናይ 2026 ዓቢ LLM ስድራ — ብ Awet G. Nway።',
      am: 'ከ ChatGPT፣ Claude እና Gemini ጀርባ ያለው ሞተር በትክክል ተብራርቷል። Transformer architecture፣ self-attention፣ 3-ደረጃ training፣ የ2026 ዋና LLM ቤተሰቦች፣ context windows፣ RAG — በ Awet G. Nway።'
    },
    file: 'pdfs/ai-30day-day07-llms-in-depth.pdf',
    color: '#ec4899',
    preview: true
  },
  {
    id: 'ai-30day-day08-computer-vision',
    title: {
      en: '30-Day AI Course — Day 8: Computer Vision in Practice',
      ti: '30-መዓልቲ AI ኮርስ — መዓልቲ 8: ኮምፕዩተር ቪዥን ኣብ ግብሪ',
      am: '30-ቀን AI ኮርስ — ቀን 8: ኮምፒዩተር ቪዥን በተግባር'
    },
    category: 'ai',
    pages: 8,
    size: '1.2 MB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'How AI sees the world — from phone cameras to self-driving cars. Covers the 6-stage vision pipeline, 4 core tasks (classification/detection/segmentation/pose), CNNs vs Vision Transformers, factory defect inspection, medical imaging, and edge vs cloud AI — by Awet G. Nway.',
      ti: 'AI ዓለም ከመይ ይርእያ — ካብ ናይ ስልኪ ካሜራ ክሳብ ናይ ርእሰ-ምራሕ መኪናታት። 6-ደረጃ vision pipeline፣ CNN vs Vision Transformer፣ ናይ ፋብሪካ ምክትታል — ብ Awet G. Nway።',
      am: 'AI ዓለምን ከምዴት ያያት — ከስልክ ካሜራ እስከ ራስ-ሰር መኪናዎች። 6-ደረጃ vision pipeline፣ CNN vs Vision Transformer፣ የፋብሪካ ጉድለት ምርመራ — በ Awet G. Nway።'
    },
    file: 'pdfs/ai-30day-day08-computer-vision.pdf',
    color: '#ec4899',
    preview: true
  },
  {
    id: 'ai-30day-day10-neural-networks',
    title: {
      en: '30-Day AI Course — Day 10: Neural Networks — The Building Blocks of Deep Learning',
      ti: '30-መዓልቲ AI ኮርስ — መዓልቲ 10: ናይ Neural Networks — ናይ Deep Learning መሰረታዊ ኣካላት',
      am: '30-ቀን AI ኮርስ — ቀን 10: Neural Networks — የDeep Learning መሰረት ብሎኮች'
    },
    category: 'ai',
    pages: 9,
    size: '1.3 MB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Biological vs artificial neurons, perceptron formula, feedforward networks (MLP), activation functions (Sigmoid, ReLU, Tanh, Softmax, GELU), backpropagation, gradient descent, and hands-on Python exercises — by Awet G. Nway.',
      ti: 'ናይ ባዮሎጂካልን ናይ ሰብ ሰርሖን ኒዩሮን፣ ናይ perceptron ቀመር፣ feedforward networks (MLP)፣ activation functions (ReLU, Sigmoid, Tanh)፣ backpropagation፣ gradient descent፣ ናይ Python ልምምዳት — ብ Awet G. Nway።',
      am: 'ባዮሎጂካል እና ሰው-ሰራሽ ኒውሮን፣ perceptron ቀመር፣ feedforward networks (MLP)፣ activation functions (ReLU, Sigmoid, Tanh)፣ backpropagation፣ gradient descent፣ እና Python ልምምዶች — በ Awet G. Nway።'
    },
    file: 'pdfs/ai-30day-day10-neural-networks.pdf',
    color: '#ec4899',
    preview: true
  },
  {
    id: 'fit-hub-day01-welcome-30day-transformation',
    title: {
      en: 'AYE Fit Hub — Day 1: Welcome to Your 30-Day Transformation',
      ti: 'AYE Fit Hub — መዓልቲ 1: ናብ 30-መዓልቲ ምቕያርካ ንቑሕ ኩን',
      am: 'AYE Fit Hub — ቀን 1: ወደ 30-ቀን ለውጥህ እንኳን ደህና መጣህ'
    },
    category: 'fit-hub',
    pages: 5,
    size: '85 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Kick off your 30-day fitness journey: program overview, body baseline measurements guide, foundation strength circuit workout, core principles, and Day 1 self-check question — by Awet G. Nway.',
      ti: 'ናይ 30-መዓልቲ ናይ ጥዕና መገዲ ጀምር: ናይ ፕሮግራም ክልሰ-ሓሳብ፣ ናይ ሰውነት baseline ዕቐባ ምምዕዳው፣ ናይ ሓቕነት ጉልበት ወርክ ኣውት — ብ Awet G. Nway።',
      am: '30-ቀን የአካላዊ ብቃት ጉዞህን ጀምር: የፕሮግራም አጠቃላይ እይታ፣ የሰውነት baseline ልኬቶች ማብሪያ፣ የመሰረት ጥንካሬ ዙር ልምምድ፣ ዋና መርሆዎች — በ Awet G. Nway።'
    },
    file: 'pdfs/aye-fit-hub-day01-welcome-30day-transformation.pdf',
    color: '#00d4ff',
    preview: true
  },
  {
    id: 'fit-hub-day02-hiit-101-fat-burning',
    title: {
      en: 'AYE Fit Hub — Day 2: HIIT 101 – The Science of Fat Burning in 20 Minutes',
      ti: 'AYE Fit Hub — መዓልቲ 2: HIIT 101 – ሳይንስ ናይ ምቃጻል ስብሒ ኣብ 20 ደቓይቕ',
      am: 'AYE Fit Hub — ቀን 2: HIIT 101 – የስብ ማቃጠል ሳይንስ በ20 ደቂቃ'
    },
    category: 'fit-hub',
    pages: 6,
    size: '90 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'What HIIT is, why EPOC burns fat for 24 hours after training, the four HIIT formats (Work:Rest, Tabata, EMOM, AMRAP), a 20-minute no-equipment fat-burning circuit, cool-down, and quick reference rules — by Awet G. Nway.',
      ti: 'HIIT እንታይ ምዃኑ፣ ስለምንታይ EPOC ድሕሪ ናይ ምስልጣን ንልዕሊ 24 ሰዓት ስብሒ ይቃጸሎ፣ ናይ 20-ደቓይቕ ወርክኣውት — ብ Awet G. Nway።',
      am: 'HIIT ምንድነው፣ EPOC ለ24 ሰዓት ስብ የሚያቃጥለው ለምን፣ 4 የHIIT ቅርጾች፣ 20-ደቂቃ ወርክኣውት — በ Awet G. Nway።'
    },
    file: 'pdfs/aye-fit-hub-day02-hiit-101-fat-burning.pdf',
    color: '#f97316',
    preview: true
  },
  {
    id: 'fit-hub-day03-core-anatomy',
    title: {
      en: 'AYE Fit Hub — Day 3: Core Anatomy – Why Your Core Is More Than Abs',
      ti: 'AYE Fit Hub — መዓልቲ 3: Core Anatomy – ስለምንታይ ናይ ሰውነትካ ማእከል ካብ Abs ዝበዝሕ ምዃኑ',
      am: 'AYE Fit Hub — ቀን 3: Core Anatomy – ኮርህ ከምብቶ አብስ የበለጠ የሆነው ለምን'
    },
    category: 'fit-hub',
    pages: 5,
    size: '92 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Complete core muscle anatomy (9 muscle groups), bracing vs sucking-in technique, 7-exercise core foundation circuit, lower back pain prevention, and breathing mechanics — by Awet G. Nway.',
      ti: 'ናይ core ጭዋዳ anatomy (9 ጉጅለታት ጭዋዳ)፣ bracing vs sucking-in ቴክኒክ፣ 7 ናይ ልምምድ core circuit — ብ Awet G. Nway።',
      am: 'የcore ጡንቻ anatomy (9 ጡንቻ ቡድኖች)፣ bracing vs sucking-in ቴክኒክ፣ 7 ናቸው core circuit ልምምድ — በ Awet G. Nway።'
    },
    file: 'pdfs/aye-fit-hub-day03-core-anatomy.pdf',
    color: '#a78bfa',
    preview: true
  },
  {
    id: 'fit-hub-day04-home-workout-setup',
    title: {
      en: 'AYE Fit Hub — Day 4: Home Workout Setup – No Equipment, No Excuses',
      ti: 'AYE Fit Hub — መዓልቲ 4: ናይ ገዛ ወርክኣውት ምቕራብ – ብዘይ ናውቲ፣ ብዘይ ምኽኒት',
      am: 'AYE Fit Hub — ቀን 4: የቤት ልምምድ ዝግጅት – ምንም መሳሪያ የለም፣ ምክንያት የለም'
    },
    category: 'fit-hub',
    pages: 5,
    size: '93 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Home training space checklist, exercise substitution table (easier & harder versions), 8-exercise full-body circuit, weekly training template for Days 1–7, and common excuses answered — by Awet G. Nway.',
      ti: 'ናይ ገዛ ምስልጣን ቦታ checklist፣ ናይ ምትካእ ልምምዳት ሰንጠረጽ፣ 8 ናይ ምሉእ ሰውነት circuit — ብ Awet G. Nway።',
      am: 'የቤት ልምምድ ቦታ checklist፣ የልምምድ substitution ሰንጠረዥ፣ 8 ልምምድ full-body circuit — በ Awet G. Nway።'
    },
    file: 'pdfs/aye-fit-hub-day04-home-workout-setup.pdf',
    color: '#22c55e',
    preview: true
  },
  {
    id: 'fit-hub-day05-nutrition-basics-macros',
    title: {
      en: 'AYE Fit Hub — Day 5: Nutrition Basics – Macros Made Simple',
      ti: 'AYE Fit Hub — መዓልቲ 5: መሰረታዊ ምግቢ – Macros ብቐሊሉ',
      am: 'AYE Fit Hub — ቀን 5: የምግብ መሰረታዊ ነገሮች – Macros በቀላሉ'
    },
    category: 'fit-hub',
    pages: 5,
    size: '94 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'The three macronutrients explained, TDEE calculation, calorie targets by goal, protein targets by bodyweight, daily meal template, plate method, and nutrition quick reference rules — by Awet G. Nway.',
      ti: 'ሰለስቲኦም macronutrients ብምብራህ፣ TDEE ሕሳብ፣ ናይ ካሎሪ ዕላማ፣ ናይ ዕለታዊ ምግቢ template — ብ Awet G. Nway።',
      am: 'ሶስቱ macronutrients ማብራሪያ፣ TDEE ስሌት፣ የካሎሪ ዒላማ በግብ፣ የዕለት ምግብ template — በ Awet G. Nway።'
    },
    file: 'pdfs/aye-fit-hub-day05-nutrition-basics-macros.pdf',
    color: '#eab308',
    preview: true
  },
  {
    id: 'fit-hub-day06-mindset-shift',
    title: {
      en: 'AYE Fit Hub — Day 6: The Mindset Shift – From Wanting to Doing',
      ti: 'AYE Fit Hub — መዓልቲ 6: ናይ ሓሳብ ምቕያር – ካብ ምደላይ ናብ ምግባር',
      am: 'AYE Fit Hub — ቀን 6: የአዕምሮ ለውጥ – ከመፈለግ ወደ ማድረግ'
    },
    category: 'fit-hub',
    pages: 5,
    size: '91 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Why motivation fails, identity vs motivation comparison, the habit loop, implementation intentions, environment design, 5-minute daily mindset routine, and defeating inner excuses — by Awet G. Nway.',
      ti: 'ስለምንታይ motivation ዘይሰርሕ፣ identity vs motivation፣ ናይ habit loop፣ ምምቕራጽ ቦታ፣ ናይ 5-ደቓይቕ ናይ ዕለት mindset routine — ብ Awet G. Nway።',
      am: 'motivation ለምን እንደሚወድቅ፣ identity vs motivation፣ habit loop፣ አካባቢ ዲዛይን፣ 5-ደቂቃ ዕለታዊ mindset routine — በ Awet G. Nway።'
    },
    file: 'pdfs/aye-fit-hub-day06-mindset-shift.pdf',
    color: '#a78bfa',
    preview: true
  },
  {
    id: 'fit-hub-day07-recovery-active-rest',
    title: {
      en: 'AYE Fit Hub — Day 7: Recovery Day – Active Rest That Speeds Progress',
      ti: 'AYE Fit Hub — መዓልቲ 7: መዓልቲ ምሕዳስ – ንቑሕ ዕረፍቲ ምምሕያሽ ዝቐልጥፍ',
      am: 'AYE Fit Hub — ቀን 7: የማገገሚያ ቀን – ሂደቱን የሚያፋጥን ንቁ እረፍት'
    },
    category: 'fit-hub',
    pages: 5,
    size: '93 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Science of muscle repair, recovery timeline, sleep optimisation guide, 25-min active recovery routine, Week 1 progress review table, Week 2 preview, and self-check — by Awet G. Nway.',
      ti: 'ሳይንስ ናይ ጭዋዳ ጽገና፣ ናይ ምሕዳስ ጊዜ ሰሌዳ፣ ናይ ድቃስ ምምሕያሽ፣ 25-ደቓይቕ ናይ active recovery — ብ Awet G. Nway።',
      am: 'የጡንቻ ጥገና ሳይንስ፣ የማገገሚያ ጊዜ ሰሌዳ፣ የእንቅልፍ ማሻሻያ፣ 25-ደቂቃ active recovery routine — በ Awet G. Nway።'
    },
    file: 'pdfs/aye-fit-hub-day07-recovery-active-rest.pdf',
    color: '#00d4ff',
    preview: true
  },
  {
    id: 'fit-hub-day08-progressive-overload',
    title: {
      en: 'AYE Fit Hub — Day 8: Progressive Overload – The Secret to Never Plateauing',
      ti: 'AYE Fit Hub — መዓልቲ 8: Progressive Overload – ምስጢር ናይ ዘይምቁራጽ ምምሕያሽ',
      am: 'AYE Fit Hub — ቀን 8: Progressive Overload – ሁልጊዜ እየሻሻልኩ ለሚሉ ምስጢር'
    },
    category: 'fit-hub',
    pages: 5,
    size: '95 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'The 5 methods of progressive overload, Week 1 vs Week 2 training comparison, 8-exercise Build Phase circuit with harder variants, volume tracking system, and the 10% rule — by Awet G. Nway.',
      ti: 'ሓሙሽተ ኣገባባት ናይ progressive overload፣ Week 1 vs Week 2 ምምስስሳል፣ 8 ናይ Build Phase ልምምዳት — ብ Awet G. Nway።',
      am: '5 የprogressive overload ዘዴዎች፣ Week 1 vs Week 2 ማወዳደሪያ፣ 8 ልምምድ Build Phase circuit — በ Awet G. Nway።'
    },
    file: 'pdfs/aye-fit-hub-day08-progressive-overload.pdf',
    color: '#22c55e',
    preview: true
  },
  {
    id: 'fit-hub-day09-tabata-training',
    title: {
      en: 'AYE Fit Hub — Day 9: Tabata Training – 4 Minutes That Change Everything',
      ti: 'AYE Fit Hub — መዓልቲ 9: Tabata ልምምድ – 4 ደቓይቕ ዘቕይራ ኩሉ',
      am: 'AYE Fit Hub — ቀን 9: Tabata ስልጠና – ሁሉን የሚቀይሩ 4 ደቂቃዎች'
    },
    category: 'fit-hub',
    pages: 5,
    size: '95 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'The 1996 Izumi Tabata study, HIIT vs Tabata vs EMOM comparison, 3-block Tabata session (Jump Squat, Push-Up, Burpee — 8×20/10), cool-down, and quick reference card — by Awet G. Nway.',
      ti: '1996 Izumi Tabata ምርምር፣ HIIT vs Tabata vs EMOM ምምስስሳል፣ 3 ናይ Tabata ብሎካት (Jump Squat, Push-Up, Burpee — 8×20/10) — ብ Awet G. Nway።',
      am: '1996 Izumi Tabata ጥናት፣ HIIT vs Tabata vs EMOM ማወዳደሪያ፣ 3 Tabata ብሎኮች (Jump Squat, Push-Up, Burpee — 8×20/10) — በ Awet G. Nway።'
    },
    file: 'pdfs/aye-fit-hub-day09-tabata-training.pdf',
    color: '#f97316',
    preview: true
  },
  {
    id: 'fit-hub-day10-flexibility-fundamentals',
    title: {
      en: 'Day 10: Flexibility Fundamentals — Mobility for Athletes',
      ti: 'ቀን 10: ናይ ጽዕነት መሰረታት — ሞቢሊቲ ንኣትሌታት',
      am: 'ቀን 10: የተለጣጠፍነት መሰረቶች — ለስፖርተኞች ሞቢሊቲ'
    },
    category: 'fit-hub',
    pages: 4,
    size: '120 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Flexibility vs mobility explained, the science of how muscles stretch (muscle spindle & GTO), 4 stretching types with diagrams, a 10-exercise full-body routine, the 7 key tight zones, and a flexibility progression plan — by Awet G. Nway.',
      ti: 'Flexibility vs mobility ምምስስሳል፣ ሳይንስ ናይ ጽዕነት፣ 4 ዓይነታት ናይ stretching፣ 10 ናይ ምሉእ ሰውነት ልምምድ፣ 7 ቀንዲ ዝጠቀጥቁ ቦታታት — ብ Awet G. Nway።',
      am: 'Flexibility vs mobility ማብራሪያ፣ ጡንቻ እንዴት እንደሚዘረጋ ሳይንስ፣ 4 ዓይነት ዘርጋታዎች፣ 10 ሙሉ ሰውነት ልምምዶች፣ 7 ቁልፍ ጥብቅ አካባቢዎች — በ Awet G. Nway።'
    },
    file: 'pdfs/aye-fit-hub-day10-flexibility-fundamentals.pdf',
    color: '#22c55e',
    preview: true
  },
  {
    id: 'fit-hub-day11-meal-prep-mastery',
    title: {
      en: 'Day 11: Meal Prep Mastery — Cook Once, Eat All Week',
      ti: 'ቀን 11: ናይ ምቅርራብ ምግቢ ጥበብ — ሓንሳብ ሰርሕ፣ ምሉእ ሰሙን ብላዕ',
      am: 'ቀን 11: የምግብ ዝግጅት ጥበብ — አንድ ጊዜ ብሰርሃ፣ ሳምንቱን ሙሉ ብላ'
    },
    category: 'fit-hub',
    pages: 4,
    size: '120 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Why meal prep eliminates diet failure, the 5-step batch cooking system, best proteins/carbs/veg to prep in bulk, the container macro method (35/35/30), a sample 7-day plan, and safe food storage times — by Awet G. Nway.',
      ti: 'ናይ ምቅርራብ ምግቢ 5 ስጉምቲ ስርዓት፣ ዝበለጸ proteins/carbs/veg ኣብ bulk፣ ናይ container macro method (35/35/30)፣ ናይ 7-ቀን ውጥን — ብ Awet G. Nway።',
      am: 'ምግብ ቅድሚያ ማዘጋጀት 5 ደረጃ ሥርዓት፣ ምርጥ proteins/carbs/veg ብብዛት፣ container macro method (35/35/30)፣ 7-ቀን ዕቅድ — በ Awet G. Nway።'
    },
    file: 'pdfs/aye-fit-hub-day11-meal-prep-mastery.pdf',
    color: '#22c55e',
    preview: true
  },
  {
    id: 'fit-hub-day12-sleep-and-recovery',
    title: {
      en: 'Day 12: Sleep & Recovery — The Overlooked Performance Tool',
      ti: 'ቀን 12: ድቃስን ምሕዳስን — ዝዝንጋዕ ናይ ፈጻምነት መሳርሒ',
      am: 'ቀን 12: እንቅልፍ እና ማገገም — የተዘነጋው የአፈጻጸም መሳሪያ'
    },
    category: 'fit-hub',
    pages: 4,
    size: '120 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Why sleep is your #1 performance drug, the 5 sleep stages and what each repairs, HGH/testosterone/cortisol hormone timeline, 10 science-backed sleep hygiene habits, and a Day 12 active recovery protocol — with diagrams — by Awet G. Nway.',
      ti: 'ድቃስ ቀንዲ ናይ ፈጻምነት መሳርሒ ምዃኑ፣ ሓምሸቲኦም ናይ ድቃስ ደረጃታት፣ HGH/testosterone/cortisol፣ 10 ናይ ድቃስ ልምምዲ — ብ Awet G. Nway።',
      am: 'እንቅልፍ ቁ.1 የአፈጻጸም መሳሪያ ምን ምክንያት፣ 5 የእንቅልፍ ደረጃዎች፣ HGH/testosterone/cortisol ሆርሞኖች፣ 10 የእንቅልፍ ጤና ልምዶች — በ Awet G. Nway።'
    },
    file: 'pdfs/aye-fit-hub-day12-sleep-and-recovery.pdf',
    color: '#22c55e',
    preview: true
  },
  {
    id: 'fit-hub-day13-upper-body-power',
    title: {
      en: 'Day 13: Upper Body Power — Push, Pull, Press',
      ti: 'ቀን 13: ናይ ላዕሊ ሰውነት ሓይሊ — Push, Pull, Press',
      am: 'ቀን 13: የላይ ሰውነት ኃይል — Push, Pull, Press'
    },
    category: 'fit-hub',
    pages: 4,
    size: '120 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'The push-pull-press principle, upper body muscle anatomy (chest/shoulders/back/biceps/triceps/rotator cuff), Day 13 workout (9 exercises with form cues and no-equipment alternatives), progressive overload staircase, and 6 common upper body mistakes — with diagrams — by Awet G. Nway.',
      ti: 'Push-pull-press principle፣ ናይ ላዕሊ ሰውነት ጭዋዳ anatomy፣ 9 ናይ Day 13 ልምምዳት፣ progressive overload staircase — ብ Awet G. Nway።',
      am: 'Push-pull-press principle፣ የላይ ሰውነት ጡንቻ anatomy፣ 9 ናይ Day 13 ልምምዶች፣ progressive overload staircase — በ Awet G. Nway።'
    },
    file: 'pdfs/aye-fit-hub-day13-upper-body-power.pdf',
    color: '#22c55e',
    preview: true
  },
  {
    id: 'fit-hub-day14-week2-checkin',
    title: {
      en: 'Day 14: Week 2 Check-In — Celebrate Progress, Adjust Plan',
      ti: 'ቀን 14: ናይ ሰሙን 2 ምግምጋም — ዕቱብ ምዕባለ፣ ውጥን ምምሕያሽ',
      am: 'ቀን 14: ሳምንት 2 ምዘና — ዕቀድ ማክበር፣ ዕቅድ ማስተካከል'
    },
    category: 'fit-hub',
    pages: 4,
    size: '120 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Why celebrating small wins rewires the brain, 7-domain progress wheel (energy/strength/body composition/sleep/nutrition/recovery/mental focus), 7-domain Week 2 audit table, plateau problem and fixes diagram (6 causes with specific solutions), Week 3 performance targets diagram (5 domains current vs target), adaptive plan adjustments, and 7-day Week 3 schedule — with diagrams — by Awet G. Nway.',
      ti: '7-domain progress wheel፣ 7-domain Week 2 audit table፣ plateau problem diagram (6 causes + fixes)፣ Week 3 targets diagram፣ 7-day Week 3 schedule — ብ Awet G. Nway።',
      am: '7-domain progress wheel፣ 7-domain Week 2 audit table፣ plateau problem diagram (6 causes + fixes)፣ Week 3 targets diagram፣ 7-day Week 3 schedule — በ Awet G. Nway።'
    },
    file: 'pdfs/aye-fit-hub-day14-week2-checkin.pdf',
    color: '#22c55e',
    preview: true
  },
  {
    id: 'fit-hub-day15-emom-amrap',
    title: {
      en: 'Day 15: EMOM & AMRAP — Train Like an Athlete',
      ti: 'መዓልቲ 15: EMOM & AMRAP — ከም ኣትሌት ተለማመዱ',
      am: 'ቀን 15: EMOM & AMRAP — እንደ ስፖርተኛ ይለምዱ'
    },
    category: 'fit-hub',
    pages: 4,
    size: '112 KB',
    downloads: '0',
    badge: 'NEW',
    description: {
      en: 'EMOM 6-minute timing diagram (work/rest blocks per minute with movement labels), AMRAP 15-min clock + weekly scoring tracker diagram, 3-format comparison diagram (Traditional Sets vs EMOM vs AMRAP), EMOM rules table, AMRAP rules table, 20-min alternating EMOM workout (push-up shoulder tap/jump squat), 15-min AMRAP benchmark workout with 4-week score tracker, and 4-mistake guide — by Awet G. Nway.',
      ti: 'EMOM 6-minute timing diagram (work/rest blocks)፣ AMRAP clock + weekly score tracker diagram፣ 3-format comparison diagram (Traditional/EMOM/AMRAP)፣ EMOM rules table፣ 20-min EMOM workout፣ 15-min AMRAP benchmark with score tracker — ብ Awet G. Nway።',
      am: 'EMOM 6-minute timing diagram (work/rest blocks)፣ AMRAP clock + weekly score tracker diagram፣ 3-format comparison diagram (Traditional/EMOM/AMRAP)፣ EMOM rules table፣ 20-min EMOM workout፣ 15-min AMRAP benchmark with score tracker — በ Awet G. Nway።'
    },
    file: 'pdfs/aye-fit-hub-day15-emom-amrap.pdf',
    color: '#00d4ff',
    preview: true
  },
  {
    id: 'fit-hub-day16-lower-body-flexibility',
    title: {
      en: 'Day 16: Lower Body Flexibility — Hips, Hamstrings, IT Band',
      ti: 'መዓልቲ 16: ታሕተዋይ ሰውነት ምስፋሕ — ሂፕ፣ ሃምስትሪንግ፣ IT Band',
      am: 'ቀን 16: የታችኛው አካል ተጣጣፊነት — ዳሌ፣ ሃምስትሪንግ፣ IT ባንድ'
    },
    category: 'fit-hub',
    pages: 8,
    size: '39 KB',
    downloads: '0',
    badge: 'NEW',
    description: {
      en: 'Anatomy of 5 lower body muscle groups (hip flexors, hamstrings, IT band, adductors, piriformis), hip flexor 6-stretch protocol with holds and cues, progressive hamstring protocol (beginner to PNF), IT band foam-roll approach with evidence table, adductor and piriformis stretches, complete 30-minute routine timeline diagram, stretch-type effectiveness bar chart, 6-week progression plan, flexibility benchmarks, and the neuroscience of flexibility (GTO, spindle reflex, PNF) — by Awet G. Nway.',
      ti: 'ናይ 5 ታሕተዋይ ሰውነት ጭዋዳ ሃናጺ፣ ሂፕ ፍሌክሰር 6 ዓይነት ምስፋሕ፣ ሃምስትሪንግ ፕሮቶኮል (ምጅማሪ ክሳብ PNF)፣ IT Band ፎም-ሮል ሜቶድ፣ 30-ደቒቕ ሩቲን diagram፣ 6-ሰሙን ፕሮግረሽን — ብ Awet G. Nway።',
      am: 'የ5 የታችኛው አካል ጡንቻ ቅርፅ፣ ዳሌ ፍሌክሰር 6 ዓይነት ዘዴ፣ ሃምስትሪንግ ፕሮቶኮል (ጀማሪ እስከ PNF)፣ IT Band ፎም-ሮል አቀራረብ፣ 30-ደቂቃ ሩቲን diagram፣ 6-ሳምንት ፕሮግረሽን — በ Awet G. Nway።'
    },
    file: 'pdfs/aye-fit-hub-day16-lower-body-flexibility.pdf',
    color: '#14b8a6',
    preview: true
  },
  {
    id: 'fit-hub-day17-protein-and-muscle',
    title: {
      en: 'Day 17: Protein & Muscle — How Much, When, and Why',
      ti: 'መዓልቲ 17: ፕሮቲን ን ጭዋዳ — ክንደይ፣ መዓዝ፣ ን\'ምንታይ',
      am: 'ቀን 17: ፕሮቲን እና ጡንቻ — ምን ያህል፣ መቼ፣ እና ለምን'
    },
    category: 'fit-hub',
    pages: 7,
    size: '25 KB',
    downloads: '0',
    badge: 'NEW',
    description: {
      en: 'MPS cycle diagram (Protein→Amino Acids→mTOR→Muscle), MPS vs dose bar chart (10g to 50g+), protein timing day diagram (4 meals with grams), protein intake table by goal (6 rows), MPS per meal dose research table, protein timing research table (5 timing questions), 11 protein sources ranked (whey to quinoa with leucine/digestibility), practical hitting-target strategies table, protein myths busted table (5 myths), 5-step action plan — by Awet G. Nway.',
      ti: 'MPS cycle diagram፣ MPS vs dose bar chart (10g–50g+)፣ protein timing day diagram (4 meals)፣ protein intake by goal table (6 rows)፣ timing research table (5 questions)፣ 11 protein sources ranked (whey to quinoa)፣ practical strategies table፣ protein myths table (5 myths) — ብ Awet G. Nway።',
      am: 'MPS cycle diagram፣ MPS vs dose bar chart (10g–50g+)፣ protein timing day diagram (4 meals)፣ protein intake by goal table (6 rows)፣ timing research table (5 questions)፣ 11 protein sources ranked (whey to quinoa)፣ practical strategies table፣ protein myths table (5 myths) — በ Awet G. Nway።'
    },
    file: 'pdfs/aye-fit-hub-day17-protein-and-muscle.pdf',
    color: '#00d4ff',
    preview: true
  },
  {
    id: 'ai-curriculum-001-intro-to-ai',
    title: {
      en: 'AI-001: Introduction to Artificial Intelligence',
      ti: 'AI-001: መእተዊ ናብ Artificial Intelligence',
      am: 'AI-001: ወደ Artificial Intelligence መግቢያ'
    },
    category: 'ai-curriculum',
    pages: 5,
    size: '100 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'What AI is, the 70-year history from Turing to ChatGPT, Narrow vs General vs Super AI, the data-to-prediction pipeline, three learning types, and real AI applications in engineering — by Awet G. Nway.',
      ti: 'AI እንታይ ምዃኑ፣ ካብ Turing ክሳብ ChatGPT ናይ 70 ዓመት ታሪኽ፣ Narrow vs General vs Super AI፣ ናይ data-to-prediction pipeline — ብ Awet G. Nway።',
      am: 'AI ምን እንደሆነ፣ ከTuring እስከ ChatGPT 70 ዓመት ታሪክ፣ Narrow vs General vs Super AI፣ data-to-prediction pipeline — በ Awet G. Nway።'
    },
    file: 'pdfs/AI-001-Introduction-to-Artificial-Intelligence.pdf',
    color: '#6366f1',
    preview: true
  },
  {
    id: 'hvac-curriculum-001-intro-to-hvac',
    title: {
      en: 'HVAC-001: Introduction to HVAC Engineering',
      ti: 'HVAC-001: መእተዊ ናብ HVAC ምህንድስና',
      am: 'HVAC-001: ወደ HVAC ምህንድስና መግቢያ'
    },
    category: 'hvac',
    pages: 4,
    size: '100 KB',
    downloads: '0',
    badge: 'NEW',
    description: {
      en: 'What HVAC is, the four core functions, key components from compressors to chillers, the refrigeration cycle, HVAC system types, and career pathways in the MEP engineering industry — by Awet G. Nway.',
      ti: 'HVAC እንታይ ምዃኑ፣ ኣርባዕቲኦም መሰረታዊ ተግባራት፣ ካብ compressors ክሳብ chillers ዝበጽሑ ቁልፊ ኣካላት፣ refrigeration cycle — ብ Awet G. Nway።',
      am: 'HVAC ምን እንደሆነ፣ አራቱ ዋና ዋና ተግባራት፣ ከcondenser እስከ chiller ያሉ ቁልፍ ክፍሎች፣ refrigeration cycle — በ Awet G. Nway።'
    },
    file: 'pdfs/HVAC-001-Introduction-to-HVAC.pdf',
    color: '#22c55e',
    preview: true
  },
  {
    id: 'solar-curriculum-001-intro-to-solar',
    title: {
      en: 'SOLAR-001: Introduction to Solar Energy',
      ti: 'SOLAR-001: መእተዊ ናብ ሶላር ኢነርጂ',
      am: 'SOLAR-001: ወደ ፀሐይ ኃይል መግቢያ'
    },
    category: 'solar',
    pages: 4,
    size: '110 KB',
    downloads: '0',
    badge: 'NEW',
    description: {
      en: 'What solar energy is, the photovoltaic effect, the 5 core system components, off-grid vs on-grid vs hybrid system types, key engineering numbers, and solar career pathways — with diagrams — by Awet G. Nway.',
      ti: 'ሶላር ኢነርጂ እንታይ ምዃኑ፣ ናይ PV ስርዓት ኣካላት፣ off-grid vs on-grid vs hybrid ዓይነታት፣ ቁልፊ ናይ ምህንድስና ቁጽርታት — ብ Awet G. Nway።',
      am: 'ፀሐይ ኃይል ምን እንደሆነ፣ የPV ሥርዓት ክፍሎች፣ off-grid vs on-grid vs hybrid ዓይነቶች፣ ቁልፍ የምህንድስና ቁጥሮች — በ Awet G. Nway።'
    },
    file: 'pdfs/SOLAR-001-Introduction-to-Solar-Energy.pdf',
    color: '#fbbf24',
    preview: true
  },
  {
    id: 'plc-curriculum-001-intro-to-plc',
    title: {
      en: 'PLC-001: Introduction to PLC Programming',
      ti: 'PLC-001: መእተዊ ናብ PLC ፕሮግራሚን',
      am: 'PLC-001: ወደ PLC ፕሮግራሚንግ መግቢያ'
    },
    category: 'plc',
    pages: 4,
    size: '110 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'What a PLC is, the scan cycle, hardware architecture (CPU/I/O modules), IEC 61131-3 programming languages, ladder logic basics, industrial applications, and PLC career pathways — with diagrams — by Awet G. Nway.',
      ti: 'PLC እንታይ ምዃኑ፣ scan cycle፣ hardware ኣርኪቴክቸር፣ IEC 61131-3 ቋንቋታት፣ ladder logic መሰረታዊ — ብ Awet G. Nway።',
      am: 'PLC ምን እንደሆነ፣ scan cycle፣ hardware አርኪቴክቸር፣ IEC 61131-3 ቋንቋዎች፣ ladder logic መሰረታዊ — በ Awet G. Nway።'
    },
    file: 'pdfs/PLC-001-Introduction-to-PLC-Programming.pdf',
    color: '#22c55e',
    preview: true
  },
  {
    id: 'plc-curriculum-002-plc-hardware-deep-dive',
    title: {
      en: 'PLC-002: PLC Hardware Deep Dive',
      ti: 'PLC-002: PLC ሃርድወር ዕምቆት',
      am: 'PLC-002: PLC ሃርድዌር ጥልቅ ዳሰሳ'
    },
    category: 'plc',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'CPU architecture, memory types (ROM/EEPROM/RAM), I/O module types, sinking vs sourcing wiring, I/O addressing across 5 PLC brands, and power supply best practices — with diagrams — by Awet G. Nway.',
      ti: 'CPU ኣርኪቴክቸር፣ ዓይነታት ዝኽሪ፣ I/O module ዓይነታት፣ sinking vs sourcing ሽቦ፣ I/O ኣድራሻ ኣብ 5 ናይ PLC ብራንዳት — ብ Awet G. Nway።',
      am: 'CPU አርኪቴክቸር፣ የማህደረ ትውስታ ዓይነቶች፣ I/O module ዓይነቶች፣ sinking vs sourcing መስመር፣ I/O አድራሻ ለ5 PLC ብራንዶች — በ Awet G. Nway።'
    },
    file: 'pdfs/PLC-002-PLC-Hardware-Deep-Dive.pdf',
    color: '#22c55e',
    preview: true
  },
  {
    id: 'plc-curriculum-003-io-wiring-and-addressing',
    title: {
      en: 'PLC-003: I/O Wiring and Addressing',
      ti: 'PLC-003: ናይ I/O ሽቦን ኣድራሻን',
      am: 'PLC-003: I/O ሽቦ እና አድራሻ'
    },
    category: 'plc',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'NPN vs PNP sinking/sourcing wiring diagram, DI module specs, transistor vs relay DO types, 4-20 mA 2/3/4-wire analog wiring, Pt100/thermocouple connections, I/O addressing for 6 PLC brands (Siemens/AB/Mitsubishi/Omron/Schneider), and 7 wiring best practices — with diagrams — by Awet G. Nway.',
      ti: 'NPN vs PNP sinking/sourcing wiring፣ transistor vs relay DO፣ 4-20 mA analog wiring (2/3/4-wire)፣ I/O addressing ን 6 PLC brands — ብ Awet G. Nway።',
      am: 'NPN vs PNP sinking/sourcing wiring፣ transistor vs relay DO፣ 4-20 mA analog wiring (2/3/4-wire)፣ I/O addressing ለ6 PLC brands — በ Awet G. Nway።'
    },
    file: 'pdfs/PLC-003-IO-Wiring-and-Addressing.pdf',
    color: '#22c55e',
    preview: true
  },
  {
    id: 'plc-curriculum-004-ladder-logic-fundamentals',
    title: {
      en: 'PLC-004: Ladder Logic Fundamentals',
      ti: 'PLC-004: መሰረታዊ ናይ Ladder Logic',
      am: 'PLC-004: Ladder Logic መሰረታዊ'
    },
    category: 'plc',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'What Ladder Logic is and why it mirrors relay circuits, 7 basic symbols diagram (XIC/XIO/OTE/OTL/OTU/OSR/NEG), symbol comparison across Siemens/Allen-Bradley/Mitsubishi, Start/Stop motor control rung diagram, Seal-in (latching) circuit diagram with explanation, series/parallel/NOT logic table, 7 best practices, and 5 practice exercises — with diagrams — by Awet G. Nway.',
      ti: 'Ladder Logic ምዃኑ፣ 7 basic symbols diagram (XIC/XIO/OTE/OTL/OTU)፣ Start/Stop motor rung diagram፣ Seal-in circuit diagram፣ series/parallel logic table፣ 7 best practices — ብ Awet G. Nway።',
      am: 'Ladder Logic ምን እንደሆነ፣ 7 basic symbols diagram (XIC/XIO/OTE/OTL/OTU)፣ Start/Stop motor rung diagram፣ Seal-in circuit diagram፣ series/parallel logic table፣ 7 best practices — በ Awet G. Nway።'
    },
    file: 'pdfs/PLC-004-Ladder-Logic-Fundamentals.pdf',
    color: '#22c55e',
    preview: true
  },
  {
    id: 'plc-curriculum-005-timer-and-counter-instructions',
    title: {
      en: 'PLC-005: Timer and Counter Instructions',
      ti: 'PLC-005: Timer ን Counter መምርሒታት',
      am: 'PLC-005: Timer እና Counter ትእዛዞች'
    },
    category: 'plc',
    pages: 4,
    size: '118 KB',
    downloads: '0',
    badge: 'NEW',
    description: {
      en: 'Timer waveform diagrams (TON/TOF/RTO: IN signal vs Q output with PT bracket), ladder logic diagram (TON rung with Start/Stop contacts + CTU counter rung with sensor and reset), counter types diagram (CTU/CTD/CTUD parameters), timer/counter parameter tables, 7 real-world application examples, and 5-platform timer/counter syntax comparison — with 3 diagrams — by Awet G. Nway.',
      ti: 'TON/TOF/RTO timing waveform diagrams (IN vs Q vs PT)፣ TON timer ladder rung + CTU counter ladder rung diagrams፣ CTU/CTD/CTUD counter types diagram፣ 7 real-world applications table፣ 5-platform syntax comparison — ብ Awet G. Nway።',
      am: 'TON/TOF/RTO timing waveform diagrams (IN vs Q vs PT)፣ TON timer ladder rung + CTU counter ladder rung diagrams፣ CTU/CTD/CTUD counter types diagram፣ 7 real-world applications table፣ 5-platform syntax comparison — በ Awet G. Nway።'
    },
    file: 'pdfs/PLC-005-Timer-and-Counter-Instructions.pdf',
    color: '#22c55e',
    preview: true
  },
  {
    id: 'plc-curriculum-006-data-handling-and-move-instructions',
    title: {
      en: 'PLC-006: Data Handling & Move Instructions',
      ti: 'PLC-006: Data Handling ን Move መምርሒታት',
      am: 'PLC-006: Data Handling እና Move ትእዛዞች'
    },
    category: 'plc',
    pages: 6,
    size: '145 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'PLC memory organisation (BIT/BYTE/INT/DINT/REAL) with data-type size chart, MOV instruction data-flow diagram, FILL block-fill diagram, indirect addressing pointer diagram, MOV/FILL/COP/indirect addressing instruction tables (Siemens TIA Portal + Allen-Bradley), recipe array example with 4-step table, practice exercises, and lesson summary — 5 diagrams — by Awet G. Nway.',
      ti: 'PLC memory organisation data types diagram፣ MOV instruction data-flow diagram፣ FILL block-fill diagram፣ indirect addressing pointer diagram፣ MOV/FILL/COP instruction tables (TIA Portal + AB)፣ recipe array example፣ 5 exercises — ብ Awet G. Nway።',
      am: 'PLC memory organisation data types diagram፣ MOV instruction data-flow diagram፣ FILL block-fill diagram፣ indirect addressing pointer diagram፣ MOV/FILL/COP instruction tables (TIA Portal + AB)፣ recipe array example፣ 5 exercises — በ Awet G. Nway።'
    },
    file: 'pdfs/PLC-006-Data-Handling-and-Move-Instructions.pdf',
    color: '#22c55e',
    preview: true
  },
  {
    id: 'mep-curriculum-001-intro-to-mep',
    title: {
      en: 'MEP-001: Introduction to MEP Engineering',
      ti: 'MEP-001: መእተዊ ናብ MEP ምህንድስና',
      am: 'MEP-001: ወደ MEP ምህንድስና መግቢያ'
    },
    category: 'mep',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'NEW',
    description: {
      en: 'What MEP Engineering is, the three disciplines (Mechanical, Electrical, Plumbing), MEP in the construction process, key roles, international codes and standards, and MEP career pathways — with diagrams — by Awet G. Nway.',
      ti: 'MEP ምህንድስና እንታይ ምዃኑ፣ ሰለስቲኦም ዲሲፕሊናት (Mechanical, Electrical, Plumbing)፣ MEP ኣብ ህንጻ ስርዓት — ብ Awet G. Nway።',
      am: 'MEP ምህንድስና ምን እንደሆነ፣ ሦስቱ ዲሲፕሊኖች (ሜካኒካል፣ ኤሌክትሪካል፣ ፓምፒንግ)፣ ዓለም አቀፍ ኮዶች — በ Awet G. Nway።'
    },
    file: 'pdfs/MEP-001-Introduction-to-MEP-Engineering.pdf',
    color: '#0d9488',
    preview: true
  },
  {
    id: 'mep-curriculum-002-mep-in-building-construction',
    title: {
      en: 'MEP-002: MEP in Building Construction',
      ti: 'MEP-002: MEP ኣብ ህንጻ ኮንስትራክሽን',
      am: 'MEP-002: MEP በህንፃ ግንባታ ውስጥ'
    },
    category: 'mep',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'MEP coordination workflow (7 stages), the Rule of 10 (design vs site clash cost), MEP spatial zones (ceiling void, riser shaft, plant room, roof), drawing types (GA plans, schematics, schedules, as-builts), and MEP specification structure — with diagrams — by Awet G. Nway.',
      ti: 'MEP coordination workflow፣ ናይ MEP spatial zones (ceiling void, riser shaft, plant room)፣ drawing types፣ specification structure — ብ Awet G. Nway።',
      am: 'MEP coordination workflow፣ MEP spatial zones (ceiling void፣ riser shaft፣ plant room)፣ drawing types፣ specification structure — በ Awet G. Nway።'
    },
    file: 'pdfs/MEP-002-MEP-in-Building-Construction.pdf',
    color: '#0d9488',
    preview: true
  },
  {
    id: 'mep-curriculum-003-reading-mep-drawings',
    title: {
      en: 'MEP-003: Reading MEP Drawings and Specifications',
      ti: 'MEP-003: ናይ MEP ስእልታትን ዝርዝራትን ምንባብ',
      am: 'MEP-003: MEP ምስሎች እና ዝርዝሮችን ማንበብ'
    },
    category: 'mep',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: '5-level drawing hierarchy (concept to as-built), drawing numbering convention (discipline/level/type/revision), common MEP symbols grid (mechanical/electrical/plumbing), line weight and colour conventions, title block diagram with all key fields, and 8-step method for reading any MEP floor plan — with diagrams — by Awet G. Nway.',
      ti: '5-level drawing hierarchy፣ drawing numbering convention፣ common MEP symbols grid፣ title block diagram፣ 8-step MEP floor plan reading method — ብ Awet G. Nway።',
      am: '5-level drawing hierarchy፣ drawing numbering convention፣ common MEP symbols grid፣ title block diagram፣ 8-step MEP floor plan reading method — በ Awet G. Nway።'
    },
    file: 'pdfs/MEP-003-Reading-MEP-Drawings.pdf',
    color: '#0d9488',
    preview: true
  },
  {
    id: 'mep-curriculum-004-hvac-fundamentals-for-mep',
    title: {
      en: 'MEP-004: HVAC Fundamentals for MEP',
      ti: 'MEP-004: ናይ MEP HVAC መሰረታዊ',
      am: 'MEP-004: ለMEP HVAC መሰረታዊ'
    },
    category: 'mep',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: '3 HVAC system types diagram (central AHU/FCU/VRF with MEP implications), MEP coordination table (ceiling void/plant room/electrical/BMS/fresh air), cooling load components bar chart (solar 32%/people 18%/lighting 14%/equipment 16%/fabric 12%/ventilation 8%), cooling load calculation table, rules of thumb by space type, zone control diagram (VAV/FCU/VRF), HVAC-electrical integration table, and HVAC equipment schedule guide — with diagrams — by Awet G. Nway.',
      ti: '3 HVAC system types diagram (central AHU/FCU/VRF)፣ cooling load components bar chart፣ cooling load calculation table፣ zone control diagram (VAV/FCU/VRF)፣ HVAC-electrical integration table — ብ Awet G. Nway።',
      am: '3 HVAC system types diagram (central AHU/FCU/VRF)፣ cooling load components bar chart፣ cooling load calculation table፣ zone control diagram (VAV/FCU/VRF)፣ HVAC-electrical integration table — በ Awet G. Nway።'
    },
    file: 'pdfs/MEP-004-HVAC-Fundamentals-for-MEP.pdf',
    color: '#0d9488',
    preview: true
  },
  {
    id: 'mep-curriculum-005-heating-systems-and-boilers',
    title: {
      en: 'MEP-005: Heating Systems and Boilers',
      ti: 'MEP-005: ናይ ሙቀት ስርዓት ን Boiler',
      am: 'MEP-005: የማሞቂያ ሥርዓቶች እና Boiler'
    },
    category: 'mep',
    pages: 4,
    size: '120 KB',
    downloads: '0',
    badge: 'NEW',
    description: {
      en: '3 boiler types diagram (combi/system/heat-only — pros/cons tiles), hydronic circuit diagram (boiler→pump→expansion vessel→flow header→radiators with TRVs→return), two-pipe vs one-pipe layout diagram (temperature drop illustrated), boiler types table (incl. condensing), hydronic component table (7 components), heat emitter types table (radiator/UFH/FCU/convector), and controls table — with 3 diagrams — by Awet G. Nway.',
      ti: '3 boiler types diagram (combi/system/heat-only)፣ hydronic circuit diagram (boiler→pump→expansion vessel→radiators with TRVs)፣ two-pipe vs one-pipe diagram፣ boiler types table፣ 7-component hydronic table፣ heat emitter types table — ብ Awet G. Nway።',
      am: '3 boiler types diagram (combi/system/heat-only)፣ hydronic circuit diagram (boiler→pump→expansion vessel→radiators with TRVs)፣ two-pipe vs one-pipe diagram፣ boiler types table፣ 7-component hydronic table፣ heat emitter types table — በ Awet G. Nway።'
    },
    file: 'pdfs/MEP-005-Heating-Systems-and-Boilers.pdf',
    color: '#0d9488',
    preview: true
  },
  {
    id: 'mep-curriculum-006-cooling-systems-and-chillers',
    title: {
      en: 'MEP-006: Cooling Systems and Chillers',
      ti: 'MEP-006: ናይ ምቅዛን ስርዓት ን Chiller',
      am: 'MEP-006: የማቀዝቀዣ ሥርዓቶች እና ቺለር'
    },
    category: 'mep',
    pages: 8,
    size: '33 KB',
    downloads: '0',
    badge: 'NEW',
    description: {
      en: 'Vapour compression cycle diagram (evaporator/compressor/condenser/expansion valve), chiller types comparison diagram (air-cooled/water-cooled/absorption), primary-secondary chilled water system diagram, refrigerant comparison table (R-32/R-410A/R-1234ze), chiller type selection table, efficiency metrics table (COP/EER/IPLV), chilled water design parameters, cooling tower Legionella management table, FCU/AHU/VAV terminal comparison, worked example (620 kW office building chiller plant) — by Awet G. Nway.',
      ti: 'Vapour compression cycle diagram፣ chiller types diagram (air-cooled/water-cooled/absorption)፣ primary-secondary chilled water system diagram፣ refrigerant table፣ chiller efficiency metrics (COP/IPLV)፣ Legionella management table፣ FCU/AHU/VAV comparison፣ worked example 620 kW office — ብ Awet G. Nway።',
      am: 'Vapour compression cycle diagram፣ chiller types diagram (air-cooled/water-cooled/absorption)፣ primary-secondary chilled water system diagram፣ refrigerant table፣ chiller efficiency metrics (COP/IPLV)፣ Legionella management table፣ FCU/AHU/VAV comparison፣ worked example 620 kW office — በ Awet G. Nway።'
    },
    file: 'pdfs/MEP-006-Cooling-Systems-and-Chillers.pdf',
    color: '#0d9488',
    preview: true
  },
  {
    id: 'plumb-001-introduction-to-plumbing-systems',
    title: {
      en: 'PLUMB-001: Introduction to Plumbing Systems',
      ti: 'PLUMB-001: መእተዊ ናብ ናይ ቧንቧ ስርዓት',
      am: 'PLUMB-001: ወደ የቧምቧ ሥርዓቶች መግቢያ'
    },
    category: 'plumbing',
    pages: 7,
    size: '29 KB',
    downloads: '0',
    badge: 'NEW',
    description: {
      en: 'Building plumbing cross-section diagram (cold supply/hot supply/drainage/vent), DWV system diagram (Drain-Waste-Vent explained), pipe sizes visual comparison diagram, two main systems table (supply vs drainage vs hot water), water supply components table (7 components), DWV component table (6 components), drainage gradient table by pipe size, pipe materials comparison (8 materials — PEX/copper/uPVC/CPVC/HDPE), plumbing codes table (IPC/UPC/BS EN/EBCS), career pathways table, 30-lesson curriculum roadmap — by Awet G. Nway.',
      ti: 'Building plumbing cross-section diagram፣ DWV system diagram (Drain-Waste-Vent)፣ pipe sizes visual diagram፣ supply vs drainage table፣ water supply components (7)፣ DWV components (6)፣ drainage gradient table፣ 8 pipe materials comparison (PEX/copper/uPVC)፣ plumbing codes table፣ career pathways — ብ Awet G. Nway።',
      am: 'Building plumbing cross-section diagram፣ DWV system diagram (Drain-Waste-Vent)፣ pipe sizes visual diagram፣ supply vs drainage table፣ water supply components (7)፣ DWV components (6)፣ drainage gradient table፣ 8 pipe materials comparison (PEX/copper/uPVC)፣ plumbing codes table፣ career pathways — በ Awet G. Nway።'
    },
    file: 'pdfs/PLUMB-001-Introduction-to-Plumbing-Systems.pdf',
    color: '#0369a1',
    preview: true
  },
  {
    id: 'plumb-002-plumbing-tools-and-safety',
    title: {
      en: 'PLUMB-002: Plumbing Tools and Safety',
      ti: 'PLUMB-002: ናይ ቧንቧ መሳርሒታት ን ድሕነት',
      am: 'PLUMB-002: የቧምቧ መሳሪያዎች እና ደህንነት'
    },
    category: 'plumbing',
    pages: 7,
    size: '28 KB',
    downloads: '0',
    badge: 'NEW',
    description: {
      en: '4-category tools diagram (measuring/cutting/joining/testing), PPE body diagram with 10 items labelled, hazard risk matrix diagram, 10-tool hand tools table (pipe wrench to PTFE tape), measuring tools table, 6-power tools table (drill/grinder/press tool/drain snake), 7 pipe joining methods table (solder/compression/push-fit/press/solvent/threaded/flanged), 5-test pressure testing table, 6-hazard safety table, hot works permit explanation — by Awet G. Nway.',
      ti: '4-category tools diagram፣ PPE body diagram (10 items)፣ hazard risk matrix diagram፣ 10-tool hand tools table፣ 6-power tools table (drill/grinder/press tool)፣ 7 pipe joining methods table፣ 5-test pressure testing table፣ 6-hazard safety table — ብ Awet G. Nway።',
      am: '4-category tools diagram፣ PPE body diagram (10 items)፣ hazard risk matrix diagram፣ 10-tool hand tools table፣ 6-power tools table (drill/grinder/press tool)፣ 7 pipe joining methods table፣ 5-test pressure testing table፣ 6-hazard safety table — በ Awet G. Nway።'
    },
    file: 'pdfs/PLUMB-002-Plumbing-Tools-and-Safety.pdf',
    color: '#0369a1',
    preview: true
  },
  {
    id: 'mech-curriculum-001-intro-to-mechanical',
    title: {
      en: 'MECH-001: Introduction to Mechanical Engineering',
      ti: 'MECH-001: መእተዊ ናብ ሜካኒካል ምህንድስና',
      am: 'MECH-001: ወደ ሜካኒካል ምህንድስና መግቢያ'
    },
    category: 'mechanical',
    pages: 4,
    size: '110 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'The 5 core ME disciplines, the engineering design process, essential software tools, fundamental concepts (stress, strain, forces), and mechanical career pathways — with diagrams — by Awet G. Nway.',
      ti: '5 ቀንዲ ዓርሶ-ምህንድስና ዓውዲታት፣ ናይ ምህንድስና ምድላው ኣሰራርሓ፣ ቀንዲ ሶፍትዌር፣ stress/strain/forces — ብ Awet G. Nway።',
      am: '5 ዋና ME ዲሲፕሊኖች፣ የምህንድስና ንድፍ ሂደት፣ አስፈላጊ ሶፍትዌሮች፣ stress/strain/forces — በ Awet G. Nway።'
    },
    file: 'pdfs/MECH-001-Introduction-to-Mechanical-Engineering.pdf',
    color: '#f97316',
    preview: true
  },
  {
    id: 'mech-curriculum-002-engineering-materials',
    title: {
      en: 'MECH-002: Engineering Materials',
      ti: 'MECH-002: ናይ ምህንድስና ቁሳቁስ',
      am: 'MECH-002: የምህንድስና ቁሳቁሶች'
    },
    category: 'mechanical',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'The four material classes (metals, polymers, ceramics, composites), key mechanical properties (E, yield strength, UTS, fatigue, toughness), the stress-strain curve explained, common engineering metals with properties table, heat treatment of steel, and material selection map — with diagrams — by Awet G. Nway.',
      ti: 'ኣርባዕቲኦም ናይ ቁሳቁስ ዓይነታት፣ ቀንዲ ናይ ሜካኒካዊ ምስልታት፣ stress-strain curve፣ heat treatment፣ material selection map — ብ Awet G. Nway።',
      am: 'አራቱ የቁሳቁስ ክፍሎች፣ ቁልፍ ሜካኒካዊ ባሕሪያት፣ stress-strain curve፣ heat treatment፣ material selection map — በ Awet G. Nway።'
    },
    file: 'pdfs/MECH-002-Engineering-Materials.pdf',
    color: '#f97316',
    preview: true
  },
  {
    id: 'mech-curriculum-003-engineering-mechanics',
    title: {
      en: 'MECH-003: Engineering Mechanics',
      ti: 'MECH-003: ናይ ምህንድስና ሜካኒክስ',
      am: 'MECH-003: የምህንድስና ሜካኒክስ'
    },
    category: 'mechanical',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Newton\'s 3 laws, force vector resolution diagram, 7 mechanical quantities table, FBD of a simply supported beam (UDL, reactions, BMD), 6-step beam problem method, 3 support types diagram (pin/roller/fixed), moments and couples, friction (static/kinetic/rolling), and dynamics (kinematics, F=ma, energy, impulse) — with diagrams — by Awet G. Nway.',
      ti: 'ናይ Newton 3 ሕግታት፣ force vector resolution diagram፣ FBD ናይ beam፣ 3 support types (pin/roller/fixed)፣ moments & friction፣ dynamics — ብ Awet G. Nway።',
      am: 'የNewton 3 ህጎች፣ force vector resolution diagram፣ beam FBD፣ 3 support types (pin/roller/fixed)፣ moments & friction፣ dynamics — በ Awet G. Nway።'
    },
    file: 'pdfs/MECH-003-Engineering-Mechanics.pdf',
    color: '#f97316',
    preview: true
  },
  {
    id: 'mech-curriculum-004-thermodynamics-basics',
    title: {
      en: 'MECH-004: Thermodynamics Basics',
      ti: 'MECH-004: መሰረታዊ ናይ ቴርሞዳይናሚክስ',
      am: 'MECH-004: የቴርሞዳይናሚክስ መሰረታዊ'
    },
    category: 'mechanical',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'The four laws of thermodynamics (Zeroth through Third) with formulas, key concepts (T/Q/W/U/H/S/specific heat), three heat transfer modes diagram (conduction/convection/radiation with equations), Carnot P-V cycle diagram with efficiency formula, real engine efficiency comparison, and 6 thermodynamic cycles (Carnot/Otto/Diesel/Rankine/Refrigeration/Brayton) — with diagrams — by Awet G. Nway.',
      ti: '4 ሕግታት ቴርሞዳይናሚክስ (Zeroth-Third)፣ 3 ናይ heat transfer modes diagram፣ Carnot P-V cycle diagram፣ ናይ engine efficiency comparison — ብ Awet G. Nway።',
      am: '4 ህጎች ቴርሞዳይናሚክስ (Zeroth-Third)፣ 3 heat transfer modes diagram፣ Carnot P-V cycle diagram፣ የengine efficiency comparison — በ Awet G. Nway።'
    },
    file: 'pdfs/MECH-004-Thermodynamics-Basics.pdf',
    color: '#f97316',
    preview: true
  },
  {
    id: 'mech-curriculum-005-fluid-mechanics',
    title: {
      en: 'MECH-005: Fluid Mechanics',
      ti: 'MECH-005: ናይ ፍሳሽ ሜካኒክስ',
      am: 'MECH-005: ፈሳሽ ሜካኒክስ'
    },
    category: 'mechanical',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Key fluid properties (density/viscosity/pressure), Bernoulli\'s equation venturi diagram (P+½ρv²+ρgh=constant), Bernoulli application table, Reynolds number laminar vs turbulent diagram, pipe flow (Darcy-Weisbach/Moody chart/minor losses), 3 pump types diagram (centrifugal/positive displacement/axial), pump selection (system curve/BEP/NPSH), and affinity laws (Q/H/P vs speed) — with diagrams — by Awet G. Nway.',
      ti: 'Fluid properties፣ Bernoulli venturi diagram፣ Reynolds number diagram (laminar vs turbulent)፣ Darcy-Weisbach pipe flow፣ 3 pump types diagram፣ pump selection፣ affinity laws — ብ Awet G. Nway።',
      am: 'Fluid properties፣ Bernoulli venturi diagram፣ Reynolds number diagram (laminar vs turbulent)፣ Darcy-Weisbach pipe flow፣ 3 pump types diagram፣ pump selection፣ affinity laws — በ Awet G. Nway።'
    },
    file: 'pdfs/MECH-005-Fluid-Mechanics.pdf',
    color: '#f97316',
    preview: true
  },
  {
    id: 'elec-curriculum-001-intro-to-electricity',
    title: {
      en: 'ELEC-001: Introduction to Electricity',
      ti: 'ELEC-001: መእተዊ ናብ ኤሌክትሪሲቲ',
      am: 'ELEC-001: ወደ ኤሌክትሪሲቲ መግቢያ'
    },
    category: 'electrical',
    pages: 4,
    size: '110 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: "Voltage, current, resistance and Ohm's Law; AC vs DC; the power grid (generation to outlet); electrical safety fundamentals; and electrical career pathways — with diagrams — by Awet G. Nway.",
      ti: "ቮልቴጅ፣ ሞቕሒ፣ resistance፣ Ohm's Law፣ AC vs DC፣ ናይ ሓይሊ ኣውታረ-መርበብ — ብ Awet G. Nway።",
      am: "ቮልቴጅ፣ ሞገድ፣ resistance፣ Ohm's Law፣ AC vs DC፣ ኤሌክትሪካዊ ኃይል ፍሰት — በ Awet G. Nway።"
    },
    file: 'pdfs/ELEC-001-Introduction-to-Electricity.pdf',
    color: '#3b82f6',
    preview: true
  },
  {
    id: 'elec-curriculum-002-basic-electrical-quantities',
    title: {
      en: 'ELEC-002: Basic Electrical Quantities',
      ti: 'ELEC-002: መሰረታዊ ናይ ኤሌክትሪክ ብዛዕታት',
      am: 'ELEC-002: መሰረታዊ የኤሌክትሪክ መጠኖች'
    },
    category: 'electrical',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'All six core electrical quantities (V, I, R, P, E, f) with units and formulas, the water pipe analogy, Ohm\'s Law formula wheel (12 formulas), 4 worked examples, resistance factors (ρ, L, A, temperature), AC sine wave (peak vs RMS), capacitance, inductance, and a master reference table — with diagrams — by Awet G. Nway.',
      ti: 'ሽድሽቲኦም ናይ ኤሌክትሪክ ብዛዕታት (V, I, R, P, E, f)፣ ናይ ማይ ኣናሎጂ፣ Ohm\'s Law wheel፣ AC sine wave (peak vs RMS) — ብ Awet G. Nway።',
      am: 'ስድስቱ ዋና የኤሌክትሪክ መጠኖች (V, I, R, P, E, f)፣ የውሃ ቱቦ ምሳሌ፣ Ohm\'s Law wheel፣ AC sine wave (peak vs RMS) — በ Awet G. Nway።'
    },
    file: 'pdfs/ELEC-002-Basic-Electrical-Quantities.pdf',
    color: '#3b82f6',
    preview: true
  },
  {
    id: 'elec-curriculum-003-ohms-law',
    title: {
      en: 'ELEC-003: Ohm\'s Law, Series & Parallel Circuits',
      ti: 'ELEC-003: ናይ Ohm ሕጊ፣ Series & Parallel Circuits',
      am: 'ELEC-003: የOhm ህግ፣ Series & Parallel ወረዳዎች'
    },
    category: 'electrical',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Series circuit diagram (R_T=R1+R2+R3, same current, voltage divider rule), parallel circuit diagram (1/R_T=Σ1/Rn, same voltage, current divider), KVL and KCL diagram, 6-step circuit solving method, 4 practical worked examples (cable sizing, fuse selection, voltage drop), and series vs parallel comparison — with diagrams — by Awet G. Nway.',
      ti: 'Series circuit diagram፣ parallel circuit diagram፣ KVL & KCL diagram፣ 6-step circuit solving method፣ 4 practical examples (cable sizing, fuse selection) — ብ Awet G. Nway።',
      am: 'Series circuit diagram፣ parallel circuit diagram፣ KVL & KCL diagram፣ 6-step circuit solving method፣ 4 practical examples (cable sizing, fuse selection) — በ Awet G. Nway።'
    },
    file: 'pdfs/ELEC-003-Ohms-Law.pdf',
    color: '#3b82f6',
    preview: true
  },
  {
    id: 'elec-curriculum-004-ac-vs-dc',
    title: {
      en: 'ELEC-004: AC vs DC',
      ti: 'ELEC-004: AC vs DC',
      am: 'ELEC-004: AC vs DC'
    },
    category: 'electrical',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'AC vs DC comparison (8 properties), why AC won the War of Currents, grid voltage levels, transformer turns ratio, three-phase waveform diagram with star/delta connections, single vs three-phase comparison, power triangle diagram (P/Q/S/PF), power factor correction calculations — with diagrams — by Awet G. Nway.',
      ti: 'AC vs DC ምፍልላይ፣ transformer turns ratio፣ 3-phase waveform (star/delta)፣ power triangle (P/Q/S/PF)፣ power factor correction — ብ Awet G. Nway።',
      am: 'AC vs DC ንጽጽር፣ transformer turns ratio፣ 3-phase waveform (star/delta)፣ power triangle (P/Q/S/PF)፣ power factor correction — በ Awet G. Nway።'
    },
    file: 'pdfs/ELEC-004-AC-vs-DC.pdf',
    color: '#3b82f6',
    preview: true
  },
  {
    id: 'elec-curriculum-005-electrical-safety',
    title: {
      en: 'ELEC-005: Electrical Safety',
      ti: 'ELEC-005: ናይ ኤሌክትሪክ ድሕነት',
      am: 'ELEC-005: የኤሌክትሪክ ደህንነት'
    },
    category: 'electrical',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Electric shock effects by current level diagram (1mA–10A per IEC 60479), shock severity factors, 30 mA RCD rule, protection devices diagram (Fuse/MCB/RCD/RCBO with standards), earthing systems diagram (TN-S/TN-C-S/TT), wiring regulations (IEC 60364/BS 7671/NEC/SANS 10142), 6 golden safety rules (Isolate-Lock-Tag), and PPE guide — with diagrams — by Awet G. Nway.',
      ti: 'Electric shock effects (1mA-10A)፣ protection devices diagram (Fuse/MCB/RCD/RCBO)፣ earthing systems (TN-S/TN-C-S/TT)፣ wiring regulations፣ 6 golden safety rules — ብ Awet G. Nway።',
      am: 'Electric shock effects (1mA-10A)፣ protection devices diagram (Fuse/MCB/RCD/RCBO)፣ earthing systems (TN-S/TN-C-S/TT)፣ wiring regulations፣ 6 golden safety rules — በ Awet G. Nway።'
    },
    file: 'pdfs/ELEC-005-Electrical-Safety.pdf',
    color: '#3b82f6',
    preview: true
  },
  {
    id: 'elec-curriculum-006-electrical-tools',
    title: {
      en: 'ELEC-006: Electrical Tools',
      ti: 'ELEC-006: ናይ ኤሌክትሪካዊ መሳርሒታት',
      am: 'ELEC-006: የኤሌክትሪክ መሳሪያዎች'
    },
    category: 'electrical',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Multimeter dial modes radial diagram (6 modes: DC/AC voltage/current/resistance/continuity/diode), 5-measurement procedure table (voltage/current/resistance/continuity/current — with common mistakes), insulation resistance tester/loop impedance/earth electrode/PAT tester diagram, insulation testing 5-step procedure, loop impedance Ze/Zs table, PAT testing 5-check table, CAT ratings severity bar (I-IV), and 6 hand tools guide — with diagrams — by Awet G. Nway.',
      ti: 'Multimeter dial modes radial diagram (6 modes)፣ 5-measurement procedure table፣ 4 test instruments diagram፣ insulation resistance procedure፣ loop impedance Ze/Zs table፣ PAT testing table፣ CAT ratings bar — ብ Awet G. Nway።',
      am: 'Multimeter dial modes radial diagram (6 modes)፣ 5-measurement procedure table፣ 4 test instruments diagram፣ insulation resistance procedure፣ loop impedance Ze/Zs table፣ PAT testing table፣ CAT ratings bar — በ Awet G. Nway።'
    },
    file: 'pdfs/ELEC-006-Electrical-Tools.pdf',
    color: '#3b82f6',
    preview: true
  },
  {
    id: 'electricity-decoded-ohms-law-visual-guide',
    title: {
      en: 'Decoding the Invisible Forces of Electricity',
      ti: 'ናይ ኤሌክትሪሲቲ ሰሌዳ ሓይልታት ምፍታሕ',
      am: 'የኤሌክትሪሲቲ የማይታዩ ኃይሎችን መፍታት'
    },
    category: 'electrical',
    pages: 7,
    size: '2.4 MB',
    downloads: '0',
    badge: 'NEW',
    description: {
      en: 'A stunning visual guide to Ohm\'s Law and basic circuit dynamics. Covers Voltage (V), Current (I) and Resistance (R) with the Volt-Amp-Ohm character analogy, the Electricity Trinity Blueprint table, V=I×R explained visually, and Master the Circuit summary. Perfect for beginners.',
      ti: 'ናይ Ohm\'s Law ምስለኛ ትምህርቲ — Voltage, Current, Resistance ምስ V=I×R ሕሳብ ብምስሊ ዝተገለጸ።',
      am: 'የOhm\'s Law ምስላዊ መመሪያ — Voltage, Current, Resistance ከ V=I×R ቀመር ጋር በምስል ተብራርቷል።'
    },
    file: 'pdfs/Electricity-Decoded-Ohms-Law-Visual-Guide.pdf',
    color: '#3b82f6',
    preview: true
  },
  {
    id: 'hvac-curriculum-002-refrigeration-cycle',
    title: {
      en: 'HVAC-002: The Refrigeration Cycle',
      ti: 'HVAC-002: ናይ ማቀዝቀዝ ዑደት',
      am: 'HVAC-002: የማቀዝቀዝ ዑደት'
    },
    category: 'hvac',
    pages: 4,
    size: '110 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'The 4-stage vapor compression cycle, how each component works, refrigerant comparison (R-22/R-410A/R-32/R-454B), COP and EER efficiency metrics, and heat pump heating and cooling modes — with diagrams — by Awet G. Nway.',
      ti: 'ናይ vapor compression cycle 4 ደረጃታት፣ ኣካላት፣ ናይ refrigerant ምፍላጥ፣ COP/EER፣ heat pump — ብ Awet G. Nway።',
      am: 'የvapor compression cycle 4 ደረጃዎች፣ ክፍሎች፣ refrigerant ንጽጽር፣ COP/EER፣ heat pump — በ Awet G. Nway።'
    },
    file: 'pdfs/HVAC-002-Refrigeration-Cycle.pdf',
    color: '#00d4ff',
    preview: true
  },
  {
    id: 'hvac-curriculum-003-hvac-components',
    title: {
      en: 'HVAC-003: HVAC Components',
      ti: 'HVAC-003: ናይ HVAC ኣካላት',
      am: 'HVAC-003: የHVAC ክፍሎች'
    },
    category: 'hvac',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'The four core refrigeration components (compressor, condenser, expansion device, evaporator), compressor types by application, TXV vs capillary tube, AHU component layout, fan types, and filter grades — with diagrams — by Awet G. Nway.',
      ti: 'ኣርባዕቲኦም ናይ refrigeration ኣካላት፣ ዓይነታት compressor፣ TXV vs capillary tube፣ AHU layout፣ ዓይነታት fan — ብ Awet G. Nway።',
      am: 'አራቱ ዋና refrigeration ክፍሎች፣ የcompressor ዓይነቶች፣ TXV vs capillary tube፣ AHU layout፣ የfan ዓይነቶች — በ Awet G. Nway።'
    },
    file: 'pdfs/HVAC-003-HVAC-Components.pdf',
    color: '#00d4ff',
    preview: true
  },
  {
    id: 'hvac-curriculum-004-air-conditioning-basics',
    title: {
      en: 'HVAC-004: Air Conditioning Basics',
      ti: 'HVAC-004: መሰረታዊ ናይ ኤር ኮንዲሽን',
      am: 'HVAC-004: የኤር ኮንዲሽኒንግ መሰረታዊ'
    },
    category: 'hvac',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'How AC moves heat (not creates cold), split system cross-section diagram, inverter vs fixed-speed, 6 AC system types (window/split/multi-split/VRF/packaged/chilled water), cooling capacity units (kW/BTU/tons), EER/SEER/COP efficiency ratings, and system selection guide — with diagrams — by Awet G. Nway.',
      ti: 'AC ሙቀት ከመ ዝንቀሳቐስ፣ split system diagram፣ inverter vs fixed-speed፣ 6 ዓይነታት AC (window/split/multi-split/VRF/packaged)፣ EER/SEER/COP — ብ Awet G. Nway።',
      am: 'AC ሙቀት ማስተላለፊያ ምን ምክንያት፣ split system diagram፣ inverter vs fixed-speed፣ 6 ዓይነት AC ስርዓቶች፣ EER/SEER/COP ቅልጥፍና — በ Awet G. Nway።'
    },
    file: 'pdfs/HVAC-004-Air-Conditioning-Basics.pdf',
    color: '#00d4ff',
    preview: true
  },
  {
    id: 'hvac-curriculum-005-heating-systems',
    title: {
      en: 'HVAC-005: Heating Systems',
      ti: 'HVAC-005: ናይ ምሙቓቕ ስርዓታት',
      am: 'HVAC-005: የሙቀት ስርዓቶች'
    },
    category: 'hvac',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Boiler types (condensing gas/oil/biomass/electric) with efficiency table, heat pump cycle diagram (ASHP/GSHP/WSHP with COP values), heat pump vs gas boiler running cost comparison, heating emitter diagram (radiator/UFH/FCU with flow temps), and 6-step heat loss calculation method — with diagrams — by Awet G. Nway.',
      ti: 'ዓይነታት boiler (condensing gas/oil/biomass/electric)፣ heat pump cycle diagram (ASHP/GSHP/WSHP)፣ heating emitter diagram (radiator/UFH/FCU)፣ heat loss calculation — ብ Awet G. Nway።',
      am: 'የboiler ዓይነቶች (condensing gas/oil/biomass/electric)፣ heat pump cycle diagram (ASHP/GSHP/WSHP)፣ heating emitter diagram (radiator/UFH/FCU)፣ heat loss calculation — በ Awet G. Nway።'
    },
    file: 'pdfs/HVAC-005-Heating-Systems.pdf',
    color: '#00d4ff',
    preview: true
  },
  {
    id: 'hvac-curriculum-006-ventilation-principles',
    title: {
      en: 'HVAC-006: Ventilation Principles',
      ti: 'HVAC-006: መሰረታዊ ናይ ኣቬንቲሌሽን',
      am: 'HVAC-006: የአየር ማናፈሻ መሰረታዊ ሞጎሶች'
    },
    category: 'hvac',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: '4 ventilation system types diagram (natural/MEV/AHU/MVHR), system comparison table (energy/IAQ/heat recovery), MVHR heat exchanger diagram (fresh/supply/extract/exhaust airflows), MVHR component guide, CO2 concentration IAQ scale diagram (420-2000+ ppm), ventilation rate requirements (ASHRAE 62.1/EN 13779), and 5-row ventilation calculations (ACH/flow/CO2 check) — with diagrams — by Awet G. Nway.',
      ti: '4 ventilation types diagram (natural/MEV/AHU/MVHR)፣ MVHR heat exchanger diagram፣ CO2 IAQ scale diagram (420-2000+ ppm)፣ ventilation rate requirements፣ ventilation calculations — ብ Awet G. Nway።',
      am: '4 ventilation types diagram (natural/MEV/AHU/MVHR)፣ MVHR heat exchanger diagram፣ CO2 IAQ scale diagram (420-2000+ ppm)፣ ventilation rate requirements፣ ventilation calculations — በ Awet G. Nway።'
    },
    file: 'pdfs/HVAC-006-Ventilation-Principles.pdf',
    color: '#00d4ff',
    preview: true
  },
  {
    id: 'hvac-curriculum-007-duct-design-basics',
    title: {
      en: 'HVAC-007: Duct Design Basics',
      ti: 'HVAC-007: መሰረታዊ ናይ Duct ዲዛይን',
      am: 'HVAC-007: Duct ዲዛይን መሰረታዊ'
    },
    category: 'hvac',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Rectangular vs circular duct comparison diagram (pros/cons/shape), 4 duct materials table (steel/spiral/flexible/phenolic), duct leakage classes, equal friction method duct sizing diagram (AHU→trunk→branches with flow labels), 6-step equal friction procedure, velocity limits by space type, 8 duct fittings pressure loss table (ζ values/formulas/notes), duct sizing schedule diagram, and 8-column schedule guide — with diagrams — by Awet G. Nway.',
      ti: 'Rectangular vs circular duct diagram፣ 4 duct materials table፣ equal friction method diagram (AHU→trunk→branches)፣ 6-step sizing procedure፣ velocity limits table፣ 8 fittings loss table (ζ values) — ብ Awet G. Nway።',
      am: 'Rectangular vs circular duct diagram፣ 4 duct materials table፣ equal friction method diagram (AHU→trunk→branches)፣ 6-step sizing procedure፣ velocity limits table፣ 8 fittings loss table (ζ values) — በ Awet G. Nway።'
    },
    file: 'pdfs/HVAC-007-Duct-Design-Basics.pdf',
    color: '#00d4ff',
    preview: true
  },
  {
    id: 'hvac-curriculum-008-air-distribution-systems',
    title: {
      en: 'HVAC-008: Air Distribution Systems',
      ti: 'HVAC-008: ናይ ኣየር ምዝርጋሕ ስርዓት',
      am: 'HVAC-008: የአየር ስርጭት ሥርዓቶች'
    },
    category: 'hvac',
    pages: 4,
    size: '118 KB',
    downloads: '0',
    badge: 'NEW',
    description: {
      en: 'Air circulation loop diagram (supply/return/exhaust/fresh air with % volumes), 4 diffuser types diagram (ceiling round/linear slot/perforated/swirl — pattern, application, icon), CAV vs VAV comparison diagram, throw/drop/spread definitions, air change rate (ACH) table by space type (office/hospital/OR/lab/server room), and 4-row troubleshooting guide — with 3 diagrams — by Awet G. Nway.',
      ti: 'Air circulation loop diagram (supply/return/exhaust/fresh air)፣ 4 diffuser types diagram (ceiling/linear slot/perforated/swirl)፣ CAV vs VAV diagram፣ ACH table by space type፣ troubleshooting guide — ብ Awet G. Nway።',
      am: 'Air circulation loop diagram (supply/return/exhaust/fresh air)፣ 4 diffuser types diagram (ceiling/linear slot/perforated/swirl)፣ CAV vs VAV diagram፣ ACH table by space type፣ troubleshooting guide — በ Awet G. Nway።'
    },
    file: 'pdfs/HVAC-008-Air-Distribution-Systems.pdf',
    color: '#00d4ff',
    preview: true
  },
  {
    id: 'hvac-curriculum-009-psychrometrics',
    title: {
      en: 'HVAC-009: Psychrometrics — The Science of Moist Air',
      ti: 'HVAC-009: Psychrometrics — ሳይንስ ናይ ጡዑም ኣየር',
      am: 'HVAC-009: Psychrometrics — የእርጥበት አየር ሳይንስ'
    },
    category: 'hvac',
    pages: 6,
    size: '33 KB',
    downloads: '0',
    badge: 'NEW',
    description: {
      en: 'Psychrometric chart reading (7 key properties: DBT, WBT, DPT, RH, W, enthalpy, specific volume), 4 fundamental HVAC processes diagram (sensible cooling, cooling+dehumidification, heating, humidification), complete worked example (cooling coil selection for 38°C Tigray outdoor conditions), ASHRAE comfort zones table, humidity effect table, 6 common design mistakes — by Awet G. Nway.',
      ti: 'Psychrometric chart (7 properties: DBT/WBT/DPT/RH/W/enthalpy)፣ 4 HVAC processes diagram፣ complete worked example (cooling coil for 38°C Tigray conditions)፣ ASHRAE comfort zones table፣ humidity effects table — ብ Awet G. Nway።',
      am: 'Psychrometric chart (7 properties: DBT/WBT/DPT/RH/W/enthalpy)፣ 4 HVAC processes diagram፣ complete worked example (cooling coil for 38°C Tigray conditions)፣ ASHRAE comfort zones table፣ humidity effects table — በ Awet G. Nway።'
    },
    file: 'pdfs/HVAC-009-Psychrometrics.pdf',
    color: '#00d4ff',
    preview: true
  },
  {
    id: 'solar-curriculum-002-radiation-basics',
    title: {
      en: 'SOLAR-002: Solar Radiation Basics',
      ti: 'SOLAR-002: ናይ ሶላር ጨረር መሰረታዊ',
      am: 'SOLAR-002: የፀሐይ ጨረር መሰረታዊ'
    },
    category: 'solar',
    pages: 4,
    size: '110 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'GHI, DNI, DHI irradiance components, the solar constant, peak sun hours (PSH) concept and regional data, tilt angle and azimuth optimisation, sun path, shading losses, and the panel sizing formula — with diagrams — by Awet G. Nway.',
      ti: 'GHI/DNI/DHI፣ solar constant፣ Peak Sun Hours፣ tilt angle፣ sun path፣ shading losses፣ ናይ panel sizing formula — ብ Awet G. Nway።',
      am: 'GHI/DNI/DHI፣ solar constant፣ Peak Sun Hours፣ tilt angle፣ sun path፣ shading losses — በ Awet G. Nway።'
    },
    file: 'pdfs/SOLAR-002-Solar-Radiation-Basics.pdf',
    color: '#fbbf24',
    preview: true
  },
  {
    id: 'solar-curriculum-003-solar-system-components',
    title: {
      en: 'SOLAR-003: Solar System Components',
      ti: 'SOLAR-003: ናይ ሶላር ስርዓት ኣካላት',
      am: 'SOLAR-003: የፀሐይ ኃይል ሥርዓት ክፍሎች'
    },
    category: 'solar',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'The five core solar system components: panel technologies (mono/poly/thin-film/bifacial), inverter types (string/micro/hybrid), battery chemistry comparison (lead-acid vs LFP), MPPT vs PWM charge controllers, and Balance of System (BOS) — with diagrams — by Awet G. Nway.',
      ti: 'ሓምሸቲኦም ናይ solar ኣካላት፣ ዓይነታት panel፣ inverter types (string/micro/hybrid)፣ battery chemistry፣ MPPT vs PWM፣ Balance of System — ብ Awet G. Nway።',
      am: 'አምስቱ ዋና solar ክፍሎች፣ panel ዓይነቶች፣ inverter ዓይነቶች (string/micro/hybrid)፣ battery chemistry ንጽጽር፣ MPPT vs PWM፣ Balance of System — በ Awet G. Nway።'
    },
    file: 'pdfs/SOLAR-003-Solar-System-Components.pdf',
    color: '#fbbf24',
    preview: true
  },
  {
    id: 'solar-curriculum-004-solar-panels',
    title: {
      en: 'SOLAR-004: Solar Panels — In Depth',
      ti: 'SOLAR-004: ናይ ሶላር ፓነላት ዕምቆት',
      am: 'SOLAR-004: የፀሐይ ፓናሎች — ጥልቅ ዳሰሳ'
    },
    category: 'solar',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'The I-V curve (Isc, Voc, Vmp, Imp, MPP, Fill Factor), P-V curve, MPPT explained, temperature coefficients and derating diagram, how to read a panel datasheet, bypass diodes, series vs parallel wiring diagram, shading losses, and panel selection guide — with diagrams — by Awet G. Nway.',
      ti: 'I-V curve (Isc, Voc, Vmp, Imp, MPP)፣ temperature coefficients፣ datasheet ምንባብ፣ bypass diodes፣ series vs parallel wiring፣ shading losses፣ panel selection — ብ Awet G. Nway።',
      am: 'I-V curve (Isc, Voc, Vmp, Imp, MPP)፣ temperature coefficients፣ datasheet ማንበብ፣ bypass diodes፣ series vs parallel wiring፣ shading losses፣ panel selection — በ Awet G. Nway።'
    },
    file: 'pdfs/SOLAR-004-Solar-Panels.pdf',
    color: '#fbbf24',
    preview: true
  },
  {
    id: 'solar-curriculum-005-solar-batteries',
    title: {
      en: 'SOLAR-005: Solar Batteries',
      ti: 'SOLAR-005: ናይ ሶላር ባተሪታት',
      am: 'SOLAR-005: የፀሐይ ኃይል ባትሪዎች'
    },
    category: 'solar',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Battery chemistry scorecard diagram (FLA/AGM/Gel/LFP/NMC on 6 metrics), key terms (SoC/DoD/C-rate/efficiency/calendar life), SoC vs DoD visual comparing LFP and lead-acid usable zones, 6-step battery bank sizing calculation, series vs parallel wiring diagram, and battery selection decision guide — with diagrams — by Awet G. Nway.',
      ti: 'Battery chemistry scorecard diagram (FLA/AGM/Gel/LFP/NMC)፣ SoC/DoD/C-rate terms፣ 6-step battery sizing calculation፣ series vs parallel wiring diagram — ብ Awet G. Nway።',
      am: 'Battery chemistry scorecard diagram (FLA/AGM/Gel/LFP/NMC)፣ SoC/DoD/C-rate terms፣ 6-step battery sizing calculation፣ series vs parallel wiring diagram — በ Awet G. Nway።'
    },
    file: 'pdfs/SOLAR-005-Solar-Batteries.pdf',
    color: '#fbbf24',
    preview: true
  },
  {
    id: 'solar-curriculum-006-inverters-explained',
    title: {
      en: 'SOLAR-006: Inverters Explained',
      ti: 'SOLAR-006: ናይ Inverter ምርዳእ',
      am: 'SOLAR-006: Inverter ተብራርቷል'
    },
    category: 'solar',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: '4 inverter types diagram (string/micro/hybrid/off-grid with pros/cons), MPPT explained, inverter internal block diagram (DC input→MPPT→DC-AC inverter→LCL filter→AC output), key specifications table (V_dc_max/MPPT range/efficiency/IP), anti-islanding explained, DC oversizing bar chart (60-130% sizing scenarios), 6-step inverter sizing calculation, and grid commissioning settings — with diagrams — by Awet G. Nway.',
      ti: '4 inverter types diagram፣ MPPT explained፣ inverter internal block diagram፣ key specs table፣ DC oversizing bar chart፣ 6-step sizing calculation — ብ Awet G. Nway።',
      am: '4 inverter types diagram፣ MPPT explained፣ inverter internal block diagram፣ key specs table፣ DC oversizing bar chart፣ 6-step sizing calculation — በ Awet G. Nway።'
    },
    file: 'pdfs/SOLAR-006-Inverters-Explained.pdf',
    color: '#fbbf24',
    preview: true
  },
  {
    id: 'solar-curriculum-007-charge-controllers',
    title: {
      en: 'SOLAR-007: Charge Controllers',
      ti: 'SOLAR-007: ናይ Charge Controller',
      am: 'SOLAR-007: Charge Controllers'
    },
    category: 'solar',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'MPPT vs PWM comparison diagram (efficiency/voltage/cost/best for), 6-property comparison table, 4 charging stages diagram (Bulk/Absorption/Float/Equalize with voltage curve), charging stages table, MPPT cold-morning I-V advantage diagram (PWM fixed vs MPPT tracking), 5-step charge controller sizing calculation, and battery chemistry settings table (LFP/AGM/FLA — absorption/float/equalize/temperature compensation) — with diagrams — by Awet G. Nway.',
      ti: 'MPPT vs PWM comparison diagram፣ 4 charging stages diagram (Bulk/Absorption/Float/Equalize)፣ MPPT cold-morning I-V diagram፣ 5-step sizing calculation፣ battery chemistry settings table — ብ Awet G. Nway።',
      am: 'MPPT vs PWM comparison diagram፣ 4 charging stages diagram (Bulk/Absorption/Float/Equalize)፣ MPPT cold-morning I-V diagram፣ 5-step sizing calculation፣ battery chemistry settings table — በ Awet G. Nway።'
    },
    file: 'pdfs/SOLAR-007-Charge-Controllers.pdf',
    color: '#fbbf24',
    preview: true
  },
  {
    id: 'solar-curriculum-008-dc-and-ac-systems',
    title: {
      en: 'SOLAR-008: DC and AC Solar Systems',
      ti: 'SOLAR-008: DC ን AC ናይ ሶላር ስርዓት',
      am: 'SOLAR-008: DC እና AC የፀሐይ ሥርዓቶች'
    },
    category: 'solar',
    pages: 4,
    size: '118 KB',
    downloads: '0',
    badge: 'NEW',
    description: {
      en: 'DC vs AC waveform comparison diagram (flat line vs sine wave, properties table), three topology comparison diagram (off-grid/on-grid/hybrid component stacks), DC coupling vs AC coupling wiring diagram (Panels→CC→Battery vs Panels→GTI→AC Bus→Battery), topology comparison table (8 factors), coupling efficiency and selection guide, component specification table — with 3 diagrams — by Awet G. Nway.',
      ti: 'DC vs AC waveform diagram (flat vs sine, properties)፣ 3 topology diagram (off-grid/on-grid/hybrid)፣ DC coupling vs AC coupling wiring diagram፣ topology 8-factor comparison table፣ component specification table — ብ Awet G. Nway።',
      am: 'DC vs AC waveform diagram (flat vs sine, properties)፣ 3 topology diagram (off-grid/on-grid/hybrid)፣ DC coupling vs AC coupling wiring diagram፣ topology 8-factor comparison table፣ component specification table — በ Awet G. Nway።'
    },
    file: 'pdfs/SOLAR-008-DC-and-AC-Systems.pdf',
    color: '#fbbf24',
    preview: true
  },
  {
    id: 'solar-curriculum-009-solar-wiring-basics',
    title: {
      en: 'SOLAR-009: Solar Wiring Basics — Safe Wiring from Panel to Load',
      ti: 'SOLAR-009: ናይ ሶላር ሽቦ መሰረታዊ — ካብ ፓነል ናብ ጾር ሓቲቱ',
      am: 'SOLAR-009: የፀሐይ ሽቦ መሰረቶች — ከፓነል እስከ ጭነት ደህንነቱ የተጠበቀ ሽቦ'
    },
    category: 'solar',
    pages: 7,
    size: '35 KB',
    downloads: '0',
    badge: 'NEW',
    description: {
      en: 'Complete solar wiring flow diagram (Panels→MPPT→Battery→Inverter→Loads), series vs parallel panel wiring diagram with voltage/current rules, DC cable sizing table (1.5–50mm²) with ampacity and voltage drop formula, MPPT connection order (battery first rule), battery bank series/parallel configurations, AC output cable sizing by inverter power, grounding and earthing diagram, 8-row common wiring mistakes table — by Awet G. Nway.',
      ti: 'Solar wiring flow diagram (Panels→MPPT→Battery→Inverter)፣ series vs parallel diagram፣ DC cable sizing table (1.5–50mm²)፣ MPPT connection order (battery first)፣ battery bank configurations፣ AC output cable sizing፣ grounding diagram፣ 8-row wiring mistakes table — ብ Awet G. Nway።',
      am: 'Solar wiring flow diagram (Panels→MPPT→Battery→Inverter)፣ series vs parallel diagram፣ DC cable sizing table (1.5–50mm²)፣ MPPT connection order (battery first)፣ battery bank configurations፣ AC output cable sizing፣ grounding diagram፣ 8-row wiring mistakes table — በ Awet G. Nway።'
    },
    file: 'pdfs/SOLAR-009-Solar-Wiring-Basics.pdf',
    color: '#fbbf24',
    preview: true
  },
  {
    id: 'ai-curriculum-002-understanding-chatgpt',
    title: {
      en: 'AI-002: Understanding ChatGPT',
      ti: 'AI-002: ናይ ChatGPT ምርዳእ',
      am: 'AI-002: ChatGPT መረዳዳት'
    },
    category: 'ai-curriculum',
    pages: 4,
    size: '110 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'What ChatGPT is, GPT model history (GPT-1 to GPT-4o), how LLMs work, model version comparison, effective prompting techniques, real-world use cases by profession, and key limitations including hallucinations — with diagrams — by Awet G. Nway.',
      ti: 'ChatGPT እንታይ ምዃኑ፣ GPT ታሪኽ፣ LLM ከም ዝሰርሕ፣ ናይ model ምዕባለ፣ prompting techniques — ብ Awet G. Nway።',
      am: 'ChatGPT ምን እንደሆነ፣ GPT ታሪክ፣ LLM አሠራር፣ model ዝርዝር፣ prompting techniques — በ Awet G. Nway።'
    },
    file: 'pdfs/AI-002-Understanding-ChatGPT.pdf',
    color: '#8b5cf6',
    preview: true
  },
  {
    id: 'ai-curriculum-003-prompt-engineering-basics',
    title: {
      en: 'AI-003: Prompt Engineering Basics',
      ti: 'AI-003: መሰረታዊ ናይ Prompt Engineering',
      am: 'AI-003: Prompt Engineering መሰረታዊ'
    },
    category: 'ai-curriculum',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'The 5-component prompt anatomy (Role/Context/Task/Format/Constraints), four prompting techniques (zero-shot/few-shot/chain-of-thought/system prompt), weak vs strong prompt comparison diagram, 15 copy-paste prompt templates for engineering and work, temperature and AI parameter guide — with diagrams — by Awet G. Nway.',
      ti: '5-component prompt anatomy፣ zero-shot/few-shot/chain-of-thought techniques፣ weak vs strong prompt diagram፣ 15 prompt templates፣ temperature & parameters — ብ Awet G. Nway።',
      am: '5-component prompt anatomy፣ zero-shot/few-shot/chain-of-thought techniques፣ weak vs strong prompt diagram፣ 15 prompt templates፣ temperature & parameters — በ Awet G. Nway።'
    },
    file: 'pdfs/AI-003-Prompt-Engineering-Basics.pdf',
    color: '#8b5cf6',
    preview: true
  },
  {
    id: 'ai-curriculum-004-advanced-prompt-engineering',
    title: {
      en: 'AI-004: Advanced Prompt Engineering',
      ti: 'AI-004: ዕቡይ ናይ Prompt Engineering',
      am: 'AI-004: የላቀ Prompt Engineering'
    },
    category: 'ai-curriculum',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Prompt chaining (sequential/branching/iterative/validation chains), structured output (JSON/tables/CSV), working with long documents (chunking/RAG strategies), self-critique loops (generate/critique/revise), building a custom AI agent with a system prompt, and a 10-technique advanced quick-reference — with diagrams — by Awet G. Nway.',
      ti: 'Prompt chaining፣ structured output (JSON/tables/CSV)፣ ናይ ነዊሕ ሰነዳት ስትራቴጂ፣ self-critique loops፣ custom AI agent ምህናጽ — ብ Awet G. Nway።',
      am: 'Prompt chaining፣ structured output (JSON/tables/CSV)፣ ረጅም ሰነዶች ስትራቴጂ፣ self-critique loops፣ custom AI agent መገንባት — በ Awet G. Nway።'
    },
    file: 'pdfs/AI-004-Advanced-Prompt-Engineering.pdf',
    color: '#8b5cf6',
    preview: true
  },
  {
    id: 'ai-curriculum-005-claude-ai-for-productivity',
    title: {
      en: 'AI-005: Claude AI for Productivity',
      ti: 'AI-005: Claude AI ንፈጻምነት',
      am: 'AI-005: Claude AI ለምርታማነት'
    },
    category: 'ai-curriculum',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Claude vs ChatGPT/Gemini strengths diagram (context/writing/code/instructions/honesty), Constitutional AI explained, Claude Projects 4-step setup, 5 real project examples with instructions and documents, long document analysis guide (5 document types with time savings), coding workflows (debug/explain/refactor/test), and 10 high-value daily productivity workflows — with diagrams — by Awet G. Nway.',
      ti: 'Claude vs ChatGPT/Gemini strengths diagram፣ Constitutional AI፣ Claude Projects 4-step setup፣ long document analysis guide፣ coding workflows፣ 10 productivity workflows — ብ Awet G. Nway።',
      am: 'Claude vs ChatGPT/Gemini strengths diagram፣ Constitutional AI፣ Claude Projects 4-step setup፣ long document analysis guide፣ coding workflows፣ 10 productivity workflows — በ Awet G. Nway።'
    },
    file: 'pdfs/AI-005-Claude-AI-for-Productivity.pdf',
    color: '#8b5cf6',
    preview: true
  },
  {
    id: 'ai-curriculum-006-google-gemini-ai',
    title: {
      en: 'AI-006: Google Gemini AI',
      ti: 'AI-006: Google Gemini AI',
      am: 'AI-006: Google Gemini AI'
    },
    category: 'ai-curriculum',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Gemini Flash/Pro/Ultra model tiers diagram, 1M token context window comparison (GPT-4o vs Claude vs Gemini), model feature table, Gemini in Google Workspace diagram (Gmail/Docs/Sheets/Slides/Meet), workspace features table, NotebookLM guide (source-grounded answers/Audio Overview/study guides), and 10 practical engineering workflows — with diagrams — by Awet G. Nway.',
      ti: 'Gemini Flash/Pro/Ultra model tiers diagram፣ 1M token context comparison፣ Gemini in Google Workspace diagram፣ NotebookLM guide፣ 10 engineering workflows — ብ Awet G. Nway።',
      am: 'Gemini Flash/Pro/Ultra model tiers diagram፣ 1M token context comparison፣ Gemini in Google Workspace diagram፣ NotebookLM guide፣ 10 engineering workflows — በ Awet G. Nway።'
    },
    file: 'pdfs/AI-006-Google-Gemini-AI.pdf',
    color: '#8b5cf6',
    preview: true
  },
  {
    id: 'ai-curriculum-007-notebooklm-for-research',
    title: {
      en: 'AI-007: NotebookLM for Research',
      ti: 'AI-007: NotebookLM ንምርምር',
      am: 'AI-007: NotebookLM ለምርምር'
    },
    category: 'ai-curriculum',
    pages: 4,
    size: '115 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'NotebookLM vs ChatGPT comparison diagram (no hallucination/inline citations), 5-step research workflow diagram, 6 source types diagram (PDF/Google Docs/Slides/websites/YouTube/audio), 6-step setup procedure, source types table (max size/best practice), citation system callout, 7 advanced features (FAQ/Study Guide/Timeline/Briefing/Multi-source/Notes/Sharing), and 10 engineering research workflows — with diagrams — by Awet G. Nway.',
      ti: 'NotebookLM vs ChatGPT comparison diagram፣ 5-step workflow diagram፣ 6 source types diagram፣ 6-step setup procedure፣ 7 advanced features፣ 10 engineering workflows — ብ Awet G. Nway።',
      am: 'NotebookLM vs ChatGPT comparison diagram፣ 5-step workflow diagram፣ 6 source types diagram፣ 6-step setup procedure፣ 7 advanced features፣ 10 engineering workflows — በ Awet G. Nway።'
    },
    file: 'pdfs/AI-007-NotebookLM-for-Research.pdf',
    color: '#8b5cf6',
    preview: true
  },
  {
    id: 'ai-curriculum-008-ai-image-generation',
    title: {
      en: 'AI-008: AI Image Generation',
      ti: 'AI-008: AI ምስሊ ምፍጣር',
      am: 'AI-008: AI ምስል ፍጠራ'
    },
    category: 'ai-curriculum',
    pages: 4,
    size: '118 KB',
    downloads: '0',
    badge: 'NEW',
    description: {
      en: 'How diffusion models work (denoising pipeline diagram), platform comparison: Midjourney v6, DALL-E 3, Stable Diffusion, Adobe Firefly, Ideogram 2.0 — strengths, pricing, and best use cases; prompt anatomy diagram (subject/lighting/camera/style/quality), Midjourney command reference, negative prompt guide, copyright and ethics in AI imagery — with 3 diagrams — by Awet G. Nway.',
      ti: 'Diffusion model pipeline diagram፣ Midjourney/DALL-E 3/Stable Diffusion/Firefly/Ideogram comparison፣ prompt anatomy diagram፣ Midjourney commands፣ negative prompts፣ copyright & ethics — ብ Awet G. Nway።',
      am: 'Diffusion model pipeline diagram፣ Midjourney/DALL-E 3/Stable Diffusion/Firefly/Ideogram comparison፣ prompt anatomy diagram፣ Midjourney commands፣ negative prompts፣ copyright & ethics — በ Awet G. Nway።'
    },
    file: 'pdfs/AI-008-AI-Image-Generation.pdf',
    color: '#00d4ff',
    preview: true
  },
  {
    id: 'ai-curriculum-009-ai-video-generation',
    title: {
      en: 'AI-009: AI Video Generation — Create Professional Videos with AI',
      ti: 'AI-009: AI ቪዲዮ ፍጥረት — ሙያዊ ቪዲዮ ብ AI ፍጠር',
      am: 'AI-009: AI ቪዲዮ ፍጥረት — ሙያዊ ቪዲዮዎችን በ AI ፍጠር'
    },
    category: 'ai',
    pages: 8,
    size: '35 KB',
    downloads: '0',
    badge: 'NEW',
    description: {
      en: 'AI video workflow diagram (text/image/video-to-video), tool comparison chart (Runway/Kling/Sora/Pika/Hailuo/Luma), 6-component prompt anatomy diagram, camera movement vocabulary table, style keywords table, prompt before/after table, AI avatar tools (HeyGen/Synthesia/D-ID), HeyGen 7-step workflow table, AI editing features table, practical use cases table, 30-minute starter workflow — by Awet G. Nway.',
      ti: 'AI video workflow diagram (text/image/video-to-video)፣ tool comparison (Runway/Kling/Sora/Pika)፣ 6-component prompt anatomy diagram፣ camera movement table፣ AI avatar tools (HeyGen/Synthesia/D-ID)፣ HeyGen 7-step workflow፣ AI editing features table፣ practical use cases — ብ Awet G. Nway።',
      am: 'AI video workflow diagram (text/image/video-to-video)፣ tool comparison (Runway/Kling/Sora/Pika)፣ 6-component prompt anatomy diagram፣ camera movement table፣ AI avatar tools (HeyGen/Synthesia/D-ID)፣ HeyGen 7-step workflow፣ AI editing features table፣ practical use cases — በ Awet G. Nway።'
    },
    file: 'pdfs/AI-009-AI-Video-Generation.pdf',
    color: '#ec4899',
    preview: true
  },
  {
    id: 'hvac-design',
    title: 'HVAC System Design Manual',
    category: 'hvac',
    pages: 14,
    size: '43 KB',
    downloads: '0',
    badge: 'FREE',
    description: 'Full HVAC load calculation, duct sizing, equipment selection, and energy code compliance.',
    file: 'pdfs/hvac-design-manual.pdf',
    color: '#22c55e',
    preview: true
  },
  {
    id: 'motor-starters-guide',
    title: {
      en: 'Motor Starters — Complete Engineering Course Guide',
      ti: 'ናይ ሞተር ስታርተራት — ምሉእ ናይ ምህንድስና ናይ ትምህርቲ መምርሒ',
      am: 'የሞተር ስታርተሮች — ሙሉ የምህንድስና የኮርስ መምሪያ'
    },
    category: 'mechanical',
    pages: 33,
    size: '7.3 MB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Complete guide to DOL, Star-Delta, Autotransformer, Soft Starters & VFDs — with circuit diagrams, pros/cons tables, and protection selection.',
      ti: 'ምሉእ መምርሒ DOL, Star-Delta, Autotransformer, Soft Starters & VFDs — ምስ ናይ ሰርኪት ስዕሊ፣ ናይ ምርጫ ሰደቓ፣ ምክልኻልን።',
      am: 'ሙሉ DOL, Star-Delta, Autotransformer, Soft Starters & VFDs መምሪያ — ሰርኪት ዲያግራሞች፣ ሠንጠረዦች፣ እና ጥበቃ ምርጫ ጋር።'
    },
    file: 'pdfs/motor-starters-guide.pdf',
    color: '#a78bfa',
    preview: true
  },
  {
    id: 'solar-pv-guide',
    title: 'Solar PV System Design Guide',
    category: 'solar',
    pages: 14,
    size: '42 KB',
    downloads: '0',
    badge: 'FREE',
    description: 'Complete off-grid and on-grid solar PV design from site assessment to commissioning.',
    file: 'pdfs/solar-pv-design-guide.pdf',
    color: '#fbbf24',
    preview: true
  },
  {
    id: 'solar-pv-panel-construction',
    title: 'Solar PV Panel Construction — Layers, Cells, Electrical Architecture & Manufacturing',
    category: 'solar',
    pages: 9,
    size: '1 MB',
    downloads: '0',
    badge: 'FREE',
    description: 'Deep-dive into how a solar PV module is physically built: every layer from tempered glass to backsheet, p–n junction physics, cell types (mono, poly, PERC, bifacial, thin-film), internal wiring, 10-step manufacturing process, and quality standards (IEC 61215 / 61730).',
    file: 'pdfs/solar-pv-panel-construction.pdf',
    color: '#fbbf24',
    preview: true
  },
  {
    id: 'plc-course-guide',
    title: {
      en: 'PLC Practical Course Guide — From Fundamentals to Industrial Application',
      ti: 'PLC ናይ ተሞክሮ ናይ ትምህርቲ መምርሒ — ካብ መሰረት ክሳብ ናይ ኢንዱስትሪ ትጽቢት',
      am: 'PLC ተግባራዊ የኮርስ መምሪያ — ከመሰረት እስከ ኢንዱስትሪ ትግበራ'
    },
    category: 'plc',
    pages: 27,
    size: '2.1 MB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Complete PLC practical course guide covering fundamentals through industrial application — by Awet G. Nway.',
      ti: 'ምሉእ PLC ናይ ተሞክሮ ናይ ትምህርቲ መምርሒ ካብ መሰረታዊ ክሳብ ናይ ኢንዱስትሪ ትጽቢት — ብ Awet G. Nway።',
      am: 'ሙሉ PLC ተግባራዊ የኮርስ መምሪያ ከመሰረታዊ እስከ ኢንዱስትሪ ትግበራ — በ Awet G. Nway።'
    },
    file: 'pdfs/plc-course-guide.pdf',
    color: '#00d4ff',
    preview: true
  },
  {
    id: 'pumps-course-guide',
    title: {
      en: 'Pumps Complete Engineering Course — Classification, Centrifugal, Reciprocating, Surface & Submersible',
      ti: 'ምሉእ ናይ ምህንድስና ናይ ፓምፕ ትምህርቲ — ምምቃል፣ ሴንትሪፉጋል፣ ሬሲፕሮኬቲን፣ ናይ ልዕሊ ምድሪ & ናይ ትሕቲ ማይ',
      am: 'ሙሉ የፓምፕ ምህንድስና ኮርስ — ምደባ፣ ሴንትሪፉጋል፣ ሬሲፕሮኬቲንግ፣ ወለል እና ንዑስ ምድር'
    },
    category: 'mechanical',
    pages: 28,
    size: '3.4 MB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Complete pumps engineering course covering classification, centrifugal, reciprocating, surface, submersible, and pump selection — by Awet G. Nway.',
      ti: 'ምሉእ ናይ ምህንድስና ናይ ፓምፕ ትምህርቲ ናይ ምምቃል፣ ሴንትሪፉጋል፣ ሬሲፕሮኬቲን፣ ናይ ልዕሊ ምድሪ፣ ናይ ትሕቲ ማይ ፓምፕ ምርጫ ዝሸፍን — ብ Awet G. Nway።',
      am: 'ሙሉ የፓምፕ ምህንድስና ኮርስ ምደባ፣ ሴንትሪፉጋል፣ ሬሲፕሮኬቲንግ፣ ወለል፣ ንዑስ ምድር፣ እና የፓምፕ ምርጫ የሚሸፍን — በ Awet G. Nway።'
    },
    file: 'pdfs/pumps-course-guide.pdf',
    color: '#22c55e',
    preview: true
  },
  {
    id: 'industrial-maintenance-manual',
    title: {
      en: 'Industrial Maintenance Manual — Preventive, Predictive & Reliability-Centered Engineering',
      ti: 'ናይ ኢንዳስትሪ ሓለዋ መምርሒ — ናይ ምሕያሽ፣ ናይ ትንቢት ምሕሳብን ናይ ምርካብ ምህንድስናን',
      am: 'የኢንዱስትሪ ጥገና መምሪያ — መከላከያ፣ ትንበያ እና አስተማማኝነት ምህንድስና'
    },
    category: 'mechanical',
    pages: 15,
    size: '42 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Complete industrial maintenance guide covering PM, PdM, RCM, CMMS, lubrication, mechanical & electrical systems, LOTO safety, KPIs, and troubleshooting.',
      ti: 'ምሉእ ናይ ኢንዳስትሪ ሓለዋ መምርሒ ዝሓዘ PM, PdM, RCM, CMMS, ቅብኢ, ናይ ሜካኒካልን ኤሌክትሪካልን ስርዓታት፣ LOTO ድሕነት፣ KPIs፣ ናይ ምፍታሕ ጸገም ።',
      am: 'ሙሉ የኢንዱስትሪ ጥገና መምሪያ PM፣ PdM፣ RCM፣ CMMS፣ ቅባት፣ ሜካኒካል እና ኤሌክትሪካል ስርዓቶች፣ LOTO ደህንነት፣ KPIs፣ እና የችግር ፈቺ ዘዴዎችን ያካትታል።'
    },
    file: 'pdfs/industrial-maintenance-manual.pdf',
    color: '#22c55e',
    preview: true
  },
  {
    id: 'master-hvac-engineering-complete-guide',
    title: {
      en: 'Master HVAC Engineering — The Complete Professional Guide',
      ti: 'ማስተር HVAC ምህንድስና — ምሉእ ናይ ሞያ መምርሒ',
      am: 'ማስተር HVAC ምህንድስና — ሙሉ ሙያዊ መምሪያ'
    },
    category: 'hvac',
    pages: 11,
    size: '100 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Complete HVAC professional guide covering refrigeration cycle, split & window AC systems, industrial chillers, installation procedures, safety, PPE, and troubleshooting — by Awet G. Nway.',
      ti: 'ምሉእ ናይ HVAC ሞያ መምርሒ ናይ ምዝዋር ዑደት፣ ናይ ምቕዋም & ናይ መስኮት AC ስርዓታት፣ ናይ ኢንዱስትሪ ቺለር፣ ናይ ምትካል ኣሰራርሓ፣ ድሕነት፣ PPE፣ ናይ ምፍታሕ ጸገም ዝሸፍን — ብ Awet G. Nway።',
      am: 'ሙሉ HVAC ሙያዊ መምሪያ ምፍሰሻ ዑደት፣ ስፕሊት & ዊንዶው AC ሥርዓቶች፣ ኢንዱስትሪ ቺለር፣ የጭነት ሂደቶች፣ ደህንነት፣ PPE፣ እና ፍትሻ ዘዴዎችን ዝሸፍን — በ Awet G. Nway።'
    },
    file: 'pdfs/master-hvac-engineering-complete-guide.pdf',
    color: '#22c55e',
    preview: true
  },
  {
    id: 'plc-101-brain-of-industrial-automation',
    title: {
      en: 'PLC 101 — The Brain of Industrial Automation',
      ti: 'PLC 101 — ሓሳብ ናይ ኢንዱስትሪ ኦቶሜሽን',
      am: 'PLC 101 — የኢንዱስትሪ አውቶሜሽን አንጎል'
    },
    category: 'plc',
    pages: 9,
    size: '100 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Beginner-to-pro PLC guide covering scan cycle, hardware building blocks (CPU, PSU, I/O), ladder logic with seal-in contacts, compact vs modular configurations, and IEC 61131-3 languages — by Awet G. Nway.',
      ti: 'ናይ ጀማሪ ክሳብ ሞያ PLC መምርሒ ናይ ስካን ዑደት፣ ናይ ሃርድዌር ኣካላት (CPU, PSU, I/O)፣ Ladder Logic፣ ናይ ምምጻእ ርክብ፣ compact vs modular ዝሸፍን — ብ Awet G. Nway።',
      am: 'ከጀማሪ እስከ ሙያ PLC መምሪያ ስካን ሳይክል፣ ሃርድዌር አካላት (CPU, PSU, I/O)፣ Ladder Logic፣ ማህተም ግንኙነት፣ compact vs modular ዝሸፍን — በ Awet G. Nway።'
    },
    file: 'pdfs/plc-101-brain-of-industrial-automation.pdf',
    color: '#00d4ff',
    preview: true
  },
  {
    id: 'solar-power-101-from-sun-to-socket',
    title: {
      en: 'Solar Power 101 — From Sun to Socket',
      ti: 'ናይ ፀሓይ ሃይሊ 101 — ካብ ፀሓይ ናብ ፕሪዛ',
      am: 'የፀሐይ ኃይል 101 — ከፀሐይ እስከ መሳቢያ'
    },
    category: 'solar',
    pages: 10,
    size: '100 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Complete beginner-to-pro solar PV guide covering PV arrays, MPPT vs PWM charge controllers, battery sizing (lead-acid vs LiFePO4), pure sine inverters, off-grid/grid-tied/hybrid topologies, and a worked off-grid cabin design — by Awet G. Nway.',
      ti: 'ምሉእ ናይ ጀማሪ ናብ ሞያ ናይ ፀሓይ PV መምርሒ ናይ PV arrays፣ MPPT vs PWM charge controllers፣ ናይ battery sizing፣ pure sine inverters፣ off-grid/grid-tied/hybrid ዝሸፍን — ብ Awet G. Nway።',
      am: 'ሙሉ ከጀማሪ እስከ ሙያ የፀሐይ PV መምሪያ PV arrays፣ MPPT vs PWM charge controllers፣ ባትሪ ማስጠናት፣ pure sine inverters፣ off-grid/grid-tied/hybrid ቶፖሎጂዎችን ያካትታል — በ Awet G. Nway።'
    },
    file: 'pdfs/solar-power-101-from-sun-to-socket.pdf',
    color: '#fbbf24',
    preview: true
  },
  {
    id: 'scada-manual',
    title: 'SCADA & HMI Programming Manual',
    category: 'plc',
    pages: 132,
    size: '7.7 MB',
    downloads: '1.6K',
    badge: 'PREMIUM',
    description: 'Industrial SCADA architecture, HMI development, historian setup, and alarm management.',
    file: '#coming-soon',
    color: '#00d4ff',
    preview: false
  },
  {
    id: 'mep-handbook',
    title: 'MEP Engineering Handbook',
    category: 'mechanical',
    pages: 320,
    size: '18.2 MB',
    downloads: '980',
    badge: 'PREMIUM',
    description: 'Comprehensive mechanical, electrical, and plumbing engineering reference for building projects.',
    file: '#coming-soon',
    color: '#a78bfa',
    preview: false
  }
];

/* ============================================================
   TUTORIALS
   url: YouTube video URL or tutorial page path
============================================================ */
const TUTORIALS = [
  {
    id: 'plc-intro',
    title: 'PLC Programming: Getting Started with Siemens S7',
    category: 'plc',
    duration: '45 min',
    level: 'Beginner',
    views: '12K',
    description: 'Step-by-step introduction to Siemens SIMATIC S7-300/400 PLC hardware and software setup.',
    thumbnail: 'assets/images/og-cover.png',
    url: 'https://www.youtube.com/@ayetechub',
    type: 'video'
  },
  {
    id: 'ladder-logic',
    title: 'Ladder Logic Programming Masterclass',
    category: 'plc',
    duration: '1.5 hrs',
    level: 'Beginner',
    views: '8.4K',
    description: 'Complete tutorial on Ladder Logic programming – contacts, coils, timers, counters, and math blocks.',
    thumbnail: 'assets/images/og-cover.png',
    url: 'https://www.youtube.com/@ayetechub',
    type: 'video'
  },
  {
    id: 'electrical-circuits',
    title: 'Electrical Circuit Analysis Fundamentals',
    category: 'electrical',
    duration: '2 hrs',
    level: 'Beginner',
    views: '6.9K',
    description: 'KVL, KCL, Thevenin/Norton theorems, AC/DC circuits with real engineering examples.',
    thumbnail: 'assets/images/og-cover.png',
    url: 'https://www.youtube.com/@ayetechub',
    type: 'video'
  },
  {
    id: 'autocad-2d',
    title: 'AutoCAD 2D Drafting for Engineers',
    category: 'design',
    duration: '3 hrs',
    level: 'Beginner',
    views: '15K',
    description: 'Complete 2D drafting tutorial: lines, dimensions, layers, blocks, and printing layouts.',
    thumbnail: 'assets/images/og-cover.png',
    url: 'https://www.youtube.com/@ayetechub',
    type: 'video'
  },
  {
    id: 'chatgpt-engineering',
    title: 'Using ChatGPT for Engineering Tasks',
    category: 'ai',
    duration: '30 min',
    level: 'Beginner',
    views: '22K',
    description: 'How to use ChatGPT for technical calculations, code generation, report writing, and problem solving.',
    thumbnail: 'assets/images/og-cover.png',
    url: 'https://www.youtube.com/@ayetechub',
    type: 'video'
  },
  {
    id: 'revit-basics',
    title: 'Revit for MEP Engineers – Beginner to Pro',
    category: 'design',
    duration: '4 hrs',
    level: 'Intermediate',
    views: '9.2K',
    description: 'Model HVAC, electrical, and plumbing systems in Autodesk Revit with real project workflows.',
    thumbnail: 'assets/images/og-cover.png',
    url: 'https://www.youtube.com/@ayetechub',
    type: 'video'
  },
  {
    id: 'solar-design-tutorial',
    title: 'Designing a Solar PV System – Complete Tutorial',
    category: 'electrical',
    duration: '2.5 hrs',
    level: 'Intermediate',
    views: '7.1K',
    description: 'Site analysis, system sizing, equipment selection, wiring, and documentation for solar projects.',
    thumbnail: 'assets/images/og-cover.png',
    url: 'https://www.youtube.com/@ayetechub',
    type: 'video'
  },
  {
    id: 'robot-programming',
    title: 'Industrial Robot Programming Basics',
    category: 'plc',
    duration: '2 hrs',
    level: 'Advanced',
    views: '4.8K',
    description: 'Introduction to ABB RAPID and Fanuc TP programming for industrial robot arms.',
    thumbnail: 'assets/images/og-cover.png',
    url: 'https://www.youtube.com/@ayetechub',
    type: 'video'
  }
];

/* ============================================================
   AI TOOLS
============================================================ */
const AI_TOOLS = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'general',
    description: 'Powerful AI for technical writing, code debugging, calculations, and engineering explanations.',
    badge: 'Essential',
    badgeColor: '#22c55e',
    url: 'https://chat.openai.com',
    icon: 'robot',
    color: '#10a37f',
    useCases: ['Technical Writing','Code Generation','Q&A','Calculations']
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    category: 'general',
    description: 'Google\'s multimodal AI – analyze engineering drawings, charts, and documents.',
    badge: 'Essential',
    badgeColor: '#22c55e',
    url: 'https://gemini.google.com',
    icon: 'globe',
    color: '#4285f4',
    useCases: ['Image Analysis','Research','Multimodal','Coding']
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    category: 'coding',
    description: 'AI coding assistant for Python, MATLAB, LabVIEW scripts, and automation programming.',
    badge: 'Coding',
    badgeColor: '#6d28d9',
    url: 'https://github.com/features/copilot',
    icon: 'microchip',
    color: '#24292e',
    useCases: ['Code Completion','Debugging','Refactoring','Documentation']
  },
  {
    id: 'claude',
    name: 'Claude (Anthropic)',
    category: 'general',
    description: 'Advanced AI for long-form analysis, complex problem solving, and technical document review.',
    badge: 'Recommended',
    badgeColor: '#f97316',
    url: 'https://claude.ai',
    icon: 'shield',
    color: '#d97706',
    useCases: ['Document Analysis','Long Context','Safety','Research']
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    category: 'design',
    description: 'AI image generation for creating engineering concept visuals, diagrams, and presentations.',
    badge: 'Design',
    badgeColor: '#ec4899',
    url: 'https://midjourney.com',
    icon: 'compass',
    color: '#7c3aed',
    useCases: ['Concept Art','Visualization','Presentations','Diagrams']
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    category: 'research',
    description: 'AI-powered research engine with real-time web access. Perfect for engineering research.',
    badge: 'Research',
    badgeColor: '#0ea5e9',
    url: 'https://perplexity.ai',
    icon: 'search',
    color: '#0284c7',
    useCases: ['Research','Citations','Up-to-date Info','Technical Search']
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    category: 'productivity',
    description: 'AI integrated into Notion for project docs, meeting notes, and engineering SOPs.',
    badge: 'Productivity',
    badgeColor: '#64748b',
    url: 'https://notion.so',
    icon: 'file',
    color: '#374151',
    useCases: ['Documentation','SOPs','Meeting Notes','Project Tracking']
  },
  {
    id: 'wolfram',
    name: 'Wolfram Alpha',
    category: 'calculations',
    description: 'Computational intelligence for complex engineering math, physics, and unit conversions.',
    badge: 'Math',
    badgeColor: '#dc2626',
    url: 'https://wolframalpha.com',
    icon: 'cogs',
    color: '#dc2626',
    useCases: ['Calculations','Physics','Unit Conversion','Plotting']
  },
  {
    id: 'canva',
    name: 'Canva AI',
    category: 'design',
    description: 'Design platform with powerful AI tools — generate images, create presentations, edit videos, and produce professional visuals in minutes.',
    badge: 'Design',
    badgeColor: '#ec4899',
    url: 'https://canva.com',
    icon: 'compass',
    color: '#7d2ae8',
    useCases: ['Presentations','Graphics','Social Media','Templates']
  },
  {
    id: 'kimi',
    name: 'Kimi 2.6',
    category: 'general',
    description: 'Moonshot AI\'s frontier model with a 1M-token context window — ideal for analyzing large documents, codebases, and multi-step reasoning.',
    badge: 'Recommended',
    badgeColor: '#f97316',
    url: 'https://kimi.ai',
    icon: 'robot',
    color: '#6366f1',
    useCases: ['Long Context','Research','Multimodal','Reasoning']
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    category: 'general',
    description: 'High-performance open-source AI model excelling at math, coding, and scientific reasoning — free and on par with top proprietary models.',
    badge: 'Essential',
    badgeColor: '#22c55e',
    url: 'https://chat.deepseek.com',
    icon: 'search',
    color: '#1e40af',
    useCases: ['Coding','Math','Research','Analysis']
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    category: 'productivity',
    description: 'Industry-leading AI voice generator — create realistic narrations, clone voices, and produce multilingual audio for courses and content.',
    badge: 'Audio',
    badgeColor: '#f59e0b',
    url: 'https://elevenlabs.io',
    icon: 'play',
    color: '#f59e0b',
    useCases: ['Voice Generation','Text-to-Speech','Narration','Multilingual']
  },
  {
    id: 'heygen',
    name: 'HeyGen',
    category: 'productivity',
    description: 'Create professional AI avatar videos — perfect for training videos, course presentations, and explainer content without a camera.',
    badge: 'Video',
    badgeColor: '#8b5cf6',
    url: 'https://heygen.com',
    icon: 'play',
    color: '#8b5cf6',
    useCases: ['AI Avatars','Video Creation','Training Videos','Presentations']
  },
  {
    id: 'notebooklm',
    name: 'NotebookLM',
    category: 'research',
    description: 'Google\'s AI research assistant — upload PDFs, papers, and documents, then chat with them, get summaries, and generate audio overviews.',
    badge: 'Research',
    badgeColor: '#0ea5e9',
    url: 'https://notebooklm.google.com',
    icon: 'file',
    color: '#4285f4',
    useCases: ['Document Analysis','Summarization','Audio Overviews','Note-taking']
  },
  {
    id: 'suno',
    name: 'Suno',
    category: 'productivity',
    description: 'Generate full songs with vocals, instruments, and lyrics from a text prompt — ideal for course intros, background music, and creative projects.',
    badge: 'Audio',
    badgeColor: '#f97316',
    url: 'https://suno.ai',
    icon: 'play',
    color: '#ec4899',
    useCases: ['Music Generation','Jingles','Background Music','Audio Content']
  },
  {
    id: 'capcut',
    name: 'CapCut',
    category: 'design',
    description: 'AI-powered video editor with auto captions, background removal, voice enhancement, and smart templates — free on web and mobile.',
    badge: 'Video',
    badgeColor: '#3b82f6',
    url: 'https://capcut.com',
    icon: 'play',
    color: '#1d4ed8',
    useCases: ['Video Editing','Auto Captions','AI Effects','Social Media']
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    category: 'coding',
    description: 'Anthropic\'s agentic AI coding tool — write, edit, debug, and refactor entire codebases from the terminal using natural language commands.',
    badge: 'Coding',
    badgeColor: '#6d28d9',
    url: 'https://claude.ai/code',
    icon: 'microchip',
    color: '#d97706',
    useCases: ['Code Generation','Debugging','Refactoring','Terminal Agent']
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'coding',
    description: 'Microsoft\'s free, open-source code editor with AI-powered GitHub Copilot, thousands of extensions, and built-in Git and terminal support.',
    badge: 'Coding',
    badgeColor: '#6d28d9',
    url: 'https://code.visualstudio.com',
    icon: 'microchip',
    color: '#007acc',
    useCases: ['Code Editing','Extensions','Debugging','Git Integration']
  },
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'coding',
    description: 'AI-first code editor built on VS Code — write, edit, and debug code with an AI that understands your entire codebase. Tab completion, chat, and multi-file edits.',
    badge: 'Coding',
    badgeColor: '#6d28d9',
    url: 'https://cursor.com',
    icon: 'microchip',
    color: '#1a1a2e',
    useCases: ['AI Code Editing','Codebase Chat','Multi-file Edits','Debugging']
  },
  {
    id: 'lovable',
    name: 'Lovable',
    category: 'coding',
    description: 'Build full-stack web apps by describing them in plain English — Lovable generates React + Supabase apps instantly with no coding required.',
    badge: 'No-Code',
    badgeColor: '#ec4899',
    url: 'https://lovable.dev',
    icon: 'microchip',
    color: '#ec4899',
    useCases: ['App Building','React Apps','No-Code','Prototyping']
  },
  {
    id: 'replit',
    name: 'Replit',
    category: 'coding',
    description: 'Browser-based IDE with built-in AI — code, run, and deploy apps instantly from any device. Great for learning, prototyping, and collaboration.',
    badge: 'Coding',
    badgeColor: '#6d28d9',
    url: 'https://replit.com',
    icon: 'microchip',
    color: '#f26207',
    useCases: ['Online IDE','Deployment','Collaboration','Learning']
  },
  {
    id: 'base64',
    name: 'Base64',
    category: 'coding',
    description: 'AI-powered development platform for building, testing, and deploying applications with intelligent automation and code generation.',
    badge: 'Development',
    badgeColor: '#6d28d9',
    url: 'https://base64.ai',
    icon: 'microchip',
    color: '#f97316',
    useCases: ['App Development','Automation','Code Generation','Deployment']
  },
  {
    id: 'manus-ai',
    name: 'Manus AI',
    category: 'automation',
    description: 'Autonomous AI agent that independently browses the web, writes code, manages files, and completes complex multi-step tasks without human supervision.',
    badge: 'Agent',
    badgeColor: '#8b5cf6',
    url: 'https://manus.im',
    icon: 'robot',
    color: '#7c3aed',
    useCases: ['Autonomous Tasks','Web Browsing','Code Execution','Research']
  },
  {
    id: 'synthesia',
    name: 'Synthesia',
    category: 'productivity',
    description: 'Create professional AI avatar videos from text in minutes — 230+ AI avatars, 140+ languages, no camera or studio needed. Ideal for training and e-learning.',
    badge: 'Video',
    badgeColor: '#8b5cf6',
    url: 'https://synthesia.io',
    icon: 'play',
    color: '#6d28d9',
    useCases: ['AI Avatars','E-Learning','Training Videos','Multilingual']
  },
  {
    id: 'descript',
    name: 'Descript',
    category: 'design',
    description: 'Edit video and podcast audio by editing the transcript — cut filler words, clone your voice, remove background noise, and publish in one tool.',
    badge: 'Video',
    badgeColor: '#3b82f6',
    url: 'https://descript.com',
    icon: 'play',
    color: '#1d4ed8',
    useCases: ['Video Editing','Podcast','Transcription','Voice Clone']
  },
  {
    id: 'opus-clip',
    name: 'Opus Clip',
    category: 'design',
    description: 'AI video repurposing tool — upload long videos and automatically get viral short clips for TikTok, Reels, and YouTube Shorts with captions and highlights.',
    badge: 'Clips',
    badgeColor: '#ec4899',
    url: 'https://opus.pro',
    icon: 'play',
    color: '#9333ea',
    useCases: ['Short Clips','Repurposing','Auto Captions','Social Media']
  },
  {
    id: 'beehiiv',
    name: 'Beehiiv',
    category: 'productivity',
    description: 'AI-powered newsletter and content platform — write, grow, and monetise an email newsletter with built-in AI writing assistance and audience analytics.',
    badge: 'Content',
    badgeColor: '#f59e0b',
    url: 'https://beehiiv.com',
    icon: 'file',
    color: '#f59e0b',
    useCases: ['Newsletter','Email Marketing','Content Creation','Monetisation']
  },
  {
    id: 'grammarly',
    name: 'Grammarly',
    category: 'productivity',
    description: 'AI writing assistant that checks grammar, tone, clarity, and style in real time — works across email, documents, browsers, and coding environments.',
    badge: 'Writing',
    badgeColor: '#22c55e',
    url: 'https://grammarly.com',
    icon: 'file',
    color: '#15803d',
    useCases: ['Grammar Check','Tone','Clarity','Professional Writing']
  },
  {
    id: 'otto-ai',
    name: 'Otto AI',
    category: 'productivity',
    description: 'AI meeting assistant that joins calls, takes notes, generates summaries, and creates action items automatically — works with Zoom, Meet, and Teams.',
    badge: 'Meetings',
    badgeColor: '#0ea5e9',
    url: 'https://ottogrid.ai',
    icon: 'users',
    color: '#0284c7',
    useCases: ['Meeting Notes','Summaries','Action Items','Research Grid']
  },
  {
    id: 'gamma',
    name: 'Gamma',
    category: 'productivity',
    description: 'Create beautiful presentations, documents, and web pages from a text prompt — AI designs the layout, visuals, and content for you in seconds.',
    badge: 'Presentations',
    badgeColor: '#8b5cf6',
    url: 'https://gamma.app',
    icon: 'file',
    color: '#7c3aed',
    useCases: ['Presentations','Documents','Web Pages','AI Design']
  },
  {
    id: 'granola',
    name: 'Granola',
    category: 'productivity',
    description: 'AI notepad for meetings — runs locally on your Mac, listens to meetings in the background, and generates structured notes enhanced by AI after the call.',
    badge: 'Meetings',
    badgeColor: '#22c55e',
    url: 'https://granola.so',
    icon: 'file',
    color: '#16a34a',
    useCases: ['Meeting Notes','Transcription','Summaries','Mac Native']
  },
  {
    id: 'superhuman',
    name: 'Superhuman',
    category: 'productivity',
    description: 'The fastest email client — AI-powered inbox with instant summaries, smart replies, and keyboard shortcuts to reach inbox zero in minutes per day.',
    badge: 'Email',
    badgeColor: '#ef4444',
    url: 'https://superhuman.com',
    icon: 'envelope',
    color: '#dc2626',
    useCases: ['Email','Inbox Zero','AI Replies','Productivity']
  },
  {
    id: 'wispr-flow',
    name: 'Wispr Flow',
    category: 'productivity',
    description: 'AI dictation tool that lets you speak and type 3× faster — works system-wide on Mac, understands context, and auto-formats what you say.',
    badge: 'Voice',
    badgeColor: '#6d28d9',
    url: 'https://wispr.ai',
    icon: 'microphone',
    color: '#7c3aed',
    useCases: ['Voice Dictation','Writing','Speed','Mac App']
  },
  {
    id: 'runway',
    name: 'Runway',
    category: 'design',
    description: 'AI video generation and editing studio — generate videos from text or images, apply cinematic effects, and produce professional content with Gen-3 Alpha.',
    badge: 'Video AI',
    badgeColor: '#ec4899',
    url: 'https://runwayml.com',
    icon: 'play',
    color: '#db2777',
    useCases: ['Video Generation','Text-to-Video','Editing','VFX']
  },
  {
    id: 'kling',
    name: 'Kling',
    category: 'design',
    description: 'Kuaishou\'s AI video generator — produce high-quality 5-second to 2-minute videos from text or image prompts with realistic motion and cinematic quality.',
    badge: 'Video AI',
    badgeColor: '#f97316',
    url: 'https://klingai.com',
    icon: 'play',
    color: '#ea580c',
    useCases: ['Video Generation','Text-to-Video','Image-to-Video','Cinematic']
  },
  {
    id: 'pika-labs',
    name: 'Pika Labs',
    category: 'design',
    description: 'AI video creation platform — animate images, generate videos from text, and apply creative effects like lip sync, scene changes, and object modifications.',
    badge: 'Video AI',
    badgeColor: '#8b5cf6',
    url: 'https://pika.art',
    icon: 'play',
    color: '#6d28d9',
    useCases: ['Image Animation','Text-to-Video','Lip Sync','Creative Effects']
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'design',
    description: 'The industry-standard UI/UX design tool — collaborative interface design, prototyping, and design systems with AI-powered Make Designs and First Draft features.',
    badge: 'Design',
    badgeColor: '#ec4899',
    url: 'https://figma.com',
    icon: 'compass',
    color: '#f24e1e',
    useCases: ['UI Design','Prototyping','Collaboration','Design Systems']
  },
  {
    id: 'google-veo',
    name: 'Google Veo',
    category: 'design',
    description: 'Google DeepMind\'s state-of-the-art AI video generation model — create high-quality cinematic videos from text and image prompts via Vertex AI and VideoFX.',
    badge: 'Video AI',
    badgeColor: '#4285f4',
    url: 'https://deepmind.google/technologies/veo',
    icon: 'play',
    color: '#1a73e8',
    useCases: ['Video Generation','Cinematic','Text-to-Video','Google AI']
  },
  {
    id: 'higgsfield',
    name: 'Higgsfield',
    category: 'design',
    description: 'AI video generation with precise camera control — direct cinematic shots with custom camera movements, stabilisation, and Hollywood-style motion.',
    badge: 'Video AI',
    badgeColor: '#f59e0b',
    url: 'https://higgsfield.ai',
    icon: 'play',
    color: '#d97706',
    useCases: ['Camera Control','Video Generation','Cinematic','Motion Design']
  },
  {
    id: 'softr',
    name: 'Softr',
    category: 'automation',
    description: 'Build web apps, client portals, and internal tools from Airtable or Google Sheets — no code needed, with AI to generate layouts and logic automatically.',
    badge: 'No-Code',
    badgeColor: '#22c55e',
    url: 'https://softr.io',
    icon: 'cogs',
    color: '#16a34a',
    useCases: ['No-Code Apps','Client Portals','Airtable','Internal Tools']
  },
  {
    id: 'n8n',
    name: 'n8n',
    category: 'automation',
    description: 'Open-source workflow automation tool — connect 400+ apps, build AI agents, and automate complex workflows with code or visual drag-and-drop.',
    badge: 'Automation',
    badgeColor: '#f97316',
    url: 'https://n8n.io',
    icon: 'cogs',
    color: '#ea580c',
    useCases: ['Workflow Automation','AI Agents','Open Source','Integration']
  },
  {
    id: 'zapier',
    name: 'Zapier',
    category: 'automation',
    description: 'Connect 7,000+ apps and automate repetitive tasks with no code — set triggers and actions to move data, send notifications, and run workflows automatically.',
    badge: 'Automation',
    badgeColor: '#f97316',
    url: 'https://zapier.com',
    icon: 'cogs',
    color: '#ff4a00',
    useCases: ['App Integration','Workflow Automation','No-Code','Triggers']
  },
  {
    id: 'lindy-ai',
    name: 'Lindy AI',
    category: 'automation',
    description: 'Build AI agents that handle email, scheduling, CRM updates, and customer support — Lindy automates your entire workflow without writing a single line of code.',
    badge: 'AI Agent',
    badgeColor: '#8b5cf6',
    url: 'https://lindy.ai',
    icon: 'robot',
    color: '#6d28d9',
    useCases: ['AI Agents','Email Automation','CRM','Scheduling']
  },
  {
    id: 'chatbase',
    name: 'Chatbase',
    category: 'automation',
    description: 'Build custom AI chatbots trained on your own data — upload documents, connect your website, and deploy a GPT-powered chatbot for support and lead generation.',
    badge: 'Chatbot',
    badgeColor: '#0ea5e9',
    url: 'https://chatbase.co',
    icon: 'robot',
    color: '#0284c7',
    useCases: ['Custom Chatbots','Customer Support','Lead Gen','Knowledge Base']
  },
  {
    id: 'apify',
    name: 'Apify',
    category: 'automation',
    description: 'Web scraping and automation platform — extract data from any website, build AI-ready datasets, and automate browser tasks with 2,000+ ready-made actors.',
    badge: 'Scraping',
    badgeColor: '#22c55e',
    url: 'https://apify.com',
    icon: 'cogs',
    color: '#0f9d58',
    useCases: ['Web Scraping','Data Extraction','Browser Automation','AI Datasets']
  },
  {
    id: 'clay',
    name: 'Clay',
    category: 'automation',
    description: 'AI-powered data enrichment and outreach platform — research prospects, enrich contact data with 100+ sources, and write personalised messages at scale.',
    badge: 'Outreach',
    badgeColor: '#8b5cf6',
    url: 'https://clay.com',
    icon: 'users',
    color: '#7c3aed',
    useCases: ['Lead Enrichment','Outreach','Sales Automation','Data Research']
  }
];

/* ============================================================
   CAD & ENGINEERING SOFTWARE
============================================================ */
const CAD_TOOLS = [
  {
    id: 'autocad',
    name: 'AutoCAD',
    category: 'drafting',
    description: 'Autodesk\'s industry-standard 2D drafting and 3D modelling software — used worldwide for engineering drawings, architectural plans, and technical documentation. Free student licence via Autodesk Education.',
    badge: 'Industry Standard',
    badgeColor: '#ef4444',
    url: 'https://www.autodesk.com/products/autocad/overview',
    icon: 'compass',
    color: '#b91c1c',
    useCases: ['2D Drafting', '3D Modelling', 'Engineering Drawings', 'Free Student Licence']
  },
  {
    id: 'revit',
    name: 'Revit',
    category: 'bim',
    description: 'Autodesk\'s BIM platform for architects, structural engineers, and MEP professionals. Design, document, and coordinate building projects in one intelligent model. Free student licence via Autodesk Education.',
    badge: 'BIM Standard',
    badgeColor: '#3b82f6',
    url: 'https://www.autodesk.com/products/revit/overview',
    icon: 'industry',
    color: '#1d4ed8',
    useCases: ['BIM Modelling', 'Architecture', 'MEP Engineering', 'Free Student Licence']
  },
  {
    id: 'coohom',
    name: 'Coohom',
    category: 'design',
    description: 'Cloud-based 3D interior design and rendering platform — create photorealistic renders, floor plans, and virtual walkthroughs instantly with no installation. Free plan available with paid upgrades.',
    badge: 'Free Plan',
    badgeColor: '#22c55e',
    url: 'https://www.coohom.com',
    icon: 'compass',
    color: '#7c3aed',
    useCases: ['Interior Design', '3D Rendering', 'Floor Plans', 'Virtual Walkthroughs']
  },
  {
    id: 'prota-structure',
    name: 'Prota Structure',
    category: 'structural',
    description: 'Comprehensive structural analysis and design software by Prota Software — covers reinforced concrete, steel, and timber design with full BIM integration. Free trial and student licences available.',
    badge: 'Free Trial',
    badgeColor: '#f97316',
    url: 'https://www.protasoftware.com',
    icon: 'cogs',
    color: '#ea580c',
    useCases: ['Structural Analysis', 'RC Design', 'Steel Design', 'BIM Integration']
  }
];

/* ============================================================
   DOWNLOADS
============================================================ */
const DOWNLOADS = [
  {
    id: 'electrical-qa',
    title: 'Basic Electrical Engineering – 400 Q&A',
    category: 'study',
    type: 'Interactive Quiz',
    size: '2.1 MB',
    downloads: '4.8K',
    description: 'Interactive quiz with 400 questions covering all electrical engineering fundamentals.',
    badge: 'FREE',
    badgeColor: '#22c55e',
    file: 'electrical-qa.html',
    icon: 'bolt',
    color: '#eab308',
    openable: true
  },
  {
    id: 'plc-simulator',
    title: 'PLC Ladder Logic Simulator',
    category: 'software',
    type: 'Interactive Tool',
    size: 'Online',
    downloads: '2.3K',
    description: 'Browser-based Ladder Logic simulator — toggle real inputs, watch outputs react in real time. Motor start/stop, E-stop, TON timer, conveyor, alarm rungs included.',
    badge: 'FREE',
    badgeColor: '#22c55e',
    file: 'downloads/plc-simulator.html',
    icon: 'microchip',
    color: '#00d4ff',
    openable: true
  },
  {
    id: 'hvac-calc',
    title: 'HVAC Load Calculator',
    category: 'tools',
    type: 'Interactive Calculator',
    size: 'Online',
    downloads: '1.7K',
    description: 'Full ASHRAE-method HVAC heating & cooling load calculator. Enter room dimensions, climate, insulation, occupants, lighting and equipment — get kW, tons of refrigeration, and equipment recommendations instantly.',
    badge: 'FREE',
    badgeColor: '#22c55e',
    file: 'downloads/hvac-calculator.html',
    icon: 'cogs',
    color: '#22c55e',
    openable: true
  },
  {
    id: 'solar-calc',
    title: 'Solar PV Sizing Calculator',
    category: 'tools',
    type: 'Interactive Calculator',
    size: 'Online',
    downloads: '2.9K',
    description: 'Complete solar PV sizing tool — build your load schedule, select location (Tigray, Addis, Nairobi, Dubai, etc.), get panel kWp, battery kWh, inverter size, and full cost estimate.',
    badge: 'FREE',
    badgeColor: '#22c55e',
    file: 'downloads/solar-calculator.html',
    icon: 'bolt',
    color: '#fbbf24',
    openable: true
  },
  {
    id: 'engineering-formulas',
    title: 'Engineering Formulas Reference Card',
    category: 'study',
    type: 'Interactive Reference',
    size: 'Online',
    downloads: '6.1K',
    description: '60+ essential formulas across 6 disciplines — Electrical, Mechanical, HVAC, Civil/Structural, PLC & Control, Mathematics. Searchable, organised by category, with units and worked explanations.',
    badge: 'FREE',
    badgeColor: '#22c55e',
    file: 'downloads/engineering-formulas.html',
    icon: 'file',
    color: '#a78bfa',
    openable: true
  },
  {
    id: 'wiring-diagrams',
    title: 'Industrial Wiring Diagrams Library',
    category: 'design',
    type: 'Interactive Diagrams',
    size: 'Online',
    downloads: '1.1K',
    description: '5 expert industrial wiring diagrams: DOL motor starter, Star-Delta starter, VFD drive wiring, PLC I/O connections, and E-Stop/LOTO safety circuits — with engineering notes and standards references.',
    badge: 'FREE',
    badgeColor: '#22c55e',
    file: 'downloads/wiring-diagrams.html',
    icon: 'bolt',
    color: '#f97316',
    openable: true
  }
];

/* ============================================================
   BLOG POSTS
============================================================ */
const BLOG_POSTS = [
  {
    id: 'ai-future-engineering',
    title: 'How AI is Transforming Engineering in Africa',
    category: 'ai',
    date: '2026-05-10',
    author: 'Awet G. Nway',
    readTime: '6 min read',
    excerpt: 'Artificial intelligence is rapidly changing how engineers design, simulate, and optimize systems. Here\'s how African engineers can leverage these tools today.',
    image: 'assets/images/og-cover.png',
    url: 'blog/ai-future-engineering.html',
    featured: true
  },
  {
    id: 'plc-programming-tips',
    title: 'Top 10 PLC Programming Best Practices',
    category: 'plc',
    date: '2026-04-28',
    author: 'Awet G. Nway',
    readTime: '8 min read',
    excerpt: 'Write clean, maintainable PLC code that stands the test of time. These best practices come from real industrial project experience.',
    image: 'assets/images/og-cover.png',
    url: 'blog/plc-programming-tips.html',
    featured: true
  },
  {
    id: 'solar-system-design-guide',
    title: 'How to Design an Off-Grid Solar System: The Engineer\'s Complete Guide',
    category: 'solar',
    date: '2026-06-03',
    author: 'Awet G. Nway',
    readTime: '14 min read',
    excerpt: 'Eight-step engineering design process for off-grid solar — load schedule, worst-month PSH, panel sizing with temperature derating, LiFePO4 battery bank, MPPT controller, inverter selection, DC cable sizing, earthing. Full calculations for a school in Tigray with real numbers throughout.',
    image: 'assets/images/og-cover.png',
    url: 'blog/solar-system-design-guide.html',
    featured: true
  },
  {
    id: 'solar-tigray',
    title: 'Solar Energy Opportunities in Tigray, Ethiopia',
    category: 'solar',
    date: '2026-04-15',
    author: 'Awet G. Nway',
    readTime: '10 min read',
    excerpt: 'Tigray has one of the highest solar irradiance levels in Ethiopia. This article explores the technical and economic case for solar deployment.',
    image: 'assets/images/og-cover.png',
    url: 'blog/solar-tigray.html',
    featured: false
  },
  {
    id: 'revit-vs-autocad',
    title: 'Revit vs AutoCAD: Which Should Engineers Learn First?',
    category: 'design',
    date: '2026-04-02',
    author: 'Awet G. Nway',
    readTime: '5 min read',
    excerpt: 'Comparing the two most popular design tools in engineering. The answer depends on your specialization and career goals.',
    image: 'assets/images/og-cover.png',
    url: 'blog/revit-vs-autocad.html',
    featured: false
  },
  {
    id: 'free-engineering-pdfs',
    title: 'The Best Free Engineering PDF Resources for 2026',
    category: 'study',
    date: '2026-03-20',
    author: 'Awet G. Nway',
    readTime: '7 min read',
    excerpt: 'A curated list of free, high-quality engineering reference books, manuals, and study guides available for download.',
    image: 'assets/images/og-cover.png',
    url: 'blog/free-engineering-pdfs.html',
    featured: false
  },
  {
    id: 'hvac-system-selection-guide',
    title: 'VRF vs Chiller vs Split AC: The Engineer\'s Guide to Choosing the Right HVAC System',
    category: 'hvac',
    date: '2026-06-03',
    author: 'Awet G. Nway',
    readTime: '12 min read',
    excerpt: 'How to select the right cooling system for any building — split AC, VRF heat recovery, or central chilled water. Complete comparison table, 7-question decision framework, real project examples, energy payback analysis for Ethiopian electricity costs, and 6 common selection mistakes that cost engineers dearly.',
    image: 'assets/images/og-cover.png',
    url: 'blog/hvac-system-selection-guide.html',
    featured: true
  },
  {
    id: 'hvac-fundamentals',
    title: 'HVAC System Design: A Practical Beginner\'s Guide',
    category: 'hvac',
    date: '2026-03-05',
    author: 'Awet G. Nway',
    readTime: '12 min read',
    excerpt: 'Understanding heating and cooling loads, duct design, and equipment selection without the textbook complexity.',
    image: 'assets/images/og-cover.png',
    url: 'blog/hvac-fundamentals.html',
    featured: false
  },
  {
    id: 'ai-tools-comparison-engineers',
    title: 'ChatGPT vs Claude vs Gemini vs Copilot: The Honest Guide for Engineers in 2026',
    category: 'ai',
    date: '2026-06-03',
    author: 'Awet G. Nway',
    readTime: '10 min read',
    excerpt: 'Which AI tool should engineers actually use? An honest, practical comparison of ChatGPT (o1/o3), Claude, Gemini, and Microsoft Copilot — with real engineering prompts, a side-by-side comparison table, and a hybrid workflow that combines all four for maximum productivity.',
    image: 'assets/images/og-cover.png',
    url: 'blog/ai-tools-comparison-engineers.html',
    featured: true
  },
  {
    id: 'plumbing-building-systems',
    title: 'Common Plumbing Failures in Buildings: Causes, Diagnosis & Engineering Solutions',
    category: 'plumbing',
    date: '2026-06-03',
    author: 'Awet G. Nway',
    readTime: '12 min read',
    excerpt: 'The seven most costly plumbing failures — pipe corrosion, water hammer, Legionella contamination, low pressure, drain blockages, frozen pipes, and backflow — explained with root causes, diagnosis methods, and engineering prevention strategies.',
    image: 'assets/images/og-cover.png',
    url: 'blog/plumbing-building-systems.html',
    featured: true
  },
  {
    id: 'progressive-overload',
    title: 'Progressive Overload: The Science of Never Plateauing',
    category: 'fit-hub',
    date: '2026-06-02',
    author: 'Awet G. Nway',
    readTime: '7 min read',
    excerpt: 'Progressive overload is the single most important principle in strength training. Learn the 7 methods to apply it — weight, reps, sets, rest, range of motion — so you never plateau again.',
    image: 'assets/images/og-cover.png',
    url: 'blog/progressive-overload.html',
    featured: true
  },
  {
    id: 'hiit-vs-cardio',
    title: 'HIIT vs Steady-State Cardio: Which Burns More Fat?',
    category: 'fit-hub',
    date: '2026-06-02',
    author: 'Awet G. Nway',
    readTime: '6 min read',
    excerpt: 'HIIT burns more calories per minute. Steady-state builds your aerobic base. The answer to which burns more fat is nuanced — and the optimal approach uses both strategically.',
    image: 'assets/images/og-cover.png',
    url: 'blog/hiit-vs-cardio.html',
    featured: false
  },
  {
    id: 'nutrition-busy-engineers',
    title: 'Nutrition Basics for Busy Engineers: Macros Made Simple',
    category: 'fit-hub',
    date: '2026-06-02',
    author: 'Awet G. Nway',
    readTime: '8 min read',
    excerpt: 'Training is 20–30% of your results. Nutrition is 70–80%. Master protein targets, carb timing, hydration, and the 5 simple rules that work for people with demanding schedules.',
    image: 'assets/images/og-cover.png',
    url: 'blog/nutrition-busy-engineers.html',
    featured: false
  },
  {
    id: 'sleep-and-recovery',
    title: 'Sleep & Recovery: The Overlooked Performance Tool',
    category: 'fit-hub',
    date: '2026-06-02',
    author: 'Awet G. Nway',
    readTime: '7 min read',
    excerpt: 'Sleep is when your body builds muscle, burns fat hormones, and repairs tissue. Learn the science of growth hormone, cortisol, hunger hormones, and the 5 sleep improvements to start tonight.',
    image: 'assets/images/og-cover.png',
    url: 'blog/sleep-and-recovery.html',
    featured: false
  },
  {
    id: 'critical-thinking-engineers',
    title: 'Critical Thinking for Engineers: The Skill That Separates Good from Great',
    category: 'critical-thinking',
    date: '2026-06-02',
    author: 'Awet G. Nway',
    readTime: '10 min read',
    excerpt: 'Critical thinking is the most underrated engineering skill. Learn the 6 intellectual standards, 5 cognitive biases engineers fall into, real disaster case studies, and a practical daily framework to sharpen your reasoning.',
    image: 'assets/images/og-cover.png',
    url: 'blog/critical-thinking-engineers.html',
    featured: true
  }
];
