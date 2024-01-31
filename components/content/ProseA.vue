<script setup lang="ts">
const props = defineProps<{
  href: string
  target?: string
  rel?: string
}>()

const rel = computed(() => {
  if (props.href.includes('.unjs.io'))
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
