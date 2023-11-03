import { FetchError } from 'ofetch'

export async function fetchRepo(owner: string, repo: string): Promise<{ stars: number, createdAt: string, updatedAt: string }> {
  const repos = await $fetch<{ repo: { stars: number, createdAt: string, updatedAt: string } }>(`https://ungh.cc/repos/${owner}/${repo}`)

  return repos.repo
}

export async function fetchStars(owner: string, repo: string): Promise<number> {
  const repos = await fetchRepo(owner, repo)

  return repos.stars
}

export async function fetchLatestRelease(owner: string, repo: string): Promise<string | null> {
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

// TODO: use it later
// async function fetchContributors(owner: string, repo: string): Promise<{ id: number; username: string }[]> {
//   const { contributors } = await $fetch<{ contributors: { id: number; username: string; contributions: number }[] }>(`https://ungh.cc/repos/${owner}/${repo}/contributors`)

//   const filteredContributors = contributors.filter(({ username }) => !username.includes('[bot]'))
//   const sortedContributors = filteredContributors.sort((a, b) => b.contributions - a.contributions)

//   return sortedContributors.map(({ id, username }) => ({ id, username }))
// }
