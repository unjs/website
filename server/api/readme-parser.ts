import { defineEventHandler, readBody } from 'h3'
import { parseContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const response = await $fetch<{ meta: { url: string }; file: { contents: string } }>(`https://ungh.cc/repos/unjs/${body.repo}/files/main/README.md`)

  const parsedContent = await parseContent(`${body.repo}:readme.md`, response.file.contents)

  return parsedContent
})
