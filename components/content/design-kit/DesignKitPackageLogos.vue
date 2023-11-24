<script lang="ts" setup>
const { data } = await useAsyncData('content:design-kit-package-logo', () => {
  return queryContent('/packages/').only(['title']).find()
})
</script>

<template>
  <DesignKitGrid v-if="data">
    <DesignKitGridItem v-for="pkg in data" :key="pkg.title">
      <template #content>
        <div class="bg-white h-full flex items-center justify-center p-4">
          <img :alt="`Logo of ${pkg.title}`" :src="toPackageLogo(pkg.title)" class="h-full">
        </div>
      </template>
      <template #description>
        <div class="flex justify-between">
          <p>
            {{ pkg.title }}
          </p>
          <div class="font-normal flex gap-2">
            <NuxtLink download :to="toPackageLogo(pkg.title)" target="_blank" class="hover:underline hover:underline-offset-2">
              svg
            </NuxtLink>
          </div>
        </div>
      </template>
    </DesignKitGridItem>
  </DesignKitGrid>
  <p v-else>
    No packages found
  </p>
</template>
