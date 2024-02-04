<script lang="ts" setup>
import { useStorage } from '@vueuse/core'

definePageMeta({
  layout: 'full'
})

const route = useRoute()

const { data: page, error } = await useAsyncData(route.path, () => queryContent(route.path).findOne())

if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Page not found',
    fatal: true,
  })
}

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
})
defineOgImageComponent('OgImagePage')
useTrackPageview()

const { data, error: packagesError } = await useAsyncData('content:relations:packages', () => $fetch('/api/content/packages.json'))

if (packagesError.value) {
  throw createError({
    statusCode: packagesError.value.statusCode,
    message: packagesError.value.message,
    fatal: true,
  })
}

// chargement des unjs packages et mis en place dans la payload
// pour la suite, bah c'est en full client side


// False by default to avoid flickering if the user has a preference in the storage
const openMenu = ref(false)
const openLegend = ref(false)

const menuOpenStorage = useStorage('unjs-relations-menu-open', true)
const legendOpenStorage = useStorage('unjs-relations-legend-open', true)

onMounted(() => {
  openMenu.value = menuOpenStorage.value
  openLegend.value = legendOpenStorage.value
})

defineShortcuts({
  'meta_m': {
    handler: () => {
      openMenu.value = !openMenu.value
      menuOpenStorage.value = openMenu.value
    },
  },
  'meta_l': {
    handler: () => {
      openLegend.value = !openLegend.value
      legendOpenStorage.value = openLegend.value
    },
  },
})
</script>

<template>
  <div class="w-full h-screen relative overflow-hidden">
    <RelationsMenu v-if="openMenu" v-model:menu="openMenu" v-model:legend="openLegend" class="z-20" />
    <RelationsLegend v-if="openLegend" class="z-20" />

    <RelationsGraph/>
  </div>
</template>
