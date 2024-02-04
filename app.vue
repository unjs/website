<script lang="ts" setup>
useSeoMeta({
  twitterSite: '@unjsio',
})

useSchemaOrg([
  defineWebSite({
    potentialAction: [
      defineSearchAction({ target: '/search?q={search_term_string}' }),
    ],
  }),
])
</script>

<template>
  <Html>
    <Body class="font-sans dark:bg-gray-900">
      <NuxtLoadingIndicator color="#ECDC5A" />

      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>

      <UNotifications />
    </Body>
  </Html>
</template>
