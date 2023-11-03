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
        <div class="fixed inset-0 bg-black/20 backdrop-blur-sm" aria-hidden="true" />
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
                <div class="px-4 py-2 rounded-2xl bg-white flex">
                  <AppSearchInput v-model:query="query" :search-results="results" @validate="navigate" />

                  <button class="p-[0.375rem] text-zinc-700" type="button" @click="$emit('update:open', false)">
                    <span class="i-heroicons-x-mark-20-solid w-5 h-5 block" aria-hidden="true" />
                    <span class="sr-only">
                      Close
                    </span>
                  </button>
                </div>

                <div class="rounded-2xl bg-white overflow-hidden">
                  <AppSearchResult
                    class="gray-scrollbar static space-y-6 p-4 h-full overflow-y-scroll"
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
