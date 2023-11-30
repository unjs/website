<script lang="ts" setup>
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <!-- TODO: remove this file -->
  <section class="relative overflow-hidden px-8 py-12 rounded-xl ring-1 dark:ring-zinc-700 grid grid-cols-2">
    <div class="flex flex-col gap-4">
      <h1 class="dark:text-gray-50 text-2xl md:text-3xl lg:text-[2.5rem] font-extrabold tracking-wide leading-normal md:leading-normal">
        <slot name="title">
          {{ title }}
        </slot>
      </h1>
      <p class="max-w-2xl dark:text-zinc-400 text-lg md:text-[1.75rem] leading-normal md:leading-normal">
        <slot name="description">
          {{ description }}
        </slot>
      </p>
    </div>

    <div class="relative z-10">
      <slot name="right" />
    </div>

    <img src="/assets/header/ellipse.svg" alt="A yellow ellipse to decorate the header" aria-hidden="true" class="absolute right-[-120px] top-[-130px]">
  </section>
</template>
