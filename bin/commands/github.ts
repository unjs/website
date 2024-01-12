import { defineCommand } from 'citty'

export const github = defineCommand({
  meta: {
    name: 'github',
    description: 'Command that will impact GitHub',
  },
  subCommands: {
    'sync-packages': () => import('./github/sync-packages').then(m => m.syncPackages),
  },
})
