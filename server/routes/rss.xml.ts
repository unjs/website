import type { RssContent } from '~/types/rss'

export default defineEventHandler(async (event) => {
  const siteConfig = useSiteConfig(event)
  const rssConfig = useRssConfig()

  const files = await getMarkdownContent<RssContent>(event, {
    _path: {
      $or: [
        {
          $icontains: '/blog/',
        },
        // TODO: upadate for new navigation to /resources in the future
        {
          $icontains: '/learn/',
        },
        {
          $icontains: '/build/',
        },
        {
          $icontains: '/explore/',
        },
      ],
    },
  })

  const rssFeed = createRssFeed({
    language: siteConfig.language,
    title: 'UnJS - All Content',
    description: 'All the content from UnJS: blog posts and articles to learn, build and explore the UnJS ecosystem.',
    link: siteConfig.url,
    webMaster: rssConfig.webMaster,
    docs: rssConfig.docs,
    items: files.map(file => contentToRssItem(file, { site: siteConfig.url, default: { email: rssConfig.webMaster.email } })),
  })

  setResponseHeader(event, 'Content-Type', 'application/rss+xml')
  return rssFeed
})
