<script lang="ts" setup>
import { type HomeUnjsPhilosophyCard } from 'types/home'

defineProps<{
  cards: HomeUnjsPhilosophyCard[]
}>()
</script>

<template>
  <section flex="~ col" gap-6>
    <div px-6 py-8 bg-white rounded-4 border border-light>
      <div max-w-3xl flex="~ col" gap-4>
        <p md:text-xl text-gray-700 font-semibold tracking-wide>
          <ContentSlot :use="$slots.eyebrow" unwrap="p" />
        </p>
        <h2 text-2xl md:text-3xl lg:text-4xl text-gray-900 font-extrabold tracking-wide>
          <ContentSlot :use="$slots.title" unwrap="p" />
        </h2>
        <p text-lg md:text-2.5xl md:leading-tight text-gray-600>
          <ContentSlot :use="$slots.subtitle" unwrap="p" />
        </p>
      </div>
    </div>
    <ul grid="~ cols-1 md:cols-2 lg:cols-3" gap-6>
      <li v-for="card in cards" :key="card.title">
        <HomeUnjsPhilosophyCard :card="card" />
      </li>
    </ul>
  </section>
</template>
