import { defineCommand } from 'citty'

export const generate = defineCommand({
  meta: {
    name: 'Generate',
  },
  subCommands: {
    'content': () => import('./generate/content').then(m => m.content),
    'releases-article': () => import('./generate/releases-article').then(m => m.releasesArticle),
  },
})
