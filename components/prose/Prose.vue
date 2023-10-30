<script lang="ts" setup>
import type { Toc } from '@nuxt/content/dist/runtime/types'


const props = defineProps<{
  toc?: Toc
}>()

provide('toc', props.toc)
</script>

<template>
  <article class="pt-6 md:pt-10 pb-10 md:pb-20 bg-white rounded-2xl grid grid-cols-[1fr_320px] gap-x-8 items-start">
    <div>
      <slot name="header" />
    </div>

    <ProseContent class="mt-8 col-start-1">
      <slot />
    </ProseContent>

    <ProseNav class="col-start-2 row-start-1 row-span-2 sticky top-4">
      <ProseNavToc />

      <slot name="nav" />
    </ProseNav>
  </article>
</template>
