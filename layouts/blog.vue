<script lang="ts" setup>
import type { BlogPostCard } from '~/types/blog'

const { page } = useContent()

const { data: blog } = await useAsyncData('blog', () => queryContent('/blog/').only(['_path', 'cover', 'title', 'description', 'publishedAt', 'authors']).sort({ publishedAt: -1 }).find() as Promise<BlogPostCard[]>)

if (!blog.value) {
  throw createError({
    statusCode: 500,
    message: 'No blog found',
  })
}

const search = ref('')
const searchDebounced = refDebounced(search, 150)

const searchResults = useMiniSearch(searchDebounced, blog, {
  idField: 'title',
  fields: ['title', 'description'],
  storeFields: ['title', 'description', '_path'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.2,
  },
})

const order = ref<1 | -1>(1)
const toggleOrder = function () {
  order.value = order.value === 1 ? -1 : 1
}
const orderByOptions = [
  {
    id: 'title',
    label: 'Name',
  },
]
const orderBy = ref<string>('title')
const currentOrderBy = computed(() => orderByOptions.find(option => option.id === orderBy.value))

const results = computed(() => {
  const currentBlog = searchDebounced.value ? searchResults.value : blog.value

  if (!orderBy.value)
    return currentBlog


  return currentBlog.sort((a, b) => {
    const aTitle = a.title.toLowerCase()
    const bTitle = b.title.toLowerCase()

    if (aTitle < bTitle)
      return -1 * order.value


    if (aTitle > bTitle)
      return 1 * order.value


    return 0
  })
})
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
          name="search-packages"
          placeholder="Search a package"
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
      </ol>
    </section>
  </main>
</template>
