import process, { exit } from 'node:process'
import { consola } from 'consola'
import { createPackage, getContentPackages, getPackagesWithoutRepo, getReposWithoutPackage, removePackage } from './utils/packages'
import { fetchRepos } from './utils/repos'

/**
 * This script is used to check if each repo have a package and if each package have a repo.
 * It can also create or delete packages if you pass `--create` or `--delete` as argument.
 */
async function main() {
  const orgRepos = await fetchRepos()
  const packageDocs = getContentPackages()

  // Repos that does not have a package
  const reposWithoutPackage = getReposWithoutPackage(orgRepos, packageDocs)

  // Show log
  if (reposWithoutPackage.length === 0)
    consola.success('Each repo have a package 🎉')
  else
    consola.warn(`${reposWithoutPackage.length} repos does not have a package:\n${formatTree(reposWithoutPackage.map(r => r.name))}`)

  // Create markdowns
  if (process.argv.includes('--create')) {
    consola.info('Creating markdowns...')
    for (const repo of reposWithoutPackage)
      createPackage(repo)
  }

  // Package that does not have a repo
  const packagesWithoutRepo = getPackagesWithoutRepo(packageDocs, orgRepos)

  if (packagesWithoutRepo.length === 0)
    consola.success('Each package have a repo 🎉')

  else
    consola.warn(`${packagesWithoutRepo.length} packages does not have a repo:\n${formatTree(packagesWithoutRepo)}`)

  // Delete markdowns
  if (process.argv.includes('--delete')) {
    consola.info('Deleting markdowns...')
    for (const name of packagesWithoutRepo)
      removePackage(name)
  }
}

main().then(() => exit(0)).catch(consola.error)

function formatTree(items: string[]): string {
  let logs = ''
  for (const item of items) {
    const isLast = items.indexOf(item) === items.length - 1
    logs += `  ${isLast ? '└─' : '├─'} ${item}\n`
  }
  return logs
}
