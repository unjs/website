import { useStorage } from '@vueuse/core'
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
  ]

  const categoriesOptions = computed(() => data.value.flatMap(item => item.categories || []).reduce((acc, category) => {
    if (!acc.find(item => item === category))
      acc.push(category)

    return acc
  }, [] as string[]))

  const packagesOptions = computed(() => data.value.flatMap(item => item.packages || []).reduce((acc, pkg) => {
    if (!acc.find(item => item === pkg))
      acc.push(pkg)

    return acc
  }, [] as string[]))

  const authorsOptions = computed(() => data.value.flatMap(item => item.authors || []).reduce((acc, author) => {
    if (!acc.find(item => item.name === author.name))
      acc.push(author)

    return acc
  }, [] as Author[]))

  const route = useRoute()
  const storage = useStorage('blog', {
    'q': '',
    'categories[]': [] as string[],
    'packages[]': [] as string[],
    'authors[]': [] as string[],
    'order': -1,
    'orderBy': orderByOptions[0].id,
  })

  // This is important to avoid a merge the URL and some data in storage for each missing query in URL. We cannot directly check for query to avoid having UTM breaking the system.
  const hasQuery = computed(() => {
    return route.query.q || route.query['categories[]'] || route.query['packages[]'] || route.query['authors[]'] || route.query.order || route.query.orderby
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

  const authors = computed({
    get: () => {
      const authors = route.query['authors[]'] || []

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
      // Update storage
      storage.value['authors[]'] = value
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
      'q': null,
      'categories[]': [],
      'packages[]': [],
      'authors[]': [],
      'order': -1,
      'orderBy': orderByOptions[0].id,
    }
    navigateTo({
      query,
    })
    storage.value = {
      'q': '',
      'categories[]': [],
      'packages[]': [],
      'authors[]': [],
      'order': -1,
      'orderBy': orderByOptions[0].id,
    }
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

  const articles = computed(() => {
    return sort(articlesFiltered.value, order.value, orderBy.value)
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
