/**
 * Emergency Healthcare Navigator - Triage & First Aid Protocols (triage.js)
 * 4-Tier Clinical Urgency Classification & Bilingual Keyword Analyzer
 */

const TRIAGE_LEVELS = {
  CRITICAL: 'critical', // RED
  URGENT: 'urgent',     // AMBER
  MODERATE: 'moderate', // YELLOW
  ROUTINE: 'routine'    // GREEN
};

// Keyword dictionary for Hindi & English clinical urgency matching
const SYMPTOM_KEYWORDS = [
  // RED / CRITICAL
  {
    level: TRIAGE_LEVELS.CRITICAL,
    suggestedCategory: 'trauma',
    keywords: [
      'chest pain', 'heart attack', 'cardiac', 'angina', 'unresponsive', 'unconscious',
      'not breathing', 'difficulty breathing', 'gasping', 'choking', 'severe bleeding',
      'hemorrhage', 'head trauma', 'unconscious fall', 'stroke', 'paralysis', 'face droop',
      'slurred speech', 'electric shock', 'drowning', 'cyanosis', 'blue lips',
      // Hindi
      'सीने में दर्द', 'दिल का दौरा', 'हार्ट अटैक', 'बेहोश', 'सांस नहीं', 'सांस फूलना',
      'दम घुटना', 'गंभीर खून', 'खून बहना', 'लकवा', 'स्ट्रोक', 'चेहरा टेढ़ा',
      'बिजली का झटका', 'होश नहीं', 'नीले होंठ', 'सिर में चोट'
    ]
  },
  // AMBER / URGENT
  {
    level: TRIAGE_LEVELS.URGENT,
    suggestedCategory: 'trauma',
    keywords: [
      'fracture', 'broken bone', 'deep cut', 'laceration', 'asthma', 'wheezing',
      'baby fever', 'high fever infant', 'pediatric fever', 'convulsions', 'seizure',
      'poisoning', 'swallowed poison', 'chemical ingestion', 'snake bite', 'dog bite',
      'severe burn', 'blister burn', 'acute abdominal pain', 'appendicitis',
      // Hindi
      'हड्डी टूटना', 'फ्रैक्चर', 'गहरा घाव', 'अस्थमा', 'दमा का दौरा', 'बच्चे को बुखार',
      'शिशु बुखार', 'दौरा पड़ना', 'मिर्गी', 'जहर', 'विषाक्तता', 'सांप का काटना',
      'कुत्ते का काटना', 'गंभीर जलना', 'पेट में असहनीय दर्द', 'अपेंडिक्स'
    ]
  },
  // BLOOD BANK SPECIFIC
  {
    level: TRIAGE_LEVELS.URGENT,
    suggestedCategory: 'bloodbank',
    keywords: [
      'blood', 'blood bank', 'plasma', 'platelets', 'o negative', 'o+', 'a+', 'b+', 'ab-',
      'blood needed', 'transfusion', 'sdp',
      // Hindi
      'रक्त', 'खून चाहिए', 'ब्लड बैंक', 'प्लेटलेट्स', 'प्लाज्मा', 'रक्तदान', 'रक्तकोष'
    ]
  },
  // PHARMACY SPECIFIC
  {
    level: TRIAGE_LEVELS.MODERATE,
    suggestedCategory: 'pharmacy',
    keywords: [
      'medicine', 'chemist', 'pharmacy', 'oxygen cylinder', 'inhaler', 'nebulizer',
      'bandage', 'dressing', 'insulin',
      // Hindi
      'दवाई', 'दवा दुकान', 'केमिस्ट', 'फार्मेसी', 'ऑक्सीजन सिलेंडर', 'इन्हेलर', 'इंसुलिन'
    ]
  },
  // YELLOW / MODERATE
  {
    level: TRIAGE_LEVELS.MODERATE,
    suggestedCategory: 'all',
    keywords: [
      'sprain', 'twisted ankle', 'moderate burn', 'vomiting', 'diarrhea', 'dehydration',
      'ear pain', 'eye injury', 'migraine', 'allergic rash', 'fever', 'food poisoning',
      // Hindi
      'मोच', 'हल्का जलना', 'उल्टी', 'दस्त', 'पानी की कमी', 'कान दर्द', 'माइग्रेन',
      'एलर्जी', 'बुखार', 'फूड प्वॉइजनिंग'
    ]
  },
  // GREEN / ROUTINE
  {
    level: TRIAGE_LEVELS.ROUTINE,
    suggestedCategory: 'all',
    keywords: [
      'cough', 'cold', 'sore throat', 'mild headache', 'routine checkup', 'prescription',
      'general consult', 'runny nose', 'mild rash',
      // Hindi
      'खांसी', 'जुकाम', 'गले में खराश', 'हल्का सिरदर्द', 'सामान्य जांच', 'रूटीन चेकअप'
    ]
  }
];

// Assess user's input text or voice query
function evaluateUrgency(queryText) {
  if (!queryText || !queryText.trim()) {
    return {
      level: TRIAGE_LEVELS.CRITICAL, // Default safety baseline in emergency app
      isSearchQuery: false,
      suggestedCategory: 'all'
    };
  }

  const normalized = queryText.toLowerCase().trim();

  // Search keyword matchers in priority order: Critical -> Urgent -> Moderate -> Routine
  for (const group of SYMPTOM_KEYWORDS) {
    for (const kw of group.keywords) {
      if (normalized.includes(kw.toLowerCase())) {
        return {
          level: group.level,
          isSearchQuery: true,
          matchedKeyword: kw,
          suggestedCategory: group.suggestedCategory
        };
      }
    }
  }

  // Fallback: If user entered text but no specific keyword matched, treat as urgent for safety
  return {
    level: TRIAGE_LEVELS.URGENT,
    isSearchQuery: true,
    matchedKeyword: null,
    suggestedCategory: 'all'
  };
}

// Render the Triage Banner card dynamically
function renderTriageCard(triageState) {
  const container = document.getElementById('urgency-triage-container');
  if (!container) return;

  const level = triageState.level || TRIAGE_LEVELS.CRITICAL;
  
  let badgeClass = 'critical';
  let badgeKey = 'criticalTitle';
  let titleKey = 'criticalTitle';
  let descKey = 'criticalDesc';
  let actionKey = 'criticalAction';

  if (level === TRIAGE_LEVELS.URGENT) {
    badgeClass = 'urgent';
    badgeKey = 'urgentTitle';
    titleKey = 'urgentTitle';
    descKey = 'urgentDesc';
    actionKey = 'urgentAction';
  } else if (level === TRIAGE_LEVELS.MODERATE) {
    badgeClass = 'moderate';
    badgeKey = 'moderateTitle';
    titleKey = 'moderateTitle';
    descKey = 'moderateDesc';
    actionKey = 'moderateAction';
  } else if (level === TRIAGE_LEVELS.ROUTINE) {
    badgeClass = 'routine';
    badgeKey = 'routineTitle';
    titleKey = 'routineTitle';
    descKey = 'routineDesc';
    actionKey = 'routineAction';
  }

  const isCritical = level === TRIAGE_LEVELS.CRITICAL;

  container.innerHTML = `
    <div class="triage-card ${badgeClass}">
      <div class="triage-header">
        <div class="triage-badge ${badgeClass}">
          <span class="pulse-dot" style="background:#FFF"></span>
          <span data-i18n="${titleKey}">${t(titleKey)}</span>
        </div>
        <div class="triage-actions-quick">
          <button class="first-aid-trigger-btn" onclick="openFirstAidModal()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M12 2v20M2 12h20"/>
            </svg>
            <span data-i18n="firstAidProtocolBtn">${t('firstAidProtocolBtn')}</span>
          </button>
        </div>
      </div>
      
      <p class="triage-description" data-i18n="${descKey}">${t(descKey)}</p>

      <div class="triage-callout-action">
        <div class="triage-instruction-text text-${badgeClass}" data-i18n="${actionKey}">
          ${t(actionKey)}
        </div>
        ${isCritical ? `
          <a href="tel:108" class="btn-dial-now" id="btn-call-108-triage">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span data-i18n="callNow">${t('callNow')}</span>
          </a>
        ` : ''}
      </div>
    </div>
  `;
}

// CPR Metronome Engine with Web Audio API
let cprAudioContext = null;
let cprIntervalId = null;

function toggleCprMetronome() {
  const metronomeBtn = document.getElementById('btn-cpr-metronome');
  const beatVisualizer = document.getElementById('cpr-beat-circle');

  if (cprIntervalId) {
    // Stop metronome
    clearInterval(cprIntervalId);
    cprIntervalId = null;
    if (beatVisualizer) beatVisualizer.classList.remove('beating');
    if (metronomeBtn) {
      metronomeBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
        <span data-i18n="startCprMetronome">${t('startCprMetronome')}</span>
      `;
    }
  } else {
    // Start metronome at 110 beats per minute (~545 ms interval)
    try {
      if (!cprAudioContext) {
        cprAudioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (cprAudioContext.state === 'suspended') {
        cprAudioContext.resume();
      }
    } catch(e) {
      console.warn("AudioContext init error:", e);
    }

    if (beatVisualizer) beatVisualizer.classList.add('beating');
    if (metronomeBtn) {
      metronomeBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
        </svg>
        <span data-i18n="stopCprMetronome">${t('stopCprMetronome')}</span>
      `;
    }

    playCprClick();
    cprIntervalId = setInterval(() => {
      playCprClick();
    }, 545);
  }
}

function playCprClick() {
  if (!cprAudioContext) return;
  try {
    const osc = cprAudioContext.createOscillator();
    const gain = cprAudioContext.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, cprAudioContext.currentTime); // Crisp click
    gain.gain.setValueAtTime(0.3, cprAudioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, cprAudioContext.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(cprAudioContext.destination);
    osc.start();
    osc.stop(cprAudioContext.currentTime + 0.08);
  } catch(e) {}
}
