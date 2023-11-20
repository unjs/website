<script lang="ts" setup>
import type { Author, BlogPostCard } from '~/types/blog'

const { page } = useContent()

const { data: blog } = await useAsyncData('blog', () => queryContent('/blog/').only(['_path', 'title', 'description', 'publishedAt', 'authors', 'packages']).sort({ publishedAt: -1 }).find() as Promise<BlogPostCard[]>)

if (!blog.value) {
  throw createError({
    statusCode: 500,
    message: 'No blog found',
  })
}

// rework all of this for a cleaner code
const { search, searchResults } = useSimpleSearch(blog as Ref<BlogPostCard[]>)

const authors = blog.value.flatMap(item => item.authors).reduce((acc, author) => {
  if (!acc.find(item => item.name === author.name))
    acc.push(author)

  return acc
}, [] as Author[])
const selectedAuthors = ref<Author[]>([])

const packages = blog.value.flatMap(item => item.packages).reduce((acc, pkg) => {
  if (!acc.find(item => item === pkg))
    acc.push(pkg)

  return acc
}, [] as string[])
const selectedPackages = ref<string[]>([])

const filtered = computed(() => {
  if (!selectedAuthors.value.length && !selectedPackages.value.length)
    return searchResults.value

  return searchResults.value.filter((item) => {
    if (selectedAuthors.value.length && selectedPackages.value.length) // TODO: find a better way
      return item.authors.some(author => selectedAuthors.value.includes(author.name)) && item.packages.some(pkg => selectedPackages.value.includes(pkg))

    if (selectedAuthors.value.length)
      return item.authors.some(author => selectedAuthors.value.includes(author.name))

    if (selectedPackages.value.length)
      return item.packages.some(pkg => selectedPackages.value.includes(pkg))

    return true
  })
})

const orderByOptions = [
  {
    id: 'title',
    label: 'Name',
  },
  {
    id: 'publishedAt',
    label: 'Published at',
  },
]
const { order, toggleOrder, orderBy, currentOrderBy, sort } = useOrder(-1, { init: 'publishedAt', options: orderByOptions })

const results = sort(filtered)
</script>

<template>
  <Head>
    <SchemaOrgWebPage :type="['CollectionPage']" />
  </Head>
  <Main>
    <template #header>
      <PageHeader :title="page.title" :description="page.description">
        <template #right>
          <div>
            <img :src="page.header.image.src" :alt="page.header.image.alt" class="absolute left-24 top-10 opacity-70">
          </div>
        </template>
      </PageHeader>
    </template>

    <section>
      <h2 class="sr-only">
        Articles list
      </h2>

      <div class="grid grid-cols-3 gap-8">
        <UInput
          v-model="search"
          size="lg"
          color="gray"
          variant="outline"
          name="search-article"
          placeholder="Search an article"
          icon="i-heroicons-magnifying-glass-solid"
        />
        <div class="col-span-2 flex items-center justify-end gap-3">
          <USelectMenu
            v-model="selectedAuthors"
            :options="authors"
            color="gray"
            variant="outline"
            size="lg"
            placeholder="Authors"
            select-class="cursor-pointer"
            value-attribute="name"
            option-attribute="name"
            multiple
          >
            <template #option="{ option: author }">
              <UAvatar size="2xs" :src="author.picture" :alt="`Avatar of ${author.name}`" />
              <span class="truncate">
                {{ author.name }}
              </span>
            </template>
          </USelectMenu>
          <USelectMenu
            v-model="selectedPackages"
            :options="packages"
            color="gray"
            variant="outline"
            size="lg"
            placeholder="Packages"
            select-class="cursor-pointer"
            multiple
          >
            <template #option="{ option: pkg }">
              <UAvatar size="2xs" :src="`/assets/logos/${pkg}.svg`" :alt="`Icon of ${pkg}`" />
              <span class="truncate">
                {{ pkg }}
              </span>
            </template>
          </USelectMenu>
          <UButtonGroup size="lg" orientation="horizontal">
            <UButton
              :icon="order === 1 ? 'i-heroicons-bars-arrow-up-20-solid' : 'i-heroicons-bars-arrow-down-20-solid'"
              color="gray"
              variant="solid"
              :title="order === 1 ? 'Ascending order' : 'Descending order'"
              @click="toggleOrder()"
            />
            <USelectMenu
              v-model="orderBy"
              :options="orderByOptions"
              color="gray"
              variant="outline"
              placeholder="Order By"
              select-class="cursor-pointer"
              value-attribute="id"
              option-attribute="label"
            >
              <template #label>
                {{ currentOrderBy?.label }}
              </template>
            </USelectMenu>
          </UButtonGroup>
        </div>
      </div>

      <ol v-if="blog" class="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 place-items-stretch">
        <li v-for="item in results" :key="item.title">
          <UCard as="article" :ui="{ base: 'h-full relative', background: 'dark:bg-gray-700/40 hover:dark:bg-gray-700/60', divide: '', shadow: 'shadow-none hover:shadow-lg ', ring: 'dark:highlight-white/10', rounded: 'rounded-lg', header: { base: 'flex gap-3 items-center', padding: 'py-0 pt-4 sm:px-4 sm:pt-4' }, body: { padding: 'p-4 sm:p-4' }, footer: { padding: 'py-0 pb-4 sm:px-4 sm:pb-4' } }">
            <template #header>
              <h3 class="text-xl font-semibold dark:text-gray-50">
                <NuxtLink :to="item._path" class="absolute inset-0" />
                {{ item.title }}
              </h3>
            </template>

            <p class="dark:text-zinc-400">
              {{ item.description }}
            </p>

            <template #footer>
              <dl class="dark:text-zinc-400 text-sm flex flex-row justify-between items-center">
                <dt class="sr-only">
                  Published at
                </dt>
                <dd>
                  <time :datetime="toISODateString(item.publishedAt)">
                    {{ toLocaleDateString(item.publishedAt) }}
                  </time>
                </dd>
                <dt class="sr-only">
                  Authors
                </dt>
                <dd class="flex">
                  <UAvatarGroup size="2xs" :max="3" :ui="{ ring: '' }">
                    <UAvatar v-for="author in item.authors" :key="author._id" :src="author.picture" :alt="author.name" />
                  </UAvatarGroup>
                </dd>
              </dl>
            </template>
          </UCard>
        </li>
        <li v-if="results.length === 0" class="col-spance-1 md:col-span-2 xl:col-span-3 text-center">
          No articles found
        </li>
      </ol>
    </section>
  </Main>
</template>
