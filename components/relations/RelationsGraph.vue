<script lang="ts" setup>
import type { Data, Edge, Options } from 'vis-network'
import { Network } from 'vis-network'
import { _black, _cyan, _pink, _violet, _white, _yellow } from '#tailwind-config/theme/colors'
import type { RelationPackage } from '~/types/package'

const props = defineProps<{
  packages: RelationPackage[]
  selection: RelationPackage[]
}>()

const emits = defineEmits<{
  loading: [boolean]
  selectNode: [RelationPackage]
}>()

const colorMode = useColorMode()

const container = ref<HTMLElement | null>(null)

const { showDependencies, showDevDependencies, showChildren } = useRelationsSettings()

const selectionNames = computed<string[]>(() => {
  return props.selection.map((select) => {
    return select.name
  })
})

const data = computed<Data>(() => {
  /** Selection */
  const selectionNodes: Data['nodes'] = props.selection.map((select) => {
    return {
      id: select.name,
      label: select.name,
      image: select.source === 'unjs' ? toPackageLogo(select.name) : `https://api.iconify.design/simple-icons/npm.svg`,
      group: 'selection',
    }
  })

  // Use a condition to avoid unnecessary computation
  const selectionChildrenPackages: RelationPackage[] = []
  const selectionChildrenPackagesName: string[] = []
  if (showChildren.value) {
  /** Children */
    selectionChildrenPackages.push(...props.packages
    // Filter out packages that have not selected packages as dependencies or devDependencies
      .filter((pkg) => {
        if (showDependencies.value) {
          // Check if current package use any of the selected packages
          const hasUsedBy = pkg.dependencies.some((dep) => {
            return selectionNames.value.includes(dep)
          })

          if (hasUsedBy)
            return true
        }

        if (showDependencies.value) {
          // Check if current package use any of the selected packages
          const hasUsedBy = pkg.devDependencies.some((dep) => {
            return selectionNames.value.includes(dep)
          })

          if (hasUsedBy)
            return true
        }

        return false
      })
    // Remove dependencies and devDependencies that are not selected
      .map((pkg) => {
        return {
          ...pkg,
          dependencies: pkg.dependencies.filter((dep) => {
            return selectionNames.value.includes(dep)
          }),
          devDependencies: pkg.devDependencies.filter((dep) => {
            return selectionNames.value.includes(dep)
          }),
        }
      }))

    selectionChildrenPackagesName.push(...selectionChildrenPackages.map((pkg) => {
      return pkg.name
    }))
  }

  /** Dependencies and Dev Dependencies */
  const allDependencies = [...props.selection, ...selectionChildrenPackages].flatMap((pkg) => {
    const deps = []

    // Add current package for selection children packages
    deps.push(pkg.name)

    if (showDependencies.value)
      deps.push(...pkg.dependencies)

    if (showDevDependencies.value)
      deps.push(...pkg.devDependencies)

    return deps
  })

  // Remove duplicates in all dependencies
  const dedupedAllDependencies = [...new Set(allDependencies)]

  // Remove selected packages from all dependencies since they are already in selection
  const dedupedWithoutSelectionAllDependencies = dedupedAllDependencies.filter((dep) => {
    return !selectionNames.value.includes(dep)
  })

  const allDependenciesNodes: Data['nodes'] = dedupedWithoutSelectionAllDependencies.flatMap((dep) => {
    const logo = props.packages.find((pkg) => {
      return pkg.name === dep
    })?.name

    return {
      id: dep,
      label: dep,
      image: toPackageLogo(logo!),
      group: 'dependencies',
    }
  })

  const nodes: Data['nodes'] = [
    ...selectionNodes,
    ...allDependenciesNodes,
  ]

  // Order matters since we want to show the dependencies and devDependencies of the selected packages first (otherwise, some packages will not have all their dependencies shown)
  const dedupePackages = [...props.selection, ...selectionChildrenPackages].reduce((acc, pkg) => {
    const index = acc.findIndex((p) => {
      return p.name === pkg.name
    })

    if (index === -1)
      acc.push(pkg)

    return acc
  }, [] as RelationPackage[])

  const edges: Data['edges'] = [
    ...dedupePackages.flatMap((pkg) => {
      const data: Edge[] = []

      if (showDependencies.value) {
        const color = colorMode.preference === 'light' ? _pink[300] : _pink[900]
        const highlight = colorMode.preference === 'light' ? _pink[500] : _pink[800]
        data.push(...pkg.dependencies.map((dep) => {
          return {
            from: pkg.name,
            to: dep,
            color: {
              color,
              highlight,
            },
            relation: 'dependencies',
            arrows: 'to',
          }
        }))
      }

      if (showDevDependencies.value) {
        const color = colorMode.preference === 'light' ? _violet[300] : _violet[900]
        const highlight = colorMode.preference === 'light' ? _violet[500] : _violet[800]
        data.push(...pkg.devDependencies.map((dep) => {
          return {
            from: pkg.name,
            to: dep,
            color: {
              color,
              highlight,
            },
            relation: 'devDependencies',
            arrows: 'to',
          }
        }))
      }

      return data
    }),
  ]

  return {
    nodes,
    edges,
  }
})

onMounted(() => {
  const generalOptions: Options = {
    nodes: {
      shape: 'circularImage',
      imagePadding: 6,
      size: 16,
    },
    edges: {
      arrows: {
        to: {
          scaleFactor: 0.2,
        },
      },
    },
    physics: {
      repulsion: {
        centralGravity: 0.7,
        springLength: 100,
        springConstant: 0.01,
      },
      maxVelocity: 146,
      solver: 'forceAtlas2Based',
      timestep: 0.35,
      stabilization: {
        enabled: true,
        iterations: 200,
      },
    },
  }
  const lightOptions: Options = {
    groups: {
      selection: {
        font: {
          color: _black,
          face: 'Nunito',
        },
        color: {
          background: _yellow[300],
          border: _yellow[500],
          highlight: {
            background: _yellow[400],
            border: _yellow[600],
          },
        },
      },
      dependencies: {
        font: {
          color: _black,
          face: 'Nunito',
        },
        color: {
          background: _cyan[50],
          border: _cyan[300],
          highlight: {
            background: _cyan[100],
            border: _cyan[500],
          },
        },
      },
    },
  }
  const darkOptions: Options = {
    groups: {
      selection: {
        font: {
          color: _white,
          face: 'Nunito',
        },
        color: {
          background: _yellow[900],
          border: _yellow[600],
          highlight: {
            background: _yellow[700],
            border: _yellow[500],
          },
        },
      },
      dependencies: {
        font: {
          color: _white,
          face: 'Nunito',
        },
        color: {
          background: _cyan[900],
          border: _cyan[600],
          highlight: {
            background: _cyan[700],
            border: _cyan[500],
          },
        },
      },
    },
  }

  const network = new Network(container.value!, data.value, {
    ...generalOptions,
    ...colorMode.value === 'light' ? lightOptions : darkOptions,
  })

  // Does not emit the event if there is no data
  network.on('stabilizationIterationsDone', () => {
    emits('loading', false)
  })

  // So if the selection is empty, we do not show the loading
  if (props.selection.length === 0)
    emits('loading', false)

  network.on('doubleClick', ({ nodes }) => {
    // const package_ = [...props.packages, ...props.selection].find((pkg) => {
    //   return pkg.name === nodes[0]
    // }) as RelationPackage
    // emits('selectNode', package_)
  })

  watch(data, () => {
    if (data.value.nodes?.length)
      emits('loading', true)
    network.setData(data.value)
  })
})
</script>

<template>
  <div ref="container" />
</template>
