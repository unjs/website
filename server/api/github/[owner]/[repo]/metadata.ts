import { FetchError } from 'ofetch'

export default defineEventHandler(async (event) => {
  const owner = getRouterParam(event, 'owner')
  const repo = getRouterParam(event, 'repo')

  if (!owner || !repo) {
    throw createError({
      status: 400,
      message: 'Missing owner or repo',
    })
  }

  const [stars, contributors, latestRelease] = await Promise.all([
    fetchStars(owner, repo),
    fetchContributors(owner, repo),
    fetchLatestRelease(owner, repo),
  ])

  return {
    stars,
    contributors,
    latestRelease,
  }
})

async function fetchStars(owner: string, repo: string): Promise<number> {
  const repos = await $fetch<{ repo: { stars: number } }>(`https://ungh.cc/repos/${owner}/${repo}`)

  return repos.repo.stars
}

async function fetchContributors(owner: string, repo: string): Promise<{ id: number; username: string }[]> {
  const { contributors } = await $fetch<{ contributors: { id: number; username: string; contributions: number }[] }>(`https://ungh.cc/repos/${owner}/${repo}/contributors`)

  const filteredContributors = contributors.filter(({ username }) => !username.includes('[bot]'))
  const sortedContributors = filteredContributors.sort((a, b) => b.contributions - a.contributions)

  return sortedContributors.map(({ id, username }) => ({ id, username }))
}

async function fetchLatestRelease(owner: string, repo: string): Promise<string | null> {
  try {
    const releases = await $fetch<{ release: { tag: string } }>(`https://ungh.cc/repos/${owner}/${repo}/releases/latest`)
    return releases.release.tag
  }
  catch (error: unknown) {
    if (error instanceof FetchError && error.status === 404)
      return null

    throw error
  }
}
