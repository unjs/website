<script setup lang="ts">
// inherited attrs can mess up the satori parser
defineOptions({
  inheritAttrs: false,
})

defineProps<{
  owner: string
  repo: string
  description: string
  logo: string
}>()
</script>

<template>
  <!-- This use Tailwind from Satori, not Uno CSS -->
  <div class="w-full flex flex-col bg-white">
    <div class="grow pt-[12.5rem] pb-[8.25rem] px-[6.75rem] flex flex-col justify-between">
      <div class="flex flex-row justify-between">
        <div>
          <h1 class="my-0 text-9xl text-gray-900 font-normal flex flex-row">
            <span>{{ owner }}</span>
            <span class="ml-2">/</span>
            <span class="ml-2 font-bold">{{ repo }}</span>
          </h1>
          <p class="mt-20 text-gray-500 text-[3.5rem] font-medium">
            {{ description }}
          </p>
        </div>
        <img :src="logo" width="300" height="300" class="ml-20 w-[300px] h-[300px]">
      </div>
      <div class="flex flex-row justify-end">
        <img src="/favicon.svg" width="100" height="100" class="rounded-[0.25rem] w-[100px] h-[100px]">
      </div>
    </div>
    <div class="w-full h-8 bg-[#ECDC5A]" />
  </div>
</template>
