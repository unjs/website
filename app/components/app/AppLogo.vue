<script lang="ts" setup>
defineProps<{
  contentClass?: string
}>()
</script>

<template>
  <div class="flex items-center gap-2 text-xl">
    <img src="/favicon.svg" aria-hidden="true" class="w-7 h-7 rounded-[2px]">
    <span class="font-bold mt-[2px] dark:text-gray-50" :class="contentClass">UnJS</span>
  </div>
</template>
