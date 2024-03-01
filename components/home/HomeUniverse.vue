<script lang="ts" setup>
import type { PuzzlePart } from '~/types/puzzle'

defineProps<{
  eyebrow?: string
  title?: string
  subtitle?: string
  cta: { to: string, label: string }
  carousel: PuzzlePart[]
}>()
</script>

<template>
  <HomeSection
    :eyebrow="eyebrow"
    :title="title"
    :subtitle="subtitle"
  >
    <div class="relative overflow-hidden">
      <HomeUniverseCarousel :parts="carousel" />
    </div>
    <div class="flex justify-center">
      <!-- TODO: wait for https://github.com/nuxt/nuxt/pull/25658 -->
      <!-- <UButton :label="cta.label" :to="`${cta.to}?utm_source=unjs.io&utm_medium=home-carousel`" size="lg" color="white" variant="solid" icon="i-heroicons-chevron-right-20-solid" trailing /> -->
      <UButton :label="cta.label" :to="`${cta.to}`" size="lg" color="white" variant="solid" icon="i-heroicons-chevron-right-20-solid" trailing />
      <UButton :label="cta.label" :to="`${cta.to}`" size="lg" color="white" variant="solid" icon="i-heroicons-chevron-right-20-solid" trailing />
    </div>
  </HomeSection>
</template>
