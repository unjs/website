<script lang="ts" setup>
import type { PuzzlePart } from '~/types/puzzle'

defineProps<{
  news?: {
    prefix: string
    title: string
    path: string
  }
  puzzle: PuzzlePart[]
  away: PuzzlePart
}>()

const { data } = await useAsyncData(' blog:latest', () => queryContent('/blog').where({ _path: { $ne: '/blog' } }).sort({ publishedAt: -1 }).only(['title', '_path']).findOne())
</script>

<template>
  <section class="flex flex-col lg:flex-row lg:justify-between gap-14 xl:gap-8">
    <div class="max-w-screen-sm mx-auto lg:max-w-3xl flex flex-col items-center lg:items-start gap-6 text-center lg:text-start">
      <HomeHeroEyeBrow v-if="news" :prefix="news.prefix" :title="news.title" :path="news.path" />
      <HomeHeroEyeBrow v-else-if="data" prefix="What's new" :title="data.title" :path="data._path" />
      <div class="flex flex-col gap-2">
        <h1 class="dark:text-gray-50 text-[2rem] md:text-4xl lg:text-5xl font-extrabold tracking-wide leading-normal lg:leading-normal">
          <ContentSlot :use="$slots.title" unwrap="p" />
        </h1>
        <p class="dark:text-gray-400 text-2xl md:text-[1.75rem] leading-normal md:leading-normal">
          <ContentSlot :use="$slots.subtitle" unwrap="p" />
        </p>
      </div>
      <UButton to="/packages?utm_source=unjs.io&utm_medium=home-hero" size="md" color="gray" icon="i-heroicons-chevron-right-20-solid" trailing>
        Explore the Universe
      </UButton>
    </div>
    <div class="puzzle shrink-0 relative transform -translate-x-1/2 left-1/2 lg:translate-x-0 lg:left-0 flex justify-center items-center">
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
