<script lang="ts" setup>
defineProps<{
  name: string
  description: string
}>()
</script>

<template>
  <header class="grid grid-cols-[1.75rem_auto] md:grid-cols-[3rem_auto] items-center gap-x-3 gap-y-1 md:gap-x-5 md:gap-y-0">
    <img :src="toPackageLogo(name)" :alt="`Logo of ${name}`" width="48" height="48" class="w-7 h-7 md:w-12 md:h-12 row-span-2">
    <h1 class="dark:text-gray-50 text-2xl md:text-3xl font-bold tracking-wide">
      {{ name }}
    </h1>
    <p class="col-span-2 md:col-span-1 md:col-start-2 dark:text-gray-400 font-italic font-medium">
      {{ description }}
    </p>
  </header>
</template>
