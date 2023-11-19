import { exit } from 'node:process'
import fs from 'node:fs'
import { consola } from 'consola'
import { fetchReleases, fetchRepos } from './utils/github'
import type { GithubRelease } from './types'

/**
 * This script is used to fetch all releases from UnJS packages to create a draft for an article to publish on our blog.
 */
async function main() {
  const repos = await fetchRepos()

  const releases = await fetchReleases(repos)

  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth() + 1
  // Filter releases to only keep the ones from the current year and month
  const releasesFromCurrentMonth = releases.reduce((acc, releases) => {
    const filtered = releases.releases.filter((release) => {
      const releaseDate = new Date(release.publishedAt)
      const releaseYear = releaseDate.getFullYear()
      const releaseMonth = releaseDate.getMonth() + 1

      return releaseYear === currentYear && releaseMonth === currentMonth && release.prerelease === false && release.draft === false
    })

    if (filtered.length > 0) {
      acc.push({
        ...releases,
        releases: filtered,
      })
    }

    return acc
  }, [] as { name: string, releases: GithubRelease[] }[]).sort((a, b) => a.name.localeCompare(b.name))

  const numberOfReleases = releasesFromCurrentMonth.reduce((acc, releases) => acc + releases.releases.length, 0)

  // Create the article (draft)
  const currentMonthName = today.toLocaleString('default', { month: 'long' })
  const currentDay = today.getDate()
  const filename = `${currentYear}-${currentMonth}-${currentDay}-${currentMonthName.toLocaleLowerCase()}-monthly-updates.md`
  const title = `Monthly updates (${currentMonthName} ${currentYear})`

  const article = /* md */`---
title: ${title}
description: ${numberOfReleases} releases this month! What's new in the UnJS ecosystem?
image:
  src:
  alt:
authors:
  - name:
    picture:
    twitter:
category:
  - releases
packages:
  - ${releasesFromCurrentMonth.map(releases => releases.name).join('\n  - ')}
publishedAt: ${today.toISOString()}
modifiedAt: ${today.toISOString()}
layout: blog-post
---

${releasesFromCurrentMonth.map(releases => `## ${releases.name}\n\nThis month, we release ${releases.releases.length} new ${releases.releases.length > 1 ? 'releases' : 'release'} (${logReleasesTypes(releases.releases)}):\n\n${releases.releases.map(release => `- [${release.tag}](https://github.com/unjs/${releases.name}/releases/tag/${release.tag})`).join('\n')}\n\n${formatReleasesMarkdown(releases.releases)}`).join('\n\n')}`

  fs.writeFileSync(`./content/5.blog/${filename}`, article)
}

main().then(() => exit(0)).catch(consola.error)

function logReleasesTypes(releases: GithubRelease[]): string {
  const majorReleases = releases.filter(release => release.tag.endsWith('.0.0'))
  const minorReleases = releases.filter(release => release.tag.endsWith('.0') && !release.tag.endsWith('.0.0'))
  const patchRelease = releases.length - majorReleases.length - minorReleases.length

  return `${majorReleases.length} major ${majorReleases.length > 1 ? 'releases' : 'release'}, ${minorReleases.length} minor ${minorReleases.length > 1 ? 'releases' : 'release'} and ${patchRelease} patch ${patchRelease > 1 ? 'releases' : 'release'}`
}

/**
 * Used to group line by types from multiple releases
 *
 * @example If release 1 has 2 features and 1 bug fix and release 2 has 1 feature and 2 bug fixes, this function will merge them to have 3 features and 3 bug fixes within the same output.
 */
function formatReleasesMarkdown(releases: GithubRelease[]): string {
  const data = new Map<string, string[]>() // <title, lines>

  for (const release of releases) {
    const formattedMarkdown = formatReleaseMarkdown(release.markdown)

    let currentTitle = ''
    for (const line of formattedMarkdown.split('\n')) {
      if (isTitle(line) && !data.has(line)) {
        currentTitle = line
        data.set(line, [])
      }
      else if (line === '') {
        // Do nothing with empty lines
      }
      else {
        const items = data.get(currentTitle)
        if (items) {
          items.push(line)
          data.set(currentTitle, items)
        }
      }
    }
  }

  const markdown = []
  for (const [title, lines] of data.entries())
    markdown.push(`${title}\n\n${lines.join('\n')}`)

  return markdown.join('\n\n')
}

function formatReleaseMarkdown(release: string): string {
  const unwantedTitles = ['chore', 'ci', 'contributors', 'build', 'tests']
  let inUnwantedTitle = false

  return release.split('\n').map((line) => {
    line = line.trim().replaceAll('&nbsp;', '')

    if (inUnwantedTitle && isTitle(line) && !unwantedTitles.some(title => contains(line, title))) {
      inUnwantedTitle = false
      return formatLine(line)
    }

    if (isTitle(line) && unwantedTitles.some(title => contains(line, title)))
      inUnwantedTitle = true

    if (inUnwantedTitle)
      return null

    // Other
    if (contains(line, 'compare changes') || contains(line, 'view changes on github'))
      return null

    return formatLine(line)
  }).filter(Boolean).join('\n')
}

function formatLine(line: string): string {
  if (isTitle(line))
    return `${formatTitle(line)}\n`

  if (isList(line))
    return formatList(line)

  return line
}

/**
 * Standardize title using h3, removing emoji like 🚀 and lowercase
 */
function formatTitle(line: string): string {
  return `### ${line.replace(/#+\s*/, '').replace(/[🚀🚨🐞🩹📖]/u, '').toLowerCase().trim()}`
}

/**
 * Standardize list using -
 */
function formatList(line: string): string {
  return `- ${line.replace(/[-\*] /, '')}`
}

function isTitle(line: string): boolean {
  return line.startsWith('#')
}

function isList(line: string): boolean {
  return line.startsWith('- ') || line.startsWith('* ')
}

function contains(line: string, word: string): boolean {
  return line.toLowerCase().includes(word)
}
