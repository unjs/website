<script lang="ts" setup>
useSeoMeta({
  ogImage: 'https://unjs.io/og/design-kit.jpg',
  twitterImage: 'https://unjs.io/og/design-kit.jpg',
})

const { page, toc } = useContent()
</script>

<template>
  <Main>
    <Prose :title="page.title" :toc="toc">
      <slot />
    </Prose>
  </Main>
</template>
