<script setup lang="ts">
const route = useRoute()

const { data: page, error } = await useAsyncData(route.path, () => queryContent(route.path).findOne())

if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Page not found',
    fatal: true,
  })
}

useHead({
  templateParams: {
    subtitle: 'Learn',
  },
  titleTemplate: '%s %separator %subtitle %separator %siteName',
})
useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
  articlePublishedTime: page.value?.publishedAt,
  articleModifiedTime: page.value?.modifiedAt,
})
useSchemaOrg([
  defineArticle({
    '@type': 'TechArticle',
    'datePublished': page.value?.publishedAt,
    'dateModified': page.value?.modifiedAt,
    'author': page.value?.authors?.map(author => ({
      name: author.name,
      url: `https://x.com/${author.twitter}`,
    })),
  }),
])
defineOgImageComponent('OgImageLearn')

const packages = ref<{ _path: string, title: string }[] | null>()
if (page.value?.packages) {
  const { data } = await useAsyncData(`packages:${page.value?.packages.join(':')}`, () => queryContent('/packages/').only(['_path', 'title']).where({ _path: { $containsAny: page.value?.packages } }).find(), { watch: [() => page.value?.packages], default: () => [] }) as { data: Ref<{ _path: string, title: string }[]> }

  if (data.value)
    packages.value = data.value
}
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
          <ProseNavPackages :packages="packages" />
        </template>
        <UDivider />
        <template v-if="page.resources">
          <ProseNavGroup icon="i-heroicons-beaker-solid">
            <template #title>
              Resources
            </template>
            <template #links>
              <ProseNavGroupLink v-for="resource in page.resources" :key="resource.label" :to="resource.to" target="_blank" :icon="resource.icon">
                {{ resource.label }}
              </ProseNavGroupLink>
            </template>
          </ProseNavGroup>
          <UDivider />
        </template>
        <ProseNavCommunity :filename="page._file" />
      </template>
    </Prose>
  </Main>
</template>
