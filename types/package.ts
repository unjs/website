import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

export interface Package extends ParsedContent {
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
  layout: 'package'
}

export type PackageCard = Pick<Package, '_path' | 'title' | 'logo' | 'icon' | 'description' | 'documentation' | 'github'>
