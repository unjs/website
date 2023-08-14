import type { BlogPost } from 'types/blog'

export default defineEventHandler(async (event) => {
  const rssConfig = useRssConfig()

  const files = await getMarkdownContent<BlogPost>(event, {
    _path: { $icontains: '/blog/' },
  })

  const rssFeed = createRssFeed({
    language: rssConfig.language,
    title: 'UnJS - Blog',
    description: 'Blog posts from the UnJS blog.',
    link: 'https://unjs.io/blog',
    webMaster: rssConfig.webMaster,
    docs: rssConfig.docs,
    items: files.map(file => contentToRssItem(file, { site: rssConfig.site })),
  })

  return rssFeed
})
