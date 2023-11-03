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
      routes: ['/', '/blog', '/packages', '/api/search.txt', '/rss.xml', '/rss.xml', '/blog/rss.xml', '/learn/rss.xml', '/explore/rss.xml', '/build/rss.xml'],
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
      '/blog/2023-08-25-nitro-2.6': {
        redirect: {
          statusCode: 301,
          to: '/blog/2023-08-25-nitro-2-6',
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
