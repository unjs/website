<script lang="ts" setup>
defineProps<{
  prefix: string
  title: string
  path: string
}>()
</script>

<template>
  <NuxtLink :to="`${path}?utm_source=unjs.io&utm_medium=home-hero`" class="group flex flex-wrap items-center justify-center gap-4">
    <span class="px-3 py-1 bg-primary/20 group-hover:bg-primary/25 dark:bg-primary/20 dark:group-hover:bg-primary/25 ring-1 ring-primary/90 dark:ring-primary/70 rounded-full text-sm text-gray-950 dark:text-gray-50 nowrap font-medium transition ease-in">
      {{ prefix }}
    </span>
    <span class="flex items-center gap-2 text-gray-500 group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-300 transition ease-in">
      <span class="text-left">{{ title }}</span>
      <span class="shrink-0 w-5 h-5 i-heroicons-chevron-right-20-solid" />
    </span>
  </NuxtLink>
</template>
