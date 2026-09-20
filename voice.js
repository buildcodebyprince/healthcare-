/**
 * Emergency Healthcare Navigator - Speech Recognition & Voice Synthesis (voice.js)
 * Hindi & English dual-dialect speech engine and Emergency Audio Siren
 */

let speechRecognizer = null;
let isListening = false;
let sirenOscillator = null;
let sirenGain = null;
let isSirenActive = false;
let sirenIntervalId = null;

// Initialize Speech Recognition
function initSpeechRecognition(onResultCallback, onStateChangeCallback) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    console.warn("Web Speech Recognition API not supported in this browser.");
    return null;
  }

  speechRecognizer = new SpeechRecognition();
  speechRecognizer.continuous = false;
  speechRecognizer.interimResults = true;
  speechRecognizer.maxAlternatives = 1;

  speechRecognizer.onstart = () => {
    isListening = true;
    if (onStateChangeCallback) onStateChangeCallback(true);
  };

  speechRecognizer.onresult = (event) => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    const output = finalTranscript || interimTranscript;
    if (onResultCallback && output) {
      onResultCallback(output, !!finalTranscript);
    }
  };

  speechRecognizer.onerror = (event) => {
    console.warn("Speech recognition error:", event.error);
    isListening = false;
    if (onStateChangeCallback) onStateChangeCallback(false);
  };

  speechRecognizer.onend = () => {
    isListening = false;
    if (onStateChangeCallback) onStateChangeCallback(false);
  };

  return speechRecognizer;
}

// Toggle voice recording
function toggleVoiceInput(onResultCallback, onStateChangeCallback) {
  if (!speechRecognizer) {
    initSpeechRecognition(onResultCallback, onStateChangeCallback);
  }

  if (!speechRecognizer) {
    alert(currentLanguage === 'hi' 
      ? "आपके ब्राउज़र में वॉइस रिकग्निशन समर्थित नहीं है। कृपया लिखकर खोजें।" 
      : "Voice recognition is not supported in your browser. Please type your symptom.");
    return;
  }

  if (isListening) {
    speechRecognizer.stop();
  } else {
    // Set recognition language based on active language
    speechRecognizer.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-IN';
    try {
      speechRecognizer.start();
    } catch(err) {
      console.warn("Speech start exception:", err);
    }
  }
}

// Text to Speech Audio Guidance
function speakGuidance(text, langCode) {
  if (!('speechSynthesis' in window)) return;
  
  window.speechSynthesis.cancel(); // Stop any pending speech

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  utterance.lang = langCode || (currentLanguage === 'hi' ? 'hi-IN' : 'en-US');

  // Try to find native voice match if available
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => v.lang.startsWith(utterance.lang.slice(0, 2)));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  window.speechSynthesis.speak(utterance);
}

// Emergency Loud Siren Generator (Synthesized Audio)
function toggleEmergencySiren() {
  const sirenBtn = document.getElementById('btn-toggle-siren');

  if (isSirenActive) {
    // Stop Siren
    if (sirenIntervalId) clearInterval(sirenIntervalId);
    if (sirenOscillator) {
      try { sirenOscillator.stop(); } catch(e) {}
      sirenOscillator.disconnect();
      sirenOscillator = null;
    }
    isSirenActive = false;
    if (sirenBtn) sirenBtn.classList.remove('active');
  } else {
    // Start Siren (Alternating pitch 600Hz <-> 960Hz)
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();

      sirenOscillator = ctx.createOscillator();
      sirenGain = ctx.createGain();
      sirenOscillator.type = 'sawtooth';
      sirenGain.gain.setValueAtTime(0.35, ctx.currentTime);

      sirenOscillator.connect(sirenGain);
      sirenGain.connect(ctx.destination);
      sirenOscillator.start();

      let highPitch = false;
      sirenOscillator.frequency.setValueAtTime(650, ctx.currentTime);

      sirenIntervalId = setInterval(() => {
        if (!sirenOscillator) return;
        highPitch = !highPitch;
        const targetFreq = highPitch ? 950 : 650;
        sirenOscillator.frequency.exponentialRampToValueAtTime(targetFreq, ctx.currentTime + 0.25);
      }, 500);

      isSirenActive = true;
      if (sirenBtn) sirenBtn.classList.add('active');
    } catch(err) {
      console.warn("Unable to start siren:", err);
    }
  }
}
