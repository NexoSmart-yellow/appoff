// const CACHE_NAME = 'cachemec-v1';

// const files = [  

// ];

// self.addEventListener('install', event => {

//   event.waitUntil(
//     caches.open(CACHE_NAME)
//     .then(cache => {
//       return cache.addAll(files);
//     })
//     .catch(err => err)
//   );
        
// });

// self.addEventListener('activate', event => {
//   event.waitUntil(
//     caches.keys()
//     .then(cacheNames => Promise.all(
//       cacheNames.filter(cacheName => {
//         return cacheName !== currentCache
//       }).map(cacheName => caches.delete(cacheName))
//     ))
//     .catch(err => err)
//   );
// });

// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request)
//     .then(function(resp) {
//       return resp || fetch(event.request)
//       .then(function(response) {
//         return caches.open(CACHE_NAME)
//         .then(function(cache) {
//           cache.put(event.request, response.clone());
//           return response;
//         }); 
//       });
//     })
//     .catch(err => err)
//   );
// });
        