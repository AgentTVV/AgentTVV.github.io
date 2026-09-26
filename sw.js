const CACHE_NAME = 'our-corner-v1';
const urlsToCache = [
  './',
  './index.html',
  './data.json',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Открыт кэш');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Если файл есть в кэше — отдаём его, иначе загружаем из сети
        return response || fetch(event.request);
      })
  );
});