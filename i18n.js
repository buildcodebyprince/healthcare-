/**
 * Emergency Healthcare Navigator - i18n Translation Dictionary
 * Full bilingual support: English & हिन्दी (Hindi)
 */

const translations = {
  en: {
    appTitle: "StackShift Emergency Navigator",
    appSubtitle: "Rapid Distress & Hospital Finder • By StackShift",
    liveStatus: "Live Emergency Network Active",
    disclaimerBanner: "⚠️ Non-Diagnostic Assistant: For life-threatening emergencies, call 108 or 112 immediately.",
    
    // Quick Hotlines
    callAmbulance: "Call 108",
    callEmergency: "Call 112",
    callMaternal: "Call 102",
    callHealthHelpline: "Call 1075",

    // Search & Voice
    searchPlaceholder: "Describe symptom (e.g. chest pain, baby fever, blood needed)...",
    listeningVoice: "Listening... Speak your symptom in English or Hindi",
    voiceBtnTitle: "Click to speak in English or Hindi",
    clearSearch: "Clear",

    // Filter categories
    allFacilities: "All Resources",
    traumaEmergency: "🚨 Emergency & Trauma",
    cardiacCare: "🫀 Cardiac & Stroke",
    pediatricEr: "👶 Pediatric ER",
    bloodBanks: "🩸 Blood Banks",
    pharmacies247: "💊 24x7 Pharmacies",

    // Triage guidance
    triageAssessmentTitle: "Urgency Triage Guidance",
    firstAidProtocolBtn: "🩹 First-Aid Protocols",
    
    // Triage states
    criticalTitle: "CRITICAL EMERGENCY - IMMEDIATE ACTION REQUIRED",
    criticalDesc: "Symptoms suggest potential life threat (e.g., cardiac arrest, acute stroke, choking, severe trauma/bleeding). Do not drive alone.",
    criticalAction: "CALL 108 / 112 AMBULANCE IMMEDIATELY",
    callNow: "Call 108 Now",

    urgentTitle: "HIGH URGENCY - PROMPT EMERGENCY CARE NEEDED",
    urgentDesc: "Symptoms require urgent clinical intervention within 1-2 hours (deep laceration, suspected fracture, severe asthma attack, high pediatric fever).",
    urgentAction: "Navigate directly to 24/7 Multi-Specialty Emergency Room.",

    moderateTitle: "SEMI-URGENT - URGENT CLINIC CARE",
    moderateDesc: "Condition needs medical attention today but is not an immediate life threat (sprain, mild burn, continuous vomiting, minor allergic reaction).",
    moderateAction: "Visit an Urgent Care Center or 24/7 Outpatient Clinic.",

    routineTitle: "ROUTINE / NON-URGENT CARE",
    routineDesc: "Mild or non-emergent symptoms (mild cold, prescription refill, routine checkup).",
    routineAction: "Schedule appointment with a general physician or visit local pharmacy.",

    // Facility Cards
    facilityFound: "facilities found nearby",
    open247: "24/7 Open ER",
    verifiedAccredited: "NABH / JCI Accredited",
    waitTime: "ER Wait:",
    icuBeds: "ICU Beds Available:",
    oxygenStandby: "Oxygen / Ventilator Standby",
    callDesk: "Call ER Desk",
    getDirections: "Directions",
    shareFacility: "Share",
    bloodStockAvailable: "Verified Blood Units Stock:",

    // Map Panel
    emergencyMapTitle: "Emergency Map & Real-Time Route",
    locateMe: "My Location",
    trafficETA: "Est. Driving Time:",
    openGoogleMaps: "Open in Google Maps",
    noRouteSelected: "Select any hospital or clinic to view turn-by-turn route.",

    // SOS Modal
    sosModalTitle: "EMERGENCY SOS & DISPATCH",
    sosModalSubtitle: "Instantly alert emergency responders and family caregivers",
    nationalHelplinesTitle: "National 24/7 Emergency Helplines",
    familyContactsTitle: "Family Caregiver SOS Dispatch",
    noContactsSaved: "No emergency family contacts saved yet.",
    addContactBtn: "+ Add Caregiver Contact",
    sendFamilyAlertBtn: "Send Instant SOS via WhatsApp / SMS",
    sirenAlarmTitle: "Distress Locator Tools",
    soundSiren: "🚨 Loud Siren",
    strobeFlash: "⚡ Screen Strobe",

    // First Aid Modal
    firstAidModalTitle: "Emergency First-Aid Protocols",
    cprTitle: "CPR (Cardiopulmonary Resuscitation)",
    cprDesc: "Push hard and fast in the center of the chest to the beat of 100-120 BPM.",
    startCprMetronome: "Start CPR Rhythm Metronome",
    stopCprMetronome: "Stop Metronome",
    fastStrokeTitle: "Stroke Test (F.A.S.T.)",
    fastDesc: "Face drooping? Arm weakness? Speech slurred? Time to call 108 immediately!",
    bleedingTitle: "Severe Bleeding Protocol",
    bleedingDesc: "Apply firm, continuous direct pressure with a clean cloth. Do not remove soaked cloths, add more.",
    burnsTitle: "Burns Treatment",
    burnsDesc: "Cool with clean running tap water for 10-20 mins. Never apply ice, butter, or paste.",

    // Safety Disclaimer
    safetyDisclaimerTitle: "Non-Diagnostic Medical Disclaimer",
    safetyDisclaimerText: "This Emergency Healthcare Navigator is strictly an informational navigation and first-aid triage utility. It does NOT diagnose medical conditions, prescribe medication, or replace the professional judgment of licensed medical personnel. In any life-threatening situation, immediately summon local emergency services (112 or 108)."
  },

  hi: {
    appTitle: "StackShift आपातकालीन स्वास्थ्य सहायक",
    appSubtitle: "त्वरित अस्पताल व आपातकालीन खोज • StackShift द्वारा संचालित",
    liveStatus: "आपातकालीन नेटवर्क सक्रिय है",
    disclaimerBanner: "⚠️ गैर-निदानात्मक सहायक: गंभीर व जीवन-घातक आपातकाल में तुरंत 108 या 112 पर कॉल करें।",
    
    // Quick Hotlines
    callAmbulance: "एम्बुलेंस 108",
    callEmergency: "आपातकाल 112",
    callMaternal: "मातृ/शिशु 102",
    callHealthHelpline: "स्वास्थ्य सेवा 1075",

    // Search & Voice
    searchPlaceholder: "लक्षण बताएं (जैसे: सीने में तेज दर्द, बच्चे को बुखार, O- खून)...",
    listeningVoice: "सुन रहे हैं... कृपया हिंदी या अंग्रेजी में अपना लक्षण बोलें",
    voiceBtnTitle: "हिंदी या अंग्रेजी में बोलने के लिए क्लिक करें",
    clearSearch: "हटाएं",

    // Filter categories
    allFacilities: "सभी संसाधन",
    traumaEmergency: "🚨 आपातकालीन व ट्रॉमा सेंटर",
    cardiacCare: "🫀 हार्ट व स्ट्रोक केयर",
    pediatricEr: "👶 शिशु/बाल आपातकाल",
    bloodBanks: "🩸 ब्लड बैंक (रक्त कोष)",
    pharmacies247: "💊 24x7 मेडिकल स्टोर",

    // Triage guidance
    triageAssessmentTitle: "गंभीरता व तात्कालिकता मार्गदर्शन",
    firstAidProtocolBtn: "🩹 प्राथमिक उपचार निर्देश",
    
    // Triage states
    criticalTitle: "अति-गंभीर आपातकाल - तत्काल कार्रवाई आवश्यक",
    criticalDesc: "लक्षण जानलेवा स्थिति दर्शाते हैं (जैसे दिल का दौरा, स्ट्रोक, सांस रुकना, भारी रक्तस्राव)। अकेले वाहन न चलाएं।",
    criticalAction: "तुरंत 108 / 112 एम्बुलेंस को कॉल करें",
    callNow: "तुरंत 108 डायल करें",

    urgentTitle: "गंभीर स्थिति - शीघ्र चिकित्सकीय देखभाल जरूरी",
    urgentDesc: "लक्षणों के लिए 1-2 घंटे में अस्पताल पहुंचना आवश्यक है (गहरा घाव, हड्डी टूटने का संदेह, तेज अस्थमा, तेज बुखार)।",
    urgentAction: "निकटतम 24/7 आपातकालीन अस्पताल जाएं।",

    moderateTitle: "मध्यम तात्कालिकता - प्राथमिक क्लीनिक",
    moderateDesc: "चिकित्सा की आवश्यकता है किंतु तुरंत जान को खतरा नहीं है (मोच, हल्का जलना, उल्टी, मामूली एलर्जी)।",
    moderateAction: "निकटतम अर्जेंट केयर क्लीनिक या 24 घंटे फार्मेसी जाएं।",

    routineTitle: "सामान्य / गैर-आपातकालीन परामर्श",
    routineDesc: "सामान्य लक्षण (हल्की खांसी-जुकाम, दवा का पर्चा, सामान्य जांच)।",
    routineAction: "चिकित्सक से परामर्श लें या सामान्य मेडिकल स्टोर जाएं।",

    // Facility Cards
    facilityFound: "निकटतम स्वास्थ्य केंद्र उपलब्ध",
    open247: "24/7 आपातकालीन खुला",
    verifiedAccredited: "NABH / सरकारी मान्यता प्राप्त",
    waitTime: "प्रतीक्षा समय:",
    icuBeds: "ICU बेड उपलब्ध:",
    oxygenStandby: "ऑक्सीजन व वेंटिलेटर तैयार",
    callDesk: "कॉल करें",
    getDirections: "दिशा-निर्देश",
    shareFacility: "शेयर करें",
    bloodStockAvailable: "सत्यापित रक्त स्टॉक (यूनिट्स):",

    // Map Panel
    emergencyMapTitle: "लाइव मैप एवं सीधा मार्ग",
    locateMe: "मेरा स्थान",
    trafficETA: "अनुमानित समय:",
    openGoogleMaps: "गूगल मैप्स में खोलें",
    noRouteSelected: "सीधा मार्ग देखने के लिए किसी भी अस्पताल पर क्लिक करें।",

    // SOS Modal
    sosModalTitle: "आपातकालीन SOS व सहायता प्रेषण",
    sosModalSubtitle: "आपातकालीन सेवाओं व परिजनों को तुरंत सचेत करें",
    nationalHelplinesTitle: "राष्ट्रीय 24/7 आपातकालीन नंबर",
    familyContactsTitle: "परिजनों को त्वरित SOS अलर्ट",
    noContactsSaved: "अभी तक कोई आपातकालीन परिजन संपर्क नहीं जोड़ा गया।",
    addContactBtn: "+ नया संपर्क जोड़ें",
    sendFamilyAlertBtn: "व्हाट्सएप / SMS से तुरंत SOS भेजें",
    sirenAlarmTitle: "स्थान सूचक साधन",
    soundSiren: "🚨 तेज सायरन",
    strobeFlash: "⚡ स्क्रीन फ्लैश",

    // First Aid Modal
    firstAidModalTitle: "आपातकालीन प्राथमिक उपचार (First Aid)",
    cprTitle: "सीपीआर (CPR) विधि",
    cprDesc: "छाती के बीच में दोनों हाथों से 100-120 बीट प्रति मिनट की गति से तेज और गहरा दबाव दें।",
    startCprMetronome: "CPR ताल (मेट्रोनोम) शुरू करें",
    stopCprMetronome: "मेट्रोनोम बंद करें",
    fastStrokeTitle: "स्ट्रोक पहचान (F.A.S.T.)",
    fastDesc: "चेहरा झुकना? हाथ में कमजोरी? बोलने में लड़खड़ाहट? तुरंत 108 डायल करने का समय!",
    bleedingTitle: "गंभीर रक्तस्राव रोकें",
    bleedingDesc: "साफ कपड़े से घाव पर लगातार तेज दबाव बनाए रखें। भीगे कपड़े को न हटाएं, ऊपर और कपड़ा लगाएं।",
    burnsTitle: "जलने पर उपचार",
    burnsDesc: "साफ बहते नल के पानी से 10-20 मिनट ठंडा करें। बर्फ, मक्खन या टूथपेस्ट कभी न लगाएं।",

    // Safety Disclaimer
    safetyDisclaimerTitle: "गैर-निदानात्मक चिकित्सा अस्वीकरण",
    safetyDisclaimerText: "यह आपातकालीन स्वास्थ्य नेविगेटर केवल अस्पताल खोजने व प्राथमिक मार्गदर्शन के लिए है। यह किसी डॉक्टर की जगह नहीं लेता और न ही कोई दवा लिखता है। किसी भी गंभीर या जानलेवा आपातकाल में तुरंत 112 या 108 पर कॉल करें।"
  }
};

let currentLanguage = 'en';

function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'hi') return;
  currentLanguage = lang;
  localStorage.setItem('ehn_preferred_lang', lang);
  document.documentElement.lang = lang;
  updateDomTranslations();
  
  // Update toggle button UI
  const enPills = document.querySelectorAll('.lang-pill-en');
  const hiPills = document.querySelectorAll('.lang-pill-hi');
  if (lang === 'hi') {
    enPills.forEach(p => p.classList.remove('active'));
    hiPills.forEach(p => p.classList.add('active'));
  } else {
    enPills.forEach(p => p.classList.add('active'));
    hiPills.forEach(p => p.classList.remove('active'));
  }

  // Trigger custom event so other components (triage, voice, facilities) can re-render
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

function t(key) {
  const dict = translations[currentLanguage] || translations.en;
  return dict[key] || translations.en[key] || key;
}

function updateDomTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translated = t(key);
    if (translated) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translated;
      } else {
        el.textContent = translated;
      }
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const translated = t(key);
    if (translated) {
      el.placeholder = translated;
    }
  });

  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    const translated = t(key);
    if (translated) {
      el.title = translated;
    }
  });
}

// Initialize language from localStorage
function initI18n() {
  const saved = localStorage.getItem('ehn_preferred_lang') || 'en';
  setLanguage(saved);
}
