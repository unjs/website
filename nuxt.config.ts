export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@unocss/nuxt',
    'nuxt-simple-robots',
    'nuxt-simple-sitemap',
  ],
  css: [
    '~/assets/app.css',
  ],
  nitro: {
    prerender: {
      failOnError: false,
    },
  },
  content: {
    documentDriven: {
      navigation: false,
      surround: false,
    },
    navigation: {
      fields: ['icon'],
    },
  },
  unocss: {
    preflight: true,
  },
  sitemap: {
    sitemaps: {
      learn: {
        include: ['/learn/**'],
        exclude: ['/build/**', '/explore/**'],
      },
      build: {
        include: ['/build/**'],
        exclude: ['/explore/**', '/learn/**'],
      },
      explore: {
        include: ['/explore/**'],
        exclude: ['/build/**', '/learn/**'],
      },
      pages: {
        exclude: ['/build/**', '/explore/**', '/learn/**'],
      },
    },
  },
  devtools: {
    enable: true,
  },
})
