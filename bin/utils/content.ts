import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { cwd } from 'node:process'

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
