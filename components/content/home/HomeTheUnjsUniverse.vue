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
    <div class="relative overflow-hidden">
      <HomeTheUnjsUniverseCarousel :parts="carousel" />
    </div>
    <div class="flex justify-center">
      <UButton :to="`${cta.to}?utm_source=unjs.io&utm_medium=home-carousel`" size="md" color="gray" icon="i-heroicons-chevron-right-20-solid" trailing>
        {{ cta.text }}
      </UButton>
    </div>
  </HomeSection>
</template>
