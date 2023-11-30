<script lang="ts" setup>
useSeoMeta({
  ogImage: 'https://unjs.io/og/home.jpg',
  ogImageWidth: 1440,
  ogImageHeight: 810,
  twitterSite: '@unjsio',
  twitterImage: 'https://unjs.io/og/home.jpg',
})
</script>

<template>
  <Html lang="en" dir="ltr" class="scroll-smooth">
    <Head>
      <SchemaOrgOrganization
        logo="/favicon.svg"
        :same-as="[
          'https://github.com/unjs',
          'https://twitter.com/unjsio',
        ]"
      />
      <SchemaOrgWebSite :potential-action="[defineSearchAction({ target: '/search?q={search_term_string}' })]" />
      <RobotMeta />
      <Link rel="icon" href="/favicon.svg" />
    </Head>
    <Body class="container mx-auto xl:max-w-7xl py-4 md:py-8 font-sans dark:bg-gray-900">
      <AppHeader />
      <NuxtPage />
      <AppFooter />
    </Body>
  </Html>
</template>
