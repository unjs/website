<script setup lang="ts">
import '~/assets/github-light.css'

const route = useRoute()
const { data: repo } = await useFetch<any>(`https://ungh.unjs.io/repos/unjs/${route.params.name}`)
const { data: readme } = await useFetch<any>(`https://ungh.unjs.io/repos/unjs/${route.params.name}/readme`)

// useHead({
//   title: repo.value.name,
//   meta: [
//     { name: 'description', content: repo.value.description }
//   ]
// })
</script>

<template>
  <div class="container">
    <SiteHeader :title="repo.repo.name" :description="repo.repo.description" :github="repo.repo.repo" />
    <h2>
      <NuxtLink to="/">All projects</NuxtLink>
    </h2>
    <div class="readme" v-html="readme.html" />
  </div>
</template>

<style scoped>
.readme {
  background: rgba(255, 255, 255, .8);
  padding: 1em;
  border-radius: 3px;
}
</style>

<style>
.readme img {
  max-width: 100%;
}
</style>


