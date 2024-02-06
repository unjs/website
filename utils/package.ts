import type { PackageJson } from 'pkg-types'
import type { RelationPackage } from '~/types/package'

export function toPackageLogo(name: string) {
  return `/assets/logos/${name}.svg`
}

export function toPackagePuzzlePart(name: string, dark: boolean = false) {
  if (dark)
    return `/assets/puzzle/dark/${name}.svg`

  return `/assets/puzzle/light/${name}.svg`
}

/**
 * Convert a package.json to a package for the relations section.
 */
export function toRelationsPackage(packageJson: PackageJson, unjsNames: string[]): RelationPackage {
  if (!packageJson.name)
    throw new Error('Package.json does not contain a name')

  return {
    name: packageJson.name,
    description: packageJson.description,
    dependencies: Object.keys(packageJson.dependencies || {}).filter(dep => unjsNames.includes(dep)),
    devDependencies: Object.keys(packageJson.devDependencies || {}).filter(dep => unjsNames.includes(dep)),
    source: 'npm',
  }
}
