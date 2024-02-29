import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineCommand } from 'citty'
import { consola } from 'consola'
import { getBlogPath, getBlogTemplatePath, getLearnPath, getLearnTemplatePath } from '../../utils/content'
import { slugify } from '../../utils/slugify'
import { getBlogImagesPath, getLearnImagesPath } from '../../utils/public'

export const content = defineCommand({
  args: {
    type: {
      type: 'positional',
      description: 'Type of content to generate.',
      required: false,
    },
  },
  async run({ args }) {
    const acceptedTypes = ['blog', 'learn']

    const type = args.type || (await consola.prompt('Type of content to generate', {
      type: 'select',
      options: acceptedTypes,
    }))

    if (!acceptedTypes.includes(type)) {
      consola.error('You need to provide a valid type of content to generate')
      return
    }

    const title = await consola.prompt(`Title of the '${type}' article`, { type: 'text' })
    const date = generateDate()
    const filename = createFilename(title, date)

    if (type === 'blog') {
      const blogPath = getBlogPath()
      const blogTemplatePath = getBlogTemplatePath()
      const template = readFileSync(blogTemplatePath, 'utf-8')

      const content = template.replace('blog_title', title).replaceAll('blog_date', date)
      const path = join(blogPath, filename)
      writeContent(content, path)

      const blogImagesPath = getBlogImagesPath()
      const imagesPath = join(blogImagesPath, filename.replace('.md', ''))
      generateImageFolder(imagesPath)

      consola.success(`Successfully generated at:\nContent: ${path}\nImages: ${imagesPath}`)
    }

    if (type === 'learn') {
      const categories = ['getting-started', 'building-blocks']

      const category = await consola.prompt('Category of the learn article', {
        type: 'select',
        options: categories,
      })

      const learnPath = getLearnPath()
      const learnTemplatePath = getLearnTemplatePath()
      const template = readFileSync(learnTemplatePath, 'utf-8')

      const learnImages = getLearnImagesPath()
      const imagesPath = join(learnImages, filename.replace('.md', ''))
      generateImageFolder(imagesPath)

      const content = template.replace('learn_title', title).replaceAll('learn_date', date).replace('learn_category', category).replace('images_path', imagesPath.split('/public').pop() || '')

      const path = join(learnPath, filename)
      writeContent(content, path)

      consola.success(`Successfully generated at:\nContent: ${path}\nImages: ${imagesPath}`)
    }
  },
})

function generateImageFolder(path: string) {
  // Recursive folder creation
  const folders = path.split('/')
  let currentPath = ''

  folders.forEach((folder) => {
    currentPath += `${folder}/`

    if (!folder.includes('.')) {
      if (!existsSync(currentPath))
        mkdirSync(currentPath)
    }
  })
}

function writeContent(content: string, path: string) {
  writeFileSync(path, content)
}

function createFilename(name: string, date: string) {
  return `${date}-${slugify(name)}.md`
}

function generateDate() {
  const today = new Date()
  const currentDay = today.getDate()
  const date = `${today.getFullYear()}-${(today.getMonth() + 1).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}-${currentDay.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}`

  return date
}
