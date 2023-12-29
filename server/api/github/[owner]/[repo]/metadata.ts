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

  const [stars, latestRelease] = await Promise.all([
    fetchStars(owner, repo),
    fetchLatestRelease(owner, repo),
  ])

  return {
    stars,
    latestRelease,
  }
})

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
