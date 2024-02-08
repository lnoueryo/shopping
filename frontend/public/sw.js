const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v1");
  await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    addResourcesToCache([
      "images/roadmaps/frontend.webp",
      "images/roadmaps/backend.webp",
      "images/roadmaps/android.webp",
      "images/roadmaps/devops.webp",
      "images/roadmaps/qa.webp",
      "images/errors/404.webp",
      "images/errors/connection-error.webp",
      "images/errors/no-image.svg",
    ]),
  );
});


const cacheFirst = async (request) => {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    console.log('from cache: ', request)
    return responseFromCache;
  }
  return fetch(request);
};

self.addEventListener("fetch", (event) => {
  console.log('Fetch');
  event.respondWith(cacheFirst(event.request));
});