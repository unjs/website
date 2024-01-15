import { exit } from 'node:process'
import { defineCommand } from 'citty'
import { consola } from 'consola'
import { getPackages } from '../../utils/content'
import { getLogos } from '../../utils/public'
import { formatTree } from '../../utils/format'

export const logos = defineCommand({
  meta: {
    name: 'Logos',
  },
  run() {
    const packages = getPackages()
    const logos = getLogos()

    // Check if each package have a logo
    const packagesWithoutLogo = packages.filter(name => !logos.includes(name))

    if (packagesWithoutLogo.length)
      consola.error(`A logo is needed:\n${formatTree(packagesWithoutLogo)}`)

    // Check if each logo have a package
    const logosWithoutPackage = logos.filter(name => !packages.includes(name))

    if (logosWithoutPackage.length)
      consola.error(`A package is needed:\n${formatTree(logosWithoutPackage)}`)

    if (packagesWithoutLogo.length || logosWithoutPackage.length)
      return exit(1)

    return exit(0)
  },
})
