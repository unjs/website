<script lang="ts" setup>
withDefaults(defineProps<{
  modelValue: string
  placeholder: string
}>(), {
  placeholder: 'Search',
})

defineEmits<{
  'update:model-value': [string]
}>()
</script>

<template>
  <UInput
    :model-value="modelValue"
    size="lg"
    color="gray"
    variant="outline"
    name="search"
    :placeholder="placeholder"
    icon="i-heroicons-magnifying-glass-solid"
    @update:model-value="$emit('update:model-value', $event)"
  />
</template>
