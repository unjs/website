import { parseMarkdown } from '@nuxtjs/mdc/runtime'
import type { MarkdownNode, ParsedContent } from '@nuxt/content/dist/runtime/types'

export default defineEventHandler(async (event) => {
  const owner = getRouterParam(event, 'owner')
  const repo = getRouterParam(event, 'repo')

  const { markdown } = await $fetch<{ markdown: string }>(`https://ungh.cc/repos/${owner}/${repo}/readme`)
  const content = await parseMarkdown(markdown) as ParsedContent

  if (!content.body)
    return content

  const children: MarkdownNode[] = []
  for (const child of content.body.children)
    children.push(walk(child))

  content.body.children = [] // Reset

  // Filter top level children
  for (const child of children) {
    // Remove h1
    if (child.type === 'element' && child.tag === 'h1')
      continue
    // Remove empty paragraphs since the badge removal above might have removed the only child
    if (child.type === 'element' && child.tag === 'p' && child.children?.length === 0)
      continue

    // Handle GitHub flavoured markdown blockquotes
    // https://github.com/orgs/community/discussions/16925
     if (child.tag === 'blockquote' && // blockquotes > p x 2 > span > text
          ['!NOTE', '!TIP', '!IMPORTANT', '!WARNING', '!CAUTION'].includes(child.children?.[0]?.children?.[0]?.children?.[0]?.value!)) {
        child.type = 'element'
        child.tag = child.children?.[0]?.children?.[0]?.children?.[0]?.value!.slice(1).toLowerCase()
        console.log(child.children?.[0]?.children?.[0])
        child.children?.[0]?.children!.shift()
      }

    content.body.children.push(child)
  }

  return content
})

function walk(node: MarkdownNode): MarkdownNode {
  const children: MarkdownNode[] = []

  if (node.children) {
    for (const child of node.children) {
      // Remove badges
      if (child.type === 'element' && child.tag === 'img') {
        if (hasBadgeSrc(child))
          continue
      }

      children.push(walk(child))
    }
  }

  node.children = []

  for (const child of children) {
    // Remove empty links since the badge removal above might have removed the only child
    if (child.type === 'element' && child.tag === 'a' && child.children?.length === 0)
      continue

    node.children.push(child)
  }

  return node
}

const BADGE_SRC = ['https://img.shields.io', 'https://flat.badgen.net/']

function hasBadgeSrc(node: MarkdownNode): boolean {
  if (!node?.props?.src)
    return false

  for (const src of BADGE_SRC) {
    if (node.props.src.startsWith(src))
      return true
  }

  return false
}
