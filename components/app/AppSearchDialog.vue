<script lang="ts" setup>
import { Combobox, Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import AppSearchInput from './search/AppSearchInput.vue'
import type { SearchDisplayItem } from '~/types/search'

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [boolean]
}>()

const selected = ref<SearchDisplayItem | null>(null)
const query = ref('')

const queryDebounced = refDebounced(query, 100)
const results = await useSearchResults(queryDebounced, { lazy: true, server: false }) // Options to avoid to add `/api/search.txt` to the payload

const defaultOptions = await useSearchDefaultResults()

function close() {
  emit('update:open', false)
  setTimeout(() => {
    query.value = ''
    selected.value = null
  }, 200)
}

function navigate() {
  if (!selected.value)
    return

  close()
  navigateTo(selected.value.id)
}
</script>

<template>
  <!-- TODO: need to rework everything in search (rebuild it from the ground up) -->
  <TransitionRoot
    :show="open"
    as="template"
    appear
  >
    <Dialog as="div" class="relative z-50" @close="close">
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
        <div class="fixed inset-0 bg-gray-100/70 dark:bg-gray-900/70 backdrop-blur-sm" aria-hidden="true" />
      </TransitionChild>

      <div class="fixed inset-0">
        <div class="h-full w-full flex justify-center items-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="h-[28rem] w-[calc(100%-2rem)] lg:w-full max-w-3xl fixed flex flex-col gap-6 drop-shadow-lg">
              <Combobox v-model="selected">
                <div class="relative">
                  <AppSearchInput v-model:query="query" class="w-full" :search-results="results" @validate="navigate" />

                  <button class="absolute right-4 top-0 bottom-0 flex items-center text-gray-500 dark:text-gray-400" type="button" @click="$emit('update:open', false)">
                    <span class="i-heroicons-x-mark-20-solid w-5 h-5 block" aria-hidden="true" />
                    <span class="sr-only">
                      Close
                    </span>
                  </button>
                </div>

                <div class="overflow-y-hidden">
                  <AppSearchResult
                    class="gray-scrollbar static h-full overflow-y-scroll"
                    static
                    :search-results="results"
                    :default-results="defaultOptions"
                    :have-query="!!queryDebounced"
                    @selected="close"
                  />
                </div>
              </Combobox>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
