/**
 * Emergency Healthcare Navigator - Interactive Map & Navigation Routing (map.js)
 * High-contrast medical pins, user live location marker, routing previews, and GMaps export
 */

let leafletMap = null;
let userMarker = null;
let facilityMarkers = [];
let activeRoutePolyline = null;
let selectedFacility = null;

// Initialize Leaflet Map
function initEmergencyMap(defaultCenter, onMarkerClickCallback) {
  const mapElement = document.getElementById('emergency-map');
  if (!mapElement || typeof L === 'undefined') {
    console.warn("Leaflet map element or library not loaded.");
    return null;
  }

  const center = defaultCenter || DEFAULT_CENTER;

  leafletMap = L.map('emergency-map', {
    zoomControl: true,
    attributionControl: false
  }).setView([center.lat, center.lng], 13);

  // High performance dark/emergency-friendly tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    subdomains: ['a', 'b', 'c']
  }).addTo(leafletMap);

  // Set user marker
  updateUserLocationMarker(center);

  return leafletMap;
}

// Custom Marker Icons
function getCategoryIcon(type) {
  let color = '#EF4444'; // default red
  let symbol = '🚨';

  if (type === 'cardiac') {
    color = '#DC2626';
    symbol = '🫀';
  } else if (type === 'pediatric') {
    color = '#3B82F6';
    symbol = '👶';
  } else if (type === 'bloodbank') {
    color = '#B91C1C';
    symbol = '🩸';
  } else if (type === 'pharmacy') {
    color = '#0D9488';
    symbol = '💊';
  }

  return L.divIcon({
    className: 'custom-emergency-marker',
    html: `
      <div style="
        background: ${color};
        width: 38px;
        height: 38px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        border: 2px solid #FFFFFF;
      ">
        <span style="transform: rotate(45deg); font-size: 18px;">${symbol}</span>
      </div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38]
  });
}

// User location marker
function updateUserLocationMarker(coords) {
  if (!leafletMap || typeof L === 'undefined') return;

  const userIcon = L.divIcon({
    className: 'user-live-marker',
    html: `
      <div style="
        width: 22px;
        height: 22px;
        background: #2563EB;
        border: 3px solid #FFFFFF;
        border-radius: 50%;
        box-shadow: 0 0 16px #3B82F6;
        animation: pulse-ring 1.6s infinite;
      "></div>
    `,
    iconSize: [22, 22],
    iconAnchor: [11, 11]
  });

  if (userMarker) {
    userMarker.setLatLng([coords.lat, coords.lng]);
  } else {
    userMarker = L.marker([coords.lat, coords.lng], { icon: userIcon }).addTo(leafletMap);
    userMarker.bindTooltip(currentLanguage === 'hi' ? "आपका स्थान" : "Your Location", { permanent: false, direction: 'top' });
  }
}

// Render facility pins on map
function renderFacilityMarkers(facilities, userLocation, onSelectCallback) {
  if (!leafletMap || typeof L === 'undefined') return;

  // Clear existing facility markers
  facilityMarkers.forEach(m => leafletMap.removeLayer(m));
  facilityMarkers = [];

  facilities.forEach(facility => {
    const icon = getCategoryIcon(facility.type);
    const marker = L.marker([facility.lat, facility.lng], { icon: icon }).addTo(leafletMap);

    const name = currentLanguage === 'hi' && facility.nameHi ? facility.nameHi : facility.name;
    const tier = currentLanguage === 'hi' && facility.tierHi ? facility.tierHi : facility.tier;

    marker.bindPopup(`
      <div style="padding: 4px; font-family: inherit; max-width: 240px; color: #0F172A;">
        <strong style="font-size: 14px; display: block; margin-bottom: 2px;">${escapeHtml(name)}</strong>
        <div style="font-size: 11px; color: #64748B; margin-bottom: 6px;">${escapeHtml(tier)}</div>
        <div style="font-size: 12px; font-weight: 700; color: #2563EB; margin-bottom: 8px;">
          📍 ${facility.distanceKm} km • ~${facility.etaMin} min ETA
        </div>
        <div style="display: flex; gap: 6px;">
          <a href="tel:${facility.emergencyPhone || facility.phone}" style="
            background: #10B981;
            color: #FFF;
            text-decoration: none;
            padding: 5px 10px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: bold;
          ">📞 Call ER</a>
          <button onclick="selectFacilityForRoute('${facility.id}')" style="
            background: #2563EB;
            color: #FFF;
            border: none;
            cursor: pointer;
            padding: 5px 10px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: bold;
          ">🗺️ Route</button>
        </div>
      </div>
    `);

    marker.on('click', () => {
      if (onSelectCallback) onSelectCallback(facility);
    });

    facilityMarkers.push(marker);
  });
}

// Draw Route Line from User to Facility
function drawRoutePreview(userLocation, facility) {
  if (!leafletMap || typeof L === 'undefined' || !facility) return;

  selectedFacility = facility;
  const userCoords = userLocation || DEFAULT_CENTER;

  // Clear previous route line
  if (activeRoutePolyline) {
    leafletMap.removeLayer(activeRoutePolyline);
  }

  const latlngs = [
    [userCoords.lat, userCoords.lng],
    [facility.lat, facility.lng]
  ];

  activeRoutePolyline = L.polyline(latlngs, {
    color: '#EF4444',
    weight: 4,
    dashArray: '8, 8',
    opacity: 0.9
  }).addTo(leafletMap);

  // Zoom bounds to fit both points
  leafletMap.fitBounds(L.latLngBounds(latlngs), { padding: [40, 40] });

  // Update Route Preview Banner
  updateRouteBannerUI(facility);
}

// Update UI Banner below map
function updateRouteBannerUI(facility) {
  const container = document.getElementById('map-route-preview');
  if (!container || !facility) return;

  const name = currentLanguage === 'hi' && facility.nameHi ? facility.nameHi : facility.name;
  const gmapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${facility.lat},${facility.lng}`;

  container.innerHTML = `
    <div class="route-info-left">
      <div class="route-dest-name">🎯 ${escapeHtml(name)}</div>
      <div class="route-meta">
        <strong>${facility.distanceKm} km</strong> • ~${facility.etaMin} mins drive • 24/7 ER Ready
      </div>
    </div>
    <div class="route-open-apps">
      <a href="${gmapsUrl}" target="_blank" rel="noopener" class="btn-open-gmaps">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polygon points="3 11 22 2 13 21 11 13 3 11"/>
        </svg>
        <span data-i18n="openGoogleMaps">${t('openGoogleMaps')}</span>
      </a>
    </div>
  `;
}
