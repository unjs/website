import process from 'node:process'
import type { GithubOptions } from 'unstorage/drivers/github'
import type { FSStorageOptions } from 'unstorage/drivers/fs'

const source = process.env.NODE_ENV === 'production'
  ? {
    driver: 'github',
    repo: 'mastering-unjs/content',
    dir: 'content',
    branch: 'main',
  } satisfies GithubOptions & { driver: 'github' }
  : {
    driver: 'fs',
    base: '../content/content',
    readOnly: true,
  } satisfies FSStorageOptions & { driver: 'fs' }

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
    sources: {
      content: source,
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
})
