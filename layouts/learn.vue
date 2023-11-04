<script lang="ts" setup>
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

const { page } = useContent()

const { data: articles } = await useAsyncData('learn', () => queryContent('/resources/learn/').only(['title', 'description', 'authors', 'publishedAt', '_path']).find())

if (!articles.value) {
  throw createError({
    statusCode: 500,
    message: 'No articles found',
  })
}

const { search, searchResults } = useSimpleSearch(articles as Ref<ParsedContent[]>)

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

const results = sort(searchResults)
</script>

<template>
  <Head>
    <SchemaOrgWebPage :type="['CollectionPage']" />
  </Head>
  <Main>
    <AppHero :title="page.title" :description="page.description" />

    <section class="mt-8">
      <h2 class="sr-only">
        Learn articles list
      </h2>

      <div class="p-4 rounded-lg ring-1 ring-zinc-200 bg-white flex items-center justify-between">
        <UInput
          v-model="search"
          color="white"
          variant="outline"
          name="search-article"
          placeholder="Search an article"
          icon="i-heroicons-magnifying-glass-solid"
        />
        <UButtonGroup size="sm" orientation="horizontal">
          <UButton
            :icon="order === 1 ? 'i-heroicons-bars-arrow-up-20-solid' : 'i-heroicons-bars-arrow-down-20-solid'"
            color="white"
            :title="order === 1 ? 'Ascending order' : 'Descending order'"
            @click="toggleOrder()"
          />
          <USelectMenu
            v-model="orderBy"
            class="w-32"
            :options="orderByOptions"
            color="white"
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

      <ol v-if="articles" class="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 place-items-stretch">
        <li v-for="article in results" :key="article._path">
          <UCard as="article" :ui="{ base: 'h-full relative', divide: '', shadow: 'shadow-none hover:shadow-lg', rounded: 'rounded-xl', header: { base: 'flex gap-3 items-center', padding: 'py-0 pt-4 sm:px-4 sm:pt-4' }, body: { padding: 'p-4 sm:p-4' }, footer: { padding: 'py-0 pb-4 sm:px-4 sm:pb-4' } }">
            <template #header>
              <h3 class="text-xl font-semibold">
                <NuxtLink :to="article._path" class="absolute inset-0" />
                {{ article.title }}
              </h3>
            </template>

            <p class="text-zinc-500">
              {{ article.description }}
            </p>

            <template #footer>
              <dl class="text-zinc-500 text-sm flex flex-row justify-between items-center">
                <dt class="sr-only">
                  Published on
                </dt>
                <dd>
                  <time :datetime="toISODateString(article.publishedAt)">
                    {{ toLocaleDateString(article.publishedAt) }}
                  </time>
                </dd>
                <dt class="sr-only">
                  Authors
                </dt>
                <dd>
                  <ul class="flex gap-2">
                    <li v-for="author in article.authors" :key="author._id">
                      <UAvatar :src="author.picture" :alt="author.name" size="xs" />
                    </li>
                  </ul>
                </dd>
              </dl>
            </template>
          </UCard>
        </li>
      </ol>
    </section>
  </Main>
</template>
