<script lang="ts" setup>
useServerSeoMeta({
  ogLocale: 'en_US',
  ogSiteName: 'UnJS',
})
</script>

<template>
  <Html lang="en" dir="ltr" class="scroll-smooth">
    <Head>
      <SchemaOrgOrganization
        name="UnJS"
        logo="/favicon.svg"
        :same-as="[
          'https://github.com/unjs',
          'https://twitter.com/unjsio',
        ]"
      />
      <SchemaOrgWebSite name="UnJS" in-language="en" description="Agnostic Excellence: JavaScript Libraries, Tools, and Utilities, Crafted to Elevate Your Coding Journey." :potential-action="[defineSearchAction({ target: '/search?q={search_term_string}' })]" />
      <SchemaOrgWebPage />
      <RobotMeta />
      <Link rel="icon" href="/favicon.svg" />
    </Head>
    <Body class="container mx-auto xl:max-w-7xl px-4 py-4 md:py-8 bg-[#ECDC5A] font-sans">
      <AppHeader />
      <NuxtPage />
      <AppFooter />
    </Body>
  </Html>
</template>
