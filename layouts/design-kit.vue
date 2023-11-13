<script lang="ts" setup>
const { page, toc } = useContent()
</script>

<template>
  <Main>
    <Prose :title="page.title" :toc="toc">
      <slot />
    </Prose>
  </Main>
</template>
