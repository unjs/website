import type { BuildPost } from 'types/build'

export default defineEventHandler(async (event) => {
  const rssConfig = useRssConfig()

  const files = await getMarkdownContent<BuildPost>(event, {
    _path: { $icontains: '/build/' }, // TODO: upadate for new navigation to /resources in the future
  })

  const rssFeed = createRssFeed({
    language: rssConfig.language,
    title: 'UnJS - Build',
    description: 'Articles to build real world projects with the UnJS ecosystem.',
    link: 'https://unjs.io/build', // TODO: upadate for new navigation to /resources in the future
    webMaster: rssConfig.webMaster,
    docs: rssConfig.docs,
    items: files.map(file => contentToRssItem(file, { site: rssConfig.site })),
  })

  return rssFeed
})
