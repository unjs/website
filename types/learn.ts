import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import type { Author } from './author'

export interface LearnArticle extends ParsedContent {
  _path: string
  title: string
  description: string
  authors: Author[]
  category: 'getting-started' | 'building-blocks'
  packages: string[]
  resources: {
    label: string
    to: string
    icon: string
  }[]
  publishedAt: string
  modifiedAt: string
}

export type LearnArticleCard = Pick<LearnArticle, '_path' | 'title' | 'description' | 'publishedAt' | 'authors' | 'packages' | 'category'>
