<script setup lang="ts">
/**
 * @credits Nuxt SEO <https://nuxtseo.com/>
 */

withDefaults(
  defineProps<{
    title?: string
    description?: string
    theme?: string
  }>(),
  {
    title: 'title',
  },
)
</script>

<template>
  <div
    class="w-full h-full flex justify-between relative text-white"
  >
    <img src="/og/og_bg.png" class="absolute inset-0 w-full h-full">
    <div class="p-[60px]">
      <div class="h-full w-full justify-between relative">
        <div class="flex flex-row justify-between items-start">
          <div class="flex flex-col w-full">
            <h1 class="m-0 font-bold mb-[30px] text-[72px] text-white">
              {{ title.slice(0, 120) }}
            </h1>
            <p
              v-if="description"
              class="text-[36px] text-white opacity-85"
            >
              {{ description.slice(0, 200) }}
            </p>
          </div>
        </div>
        <div class="flex justify-start items-start text-left pb-2">
          <img src="/favicon.svg" height="100">
        </div>
      </div>
    </div>
  </div>
</template>
