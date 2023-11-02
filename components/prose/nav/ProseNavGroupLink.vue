<script lang="ts" setup>
const props = defineProps<{
  to?: string
  icon?: string
}>()

const iconClass = 'w-5 h-5'

const external = computed(() => {
  if (!props.to)
    return false

  return props.to.startsWith('http')
})
</script>

<template>
  <NuxtLink :to="to" class="py-1 flex gap-x-1 hover:text-zinc-900 transition ease-in" rel="noopener">
    <div class="flex items-center gap-x-2">
      <slot name="icon" :class="iconClass">
        <span v-if="icon" :class="[icon, iconClass]" />
      </slot>

      <slot />
    </div>

    <div v-if="external" class="i-heroicons-arrow-up-right-20-solid w-3 h-3" />
  </NuxtLink>
</template>
