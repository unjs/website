import { defineCommand } from 'citty'

export const generate = defineCommand({
  meta: {
    name: 'Generate',
  },
  subCommands: {
    'releases-article': () => import('./generate/releases-article').then(m => m.releasesArticle),
  },
})
