<script lang="ts" setup>
import { type PuzzlePart } from 'types/puzzle'

defineProps<{
  news: {
    prefix: string
    title: string
    path: string
  }
  puzzle: PuzzlePart[]
  away: PuzzlePart
}>()
</script>

<template>
  <section relative flex="~ justify-between">
    <div max-w-2xl flex="~ col items-center md:items-start" gap-3 text="center md:start">
      <NuxtLink v-if="news.path" :to="news.path" flex="~" gap-4>
        <span p="x-3 y-1" bg="gray-900 opacity-10" border="~ gray-900 opacity-40" rounded="full" text="sm gray-900" font="medium">
          {{ news.prefix }}
        </span>
        <span flex="~ row items-center" gap-2>
          {{ news.title }}
          <span i-heroicons-chevron-right-20-solid w-5 h-5 />
        </span>
      </NuxtLink>
      <h1 text="gray-900 4xl md:5xl" font-extrabold tracking-wide leading-normal>
        <ContentSlot :use="$slots.title" unwrap="p" />
      </h1>
      <p text="gray-600 2xl md:2.5xl" leading-normal>
        <ContentSlot :use="$slots.subtitle" unwrap="p" />
      </p>
    </div>
    <!-- <div class="puzzle">
      <Puzzle :parts="puzzle" :away="away" />
    </div> -->
  </section>
</template>

<style scoped>
.puzzle {
  width: calc(3 * 136px - 2 * 8px);
  height: calc(3 * 136px - 2 * 4px);

  --at-apply: flex justify-center items-center;
}
</style>
