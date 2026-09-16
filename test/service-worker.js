const CACHE_NAME = 'kedai-pos-test-26.09.17.0037';
const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './database.js',
  './config/default-state.js',
  './config/supabase-config.js',
  './config/supabase-config.test.js',
  './config/env.js',
  './config/seed-pipin.js',
  './config/seed-test.js',
  './modules/ui.js',
  './modules/dialogs.js',
  './modules/sync.js',
  './manifest.json',
  './modules/icon.svg',
  './logoKTP.png'
];

/**
 * Pobiera pliki z pominięciem pamięci HTTP przeglądarki, żeby zatwierdzona
 * aktualizacja rzeczywiście zawierała świeże pliki.
 */
async function preloadAppShell() {
  const cache = await caches.open(CACHE_NAME);
  await Promise.all(APP_SHELL.map(async url => {
    try {
      const response = await fetch(url, { cache: 'reload' });
      if (response && response.ok) await cache.put(url, response);
    } catch (error) {
      // Pojedynczy plik może się nie pobrać – pozostałe nadal się zapiszą.
    }
  }));
}

self.addEventListener('install', event => {
  // WYDANIE TESTOWE: auto-aktualizacja włączona celowo. Telefon testowy ma
  // zawsze dostać najnowszy kod bez klikania; aktualizacja service workera
  // nie dotyka danych w IndexedDB.
  event.waitUntil(preloadAppShell().then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(key => key.startsWith('kedai-pos-test-') && key !== CACHE_NAME)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (url.pathname.endsWith('/version.json')) {
    event.respondWith(fetch(event.request, { cache: 'no-store' }));
    return;
  }

  // Najpierw wersja zapisana w cache. Aplikacja działa dokładnie w tej
  // wersji, dopóki użytkownik nie zatwierdzi aktualizacji.
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request)
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});
