<script lang="ts" setup>
import { Combobox, ComboboxInput, ComboboxLabel, ComboboxOptions, Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import type { SearchDisplayItem } from 'types/search'

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [boolean]
}>()

const { data: packages } = await useAsyncData('packages', () => queryContent('/packages/').find())

const defaultOptions: Record<string, SearchDisplayItem[]> = {}

if (packages.value) {
  defaultOptions.Packages = packages.value.map((item) => {
    if (!item.title || !item._path)
      return null

    return {
      id: item._path,
      title: item.title,
      titles: [],
      level: 0,
      children: null,
    } satisfies SearchDisplayItem
  }).filter(Boolean) as SearchDisplayItem[]
}

const website = useWebsite()

const selected = ref<SearchDisplayItem | null>(null)
const query = ref('')

function close() {
  emit('update:open', false)
  query.value = ''
}

function navigate() {
  if (!selected.value)
    return

  navigateTo(selected.value.id)
  close()
}

const queryDebounced = refDebounced(query, 100)
const searchResults = await useSearch(queryDebounced)

const groupedSearchResults = computed(() => {
  if (!searchResults.value)
    return []

  const grouped = searchResults.value.reduce((acc, item) => {
    const group = website.value.search.groups.find(group => item.id.startsWith(group.path))

    // Remove the top level page from the search results like `/packages` or `/blog`
    if (!group || group.path === item.id)
      return acc

    if (!acc[group.name])
      acc[group.name] = []

    const groupItems = acc[group.name]
    const topLevelItem = groupItems.find(groupItem => item.id.startsWith(groupItem.id) && groupItem.level === 0)

    if (topLevelItem && topLevelItem.children) {
      topLevelItem.children.push({
        id: item.id,
        title: item.title,
        titles: item.titles,
        level: item.level,
        children: null,
      })
    }
    else {
      groupItems.push({
        id: item.id,
        title: item.title,
        titles: item.titles,
        level: item.level,
        children: [],
      })
    }

    selectFirstOption()
    return acc
  }, {} as Record<string, SearchDisplayItem[]>)

  return grouped
})

const haveSearchResults = computed(() => {
  return Object.keys(groupedSearchResults.value).length > 0
})

const comboboxInput = ref<ComponentPublicInstance<HTMLInputElement>>()

function selectFirstOption() {
  setTimeout(() => {
    // https://github.com/tailwindlabs/headlessui/blob/6fa6074cd5d3a96f78a2d965392aa44101f5eede/packages/%40headlessui-vue/src/components/combobox/combobox.ts#L804
    comboboxInput.value?.$el.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageUp' }))
  }, 0)
}
</script>

<template>
  <TransitionRoot
    :show="open"
    as="template"
    appear
  >
    <Dialog as="div" relative z-50 @close="close">
      <TransitionChild
        appear
        as="template"
        enter="duration-200 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div fixed inset-0 bg-black bg-op-20 backdrop-blur-sm aria-hidden="true" />
      </TransitionChild>

      <div fixed inset-0>
        <div h-full flex="~ justify-center items-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel h-112 w-full max-w-3xl fixed flex="~ col" gap="6">
              <Combobox v-model="selected">
                <div p="x-4 y-2" rounded="4" bg="white" flex="~" shadow-lg>
                  <ComboboxLabel for="search" flex="~ grow items-center" gap="4">
                    <span i-heroicons-magnifying-glass-20-solid w-5 h-5 block text="gray-400" />
                    <ComboboxInput
                      id="search"
                      ref="comboboxInput"
                      type="text"
                      name="search"
                      placeholder="Search..."
                      text="placeholder:gray-400 gray-900" focus:outline-none
                      grow
                      autocomplete="off"
                      :value="query"
                      @change="query = $event.target.value"
                      @keydown.enter="navigate"
                    />
                  </ComboboxLabel>

                  <button p="0.375rem" text="gray-700" type="button" @click="$emit('update:open', false)">
                    <span i-heroicons-x-mark-20-solid w-5 h-5 block aria-hidden="true" />
                    <span sr-only>
                      Close
                    </span>
                  </button>
                </div>

                <div rounded="4" bg="white" shadow-lg overflow-hidden>
                  <ComboboxOptions static space-y-6 p="4" h-full overflow-y-scroll class="gray-scrollbar">
                    <template v-if="haveSearchResults">
                      <AppSearchGroup v-for="(value, key) in groupedSearchResults" :key="key" :name="key" :results="value as SearchDisplayItem[]" @close="close" />
                    </template>

                    <template v-else-if="!queryDebounced">
                      <AppSearchGroup v-for="(value, key) in defaultOptions" :key="key" :name="key" :results="value" @close="close" />
                    </template>

                    <div v-else p="y-4" flex="~ col items-center" gap-2>
                      <span i="heroicons-magnifying-glass-20-solid" text="gray-400" w-5 h-5 block />
                      <span text="gray-600"> We couldn't find any items with that term. Please try again. </span>
                    </div>
                  </ComboboxOptions>
                </div>
              </Combobox>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
