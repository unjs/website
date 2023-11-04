<script lang="ts" setup>
defineProps<{
  filename?: string
}>()
</script>

<template>
  <ProseNavGroup icon="i-heroicons-user-group-solid">
    <template #title>
      Community
    </template>
    <template #links>
      <slot name="before" />
      <ProseNavGroupLink
        to="https://github.com/unjs/website" target="_blank"
        icon="i-simple-icons-github"
      >
        Star on GitHub
      </ProseNavGroupLink>
      <ProseNavGroupLink v-if="filename" :to="toEditPage(filename)" target="_blank" icon="i-heroicons-pencil-square-20-solid">
        Edit this page
      </ProseNavGroupLink>
    </template>
  </ProseNavGroup>
</template>
