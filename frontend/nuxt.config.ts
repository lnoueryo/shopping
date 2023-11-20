// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      bodyAttrs: {
        id: 'body',
      },
    },
  },
  devtools: { enabled: true },
  css: ['normalize.css/normalize.css', '/assets/css/main.css'],
  plugins: [],
});
