<script lang="ts" setup>
const site = useSiteConfig()

useHead({
  titleTemplate: title => title ? `${title} ${site.separator} ${site.name}` : `${site.name}: Unleash JavaScript\'s Potential`,
  htmlAttrs: {
    lang: site.defaultLocale,
    dir: 'ltr',
    class: 'scroll-smooth',
  },
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#ECDC5A' },
  ],
  link: [
    { rel: 'icon', href: '/favicon.svg' },
  ],
})

useSeoMeta({
  ogSiteName: site.name,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterSite: '@unjsio',
})
</script>

<template>
  <Html>
    <Head>
      <SchemaOrgOrganization
        logo="/favicon.svg"
        :same-as="[
          'https://github.com/unjs',
          'https://twitter.com/unjsio',
        ]"
      />
      <SchemaOrgWebSite :potential-action="[defineSearchAction({ target: '/search?q={search_term_string}' })]" />
    </Head>
    <Body class="font-sans dark:bg-gray-900">
      <NuxtLoadingIndicator color="#ECDC5A" />

      <AppHeader />

      <div class="px-4 container mx-auto xl:max-w-7xl">
        <NuxtPage />
      </div>

      <AppFooter />

      <UNotifications />
    </Body>
  </Html>
</template>
