import { defineCommand } from 'citty'

export const sync = defineCommand({
  meta: {
    name: 'sync',
  },
  subCommands: {
    'packages-redirects': () => import('./sync/packages-redirects').then(m => m.packagesRedirects),
    'packages': () => import('./sync/packages').then(m => m.packages),
  },
})
