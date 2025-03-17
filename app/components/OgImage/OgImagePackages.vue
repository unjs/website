<script setup lang="ts">
defineProps<{
  title: string
  description: string
  packages: number
  monthlyDownloads: number
}>()
</script>

<template>
  <!-- Since we use Nuxt UI which replace color by some vars, we need to explicitly set a color. -->
  <div
    class="w-full h-full flex justify-between relative bg-[#111827] text-white"
  >
    <img src="/assets/header/ellipse.png" class="absolute top--64 right--64">
    <div class="pt-[80px] px-[60px] pb-[60px]">
      <div class="h-full w-full flex relative">
        <div class="h-full flex flex-col justify-between">
          <div class="flex flex-row justify-between items-start">
            <div class="flex flex-col items-start">
              <h1 class="mb-0 font-bold text-[56px] text-white">
                {{ title }}
              </h1>
              <p
                class="mt-4 text-[36px] text-[#9ca3af] max-w-[672px]"
              >
                {{ description }}
              </p>
            </div>
          </div>
          <div>
            <img src="/favicon.svg" class="rounded-sm h-[60px] w-[60px]">
          </div>
        </div>
        <div class="flex flex-col items-center justify-between">
          <div>
            <div class="text-[128px] font-bold">
              {{ packages }}
            </div>
            <span class="text-[#9ca3af] text-[36px] font-medium">Packages</span>
          </div>
          <div>
            <div class="text-[128px] font-bold">
              {{ formatNumber(monthlyDownloads, 0) }}
            </div>
            <span class="text-[#9ca3af] text-[36px] font-medium">Monthly Downloads</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
