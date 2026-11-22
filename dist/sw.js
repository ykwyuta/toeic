'use strict';

const cachePrefix = 'toeic-offline:' + self.registration.scope + ':';
const cacheName = cachePrefix + '1';
const index = new URL('index.html', self.registration.scope).href;

async function prepareOffline() {
  const response = await fetch(index, { cache: 'no-store' });
  if (!response.ok || !response.headers.get('Content-Type')?.includes('text/html')) {
    throw new Error('The practice page could not be downloaded.');
  }
  const cache = await caches.open(cacheName);
  await cache.put(index, response);
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
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || event.request.mode !== 'navigate' ||
      (url.origin + url.pathname !== index && url.origin + url.pathname !== self.registration.scope)) return;

  event.respondWith((async () => {
    const cached = await caches.match(index, { cacheName });
    return cached ?? fetch(event.request, { cache: 'no-store' });
  })());
});

let reset = Promise.resolve();

self.addEventListener('message', (event) => {
  const port = event.ports[0];
  if (!port) return;

  if (event.data === 'offline-status') {
    event.waitUntil(reset.then(async () => {
      port.postMessage({ ready: Boolean(await caches.match(index, { cacheName })) });
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
