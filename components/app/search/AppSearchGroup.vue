<script lang="ts" setup>
import { ComboboxOption } from '@headlessui/vue'
import type { SearchDisplayItem } from 'types/search'

defineProps<{
  name: string
  results: SearchDisplayItem[]
}>()

const emit = defineEmits<{
  close: []
}>()

function close() {
  emit('close')
}

function isLastChildren(children: SearchDisplayItem[] | null, index: number) {
  if (!children)
    return false

  return index === children.length - 1
}
</script>

<template>
  <section>
    <h2 text="gray-700" font="bold" m="b-2">
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
          @click="close"
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
          @click="close"
        />
      </ComboboxOption>
    </template>
  </section>
</template>
