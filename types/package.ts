import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

export interface Package extends Record<string, unknown> {
  id: string
  title: string
  description: string
  path: string
  url: string
  stars: number
  monthlyDownloads: number | null
  contributors: number | null
  npm?: {
    name: string
    dependencies: string[]
    devDependencies: string[]
  }
  logoPath: string
  logoUrl: string
}

export interface PackageContent extends ParsedContent {
  title: string
  description: string
  _path: string
  github: {
    owner: string
    repo: string
  }
  npm?: {
    name: string
  }
  documentation: string
}

export type RelationPackageSource = 'npm' | 'unjs'
export interface RelationPackage {
  name: string
  npmName: string
  description?: string
  dependencies: string[]
  devDependencies: string[]
  source: RelationPackageSource
}
