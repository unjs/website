<script lang="ts" setup>
import type { BlogPostCard } from '~/types/blog'

useSeoMeta({
  ogImage: 'https://unjs.io/og/blog.jpg',
  twitterImage: 'https://unjs.io/og/blog.jpg',
})

const { page } = useContent()

const fields = ['_path', 'title', 'description', 'publishedAt', 'authors']
const { data: blog } = await useAsyncData('blog', () => queryContent('/blog/').only(fields).sort({ publishedAt: -1 }).find() as Promise<BlogPostCard[]>)

if (!blog.value) {
  throw createError({
    statusCode: 500,
    message: 'No blog found',
  })
}

const { search, searchResults } = useSimpleSearch(blog as Ref<BlogPostCard[]>, {
  idField: 'title',
  fields,
  storeFields: fields,
  searchOptions: {
    boost: {
      title: 2,
      description: 1,
    },
  },
})

const orderByOptions = [
  {
    id: 'title',
    label: 'Name',
  },
  {
    id: 'publishedAt',
    label: 'Published at',
  },
]
const { order, toggleOrder, orderBy, currentOrderBy, sort } = useOrder(-1, { init: 'publishedAt', options: orderByOptions })

const results = sort(searchResults)
</script>

<template>
  <Head>
    <SchemaOrgWebPage :type="['CollectionPage']" />
  </Head>
  <main class="my-6 md:my-10">
    <AppHero :title="page.title" :description="page.description" />

    <section class="mt-8">
      <h2 class="sr-only">
        Packages list
      </h2>

      <div class="p-4 rounded-lg ring-1 ring-zinc-200 bg-white flex items-center justify-between">
        <UInput
          v-model="search"
          color="white"
          variant="outline"
          name="search-article"
          placeholder="Search an article"
          icon="i-heroicons-magnifying-glass-solid"
        />
        <UButtonGroup size="sm" orientation="horizontal">
          <UButton
            :icon="order === 1 ? 'i-heroicons-bars-arrow-up-20-solid' : 'i-heroicons-bars-arrow-down-20-solid'"
            color="white"
            :title="order === 1 ? 'Ascending order' : 'Descending order'"
            @click="toggleOrder()"
          />
          <USelectMenu
            v-model="orderBy"
            class="w-32"
            :options="orderByOptions"
            color="white"
            placeholder="Order By"
            select-class="cursor-pointer"
            value-attribute="id"
            option-attribute="label"
          >
            <template #label>
              {{ currentOrderBy?.label }}
            </template>
          </USelectMenu>
        </UButtonGroup>
      </div>

      <ol v-if="blog" class="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 place-items-stretch">
        <li v-for="item in results" :key="item.title">
          <UCard as="article" :ui="{ base: 'h-full relative', divide: '', shadow: 'shadow-none hover:shadow-lg', rounded: 'rounded-xl', header: { base: 'flex gap-3 items-center', padding: 'py-0 pt-4 sm:px-4 sm:pt-4' }, body: { padding: 'p-4 sm:p-4' }, footer: { padding: 'py-0 pb-4 sm:px-4 sm:pb-4' } }">
            <template #header>
              <h3 class="text-xl font-semibold">
                <NuxtLink :to="item._path" class="absolute inset-0" />
                {{ item.title }}
              </h3>
            </template>

            <p class="text-zinc-500">
              {{ item.description }}
            </p>

            <template #footer>
              <dl class="text-zinc-500 text-sm flex flex-row justify-between items-center">
                <dt class="sr-only">
                  Published on
                </dt>
                <dd>
                  <time :datetime="toISODateString(item.publishedAt)">
                    {{ toLocaleDateString(item.publishedAt) }}
                  </time>
                </dd>
                <dt class="sr-only">
                  Authors
                </dt>
                <dd>
                  <ul class="flex gap-2">
                    <li v-for="author in item.authors" :key="author._id">
                      <UAvatar :src="author.picture" :alt="author.name" size="xs" />
                    </li>
                  </ul>
                </dd>
              </dl>
            </template>
          </UCard>
        </li>
        <li v-if="!results.length" class="col-span-full">
          <p class="text-center text-zinc-500">
            No articles found
          </p>
        </li>
      </ol>
    </section>
  </main>
</template>
