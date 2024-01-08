<script lang="ts" setup>
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <section class="relative overflow-hidden px-4 py-8 lg:px-8 lg:py-12 rounded-xl ring-1 ring-gray-300 dark:ring-gray-700 grid lg:grid-cols-2 lg:min-h-[280px]">
    <div class="flex flex-col gap-2 lg:gap-4">
      <h1 class="text-gray-950 dark:text-gray-50 text-2xl md:text-3xl lg:text-[2.5rem] font-extrabold tracking-wide leading-normal md:leading-normal">
        <slot name="title">
          {{ title }}
        </slot>
      </h1>
      <p class="max-w-2xl text-gray-500 dark:text-gray-400 text-lg md:text-[1.75rem] leading-normal md:leading-normal">
        <slot name="description">
          {{ description }}
        </slot>
      </p>
    </div>

    <div class="hidden lg:block relative z-10">
      <slot name="right" />
    </div>

    <img src="/assets/header/ellipse.svg" alt="A yellow ellipse to decorate the header" aria-hidden="true" class="absolute top-[-60px] right-[-80px] lg:top-[-130px] lg:right-[-120px]">
  </section>
</template>
