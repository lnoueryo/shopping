// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      bodyAttrs: {
        id: 'body',
      },
    },
  },
  devtools: { enabled: false },
  css: ['normalize.css/normalize.css', '/assets/css/main.css'],
  plugins: ['~/plugins/shared-ref.js'],
});
