<script lang="ts" setup>
defineProps<{
  eyebrow?: string
  title?: string
  subtitle?: string
}>()
</script>

<template>
  <section class="flex flex-col gap-6">
    <div class="px-6 py-8 bg-gray-300/20 ring-gray-300 dark:bg-gray-700/20 rounded-lg ring-1 dark:ring-gray-700">
      <div class="max-w-3xl flex flex-col gap-4">
        <p class="dark:text-gray-300 md:text-xl font-semibold tracking-wide">
          <slot name="eyebrow">
            {{ eyebrow }}
          </slot>
        </p>
        <h2 class="text-2xl md:text-3xl lg:text-4xl text-gray-950 dark:text-gray-50 font-extrabold tracking-wide">
          <slot name="title">
            {{ title }}
          </slot>
        </h2>
        <p class="text-lg md:text-[1.75rem] text-gray-500 dark:text-gray-400 md:leading-tight">
          <slot name="subtitle">
            {{ subtitle }}
          </slot>
        </p>
      </div>
    </div>
    <slot />
  </section>
</template>
