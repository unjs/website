import { exit } from 'node:process'
import { consola } from 'consola'
import { getContentPackages } from './utils/packages'
import { getPackagesLogos } from './utils/assets'
import { formatTree } from './utils/logs'

/**
 * This script is used to check if each package have a logo and if each logo is used by a package.
 */
async function main() {
  const packages = getContentPackages()
  const logos = getPackagesLogos()

  // Check if each package have a logo
  const packagesWithoutLogo = packages.filter(name => !logos.includes(name))

  // Check if each logo is used by a package
  const logosWithoutPackage = logos.filter(name => !packages.includes(name))

  if (packagesWithoutLogo.length === 0)
    consola.success('Each package have a logo 🎉')
  else
    consola.warn(`${packagesWithoutLogo.length} packages does not have a logo:\n${formatTree(packagesWithoutLogo)}`)

  if (logosWithoutPackage.length === 0)
    consola.success('Each logo is used by a package 🎉')
  else
    consola.warn(`${logosWithoutPackage.length} logos are not used by a package:\n${formatTree(logosWithoutPackage)}`)
}

main().then(() => exit(0)).catch(consola.error)
