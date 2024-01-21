import { useStorage } from '@vueuse/core'
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import type { LocationQueryValue } from '#vue-router'
import type { Order } from '~/types/order'

export function useLearnArticles() {
  const data = useState<Pick<ParsedContent, string>[]>('content:learn-articles', () => [])

  const fields = ['title', 'description', '_path', 'packages', 'category']
  const fetchArticles = async () => {
    if (data.value.length)
      return

    try {
      const res = await queryContent('/learn/').only(fields).find()
      data.value = res
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
      id: 'publishedAt',
      label: 'Published At',
    },
    {
      id: 'title',
      label: 'Title',
    },
  ]

  const categoriesOptions = [
    {
      id: 'getting-started',
      label: 'Getting Started',
    },
    {
      id: 'building-blocks',
      label: 'Building Blocks',
    },
  ]

  const packagesOptions = computed(() => {
    const packages = data.value.map(p => p.packages).flat()
    const dedupe = new Set(packages)
    return Array.from(dedupe)
  })

  const route = useRoute()
  const storage = useStorage('learn-articles', {
    'q': '',
    'categories[]': [] as string[],
    'packages[]': [] as string[],
    'order': -1,
    'orderBy': orderByOptions[0].id,
  })

  // This is important to avoid a merge the URL and some data in storage for each missing query in URL. We cannot directly check for query to avoid having UTM breaking the system.
  const hasQuery = computed(() => {
    return route.query.q || route.query['categories[]'] || route.query['packages[]'] || route.query.order || route.query.orderby
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

  const categories = computed({
    get: () => {
      const categories = route.query['categories[]'] as LocationQueryValue[] || []

      return (Array.isArray(categories) ? categories : [categories]) as string[]
    },
    set: (value: string[]) => {
      // Update URL
      navigateTo({
        query: {
          ...route.query,
          'categories[]': value,
        },
      })
      // Update storage
      storage.value['categories[]'] = value
    },
  })

  const packages = computed({
    get: () => {
      const packages = route.query['packages[]'] || []

      return (Array.isArray(packages) ? packages : [packages]) as string[]
    },
    set: (value: string[]) => {
      // Update URL
      navigateTo({
        query: {
          ...route.query,
          'packages[]': value,
        },
      })
      // Update storage
      storage.value['packages[]'] = value
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
      category: null,
    }
    navigateTo({
      query,
    })
    storage.value = {
      'q': '',
      'categories[]': [],
      'packages[]': [],
      'order': -1,
      'orderBy': orderByOptions[0].id,
    }
  }

  const selectedOrderBy = computed(() => {
    return orderByOptions.find(option => option.id === orderBy.value)
  })

  const articlesSearched = useSimpleSearch(q, data, {
    idField: 'title',
    fields: ['title', 'description'],
    storeFields: fields,
  })

  const articlesFiltered = computed(() => {
    let results = articlesSearched.value

    results = results.filter((item) => {
      if (!categories.value.length)
        return true

      return categories.value.includes(item.category)
    })

    results = results.filter((item) => {
      if (!packages.value.length)
        return true

      return item.packages.some(pkg => packages.value.includes(pkg))
    })

    return results
  })

  const articles = computed(() => {
    return sort(articlesFiltered.value, order.value, orderBy.value)
  })

  return {
    fetchArticles,
    reset,
    articles,
    q,
    categories,
    categoriesOptions,
    packages,
    packagesOptions,
    order,
    orderBy,
    orderByOptions,
    selectedOrderBy,
  }
}
