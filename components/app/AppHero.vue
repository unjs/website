<script lang="ts" setup>
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <section class="px-6 py-8 flex flex-col gap-4 bg-white rounded-2xl ring-1 ring-zinc-200">
    <h1 class="text-zinc-900 text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-wide leading-normal md:leading-normal">
      <slot name="title">
        {{ title }}
      </slot>
    </h1>
    <p class="max-w-2xl text-zinc-600 text-lg md:text-[1.75rem] leading-normal md:leading-normal">
      <slot name="description">
        {{ description }}
      </slot>
    </p>
  </section>
</template>
