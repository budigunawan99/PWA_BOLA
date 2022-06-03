importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox)
      console.log(`Workbox berhasil dimuat`);
else
      console.log(`Workbox gagal dimuat`);

workbox.core.clientsClaim();
workbox.core.skipWaiting();

workbox.precaching.precacheAndRoute([
      { url: 'index.html', revision: '1' },
      { url: 'team.html', revision: '1' },
      { url: 'index.js', revision: '1' },
      { url: 'team.js', revision: '1' },
      { url: 'asset/img/default.svg', revision: '1' },
      { url: 'asset/img/nodata.jpg', revision: '1' },
], {
      // Ignore all URL parameters.
      ignoreURLParametersMatching: [/.*/]
}, self.__WB_MANIFEST);

workbox.routing.registerRoute(
      /\.(?:json)$/,
      new workbox.strategies.CacheFirst({
            cacheName: 'manifest',
      }),
);

workbox.routing.registerRoute(
      ({url}) => url.origin === 'https://cdnjs.cloudflare.com',
      new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'cdn-asset',
            plugins: [
                  new workbox.cacheableResponse.CacheableResponsePlugin({
                        statuses: [0, 200],
                  }),
            ],
      })
);

workbox.routing.registerRoute(
      ({url}) => url.origin === 'https://crests.football-data.org',
      new workbox.strategies.CacheFirst({
            cacheName: 'url-images',
            plugins: [
                  new workbox.cacheableResponse.CacheableResponsePlugin({
                        statuses: [0, 200],
                        maxEntries: 60,
                        maxAgeSeconds: 30 * 24 * 60 * 60,
                  }),
            ],
      }),
);


workbox.routing.registerRoute(
      ({url}) => url.origin === 'https://api.football-data.org',
      new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'api',
            plugins: [
                  new workbox.cacheableResponse.CacheableResponsePlugin({
                        statuses: [0, 200],
                  }),
            ],
      })
);

workbox.routing.registerRoute(
      /\.(?:ttf|woff2)$/,
      new workbox.strategies.CacheFirst({
            cacheName: 'long-term-asset',
            plugins: [
                  new workbox.cacheableResponse.CacheableResponsePlugin({
                        statuses: [0, 200],
                        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 tahun
                  }),
            ],
      }),
);

workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|svg|ico)$/,
      new workbox.strategies.CacheFirst({
            cacheName: 'asset-images',
            plugins: [
                  new workbox.cacheableResponse.CacheableResponsePlugin({
                        statuses: [0, 200],
                        maxEntries: 60,
                        maxAgeSeconds: 30 * 24 * 60 * 60,
                  }),
            ],
      }),
);

self.addEventListener('push', function (event) {
      let body;
      if (event.data) {
            body = event.data.text();
            console.log(body)
      } else {
            body = 'Push message no payload';
      }
      let options = {
            body: body,
            requireInteraction: true,
            icon: 'logo.png',
            badge: 'logo.png',
            vibrate: [100, 50, 100],
            data: {
                  dateOfArrival: Date.now(),
                  primaryKey: 1
            }
      };
      event.waitUntil(
            self.registration.showNotification('Premiere League', options)
      );
});