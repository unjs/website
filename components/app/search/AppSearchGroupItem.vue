<script lang="ts" setup>
import type { SearchDisplayItem } from 'types/search'

defineProps<{
  active: boolean
  child?: boolean
  last?: boolean
  item: SearchDisplayItem
}>()
</script>

<template>
  <NuxtLink :to="item.id" p="x-2" h-14 rounded="2" flex="~ items-center" gap="2" :class="{ 'pl-5': child, 'bg-primary bg-op-20': active }" transition="~ ease-in duration-150">
    <svg v-if="child && !last" width="11" height="34" viewBox="0 0 11 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1V17M1 17H10.1429M1 17V33" stroke="gray-400" stroke-linecap="round" />
    </svg>

    <svg v-if="child && last" width="11" height="33" viewBox="0 0 11 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1V15C1 16.1046 1.89543 17 3 17H10.1429" stroke="gray-400" stroke-linecap="round" />
    </svg>

    <span v-if="item.level === 0" i="heroicons-document-text-20-solid" w-6 h-6 block text="gray-900" />
    <span v-else i="heroicons-hashtag-20-solid" w-5 h-5 block text="gray-700" />

    <span flex="~ col">
      <span text="gray-900" font="semibold">
        {{ item.title }}
      </span>
      <span v-if="item.level > 0" text="gray-400 sm">
        {{ item.titles[0] }}
      </span>
    </span>
  </NuxtLink>
</template>
