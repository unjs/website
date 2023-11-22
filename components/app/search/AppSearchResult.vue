<script lang="ts" setup>
import { ComboboxOptions } from '@headlessui/vue'
import type { SearchDisplay, SearchDisplayItem } from '~/types/search'

const props = defineProps<{
  searchResults: SearchDisplay
  defaultResults: SearchDisplay
  haveQuery: boolean
}>()

const emit = defineEmits<{
  selected: []
}>()

const hasResult = computed(() => {
  return Object.keys(props.searchResults).length > 0
})

function onSelected() {
  emit('selected')
}
</script>

<template>
  <ComboboxOptions class="space-y-6">
    <template v-if="hasResult">
      <AppSearchGroup v-for="(value, key) in searchResults" :key="key" :name="key" :results="value as SearchDisplayItem[]" @selected="onSelected" />
    </template>

    <template v-else-if="!haveQuery">
      <AppSearchGroup v-for="(value, key) in defaultResults" :key="key" :name="key" :results="value" @selected="onSelected" />
    </template>

    <AppSearchEmpty v-else />
  </ComboboxOptions>
</template>
