<script lang="ts" setup>
const { page } = useContent()

const { data: packages } = await useFetch('/api/content/packages')

if (!packages.value) {
  throw createError({
    statusCode: 500,
    message: 'No packages found',
  })
}

const monthlyDownloads = computed(() => packages.value!.reduce((acc, pkg) => {
  if (!pkg.monthlyDownloads)
    return acc

  acc += pkg.monthlyDownloads
  return acc
}, 0))

const { search, searchResults } = useSimpleSearch(packages, { idField: 'title', fields: ['title', 'description'], storeFields: ['title', 'description', '_path', 'stars', 'monthlyDownloads', 'contributors'] })

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
const { order, toggleOrder, orderBy, currentOrderBy, sort } = useOrder(1, { init: 'title', options: orderByOptions })

const results = sort(searchResults)
</script>

<template>
  <Head>
    <SchemaOrgWebPage :type="['CollectionPage']" />
  </Head>
  <Main>
    <template #header>
      <PageHeader :title="page.title" :description="page.description">
        <template #right>
          <div class="flex justify-end gap-12 text-gray-400 font-medium text-xl">
            <div class="flex flex-col gap-2">
              <span class="text-gray-50 text-8xl font-extrabold">
                {{ packages!.length }}
              </span>
              <span>
                Packages
              </span>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-gray-50 text-8xl font-extrabold">
                {{ formatNumber(monthlyDownloads, 0) }}
              </span>
              <span>
                Monthly Downloads
              </span>
            </div>
          </div>
        </template>
      </PageHeader>
    </template>

    <section class="mt-8">
      <h2 class="sr-only">
        Packages list
      </h2>

      <div class="grid grid-cols-3 gap-8">
        <UInput
          v-model="search"
          size="lg"
          color="gray"
          variant="outline"
          name="search-package"
          placeholder="Search a package"
          icon="i-heroicons-magnifying-glass-solid"
        />
        <div class="col-span-2 flex items-center justify-end gap-3">
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

      <ol v-if="packages" class="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 place-items-stretch">
        <li v-for="item in results" :key="item.title">
          <UCard as="article" :ui="{ base: 'h-full relative flex flex-col', background: 'dark:bg-gray-700/40 hover:dark:bg-gray-700/60', divide: '', shadow: 'shadow-none hover:shadow-lg ', ring: 'dark:highlight-white/10', rounded: 'rounded-lg', header: { base: 'flex gap-3 items-center', padding: 'py-0 pt-4 sm:px-4 sm:pt-4' }, body: { base: 'grow', padding: 'p-4 sm:p-4' }, footer: { padding: 'py-0 pb-4 sm:px-4 sm:pb-4' } }">
            <template #header>
              <img :src="toPackageLogo(item.title!)" :alt="`Logo of ${item.title}`" w-12 h-12>
              <h3 class="dark:text-gray-50 text-xl font-semibold">
                <NuxtLink :to="item._path" class="absolute inset-0" />
                {{ item.title }}
              </h3>
            </template>

            <p class="dark:text-gray-400">
              {{ item.description }}
            </p>

            <template #footer>
              <dl class="grid grid-cols-3 text-sm text-gray-400 font-semibold">
                <div>
                  <dt class="sr-only">
                    Stars
                  </dt>
                  <dd class="flex items-center gap-1">
                    <span class="i-heroicons-star-20-solid h-[0.875rem] w-[0.875rem]" />
                    <span>
                      {{ formatNumber(item.stars) }}
                    </span>
                  </dd>
                </div>
                <div class="place-self-center">
                  <template v-if="item.monthlyDownloads">
                    <dt class="sr-only">
                      Monthly Downloads
                    </dt>
                    <dd class="flex items-center gap-1">
                      <span class="i-heroicons-arrow-trending-up-solid h-[0.875rem] w-[0.875rem]" />
                      <span>
                        {{ formatNumber(item.monthlyDownloads) }}
                      </span>
                    </dd>
                  </template>
                </div>
                <div class="place-self-end">
                  <dt v-if="item.contributors" class="sr-only">
                    Contributors
                  </dt>
                  <dd class="flex items-center gap-1">
                    <span class="i-heroicons-user-group-20-solid h-[0.875rem] w-[0.875rem]" />
                    <span>
                      {{ formatNumber(item.contributors) }}
                    </span>
                  </dd>
                </div>
              </dl>
            </template>
          </UCard>
        </li>
        <li v-if="results.length === 0" class="col-spance-1 md:col-span-2 xl:col-span-3 text-center">
          No packages found
        </li>
      </ol>
    </section>
  </Main>
</template>
