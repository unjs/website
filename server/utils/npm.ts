const cachedNpmMonthlyDownloads = defineCachedFunction(async (name: string) => {
  const downloads = await $fetch<{ downloads: number }>(`https://api.npmjs.org/downloads/point/last-month/${name}`)

  return downloads.downloads
}, {
  maxAge: 1000 * 60 * 60 * 24, // 24 hours
  group: 'npm',
  name: 'npmMonthlyDownloads',
  getKey: (name: string) => `npmMonthlyDownloads:${name}`,
})

/**
 * Get the monthly downloads for a package
 */
export async function fetchMonthlyDownloads(name: string): Promise<number> {
  const downloads = await cachedNpmMonthlyDownloads(name)

  return downloads
}
