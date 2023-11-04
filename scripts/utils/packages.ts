import { readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import type { NitroConfig, NitroRouteConfig } from 'nitropack'
import { parseModule, writeFile } from 'magicast'
import type { GitHubRepo } from '../types'

/**
 * Get the list of markdown files in packages folder.
 */
export function getContentPackages() {
  return readdirSync('./content/4.packages').filter(p => p.endsWith('.yml') && !p.startsWith('.')).map(p => p.replace('.yml', ''))
}

let template: string | null = null

/**
 * Create a markdown file in packages folder for a repo.
 */
export function createPackage(repo: GitHubRepo) {
  if (!template)
    template = readFileSync('./content/4.packages/.template.yml', 'utf-8')

  writeFileSync(`./content/4.packages/${repo.name}.yml`, template
    .replace('package_title', repo.name)
    .replace('package_description', repo.description)
    .replace('repo_name', repo.name)
    .replace('npm_name', repo.name)
    .replace('docs_link', `https://github.com/unjs/${repo.name}`))
}

/**
 * Remove a markdown file from packages folder for a repo.
 */
export function removePackage(name: string) {
  rmSync(`./content/4.packages/${name}.yml`)
}

/**
 * Get the list of repos that does not have a package.
 */
export function getReposWithoutPackage(repos: GitHubRepo[], packages: string[]): GitHubRepo[] {
  return repos.filter(repo => !packages.includes(repo.name))
}

/**
 * Get the list of packages that does not have a repo.
 */
export function getPackagesWithoutRepo(packages: string[], repos: GitHubRepo[]): string[] {
  return packages.filter(name => !repos.find(repo => repo.name === name))
}

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

/**
 * Generate the redirects file for packages. `content` folder is the source of truth.
 */
export async function generatePackagesRedirections() {
  const packagesRedirectsPath = './config/packages-redirects.ts'
  const redirectsFile = parseModule(`/** Generated using a ./scripts/generate-packages-redirects. */
export default { }`)

  const packages = getContentPackages()

  const from = '/'

  const redirects: NitroConfig['routeRules'] = {}

  for (const package_ of packages)
    redirects[`${from}${package_}`] = createRedirectRouteRule(package_)

  redirectsFile.exports.default = redirects

  await writeFile(redirectsFile, packagesRedirectsPath)
}
