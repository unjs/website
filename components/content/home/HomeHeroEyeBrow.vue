<script lang="ts" setup>
defineProps<{
  prefix: string
  title: string
  path: string
}>()
</script>

<template>
  <NuxtLink :to="`${path}?utm_source=unjs.io&utm_medium=home-hero`" flex="~" gap-4>
    <span p="x-3 y-1" bg="gray-900 opacity-10" border="~ gray-900 opacity-40" rounded="full" text="sm gray-900" font="medium">
      {{ prefix }}
    </span>
    <span flex="~ row items-center" gap-2>
      {{ title }}
      <span i-heroicons-chevron-right-20-solid w-5 h-5 />
    </span>
  </NuxtLink>
</template>
