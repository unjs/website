<script lang="ts" setup>
import type { HomeUnjsPhilosophyCard } from '../../types/home'

defineProps<{
  card: HomeUnjsPhilosophyCard
}>()
</script>

<template>
  <div class="overflow-hidden bg-white rounded-2xl border border-zinc-100 flex flex-col gap-4">
    <img aria-hidden="true" :src="card.image" width="1920" height="1080" class="aspect-video">
    <div class="px-6 pb-5 flex flex-col gap-2">
      <h3 class="md:text-xl text-zinc-900 font-bold">
        {{ card.title }}
      </h3>
      <p class="text-zinc-600">
        {{ card.description }}
      </p>
    </div>
  </div>
</template>
