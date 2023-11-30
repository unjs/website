<script lang="ts" setup>
const props = defineProps<{
  modelValue: -1 | 1
}>()

const emits = defineEmits<{
  'update:model-value': [-1 | 1]
}>()

function toggleOrder() {
  const newOrder = props.modelValue === 1 ? -1 : 1
  emits('update:model-value', newOrder)
}
</script>

<template>
  <UButton
    :icon="modelValue === 1 ? 'i-heroicons-bars-arrow-up-20-solid' : 'i-heroicons-bars-arrow-down-20-solid'"
    color="gray"
    variant="solid"
    :title="modelValue === 1 ? 'Ascending order' : 'Descending order'"
    @click="toggleOrder()"
  />
</template>
