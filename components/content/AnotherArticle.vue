<script lang="ts" setup>
const props = defineProps<{
  link: string
  text?: string
}>()

const { data: article } = await useAsyncData(`article:${props.link}`, () => queryContent(`${props.link}`).only(['_path', 'title', 'description', 'image']).findOne())
</script>

<template>
  <div class="not-prose my-8 flex flex-col gap-2">
    <p class="text-gray-500 dark:text-gray-400">
      {{ text ?? 'Read more:' }}
    </p>
    <article v-if="article" class="group relative rounded-lg border border-dashed hover:border-solid border-gray-300 bg-gray-300/20 hover:bg-gray-300/40 dark:border-gray-700 hover:dark:border-gray-400 dark:bg-gray-700/20 hover:dark:bg-gray-700/50">
      <div class="p-4">
        <h1 class="text-gray-800 dark:text-gray-200 font-bold">
          <NuxtLink :to="article._path">
            {{ article.title }}
            <span class="absolute inset-0" />
          </NuxtLink>
        </h1>
        <p class="mt-2 text-gray-500 dark:text-gray-400 text-nowrap text-ellipsis overflow-hidden">
          {{ article.description }}
        </p>
      </div>
    </article>
  </div>
</template>
