import { execSync } from 'node:child_process'
import { defineCommand } from 'citty'
import type { NitroConfig, NitroRouteConfig } from 'nitropack'
import { parseModule, writeFile } from 'magicast'
import { getPackages } from '../../utils/content'
import { getPackagesRedirectsPath } from '../../utils/config'

export const packagesRedirects = defineCommand({
  meta: {
    name: 'Packages Redirects',
  },
  args: {
    format: {
      type: 'boolean',
      required: false,
    },
  },
  async run({ args }) {
    const packages = getPackages()
    const packagesRedirectsPath = getPackagesRedirectsPath()

    const redirectsContent = parseModule(`/** Do not edit manually. Use \`jiti bin sync packages-redirects\`. */
export default { }`)

    const from = '/'

    const redirects: NitroConfig['routeRules'] = {}

    for (const package_ of packages)
      redirects[`${from}${package_}`] = createRedirectRouteRule(package_)

    redirectsContent.exports.default = redirects

    await writeFile(redirectsContent, packagesRedirectsPath)

    if (args.format) {
      execSync(`pnpm run lint:fix`, {
        stdio: 'inherit',
      })
    }
  },
})

/**
 * Create a redirect rule for a package.
 */
export function createRedirectRouteRule(name: string): NitroRouteConfig {
  return {
    redirect: {
      to: `/packages/${name}`,
      statusCode: 302, // Temporary redirect
    },
  }
}
