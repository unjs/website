import type { PackageJson } from 'pkg-types'

const cachedNpmMonthlyDownloads = defineCachedFunction(async (name: string) => {
  const downloads = await $fetch<{ downloads: number }>(`https://api.npmjs.org/downloads/point/last-month/${name}`)

  return downloads.downloads
}, {
  maxAge: 1000 * 60 * 60 * 24, // 24 hours
  group: 'npm',
  name: 'npmMonthlyDownloads',
  getKey: (name: string) => `npmMonthlyDownloads:${name}`,
})

/**
 * Get the monthly downloads for a package
 */
export async function fetchMonthlyDownloads(name: string): Promise<number> {
  const downloads = await cachedNpmMonthlyDownloads(name)

  return downloads
}

const cachedNpmPackages = defineCachedFunction(async (name: string) => {
  const packageJson = await $fetch<PackageJson>(`https://registry.npmjs.org/${name}/latest`)

  return packageJson
}, {
  maxAge: 1000 * 60 * 60 * 24, // 24 hours
  group: 'npm',
  name: 'npmPackages',
  getKey: (name: string) => `npmPackages:${name}`,
})

/**
 * Get the package.json for a package
 */
export async function fetchPackageJson(name: string): Promise<PackageJson> {
  const packageJson = await cachedNpmPackages(name)

  return packageJson
}
