<script lang="ts" setup>
import type { HomeUnjsPhilosophyCard } from '~/types/home'

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
    <ul grid="~ cols-1 md:cols-2 lg:cols-3" gap-6>
      <li v-for="card in cards" :key="card.title">
        <HomeUnjsPhilosophyCard :card="card" />
      </li>
    </ul>
  </HomeSection>
</template>
