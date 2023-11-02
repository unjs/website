<script setup lang="ts">
import { withBase } from 'ufo'
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps<{
  withoutBorder?: boolean
  src?: string
  alt?: string
  width?: string | number
  height?: string | number
}>()

const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//'))
    return withBase(props.src, useRuntimeConfig().app.baseURL)

  return props.src
})
</script>

<template>
  <img :src="refinedSrc" :alt="alt" :width="width" :height="height" :class="{ 'border border-gray-300 rounded-[0.875rem]': !withoutBorder }">
</template>

<style scoped>
a img {
  display: inline;
  border-radius: 0;
  border: none;
}
</style>
