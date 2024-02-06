const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v1");
  await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    addResourcesToCache([
      "images/roadmaps/frontend.svg",
      "images/roadmaps/backend.svg",
      "images/roadmaps/android.svg",
      "images/roadmaps/devops.svg",
      "images/roadmaps/qa.svg",
      "images/errors/404.svg",
      "images/errors/connection-error.svg",
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