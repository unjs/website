<script lang="ts" setup>
const route = useRoute()

const { data: page, error } = await useAsyncData(route.path, () => queryContent(route.path).findOne())

if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Page not found',
    fatal: true,
  })
}

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
})
defineOgImageComponent('OgImagePage', {
  illustration: '/assets/header/dark/design-kit.png',
})
useTrackPageview()
</script>

<template>
  <Main v-if="page">
    <template #header>
      <PageHeader :title="page.title" :description="page.description">
        <template #right>
          <div>
            <AppColorModeImage light="/assets/header/light/design-kit.png" dark="/assets/header/dark/design-kit.png" alt="Illustration" aria-hidden="true" class="absolute left-24 -top-12 w-80" />
          </div>
        </template>
      </PageHeader>
    </template>

    <Prose :toc="page.body?.toc">
      <ContentRenderer :value="page" />
    </Prose>
  </Main>
</template>
