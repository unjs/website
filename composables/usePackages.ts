import { useStorage } from '@vueuse/core'
import type { Package } from '~/types/package'
import type { LocationQueryValue } from '#vue-router'
import type { Order } from '~/types/order'

export function usePackages() {
  const data = useState<Package[]>('content:packages', () => [])

  const fetchPackages = async () => {
    if (data.value.length)
      return

    try {
      const res = await $fetch('/api/content/packages.json')
      data.value = res as Package[]
    }
    catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Server Error',
        fatal: true,
      })
    }
  }

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

  const route = useRoute()
  const storage = useStorage('packages', {
    q: '',
    order: 1,
    orderBy: orderByOptions[0].id,
  })

  // This is important to avoid a merge the URL and some data in storage for each missing query in URL. We cannot directly check for query to avoid having UTM breaking the system.
  const hasQuery = computed(() => {
    return route.query.q || route.query.order || route.query.orderby
  })

  /**
   * Navigate to correct query using storage.
   *
   * Since we use the URL as state of the application, we can't use directly data from storage. If so, it add complexity (need to extract data from query or from storage in every filters) and break when user start to interact with the application since a query appears.
   */
  onMounted(() => {
    // If there is a query, do nothing.
    if (hasQuery.value)
      return

    // Navigate using storage value (even default) to keep state in URL
    navigateTo({
      query: storage.value,
    })
  })

  const q = computed({
    get: () => {
      return route.query.q as LocationQueryValue || ''
    },
    set: (value) => {
      // Update URL
      navigateTo({
        query: {
          ...route.query,
          q: value,
        },
      })
      // Update storage
      storage.value.q = value
    },
  })

  const order = computed({
    get: () => {
      const value = route.query.order as LocationQueryValue || ''

      return Number(value) as Order
    },
    set: (value) => {
      // Update URL
      navigateTo({
        query: {
          ...route.query,
          order: value,
        },
      })
      // Update storage
      storage.value.order = value
    },
  })

  const orderBy = computed({
    get: () => {
      return route.query.orderBy as LocationQueryValue || orderByOptions[0].id
    },
    set: (value) => {
      // Update URL
      navigateTo({
        query: {
          ...route.query,
          orderBy: value,
        },
      })
      // Update storage
      storage.value.orderBy = value
    },
  })

  const reset = () => {
    const query = {
      q: null,
      order: 1,
      orderBy: orderByOptions[0].id,
    }
    navigateTo({
      query,
    })
    storage.value = {
      q: '',
      order: 1,
      orderBy: orderByOptions[0].id,
    }
  }

  const packagesSearched = useSimpleSearch<Package>(q, data, {
    idField: 'title',
    fields: ['title', 'description'],
    storeFields: ['title', 'description', 'path', 'stars', 'monthlyDownloads', 'contributors'],
    searchOptions: { boost: { title: 2, description: 1 } },
  })

  const packages = computed(() => {
    return sort(packagesSearched.value, order.value, orderBy.value)
  })

  const numberOfPackages = computed(() => data.value.length)

  const monthlyDownloads = computed(() => data.value.reduce((acc, pkg) => {
    if (!pkg.monthlyDownloads)
      return acc

    acc += pkg.monthlyDownloads
    return acc
  }, 0))

  return {
    fetchPackages,
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
