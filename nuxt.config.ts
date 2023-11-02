import type { NitroConfig } from 'nitropack'
import packagesRedirects from './config/packages-redirects'

export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: '%s · UnJS',
    },
  },
  runtimeConfig: {
    public: {
      siteUrl: 'https://unjs.io',
      inLanguage: 'en',
    },
  },
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-simple-robots',
    'nuxt-simple-sitemap',
    'nuxt-schema-org',
    '@nuxthq/studio',
    '@nuxtjs/plausible',
    // 'nuxt-payload-analyzer',
    '@nuxtjs/fontaine',
  ],
  experimental: {
    inlineSSRStyles: false, // Avoid CSS reset being applied after CSS
  },
  css: [
    '~/assets/app.css',
  ],
  ui: {
    icons: ['heroicons', 'simple-icons', 'vscode-icons'],
  },
  nitro: {
    static: true,
    prerender: {
      failOnError: false,
      crawlLinks: true,
      routes: ['/'],
    },
    routeRules: {
      '/api/github/**': {
        cache: {
          maxAge: 60 * 60 * 24 * 7, // 7 days
        },
      },
      '/api/npm/**': {
        cache: {
          maxAge: 60 * 60 * 24 * 7, // 7 days
        },
      },
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
  colorMode: {
    preference: 'light',
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
    ...packagesRedirects as NitroConfig['routeRules'],
  },
  devtools: {
    enable: true,
  },
})
