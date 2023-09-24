export default defineEventHandler(async (event) => {
  const packages = await $fetch('/api/packages')

  const latestPackages = packages.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() // Desc
  })

  return latestPackages
})
