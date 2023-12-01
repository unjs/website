<script lang="ts" setup>
defineProps<{
  prefix: string
  title: string
  path: string
}>()
</script>

<template>
  <NuxtLink :to="`${path}?utm_source=unjs.io&utm_medium=home-hero`" class="group flex items-center gap-4">
    <span class="px-3 py-1 bg-gray-300/20 group-hover:bg-gray-300/40 dark:bg-gray-700/40 dark:group-hover:bg-gray-700/50 ring-1 ring-gray-300 dark:ring-gray-700 rounded-full text-sm text-gray-950 dark:text-gray-50 nowrap font-medium transition ease-in">
      {{ prefix }}
    </span>
    <span class="flex items-center gap-2 text-gray-500 group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-300 transition ease-in">
      <span class="text-left">{{ title }}</span>
      <span class="shrink-0 w-5 h-5 i-heroicons-chevron-right-20-solid" />
    </span>
  </NuxtLink>
</template>
