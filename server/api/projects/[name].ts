import { projects } from '../../data/projects'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  const { name } = event.context.params
  const project = projects.find(p => p.name === name)
  if (!project) {
    throw createError({ statusCode: 404, message: 'Project not found' })
  }
  const rawReadme = await $fetch<string>(`https://raw.githubusercontent.com/${project.repository}/master/README.md`)
  const readme = await remark()
    .use(remarkHtml)
    .process(rawReadme)
    .then(f => f.toString())

  console.log(readme)

  return {
    project,
    readme
  }
})
