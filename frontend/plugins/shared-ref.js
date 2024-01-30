import { ref } from 'vue';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('headerRef', ref(null));
  nuxtApp.provide('navRef', ref(null));
  nuxtApp.provide('mainRef', ref(null));
  nuxtApp.provide('footerRef', ref(null));
});
