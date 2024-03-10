import type { BlogPost } from './blog'
import type { LearnArticle } from './learn'

export type RssContent = BlogPost | LearnArticle

export interface RssChannel {
  language: string
  title: string
  description: string
  link: string
  webMaster: {
    name: string
    email: string
  }
  docs: string
  // TODO: Create the OG image
  // image?: {
  //   url: string
  //   title: string
  //   link: string
  // }
  items: RssItem[]
}

export interface RssItem {
  title: string
  link: string
  description: string
  pubDate: string
  guid: string
  categories?: string[]
  authors: {
    name: string
    email: string
  }[]
}
