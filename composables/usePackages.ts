import { useStorage } from '@vueuse/core'
import MiniSearch, { type SearchResult } from 'minisearch'
import type { Package } from '~/types/package'
import type { LocationQueryValue } from '#vue-router'
import type { Order } from '~/types/order'

export function usePackages() {
  const fields = ['path', 'title', 'description', 'stars', 'monthlyDownloads', 'contributors']
  const miniSearch = new MiniSearch({
    idField: 'title',
    fields: ['title', 'description'],
    storeFields: fields,
    searchOptions: {
      prefix: true,
      fuzzy: 0.4,
      boost: {
        title: 2,
        description: 1,
      },
    },
  })

  const route = useRoute()

  const allPackages = ref<Package[]>([])
  const packages = ref<Package[]>([])

  // This is important to avoid a merge the URL and some data in storage for each missing query in URL. We cannot directly check for query to avoid having UTM breaking the system.
  const hasQuery = computed(() => {
    return route.query.q || route.query.order || route.query.orderby
  })

  const defaultQ: string = ''
  const q = computed(() => {
    return route.query.q as LocationQueryValue || defaultQ
  })

  const defaultOrder: Order = 1
  const order = computed(() => {
    const value = route.query.order as LocationQueryValue || defaultOrder

    return Number(value) as Order
  })

  const orderByOptions = [
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
  const defaultOrderBy: string = orderByOptions[0].id
  const orderBy = computed(() => {
    return route.query.orderBy as LocationQueryValue || defaultOrderBy
  })

  const updateQuery = (query?: { q?: string, order?: Order, orderBy?: string }) => {
    navigateTo({
      query: {
        ...route.query,
        ...query,
      },
    })
  }

  const reset = () => {
    const defaultQuery = {
      q: defaultQ,
      order: defaultOrder,
      orderBy: defaultOrderBy,
    }
    updateQuery(defaultQuery)
  }

  const search = (data: Package[], q: string) => {
    if (!q)
      return data as (Package & SearchResult)[]

    return miniSearch.search(q) as (Package & SearchResult)[]
  }

  const getPackages = () => {
    const searched = search(allPackages.value, q.value)
    const sorted = sort(searched, order.value, orderBy.value)

    return sorted
  }

  const fetchPackages = async () => {
    const { data: res, error } = await useAsyncData('content:use-packages:data', () => $fetch('/api/content/packages.json'))

    if (error.value) {
      throw createError({
        statusCode: error.value?.statusCode,
        statusMessage: error.value?.statusMessage,
        fatal: true,
      })
    }

    miniSearch.addAll(res.value as Package[])
    allPackages.value = res.value as Package[]
    packages.value = res.value as Package[]
  }

  const storage = useStorage('packages', {
    q: '' as null | string,
    order: 1 as null | Order,
    orderBy: orderByOptions[0].id as null | string,
  })

  watch(() => route.query, () => {
    packages.value = getPackages()

    const query = route.query

    const q = query.q as LocationQueryValue
    const order = Number(query.order as LocationQueryValue) as Order
    const orderBy = query.orderBy as LocationQueryValue as string

    storage.value = {
      q,
      order,
      orderBy,
    }
  })

  onMounted(() => {
    // Because of prerendering
    packages.value = getPackages()
    // No query? Create one using stored data.
    if (!hasQuery.value) {
      navigateTo({
        query: storage.value,
      }, { replace: true }) // Replace to avoid infinite loop on back button
    }
  })

  const numberOfPackages = computed(() => allPackages.value.length)

  const monthlyDownloads = computed(() => allPackages.value.reduce((acc, pkg) => {
    if (!pkg.monthlyDownloads)
      return acc

    acc += pkg.monthlyDownloads
    return acc
  }, 0))

  return {
    fetchPackages,
    updateQuery,
    reset,
    packages,
    q,
    order,
    orderBy,
    orderByOptions,
    numberOfPackages,
    monthlyDownloads,
  }
}
