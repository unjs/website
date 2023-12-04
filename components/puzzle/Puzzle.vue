<script lang="ts" setup>
// eslint-disable-next-line ts/consistent-type-imports
import type { PuzzlePart } from '~/types/puzzle'

const props = defineProps<{
  parts: PuzzlePart[]
  away: PuzzlePart
}>()

const rows = computed(() => [
  [{} as PuzzlePart, ...props.parts.slice(0, 3)],
  [props.away, ...props.parts.slice(3, 6)],
  [{} as PuzzlePart, ...props.parts.slice(6, 9)],
])

const transforms = [
  ['', '-translate-x-[3.25rem] -translate-y-8 -rotate-[20deg]', '-translate-y-8', 'translate-x-7 -translate-y-7'],
  ['translate-y-[14rem] -translate-x-[12.5rem] xl:translate-y-64 xl:-translate-x-[24rem] -rotate-[25deg]', '-translate-x-7', '', 'translate-x-7'],
  ['', '-translate-x-7 translate-y-8', 'translate-y-8', 'translate-x-7 translate-y-8'],
]
</script>

<template>
  <div class="group relative flex justify-end w-[21rem] h-[21rem]">
    <div class="flex flex-col -space-y-9 transition-filter ease-in duration-200 drop-shadow-sm group-hover:drop-shadow pointer-events-none">
      <div v-for="(row, i) in rows" :key="i" class="flex flex-row -space-x-9">
        <PuzzlePart v-for="(part, j) in row" :key="part.name" :part="part" :class="[`${transforms[i][j]} group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rotate-0`, { 'opacity-0 lg:opacity-100': !j }]" class="shrink-0" />
      </div>
    </div>
  </div>
</template>
