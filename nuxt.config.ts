import type { NitroConfig } from 'nitropack'
import packagesRedirects from './config/packages-redirects'

export default defineNuxtConfig({
  app: {
    head: {
      templateParams: {
        separator: '·',
      },
    },
  },
  modules: [
    '@nuxtseo/module',
    '@nuxt/content',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxthq/studio',
    '@nuxtjs/plausible',
    'nuxt-payload-analyzer',
    '@nuxtjs/fontaine',
  ],
  css: [
    '~/assets/app.css',
  ],
  ui: {
    icons: ['heroicons', 'simple-icons', 'vscode-icons'],
  },
  nitro: {
    prerender: {
      failOnError: false,
      crawlLinks: true,
      routes: ['/', '/blog', '/packages', '/api/search.txt', '/rss.xml', '/rss.xml', '/blog/rss.xml', '/learn/rss.xml', '/explore/rss.xml', '/build/rss.xml', '/robots.txt', '/sitemap.xml'],
      ignore: ['/search'],
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
      // Temporary to have time to create the resources page
      '/resources': {
        redirect: {
          to: '/resources/learn',
          statusCode: 302,
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
    defaultLocale: 'en',
    url: 'https://unjs.io',
    name: 'UnJS',
    description: 'Agnostic Excellence: JavaScript Libraries, Tools, and Utilities, Crafted to Elevate Your Coding Journey.',
    identity: {
      type: 'Organization',
    },
    trailingSlash: false,
  },
  linkChecker: {
    enabled: false,
  },
  routeRules: {
    ...packagesRedirects as NitroConfig['routeRules'],
  },
  devtools: {
    enable: true,
  },
})
