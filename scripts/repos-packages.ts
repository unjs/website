import fs from 'node:fs'
import { consola } from 'consola'
import { ofetch } from 'ofetch'

interface GitHubRepo {
  name: string
}

const internalRepos = new Set([
  'eslint-config',
  'nitro-preset-starter',
  'unjs.github.io',
  'unjs.io',
  'website',
  'nitro-deploys',
  'template',
  'unkit',
  'rollup-plugin-node-deno',
  'renovate-config',
  'lmify',
  'governance',
  ".github"
])

async function main() {
  // This script is used to determine if each repo of the unjs org have a package and if each package have stil a repo.
  const orgRepos = await fetchRepos()
  const packageDocs = fs.readdirSync('./content/4.packages').filter(p => p.endsWith('.md') && !p.startsWith("."))

  // Repos that does not have a package
  const undocumentedRepos: GitHubRepo[] = []
  for (const repo of orgRepos) {
    if (!packageDocs.includes(`${repo.name}.md`)) {
      undocumentedRepos.push(repo)
    }
  }

  if (undocumentedRepos.length === 0) {
    consola.success('Each repo have a package 🎉')
  } else {
    consola.fatal(`${undocumentedRepos.length} repos does not have a package:\n${formatTree(undocumentedRepos.map(r => r.name))}`)
  }

  // Package that does not have a repo
  const docsWithoutRepo: string[] = []
  for (const name of packageDocs) {
    if (!orgRepos.find(r => r.name === name.replace('.md', ''))) {
      docsWithoutRepo.push(name)
    }
  }

  if (docsWithoutRepo.length === 0) {
    consola.success('Each package have a repo 🎉')
  }
  else {
    consola.fatal(`${docsWithoutRepo.length} packages does not have a repo:\n${formatTree(docsWithoutRepo)}`)
  }
}

main().catch(consola.error)

async function fetchRepos(): Promise<GitHubRepo[]> {
  const repos = await ofetch<GitHubRepo[]>('https://api.github.com/orgs/unjs/repos?per_page=100', {
    responseType: 'json',
  })

  return repos.filter(repo => !internalRepos.has(repo.name))
}

function formatTree(items: string[]): string {
  let logs = ''
  for (const item of items) {
    const isLast = items.indexOf(item) === item.length - 1
    logs += `  ${isLast ? '└─' : '├─'} ${item}\n`
  }
  return logs
}
