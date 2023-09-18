import { readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import type { NitroRouteConfig } from 'nitropack'
import { loadFile, writeFile } from 'magicast'
import type { GitHubRepo } from '../types'

/**
 * Get the list of markdown files in packages folder.
 */
export function getContentPackages() {
  return readdirSync('./content/4.packages').filter(p => p.endsWith('.md') && !p.startsWith('.')).map(p => p.replace('.md', ''))
}

let template: string | null = null

/**
 * Create a markdown file in packages folder for a repo.
 */
export function createPackage(repo: GitHubRepo) {
  if (!template)
    template = readFileSync('./content/4.packages/.template.md', 'utf-8')

  writeFileSync(`./content/4.packages/${repo.name}.md`,
    template
      .replace('package_title', repo.name)
      .replace('package_description', repo.description)
      .replace('repo_name', repo.name)
      .replace('npm_name', repo.name)
      .replace('docs_link', `https://github.com/unjs/${repo.name}`),
  )
}

/**
 * Remove a markdown file from packages folder for a repo.
 */
export function removePackage(name: string) {
  rmSync(`./content/4.packages/${name}.md`)
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

const packagesRedirectsPath = './config/packages-redirects.ts'

/**
 * Add a redirect rule for a package in the config file.
 */
export async function addPackageRedirectRouteRule(name: string) {
  const redirectsFile = await loadFile(packagesRedirectsPath)

  redirectsFile.exports.default[`/${name}`] = createRedirectRouteRule(name)

  await writeFile(redirectsFile.$ast, packagesRedirectsPath)
}

/**
 * Remove a redirect rule for a package from the config file.
 */
export async function removePackageRedirectRouteRule(name: string) {
  const redirectsFile = await loadFile(packagesRedirectsPath)

  delete redirectsFile.exports.default[`/${name}`]

  await writeFile(redirectsFile.$ast, packagesRedirectsPath)
}
