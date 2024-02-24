export default defineEventHandler(async () => {
  const repos = await cachedGitHubRepos()

  const stars = repos.reduce((acc, repo) => acc + repo.stars, 0)

  return stars
})
