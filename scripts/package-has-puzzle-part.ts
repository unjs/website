import fs from 'node:fs'
import consola from 'consola'

function main() {
  // This script is used to check if each package has a puzzle part in order to break some images
  // Packages are stored in `./content/packages/*.md`
  // Puzzle parts are stored in `./public/assets/puzzle/*.svg`
  consola.start('Checking if each package has a puzzle part...')

  // Read all packages
  const packages = fs.readdirSync('./content/4.packages')

  // Read all puzzle parts
  const puzzleParts = fs.readdirSync('./public/assets/puzzle')

  const unlinked = []
  // Check if every package have a puzzle part
  for (const package_ of packages) {
    const name = package_.replace('.md', '')
    if (!puzzleParts.includes(`${name}.svg`))
      unlinked.push(name)
  }

  let logs = ''
  for (const name of unlinked) {
    const isLast = unlinked.indexOf(name) === unlinked.length - 1
    logs += `  ${isLast ? '└─' : '├─'} ${name}\n`
  }

  if (unlinked.length === 0)
    consola.success('Each package have a puzzle part 🎉')
  else
    consola.fatal(`${unlinked.length} packages does not have a puzzle part:\n${logs}`)
}

try {
  main()
}
catch (error) {
  consola.error(error)
}
