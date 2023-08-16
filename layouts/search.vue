<script lang="ts" setup>
import { Combobox } from '@headlessui/vue'
import type { SearchDisplayItem } from 'types/search'

const route = useRoute()

const selected = ref<SearchDisplayItem | null>(null)
const query = computed({
  get: () => route.query.q as string || '',
  set: (value: string) => updateQuery(value),
})
const queryDebounced = refDebounced(query, 100)
const results = await useSearchResults(queryDebounced)

const defaultOptions = await useSearchDefaultResults()

watch(query, (value) => {
  updateQuery(value)
})

function updateQuery(query: string) {
  if (!query)
    return navigateTo({})

  navigateTo({ query: { q: query } })
}

function navigate() {
  if (!selected.value)
    return

  navigateTo(selected.value.id)
  setTimeout(() => {
    query.value = ''
    selected.value = null
  }, 200)
}
</script>

<template>
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
