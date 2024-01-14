import { defineCommand } from 'citty'
import { getExamplesLink, getPackages, loadPackageContent, writePackageContent } from '../../utils/content'

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

      packagesContents.push(content)
    }

    // We assume that examples will be in the root of the repo in the examples directory
    const examples = await Promise.all(packagesContents.map(async (content) => {
      const examplesLink = await getExamplesLink(content.title)

      if (!examplesLink) {
        // Remove examples link
        if (content.examples) {
          content.examples = {
            link: null,
            page: false,
          }
        }

        return content
      }

      // Add examples link
      content.examples = {
        link: examplesLink,
        page: content.examples?.page || false,
      }
      return content
    }))

    // Write back
    for (const example of examples)
      writePackageContent(example)
  },
})
