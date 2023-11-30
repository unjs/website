<script lang="ts" setup>
import { Combobox } from '@headlessui/vue'
import type { SearchDisplayItem } from '~/types/search'

useSeoMeta({
  ogImage: 'https://unjs.io/og/search.jpg',
  twitterImage: 'https://unjs.io/og/search.jpg',
})

const { page } = useContent()
const route = useRoute()

const selected = ref<SearchDisplayItem | null>(null)

const query = ref(route.query.q as string || '')

const queryDebounced = refDebounced(query, 250)
const results = await useSearchResults(queryDebounced)

watch(queryDebounced, () => {
  updateQuery(queryDebounced.value)
})

watch(() => route.query.q as string, (value) => {
  if (value === query.value)
    return
  if (!value)
    return query.value = ''
  query.value = value
})

const defaultOptions = await useSearchDefaultResults()

function updateQuery(query: string) {
  if (!query)
    return navigateTo({})

  navigateTo({ query: { q: query } })
}

async function navigate() {
  if (!selected.value)
    return

  await navigateTo(selected.value.id)
}
</script>

<template>
  <Head>
    <SchemaOrgWebPage :type="['CollectionPage', 'SearchResultsPage']" />
  </Head>
  <Main>
    <template #header>
      <PageHeader :title="page.title" :description="page.description">
        <template #right>
          <div>
            <img :src="page.header.image.src" :alt="page.header.image.alt" class="absolute left-24 opacity-70">
          </div>
        </template>
      </PageHeader>
    </template>

    <Combobox v-model="selected">
      <AppSearchInput v-model:query="query" :search-results="results" @validate="navigate" />
      <div class="mt-6">
        <AppSearchResult
          static
          :search-results="results"
          :default-results="defaultOptions"
          :have-query="!!queryDebounced"
        />
      </div>
    </Combobox>
  </Main>
</template>
