<script lang="ts" setup>
const { page, toc } = useContent()
</script>

<template>
  <Head>
    <SchemaOrgWebPage :type="['CollectionPage']" />
  </Head>
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
