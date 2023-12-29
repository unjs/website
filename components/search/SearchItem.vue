<script lang="ts" setup>
import type { SearchDisplayItem } from '~/types/search'

defineProps<{
  active: boolean
  child?: boolean
  last?: boolean
  item: SearchDisplayItem
}>()

function getIcon(path: string) {
  if (path.includes('#'))
    return 'i-heroicons-hashtag'

  if (path.includes('/blog/'))
    return 'i-heroicons-book-open'

  return 'i-heroicons-document-text'
}
</script>

<template>
  <NuxtLink :to="item.id" :class="{ 'pl-3 font-medium text-gray-700 dark:text-gray-400': child, 'font-semibold text-gray-950 dark:text-gray-50': !child, 'bg-primary/30 dark:bg-primary/30': active }" class="relative px-2 py-1 rounded-md flex items-center gap-2 transition ease-in">
    <span v-if="child && !last">
      ├─
    </span>
    <span v-else-if="child && last">
      └─
    </span>

    <img
      v-if="item.id.includes('/packages/')" :src="`/assets/logos/${item.title}.svg`"
      class="w-5 h-5"
    >
    <span v-else-if="!child" class="w-5 h-5 block text-gray-950 dark:text-gray-50" :class="getIcon(item.id)" />

    <span class="flex flex-col">
      <span>
        {{ item.title }}
      </span>
      <span v-if="!child && item.level > 0" class="text-gray-500 dark:text-gray-400 text-sm">
        {{ item.titles[0] }}
      </span>
    </span>
  </NuxtLink>
</template>
