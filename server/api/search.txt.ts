import MiniSearch from 'minisearch'
import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const files = await serverQueryContent(event).find()

  const sections = (await Promise.all(
    files
      .filter(file => file._extension === 'md' && !file?._draft && !file?.empty && !file?._partial)
      .map(page => splitPageIntoSections(page)),
  ))
    .flat()

  const miniSearch = new MiniSearch({
    fields: ['title', 'titles', 'text'],
    storeFields: ['title', 'titles', 'text', 'level'],
    searchOptions: {
      prefix: true,
      fuzzy: 0.2,
      boost: {
        title: 4,
        text: 2,
        titles: 1,
      },
    },
  })

  // Index the documents
  miniSearch.addAll(sections)

  // Send the index to the client
  return JSON.stringify(miniSearch)
})
