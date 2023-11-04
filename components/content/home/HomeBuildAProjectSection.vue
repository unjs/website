<script lang="ts" setup>
const { data } = await useAsyncData('build-last-3', () => queryContent('/build/').limit(3).find())
</script>

<template>
  <HomeSection>
    <template #eyebrow>
      <ContentSlot :use="$slots.eyebrow" unwrap="p" />
    </template>
    <template #title>
      <ContentSlot :use="$slots.title" unwrap="p" />
    </template>
    <template #subtitle>
      <ContentSlot :use="$slots.subtitle" unwrap="p" />
    </template>
    <HomeNoArticles v-if="data && data.length === 0" />
  </HomeSection>
</template>
