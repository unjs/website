import { useStorage } from '@vueuse/core'
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import MiniSearch, { type SearchResult } from 'minisearch'
import type { LocationQueryValue } from '#vue-router'
import type { Order } from '~/types/order'

export function useLearnArticles() {
  const fields = ['title', 'description', '_path', 'packages', 'category', 'publishedAt', 'authors']
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

  const data = useState<Pick<ParsedContent, string>[]>('content:learn-articles-data', () => [])
  const route = useRoute()
  // This is important to avoid a merge the URL and some data in storage for each missing query in URL. We cannot directly check for query to avoid having UTM breaking the system.
  const hasQuery = computed(() => {
    return route.query.q || route.query['categories[]'] || route.query['packages[]'] || route.query['authors[]'] || route.query.order || route.query.orderby
  })

  const defaultQ: string = ''
  const q = computed(() => {
    return route.query.q as LocationQueryValue || defaultQ
  })

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
  const defaultCategories: string[] = []
  const categories = computed(() => {
    const categories = route.query['categories[]'] as LocationQueryValue[] || defaultCategories

    return (Array.isArray(categories) ? categories : [categories]) as string[]
  })

  const packagesOptions = computed(() => {
    const packages = data.value.flatMap(p => p.packages || [])
    const dedupe = new Set<string>(packages)

    return Array.from(dedupe).sort()
  })
  const defaultPackages: string[] = []
  const packages = computed(() => {
    const packages = route.query['packages[]'] || defaultPackages

    return (Array.isArray(packages) ? packages : [packages]) as string[]
  })

  const authorsOptions = computed(() => {
    const authors = data.value.flatMap(p => p.authors || [])
    const dedupe = new Set<string>(authors)

    return Array.from(dedupe).sort()
  })
  const defaultAuthors: string[] = []
  const authors = computed(() => {
    const authors = route.query['authors[]'] || defaultAuthors

    return (Array.isArray(authors) ? authors : [authors]) as string[]
  })

  const defaultOrder: Order = -1
  const order = computed(() => {
    const value = route.query.order as LocationQueryValue || defaultOrder

    return Number(value) as Order
  })

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
  const defaultOrderBy: string = orderByOptions[0].id
  const orderBy = computed(() => {
    return route.query.orderBy as LocationQueryValue || defaultOrderBy
  })

  const articles = useState<Pick<ParsedContent, string>[]>('content:learn-articles', () => [])

  const updateQuery = (query?: { q?: string, 'categories[]'?: string[], 'packages[]'?: string[], 'authors[]'?: string[], order?: Order, orderBy?: string }) => {
    navigateTo({
      query: {
        ...route.query,
        ...query,
      },
    })
  }

  const reset = () => {
    const defaultQuery = {
      'q': defaultQ,
      'categories[]': defaultCategories,
      'packages[]': defaultPackages,
      'authors[]': defaultAuthors,
      'order': defaultOrder,
      'orderBy': defaultOrderBy,
    }
    updateQuery(defaultQuery)
  }

  const filter = (data: (Pick<ParsedContent, string> & SearchResult)[]) => {
    data = data.filter((item) => {
      if (!categories.value.length)
        return true

      if (!item.category)
        return false

      return categories.value.includes(item.category)
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

  const search = (data: Pick<ParsedContent, string>[]) => {
    if (!q.value)
      return data as (Pick<ParsedContent, string> & SearchResult)[]

    return miniSearch.search(q.value) as (Pick<ParsedContent, string> & SearchResult)[]
  }

  const getArticles = () => {
    const searched = search(data.value)
    const filtered = filter(searched)
    const sorted = sort(filtered, order.value, orderBy.value)

    return sorted
  }

  const fetchArticles = async () => {
    if (data.value.length) {
      miniSearch.addAll(data.value)
      return
    }

    try {
      const res = await queryContent('/learn/').only(fields).find()
      data.value = res
      miniSearch.addAll(data.value)
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

  const storage = useStorage('learn-articles', {
    'q': '' as null | string,
    'categories[]': [] as null | string | (string | null)[],
    'packages[]': [] as null | string | (string | null)[],
    'authors[]': [] as null | string | (string | null)[],
    'order': -1 as null | Order,
    'orderBy': orderByOptions[0].id as null | string,
  })
  // Update articles and storage on query change
  watch(() => route.query, () => {
    articles.value = getArticles()

    const query = route.query
    // Do not define default value. Must be defined in the query.
    const q = query.q as LocationQueryValue
    const categories = query['categories[]'] as LocationQueryValue[]
    const packages = query['packages[]'] as LocationQueryValue[]
    const authors = query['authors[]'] as LocationQueryValue[]
    const order = Number(query.order as LocationQueryValue) as Order
    const orderBy = query.orderBy as LocationQueryValue as string

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
    // Because of prerendering
    articles.value = getArticles()
    // No query? Create one using stored data.
    if (!hasQuery.value) {
      navigateTo({
        query: storage.value,
      }, { replace: true }) // Replace to avoid infinite loop on back button
    }
  })

  return {
    fetchArticles,
    updateQuery,
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
