<script lang="ts" setup>
const { data } = await useAsyncData('content:design-kit-package-puzzle-parts', () => {
  return queryContent('/packages/').only(['title']).find()
})

const toast = useToast()

function showNotification(title: string) {
  toast.add({
    title: `Downloading ${title} logo`,
    timeout: 3000,
  })
}
</script>

<template>
  <DesignKitGrid v-if="data" class="lg:grid-cols-5 xl:grid-cols-6">
    <DesignKitGridItem v-for="pkg in data" :key="pkg.title">
      <template #content>
        <div class="bg-gray-300/20 dark:bg-gray-700/20 h-full flex items-center justify-center p-4">
          <AppColorModeImage :alt="`Logo of ${pkg.title}`" :light="toPackagePuzzlePart(pkg.title)" :dark="toPackagePuzzlePart(pkg.title, true)" class="h-full" />
        </div>
      </template>
      <template #description>
        <div class="flex justify-between">
          <p>
            {{ pkg.title }}
          </p>
          <div class="font-normal flex gap-2">
            <NuxtLink download :to="toPackagePuzzlePart(pkg.title)" target="_blank" class="hover:underline hover:underline-offset-2" @click="showNotification(pkg.title)">
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
