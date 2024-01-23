<script lang="ts" setup>
import type { Author, BlogPostCard } from '~/types/blog'
import type { OrderByOption } from '~/types/order'

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
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description,
})
useTrackPageview()

defineOgImageComponent('OgImagePage', {
  title: page.value?.title,
  description: page.value?.description,
  illustration: '/assets/header/dark/blog.png',
})

const fields = ['_path', 'title', 'description', 'publishedAt', 'authors', 'packages', 'categories']
const { data: blog } = await useAsyncData('blog:articles', () => queryContent('/blog/').only(fields).sort({ publishedAt: -1 }).find(), { default: () => [] }) as { data: Ref<BlogPostCard[]> }

const authors = computed(() => blog.value.flatMap(item => item.authors).reduce((acc, author) => {
  if (!acc.find(item => item.name === author.name))
    acc.push(author)

  return acc
}, [] as Author[]))
const selectedAuthors = ref<string[]>([])

const packages = computed(() => blog.value.flatMap(item => item.packages || []).reduce((acc, pkg) => {
  if (!acc.find(item => item === pkg))
    acc.push(pkg)

  return acc
}, [] as string[]))
const selectedPackages = ref<string[]>([])

const categories = computed(() => blog.value.flatMap(item => item.categories || []).reduce((acc, category) => {
  if (!acc.find(item => item === category))
    acc.push(category)

  return acc
}, [] as string[]))
const selectedCategories = ref<string[]>([])

const orderByOptions: OrderByOption[] = [
  {
    id: 'title',
    label: 'Name',
  },
  {
    id: 'publishedAt',
    label: 'Published at',
  },
]
const defaultOrder = -1
const defaultOrderBy = 'publishedAt'
const { order, orderBy, sort } = useSort<BlogPostCard>(defaultOrder, defaultOrderBy)

const { search, searchResults } = useSimpleSearch<BlogPostCard>(blog, {
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

const filtered = computed(() => {
  let results: BlogPostCard[] = searchResults.value

  /**
   * Authors
   */
  results = results.filter((item) => {
    if (!selectedAuthors.value.length)
      return true

    return item.authors.some(author => selectedAuthors.value.includes(author.name))
  })

  /**
   * Packages
   */
  results = results.filter((item) => {
    if (!selectedPackages.value.length)
      return true

    if (!item.packages)
      return false // Remove article that does not have packages when user filter on them

    return item.packages.some(pkg => selectedPackages.value.includes(pkg))
  })

  /**
   * Categories
   */
  results = results.filter((item) => {
    if (!selectedCategories.value.length)
      return true

    return item.categories.some(category => selectedCategories.value.includes(category))
  })

  return results
})

const results = sort(filtered)

function resetFilter() {
  search.value = ''
  selectedAuthors.value = []
  selectedPackages.value = []
  selectedCategories.value = []
  order.value = defaultOrder
  orderBy.value = defaultOrderBy
}

// Track search to analytics
watchDebounced(search, () => {
  if (!search.value)
    return

  useTrackEvent('Blog Search', { props: { query: search.value } })
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

      <ListTopBar v-model:search="search" v-model:order="order" v-model:order-by="orderBy" search-placeholder="Search an article" :order-by-options="orderByOptions" @reset="resetFilter">
        <template #right>
          <USelectMenu
            v-model="selectedAuthors"
            :options="authors"
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
            v-model="selectedPackages"
            :options="packages"
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
            v-model="selectedCategories"
            :options="categories"
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
        <ListGridItem v-for="item in results" :key="item._path">
          <BlogCard
            :path="item._path!"
            :title="item.title"
            :description="item.description"
            :published-at="item.publishedAt"
            :authors="item.authors"
          />
        </ListGridItem>
        <ListGridEmpty v-if="results && results.length === 0">
          No articles found
        </ListGridEmpty>
      </ListGrid>
    </section>
  </Main>
</template>
