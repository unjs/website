import { parseMarkdown } from '@nuxtjs/mdc/runtime'

export default defineEventHandler(async (event) => {
  const owner = getRouterParam(event, 'owner')
  const repo = getRouterParam(event, 'repo')

  const { markdown } = await $fetch(`https://ungh.cc/repos/${owner}/${repo}/readme`)

  const content = await parseMarkdown(markdown.replace(/^# .+/, ''))

  return {
    content,
  }
})
