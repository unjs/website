/**
 * Get repository metadata from GitHub
 */
export async function fetchStars(owner: string, repo: string): Promise<number> {
  const repos = await $fetch<{ repo: { stars: number } }>(`https://ungh.cc/repos/${owner}/${repo}`)

  return repos.repo.stars
}

/**
 * Get contributors from GitHub
 */
export async function fetchContributors(owner: string, repo: string): Promise<{ id: number, username: string }[]> {
  const { contributors } = await $fetch<{ contributors: { id: number, username: string, contributions: number }[] }>(`https://ungh.cc/repos/${owner}/${repo}/contributors`)

  const filteredContributors = contributors.filter(({ username }) => !username.includes('[bot]'))
  const sortedContributors = filteredContributors.sort((a, b) => b.contributions - a.contributions)

  return sortedContributors.map(({ id, username }) => ({ id, username }))
}
