const CACHE_NAME = 'cuadrillas-cache-v1';
const ASSETS = [
  'index.html',
  'manifest.json'
];

// Instalar el Service Worker y cachear la app base
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// Hacer que funcione Offline sirviendo lo guardado
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});