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
    '@vueuse/nuxt',
    '@unocss/nuxt',
    'nuxt-simple-robots',
    'nuxt-simple-sitemap',
    'nuxt-schema-org',
    '@nuxthq/studio',
    '@nuxtjs/plausible',
  ],
  experimental: {
    inlineSSRStyles: false, // Avoid CSS reset being applied after CSS
  },
  css: [
    '~/assets/app.css',
  ],
  nitro: {
    static: true,
    prerender: {
      failOnError: false,
      crawlLinks: true,
      routes: ['/', '/api/search.txt', '/rss.xml', '/rss.xml', '/blog/rss.xml', '/learn/rss.xml', '/explore/rss.xml', '/build/rss.xml'],
    },
    routeRules: {
      '/api/github/**': {
        cache: {
          maxAge: 60 * 60 * 24 * 7, // 7 days
        },
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
    ...packagesRedirects as NitroConfig['routeRules'],
  },
  devtools: {
    enable: true,
  },
})
