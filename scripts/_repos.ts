import { ofetch } from 'ofetch'

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

// https://github.com/unjs/ungh/tree/main#reposownername
export interface GitHubRepo {
  'id': number
  'name': string
  'repo': string
  'description': string
  'createdAt': string
  'updatedAt': string
  'pushedAt': string
  'stars': number
  'watchers': number
  'forks': number
}

export async function fetchRepos(): Promise<GitHubRepo[]> {
  const repos = await ofetch<{ repos: GitHubRepo[] }>('https://ungh.cc/orgs/unjs/repos').then(r => r.repos)

  return repos.filter(repo => !internalRepos.has(repo.name))
}
