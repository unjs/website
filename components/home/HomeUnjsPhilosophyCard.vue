<script lang="ts" setup>
import type { HomeUnjsPhilosophyCard } from '~/types/home'

defineProps<{
  card: HomeUnjsPhilosophyCard
}>()
</script>

<template>
  <div bg-white rounded-4 border border-light flex="~ col" gap-4>
    <img aria-hidden="true" :src="card.image" aspect-video width="1920" height="1080">
    <div px-6 pb-5 flex="~ col" gap-2>
      <h3 md:text-xl text-gray-900 font-bold>
        {{ card.title }}
      </h3>
      <p text-gray-600>
        {{ card.description }}
      </p>
    </div>
  </div>
</template>
