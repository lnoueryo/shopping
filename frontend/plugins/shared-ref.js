import { ref } from 'vue';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('headerRef', ref(null));
});
