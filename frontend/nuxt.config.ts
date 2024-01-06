// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'WebTech Bookstore {}: Online Bookstore for Engineers',
      meta: [
        {
          name: 'description',
          content: 'WebTech Bookstore {} is an online bookstore that offers everything from the latest technical books to classic reference materials for engineers. It boasts a rich collection related to programming, web development, software engineering, and data science.'
        },
        {
          name: 'keywords',
          content: 'engineer, technical books, programming, web development, software engineering, data science, online bookstore'
        },
        {
          name: 'author',
          content: 'lnoueryo'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0'
        },
        {
          name: 'robots',
          content: 'index, follow'
        },
        {
          property: 'og:title',
          content: 'WebTech Bookstore {}: Online Bookstore for Engineers'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:url',
          content: '/'
        },
        {
          property: 'og:image',
          content: '@/assets/images/sub-logo.svg'
        },
        {
          property: 'og:site_name',
          content: 'WebTech Bookstore {}'
        },
        {
          property: 'og:description',
          content: 'WebTech Bookstore {} is an online bookstore that offers everything from the latest technical books to classic reference materials for engineers. It boasts a rich collection related to programming, web development, software engineering, and data science.'
        },
      ],
      bodyAttrs: {
        id: 'body',
      },
    },
  },
  devtools: { enabled: false },
  css: ['normalize.css/normalize.css', '/assets/css/main.css'],
  plugins: ['~/plugins/shared-ref.js'],
});
