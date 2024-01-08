import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import type { SearchSection } from '../../types/search'

const HEADING = /^h([1-6])$/
const isHeading = (tag: string) => HEADING.test(tag)

export function splitPageIntoSections(page: ParsedContent) {
  const path = page._path ?? ''

  const sections: SearchSection[] = []

  sections.push({
    id: path,
    title: page.title ?? '',
    titles: [],
    text: '',
    level: 0,
  })

  if (!page.body)
    return sections

  // No section
  let section = 0
  let previousHeadingLevel = page.title ? 1 : 0
  const titles = page.title ? [page.title] : []
  for (const item of page.body.children) {
    if (item.tag && isHeading(item.tag)) {
      const currentHeadingLevel: number = Number(item.tag.match(HEADING)?.[1]) ?? 0

      const title = extractTextFromAst(item).trim()

      if (currentHeadingLevel === 1) {
        // Reset the titles since we are at the top of the tree
        titles.splice(0, titles.length)
      }
      else if (currentHeadingLevel < previousHeadingLevel) {
        // Go up, remove every title after the current level
        titles.splice(currentHeadingLevel - 1, titles.length - 1)
      }
      else if (currentHeadingLevel === previousHeadingLevel) {
        // Same level, remove the last title
        titles.pop()
      }

      sections.push({
        id: `${path}#${item.props!.id}`,
        title,
        titles: [...titles],
        text: '',
        level: currentHeadingLevel,
      })

      titles.push(title)

      // Swap to a new section
      previousHeadingLevel = currentHeadingLevel
      section += 1
    }

    if (item.tag && !isHeading(item.tag))
      sections[section].text += extractTextFromAst(item).trim()
  }

  return sections
}

function extractTextFromAst(node: any) {
  let text = ''

  // Get text from markdown AST
  if (node.type === 'text')
    text += node.value

  // Do not explore children
  if (node.tag === 'code' || node.tag === 'style')
    return ''

  // Explore children
  if (node.children) {
    for (const child of node.children)
      text += ` ${extractTextFromAst(child)}`
  }

  return text
}
