export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')

  if (!name) {
    throw createError({
      status: 400,
      message: 'Missing name',
    })
  }

  return await fetchMonthlyDownloads(name)
})
