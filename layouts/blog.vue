<script lang="ts" setup>
import type { BlogPostCard } from 'types/blog'

const { data } = await useAsyncData('blog', () => queryContent('/blog/').only(['_path', 'cover', 'title', 'description', 'publishedAt', 'authors']).sort({ publishedAt: -1 }).find() as Promise<BlogPostCard[]>)
</script>

<template>
  <Head>
    <SchemaOrgWebPage :type="['CollectionPage']" />
  </Head>
  <main m="y-6 md:y-10">
    <slot />

    <section v-if="data" m="t-6" grid="~ cols-1 md:cols-2 lg:cols-3" gap-6>
      <BlogCard v-for="post in data" :key="post._path" :post="post" />
    </section>
  </main>
</template>
