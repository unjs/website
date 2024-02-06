import myzod from 'myzod'
import { useStorage } from '@vueuse/core'
import type { PackageJson } from 'pkg-types'

/**
 * Manage the menu state.
 */
export function useRelationsMenu() {
  const open = ref(false)

  const storage = useStorage('unjs-relations-menu', true)

  watch(open, (value) => {
    storage.value = value
  })

  onMounted(() => {
    open.value = storage.value
  })

  defineShortcuts({
    meta_m: {
      handler: () => {
        open.value = !open.value
      },
    },
  })

  return open
}

/**
 * Manage the legend state.
 */
export function useRelationsLegend() {
  const open = ref(false)

  const storage = useStorage('unjs-relations-legend', true)

  watch(open, (value) => {
    storage.value = value
  })

  onMounted(() => {
    open.value = storage.value
  })

  defineShortcuts({
    meta_l: {
      handler: () => {
        open.value = !open.value
      },
    },
  })

  return open
}

/**
 * Fetch a package from npm.
 */
export async function fetchNpmPackage(name: string) {
  const data = await $fetch(`https://registry.npmjs.com/${name}/latest`)

  const validatedData = myzod.object({
    name: myzod.string().or(myzod.undefined()),
    description: myzod.string().or(myzod.undefined()),
    dependencies: myzod.record(myzod.string()).or(myzod.undefined()),
    devDependencies: myzod.record(myzod.string()).or(myzod.undefined()),
  }, { allowUnknown: true }).parse(data)

  return validatedData satisfies PackageJson
}

/**
 * Fetch every repo from an organization from GitHub.
 */
export async function fetchGitHubRepos(organization: string) {
  const data = await $fetch(`https://ungh.cc/orgs/${organization}/repos`)

  const validatedData = myzod.object({
    repos: myzod.array(myzod.object({
      id: myzod.number(),
      name: myzod.string(),
      repo: myzod.string(),
      description: myzod.string().or(myzod.null()),
      createdAt: myzod.string(),
      updatedAt: myzod.string(),
      pushedAt: myzod.string(),
      stars: myzod.number(),
      watchers: myzod.number(),
      forks: myzod.number(),
      defaultBranch: myzod.string(),
    })),
  }).parse(data)

  return validatedData
}

/**
 * Fetch a single repo from GitHub.
 */
export async function fetchGitHubRepo(name: string) {
  const data = await $fetch(`https://ungh.cc/repos/${name}`)

  const validatedData = myzod.object({
    repo: myzod.object({
      id: myzod.number(),
      name: myzod.string(),
      repo: myzod.string(),
      description: myzod.string(),
      createdAt: myzod.string(),
      updatedAt: myzod.string(),
      pushedAt: myzod.string(),
      stars: myzod.number(),
      watchers: myzod.number(),
      forks: myzod.number(),
      defaultBranch: myzod.string(),
    }),
  }).parse(data)

  return validatedData
}

/**
 * Fetch every files path from a repo from GitHub.
 */
export async function fetchGitHubFiles(name: string, branch: string) {
  const data = await $fetch(`https://ungh.cc/repos/${name}/files/${branch}`)

  const validatedData = myzod.object({
    meta: myzod.object({
      sha: myzod.string(),
    }),
    files: myzod.array(myzod.object({
      path: myzod.string(),
      mode: myzod.string(),
      sha: myzod.string(),
      size: myzod.number(),
    })),
  }).parse(data)

  return validatedData
}

/**
 * Fetch content from a file from a repo from GitHub.
 */
export async function fetchGitHubFile(name: string, branch: string, path: string) {
  const data = await $fetch(`https://ungh.cc/repos/${name}/files/${branch}/${path}`)

  const validatedData = myzod.object({
    meta: myzod.object({
      url: myzod.string(),
    }),
    file: myzod.object({
      contents: myzod.string(),
    }),
  }).parse(data)

  return validatedData
}

/**
 * Search for content for every `package.json` in a GitHub repo
 */
export async function fetchPackagesFromGitHubRepo(repo: string, defaultBranch: string) {
  const { files } = await fetchGitHubFiles(repo, defaultBranch)

  const unwantedPaths = [
    'playground',
    'examples',
    'tests',
    'test',
  ]
  const packageJsonPaths = files.filter(file => file.path.includes('package.json') && !unwantedPaths.some(path => file.path.includes(path)))

  const packageJsonContents = await Promise.all(
    packageJsonPaths.map(async (path) => {
      const { file: { contents } } = await fetchGitHubFile(repo, defaultBranch, path.path)
      return JSON.parse(contents) as PackageJson
    }),
  ).then(contents => contents.filter(content => !content.private && content.name))

  return packageJsonContents
}
