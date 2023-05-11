const hiddenRepos = new Set([
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
  ".github"
])

export default defineEventHandler(async () => {
  const { repos } = await $fetch('https://ungh.cc/orgs/unjs/repos').catch(() => ({ repos: [] })) as any
  return repos
    .filter((repo: any) => !hiddenRepos.has(repo.name))
    .sort((a: any, b: any) => b.stars - a.stars)
})
