<!-- eslint-disable vue/no-v-html -->
<script setup lang="ts">
/**
 * Credit to Nuxt
 * https://github.com/nuxt/nuxt.com/blob/main/components/content/ReadMore.vue
 * https://github.com/nuxt/nuxt.com/blob/main/utils/index.ts
 */
import { splitByCase, upperFirst } from 'scule'

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
    default: '',
  },
})

function createBreadcrumb(link: string = 'Missing link') {
  if (link.startsWith('http'))
    return link

  return link.split('/').filter(Boolean).map((part) => {
    return splitByCase(part.replace(/\d{4}-\d{2}-\d{2}/, '')).map(p => upperFirst(p)).join(' ')
  }).join(' > ').replace('Api', 'API')
}
// Guess title from link!
const computedTitle = computed<string>(() => props.title || createBreadcrumb(props.to))
</script>

<template>
  <AppAlert icon="i-ph-bookmark-simple-duotone" :to="to">
    <MDCSlot unwrap="p">
      Read more in <span class="font-bold" v-html="computedTitle" />.
    </MDCSlot>
  </AppAlert>
</template>
