<script lang="ts">
const { page } = useContent()

useHead({
  title: page.value.title,
  titleTemplate: '%s · UnJS',
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
