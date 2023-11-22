<script lang="ts" setup>
import { ComboboxOption } from '@headlessui/vue'
import type { SearchDisplayItem } from '~/types/search'

defineProps<{
  name: string
  results: SearchDisplayItem[]
}>()

const emit = defineEmits<{
  selected: []
}>()

function onSelected() {
  emit('selected')
}

function isLastChildren(children: SearchDisplayItem[] | null, index: number) {
  if (!children)
    return false

  return index === children.length - 1
}
</script>

<template>
  <section class="p-4 dark:bg-gray-700/20 ring-1 dark:ring-gray-700 rounded-lg">
    <h2 class="dark:text-gray-400 capitalize font-bold mb-2">
      {{ name }}
    </h2>
    <template v-for="item in results" :key="item.id">
      <ComboboxOption
        v-slot="{ active }"
        :value="item"
        as="div"
      >
        <AppSearchGroupItem
          :active="active"
          :item="item"
          @click="onSelected"
        />
      </ComboboxOption>
      <ComboboxOption
        v-for="(child, index) in item.children"
        :key="child.id"
        v-slot="{ active }"
        :value="child"
        as="div"
      >
        <AppSearchGroupItem
          :active="active" :item="child" child :last="isLastChildren(item.children, index)"
          @click="onSelected"
        />
      </ComboboxOption>
    </template>
  </section>
</template>
