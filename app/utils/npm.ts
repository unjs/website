import type { PackageJson } from 'pkg-types'
import myzod from 'myzod'

/**
 * Get a link to the npm package.
 */
export function toNpmPackage(name: string) {
  return `https://www.npmjs.com/package/${name}`
}

/**
 * Fetch the latest version of a package from npm.
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
