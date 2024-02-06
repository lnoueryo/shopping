import { defineNuxtPlugin } from '#app';
export default defineNuxtPlugin(async () => {
  const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      console.log('register');
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        if (registration.installing) {
          console.log('Service worker installing');
        } else if (registration.waiting) {
          console.log('Service worker installed');
        } else if (registration.active) {
          console.log('Service worker active');
        }
      } catch (error) {
        console.error(`Registration failed with ${error}`);
      }
    }
  };
  if (process.client) {
    await registerServiceWorker();
  }
});
