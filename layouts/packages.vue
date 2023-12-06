<script lang="ts" setup>
import type { Package } from '~/types/package'

const { page } = useContent()

const fields = ['_path', 'title', 'description']
const { data: packages } = await useAsyncData('content:packages', () => queryContent<Package>('/packages/').only(fields).find())

if (!packages.value) {
  throw createError({
    statusCode: 500,
    message: 'No packages found',
  })
}

const { search, searchResults } = useSimpleSearch(packages as Ref<Package[]>, {
  idField: 'title',
  fields,
  storeFields: fields,
  searchOptions: {
    boost: {
      title: 2,
      description: 1,
    },
  },
})

const orderByOptions = [
  {
    id: 'title',
    label: 'Name',
  },
]
const { order, toggleOrder, orderBy, currentOrderBy, sort } = useOrder(1, { init: 'title', options: orderByOptions })

const results = sort(searchResults)
</script>

<template>
  <Head>
    <SchemaOrgWebPage :type="['CollectionPage']" />
  </Head>
  <main class="my-6 md:my-10">
    <AppHero :title="page.title" :description="page.description" />

    <section class="mt-8">
      <h2 class="sr-only">
        Packages list
      </h2>

      <div class="p-4 rounded-lg ring-1 ring-zinc-200 bg-white flex items-center justify-between">
        <UInput
          v-model="search"
          color="white"
          variant="outline"
          name="search-packages"
          placeholder="Search a package"
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

      <ol v-if="packages" class="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 place-items-stretch">
        <li v-for="item in results" :key="item.title">
          <UCard as="article" :ui="{ base: 'h-full relative', divide: '', shadow: 'shadow-none hover:shadow-lg', rounded: 'rounded-xl', header: { base: 'flex gap-3 items-center', padding: 'py-0 pt-4 sm:px-4 sm:pt-4' }, body: { padding: 'p-4 sm:p-4' } }">
            <template #header>
              <img :src="toPackageLogo(item.title!)" :alt="`Logo of ${item.title}`" w-12 h-12>
              <h3 class="text-xl font-semibold">
                <NuxtLink :to="item._path" class="absolute inset-0" />
                {{ item.title }}
              </h3>
            </template>

            <p class="text-zinc-500">
              {{ item.description }}
            </p>
          </UCard>
        </li>
        <li v-if="!results.length" class="col-span-full">
          <p class="text-center text-zinc-500">
            No packages found
          </p>
        </li>
      </ol>
    </section>
  </main>
</template>
