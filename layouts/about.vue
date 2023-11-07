<script lang="ts" setup>
const { toc, page } = useContent()
</script>

<template>
  <Main>
    <Prose :toc="toc">
      <slot />

      <template #nav>
        <UDivider />
        <ArticleProseNavGroupCommunity :filename="page._file" />
      </template>
    </Prose>
  </Main>
</template>
