<script lang="ts" setup>
const props = defineProps<{
  link: string
  text: string
}>()

const { data: article } = await useAsyncData(`article:${props.link}`, () => queryContent(`${props.link}`).only(['_path', 'title', 'description', 'image']).findOne())
</script>

<template>
  <div class="not-prose my-8 flex flex-col gap-2">
    <p text="gray-600">
      {{ text ?? 'Read more:' }}
    </p>
    <article v-if="article" class="group" relative border="~ gray-300 hover:gray-400" bg="gray-300 op-10 hover:op-15" rounded="xl" transition="~ ease-in duration-150">
      <!-- TODO: handle image -->
      <div p="4">
        <h1 text="gray-900" font="bold">
          <NuxtLink :to="article._path">
            {{ article.title }}
            <span absolute inset-0 />
          </NuxtLink>
        </h1>
        <p m="t-2" text="gray-600 nowrap ellipsis" overflow="hidden">
          {{ article.description }}
        </p>
      </div>
    </article>
  </div>
</template>
