<script lang="ts" setup>
defineProps<{
  prefix: string
  title: string
  path: string
}>()
</script>

<template>
  <NuxtLink :to="`${path}?utm_source=unjs.io&utm_medium=home-hero`" class="flex items-center gap-4">
    <span class="px-3 py-1 bg-zinc-900/10 border border-zinc-900/40 rounded-full text-sm text-zinc-900 nowrap font-medium">
      {{ prefix }}
    </span>
    <span class="flex items-center gap-2">
      <span class="text-left">{{ title }}</span>
      <span class="shrink-0 w-5 h-5 i-heroicons-chevron-right-20-solid" />
    </span>
  </NuxtLink>
</template>
