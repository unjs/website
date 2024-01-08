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
