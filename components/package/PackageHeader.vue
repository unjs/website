<script lang="ts" setup>
defineProps<{
  name: string
  description: string
}>()
</script>

<template>
  <header grid="~ cols-[1.75rem_auto] md:cols-[3rem_auto] items-center" gap="x-3 y-1 md:x-5 md:y-0">
    <img :src="toPackageLogo(name)" :alt="`Logo of ${name}`" width="48" height="48" w-7 h-7 md="w-12 h-12 row-span-2">
    <h1 text="gray-900 2xl md:3xl" font="bold" tracking="wide">
      {{ name }}
    </h1>
    <p col-span-2 md="col-span-1 col-start-2" gray="gray-700" font="italic medium">
      {{ description }}
    </p>
  </header>
</template>
