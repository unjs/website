<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

defineProps<{
  dark: string
  light: string
}>()
</script>

<template>
  <img :src="light" class="dark:hidden" v-bind="$attrs">
  <img :src="dark" class="hidden dark:block" v-bind="$attrs">
</template>
