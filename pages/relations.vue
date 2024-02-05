<script lang="ts" setup>
import { useStorage } from '@vueuse/core'

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

const loading = ref(true)

const openRepositories = ref(false)

const openMenu = useRelationsMenu()
const openLegend = useRelationsLegend()

const relationsStore = useRelationsStore()
await relationsStore.fetchUnJSPackages()

/**
 * Storage can't be used inside a store
 */
const selectionStorage = useStorage('unjs-relations-selection', {
  unjs: null as null | string[],
  npm: null as null | string[],
})
watch(() => relationsStore.unjsSelection, (value) => {
  selectionStorage.value.unjs = value.map(pkg => pkg.name)
})
watch(() => relationsStore.npmSelection, (value) => {
  selectionStorage.value.npm = value.map(pkg => pkg.name)
})
const settingsStorage = useStorage('unjs-relations-settings', {
  showDependencies: true,
  showDevDependencies: false,
  showChildren: false,
})
watch([() => relationsStore.showDependencies, () => relationsStore.showDevDependencies, () => relationsStore.showChildren], ([dep, devDep, children]) => {
  settingsStorage.value = {
    showDependencies: dep ?? false,
    showDevDependencies: devDep ?? false,
    showChildren: children ?? false,
  }
})

// Update query
onBeforeMount(() => {
  navigateTo({
    query: {
      'u[]': relationsStore.unjs ?? selectionStorage.value.unjs ?? relationsStore.unjsPackages.map(pkg => pkg.name),
      'n[]': relationsStore.npm ?? selectionStorage.value.npm,
      'showDependencies': String(relationsStore.showDependencies ?? settingsStorage.value.showDependencies),
      'showDevDependencies': String(relationsStore.showDevDependencies ?? settingsStorage.value.showDevDependencies),
      'showChildren': String(relationsStore.showChildren ?? settingsStorage.value.showChildren),
    },
  })
})
</script>

<template>
  <div class="w-full h-screen relative overflow-hidden">
    <RelationsMenu v-if="openMenu" v-model:menu="openMenu" v-model:legend="openLegend" class="absolute left-4 top-20 z-10" @open-repositories="openRepositories = $event" />
    <RelationsLegend v-if="openLegend" class="absolute z-30 bottom-4 left-4" />

    <RelationsModalPackages v-model:open="openRepositories" />

    <RelationsGraph v-if="relationsStore.hasQuery" class="w-full h-full" @loading="loading = $event" />
    <div v-if="loading || !relationsStore.selection.length" class="absolute z-0 inset-0 flex items-center justify-center font-medium bg-white/40 backdrop-blur-sm dark:bg-gray-900/60">
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
