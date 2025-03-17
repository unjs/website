<script lang="ts" setup>
import type { OrderByOption } from '~/types/order'

const props = defineProps<{
  modelValue: string
  options: OrderByOption[]
}>()

defineEmits<{
  'update:model-value': [string]
}>()

const currentOrderBy = computed(() => props.options.find(item => item.id === props.modelValue))
</script>

<template>
  <USelectMenu
    :model-value="modelValue"
    :options="options"
    color="gray"
    variant="outline"
    placeholder="Order By"
    select-class="cursor-pointer"
    value-attribute="id"
    option-attribute="label"
    @update:model-value="$emit('update:model-value', $event)"
  >
    <template #label>
      {{ currentOrderBy?.label ?? 'Order By' }}
    </template>
  </USelectMenu>
</template>
