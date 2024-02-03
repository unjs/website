<script lang="ts" setup>
import { NuxtLink } from '#components'

const props = defineProps<{
  title?: 'Tip' | 'Note' | 'Important' | 'Warning' | 'Caution'
  icon?: string
  to?: string
}>()

const icon = computed(() => {
  if (props.icon)
    return props.icon

  switch (props.title) {
    case 'Tip':
      return 'i-ph-lightbulb'
    case 'Note':
      return 'i-ph-info'
    case 'Important':
      return 'i-ph-warning-diamond'
    case 'Warning':
      return 'i-ph-warning'
    case 'Caution':
      return 'i-ph-warning-octagon'
  }
})

const iconColor = computed(() => {
  switch (props.title) {
    case 'Tip':
      return 'text-green-600 dark:text-green-400'
    case 'Note':
      return 'text-blue-600 dark:text-blue-400'
    case 'Important':
      return 'text-violet-600 dark:text-violet-400'
    case 'Warning':
      return 'text-amber-600 dark:text-amber-400'
    case 'Caution':
      return 'text-red-600 dark:text-red-400'
    default:
      return 'text-gray-800 dark:text-gray-200'
  }
})

const borderColor = computed(() => {
  switch (props.title) {
    case 'Tip':
      return 'dark:bg-green-800/40 bg-green-200/40 dark:border-green-600/30 border-green-400/30'
    case 'Note':
      return 'dark:bg-blue-800/40 bg-blue-200/40 dark:border-blue-600/30 border-blue-400/30'
    case 'Important':
      return 'dark:bg-violet-800/30 bg-violet-200/50 dark:border-violet-600/30 border-violet-400/30'
    case 'Warning':
      return 'dark:bg-amber-800/40 dark:border-amber-800/40 bg-amber-200/30 border-amber-400/30'
    case 'Caution':
      return 'dark:bg-red-800/40 bg-red-200/40 dark:border-red-600/30 border-red-400/30'
    default:
      return 'border-gray-300 bg-gray-300/20 dark:border-gray-700 dark:bg-gray-700/20'
  }
})

const hoverBorderColor = computed(() => {
  switch (props.title) {
    case 'Tip':
      return 'dark:hover:border-green-600/50 hover:border-green-400/50'
    case 'Note':
      return 'hover:border-blue-400/50 dark:hover:border-blue-600/50'
    case 'Important':
      return 'dark:hover:border-violet-600/50 hover:border-violet-400/50'
    case 'Warning':
      return 'dark:hover:border-amber-600/50 hover:border-amber-400/50'
    case 'Caution':
      return 'dark:hover:border-blue-600/50 hover:border-blue-400/50'
    default:
      return 'hover:bg-gray-300/40 hover:dark:border-gray-400 hover:dark:bg-gray-700/50'
  }
})
</script>

<template>
  <component :is="to ? NuxtLink : 'div'" :to="to" class="not-prose block my-4 px-4 py-3 focus:outline-none border rounded-md text-sm text-gray-950 dark:text-white" :class="[{ 'border-dashed hover:border-solid': to }, borderColor, to ? hoverBorderColor : '']">
    <span :class="[icon, iconColor]" class="w-4 h-4 inline-flex items-center align-sub mr-2" aria-hidden="true" />
    <slot />
  </component>
</template>
