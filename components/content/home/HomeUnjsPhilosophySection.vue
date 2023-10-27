<script lang="ts" setup>
import { type HomeUnjsPhilosophyCard } from '~/types/home'

defineProps<{
  cards: HomeUnjsPhilosophyCard[]
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
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <li v-for="card in cards" :key="card.title" class="h-full">
        <HomeUnjsPhilosophyCard :card="card" class="h-full" />
      </li>
    </ul>
  </HomeSection>
</template>
