<script lang="ts" setup>
defineProps<{
  noDisclosure?: boolean
  icon?: string
}>()

const open = ref(false)

const id = useProseNavGroupId()
</script>

<template>
  <div class="text-sm">
    <div class="text-gray-950 dark:text-gray-50 font-semibold">
      <div class="hidden md:block">
        <slot name="title" />
      </div>
      <!-- eslint-disable-next-line vue/valid-v-on -->
      <UButton v-if="!noDisclosure" color="gray" variant="ghost" class="flex items-center gap-2 md:hidden" type="button" :aria-expanded="open" :aria-controls="id" :ui="{ padding: { sm: 'px-0 py-0' }, color: { gray: { ghost: 'hover:bg-transparent dark:hover:bg-transparent' } } }" @click="open = !open" @keyup.space-bar="open = !open">
        <span class="w-4 h-4" :class="icon" />
        <slot name="title" />
        <span class="i-heroicons-chevron-right-20-solid w-4 h-4 transition ease-in" :class="{ 'transform rotate-90': open }" />
      </UButton>
    </div>
    <div :id="id" class="mt-2 text-gray-500 dark:text-gray-400 md:block" :class="{ hidden: !open && !noDisclosure }">
      <slot name="links" />
    </div>
  </div>
</template>
