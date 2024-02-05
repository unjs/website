<script lang="ts" setup>
definePageMeta({
  layout: 'full',
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

const { data } = await useRelationsUnJSRepositories()

const loading = ref(true)

const openRepositories = ref(false)

const openMenu = useRelationsMenu()
const openLegend = useRelationsLegend()

const { selection, updateSelection } = useRelations(data.value)
</script>

<template>
  <div class="w-full h-screen relative overflow-hidden">
    <RelationsMenu v-if="openMenu" v-model:menu="openMenu" v-model:legend="openLegend" class="z-20" @open-repositories="openRepositories = $event" />
    <RelationsLegend v-if="openLegend" class="z-20" />

    <RelationsModalPackages v-model:open="openRepositories" :selection="selection" :packages="data" @update:selection="updateSelection" />

    <RelationsGraph :packages="data" :selection="selection" class="w-full h-full" @loading="loading = $event" />
    <div v-if="loading || !selection.length" class="absolute z-0 inset-0 flex items-center justify-center font-medium bg-white/40 backdrop-blur-sm dark:bg-gray-900/60">
      <span class="flex flex-row items-center">
        <template v-if="loading">
          <span class="i-heroicons-arrow-path animate-spin" />
          <span class="ml-2">
            Loading...
          </span>
        </template>
        <template v-else>
          <!-- TODO: make this a button that open the explanation modal -->
          <span class="i-heroicons-information-circle" />
          <span class="ml-2">
            Select a package to start
          </span>
        </template>
      </span>
    </div>
  </div>
</template>
