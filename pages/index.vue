<script lang="ts" setup>
const { data: page, error } = await useAsyncData('home', () => queryContent('/').findOne())

if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Page not found',
    fatal: true,
  })
}

useSeoMeta({
  titleTemplate: '%siteName: %pageTitle',
  title: 'Unleash JavaScript\'s Potential',
  description: page.value?.description,
})
defineOgImageComponent('OgImagePage', {
  title: 'UnJS',
  illustration: '/assets/header/dark/home.png',
})
useTrackPageview()
</script>

<template>
  <main v-if="page" class="mb-24 lg:mb-[10rem]">
    <HomeHero
      class="my-16 lg:my-0"
      :title="page.hero.title"
      :subtitle="page.hero.subtitle"
      :puzzle="page.hero.puzzle"
      :away="page.hero.away"
    />
    <HomePhilosophy
      class="mt-16 md:mb-[10rem]"
      :eyebrow="page.philosophy.eyebrow"
      :title="page.philosophy.title"
      :subtitle="page.philosophy.subtitle"
      :cards="page.philosophy.cards"
    />
    <HomeUniverse
      class="mt-24 md:my-[10rem]"
      :eyebrow="page.universe.eyebrow"
      :title="page.universe.title"
      :subtitle="page.universe.subtitle"
      :carousel="page.universe.carousel"
      :cta="page.universe.cta"
    />
    <HomeNumbers
      class="mt-24 md:my-[10rem]"
      :title="page.numbers.title"
    />
  </main>
</template>
