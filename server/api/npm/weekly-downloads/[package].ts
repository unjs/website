export default defineCachedEventHandler(async (event) => {
  const packageName = getRouterParam(event, 'package')

  const weeklyDownloads = await $fetch(`https://api.npmjs.org/downloads/point/last-week/${packageName}`)

  return weeklyDownloads.downloads
}, { maxAge: 24 * 60 * 60 * 1000 })
