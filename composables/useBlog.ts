import { useStorage } from '@vueuse/core'
import MiniSearch from 'minisearch'
import type { Order } from '~/types/order'
import type { LocationQueryValue } from '#vue-router'
import type { Author, BlogPostCard } from '~/types/blog'

export function useBlog() {
  const data = useState<BlogPostCard[]>('content:blog', () => [])

  const fields = ['_path', 'title', 'description', 'publishedAt', 'authors', 'packages', 'categories']
  const fetchBlogArticles = async () => {
    if (data.value.length)
      return

    try {
      const res = await queryContent('/blog/').only(fields).find()
      data.value = res as BlogPostCard[]
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
      label: 'Name',
    },
  ] as const

  const categoriesOptions = computed(() => {
    const categories = data.value.flatMap(item => item.categories || [])
    const dedupe = new Set<string>(categories)

    return Array.from(dedupe).sort()
  })

  const packagesOptions = computed(() => {
    const packages = data.value.flatMap(item => item.packages || [])
    const dedupe = new Set<string>(packages)

    return Array.from(dedupe).sort()
  })

  const authorsOptions = computed(() => {
    const authors = data.value.flatMap(item => item.authors || [])
    const dedupe = new Map<string, Author>()

    authors.forEach((author) => {
      if (!dedupe.has(author.name))
        dedupe.set(author.name, author)
    })

    return Array.from(dedupe.values()).sort((a, b) => a.name.localeCompare(b.name))
  })

  const route = useRoute()
  const storage = useStorage('blog', {
    'q': '' as null | string,
    'categories[]': [] as null | string | (string | null)[],
    'packages[]': [] as null | string | (string | null)[],
    'authors[]': [] as null | string | (string | null)[],
    'order': -1 as null | Order,
    'orderBy': orderByOptions[0].id as null | typeof orderByOptions[number]['id'],
  })

  // This is important to avoid a merge the URL and some data in storage for each missing query in URL. We cannot directly check for query to avoid having UTM breaking the system.
  const hasQuery = computed(() => {
    return route.query.q || route.query['categories[]'] || route.query['packages[]'] || route.query['authors[]'] || route.query.order || route.query.orderby
  })

  watch(() => route.query, () => {
    const query = route.query

    // Do not define default value. Must be defined in the query.
    const q = query.q as LocationQueryValue
    const categories = query['categories[]'] as LocationQueryValue[]
    const packages = query['packages[]'] as LocationQueryValue[]
    const authors = query['authors[]'] as LocationQueryValue[]
    const order = Number(query.order as LocationQueryValue) as Order
    const orderBy = query.orderBy as LocationQueryValue as typeof orderByOptions[number]['id']

    storage.value = {
      q,
      'categories[]': categories,
      'packages[]': packages,
      'authors[]': authors,
      order,
      orderBy,
    }
  })

  const defaultQ: string = ''
  const q = computed({
    get: () => {
      return route.query.q as LocationQueryValue || defaultQ
    },
    set: (value) => {
      // Update URL
      navigateTo({
        query: {
          ...route.query,
          q: value,
        },
      })
    },
  })

  const defaultCategories: string[] = []
  const categories = computed({
    get: () => {
      const categories = route.query['categories[]'] as LocationQueryValue[] || defaultCategories

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
    },
  })

  const defaultPackages: string[] = []
  const packages = computed({
    get: () => {
      const packages = route.query['packages[]'] || defaultPackages

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
    },
  })

  const defaultAuthors: string[] = []
  const authors = computed({
    get: () => {
      const authors = route.query['authors[]'] || defaultAuthors

      return (Array.isArray(authors) ? authors : [authors]) as string[]
    },
    set: (value: string[]) => {
      // Update URL
      navigateTo({
        query: {
          ...route.query,
          'authors[]': value,
        },
      })
    },
  })

  const defaultOrder: Order = -1
  const order = computed({
    get: () => {
      const value = route.query.order as LocationQueryValue || defaultOrder

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
    },
  })

  const defaultOrderBy: typeof orderByOptions[number]['id'] = orderByOptions[0].id
  const orderBy = computed({
    get: () => {
      return route.query.orderBy as LocationQueryValue || defaultOrderBy
    },
    set: (value) => {
      // Update URL
      navigateTo({
        query: {
          ...route.query,
          orderBy: value,
        },
      })
    },
  })

  const reset = () => {
    const query = {
      'q': defaultQ,
      'categories[]': defaultCategories,
      'packages[]': defaultPackages,
      'authors[]': defaultAuthors,
      'order': defaultOrder,
      'orderBy': defaultOrderBy,
    }
    navigateTo({
      query,
    })
  }

  const articlesSearched = useSimpleSearch<BlogPostCard>(q, data, {
    idField: '_path',
    fields: ['title', 'description'],
    storeFields: fields,
    searchOptions: {
      boost: {
        title: 2,
        description: 1,
      },
    },
  })

  const articlesFiltered = computed(() => {
    let results = articlesSearched.value

    results = results.filter((item) => {
      if (!categories.value.length)
        return true

      return categories.value.some(category => item.categories.includes(category))
    })

    results = results.filter((item) => {
      if (!packages.value.length)
        return true

      if (!item.packages)
        return false

      return item.packages.some(pkg => packages.value.includes(pkg))
    })

    results = results.filter((item) => {
      if (!authors.value.length)
        return true

      return item.authors.some(author => authors.value.includes(author.name))
    })

    return results
  })

  function filter(data: BlogPostCard[]) {
    data = data.filter((item) => {
      if (!categories.value.length)
        return true

      return categories.value.some(category => item.categories.includes(category))
    })

    data = data.filter((item) => {
      if (!packages.value.length)
        return true

      if (!item.packages)
        return false

      return item.packages.some(pkg => packages.value.includes(pkg))
    })

    data = data.filter((item) => {
      if (!authors.value.length)
        return true

      return item.authors.some(author => authors.value.includes(author.name))
    })

    return data
  }

  const miniSearch = new MiniSearch({
    idField: '_path',
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
  // Must be set for hydration
  miniSearch.addAll(data.value)

  function search(data: BlogPostCard[]) {
    if (!q.value)
      return data

    return miniSearch.search(q.value)
  }

  // Must be set for hydration
  const articles = ref<BlogPostCard[]>(sort(filter(data.value), order.value, orderBy.value))

  watch(data, () => {
    miniSearch.addAll(data.value)
  })

  watchDebounced(q, () => {
    articles.value = sort(filter(search(data.value)), order.value, orderBy.value)
  }, { debounce: 150 })

  watch([data, categories, packages, authors], () => {
    articles.value = sort(filter(search(data.value)), order.value, orderBy.value)
  })

  /**
   * Navigate to correct query using storage.
   *
   * Since we use the URL as state of the application, we can't use directly data from storage. If so, it add complexity (need to extract data from query or from storage in every filters) and break when user start to interact with the application since a query appears.
   */
  onMounted(() => {
    // Not query? Create one using stored value.
    if (!hasQuery.value) {
      navigateTo({
        query: storage.value,
      })
    }
  })

  return {
    fetchBlogArticles,
    reset,
    articles,
    q,
    categories,
    categoriesOptions,
    packages,
    packagesOptions,
    authors,
    authorsOptions,
    order,
    orderBy,
    orderByOptions,
  }
}
