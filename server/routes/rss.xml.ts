import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const files = await serverQueryContent(event)
    .where({ _extension: 'md', _draft: false, empty: false, _partial: false })
    .find()

  return files
})
