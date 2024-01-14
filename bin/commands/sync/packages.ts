import { defineCommand } from 'citty'
import { consola } from 'consola'
import { fetchRepos } from '../../utils/github'
import { addPackage, getExamplesLink, getPackages, removePackage } from '../../utils/content'

export const packages = defineCommand({
  meta: {
    name: 'packages',
  },
  async run() {
    const repos = await fetchRepos()
    const packages = getPackages()

    // Repositories without a package
    const reposWithoutPackage = repos.filter(repo => !packages.includes(repo.name))

    for await (const repo of reposWithoutPackage) {
      consola.info(`Creating ${repo.name}`)
      const examplesLinks = await getExamplesLink(repo.name)
      addPackage({
        name: repo.name,
        description: repo.description,
        examples: examplesLinks,
      })
    }

    // Packages without a repository
    const packagesWithoutRepo = packages.filter(package_ => !repos.find(repo => repo.name === package_))

    for (const package_ of packagesWithoutRepo) {
      consola.info(`Removing ${package_}`)
      removePackage(package_)
    }
  },
})
