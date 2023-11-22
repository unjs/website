<script lang="ts" setup>
defineProps<{
  logo: {
    name: string
    src: {
      svg: string
      png: string
    }
  }[]
}>()
</script>

<template>
  <DesignKitGrid>
    <DesignKitGridItem v-for="item in logo" :key="item.name">
      <template #content>
        <div class="bg-white h-full flex items-center justify-center p-4">
          <img :src="item.src.svg" :alt="`${item.name} logo`" class="h-full">
        </div>
      </template>
      <template #description>
        <div class="flex justify-between">
          <p>
            {{ item.name }}
          </p>
          <div class="font-normal flex gap-2">
            <NuxtLink v-for="(value, key) in item.src" :key="key" download :to="value" target="_blank" class="hover:underline hover:underline-offset-2">
              {{ key }}
            </NuxtLink>
          </div>
        </div>
      </template>
    </DesignKitGridItem>
  </DesignKitGrid>
</template>
