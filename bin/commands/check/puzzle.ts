import { exit } from 'node:process'
import { defineCommand } from 'citty'
import { consola } from 'consola'
import { getPackages } from '../../utils/content'
import { getPuzzleParts } from '../../utils/public'
import { formatTree } from '../../utils/format'

export const puzzle = defineCommand({
  meta: {
    name: 'puzzle',
  },
  run: () => {
    const packages = getPackages()
    const puzzleParts = getPuzzleParts()

    // Check if each package have a puzzle part (light and dark)
    const packagesWithoutLightPuzzlePart = packages.filter(name => !puzzleParts.light.includes(name))

    if (packagesWithoutLightPuzzlePart.length)
      consola.error(`A light puzzle part is needed:\n${formatTree(packagesWithoutLightPuzzlePart)}`)

    const packagesWithoutDarkPuzzlePart = packages.filter(name => !puzzleParts.dark.includes(name))

    if (packagesWithoutDarkPuzzlePart.length)
      consola.error(`A dark puzzle part is needed:\n${formatTree(packagesWithoutDarkPuzzlePart)}`)

    // Check if each puzzle part (light and dark) have a package
    const lightPuzzlePartsWithoutPackage = puzzleParts.light.filter(name => !packages.includes(name))

    if (lightPuzzlePartsWithoutPackage.length)
      consola.error(`A package (from light) is needed:\n${formatTree(lightPuzzlePartsWithoutPackage)}`)

    const darkPuzzlePartsWithoutPackage = puzzleParts.dark.filter(name => !packages.includes(name))

    if (darkPuzzlePartsWithoutPackage.length)
      consola.error(`A package (from dark) is needed:\n${formatTree(darkPuzzlePartsWithoutPackage)}`)

    if (packagesWithoutLightPuzzlePart.length || packagesWithoutDarkPuzzlePart.length || lightPuzzlePartsWithoutPackage.length || darkPuzzlePartsWithoutPackage.length)
      return exit(1)

    return exit(0)
  },
})
