import type { BlogPost } from '../../../types/blog'

export default defineEventHandler(async (event) => {
  const siteConfig = useSiteConfig(event)
  const rssConfig = useRssConfig()

  const files = await getMarkdownContent<BlogPost>(event, {
    _path: { $icontains: '/blog/' },
  })

  const rssFeed = createRssFeed({
    language: siteConfig.language,
    title: 'UnJS - Blog',
    description: 'Blog posts from the UnJS blog.',
    link: `${siteConfig.url}/blog`,
    webMaster: rssConfig.webMaster,
    docs: rssConfig.docs,
    items: files.map(file => contentToRssItem(file, { site: siteConfig.url, default: { email: rssConfig.webMaster.email } })),
  })

  setResponseHeader(event, 'Content-Type', 'application/rss+xml')
  return rssFeed
})
