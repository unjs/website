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
}>()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
    <ListTopBarSearch :model-value="search" :placeholder="searchPlaceholder" @update:model-value="$emit('update:search', $event)" />

    <div class="lg:col-span-2 flex items-center flex-wrap justify-end gap-3">
      <slot name="right" />

      <ListTopBarSort :order="order" :order-by="orderBy" :order-by-options="orderByOptions" @update:order="$emit('update:order', $event)" @update:order-by="$emit('update:orderBy', $event)" />
    </div>
  </div>
</template>
