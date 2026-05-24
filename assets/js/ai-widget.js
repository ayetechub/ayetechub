'use strict';

/* ============================================================
   AYE Tech Hub — AI Assistant Widget  v3.0
   OpenAI gpt-4o-mini · SSE streaming · Conversation memory
   Web Speech API  · STT (mic) + TTS (voice responses)
   ============================================================ */

(function () {

  /* ----------------------------------------------------------
     CONFIG — change AI_ENDPOINT to your full Vercel URL if
     you keep GitHub Pages and deploy the API separately:
     const AI_ENDPOINT = 'https://your-project.vercel.app/api/chat';
  ---------------------------------------------------------- */
  const AI_ENDPOINT = 'https://www.ayetechub.com/api/chat';

  /* ----------------------------------------------------------
     WIDGET STATE
  ---------------------------------------------------------- */
  let panelOpen      = false;
  let isStreaming    = false;
  let fetchController = null; /* AbortController for in-flight fetch */

  /** Full conversation in OpenAI format — sent with every request */
  let history = [];

  /* ----------------------------------------------------------
     DOM HELPERS
  ---------------------------------------------------------- */
  const qs = (id) => document.getElementById(id);

  function scrollBottom() {
    const el = qs('aye-ai-msgs');
    if (el) el.scrollTop = el.scrollHeight;
  }

  function nowStr() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function escHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function textToHtml(str) {
    return escHtml(str).replace(/\n/g, '<br>');
  }

  /* ----------------------------------------------------------
     LANGUAGE DETECTION — reads existing AYE i18n engine
  ---------------------------------------------------------- */
  function getLang() {
    try {
      if (window.i18n && typeof window.i18n.getLang === 'function') {
        return window.i18n.getLang();
      }
    } catch (_) {}
    try { return localStorage.getItem('ayetechub_lang') || 'en'; } catch (_) {}
    return 'en';
  }

  /* ============================================================
     VOICE MANAGER
     Encapsulates Web Speech API (STT + TTS) and the
     live waveform canvas visualizer.
  ============================================================ */
  const Voice = (function () {

    /* ── Capability detection ── */
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    const synth     = window.speechSynthesis;
    const hasSTT    = !!SpeechRec;
    const hasTTS    = !!synth;

    /* ── State ── */
    let recognition  = null;
    let audioCtx     = null;
    let analyser     = null;
    let mediaStream  = null;
    let animFrame    = null;
    let synthVoices  = [];
    let isListening  = false;
    let isSpeaking   = false;
    let isMuted      = false;
    try { isMuted = localStorage.getItem('aye_ai_muted') === 'true'; } catch (_) {}

    /* ── STT language map ── */
    const STT_LANG = { en: 'en-US', am: 'am-ET', ti: 'en-US' };

    /* ----------------------------------------------------------
       WAVEFORM VISUALIZER
       Uses AudioContext + AnalyserNode to read real microphone
       frequency data and draws neon bars on the canvas.
    ---------------------------------------------------------- */
    function startVisualizer() {
      const canvas = qs('aye-ai-waveform');
      if (!canvas || !analyser) return;

      /* Size canvas to its CSS-rendered size */
      canvas.width  = canvas.offsetWidth  || 200;
      canvas.height = canvas.offsetHeight || 34;

      const ctx         = canvas.getContext('2d');
      const bufLen      = analyser.frequencyBinCount;
      const dataArr     = new Uint8Array(bufLen);
      const BAR_COUNT   = 32;
      const gap         = 2;
      const barW        = (canvas.width - gap * (BAR_COUNT - 1)) / BAR_COUNT;

      function draw() {
        if (!isListening) return;
        animFrame = requestAnimationFrame(draw);

        analyser.getByteFrequencyData(dataArr);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const step = Math.floor(bufLen / BAR_COUNT);
        const cy   = canvas.height / 2;

        for (let i = 0; i < BAR_COUNT; i++) {
          const raw     = dataArr[i * step];
          const norm    = raw / 255;
          const halfH   = Math.max(2, norm * cy * 0.95);
          const x       = i * (barW + gap);
          const alpha   = 0.3 + norm * 0.7;

          /* Neon gradient bar — grows from centre */
          const grad = ctx.createLinearGradient(0, cy - halfH, 0, cy + halfH);
          grad.addColorStop(0,   `rgba(0,212,255,${alpha * 0.6})`);
          grad.addColorStop(0.5, `rgba(0,212,255,${alpha})`);
          grad.addColorStop(1,   `rgba(0,212,255,${alpha * 0.6})`);

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.roundRect
            ? ctx.roundRect(x, cy - halfH, barW, halfH * 2, 2)
            : ctx.rect(x, cy - halfH, barW, halfH * 2);
          ctx.fill();
        }
      }
      draw();
    }

    function stopVisualizer() {
      if (animFrame) { cancelAnimationFrame(animFrame); animFrame = null; }
      const canvas = qs('aye-ai-waveform');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    /* ----------------------------------------------------------
       SPEECH TO TEXT
    ---------------------------------------------------------- */
    async function startListening(onInterim, onFinal) {
      if (!hasSTT) { _showInputHint('Voice not supported in this browser — please type'); return false; }
      if (isListening) return false;

      /* Request microphone and wire up AudioContext for visualizer */
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const src = audioCtx.createMediaStreamSource(mediaStream);
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 128;
        src.connect(analyser);
      } catch (err) {
        const msg = err.name === 'NotAllowedError'
          ? 'Microphone permission denied — please allow mic access and try again'
          : 'Cannot access microphone — please type your question';
        _showInputHint(msg);
        _cleanupAudio();
        return false;
      }

      /* Build SpeechRecognition instance */
      recognition = new SpeechRec();
      recognition.continuous      = false; /* single-utterance: browser auto-stops and always fires isFinal */
      recognition.interimResults  = true;
      recognition.lang            = STT_LANG[getLang()] || 'en-US';
      recognition.maxAlternatives = 1;

      let finalFired = false;

      recognition.onresult = (e) => {
        let interim = '';
        let final   = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const t = e.results[i][0].transcript;
          if (e.results[i].isFinal) final += t;
          else interim += t;
        }
        if (final.trim()) { finalFired = true; onFinal(final.trim()); }
        else if (interim)   onInterim(interim.trim());
      };

      recognition.onerror = (e) => {
        if (e.error !== 'no-speech') console.warn('[AYE Voice] STT error:', e.error);
        _stopListeningInternal();
      };

      recognition.onend = () => {
        /* Fallback: if recognition ended without a final result, send whatever interim text is in the input */
        if (!finalFired) {
          const inp = qs('aye-ai-input');
          const text = inp ? inp.value.trim() : '';
          if (text) onFinal(text);
        }
        _stopListeningInternal();
      };

      recognition.start();
      isListening = true;
      startVisualizer();
      return true;
    }

    function stopListening() {
      if (recognition) { try { recognition.stop(); } catch (_) {} recognition = null; }
      _stopListeningInternal();
    }

    function _stopListeningInternal() {
      isListening = false;
      stopVisualizer();
      _cleanupAudio();
      document.dispatchEvent(new CustomEvent('aye-voice-ended'));
    }

    function _cleanupAudio() {
      if (mediaStream) { mediaStream.getTracks().forEach(t => t.stop()); mediaStream = null; }
      if (audioCtx)   { audioCtx.close().catch(() => {}); audioCtx = null; analyser = null; }
    }

    /* ----------------------------------------------------------
       TEXT TO SPEECH
    ---------------------------------------------------------- */

    /** Load voices — Chrome fires voiceschanged asynchronously */
    if (hasTTS) {
      synthVoices = synth.getVoices();
      synth.addEventListener('voiceschanged', () => { synthVoices = synth.getVoices(); });
    }

    /** Pick the best available English (or localised) voice. */
    function _pickVoice() {
      if (synthVoices.length === 0) synthVoices = synth.getVoices();
      const lang = getLang();

      if (lang === 'am') {
        const v = synthVoices.find(v => v.lang.startsWith('am'));
        if (v) return v;
      }
      /* Tigrinya has no browser STT voice — fall back to English */

      return (
        synthVoices.find(v => v.lang === 'en-US' && /google/i.test(v.name)) ||
        synthVoices.find(v => v.lang === 'en-GB' && /google/i.test(v.name)) ||
        synthVoices.find(v => v.lang.startsWith('en') && !v.localService)   ||
        synthVoices.find(v => v.lang.startsWith('en'))                       ||
        synthVoices[0] || null
      );
    }

    /** Strip markdown syntax before passing text to TTS. */
    function _stripMarkdown(text) {
      return text
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/`{1,3}([\s\S]*?)`{1,3}/g, '$1')
        .replace(/#{1,6}\s+/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/\s{2,}/g, ' ')
        .trim();
    }

    function speak(rawText) {
      if (!hasTTS || isMuted || !rawText.trim()) return;

      synth.cancel(); /* stop any ongoing speech */

      const text      = _stripMarkdown(rawText);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate   = 1.05;
      utterance.pitch  = 1.0;
      utterance.volume = 1.0;

      const voice = _pickVoice();
      if (voice) utterance.voice = voice;

      utterance.onstart = () => {
        isSpeaking = true;
        _setVoiceBarMode('speaking', 'Speaking…');
        showVoiceBar();
      };
      utterance.onend = utterance.onerror = () => {
        isSpeaking = false;
        hideVoiceBar();
      };

      synth.speak(utterance);
    }

    function stopSpeaking() {
      if (hasTTS) synth.cancel();
      isSpeaking = false;
    }

    function toggleMute() {
      isMuted = !isMuted;
      if (isMuted) stopSpeaking();
      try { localStorage.setItem('aye_ai_muted', String(isMuted)); } catch (_) {}
      return isMuted;
    }

    /* ----------------------------------------------------------
       VOICE BAR UI HELPERS
    ---------------------------------------------------------- */
    function showVoiceBar() {
      const bar = qs('aye-ai-voice-bar');
      if (bar) bar.removeAttribute('hidden');
    }

    function hideVoiceBar() {
      const bar = qs('aye-ai-voice-bar');
      if (bar) bar.setAttribute('hidden', '');
    }

    function _setVoiceBarMode(mode, label) {
      const inner = qs('aye-ai-voice-inner');
      const lbl   = qs('aye-ai-voice-label');
      if (inner) inner.setAttribute('data-mode', mode);
      if (lbl)   lbl.textContent = label;
    }

    function setListeningMode() { _setVoiceBarMode('listening', 'Listening…'); }
    function setSpeakingMode()  { _setVoiceBarMode('speaking',  'Speaking…'); }

    function _showInputHint(msg) {
      const inp = qs('aye-ai-input');
      if (!inp) return;
      const prev = inp.placeholder;
      inp.placeholder = msg;
      setTimeout(() => { inp.placeholder = prev; }, 4000);
    }

    /* ----------------------------------------------------------
       PUBLIC API
    ---------------------------------------------------------- */
    return {
      get hasSTT()      { return hasSTT; },
      get hasTTS()      { return hasTTS; },
      get isListening() { return isListening; },
      get isSpeaking()  { return isSpeaking; },
      get isMuted()     { return isMuted; },

      startListening,
      stopListening,
      speak,
      stopSpeaking,
      toggleMute,
      showVoiceBar,
      hideVoiceBar,
      setListeningMode,
      setSpeakingMode,
    };

  })(); /* end VoiceManager */

  /* ----------------------------------------------------------
     PANEL OPEN / CLOSE
  ---------------------------------------------------------- */
  window.toggleAIPanel = function () {
    const panel = qs('aye-ai-panel');
    const btn   = qs('aye-ai-btn');
    if (!panel || !btn) return;

    panelOpen = !panelOpen;
    panel.classList.toggle('open', panelOpen);
    btn.classList.toggle('panel-open', panelOpen);
    panel.setAttribute('aria-hidden', String(!panelOpen));
    document.body.classList.toggle('ai-panel-open', panelOpen);
    btn.setAttribute('aria-expanded', String(panelOpen));

    if (panelOpen) {
      setTimeout(() => {
        const inp = qs('aye-ai-input');
        if (inp) inp.focus();
        scrollBottom();
      }, 340);
    } else {
      stopAIVoice();
    }
  };

  /* ----------------------------------------------------------
     MESSAGE RENDERING
  ---------------------------------------------------------- */
  function hideSuggestions() {
    const el = qs('aye-ai-suggestions');
    if (el) el.style.display = 'none';
  }

  function appendMessage(text, sender) {
    const msgs = qs('aye-ai-msgs');
    if (!msgs) return null;
    hideSuggestions();

    const isUser = sender === 'user';
    const row    = document.createElement('div');
    row.className = 'ai-message' + (isUser ? ' user-msg' : '');
    row.setAttribute('role', 'article');
    row.setAttribute('aria-label', isUser ? 'Your message' : 'Assistant message');
    row.innerHTML = `
      <div class="ai-msg-avatar" aria-hidden="true">${isUser ? 'U' : 'A'}</div>
      <div class="ai-msg-body">
        <div class="ai-msg-bubble">${textToHtml(text)}</div>
        <div class="ai-msg-time">${nowStr()}</div>
      </div>`;
    msgs.appendChild(row);
    scrollBottom();
    return row.querySelector('.ai-msg-bubble');
  }

  function createStreamingBubble() {
    const msgs = qs('aye-ai-msgs');
    if (!msgs) return null;
    hideSuggestions();

    const row = document.createElement('div');
    row.className = 'ai-message ai-message-streaming';
    row.setAttribute('role', 'article');
    row.setAttribute('aria-label', 'Assistant is responding');
    row.innerHTML = `
      <div class="ai-msg-avatar" aria-hidden="true">A</div>
      <div class="ai-msg-body">
        <div class="ai-msg-bubble"><span class="ai-cursor" aria-hidden="true">▍</span></div>
        <div class="ai-msg-time">${nowStr()}</div>
      </div>`;
    msgs.appendChild(row);
    scrollBottom();
    return row.querySelector('.ai-msg-bubble');
  }

  function updateStreamingBubble(bubble, text) {
    if (!bubble) return;
    bubble.innerHTML = textToHtml(text) + '<span class="ai-cursor" aria-hidden="true">▍</span>';
    scrollBottom();
  }

  function finaliseStreamingBubble(bubble, text) {
    if (!bubble) return;
    bubble.innerHTML = textToHtml(text);
    const row = bubble.closest('.ai-message');
    if (row) row.classList.remove('ai-message-streaming');
  }

  /* ----------------------------------------------------------
     TYPING INDICATOR
  ---------------------------------------------------------- */
  function showTyping() {
    const el = qs('aye-ai-typing');
    if (el) { el.removeAttribute('hidden'); scrollBottom(); }
  }
  function hideTyping() {
    const el = qs('aye-ai-typing');
    if (el) el.setAttribute('hidden', '');
  }

  /* ----------------------------------------------------------
     ERROR MESSAGE
  ---------------------------------------------------------- */
  function showError(message) {
    const msgs = qs('aye-ai-msgs');
    if (!msgs) return;
    const row = document.createElement('div');
    row.className = 'ai-message ai-error-row';
    row.setAttribute('role', 'alert');
    row.innerHTML = `
      <div class="ai-msg-avatar ai-error-avatar" aria-hidden="true">!</div>
      <div class="ai-msg-body">
        <div class="ai-msg-bubble ai-error-bubble">${escHtml(message)}</div>
        <div class="ai-msg-time">${nowStr()}</div>
      </div>`;
    msgs.appendChild(row);
    scrollBottom();
  }

  /* ----------------------------------------------------------
     INPUT CONTROLS
  ---------------------------------------------------------- */
  function setInputLocked(locked) {
    const inp   = qs('aye-ai-input');
    const send  = qs('aye-ai-send');
    const voice = qs('aye-ai-voice');
    if (inp)   inp.disabled   = locked;
    if (send)  send.disabled  = locked;
    if (voice) voice.disabled = locked;
  }

  function resetInput() {
    const inp = qs('aye-ai-input');
    if (inp) { inp.value = ''; inp.style.height = 'auto'; }
    setInputLocked(false);
  }

  /* ----------------------------------------------------------
     SSE STREAM READER
  ---------------------------------------------------------- */
  async function readStream(reader, onToken) {
    const decoder = new TextDecoder('utf-8');
    let buffer = '';
    let full   = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop(); /* keep trailing incomplete line */

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data: ')) continue;
        const data = trimmed.slice(6);
        if (data === '[DONE]') continue;

        try {
          const parsed = JSON.parse(data);
          const token  = parsed?.choices?.[0]?.delta?.content;
          if (typeof token === 'string' && token.length > 0) {
            full += token;
            onToken(full);
          }
        } catch { /* ignore malformed chunks */ }
      }
    }
    return full;
  }

  /* ----------------------------------------------------------
     CORE: SEND MESSAGE  (text → API → stream → TTS)
  ---------------------------------------------------------- */
  window.sendAIMessage = async function () {
    if (isStreaming) return;

    /* Stop any ongoing speech before sending a new message */
    if (Voice.isSpeaking) {
      Voice.stopSpeaking();
      Voice.hideVoiceBar();
    }

    const inp  = qs('aye-ai-input');
    const text = inp ? inp.value.trim() : '';
    if (!text) return;

    isStreaming = true;
    setInputLocked(true);
    resetInput();

    appendMessage(text, 'user');
    history.push({ role: 'user', content: text });
    showTyping();

    let bubble      = null;
    let fullResponse = '';

    /* Cancel any previous in-flight request */
    if (fetchController) { fetchController.abort(); }
    fetchController = new AbortController();

    try {
      const response = await fetch(AI_ENDPOINT, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        signal:  fetchController.signal,
        body: JSON.stringify({ messages: history, lang: getLang() }),
      });

      hideTyping();

      if (!response.ok) {
        let errMsg = 'Something went wrong. Please try again.';
        try { const d = await response.json(); if (d.error) errMsg = d.error; } catch (_) {
          errMsg = `Error ${response.status}: Something went wrong. Please try again.`;
        }
        showError(errMsg);
        history.pop();
        return;
      }

      const ctype = response.headers.get('content-type') || '';

      if (ctype.includes('text/event-stream')) {
        bubble = createStreamingBubble();
        fullResponse = await readStream(
          response.body.getReader(),
          (acc) => updateStreamingBubble(bubble, acc)
        );
        finaliseStreamingBubble(bubble, fullResponse);
      } else {
        const json = await response.json();
        fullResponse = json?.choices?.[0]?.message?.content || 'No response received.';
        appendMessage(fullResponse, 'bot');
      }

      if (fullResponse) {
        history.push({ role: 'assistant', content: fullResponse });
        /* ── Speak the response aloud ── */
        Voice.speak(fullResponse);
      }

      /* Trim history — keep last 40 turns */
      if (history.length > 40) history = history.slice(-40);

    } catch (err) {
      hideTyping();
      if (bubble) finaliseStreamingBubble(bubble, fullResponse || '');
      /* Aborted by a new message — don't show error */
      if (err?.name !== 'AbortError') {
        showError(
          !navigator.onLine
            ? 'No internet connection. Please check your network and try again.'
            : 'Connection error. Please try again in a moment.'
        );
        if (history.length && history[history.length - 1].role === 'user') history.pop();
        console.error('[AYE AI] Request failed:', err);
      }
    } finally {
      fetchController = null;
      isStreaming = false;
      hideTyping();
      resetInput();
    }
  };

  /* ----------------------------------------------------------
     VOICE BUTTON — mic toggle
  ---------------------------------------------------------- */
  window.toggleAIVoice = async function () {
    const btn = qs('aye-ai-voice');
    if (!btn || isStreaming) return;

    /* ── If currently listening: stop ── */
    if (Voice.isListening) {
      Voice.stopListening();
      btn.classList.remove('recording');
      Voice.hideVoiceBar();
      return;
    }

    /* ── If currently speaking: stop speech and start listening ── */
    if (Voice.isSpeaking) {
      Voice.stopSpeaking();
      Voice.hideVoiceBar();
    }

    /* ── Start listening ── */
    btn.classList.add('recording');
    Voice.setListeningMode();
    Voice.showVoiceBar();

    let gotFinal = false;

    const started = await Voice.startListening(
      /* onInterim — update input field with live transcript */
      (interimText) => {
        const inp = qs('aye-ai-input');
        if (inp) { inp.value = interimText; aiInputGrow(inp); }
      },
      /* onFinal — transcript confirmed, auto-send */
      (finalText) => {
        if (gotFinal) return; /* guard against duplicate fires */
        gotFinal = true;

        const inp = qs('aye-ai-input');
        if (inp) { inp.value = finalText; aiInputGrow(inp); }

        Voice.stopListening();
        btn.classList.remove('recording');
        Voice.hideVoiceBar();

        /* Short pause so user sees the transcript, then send */
        setTimeout(() => sendAIMessage(), 280);
      }
    );

    if (!started) {
      btn.classList.remove('recording');
      Voice.hideVoiceBar();
    }
  };

  /* ----------------------------------------------------------
     STOP BUTTON — inside voice bar
  ---------------------------------------------------------- */
  window.stopAIVoice = function () {
    if (Voice.isListening) {
      Voice.stopListening();
      const btn = qs('aye-ai-voice');
      if (btn) btn.classList.remove('recording');
    }
    if (Voice.isSpeaking) Voice.stopSpeaking();
    Voice.hideVoiceBar();
  };

  /* ----------------------------------------------------------
     MUTE TOGGLE
  ---------------------------------------------------------- */
  window.toggleAIMute = function () {
    const muted = Voice.toggleMute();
    const btn   = qs('aye-ai-mute');
    if (!btn) return;

    btn.classList.toggle('muted', muted);
    const label = muted ? 'Unmute voice responses' : 'Mute voice responses';
    btn.title = label;
    btn.setAttribute('aria-label', label);
    btn.setAttribute('aria-pressed', String(muted));
  };

  /* ----------------------------------------------------------
     SUGGESTED PROMPTS
  ---------------------------------------------------------- */
  window.sendAISuggestion = function (chip) {
    const inp = qs('aye-ai-input');
    if (!inp || isStreaming) return;
    inp.value = chip.textContent.trim();
    aiInputGrow(inp);
    sendAIMessage();
  };

  /* ----------------------------------------------------------
     TEXTAREA HELPERS
  ---------------------------------------------------------- */
  window.aiInputKeydown = function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendAIMessage(); }
  };

  window.aiInputGrow = function (el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 100) + 'px';
    const send = qs('aye-ai-send');
    if (send) send.disabled = !el.value.trim() || isStreaming;
  };

  /* ----------------------------------------------------------
     CLEAR CHAT
  ---------------------------------------------------------- */
  window.clearAIChat = function () {
    if (isStreaming) return;
    Voice.stopSpeaking();
    Voice.stopListening();
    Voice.hideVoiceBar();

    const btn = qs('aye-ai-voice');
    if (btn) btn.classList.remove('recording');

    const msgs = qs('aye-ai-msgs');
    const sugg = qs('aye-ai-suggestions');
    if (!msgs) return;

    msgs.innerHTML = '';
    history = [];
    if (sugg) sugg.style.display = '';

    /* Re-add the welcome note */
    const row = document.createElement('div');
    row.className = 'ai-message';
    row.setAttribute('role', 'article');
    row.innerHTML = `
      <div class="ai-msg-avatar" aria-hidden="true">A</div>
      <div class="ai-msg-body">
        <div class="ai-msg-bubble">Chat cleared! How can I help you with engineering today?</div>
        <div class="ai-msg-time">${nowStr()}</div>
      </div>`;
    msgs.appendChild(row);
    scrollBottom();
  };

  /* ----------------------------------------------------------
     GLOBAL CLOSE HANDLERS
  ---------------------------------------------------------- */
  document.addEventListener('click', function (e) {
    if (!panelOpen) return;
    const widget = qs('aye-ai-widget');
    if (widget && !widget.contains(e.target) && window.innerWidth <= 640) toggleAIPanel();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panelOpen) toggleAIPanel();
  });

  /* Stop TTS when page is hidden (e.g., tab switch) */
  document.addEventListener('visibilitychange', function () {
    if (document.hidden && Voice.isSpeaking) Voice.stopSpeaking();
  });

  /* Reset mic button when SpeechRecognition ends unexpectedly (e.g. silence timeout) */
  document.addEventListener('aye-voice-ended', function () {
    const btn = qs('aye-ai-voice');
    if (btn) btn.classList.remove('recording');
    Voice.hideVoiceBar();
  });

  /* Clean up voice on page unload */
  window.addEventListener('beforeunload', function () {
    Voice.stopSpeaking();
    Voice.stopListening();
  });

  /* Shrink panel when the mobile on-screen keyboard reduces viewport height */
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', function () {
      const panel = qs('aye-ai-panel');
      if (!panel || !panelOpen || window.innerWidth > 640) return;
      const available = window.visualViewport.height;
      panel.style.maxHeight = Math.floor(available * 0.85) + 'px';
    });
  }

  /* ----------------------------------------------------------
     INIT
  ---------------------------------------------------------- */
  function init() {
    const send = qs('aye-ai-send');
    const inp  = qs('aye-ai-input');
    if (send) send.disabled = true;
    if (inp) {
      inp.addEventListener('input', function () {
        if (send) send.disabled = !this.value.trim() || isStreaming;
      });
    }

    /* Restore mute button visual state from persisted preference */
    if (Voice.isMuted) {
      const muteBtn = qs('aye-ai-mute');
      if (muteBtn) {
        muteBtn.classList.add('muted');
        muteBtn.setAttribute('aria-pressed', 'true');
        muteBtn.title = 'Unmute voice responses';
        muteBtn.setAttribute('aria-label', 'Unmute voice responses');
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
