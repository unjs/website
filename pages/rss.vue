<script lang="ts" setup>
import { joinURL } from 'ufo'

const route = useRoute()

const { data: page, error } = await useAsyncData(route.path, () => queryContent(route.path).findOne())

if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Page not found',
    fatal: true,
  })
}

const site = useSiteConfig()

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description,
  ogImage: joinURL(site.url, '/og/rss.jpg'),
  twitterImage: joinURL(site.url, '/og/rss.jpg'),
})
</script>

<template>
  <Head>
    <SchemaOrgWebPage :type="['CollectionPage']" />
  </Head>
  <Main v-if="page">
    <Prose :toc="page.body?.toc">
      <template #header>
        <ProseHeaderArticle
          v-if="page.title"
          :title="page.title"
        />
      </template>

      <ContentRenderer :value="page" />
    </Prose>
  </Main>
</template>
