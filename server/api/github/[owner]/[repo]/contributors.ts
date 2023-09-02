export default defineCachedEventHandler(async (event) => {
  const owner = getRouterParam(event, 'owner')
  const repo = getRouterParam(event, 'repo')

  const contributors = await $fetch(`https://ungh.cc/repos/${owner}/${repo}/contributors`)

  return contributors.contributors.length
}, { maxAge: 24 * 60 * 60 * 1000 })
