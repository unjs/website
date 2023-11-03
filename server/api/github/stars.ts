export default defineEventHandler(async () => {
  const { repos } = await $fetch<{ repos: { stars: number }[] }>('https://ungh.cc/orgs/unjs/repos')

  const stars = repos.reduce((acc, repo) => acc + repo.stars, 0)

  return stars
})
