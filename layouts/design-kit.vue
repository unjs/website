<script lang="ts" setup>
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
