import { exit } from 'node:process'
import { consola } from 'consola'
import { getContentPackages } from './utils/packages'
import { getPackagesPuzzleParts } from './utils/assets'
import { formatTree } from './utils/logs'

/**
 * This script is used to check if each package have a puzzle part and if each puzzle part is used by a package.
 */
async function main() {
  const packages = getContentPackages()
  const puzzleParts = getPackagesPuzzleParts()

  // Check if each package have a puzzle part
  const packagesWithoutPuzzlePart = packages.filter(name => !puzzleParts.includes(name))

  // Check if each puzzle part is used by a package
  const puzzlePartsWithoutPackage = puzzleParts.filter(name => !packages.includes(name))

  if (packagesWithoutPuzzlePart.length === 0)
    consola.success('Each package have a puzzle part 🎉')
  else
    consola.warn(`${packagesWithoutPuzzlePart.length} packages does not have a puzzle part:\n${formatTree(packagesWithoutPuzzlePart)}`)

  if (puzzlePartsWithoutPackage.length === 0)
    consola.success('Each puzzle part is used by a package 🎉')
  else
    consola.warn(`${puzzlePartsWithoutPackage.length} puzzle parts are not used by a package:\n${formatTree(puzzlePartsWithoutPackage)}`)
}

main().then(() => exit(0)).catch(consola.error)
