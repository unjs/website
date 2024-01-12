import { defineCommand } from 'citty'

export const generate = defineCommand({
  meta: {
    name: 'Generate',
  },
  subCommands: {
    'packages-redirects': () => import('./generate/packages-redirects').then(m => m.packagesRedirects),
  },
})
