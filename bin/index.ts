import { defineCommand, runMain } from 'citty'

const main = defineCommand({
  meta: {
    name: 'jiti bin', // Not the name but useful when printing the usage
    description: 'Interact with the website',
  },
  subCommands: {
    check: () => import('./commands/check').then(m => m.check),
    generate: () => import('./commands/generate').then(m => m.generate),
    sync: () => import('./commands/sync').then(m => m.sync),
    github: () => import('./commands/github').then(m => m.github),
  },
})

runMain(main)
