import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const packages = await serverQueryContent(event).where({ _path: /^\/packages\// }).find()

  return packages.map((pkg) => {
    return {
      title: pkg.title,
      description: pkg.description,
      path: pkg._path,
      url: `https://unjs.io${pkg._path}`,
      npm: pkg.npm,
    }
  })
})
