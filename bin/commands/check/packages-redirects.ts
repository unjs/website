import { exit } from 'node:process'
import { defineCommand } from 'citty'
import { getPackages } from '../../utils/content'
import { getPackagesRedirectsPath } from '../../utils/config'
import { formatTree } from '../../utils/format'

export const packagesRedirects = defineCommand({
  meta: {
    name: 'Packages Redirects',
    description: 'Check that all packages have a redirect rule',
  },
  async run() {
    const packages = getPackages()
    const redirects = await import(getPackagesRedirectsPath()).then(m => m.default)

    const redirectsKeys = Object.keys(redirects).map(name => name.replace('/', ''))

    // Check if each package have a redirect rule
    const missingRedirects = packages.filter(name => !redirectsKeys.includes(name))

    if (missingRedirects.length)
      console.error(`Missing redirects:\n${formatTree(missingRedirects)}`)

    // Check if each redirect rule have a package
    const missingPackages = redirectsKeys.filter(name => !packages.includes(name))

    if (missingPackages.length)
      console.error(`Missing packages:\n${formatTree(missingPackages)}`)

    if (missingRedirects.length || missingPackages.length)
      return exit(1)

    return exit(0)
  },
})
