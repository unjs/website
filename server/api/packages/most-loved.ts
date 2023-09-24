export default defineEventHandler(async (event) => {
  const packages = await $fetch('/api/packages')

  const mostLovedPackages = packages.sort((a, b) => {
    return b.stars - a.stars // Desc
  })

  return mostLovedPackages
})
