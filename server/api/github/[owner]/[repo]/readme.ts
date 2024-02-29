import { parseMarkdown } from '@nuxtjs/mdc/runtime'
import type { MarkdownNode, ParsedContent } from '@nuxt/content/dist/runtime/types'

export default defineEventHandler(async (event) => {
  const owner = getRouterParam(event, 'owner') as string
  const repo = getRouterParam(event, 'repo') as string

  const markdown = await cachedGitHubReadme(owner, repo)
  const content = await parseMarkdown(markdown) as ParsedContent

  if (!content.body)
    return content

  content.body.children = walker(content.body, repo)

  return content
})

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

function walker(nodes: MarkdownNode, repo: string): MarkdownNode[] {
  const children: MarkdownNode[] = []

  if (!nodes.children)
    return children

  let hrFlag = false
  let sponsorsFlag = false
  let brCount = 0
  for (const node of nodes.children) {
    // Remove h1
    if (node.type === 'element' && node.tag === 'h1')
      continue

    // Remove h2
    if (node.type === 'element' && node.tag === 'h2' && node.children?.[0]?.value === 'Sponsors') {
      sponsorsFlag = true
      continue
    }

    // Remove align center on p
    if (node.type === 'element' && node.tag === 'p' && node.props?.align === 'center')
      delete node.props.align

    // Remove sponsors (Always after h2)
    if (sponsorsFlag) {
      sponsorsFlag = false
      continue
    }

    // Remove badges (p > a > img)
    if (node.type === 'element' && node.tag === 'p') {
      const result = node.children?.some((child) => {
        return (child.type === 'element' && child.tag === 'a' && child.children?.[0]?.type === 'element' && child.children?.[0]?.tag === 'img' && hasBadgeSrc(child.children[0]))
      })
      if (result)
        continue
    }

    // Remove contributors img (p > br + br + a > img)
    if (brCount === 2 && node.type === 'element' && node.tag === 'a' && node.children?.[0]?.type === 'element' && node.children?.[0]?.tag === 'img' && node.children?.[0].props?.src.includes('https://contrib.rocks/')) {
      brCount = 0
      // Remove the last 2 br
      children.pop()
      children.pop()
      continue
    }

    // Remove automd (hr + p > em > a > text)
    if (node.type === 'element' && node.tag === 'hr')
      hrFlag = true
    if (hrFlag && node.type === 'element' && node.tag === 'p' && node.children?.[0].children?.[1].children?.[0]?.value?.includes('automd')) {
      hrFlag = false
      // Remove the last item of the children array (hr)
      children.pop()
      continue
    }

    // Handle GitHub flavoured markdown blockquotes
    // https://github.com/orgs/community/discussions/16925
    if (node.tag === 'blockquote' // blockquotes > p x 2 > span > text
      && ['!NOTE', '!TIP', '!IMPORTANT', '!WARNING', '!CAUTION'].includes(node.children?.[0]?.children?.[0]?.children?.[0]?.value || '')) {
      node.type = 'element'
      node.tag = node.children?.[0]?.children?.[0]?.children?.[0]?.value!.slice(1).toLowerCase()
      node.children?.[0]?.children!.shift()
    }

    if (node.type === 'element' && node.tag === 'br')
      brCount++
    else
      brCount = 0

    /**
     * Package specific
     */
    // Remove table from unhead
    if (repo === 'unhead' && node.type === 'element' && node.tag === 'table')
      continue

    // Explore children
    node.children = walker(node, repo)
    // Add to tree
    children.push(node)
  }

  return children
}
