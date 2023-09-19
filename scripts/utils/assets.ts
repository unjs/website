import { readdirSync } from 'node:fs'

/**
 * Get the list of packages logos.
 */
export function getPackagesLogos() {
  return readdirSync('./public/assets/logos').map(p => p.replace('.svg', ''))
}
