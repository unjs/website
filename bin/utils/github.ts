import { ofetch } from 'ofetch'
import type { GitHubRepo, GithubRelease } from '../types'

export const internalRepos = new Set([
  'eslint-config',
  'nitro-preset-starter',
  'unjs.github.io',
  'unjs.io',
  'website',
  'nitro-deploys',
  'template',
  'unkit',
  'rollup-plugin-node-deno',
  'renovate-config',
  'lmify',
  'governance',
  'docs',
  'community',
  '.github',
  // These are not internal but less maintained
  'create-require',
  'externality',
  'ezpass',
  'html-validate-es',
  'is-https',
  'items-promise',
  'redirect-ssl',
  'requrl',
  'shiki-es',
  'workbox-cdn',
])

/**
 * Fetch all repos from the unjs org.
 */
export async function fetchRepos(): Promise<GitHubRepo[]> {
  const repos = await ofetch<{ repos: GitHubRepo[] }>('https://ungh.cc/orgs/unjs/repos').then(r => r.repos)

  return repos.filter(repo => !internalRepos.has(repo.name))
}

/**
 * Fetch all releases from repos
 */
export async function fetchReleases(repos: GitHubRepo[]): Promise<{ releases: GithubRelease[], name: string }[]> {
  const releases = await Promise.all(repos.map(async (repo) => {
    const releases = await ofetch<{ releases: GithubRelease[] }>(`https://ungh.cc/repos/unjs/${repo.name}/releases`)
    return {
      name: repo.name,
      releases: releases.releases,
    }
  }))

  return releases
}
