<script lang="ts" setup>
import type { PuzzlePart } from 'types/puzzle'

const props = defineProps<{
  parts: PuzzlePart[]
}>()

const timing = ref('40s')
const slidesPerView = computed(() => props.parts.length)
const slideWidth = ref('150px')
const slideHeight = ref('136px')
const imageWidth = ref('auto')
const imageHeight = ref('auto')
</script>

<template>
  <div class="slider">
    <div absolute z-50 left-0 top-0 bottom-0 w-4 md:w-8 lg:w-16 bg-gradient-to-r from-primary via-primary to-primary to-opacity-0 />

    <div absolute z-50 right-0 top-0 bottom-0 w-4 md:w-8 lg:w-16 bg-gradient-to-l from-primary via-primary to-primary to-opacity-0 />

    <div class="slide-track animation" py-4>
      <template v-for="item in [...parts, ...parts]" :key="item.part">
        <div class="slide" shrink-0 :style="`align-items:${item.align};`">
          <NuxtLink :to="`/packages/${item.name}`">
            <img :src="`/assets/puzzle/${item.name}.svg`" drop-shadow-md hover:drop-shadow-xl transition ease-in duration-150>
          </NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
@keyframes scroll {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }

  100% {
    -webkit-transform: translateX(calc(-1 * v-bind(slideWidth) * v-bind(slidesPerView)));
    transform: translateX(calc(-1 * v-bind(slideWidth) * v-bind(slidesPerView)));
  }
}

.animation {
  -webkit-animation: scroll v-bind(timing) linear infinite;
  animation: scroll v-bind(timing) linear infinite;
}

.slider {
  margin: auto;
  position: relative;
}

.slider .slide-track {
  display: flex;
  justify-items: center;
  width: calc(v-bind(slideWidth) * (v-bind(slidesPerView) * 2));
}

.slide-track:hover {
  animation-play-state: paused;
}

.slide {
  height: v-bind(slideHeight);
  width: v-bind(slideWidth);

  display: flex;
  justify-content: center;
}

.slide :deep(img) {
  width: v-bind(imageWidth);
  height: v-bind(imageHeight);
}
</style>
