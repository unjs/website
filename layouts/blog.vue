<script lang="ts" setup>
import type { BlogPostCard } from 'types/blog'

const { data } = await useAsyncData('blog', () => queryContent('/blog/').only(['_path', 'cover', 'title', 'description', 'publishedAt', 'authors']).find() as Promise<BlogPostCard[]>)
</script>

<template>
  <main m="y-6 md:y-10">
    <slot />

    <section v-if="data" m="t-6" grid="~ cols-1 md:cols-2 lg:cols-3" gap-6>
      <BlogCard v-for="post in data" :key="post._path" :post="post" />
    </section>
  </main>
</template>
