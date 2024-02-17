import { defineNuxtRouteMiddleware } from 'nuxt/app';
import { useStore } from '@/stores';
export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server && to.path === '/error') {
    if ('next' in to.query) return navigateTo(to.query.next);
    return navigateTo('/');
  }
  if (process.client) {
    if (to.fullPath === from.fullPath) {
      from = null;
    }
    const store = useStore();
    store.route = {
      from,
      to,
    };
  }
});
