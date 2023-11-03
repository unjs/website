export async function fetchMonthlyDownloads(name: string): Promise<number> {
  const downloads = await $fetch<{ downloads: number }>(`https://api.npmjs.org/downloads/point/last-month/${name}`)

  return downloads.downloads
}
