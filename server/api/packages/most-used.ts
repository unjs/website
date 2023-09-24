export default defineEventHandler(async (event) => {
  const packages = await $fetch('/api/packages')

  const mostLovedPackages = packages.sort((a, b) => {
    return b.monthlyDownloads - a.monthlyDownloads // Desc
  })

  return mostLovedPackages
})
