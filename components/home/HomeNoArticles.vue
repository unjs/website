<script lang="ts" setup>
const { data } = await useAsyncData('no-articles', () => queryContent('/_no-articles').only('body').findOne())
</script>

<template>
  <ProseContent v-if="data" class="mx-auto">
    <ContentRenderer :value="data" class="px-8 py-12 md:py-20 flex flex-col gap-4 dark:text-gray-400 text-center" />
  </ProseContent>
</template>

<style scoped>
:deep(p) {
  margin: 0;
}
</style>
