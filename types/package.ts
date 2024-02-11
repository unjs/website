import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

export interface Package extends Record<string, string | number | undefined> {
  title: string
  description: string
  path: string
  url: string
  stars: number
  monthlyDownloads: number
  contributors: number
  npm?: string
}

export interface PackageContent extends ParsedContent {
  title: string
  description: string
  icon?: string
  logo?: string
  github: {
    owner: string
    repo: string
  }
  npm: {
    name: string
  }
  documentation: string
}
