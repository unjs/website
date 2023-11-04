export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')

  if (!name) {
    throw createError({
      status: 400,
      message: 'Missing name',
    })
  }

  const monthlyDownloads = await fetchMonthlyDownloads(name)

  return monthlyDownloads
})

async function fetchMonthlyDownloads(name: string): Promise<number> {
  const downloads = await $fetch<{ downloads: number }>(`https://api.npmjs.org/downloads/point/last-month/${name}`)

  return downloads.downloads
}
