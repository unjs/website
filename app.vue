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

const route = useRoute()
const isRelation = computed(() => {
  return route.name === 'relations'
})
</script>

<template>
  <Html>
    <Body class="font-sans dark:bg-gray-900">
      <NuxtLoadingIndicator color="#ECDC5A" />

      <TheHeader :class="{ 'z-10 absolute top-0 left-0 right-0': isRelation }" />

      <div :class="{ 'px-4 container mx-auto xl:max-w-7xl': !isRelation }">
        <NuxtPage />
      </div>

      <TheFooter v-if="!isRelation" />

      <UNotifications />
    </Body>
  </Html>
</template>
