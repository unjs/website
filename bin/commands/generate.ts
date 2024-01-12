import { defineCommand } from 'citty'

export const generate = defineCommand({
  meta: {
    name: 'Generate',
  },
  subCommands: {
    'packages-redirects': () => import('./generate/packages-redirects').then(m => m.packagesRedirects),
    'releases-article': () => import('./generate/releases-article').then(m => m.releasesArticle),
  },
})
