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
  site: {
    language: 'en',
    url: 'https://unjs.io',
    name: 'UnJS',
    description: 'Agnostic Excellence: JavaScript Libraries, Tools, and Utilities, Crafted to Elevate Your Coding Journey.',
  },
  sitemap: {
    sitemaps: {
      learn: {
        include: ['/learn/**'],
      },
      build: {
        include: ['/build/**'],
      },
      explore: {
        include: ['/explore/**'],
      },
      blog: {
        include: ['/blog/**'],
      },
      packages: {
        include: ['/packages/**'],
      },
      pages: {
        exclude: ['/build/**', '/explore/**', '/learn/**', '/blog/**', '/packages/**', '/_footer-license', '_no-articles'],
      },
    },
  },
  devtools: {
    enable: true,
  },
})
