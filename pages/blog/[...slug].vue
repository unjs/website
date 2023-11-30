<script lang="ts" setup>
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
  title: `${page.value?.title} ${site.separator} Blog`,
  description: page.value?.description,
  ogDescription: page.value?.description,
})

// TODO: Add og-image

const { data: packages } = await useAsyncData(`packages:${page.value?.packages.join(':')}`, () => queryContent('/packages/').only(['_path', 'title']).where({ _path: { $containsAny: page.value?.packages } }).find(), { watch: [() => page.value?.packages], default: () => [] }) as { data: Ref<{ _path: string; title: string }[]> }
</script>

<template>
  <Main v-if="page">
    <Prose :toc="page.body?.toc">
      <template #header>
        <ProseHeaderArticle
          v-if="page.title"
          :title="page.title"
          :date="page.publishedAt"
          :categories="page.categories"
          :authors="page.authors"
        />
      </template>

      <ContentRenderer :value="page" />

      <template #nav>
        <template v-if="packages">
          <UDivider />
          <ArticleProseNavGroupPackages :packages="packages" />
        </template>
        <UDivider />
        <ArticleProseNavGroupCommunity :filename="page._file" />
      </template>
    </Prose>
  </Main>
</template>
