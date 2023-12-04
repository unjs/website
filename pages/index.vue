<script lang="ts" setup>
import { joinURL } from 'ufo'

const { data: page, error } = await useAsyncData('index', () => queryContent('/').findOne())

if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Page not found',
    fatal: true,
  })
}

const site = useSiteConfig()

useSeoMeta({
  title: null,
  description: page.value?.description,
  ogDescription: page.value?.description,
  ogImage: joinURL(site.url, '/og/home.jpg'),
  twitterImage: joinURL(site.url, '/og/home.jpg'),
})
</script>

<template>
  <main v-if="page" class="mb-8 lg:mb-16">
    <ContentRenderer :value="page" />
  </main>
</template>
