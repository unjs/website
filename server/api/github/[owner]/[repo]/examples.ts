import { parseMarkdown } from '@nuxtjs/mdc/runtime'

interface UnGHFile {
  path: string
  mode: string
  sha: string
  size: number
}

interface UnGHFileContent {
  contents: string
}

export default defineLazyEventHandler(() => {
  const examplesPath = 'examples' // We assume this (same in cli).
  const unwantedFiles = ['index.ts', 'index.mjs', 'package.json', 'readme.md']

  return defineEventHandler(async (event) => {
    const owner = getRouterParam(event, 'owner') as string
    const repo = getRouterParam(event, 'repo') as string

    // Fetch all files in the owner/repo and filter out the ones that are not in the examples folder (we only want direct file).
    const files = await $fetch<{ files: UnGHFile[] }>(`https://ungh.cc/repos/${owner}/${repo}/files/main`).then(data => data.files.filter(file => file.path.startsWith(examplesPath) && file.path.split('/').length === 2 && !unwantedFiles.some(unwantedFile => file.path.toLowerCase().endsWith(unwantedFile))))

    // Fetch the contents of all the files
    const contents = await Promise.all(files.map(async (file) => {
      const data = await $fetch<{ file: UnGHFileContent }>(`https://ungh.cc/repos/${owner}/${repo}/files/main/${file.path}`).then(data => data.file.contents)

      let lang: string = ''
      const ext = file.path.substring(file.path.lastIndexOf('.') + 1)
      if (ext === 'mjs')
        lang = 'js'
      else
        lang = ext

      const filename = file.path.substring(file.path.lastIndexOf('/') + 1)
      const id = filename.substring(0, filename.lastIndexOf('.'))
      const name = filename.substring(0, filename.lastIndexOf('.')).replace(/-/g, ' ').split('.').join(' ')

      return {
        id,
        path: file.path,
        filename,
        name,
        content: await parseMarkdown(`\`\`\`${lang}\n${data}\`\`\``),
      }
    }))

    return contents
  })
})
