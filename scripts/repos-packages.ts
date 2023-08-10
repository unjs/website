import fs from 'node:fs'
import { consola } from 'consola'
import { ofetch } from 'ofetch'

// https://github.com/unjs/ungh/tree/main#reposownername
interface GitHubRepo {
  "id": number,
  "name": string,
  "repo": string,
  "description": string,
  "createdAt": string,
  "updatedAt": string,
  "pushedAt": string,
  "stars": number,
  "watchers": number,
  "forks": number
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

  // Show log
  if (undocumentedRepos.length === 0) {
    consola.success('Each repo have a package 🎉')
  } else {
    consola.warn(`${undocumentedRepos.length} repos does not have a package:\n${formatTree(undocumentedRepos.map(r => r.name))}`)
  }

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
          .replace('docs_link', 'https://github.com/unjs/' + repo.name)
      )
    }
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
    consola.warn(`${docsWithoutRepo.length} packages does not have a repo:\n${formatTree(docsWithoutRepo)}`)
  }
}

main().catch(consola.error)

async function fetchRepos(): Promise<GitHubRepo[]> {
  const repos = await ofetch<{ repos: GitHubRepo[] }>('https://ungh.cc/orgs/unjs/repos').then(r => r.repos)

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
