<script lang="ts" setup>
useServerSeoMeta({
  ogLocale: 'en_US',
  ogSiteName: 'UnJS',
})
</script>

<template>
  <Html lang="en" dir="ltr">
    <Head>
      <SchemaOrgOrganization
        name="UnJS"
        logo="/favicon.svg"
        :same-as="[
          'https://github.com/unjs',
          'https://twitter.com/unjsio',
        ]"
      />
      <SchemaOrgWebSite name="UnJS" in-language="en" description="Agnostic Excellence: JavaScript Libraries, Tools, and Utilities, Crafted to Elevate Your Coding Journey." />
      <SchemaOrgWebPage />
      <RobotMeta />
      <Link rel="icon" href="/favicon.svg" />
    </Head>
    <Body container mx-auto xl:max-w-7xl p="x-4 y-4 md:y-8" bg="primary">
      <AppHeader />
      <NuxtPage />
      <AppFooter />
    </Body>
  </Html>
</template>
