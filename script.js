const bloodBanks = [
  {
    name: "District Blood Bank, Ganjam",
    location: "Brahmapur",
    phone: "9437000000",
    groups: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    status: "Available"
  },
  {
    name: "Red Cross Blood Bank",
    location: "Brahmapur",
    phone: "9438000000",
    groups: ["A+", "B+", "O+", "AB+"],
    status: "Limited"
  },
  {
    name: "MKCG Medical College Blood Bank",
    location: "Brahmapur",
    phone: "6802221234",
    groups: ["A+", "A-", "B+", "O+", "O-", "AB+", "AB-"],
    status: "Available"
  },
  {
    name: "City Hospital Blood Bank",
    location: "Brahmapur",
    phone: "6802225678",
    groups: ["B+", "B-", "O+", "AB+"],
    status: "Limited"
  },
  {
    name: "Life Care Blood Centre",
    location: "Brahmapur",
    phone: "6802234567",
    groups: ["A+", "O+", "O-", "AB-"],
    status: "Available"
  }
];
const hospitals = [
  {
    name: "MKCG Medical College & Hospital",
    type: "Government",
    address: "Brahmapur, Odisha",
    hospitalPhone: "06802221111",
    ambulancePhone: "108",
    beds: "Available",
    doctors: "Available",
    rating: 4.6
  },
  {
    name: "District Headquarters Hospital (DHH)",
    type: "Government",
    address: "Brahmapur, Odisha",
    hospitalPhone: "06802224444",
    ambulancePhone: "108",
    beds: "Limited",
    doctors: "Available",
    rating: 4.0
  },
  {
    name: "City Hospital",
    type: "Government",
    address: "Brahmapur, Odisha",
    hospitalPhone: "06802222222",
    ambulancePhone: "9439001111",
    beds: "Limited",
    doctors: "Available",
    rating: 4.1
  },
  {
    name: "Apollo Hospital",
    type: "Private",
    address: "Brahmapur, Odisha",
    hospitalPhone: "06802233333",
    ambulancePhone: "9439002222",
    beds: "Available",
    doctors: "Limited",
    rating: 4.3
  },
  {
    name: "Life Care Hospital",
    type: "Private",
    address: "Brahmapur, Odisha",
    hospitalPhone: "06802255555",
    ambulancePhone: "9439003333",
    beds: "Available",
    doctors: "Available",
    rating: 4.2
  },
  {
    name: "Arya Hospital",
    type: "Private",
    address: "Brahmapur, Odisha",
    hospitalPhone: "06802266666",
    ambulancePhone: "9439004444",
    beds: "Limited",
    doctors: "Available",
    rating: 3.9
  }
];

function showHospitals(list) {
  const container = document.getElementById("hospitalList");
  if (!container) return;

  container.innerHTML = "";

  list.forEach(h => {
    container.innerHTML += `
      <div class="card">
        <h3>${h.name}</h3>
        <p>🏥 <b>${h.type}</b></p>
        <p>📍 ${h.address}</p>
        <p>🛏 Beds: <b>${h.beds}</b></p>
        <p>👨‍⚕️ Doctors: <b>${h.doctors}</b></p>
        <p>⭐ Rating: ${h.rating}</p>

        <p>📞 Hospital: ${h.hospitalPhone}</p>
        

        <button onclick="callNumber('${h.hospitalPhone}')">
          📞 Call Hospital
        </button>

        <button onclick="callNumber('${h.ambulancePhone}')" 
                style="background:#ef6c00;">
          🚑 Call Ambulance
        </button>
      </div>
    `;
  });

}

function filterHospitals() {
  const type = document.getElementById("typeFilter").value;
  if (type === "all") {
    showHospitals(hospitals);
  } else {
    showHospitals(
      hospitals.filter(h => h.type === type)
    );
  }
}

showHospitals(hospitals);

function callNumber(number) {
  window.location.href = "tel:" + number;
}

// Build a Google Maps link from stored location
function getCurrentLocationLink() {
  const lat = localStorage.getItem("userLat");
  const lon = localStorage.getItem("userLon");

  if (!lat || !lon) {
    alert("Location not ready yet. Please allow location access and try again.");
    return null;
  }

  const mapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;
  return { lat, lon, mapsUrl };
}

// Open SMS composer with emergency text + location
function sendEmergencyAlert(number) {
  const data = getCurrentLocationLink();
  if (!data) return;

  const { lat, lon, mapsUrl } = data;

  const message =
    `EMERGENCY ALERT: I need help. My current location is ` +
    `Latitude: ${lat}, Longitude: ${lon}. ` +
    `Map: ${mapsUrl}`;

  // Most phones support sms:NUMBER?body=...
  const smsUrl = `sms:${number}?&body=${encodeURIComponent(message)}`;
  window.location.href = smsUrl;
}

// Let user pick which emergency number to alert
function openEmergencyAlertOptions() {
  const choice = prompt(
    "Send emergency alert to:\n" +
    "1 - 108 (Ambulance)\n" +
    "2 - 100 (Police)\n" +
    "3 - 112 (National Emergency)\n\n" +
    "Type 1, 2, or 3"
  );

  if (!choice) return;

  let number;
  if (choice === "1") number = "108";
  else if (choice === "2") number = "100";
  else if (choice === "3") number = "112";
  else {
    alert("Invalid choice. Please try again.");
    return;
  }

  sendEmergencyAlert(number);
}

function showBloodBanks(list) {
  const container = document.getElementById("bloodList");
  if (!container) return;

  container.innerHTML = "";

  list.forEach(bank => {
    container.innerHTML += `
      <div class="card">
        <h3>${bank.name}</h3>
        <p>📍 ${bank.location}</p>
        <p>🩸 ${bank.groups.join(", ")}</p>
        <p>Status: <b>${bank.status}</b></p>
        <button onclick="callNumber('${bank.phone}')">📞 Call</button>
      </div>
    `;
  });
}

function filterBlood() {
  const group = document.getElementById("groupFilter").value;
  if (group === "all") {
    showBloodBanks(bloodBanks);
  } else {
    showBloodBanks(
      bloodBanks.filter(b => b.groups.includes(group))
    );
  }
}
// VOICE ASSISTANT
function speakText(text, lang="en-US") {
  if (!('speechSynthesis' in window)) {
    alert("Sorry, your browser does not support voice.");
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang; // "en-US" for English, "hi-IN" for Hindi, "or-IN" for Odia
  utterance.rate = 1;     // speed
  utterance.pitch = 1;    // pitch
  window.speechSynthesis.speak(utterance);
}

// show initial blood banks on blood page (if present)
showBloodBanks(bloodBanks);

// Text for each page in different languages
const translations = {
  home: {
    en: {
      title: "SAHAYA",
      subtitle: "Local Help & Emergency Services",
      voice:
        "Welcome to Sahaya. Tap Ambulance, Police, or Fire buttons for emergency help. You can also open Blood Banks, Hospitals, Emergency Numbers, and Government Health Schemes."
    },
    hi: {
      title: "सहाय",
      subtitle: "स्थानीय सहायता और आपातकालीन सेवाएँ",
      voice:
        "सहाय ऐप में आपका स्वागत है। आपातकाल के लिए एम्बुलेंस, पुलिस या फायर बटन पर टैप करें। आप रक्त बैंक, अस्पताल, आपातकालीन नंबर और सरकारी स्वास्थ्य योजनाएँ भी देख सकते हैं।"
    },
    or: {
      title: "ସାହାୟା",
      subtitle: "ସ୍ଥାନୀୟ ସହାୟତା ଏବଂ ଆପତ୍କାଳୀନ ସେବା",
      voice:
        "ସାହାୟା ଆପ୍‌କୁ ସ୍ୱାଗତ। ଆପତ୍କାଳୀନ ସହାୟତା ପାଇଁ ଏମ୍ବୁଲାନ୍ସ, ପୁଲିସ୍ କିମ୍ବା ଫାୟାର ବଟନ୍ ଦବାନ୍ତୁ। ରକ୍ତ ବ୍ୟାଙ୍କ, ହସ୍ପିଟାଲ, ଆପତ୍କାଳୀନ ନମ୍ବର ଏବଂ ସରକାରୀ ସ୍ୱାସ୍ଥ୍ୟ ଯୋଜନା ବିଷୟରେ ମଧ୍ୟ ଦେଖିପାରିବେ।"
    }
  },
  emergency: {
    en: {
      title: "Emergency Numbers",
      subtitle: "Tap a card and then call on your phone",
      voice:
        "This page lists important emergency numbers like ambulance, police, fire, women and child helplines. Tap a card and then press call on your phone."
    },
    hi: {
      title: "आपातकालीन नंबर",
      subtitle: "कार्ड पर टैप करें और कॉल दबाएँ",
      voice:
        "इस पेज पर एम्बुलेंस, पुलिस, फायर, महिला और बाल हेल्पलाइन जैसे ज़रूरी आपातकालीन नंबर दिए गए हैं। किसी कार्ड पर टैप करें और फिर अपने फ़ोन पर कॉल दबाएँ।"
    },
    or: {
      title: "ଆପତ୍କାଳୀନ ନମ୍ବର",
      subtitle: "କାର୍ଡରେ ଟାପ୍ କରି କଲ୍ କରନ୍ତୁ",
      voice:
        "ଏହି ପୃଷ୍ଠାରେ ଏମ୍ବୁଲାନ୍ସ, ପୁଲିସ୍, ଫାୟାର, ମହିଳା ଏବଂ ଶିଶୁ ହେଲ୍ପଲାଇନ୍ ଭଳି ଦରକାରୀ ଆପତ୍କାଳୀନ ନମ୍ବର ଦିଆଯାଇଛି। କୌଣସି କାର୍ଡରେ ଟାପ୍ କରନ୍ତୁ ଏବଂ ତାପରେ ଫୋନରେ କଲ୍ ଦବାନ୍ତୁ।"
    }
  },
  hospital: {
    en: {
      title: "Hospitals",
      subtitle: "Government and private care near you",
      voice:
        "Here you can see important hospitals in Brahmapur. Use the filter to see government or private hospitals and tap the buttons to call for help."
    },
    hi: {
      title: "अस्पताल",
      subtitle: "आपके आसपास सरकारी और प्राइवेट अस्पताल",
      voice:
        "यहाँ आप ब्रह्मपुर के ज़रूरी अस्पताल देख सकते हैं। फ़िल्टर से सरकारी या प्राइवेट अस्पताल चुनें और मदद के लिए कॉल बटन दबाएँ।"
    },
    or: {
      title: "ହସ୍ପିଟାଲ",
      subtitle: "ଆପଣଙ୍କ ନିକଟରେ ସରକାରୀ ଏବଂ ପ୍ରାଇଭେଟ୍ ହସ୍ପିଟାଲ",
      voice:
        "ଏଠାରେ ଆପଣ ବ୍ରହ୍ମପୁରର ଦରକାରୀ ହସ୍ପିଟାଲଗୁଡ଼ିକୁ ଦେଖିପାରିବେ। ଫିଲ୍ଟର ଦ୍ୱାରା ସରକାରୀ କିମ୍ବା ପ୍ରାଇଭେଟ୍ ହସ୍ପିଟାଲ ଚୟନ କରନ୍ତୁ ଏବଂ ସହାୟତା ପାଇଁ କଲ୍ ବଟନ୍ ଦବାନ୍ତୁ।"
    }
  },
  blood: {
    en: {
      title: "Blood Banks",
      subtitle: "Nearby centres and availability",
      voice:
        "Use this page to find blood banks in Brahmapur. Choose a blood group from the list and then call the centre to confirm availability."
    },
    hi: {
      title: "ब्लड बैंक",
      subtitle: "नज़दीकी केंद्र और उपलब्धता",
      voice:
        "इस पेज से आप ब्रह्मपुर के ब्लड बैंक देख सकते हैं। अपनी ज़रूरत का ब्लड ग्रुप चुनें और उपलब्धता की पुष्टि के लिए केंद्र पर कॉल करें।"
    },
    or: {
      title: "ବ୍ଲଡ୍ ବ୍ୟାଙ୍କ",
      subtitle: "ନିକଟସ୍ଥ କେନ୍ଦ୍ର ଏବଂ ଉପଲବ୍ଧତା",
      voice:
        "ଏହି ପୃଷ୍ଠାରେ ଆପଣ ବ୍ରହ୍ମପୁରର ବ୍ଲଡ୍ ବ୍ୟାଙ୍କ ଦେଖିପାରିବେ। ତାଲିକାରୁ ଆବଶ୍ୟକ ବ୍ଲଡ୍ ଗ୍ରୁପ୍ ବାଛନ୍ତୁ ଏବଂ ଉପଲବ୍ଧତା ନିଶ୍ଚିତ ପାଇଁ କେନ୍ଦ୍ରକୁ କଲ୍ କରନ୍ତୁ।"
    }
  },
  "health-schemes": {
    en: {
      title: "Health Schemes",
      subtitle: "Government support for medical care",
      voice:
        "Here you can see important government health schemes like Ayushman Bharat and others. Read the details and tap Apply to visit the official website."
    },
    hi: {
      title: "स्वास्थ्य योजनाएँ",
      subtitle: "सरकारी मदद और बीमा योजना",
      voice:
        "यहाँ आप आयुष्मान भारत जैसी महत्वपूर्ण सरकारी स्वास्थ्य योजनाएँ देख सकते हैं। विवरण पढ़ें और आधिकारिक वेबसाइट खोलने के लिए Apply बटन दबाएँ।"
    },
    or: {
      title: "ସ୍ୱାସ୍ଥ୍ୟ ଯୋଜନା",
      subtitle: "ଚିକିତ୍ସା ପାଇଁ ସରକାରୀ ସହାୟତା",
      voice:
        "ଏଠାରେ ଆପଣ ଆୟୁଷ୍ମାନ୍ ଭାରତ ଭଳି ଦରକାରୀ ସରକାରୀ ସ୍ୱାସ୍ଥ୍ୟ ଯୋଜନାଗୁଡ଼ିକୁ ଦେଖିପାରିବେ। ବିବରଣୀ ପଢ଼ନ୍ତୁ ଏବଂ ଅଧିକାରିକ ୱେବସାଇଟ ପାଇଁ Apply ବଟନ୍ ଦବାନ୍ତୁ।"
    }
  }
};

let currentLang = "en"; // default language

function setLanguage(lang) {
  currentLang = lang;

  const pageKey = document.body.dataset.page || "home";
  const pageTranslations = translations[pageKey];
  const t = pageTranslations && pageTranslations[lang];

  // Update app title + subtitle if present
  const titleEl = document.querySelector(".app-title");
  if (titleEl && t) {
    titleEl.innerHTML = `
      ${t.title}
      <span>${t.subtitle}</span>
    `;
  }

  // Update aria-pressed state on language buttons
  const langButtons = document.querySelectorAll(".language-buttons button");
  langButtons.forEach((btn) => {
    const isActive = btn.getAttribute("onclick")?.includes(`'${lang}'`);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  // Wire up voice instructions for this page + language
  const voiceBtnEl = document.getElementById("voiceBtn");
  if (voiceBtnEl && t) {
    voiceBtnEl.onclick = function () {
      const voiceCode = lang === "en" ? "en-US" : lang === "hi" ? "hi-IN" : "or-IN";
      speakText(t.voice, voiceCode);
    };
  }

  // Update other visible text on the page (fallback when .app-title not present)
  if (t) {
    // Document title
    try { document.title = `${t.title} — Sahaya`; } catch (e) {}

    // Hero title / subtitle (home page)
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroTitle && heroSubtitle) {
      heroTitle.innerHTML = t.title || heroTitle.innerHTML;
      heroSubtitle.textContent = t.subtitle || heroSubtitle.textContent;
    }

    // Localized voice button label mapping
    const voiceLabel = {
      en: '🔊 Listen instructions',
      hi: '🔊 निर्देश सुनें',
      or: '🔊 ନିର୍ଦ୍ଦେଶ ଶୁଣନ୍ତୁ'
    };
    if (voiceBtnEl) voiceBtnEl.textContent = voiceLabel[lang] || voiceLabel.en;
  }
}
// Ensure UI and voice button are initialized with the default language
setLanguage(currentLang);
/* ---------- GOVERNMENT SCHEMES DATA ---------- */
const healthSchemes = [
  {
    name: "Ayushman Bharat",
    facility: "Health insurance coverage up to ₹5 Lakh per family",
    eligibility: "All BPL and EWS families",
    documents: "Aadhaar Card, Ration Card",
    office: "District Health Office, Brahmapur",
    contact: "0680-2223333",
    applyLink: "https://www.ayushmanbharat.gov.in/"
  },
  {
    name: "National Health Mission (NHM)",
    facility: "Free maternal and child health services",
    eligibility: "All pregnant women & children",
    documents: "Aadhaar Card / Health ID",
    office: "District Health Office, Brahmapur",
    contact: "0680-2224444",
    applyLink: "https://nhm.gov.in/"
  },
  {
    name: "Pradhan Mantri Jan Arogya Yojana (PMJAY)",
    facility: "Cashless hospitalization for serious illnesses",
    eligibility: "Eligible families under SECC list",
    documents: "Aadhaar Card, SECC Certificate",
    office: "District Hospital, Brahmapur",
    contact: "0680-2225555",
    applyLink: "https://pmjay.gov.in/"
  },
  {
    name: "Rashtriya Bal Swasthya Karyakram (RBSK)",
    facility: "Free health screening for children",
    eligibility: "Children aged 0–18 years",
    documents: "Birth certificate / Aadhaar",
    office: "District Hospital, Brahmapur",
    contact: "0680-2226666",
    applyLink: "https://nhm.gov.in/index1.php?lang=1&level=2&sublinkid=1133&lid=176"
  },
  {
    name: "Janani Suraksha Yojana (JSY)",
    facility: "Cash incentive for institutional deliveries",
    eligibility: "Pregnant women below poverty line",
    documents: "Pregnancy Card, Aadhaar",
    office: "PHC / CHC, Brahmapur",
    contact: "0680-2227777",
    applyLink: "https://nhm.gov.in/index1.php?lang=1&level=2&sublinkid=1132&lid=175"
  }
];

/* ---------- SHOW SCHEMES ---------- */
function showSchemes(list) {
  const container = document.getElementById("schemeList");
  if (!container) return;

  container.innerHTML = "";

  list.forEach(s => {
    container.innerHTML += `
      <div class="card">
        <h3>${s.name}</h3>
        <p>🏥 Facility: ${s.facility}</p>
        <p>✅ Eligibility: ${s.eligibility}</p>
        <p>📄 Documents: ${s.documents}</p>
        <p>📍 Office: ${s.office}</p>
        <p>📞 Contact: <a href="tel:${s.contact}">${s.contact}</a></p>
        <a href="${s.applyLink}" target="_blank">
          <button style="background:#ff9800;color:white;padding:8px 12px;border-radius:5px;margin-top:5px;">
            📝 Apply
          </button>
        </a>
      </div>
    `;
  });
}

/* ---------- LOAD SCHEMES ---------- */
/* ---------- CHILD LOCK SYSTEM ---------- */
let childLock = localStorage.getItem("childLock") === "on";

function updateChildLockUI() {
  const btn = document.getElementById("childLockBtn");
  const emergencyBtns = document.querySelectorAll(".emergency button");

  if (!btn) return;

  if (childLock) {
    btn.innerText = "🔒 Child Lock ON";
    emergencyBtns.forEach(b => b.disabled = true);
  } else {
    btn.innerText = "🔓 Child Lock OFF";
    emergencyBtns.forEach(b => b.disabled = false);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateChildLockUI();

  const btn = document.getElementById("childLockBtn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    if (childLock) {
      const pin = prompt("Enter PIN to unlock:");
      if (pin === "1234") {
        childLock = false;
        localStorage.setItem("childLock", "off");
      } else {
        alert("Wrong PIN");
      }
    } else {
      childLock = true;
      localStorage.setItem("childLock", "on");
    }
    updateChildLockUI();
  });
});
// GET USER LOCATION
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log("Latitude:", lat, "Longitude:", lon);

        // Save location for use in maps or services
        localStorage.setItem("userLat", lat);
        localStorage.setItem("userLon", lon);

        // Optional: Show a Google Map centered on user location
        showUserMap(lat, lon);
      },
      function(error) {
        alert("Unable to get your location. Please allow location access.");
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

// CALL THIS ON PAGE LOAD
document.addEventListener("DOMContentLoaded", function() {
  getUserLocation();
});
function showUserMap(lat, lon) {
  const mapContainer = document.getElementById("userMap");
  if (!mapContainer) return;

  mapContainer.innerHTML = `
    <iframe
      width="100%" height="220"
      style="border:0;"
      loading="lazy"
      allowfullscreen
      src="https://www.google.com/maps?q=${lat},${lon}&hl=es;z=15&output=embed">
    </iframe>
  `;
}

// Navigation helper for quick feature buttons
function navigateTo(path) {
  window.location.href = path;
}

// Copy current map link to clipboard
function copyLocation() {
  const data = getCurrentLocationLink();
  if (!data) return;
  const { mapsUrl } = data;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(mapsUrl).then(() => {
      alert('Map link copied to clipboard');
    }).catch(() => {
      prompt('Copy this link:', mapsUrl);
    });
  } else {
    prompt('Copy this link:', mapsUrl);
  }
}

// First-aid tips: show a random tip and optionally speak it
const firstAidTips = [
  'If someone is bleeding, apply firm pressure with a clean cloth to control bleeding.',
  'For burns, cool the area with running water for at least 10 minutes; do not apply ice.',
  'If a person is unresponsive and not breathing normally, start CPR and call emergency services.',
  'For choking, perform abdominal thrusts (Heimlich maneuver) on conscious adults.'
];

function showFirstAidTip() {
  const el = document.getElementById('firstAidTip');
  if (!el) return;
  const tip = firstAidTips[Math.floor(Math.random() * firstAidTips.length)];
  el.textContent = tip;
  try {
    const voiceCode = currentLang === 'hi' ? 'hi-IN' : currentLang === 'or' ? 'or-IN' : 'en-US';
    speakText(tip, voiceCode);
  } catch (e) {}
}

// Replace missing images with a lightweight SVG placeholder
document.addEventListener('DOMContentLoaded', function () {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600">
      <rect width="100%" height="100%" fill="#e6eefc"/>
      <g fill="#374151" font-family="Segoe UI, Arial, sans-serif" font-weight="700">
        <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-size="36">Image not available</text>
        <text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" font-size="20">Add the image file to the project or replace the URL</text>
      </g>
    </svg>
  `;

  const dataUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);

  document.querySelectorAll('img').forEach(img => {
    // if image already failed to load, set placeholder
    img.addEventListener('error', function () {
      if (this.src !== dataUrl) {
        this.src = dataUrl;
        this.classList.add('placeholder');
      }
    });

    // If img has empty/invalid src at load time, force placeholder
    if (!img.complete || img.naturalWidth === 0) {
      // allow normal loading first, then fallback after a short delay
      setTimeout(() => {
        if (img.naturalWidth === 0) {
          img.src = dataUrl;
          img.classList.add('placeholder');
        }
      }, 250);
    }
  });
});

/* ---------- Local Voice Assistant (basic, offline) ---------- */
let recognition = null;
let assistantListening = false;

function initAssistant() {
  const toggle = document.getElementById('assistantToggle');
  const panel = document.getElementById('assistantPanel');
  const closeBtn = document.getElementById('assistantClose');
  const micBtn = document.getElementById('assistantMic');
  const stopBtn = document.getElementById('assistantStop');
  const status = document.getElementById('assistantStatus');
  const transcriptEl = document.getElementById('assistantTranscript');
  const responseEl = document.getElementById('assistantResponse');

  if (!toggle || !panel) return;

  toggle.addEventListener('click', () => {
    const open = panel.hidden;
    panel.hidden = !open;
    toggle.setAttribute('aria-pressed', open ? 'true' : 'false');
  });

  closeBtn?.addEventListener('click', () => { panel.hidden = true; toggle.setAttribute('aria-pressed','false'); });

  // Setup SpeechRecognition (if available)
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;

  function setStatus(text) { if (status) status.textContent = text; }

  if (!SpeechRecognition) {
    setStatus('Speech recognition not supported in this browser.');
    micBtn.disabled = true;
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = currentLang === 'hi' ? 'hi-IN' : currentLang === 'or' ? 'or-IN' : 'en-US';
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  recognition.addEventListener('start', () => {
    assistantListening = true;
    setStatus('Listening...');
    micBtn.hidden = true;
    stopBtn.hidden = false;
  });

  recognition.addEventListener('end', () => {
    assistantListening = false;
    setStatus('Tap the mic and speak');
    micBtn.hidden = false;
    stopBtn.hidden = true;
  });

  recognition.addEventListener('error', (e) => {
    setStatus('Recognition error: ' + (e.error || e.message));
    assistantListening = false;
    micBtn.hidden = false;
    stopBtn.hidden = true;
  });

  recognition.addEventListener('result', (ev) => {
    const results = ev.results;
    let interim = '';
    let final = '';
    for (let i = 0; i < results.length; i++) {
      const r = results[i];
      if (r.isFinal) final += r[0].transcript;
      else interim += r[0].transcript;
    }
    transcriptEl.textContent = final || interim;
    if (final) {
      handleAssistantQuery(final.trim(), responseEl);
    }
  });

  micBtn.addEventListener('click', () => {
    try {
      recognition.lang = currentLang === 'hi' ? 'hi-IN' : currentLang === 'or' ? 'or-IN' : 'en-US';
      recognition.start();
    } catch (e) {
      setStatus('Could not start recognition');
    }
  });

  stopBtn.addEventListener('click', () => { try { recognition.stop(); } catch (e) {} });
}

function handleAssistantQuery(text, responseEl) {
  const t = text.toLowerCase();
  let reply = '';

  if (t.includes('ambulance') || t.includes('108') || t.includes('call ambulance')) {
    reply = 'I can call the ambulance for you. Tap confirm to call 108.';
    // Offer immediate call via prompt
    if (confirm('Call ambulance (108) now?')) {
      callNumber('108');
      reply = 'Calling ambulance now.';
    }
  } else if (t.includes('police') || t.includes('100')) {
    if (confirm('Call police (100) now?')) { callNumber('100'); reply = 'Calling police now.'; }
    else reply = 'Okay, I will wait.';
  } else if (t.includes('where') && t.includes('i')) {
    const data = getCurrentLocationLink();
    if (data) { reply = `Your location: ${data.mapsUrl}`; }
    else { reply = 'I cannot find your location yet. Please allow location access.'; }
  } else if (t.includes('blood') || t.includes('blood bank')) {
    reply = 'Opening blood banks list.';
    navigateTo('blood.html');
  } else if (t.includes('hospital') || t.includes('hospitals')) {
    reply = 'Opening nearby hospitals.';
    navigateTo('hospital.html');
  } else if (t.includes('first aid') || t.includes('first-aid') || t.includes('help me')) {
    const tip = firstAidTips[Math.floor(Math.random() * firstAidTips.length)];
    reply = `First-aid tip: ${tip}`;
  } else if (t.includes('help') || t.includes('what can you do')) {
    reply = 'I can call emergency numbers, share your location, open hospitals or blood banks, and give first-aid tips. Say "call ambulance", "where am I", or "first aid".';
  } else {
    reply = "Sorry, I didn't understand. Try 'call ambulance', 'where am I', 'first aid', or 'open hospitals'.";
  }

  if (responseEl) responseEl.textContent = reply;
  try { speakText(reply, currentLang === 'hi' ? 'hi-IN' : currentLang === 'or' ? 'or-IN' : 'en-US'); } catch (e) {}
}

document.addEventListener('DOMContentLoaded', function () {
  initAssistant();
});
