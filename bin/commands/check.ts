import { defineCommand } from 'citty'

export const check = defineCommand({
  meta: {
    name: 'check',
  },
  subCommands: {
    'puzzle': () => import('./check/puzzle').then(m => m.puzzle),
    'logos': () => import('./check/logos').then(m => m.logos),
    'packages-redirects': () => import('./check/packages-redirects').then(m => m.packagesRedirects),
  },
})
