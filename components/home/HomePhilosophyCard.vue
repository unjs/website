<script lang="ts" setup>
import type { HomeUnjsPhilosophyCard } from '~/types/home'

defineProps<{
  card: HomeUnjsPhilosophyCard
}>()
</script>

<template>
  <div class="overflow-hidden bg-gray-300/20 ring-gray-300 dark:bg-gray-700/20 rounded-xl ring-1 dark:ring-gray-700 flex flex-col gap-4">
    <AppColorModeImage
      :light="card.image"
      :dark="card.imageDark"
      width="1920"
      height="1080"
      class="aspect-video"
    />
    <div class="px-6 pb-5 flex flex-col gap-2">
      <h3 class="md:text-xl text-gray-950 dark:text-gray-50 font-bold">
        {{ card.title }}
      </h3>
      <p class="text-gray-500 dark:text-gray-400">
        {{ card.description }}
      </p>
    </div>
  </div>
</template>
