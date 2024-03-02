import { useStorage } from '@vueuse/core'
import type { PackageJson } from 'pkg-types'
import type { RelationPackage } from '~/types/package'

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
 * Packages
 */
export const useUnjsPackages = () => useState<RelationPackage[]>('relations:packages:unjs', () => [])
export const useNpmPackages = () => useState<RelationPackage[]>('relations:packages:npm', () => [])
export function useRelationsPackages() {
  const unjsPackages = useUnjsPackages()
  const npmPackages = useNpmPackages()

  const packages = computed(() => [...unjsPackages.value, ...npmPackages.value])

  function addNpmPackages(packages: PackageJson[]) {
    const unjsPackageNames = unjsPackages.value.map(pkg => pkg.npmName)
    const relationsPackages = packages.map(pkg => toRelationsPackage(pkg, unjsPackageNames))

    const newPackages = relationsPackages.filter(pkg => !npmPackages.value.find(p => p.name === pkg.name) && !unjsPackages.value.find(p => p.name === pkg.name))

    npmPackages.value.push(...newPackages)
  }
  function addNpmPackage(pkg: PackageJson) {
    const relationsPackage = toRelationsPackage(pkg, unjsPackages.value.map(pkg => pkg.npmName))

    if (npmPackages.value.find(pkg => pkg.name === relationsPackage.name)) {
      throw createError({
        message: `Package ${relationsPackage.name} already exists in the list of npm packages`,
      })
    }

    if (unjsPackages.value.find(pkg => pkg.name === relationsPackage.name)) {
      throw createError({
        message: `Package ${relationsPackage.name} already exists in the list of UnJS packages`,
      })
    }

    npmPackages.value.push(relationsPackage)
  }
  function removeNpmPackage(name: string) {
    const index = npmPackages.value.findIndex(pkg => pkg.name === name)

    if (index !== -1)
      npmPackages.value.splice(index, 1)
  }
  function removeAllNpmPackages() {
    npmPackages.value = []
  }

  return {
    unjsPackages,
    npmPackages,
    packages,

    addNpmPackages,
    addNpmPackage,
    removeNpmPackage,
    removeAllNpmPackages,
  }
}

/**
 * Selection
 */
export function useRelationsSelection() {
  const { unjsQuery, npmQuery } = useRelationsQuery()

  const unjsPackages = useUnjsPackages()
  const unjsSelection = computed(() => {
    return unjsQuery.value?.map((name) => {
      return unjsPackages.value.find(pkg => pkg.npmName === name)
    }).filter(Boolean) as RelationPackage[] ?? []
  })

  const npmPackages = useNpmPackages()
  const npmSelection = computed(() => {
    return npmQuery.value?.map((name) => {
      return npmPackages.value.find(pkg => pkg.name === name)
    }).filter(Boolean) as RelationPackage[] ?? []
  })
  const selection = computed(() => {
    return unjsSelection.value.concat(npmSelection.value)
  })

  return {
    unjsSelection,
    npmSelection,
    selection,
  }
}

/**
 * Query
 */
export function useRelationsQuery() {
  const route = useRoute()

  /**
   * Packages
   */
  const hasPackagesQuery = computed(() => {
    return route.query['u[]'] || route.query['n[]']
  })

  const unjsQuery = computed(() => {
    if (hasPackagesQuery.value && route.query['u[]'])
      return toArray(route.query['u[]']) as string[]

    if (hasPackagesQuery.value && !route.query['u[]'])
      return [] as string[]

    return null
  })
  const npmQuery = computed(() => {
    if (hasPackagesQuery.value && route.query['n[]'])
      return toArray(route.query['n[]']) as string[]

    if (hasPackagesQuery.value && !route.query['n[]'])
      return [] as string[]

    return null
  })

  /**
   * Settings
   */
  const hasSettingsQuery = computed(() => {
    return route.query.showDependencies || route.query.showDevDependencies || route.query.showChildren
  })

  const showDependenciesQuery = computed(() => {
    if (hasSettingsQuery.value && route.query.showDependencies)
      return route.query.showDependencies === 'true'

    if (hasSettingsQuery.value && !route.query.showDependencies)
      return false

    return null
  })
  const showDevDependenciesQuery = computed(() => {
    if (hasSettingsQuery.value && route.query.showDevDependencies)
      return route.query.showDevDependencies === 'true'

    if (hasSettingsQuery.value && !route.query.showDevDependencies)
      return false

    return null
  })
  const showChildrenQuery = computed(() => {
    if (hasSettingsQuery.value && route.query.showChildren)
      return route.query.showChildren === 'true'

    if (hasSettingsQuery.value && !route.query.showChildren)
      return false

    return null
  })

  /**
   * Setter
   */
  function updateQuery(query: { unjs?: string[] | null, npm?: string[] | null, showDependencies?: boolean, showDevDependencies?: boolean, showChildren?: boolean }, replace: boolean = false) {
    /**
     * Get the query as default value to keep the current value if not provided.
     */
    navigateTo({
      query: {
        'u[]': query.unjs ?? unjsQuery.value,
        'n[]': query.npm ?? npmQuery.value,
        'showDependencies': String(query.showDependencies ?? showDependenciesQuery.value ?? true),
        'showDevDependencies': String(query.showDevDependencies ?? showDevDependenciesQuery.value ?? false),
        'showChildren': String(query.showChildren ?? showChildrenQuery.value ?? false),
      },
    }, { replace })
  }

  const hasSelectionAndSettings = computed(() => {
    return (route.query['u[]'] || route.query['n[]']) && route.query.showDependencies && route.query.showDevDependencies && route.query.showChildren
  })

  return {
    hasPackagesQuery,
    unjsQuery,
    npmQuery,

    hasSettingsQuery,
    showDependenciesQuery,
    showDevDependenciesQuery,
    showChildrenQuery,

    updateQuery,

    hasSelectionAndSettings,
  }
}

/**
 * Settings
 */
export function useRelationsSettings() {
  const { showDependenciesQuery, showDevDependenciesQuery, showChildrenQuery } = useRelationsQuery()

  const settings = computed(() => {
    return {
      showDependencies: showDependenciesQuery.value ?? true,
      showDevDependencies: showDevDependenciesQuery.value ?? false,
      showChildren: showChildrenQuery.value ?? false,
    }
  })

  return {
    settings,
  }
}

/**
 * Storage
 */
export function useRelationsStorage() {
  const selectionStorage = useLocalStorage('unjs-relations-selection', {
    unjs: [] as string[],
    npm: [] as string[],
  })

  const settingsStorage = useLocalStorage('unjs-relations-settings', {
    showDependencies: true,
    showDevDependencies: false,
    showChildren: false,
  })

  return {
    selectionStorage,
    settingsStorage,
  }
}
