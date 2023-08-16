import type { ExplorePost } from 'types/explore'

export default defineEventHandler(async (event) => {
  const siteConfig = useSiteConfig(event)
  const rssConfig = useRssConfig()

  const files = await getMarkdownContent<ExplorePost>(event, {
    _path: { $icontains: '/explore/' }, // TODO: upadate for new navigation to /resources in the future
  })

  const rssFeed = createRssFeed({
    language: siteConfig.language,
    title: 'UnJS - Explore',
    description: 'Articles to deep-dive into the UnJS ecosystem.',
    link: `${siteConfig.url}/explore`, // TODO: upadate for new navigation to /resources in the future
    webMaster: rssConfig.webMaster,
    docs: rssConfig.docs,
    items: files.map(file => contentToRssItem(file, { site: siteConfig.url })),
  })

  return rssFeed
})
