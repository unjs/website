import type { ParsedContent, QueryBuilderWhere } from '@nuxt/content/dist/runtime/types'
import type { H3Event } from 'h3'
import type { RssChannel, RssContent, RssItem } from '~/types/rss'
import { serverQueryContent } from '#content/server'

export function useRssConfig() {
  const appConfig = useAppConfig()

  return appConfig.website.rss
}

/**
 * Used to retrieve the markdown content.
 */
export async function getMarkdownContent<T extends ParsedContent>(event: H3Event, query: QueryBuilderWhere): Promise<T[]> {
  const files = await serverQueryContent<T>(event).where(query).sort({ publishedAt: -1 }).find()

  const filteredFiles = await Promise.all(
    files
      .filter(file =>
        file._extension === 'md'
          && !file?._draft
          && !file?.empty
          && !file?._partial),
  )

  return filteredFiles
}

export function contentToRssItem<T extends RssContent>(content: T, options: { site: string; default: { email: string } }): RssItem {
  return {
    title: content.title ?? '',
    link: `${options.site}${content._path}`,
    description: content.description,
    pubDate: new Date(content.publishedAt).toUTCString(),
    guid: `${options.site}${content._path}`,
    authors: (content.authors).map((author) => {
      return {
        name: author.name,
        email: author.email ?? options.default.email,
      }
    }),
    categories: content.categories,
  }
}

/**
 * Creates an RSS feed.
 *
 * @param channel The RSS channel.
 * @returns The RSS feed.
 *
 * @see https://validator.w3.org/feed/docs/rss2.html
 */
export function createRssFeed(channel: RssChannel): string {
  const rssChannel: string = createRssChannel(channel)

  return /* xml */`<rss version="2.0">${rssChannel}</rss>`
}

/**
 * Creates an RSS channel. Only one channel per RSS feed.
 *
 * @param channel The RSS channel.
 * @returns The RSS channel.
 */
function createRssChannel(channel: RssChannel): string {
  const metadata: string = createRssChannelMetadata(channel)
  const items: string = createRssChannelItems(channel.items)

  return /* xml */`<channel>${metadata}${items}</channel>`
}

/**
 * Creates an RSS channel metadata.
 *
 * @param channel The RSS channel.
 * @returns The RSS channel metadata.
 */
function createRssChannelMetadata(channel: RssChannel): string {
  const language = /* xml */`<language>${channel.language}</language>`
  const title = /* xml */`<title>${channel.title}</title>`
  const description = /* xml */`<description>${channel.description}</description>`
  const link = /* xml */`<link>${channel.link}</link>`
  const lastBuildDate = /* xml */`<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`
  const webMaster = /* xml */`<webMaster>${buildRssEmail(channel.webMaster)}</webMaster>`
  const docs = /* xml */`<docs>${channel.docs}</docs>`

  return [
    language,
    title,
    description,
    link,
    lastBuildDate,
    webMaster,
    docs,
  ].join('')
}

/**
 * Creates an RSS channel items.
 *
 * @param channelItems The RSS channel items.
 * @returns The RSS channel items.
 */
function createRssChannelItems(channelItems: RssItem[]): string {
  return channelItems.map((item) => {
    return createRssChannelItem(item)
  }).join('')
}

/**
 * Creates an RSS channel item.
 *
 * @param item The RSS channel item.
 * @returns The RSS channel item.
 */
function createRssChannelItem(item: RssItem): string {
  const title = /* xml */`<title><![CDATA[${item.title}]]></title>`
  const link = /* xml */`<link>${item.link}</link>`
  const description = /* xml */`<description><![CDATA[${item.description}]]></description>`
  const pubDate = /* xml */`<pubDate>${item.pubDate}</pubDate>`
  const guid = /* xml */`<guid>${item.guid}</guid>`

  const categories = item.categories
    ? item.categories.map((category) => {
      return /* xml */`
      <category>${category}</category>
    `
    }).join('')
    : false

  const authors = item.authors
    /* xml */? `<author> ${item.authors.map(author => buildRssEmail(author)).join(', ')} </author>`
    : false

  // XML is build in that way to have a minified output
  return /* xml */`<item>${[
    title,
    link,
    description,
    pubDate,
    guid,
    categories,
    authors,
  ].filter(Boolean).join('')}</item>`
}

/**
 * Build email field content for RSS feed.
 *
 * @see https://www.rssboard.org/rss-profile#data-types-email
 */
function buildRssEmail(email: { name: string; email: string }): string {
  return `${email.email} (${email.name})`
}
