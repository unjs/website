<script lang="ts" setup>
defineRobotMeta()
</script>

<template>
  <Html lang="en" dir="ltr" class="scroll-smooth">
    <Head>
      <SchemaOrgOrganization
        :same-as="[
          'https://github.com/unjs',
          'https://twitter.com/unjsio',
        ]"
      />
      <SchemaOrgWebSite :potential-action="[defineSearchAction({ target: '/search?q={search_term_string}' })]" />
      <Link rel="icon" href="/favicon.svg" />
    </Head>
    <Body class="container mx-auto xl:max-w-7xl px-4 py-4 md:py-8 bg-primary font-sans">
      <AppHeader />
      <NuxtPage />
      <AppFooter />
    </Body>
  </Html>
</template>
