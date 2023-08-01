<script lang="ts" setup>
import { type PuzzlePart } from 'types/puzzle'

const props = defineProps<{
  parts: PuzzlePart[]
  away: PuzzlePart
}>()

const firstLine = computed(() => props.parts.slice(0, 3))
const secondLine = computed(() => props.parts.slice(3, 6))
const thirdLine = computed(() => props.parts.slice(6, 9))
</script>

<template>
  <div relative>
    <div flex="~ col" space-y--1 drop-shadow-md hover="space-y--9 drop-shadow-xl" class="group peer">
      <div class="puzzle-row">
        <PuzzlePart v-for="(part, index) in firstLine" :key="part.name" :part="part" :class="{ 'relative left--6 rotate--20 group-hover:left-0 group-hover:rotate-0': index === 0 }" />
      </div>
      <div class="puzzle-row">
        <PuzzlePart v-for="part in secondLine" :key="part.name" :part="part" />
      </div>
      <div class="puzzle-row">
        <PuzzlePart v-for="part in thirdLine" :key="part.name" :part="part" />
      </div>
    </div>
    <!-- 27px and 23px are magics numbers -->
    <PuzzlePart opacity-0 lg:opacity-100 absolute bottom--12 rotate--25 class="left-[calc(4*-136px)] peer-hover:bottom-[calc(1*136px-27px)] peer-hover:left-[calc(0.5*-136px-23px)]" peer-hover:rotate-0 :part="away" />
  </div>
</template>

<style scoped>
.puzzle-row {
  --at-apply: flex flex-row space-x--2 group-hover:space-x--9 transition-all ease-in duration-200
}
</style>
