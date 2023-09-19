import { readdirSync } from 'node:fs'

/**
 * Get the list of packages logos.
 * Remove the .svg extension.
 */
export function getPackagesLogos() {
  return readdirSync('./public/assets/logos').map(p => p.replace('.svg', ''))
}

/**
 * Get the list of packages puzzle parts.
 * Remove the .svg extension.
 */
export function getPackagesPuzzleParts() {
  return readdirSync('./public/assets/puzzle').map(p => p.replace('.svg', ''))
}
