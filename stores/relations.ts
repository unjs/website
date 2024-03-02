import type { PackageJson } from 'pkg-types'
import type { RelationPackage } from '~/types/package'

export const useRelationsStore = defineStore('relations', () => {
  const _packages = ref({
    unjs: [] as RelationPackage[],
    npm: [] as RelationPackage[],
  })
  const packages = computed(() => [..._packages.value.unjs, ..._packages.value.npm])
  const unjsPackages = computed(() => _packages.value.unjs)
  const npmPackages = computed(() => _packages.value.npm)

  // create a function retrieve to filter string[] using installed packages
  /**
   * Settings
   */
  // function updateSettings(query: { showDependencies?: boolean, showDevDependencies?: boolean, showChildren?: boolean }) {
  //   navigateTo({
  //     query: {
  //       ...route.query,
  //       showDependencies: String(query.showDependencies ?? showDependencies.value),
  //       showDevDependencies: String(query.showDevDependencies ?? showDevDependencies.value),
  //       showChildren: String(query.showChildren ?? showChildren.value),
  //     },
  //   })
  // }

  // const unjs = useUnJSQuery()
  // const npm = useNpmQuery()
  // const unjsSelection = computed(() => {
  //   return [
  //     ...(unjs.value || []).map(name => unjsPackages.value.find(pkg => pkg.npmName === name)).filter(Boolean) as RelationPackage[],
  //   ]
  // })
  // const npmSelection = computed(() => {
  //   return [
  //     ...(npm.value || []).map(name => npmPackages.value.find(pkg => pkg.npmName === name)).filter(Boolean) as RelationPackage[],
  //   ]
  // })
  // const selection = computed(() => {
  //   return [
  //     ...unjsSelection.value,
  //     ...npmSelection.value,
  //   ]
  // })
  // function updateSelection(packages: RelationPackage[]) {
  //   const _unjs = packages.filter(pkg => pkg.source === 'unjs').map(pkg => pkg.npmName)
  //   const _npm = packages.filter(pkg => pkg.source === 'npm').map(pkg => pkg.npmName)

  //   navigateTo({
  //     query: {
  //       ...route.query,
  //       'u[]': _unjs ?? unjs.value,
  //       'n[]': _npm ?? npm.value,
  //     },
  //   })
  // }

  /**
   * Packages
   */
  // async function fetchUnJSPackages() {
  //   const { data, error } = await useAsyncData('content:relations:packages', () => $fetch('/api/content/packages.json'), {
  //     transform: (data: any[]) => {
  //       const packages = data.filter(pkg => pkg.npm)
  //       const names = packages.map(pkg => pkg.npm.name)

  //       return packages.map((pkg) => {
  //         return {
  //           name: pkg.title,
  //           npmName: pkg.npm.name,
  //           description: pkg.description,
  //           dependencies: pkg.npm.dependencies.filter((dep: string) => names.includes(dep)) ?? [],
  //           devDependencies: pkg.npm.devDependencies.filter((dep: string) => names.includes(dep)) ?? [],
  //           source: 'unjs',
  //         } satisfies RelationPackage
  //       },
  //       )
  //     },
  //     default: () => [],
  //   })

  //   if (error.value) {
  //     throw createError({
  //       statusCode: error.value.statusCode,
  //       message: error.value.message,
  //       fatal: true,
  //     })
  //   }

  //   _packages.value.unjs = data.value
  // }
  /**
   * Add multiple npm packages to the list of packages.
   *
   * This is different from `addNpmPackage` because every packages will be added at once to avoid multiple reactivity updates. This function does not throw an error if a package already exists in the list since it's a batch operation.
   */
  function addNpmPackages(packages: PackageJson[]) {
    const unjsPackageNames = unjsPackages.value.map(pkg => pkg.npmName)
    const relationsPackages = packages.map(pkg => toRelationsPackage(pkg, unjsPackageNames))

    const newPackages = relationsPackages.filter(pkg => !_packages.value.npm.find(p => p.name === pkg.name) && !_packages.value.unjs.find(p => p.name === pkg.name))

    _packages.value.npm.push(...newPackages)
  }
  function addNpmPackage(pkg: PackageJson) {
    const relationsPackage = toRelationsPackage(pkg, unjsPackages.value.map(pkg => pkg.npmName))

    if (_packages.value.npm.find(pkg => pkg.name === relationsPackage.name)) {
      throw createError({
        message: `Package ${relationsPackage.name} already exists in the list of npm packages`,
      })
    }

    if (_packages.value.unjs.find(pkg => pkg.name === relationsPackage.name)) {
      throw createError({
        message: `Package ${relationsPackage.name} already exists in the list of UnJS packages`,
      })
    }

    _packages.value.npm.push(relationsPackage)
  }
  function removeNpmPackage(name: string) {
    const index = _packages.value.npm.findIndex(pkg => pkg.name === name)

    if (index !== -1)
      _packages.value.npm.splice(index, 1)
  }
  function removeAllNpmPackages() {
    _packages.value.npm = []
  }

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
    addNpmPackages,
    addNpmPackage,
    removeNpmPackage,
    removeAllNpmPackages,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useRelationsStore, import.meta.hot))
