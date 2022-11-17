const hiddenRepos = new Set([
  'eslint-config',
  'nitro-preset-starter',
  'unjs.github.io',
  'unjs.io',
  'webite',
  'nitro-deploys',
  'template',
  'unkit',
  'unmeta',
  'rollup-plugin-node-deno',
  'siroc',
  'renovate-config'
])

export default defineEventHandler(async () => {
  const { repos } = await $fetch('https://ungh.unjs.io/orgs/unjs/repos') as any
  return repos
    .filter((repo: any) => !hiddenRepos.has(repo.name))
    .sort((a: any, b: any) => b.stars - a.stars)
})
