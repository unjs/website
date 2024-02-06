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

const openUnjs = ref(false)
const openNpm = ref(false)
const openAbout = ref(false)

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

/**
 * Populate the store with the packages needed. Lifecycle can't be async so we need to do it before.
 */
if (import.meta.client) {
  const npm = relationsStore.npm ?? selectionStorage.value.npm

  if (npm) {
    await Promise.all([
      ...npm.map(async (name) => {
        try {
          const pkg = await fetchNpmPackage(name)
          relationsStore.addNpmPackage(pkg)
        }
        catch (error) {
          console.error(error)
        }
      }),
    ])
  }
}

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

const openSlideover = ref(false)
const selectedNode = ref<RelationPackage | null>(null)
function onSelectedNode(pkg: RelationPackage) {
  selectedNode.value = pkg
  openSlideover.value = true
}
function onViewRelations(name: string) {
  const _package = relationsStore.unjsPackages.find(pkg => pkg.name === name)
  relationsStore.updateSelection([_package])
  openSlideover.value = false
}

defineShortcuts({
  meta_i: {
    handler: () => {
      openAbout.value = !openAbout.value
    },
  },
  meta_h: {
    handler: () => {
      navigateTo({
        path: 'https://github.com/unjs/community/discussions',
      }, { external: true, open: { target: '_blank' } })
    },
  },
})

// TODO: send a custom event when about is open (with the location)
// TODO: send a custom event with number of items of the selection, a base 64 encoded string of the selection and the settings
</script>

<template>
  <div class="w-full h-screen relative overflow-hidden">
    <RelationsMenu v-if="openMenu" v-model:about="openAbout" v-model:menu="openMenu" v-model:legend="openLegend" class="absolute left-4 top-20 z-10" @open-unjs="openUnjs = $event" @open-npm="openNpm = $event" />
    <RelationsLegend v-if="openLegend" class="absolute z-30 bottom-4 left-4" />

    <RelationsModalPackages v-model:open="openUnjs" />
    <RelationsModalNpm v-model:open="openNpm" />
    <RelationsModalAbout v-model:open="openAbout" />

    <RelationsSlideoverPackage v-model:open="openSlideover" :package="selectedNode" @view-relations="onViewRelations" />

    <RelationsGraph v-if="relationsStore.hasQuery" class="w-full h-full" @loading="loading = $event" @selected-node="onSelectedNode" />
    <div v-if="loading || !relationsStore.selection.length" class="absolute z-0 inset-0 flex items-center justify-center font-medium bg-white/40 backdrop-blur-sm dark:bg-gray-900/60">
      <span class="flex flex-row items-center">
        <template v-if="loading">
          <span class="i-heroicons-arrow-path animate-spin" />
          <span class="ml-2">
            Loading...
          </span>
        </template>
        <template v-else>
          <UButton square aria-label="Open About Panel" icon="i-heroicons-information-circle" color="gray" variant="ghost" @click="openAbout = true" />
          <span class="ml-2">
            Select a package to start
          </span>
        </template>
      </span>
    </div>

    <UButton square aria-label="Open About" icon="i-heroicons-information-circle" color="gray" variant="ghost" size="xl" :ui="{ base: 'absolute z-20 bottom-4 right-4', rounded: 'rounded-full', color: { gray: { ghost: 'bg-white/40 backdrop-blur-sm dark:bg-gray-900/60 ring-1 ring-gray-200 dark:ring-gray-800' } } }" @click="openAbout = true" />
  </div>
</template>
