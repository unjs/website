<script setup lang="ts">
defineProps<{
  title: string
  description: string
  packageName: string
}>()
</script>

<template>
  <!-- Since we use Nuxt UI which replace color by some vars, we need to explicitly set a color. -->
  <div
    class="w-full h-full flex justify-between relative bg-[#111827] text-white"
  >
    <img src="/assets/header/ellipse.png" class="absolute top--64 right--64">
    <div class="pt-[80px] px-[60px] pb-[60px]">
      <div class="h-full w-full justify-between relative">
        <div class="flex flex-row justify-between items-start">
          <div class="w-full flex flex-col items-start">
            <span class="text-[#f9fafb] text-[24px] px-4 py-2 rounded-full bg-[#F2E78C]/20 border-1 border-[#F2E78C]/70">
              Examples
            </span>
            <div class="mt-6 w-full flex flex-row justify-between">
              <div>
                <h1 class="my-0 text-[76px] text-white font-normal">
                  unjs/<span class="font-bold">{{ packageName }}</span>
                </h1>
                <p
                  class="mt-4 text-[42px] text-[#9ca3af] max-w-[768px]"
                >
                  {{ description }}
                </p>
              </div>
              <img :src="`/assets/logos/${packageName}.svg`" class="rounded-sm h-[160px] w-[160px]">
            </div>
          </div>
        </div>
        <div>
          <img src="/favicon.svg" class="rounded-sm h-[60px] w-[60px]">
        </div>
      </div>
    </div>
  </div>
</template>
