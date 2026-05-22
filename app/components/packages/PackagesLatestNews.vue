<script lang="ts" setup>
const props = defineProps<{
  name: string
}>()

const { data: articles } = useAsyncData(`latest-news:${props.name}`, () => queryContent('/blog/').sort({ publishedAt: -1 }).where({ packages: { $contains: props.name } }).limit(3).only(['title', 'description', 'publishedAt', 'authors', '_path']).find())
</script>

<template>
  <section v-if="articles && articles.length">
    <div class="prose prose-zinc dark:prose-invert max-w-none">
      <h2 id="latest-news">
        <a href="#latest-news">
          Latest news
        </a>
      </h2>
    </div>
    <AppListGrid class="mt-8">
      <AppListGridItem v-for="item in articles" :key="item._path">
        <BlogCard
          :path="item._path!"
          :title="item.title"
          :description="item.description"
          :published-at="item.publishedAt"
          :authors="item.authors"
        />
      </AppListGridItem>
    </AppListGrid>
  </section>
</template>
