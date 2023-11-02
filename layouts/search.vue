<script lang="ts" setup>
import { Combobox } from '@headlessui/vue'
import type { SearchDisplayItem } from '~/types/search'

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
  <main m="y-6 md:y-10">
    <slot />
    <Combobox v-model="selected">
      <div m="t-6" h-12 p="x-4 y-2" rounded="4" bg="white" flex="~ items-center">
        <AppSearchInput v-model:query="query" :search-results="results" @validate="navigate" />
      </div>
      <div m="t-6" p="4" rounded="4" bg="white">
        <AppSearchResult
          static
          :search-results="results"
          :default-results="defaultOptions"
          :have-query="!!queryDebounced"
        />
      </div>
    </Combobox>
  </main>
</template>
