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

const to = computed(() => {
  if (props.href.includes('.unjs.io'))
    return `${props.href}?utm_source=unjs.io&utm_medium=referral&utm_campaign=unjs.io`

  return props.href
})
</script>

<template>
  <NuxtLink
    :to="to"
    :target="target"
    :rel="rel"
  >
    <slot />
  </NuxtLink>
</template>
