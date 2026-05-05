const CACHE_NAME = 'batotinha-clean-slate';

// 1. Install: Just skip waiting to take control immediately
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

// 2. Activate: Wipe EVERY cache found on this origin
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          console.log('System Purge: Deleting cache', key);
          return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch: Essential for PWA "Installable" status
// We respond with the network request directly and cache NOTHING.
self.addEventListener('fetch', (e) => {
  // Browser requires this handler to exists for PWA status
  e.respondWith(fetch(e.request));
});
