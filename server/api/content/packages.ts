import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const packages = await serverQueryContent(event).where({ _path: /^\/packages\// }).find()

  const populatedPackages = await Promise.all(
    packages.map(async (pkg) => {
      const [stars, monthlyDownloads, contributors] = await Promise.all([
        fetchStars(pkg.github.owner, pkg.github.repo),
        pkg.npm?.name ? fetchMonthlyDownloads(pkg.npm.name) : null,
        fetchContributors(pkg.github.owner, pkg.github.repo),
      ])
      return {
        _path: pkg._path,
        title: pkg.title,
        description: pkg.description,
        stars,
        monthlyDownloads,
        contributors: contributors.length,
      }
    }),
  )

  return populatedPackages
})
