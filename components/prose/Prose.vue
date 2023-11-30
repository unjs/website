<script lang="ts" setup>
import type { Toc } from '@nuxt/content/dist/runtime/types'

const props = defineProps<{
  title?: string
  toc?: Toc
}>()

provide('toc', props.toc)
</script>

<template>
  <article class="grid grid-cols-1 md:grid-cols-[70%_1fr] xl:grid-cols-[75%_1fr] gap-y-12 md:gap-y-0 md:gap-x-8 items-start">
    <div class="row-start-1">
      <slot name="header">
        <header v-if="title">
          <h1 class="text-zinc-900 text-2xl md:text-3xl font-bold tracking-wide">
            {{ title }}
          </h1>
        </header>
      </slot>
    </div>

    <ProseContent class="col-start-1 row-start-3 md:row-start-2" :class="{ 'md:mt-8': title || $slots.header }">
      <slot />
    </ProseContent>

    <ProseNav class="col-start-1 row-start-2 md:col-start-2 md:row-start-1 md:row-span-2 md:sticky top-4 md:overflow-y-auto md:max-h-[calc(100vh-1rem)] gray-scrollbar">
      <ProseNavToc v-if="toc" />

      <slot name="nav" />
    </ProseNav>
  </article>
</template>
