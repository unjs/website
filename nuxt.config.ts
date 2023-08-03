export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: '%s · UnJS',
    },
  },
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
        exclude: ['/build/**', '/explore/**', '/blog/**'],
      },
      build: {
        include: ['/build/**'],
        exclude: ['/explore/**', '/learn/**', '/blog/**'],
      },
      explore: {
        include: ['/explore/**'],
        exclude: ['/build/**', '/learn/**', '/blog/**'],
      },
      blog: {
        include: ['/blog/**'],
        exclude: ['/build/**', '/explore/**', '/learn/**'],
      },
      pages: {
        exclude: ['/build/**', '/explore/**', '/learn/**', '/blog/**'],
      },
    },
  },
  devtools: {
    enable: true,
  },
})
