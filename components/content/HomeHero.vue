<script lang="ts" setup>
import { type PuzzlePart } from 'types/puzzle'

defineProps<{
  news: string
  puzzle: PuzzlePart[]
  away: PuzzlePart
}>()

const lastArticle = { name: 'name-of-the-last-article', _path: '/news/name-of-the-last-article' }
</script>

<template>
  <section relative flex="~ justify-between">
    <div max-w-2xl flex="~ col" gap-3>
      <NuxtLink :to="lastArticle._path" flex="~" gap-4>
        <span px-3 py-1 bg-gray-900 bg-opacity-10 border border-gray-900 border-opacity-40 rounded-full text="sm gray-900" font-medium>
          {{ news }}
        </span>
        <span flex="~ row items-center" gap-2>
          {{ lastArticle.name }}
          <span i-heroicons-chevron-right-20-solid w-5 h-5 />
        </span>
      </NuxtLink>
      <h1 text="5xl gray-900" font-extrabold tracking-wide leading-normal>
        <ContentSlot :use="$slots.title" unwrap="p" />
      </h1>
      <p text="2.5xl gray-600" leading-normal>
        <ContentSlot :use="$slots.subtitle" unwrap="p" />
      </p>
    </div>
    <div class="puzzle">
      <Puzzle :parts="puzzle" :away="away" class="peer" />
    </div>
  </section>
</template>

<style scoped>
.puzzle {
  width: calc(3 * 136px - 2 * 8px);
  height: calc(3 * 136px - 2 * 4px);

  --at-apply: flex justify-center items-center;
}
</style>
