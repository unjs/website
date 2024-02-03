import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import type { Author } from './author'

export interface BlogPost extends ParsedContent {
  title: string
  description: string
  cover: {
    src: string
    alt: string
  }
  authors: Author[]
  categories: string[]
  packages?: string[]
  publishedAt: string
  modifiedAt: Date
}

export type BlogPostCard = Pick<BlogPost, '_path' | 'cover' | 'title' | 'description' | 'publishedAt' | 'authors' | 'packages' | 'categories'>
