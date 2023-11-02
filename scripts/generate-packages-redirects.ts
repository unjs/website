import { consola } from 'consola'
import { generatePackagesRedirections } from './utils/packages'

/**
 * Used to generate every package redirect from `/<package-name>` to `/packages/<package-name>`.
 */
async function main() {
  await generatePackagesRedirections()
}

main().catch(consola.error)
