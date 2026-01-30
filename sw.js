const CACHE_NAME = "sahaya-cache-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/blood.html",
  "/hospital.html",
  "/emergency.html",
  "/style.css",
  "/script.js",
  "/manifest.json"
];

// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});