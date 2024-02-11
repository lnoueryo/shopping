const getImageFromCache = async (imgPath: string) => {
  if ('caches' in window) {
    const responseFromCache = await caches.match(imgPath);
    if (responseFromCache) {
      const blob = await responseFromCache.blob();
      return URL.createObjectURL(blob);
    }
  }
  return;
};

export { getImageFromCache };
