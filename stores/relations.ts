import { useStorage } from '@vueuse/core'
import type { RelationPackage } from '~/types/package'

export const useRelationsStore = defineStore('relations', () => {
  const route = useRoute()

  const _packages = ref({
    unjs: [] as RelationPackage[],
    npm: [] as RelationPackage[],
  })
  const packages = computed(() => [..._packages.value.unjs, ..._packages.value.npm])
  const unjsPackages = computed(() => _packages.value.unjs)
  const npmPackages = computed(() => _packages.value.npm)

  /**
   * Settings
   */
  const settingsStorage = useStorage('unjs-relations-settings', {
    showDependencies: true,
    showDevDependencies: false,
    showChildren: false,
  })
  const hasSettingsQuery = computed(() => {
    return route.query.showDependencies || route.query.showDevDependencies || route.query.showChildren
  })
  const showDependencies = computed(() => {
    if (hasSettingsQuery.value && route.query.showDependencies)
      return route.query.showDependencies === 'true'

    if (hasSettingsQuery.value && !route.query.showDependencies)
      return false

    return settingsStorage.value.showDependencies
  })
  const showDevDependencies = computed(() => {
    if (hasSettingsQuery.value && route.query.showDevDependencies)
      return route.query.showDevDependencies === 'true'

    if (hasSettingsQuery.value && !route.query.showDevDependencies)
      return false

    return settingsStorage.value.showDevDependencies
  })
  const showChildren = computed(() => {
    if (hasSettingsQuery.value && route.query.showChildren)
      return route.query.showChildren === 'true'

    if (hasSettingsQuery.value && !route.query.showChildren)
      return false

    return settingsStorage.value.showChildren
  })
  function updateSettings(query: { showDependencies?: boolean, showDevDependencies?: boolean, showChildren?: boolean }) {
    navigateTo({
      query: {
        ...route.query,
        showDependencies: String(query.showDependencies ?? showDependencies.value),
        showDevDependencies: String(query.showDevDependencies ?? showDevDependencies.value),
        showChildren: String(query.showChildren ?? showChildren.value),
      },
    })
  }
  /**
   * Maintain storage in sync with the query
   */
  watch([showDependencies, showDevDependencies, showChildren], () => {
    settingsStorage.value = {
      showDependencies: showDependencies.value,
      showDevDependencies: showDevDependencies.value,
      showChildren: showChildren.value,
    }
  })

  /**
   * Selection
   */
  const selectionStorage = useStorage('unjs-relations-selection', {
    unjs: null as null | string[],
    npm: null as null | string[],
  })
  const hasSelectionQuery = computed(() => {
    return route.query['u[]'] || route.query['n[]']
  })
  // Query value must not be directly linked to the storage.
  const unjs = computed(() => {
    if (hasSelectionQuery.value && route.query['u[]'])
      return toArray(route.query['u[]']) as string[]

    if (hasSelectionQuery.value && !route.query['u[]'])
      return [] as string[]

    return null
  })
  const npm = computed(() => {
    if (hasSelectionQuery.value && route.query['n[]'])
      return toArray(route.query['n[]']) as string[]

    if (hasSelectionQuery.value && !route.query['n[]'])
      return [] as string[]

    return null
  })
  const unjsSelection = computed(() => {
    return [
      ...(unjs.value || []).map(name => unjsPackages.value.find(pkg => pkg.name === name)).filter(Boolean) as RelationPackage[],
    ]
  })
  const npmSelection = computed(() => {
    return [
      ...(npm.value || []).map(name => npmPackages.value.find(pkg => pkg.name === name)).filter(Boolean) as RelationPackage[],
    ]
  })
  const selection = computed(() => {
    return [
      ...unjsSelection.value,
    ]
  })
  function updateSelection(packages: RelationPackage[]) {
    const _unjs = packages.filter(pkg => pkg.source === 'unjs').map(pkg => pkg.name)
    const _npm = packages.filter(pkg => pkg.source === 'npm').map(pkg => pkg.name)

    navigateTo({
      query: {
        ...route.query,
        'u[]': _unjs ?? unjs.value,
        'n[]': _npm ?? npm.value,
      },
    })
  }
  /**
   * Maintain storage in sync with the query
   */
  watch([unjs, npm], () => {
    selectionStorage.value = {
      unjs: unjs.value ?? [],
      npm: npm.value ?? [],
    }
  })

  /**
   * Packages
   */
  async function fetchUnJSPackages() {
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

    _packages.value.unjs = data.value
  }

  /**
   * Used to know if we can mount the graph. While there's no query, we don't mount the graph (this is why we do not rely on the storage as a fallback of the query).
   */
  const hasQuery = computed(() => {
    return (route.query['u[]'] || route.query['n[]']) && route.query.showDependencies && route.query.showDevDependencies && route.query.showChildren
  })

  /**
   * Returns
   */
  return {
    /**
     * @private
     */
    _packages,
    packages,
    unjsPackages,
    npmPackages,
    fetchUnJSPackages,

    settingsStorage,
    hasSettingsQuery,
    showDependencies,
    showDevDependencies,
    showChildren,
    updateSettings,

    selectionStorage,
    hasSelectionQuery,
    unjs,
    npm,
    selection,
    unjsSelection,
    npmSelection,
    updateSelection,

    hasQuery,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useRelationsStore, import.meta.hot))
