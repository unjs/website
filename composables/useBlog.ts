import { useStorage } from '@vueuse/core'
import MiniSearch, { type SearchResult } from 'minisearch'
import type { Order } from '~/types/order'
import type { LocationQueryValue } from '#vue-router'
import type { Author, BlogPostCard } from '~/types/blog'

export function useBlog() {
  const fields = ['_path', 'title', 'description', 'publishedAt', 'authors', 'packages', 'categories']
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

  const data = useState<BlogPostCard[]>('content:blog', () => [])
  const route = useRoute()

  // This is important to avoid a merge the URL and some data in storage for each missing query in URL. We cannot directly check for query to avoid having UTM breaking the system.
  const hasQuery = computed(() => {
    return route.query.q || route.query['categories[]'] || route.query['packages[]'] || route.query['authors[]'] || route.query.order || route.query.orderby
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

  const categoriesOptions = computed(() => {
    const categories = data.value.flatMap(item => item.categories || [])
    const dedupe = new Set<string>(categories)

    return Array.from(dedupe).sort()
  })
  const defaultCategories: string[] = []
  const categories = computed({
    get: () => {
      const categories = route.query['categories[]'] as LocationQueryValue[] || defaultCategories

      return (Array.isArray(categories) ? categories : [categories]) as string[]
    },
    set: (value: string[]) => {
      navigateTo({
        query: {
          ...route.query,
          'categories[]': value,
        },
      })
    },
  })

  const packagesOptions = computed(() => {
    const packages = data.value.flatMap(item => item.packages || [])
    const dedupe = new Set<string>(packages)

    return Array.from(dedupe).sort()
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

  const authorsOptions = computed(() => {
    const authors = data.value.flatMap(item => item.authors || [])
    const dedupe = new Map<string, Author>()

    authors.forEach((author) => {
      if (!dedupe.has(author.name))
        dedupe.set(author.name, author)
    })

    return Array.from(dedupe.values()).sort((a, b) => a.name.localeCompare(b.name))
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

  const articles = ref<BlogPostCard[]>(getArticles())
  const fetchBlogArticles = async () => {
    if (data.value.length) {
      miniSearch.addAll(data.value)
      articles.value = getArticles()
      return
    }

    try {
      const res = await queryContent('/blog/').only(fields).find()
      data.value = res as BlogPostCard[]
      miniSearch.addAll(res)
      articles.value = getArticles()
    }
    catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Server Error',
        fatal: true,
      })
    }
  }

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

  function filter(data: (BlogPostCard & SearchResult)[]) {
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

  function search(data: BlogPostCard[]) {
    if (!q.value)
      return data as (BlogPostCard & SearchResult)[]

    return miniSearch.search(q.value) as (BlogPostCard & SearchResult)[]
  }

  function getArticles() {
    const searched = search(data.value)
    const filtered = filter(searched)
    const sorted = sort(filtered, order.value, orderBy.value)

    return sorted
  }

  watchDebounced(q, (query, oldQuery) => {
    // Do not update if query is the same
    if (query === oldQuery)
      return

    articles.value = getArticles()
  }, { debounce: 150 })

  watch([categories, packages, authors], (filters, oldFilters) => {
    // Do not update if filters are the same
    if (filters.every((filter, index) => filter.join('') === oldFilters[index].join('')))
      return

    articles.value = getArticles()
  })

  const storage = useStorage('blog', {
    'q': '' as null | string,
    'categories[]': [] as null | string | (string | null)[],
    'packages[]': [] as null | string | (string | null)[],
    'authors[]': [] as null | string | (string | null)[],
    'order': -1 as null | Order,
    'orderBy': orderByOptions[0].id as null | typeof orderByOptions[number]['id'],
  })

  // Update storage on query change
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

  onMounted(() => {
    // No query? Create one using stored data.
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
