<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.',
})
</script>

<template>
  <Body class="px-4 py-4 md:py-8 font-sans dark:bg-gray-900">
    <AppHeader />
    <main class="my-20 lg:my-28 flex flex-col items-center justify-center">
      <h1 class="text-4xl font-bold">
        {{ error.statusCode }}
      </h1>
      <p class="mt-4 text-lg text-gray-500 dark:text-gray-400">
        {{ error.message }}
      </p>
      <UButton class="mt-12" to="/" color="primary" variant="solid" size="sm" :ui="{ variant: { solid: 'shadow-none text-gray-950' } }">
        Go back home
      </UButton>
    </main>
    <AppFooter />
  </Body>
</template>
