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
      '/rss.xml': {
        prerender: true,
        headers: { 'Content-Type': 'text/xml' }, // By default, Nitro will set the content type to text/html
      },
      '/blog/rss.xml': {
        prerender: true,
        headers: { 'Content-Type': 'text/xml' }, // By default, Nitro will set the content type to text/html
      },
      '/learn/rss.xml': { // TODO: update for new navigation to /resources in the future
        prerender: true,
        headers: { 'Content-Type': 'text/xml' }, // By default, Nitro will set the content type to text/html
      },
      '/build/rss.xml': { // TODO: update for new navigation to /resources in the future
        prerender: true,
        headers: { 'Content-Type': 'text/xml' }, // By default, Nitro will set the content type to text/html
      },
      '/explore/rss.xml': { // TODO: update for new navigation to /resources in the future
        prerender: true,
        headers: { 'Content-Type': 'text/xml' }, // By default, Nitro will set the content type to text/html
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
        exclude: ['/build/**', '/explore/**', '/learn/**', '/blog/**', '/packages/**'],
      },
    },
  },
  devtools: {
    enable: true,
  },
})
