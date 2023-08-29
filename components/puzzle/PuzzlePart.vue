<script lang="ts" setup>
import type { PuzzlePart } from 'types/puzzle'

const props = defineProps<{
  part: PuzzlePart
}>()

const justify = computed(() => props.part.justify)
const align = computed(() => props.part.align)
</script>

<template>
  <div class="puzzle-part" flex transition-transform ease-in duration-200>
    <img v-if="part.name" :src="`/assets/puzzle/${part.name}.svg`">
    <div v-else />
  </div>
</template>

<style scoped>
.puzzle-part {
  width: 136px;
  height: 136px;

  justify-content: v-bind(justify);
  align-items: v-bind(align);
}
</style>
