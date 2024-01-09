<script lang="ts" setup>
import { joinURL } from 'ufo'
import type { OrderByOption } from '~/types/order'
import type { Package } from '~/types/package'

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
  ogImage: joinURL(site.url, '/og/packages.jpg'),
  twitterImage: joinURL(site.url, '/og/packages.jpg'),
})

const { data: packages } = await useFetch('/api/content/packages.json', { default: () => [] }) as { data: Ref<Package[]> }

const monthlyDownloads = computed(() => packages.value.reduce((acc, pkg) => {
  if (!pkg.monthlyDownloads)
    return acc

  acc += pkg.monthlyDownloads
  return acc
}, 0))

const orderByOptions: OrderByOption[] = [
  {
    id: 'title',
    label: 'Name',
  },
  {
    id: 'stars',
    label: 'Stars',
  },
  {
    id: 'monthlyDownloads',
    label: 'Monthly Downloads',
  },
  {
    id: 'contributors',
    label: 'Contributors',
  },
]
const defaultOrder = 1
const defaultOrderBy = 'title'
const { order, orderBy, sort } = useSort<Package>(defaultOrder, defaultOrderBy)

const { search, searchResults } = useSimpleSearch<Package>(packages, { idField: 'title', fields: ['title', 'description'], storeFields: ['title', 'description', 'path', 'stars', 'monthlyDownloads', 'contributors'], searchOptions: { boost: { title: 2, description: 1 } } })

const results = sort(searchResults)

function resetFilter() {
  search.value = ''
  order.value = defaultOrder
  orderBy.value = defaultOrderBy
}

// Track search to analytics
watchDebounced(search, () => {
  if (!search.value)
    return

  useTrackEvent('Packages Search', { props: { query: search.value } })
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
          <div class="flex justify-end gap-12 text-gray-500 dark:text-gray-400 font-medium text-xl">
            <div class="flex flex-col gap-2">
              <span class="text-gray-950 dark:text-gray-50 text-8xl font-extrabold">
                {{ packages!.length }}
              </span>
              <span>
                Packages
              </span>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-gray-950 dark:text-gray-50 text-8xl font-extrabold">
                {{ formatNumber(monthlyDownloads, 0) }}
              </span>
              <span>
                Monthly Downloads
              </span>
            </div>
          </div>
        </template>
      </PageHeader>
    </template>

    <section>
      <h2 class="sr-only">
        List of packages
      </h2>

      <ListTopBar v-model:search="search" v-model:order="order" v-model:order-by="orderBy" search-placeholder="Search a package" :order-by-options="orderByOptions" @reset="resetFilter" />

      <ListGrid class="mt-8">
        <ListGridItem v-for="item in results" :key="item._path">
          <PackageCard
            v-if="item.title && item.path"
            :title="item.title"
            :description="item.description"
            :path="item.path"
            :stars="item.stars"
            :monthly-downloads="item.monthlyDownloads"
            :contributors="item.contributors"
          />
        </ListGridItem>
        <ListGridEmpty v-if="results && results.length === 0">
          No packages found
        </ListGridEmpty>
      </ListGrid>
    </section>
  </Main>
</template>
