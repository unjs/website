import { consola } from 'consola'
import { fetchRepos } from './_repos'

async function main() {
  const repos = await fetchRepos()

  const from = '/'
  const to = '/packages/'
  const redirectCode = 301 // Moved Permanently

  const redirects = []
  for (const repo of repos.sort((a, b) => a.name > b.name ? 1 : -1)) {
    const name = repo.name
    const redirect = `'${from + name}': { redirect: { to: '${to + name}', statusCode: ${redirectCode} } },`
    redirects.push(redirect)
  }

  redirects.push(`# ${redirects.length} redirects - ${new Date().toISOString()}`)

  consola.log(redirects.join('\n'))
}

main().catch(consola.error)
