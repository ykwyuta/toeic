'use strict';

const cachePrefix = 'toeic-offline:' + self.registration.scope + ':';
const cacheName = cachePrefix + '5';
const index = new URL('index.html', self.registration.scope).href;

const assets = ['manifest.webmanifest', 'icon-180.png', 'icon-192.png', 'icon-512.png', 'study-coaches.webp']
  .map((path) => new URL(path, self.registration.scope).href);
const offlineFiles = [index, ...assets];

async function prepareOffline() {
  const cache = await caches.open(cacheName);
  await cache.addAll(offlineFiles.map((url) => new Request(url, { cache: 'no-store' })));
}

self.addEventListener('install', (event) => {
  event.waitUntil(prepareOffline().then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith(cachePrefix) && key !== cacheName)
      .map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  const path = url.origin + url.pathname;
  const isHome = event.request.mode === 'navigate' &&
    (path === index || path === self.registration.scope);
  if (!isHome && !assets.includes(path)) return;

  event.respondWith((async () => {
    const cached = await caches.match(isHome ? index : path, { cacheName });
    return cached ?? fetch(event.request, { cache: 'no-store' });
  })());
});

let reset = Promise.resolve();

self.addEventListener('message', (event) => {
  const port = event.ports[0];
  if (!port) return;

  if (event.data === 'offline-status') {
    event.waitUntil(reset.then(async () => {
      const cached = await Promise.all(offlineFiles.map((url) => caches.match(url, { cacheName })));
      port.postMessage({ ready: cached.every(Boolean) });
    }).catch(() => port.postMessage({ ready: false })));
  }

  if (event.data === 'offline-reset') {
    reset = reset.then(async () => {
      try {
        await caches.delete(cacheName);
      } catch {
        port.postMessage({ ready: false, deleted: false });
        return;
      }
      try {
        await prepareOffline();
        port.postMessage({ ready: true, deleted: true });
      } catch {
        port.postMessage({ ready: false, deleted: true });
      }
    });
    event.waitUntil(reset);
  }
});
