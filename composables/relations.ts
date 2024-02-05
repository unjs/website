import type { PackageJson } from 'pkg-types'
import { useStorage } from '@vueuse/core'
import type { RelationPackage, RelationPackageSource } from '~/types/package'

function toRelationPackage(packageJson: PackageJson, source: RelationPackageSource, unjsNames: string[]): RelationPackage {
  return {
    name: packageJson.name,
    description: packageJson.description,
    dependencies: Object.keys(packageJson.dependencies || {}).filter(dep => unjsNames.includes(dep)),
    devDependencies: Object.keys(packageJson.devDependencies || {}).filter(dep => unjsNames.includes(dep)),
    source,
  }
}

export async function useRelationsUnJSRepositories() {
  const { data, error } = await useAsyncData('content:relations:packages', () => $fetch('/api/content/packages.json'), {
    transform: (data: any[]) => {
      const packages = data.filter(pkg => pkg.npm)
      const names = packages.map(pkg => pkg.title)

      return packages.map((pkg) => {
        return {
          name: pkg.title,
          description: pkg.description,
          dependencies: pkg.npm.dependencies.filter((dep: string) => names.includes(dep)) ?? [],
          devDependencies: pkg.npm.devDependencies.filter((dep: string) => names.includes(dep)) ?? [],
          source: 'unjs',
        } satisfies RelationPackage
      },
      )
    },
    default: () => [],
  })

  if (error.value) {
    throw createError({
      statusCode: error.value.statusCode,
      message: error.value.message,
      fatal: true,
    })
  }

  return {
    data,
  }
}

/**
 * Manage the menu state.
 */
export function useRelationsMenu() {
  const open = ref(false)

  const storage = useStorage('unjs-relations-menu', true)

  watch(open, (value) => {
    storage.value = value
  })

  onMounted(() => {
    open.value = storage.value
  })

  defineShortcuts({
    meta_m: {
      handler: () => {
        open.value = !open.value
      },
    },
  })

  return open
}

/**
 * Manage the legend state.
 */
export function useRelationsLegend() {
  const open = ref(false)

  const storage = useStorage('unjs-relations-legend', true)

  watch(open, (value) => {
    storage.value = value
  })

  onMounted(() => {
    open.value = storage.value
  })

  defineShortcuts({
    meta_l: {
      handler: () => {
        open.value = !open.value
      },
    },
  })

  return open
}

/**
 * Get settings from the storage.
 */
function useRelationsSettingsStorage() {
  return useStorage('unjs-relations-settings', {
    showDependencies: true,
    showDevDependencies: false,
    showChildren: false,
  })
}

/**
 * Handle the settings using both the query and the storage.
 *
 * If there is no settings keywords in the query, we use the storage.
 */
export function useRelationsSettings() {
  const route = useRoute()
  const storage = useRelationsSettingsStorage()

  const hasQuery = computed(() => {
    return route.query.showDependencies || route.query.showDevDependencies || route.query.showChildren
  })

  const showDependencies = computed(() => {
    if (hasQuery.value && route.query.showDependencies)
      return route.query.showDependencies === 'true'

    if (hasQuery.value && !route.query.showDependencies)
      return false

    return storage.value.showDependencies
  })

  const showDevDependencies = computed(() => {
    if (hasQuery.value && route.query.showDevDependencies)
      return route.query.showDevDependencies === 'true'

    if (hasQuery.value && !route.query.showDevDependencies)
      return false

    return storage.value.showDevDependencies
  })

  const showChildren = computed(() => {
    if (hasQuery.value && route.query.showChildren)
      return route.query.showChildren === 'true'

    if (hasQuery.value && !route.query.showChildren)
      return false

    return storage.value.showChildren
  })

  function update(query: { showDependencies?: boolean, showDevDependencies?: boolean, showChildren?: boolean }) {
    navigateTo({
      query: {
        ...route.query,
        showDependencies: String(query.showDependencies ?? showDependencies.value),
        showDevDependencies: String(query.showDevDependencies ?? showDevDependencies.value),
        showChildren: String(query.showChildren ?? showChildren.value),
      },
    })
  }

  return {
    storage,
    showDependencies,
    showDevDependencies,
    showChildren,
    update,
  }
}

/**
 * Get the selection from the storage.
 */
function useRelationsSelectionStorage(defaultSelection: string[]) {
  return useStorage('unjs-relations-selection', {
    unjs: defaultSelection,
    npm: [] as string[],
  })
}

/**
 * Handle the selection using both the query and the storage.
 *
 * If there is no selection keywords in the query, we use the storage.
 */
function useRelationsSelection(defaultSelection: string[]) {
  const route = useRoute()
  const storage = useRelationsSelectionStorage(defaultSelection)

  const hasQuery = computed(() => {
    return route.query['u[]'] || route.query['n[]']
  })

  const unjs = computed(() => {
    if (hasQuery.value && route.query['u[]'])
      return toArray(route.query['u[]']) as string[]

    if (hasQuery.value && !route.query['u[]'])
      return [] as string[]

    return storage.value.unjs
  })

  const npm = computed(() => {
    if (hasQuery.value && route.query['n[]'])
      return toArray(route.query['n[]']) as string[]

    if (hasQuery.value && !route.query['n[]'])
      return [] as string[]

    return storage.value.npm
  })

  function update(packages: RelationPackage[]) {
    const unjs = packages.filter(pkg => pkg.source === 'unjs').map(pkg => pkg.name)
    const npm = packages.filter(pkg => pkg.source === 'npm').map(pkg => pkg.name)

    navigateTo({
      query: {
        ...route.query,
        'u[]': unjs,
        'n[]': npm,
      },
    })
  }

  return {
    storage,
    unjs,
    npm,
    update,
  }
}

// NOTE: this could be a store to share state between components
export function useRelations(unjs: RelationPackage[]) {
  const settings = useRelationsSettings()

  /**
   * Watch is made on this composable since `useRelationsSettings` can be used multiple times.
   */
  watch([settings.showDependencies, settings.showDevDependencies, settings.showChildren], () => {
    settings.storage.value = {
      showDependencies: settings.showDependencies.value,
      showDevDependencies: settings.showDevDependencies.value,
      showChildren: settings.showChildren.value,
    }
  })

  const _selection = useRelationsSelection(unjs.map(pkg => pkg.name))

  /**
   * Watch is made on this composable since `useRelationsSelection` can be used multiple times.
   */
  watch([_selection.unjs, _selection.npm], () => {
    _selection.storage.value = {
      unjs: _selection.unjs.value,
      npm: _selection.npm.value,
    }
  })

  const selection = computed(() => {
    return [
      ..._selection.unjs.value.map(u => unjs.find(pkg => pkg.name === u)).filter(Boolean),
    ] as RelationPackage[]
  })

  onMounted(() => {
    // When the page load, we set the query with selection and the default settings
    navigateTo({
      query: {
        'u[]': _selection.unjs.value,
        'n[]': _selection.npm.value,
        'showDependencies': String(settings.showDependencies.value),
        'showDevDependencies': String(settings.showDevDependencies.value),
        'showChildren': String(settings.showChildren.value),
      },
    })
  })

  return {
    settings,
    selection,
    updateSelection: _selection.update,
  }
}
