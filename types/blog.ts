import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

export interface BlogPost extends ParsedContent {
  title: string
  description: string
  cover: {
    src: string
    alt: string
  }
  authors: {
    name: string
    picture: string
    twitter: string
  }[]
  categories: string[]
  packages: string[]
  publishedAt: Date
  modifiedAt: Date
}

export type BlogPostCard = Pick<BlogPost, '_path' | 'cover' | 'title' | 'description' | 'publishedAt' | 'authors'>
