<script lang="ts" setup>
import { ComboboxInput, ComboboxLabel } from '@headlessui/vue'
import type { SearchDisplay } from '~/types/search'

const props = defineProps<{
  searchResults: SearchDisplay
  query: string
}>()

const emit = defineEmits<{
  'update:query': [string]
  validate: []
}>()

function onChange(value: string) {
  emit('update:query', value)
  selectFirstOption()
}

watch(() => props.searchResults, () => {
  selectFirstOption()
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
  <ComboboxLabel for="search" class="grow flex items-center gap-4">
    <span class="i-heroicons-magnifying-glass-20-solid w-5 h-5 block text-zinc-400" />
    <ComboboxInput
      id="search"
      ref="comboboxInput"
      type="text"
      name="search"
      placeholder="Search..."
      class="placeholder:text-zinc-400 text-zinc-900 grow focus:outline-none"
      autocomplete="off"
      :value="query"
      @change="onChange($event.target.value)"
      @keydown.enter="$emit('validate')"
    />
  </ComboboxLabel>
</template>
