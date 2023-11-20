<script lang="ts" setup>
const props = defineProps<{
  label?: string
  to?: string
  icon?: string
  noExternal?: boolean
}>()

const iconClass = 'w-5 h-5'

const external = computed(() => {
  if (!props.to || props.noExternal)
    return false

  return props.to.startsWith('http')
})
</script>

<template>
  <NuxtLink :to="to" class="block group py-1 hover:dark:text-gray-50 transition ease-in" rel="noopener">
    <div class="text-xs font-medium dark:text-zinc-400" :class="{ 'ml-7': icon }">
      <slot name="label">
        {{ label }}
      </slot>
    </div>

    <div class="flex gap-x-1">
      <div class="flex items-center gap-x-2">
        <slot name="icon" :class="iconClass">
          <span v-if="icon" :class="[icon, iconClass]" />
        </slot>

        <slot />
      </div>

      <div v-if="external" class="i-heroicons-arrow-up-right-20-solid w-3 h-3" />
    </div>
  </NuxtLink>
</template>
