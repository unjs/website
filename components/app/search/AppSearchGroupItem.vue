<script lang="ts" setup>
import type { SearchDisplayItem } from '~/types/search'

defineProps<{
  active: boolean
  child?: boolean
  last?: boolean
  item: SearchDisplayItem
}>()
</script>

<template>
  <NuxtLink :to="item.id" :class="{ 'pl-5': child, 'bg-primary/30': active }" class="px-2 h-14 rounded-lg flex items-center gap-2 transition ease-in">
    <svg v-if="child && !last" width="11" height="34" viewBox="0 0 11 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1V17M1 17H10.1429M1 17V33" class="stroke-zinc-400" stroke-linecap="round" />
    </svg>

    <svg v-if="child && last" width="11" height="33" viewBox="0 0 11 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1V15C1 16.1046 1.89543 17 3 17H10.1429" class="stroke-zinc-400" stroke-linecap="round" />
    </svg>

    <span v-if="item.level === 0" class="i-heroicons-document-text-20-solid w-6 h-6 block text-zinc-900" />
    <span v-else class="i-heroicons-hashtag-20-solid h-5 w-5 block text-zinc-700" />

    <span class="flex flex-col">
      <span class="text-zinc-900 font-semibold">
        {{ item.title }}
      </span>
      <span v-if="item.level > 0" class="text-zinc-400 text-sm">
        {{ item.titles[0] }}
      </span>
    </span>
  </NuxtLink>
</template>
