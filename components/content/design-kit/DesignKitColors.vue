import type { DesignKitColorsCopyButton } from '#ui-colors/components';
<script lang="ts" setup>
defineProps<{
  colors: {
    name: string
    hex: string
  }[]
}>()
</script>

<template>
  <DesignKitGrid>
    <DesignKitGridItem v-for="color in colors" :key="color.name">
      <template #content>
        <div class="h-full flex items-center justify-center p-4" :style="`background-color:${color.hex};`" />
      </template>
      <template #description>
        <div class="flex flex-col">
          <div class="flex justify-between">
            <div>
              {{ color.name }}
            </div>
            <DesignKitColorsCopyButton :text="color.hex" class="font-normal" />
          </div>
          <div class="font-normal text-sm text-zinc-500">
            {{ color.hex }}
          </div>
        </div>
      </template>
    </DesignKitGridItem>
  </DesignKitGrid>
</template>
