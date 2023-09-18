import { ofetch } from 'ofetch'
import type { GitHubRepo } from '../types'

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
