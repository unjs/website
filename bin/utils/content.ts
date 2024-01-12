import { readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { cwd } from 'node:process'
import type { GitHubRepo } from '../types'

export function getContentPath() {
  const currentPath = cwd()

  return join(currentPath, 'content')
}

export function getPackagesPath() {
  const contentPath = getContentPath()

  return join(contentPath, '4.packages')
}

export function getBlogPath() {
  const contentPath = getContentPath()

  return join(contentPath, '5.blog')
}

export function getPackages() {
  const packagesPath = getPackagesPath()

  return readdirSync(packagesPath).filter(p => p.endsWith('.yml') && !p.startsWith('.')).map(p => p.replace('.yml', ''))
}

export function addPackage(repo: GitHubRepo) {
  const packagesPath = getPackagesPath()

  const template = readFileSync(join(packagesPath, '.template.yml'), 'utf-8')

  writeFileSync(join(packagesPath, `/${repo.name}.yml`), template
    .replace('package_title', repo.name)
    .replace('package_description', repo.description)
    .replace('repo_name', repo.name)
    .replace('npm_name', repo.name)
    .replace('docs_link', `https://github.com/unjs/${repo.name}`))
}

export function removePackage(name: string) {
  const packagesPath = getPackagesPath()

  rmSync(join(packagesPath, `${name}.yml`))
}
