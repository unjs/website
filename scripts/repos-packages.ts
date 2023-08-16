import process from 'node:process'
import fs from 'node:fs'
import { consola } from 'consola'
import { type GitHubRepo, fetchRepos } from './_repos'

async function main() {
  // This script is used to determine if each repo of the unjs org have a package and if each package have stil a repo.
  const orgRepos = await fetchRepos()
  const packageDocs = fs.readdirSync('./content/4.packages').filter(p => p.endsWith('.md') && !p.startsWith('.'))

  // Repos that does not have a package
  const undocumentedRepos: GitHubRepo[] = []
  for (const repo of orgRepos) {
    if (!packageDocs.includes(`${repo.name}.md`))
      undocumentedRepos.push(repo)
  }

  // Show log
  if (undocumentedRepos.length === 0)
    consola.success('Each repo have a package 🎉')
  else
    consola.warn(`${undocumentedRepos.length} repos does not have a package:\n${formatTree(undocumentedRepos.map(r => r.name))}`)

  // Create markdowns
  if (process.argv.includes('--create')) {
    const template = fs.readFileSync('./content/4.packages/.template.md', 'utf-8')
    for (const repo of undocumentedRepos) {
      fs.writeFileSync(`./content/4.packages/${repo.name}.md`,
        template
          .replace('package_title', repo.name)
          .replace('package_description', repo.description)
          .replace('repo_name', repo.name)
          .replace('npm_name', repo.name)
          .replace('docs_link', `https://github.com/unjs/${repo.name}`),
      )
    }
  }

  // Package that does not have a repo
  const docsWithoutRepo: string[] = []
  for (const name of packageDocs) {
    if (!orgRepos.find(r => r.name === name.replace('.md', '')))
      docsWithoutRepo.push(name)
  }

  if (docsWithoutRepo.length === 0)
    consola.success('Each package have a repo 🎉')

  else
    consola.warn(`${docsWithoutRepo.length} packages does not have a repo:\n${formatTree(docsWithoutRepo)}`)
}

main().catch(consola.error)

function formatTree(items: string[]): string {
  let logs = ''
  for (const item of items) {
    const isLast = items.indexOf(item) === items.length - 1
    logs += `  ${isLast ? '└─' : '├─'} ${item}\n`
  }
  return logs
}
