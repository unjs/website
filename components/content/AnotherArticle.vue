<script lang="ts" setup>
const props = defineProps<{
  link: string
  text: string
}>()

const { data: article } = await useAsyncData(`article:${props.link}`, () => queryContent(`${props.link}`).only(['_path', 'title', 'description', 'image']).findOne())
</script>

<template>
  <div class="not-prose my-8 flex flex-col gap-2">
    <p class="text-zinc-600">
      {{ text ?? 'Read more:' }}
    </p>
    <article v-if="article" class="group relative rounded-xl border border-zinc-300 hover:border-zinc-400 bg-zinc-300/10 hover:bg-opacity-[15] transition ease-in">
      <!-- TODO: handle image -->
      <div class="p-4">
        <h1 class="text-zinc-900 font-bold">
          <NuxtLink :to="article._path">
            {{ article.title }}
            <span class="absolute inset-0" />
          </NuxtLink>
        </h1>
        <p class="mt-2 text-zinc-600 text-nowrap text-ellipsis overflow-hidden">
          {{ article.description }}
        </p>
      </div>
    </article>
  </div>
</template>
