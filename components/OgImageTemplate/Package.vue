<script setup lang="ts">
// inherited attrs can mess up the satori parser
defineOptions({
  inheritAttrs: false,
})

defineProps<{
  owner: string
  repo: string
  description: string
}>()
</script>

<template>
  <div class="relative w-full pt-[12.5rem] pb-[6.25rem] px-[8.75rem] flex flex-col bg-white">
    <h1 class="my-0 text-9xl text-gray-900 font-normal flex flex-row gap-2">
      <span>{{ owner }}</span>
      <span>/</span>
      <span class="font-bold">{{ repo }}</span>
    </h1>
    <p class="mt-8 text-gray-500 text-[3.5rem] font-medium">
      {{ description }}
    </p>
    <div class="absolute bottom-0 left-0 right-0 h-8 bg-[#ECDC5A]" />
  </div>
</template>
