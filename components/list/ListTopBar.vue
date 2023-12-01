import type { emit } from 'process';
<script lang="ts" setup>
import type { OrderByOption } from '~/types/order'

withDefaults(defineProps<{
  searchPlaceholder: string
  search: string
  order: -1 | 1
  orderBy: string
  orderByOptions: OrderByOption[]
}>(), {
  searchPlaceholder: 'Search',
})

defineEmits<{
  'update:search': [string]
  'update:order': [-1 | 1]
  'update:orderBy': [string]
  'reset': []
}>()

const isFilterOpen = ref<boolean>(false)
function openFilter() {
  isFilterOpen.value = !isFilterOpen.value
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
    <div class="flex flex-row">
      <ListTopBarSearch class="grow md:grow-0 lg:grow" :model-value="search" :placeholder="searchPlaceholder" @update:model-value="$emit('update:search', $event)" />

      <UButton
        v-model="isFilterOpen"
        :ui="{ base: 'ml-4 lg:hidden' }"
        size="lg"
        icon="i-heroicons-adjustments-horizontal-solid"
        color="gray"
        variant="solid"
        :title="isFilterOpen ? 'Close filters' : 'Open filters'"
        @click="openFilter()"
      />
    </div>

    <div class="hidden lg:flex lg:col-span-2 items-center flex-wrap justify-end gap-3">
      <slot name="right" />

      <ListTopBarSort :order="order" :order-by="orderBy" :order-by-options="orderByOptions" @update:order="$emit('update:order', $event)" @update:order-by="$emit('update:orderBy', $event)" />

      <UTooltip text="Reset filter">
        <UButton
          size="lg"
          color="gray"
          variant="solid"
          title="Reset filter"
          icon="i-heroicons-arrow-path-20-solid"
          @click="$emit('reset')"
        />
      </UTooltip>
    </div>
  </div>
  <UModal v-model="isFilterOpen">
    <UCard>
      <h2 class="text-2xl font-bold mb-6">
        Filters
      </h2>

      <div class="grid grid-cols-2 gap-4">
        <slot name="right" />

        <ListTopBarSort :order="order" :order-by="orderBy" :order-by-options="orderByOptions" @update:order="$emit('update:order', $event)" @update:order-by="$emit('update:orderBy', $event)" />
      </div>

      <div class="mt-6 flex flex-row justify-end gap-4">
        <UButton
          size="lg"
          color="gray"
          variant="ghost"
          @click="$emit('reset')"
        >
          Reset
        </UButton>
        <UButton
          v-model="isFilterOpen"
          size="lg"
          color="gray"
          variant="ghost"
          :title="isFilterOpen ? 'Close filters' : 'Open filters'"
          @click="openFilter()"
        >
          Close
        </UButton>
      </div>
    </UCard>
  </UModal>
</template>
