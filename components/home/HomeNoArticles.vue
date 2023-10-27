<script lang="ts" setup>
const { data } = await useAsyncData('no-articles', () => queryContent('/_no-articles').only('body').findOne())
</script>

<template>
  <AppContent v-if="data" class="mx-auto">
    <ContentRenderer :value="data" class="px-8 py-12 md:py-20 flex flex-col gap-4 text-zinc-700 text-center" />
  </AppContent>
</template>

<style scoped>
:deep(p) {
  margin: 0;
}
</style>
