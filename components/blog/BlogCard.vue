<script lang="ts" setup>
import type { BlogPostCard } from 'types/blog'

defineProps<{
  post: BlogPostCard
}>()
</script>

<template>
  <article relative overflow-hidden bg="white" rounded="4" flex="~ col" gap-4 hover:shadow-lg transition="~ ease-in duration-150">
    <img :src="post.cover.src" :alt="post.cover.alt" width="1920" height="1080" aspect-video object-cover>
    <div p="x-4 b-4" flex="~ col" gap-4>
      <h2 text="gray-900 md:xl" font="semibold">
        <NuxtLink :to="post._path">
          {{ post.title }}
          <span absolute inset-0 />
        </NuxtLink>
      </h2>
      <p text="gray-600">
        {{ post.description }}
      </p>
      <div>
        <dl flex="~ justify-between" text="gray-700 sm">
          <dt sr-only>
            Published at
          </dt>
          <dd>
            <time pubdate :datetime="toISODateString(post.publishedAt)">
              {{ toLocaleDateString(post.publishedAt) }}
            </time>
          </dd>
          <dt sr-only>
            Authors
          </dt>
          <dd>
            <ul flex="~" space-x--1>
              <li v-for="(author, index) in post.authors" :key="author.name" relative :style="`z-index:${post.authors.length - index};`">
                <address not-italic>
                  <NuxtLink rel="author noopener" :to="`https://twitter.com/${author.twitter}`" target="_blank" relative z-1>
                    <img :src="author.picture" :alt="`Profil picture of ${author.name}`" w-5 h-5 bg="white" rounded="full">
                  </NuxtLink>
                </address>
              </li>
            </ul>
          </dd>
        </dl>
      </div>
    </div>
  </article>
</template>
