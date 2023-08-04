import fs from 'node:fs'
import consola from 'consola'

function main() {
  // This script is used to check if each puzzle part has a package in order to avoid useless puzzle part
  // Packages are stored in `./content/packages/*.md`
  // Puzzle parts are stored in `./public/assets/puzzle/*.svg`
  consola.start('Checking if each puzzle part has a package...')

  // Read all puzzle parts
  const puzzleParts = fs.readdirSync('./public/assets/puzzle')

  // Read all packages
  const packages = fs.readdirSync('./content/4.packages')

  const unlinked = []
  // Check if every puzzle part have a package
  for (const part of puzzleParts) {
    const name = part.replace('.svg', '')
    if (!packages.includes(`${name}.md`))
      unlinked.push(name)
  }

  let logs = ''
  for (const name of unlinked) {
    const isLast = unlinked.indexOf(name) === unlinked.length - 1
    logs += `  ${isLast ? '└─' : '├─'} ${name}\n`
  }

  if (unlinked.length === 0)
    consola.success('Each puzzle part has a package 🎉')
  else
    consola.fatal(`${unlinked.length} puzzle parts does not have a package:\n${logs}`)
}

try {
  main()
}
catch (error) {
  consola.error(error)
}
