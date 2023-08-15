export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: '%s · UnJS',
    },
  },
  modules: [
    '@nuxt/content',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    'nuxt-simple-robots',
    'nuxt-simple-sitemap',
    '@nuxthq/studio',
    '@nuxtjs/plausible',
  ],
  css: [
    '~/assets/app.css',
  ],
  nitro: {
    prerender: {
      failOnError: false,
      crawlLinks: true,
    },
    routeRules: {
      '/api/search': {
        prerender: true,
        headers: { 'Content-Type': 'text/plain' }, // By default, Nitro will set the content type to text/html
      },
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
    highlight: {
      theme: 'github-light',
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
