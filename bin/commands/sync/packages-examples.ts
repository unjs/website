import { defineCommand } from 'citty'
import { ofetch } from 'ofetch'
import { getPackages, loadPackageContent, writePackageContent } from '../../utils/content'
import type { GitHubFile } from '../../types'

export const packagesExamples = defineCommand({
  meta: {
    name: 'packages-examples',
    description: 'Add examples link to packages that does not have it',
  },
  async run() {
    const packages = getPackages()
    const packagesContents = []

    for (const package_ of packages) {
      const content = loadPackageContent(package_)

      if (content.examples)
        continue

      packagesContents.push(content)
    }

    // We assume that examples will be in the root of the repo in the examples directory
    const examples = await Promise.all(packagesContents.map(async (content) => {
      const files = await ofetch<{ files: GitHubFile[] }>(`https://ungh.cc/repos/${content.github.owner}/${content.github.repo}/files/main`)

      const hasExamples = files.files.some(f => f.path.startsWith('examples/'))

      if (!hasExamples)
        return content

      // Add examples link
      content.examples = `https://github.com/${content.github.owner}/${content.github.repo}/blob/main/examples`

      return content
    }))

    // Write back
    for (const example of examples)
      writePackageContent(example)
  },
})
