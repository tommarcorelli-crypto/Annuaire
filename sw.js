/* MANPAGES.EXE — sw.js
   Cache offline-first : tous les fichiers du site sont mis en cache
   au premier chargement, puis servis depuis le cache. */

const CACHE_NAME = 'manpages-exe-v2';

const CORE_ASSETS = [
  './',
  './index.html',
  './commands.html',
  './style.css',
  './commands.css',
  './data.js',
  './commands.js',
  './arcade-fun.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

// Logos externes (best-effort : si offline au 1er chargement, ils ne seront pas cachés)
const EXTERNAL_ASSETS = [
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/debian.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/alpinelinux.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/archlinux.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/redhat.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/freebsd.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/apple.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/docker.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/ansible.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/git.svg',
  'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/kubernetes.svg',
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&family=VT323&family=Honk&family=Noto+Sans+JP:wght@500;700&family=Inter:wght@400;500;600&display=swap',
];

// ── INSTALL : pré-cache tout ────────────────────────────────
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CORE_ASSETS).then(function() {
        // Les assets externes sont mis en cache "best effort" :
        // un échec ici ne doit pas faire échouer l'installation du SW.
        return Promise.all(
          EXTERNAL_ASSETS.map(function(url) {
            return cache.add(url).catch(function() {
              // Ignoré : si offline ou CDN indisponible, on continue sans planter.
            });
          })
        );
      });
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

// ── ACTIVATE : nettoie les anciens caches ───────────────────
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) { return key !== CACHE_NAME; })
            .map(function(key) { return caches.delete(key); })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// ── FETCH : cache-first, fallback réseau, puis fallback cache offline ──
self.addEventListener('fetch', function(event) {
  // On ne gère que les requêtes GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(function(cached) {
      if (cached) return cached;

      return fetch(event.request).then(function(response) {
        // Met en cache la nouvelle ressource pour la prochaine fois (si valide)
        if (response && response.status === 200) {
          var responseClone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      }).catch(function() {
        // Hors-ligne et pas en cache : pour une navigation HTML,
        // on retombe sur la page d'accueil mise en cache.
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
