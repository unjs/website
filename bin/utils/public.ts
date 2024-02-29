import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { cwd } from 'node:process'

export function getPublicPath() {
  const currentPath = cwd()

  return join(currentPath, 'public')
}

export function getPuzzlePartsPath() {
  const publicPath = getPublicPath()

  return join(publicPath, 'assets', 'puzzle')
}

export function getLogosPath() {
  const publicPath = getPublicPath()

  return join(publicPath, 'assets', 'logos')
}

export function getImagesPath() {
  const publicPath = getPublicPath()

  return join(publicPath, 'assets', 'images')
}

export function getBlogImagesPath() {
  const imagesPath = getImagesPath()

  return join(imagesPath, 'blog')
}

export function getLearnImagesPath() {
  const imagesPath = getImagesPath()

  return join(imagesPath, 'learn')
}

/**
 * Get list of puzzle parts, without directory or the extension
 */
export function getPuzzleParts() {
  const puzzlePartsPath = getPuzzlePartsPath()

  // Puzzle parts are in a light and a dark directory.
  const puzzleParts = readdirSync(puzzlePartsPath, { recursive: true }) as string[]

  return {
    light: puzzleParts.filter(p => p.startsWith('light') && p.includes('/')).map(p => p.replace('light/', '').replace('.svg', '')),
    dark: puzzleParts.filter(p => p.startsWith('dark') && p.includes('/')).map(p => p.replace('dark/', '').replace('.svg', '')),
  }
}

/**
 * Get list of logos, without the extension
 */
export function getLogos() {
  const logosPath = getLogosPath()

  return readdirSync(logosPath).map(p => p.replace('.svg', ''))
}
