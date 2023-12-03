import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import MiniSearch, { type Options as MiniSearchOptions } from 'minisearch'
import type { SearchDisplay, SearchDisplayItem, SearchResult } from '~/types/search'

export function useSimpleSearch<T extends Record<string, unknown>>(data: MaybeRefOrGetter<Partial<ParsedContent>[]>, options: { idField: string, fields: string[], storeFields: string[] } = { idField: 'title', fields: ['title', 'description'], storeFields: ['title', 'description', '_path', 'publishedAt', 'authors', 'packages'] }) {
  const search = ref('')
  const searchDebounced = useDebounce(search, 150)

  const miniSearchResults = useMiniSearch(searchDebounced, data, {
    idField: options.idField,
    fields: options.fields,
    storeFields: options.storeFields,
    searchOptions: {
      prefix: true,
      fuzzy: 0.2,
    },
  })

  const searchResults = computed(() => {
    return searchDebounced.value ? miniSearchResults.value : toValue(data)
  }) as ComputedRef<(T & SearchResult)[]>

  return {
    search,
    searchResults,
  }
}

export async function useSearchDefaultResults(): Promise<ComputedRef<SearchDisplay>> {
  const { data: packages } = await useAsyncData('content:search:packages', () => queryContent('/packages/').only(['title', '_path']).find())

  return computed(() => {
    if (!packages.value)
      return {}

    const defaultOptions: SearchDisplay = {}

    defaultOptions.packages = packages.value.map((item) => {
      if (!item.title || !item._path)
        return null

      return {
        id: item._path,
        title: item.title,
        titles: [],
        level: 0,
        children: null,
      } satisfies SearchDisplayItem
    }).filter(Boolean) as SearchDisplayItem[]

    return defaultOptions
  })
}

export async function useSearchResults(search: MaybeRefOrGetter<string>, options: { lazy?: boolean, server?: boolean } = {}): Promise<ComputedRef<SearchDisplay>> {
  const website = useWebsite()
  const searchResults = await useSearch(search, options)

  return computed(() => {
    return searchResults.value.reduce((acc, item) => {
      const pathname = item.id.split('#')[0]

      const group = website.value.search.groups.find(group => pathname.startsWith(group.path)) ?? {
        name: 'Pages',
        path: '',
      }

      if (!acc[group.name])
        acc[group.name] = []

      const groupItems = acc[group.name]

      const topLevelItem = groupItems.find(groupItem => item.id.startsWith(groupItem.id) && groupItem.level === 0)

      if (topLevelItem && topLevelItem.children) {
        topLevelItem.children.push({
          id: item.id,
          title: item.title,
          titles: item.titles,
          level: item.level,
          children: null,
        })
      }
      else {
        groupItems.push({
          id: item.id,
          title: item.title,
          titles: item.titles,
          level: item.level,
          children: [],
        })
      }

      return acc
    }, {} as SearchDisplay)
  })
}

export async function useSearch(search: MaybeRefOrGetter<string>, options: { lazy?: boolean, server?: boolean } = {}): Promise<ComputedRef<SearchResult[]>> {
  const { data } = await useFetch<string>('/api/search.txt', options)

  return computed(() => {
    if (!data.value)
      return [] as SearchResult[]

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

    return results.value
  })
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

export function useMiniSearch<DataItem>(search: MaybeRefOrGetter<string>, data: MaybeRefOrGetter<DataItem[]>, options: MiniSearchOptions) {
  const createMiniSearch = () => {
    const miniSearch = new MiniSearch(toValue(options))
    miniSearch.addAll(toValue(data))
    return miniSearch
  }

  const miniSearch = shallowRef(createMiniSearch())

  watch(
    () => toValue(options),
    () => { miniSearch.value = createMiniSearch() },
    { deep: true },
  )

  watch(
    () => toValue(data),
    () => {
      miniSearch.value.removeAll()
      miniSearch.value.addAll(toValue(data))
    },
    { deep: true },
  )

  const results = computed(() => {
    return miniSearch.value.search(toValue(search))
  })

  return results
}
