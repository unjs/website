<script lang="ts" setup>
import { joinURL } from 'ufo'
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

const site = useSiteConfig()

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description,
  ogImage: joinURL(site.url, '/og/blog.jpg'),
  twitterImage: joinURL(site.url, '/og/blog.jpg'),
})

const { data: blog } = await useAsyncData('blog:articles', () => queryContent('/blog/').only(['_path', 'title', 'description', 'publishedAt', 'authors', 'packages']).sort({ publishedAt: -1 }).find(), { default: () => [] }) as { data: Ref<BlogPostCard[]> }

const authors = computed(() => blog.value.flatMap(item => item.authors).reduce((acc, author) => {
  if (!acc.find(item => item.name === author.name))
    acc.push(author)

  return acc
}, [] as Author[]))
const selectedAuthors = ref<string[]>([])

const packages = computed(() => blog.value.flatMap(item => item.packages).reduce((acc, pkg) => {
  if (!acc.find(item => item === pkg))
    acc.push(pkg)

  return acc
}, [] as string[]))
const selectedPackages = ref<string[]>([])

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

const { search, searchResults } = useSimpleSearch<BlogPostCard>(blog)

const filtered = computed(() => {
  if (!selectedAuthors.value.length && !selectedPackages.value.length)
    return searchResults.value

  return searchResults.value.filter((item) => {
    let value = true

    if (value && selectedAuthors.value.length)
      value = item.authors.some(author => selectedAuthors.value.includes(author.name))

    if (value && selectedPackages.value.length)
      value = item.packages.some(pkg => selectedPackages.value.includes(pkg))

    return value
  })
})

const results = sort(filtered)

function resetFilter() {
  search.value = ''
  selectedAuthors.value = []
  selectedPackages.value = []
  order.value = defaultOrder
  orderBy.value = defaultOrderBy
}
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
            <img src="/assets/header/blog.png" alt="Illustration" aria-hidden="true" class="absolute left-24 top-0 opacity-70 w-80">
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
