<script lang="ts" setup>
import { Combobox, ComboboxInput, ComboboxLabel, ComboboxOption, ComboboxOptions } from '@headlessui/vue'
import { UButton } from '#components'
import type { SearchDisplayItem } from '~/types/search'

const route = useRoute()

const { data: page, error } = await useAsyncData(route.path, () => queryContent(route.path).findOne())

if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Page not found',
    fatal: true,
  })
}

useSeoMeta({
  title: page.value?.title,
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description,
})

defineOgImageComponent('OgImagePage', {
  title: page.value?.title,
  description: page.value?.description,
  illustration: '/assets/header/dark/search.png',
})

const query = ref<string>(route.query.q as string || '')
const queryDebounced = ref<string>(query.value)
watchDebounced(
  query,
  () => {
    if (!query.value)
      return navigateTo({})

    navigateTo({
      query: {
        q: query.value,
      },
    })
  },
  { debounce: 100, maxWait: 300 },
)
watch(() => route.query, (value) => {
  queryDebounced.value = value.q as string | undefined || ''
  selectFirstOption()
})

const resultsOptions = await useSearchResults(queryDebounced)
const defaultOptions = await useSearchDefaultResults()
const options = computed(() => {
  if (Object.keys(resultsOptions.value).length > 0)
    return resultsOptions.value

  if (!queryDebounced.value)
    return defaultOptions.value

  return null
})

function getLength(data: SearchDisplayItem): number {
  let value = 1
  if (data.children && data.children.length) {
    for (const item of data.children)
      value += getLength(item)
  }

  return value
}

watch(options, (value) => {
  if (!query.value)
    return

  let length = 0

  if (value) {
    for (const key in value) {
      for (const item of value[key])
        length += getLength(item)
    }
  }

  useTrackEvent('Search', { props: { query: `${query.value} - ${length} results` } })
})

function isLastChildren(children: SearchDisplayItem[] | null, index: number) {
  if (!children)
    return false

  return index === children.length - 1
}

function onSelection(value: SearchDisplayItem | null) {
  if (!value)
    return

  navigateTo(value.id)
}

const comboboxInput = ref<ComponentPublicInstance<HTMLElement> | null>(null)

function resetQuery() {
  query.value = ''
  queryDebounced.value = ''

  if (!comboboxInput.value)
    return

  comboboxInput.value?.$el.focus()
  selectFirstOption()
}

function selectFirstOption() {
  setTimeout(() => {
    // https://github.com/tailwindlabs/headlessui/blob/6fa6074cd5d3a96f78a2d965392aa44101f5eede/packages/%40headlessui-vue/src/components/combobox/combobox.ts#L804
    if (!comboboxInput.value)
      return
    comboboxInput.value?.$el.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageUp' }))
  }, 0)
}
</script>

<template>
  <Main v-if="page">
    <template #header>
      <PageHeader :title="page.title" :description="page.description">
        <template #right>
          <div>
            <AppColorModeImage light="/assets/header/light/search.png" dark="/assets/header/dark/search.png" alt="Illustration" aria-hidden="true" class="absolute left-24 top-0 opacity-70 w-80" />
          </div>
        </template>
      </PageHeader>
    </template>
    <Combobox as="div" class="flex flex-col flex-1 min-h-0 divide-y divide-gray-100 dark:divide-gray-800" @update:model-value="onSelection($event)">
      <div class="relative shrink-0 h-16 sm:h-auto">
        <ComboboxLabel class="h-full flex items-center gap-2 px-4 sm:py-4">
          <span class="i-heroicons-magnifying-glass w-5 h-5 text-gray-500 dark:text-gray-400" />
          <ComboboxInput
            ref="comboboxInput"
            :value="query"
            autofocus type="text"
            name="search" placeholder="Search..."
            class="grow bg-transparent focus-within:outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400"
            @change="query = $event.target.value"
          />
        </ComboboxLabel>
      </div>
      <ComboboxOptions static class="divide-y divide-gray-200 dark:divide-gray-800" as="ul">
        <template v-if="options">
          <div v-for="(value, key) in options" :key="key" class="px-4 pb-4">
            <h2 class="mt-2 pt-2 pb-1 capitalize text-sm font-bold text-gray-500 dark:text-gray-400">
              {{ key }}
            </h2>
            <template v-for="option in value" :key="option.id">
              <ComboboxOption
                v-slot="{ active }"
                :value="option"
              >
                <SearchItem
                  :active="active"
                  :item="option"
                />
              </ComboboxOption>
              <ComboboxOption
                v-for="(childOption, index) in option.children"
                :key="childOption.id"
                v-slot="{ active }"
                :value="childOption"
              >
                <SearchItem
                  :active="active"
                  :item="childOption"
                  child
                  :last="isLastChildren(option.children, index)"
                />
              </ComboboxOption>
            </template>
          </div>
        </template>
        <div v-else class="mt-12 flex flex-col gap-8 justify-center items-center">
          <span class="text-gray-950 dark:text-gray-50">
            No results found
          </span>

          <UButton color="gray" variant="ghost" icon="i-heroicons-arrow-path" @click="resetQuery">
            Reset search
          </UButton>
        </div>
      </ComboboxOptions>
    </Combobox>
  </Main>
</template>
