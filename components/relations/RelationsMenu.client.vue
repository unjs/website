<script lang="ts" setup>
import { useStorage } from '@vueuse/core'

const openMenu = defineModel<boolean>('menu', { required: true })
const openLegend = defineModel<boolean>('legend', { required: true })

const { metaSymbol } = useShortcuts()

const menu = ref<HTMLElement | null>(null)
const menuHandle = ref<HTMLElement | null>(null)

const defaultPosition = { x: 16 , y: 64 + 16 } // 64 is the header height
const storage = useStorage('unjs-relations-menu-position', defaultPosition)

const { style, position } = useDraggable(menu, {
  initialValue: storage.value,
  handle: menuHandle,
  preventDefault: true,
  onEnd({ x, y }) {
    storage.value = { x, y }
  },
})

interface Settings {
  showDependencies: boolean
  showDevDependencies: boolean
  showChildren: boolean
}


const settings = ref<Settings>({
  showDependencies: true,
  showDevDependencies: false,
  showChildren: false,
})
const settingsItems = computed(() => [[{
 label: settings.value.showDependencies ? 'Hide Dependencies' : 'Show Dependencies',
 icon: 'i-ph-graph',
  click: () => {
    settings.value.showDependencies = !settings.value.showDependencies
  },

},
{
  label: settings.value.showDevDependencies ? 'Hide Dev Dependencies' : 'Show Dev Dependencies',
  icon: 'i-ph-line-segments',
  click: () => {
    settings.value.showDevDependencies = !settings.value.showDevDependencies
  },

},
{
  label: settings.value.showChildren ? 'Hide Children' : 'Show Children',
  icon: 'i-ph-tree-structure',
  click: () => {
    settings.value.showChildren = !settings.value.showChildren
  },
},
], [
  {
    label: openMenu.value ? 'Hide Menu' : 'Show Menu',
    icon: 'i-ph-house',
    shortcuts: [metaSymbol.value, 'm'],
    click: () => {
      openMenu.value = !openMenu.value
      menuOpenStorage.value = openMenu.value
    },
  },
  {
    label: openLegend.value ? 'Hide Legend' : 'Show Legend',
    icon: 'i-heroicons-tag',
    shortcuts: [metaSymbol.value, 'l'],
    click: () => {
      openLegend.value = !openLegend.value
      legendOpenStorage.value = openLegend.value
    },
  }
], [
 { label: 'Reset Menu Position',
  icon: 'i-heroicons-arrow-path-20-solid',
  click: () => {
    position.value = defaultPosition
    storage.value = defaultPosition
  },}
]])
</script>

<template>
  <div ref="menu" class="fixed z-10" :style="style">
    <UCard :ui="{ background: 'bg-white/40 backdrop-blur-sm dark:bg-gray-900/60', divide: '', shadow: 'shadow-sm', rounded: 'rounded-lg', body: { base: 'grow', padding: 'p-4 sm:p-4' } }">
      <div class="mb-2 flex justify-between items-center gap-4">
        <div class="flex items-end gap-4">
          <h1 class="font-bold whitespace-nowrap">
            UnJS Relations
          </h1>
        </div>
        <UButton ref="menuHandle" square size="xs" class="cursor-move" icon="i-ph-dots-six-vertical" aria-label="Drag to move" variant="ghost" color="gray" />
      </div>

      <UDropdown :items="settingsItems" :popper="{ adaptative: false, placement: 'bottom', strategy: 'absolute' }">
        <UButton color="gray" variant="ghost" icon="i-ph-faders-horizontal" label="Settings" />
      </UDropdown>
    </UCard>
  </div>
</template>
