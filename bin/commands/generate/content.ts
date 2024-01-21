import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineCommand } from 'citty'
import { consola } from 'consola'
import { getBlogPath, getBlogTemplatePath } from '../../utils/content'
import { slugify } from '../../utils/slugify'

export const content = defineCommand({
  args: {
    type: {
      type: 'positional',
      description: 'Type of content to generate. Can be "blog" or "packages"',
      required: true,
    },
  },
  async run({ args }) {
    const acceptedTypes = ['blog']

    if (!acceptedTypes.includes(args.type)) {
      consola.error('You need to provide a valid type of content to generate')
      return
    }

    if (args.type === 'blog') {
      const blogPath = getBlogPath()
      const blogTemplatePath = getBlogTemplatePath()
      const template = readFileSync(blogTemplatePath, 'utf-8')

      const title = await consola.prompt('Title of the article')

      if (!title || typeof title !== 'string') {
        consola.error('You need to provide a title for the article')
        return
      }

      const today = new Date()
      const currentDay = today.getDate()
      const date = `${today.getFullYear()}-${(today.getMonth() + 1).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}-${currentDay.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}`
      const filename = `${date}-${slugify(title)}.md`

      writeFileSync(join(blogPath, filename), template.replace('blog_title', title).replaceAll('blog_date', date))
    }
  },
})
