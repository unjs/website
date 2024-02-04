import type { PackageJson } from 'pkg-types'
import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const packages = await serverQueryContent(event).where({ _path: /^\/packages\// }).find()

  const populatedPackages = await Promise.all(
    packages.map(async (pkg) => {
      const [stars, monthlyDownloads, contributors, packageJson] = await Promise.all([
        fetchStars(pkg.github.owner, pkg.github.repo),
        pkg.npm?.name ? fetchMonthlyDownloads(pkg.npm.name) : null,
        fetchContributors(pkg.github.owner, pkg.github.repo),
        pkg.npm?.name ? $fetch<{ package: PackageJson }>(`https://unnpm.pages.dev/packages/${pkg.npm?.name}`) : null,
      ])
      // Be careful. Never break compatibility since 3rd party apps might rely on this data.
      return {
        title: pkg.title,
        description: pkg.description,
        path: pkg._path,
        stars,
        monthlyDownloads,
        contributors: contributors.length,
        url: `https://unjs.io${pkg._path}`,
        npm: pkg.npm?.name
          ? {
              ...pkg.npm,
              dependencies: Object.keys(packageJson?.package.dependencies || {}),
              devDependencies: Object.keys(packageJson?.package.devDependencies || {}),
            }
          : undefined,
      }
      // TODO: make a type to satisfies
    },
    ),
  )

  return populatedPackages
})
