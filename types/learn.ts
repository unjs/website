import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import type { Author } from './author'

export interface LearnArticle extends ParsedContent {
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
  publishedAt: Date
  modifiedAt: Date
}

export type LearnArticleCard = Pick<LearnArticle, '_path' | 'title' | 'description' | 'publishedAt' | 'authors' | 'packages' | 'category'>
