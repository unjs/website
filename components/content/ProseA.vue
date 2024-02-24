<script setup lang="ts">
const props = defineProps<{
  href: string
  target?: string
  rel?: string
}>()

const whiteList = [
  'unjs.io',
  'nuxt.com',
]

const rel = computed(() => {
  if (whiteList.some(domain => props.href.includes(domain)))
    return 'noopener'

  return 'noopener noreferrer'
})
</script>

<template>
  <NuxtLink
    :href="href"
    :target="target"
    :rel="rel"
  >
    <slot />
  </NuxtLink>
</template>
