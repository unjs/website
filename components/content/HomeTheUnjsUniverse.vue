<script lang="ts" setup>
import type { PuzzlePart } from 'types/puzzle'

defineProps<{
  cta: { to: string; text: string }
  carousel: PuzzlePart[]
}>()
</script>

<template>
  <section flex="~ col" gap-6>
    <div px-6 py-8 bg-white rounded-4 border border-light>
      <div max-w-3xl flex="~ col" gap-4>
        <p text-xl text-gray-700 font-semibold tracking-wide>
          <ContentSlot :use="$slots.eyebrow" unwrap="p" />
        </p>
        <h2 text-4xl text-gray-900 font-extrabold tracking-wide>
          <ContentSlot :use="$slots.title" unwrap="p" />
        </h2>
        <p text-2.5xl leading-tight text-gray-600>
          <ContentSlot :use="$slots.subtitle" unwrap="p" />
        </p>
      </div>
    </div>
    <div relative overflow-hidden>
      <HomeTheUnjsUniverseCarousel :parts="carousel" />
    </div>
    <div flex="~ justify-center items-center">
      <NuxtLink :to="cta.to" px-3 py-2 bg-white flex="~" gap-2 text-gray-900 class="rounded-[0.375rem]" hover:shadow-md transition ease-in duration-150>
        <span>
          {{ cta.text }}
        </span>
        <span i-heroicons-chevron-right-20-solid w-5 h-5 />
      </NuxtLink>
    </div>
  </section>
</template>
