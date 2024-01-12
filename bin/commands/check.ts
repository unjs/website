import { defineCommand } from 'citty'

export const check = defineCommand({
  meta: {
    name: 'Check',
  },
  subCommands: {
    puzzle: () => import('./check/puzzle').then(m => m.puzzle),
    logos: () => import('./check/logos').then(m => m.logos),
    // TODO: add one for packages redirects
  },
})
