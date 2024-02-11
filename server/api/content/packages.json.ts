import { serverQueryContent } from '#content/server'
import { toPackageLogo } from '~/utils/package'

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
        id: pkg.title?.toLowerCase(),
        title: pkg.title,
        description: pkg.description,
        stars,
        monthlyDownloads,
        contributors: contributors.length,
        path: pkg._path,
        url: `https://unjs.io${pkg._path}`,
        logoPath: toPackageLogo(pkg.title ?? ''),
        logoUrl: `https://unjs.io${toPackageLogo(pkg.title ?? '')}`,
        npm: pkg.npm,
      }
    },
    ),
  )

  return populatedPackages
})
