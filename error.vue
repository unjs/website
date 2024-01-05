<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

if (props.error.statusCode === 404) {
  useTrackEvent('404', { props: { path: document.location.pathname } })
}

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.',
})
</script>

<template>
  <Body class="font-sans dark:bg-gray-900">
    <AppHeader />

    <div class="px-4 container mx-auto xl:max-w-7xl">
      <Main class="flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">
          {{ error.statusCode }}
        </h1>
        <p class="mt-4 text-lg text-gray-500 dark:text-gray-400">
          {{ error.message }}
        </p>
        <UButton class="mt-12" to="/" color="primary" variant="solid" size="sm" :ui="{ variant: { solid: 'shadow-none text-gray-950' } }">
          Go back home
        </UButton>
      </Main>
    </div>

    <AppFooter />
  </Body>
</template>
