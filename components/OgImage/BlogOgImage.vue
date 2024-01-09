<script setup lang="ts">
/**
 * @credits Nuxt SEO <https://nuxtseo.com/>
 */

import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    theme?: string;
    coverImage?: string;
  }>(),
  {
    title: "title",
  }
);
</script>

<template>
  <div
    class="w-full h-full flex justify-between relative bg-gray-900 text-white"
    :style="{
      background: Boolean(coverImage) ? `url(${coverImage})` : '',
    }"
  >
  <svg class="absolute top-0 right-0 h-[85%]" viewBox="0 0 1289 1036" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_f_653_7294)">
    <ellipse cx="865.5" cy="328" rx="625.5" ry="468" fill="url(#paint0_linear_653_7294)" fill-opacity="0.5"/>
    </g>
    <defs>
    <filter id="filter0_f_653_7294" x="0" y="-380" width="1731" height="1416" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feGaussianBlur stdDeviation="120" result="effect1_foregroundBlur_653_7294"/>
    </filter>
    <linearGradient id="paint0_linear_653_7294" x1="1192.56" y1="276" x2="589.497" y2="941.118" gradientUnits="userSpaceOnUse">
    <stop stop-color="#ECDC5A"/>
    <stop offset="1" stop-color="#FBE84C" stop-opacity="0"/>
    </linearGradient>
    </defs>
  </svg>

    <div class="p-[60px]" style="background: linear-gradient(to left, rgb(55, 65, 81, 0.5), rgb(17, 24, 39, 0.8), rgb(0, 0, 0))">
      <div class="h-full w-full justify-between relative">
        <div class="flex flex-row justify-between items-start">
          <div class="flex flex-col w-full">
            <h1 class="m-0 font-bold mb-[30px] text-[72px] text-white">{{ title.slice(0, 200) }}</h1>
            <p
              v-if="description"
              class="text-[36px] text-white opacity-85"
            >
              {{ description.slice(0, 200) }}
            </p>
          </div>
        </div>
        <div class="flex justify-start items-start text-left">
          <img src="/favicon.svg" height="100" />
        </div>
      </div>
    </div>
  </div>
</template>
