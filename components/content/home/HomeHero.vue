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
  <section flex="~ col lg:row lg:justify-between" gap="14 xl:8">
    <div max-w-screen-sm mx-auto lg:max-w-3xl flex="~ col items-center lg:items-start" gap="6" text="center lg:start">
      <NuxtLink v-if="news.path" :to="news.path" flex="~" gap-4>
        <span p="x-3 y-1" bg="gray-900 opacity-10" border="~ gray-900 opacity-40" rounded="full" text="sm gray-900" font="medium">
          {{ news.prefix }}
        </span>
        <span flex="~ row items-center" gap-2>
          {{ news.title }}
          <span i-heroicons-chevron-right-20-solid w-5 h-5 />
        </span>
      </NuxtLink>
      <div flex="~ col" gap="2">
        <h1 text="gray-900 2rem md:4xl lg:5xl" font-extrabold tracking-wide leading-normal lg:leading-normal>
          <ContentSlot :use="$slots.title" unwrap="p" />
        </h1>
        <p text="gray-600 2xl md:2.5xl" leading-normal md:leading-normal>
          <ContentSlot :use="$slots.subtitle" unwrap="p" />
        </p>
      </div>
      <NuxtLink to="/packages" px-3 py-2 bg-white flex="~ items-center" gap-2 text-gray-900 class="rounded-[0.375rem]" hover:shadow-md transition ease-in duration-150>
        <span>
          Explore the Universe
        </span>
        <span i-heroicons-chevron-right-20-solid w-5 h-5 />
      </NuxtLink>
    </div>
    <div class="puzzle" shrink-0 relative transform="~ translate-x--50% lg:translate-x-0" left="50% lg:0" flex="~ justify-center items-center">
      <Puzzle :parts="puzzle" :away="away" />
    </div>
  </section>
</template>

<style scoped>
.puzzle {
  width: calc(3 * 136px - 2 * 8px);
  height: calc(3 * 136px - 2 * 4px);
}
</style>
