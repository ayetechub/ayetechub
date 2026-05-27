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
    pages: 23,
    size: '68 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Comprehensive Siemens S7 PLC guide covering Ladder Logic, FBD, Structured Text, HMI, PROFINET, Safety SIL, and career pathways — by Awet G. Nway.',
      ti: 'ምሉእ Siemens S7 PLC መምርሒ ናይ Ladder Logic, FBD, ናይ ኢንዱስትሪ ፕሮግራሚን ዝሸፍን።',
      am: 'ሙሉ Siemens S7 PLC መምሪያ Ladder Logic, FBD, እና ኢንዱስትሪ ፕሮግራሚንግ የሚሸፍን።'
    },
    file: 'pdfs/plc-programming-guide.pdf',
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
    pages: 21,
    size: '56 KB',
    downloads: '0',
    badge: 'FREE',
    description: {
      en: 'Complete electrical safety handbook: LOTO procedures, arc flash protection, PPE selection, grounding, NFPA 70E, IEC 60364, OSHA compliance — by Awet G. Nway.',
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
    category: 'design',
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
    id: 'hvac-design',
    title: 'HVAC System Design Manual',
    category: 'mechanical',
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
    category: 'electrical',
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
    category: 'electrical',
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
    category: 'mechanical',
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
    category: 'electrical',
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
