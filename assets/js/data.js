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
    id: 'plc-guide',
    title: {
      en: 'PLC Programming Complete Guide',
      ti: 'ምሉእ መምርሒ PLC ፕሮግራሚን',
      am: 'PLC ፕሮግራሚንግ ሙሉ መምሪያ'
    },
    category: 'plc',
    pages: 142,
    size: '8.4 MB',
    downloads: '3.2K',
    badge: 'FREE',
    description: {
      en: 'Comprehensive Siemens S7 PLC guide covering Ladder Logic, FBD, and industrial programming.',
      ti: 'ምሉእ Siemens S7 PLC መምርሒ ናይ Ladder Logic, FBD, ናይ ኢንዱስትሪ ፕሮግራሚን ዝሸፍን።',
      am: 'ሙሉ Siemens S7 PLC መምሪያ Ladder Logic, FBD, እና ኢንዱስትሪ ፕሮግራሚንግ የሚሸፍን።'
    },
    file: 'pdfs/plc-programming-guide.pdf',
    color: '#00d4ff',
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
    pages: 98,
    size: '5.2 MB',
    downloads: '2.8K',
    badge: 'FREE',
    description: {
      en: 'Complete electrical safety standards, LOTO procedures, and arc flash protection guide.',
      ti: 'ምሉእ ናይ ኤለክትሪካዊ ድሕነት ደረጃ፣ LOTO ኣሰራርሓ፣ ናይ Arc Flash ምክልኻል መምርሒ።',
      am: 'ሙሉ ኤሌክትሪካዊ ደህንነት ደረጃዎች፣ LOTO ሂደቶች፣ እና Arc Flash ጥበቃ መምሪያ።'
    },
    file: 'pdfs/electrical-safety-handbook.pdf',
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
    pages: 24,
    size: '1.8 MB',
    downloads: '5.1K',
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
    category: 'design',
    pages: 210,
    size: '12.6 MB',
    downloads: '1.9K',
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
    id: 'hvac-design',
    title: 'HVAC System Design Manual',
    category: 'mechanical',
    pages: 178,
    size: '9.8 MB',
    downloads: '1.4K',
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
    category: 'electrical',
    pages: 88,
    size: '6.1 MB',
    downloads: '2.1K',
    badge: 'FREE',
    description: 'Complete off-grid and on-grid solar PV design from site assessment to commissioning.',
    file: 'pdfs/solar-pv-design-guide.pdf',
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
    type: 'Software',
    size: 'Online',
    downloads: '2.3K',
    description: 'Browser-based Ladder Logic simulator to practice PLC programming without hardware.',
    badge: 'FREE',
    badgeColor: '#22c55e',
    file: '#coming-soon',
    icon: 'microchip',
    color: '#00d4ff',
    openable: false
  },
  {
    id: 'hvac-calc',
    title: 'HVAC Load Calculator (Excel)',
    category: 'tools',
    type: 'Excel Tool',
    size: '845 KB',
    downloads: '1.7K',
    description: 'Automated HVAC heating and cooling load calculation spreadsheet for buildings.',
    badge: 'FREE',
    badgeColor: '#22c55e',
    file: 'downloads/hvac-load-calculator.xlsx',
    icon: 'cogs',
    color: '#22c55e',
    openable: false
  },
  {
    id: 'solar-calc',
    title: 'Solar PV Sizing Calculator (Excel)',
    category: 'tools',
    type: 'Excel Tool',
    size: '620 KB',
    downloads: '2.9K',
    description: 'Complete solar panel array sizing, battery bank, and inverter selection spreadsheet.',
    badge: 'FREE',
    badgeColor: '#22c55e',
    file: 'downloads/solar-sizing-calculator.xlsx',
    icon: 'bolt',
    color: '#fbbf24',
    openable: false
  },
  {
    id: 'engineering-formulas',
    title: 'Engineering Formulas Reference Card',
    category: 'study',
    type: 'PDF',
    size: '1.2 MB',
    downloads: '6.1K',
    description: 'Quick reference card with essential formulas for electrical, mechanical, and civil engineering.',
    badge: 'FREE',
    badgeColor: '#22c55e',
    file: 'downloads/engineering-formulas.pdf',
    icon: 'file',
    color: '#a78bfa',
    openable: false
  },
  {
    id: 'wiring-diagrams',
    title: 'Industrial Wiring Diagrams Pack',
    category: 'design',
    type: 'ZIP Archive',
    size: '15.4 MB',
    downloads: '1.1K',
    description: '50+ professional industrial wiring diagrams for motors, starters, VFDs, and PLCs.',
    badge: 'PREMIUM',
    badgeColor: '#eab308',
    file: '#coming-soon',
    icon: 'bolt',
    color: '#f97316',
    openable: false
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
    url: '#',
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
    url: '#',
    featured: true
  },
  {
    id: 'solar-tigray',
    title: 'Solar Energy Opportunities in Tigray, Ethiopia',
    category: 'electrical',
    date: '2026-04-15',
    author: 'Awet G. Nway',
    readTime: '10 min read',
    excerpt: 'Tigray has one of the highest solar irradiance levels in Ethiopia. This article explores the technical and economic case for solar deployment.',
    image: 'assets/images/og-cover.png',
    url: '#',
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
    url: '#',
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
    url: '#',
    featured: false
  },
  {
    id: 'hvac-fundamentals',
    title: 'HVAC System Design: A Practical Beginner\'s Guide',
    category: 'mechanical',
    date: '2026-03-05',
    author: 'Awet G. Nway',
    readTime: '12 min read',
    excerpt: 'Understanding heating and cooling loads, duct design, and equipment selection without the textbook complexity.',
    image: 'assets/images/og-cover.png',
    url: '#',
    featured: false
  }
];
