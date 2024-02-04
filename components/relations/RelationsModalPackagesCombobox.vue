<script lang="ts" setup>
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/vue'
import { breakpointsTailwind } from '@vueuse/core'
import { UInput } from '#components'
import type { RelationPackage } from '~/types/package'

const props = defineProps<{
  packages: RelationPackage[]
}>()

// TODO: update type
const selection = defineModel<RelationPackage[]>('selection')

const breakpoints = useBreakpoints(breakpointsTailwind)

const query = ref('')
const search = computed(() => {
  return props.packages.filter((item) => {
    return item.name.toLowerCase().includes(query.value.toLowerCase())
  })
})
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
  <Combobox v-model="selection" multiple by="name" as="template">
    <ComboboxInput v-model="query" :as="UInput" color="primary" variant="outline" placeholder="Search a package..." class="mb-2" />
    <ComboboxOptions id="options" static as="ol" class="grid grid-flow-col grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-2">
      <template v-if="search.length">
        <ComboboxOption v-for="item in search" :key="item.name" v-slot="{ active, selected }" as="template" :value="item">
          <li class="w-full">
            <UButton :ui="{ base: 'w-full' }" :class="{ 'text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800': active }" color="gray" variant="ghost" :active="active" tabindex="-1">
              <template #leading>
                <UAvatar :src="toPackageLogo(item.name)" :alt="`Logo of ${item.name}`" size="xs" :ui="{ rounded: '' }" />
              </template>
              <span class="grow text-start">
                {{ item.name }}
              </span>
              <template v-if="selected" #trailing>
                <span class="i-heroicons-check" />
              </template>
            </UButton>
          </li>
        </ComboboxOption>
      </template>
      <div v-else class="text-center xl:col-span-3">
        <span>
          No results
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
