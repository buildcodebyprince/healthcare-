/**
 * Emergency Healthcare Navigator - Main Application Orchestrator (app.js)
 */

let currentUserLocation = DEFAULT_CENTER;
let currentFilterCategory = 'all';
let currentSearchQuery = '';
let currentTriageState = { level: TRIAGE_LEVELS.CRITICAL, isSearchQuery: false };

// Lifecycle entry point
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize i18n
  initI18n();

  // 2. Initialize Theme
  initTheme();

  // 3. Initialize Geolocation
  initGeolocation();

  // 4. Initialize Map
  initEmergencyMap(currentUserLocation, (facility) => {
    highlightFacilityCard(facility.id);
  });

  // 5. Initial Render of Triage & Facilities
  renderTriageCard(currentTriageState);
  refreshFacilitiesView();

  // 6. Setup Event Listeners
  setupEventListeners();
});

// Setup Listeners for DOM interactions
function setupEventListeners() {
  const searchInput = document.getElementById('emergency-search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const voiceMicBtn = document.getElementById('voice-mic-btn');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const langToggleBtn = document.getElementById('lang-toggle-btn');

  // Search input typing
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      if (clearSearchBtn) {
        clearSearchBtn.classList.toggle('active', !!currentSearchQuery);
      }
      handleSearchOrSymptomUpdate(currentSearchQuery);
    });
  }

  // Clear search button
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      currentSearchQuery = '';
      clearSearchBtn.classList.remove('active');
      handleSearchOrSymptomUpdate('');
    });
  }

  // Voice Search / Speech Recognition
  if (voiceMicBtn) {
    voiceMicBtn.addEventListener('click', () => {
      const voiceOverlay = document.getElementById('voice-feedback-overlay');
      const voiceStatusText = document.getElementById('voice-status-text');

      toggleVoiceInput(
        // onResult callback
        (recognizedText, isFinal) => {
          if (searchInput) searchInput.value = recognizedText;
          if (voiceStatusText) voiceStatusText.textContent = `"${recognizedText}"`;
          currentSearchQuery = recognizedText;
          if (clearSearchBtn) clearSearchBtn.classList.add('active');

          if (isFinal) {
            handleSearchOrSymptomUpdate(recognizedText);
            // Provide audio readout of urgency recommendation
            provideVoiceAudioResponse(recognizedText);
          }
        },
        // onStateChange callback
        (listening) => {
          voiceMicBtn.classList.toggle('listening', listening);
          if (voiceOverlay) {
            voiceOverlay.classList.toggle('active', listening);
            if (listening && voiceStatusText) {
              voiceStatusText.textContent = t('listeningVoice');
            }
          }
        }
      );
    });
  }

  // Language Toggle
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const nextLang = currentLanguage === 'en' ? 'hi' : 'en';
      setLanguage(nextLang);
    });
  }

  // Theme Toggle
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Re-render when language changes
  window.addEventListener('languageChanged', () => {
    renderTriageCard(currentTriageState);
    refreshFacilitiesView();
  });
}

// Handle symptom input from search bar or speech
function handleSearchOrSymptomUpdate(query) {
  const triage = evaluateUrgency(query);
  currentTriageState = triage;

  // Auto-switch filter tab if query strongly indicates a specific department (e.g. blood bank or pharmacy)
  if (triage.suggestedCategory && triage.suggestedCategory !== 'all') {
    currentFilterCategory = triage.suggestedCategory;
    updateActiveFilterTabUI(triage.suggestedCategory);
  }

  renderTriageCard(currentTriageState);
  refreshFacilitiesView();
}

// Voice spoken guidance based on evaluated urgency
function provideVoiceAudioResponse(query) {
  const triage = evaluateUrgency(query);
  if (currentLanguage === 'hi') {
    if (triage.level === TRIAGE_LEVELS.CRITICAL) {
      speakGuidance("यह लक्षण अति गंभीर हो सकते हैं। कृपया तुरंत 108 एम्बुलेंस को कॉल करें।", 'hi-IN');
    } else {
      speakGuidance("आपके निकटतम आपातकालीन स्वास्थ्य केंद्र खोजे जा रहे हैं।", 'hi-IN');
    }
  } else {
    if (triage.level === TRIAGE_LEVELS.CRITICAL) {
      speakGuidance("These symptoms indicate a critical emergency. Please dial 108 or 112 immediately.", 'en-US');
    } else {
      speakGuidance("Locating the nearest verified emergency healthcare facilities for you.", 'en-US');
    }
  }
}

// Preset symptom button click
function selectPresetSymptom(symptomTextEn, symptomTextHi) {
  const query = currentLanguage === 'hi' ? symptomTextHi : symptomTextEn;
  const searchInput = document.getElementById('emergency-search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');

  if (searchInput) searchInput.value = query;
  currentSearchQuery = query;
  if (clearSearchBtn) clearSearchBtn.classList.add('active');

  handleSearchOrSymptomUpdate(query);
}

// Filter Categories
function setFilterCategory(category) {
  currentFilterCategory = category;
  updateActiveFilterTabUI(category);
  refreshFacilitiesView();
}

function updateActiveFilterTabUI(category) {
  document.querySelectorAll('.filter-pill').forEach(pill => {
    const filterType = pill.getAttribute('data-category');
    pill.classList.toggle('active', filterType === category);
  });
}

// Refresh facilities list and map markers
function refreshFacilitiesView() {
  const allFacilities = getFacilitiesWithDistance(currentUserLocation);
  
  // Filter by category
  let filtered = allFacilities;
  if (currentFilterCategory !== 'all') {
    filtered = filtered.filter(f => f.category === currentFilterCategory);
  }

  // Filter by search query if any
  if (currentSearchQuery && currentSearchQuery.trim()) {
    const q = currentSearchQuery.toLowerCase();
    filtered = filtered.filter(f => {
      const matchName = f.name.toLowerCase().includes(q) || (f.nameHi && f.nameHi.includes(q));
      const matchSpec = f.specialties.some(s => s.toLowerCase().includes(q)) || 
                        (f.specialtiesHi && f.specialtiesHi.some(s => s.includes(q)));
      const matchTier = f.tier.toLowerCase().includes(q) || (f.tierHi && f.tierHi.includes(q));
      return matchName || matchSpec || matchTier;
    });
  }

  // Render cards
  renderFacilityCards(filtered);

  // Render markers on map
  renderFacilityMarkers(filtered, currentUserLocation, (facility) => {
    selectFacilityForRoute(facility.id);
  });

  // Update count indicator
  const countEl = document.getElementById('facilities-count-indicator');
  if (countEl) {
    countEl.textContent = `${filtered.length} ${t('facilityFound')}`;
  }
}

// Render facility cards HTML
function renderFacilityCards(facilities) {
  const container = document.getElementById('facilities-list-container');
  if (!container) return;

  if (facilities.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; background: var(--bg-surface); border-radius: var(--radius-lg);">
        <div style="font-size: 2.5rem; margin-bottom: 10px;">🏥</div>
        <h3>${currentLanguage === 'hi' ? 'कोई केंद्र नहीं मिला' : 'No Facilities Found'}</h3>
        <p style="color: var(--text-secondary); margin-top: 6px;">
          ${currentLanguage === 'hi' ? 'कृपया अन्य श्रेणी चुनें या खोज शब्द बदलें।' : 'Try selecting another category or clear search terms.'}
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = facilities.map(f => {
    const name = currentLanguage === 'hi' && f.nameHi ? f.nameHi : f.name;
    const tier = currentLanguage === 'hi' && f.tierHi ? f.tierHi : f.tier;
    const address = currentLanguage === 'hi' && f.addressHi ? f.addressHi : f.address;
    const specialties = currentLanguage === 'hi' && f.specialtiesHi ? f.specialtiesHi : f.specialties;
    const isBloodBank = f.category === 'bloodbank';
    const isPharmacy = f.category === 'pharmacy';

    let tagClass = 'emergency';
    let tagLabel = 'Emergency 24x7';
    if (isBloodBank) { tagClass = 'bloodbank'; tagLabel = 'Blood Bank'; }
    else if (isPharmacy) { tagClass = 'pharmacy'; tagLabel = '24x7 Chemist'; }
    else if (f.category === 'cardiac') { tagClass = 'emergency'; tagLabel = 'Cardiac / Stroke'; }

    return `
      <article class="facility-card" id="card-${f.id}">
        <div class="facility-card-header">
          <div class="facility-title-block">
            <h3>${escapeHtml(name)}</h3>
            <div class="facility-badge-row">
              <span class="tag-badge ${tagClass}">${tagLabel}</span>
              <span class="tag-badge govt">${escapeHtml(f.accreditation)}</span>
            </div>
          </div>
          <div class="facility-distance-eta">
            <div class="distance-number">${f.distanceKm} km</div>
            <div class="eta-label">~${f.etaMin} mins drive</div>
          </div>
        </div>

        <div class="facility-address">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span>${escapeHtml(address)}</span>
        </div>

        <div class="facility-status-indicators">
          <div class="status-metric open-247">
            <span class="pulse-dot" style="background:#10B981;"></span>
            <span data-i18n="open247">${t('open247')}</span>
          </div>
          ${f.waitTimeMin ? `
            <div class="status-metric wait-time">
              ⏱️ <span data-i18n="waitTime">${t('waitTime')}</span> <strong>${f.waitTimeMin}m</strong>
            </div>
          ` : ''}
          ${f.icuBedsAvailable ? `
            <div class="status-metric icu-beds">
              🛏️ <span data-i18n="icuBeds">${t('icuBeds')}</span> <strong>${f.icuBedsAvailable}</strong>
            </div>
          ` : ''}
        </div>

        ${isBloodBank && f.bloodStock ? `
          <div style="font-size:0.78rem; font-weight:700; color:var(--text-secondary); margin-bottom:6px;">
            ${t('bloodStockAvailable')}
          </div>
          <div class="blood-stock-mini-grid">
            ${Object.entries(f.bloodStock).map(([type, units]) => `
              <div class="blood-item">
                <div class="blood-type-label">${type}</div>
                <div class="blood-units-count">${units}u</div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <div class="specialties-chips">
          ${specialties.map(spec => `
            <span class="specialty-pill">${escapeHtml(spec)}</span>
          `).join('')}
        </div>

        <div class="facility-actions-bar">
          <a href="tel:${f.emergencyPhone || f.phone}" class="btn-facility-call">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span data-i18n="callDesk">${t('callDesk')}</span>
          </a>

          <button class="btn-facility-route" onclick="selectFacilityForRoute('${f.id}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polygon points="3 11 22 2 13 21 11 13 3 11"/>
            </svg>
            <span data-i18n="getDirections">${t('getDirections')}</span>
          </button>

          <button class="btn-facility-share" onclick="shareFacilityDetails('${f.id}')" title="Share via WhatsApp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </button>
        </div>
      </article>
    `;
  }).join('');
}

// Select a facility, draw route on map, and scroll to map on mobile
function selectFacilityForRoute(facilityId) {
  const allFacilities = getFacilitiesWithDistance(currentUserLocation);
  const facility = allFacilities.find(f => f.id === facilityId);
  if (!facility) return;

  drawRoutePreview(currentUserLocation, facility);
  highlightFacilityCard(facilityId);

  // Smooth scroll to map if on mobile view
  if (window.innerWidth <= 1080) {
    const mapElement = document.getElementById('emergency-map');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

function highlightFacilityCard(facilityId) {
  document.querySelectorAll('.facility-card').forEach(c => c.classList.remove('highlighted'));
  const card = document.getElementById(`card-${facilityId}`);
  if (card) {
    card.classList.add('highlighted');
  }
}

// Share facility location on WhatsApp
function shareFacilityDetails(facilityId) {
  const all = getFacilitiesWithDistance(currentUserLocation);
  const f = all.find(x => x.id === facilityId);
  if (!f) return;

  const name = currentLanguage === 'hi' && f.nameHi ? f.nameHi : f.name;
  const msg = `🚨 Emergency Healthcare Alert:\nFacility: ${name}\nPhone: ${f.emergencyPhone || f.phone}\nDistance: ${f.distanceKm} km (~${f.etaMin} mins)\nDirections: https://maps.google.com/?q=${f.lat},${f.lng}`;

  const waUrl = `https://wa.me/?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
}

// Geolocation Handling - Anchored to Indore, MP
function initGeolocation() {
  currentUserLocation = DEFAULT_CENTER;
  updateUserLocationMarker(currentUserLocation);
  refreshFacilitiesView();

  const locLabel = document.getElementById('location-name-label');
  if (locLabel) locLabel.textContent = "📍 Indore, MP";
}

function centerOnUserLocation() {
  currentUserLocation = DEFAULT_CENTER;
  if (leafletMap) {
    leafletMap.setView([DEFAULT_CENTER.lat, DEFAULT_CENTER.lng], 13);
    updateUserLocationMarker(DEFAULT_CENTER);
  }
  refreshFacilitiesView();
}

// Theme handling
function initTheme() {
  const savedTheme = localStorage.getItem('ehn_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('ehn_theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) {
    btn.innerHTML = theme === 'dark' 
      ? `🌙` 
      : `☀️`;
  }
}
