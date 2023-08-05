import fs from 'node:fs'
import { consola } from 'consola'
import { ofetch } from 'ofetch'

interface GitHubRepo {
  name: string
}

async function main() {
  // This script is used to determine if each repo of the unjs org have a package and if each package have stil a repo.
  const repos = await fetchRepos()
  const packages = fs.readdirSync('./content/4.packages')

  // Repos that does not have a package
  const unlinkedRepos = []
  for (const repo of repos) {
    if (!packages.includes(`${repo}.md`))
      unlinkedRepos.push(repo)
  }

  const logsRepos = buildLogs(unlinkedRepos)

  if (unlinkedRepos.length === 0)
    consola.success('Each repo have a package 🎉')
  else
    consola.fatal(`${unlinkedRepos.length} repos does not have a package:\n${logsRepos}`)

  // Package that does not have a repo
  const unlinkedPackages = []
  for (const package_ of packages) {
    if (!repos.includes(package_.replace('.md', '')))
      unlinkedPackages.push(package_)
  }

  const logsPackages = buildLogs(unlinkedPackages)

  if (unlinkedPackages.length === 0)
    consola.success('Each package have a repo 🎉')
  else
    consola.fatal(`${unlinkedPackages.length} packages does not have a repo:\n${logsPackages}`)
}

main().catch(consola.error)

async function fetchRepos(): Promise<string[]> {
  const repos = await ofetch<GitHubRepo[]>('https://api.github.com/orgs/unjs/repos?per_page=100', {
    responseType: 'json',
  })

  return repos.map(repo => repo.name)
}

function buildLogs(data: string[]): string {
  let logs = ''

  for (const name of data) {
    const isLast = data.indexOf(name) === data.length - 1
    logs += `  ${isLast ? '└─' : '├─'} ${name}\n`
  }

  return logs
}
