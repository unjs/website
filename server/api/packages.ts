import { serverQueryContent } from '#content/server'
import { Package } from '~/types/package'

// TODO: improve types
export default defineEventHandler(async (event) => {
  const packages = await serverQueryContent<Package>(event).where({ _path: { $regex: /^\/packages\// } }).only(['github', 'npm', 'title']).find()

  const packagesPopulated = await Promise.all(packages.map((package_) => fetchPackage(package_)))

  return packagesPopulated
})

async function fetchPackage(package_: Partial<Package>) {
  const [{ repo }, { contributors }, { downloads }] = await Promise.all([
    $fetch(`https://ungh.cc/repos/${package_.github.owner}/${package_.github.repo}`),
    $fetch(`https://ungh.cc/repos/${package_.github.owner}/${package_.github.repo}/contributors`),
    $fetch(`https://api.npmjs.org/downloads/point/last-month/${package_.npm.name}`)
  ])

  return {
    ...package_,
    createAt: repo.createdAt,
    updatedAt: repo.updatedAt,
    stars: repo.stars,
    contributors: contributors.length,
    monthlyDownloads: downloads,
  }
}
