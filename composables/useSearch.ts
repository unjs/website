import MiniSearch, { type Options as MiniSearchOptions } from 'minisearch'
import type { SearchResult } from 'types/search'

export async function useSearch(search: MaybeRefOrGetter<string>): Promise<ComputedRef<SearchResult[]>> {
  const { data } = await useFetch<string>('/api/search')

  if (!data.value)
    return computed(() => [])

  const { results } = useIndexedMiniSearch(search, data as Ref<string>, {
    fields: ['title', 'titles', 'text'],
    storeFields: ['title', 'titles', 'text', 'level'],
    searchOptions: {
      prefix: true,
      fuzzy: 0.2,
      boost: {
        title: 4,
        text: 2,
        titles: 1,
      },
    },
  })

  return results
}

function useIndexedMiniSearch(search: MaybeRefOrGetter<string>, indexedData: MaybeRefOrGetter<string>, options: MiniSearchOptions) {
  const createIndexedMiniSearch = () => {
    return MiniSearch.loadJSON<SearchResult>(toValue(indexedData), toValue(options))
  }

  const indexedMiniSearch = ref(createIndexedMiniSearch())

  watch(
    () => toValue(options),
    () => { indexedMiniSearch.value = createIndexedMiniSearch() },
    { deep: true },
  )

  watch(
    () => toValue(indexedData),
    () => { indexedMiniSearch.value = createIndexedMiniSearch() },
    { deep: true },
  )

  // function markHints(result: SearchResult) {
  //   const hints: Record<string, string | string[] | null> = {}

  //   result.terms.forEach((term) => {
  //     const regexp = new RegExp(`(${term})`, 'gi')

  //     result.match[term].forEach((field) => {
  //       const value = result[field] as string | string[]

  //       if (typeof value === 'string') {
  //         hints[field] = value.replace(regexp, '<mark>$1</mark>')
  //       }
  //       else if (field === 'titles') {
  //         const markedValue = value.reduce((items, h) => {
  //           if (h.toLowerCase().includes(term))
  //             items.push(h.replace(regexp, '<mark>$1</mark>'))
  //           return items
  //         }, [] as string[])

  //         hints[field] = markedValue.length ? markedValue : null
  //       }
  //     })
  //   })

  //   return hints
  // }

  const results = computed(() => {
    return indexedMiniSearch.value.search(toValue(search)) as SearchResult[]
    // .map((result) => {
    //   result.hints = markHints(result)
    //   return result
    // })
  })

  return {
    results,
    indexedMiniSearch,
  }
}
