<script lang="ts" setup>
const { data } = await useAsyncData('footer-license', () => queryContent('/_footer-license').findOne())
</script>

<template>
  <template v-if="data">
    <ContentRenderer :value="data" />
  </template>
</template>
