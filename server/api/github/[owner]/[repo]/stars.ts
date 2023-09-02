export default defineCachedEventHandler(async (event) => {
  const owner = getRouterParam(event, 'owner')
  const repo = getRouterParam(event, 'repo')

  const stars = await $fetch(`https://ungh.cc/stars/${owner}/${repo}`)

  return stars.totalStars
}, { maxAge: 24 * 60 * 60 * 1000 })
