<script lang="ts" setup>
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

const props = defineProps<{
  github: {
    repo: string
    owner: string
  }
}>()

const { data: doc } = await useAsyncData<ParsedContent>(`${props.github.repo}:readme`, async () => $fetch('/api/readme-parser', {
  method: 'POST',
  cors: true,
  body: {
    repo: props.github.repo,
  },
}))
</script>

<template>
  <ContentRenderer :value="doc!">
    <template #empty>
      <div>Content is empty.</div>
    </template>
  </ContentRenderer>
</template>
