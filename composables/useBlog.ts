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
  const q = computed(() => {
    return route.query.q as LocationQueryValue || defaultQ
  })

  const categoriesOptions = computed(() => {
    const categories = data.value.flatMap(item => item.categories || [])
    const dedupe = new Set<string>(categories)

    return Array.from(dedupe).sort()
  })
  const defaultCategories: string[] = []
  const categories = computed(() => {
    const categories = route.query['categories[]'] as LocationQueryValue[] || defaultCategories

    return (Array.isArray(categories) ? categories : [categories]) as string[]
  })

  const packagesOptions = computed(() => {
    const packages = data.value.flatMap(item => item.packages || [])
    const dedupe = new Set<string>(packages)

    return Array.from(dedupe).sort()
  })
  const defaultPackages: string[] = []
  const packages = computed(() => {
    const packages = route.query['packages[]'] || defaultPackages

    return (Array.isArray(packages) ? packages : [packages]) as string[]
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
      label: 'Name',
    },
  ]
  const defaultOrderBy: string = orderByOptions[0].id
  const orderBy = computed(() => {
    return route.query.orderBy as LocationQueryValue || defaultOrderBy
  })

  const articles = ref<BlogPostCard[]>()
  const fetchBlogArticles = async () => {
    if (data.value.length) {
      miniSearch.addAll(data.value)
      // Do not update articles list on client side to avoid hydration error
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

  function updateQuery(query?: { q?: string, 'categories[]'?: string[], 'packages[]'?: string[], 'authors[]'?: string[], order?: Order, orderBy?: string }) {
    navigateTo({
      query: {
        ...route.query,
        ...query,
      },
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

  const storage = useStorage('blog', {
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
      })
    }
  })

  return {
    fetchBlogArticles,
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
