<script lang="ts" setup>
const route = useRoute()

const { data: page, error } = await useAsyncData(route.path, () => queryContent(route.path).findOne())

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    message: error.value.message,
    fatal: true,
  })
}

useSeoMeta({
  title: page.value?.title,
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description,
})

defineOgImageComponent('OgImagePage', {
  title: page.value?.title,
  description: page.value?.description,
  illustration: '/assets/header/dark/blog.png',
})

const {
  fetchBlogArticles,
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
} = useBlog()

await fetchBlogArticles()

// Track search to analytics
watchDebounced(q, () => {
  if (!q.value)
    return

  useTrackEvent('Blog Search', { props: { query: q.value } })
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
            <AppColorModeImage light="/assets/header/light/blog.png" dark="/assets/header/dark/blog.png" alt="Illustration" aria-hidden="true" class="absolute left-24 top-0 opacity-70 w-80" />
          </div>
        </template>
      </PageHeader>
    </template>

    <section>
      <h2 class="sr-only">
        List of blog posts
      </h2>

      <ListTopBar v-model:search="q" v-model:order="order" v-model:order-by="orderBy" search-placeholder="Search an article" :order-by-options="orderByOptions" @reset="reset">
        <template #right>
          <USelectMenu
            v-model="authors"
            :options="authorsOptions"
            color="gray"
            variant="outline"
            size="lg"
            placeholder="Authors"
            select-class="cursor-pointer"
            value-attribute="name"
            option-attribute="name"
            multiple
          >
            <template #option="{ option: author }">
              <UAvatar size="2xs" :src="author.picture" :alt="`Avatar of ${author.name}`" />
              <span class="truncate">
                {{ author.name }}
              </span>
            </template>
          </USelectMenu>
          <USelectMenu
            v-model="packages"
            :options="packagesOptions"
            color="gray"
            variant="outline"
            size="lg"
            placeholder="Packages"
            select-class="cursor-pointer"
            multiple
          >
            <template #option="{ option: pkg }">
              <UAvatar size="2xs" :src="`/assets/logos/${pkg}.svg`" :alt="`Icon of ${pkg}`" />
              <span class="truncate">
                {{ pkg }}
              </span>
            </template>
          </USelectMenu>
          <USelectMenu
            v-model="categories"
            :options="categoriesOptions"
            color="gray"
            variant="outline"
            size="lg"
            placeholder="Categories"
            select-class="cursor-pointer"
            multiple
          >
            <template #option="{ option: category }">
              <span class="truncate capitalize">
                {{ category }}
              </span>
            </template>
          </USelectMenu>
        </template>
      </ListTopBar>

      <ListGrid class="mt-8">
        <ListGridItem v-for="item in articles" :key="item._path">
          <BlogCard
            :path="item._path!"
            :title="item.title"
            :description="item.description"
            :published-at="item.publishedAt"
            :authors="item.authors"
          />
        </ListGridItem>
        <ListGridEmpty v-if="articles && articles.length === 0">
          No articles found
        </ListGridEmpty>
      </ListGrid>
    </section>
  </Main>
</template>
