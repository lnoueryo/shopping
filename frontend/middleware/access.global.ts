import { defineNuxtRouteMiddleware } from 'nuxt/app';
import { useStore } from '@/stores';
export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const store = useStore();
    store.route = {
      from,
      to
    }
  }
});
