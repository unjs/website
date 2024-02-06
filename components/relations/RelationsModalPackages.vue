<script lang="ts" setup>
const open = defineModel<boolean>('open', { required: true })

const relationsStore = useRelationsStore()

const selection = ref([...relationsStore.unjsSelection])
// Update selection when store change
watch(() => relationsStore.unjsSelection, (value) => {
  selection.value = [...value]
})

function clear() {
  selection.value = []
}

function cancel() {
  open.value = false
}

function validate() {
  relationsStore.updateSelection([...selection.value, ...relationsStore.npmSelection])
  open.value = false
}
</script>

<template>
  <UModal v-model="open" :ui="{ width: 'md:max-w-2xl xl:max-w-5xl' }">
    <UCard class="w-full">
      <template #header>
        <div class="flex justify-between">
          <h2 class="font-semibold">
            Manage UnJS Repositories
          </h2>
          <UButton type="button" aria-label="close" color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="open = false" />
        </div>
      </template>

      <RelationsPackagesCombobox v-model:selection="selection" :packages="relationsStore.unjsPackages">
        <template #logo="{ item }">
          <UAvatar :src="toPackageLogo(item.name)" :alt="`Logo of ${item.name}`" size="xs" :ui="{ rounded: '' }" />
        </template>
      </RelationsPackagesCombobox>

      <template #footer>
        <div class="flex flex-row justify-between items-center">
          <UButton type="button" variant="ghost" color="red" @click="clear">
            Clear selection
          </UButton>
          <div class="flex justify-end gap-2">
            <UButton type="button" variant="ghost" color="gray" @click="cancel">
              Cancel
            </UButton>
            <UButton type="button" @click="validate">
              Validate
            </UButton>
          </div>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
