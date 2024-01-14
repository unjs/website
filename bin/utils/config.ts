import { join } from 'node:path'
import { cwd } from 'node:process'

export function getConfigPath() {
  const currentPath = cwd()

  return join(currentPath, 'config')
}

export function getPackagesRedirectsPath() {
  const configPath = getConfigPath()

  return join(configPath, 'packages-redirects.ts')
}
