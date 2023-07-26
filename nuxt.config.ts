import process from 'node:process'
import type { GithubOptions } from 'unstorage/drivers/github'
import type { FSStorageOptions } from 'unstorage/drivers/fs'

const source = process.env.NODE_ENV === 'production'
  ? {
    driver: 'github',
    repo: 'mastering-unjs/content',
    branch: 'main',
  } satisfies GithubOptions & { driver: 'github' }
  : {
    driver: 'fs',
    base: '../content',
    readOnly: true,
  } satisfies FSStorageOptions & { driver: 'fs' }

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@unocss/nuxt',
  ],
  css: [
    '~/assets/app.css',
  ],
  unocss: {
    preflight: true,
  },
  content: {
    documentDriven: true,
    sources: {
      content: source,
    },
  },
})
