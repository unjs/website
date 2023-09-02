<script lang="ts" setup>
const props = defineProps<{
  name: string
}>()

const { data: posts } = useAsyncData(`latest-news:${props.name}`, () => queryContent('/blog/').sort({ publishedAt: -1 }).limit(2).only(['title', 'description', 'publishedAt', 'authors', '_path']).find())
</script>

<template>
  <section>
    <h2 text="gray-900 2xl" font="semibold">
      Latest News about {{ name }}
    </h2>
    <ol m="t-6" grid="~ cols-2 gap-6">
      <li v-for="post in posts" :key="post._path">
        <!-- TODO: create a component -->
        <article relative flex="~ col gap-4">
          <NuxtLink :to="post._path">
            <h3 text="gray-900 xl" font="semibold">
              {{ post.title }}
              <span absolute inset-0 />
            </h3>
          </NuxtLink>
          <p text="gray-600">
            {{ post.description }}
          </p>
          <dl flex="~ row justify-between">
            <dt sr-only>
              Published on
            </dt>
            <dd text="gray-700 sm">
              <time :datetime="toISODateString(post.publishedAt)">
                {{ toLocaleDateString(post.publishedAt) }}
              </time>
            </dd>
            <dt sr-only>
              Authors
            </dt>
            <dd>
              <ul>
                <li v-for="author in post.authors" :key="author.name">
                  <img :src="author.picture" :alt="`Picture of ${author.name}`" width="20" height="20" w-5 h-5 rounded-full>
                </li>
              </ul>
            </dd>
          </dl>
        </article>
      </li>
    </ol>
  </section>
</template>
