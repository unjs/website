<script lang="ts" setup>
const { data } = await useAsyncData('content:footer-license', () => queryContent('/_footer-license').only('body').findOne())
</script>

<template>
  <template v-if="data">
    <ContentRenderer :value="data" />
  </template>
</template>
