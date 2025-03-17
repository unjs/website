<script lang="ts" setup>
const open = defineModel<boolean>('open', { required: true })
</script>

<template>
  <UModal v-model="open" :ui="{ width: 'xl:max-w-prose' }">
    <UCard>
      <template #header>
        <div class="flex justify-between">
          <h2 class="font-semibold">
            About UnJS Relations
          </h2>
          <UButton type="button" aria-label="close" color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="open = false" />
        </div>
      </template>

      <RelationsAbout />
    </UCard>
  </UModal>
</template>
