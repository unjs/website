<script lang="ts" setup>
const route = useRoute()
const category = ref<string>(route.params.category as string)

const { data } = await useAsyncData(`blog-by-categories-${category}`, () => queryContent('/blog/').find())
</script>

<template>
  <main>
    <h1>
      {{ category }}
    </h1>
    <ul>
      <li v-for="item in data" :key="item.slug">
        <NuxtLink :to="item._path">
          {{ item.title }}
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>
