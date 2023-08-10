<script lang="ts" setup>
const { data } = await useAsyncData('no-articles', () => queryContent('/_no-articles').findOne())
</script>

<template>
  <div v-if="data" prose prose-gray mx-auto>
    <ContentRenderer :value="data" px-8 py-12 md:py-20 flex="~ col" gap-4 text-gray-700 text-center />
  </div>
</template>

<style scoped>
:deep(p) {
  margin: 0;
}
</style>
