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

export function useRelationsSettings() {
  const route = useRoute()

  const showDependencies = computed(() => {
    if (!route.query.showDependencies)
      return undefined

    return route.query.showDependencies === 'true'
  })

  const showDevDependencies = computed(() => {
    if (!route.query.showDevDependencies)
      return undefined

    return route.query.showDevDependencies === 'true'
  })

  const showChildren = computed(() => {
    if (!route.query.showChildren)
      return undefined

    return route.query.showChildren === 'true'
  })

  const storage = useStorage('unjs-relations-settings', {
    showDependencies: true,
    showDevDependencies: false,
    showChildren: false,
  })

  const updateQuery = (query?: { showDependencies?: boolean, showDevDependencies?: boolean, showChildren?: boolean }) => {
    const _query = {
      showDependencies: (query?.showDependencies ?? storage.value.showDependencies).toString(),
      showDevDependencies: (query?.showDevDependencies ?? storage.value.showDevDependencies).toString(),
      showChildren: (query?.showChildren ?? storage.value.showChildren).toString(),
    }

    storage.value = {
      showDependencies: query?.showDependencies ?? storage.value.showDependencies,
      showDevDependencies: query?.showDevDependencies ?? storage.value.showDevDependencies,
      showChildren: query?.showChildren ?? storage.value.showChildren,
    }

    navigateTo({
      query: {
        ...route.query,
        ..._query,
      },
    })
  }

  return {
    showDependencies,
    showDevDependencies,
    showChildren,
    storage,
    updateQuery,
  }
}
