import type { LearnPost } from 'types/learn'

export default defineEventHandler(async (event) => {
  const rssConfig = useRssConfig()

  const files = await getMarkdownContent<LearnPost>(event, {
    _path: { $icontains: '/learn/' }, // TODO: upadate for new navigation to /resources in the future
  })

  const rssFeed = createRssFeed({
    language: rssConfig.language,
    title: 'UnJS - Learn',
    description: 'Articles to get started with the UnJS ecosystem.',
    link: 'https://unjs.io/learn', // TODO: upadate for new navigation to /resources in the future
    webMaster: rssConfig.webMaster,
    docs: rssConfig.docs,
    items: files.map(file => contentToRssItem(file, { site: rssConfig.site })),
  })

  return rssFeed
})
