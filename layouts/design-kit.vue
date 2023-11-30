<script lang="ts" setup>
useSeoMeta({
  ogImage: 'https://unjs.io/og/design-kit.jpg',
  twitterImage: 'https://unjs.io/og/design-kit.jpg',
})

const { page, toc } = useContent()
</script>

<template>
  <Main>
    <Prose :toc="toc">
      <template #header>
        <ProseHeaderArticle
          :title="page.title"
        />
      </template>
      <slot />
    </Prose>
  </Main>
</template>
