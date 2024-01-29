<script lang="ts" setup>
const { data, error } = await useAsyncData('blog:categories', () => queryContent('/blog/').only(['categories']).find())

if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Page not found',
    fatal: true,
  })
}

const title = 'Categories'
const description = 'Blog\'s articles categories'
useSeoMeta({
  title,
  description,
})
useSchemaOrg([
  defineWebPage({
    '@type': 'CollectionPage',
  }),
])
defineOgImageComponent('OgImagePage')

const categories = computed(() => {
  const dedupeCategories = new Set<string>()

  if (data.value) {
    for (const item of data.value) {
      for (const category of item.categories)
        // Deduplicate categories
        dedupeCategories.add(category)
    }
  }

  return Array.from(dedupeCategories).sort()
})
</script>

<template>
  <Main v-if="data">
    <template #header>
      <PageHeader :title="title" :description="description" />
    </template>

    <section>
      <h2 class="sr-only">
        List of categories
      </h2>
      <AppListGrid class="mt-8">
        <AppListGridItem v-for="category in categories" :key="category">
          <UCard as="article" :ui="{ base: 'h-full relative flex flex-col', background: 'bg-gray-300/20 hover:bg-gray-300/40 dark:bg-gray-700/40 hover:dark:bg-gray-700/60', divide: '', shadow: 'shadow-sm', ring: 'dark:highlight-white/10', rounded: 'rounded-lg', header: { base: 'flex gap-3 items-center', padding: 'py-0 pt-4 pb-4 sm:px-4 sm:pt-4 sm:pb-4' }, body: { base: 'grow', padding: 'p-0 sm:p-0' } }">
            <template #header>
              <h3 class="text-xl font-semibold dark:text-gray-50">
                <NuxtLink :to="`/categories/${category}`" class="absolute inset-0" />
                {{ category }}
              </h3>
            </template>
          </UCard>
        </AppListGridItem>
      </AppListGrid>
    </section>
  </Main>
</template>
