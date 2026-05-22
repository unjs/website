<script lang="ts" setup>
defineProps<{
  value: number
  label: string
}>()
</script>

<template>
  <div class="flex flex-col justify-center lg:justify-start gap-2">
    <div class="text-center lg:text-start text-7xl font-bold">
      {{ formatNumber(value, 0) }}
    </div>
    <div class="text-center lg:text-start text-gray-500 dark:text-gray-400">
      {{ label }}
    </div>
  </div>
</template>
