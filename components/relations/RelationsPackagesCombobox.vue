<script lang="ts" setup>
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/vue'
import { breakpointsTailwind } from '@vueuse/core'
import { UInput } from '#components'
import type { RelationPackage } from '~/types/package'

const props = defineProps<{
  packages: RelationPackage[]
  logo?: string
}>()

const selection = defineModel<RelationPackage[]>('selection')

const query = ref('')
const search = computed(() => {
  return props.packages.filter((item) => {
    return item.name.toLowerCase().includes(query.value.toLowerCase())
  })
})

const breakpoints = useBreakpoints(breakpointsTailwind)
const breakpoint = computed(() => {
  if (breakpoints.greaterOrEqual('xl').value)
    return 5
  if (breakpoints.greaterOrEqual('md').value)
    return 3
  return 1
})
const rows = computed(() => {
  if (search.value.length <= breakpoint.value)
    return search.value.length

  return Math.ceil(search.value.length / breakpoint.value)
})
</script>

<template>
  <Combobox v-model="selection" multiple by="name" as="div">
    <ComboboxInput v-model="query" :as="UInput" color="primary" variant="outline" placeholder="Search a package..." class="mb-2" />
    <ComboboxOptions id="options" static as="ol" class="grid grid-flow-col grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
      <template v-if="search.length">
        <li v-for="item in search" :key="item.name" class="w-full flex flex-row gap-1">
          <ComboboxOption v-slot="{ active, selected }" as="template" :value="item">
            <UButton :ui="{ base: 'grow' }" :icon="logo" :class="{ 'text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800': active }" color="gray" variant="ghost" :active="active" tabindex="-1">
              <template #leading>
                <slot name="logo" :item="item" />
              </template>
              <span class="grow text-start">
                {{ item.name }}
              </span>
              <template #trailing>
                <span v-if="selected" class="i-heroicons-check w-4" />
              </template>
            </UButton>
          </ComboboxOption>
          <slot name="actions" :item="item" />
        </li>
      </template>
      <div v-else class="text-center col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-5">
        <span v-if="packages.length">
          No results
        </span>
        <span v-else>
          No packages
        </span>
      </div>
    </ComboboxOptions>
  </Combobox>
</template>

<style scoped>
#options {
  grid-template-rows: repeat(v-bind(rows), minmax(0, 1fr));
}
</style>
