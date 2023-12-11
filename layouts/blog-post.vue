<script lang="ts" setup>
const { toc, page } = useContent()

const { data: packages } = await useAsyncData(`packages:${page.value.packages?.join(':')}`, () => queryContent('/packages/').only(['_path', 'title', 'icon', 'logo']).where({ _path: { $containsAny: page.value.packages } }).find(), { watch: [() => page.value.packages] })

// TODO: Waiting for Nuxt SEOKit v2
useServerSeoMeta({
  ogTitle: `${page.value.title} · UnJS`,
  ogType: 'article',
  ogDescription: page.value.description,
  ogImage: page.value.image?.src,
  ogImageAlt: page.value.image?.alt,
  twitterTitle: `${page.value.title} · UnJS`,
  twitterDescription: page.value.description,
  twitterImage: page.value.image?.src,
  twitterImageAlt: page.value.image?.alt,
  author: page.value.authors.map(author => author.name).join(', '),
  twitterCard: 'summary',
})
</script>

<template>
  <Head>
    <SchemaOrgWebPage :type="['ItemPage']" />
    <!-- TODO: missing in-language due to a but @see https://github.com/harlan-zw/unhead-schema-org/issues/29 -->
    <SchemaOrgArticle :date-published="toISODateString(page.publishedAt)" :date-modified="toISODateString(page.modifiedAt)" type="TechArticle" />
  </Head>

  <Main>
    <Prose :toc="toc">
      <template #header>
        <ProseHeaderArticle
          :title="page.title"
          :date="page.publishedAt"
          :categories="page.categories"
          :authors="page.authors"
        />
      </template>

      <slot />

      <template #nav>
        <template v-if="packages">
          <UDivider />
          <ArticleProseNavGroupPackages :packages="packages" />
        </template>
        <UDivider />
        <ArticleProseNavGroupCommunity :filename="page._file" />
      </template>
    </Prose>
  </Main>
</template>
