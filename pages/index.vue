<script lang="ts" setup>
const { data: page, error } = await useAsyncData('index', () => queryContent('/').findOne())

if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Page not found',
    fatal: true,
  })
}

useSeoMeta({
  titleTemplate: '%siteName: %pageTitle',
  title: 'Unleash JavaScript\'s Potential',
  description: page.value?.description,
})
defineOgImageComponent('OgImagePage', {
  title: 'UnJS',
  illustration: '/assets/header/dark/home.png',
})
</script>

<template>
  <main v-if="page" class="mb-24 lg:mb-[10rem]">
    <ContentRenderer :value="page" />
  </main>
</template>
