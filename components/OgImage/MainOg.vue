<script setup lang="ts">
/**
 * @credits Nuxt SEO <https://nuxtseo.com/>
 */

import { computed, defineComponent, h, resolveComponent } from 'vue'
import { useSiteConfig } from '#imports'

// convert to typescript props
const props = withDefaults(defineProps<{
  colorMode?: 'dark' | 'light'
  title?: string
  description?: string
  icon?: string | boolean
  siteName?: string
  siteLogo?: string
  theme?: string,
  coverImage?: string
}>(), {
  theme: '#ffffff',
  title: 'title',
})

const HexRegex = /^#([0-9a-f]{3}){1,2}$/i

const colorMode = computed(() => {
  return props.colorMode || 'dark'
})

const themeHex = computed(() => {
  // regex test if valid hex
  if (HexRegex.test(props.theme))
    return props.theme

  // if it's hex without the hash, just add the hash
  if (HexRegex.test(`#${props.theme}`))
    return `#${props.theme}`

  // if it's rgb or rgba, we convert it to hex
  if (props.theme.startsWith('rgb')) {
    const rgb = props.theme
      .replace('rgb(', '')
      .replace('rgba(', '')
      .replace(')', '')
      .split(',')
      .map(v => Number.parseInt(v.trim(), 10))
    const hex = rgb
      .map((v) => {
        const hex = v.toString(16)
        return hex.length === 1 ? `0${hex}` : hex
      })
      .join('')
    return `#${hex}`
  }
  return '#FFFFFF'
})

const themeRgb = computed(() => {
  // we want to convert it so it's just `<red>, <green>, <blue>` (255, 255, 255)
  return themeHex.value
    .replace('#', '')
    .match(/.{1,2}/g)
    ?.map(v => Number.parseInt(v, 16))
    .join(', ')
})

const siteConfig = useSiteConfig()
const siteName = computed(() => {
  return props.siteName || siteConfig.name
})
const siteLogo = computed(() => {
  return props.siteLogo || siteConfig.logo
})

const runtimeConfig = useRuntimeConfig()['nuxt-og-image']

const IconComponent = runtimeConfig.hasNuxtIcon
  ? resolveComponent('Icon')
  : defineComponent({
    render() {
      return h('div', 'missing nuxt-icon')
    },
  })
if (typeof props.icon === 'string' && !runtimeConfig.hasNuxtIcon && process.dev) {
  console.warn('Please install `nuxt-icon` to use icons with the fallback OG Image component.')
  // eslint-disable-next-line no-console
  console.log('\nnpm add -D nuxt-icon\n')
  // create simple div renderer component
}
</script>

<template>
  <div
    class="w-full h-full flex justify-between relative p-[60px]"
    :class="[
      colorMode === 'light' ? ['bg-white', 'text-gray-900'] : ['bg-black', 'text-gray-50'],
    ]"
  >
    <svg
      class="absolute right-0 top-0"
      width="629"
      height="593"
      viewBox="0 0 629 593"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_199_94966)">
        <path d="M628.5 -578L639.334 -94.4223L806.598 -548.281L659.827 -87.387L965.396 -462.344L676.925 -74.0787L1087.69 -329.501L688.776 -55.9396L1160.22 -164.149L694.095 -34.9354L1175.13 15.7948L692.306 -13.3422L1130.8 190.83L683.602 6.50012L1032.04 341.989L668.927 22.4412L889.557 452.891L649.872 32.7537L718.78 511.519L628.5 36.32L538.22 511.519L607.128 32.7537L367.443 452.891L588.073 22.4412L224.955 341.989L573.398 6.50012L126.198 190.83L564.694 -13.3422L81.8734 15.7948L562.905 -34.9354L96.7839 -164.149L568.224 -55.9396L169.314 -329.501L580.075 -74.0787L291.604 -462.344L597.173 -87.387L450.402 -548.281L617.666 -94.4223L628.5 -578Z" :fill="theme" />
      </g>
      <defs>
        <filter
          id="filter0_f_199_94966"
          x="0.873535"
          y="-659"
          width="1255.25"
          height="1251.52"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="40.5" result="effect1_foregroundBlur_199_94966" />
        </filter>
      </defs>
    </svg>
    <div class="h-full w-full justify-between relative">
      <div class="flex flex-row justify-between items-start">
        <div class="flex flex-col w-full max-w-[65%]">
          <h1 class="m-0 font-bold mb-[30px] text-[75px]">
            {{ title }}
          </h1>
          <p
            v-if="description" class="text-[35px]" :class="[
              colorMode === 'light' ? ['text-gray-700'] : ['text-gray-300'],
            ]"
          >
          {{ description.slice(0, 200) }}
          </p>
        </div>
        <div v-if="Boolean(coverImage)" style="width: 30%;" class="flex justify-end">
          <img :src="coverImage" class="rounded-full"/>
        </div>
        <div v-if="Boolean(icon)" style="width: 30%;" class="flex justify-end">
          <IconComponent :name="icon" size="250px" style="margin: 0 auto; opacity: 0.7;" />
        </div>
      </div>
      <div class="flex flex-row justify-center items-center text-left w-full">
        <img v-if="siteLogo" :src="siteLogo" height="30">
        <template v-else>
          <svg height="50" width="50" class="mr-3" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path :fill="theme.includes('#') ? theme : `#${theme}`" d="M62.3,-53.9C74.4,-34.5,73.5,-9,67.1,13.8C60.6,36.5,48.7,56.5,30.7,66.1C12.7,75.7,-11.4,74.8,-31.6,65.2C-51.8,55.7,-67.9,37.4,-73.8,15.7C-79.6,-6,-75.1,-31.2,-61.1,-51C-47.1,-70.9,-23.6,-85.4,0.8,-86C25.1,-86.7,50.2,-73.4,62.3,-53.9Z" transform="translate(100 100)" />
          </svg>
          <p v-if="siteName" style="font-size: 25px;" class="font-bold">
            {{ siteName }}
          </p>
        </template>
      </div>
    </div>
  </div>
</template>