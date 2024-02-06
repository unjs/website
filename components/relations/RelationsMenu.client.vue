<script lang="ts" setup>
const emits = defineEmits<{
  openUnjs: [boolean]
  openNpm: [boolean]
}>()

const openAbout = defineModel<boolean>('about', { required: true })
const openMenu = defineModel<boolean>('menu', { required: true })
const openLegend = defineModel<boolean>('legend', { required: true })

const { metaSymbol } = useShortcuts()

const relationsStore = useRelationsStore()

const settingsItems = computed(() => [[{
  label: relationsStore.showDependencies ? 'Hide Dependencies' : 'Show Dependencies',
  icon: 'i-ph-graph',
  click: () => {
    relationsStore.updateSettings({ showDependencies: !relationsStore.showDependencies })
  },

}, {
  label: relationsStore.showDevDependencies ? 'Hide Dev Dependencies' : 'Show Dev Dependencies',
  icon: 'i-ph-line-segments',
  click: () => {
    relationsStore.updateSettings({ showDevDependencies: !relationsStore.showDevDependencies })
  },

}], [{
  // Children can be dependencies or devDependencies. It's not standalone but related to the previous
  label: relationsStore.showChildren ? 'Hide Children' : 'Show Children',
  icon: 'i-ph-tree-structure',
  click: () => {
    relationsStore.updateSettings({ showChildren: !relationsStore.showChildren })
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
], [
  {
    label: 'About',
    icon: 'i-heroicons-information-circle',
    shortcuts: [metaSymbol.value, 'i'],
    click: () => {
      openAbout.value = !openAbout.value
    },
  },
  {
    label: 'Help & Feedback',
    icon: 'i-simple-icons-github',
    shortcuts: [metaSymbol.value, 'h'],
    to: 'https://github.com/unjs/community/discussions',
    target: '_blank',
  },
]])
</script>

<template>
  <div>
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
        <UButton variant="ghost" color="gray" @click="emits('openUnjs', true)">
          <template #leading>
            <UAvatar src="/favicon.svg" alt="UnJS Logo" size="2xs" :ui="{ rounded: 'rounded-sm' }" />
          </template>
          UnJS Packages
        </UButton>
        <UButton variant="ghost" color="gray" @click="emits('openNpm', true)" icon="i-simple-icons-npm">
          npm Packages
        </UButton>
      </div>
    </UCard>
  </div>
</template>
