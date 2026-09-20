/**
 * Emergency Healthcare Navigator - SOS & Distress Management (sos.js)
 * Quick dials, Family SOS contacts, live GPS dispatch via WhatsApp/SMS, Screen Strobe
 */

const SOS_STORAGE_KEY = 'ehn_family_contacts';
let isStrobeActive = false;

// Retrieve saved contacts from localStorage
function getSavedFamilyContacts() {
  try {
    const raw = localStorage.getItem(SOS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [
      { name: "Primary Caregiver (Sample)", phone: "+919876543210", relation: "Family" }
    ];
  } catch (e) {
    return [];
  }
}

// Save contacts to localStorage
function saveFamilyContacts(contacts) {
  try {
    localStorage.setItem(SOS_STORAGE_KEY, JSON.stringify(contacts));
  } catch (e) {
    console.error("Failed to save contacts:", e);
  }
}

// Render contacts list inside SOS modal
function renderFamilyContactsList() {
  const container = document.getElementById('family-contacts-list');
  if (!container) return;

  const contacts = getSavedFamilyContacts();
  if (contacts.length === 0) {
    container.innerHTML = `
      <p style="font-size: 0.85rem; color: var(--text-muted); text-align: center; padding: 8px;" data-i18n="noContactsSaved">
        ${t('noContactsSaved')}
      </p>
    `;
    return;
  }

  container.innerHTML = contacts.map((c, idx) => `
    <div class="family-contact-chip">
      <div>
        <strong>${escapeHtml(c.name)}</strong> 
        <span style="color:var(--text-secondary); font-size:0.8rem;">(${escapeHtml(c.relation || 'Caregiver')})</span>
        <div style="font-size:0.8rem; color:var(--text-muted);">${escapeHtml(c.phone)}</div>
      </div>
      <div style="display:flex; align-items:center; gap:6px;">
        <a href="tel:${escapeHtml(c.phone)}" class="btn-facility-call" style="padding:6px 12px; font-size:0.75rem;">
          📞 Call
        </a>
        <button onclick="removeFamilyContact(${idx})" style="color:var(--color-critical-red); padding:4px 8px; font-size:0.9rem;" title="Delete">
          ✕
        </button>
      </div>
    </div>
  `).join('');
}

// Add new contact
function addFamilyContact() {
  const name = prompt(currentLanguage === 'hi' ? "परिजन का नाम दर्ज करें:" : "Enter Caregiver/Family Name:");
  if (!name || !name.trim()) return;

  const phone = prompt(currentLanguage === 'hi' ? "फोन नंबर दर्ज करें (उदा. +91...):" : "Enter Phone Number (e.g. +91...):");
  if (!phone || !phone.trim()) return;

  const relation = prompt(currentLanguage === 'hi' ? "संबंध (माता-पिता, भाई, मित्र आदि):" : "Relation (e.g. Spouse, Parent, Sibling):") || "Family";

  const contacts = getSavedFamilyContacts();
  contacts.push({ name: name.trim(), phone: phone.trim(), relation: relation.trim() });
  saveFamilyContacts(contacts);
  renderFamilyContactsList();
}

// Remove contact
function removeFamilyContact(index) {
  const contacts = getSavedFamilyContacts();
  contacts.splice(index, 1);
  saveFamilyContacts(contacts);
  renderFamilyContactsList();
}

// Generate & Dispatch Emergency WhatsApp / SMS Alert with live GPS coordinates
function dispatchFamilyAlert(userLocation) {
  const contacts = getSavedFamilyContacts();
  const loc = userLocation || DEFAULT_CENTER;
  const mapLink = `https://maps.google.com/?q=${loc.lat},${loc.lng}`;

  const message = currentLanguage === 'hi'
    ? `🚨 आपातकालीन संकट अलर्ट (EMERGENCY SOS): मुझे तत्काल चिकित्सकीय सहायता की आवश्यकता है! मेरा लाइव स्थान: ${mapLink} । कृपया तुरंत फोन करें या एम्बुलेंस भेजें!`
    : `🚨 CRITICAL EMERGENCY SOS: I am in medical distress and need urgent help! My live GPS location: ${mapLink} . Please call me or dispatch an ambulance immediately!`;

  if (contacts.length > 0) {
    const primary = contacts[0].phone.replace(/[^0-9+]/g, '');
    const whatsappUrl = `https://wa.me/${primary}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  } else {
    // Open generic share or SMS
    const smsUrl = `sms:?body=${encodeURIComponent(message)}`;
    window.location.href = smsUrl;
  }
}

// Toggle Screen Strobe / Beacon to help responders find user in dark
function toggleScreenStrobe() {
  const strobeBtn = document.getElementById('btn-toggle-strobe');
  const body = document.body;

  if (isStrobeActive) {
    body.classList.remove('strobe-screen-active');
    isStrobeActive = false;
    if (strobeBtn) strobeBtn.classList.remove('active');
  } else {
    body.classList.add('strobe-screen-active');
    isStrobeActive = true;
    if (strobeBtn) strobeBtn.classList.add('active');
  }
}

// Open and Close Modals
function openSosModal() {
  renderFamilyContactsList();
  const modal = document.getElementById('sos-modal-overlay');
  if (modal) modal.classList.add('active');
}

function closeSosModal() {
  const modal = document.getElementById('sos-modal-overlay');
  if (modal) modal.classList.remove('active');
  if (isStrobeActive) toggleScreenStrobe();
  if (isSirenActive) toggleEmergencySiren();
}

function openFirstAidModal() {
  const modal = document.getElementById('firstaid-modal-overlay');
  if (modal) modal.classList.add('active');
}

function closeFirstAidModal() {
  const modal = document.getElementById('firstaid-modal-overlay');
  if (modal) modal.classList.remove('active');
  if (cprIntervalId) toggleCprMetronome();
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}
