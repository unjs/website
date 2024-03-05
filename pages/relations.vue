<script lang="ts" setup>
import type { RelationPackage } from '~/types/package'

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

const { unjsPackages, npmPackages, addNpmPackage } = useRelationsPackages()

const { data, error: errorPackages } = await useAsyncData('relations:unjs:packages', () => $fetch('/api/content/packages.json'), {
  transform: (data) => {
    const packages = data.filter(pkg => pkg.npm)
    const names = packages.map(pkg => pkg.npm.name)

    return packages.map((pkg) => {
      return {
        name: pkg.title,
        npmName: pkg.npm.name,
        description: pkg.description,
        dependencies: pkg.npm.dependencies.filter((dep: string) => names.includes(dep)) ?? [],
        devDependencies: pkg.npm.devDependencies.filter((dep: string) => names.includes(dep)) ?? [],
        source: 'unjs',
      } satisfies RelationPackage
    },
    ) as RelationPackage[]
  },
})

if (errorPackages.value) {
  throw createError({
    statusCode: errorPackages.value.statusCode,
    message: errorPackages.value.statusMessage,
    fatal: true,
  })
}

if (data.value)
  unjsPackages.value = data.value

// const { unjsQuery, npmQuery, updateQuery, hasSelectionAndSettings, showDependenciesQuery, showDevDependenciesQuery, showChildrenQuery } = useRelationsQuery()
// const { selection } = useRelationsSelection()
// const { selectionStorage, settingsStorage } = useRelationsStorage()

/**
 * Keep storage up to date.
 */
watch(() => route.query, (value) => {
  /**
   * Settings
   */
  if (value.showDependencies)
    settingsStorage.value.showDependencies = value.showDependencies === 'true'
  if (value.showDevDependencies)
    settingsStorage.value.showDevDependencies = value.showDevDependencies === 'true'
  if (value.showChildren)
    settingsStorage.value.showChildren = value.showChildren === 'true'

  /**
   * Selection
   */
  if (value['u[]'])
    selectionStorage.value.unjs = toArray(value['u[]'] as string[])
  if (value['n[]'])
    selectionStorage.value.npm = toArray(value['n[]'] as string[])
})

/**
 * Preload npm packages before rendering the graph.
 * Lifecycle can't be async so we need to do it before.
 */
if (import.meta.client) {
  const package_ = npmQuery.value ?? selectionStorage.value.npm

  if (package_) {
    await Promise.all([
      ...package_.filter((p) => {
        return !unjsPackages.value.find(pkg => pkg.npmName === p) && !npmPackages.value.find(pkg => pkg.name === p)
      }).map(async (name) => {
        try {
          const pkg = await fetchNpmPackage(name)
          addNpmPackage(pkg)
        }
        catch (error) {
          /**
           * Silent error
           */
          console.error(error)
        }
      }),
    ])
  }
}

onBeforeMount(() => {
  const isSelectionEmpty = !unjsQuery.value?.length && !npmQuery.value?.length && !selectionStorage.value.unjs.length && !selectionStorage.value.npm.length

  /**
   * Update the query when the application load.
   * 1. If there is nothing in the query and in the storage, we use the default packages (all UnJS and none npm).
   * 2. If there is something in the query, we use it.
   * 3. If there is something in the storage (restore previous state), we use it.
   */
  updateQuery({
    unjs: isSelectionEmpty ? unjsPackages.value.map(p => p.npmName) : unjsQuery.value ?? selectionStorage.value.unjs,
    npm: isSelectionEmpty ? [] : npmQuery.value ?? selectionStorage.value.npm,
    showDependencies: showDependenciesQuery.value ?? settingsStorage.value.showDependencies,
    showDevDependencies: showDevDependenciesQuery.value ?? settingsStorage.value.showDevDependencies,
    showChildren: showChildrenQuery.value ?? settingsStorage.value.showChildren,
  }, true)
})

const openSlideover = ref(false)
const selectedNode = ref<RelationPackage | null>(null)
function onSelectedNode(pkg: RelationPackage) {
  selectedNode.value = pkg
  openSlideover.value = true
}
function onViewRelations(name: string) {
  updateQuery({
    unjs: [name],
  })
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
        path: 'https://github.com/unjs/website/issues',
      }, { external: true, open: { target: '_blank' } })
    },
  },
})

// TODO: send a custom event when about is open (with the location)
// TODO: send a custom event with number of items of the selection, a base 64 encoded string of the selection and the settings
</script>

<template>
  <div class="w-full h-screen relative overflow-hidden">
    <!-- <RelationsMenu v-if="openMenu" v-model:about="openAbout" v-model:menu="openMenu" v-model:legend="openLegend" class="absolute left-4 top-20 z-10" @open-unjs="openUnjs = $event" @open-npm="openNpm = $event" />
    <RelationsLegend v-if="openLegend" class="absolute z-30 bottom-4 left-4" />

    <RelationsModalUnjs
      v-model:open="openUnjs"
    />
    <RelationsModalNpm
      v-model:open="openNpm"
    />
    <RelationsModalAbout v-model:open="openAbout" />

    <RelationsSlideoverPackage v-model:open="openSlideover" :package="selectedNode" @view-relations="onViewRelations" />

    <RelationsGraph
      v-if="hasSelectionAndSettings" class="w-full h-full"
      @loading="loading = $event" @selected-node="onSelectedNode"
    />
    <div v-if="loading || !selection.length" class="absolute z-0 inset-0 flex items-center justify-center font-medium bg-white/40 backdrop-blur-sm dark:bg-gray-900/60">
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

    <UButton square aria-label="Open About" icon="i-heroicons-information-circle" color="gray" variant="ghost" size="xl" :ui="{ base: 'absolute z-20 bottom-4 right-4', rounded: 'rounded-full', color: { gray: { ghost: 'bg-white/40 backdrop-blur-sm dark:bg-gray-900/60 ring-1 ring-gray-200 dark:ring-gray-800' } } }" @click="openAbout = true" /> -->
  </div>
</template>
