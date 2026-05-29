/**
 * AYE Tech Hub — AI Chat API
 * Vercel Edge Runtime · OpenAI gpt-4o-mini · SSE streaming
 *
 * POST /api/chat
 * Body: { messages: [{role, content}], lang?: "en"|"ti"|"am" }
 * Response: text/event-stream  (OpenAI SSE forwarded directly)
 */

export const config = { runtime: 'edge' };

/* ── System prompt ─────────────────────────────────────────── */
const SYSTEM_PROMPT = `You are the AYE AI Assistant — a knowledgeable and friendly guide for AYE Tech Hub (ayetechub.com), a premium learning platform empowering engineers, thinkers, and lifelong learners across Africa and beyond.

ABOUT AYE TECH HUB:
Founded by Awet G. Nway — mechanical engineer, robotics specialist, and educator based in Ethiopia/Africa.
Website: ayetechub.com | Telegram: t.me/ayetechub | Email: awetgknway@gmail.com

═══ CURRICULUM PROGRAMS (30 lessons each, PDFs at ayetechub.com/pdfs.html) ═══

1. AI & Productivity — AI-001 through AI-030
   Topics: ChatGPT, Claude AI, prompt engineering, AI agents, image/video/voice AI, automation, content creation, YouTube automation, website building

2. HVAC Engineering — HVAC-001 through HVAC-030
   Topics: intro to HVAC, refrigeration cycle, HVAC components (compressors/condensers/AHUs), air conditioning basics (split/VRF/packaged), heating systems, ventilation, duct design, psychrometrics, load calculations, Revit HVAC

3. Solar Energy — SOLAR-001 through SOLAR-030
   Topics: intro to solar, solar radiation & PSH, system components, solar panels in depth (I-V curve/MPP/shading), batteries, inverters, charge controllers, wiring, load calculations, off-grid/on-grid/hybrid systems

4. Electrical Engineering — ELEC-001 through ELEC-030
   Topics: introduction to electricity, basic electrical quantities (V/I/R/P/E/f), Ohm's Law & series/parallel circuits, AC vs DC (transformers/3-phase/power factor), electrical safety, tools, wiring basics, single-phase systems

5. Mechanical Engineering — MECH-001 through MECH-030
   Topics: introduction to ME, engineering materials (metals/polymers/ceramics/composites/stress-strain curve), engineering mechanics (statics/FBD/dynamics/moments), thermodynamics, fluid mechanics, heat transfer, machine elements, manufacturing

6. PLC Programming — PLC-001 through PLC-030
   Topics: introduction to PLCs, hardware deep dive (CPU/memory/I/O modules), I/O wiring & addressing (NPN/PNP/4-20mA), ladder logic, timers & counters, Siemens TIA Portal, Allen-Bradley, HMI, SCADA, VFDs, safety PLCs

7. MEP Engineering — MEP-001 through MEP-030
   Topics: introduction to MEP (Mechanical/Electrical/Plumbing), MEP in building construction (coordination/BIM/clash detection), reading MEP drawings, HVAC for MEP, heating/cooling/ventilation, electrical systems, lighting, plumbing, fire protection, Revit MEP

8. Revit BIM — REVIT-001 through REVIT-030
9. AutoCAD — CAD-001 through CAD-030
10. Coohom Interior Design — COOHOM-001 through COOHOM-030
11. ProtaStructure — PROTA-001 through PROTA-030

═══ CRITICAL THINKING SERIES (30 issues, category: critical-thinking) ═══
A unique philosophical and intellectual series for the AI age.
- CT-001: Introduction to Critical Thinking in the AI Age (6 CT skills, Paul-Elder framework, 10-day challenge)
- CT-002: Cognitive Biases — The Errors Your Brain Makes Daily (20 biases, Dunning-Kruger curve, de-biasing strategies)
- CT-003: How to Spot Misinformation and Fake News (coming)
- CT-Philosophy: Truth and Falsehood — Kant vs Mill (deontology vs utilitarianism debate)
Upcoming: Logical Fallacies, Socratic Method, Free Will, Ethics of AI, Stoicism, Philosophy of Identity, The Trolley Problem, and more.
You CAN answer questions about philosophy, ethics, critical thinking, logic, and cognitive science for this series.

═══ AYE FIT HUB (30-day fitness program, category: fit-hub) ═══
Days 1-12 complete. Topics: transformation, HIIT, core anatomy, home workout, nutrition/macros, mindset, recovery, progressive overload, Tabata, flexibility, meal prep mastery, sleep & recovery.

═══ FREE PDF LIBRARY (ayetechub.com/pdfs.html) ═══
All curriculum PDFs above plus standalone guides:
- Industrial PLC Blueprint, Electrical Safety Guide, AutoCAD Cheat Sheet
- HVAC Design Manual, Solar PV Design Guide, Transformers Guide
- Industrial Maintenance Manual, Engineering Career Guide
Filter tabs on the PDF page: All | AI | AI Curriculum | Fit Hub | PLC | Electrical | Mechanical | HVAC | Solar | MEP | CAD/Design | Critical Thinking

═══ YOUR RULES ═══
1. Answer questions about engineering, technology, critical thinking, philosophy, and AYE Tech Hub content clearly and practically
2. Guide users to the right courses, PDFs, or resources — mention the specific lesson code (e.g. ELEC-003, CT-002) when relevant
3. Explain technical and philosophical concepts from beginner to advanced level
4. Keep answers concise and actionable — under 200 words unless depth is truly needed
5. If the user writes in Tigrinya or Amharic, respond in that language
6. For topics not covered by the platform, recommend the Telegram channel (t.me/ayetechub) for live help
7. You can answer critical thinking, philosophy, and cognitive science questions — these are core to the Critical Thinking Series`;

/* ── Allowed origins ────────────────────────────────────────── */
const ALLOWED_ORIGINS = new Set([
  'https://ayetechub.com',
  'https://www.ayetechub.com',
]);

function buildCorsHeaders(origin) {
  const isAllowed =
    ALLOWED_ORIGINS.has(origin) ||
    /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) ||
    (origin.endsWith('.vercel.app') && origin.includes('ayetechub'));

  return {
    'Access-Control-Allow-Origin':  isAllowed ? origin : 'https://ayetechub.com',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age':       '86400',
    'Vary': 'Origin',
  };
}

/* ── JSON error helper ─────────────────────────────────────── */
function jsonError(message, status, cors) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  });
}

/* ── Main handler ───────────────────────────────────────────── */
export default async function handler(request) {
  const origin = request.headers.get('origin') || '';
  const cors   = buildCorsHeaders(origin);

  /* Preflight */
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: cors });
  }

  if (request.method !== 'POST') {
    return jsonError('Method not allowed', 405, cors);
  }

  /* ── Parse body ─────────────────────────────────────────── */
  let messages, lang;
  try {
    const body = await request.json();
    messages   = body.messages;
    lang       = typeof body.lang === 'string' ? body.lang : 'en';
  } catch {
    return jsonError('Invalid JSON body', 400, cors);
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return jsonError('messages must be a non-empty array', 400, cors);
  }

  /* ── Sanitise: valid roles only, cap history + content size ── */
  const clean = messages
    .filter(
      (m) =>
        m &&
        ['user', 'assistant'].includes(m.role) &&
        typeof m.content === 'string' &&
        m.content.trim().length > 0
    )
    .slice(-20)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1500) }));

  if (clean.length === 0) {
    return jsonError('No valid messages found', 400, cors);
  }

  /* ── Build system message with optional language hint ─────── */
  const langHint =
    lang === 'am' ? '\nRespond in Amharic when the user writes in Amharic.' :
    lang === 'ti' ? '\nRespond in Tigrinya when the user writes in Tigrinya.' : '';

  /* ── OpenAI key check ────────────────────────────────────── */
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return jsonError('Server configuration error', 500, cors);

  /* ── Call OpenAI with a 25-second hard timeout ───────────── */
  let openaiRes;
  try {
    openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method:  'POST',
      signal:  AbortSignal.timeout(25_000),
      headers: {
        Authorization:  `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model:      'gpt-4o-mini',
        stream:     true,
        max_tokens: 600,
        temperature: 0.7,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT + langHint },
          ...clean,
        ],
      }),
    });
  } catch (err) {
    const isTimeout = err?.name === 'TimeoutError' || err?.name === 'AbortError';
    console.error('OpenAI fetch error:', err);
    return jsonError(
      isTimeout
        ? 'Request timed out — please try again.'
        : 'Could not reach AI service. Please try again shortly.',
      502,
      cors
    );
  }

  if (!openaiRes.ok) {
    const detail = await openaiRes.text().catch(() => '');
    console.error('OpenAI API error:', openaiRes.status, detail);

    const msg =
      openaiRes.status === 429 ? 'AI rate limit reached — please wait a moment and try again.' :
      openaiRes.status === 401 ? 'AI service authentication error — please contact support.'   :
      openaiRes.status === 503 ? 'AI service is overloaded — please try again in a moment.'    :
                                 'AI service temporarily unavailable. Please try again shortly.';

    return jsonError(msg, 502, cors);
  }

  /* ── Pipe OpenAI SSE stream straight to the client ──────── */
  return new Response(openaiRes.body, {
    status: 200,
    headers: {
      ...cors,
      'Content-Type':  'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
    },
  });
}
