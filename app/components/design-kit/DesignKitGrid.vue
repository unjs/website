<script lang="ts" setup>
import { twMerge } from 'tailwind-merge'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  class: {
    type: [String, Object, Array] as PropType<any>,
    default: () => '',
  },
})

const gridClass = computed(() => {
  return twMerge('grid grid-cols-1 gap-4 md:grid-6 sm:grid-cols-2 lg:grid-cols-3', props.class)
})
</script>

<template>
  <div :class="gridClass">
    <slot />
  </div>
</template>
