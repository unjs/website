<script lang="ts" setup>
import type { HomeUnjsPhilosophyCard } from '~/types/home'

defineProps<{
  eyebrow?: string
  title?: string
  subtitle?: string
  cards: HomeUnjsPhilosophyCard[]
}>()
</script>

<template>
  <HomeSection
    :eyebrow="eyebrow"
    :title="title"
    :subtitle="subtitle"
  >
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <li v-for="card in cards" :key="card.title" class="h-full">
        <HomePhilosophyCard :card="card" class="h-full" />
      </li>
    </ul>
  </HomeSection>
</template>
