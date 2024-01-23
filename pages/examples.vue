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

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
})
useSchemaOrg([
  defineWebPage({
    '@type': 'CollectionPage',
  }),
])
defineOgImageComponent('OgImagePage')

const { data: packages, error: packagesError } = await useAsyncData('content:packages-examples', () => queryContent('/packages/').only(['_path', 'title', 'description', 'examples']).where({ examples: { link: { $ne: null } } }).sort({ title: 1 }).find())

if (packagesError.value) {
  throw createError({
    statusCode: 404,
    message: 'Packages not found',
    fatal: true,
  })
}
</script>

<template>
  <Main v-if="page">
    <template #header>
      <PageHeader :title="page.title" :description="page.description" />
    </template>

    <section>
      <h2 class="sr-only">
        List of packages with examples
      </h2>

      <ListGrid class="mt-8">
        <ListGridItem v-for="item in packages" :key="item.title">
          <PackageCard
            :title="item.title"
            :description="item.description"
            :path="item.examples.page ? `/packages/${item.title}/examples?utm_source=unjs.io&utm_medium=package-card` : item.examples.link"
          />
        </ListGridItem>
      </ListGrid>
    </section>
  </Main>
</template>
