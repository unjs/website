<script lang="ts" setup>
import { Combobox, ComboboxButton, ComboboxInput, ComboboxLabel, ComboboxOption, ComboboxOptions } from '@headlessui/vue'
import { UButton } from '#components'
import type { SearchDisplayItem } from '~/types/search'

defineProps<{
  open: boolean
}>()

const emits = defineEmits<{
  'update:open': [boolean]
}>()

const selected = ref<SearchDisplayItem | null>(null)

const query = ref('')
const queryDebounced = ref('')
watchDebounced(
  query,
  () => {
    queryDebounced.value = query.value
    selectFirstOption()
  },
  { debounce: 100, maxWait: 300 },
)

const resultsOptions = await useSearchResults(queryDebounced, { lazy: true, server: false }) // Options to avoid to add `/api/search.txt` to the payload
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

  close()
  navigateTo(value.id)
}

function close() {
  emits('update:open', false)
  setTimeout(() => {
    query.value = ''
    selected.value = null
  }, 200)
}

const comboboxInput = ref<ComponentPublicInstance<HTMLElement>>()

function resetQuery() {
  query.value = ''
  queryDebounced.value = ''
  comboboxInput.value?.$el.focus()
  selectFirstOption()
}

function selectFirstOption() {
  setTimeout(() => {
    // https://github.com/tailwindlabs/headlessui/blob/6fa6074cd5d3a96f78a2d965392aa44101f5eede/packages/%40headlessui-vue/src/components/combobox/combobox.ts#L804
    comboboxInput.value?.$el.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageUp' }))
  }, 0)
}
</script>

<template>
  <UModal :model-value="open" :overlay="false" :transition="false" :ui="{ height: 'h-screen sm:h-auto', width: 'sm:max-w-3xl', padding: 'p-0 sm:p-4', rounded: 'rounded-none sm:rounded-lg' }" @update:model-value="close">
    <div class="min-h-0 flex-1 sm-h-[28rem] flex flex-col">
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
          <ComboboxButton
            :as="UButton"
            icon="i-heroicons-x-mark"
            color="gray"
            variant="ghost"
            square
            size="xs"
            class="absolute top-1/2 transform -translate-y-1/2 right-4"
            @click="close"
          />
        </div>
        <ComboboxOptions static class="grow  overflow-y-auto">
          <template v-if="options">
            <div class="divide-y divide-gray-200 dark:divide-gray-800">
              <div v-for="(value, key) in options" :key="key" class="px-4 pb-4">
                <h2 class="mt-2 pt-2 pb-1 sticky top-0 bg-white dark:bg-gray-900 w-full z-10 capitalize text-sm font-bold text-gray-500 dark:text-gray-400">
                  {{ key }}
                </h2>
                <template v-for="option in value" :key="option.id">
                  <ComboboxOption
                    v-slot="{ active }"
                    :value="option"
                    @click="close"
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
                    @click="close"
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
          <div v-else class="w-full h-full flex flex-col gap-8 justify-center items-center">
            <span class="text-gray-950 dark:text-gray-50">
              No results found
            </span>

            <UButton color="gray" variant="ghost" icon="i-heroicons-arrow-path" @click="resetQuery">
              Reset search
            </UButton>
          </div>
        </ComboboxOptions>
      </Combobox>
    </div>
  </UModal>
</template>
