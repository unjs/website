<script lang="ts" setup>
const props = defineProps<{
  link: string
  text: string
}>()

const { data: article } = await useAsyncData(`article:${props.link}`, () => queryContent(`${props.link}`).only(['_path', 'title', 'description', 'image']).findOne())
</script>

<template>
  <div class="not-prose my-8 flex flex-col gap-2">
    <p class="dark:text-gray-400">
      {{ text ?? 'Read more:' }}
    </p>
    <article v-if="article" class="group relative rounded-lg ring-1 dark:ring-gray-700 hover:dark:ring-gray-400 dark:bg-gray-700/20 hover:dark:bg-gray-700/50 transition ease-in">
      <!-- TODO: handle image -->
      <div class="p-4">
        <h1 class="dark:text-gray-200 font-bold">
          <NuxtLink :to="article._path">
            {{ article.title }}
            <span class="absolute inset-0" />
          </NuxtLink>
        </h1>
        <p class="mt-2 dark:text-zinc-400 text-nowrap text-ellipsis overflow-hidden">
          {{ article.description }}
        </p>
      </div>
    </article>
  </div>
</template>
