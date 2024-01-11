<script lang="ts" setup>
const route = useRoute()
const { data: page, error } = await useAsyncData(route.path, () => queryContent(route.path).findOne())

if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Page not found',
    fatal: true,
  })
}

useSeoMeta({
  title: page.value?.title,
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description,
})

const { data: latestBlog } = await useAsyncData('blog:latest', () => queryContent('/blog/').only(['_path', 'title', 'description', 'publishedAt', 'authors', 'packages', 'categories']).sort({ publishedAt: -1 }).limit(3).find(), { default: () => [] }) as { data: Ref<BlogPostCard[]> }

const latestArticles = []

const categories = [{
  id: 'getting-started',
  label: 'Getting Started',
  description: 'Start by the basics of the UnJS ecosystem',
}, {
  id: 'intermediate',
  label: 'Intermediate',
  description: 'Dive into more advanced UnJS concepts and techniques',
}, {
  id: 'build',
  label: 'Build',
  description: 'Create real-world projects by assambling UnJS packages',
}, {
  id: 'explore',
  label: 'Explore',
  description: 'Discover how to integrate UnJS with other tools',
}]
</script>

<template>
  <!-- Once ready, create components -->
  <Main v-if="page">
    <template #header>
      <PageHeader :title="page.title" :description="page.descriptions" />
    </template>

    <section class="grid grid-cols-1 lg:grid-cols-2 items-center gap-4 lg:gap-16">
      <div class="flex flex-col gap-2">
        <h2 class="text-gray-950 dark:text-gray-50 text-xl lg:text-4xl font-bold">
          Find the article you need
        </h2>
        <p class="text-gray-500 dark:text-gray-400 max-w-lg">
          Our articles are organized into categories to help you find the right content for your needs, from beginner to more advanced topics.
        </p>

        <div class="mt-6 flex ">
          <UButton to="/articles?utm_source=unjs.io&utm_medium=learn-article-you-need" color="white" variant="solid" size="lg" trailing-icon="i-heroicons-chevron-right-20-solid">
            All articles
          </UButton>
        </div>
      </div>
      <ol class="grid grid-cols-2 gap-4 lg:gap-8">
        <li v-for="category in categories" :key="category.label" class="relative p-4 rounded-lg ring-1 ring-gray-300 dark:ring-gray-700 shadow-sm hover:shadow-none hover:ring-primary transition ease-in">
          <h3 class="md:text-xl font-semibold dark:text-gray-50">
            <NuxtLink class="absolute inset-0" :to="`/learn/articles?category=${category.id}`" />
            {{ category.label }}
          </h3>
          <p class="mt-1 dark:text-zinc-400">
            {{ category.description }}
          </p>
        </li>
      </ol>
    </section>

    <section class="mt-8 lg:mt-16">
      <h2 class="text-gray-950 dark:text-gray-50 text-xl font-semibold">
        <NuxtLink class="flex items-center" to="/learn/articles?utm_source=unjs.io&utm_medium=learn-latest-articles">
          <span>
            Latest articles
          </span>
          <span class="i-heroicons-chevron-right text-primary h-5 w-5" />
        </NuxtLink>
      </h2>

      <ListGrid class="mt-3">
        <ListGridItem v-for="item in latestArticles" :key="item._path">
          <ArticlesCard
            :path="item._path!"
            :title="item.title"
            :description="item.description"
            :published-at="item.publishedAt"
            :authors="item.authors"
          />
        </ListGridItem>
      </ListGrid>
    </section>

    <!-- Find by packages with list of most used packages -->

    <section class="mt-8 lg:mt-16">
      <h2 class="text-gray-950 dark:text-gray-50 text-xl font-semibold">
        <NuxtLink class="flex items-center" to="/blog?utm_source=unjs.io&utm_medium=learn-latest-blog">
          <span>
            Stay up to date
          </span>
          <span class="i-heroicons-chevron-right text-primary h-5 w-5" />
        </NuxtLink>
      </h2>
      <ListGrid class="mt-3">
        <ListGridItem v-for="item in latestBlog" :key="item._path">
          <BlogCard
            :path="`${item._path!}?utm_source=unjs.io&utm_medium=learn-latest-blog`"
            :title="item.title"
            :description="item.description"
            :published-at="item.publishedAt"
            :authors="item.authors"
          />
        </ListGridItem>
      </ListGrid>
    </section>
  </Main>
</template>
