const CACHE_NAME = "sahaya-cache-v1";
const urlsToCache = [
  "/index.html",
  "/blood.html",
  "/hospital.html",
  "/emergency.html",
  "/style.css",
  "/script.js"
];

// Install Service Worker and cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch cached files if offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
/* ---------- GOVERNMENT SCHEMES DATA ---------- */
const schemes = [
  {
    name: "Ayushman Bharat Yojana",
    eligibility: "Families with PMJAY card",
    documents: "Aadhaar, Ration Card",
    benefit: "Free treatment up to ₹5 lakh",
    contact: "14555"
  },
  {
    name: "Janani Suraksha Yojana",
    eligibility: "Pregnant women (BPL)",
    documents: "Aadhaar, Bank Passbook",
    benefit: "Cash assistance for safe delivery",
    contact: "108"
  },
  {
    name: "National Health Mission (NHM)",
    eligibility: "All citizens",
    documents: "ID Proof",
    benefit: "Free health services",
    contact: "104"
  }
];

/* ---------- SHOW SCHEMES ---------- */
function showSchemes() {
  const container = document.getElementById("schemeList");
  if (!container) return;

  container.innerHTML = "";

  schemes.forEach(s => {
    container.innerHTML += `
      <div class="card">
        <h3>${s.name}</h3>
        <p><b>Eligibility:</b> ${s.eligibility}</p>
        <p><b>Documents:</b> ${s.documents}</p>
        <p><b>Benefits:</b> ${s.benefit}</p>
        <button onclick="callNumber('${s.contact}')">
          📞 Contact
        </button>
      </div>
    `;
  });
}

/* ---------- LOAD SCHEMES ---------- */
document.addEventListener("DOMContentLoaded", () => {
  showSchemes();
});
translations.schemes = {
  en: {
    heading: "🏛️ Government Schemes",
    voice: "Here you can find important government health and welfare schemes."
  },
  hi: {
    heading: "🏛️ सरकारी योजनाएँ",
    voice: "यहाँ आप महत्वपूर्ण सरकारी स्वास्थ्य और कल्याण योजनाएँ देख सकते हैं।"
  },
  or: {
    heading: "🏛️ ସରକାରୀ ଯୋଜନା",
    voice: "ଏଠାରେ ଆପଣ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ସରକାରୀ ସ୍ୱାସ୍ଥ୍ୟ ଏବଂ କଳ୍ୟାଣ ଯୋଜନା ଦେଖିପାରିବେ।"
  }
};