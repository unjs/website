<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <!-- Since we use Nuxt UI which replace color by some vars, we need to explicitely set a color. -->
  <div
    class="w-full h-full flex justify-between relative bg-[#111827] text-white"
  >
    <img src="/assets/header/ellipse.png" class="absolute top--64 right--64">
    <div class="pt-[80px] px-[60px] pb-[60px]">
      <div class="h-full w-full justify-between relative">
        <div class="flex flex-row justify-between items-start">
          <div class="flex flex-col items-start">
            <span class="text-[#f9fafb] text-[24px] px-4 py-2 rounded-full bg-[#F2E78C]/20 border-1 border-[#F2E78C]/70">
              Blog
            </span>
            <h1 class="mt-6 mb-0 font-bold text-[56px] text-white">
              {{ title }}
            </h1>
            <p
              class="mt-4 text-[36px] text-[#9ca3af] max-w-[768px]"
            >
              {{ description }}
            </p>
          </div>
        </div>
        <div class="">
          <img src="/favicon.svg" class="rounded-sm h-[60px] w-[60px]">
        </div>
      </div>
    </div>
  </div>
</template>
