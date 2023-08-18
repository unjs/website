<script lang="ts" setup>
import { type PuzzlePart } from 'types/puzzle'

const props = defineProps<{
  parts: PuzzlePart[]
  away: PuzzlePart
}>()

const triggered = ref(false)

const rows = computed(() => [
  [{} as PuzzlePart, ...props.parts.slice(0, 3)],
  [props.away, ...props.parts.slice(3, 6)],
  [{} as PuzzlePart, ...props.parts.slice(6, 9)],
])

const transforms = [
  ['', 'translate-x--13 translate-y--8 rotate--20', 'translate-y--8', 'translate-x-7 translate-y--7'],
  ['translate-y-48 translate-x--120 rotate--25', 'translate-x--7', '', 'translate-x-7'],
  ['', 'translate-x--7 translate-y-8', 'translate-y-8', 'translate-x-7 translate-y-8'],
]
</script>

<template>
  <div relative flex justify-end style="width: 336px; height: 336px;">
    <div flex="~ col" space-y--9 :class="triggered ? 'drop-shadow-xl' : 'drop-shadow-md'">
      <div v-for="(row, i) in rows" :key="i" flex flex-row space-x--9 transition-transform ease-in duration-200>
        <PuzzlePart v-for="(part, j) in row" :key="part.name" :part="part" :class="{ [transforms[i][j]]: !triggered, '<lg:opacity-0': !j }" shrink-0 />
      </div>
    </div>
    <div absolute inset-0 @mouseenter="triggered = true" @mouseleave="triggered = false" />
  </div>
</template>
