<script lang="ts" setup>
import type { PuzzlePart } from '~/types/puzzle'

defineProps<{
  cta: { to: string; text: string }
  carousel: PuzzlePart[]
}>()
</script>

<template>
  <HomeSection>
    <template #eyebrow>
      <ContentSlot :use="$slots.eyebrow" unwrap="p" />
    </template>
    <template #title>
      <ContentSlot :use="$slots.title" unwrap="p" />
    </template>
    <template #subtitle>
      <ContentSlot :use="$slots.subtitle" unwrap="p" />
    </template>
    <div relative overflow-hidden>
      <HomeTheUnjsUniverseCarousel :parts="carousel" />
    </div>
    <div flex="~ justify-center">
      <NuxtLink :to="`${cta.to}?utm_source=unjs.io&utm_medium=home-carousel`" px-3 py-2 bg-white flex="~ items-center" gap-2 text-gray-900 class="rounded-[0.375rem]" hover:shadow-md transition ease-in duration-150>
        <span>
          {{ cta.text }}
        </span>
        <span i-heroicons-chevron-right-20-solid w-5 h-5 />
      </NuxtLink>
    </div>
  </HomeSection>
</template>
