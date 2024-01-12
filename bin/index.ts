import { defineCommand, runMain } from 'citty'

const main = defineCommand({
  meta: {
    name: 'unjs/website',
    description: 'Interact with the website',
  },
  subCommands: {
    check: () => import('./commands/check').then(m => m.check),
  },
})

runMain(main)
