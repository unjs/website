<script lang="ts" setup>
const { data: content } = await useAsyncData('blog-categories', () => queryContent('/blog/').only(['categories']).find())

const categories = computed(() => {
  const data = new Set<string>()

  if (content.value) {
    for (const item of content.value) {
      for (const category of item.categories)
        data.add(category)
    }
  }

  return data
})
</script>

<template>
  <main>
    <h1>
      Categories
    </h1>
    <ul>
      <li v-for="category in categories" :key="category">
        <NuxtLink :to="`categories/${category}`">
          {{ category }}
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>
