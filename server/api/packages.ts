import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const contentPackages = await serverQueryContent(event).where({ _path: { $regex: /^\/packages\// } }).only(['_path', 'title', 'description', 'github', 'npm']).find()

  const populatedPackages = await Promise.all(contentPackages.map(fetchPackageMetadata))

  return populatedPackages
})

async function fetchPackageMetadata(contentPackage: Pick<ParsedContent, string>) {
  const [repo, monthlyDownloads] = await Promise.all([
    fetchRepo(contentPackage.github.owner, contentPackage.github.repo),
    contentPackage.npm ? fetchMonthlyDownloads(contentPackage.npm.name) : null,
  ])

  return {
    ...contentPackage,
    stars: repo.stars,
    monthlyDownloads,
    createdAt: repo.createdAt,
    updatedAt: repo.updatedAt,
  }
}
