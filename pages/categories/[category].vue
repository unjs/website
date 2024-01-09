<script lang="ts" setup>
import type { NuxtError } from '#app'
import type { BlogPostCard } from '~/types/blog'

const route = useRoute()
const category = route.params.category as string

const { data, error } = await useAsyncData(`blog:categories:${category}`, () => queryContent('/blog/').only(['_path', 'title', 'description', 'publishedAt', 'authors', 'packages']).where({ categories: { $contains: category } }).find()) as { data: Ref<BlogPostCard[]>, error: Ref<NuxtError | null> }

if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Page not found',
    fatal: true,
  })
}

const site = useSiteConfig()

const title = `${category} ${site.separator} Category`
const description = `Blog's articles in the category ${category}`
useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
})
</script>

<template>
  <Head>
    <SchemaOrgWebPage :type="['CollectionPage']" />
  </Head>
  <Main v-if="data">
    <template #header>
      <PageHeader :description="description">
        <template #title>
          <div class="capitalize">
            {{ category }}
          </div>
        </template>
      </PageHeader>
    </template>
    <ListGrid class="mt-8">
      <ListGridItem v-for="item in data" :key="item._path">
        <BlogCard
          :path="item._path!"
          :title="item.title"
          :description="item.description"
          :published-at="item.publishedAt"
          :authors="item.authors"
        />
      </ListGridItem>
    </ListGrid>
  </Main>
</template>
