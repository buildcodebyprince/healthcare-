/**
 * Emergency Healthcare Navigator - Facilities & Clinical Resources Data
 * Centered in Indore, Madhya Pradesh, India
 * Categorized by: trauma, cardiac, pediatric, bloodbank, pharmacy
 */

// Base reference coordinates for Indore, MP (Central Indore / Rajwada / Palasia / MYH area)
const DEFAULT_CENTER = { lat: 22.7196, lng: 75.8577, cityName: "Indore, MP" };

const rawFacilitiesData = [
  {
    id: "ind-1",
    name: "Maharaja Yeshwantrao (MY) Hospital & Apex Trauma Center",
    nameHi: "महाराजा यशवंतराव (MY) अस्पताल एवं शीर्ष ट्रॉमा सेंटर",
    type: "trauma",
    tier: "Level-1 Apex Government Emergency & Trauma Center",
    tierHi: "स्तर-1 शीर्ष सरकारी आपातकालीन एवं ट्रॉमा सेंटर",
    category: "trauma",
    address: "MYH Road, Sanyogitaganj, Indore, MP 452001",
    addressHi: "एमवायएच रोड, संयोगितागंज, इंदौर, मध्य प्रदेश 452001",
    lat: 22.7144,
    lng: 75.8752,
    phone: "0731-2527383",
    emergencyPhone: "0731-2527383",
    isOpen247: true,
    waitTimeMin: 10,
    icuBedsAvailable: 16,
    ventilatorsAvailable: 10,
    specialties: ["Level-1 Trauma", "Severe Hemorrhage", "Neuro-trauma", "Mass Casualty ER", "Resuscitation"],
    specialtiesHi: ["स्तर-1 ट्रॉमा", "रक्तस्राव नियंत्रण", "न्यूरो-ट्रॉमा", "मास कैजुअल्टी", "रिससिटेशन"],
    rating: 4.7,
    accreditation: "Govt Apex Medical College Hospital"
  },
  {
    id: "ind-2",
    name: "Medanta Super Specialty Hospital & Emergency Care",
    nameHi: "मेदांता सुपर स्पेशलिटी अस्पताल एवं आपातकालीन केयर",
    type: "cardiac",
    tier: "Comprehensive Cardiac, Neuro & Stroke Emergency",
    tierHi: "हार्ट अटैक, न्यूरो एवं स्ट्रोक विशेषज्ञ आपातकाल",
    category: "cardiac",
    address: "Plot No. 8, Scheme No. 54, PU-4 Commercial, Vijay Nagar, AB Road, Indore",
    addressHi: "प्लॉट नं. 8, स्कीम नं. 54, विजय नगर, ए.बी. रोड, इंदौर",
    lat: 22.7533,
    lng: 75.8937,
    phone: "0731-774444",
    emergencyPhone: "0731-4774444",
    isOpen247: true,
    waitTimeMin: 6,
    icuBedsAvailable: 18,
    ventilatorsAvailable: 12,
    specialties: ["Primary Angioplasty (Code STEMI)", "Acute Stroke Thrombolysis", "24x7 Cath Lab", "Cardiac ICU"],
    specialtiesHi: ["एंजियोप्लास्टी (कोड स्टेमी)", "एक्यूट स्ट्रोक केयर", "24x7 कैथ लैब", "कार्डियक आईसीयू"],
    rating: 4.9,
    accreditation: "NABH & JCI Accredited"
  },
  {
    id: "ind-3",
    name: "Bombay Hospital Indore - 24/7 Emergency & Trauma",
    nameHi: "बॉम्बे हॉस्पिटल इंदौर - 24/7 आपातकाल एवं ट्रॉमा",
    type: "trauma",
    tier: "Tertiary Care Polytrauma & Critical Care Center",
    tierHi: "पॉलीट्रॉमा एवं क्रिटिकल केयर विशेषज्ञ केंद्र",
    category: "trauma",
    address: "Eastern Ring Road, IDA Scheme No. 94/1, Vijay Nagar, Indore",
    addressHi: "ईस्टर्न रिंग रोड, स्कीम नं. 94, विजय नगर, इंदौर",
    lat: 22.7480,
    lng: 75.9015,
    phone: "0731-4771111",
    emergencyPhone: "0731-2558866",
    isOpen247: true,
    waitTimeMin: 8,
    icuBedsAvailable: 14,
    ventilatorsAvailable: 8,
    specialties: ["Polytrauma Unit", "Orthopedic Emergency", "Surgical ICU", "24x7 Diagnostic CT/MRI"],
    specialtiesHi: ["पॉलीट्रॉमा यूनिट", "ऑर्थोपेडिक इमरजेंसी", "सर्जिकल आईसीयू", "24x7 सीटी/एमआरआई"],
    rating: 4.8,
    accreditation: "NABH Accredited Tertiary Center"
  },
  {
    id: "ind-4",
    name: "Care CHL Hospitals - Heart & Emergency Institute",
    nameHi: "केयर सीएचएल अस्पताल - हार्ट एवं इमरजेंसी संस्थान",
    type: "cardiac",
    tier: "24/7 Multi-Specialty Cardiac & Emergency",
    tierHi: "24/7 मल्टी स्पेशलिटी कार्डियक व आपातकालीन विभाग",
    category: "cardiac",
    address: "AB Road, Near LIG Square, Anoop Nagar, Indore",
    addressHi: "ए.बी. रोड, एलआईजी चौराहे के पास, अनूप नगर, इंदौर",
    lat: 22.7340,
    lng: 75.8885,
    phone: "0731-4774000",
    emergencyPhone: "0731-4774444",
    isOpen247: true,
    waitTimeMin: 9,
    icuBedsAvailable: 12,
    ventilatorsAvailable: 7,
    specialties: ["Interventional Cardiology", "Cardiac Arrest Code Blue", "Vascular Surgery", "Intensive Care"],
    specialtiesHi: ["इंटरवेंशनल कार्डियोलॉजी", "कोड ब्लू", "वैस्कुलर सर्जरी", "गहन चिकित्सा"],
    rating: 4.8,
    accreditation: "NABH Accredited"
  },
  {
    id: "ind-5",
    name: "Chacha Nehru Bal Chikitsalaya (Pediatric Emergency)",
    nameHi: "चाचा नेहरू बाल चिकित्सालय (बाल आपातकाल विभाग)",
    type: "pediatric",
    tier: "Apex Government Pediatric Emergency & PICU/NICU",
    tierHi: "शीर्ष सरकारी बाल आपातकालीन अस्पताल व पीआईसीयू",
    category: "pediatric",
    address: "MY Hospital Campus, Sanyogitaganj, Indore",
    addressHi: "एमवाय अस्पताल परिसर, संयोगितागंज, इंदौर",
    lat: 22.7138,
    lng: 75.8748,
    phone: "0731-2527383",
    emergencyPhone: "0731-2527600",
    isOpen247: true,
    waitTimeMin: 12,
    icuBedsAvailable: 15,
    ventilatorsAvailable: 9,
    specialties: ["Pediatric Intensive Care (PICU)", "Neonatal Emergency (NICU)", "Pediatric Convulsions", "Child Poisoning"],
    specialtiesHi: ["बाल गहन चिकित्सा (PICU)", "नवजात आपातकाल (NICU)", "शिशु बुखार/दौरा", "बाल विषाक्तता"],
    rating: 4.7,
    accreditation: "MGM Medical College Pediatric Wing"
  },
  {
    id: "ind-6",
    name: "Indore Regional Red Cross & MYH Model Blood Bank",
    nameHi: "इंदौर क्षेत्रीय रेड क्रॉस एवं एमवायएच मॉडल ब्लड बैंक",
    type: "bloodbank",
    tier: "24/7 Apex Regional Blood Transfusion & Component Center",
    tierHi: "24/7 शीर्ष क्षेत्रीय रक्त कोष एवं कंपोनेंट सेपरेशन",
    category: "bloodbank",
    address: "M.Y. Hospital Ground Floor, Sanyogitaganj, Indore",
    addressHi: "एम.वाई. अस्पताल भूतल, संयोगितागंज, इंदौर",
    lat: 22.7140,
    lng: 75.8760,
    phone: "0731-2527440",
    emergencyPhone: "0731-2527441",
    isOpen247: true,
    bloodStock: {
      "A+": 48,
      "A-": 16,
      "B+": 74,
      "B-": 21,
      "O+": 92,
      "O-": 26,
      "AB+": 35,
      "AB-": 11,
      "Platelets": 55
    },
    specialties: ["24x7 Emergency Blood Issue", "Platelet Apheresis (SDP)", "Fresh Frozen Plasma (FFP)", "Cross-match"],
    specialtiesHi: ["24x7 आपातकालीन रक्त वितरण", "प्लेटलेट्स एफेरेसिस", "प्लाज्मा (FFP)", "तत्काल क्रॉस-मैच"],
    rating: 4.9,
    accreditation: "National Apex Model Blood Center"
  },
  {
    id: "ind-7",
    name: "Mata Gujri Memorial Blood Bank & Apheresis Unit",
    nameHi: "माता गुजरी मेमोरियल ब्लड बैंक एवं एफेरेसिस यूनिट",
    type: "bloodbank",
    tier: "24-Hour Advanced Component Blood Center",
    tierHi: "24 घंटे उन्नत रक्त घटक केंद्र",
    category: "bloodbank",
    address: "A.B. Road, Near LIG Square, Indore",
    addressHi: "ए.बी. रोड, एलआईजी चौराहे के पास, इंदौर",
    lat: 22.7360,
    lng: 75.8890,
    phone: "0731-2555678",
    emergencyPhone: "0731-2555679",
    isOpen247: true,
    bloodStock: {
      "A+": 38,
      "A-": 10,
      "B+": 62,
      "B-": 14,
      "O+": 78,
      "O-": 18,
      "AB+": 28,
      "AB-": 8,
      "Platelets": 42
    },
    specialties: ["Single Donor Platelets (SDP)", "Packed Red Cells", "Rare Blood Groups"],
    specialtiesHi: ["सिंगल डोनर प्लेटलेट्स", "पैक्ड रेड ब्लड सेल्स", "दुर्लभ रक्त समूह"],
    rating: 4.8,
    accreditation: "NABH Accredited Blood Center"
  },
  {
    id: "ind-8",
    name: "Apollo 24/7 Emergency Pharmacy & Oxygen Center",
    nameHi: "अपोलो 24/7 आपातकालीन फार्मेसी एवं ऑक्सीजन सेंटर",
    type: "pharmacy",
    tier: "24-Hour Critical Care Chemist & Medical Gas Supplier",
    tierHi: "24 घंटे आपातकालीन मेडिकल स्टोर व मेडिकल ऑक्सीजन",
    category: "pharmacy",
    address: "Vijay Nagar Square, Near Scheme 54, Indore",
    addressHi: "विजय नगर चौराहा, स्कीम 54 के पास, इंदौर",
    lat: 22.7520,
    lng: 75.8910,
    phone: "0731-4001122",
    emergencyPhone: "1860-500-0101",
    isOpen247: true,
    specialties: ["Medical Oxygen Cylinders", "Critical Care Injections", "Snake Antivenom", "Cardiac Emergency Drugs"],
    specialtiesHi: ["ऑक्सीजन सिलेंडर", "क्रिटिकल केयर इंजेक्शन", "सांप का एंटीवेनम", "कार्डियक आपातकालीन दवाएं"],
    rating: 4.8,
    accreditation: "Licensed 24x7 Emergency Pharmacy"
  },
  {
    id: "ind-9",
    name: "Noble 24x7 Chemist & Critical Supplies",
    nameHi: "नोबल 24x7 केमिस्ट एवं आपातकालीन सप्लाइज",
    type: "pharmacy",
    tier: "24-Hour Emergency Medical & Surgical Supplier",
    tierHi: "24 घंटे आपातकालीन दवा एवं सर्जिकल स्टोर",
    category: "pharmacy",
    address: "Geeta Bhawan Square, A.B. Road, Indore",
    addressHi: "गीता भवन चौराहा, ए.बी. रोड, इंदौर",
    lat: 22.7180,
    lng: 75.8820,
    phone: "0731-2491100",
    emergencyPhone: "0731-2491101",
    isOpen247: true,
    specialties: ["Emergency Antibiotics", "Insulin Cold-chain", "Nebulization Supplies", "Trauma Dressing Kits"],
    specialtiesHi: ["इमरजेंसी एंटीबायोटिक्स", "इंसुलिन कोल्ड चेन", "नेबुलाइजर किट्स", "ट्रॉमा ड्रेसिंग"],
    rating: 4.7,
    accreditation: "Authorized 24x7 Medical Supplier"
  }
];

// Helper: Calculate distance between two GPS coordinates using Haversine Formula (in km)
function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (dLat => dLat * Math.PI / 180)(lat2 - lat1);
  const dLon = (dLon => dLon * Math.PI / 180)(lon2 - lon1);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Estimate driving time in city traffic (average 28 km/h emergency speed)
function estimateEmergencyDrivingTimeMin(distanceKm) {
  const avgSpeedKmH = 28;
  const minutes = (distanceKm / avgSpeedKmH) * 60;
  return Math.max(3, Math.round(minutes));
}

// Generate facilities with computed distances relative to given user location
function getFacilitiesWithDistance(userLocation) {
  const loc = userLocation || DEFAULT_CENTER;
  
  return rawFacilitiesData.map(item => {
    const distanceKm = calculateHaversineDistance(loc.lat, loc.lng, item.lat, item.lng);
    const etaMin = estimateEmergencyDrivingTimeMin(distanceKm);
    return {
      ...item,
      distanceKm: parseFloat(distanceKm.toFixed(1)),
      etaMin: etaMin
    };
  }).sort((a, b) => a.distanceKm - b.distanceKm);
}
