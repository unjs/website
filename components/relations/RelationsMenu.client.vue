<script lang="ts" setup>
const emits = defineEmits<{
  openRepositories: [boolean]
}>()

const openMenu = defineModel<boolean>('menu', { required: true })
const openLegend = defineModel<boolean>('legend', { required: true })

const { metaSymbol } = useShortcuts()

const settings = useRelationsSettings()

const settingsItems = computed(() => [[{
  label: settings.showDependencies.value ? 'Hide Dependencies' : 'Show Dependencies',
  icon: 'i-ph-graph',
  click: () => {
    settings.updateQuery({ showDependencies: !settings.showDependencies.value })
  },

}, {
  label: settings.showDevDependencies.value ? 'Hide Dev Dependencies' : 'Show Dev Dependencies',
  icon: 'i-ph-line-segments',
  click: () => {
    settings.updateQuery({ showDevDependencies: !settings.showDevDependencies.value })
  },

}, {
  label: settings.showChildren.value ? 'Hide Children' : 'Show Children',
  icon: 'i-ph-tree-structure',
  click: () => {
    settings.updateQuery({ showChildren: !settings.showChildren.value })
  },
}], [
  {
    label: openMenu.value ? 'Hide Menu' : 'Show Menu',
    icon: 'i-ph-house',
    shortcuts: [metaSymbol.value, 'm'],
    click: () => {
      openMenu.value = !openMenu.value
    },
  },
  {
    label: openLegend.value ? 'Hide Legend' : 'Show Legend',
    icon: 'i-heroicons-tag',
    shortcuts: [metaSymbol.value, 'l'],
    click: () => {
      openLegend.value = !openLegend.value
    },
  },
]])
</script>

<template>
  <div class="absolute left-4 top-20 z-10">
    <UCard :ui="{ background: 'bg-white/40 backdrop-blur-sm dark:bg-gray-900/60', divide: '', shadow: 'shadow-sm', rounded: 'rounded-lg', body: { base: 'grow', padding: 'p-4 sm:p-4' } }">
      <div class="mb-2 flex justify-between items-center gap-4">
        <div class="flex items-end gap-4">
          <h1 class="font-bold whitespace-nowrap">
            UnJS Relations
          </h1>
        </div>
        <UDropdown :items="settingsItems" :popper="{ adaptative: false, placement: 'bottom', strategy: 'absolute' }">
          <UButton color="gray" variant="ghost" icon="i-ph-faders-horizontal" aria-label="Settings" />
        </UDropdown>
      </div>

      <div class="mt-2 flex flex-col gap-2">
        <UButton variant="ghost" color="gray" @click="emits('openRepositories', true)">
          <template #leading>
            <UAvatar src="/favicon.svg" alt="UnJS Logo" size="2xs" :ui="{ rounded: 'rounded-sm' }" />
          </template>
          UnJS Repositories
        </UButton>
      </div>
    </UCard>
  </div>
</template>
