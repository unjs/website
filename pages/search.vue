<script lang="ts" setup>
import { Combobox, ComboboxInput, ComboboxLabel, ComboboxOption, ComboboxOptions } from '@headlessui/vue'
import { UButton } from '#components'
import type { SearchDisplayItem } from '~/types/search'

const route = useRoute()
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
  <Main>
    <Combobox @update:model-value="onSelection($event)">
      <div class="relative shrink-0 h-16 sm:h-auto border-b border-b-gray-200 dark:border-b-gray-800">
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
      <ComboboxOptions static class="grow  overflow-y-auto">
        <template v-if="options">
          <div class="divide-y divide-gray-200 dark:divide-gray-800">
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
