<template>
  <div class="container">
    <SiteHeader :title="data.project.name" :description="data.project.description" :github="data.project.repository" />
    <h2>
      <NuxtLink to="/">Discover other projects</NuxtLink>
    </h2>
    <div class="readme" v-html="data.readme" />
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

<script setup lang="ts">
const route = useRoute()
// TODO: Catch 404
const { data } = await useFetch(`/api/projects/${route.params.name}`)
</script>
