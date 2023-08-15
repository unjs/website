<script lang="ts" setup>
useServerSeoMeta({
  ogLocale: 'en_US',
  ogLocaleAlternate: ['en_UK'], // We could add more locales here?
  ogSiteName: 'UnJS',
})
</script>

<template>
  <Html lang="en" dir="ltr">
    <Head>
      <Link rel="icon" href="/favicon.svg" />
    </Head>
    <Body container mx-auto xl:max-w-7xl p="x-4 y-4 md:y-8" bg="primary">
      <AppHeader />
      <NuxtPage />
      <AppFooter />
    </Body>
  </Html>
</template>
