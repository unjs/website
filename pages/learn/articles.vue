<script setup lang="ts">
const { data: page, error } = await useAsyncData('content:learn', () => queryContent('/learn').findOne())

if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Page not found',
    fatal: true,
  })
}

useSeoMeta({
  title: page.value?.title,
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description,
})

const {
  fetchArticles,
  updateQuery,
  reset,
  articles,
  q,
  categories,
  categoriesOptions,
  packages,
  packagesOptions,
  authors,
  authorsOptions,
  order,
  orderBy,
  orderByOptions,
} = useLearnArticles()

await fetchArticles()

// Track search to analytics
watchDebounced(q, () => {
  if (!q.value)
    return
  useTrackEvent('Learn Search', { props: { query: q.value } })
}, { debounce: 500 })
</script>

<template>
  <Head>
    <SchemaOrgWebPage :type="['CollectionPage']" />
  </Head>
  <Main v-if="page">
    <template #header>
      <PageHeader :title="page.title" :description="page.description">
        <template #right>
          <div>
            <AppColorModeImage light="/assets/header/light/learn.png" dark="/assets/header/dark/learn.png" alt="Illustration" aria-hidden="true" class="absolute left-24 top-0 opacity-70 w-80" />
          </div>
        </template>
      </PageHeader>
    </template>

    <section>
      <h2 class="sr-only">
        List of learn articles
      </h2>

      <ListTopBar
        :search="q" :order="order" :order-by="orderBy" search-placeholder="Search an article" :order-by-options="orderByOptions" @reset="reset"
        @update:search="updateQuery({ q: $event })" @update:order="updateQuery({ order: $event })" @update:order-by="updateQuery({ orderBy: $event })"
      >
        <template #right>
          <USelectMenu
            :model-value="authors"
            :options="authorsOptions"
            color="gray"
            variant="outline"
            size="lg"
            placeholder="Authors"
            select-class="cursor-pointer"
            value-attribute="name"
            option-attribute="name"
            multiple
            @update:model-value="updateQuery({ authors: $event })"
          >
            <template #option="{ option: author }">
              <UAvatar size="2xs" :src="author.picture" :alt="`Avatar of ${author.name}`" />
              <span class="truncate">
                {{ author.name }}
              </span>
            </template>
          </USelectMenu>
          <USelectMenu
            :model-value="packages"
            :options="packagesOptions"
            color="gray"
            variant="outline"
            size="lg"
            placeholder="Packages"
            select-class="cursor-pointer"
            multiple
            @update:model-value="updateQuery({ packages: $event })"
          >
            <template #option="{ option: pkg }">
              <UAvatar size="2xs" :src="`/assets/logos/${pkg}.svg`" :alt="`Icon of ${pkg}`" />
              <span class="truncate">
                {{ pkg }}
              </span>
            </template>
          </USelectMenu>
          <USelectMenu
            :model-value="categories"
            :options="categoriesOptions"
            color="gray"
            variant="outline"
            size="lg"
            placeholder="Categories"
            select-class="cursor-pointer"
            value-attribute="id"
            option-attribute="label"
            multiple
            @update:model-value="updateQuery({ 'categories[]': $event })"
          />
        </template>
      </ListTopBar>

      <ListGrid class="mt-8">
        <ListGridItem v-for="item in articles" :key="item._path">
          {{ item }}
          <!-- TODO: create card -->
        </ListGridItem>
        <ListGridEmpty v-if="articles && articles.length === 0">
          No articles found
        </ListGridEmpty>
      </ListGrid>
    </section>
  </Main>
</template>
