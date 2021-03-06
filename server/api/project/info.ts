import { projects } from '../../data/projects'
import remark from 'remark'
import remarkHtml from 'remark-html'
import { createError } from 'h3'

export default async (req) => {
  const _name = req.url.substr(1)
  const project = await projects.find(p => p.name === _name)
  if (!project) {
    throw createError({ statusCode: 404, message: 'project not found' })
  }
  const rawReadme = await $fetch('https://raw.githubusercontent.com/' + project.repository + '/master/README.md')
  const readme = await remark().use(remarkHtml).process(rawReadme).then(f => f.toString())

  return {
    project,
    readme
  }
}
