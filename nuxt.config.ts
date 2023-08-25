export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: '%s · UnJS',
    },
  },
  runtimeConfig: {
    public: {
      siteUrl: 'https://unjs.io',
    },
  },
  modules: [
    '@nuxt/content',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    'nuxt-simple-robots',
    'nuxt-simple-sitemap',
    'nuxt-schema-org',
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
      '/api/search.txt': {
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
  routeRules: {
    '/bundle-runner': { redirect: { to: '/packages/bundle-runner', statusCode: 301 } },
    '/c12': { redirect: { to: '/packages/c12', statusCode: 301 } },
    '/changelogen': { redirect: { to: '/packages/changelogen', statusCode: 301 } },
    '/citty': { redirect: { to: '/packages/citty', statusCode: 301 } },
    '/consola': { redirect: { to: '/packages/consola', statusCode: 301 } },
    '/cookie-es': { redirect: { to: '/packages/cookie-es', statusCode: 301 } },
    '/defu': { redirect: { to: '/packages/defu', statusCode: 301 } },
    '/destr': { redirect: { to: '/packages/destr', statusCode: 301 } },
    '/fs-memo': { redirect: { to: '/packages/fs-memo', statusCode: 301 } },
    '/get-port-please': { redirect: { to: '/packages/get-port-please', statusCode: 301 } },
    '/giget': { redirect: { to: '/packages/giget', statusCode: 301 } },
    '/h3': { redirect: { to: '/packages/h3', statusCode: 301 } },
    '/hookable': { redirect: { to: '/packages/hookable', statusCode: 301 } },
    '/ipx': { redirect: { to: '/packages/ipx', statusCode: 301 } },
    '/jimp-compact': { redirect: { to: '/packages/jimp-compact', statusCode: 301 } },
    '/jiti': { redirect: { to: '/packages/jiti', statusCode: 301 } },
    '/knitwork': { redirect: { to: '/packages/knitwork', statusCode: 301 } },
    '/listhen': { redirect: { to: '/packages/listhen', statusCode: 301 } },
    '/magicast': { redirect: { to: '/packages/magicast', statusCode: 301 } },
    '/mkdist': { redirect: { to: '/packages/mkdist', statusCode: 301 } },
    '/mlly': { redirect: { to: '/packages/mlly', statusCode: 301 } },
    '/mongoz': { redirect: { to: '/packages/mongoz', statusCode: 301 } },
    '/nitro': { redirect: { to: '/packages/nitro', statusCode: 301 } },
    '/node-fetch-native': { redirect: { to: '/packages/node-fetch-native', statusCode: 301 } },
    '/nypm': { redirect: { to: '/packages/nypm', statusCode: 301 } },
    '/ofetch': { redirect: { to: '/packages/ofetch', statusCode: 301 } },
    '/ohash': { redirect: { to: '/packages/ohash', statusCode: 301 } },
    '/pathe': { redirect: { to: '/packages/pathe', statusCode: 301 } },
    '/perfect-debounce': { redirect: { to: '/packages/perfect-debounce', statusCode: 301 } },
    '/pkg-types': { redirect: { to: '/packages/pkg-types', statusCode: 301 } },
    '/radix3': { redirect: { to: '/packages/radix3', statusCode: 301 } },
    '/rc9': { redirect: { to: '/packages/rc9', statusCode: 301 } },
    '/scule': { redirect: { to: '/packages/scule', statusCode: 301 } },
    '/serve-placeholder': { redirect: { to: '/packages/serve-placeholder', statusCode: 301 } },
    '/std-env': { redirect: { to: '/packages/std-env', statusCode: 301 } },
    '/theme-colors': { redirect: { to: '/packages/theme-colors', statusCode: 301 } },
    '/ufo': { redirect: { to: '/packages/ufo', statusCode: 301 } },
    '/unbuild': { redirect: { to: '/packages/unbuild', statusCode: 301 } },
    '/uncrypto': { redirect: { to: '/packages/uncrypto', statusCode: 301 } },
    '/unctx': { redirect: { to: '/packages/unctx', statusCode: 301 } },
    '/unenv': { redirect: { to: '/packages/unenv', statusCode: 301 } },
    '/ungh': { redirect: { to: '/packages/ungh', statusCode: 301 } },
    '/unhead': { redirect: { to: '/packages/unhead', statusCode: 301 } },
    '/unimport': { redirect: { to: '/packages/unimport', statusCode: 301 } },
    '/unplugin': { redirect: { to: '/packages/unplugin', statusCode: 301 } },
    '/unstorage': { redirect: { to: '/packages/unstorage', statusCode: 301 } },
    '/untun': { redirect: { to: '/packages/untun', statusCode: 301 } },
    '/untyped': { redirect: { to: '/packages/untyped', statusCode: 301 } },
    '/uqr': { redirect: { to: '/packages/uqr', statusCode: 301 } },
  },
  devtools: {
    enable: true,
  },
})
