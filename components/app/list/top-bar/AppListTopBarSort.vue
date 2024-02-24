<script lang="ts" setup>
import type { OrderByOption } from '~/types/order'

defineProps<{
  order: -1 | 1
  orderBy: string
  orderByOptions: OrderByOption[]
}>()

defineEmits<{
  'update:order': [-1 | 1]
  'update:orderBy': [string]
}>()
</script>

<template>
  <UButtonGroup size="lg" orientation="horizontal">
    <AppListTopBarOrder :model-value="order" @update:model-value="$emit('update:order', $event)" />

    <AppListTopBarOrderBy :model-value="orderBy" :options="orderByOptions" @update:model-value="$emit('update:orderBy', $event)" />
  </UButtonGroup>
</template>
