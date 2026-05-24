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
const SYSTEM_PROMPT = `You are the AYE AI Assistant — an expert engineering education helper for AYE Tech Hub (ayetechub.com), a premium platform empowering engineers across Africa and beyond.

AYE Tech Hub offers:
• Courses: PLC programming, industrial automation, electrical engineering, mechanical engineering, Revit & CAD, AI tools for engineers, solar & HVAC, robotics & maintenance
• Free & premium PDF downloads: electrical safety, PLC guides, AutoCAD cheat sheet, HVAC design manual, solar PV design, industrial maintenance manual, transformers guide
• Free YouTube video tutorials, Telegram community (t.me/ayetechub), and direct support
• Founded by Awet G. Nway — mechanical engineer, robotics specialist, Ethiopia

Your rules:
1. Answer engineering and AYE Tech Hub questions clearly and practically
2. Guide users to the right courses, PDFs, or resources on the site
3. Explain technical concepts from beginner to advanced level
4. Keep answers concise and actionable — under 180 words unless depth is truly needed
5. If the user writes in Tigrinya or Amharic, respond in that language
6. Do NOT answer topics completely unrelated to engineering or this platform
7. When you do not know something specific, recommend the Telegram channel for live help`;

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
