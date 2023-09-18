import { consola } from 'consola'
import { parseModule, writeFile } from 'magicast'
import type { NitroConfig } from 'nitropack'
import { createRedirectRouteRule } from './utils/packages'
import { fetchRepos } from './utils/repos'

/**
 * Used to generate every package redirect from `/<package-name>` to `/packages/<package-name>`.
 */
async function main() {
  const redirectsFilename = 'packages-redirects.ts'
  const redirectsFilePath = `./config/${redirectsFilename}`
  const redirectsFile = parseModule(`import type { NitroConfig } from 'nitropack'

/** Generated using a ./scripts/generate-packages-redirects. */
export default { }`)

  const repos = await fetchRepos()

  const from = '/'

  const redirects: NitroConfig['routeRules'] = {}
  for (const repo of repos.sort((a, b) => a.name > b.name ? 1 : -1)) {
    const name = repo.name
    const redirect = createRedirectRouteRule(name)
    redirects[`${from}${name}`] = redirect
  }

  redirectsFile.exports.default = redirects

  await writeFile(redirectsFile, redirectsFilePath)

  consola.info('Packages Redirects Generated.')
}

main().catch(consola.error)
