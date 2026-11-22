'use strict';

importScripts('./study/r1/bank.js');

const cachePrefix = 'toeic-offline:' + self.registration.scope + ':';
const cacheName = cachePrefix + '20';
const index = new URL('index.html', self.registration.scope).href;

const studyMedia = self.toeicStudyBank.parts.flatMap(({sets}) => sets.flatMap(({media}) =>
  [media.photo?.src, media.audio?.src].filter(Boolean)));
const assets = [
  'adaptive.js', 'app-v11.js', 'manifest.webmanifest', 'icon-180.png', 'icon-192.png', 'icon-512.png', 'study-coaches.webp',
  'study/r1/bank.js', 'study/study.js', ...studyMedia,
]
  .map((path) => new URL(path, self.registration.scope).href);
const offlineFiles = [index, ...assets];

async function audioRange(cached, range) {
  const blob = await cached.blob();
  const bounds = /^bytes=(\d*)-(\d*)$/.exec(range);
  const [, first, last] = bounds ?? [];
  const start = first ? Number(first) : Math.max(blob.size - Number(last), 0);
  const end = first && last ? Math.min(Number(last), blob.size - 1) : blob.size - 1;
  if (!bounds || (!first && !last) || start >= blob.size || start > end) {
    return new Response(null, {status: 416, headers: {'Content-Range': 'bytes */' + blob.size}});
  }
  return new Response(blob.slice(start, end + 1), {
    status: 206,
    headers: {
      'Accept-Ranges': 'bytes',
      'Content-Range': `bytes ${start}-${end}/${blob.size}`,
      'Content-Length': String(end - start + 1),
      'Content-Type': cached.headers.get('Content-Type') ?? 'audio/mpeg',
    },
  });
}

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
    if (!isHome) {
      const cached = await caches.match(path, { cacheName });
      const range = event.request.headers.get('Range');
      if (cached && range && url.pathname.endsWith('.mp3')) return audioRange(cached, range);
      return cached ?? fetch(event.request, { cache: 'no-store' });
    }

    try {
      const response = await fetch(event.request, { cache: 'no-store' });
      if (response.ok) return response;
      const cached = await caches.match(index, { cacheName });
      return cached ?? response;
    } catch (error) {
      const cached = await caches.match(index, { cacheName });
      if (cached) return cached;
      throw error;
    }
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
