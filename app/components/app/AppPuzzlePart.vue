<script lang="ts" setup>
import type { PuzzlePart } from '~/types/puzzle'

const props = defineProps<{
  part: PuzzlePart
}>()

const justify = computed(() => props.part.justify)
const align = computed(() => props.part.align)
</script>

<template>
  <div class="puzzle-part flex transition-transform ease-in-out duration-200">
    <template v-if="part.name">
      <AppColorModeImage
        :light="toPackagePuzzlePart(part.name)"
        :dark="toPackagePuzzlePart(part.name, true)"
      />
    </template>
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
