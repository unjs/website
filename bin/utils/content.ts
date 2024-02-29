import { readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { cwd } from 'node:process'
import { dump, load } from 'js-yaml'
import { ofetch } from 'ofetch'
import type { ContentPackage, GitHubFile } from '../types'

export function getContentPath() {
  const currentPath = cwd()

  return join(currentPath, 'content')
}

export function getPackagesPath() {
  const contentPath = getContentPath()

  return join(contentPath, 'packages')
}

export function getBlogPath() {
  const contentPath = getContentPath()

  return join(contentPath, 'blog')
}

export function getBlogTemplatePath() {
  const blogPath = getBlogPath()

  return join(blogPath, '.template.md')
}

export function loadPackageContent(name: string) {
  return load(readFileSync(join(getPackagesPath(), `${name}.yml`), 'utf-8')) as ContentPackage
}

export function writePackageContent(package_: ContentPackage) {
  writeFileSync(join(getPackagesPath(), `${package_.title}.yml`), dump(package_))
}

export function getPackages() {
  const packagesPath = getPackagesPath()

  return readdirSync(packagesPath).filter(p => p.endsWith('.yml') && !p.startsWith('.')).map(p => p.replace('.yml', ''))
}

export function addPackage(repo: { name: string, description: string, examples: string | null }) {
  const packagesPath = getPackagesPath()

  const template = readFileSync(join(packagesPath, '.template.yml'), 'utf-8')

  writeFileSync(join(packagesPath, `/${repo.name}.yml`), template
    .replace('package_title', repo.name)
    .replace('package_description', repo.description)
    .replace('repo_name', repo.name)
    .replace('npm_name', repo.name)
    .replace('examples_link', repo.examples || 'null')
    .replace('docs_link', `https://github.com/unjs/${repo.name}`))
}

export function removePackage(name: string) {
  const packagesPath = getPackagesPath()

  rmSync(join(packagesPath, `${name}.yml`))
}

export async function getExamplesLink(name: string) {
  const files = await ofetch<{ files: GitHubFile[] }>(`https://ungh.cc/repos/unjs/${name}/files/main`)

  const hasExamples = files.files.some(f => f.path.startsWith('examples/'))

  return hasExamples ? `https://github.com/unjs/${name}/blob/main/examples` : null
}

export function getLearnPath() {
  const contentPath = getContentPath()

  return join(contentPath, 'learn', 'articles')
}

export function getLearnTemplatePath() {
  const learnPath = getLearnPath()

  return join(learnPath, '.template.md')
}
