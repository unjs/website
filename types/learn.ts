import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

export interface LearnPost extends ParsedContent {
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
    email?: string
  }[]
  packages: string[]
  publishedAt: Date
  modifiedAt: Date
  layout: 'learn-post'
}
