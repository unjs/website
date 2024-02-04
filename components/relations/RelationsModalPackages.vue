<script lang="ts" setup>
import type { RelationPackage } from '~/types/package'

defineProps<{
  packages: RelationPackage[]
}>()

const selectionModel = defineModel<RelationPackage[]>('selection', { required: true })
const open = defineModel<boolean>('open', { required: true })

const selection = ref([...selectionModel.value])

function clear() {
  selection.value = []
}

function cancel() {
  open.value = false
}

function validate() {
  selectionModel.value = selection.value
  open.value = false
}
</script>

<template>
  <UModal v-model="open" :ui="{ width: 'xl:max-w-5xl' }">
    <UCard>
      <template #header>
        <div class="flex justify-between">
          <h2 class="font-semibold">
            Manage UnJS Repositories
          </h2>
          <UButton type="button" aria-label="close" color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="open = false" />
        </div>
      </template>

      <RelationsModalPackagesCombobox v-model:selection="selection" :packages="packages" />

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
