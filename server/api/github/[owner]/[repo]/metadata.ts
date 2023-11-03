export default defineEventHandler(async (event) => {
  const owner = getRouterParam(event, 'owner')
  const repo = getRouterParam(event, 'repo')

  if (!owner || !repo) {
    throw createError({
      status: 400,
      message: 'Missing owner or repo',
    })
  }

  const [stars, latestRelease] = await Promise.all([
    fetchStars(owner, repo),
    fetchLatestRelease(owner, repo),
  ])

  return {
    stars,
    latestRelease,
  }
})
